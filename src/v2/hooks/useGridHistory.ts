import { useCallback, useState } from "react";
import type { GridResumeState } from "../types/gridBuilder";

export function useGridHistory(initialState: GridResumeState) {
  const [history, setHistory] = useState<GridResumeState[]>([initialState]);
  const [index, setIndex] = useState(0);

  const current = history[index];

  const push = useCallback((next: GridResumeState) => {
    setHistory((prev) => [...prev.slice(0, index + 1), next]);
    setIndex((prev) => prev + 1);
  }, [index]);

  const undo = useCallback(() => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const redo = useCallback(() => {
    setIndex((prev) => (prev < history.length - 1 ? prev + 1 : prev));
  }, [history.length]);

  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  return { state: current, push, undo, redo, canUndo, canRedo };
}


