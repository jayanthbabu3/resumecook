/**
 * ATS Score Analyzer Modal
 *
 * Clean, wide modal with two-panel results view.
 * Shows score breakdown and actionable improvements at a glance.
 */

import React, { useState, useCallback } from 'react';
import {
  X,
  Loader2,
  Upload,
  FileText,
  Target,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Check,
  ArrowRight,
  RotateCcw,
  FileCheck,
  AlertCircle,
  Minus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ATSScoreResponse,
  getScoreLabel,
} from '../types/ats';
import { API_ENDPOINTS, apiFetch } from '@/config/api';

interface ATSCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = 'input' | 'analyzing' | 'results';

export function ATSCheckerModal({ isOpen, onClose }: ATSCheckerModalProps) {
  const [step, setStep] = useState<ModalStep>('input');
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [result, setResult] = useState<ATSScoreResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedResumeData, setParsedResumeData] = useState<any | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate score
  React.useEffect(() => {
    if (result?.score && step === 'results') {
      setAnimatedScore(0);
      const duration = 800;
      const steps = 40;
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
  }, [result?.score, step]);

  // Reset when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setStep('input');
      setResult(null);
      setError(null);
      setUploadedFile(null);
      setParsedResumeData(null);
      setResumeText('');
      setJobDescription('');
      setAnimatedScore(0);
    }
  }, [isOpen]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
    });
  };

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    setUploadedFile(file);
    setError(null);
    setIsParsing(true);

    try {
      const fileData = await fileToBase64(file);
      const response = await apiFetch(API_ENDPOINTS.parseResume, {
        method: 'POST',
        body: JSON.stringify({ fileData, fileName: file.name, fileType: file.type }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to parse resume');
      }

      const data = await response.json();
      setParsedResumeData(data.data || data.resumeData || data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse resume');
      setUploadedFile(null);
    } finally {
      setIsParsing(false);
    }
  }, []);

  const textToResumeData = (text: string) => {
    const lines = text.split('\n').filter(l => l.trim());
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    const phoneMatch = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);
    const skillsSection = text.match(/skills?[:\s]*([^\n]+(?:\n(?![A-Z]{2,})[^\n]+)*)/i);
    const skills = skillsSection
      ? skillsSection[1].split(/[,;•·\n]/).map(s => s.trim()).filter(s => s && s.length < 50)
      : [];
    const bullets = lines.filter(l => /^[\s]*[•\-\*\d\.]/.test(l)).map(l => l.replace(/^[\s]*[•\-\*\d\.]+\s*/, ''));

    return {
      personalInfo: {
        fullName: lines[0]?.length < 50 ? lines[0] : '',
        email: emailMatch?.[0] || '',
        phone: phoneMatch?.[0] || '',
        summary: lines.slice(1, 4).join(' ').slice(0, 500),
      },
      experience: bullets.length > 0 ? [{
        title: 'Position',
        company: 'Company',
        bulletPoints: bullets.slice(0, 10),
      }] : [],
      skills: skills.slice(0, 20).map(s => ({ name: s })),
      education: [],
    };
  };

  const handleAnalyze = useCallback(async () => {
    setError(null);
    setStep('analyzing');

    try {
      let resumeData = parsedResumeData;
      if (inputMethod === 'paste' && resumeText.trim()) {
        resumeData = textToResumeData(resumeText);
      }

      if (!resumeData) {
        throw new Error('Please upload or paste your resume first');
      }

      const response = await apiFetch(API_ENDPOINTS.atsScore, {
        method: 'POST',
        body: JSON.stringify({
          resumeData,
          jobDescription: jobDescription.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to analyze resume');

      setResult(data);
      setStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume');
      setStep('input');
    }
  }, [parsedResumeData, resumeText, jobDescription, inputMethod]);

  const handleReset = () => {
    setStep('input');
    setResult(null);
    setError(null);
    setUploadedFile(null);
    setParsedResumeData(null);
    setResumeText('');
    setJobDescription('');
    setAnimatedScore(0);
  };

  const canAnalyze = (inputMethod === 'upload' && parsedResumeData) || (inputMethod === 'paste' && resumeText.trim().length > 100);

  // Calculate section scores for display
  const getSectionScore = () => {
    if (!result?.format.sections) return 0;
    const sections = result.format.sections;
    const required = ['hasSummary', 'hasExperience', 'hasEducation', 'hasSkills', 'hasContact'];
    const present = required.filter(key => sections[key as keyof typeof sections]).length;
    return Math.round((present / required.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={step === 'analyzing' ? undefined : onClose} />

      <div className={cn(
        "relative bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col",
        step === 'results' ? "w-full max-w-4xl" : "w-full max-w-lg",
        "max-h-[90vh]"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white">ATS Score Analyzer</h2>
              <p className="text-xs text-white/70">Check your resume's ATS compatibility</p>
            </div>
          </div>
          {step !== 'analyzing' && (
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Input Step */}
          {step === 'input' && (
            <div className="p-5 space-y-4">
              {/* Input Method Toggle */}
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setInputMethod('upload')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all",
                    inputMethod === 'upload' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
                <button
                  onClick={() => setInputMethod('paste')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all",
                    inputMethod === 'paste' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <FileText className="w-4 h-4" />
                  Paste
                </button>
              </div>

              {/* Upload/Paste Area */}
              {inputMethod === 'upload' ? (
                <div className={cn(
                  "relative border-2 border-dashed rounded-xl p-6 text-center transition-all",
                  uploadedFile ? "border-green-300 bg-green-50/50" : "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30",
                  isParsing && "pointer-events-none opacity-60"
                )}>
                  <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isParsing} />
                  {isParsing ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                      <p className="text-sm text-gray-600">Parsing resume...</p>
                    </div>
                  ) : uploadedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                      <p className="font-medium text-gray-900 text-sm">{uploadedFile.name}</p>
                      <button onClick={(e) => { e.stopPropagation(); setUploadedFile(null); setParsedResumeData(null); }} className="text-xs text-gray-500 hover:text-gray-700 underline">
                        Change file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <p className="font-medium text-gray-900 text-sm">Drop your resume here</p>
                      <p className="text-xs text-gray-500">PDF or DOCX</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your complete resume text..."
                    className="w-full h-32 p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none resize-none text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">{resumeText.length} chars {resumeText.length < 100 && '(min 100)'}</p>
                </div>
              )}

              {/* Job Description */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Job Description</span>
                  <span className="text-xs text-gray-400">(Optional)</span>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description for a more accurate keyword analysis..."
                  className="w-full h-24 p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none resize-none text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Adding a job description enables keyword matching analysis (40% of score)</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Analyzing Step */}
          {step === 'analyzing' && (
            <div className="py-16 text-center px-5">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500" />
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl">
                  <Target className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Resume</h3>
              <p className="text-sm text-gray-500">Checking ATS compatibility...</p>
            </div>
          )}

          {/* Results Step - Two Panel Layout */}
          {step === 'results' && result && (
            <div className="p-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Panel - Score Overview */}
                <div className="space-y-4">
                  {/* Main Score Card */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200">
                    <div className="flex items-center gap-5">
                      {/* Circular Score */}
                      <div className="relative flex-shrink-0">
                        <svg className="w-28 h-28 transform -rotate-90">
                          <circle cx="56" cy="56" r="48" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                          <circle
                            cx="56" cy="56" r="48"
                            stroke={getScoreColor(animatedScore)}
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${(animatedScore / 100) * 301.6} 301.6`}
                            className="transition-all duration-700 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-gray-900">{animatedScore}</span>
                          <span className="text-xs text-gray-500 font-medium">/ 100</span>
                        </div>
                      </div>

                      {/* Score Label */}
                      <div className="flex-1">
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold mb-2"
                          style={{ backgroundColor: `${getScoreColor(result.score)}15`, color: getScoreColor(result.score) }}
                        >
                          {getScoreLabel(result.category)}
                        </div>
                        <p className="text-sm text-gray-600">
                          {result.score >= 80 && "Your resume is well-optimized for ATS systems."}
                          {result.score >= 60 && result.score < 80 && "Good foundation with room for improvement."}
                          {result.score >= 40 && result.score < 60 && "Some areas need attention."}
                          {result.score < 40 && "Significant improvements needed."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-800">Score Breakdown</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {/* Sections Score */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Required Sections</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${getSectionScore()}%` }} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 w-10 text-right">{getSectionScore()}%</span>
                        </div>
                      </div>

                      {/* Format Score */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Content Quality</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${result.format.score}%` }} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 w-10 text-right">{result.format.score}%</span>
                        </div>
                      </div>

                      {/* Keywords Score */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Keyword Match</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {result.keywords ? (
                            <>
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${result.keywords.matchPercentage}%` }} />
                              </div>
                              <span className="text-sm font-medium text-gray-700 w-10 text-right">{result.keywords.matchPercentage}%</span>
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">Add job description</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Required Sections Checklist */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-800">Required Sections</h3>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {result.format.sections && Object.entries({
                          'Contact Info': result.format.sections.hasContact,
                          'Summary': result.format.sections.hasSummary,
                          'Experience': result.format.sections.hasExperience,
                          'Education': result.format.sections.hasEducation,
                          'Skills': result.format.sections.hasSkills,
                          'Certifications': result.format.sections.hasCertifications,
                        }).map(([name, exists]) => (
                          <div key={name} className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                            exists ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                          )}>
                            {exists ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Issues & Keywords */}
                <div className="space-y-4">
                  {/* Issues to Fix */}
                  {result.format.issues && result.format.issues.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="px-4 py-3 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <h3 className="text-sm font-semibold text-orange-800">Issues to Fix</h3>
                        </div>
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                          {result.format.issues.length} found
                        </span>
                      </div>
                      <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
                        {result.format.issues.slice(0, 5).map((issue, idx) => (
                          <div key={idx} className={cn(
                            "flex items-start gap-3 p-3 rounded-lg",
                            issue.severity === 'critical' && "bg-red-50",
                            issue.severity === 'high' && "bg-orange-50",
                            issue.severity === 'medium' && "bg-amber-50",
                            issue.severity === 'low' && "bg-blue-50"
                          )}>
                            <div className={cn(
                              "flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold text-white",
                              issue.severity === 'critical' && "bg-red-500",
                              issue.severity === 'high' && "bg-orange-500",
                              issue.severity === 'medium' && "bg-amber-500",
                              issue.severity === 'low' && "bg-blue-500"
                            )}>
                              !
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800">{issue.message}</p>
                              {issue.suggestion && (
                                <p className="text-xs text-gray-500 mt-0.5">{issue.suggestion}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keywords Analysis */}
                  {result.keywords && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-indigo-600" />
                          <h3 className="text-sm font-semibold text-indigo-800">Keyword Analysis</h3>
                        </div>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                          {result.keywords.totalFound}/{result.keywords.totalInJob} matched
                        </span>
                      </div>
                      <div className="p-3 space-y-3">
                        {/* Found Keywords */}
                        {(result.keywords.matched.tools?.length > 0 ||
                          result.keywords.matched.hardSkills?.length > 0) && (
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Check className="w-3.5 h-3.5 text-green-600" />
                              <span className="text-xs font-medium text-green-700">Found in Resume</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {[...(result.keywords.matched.tools || []), ...(result.keywords.matched.hardSkills || [])].slice(0, 8).map((kw, i) => (
                                <span key={i} className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Missing Keywords */}
                        {(result.keywords.missing.tools?.length > 0 ||
                          result.keywords.missing.hardSkills?.length > 0) && (
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Minus className="w-3.5 h-3.5 text-orange-600" />
                              <span className="text-xs font-medium text-orange-700">Missing Keywords</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {[...(result.keywords.missing.tools || []), ...(result.keywords.missing.hardSkills || [])].slice(0, 8).map((kw, i) => (
                                <span key={i} className="px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick Tips - Compact */}
                  {result.tips && result.tips.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-800">Quick Tips</h3>
                      </div>
                      <div className="p-3 space-y-2">
                        {result.tips.slice(0, 3).map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-lg">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-medium flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800">{tip.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Re-analyze with Job Description prompt */}
                  {!result.keywords && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-indigo-800">Want better accuracy?</p>
                          <p className="text-xs text-indigo-600 mt-0.5">Add a job description and re-analyze for keyword matching (40% of score).</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'input' && (
          <div className="px-5 py-4 border-t bg-gray-50 flex items-center justify-end gap-3 flex-shrink-0">
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="gap-2 h-10 px-6 text-sm font-medium shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <RotateCcw className="w-4 h-4" />
              Analyze Resume
            </Button>
          </div>
        )}

        {step === 'results' && (
          <div className="px-5 py-4 border-t bg-gray-50 flex items-center justify-between flex-shrink-0">
            <button onClick={handleReset} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Check Another Resume
            </button>
            <Button
              onClick={onClose}
              className="gap-2 h-10 px-6 text-sm font-medium shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Done
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSCheckerModal;
