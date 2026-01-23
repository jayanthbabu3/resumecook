/**
 * Enhance with AI Modal - Progressive Resume Reveal Animation
 *
 * Features:
 * - Live resume preview that reveals from top to bottom as sections complete
 * - Smooth animations showing the resume being "built"
 * - Section-by-section streaming with visual progress
 * - Final comparison view with original vs enhanced
 */

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  X,
  Loader2,
  Check,
  FileText,
  AlertCircle,
  RotateCcw,
  Lightbulb,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Circle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { V2ResumeData } from '../types';
import { API_ENDPOINTS, getApiHeaders } from '../../config/api';
import { WEBSITE_PRIMARY_COLOR } from '../constants/theme';
import { ResumeRenderer } from './ResumeRenderer';
import { InlineEditProvider } from '@/contexts/InlineEditContext';
import { StyleOptionsProvider } from '@/contexts/StyleOptionsContext';
import { StyleOptionsWrapper } from '@/components/resume/StyleOptionsWrapper';

interface EnhanceWithAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: V2ResumeData;
  onApplyEnhancements: (enhancedData: V2ResumeData, animate?: boolean) => void;
  themeColor?: string;
  templateId?: string;
  themeColors?: { primary?: string; secondary?: string };
}

type EnhancementStatus = 'idle' | 'enhancing' | 'comparing' | 'applying' | 'error';

interface SectionProgress {
  id: string;
  label: string;
  status: 'pending' | 'in_progress' | 'success' | 'error';
  error?: string;
}

interface EnhancementResult {
  data: V2ResumeData;
  suggestedSkills?: Array<{
    id: string;
    name: string;
    category: string;
    reason: string;
  }>;
}

