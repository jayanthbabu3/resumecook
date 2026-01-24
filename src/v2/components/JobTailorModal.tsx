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
  Lock,
  LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { V2ResumeData } from '../types';
import { API_ENDPOINTS, apiFetch } from '../../config/api';
import { useAuth } from '@/contexts/AuthContext';
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

type ModalStep = 'auth' | 'input' | 'source' | 'userInfo' | 'uploading' | 'tailoring' | 'generating' | 'comparing' | 'error';

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.txt'];

// Progress messages during tailoring
const PROGRESS_MESSAGES = [
  "Analyzing job requirements...",
  "Extracting required skills & keywords...",
  "Rewriting your professional summary...",
  "Matching your experience to the role...",
  "Enhancing bullet points with keywords...",
  "Adding missing skills from job description...",
  "Optimizing for ATS systems...",
  "Calculating job match score...",
  "Finalizing your optimized resume...",
];

// Progress messages during generation (for Start Fresh)
const GENERATION_MESSAGES = [
  "Analyzing job requirements...",
  "Identifying required skills...",
  "Generating experience highlights...",
  "Crafting professional summary...",
  "Building skill recommendations...",
  "Creating role-specific content...",
  "Finalizing your resume structure...",
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
  const { user } = useAuth();

  // State - start with auth check if not logged in
  const [step, setStep] = useState<ModalStep>(user ? 'input' : 'auth');
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

  // User info for Start Fresh flow
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Update step when user auth state changes
  useEffect(() => {
    if (user && step === 'auth') {
      setStep('input');
    } else if (!user && step !== 'auth' && isOpen) {
      setStep('auth');
    }
  }, [user, step, isOpen]);

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
      setStep(user ? 'input' : 'auth');
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
      setUserName('');
      setUserEmail('');
      setIsGenerating(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  }, [isOpen]);

  // Progress message animation
  useEffect(() => {
    if (step === 'tailoring' || step === 'generating') {
      const messages = step === 'generating' ? GENERATION_MESSAGES : PROGRESS_MESSAGES;
      progressIntervalRef.current = setInterval(() => {
        setProgressIndex(prev => {
          const next = (prev + 1) % messages.length;
          setProgressMessage(messages[next]);
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
      const response = await apiFetch(API_ENDPOINTS.parseResume, {
        method: 'POST',
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

  // Generate resume from job description (Start Fresh flow)
  const generateResumeFromJob = async () => {
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    setStep('generating');
    setProgressIndex(0);
    setProgressMessage(GENERATION_MESSAGES[0]);
    setIsGenerating(true);
    setError(null);

    try {
      const response = await apiFetch(API_ENDPOINTS.generateResumeFromJob, {
        method: 'POST',
        body: JSON.stringify({
          jobDescription,
          jobTitle: jobTitle || undefined,
          companyName: companyName || undefined,
          userName: userName.trim(),
          userEmail: userEmail.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate resume');
      }

      if (result.success && result.data) {
        // For Start Fresh, we don't have an "original" to compare
        // So we set both to the generated data
        const generatedData = result.data;
        setOriginalData({
          version: '2.0',
          personalInfo: {
            fullName: userName,
            email: userEmail || '',
            phone: '',
            location: '',
            title: jobTitle || '',
            summary: '',
          },
          experience: [],
          education: [],
          skills: [],
        });
        setTailoredData(generatedData);
        setAnalysis({
          matchScore: 85, // Generated resumes are optimized by default
          keywordsFound: generatedData.skills?.map((s: any) => s.name) || [],
          keywordsMissing: [],
          keywordsAdded: generatedData.skills?.map((s: any) => s.name) || [],
          summaryEnhanced: true,
          experienceEnhanced: true,
          roleAlignment: 'Resume generated and optimized for the target role',
        });
        setSuggestedSkills(result.data.suggestedSkills || []);
        setStep('comparing');
      } else {
        throw new Error('Invalid response from generation service');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate resume');
      setStep('error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Tailor the resume for the job description
  const tailorResume = async (resumeData: V2ResumeData) => {
    setStep('tailoring');
    setProgressIndex(0);
    setProgressMessage(PROGRESS_MESSAGES[0]);

    try {
      // Create AbortController for frontend timeout (longer than backend's 60s AI timeout)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout

      let response: Response;
      try {
        response = await apiFetch(API_ENDPOINTS.tailorResumeForJob, {
          method: 'POST',
          signal: controller.signal,
          body: JSON.stringify({
            resumeData,
            jobDescription,
            jobTitle: jobTitle || undefined,
            companyName: companyName || undefined,
          }),
        });
        clearTimeout(timeoutId);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. The AI service is taking too long. Please try again.');
        }
        throw fetchError;
      }

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      let result: any;

      try {
        const text = await response.text();
        // Check if response looks like a timeout error from Netlify
        if (text.startsWith('TimeoutError') || text.includes('Task timed out')) {
          throw new Error('The server timed out processing your request. This usually happens on free Netlify plans (10s limit). Please try again or upgrade to Netlify Pro for longer timeouts.');
        }
        result = JSON.parse(text);
      } catch (parseError: any) {
        if (parseError.message.includes('server timed out')) {
          throw parseError;
        }
        console.error('Failed to parse response:', parseError);
        throw new Error('The server returned an invalid response. This may be a timeout issue. Please try again.');
      }

      if (!response.ok) {
        throw new Error(result.error || result.details || 'Failed to tailor resume');
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
    <div className={cn(
      "fixed inset-0 z-50 flex justify-center",
      step === 'comparing' ? "items-center p-2 sm:p-4" : "items-end sm:items-center sm:p-4"
    )}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === 'tailoring' || step === 'uploading' || step === 'generating' ? undefined : onClose}
      />

      {/* Modal */}
      <div className={cn(
        "relative bg-white shadow-2xl overflow-hidden animate-in fade-in-0 duration-200 flex flex-col",
        step === 'comparing'
          ? "w-[calc(100%-1rem)] sm:w-[95vw] h-[calc(100%-1rem)] sm:h-[95vh] max-w-[1800px] rounded-2xl sm:rounded-3xl zoom-in-95"
          : "w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl slide-in-from-bottom-4 sm:zoom-in-95"
      )}>
        {/* Mobile drag handle */}
        {step !== 'comparing' && (
          <div
            className="sm:hidden flex justify-center py-2 flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${themeColor}08 0%, ${themeColor}15 100%)` }}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between border-b flex-shrink-0",
            step === 'comparing' ? "px-3 py-2 sm:px-4 sm:py-2" : "px-4 py-2.5 sm:px-6 sm:py-4"
          )}
          style={{
            background: step !== 'comparing' ? `linear-gradient(135deg, ${themeColor}08 0%, ${themeColor}15 100%)` : undefined,
            borderColor: `${themeColor}20`
          }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className={cn(
                "rounded-xl flex items-center justify-center shadow-lg flex-shrink-0",
                step === 'comparing' ? "w-8 h-8 sm:w-10 sm:h-10" : "w-10 h-10 sm:w-12 sm:h-12"
              )}
              style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
            >
              <Target className={step === 'comparing' ? "w-4 h-4 sm:w-5 sm:h-5 text-white" : "w-5 h-5 sm:w-6 sm:h-6 text-white"} />
            </div>
            <div className="min-w-0">
              <h2 className={cn(
                "font-bold text-gray-900 truncate",
                step === 'comparing' ? "text-sm sm:text-base" : "text-sm sm:text-lg"
              )}>
                {step === 'auth' && 'Sign In Required'}
                {step === 'input' && 'Match Resume to Job'}
                {step === 'source' && 'Choose Your Resume'}
                {step === 'userInfo' && 'Your Information'}
                {step === 'uploading' && 'Processing Resume...'}
                {step === 'tailoring' && 'Optimizing Your Resume'}
                {step === 'generating' && 'Generating Your Resume'}
                {step === 'comparing' && 'Review Optimized Resume'}
                {step === 'error' && 'Something Went Wrong'}
              </h2>
              {step !== 'comparing' && (
                <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5 truncate hidden xs:block">
                  {step === 'auth' && 'This is a premium feature'}
                  {step === 'input' && 'Paste the job description to optimize your resume'}
                  {step === 'source' && 'Upload or use your existing profile'}
                  {step === 'userInfo' && 'Enter your basic details'}
                  {step === 'uploading' && 'Please wait...'}
                  {step === 'tailoring' && 'AI is matching your resume to the job'}
                  {step === 'generating' && 'AI is creating your resume'}
                  {step === 'error' && 'Please try again'}
                </p>
              )}
            </div>
          </div>
          {step !== 'tailoring' && step !== 'uploading' && step !== 'generating' && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-gray-400 hover:text-gray-600 transition-colors border border-transparent hover:border-gray-200 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Auth Required Step */}
          {step === 'auth' && (
            <div className="p-5 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center border border-amber-200">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Sign In to Continue
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-sm mx-auto">
                Resume tailoring is a premium feature. Sign in to unlock AI-powered job matching and optimization.
              </p>

              {/* Features List */}
              <div className="text-left max-w-xs mx-auto mb-6 sm:mb-8 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-700">AI-powered resume optimization</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Match score & keyword analysis</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Generate resume from job description</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Save to your profile</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  onClose();
                  // Navigate to auth page with redirect
                  window.location.href = '/auth?redirect=' + encodeURIComponent(window.location.pathname);
                }}
                className="gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
                }}
              >
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                Sign In to Continue
              </Button>

              <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-gray-500">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = '/auth?redirect=' + encodeURIComponent(window.location.pathname);
                  }}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Sign up for free
                </button>
              </p>
            </div>
          )}

          {/* Step 1: Job Description Input */}
          {step === 'input' && (
            <div className="p-4 sm:p-6">
              {/* Job Description */}
              <div className="mb-4 sm:mb-5">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className={cn(
                    "w-full h-32 sm:h-44 p-3 sm:p-4 rounded-xl border-2 resize-none text-sm focus:outline-none transition-all focus:ring-2",
                    error
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-primary/20"
                  )}
                />
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-[11px] sm:text-xs text-gray-400">
                    {jobDescription.length} characters (minimum 50)
                  </p>
                  {error && (
                    <p className="text-[11px] sm:text-xs text-red-500">{error}</p>
                  )}
                </div>
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Job Title <span className="text-gray-400 text-[10px] sm:text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Software..."
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company <span className="text-gray-400 text-[10px] sm:text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Google"
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div
                className="p-3 sm:p-4 rounded-xl border bg-gradient-to-br from-primary/5 to-blue-50"
                style={{ borderColor: 'hsl(var(--primary) / 0.2)' }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-blue-600 shadow-md">
                    <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      AI-Powered Resume Optimization
                    </p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Our AI will rewrite your <strong className="text-gray-700">professional summary</strong>, enhance <strong className="text-gray-700">bullet points</strong> with keywords, and add <strong className="text-gray-700">missing skills</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Resume Source Selection */}
          {step === 'source' && (
            <div className="p-4 sm:p-6">
              <div className="grid gap-3 sm:gap-4">
                {/* Use Profile Option (if logged in and has profile) */}
                {user && (
                  <button
                    onClick={handleUseProfile}
                    disabled={checkingProfile || !hasProfile}
                    className={cn(
                      "group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all",
                      hasProfile
                        ? "border-gray-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                        : "border-gray-100 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: hasProfile ? `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` : '#e5e7eb' }}
                    >
                      <User className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex flex-wrap items-center gap-1.5">
                        Use My Profile
                        {hasProfile && (
                          <span
                            className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                          >
                            Recommended
                          </span>
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                        {checkingProfile
                          ? 'Checking profile...'
                          : hasProfile
                          ? 'Use your saved profile data'
                          : 'No profile saved yet'}
                      </p>
                    </div>
                    {hasProfile && (
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
                    "group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all",
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
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, #3b82f6, #2563eb)` }}
                  >
                    <FileUp className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex flex-wrap items-center gap-1.5">
                      Upload Resume
                      <span className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        AI Parsing
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      {dragActive ? 'Drop your file here' : 'Upload PDF, DOCX, or TXT file'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>

                {/* Start Fresh Option */}
                <button
                  onClick={() => {
                    // Go to user info step first
                    setStep('userInfo');
                  }}
                  className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10 text-left transition-all"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex flex-wrap items-center gap-1.5">
                      Start Fresh
                      <span className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        AI Generated
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Generate a resume tailored to this job description
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              </div>

              {/* Back button */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep('input')}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Back to job description
                </button>
              </div>
            </div>
          )}

          {/* Step 3: User Info for Start Fresh */}
          {step === 'userInfo' && (
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Tell us about yourself</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  We'll generate a professional resume tailored to the job
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g., John Smith"
                    className={cn(
                      "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors",
                      error && !userName.trim()
                        ? "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-green-400"
                    )}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email Address <span className="text-gray-400 text-[10px] sm:text-xs">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g., john@email.com"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-green-400 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-xs sm:text-sm text-red-500 text-center">{error}</p>
                )}

                {/* Info box about what will be generated */}
                <div className="p-3 sm:p-4 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-medium text-green-800">What we'll generate:</p>
                      <ul className="mt-1 text-green-700 space-y-0.5">
                        <li>• Professional summary tailored to the role</li>
                        <li>• Experience entries with realistic bullet points</li>
                        <li>• Skills extracted from the job description</li>
                        <li>• Project ideas relevant to the position</li>
                      </ul>
                      <p className="mt-1.5 sm:mt-2 text-green-600 text-[10px] sm:text-xs italic">
                        You'll fill in company names, dates, and education details
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <button
                  onClick={() => setStep('source')}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Back
                </button>
                <Button
                  onClick={generateResumeFromJob}
                  disabled={!userName.trim()}
                  className="gap-2 w-full sm:w-auto h-9 sm:h-10 text-sm"
                  style={{
                    background: userName.trim()
                      ? 'linear-gradient(135deg, #22c55e, #10b981)'
                      : '#d1d5db'
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Resume
                </Button>
              </div>
            </div>
          )}

          {/* Uploading State */}
          {step === 'uploading' && (
            <div className="py-10 sm:py-16 text-center px-4">
              <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center">
                <Loader2 className="w-7 h-7 sm:w-10 sm:h-10 text-blue-600 animate-spin" />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                Processing Your Resume
              </p>
              {fileName && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate max-w-[200px] mx-auto">{fileName}</p>
              )}
              <p className="text-[11px] sm:text-xs text-gray-400 mt-3 sm:mt-4">
                Extracting your experience, skills, and education...
              </p>
            </div>
          )}

          {/* Tailoring State */}
          {step === 'tailoring' && (
            <div className="py-10 sm:py-16 text-center px-4">
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
                  <Target className="w-7 h-7 sm:w-10 sm:h-10 text-white animate-pulse" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Optimizing Your Resume
              </h3>

              <div className="h-6 sm:h-8 flex items-center justify-center mb-4 sm:mb-6">
                <TypewriterText
                  text={progressMessage}
                  speed={40}
                  className="text-sm sm:text-base text-gray-600"
                />
              </div>

              {/* Progress bar */}
              <div className="w-56 sm:w-72 mx-auto h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
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

          {/* Generating State (for Start Fresh) */}
          {step === 'generating' && (
            <div className="py-10 sm:py-16 text-center px-4">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8">
                {/* Animated gradient rings */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-15 bg-green-500" />
                <div className="absolute inset-2 sm:inset-3 rounded-full animate-pulse opacity-20 bg-green-500" />
                <div className="absolute inset-4 sm:inset-6 rounded-full animate-pulse opacity-30 bg-green-500" />
                <div className="absolute inset-0 rounded-full flex items-center justify-center shadow-xl bg-gradient-to-br from-green-500 to-emerald-600">
                  <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-white animate-pulse" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Creating Your Resume
              </h3>

              <div className="h-6 sm:h-8 flex items-center justify-center mb-4 sm:mb-6">
                <TypewriterText
                  text={progressMessage}
                  speed={40}
                  className="text-sm sm:text-base text-gray-600"
                />
              </div>

              {/* Progress bar */}
              <div className="w-56 sm:w-72 mx-auto h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{
                    width: `${((progressIndex + 1) / GENERATION_MESSAGES.length) * 100}%`,
                  }}
                />
              </div>

              <p className="text-xs sm:text-sm text-gray-400 mt-4 sm:mt-5">
                Building your professional resume...
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
            <div className="py-8 sm:py-12 text-center px-4">
              <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                <AlertCircle className="w-7 h-7 sm:w-10 sm:h-10 text-red-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                Something Went Wrong
              </h3>
              <p className="text-xs sm:text-sm text-red-600 mb-4 sm:mb-6 max-w-sm mx-auto">
                {error}
              </p>
              <Button
                onClick={handleRetry}
                className="gap-2 h-9 sm:h-10 text-sm"
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
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 flex-shrink-0 pb-safe">
            <p className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">
              Your data is processed securely
            </p>
            <Button
              onClick={handleContinueToSource}
              disabled={jobDescription.trim().length < 50}
              className={cn(
                "gap-2 w-full sm:w-auto h-10 sm:h-11 text-sm font-semibold rounded-xl shadow-md transition-all",
                jobDescription.trim().length >= 50
                  ? "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {step === 'comparing' && (
          <div
            className="px-3 py-2 sm:px-4 sm:py-3 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 flex-shrink-0 pb-safe"
            style={{
              background: `linear-gradient(135deg, ${themeColor}04, white)`,
              borderColor: `${themeColor}12`
            }}
          >
            <div className="text-sm text-gray-500 hidden sm:block">
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
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2">
              <Button variant="outline" onClick={onClose} className="px-4 py-2 rounded-xl text-sm h-10 sm:h-9 w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                className="gap-1.5 px-4 sm:px-5 py-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] rounded-xl text-sm h-10 sm:h-9 w-full sm:w-auto justify-center"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
              >
                <Target className="w-3.5 h-3.5" />
                <span className="sm:inline">Apply & Select Template</span>
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
