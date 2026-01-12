/**
 * Job Tailor Modal
 *
 * Multi-step modal that allows users to:
 * 1. Paste a job description
 * 2. Upload/select their resume source
 * 3. AI tailors the resume to match the job description
 * 4. Preview and apply the tailored resume
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Target,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileUp,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  User,
  Briefcase,
  ChevronRight,
  Lightbulb,
  Check,
  RotateCcw,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { V2ResumeData } from '../types';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { profileService } from '@/v2/services/profileService';
import { WEBSITE_PRIMARY_COLOR } from '../constants/theme';
import { ResumeRenderer } from './ResumeRenderer';
import { InlineEditProvider } from '@/contexts/InlineEditContext';
import { StyleOptionsProvider } from '@/contexts/StyleOptionsContext';
import { StyleOptionsWrapper } from '@/components/resume/StyleOptionsWrapper';

interface JobTailorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: V2ResumeData, analysis: TailorAnalysis) => void;
  themeColor?: string;
  templateId?: string;
  themeColors?: { primary?: string; secondary?: string };
}

interface TailorAnalysis {
  matchScore: number;
  keywordsFound: string[];
  keywordsMissing: string[];
  keywordsAdded: string[];
  summaryEnhanced: boolean;
  experienceEnhanced: boolean;
  roleAlignment?: string;
}

type ModalStep = 'input' | 'source' | 'uploading' | 'tailoring' | 'comparing' | 'error';

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.txt'];

// Progress messages during tailoring
const PROGRESS_MESSAGES = [
  "Analyzing job requirements...",
  "Extracting key skills and keywords...",
  "Matching your experience...",
  "Enhancing your summary...",
  "Tailoring bullet points...",
  "Optimizing for ATS...",
  "Calculating match score...",
  "Finalizing enhancements...",
];

// Typing effect component for progress messages
const TypewriterText: React.FC<{ text: string; speed?: number; className?: string }> = ({
  text,
  speed = 30,
  className
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
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
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

export const JobTailorModal: React.FC<JobTailorModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  themeColor = '#f59e0b', // Amber/orange theme
  templateId = 'executive-split-v2',
  themeColors,
}) => {
  const { user } = useFirebaseAuth();

  // State
  const [step, setStep] = useState<ModalStep>('input');
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Resume data states
  const [originalData, setOriginalData] = useState<V2ResumeData | null>(null);
  const [tailoredData, setTailoredData] = useState<V2ResumeData | null>(null);
  const [analysis, setAnalysis] = useState<TailorAnalysis | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<Array<{ id: string; name: string; category: string; reason: string }>>([]);
  const [acceptedSkills, setAcceptedSkills] = useState<Set<string>>(new Set());

  // File upload states
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Progress state
  const [progressMessage, setProgressMessage] = useState(PROGRESS_MESSAGES[0]);
  const [progressIndex, setProgressIndex] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll refs for synchronized scrolling
  const originalScrollRef = useRef<HTMLDivElement>(null);
  const tailoredScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingSyncRef = useRef<boolean>(false);

  // Profile state
  const [hasProfile, setHasProfile] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(false);

  // Check if user has a saved profile
  useEffect(() => {
    const checkProfile = async () => {
      if (user && step === 'source') {
        setCheckingProfile(true);
        try {
          const profile = await profileService.getProfile();
          setHasProfile(!!profile);
        } catch {
          setHasProfile(false);
        }
        setCheckingProfile(false);
      }
    };
    checkProfile();
  }, [user, step]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('input');
      setJobDescription('');
      setJobTitle('');
      setCompanyName('');
      setError(null);
      setOriginalData(null);
      setTailoredData(null);
      setAnalysis(null);
      setSuggestedSkills([]);
      setAcceptedSkills(new Set());
      setFileName(null);
      setProgressIndex(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  }, [isOpen]);

  // Progress message animation
  useEffect(() => {
    if (step === 'tailoring') {
      progressIntervalRef.current = setInterval(() => {
        setProgressIndex(prev => {
          const next = (prev + 1) % PROGRESS_MESSAGES.length;
          setProgressMessage(PROGRESS_MESSAGES[next]);
          return next;
        });
      }, 2000);
      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [step]);

  // Synchronized scroll handler
  const handleScroll = useCallback((source: 'original' | 'tailored') => {
    if (isScrollingSyncRef.current) return;

    isScrollingSyncRef.current = true;

    const sourceRef = source === 'original' ? originalScrollRef : tailoredScrollRef;
    const targetRef = source === 'original' ? tailoredScrollRef : originalScrollRef;

    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollTop = sourceRef.current.scrollTop;
    }

    requestAnimationFrame(() => {
      isScrollingSyncRef.current = false;
    });
  }, []);

  // Handle job description continue
  const handleContinueToSource = () => {
    if (jobDescription.trim().length < 50) {
      setError('Please enter a job description (at least 50 characters)');
      return;
    }
    setError(null);
    setStep('source');
  };

  // Process uploaded file
  const processFile = useCallback(async (file: File) => {
    const isValidType = ACCEPTED_FILE_TYPES.includes(file.type) ||
      ACCEPTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!isValidType) {
      setError('Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB.');
      return;
    }

    setFileName(file.name);
    setStep('uploading');
    setError(null);

    try {
      // Convert file to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });

      // Parse the resume
      const response = await fetch('/.netlify/functions/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData: base64Data,
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to parse resume');
      }

      if (result.success && result.data) {
        setOriginalData(result.data);
        // Now tailor the resume
        await tailorResume(result.data);
      } else {
        throw new Error('Invalid response from parser');
      }
    } catch (err) {
      console.error('Resume upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse resume');
      setStep('error');
    }
  }, [jobDescription, jobTitle, companyName]);

  // Use existing profile
  const handleUseProfile = async () => {
    setStep('uploading');
    setError(null);

    try {
      const profile = await profileService.getProfile();
      if (!profile) {
        throw new Error('No profile found');
      }

      const resumeData = profileService.profileToResumeData(profile);
      setOriginalData(resumeData);
      await tailorResume(resumeData);
    } catch (err) {
      console.error('Profile load error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      setStep('error');
    }
  };

  // Tailor the resume for the job description
  const tailorResume = async (resumeData: V2ResumeData) => {
    setStep('tailoring');
    setProgressIndex(0);
    setProgressMessage(PROGRESS_MESSAGES[0]);

    try {
      const response = await fetch('/.netlify/functions/tailor-resume-for-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData,
          jobDescription,
          jobTitle: jobTitle || undefined,
          companyName: companyName || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to tailor resume');
      }

      if (result.success && result.data) {
        setTailoredData(result.data);
        setAnalysis(result.analysis || {
          matchScore: 70,
          keywordsFound: [],
          keywordsMissing: [],
          keywordsAdded: [],
          summaryEnhanced: true,
          experienceEnhanced: true,
        });
        setSuggestedSkills(result.suggestedSkills || []);
        setStep('comparing');
      } else {
        throw new Error('Invalid response from tailoring service');
      }
    } catch (err) {
      console.error('Tailoring error:', err);
      setError(err instanceof Error ? err.message : 'Failed to tailor resume');
      setStep('error');
    }
  };

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  // Apply tailored resume
  const handleApply = () => {
    if (!tailoredData || !analysis) return;

    // Add accepted skills to the tailored data
    let finalData = { ...tailoredData };
    if (acceptedSkills.size > 0) {
      const newSkills = suggestedSkills
        .filter(s => acceptedSkills.has(s.id))
        .map(s => ({ id: s.id, name: s.name, category: s.category }));
      finalData = {
        ...finalData,
        skills: [...(finalData.skills || []), ...newSkills],
      };
    }

    onComplete(finalData, analysis);
    onClose();
  };

  // Retry after error
  const handleRetry = () => {
    setError(null);
    if (originalData) {
      // If we already have resume data, just retry the tailoring
      tailorResume(originalData);
    } else {
      // Go back to source selection
      setStep('source');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === 'tailoring' || step === 'uploading' ? undefined : onClose}
      />

      {/* Modal */}
      <div className={cn(
        "relative bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col",
        step === 'comparing'
          ? "w-[95vw] h-[95vh] max-w-[1800px]"
          : "w-full max-w-2xl max-h-[90vh]"
      )}>
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between border-b flex-shrink-0",
            step === 'comparing' ? "px-4 py-2" : "px-6 py-4"
          )}
          style={{
            background: `linear-gradient(135deg, ${themeColor}08 0%, ${themeColor}15 100%)`,
            borderColor: `${themeColor}20`
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "rounded-xl flex items-center justify-center shadow-lg",
                step === 'comparing' ? "w-10 h-10" : "w-12 h-12"
              )}
              style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
            >
              <Target className={step === 'comparing' ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
            </div>
            <div>
              <h2 className={cn(
                "font-bold text-gray-900",
                step === 'comparing' ? "text-base" : "text-lg"
              )}>
                {step === 'input' && 'Tailor Resume for Job'}
                {step === 'source' && 'Choose Your Resume'}
                {step === 'uploading' && 'Processing Resume...'}
                {step === 'tailoring' && 'Tailoring Your Resume'}
                {step === 'comparing' && 'Review Tailored Resume'}
                {step === 'error' && 'Something Went Wrong'}
              </h2>
              {step !== 'comparing' && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {step === 'input' && 'Paste the job description to get started'}
                  {step === 'source' && 'Upload or use your existing profile'}
                  {step === 'uploading' && 'Please wait...'}
                  {step === 'tailoring' && 'AI is optimizing your resume'}
                  {step === 'error' && 'Please try again'}
                </p>
              )}
            </div>
          </div>
          {step !== 'tailoring' && step !== 'uploading' && (
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
          {/* Step 1: Job Description Input */}
          {step === 'input' && (
            <div className="p-6">
              {/* Job Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className={cn(
                    "w-full h-48 p-4 rounded-xl border-2 resize-none text-sm focus:outline-none transition-colors",
                    error
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-amber-400"
                  )}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">
                    {jobDescription.length} characters (minimum 50)
                  </p>
                  {error && (
                    <p className="text-xs text-red-500">{error}</p>
                  )}
                </div>
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Google"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div
                className="p-4 rounded-xl border"
                style={{ backgroundColor: `${themeColor}08`, borderColor: `${themeColor}25` }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      AI-Powered Job Matching
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Our AI will analyze the job requirements and tailor your resume to highlight
                      relevant skills, add missing keywords, and optimize for ATS systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Resume Source Selection */}
          {step === 'source' && (
            <div className="p-6">
              <div className="grid gap-4">
                {/* Use Profile Option (if logged in and has profile) */}
                {user && (
                  <button
                    onClick={handleUseProfile}
                    disabled={checkingProfile || !hasProfile}
                    className={cn(
                      "group relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all",
                      hasProfile
                        ? "border-gray-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                        : "border-gray-100 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: hasProfile ? `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` : '#e5e7eb' }}
                    >
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        Use My Profile
                        {hasProfile && (
                          <span
                            className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                          >
                            Recommended
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {checkingProfile
                          ? 'Checking profile...'
                          : hasProfile
                          ? 'Use your saved profile data'
                          : 'No profile saved yet'}
                      </p>
                    </div>
                    {hasProfile && (
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    )}
                  </button>
                )}

                {/* Upload Resume Option */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "group relative flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all",
                    dragActive
                      ? "border-amber-400 bg-amber-50"
                      : "border-gray-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, #3b82f6, #2563eb)` }}
                  >
                    <FileUp className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Upload Resume
                      <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        AI Parsing
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {dragActive ? 'Drop your file here' : 'Upload PDF, DOCX, or TXT file'}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Start Fresh Option */}
                <button
                  onClick={() => {
                    // Create empty resume data
                    const emptyData: V2ResumeData = {
                      version: '2.0',
                      personalInfo: {
                        fullName: '',
                        email: '',
                        phone: '',
                        location: '',
                        title: jobTitle || '',
                        summary: '',
                      },
                      experience: [],
                      education: [],
                      skills: [],
                    };
                    setOriginalData(emptyData);
                    tailorResume(emptyData);
                  }}
                  className="group relative flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 text-left transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Start Fresh</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Get suggestions based on the job description
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Back button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep('input')}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to job description
                </button>
              </div>
            </div>
          )}

          {/* Uploading State */}
          {step === 'uploading' && (
            <div className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <p className="text-lg font-medium text-gray-800">
                Processing Your Resume
              </p>
              {fileName && (
                <p className="text-sm text-gray-500 mt-1">{fileName}</p>
              )}
              <p className="text-xs text-gray-400 mt-4">
                Extracting your experience, skills, and education...
              </p>
            </div>
          )}

          {/* Tailoring State */}
          {step === 'tailoring' && (
            <div className="py-16 text-center">
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
                  <Target className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Tailoring Your Resume
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

          {/* Comparing State - Side by Side Preview */}
          {step === 'comparing' && tailoredData && originalData && analysis && (
            <div className="flex flex-col h-full min-h-0">
              {/* Match Score Banner */}
              <div
                className="flex items-center justify-center gap-6 py-2 px-4 border-b"
                style={{ backgroundColor: `${themeColor}08`, borderColor: `${themeColor}20` }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" style={{ color: themeColor }} />
                  <span className="text-sm font-medium text-gray-700">Match Score:</span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: themeColor }}
                  >
                    {analysis.matchScore}%
                  </span>
                </div>
                {analysis.keywordsAdded.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">
                      +{analysis.keywordsAdded.length} keywords added
                    </span>
                  </div>
                )}
              </div>

              {/* Side-by-Side Resume Previews */}
              <div className="flex-1 flex gap-2 p-2 min-h-0">
                {/* Original Resume */}
                <div className="flex-1 flex flex-col min-w-0 min-h-0">
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-500 text-sm">Original</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 min-h-0 relative">
                    <div
                      ref={originalScrollRef}
                      onScroll={() => handleScroll('original')}
                      className="absolute inset-0 overflow-y-auto"
                    >
                      <div className="p-1 min-h-full flex justify-center">
                        <div className="bg-white shadow-sm flex-shrink-0 opacity-70" style={{ width: '100%' }}>
                          <StyleOptionsProvider>
                            <StyleOptionsWrapper>
                              <InlineEditProvider resumeData={originalData as any} setResumeData={() => {}}>
                                <ResumeRenderer
                                  resumeData={originalData}
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

                {/* Center Divider */}
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

                {/* Tailored Resume */}
                <div className="flex-1 flex flex-col min-w-0 min-h-0">
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <div className="flex items-center gap-1.5">
                      <Target className="w-4 h-4" style={{ color: themeColor }} />
                      <span className="font-semibold text-sm" style={{ color: themeColor }}>Tailored</span>
                    </div>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5"
                      style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      AI
                    </span>
                  </div>
                  <div
                    className="flex-1 rounded-lg overflow-hidden min-h-0 relative"
                    style={{
                      backgroundColor: `${themeColor}03`,
                      border: `2px solid ${themeColor}40`,
                      boxShadow: `0 0 30px ${themeColor}12`
                    }}
                  >
                    <div
                      ref={tailoredScrollRef}
                      onScroll={() => handleScroll('tailored')}
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
                              <InlineEditProvider resumeData={tailoredData as any} setResumeData={() => {}}>
                                <ResumeRenderer
                                  resumeData={tailoredData}
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
              {suggestedSkills.length > 0 && (
                <div className="px-3 py-1.5 border-t border-gray-100 flex items-center gap-2 flex-shrink-0 bg-gray-50/50">
                  <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" style={{ color: themeColor }} />
                  <span className="text-xs text-gray-500 flex-shrink-0">Missing Skills:</span>
                  <div className="flex gap-1 flex-1 min-w-0 overflow-x-auto">
                    {suggestedSkills.map(skill => (
                      <button
                        key={skill.id}
                        onClick={() => {
                          setAcceptedSkills(prev => {
                            const next = new Set(prev);
                            if (next.has(skill.id)) {
                              next.delete(skill.id);
                            } else {
                              next.add(skill.id);
                            }
                            return next;
                          });
                        }}
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-all whitespace-nowrap",
                          acceptedSkills.has(skill.id)
                            ? ""
                            : "bg-white border border-gray-200 hover:border-gray-300 text-gray-600"
                        )}
                        style={acceptedSkills.has(skill.id) ? {
                          backgroundColor: `${themeColor}15`,
                          border: `1px solid ${themeColor}`,
                          color: themeColor
                        } : {}}
                        title={skill.reason}
                      >
                        {acceptedSkills.has(skill.id) ? (
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
          {step === 'error' && (
            <div className="py-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Something Went Wrong
              </h3>
              <p className="text-sm text-red-600 mb-6 max-w-sm mx-auto">
                {error}
              </p>
              <Button
                onClick={handleRetry}
                className="gap-2"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'input' && (
          <div
            className="px-6 py-4 border-t flex items-center justify-between flex-shrink-0"
            style={{ backgroundColor: `${themeColor}05`, borderColor: `${themeColor}15` }}
          >
            <p className="text-xs text-gray-500">
              Your data is processed securely
            </p>
            <Button
              onClick={handleContinueToSource}
              disabled={jobDescription.trim().length < 50}
              className="gap-2"
              style={{
                background: jobDescription.trim().length >= 50
                  ? `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`
                  : '#d1d5db'
              }}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {step === 'comparing' && (
          <div
            className="px-4 py-2 border-t flex items-center justify-between flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${themeColor}04, white)`,
              borderColor: `${themeColor}12`
            }}
          >
            <div className="text-sm text-gray-500">
              {acceptedSkills.size > 0 && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                  style={{ backgroundColor: `${themeColor}10`, color: themeColor }}
                >
                  <Check className="w-3 h-3" />
                  +{acceptedSkills.size} skill{acceptedSkills.size !== 1 ? 's' : ''}
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
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
              >
                <Target className="w-3.5 h-3.5" />
                Apply & Select Template
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTailorModal;
