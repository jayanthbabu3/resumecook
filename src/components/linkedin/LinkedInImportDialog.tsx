import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LinkedInUrlInput } from "./LinkedInUrlInput";
import { ImportProgress, type ImportStage } from "./ImportProgress";
import { isValidLinkedInInput } from "@/lib/linkedinDataMapper";
import { useLinkedInImport } from "@/hooks/useLinkedInImport";
import { ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkedInImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTemplateId?: string;
}

type DialogState = "idle" | "loading" | "success" | "error";

/**
 * LinkedIn Import Dialog
 *
 * A modal dialog that guides users through importing their LinkedIn profile.
 * Features:
 * - URL validation
 * - Progress visualization
 * - Error handling with retry
 * - Automatic navigation to builder on success
 */
export function LinkedInImportDialog({
  open,
  onOpenChange,
  defaultTemplateId = "professional-blue-v2",
}: LinkedInImportDialogProps) {
  const navigate = useNavigate();
  const { importProfile, isLoading, error: importError, stage } = useLinkedInImport();

  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState<DialogState>("idle");

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setValidationError(null);
  }, []);

  const handleImport = useCallback(async () => {
    // Validate URL
    if (!url.trim()) {
      setValidationError("Please enter your LinkedIn profile URL");
      return;
    }

    if (!isValidLinkedInInput(url)) {
      setValidationError("Please enter a valid LinkedIn profile URL");
      return;
    }

    setValidationError(null);
    setDialogState("loading");

    try {
      const resumeData = await importProfile(url);

      if (resumeData) {
        setDialogState("success");

        // Store data and navigate after a brief success display
        setTimeout(() => {
          sessionStorage.setItem("linkedin-import-data", JSON.stringify(resumeData));
          onOpenChange(false);
          navigate(`/builder?template=${defaultTemplateId}&source=linkedin`);
        }, 1500);
      } else {
        setDialogState("error");
      }
    } catch (err) {
      setDialogState("error");
    }
  }, [url, importProfile, navigate, defaultTemplateId, onOpenChange]);

  const handleRetry = useCallback(() => {
    setDialogState("idle");
    setUrl("");
    setValidationError(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && dialogState === "idle" && !isLoading) {
        handleImport();
      }
    },
    [dialogState, isLoading, handleImport]
  );

  // Reset state when dialog closes
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        // Reset after animation completes
        setTimeout(() => {
          setDialogState("idle");
          setUrl("");
          setValidationError(null);
        }, 200);
      }
      onOpenChange(newOpen);
    },
    [onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-md p-0 gap-0 overflow-hidden",
          "border-0 shadow-2xl"
        )}
      >
        {/* Header with LinkedIn branding */}
        <div className="bg-gradient-to-br from-[#0A66C2] to-[#004182] px-6 pt-8 pb-6">
          <div className="flex justify-center mb-4">
            {/* LinkedIn Logo */}
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg">
              <div className="w-9 h-9 rounded bg-[#0A66C2] flex items-center justify-center">
                <span className="text-white text-lg font-bold">in</span>
              </div>
            </div>
          </div>
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="text-xl font-semibold text-white">
              Import from LinkedIn
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-sm">
              Create your resume in seconds by importing your profile
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Idle State - URL Input */}
          {dialogState === "idle" && (
            <div className="space-y-5 animate-fade-in">
              <LinkedInUrlInput
                value={url}
                onChange={handleUrlChange}
                onKeyDown={handleKeyDown}
                error={validationError || undefined}
                placeholder="linkedin.com/in/your-profile"
                disabled={isLoading}
                autoFocus
              />

              <p className="text-xs text-gray-500 text-center">
                Enter your LinkedIn profile URL or username
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-11 rounded-xl"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  className={cn(
                    "flex-1 h-11 rounded-xl",
                    "bg-[#0A66C2] hover:bg-[#004182]",
                    "text-white font-medium"
                  )}
                  onClick={handleImport}
                  disabled={isLoading || !url.trim()}
                >
                  Import Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Instant
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Free
                </div>
              </div>
            </div>
          )}

          {/* Loading State - Progress */}
          {dialogState === "loading" && (
            <div className="py-4 animate-fade-in">
              <ImportProgress stage={stage} />
            </div>
          )}

          {/* Success State */}
          {dialogState === "success" && (
            <div className="py-4 animate-fade-in">
              <ImportProgress stage="complete" />
            </div>
          )}

          {/* Error State */}
          {dialogState === "error" && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-900">
                      Import failed
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      {importError || "We couldn't import your profile. Please check the URL and try again."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-11 rounded-xl"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  className={cn(
                    "flex-1 h-11 rounded-xl",
                    "bg-[#0A66C2] hover:bg-[#004182]",
                    "text-white font-medium"
                  )}
                  onClick={handleRetry}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LinkedInImportDialog;
