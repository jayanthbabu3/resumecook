import { useState, useCallback } from "react";
import type { V2ResumeData } from "@/v2/types/resumeData";
import {
  mapLinkedInToResumeData,
  normalizeLinkedInUrl,
  type BrightDataProfile,
} from "@/lib/linkedinDataMapper";
import type { ImportStage } from "@/components/linkedin/ImportProgress";

interface LinkedInImportResponse {
  success: boolean;
  data?: BrightDataProfile;
  error?: string;
  details?: string;
}

interface UseLinkedInImportReturn {
  importProfile: (url: string) => Promise<V2ResumeData | null>;
  isLoading: boolean;
  error: string | null;
  stage: ImportStage;
  reset: () => void;
}

/**
 * useLinkedInImport Hook
 *
 * Manages the state and logic for importing LinkedIn profiles.
 * Handles API calls, data transformation, and progress tracking.
 */
export function useLinkedInImport(): UseLinkedInImportReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<ImportStage>("connecting");

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setStage("connecting");
  }, []);

  const importProfile = useCallback(
    async (url: string): Promise<V2ResumeData | null> => {
      setIsLoading(true);
      setError(null);
      setStage("connecting");

      try {
        const normalizedUrl = normalizeLinkedInUrl(url);

        // Stage 1: Connecting
        await simulateDelay(300);
        setStage("fetching");

        // Stage 2: Fetching - Call the Netlify function
        const response = await fetch("/.netlify/functions/linkedin-import", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ linkedinUrl: normalizedUrl }),
        });

        const data: LinkedInImportResponse = await response.json();

        if (!response.ok || !data.success) {
          const errorMessage =
            data.details || data.error || "Failed to import profile";
          setError(errorMessage);
          setIsLoading(false);
          return null;
        }

        if (!data.data) {
          setError("No profile data received");
          setIsLoading(false);
          return null;
        }

        // Stage 3: Parsing
        setStage("parsing");
        await simulateDelay(400);

        // Stage 4: Building - Transform the data
        setStage("building");
        const resumeData = mapLinkedInToResumeData(data.data);
        await simulateDelay(300);

        // Complete
        setStage("complete");
        setIsLoading(false);

        return resumeData;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while importing your profile";

        // Handle network errors
        if (err instanceof TypeError && err.message.includes("fetch")) {
          setError("Network error. Please check your connection and try again.");
        } else {
          setError(errorMessage);
        }

        setIsLoading(false);
        return null;
      }
    },
    []
  );

  return {
    importProfile,
    isLoading,
    error,
    stage,
    reset,
  };
}

/**
 * Simulate a small delay for smoother UX transitions
 */
function simulateDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default useLinkedInImport;
