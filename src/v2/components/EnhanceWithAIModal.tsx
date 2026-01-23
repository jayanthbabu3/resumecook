/**
 * Enhance with AI Modal - Full Side-by-Side Resume Comparison
 *
 * Shows a visual comparison of the original vs enhanced resume,
 * using actual A4-style resume previews side-by-side.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { V2ResumeData } from '../types';
import { API_ENDPOINTS, apiFetch } from '../../config/api';
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
  /** Template ID for rendering the resume preview */
  templateId?: string;
  /** Theme colors for the resume (primary/secondary) */
  themeColors?: { primary?: string; secondary?: string };
}

type EnhancementStatus = 'idle' | 'enhancing' | 'comparing' | 'applying' | 'error';

interface EnhancementResult {
  data: V2ResumeData;
  enhancements: {
    summary?: string;
    experience?: string;
    projects?: string;
    overall?: string;
  };
  suggestedSkills?: Array<{
    id: string;
    name: string;
    category: string;
    reason: string;
  }>;
}

// Typing effect hook for smooth text animation
const useTypingEffect = (text: string, speed: number = 30, enabled: boolean = true) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    setDisplayText('');
    setIsComplete(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayText, isComplete };
};

// Progress messages during enhancement
const PROGRESS_MESSAGES = [
  "Analyzing your resume structure...",
  "Identifying your key achievements...",
  "Crafting compelling summary...",
  "Writing role descriptions...",
  "Enhancing experience bullet points...",
  "Adding powerful action verbs...",
  "Optimizing for ATS systems...",
  "Polishing final details...",
];

