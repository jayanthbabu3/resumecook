import { useEffect } from "react";
import type { GridResumeState } from "../types/gridBuilder";

interface UseGridAutoSaveOptions {
  state: GridResumeState;
  onSave?: (state: GridResumeState) => Promise<void> | void;
  intervalMs?: number;
}

export function useGridAutoSave({ state, onSave, intervalMs = 30000 }: UseGridAutoSaveOptions): void {
  useEffect(() => {
    if (!onSave) return;

    const handle = setInterval(() => {
      void onSave(state);
    }, intervalMs);

    return () => clearInterval(handle);
  }, [state, onSave, intervalMs]);
}


