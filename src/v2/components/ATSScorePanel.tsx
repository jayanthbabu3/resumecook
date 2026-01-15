/**
 * ATS Score Panel Component
 *
 * A comprehensive ATS compatibility analyzer with elegant UI.
 * Features:
 * - Circular score gauge with animation
 * - Job description input for keyword matching
 * - Issue breakdown with severity indicators
 * - Keyword match visualization
 * - Actionable tips and suggestions
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  X,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  FileCheck,
  Lightbulb,
  Check,
  XCircle,
  RefreshCw,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { V2ResumeData } from '../types/resumeData';
import {
  ATSScoreResponse,
  ATSScoreCategory,
  getScoreColor,
  getScoreLabel,
  getScoreDescription,
} from '../types/ats';
import { analyzeATSScore, getSeverityColor, getPriorityColor } from '../services/atsService';

interface ATSScorePanelProps {
  resumeData: V2ResumeData;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function ATSScorePanel({
  resumeData,
  isOpen,
  onClose,
  className,
}: ATSScorePanelProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSScoreResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showKeywords, setShowKeywords] = useState(true);
  const [showIssues, setShowIssues] = useState(true);
  const [showTips, setShowTips] = useState(true);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate score on result change
  useEffect(() => {
    if (result?.score) {
      setAnimatedScore(0);
      const duration = 1000;
      const steps = 60;
      const increment = result.score / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= result.score) {
          setAnimatedScore(result.score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.round(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [result?.score]);

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await analyzeATSScore({
        resumeData,
        jobDescription: jobDescription.trim() || undefined,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  }, [resumeData, jobDescription]);

  // Auto-analyze on open if no result
  useEffect(() => {
    if (isOpen && !result && !isAnalyzing) {
      handleAnalyze();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const scoreColors = result ? getScoreColor(result.category) : null;
  const hasJobDescription = jobDescription.trim().length > 50;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm',
      'animate-in fade-in duration-200',
      className
    )}>
      <div className={cn(
        'relative w-full max-w-2xl max-h-[90vh] overflow-hidden',
        'bg-white rounded-2xl shadow-2xl',
        'animate-in zoom-in-95 slide-in-from-bottom-4 duration-300'
      )}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">ATS Score Analyzer</h2>
              <p className="text-sm text-white/80">Check your resume's ATS compatibility</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 space-y-6">
          {/* Job Description Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Briefcase className="w-4 h-4 text-purple-500" />
                Job Description (Optional)
              </label>
              {hasJobDescription && (
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  ✓ Will analyze keyword match
                </span>
              )}
            </div>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here for a more accurate keyword analysis..."
              className="min-h-[100px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
            />
            <p className="text-xs text-gray-500">
              Adding a job description enables keyword matching analysis (40% of score)
            </p>
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={cn(
              'w-full h-12 text-base font-medium',
              'bg-gradient-to-r from-violet-500 to-purple-600',
              'hover:from-violet-600 hover:to-purple-700',
              'shadow-lg shadow-purple-500/25',
              'transition-all duration-200'
            )}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : result ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Re-analyze Resume
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze ATS Compatibility
              </>
            )}
          </Button>

          {/* Error State */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Results */}
          {result && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Score Card */}
              <div className={cn(
                'relative overflow-hidden rounded-2xl p-6',
                scoreColors?.bg,
                'border',
                `border-${result.category === 'excellent' ? 'emerald' : result.category === 'good' ? 'blue' : result.category === 'fair' ? 'amber' : result.category === 'needs_improvement' ? 'orange' : 'red'}-200`
              )}>
                <div className="flex items-center gap-6">
                  {/* Circular Score */}
                  <div className="relative flex-shrink-0">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#scoreGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(animatedScore / 100) * 352} 352`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" className={cn(
                            result.category === 'excellent' ? 'stop-color: #10b981' :
                            result.category === 'good' ? 'stop-color: #3b82f6' :
                            result.category === 'fair' ? 'stop-color: #f59e0b' :
                            result.category === 'needs_improvement' ? 'stop-color: #f97316' :
                            'stop-color: #ef4444'
                          )} style={{ stopColor: result.category === 'excellent' ? '#10b981' : result.category === 'good' ? '#3b82f6' : result.category === 'fair' ? '#f59e0b' : result.category === 'needs_improvement' ? '#f97316' : '#ef4444' }} />
                          <stop offset="100%" className="stop-color: #8b5cf6" style={{ stopColor: '#8b5cf6' }} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={cn('text-4xl font-bold', scoreColors?.text)}>
                        {animatedScore}
                      </span>
                      <span className="text-sm text-gray-500">/ 100</span>
                    </div>
                  </div>

                  {/* Score Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'px-3 py-1 text-sm font-semibold rounded-full',
                        scoreColors?.bg,
                        scoreColors?.text
                      )}>
                        {getScoreLabel(result.category)}
                      </span>
                      {result.keywords && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {result.keywords.matchPercentage}% keyword match
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">
                      {getScoreDescription(result.category, !!result.keywords)}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500 pt-2">
                      <div className="flex items-center gap-1">
                        <FileCheck className="w-4 h-4 text-purple-500" />
                        Format: {result.format.score}%
                      </div>
                      {result.keywords && (
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-purple-500" />
                          Keywords: {result.keywords.totalFound}/{result.keywords.totalInJob}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyword Analysis (if job description provided) */}
              {result.keywords && (
                <Collapsible open={showKeywords} onOpenChange={setShowKeywords}>
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-500" />
                        <span className="font-medium text-gray-900">Keyword Analysis</span>
                        <span className="text-sm text-gray-500">
                          ({result.keywords.totalFound} of {result.keywords.totalInJob} found)
                        </span>
                      </div>
                      {showKeywords ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    {/* Matched Keywords */}
                    {(result.keywords.matched.tools.length > 0 ||
                      result.keywords.matched.hardSkills.length > 0 ||
                      result.keywords.matched.softSkills.length > 0) && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-700">Keywords Found</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[...result.keywords.matched.tools, ...result.keywords.matched.hardSkills, ...result.keywords.matched.softSkills].map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded-md"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Missing Keywords */}
                    {(result.keywords.missing.tools.length > 0 ||
                      result.keywords.missing.hardSkills.length > 0 ||
                      result.keywords.missing.softSkills.length > 0) && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                          <span className="font-medium text-amber-700">Missing Keywords</span>
                          <span className="text-xs text-amber-600">(Consider adding if applicable)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[...result.keywords.missing.tools, ...result.keywords.missing.hardSkills, ...result.keywords.missing.softSkills].slice(0, 15).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-sm bg-amber-100 text-amber-700 rounded-md"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Issues & Suggestions */}
              {(result.format.issues.length > 0 || result.format.suggestions.length > 0) && (
                <Collapsible open={showIssues} onOpenChange={setShowIssues}>
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        <span className="font-medium text-gray-900">Issues & Suggestions</span>
                        <span className="text-sm text-gray-500">
                          ({result.format.issues.length + result.format.suggestions.length})
                        </span>
                      </div>
                      {showIssues ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-3">
                    {/* Issues */}
                    {result.format.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'p-4 rounded-xl border',
                          getSeverityColor(issue.severity)
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {issue.severity === 'critical' ? (
                            <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          ) : issue.severity === 'high' ? (
                            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{issue.message}</p>
                            <p className="text-sm mt-1 opacity-80">{issue.suggestion}</p>
                          </div>
                          <span className={cn(
                            'px-2 py-0.5 text-xs font-medium rounded-full capitalize',
                            issue.severity === 'critical' ? 'bg-red-200 text-red-800' :
                            issue.severity === 'high' ? 'bg-orange-200 text-orange-800' :
                            issue.severity === 'medium' ? 'bg-amber-200 text-amber-800' :
                            'bg-blue-200 text-blue-800'
                          )}>
                            {issue.severity}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Suggestions */}
                    {result.format.suggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border bg-blue-50 border-blue-200 text-blue-700"
                      >
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium">{suggestion.message}</p>
                            <p className="text-sm mt-1 opacity-80">{suggestion.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Tips */}
              {result.tips.length > 0 && (
                <Collapsible open={showTips} onOpenChange={setShowTips}>
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        <span className="font-medium text-gray-900">Optimization Tips</span>
                        <span className="text-sm text-gray-500">
                          ({result.tips.length})
                        </span>
                      </div>
                      {showTips ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-3">
                    {result.tips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border bg-white border-gray-200 hover:border-purple-300 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                            tip.priority === 'high' ? 'bg-red-100 text-red-600' :
                            tip.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                            'bg-blue-100 text-blue-600'
                          )}>
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-900">{tip.title}</p>
                              <span className={cn(
                                'px-2 py-0.5 text-xs font-medium rounded-full capitalize',
                                getPriorityColor(tip.priority)
                              )}>
                                {tip.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{tip.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Section Completeness */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-purple-500" />
                  Section Completeness
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(result.format.sections).map(([key, value]) => (
                    <div
                      key={key}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                        value ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                      )}
                    >
                      {value ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                      <span className="capitalize">
                        {key.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-pulse" />
                <Loader2 className="absolute inset-0 m-auto w-10 h-10 text-purple-600 animate-spin" />
              </div>
              <p className="text-gray-600 font-medium">Analyzing your resume...</p>
              <p className="text-sm text-gray-500">Checking ATS compatibility and keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ATSScorePanel;
