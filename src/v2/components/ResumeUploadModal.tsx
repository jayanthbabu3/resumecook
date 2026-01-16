/**
 * Resume Upload Modal
 *
 * Allows users to upload an existing resume (PDF/DOCX) and parse it
 * using AI to extract structured data into the V2ResumeData format.
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  FileUp,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { V2ResumeData } from '../types';
import { API_ENDPOINTS, apiFetch } from '../../config/api';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: V2ResumeData) => void;
  themeColor?: string;
}

type UploadStatus = 'idle' | 'uploading' | 'parsing' | 'success' | 'error';

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.txt'];

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    setStatus('idle');
    setError(null);
    setFileName(null);
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
        setStatus('success');
        // Small delay to show success state
        setTimeout(() => {
          onSuccess(result.data);
          handleClose();
        }, 1000);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[calc(100%-2rem)] max-w-lg mx-4 max-h-[85vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${themeColor}15` }}
            >
              <FileUp className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: themeColor }} />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Upload Resume</h2>
              <p className="text-xs sm:text-sm text-gray-500">Import from existing resume</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
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
                  "relative border-2 border-dashed rounded-xl p-5 sm:p-8 text-center cursor-pointer transition-all duration-200",
                  dragActive
                    ? "border-cyan-400 bg-cyan-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
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
                      "w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors",
                      dragActive ? "bg-cyan-100" : "bg-gray-100"
                    )}
                  >
                    <Upload
                      className={cn(
                        "w-6 h-6 sm:w-8 sm:h-8 transition-colors",
                        dragActive ? "text-cyan-600" : "text-gray-400"
                      )}
                    />
                  </div>

                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-700">
                      {dragActive ? "Drop your resume here" : "Drag & drop your resume"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                      or click to browse
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
                    <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>PDF, DOCX, or TXT (max 10MB)</span>
                  </div>
                </div>
              </div>

              {/* AI Info */}
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      AI-Powered Parsing
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1 leading-relaxed">
                      We'll automatically extract your experience, education, skills,
                      and more using advanced AI. Your data stays private.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Uploading / Parsing State */}
          {(status === 'uploading' || status === 'parsing') && (
            <div className="py-8 sm:py-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-cyan-50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600 animate-spin" />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                {status === 'uploading' ? 'Uploading...' : 'Parsing with AI...'}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate px-4">
                {fileName}
              </p>
              {status === 'parsing' && (
                <p className="text-[11px] sm:text-xs text-gray-400 mt-2 sm:mt-3">
                  Extracting your experience, skills, and education...
                </p>
              )}
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="py-8 sm:py-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                Resume Parsed Successfully!
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Loading your information...
              </p>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="py-6 sm:py-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                Parsing Failed
              </p>
              <p className="text-xs sm:text-sm text-red-600 mt-1.5 sm:mt-2 max-w-sm mx-auto px-4">
                {error}
              </p>
              <Button
                onClick={resetState}
                variant="outline"
                className="mt-3 sm:mt-4 h-9 sm:h-10 text-sm"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {status === 'idle' && (
          <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">
                Your resume data is processed securely and not stored.
              </p>
              <Button
                onClick={handleBrowseClick}
                style={{ backgroundColor: themeColor }}
                className="hover:opacity-90 w-full sm:w-auto h-9 sm:h-10 text-sm flex-shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Select File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploadModal;
