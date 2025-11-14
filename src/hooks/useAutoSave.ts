import { useState, useEffect, useRef, useCallback } from 'react';
import type { ResumeData } from '@/types/resume';
import { formatDistanceToNow } from 'date-fns';

interface UseAutoSaveOptions {
  delay?: number; // Debounce delay in ms
  enabled?: boolean; // Enable/disable auto-save
  onSave?: () => void; // Callback when save completes
  onError?: (error: Error) => void; // Callback when save fails
}

export function useAutoSave(
  resumeId: string | undefined,
  data: ResumeData,
  saveFunction: (data: ResumeData) => Promise<void>,
  options: UseAutoSaveOptions = {}
) {
  const {
    delay = 2000, // 2 seconds default
    enabled = true,
    onSave,
    onError,
  } = options;

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const initialLoadRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastDataRef = useRef<ResumeData>(data);

  // Track if data has actually changed
  const hasDataChanged = useCallback((newData: ResumeData): boolean => {
    return JSON.stringify(newData) !== JSON.stringify(lastDataRef.current);
  }, []);

  // Save function
  const save = useCallback(
    async (dataToSave: ResumeData) => {
      if (!resumeId || !enabled) return;

      // Skip if data hasn't changed
      if (!hasDataChanged(dataToSave)) {
        return;
      }

      try {
        setIsSaving(true);
        setError(null);

        await saveFunction(dataToSave);

        setLastSaved(new Date());
        lastDataRef.current = dataToSave;
        onSave?.();
      } catch (err) {
        const error = err as Error;
        setError(error);
        console.error('Auto-save failed:', error);
        onError?.(error);
      } finally {
        setIsSaving(false);
      }
    },
    [resumeId, enabled, saveFunction, hasDataChanged, onSave, onError]
  );

  // Debounced auto-save
  useEffect(() => {
    // Skip on initial load
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    // Skip if not enabled
    if (!enabled || !resumeId) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      save(data);
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, resumeId, save]);

  // Manual save function
  const saveNow = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    await save(data);
  }, [data, save]);

  // Format last saved time
  const lastSavedText = lastSaved
    ? formatDistanceToNow(lastSaved, { addSuffix: true })
    : null;

  return {
    isSaving,
    lastSaved,
    lastSavedText,
    error,
    saveNow,
  };
}

/**
 * Auto-save status indicator component props
 */
export interface AutoSaveStatusProps {
  isSaving: boolean;
  lastSaved: Date | null;
  error: Error | null;
}

/**
 * Get status message for auto-save
 */
export function getAutoSaveStatus({
  isSaving,
  lastSaved,
  error,
}: AutoSaveStatusProps): {
  message: string;
  variant: 'saving' | 'saved' | 'error' | 'idle';
} {
  if (error) {
    return {
      message: 'Failed to save',
      variant: 'error',
    };
  }

  if (isSaving) {
    return {
      message: 'Saving...',
      variant: 'saving',
    };
  }

  if (lastSaved) {
    return {
      message: `Saved ${formatDistanceToNow(lastSaved, { addSuffix: true })}`,
      variant: 'saved',
    };
  }

  return {
    message: 'Not saved',
    variant: 'idle',
  };
}