// TypewriterText component
const TypewriterText: React.FC<{ text: string; speed?: number; className?: string }> = ({
  text,
  speed = 30,
  className
}) => {
  const { displayText, isComplete } = useTypingEffect(text, speed, true);
  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};


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
  const [progressMessage, setProgressMessage] = useState(PROGRESS_MESSAGES[0]);
  const [progressIndex, setProgressIndex] = useState(0);
  const [acceptSuggestedSkills, setAcceptSuggestedSkills] = useState<Set<string>>(new Set());
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // User customization options
  const [additionalContext, setAdditionalContext] = useState('');

  // Mobile tab state for comparing view
  const [mobileCompareTab, setMobileCompareTab] = useState<'original' | 'enhanced'>('enhanced');

  // Refs for synchronized scrolling
  const originalScrollRef = useRef<HTMLDivElement>(null);
  const enhancedScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingSyncRef = useRef<boolean>(false);
  const originalContainerRef = useRef<HTMLDivElement>(null);
  const enhancedContainerRef = useRef<HTMLDivElement>(null);
  const [resumeScale, setResumeScale] = useState(0.5);

  // A4 dimensions at 96dpi
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;

  // Calculate scale based on container width for optimal fit
  useEffect(() => {
    if (status !== 'comparing' && status !== 'applying') return;

    const calculateScale = () => {
      const container = originalContainerRef.current;
      if (!container) {
        // Default scale if container not available
        setResumeScale(0.65);
        return;
      }

      // Get container width minus padding (32px total for p-4)
      const availableWidth = container.clientWidth - 32;

      // Calculate scale to fit width with some margin (20px on each side)
      const optimalScale = Math.min((availableWidth - 40) / A4_WIDTH, 0.85);

      // Ensure minimum readable scale
      const finalScale = Math.max(optimalScale, 0.5);

      setResumeScale(finalScale);
    };

    // Initial calculation
    calculateScale();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateScale);
    if (originalContainerRef.current) {
      resizeObserver.observe(originalContainerRef.current);
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

    // Reset flag after a short delay to prevent infinite loops
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
      setProgressIndex(0);
      setAcceptSuggestedSkills(new Set());
      setAdditionalContext('');
      setMobileCompareTab('enhanced');
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  }, [isOpen]);

  // Progress message animation
  useEffect(() => {
    if (status === 'enhancing') {
      progressIntervalRef.current = setInterval(() => {
        setProgressIndex(prev => {
          const next = (prev + 1) % PROGRESS_MESSAGES.length;
          setProgressMessage(PROGRESS_MESSAGES[next]);
          return next;
        });
      }, 2500);
      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [status]);

  const handleEnhance = useCallback(async () => {
    setStatus('enhancing');
    setError(null);
    setProgressIndex(0);
    setProgressMessage(PROGRESS_MESSAGES[0]);

    try {
      // Build options from user customization
      const options: { additionalContext?: string } = {};

      if (additionalContext.trim()) {
        options.additionalContext = additionalContext.trim();
      }

      const response = await apiFetch(API_ENDPOINTS.enhanceResume, {
        method: 'POST',
        body: JSON.stringify({ resumeData, options }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle error object or string
        const errorMessage = typeof result.error === 'object'
          ? result.error?.message || result.message || 'Failed to enhance resume'
          : result.error || result.message || 'Failed to enhance resume';
        throw new Error(errorMessage);
      }

      if (result.success && result.data) {
        setEnhancementResult({
          data: result.data,
          enhancements: result.enhancements || {},
          suggestedSkills: result.suggestedSkills || [],
        });
        setStatus('comparing');
      } else {
        throw new Error('Invalid response from enhancement service');
      }
    } catch (err) {
      console.error('Enhancement error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to enhance resume';

      // Create user-friendly error messages for subscription errors
      let userFriendlyError: string;
      if (errorMessage.includes('subscription required') || errorMessage.includes('Active subscription')) {
        userFriendlyError = 'This feature requires an active subscription. Please upgrade to Pro to use AI enhancement.';
      } else if (errorMessage.includes('Trial has expired')) {
        userFriendlyError = 'Your trial has expired. Please upgrade to Pro to continue using AI features.';
      } else {
        userFriendlyError = errorMessage;
      }

      setError(userFriendlyError);
      setStatus('error');
    }
  }, [resumeData, additionalContext]);

  // Apply enhancements
  const handleApply = async () => {
    if (!enhancementResult) return;

    setStatus('applying');

    // Brief delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 800));

    // Build final data with suggested skills if accepted
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={status === 'applying' ? undefined : onClose}
      />

      {/* Modal */}
      <div className={cn(
        "relative bg-white shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col",
        status === 'comparing' || status === 'applying'
          ? "w-full h-full sm:w-[95vw] sm:h-[95vh] sm:max-w-[1800px] rounded-none sm:rounded-2xl"
          : "w-full max-w-md rounded-xl max-h-[90vh]"
      )}>
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between flex-shrink-0 border-b",
            status === 'comparing' || status === 'applying'
              ? "px-3 py-2 sm:px-4"
              : "px-4 py-3"
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
              {status === 'enhancing' && 'Enhancing...'}
              {status === 'comparing' && 'Review Changes'}
              {status === 'applying' && 'Applying...'}
              {status === 'error' && 'Error'}
            </h2>
          </div>
          {status !== 'applying' && (
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Idle State - Simple Clean Flow */}
          {status === 'idle' && (
            <div className="px-6 py-5">
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                AI will enhance your <span className="font-medium" style={{ color: themeColor }}>summary</span>, <span className="font-medium" style={{ color: themeColor }}>experience bullet points</span>, and <span className="font-medium" style={{ color: themeColor }}>skills</span> with stronger action verbs and ATS-optimized keywords.
              </p>

              {/* Context Input */}
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

              {/* CTA Button */}
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

          {/* Enhancing State */}
          {status === 'enhancing' && (
            <div className="text-center py-8 sm:py-12 px-4">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8">
                {/* Animated gradient rings */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-15"
                  style={{ backgroundColor: themeColor }}
                />
                <div
                  className="absolute inset-2 sm:inset-3 rounded-full animate-pulse opacity-20"
                  style={{ backgroundColor: themeColor }}
                />
                <div
                  className="absolute inset-4 sm:inset-6 rounded-full animate-pulse opacity-30"
                  style={{ backgroundColor: themeColor }}
                />
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Enhancing Your Resume
              </h3>

              <div className="h-6 sm:h-8 flex items-center justify-center mb-4 sm:mb-6">
                <TypewriterText
                  text={progressMessage}
                  speed={40}
                  className="text-gray-600 text-sm sm:text-base"
                />
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-[288px] mx-auto h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${((progressIndex + 1) / PROGRESS_MESSAGES.length) * 100}%`,
                    background: `linear-gradient(90deg, ${themeColor}, ${themeColor}bb)`,
                  }}
                />
              </div>

              <p className="text-xs sm:text-sm text-gray-400 mt-4 sm:mt-5">
                This usually takes 10-15 seconds
              </p>
            </div>
          )}

          {/* Comparing State - Full Resume Preview Side-by-Side (Desktop) / Tabbed (Mobile) */}
          {(status === 'comparing' || status === 'applying') && enhancementResult && (
            <div className="flex flex-col h-full min-h-0">
              {/* Mobile Tab Switcher - Only visible on mobile */}
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

              {/* Resume Previews Container */}
              <div className="flex-1 flex gap-2 p-2 min-h-0">
                {/* Original Resume - Hidden on mobile when Enhanced tab is active */}
                <div className={cn(
                  "flex-1 flex flex-col min-w-0 min-h-0",
                  "md:flex",
                  mobileCompareTab === 'original' ? "flex" : "hidden"
                )}>
                  {/* Header - Minimal, hidden on mobile (tab already shows which view) */}
                  <div className="hidden md:flex items-center justify-between mb-1.5 px-1">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-500 text-sm">Original</span>
                    </div>
                  </div>
                  {/* Resume Container - Scrollable scaled preview */}
                  <div
                    ref={originalContainerRef}
                    className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 min-h-0 relative"
                  >
                    <div
                      ref={originalScrollRef}
                      onScroll={() => handleScroll('original')}
                      className="absolute inset-0 overflow-auto p-4"
                    >
                      {/* Resume wrapper with scale transform */}
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

                {/* Center Divider - Hidden on mobile */}
                <div className="hidden md:flex flex-col items-center justify-center">
                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-md my-1"
                    style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Enhanced Resume - Hidden on mobile when Original tab is active */}
                <div className={cn(
                  "flex-1 flex flex-col min-w-0 min-h-0",
                  "md:flex",
                  mobileCompareTab === 'enhanced' ? "flex" : "hidden"
                )}>
                  {/* Header - Minimal with badge, hidden on mobile */}
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
                      AI
                    </span>
                  </div>
                  {/* Resume Container - Highlighted, Scrollable scaled preview */}
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
                      {/* Resume wrapper with scale transform */}
                      <div
                        className="bg-white shadow-lg"
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

              {/* Suggested Skills - Scrollable on mobile, only if present */}
              {enhancementResult.suggestedSkills && enhancementResult.suggestedSkills.length > 0 && (
                <div className="px-2 sm:px-3 py-1.5 border-t border-gray-100 flex items-center gap-1.5 sm:gap-2 flex-shrink-0 bg-gray-50/50">
                  <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" style={{ color: themeColor }} />
                  <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0 hidden sm:inline">Skills:</span>
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

        {/* Footer - Compact Action Buttons, Responsive */}
        {(status === 'comparing') && (
          <div
            className="px-3 py-2 sm:px-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${themeColor}04, white)`,
              borderColor: `${themeColor}12`
            }}
          >
            {/* Skills badge - hidden on mobile if no skills selected */}
            <div className="hidden sm:block text-sm text-gray-500">
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
            {/* Action Buttons - Stack on mobile */}
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
    </div>
  );
};

export default EnhanceWithAIModal;
