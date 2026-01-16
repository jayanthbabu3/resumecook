/**
 * Resume History Hook - Undo/Redo for Resume Changes
 *
 * Manages a history stack for resume data changes, enabling undo/redo functionality.
 * Uses in-memory state (not localStorage) because:
 * 1. Faster performance - no serialization overhead
 * 2. Automatically clears when leaving page (expected UX)
 * 3. No storage limits or cleanup needed
 *
 * Features:
 * - Configurable max history size (default 50)
 * - Debounced snapshots to avoid saving every keystroke
 * - Clear labeling for each change
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { V2ResumeData } from '../types/resumeData';

// ============================================================================
// TYPES
// ============================================================================

interface HistoryEntry {
  /** Unique identifier */
  id: string;
  /** The resume data snapshot */
  data: V2ResumeData;
  /** Human-readable label for what changed */
  label: string;
  /** Timestamp of the change */
  timestamp: Date;
}

interface UseResumeHistoryOptions {
  /** Maximum number of history entries to keep */
  maxHistory?: number;
  /** Initial resume data */
  initialData: V2ResumeData;
}

interface UseResumeHistoryReturn {
  /** Whether undo is available */
  canUndo: boolean;
  /** Whether redo is available */
  canRedo: boolean;
  /** Number of undo steps available */
  undoCount: number;
  /** Number of redo steps available */
  redoCount: number;
  /** Label of the action that will be undone */
  undoLabel: string | null;
  /** Label of the action that will be redone */
  redoLabel: string | null;
  /** Undo the last change, returns the previous data */
  undo: () => V2ResumeData | null;
  /** Redo the last undone change, returns the restored data */
  redo: () => V2ResumeData | null;
  /** Push a new state to history */
  pushState: (data: V2ResumeData, label: string) => void;
  /** Clear all history */
  clearHistory: () => void;
  /** Get the current history for debugging */
  getHistory: () => { past: HistoryEntry[]; future: HistoryEntry[] };
}

// ============================================================================
// HELPERS
// ============================================================================

function generateHistoryId(): string {
  return `hist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clone resume data to avoid reference issues
 */
function cloneResumeData(data: V2ResumeData): V2ResumeData {
  return JSON.parse(JSON.stringify(data));
}

// ============================================================================
// HOOK
// ============================================================================

export function useResumeHistory({
  maxHistory = 50,
  initialData,
}: UseResumeHistoryOptions): UseResumeHistoryReturn {
  // Past states (for undo) - most recent at the end
  const [past, setPast] = useState<HistoryEntry[]>([]);
  // Future states (for redo) - most recent at the beginning
  const [future, setFuture] = useState<HistoryEntry[]>([]);

  // Current state reference (to compare for changes)
  const currentDataRef = useRef<V2ResumeData>(initialData);

  // Update current ref when initial data changes (e.g., loaded from server)
  useEffect(() => {
    currentDataRef.current = initialData;
  }, [initialData]);

  /**
   * Push a new state to history
   * Call this BEFORE applying the change to track what we're changing FROM
   */
  const pushState = useCallback(
    (newData: V2ResumeData, label: string) => {
      // Create entry from current state (what we're changing FROM)
      const entry: HistoryEntry = {
        id: generateHistoryId(),
        data: cloneResumeData(currentDataRef.current),
        label,
        timestamp: new Date(),
      };

      setPast((prev) => {
        const newPast = [...prev, entry];
        // Trim to max history size
        if (newPast.length > maxHistory) {
          return newPast.slice(-maxHistory);
        }
        return newPast;
      });

      // Clear future (new action invalidates redo stack)
      setFuture([]);

      // Update current reference
      currentDataRef.current = cloneResumeData(newData);
    },
    [maxHistory]
  );

  /**
   * Undo the last change
   * Returns the previous data state, or null if nothing to undo
   */
  const undo = useCallback((): V2ResumeData | null => {
    if (past.length === 0) return null;

    const lastEntry = past[past.length - 1];
    const restoredData = cloneResumeData(lastEntry.data);

    // Move current state to future
    const futureEntry: HistoryEntry = {
      id: generateHistoryId(),
      data: cloneResumeData(currentDataRef.current),
      label: lastEntry.label, // Keep the same label for redo
      timestamp: new Date(),
    };

    setPast((prev) => prev.slice(0, -1));
    setFuture((prev) => [futureEntry, ...prev]);

    // Update current reference
    currentDataRef.current = restoredData;

    return restoredData;
  }, [past]);

  /**
   * Redo the last undone change
   * Returns the restored data state, or null if nothing to redo
   */
  const redo = useCallback((): V2ResumeData | null => {
    if (future.length === 0) return null;

    const nextEntry = future[0];
    const restoredData = cloneResumeData(nextEntry.data);

    // Move current state to past
    const pastEntry: HistoryEntry = {
      id: generateHistoryId(),
      data: cloneResumeData(currentDataRef.current),
      label: nextEntry.label,
      timestamp: new Date(),
    };

    setFuture((prev) => prev.slice(1));
    setPast((prev) => [...prev, pastEntry]);

    // Update current reference
    currentDataRef.current = restoredData;

    return restoredData;
  }, [future]);

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    setPast([]);
    setFuture([]);
  }, []);

  /**
   * Get history for debugging
   */
  const getHistory = useCallback(() => {
    return { past, future };
  }, [past, future]);

  // Computed values
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  const undoCount = past.length;
  const redoCount = future.length;
  const undoLabel = past.length > 0 ? past[past.length - 1].label : null;
  const redoLabel = future.length > 0 ? future[0].label : null;

  return {
    canUndo,
    canRedo,
    undoCount,
    redoCount,
    undoLabel,
    redoLabel,
    undo,
    redo,
    pushState,
    clearHistory,
    getHistory,
  };
}

export default useResumeHistory;
