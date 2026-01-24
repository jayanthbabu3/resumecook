/**
 * Enhance with AI Modal - Section by Section
 *
 * Simple approach:
 * 1. Call API for each enabled section one at a time
 * 2. Show real progress as each section completes
 * 3. Show comparison when all done
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
  CheckCircle2,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Target,
  Heart,
  BookOpen,
  Users,
  Trophy,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { V2ResumeData } from '../types';
import { API_BASE_URL, getApiHeaders } from '../../config/api';
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
  enabledSections: string[];
}

type ModalStatus = 'idle' | 'enhancing' | 'comparing' | 'applying' | 'error';
type SectionStatus = 'pending' | 'in_progress' | 'complete' | 'error';

interface SectionProgress {
  id: string;
  label: string;
  status: SectionStatus;
  dataKey: string;
}

// Section config
const SECTION_CONFIG: Record<string, { label: string; icon: React.ElementType; dataKey: keyof V2ResumeData }> = {
  summary: { label: 'Summary', icon: FileText, dataKey: 'personalInfo' },
  experience: { label: 'Experience', icon: Briefcase, dataKey: 'experience' },
  education: { label: 'Education', icon: GraduationCap, dataKey: 'education' },
  skills: { label: 'Skills', icon: Code, dataKey: 'skills' },
  projects: { label: 'Projects', icon: Code, dataKey: 'projects' },
  certifications: { label: 'Certifications', icon: Award, dataKey: 'certifications' },
  achievements: { label: 'Achievements', icon: Trophy, dataKey: 'achievements' },
  strengths: { label: 'Strengths', icon: Target, dataKey: 'strengths' },
  languages: { label: 'Languages', icon: Globe, dataKey: 'languages' },
  volunteer: { label: 'Volunteer', icon: Heart, dataKey: 'volunteer' },
  publications: { label: 'Publications', icon: BookOpen, dataKey: 'publications' },
  awards: { label: 'Awards', icon: Trophy, dataKey: 'awards' },
  interests: { label: 'Interests', icon: Users, dataKey: 'interests' },
};

export const EnhanceWithAIModal: React.FC<EnhanceWithAIModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onApplyEnhancements,
  themeColor = WEBSITE_PRIMARY_COLOR,
  templateId = 'executive-split-v2',
  themeColors,
  enabledSections,
}) => {
  const [status, setStatus] = useState<ModalStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [enhancedData, setEnhancedData] = useState<V2ResumeData | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<Array<{ id: string; name: string; category: string; reason: string }>>([]);
  const [acceptedSkills, setAcceptedSkills] = useState<Set<string>>(new Set());
  const [additionalContext, setAdditionalContext] = useState('');
  const [mobileTab, setMobileTab] = useState<'original' | 'enhanced'>('enhanced');
  const [sectionProgress, setSectionProgress] = useState<SectionProgress[]>([]);

  const abortRef = useRef(false);
  const originalScrollRef = useRef<HTMLDivElement>(null);
  const enhancedScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;

  // Calculate scale
  useEffect(() => {
    if (status !== 'comparing' && status !== 'applying') return;
    const calc = () => {
      if (!containerRef.current) return setScale(0.65);
      const w = containerRef.current.clientWidth - 32;
      setScale(Math.max(Math.min((w - 40) / A4_WIDTH, 0.85), 0.5));
    };
    calc();
    const obs = new ResizeObserver(calc);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [status]);

  // Sync scroll
  const syncScroll = useCallback((src: 'original' | 'enhanced') => {
    const from = src === 'original' ? originalScrollRef : enhancedScrollRef;
    const to = src === 'original' ? enhancedScrollRef : originalScrollRef;
    if (from.current && to.current) to.current.scrollTop = from.current.scrollTop;
  }, []);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      abortRef.current = true;
      setStatus('idle');
      setError(null);
      setEnhancedData(null);
      setSuggestedSkills([]);
      setAcceptedSkills(new Set());
      setAdditionalContext('');
      setMobileTab('enhanced');
      setSectionProgress([]);
    }
  }, [isOpen]);

  // Get sections to enhance (only those with data)
  const getSectionsToEnhance = useCallback((): SectionProgress[] => {
    const sections: SectionProgress[] = [];

    for (const sectionId of enabledSections) {
      if (sectionId === 'header') continue; // Skip header, we handle summary separately

      const config = SECTION_CONFIG[sectionId];
      if (!config) continue;

      // Check if section has data
      if (sectionId === 'summary') {
        if (resumeData.personalInfo?.summary) {
          sections.push({ id: 'summary', label: 'Summary', status: 'pending', dataKey: 'personalInfo' });
        }
      } else {
        const data = resumeData[config.dataKey];
        if (Array.isArray(data) && data.length > 0) {
          sections.push({ id: sectionId, label: config.label, status: 'pending', dataKey: config.dataKey });
        }
      }
    }

    return sections;
  }, [enabledSections, resumeData]);

  // Enhance a single section
  const enhanceSection = async (sectionType: string, sectionData: any, context?: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/enhance-sections/section`, {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify({ sectionType, sectionData, context }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || err.message || 'Enhancement failed');
    }

    const result = await response.json();
    return result.data;
  };

  // Main enhance function - section by section
  const handleEnhance = useCallback(async () => {
    setStatus('enhancing');
    setError(null);
    abortRef.current = false;

    const sections = getSectionsToEnhance();
    setSectionProgress(sections);

    // Start with original data
    const result: V2ResumeData = JSON.parse(JSON.stringify(resumeData));
    const context = additionalContext.trim() ? { additionalContext: additionalContext.trim() } : undefined;

    try {
      // Process each section one by one
      for (let i = 0; i < sections.length; i++) {
        if (abortRef.current) return;

        const section = sections[i];

        // Mark as in progress
        setSectionProgress(prev => prev.map((s, idx) =>
          idx === i ? { ...s, status: 'in_progress' } : s
        ));

        try {
          if (section.id === 'summary') {
            // Enhance summary
            const enhanced = await enhanceSection('summary', resumeData.personalInfo?.summary, context);
            if (typeof enhanced === 'string') {
              result.personalInfo = { ...result.personalInfo, summary: enhanced };
            }
          } else {
            // Enhance array section
            const dataKey = section.dataKey as keyof V2ResumeData;
            const data = resumeData[dataKey];
            if (Array.isArray(data) && data.length > 0) {
              const enhanced = await enhanceSection(section.id, data, context);
              if (Array.isArray(enhanced)) {
                (result as any)[dataKey] = enhanced;
              }
            }
          }

          // Mark as complete
          setSectionProgress(prev => prev.map((s, idx) =>
            idx === i ? { ...s, status: 'complete' } : s
          ));

        } catch (err) {
          console.error(`Error enhancing ${section.id}:`, err);
          // Mark as error but continue with others
          setSectionProgress(prev => prev.map((s, idx) =>
            idx === i ? { ...s, status: 'error' } : s
          ));
        }
      }

      if (abortRef.current) return;

      // Get suggested skills
      try {
        const skillsResponse = await fetch(`${API_BASE_URL}/api/enhance-sections/suggest-skills`, {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify({
            currentSkills: resumeData.skills || [],
            experience: resumeData.experience || [],
            targetRole: additionalContext.trim() || undefined,
          }),
        });
        if (skillsResponse.ok) {
          const skillsResult = await skillsResponse.json();
          setSuggestedSkills(skillsResult.data || []);
        }
      } catch (e) {
        // Ignore skill suggestions error
      }

      setEnhancedData(result);
      setStatus('comparing');

    } catch (err) {
      console.error('Enhancement error:', err);
      const msg = err instanceof Error ? err.message : 'Enhancement failed';

      // User-friendly messages
      let userMsg = msg;
      if (msg.includes('subscription') || msg.includes('Subscription')) {
        userMsg = 'This feature requires an active subscription. Please upgrade to Pro.';
      } else if (msg.includes('Trial')) {
        userMsg = 'Your trial has expired. Please upgrade to Pro.';
      }

      setError(userMsg);
      setStatus('error');
    }
  }, [resumeData, additionalContext, getSectionsToEnhance]);

  // Apply enhancements
  const handleApply = async () => {
    if (!enhancedData) return;

    setStatus('applying');
    await new Promise(r => setTimeout(r, 300));

    let final = { ...enhancedData };

    // Add accepted suggested skills
    if (acceptedSkills.size > 0) {
      const newSkills = suggestedSkills
        .filter(s => acceptedSkills.has(s.id))
        .map(s => ({ id: s.id, name: s.name, category: s.category }));
      final.skills = [...(final.skills || []), ...newSkills];
    }

    onApplyEnhancements(final, true);
    onClose();
  };

  if (!isOpen) return null;

  const sectionsToShow = getSectionsToEnhance();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={status === 'applying' || status === 'enhancing' ? undefined : onClose}
      />

      <div className={cn(
        "relative bg-white shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col",
        status === 'comparing' || status === 'applying'
          ? "w-full h-full sm:w-[95vw] sm:h-[95vh] sm:max-w-[1800px] rounded-none sm:rounded-2xl"
          : "w-full max-w-md rounded-xl max-h-[90vh]"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 border-b border-gray-100 px-3 py-2 sm:px-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: themeColor }}>
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
          {status !== 'applying' && status !== 'enhancing' && (
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          {/* Idle State */}
          {status === 'idle' && (
            <div className="px-6 py-5 overflow-y-auto h-full">
              <p className="text-sm text-gray-600 mb-5">
                AI will enhance your resume section by section with stronger language and ATS-optimized keywords.
              </p>

              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs font-medium text-blue-700 mb-2">Sections to enhance ({sectionsToShow.length}):</p>
                <div className="flex flex-wrap gap-1.5">
                  {sectionsToShow.map(s => (
                    <span key={s.id} className="px-2 py-0.5 bg-white rounded text-xs text-blue-600 border border-blue-200">
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Target role <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer at Google"
                  className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none border-gray-200"
                  rows={2}
                />
              </div>

              <Button
                onClick={handleEnhance}
                disabled={sectionsToShow.length === 0}
                className="w-full py-3 gap-2 text-[15px] font-semibold rounded-lg"
                style={{ backgroundColor: themeColor, color: 'white' }}
              >
                <Sparkles className="w-4 h-4" />
                Enhance {sectionsToShow.length} Section{sectionsToShow.length !== 1 ? 's' : ''}
              </Button>

              <p className="text-center text-xs text-gray-400 mt-3">You'll preview changes before applying</p>
            </div>
          )}

          {/* Enhancing State */}
          {status === 'enhancing' && (
            <div className="flex flex-col items-center justify-center py-8 px-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${themeColor}15` }}>
                <Loader2 className="w-7 h-7 animate-spin" style={{ color: themeColor }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Enhancing Your Resume</h3>
              <p className="text-sm text-gray-500 mb-5">Processing each section...</p>

              <div className="w-full max-w-xs space-y-2">
                {sectionProgress.map(section => {
                  const config = SECTION_CONFIG[section.id];
                  const Icon = config?.icon || FileText;
                  return (
                    <div
                      key={section.id}
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-lg transition-all",
                        section.status === 'in_progress' && "bg-blue-50 border border-blue-200",
                        section.status === 'complete' && "bg-emerald-50 border border-emerald-200",
                        section.status === 'error' && "bg-red-50 border border-red-200",
                        section.status === 'pending' && "bg-gray-50"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-md flex items-center justify-center",
                        section.status === 'in_progress' && "bg-blue-100",
                        section.status === 'complete' && "bg-emerald-100",
                        section.status === 'error' && "bg-red-100",
                        section.status === 'pending' && "bg-gray-100"
                      )}>
                        {section.status === 'complete' && <Check className="w-4 h-4 text-emerald-600" />}
                        {section.status === 'in_progress' && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
                        {section.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                        {section.status === 'pending' && <Icon className="w-4 h-4 text-gray-400" />}
                      </div>
                      <span className={cn(
                        "text-sm font-medium flex-1",
                        section.status === 'in_progress' && "text-blue-700",
                        section.status === 'complete' && "text-emerald-700",
                        section.status === 'error' && "text-red-600",
                        section.status === 'pending' && "text-gray-500"
                      )}>
                        {section.label}
                      </span>
                      {section.status === 'complete' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Comparing State */}
          {(status === 'comparing' || status === 'applying') && enhancedData && (
            <div className="flex flex-col h-full min-h-0">
              {/* Mobile tabs */}
              <div className="md:hidden flex-shrink-0 px-2 pt-2 pb-1">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setMobileTab('original')}
                    className={cn("flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium",
                      mobileTab === 'original' ? "bg-white text-gray-700 shadow-sm" : "text-gray-500"
                    )}
                  >
                    <FileText className="w-3.5 h-3.5" /> Original
                  </button>
                  <button
                    onClick={() => setMobileTab('enhanced')}
                    className={cn("flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium",
                      mobileTab === 'enhanced' ? "text-white shadow-sm" : "text-gray-500"
                    )}
                    style={mobileTab === 'enhanced' ? { backgroundColor: themeColor } : {}}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Enhanced
                  </button>
                </div>
              </div>

              {/* Previews */}
              <div className="flex-1 flex gap-2 p-2 min-h-0">
                {/* Original */}
                <div className={cn("flex-1 flex flex-col min-w-0 min-h-0 md:flex", mobileTab === 'original' ? "flex" : "hidden")}>
                  <div className="hidden md:flex items-center gap-1.5 mb-1.5 px-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-500 text-sm">Original</span>
                  </div>
                  <div ref={containerRef} className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 min-h-0 relative">
                    <div ref={originalScrollRef} onScroll={() => syncScroll('original')} className="absolute inset-0 overflow-auto p-4">
                      <div className="bg-white shadow-sm" style={{ width: A4_WIDTH * scale, minHeight: A4_HEIGHT * scale, margin: '0 auto', opacity: 0.85 }}>
                        <div style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                          <StyleOptionsProvider>
                            <StyleOptionsWrapper>
                              <InlineEditProvider resumeData={resumeData as any} setResumeData={() => {}}>
                                <ResumeRenderer resumeData={resumeData} templateId={templateId} themeColors={themeColors} editable={false} />
                              </InlineEditProvider>
                            </StyleOptionsWrapper>
                          </StyleOptionsProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-col items-center justify-center">
                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg my-2" style={{ backgroundColor: themeColor }}>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Enhanced */}
                <div className={cn("flex-1 flex flex-col min-w-0 min-h-0 md:flex", mobileTab === 'enhanced' ? "flex" : "hidden")}>
                  <div className="hidden md:flex items-center justify-between mb-1.5 px-1">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
                      <span className="font-semibold text-sm" style={{ color: themeColor }}>Enhanced</span>
                    </div>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                      <Sparkles className="w-2.5 h-2.5" /> AI Enhanced
                    </span>
                  </div>
                  <div className="flex-1 rounded-lg overflow-hidden min-h-0 relative" style={{ backgroundColor: `${themeColor}05`, border: `2px solid ${themeColor}40` }}>
                    <div ref={enhancedScrollRef} onScroll={() => syncScroll('enhanced')} className="absolute inset-0 overflow-auto p-4">
                      <div className="bg-white shadow-lg" style={{ width: A4_WIDTH * scale, minHeight: A4_HEIGHT * scale, margin: '0 auto' }}>
                        <div style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                          <StyleOptionsProvider>
                            <StyleOptionsWrapper>
                              <InlineEditProvider resumeData={enhancedData as any} setResumeData={() => {}}>
                                <ResumeRenderer resumeData={enhancedData} templateId={templateId} themeColors={themeColors} editable={false} />
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
              {suggestedSkills.length > 0 && (
                <div className="px-3 py-2 border-t border-gray-100 flex items-center gap-2 flex-shrink-0 bg-gray-50/50">
                  <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" style={{ color: themeColor }} />
                  <span className="text-xs text-gray-500 flex-shrink-0">Add Skills:</span>
                  <div className="flex gap-1.5 flex-1 min-w-0 overflow-x-auto">
                    {suggestedSkills.map(skill => (
                      <button
                        key={skill.id}
                        onClick={() => {
                          if (status === 'applying') return;
                          setAcceptedSkills(prev => {
                            const next = new Set(prev);
                            next.has(skill.id) ? next.delete(skill.id) : next.add(skill.id);
                            return next;
                          });
                        }}
                        disabled={status === 'applying'}
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap",
                          acceptedSkills.has(skill.id) ? "" : "bg-white border border-gray-200 text-gray-600"
                        )}
                        style={acceptedSkills.has(skill.id) ? { backgroundColor: `${themeColor}15`, border: `1px solid ${themeColor}`, color: themeColor } : {}}
                        title={skill.reason}
                      >
                        {acceptedSkills.has(skill.id) ? <Check className="w-2.5 h-2.5" /> : <div className="w-2.5 h-2.5 rounded-sm border border-gray-300" />}
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
            <div className="text-center py-12 px-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhancement Failed</h3>
              <p className="text-sm text-red-600 mb-6 max-w-sm mx-auto">{error}</p>
              <Button onClick={handleEnhance} className="gap-2" style={{ backgroundColor: themeColor }}>
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {status === 'comparing' && (
          <div className="px-3 py-2 sm:px-4 border-t flex items-center justify-between gap-2 flex-shrink-0" style={{ borderColor: `${themeColor}20` }}>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Enhancement complete</span>
              {acceptedSkills.size > 0 && (
                <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                  +{acceptedSkills.size} skill{acceptedSkills.size !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">Cancel</Button>
              <Button onClick={handleApply} className="flex-1 sm:flex-none gap-1.5" style={{ backgroundColor: themeColor }}>
                <Sparkles className="w-3.5 h-3.5" /> Apply Enhancements
                <ChevronRight className="w-3.5 h-3.5 hidden sm:block" />
              </Button>
            </div>
          </div>
        )}

        {status === 'applying' && (
          <div className="px-4 py-4 border-t flex items-center justify-center gap-2" style={{ borderColor: `${themeColor}20` }}>
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: themeColor }} />
            <span className="font-medium" style={{ color: themeColor }}>Applying enhancements...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhanceWithAIModal;
