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
  CheckCircle,
  Check,
  Zap,
  FileText,
  AlertCircle,
  RotateCcw,
  Lightbulb,
  Eye,
  ChevronRight,
  Target,
  Award,
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

  // Refs for synchronized scrolling
  const originalScrollRef = useRef<HTMLDivElement>(null);
  const enhancedScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingSyncRef = useRef<boolean>(false);

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
      const response = await apiFetch(API_ENDPOINTS.enhanceResume, {
        method: 'POST',
        body: JSON.stringify({ resumeData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to enhance resume');
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
      setError(err instanceof Error ? err.message : 'Failed to enhance resume');
      setStatus('error');
    }
  }, [resumeData]);

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

      {/* Modal - Full screen for comparison, smaller for other states */}
      <div className={cn(
        "relative bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col",
        status === 'comparing' || status === 'applying'
          ? "w-[95vw] h-[95vh] max-w-[1800px]"
          : "w-full max-w-2xl"
      )}>
        {/* Header - Compact for comparing state */}
        <div
          className={cn(
            "flex items-center justify-between border-b flex-shrink-0",
            status === 'comparing' || status === 'applying' ? "px-4 py-2" : "px-8 py-5"
          )}
          style={{
            background: `linear-gradient(135deg, ${themeColor}06 0%, ${themeColor}12 100%)`,
            borderColor: `${themeColor}15`
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "rounded-xl flex items-center justify-center shadow-lg",
                status === 'comparing' || status === 'applying' ? "w-10 h-10" : "w-14 h-14"
              )}
              style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}
            >
              <Sparkles className={status === 'comparing' || status === 'applying' ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
            </div>
            <div>
              <h2 className={cn(
                "font-bold text-gray-900",
                status === 'comparing' || status === 'applying' ? "text-base" : "text-xl"
              )}>
                {status === 'idle' && 'Enhance with AI'}
                {status === 'enhancing' && 'AI Enhancement in Progress'}
                {status === 'comparing' && 'Review Enhancements'}
                {status === 'applying' && 'Applying Changes...'}
                {status === 'error' && 'Enhancement Failed'}
              </h2>
              {(status !== 'comparing' && status !== 'applying') && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {status === 'idle' && 'Transform your resume with AI-powered improvements'}
                  {status === 'enhancing' && 'Please wait while we optimize your resume'}
                  {status === 'error' && 'Something went wrong'}
                </p>
              )}
            </div>
          </div>
          {status !== 'applying' && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-gray-400 hover:text-gray-600 transition-colors border border-transparent hover:border-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Idle State - Compact Elegant Design */}
          {status === 'idle' && (
            <div className="px-6 py-6">
              {/* Hero Section */}
              <div className="text-center mb-6">
                {/* Icon */}
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`,
                    boxShadow: `0 8px 24px ${themeColor}30`
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Transform Your Resume
                </h3>
                <p className="text-sm text-gray-500">
                  AI-powered improvements for a professional, ATS-optimized resume
                </p>
              </div>

              {/* Features Grid - Compact Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  {
                    icon: <FileText className="w-4 h-4" />,
                    label: 'Summary',
                    desc: 'Compelling 3-line hook',
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    icon: <Zap className="w-4 h-4" />,
                    label: 'Experience',
                    desc: 'Skill-matched bullets',
                    gradient: 'from-primary to-blue-500'
                  },
                  {
                    icon: <Target className="w-4 h-4" />,
                    label: 'ATS Keywords',
                    desc: 'Industry-specific terms',
                    gradient: 'from-emerald-500 to-teal-500'
                  },
                  {
                    icon: <Award className="w-4 h-4" />,
                    label: 'Skills',
                    desc: 'Smart suggestions',
                    gradient: 'from-orange-500 to-amber-500'
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group relative p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm flex-shrink-0`}
                      >
                        <div className="text-white">{item.icon}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                        <div className="text-xs text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <Button
                  onClick={handleEnhance}
                  className="group relative px-8 py-5 gap-2 text-sm font-semibold rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
                    boxShadow: `0 4px 16px ${themeColor}30`
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Sparkles className="w-4 h-4 relative" />
                  <span className="relative">Enhance My Resume</span>
                </Button>

                <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Preview first
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    ~15 seconds
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Enhancing State */}
          {status === 'enhancing' && (
            <div className="text-center py-12">
              <div className="relative w-28 h-28 mx-auto mb-8">
                {/* Animated gradient rings */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-15"
                  style={{ backgroundColor: themeColor }}
                />
                <div
                  className="absolute inset-3 rounded-full animate-pulse opacity-20"
                  style={{ backgroundColor: themeColor }}
                />
                <div
                  className="absolute inset-6 rounded-full animate-pulse opacity-30"
                  style={{ backgroundColor: themeColor }}
                />
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}
                >
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Enhancing Your Resume
              </h3>

              <div className="h-8 flex items-center justify-center mb-6">
                <TypewriterText
                  text={progressMessage}
                  speed={40}
                  className="text-gray-600"
                />
              </div>

              {/* Progress bar */}
              <div className="w-72 mx-auto h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${((progressIndex + 1) / PROGRESS_MESSAGES.length) * 100}%`,
                    background: `linear-gradient(90deg, ${themeColor}, ${themeColor}bb)`,
                  }}
                />
              </div>

              <p className="text-sm text-gray-400 mt-5">
                This usually takes 10-15 seconds
              </p>
            </div>
          )}

          {/* Comparing State - Full Resume Preview Side-by-Side */}
          {(status === 'comparing' || status === 'applying') && enhancementResult && (
            <div className="flex flex-col h-full min-h-0">
              {/* Side-by-Side Resume Previews - MAXIMUM SPACE */}
              <div className="flex-1 flex gap-2 p-2 min-h-0">
                {/* Original Resume */}
                <div className="flex-1 flex flex-col min-w-0 min-h-0">
                  {/* Header - Minimal */}
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-500 text-sm">Original</span>
                    </div>
                  </div>
                  {/* Resume Container - Full height */}
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 min-h-0 relative">
                    <div
                      ref={originalScrollRef}
                      onScroll={() => handleScroll('original')}
                      className="absolute inset-0 overflow-y-auto"
                    >
                      <div className="p-1 min-h-full flex justify-center">
                        <div
                          className="bg-white shadow-sm flex-shrink-0 opacity-70"
                          style={{ width: '100%' }}
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

                {/* Center Divider - Minimal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-md my-1"
                    style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Enhanced Resume */}
                <div className="flex-1 flex flex-col min-w-0 min-h-0">
                  {/* Header - Minimal with badge */}
                  <div className="flex items-center justify-between mb-1.5 px-1">
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
                  {/* Resume Container - Highlighted, Full height */}
                  <div
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
                      className="absolute inset-0 overflow-y-auto"
                    >
                      <div className="p-1 min-h-full flex justify-center">
                        <div
                          className="bg-white shadow-lg flex-shrink-0"
                          style={{
                            width: '100%',
                            boxShadow: `0 0 0 2px ${themeColor}20, 0 10px 30px -5px rgba(0,0,0,0.12)`
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

              {/* Suggested Skills - Single line at bottom, only if present */}
              {enhancementResult.suggestedSkills && enhancementResult.suggestedSkills.length > 0 && (
                <div className="px-3 py-1.5 border-t border-gray-100 flex items-center gap-2 flex-shrink-0 bg-gray-50/50">
                  <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" style={{ color: themeColor }} />
                  <span className="text-xs text-gray-500 flex-shrink-0">Skills:</span>
                  <div className="flex gap-1 flex-1 min-w-0 overflow-x-auto">
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
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-all whitespace-nowrap",
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
                          <Check className="w-2.5 h-2.5" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-sm border border-gray-300" />
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
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Enhancement Failed
              </h3>
              <p className="text-sm text-red-600 mb-6 max-w-sm mx-auto">
                {error}
              </p>
              <Button
                onClick={handleEnhance}
                className="gap-2"
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

        {/* Footer - Compact Action Buttons */}
        {(status === 'comparing') && (
          <div
            className="px-4 py-2 border-t flex items-center justify-between flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${themeColor}04, white)`,
              borderColor: `${themeColor}12`
            }}
          >
            <div className="text-sm text-gray-500">
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
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onClose} className="px-4 py-2 rounded-lg text-sm h-9">
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                className="gap-1.5 px-5 py-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] rounded-lg text-sm h-9"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Apply Enhancements
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* Applying Footer */}
        {status === 'applying' && (
          <div
            className="px-8 py-5 border-t flex items-center justify-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${themeColor}06, ${themeColor}02)`,
              borderColor: `${themeColor}15`
            }}
          >
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: themeColor }} />
            <span className="font-medium" style={{ color: themeColor }}>
              Applying enhancements to your resume...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhanceWithAIModal;
