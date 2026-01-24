/**
 * Resume Upload Modal
 *
 * Allows users to upload an existing resume (PDF/DOCX) and parse it
 * using AI to extract structured data into the V2ResumeData format.
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  FileUp,
  Sparkles,
  User,
  FileCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { StyleOptionsWrapper } from '@/components/resume/StyleOptionsWrapper';
import type { V2ResumeData } from '../types';
import { ResumeRenderer } from './ResumeRenderer';
import { API_ENDPOINTS, apiFetch } from '../../config/api';
import { profileService } from '../services/profileService';
import { toast } from 'sonner';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: V2ResumeData) => void;
  themeColor?: string;
}

type UploadStatus = 'idle' | 'uploading' | 'parsing' | 'success' | 'ask_profile' | 'saving_profile' | 'error';

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.txt'];
const PREVIEW_TEMPLATE_ID = 'executive-split-v2';
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  themeColor = '#0891b2',
}) => {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [parsedData, setParsedData] = useState<V2ResumeData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.6);

  useEffect(() => {
    if (status !== 'ask_profile') return;
    const container = previewContainerRef.current;
    if (!container || typeof window === 'undefined') return;

    const calcScale = () => {
      const width = container.clientWidth;
      if (!width) return;
      const nextScale = Math.max(Math.min((width - 24) / A4_WIDTH, 1), 0.3);
      setPreviewScale(nextScale);
    };

    calcScale();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(calcScale);
      observer.observe(container);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', calcScale);
    return () => window.removeEventListener('resize', calcScale);
  }, [status]);

  const previewData = parsedData ? {
    ...parsedData,
    experience: parsedData.experience || [],
    education: parsedData.education || [],
    skills: parsedData.skills || [],
  } : null;

  const resetState = useCallback(() => {
    setStatus('idle');
    setError(null);
    setFileName(null);
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  const processFile = useCallback(async (file: File) => {
    // Validate file type
    const isValidType = ACCEPTED_FILE_TYPES.includes(file.type) ||
      ACCEPTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!isValidType) {
      setError('Please upload a PDF, DOCX, or TXT file.');
      setStatus('error');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB.');
      setStatus('error');
      return;
    }

    setFileName(file.name);
    setStatus('uploading');
    setError(null);

    try {
      // Convert file to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });

      setStatus('parsing');

      // Call the parse-resume API
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
        setParsedData(result.data);
        setStatus('ask_profile');
      } else {
        throw new Error('Invalid response from parser');
      }
    } catch (err) {
      console.error('Resume upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse resume');
      setStatus('error');
    }
  }, [onSuccess, handleClose]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

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
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle "Update Profile & Apply" choice
  const handleUpdateProfile = useCallback(async () => {
    if (!parsedData) return;

    setStatus('saving_profile');
    try {
      // Save to profile (single source of truth)
      await profileService.saveProfile({
        personalInfo: parsedData.personalInfo,
        experience: parsedData.experience || [],
        education: parsedData.education || [],
        skills: parsedData.skills || [],
        languages: parsedData.languages || [],
        certifications: parsedData.certifications || [],
        awards: parsedData.awards || [],
        projects: parsedData.projects || [],
        publications: parsedData.publications || [],
        volunteer: parsedData.volunteer || [],
        achievements: parsedData.achievements || [],
        strengths: parsedData.strengths || [],
        courses: parsedData.courses || [],
        interests: parsedData.interests || [],
        references: parsedData.references || [],
        speaking: parsedData.speaking || [],
        patents: parsedData.patents || [],
      });

      toast.success('Profile updated successfully!');
      setStatus('success');
      setTimeout(() => {
        onSuccess(parsedData);
        handleClose();
      }, 800);
    } catch (err) {
      console.error('Failed to save profile:', err);
      toast.error('Failed to update profile. Applying to resume only.');
      // Still apply to resume even if profile save fails
      onSuccess(parsedData);
      handleClose();
    }
  }, [parsedData, onSuccess, handleClose]);

  // Handle "Just This Resume" choice
  const handleJustResume = useCallback(() => {
    if (!parsedData) return;
    setStatus('success');
    setTimeout(() => {
      onSuccess(parsedData);
      handleClose();
    }, 500);
  }, [parsedData, onSuccess, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-white shadow-2xl w-full sm:max-w-6xl h-[95vh] sm:h-[95vh] max-h-[95vh] overflow-hidden rounded-t-2xl sm:rounded-2xl animate-in fade-in-0 slide-in-from-bottom-4 sm:zoom-in-95 duration-200 flex flex-col">
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center py-2 flex-shrink-0 bg-gradient-to-br from-primary/5 to-blue-500/10">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(var(--primary) / 0.12) 100%)',
            borderColor: 'hsl(var(--primary) / 0.15)'
          }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br from-primary to-blue-600">
              <FileUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Upload Resume</h2>
              <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5">Import from existing resume</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-gray-400 hover:text-gray-600 transition-colors border border-transparent hover:border-gray-200 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div
          className={cn(
            "flex-1 min-h-0",
            status === 'ask_profile' ? "p-3 sm:p-4 overflow-hidden" : "p-4 sm:p-6 overflow-y-auto"
          )}
        >
          {/* Status States */}
          {status === 'idle' && (
            <>
              {/* Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
                className={cn(
                  "relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <div
                    className={cn(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all",
                      dragActive
                        ? "bg-primary/15 ring-2 ring-primary/30"
                        : "bg-gray-100"
                    )}
                  >
                    <Upload
                      className={cn(
                        "w-6 h-6 sm:w-7 sm:h-7 transition-colors",
                        dragActive ? "text-primary" : "text-gray-400"
                      )}
                    />
                  </div>

                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">
                      {dragActive ? "Drop your resume here" : "Drag & drop your resume"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                      or click to browse
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
                    <FileText className="w-3.5 h-3.5" />
                    <span>PDF, DOCX, or TXT (max 10MB)</span>
                  </div>
                </div>
              </div>

              {/* AI Info */}
              <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 bg-gradient-to-br from-primary/5 to-blue-500/10 rounded-xl border border-primary/15">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      AI-Powered Parsing
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-relaxed">
                      We'll automatically extract your experience, education, skills,
                      and more using advanced AI. Your data stays private.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Uploading / Parsing / Saving Profile State */}
          {(status === 'uploading' || status === 'parsing' || status === 'saving_profile') && (
            <div className="py-10 sm:py-14 text-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full bg-primary/15 animate-ping opacity-50" />
                <div className="absolute inset-2 rounded-full bg-primary/20 animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-xl">
                  <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 text-white animate-spin" />
                </div>
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-900">
                {status === 'uploading' ? 'Uploading...' : status === 'parsing' ? 'Parsing with AI...' : 'Updating Profile...'}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 truncate px-4 max-w-[200px] mx-auto">
                {fileName}
              </p>
              {status === 'parsing' && (
                <p className="text-[11px] sm:text-xs text-gray-400 mt-3 sm:mt-4">
                  Extracting your experience, skills, and education...
                </p>
              )}
              {status === 'saving_profile' && (
                <p className="text-[11px] sm:text-xs text-gray-400 mt-3 sm:mt-4">
                  Saving to your profile...
                </p>
              )}
            </div>
          )}

          {/* Ask Profile Sync State */}
          {status === 'ask_profile' && (
            <div className="flex flex-col h-full min-h-0">

              {previewData && (
                <div className="flex flex-col flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/70 px-2 py-0.5 text-[10px] sm:text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Parsed successfully
                      </span>
                      <p className="hidden sm:block text-xs sm:text-sm font-semibold text-gray-700">
                        Preview (default template)
                      </p>
                    </div>
                    <span className="hidden sm:inline text-[10px] sm:text-xs text-gray-400">
                      You can change this later
                    </span>
                  </div>
                  <div
                    ref={previewContainerRef}
                    className="flex-1 min-h-0 rounded-xl border border-gray-200 bg-gray-100 overflow-y-auto p-2"
                  >
                    <div
                      className="bg-white shadow-sm rounded-lg overflow-hidden"
                      style={{
                        width: A4_WIDTH * previewScale,
                        minHeight: A4_HEIGHT * previewScale,
                        margin: '0 auto',
                      }}
                    >
                      <div
                        style={{
                          width: A4_WIDTH,
                          minHeight: A4_HEIGHT,
                          transform: `scale(${previewScale})`,
                          transformOrigin: 'top left',
                        }}
                      >
                        <StyleOptionsWrapper>
                          <ResumeRenderer
                            resumeData={previewData}
                            templateId={PREVIEW_TEMPLATE_ID}
                            editable={false}
                          />
                        </StyleOptionsWrapper>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="py-10 sm:py-14 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center border border-emerald-200/60">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-900">
                Done!
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                Loading your information...
              </p>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="py-8 sm:py-12 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl sm:rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-900">
                Parsing Failed
              </p>
              <p className="text-xs sm:text-sm text-red-600 mt-1.5 sm:mt-2 max-w-sm mx-auto px-4">
                {error}
              </p>
              <Button
                onClick={resetState}
                variant="outline"
                className="mt-4 sm:mt-5 h-10 sm:h-11 text-sm rounded-xl px-6"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {status === 'idle' && (
          <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50/80 border-t border-gray-100 flex-shrink-0">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <p className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">
                Your resume data is processed securely and not stored.
              </p>
              <Button
                onClick={handleBrowseClick}
                className="w-full sm:w-auto h-11 sm:h-11 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 pb-safe"
              >
                <Upload className="w-4 h-4 mr-2" />
                Select File
              </Button>
            </div>
          </div>
        )}

        {status === 'ask_profile' && (
          <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50/90 border-t border-gray-100 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] sm:text-xs text-gray-500 text-center sm:text-left leading-snug">
                Review the preview, then choose an action. Saving to your profile lets you sync across all resumes.
              </p>
              <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleJustResume}
                  variant="outline"
                  className="w-full sm:w-auto h-11 text-sm rounded-xl"
                >
                  <FileCheck className="w-4 h-4 mr-2" />
                  Use for this resume only
                </Button>
                <Button
                  onClick={handleUpdateProfile}
                  className="w-full sm:w-auto h-11 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                >
                  <User className="w-4 h-4 mr-2" />
                  Save to profile & apply
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploadModal;