export const EnhanceWithAIModal: React.FC<EnhanceWithAIModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onApplyEnhancements,
  themeColor = WEBSITE_PRIMARY_COLOR,
  templateId = 'executive-split-v2',
  themeColors,
}) => {
  const [status, setStatus] = useState<EnhancementStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [enhancementResult, setEnhancementResult] = useState<EnhancementResult | null>(null);
  const [sections, setSections] = useState<SectionProgress[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('');
  const [acceptSuggestedSkills, setAcceptSuggestedSkills] = useState<Set<string>>(new Set());

  // Progressive reveal state - tracks what's been enhanced so far
  const [progressiveData, setProgressiveData] = useState<V2ResumeData | null>(null);
  const [revealProgress, setRevealProgress] = useState(0); // 0-100 for reveal animation
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  // User customization options
  const [additionalContext, setAdditionalContext] = useState('');

  // Mobile tab state for comparing view
  const [mobileCompareTab, setMobileCompareTab] = useState<'original' | 'enhanced'>('enhanced');

  // Refs
  const originalScrollRef = useRef<HTMLDivElement>(null);
  const enhancedScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingSyncRef = useRef<boolean>(false);
  const originalContainerRef = useRef<HTMLDivElement>(null);
  const enhancedContainerRef = useRef<HTMLDivElement>(null);
  const progressiveContainerRef = useRef<HTMLDivElement>(null);
  const [resumeScale, setResumeScale] = useState(0.5);
  const abortControllerRef = useRef<AbortController | null>(null);

  // A4 dimensions at 96dpi
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;

  // Calculate reveal height based on progress
  const revealHeight = useMemo(() => {
    // Map sections to approximate resume heights
    const sectionHeights: Record<string, number> = {
      'summary': 15, // Header + Summary = ~15% of page
    };

    // Calculate experience section heights
    const expCount = resumeData.experience?.length || 0;
    const expHeightPer = expCount > 0 ? 50 / expCount : 0; // Experience = ~50% total

    let currentHeight = 0;
    completedSections.forEach(sectionId => {
      if (sectionId === 'summary') {
        currentHeight += 15;
      } else if (sectionId.startsWith('experience-')) {
        currentHeight += expHeightPer;
      } else if (sectionId === 'projects') {
        currentHeight += 20; // Projects = ~20%
      } else if (sectionId === 'skills') {
        currentHeight += 15; // Skills = ~15%
      }
    });

    return Math.min(100, currentHeight);
  }, [completedSections, resumeData.experience?.length]);

  // Calculate scale based on container width
  useEffect(() => {
    if (status !== 'comparing' && status !== 'applying' && status !== 'enhancing') return;

    const calculateScale = () => {
      const container = status === 'enhancing' ? progressiveContainerRef.current : originalContainerRef.current;
      if (!container) {
        setResumeScale(0.65);
        return;
      }

      const availableWidth = container.clientWidth - 32;
      const optimalScale = Math.min((availableWidth - 40) / A4_WIDTH, 0.85);
      const finalScale = Math.max(optimalScale, 0.5);
      setResumeScale(finalScale);
    };

    calculateScale();

    const resizeObserver = new ResizeObserver(calculateScale);
    const targetContainer = status === 'enhancing' ? progressiveContainerRef.current : originalContainerRef.current;
    if (targetContainer) {
      resizeObserver.observe(targetContainer);
    }

    return () => resizeObserver.disconnect();
  }, [status]);

  // Synchronized scroll handler
  const handleScroll = useCallback((source: 'original' | 'enhanced') => {
    if (isScrollingSyncRef.current) return;

    isScrollingSyncRef.current = true;

    const sourceRef = source === 'original' ? originalScrollRef : enhancedScrollRef;
    const targetRef = source === 'original' ? enhancedScrollRef : originalScrollRef;

    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollTop = sourceRef.current.scrollTop;
    }

    requestAnimationFrame(() => {
      isScrollingSyncRef.current = false;
    });
  }, []);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setStatus('idle');
      setError(null);
      setEnhancementResult(null);
      setSections([]);
      setCurrentSection('');
      setAcceptSuggestedSkills(new Set());
      setAdditionalContext('');
      setMobileCompareTab('enhanced');
      setProgressiveData(null);
      setRevealProgress(0);
      setCompletedSections(new Set());
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    }
  }, [isOpen]);

  // Initialize sections based on resume data
  const initializeSections = useCallback(() => {
    const sectionList: SectionProgress[] = [
      { id: 'summary', label: 'Summary & Title', status: 'pending' },
    ];

    (resumeData.experience || []).forEach((exp, idx) => {
      sectionList.push({
        id: `experience-${idx}`,
        label: exp.company || `Experience ${idx + 1}`,
        status: 'pending',
      });
    });

    if (resumeData.projects && resumeData.projects.length > 0) {
      sectionList.push({ id: 'projects', label: 'Projects', status: 'pending' });
    }

    sectionList.push({ id: 'skills', label: 'Skill Suggestions', status: 'pending' });

    return sectionList;
  }, [resumeData]);

  // Stream enhancement with SSE and progressive updates
  const handleEnhanceStream = useCallback(async () => {
    setStatus('enhancing');
    setError(null);
    const initialSections = initializeSections();
    setSections(initialSections);

    // Initialize progressive data with original resume
    setProgressiveData({ ...resumeData });
    setCompletedSections(new Set());
    setRevealProgress(0);

    abortControllerRef.current = new AbortController();

    try {
      const headers = getApiHeaders();

      const response = await fetch(API_ENDPOINTS.enhanceSectionsStream, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          resumeData,
          options: {
            additionalContext: additionalContext.trim() || null,
          },
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Enhancement failed');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        let eventType = '';
        let eventData = '';

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            eventType = line.slice(7);
          } else if (line.startsWith('data: ')) {
            eventData = line.slice(6);

            if (eventType && eventData) {
              try {
                const data = JSON.parse(eventData);
                handleSSEEvent(eventType, data);
              } catch (e) {
                console.error('Failed to parse SSE data:', e);
              }
              eventType = '';
              eventData = '';
            }
          }
        }
      }

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Enhancement cancelled');
        return;
      }

      console.error('Enhancement error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to enhance resume';

      let userFriendlyError = errorMessage;
      if (errorMessage.includes('subscription required') || errorMessage.includes('Active subscription')) {
        userFriendlyError = 'This feature requires an active subscription. Please upgrade to Pro.';
      } else if (errorMessage.includes('Trial has expired')) {
        userFriendlyError = 'Your trial has expired. Please upgrade to Pro.';
      }

      setError(userFriendlyError);
      setStatus('error');
    }
  }, [resumeData, additionalContext, initializeSections]);

  // Handle SSE events with progressive updates
  const handleSSEEvent = useCallback((event: string, data: any) => {
    switch (event) {
      case 'start':
        console.log('[Enhance] Started:', data);
        break;

      case 'section_start':
        setCurrentSection(data.label || data.section);
        setSections(prev => prev.map(s => {
          if (data.section === 'experience' && s.id === `experience-${data.index}`) {
            return { ...s, status: 'in_progress' };
          }
          if (s.id === data.section) {
            return { ...s, status: 'in_progress' };
          }
          return s;
        }));
        break;

      case 'section_complete':
        const sectionId = data.section === 'experience' ? `experience-${data.index}` : data.section;

        setSections(prev => prev.map(s => {
          if (s.id === sectionId) {
            return {
              ...s,
              status: data.status === 'success' ? 'success' : 'error',
              error: data.error,
            };
          }
          return s;
        }));

        // Mark section as completed for reveal animation
        if (data.status === 'success') {
          setCompletedSections(prev => new Set([...prev, sectionId]));
        }
        break;

      case 'complete':
        console.log('[Enhance] Complete:', data);

        // Set the final enhanced data
        setProgressiveData(data.data);
        setEnhancementResult({
          data: data.data,
          suggestedSkills: data.suggestedSkills?.map((s: any, idx: number) => ({
            id: s.id || `suggested-${Date.now()}-${idx}`,
            name: s.name,
            category: s.category || 'Technical',
            reason: s.reason || '',
          })),
        });

        // Small delay before showing comparison
        setTimeout(() => {
          setStatus('comparing');
        }, 800);
        break;

      case 'error':
        console.error('[Enhance] Error:', data);
        setError(data.error || 'Enhancement failed');
        setStatus('error');
        break;
    }
  }, []);

  // Fallback to batch enhancement
  const handleEnhanceBatch = useCallback(async () => {
    setStatus('enhancing');
    setError(null);
    const initialSections = initializeSections();
    setSections(initialSections.map(s => ({ ...s, status: 'in_progress' })));
    setProgressiveData({ ...resumeData });

    try {
      const headers = getApiHeaders();

      const response = await fetch(API_ENDPOINTS.enhanceSectionsBatch, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          resumeData,
          options: {
            additionalContext: additionalContext.trim() || null,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Enhancement failed');
      }

      setProgressiveData(result.data);
      setEnhancementResult({
        data: result.data,
        suggestedSkills: result.suggestedSkills,
      });
      setSections(prev => prev.map(s => ({ ...s, status: 'success' })));

      setTimeout(() => {
        setStatus('comparing');
      }, 500);

    } catch (err) {
      console.error('Batch enhancement error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to enhance resume';
      setError(errorMessage);
      setStatus('error');
    }
  }, [resumeData, additionalContext, initializeSections]);

  const handleEnhance = useCallback(async () => {
    try {
      await handleEnhanceStream();
    } catch (err) {
      console.log('Streaming failed, falling back to batch:', err);
      await handleEnhanceBatch();
    }
  }, [handleEnhanceStream, handleEnhanceBatch]);

  const handleApply = async () => {
    if (!enhancementResult) return;

    setStatus('applying');

    await new Promise(resolve => setTimeout(resolve, 800));

    let finalData = { ...enhancementResult.data };

    if (acceptSuggestedSkills.size > 0 && enhancementResult.suggestedSkills) {
      const newSkills = enhancementResult.suggestedSkills
        .filter(s => acceptSuggestedSkills.has(s.id))
        .map(s => ({ id: s.id, name: s.name, category: s.category }));
      finalData = {
        ...finalData,
        skills: [...(finalData.skills || []), ...newSkills],
      };
    }

    onApplyEnhancements(finalData, true);
    onClose();
  };

  const getSectionIcon = (sectionStatus: SectionProgress['status']) => {
    switch (sectionStatus) {
      case 'pending':
        return <Circle className="w-4 h-4 text-gray-300" />;
      case 'in_progress':
        return <Loader2 className="w-4 h-4 animate-spin" style={{ color: themeColor }} />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    if (sections.length === 0) return 0;
    const completed = sections.filter(s => s.status === 'success' || s.status === 'error').length;
    return Math.round((completed / sections.length) * 100);
  }, [sections]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={status === 'applying' || status === 'enhancing' ? undefined : onClose}
      />

      {/* Modal */}
      <div className={cn(
        "relative bg-white shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col",
        status === 'comparing' || status === 'applying' || status === 'enhancing'
          ? "w-full h-full sm:w-[95vw] sm:h-[95vh] sm:max-w-[1800px] rounded-none sm:rounded-2xl"
          : "w-full max-w-md rounded-xl max-h-[90vh]"
      )}>
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between flex-shrink-0 border-b",
            "px-3 py-2 sm:px-4"
          )}
          style={{ borderColor: '#f3f4f6' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: themeColor }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <h2 className="font-semibold text-gray-900 text-sm">
              {status === 'idle' && 'Enhance with AI'}
              {status === 'enhancing' && `Enhancing... ${progressPercentage}%`}
              {status === 'comparing' && 'Review Changes'}
              {status === 'applying' && 'Applying...'}
              {status === 'error' && 'Error'}
            </h2>
            {status === 'enhancing' && (
              <span className="text-xs text-gray-500 hidden sm:inline">
                {currentSection}
              </span>
            )}
          </div>
          {status !== 'applying' && status !== 'enhancing' && (
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {/* Idle State */}
          {status === 'idle' && (
            <div className="px-6 py-5 overflow-y-auto h-full">
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                AI will enhance your <span className="font-medium" style={{ color: themeColor }}>summary</span>, <span className="font-medium" style={{ color: themeColor }}>experience bullet points</span>, and <span className="font-medium" style={{ color: themeColor }}>skills</span> with stronger action verbs and ATS-optimized keywords.
              </p>

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Additional context <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="e.g. Targeting senior engineering roles at FAANG companies"
                  className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none transition-all"
                  style={{
                    borderColor: additionalContext ? themeColor : '#e5e7eb',
                    // @ts-ignore
                    '--tw-ring-color': `${themeColor}40`
                  } as React.CSSProperties}
                  rows={2}
                />
              </div>

              <Button
                onClick={handleEnhance}
                className="w-full py-3 gap-2 text-[15px] font-semibold rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
                style={{
                  backgroundColor: themeColor,
                  color: 'white',
                }}
              >
                <Sparkles className="w-4 h-4" />
                Enhance Resume
              </Button>

              <p className="text-center text-xs text-gray-400 mt-3">
                You'll preview changes before applying
              </p>
            </div>
          )}

          {/* Enhancing State - Live Resume Preview with Progress Sidebar */}
          {status === 'enhancing' && progressiveData && (
            <div className="flex h-full">
              {/* Left: Section Progress Sidebar */}
              <div className="w-64 lg:w-72 flex-shrink-0 border-r border-gray-100 bg-gray-50/50 flex flex-col">
                {/* Progress Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                      style={{ backgroundColor: `${themeColor}15` }}
                    >
                      <Sparkles className="w-5 h-5 animate-pulse" style={{ color: themeColor }} />
                      {/* Rotating ring */}
                      <div
                        className="absolute inset-0 rounded-xl border-2 border-transparent animate-spin"
                        style={{
                          borderTopColor: themeColor,
                          animationDuration: '2s'
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Enhancing</h3>
                      <p className="text-xs text-gray-500">{progressPercentage}% complete</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${progressPercentage}%`,
                        background: `linear-gradient(90deg, ${themeColor}, ${themeColor}bb)`,
                      }}
                    />
                  </div>
                </div>

                {/* Section List */}
                <div className="flex-1 overflow-y-auto p-3">
                  <div className="space-y-1.5">
                    {sections.map((section, idx) => (
                      <div
                        key={section.id}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-300",
                          section.status === 'in_progress' && "bg-white shadow-sm border border-blue-100",
                          section.status === 'success' && "bg-emerald-50/70",
                          section.status === 'error' && "bg-amber-50/70",
                          section.status === 'pending' && "opacity-50"
                        )}
                        style={{
                          transform: section.status === 'in_progress' ? 'scale(1.02)' : 'scale(1)',
                        }}
                      >
                        {getSectionIcon(section.status)}
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-xs font-medium truncate",
                            section.status === 'in_progress' && "text-gray-900",
                            section.status === 'success' && "text-emerald-700",
                            section.status === 'error' && "text-amber-700",
                            section.status === 'pending' && "text-gray-400"
                          )}>
                            {section.label}
                          </p>
                          {section.status === 'in_progress' && (
                            <p className="text-[10px] text-blue-500 animate-pulse">Processing...</p>
                          )}
                          {section.error && (
                            <p className="text-[10px] text-amber-600">Using original</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Action */}
                <div className="p-3 border-t border-gray-100 bg-white">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Loader2 className="w-3 h-3 animate-spin" style={{ color: themeColor }} />
                    <span className="truncate">{currentSection || 'Starting...'}</span>
                  </div>
                </div>
              </div>

              {/* Right: Live Resume Preview */}
              <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-gray-100 to-gray-50">
                {/* Preview Header */}
                <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
                    <span className="text-sm font-medium text-gray-700">Live Preview</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    Updating as sections complete
                  </span>
                </div>

                {/* Resume Preview with Reveal Animation */}
                <div
                  ref={progressiveContainerRef}
                  className="flex-1 overflow-auto p-4 sm:p-6"
                >
                  <div className="flex justify-center">
                    {/* Resume Container with Reveal Mask */}
                    <div
                      className="bg-white shadow-2xl relative overflow-hidden"
                      style={{
                        width: A4_WIDTH * resumeScale,
                        minHeight: A4_HEIGHT * resumeScale,
                        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px ${themeColor}20`,
                      }}
                    >
                      {/* The actual resume */}
                      <div
                        style={{
                          width: A4_WIDTH,
                          minHeight: A4_HEIGHT,
                          transform: `scale(${resumeScale})`,
                          transformOrigin: 'top left',
                        }}
                      >
                        <StyleOptionsProvider>
                          <StyleOptionsWrapper>
                            <InlineEditProvider resumeData={progressiveData as any} setResumeData={() => {}}>
                              <ResumeRenderer
                                resumeData={progressiveData}
                                templateId={templateId}
                                themeColors={themeColors}
                                editable={false}
                              />
                            </InlineEditProvider>
                          </StyleOptionsWrapper>
                        </StyleOptionsProvider>
                      </div>

                      {/* Reveal Overlay - slides down as sections complete */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
                        style={{
                          background: `linear-gradient(to bottom,
                            transparent ${revealHeight}%,
                            ${themeColor}08 ${revealHeight + 2}%,
                            ${themeColor}15 ${revealHeight + 5}%,
                            white ${revealHeight + 15}%
                          )`,
                        }}
                      />

                      {/* Scanning Line Effect */}
                      {progressPercentage < 100 && (
                        <div
                          className="absolute left-0 right-0 h-1 pointer-events-none transition-all duration-700"
                          style={{
                            top: `${revealHeight}%`,
                            background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                            boxShadow: `0 0 20px ${themeColor}`,
                          }}
                        />
                      )}

                      {/* Shimmer effect on unrevealed area */}
                      {progressPercentage < 100 && (
                        <div
                          className="absolute inset-0 pointer-events-none overflow-hidden"
                          style={{ top: `${revealHeight + 10}%` }}
                        >
                          <div
                            className="absolute inset-0 animate-shimmer"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${themeColor}10, transparent)`,
                              backgroundSize: '200% 100%',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comparing State - Side-by-Side */}
          {(status === 'comparing' || status === 'applying') && enhancementResult && (
            <div className="flex flex-col h-full min-h-0">
              {/* Mobile Tab Switcher */}
              <div className="md:hidden flex-shrink-0 px-2 pt-2 pb-1">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setMobileCompareTab('original')}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all",
                      mobileCompareTab === 'original'
                        ? "bg-white text-gray-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-600"
                    )}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Original
                  </button>
                  <button
                    onClick={() => setMobileCompareTab('enhanced')}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all",
                      mobileCompareTab === 'enhanced'
                        ? "text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-600"
                    )}
                    style={mobileCompareTab === 'enhanced' ? {
                      background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`
                    } : {}}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Enhanced
                  </button>
                </div>
              </div>

              {/* Resume Previews */}
              <div className="flex-1 flex gap-2 p-2 min-h-0">
                {/* Original Resume */}
                <div className={cn(
                  "flex-1 flex flex-col min-w-0 min-h-0",
                  "md:flex",
                  mobileCompareTab === 'original' ? "flex" : "hidden"
                )}>
                  <div className="hidden md:flex items-center justify-between mb-1.5 px-1">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-500 text-sm">Original</span>
                    </div>
                  </div>
                  <div
                    ref={originalContainerRef}
                    className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 min-h-0 relative"
                  >
                    <div
                      ref={originalScrollRef}
                      onScroll={() => handleScroll('original')}
                      className="absolute inset-0 overflow-auto p-4"
                    >
                      <div
                        className="bg-white shadow-sm"
                        style={{
                          width: A4_WIDTH * resumeScale,
                          minHeight: A4_HEIGHT * resumeScale,
                          margin: '0 auto',
                          overflow: 'hidden',
                          opacity: 0.85,
                        }}
                      >
                        <div
                          style={{
                            width: A4_WIDTH,
                            minHeight: A4_HEIGHT,
                            transform: `scale(${resumeScale})`,
                            transformOrigin: 'top left',
                          }}
                        >
                          <StyleOptionsProvider>
                            <StyleOptionsWrapper>
                              <InlineEditProvider resumeData={resumeData as any} setResumeData={() => {}}>
                                <ResumeRenderer
                                  resumeData={resumeData}
                                  templateId={templateId}
                                  themeColors={themeColors}
                                  editable={false}
                                />
                              </InlineEditProvider>
                            </StyleOptionsWrapper>
                          </StyleOptionsProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Divider with Arrow */}
                <div className="hidden md:flex flex-col items-center justify-center">
                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg my-2"
                    style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Enhanced Resume */}
                <div className={cn(
                  "flex-1 flex flex-col min-w-0 min-h-0",
                  "md:flex",
                  mobileCompareTab === 'enhanced' ? "flex" : "hidden"
                )}>
                  <div className="hidden md:flex items-center justify-between mb-1.5 px-1">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
                      <span className="font-semibold text-sm" style={{ color: themeColor }}>Enhanced</span>
                    </div>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5"
                      style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      AI Enhanced
                    </span>
                  </div>
                  <div
                    ref={enhancedContainerRef}
                    className="flex-1 rounded-lg overflow-hidden min-h-0 relative"
                    style={{
                      backgroundColor: `${themeColor}03`,
                      border: `2px solid ${themeColor}40`,
                      boxShadow: `0 0 30px ${themeColor}12`
                    }}
                  >
                    <div
                      ref={enhancedScrollRef}
                      onScroll={() => handleScroll('enhanced')}
                      className="absolute inset-0 overflow-auto p-4"
                    >
                      <div
                        className="bg-white shadow-lg animate-in fade-in duration-500"
                        style={{
                          width: A4_WIDTH * resumeScale,
                          minHeight: A4_HEIGHT * resumeScale,
                          margin: '0 auto',
                          overflow: 'hidden',
                          boxShadow: `0 0 0 2px ${themeColor}20, 0 10px 30px -5px rgba(0,0,0,0.12)`
                        }}
                      >
                        <div
                          style={{
                            width: A4_WIDTH,
                            minHeight: A4_HEIGHT,
                            transform: `scale(${resumeScale})`,
                            transformOrigin: 'top left',
                          }}
                        >
                          <StyleOptionsProvider>
                            <StyleOptionsWrapper>
                              <InlineEditProvider resumeData={enhancementResult.data as any} setResumeData={() => {}}>
                                <ResumeRenderer
                                  resumeData={enhancementResult.data}
                                  templateId={templateId}
                                  themeColors={themeColors}
                                  editable={false}
                                />
                              </InlineEditProvider>
                            </StyleOptionsWrapper>
                          </StyleOptionsProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggested Skills */}
              {enhancementResult.suggestedSkills && enhancementResult.suggestedSkills.length > 0 && (
                <div className="px-2 sm:px-3 py-1.5 border-t border-gray-100 flex items-center gap-1.5 sm:gap-2 flex-shrink-0 bg-gray-50/50">
                  <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" style={{ color: themeColor }} />
                  <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0 hidden sm:inline">Add Skills:</span>
                  <div className="flex gap-1 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
                    {enhancementResult.suggestedSkills.map(skill => (
                      <button
                        key={skill.id}
                        onClick={() => {
                          if (status === 'applying') return;
                          setAcceptSuggestedSkills(prev => {
                            const next = new Set(prev);
                            if (next.has(skill.id)) {
                              next.delete(skill.id);
                            } else {
                              next.add(skill.id);
                            }
                            return next;
                          });
                        }}
                        disabled={status === 'applying'}
                        className={cn(
                          "inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap",
                          acceptSuggestedSkills.has(skill.id)
                            ? ""
                            : "bg-white border border-gray-200 hover:border-gray-300 text-gray-600"
                        )}
                        style={acceptSuggestedSkills.has(skill.id) ? {
                          backgroundColor: `${themeColor}15`,
                          border: `1px solid ${themeColor}`,
                          color: themeColor
                        } : {}}
                        title={skill.reason}
                      >
                        {acceptSuggestedSkills.has(skill.id) ? (
                          <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                        ) : (
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm border border-gray-300" />
                        )}
                        {skill.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="text-center py-8 sm:py-12 px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Enhancement Failed
              </h3>
              <p className="text-xs sm:text-sm text-red-600 mb-4 sm:mb-6 max-w-sm mx-auto">
                {error}
              </p>
              <Button
                onClick={handleEnhance}
                className="gap-2 w-full sm:w-auto"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
                }}
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {(status === 'comparing') && (
          <div
            className="px-3 py-2 sm:px-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${themeColor}04, white)`,
              borderColor: `${themeColor}12`
            }}
          >
            <div className="hidden sm:flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {sections.filter(s => s.status === 'success').length} sections enhanced
              </span>
              {acceptSuggestedSkills.size > 0 && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: `${themeColor}10`,
                    color: themeColor
                  }}
                >
                  <Check className="w-3 h-3" />
                  +{acceptSuggestedSkills.size} skill{acceptSuggestedSkills.size !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-sm h-9"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1 sm:flex-none gap-1 sm:gap-1.5 px-3 sm:px-5 py-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] rounded-lg text-sm h-9"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="truncate">Apply Enhancements</span>
                <ChevronRight className="w-3.5 h-3.5 hidden sm:block" />
              </Button>
            </div>
          </div>
        )}

        {/* Applying Footer */}
        {status === 'applying' && (
          <div
            className="px-4 py-3 sm:px-8 sm:py-5 border-t flex items-center justify-center gap-2 sm:gap-3"
            style={{
              background: `linear-gradient(135deg, ${themeColor}06, ${themeColor}02)`,
              borderColor: `${themeColor}15`
            }}
          >
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" style={{ color: themeColor }} />
            <span className="font-medium text-sm sm:text-base" style={{ color: themeColor }}>
              Applying enhancements...
            </span>
          </div>
        )}
      </div>

      {/* Add shimmer animation CSS */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default EnhanceWithAIModal;
