/**
 * Resume Animation Context
 *
 * Provides animation state for highlighting sections when they are updated
 * via the chat feature. Sections will glow/pulse when updated.
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

interface ResumeAnimationContextValue {
  /** Set of section IDs currently highlighted */
  highlightedSections: Set<string>;
  /** Add sections to highlight (they auto-clear after duration) */
  highlightSections: (sectionIds: string[], duration?: number) => void;
  /** Manually clear all highlights */
  clearHighlights: () => void;
  /** Check if a specific section is highlighted */
  isSectionHighlighted: (sectionId: string) => boolean;
  /** Animation intensity (0-1) for fading effects */
  animationIntensity: number;
}

const ResumeAnimationContext = createContext<ResumeAnimationContextValue | undefined>(
  undefined
);

interface ResumeAnimationProviderProps {
  children: ReactNode;
  /** Duration in ms before highlights auto-clear (default: 3000) */
  highlightDuration?: number;
}

export function ResumeAnimationProvider({
  children,
  highlightDuration = 3000,
}: ResumeAnimationProviderProps) {
  const [highlightedSections, setHighlightedSections] = useState<Set<string>>(
    new Set()
  );
  const [animationIntensity, setAnimationIntensity] = useState(0);

  // Auto-clear highlights after duration
  useEffect(() => {
    if (highlightedSections.size > 0) {
      // Start with full intensity
      setAnimationIntensity(1);

      // Fade out animation
      const fadeInterval = setInterval(() => {
        setAnimationIntensity((prev) => Math.max(0, prev - 0.05));
      }, highlightDuration / 20);

      // Clear after duration
      const clearTimer = setTimeout(() => {
        setHighlightedSections(new Set());
        setAnimationIntensity(0);
      }, highlightDuration);

      return () => {
        clearInterval(fadeInterval);
        clearTimeout(clearTimer);
      };
    }
  }, [highlightedSections, highlightDuration]);

  const highlightSections = useCallback(
    (sectionIds: string[], duration?: number) => {
      if (sectionIds.length === 0) return;

      setHighlightedSections(new Set(sectionIds));
      setAnimationIntensity(1);
    },
    []
  );

  const clearHighlights = useCallback(() => {
    setHighlightedSections(new Set());
    setAnimationIntensity(0);
  }, []);

  const isSectionHighlighted = useCallback(
    (sectionId: string) => {
      return highlightedSections.has(sectionId);
    },
    [highlightedSections]
  );

  const value: ResumeAnimationContextValue = {
    highlightedSections,
    highlightSections,
    clearHighlights,
    isSectionHighlighted,
    animationIntensity,
  };

  return (
    <ResumeAnimationContext.Provider value={value}>
      {children}
    </ResumeAnimationContext.Provider>
  );
}

export function useResumeAnimation(): ResumeAnimationContextValue {
  const context = useContext(ResumeAnimationContext);
  if (context === undefined) {
    throw new Error(
      'useResumeAnimation must be used within a ResumeAnimationProvider'
    );
  }
  return context;
}

/**
 * Hook that returns animation styles for a section
 */
export function useSectionAnimation(sectionId: string) {
  const { isSectionHighlighted, animationIntensity } = useResumeAnimation();
  const isHighlighted = isSectionHighlighted(sectionId);

  const animationStyle: React.CSSProperties = isHighlighted
    ? {
        boxShadow: `0 0 ${20 * animationIntensity}px ${8 * animationIntensity}px rgba(139, 92, 246, ${0.4 * animationIntensity})`,
        transition: 'box-shadow 0.3s ease-out',
      }
    : {
        boxShadow: 'none',
        transition: 'box-shadow 0.3s ease-out',
      };

  const animationClassName = isHighlighted
    ? 'animate-section-highlight'
    : '';

  return {
    isHighlighted,
    animationIntensity,
    animationStyle,
    animationClassName,
  };
}

/**
 * Optional: Safe hook for use outside provider
 */
export function useResumeAnimationSafe(): ResumeAnimationContextValue | null {
  const context = useContext(ResumeAnimationContext);
  return context ?? null;
}
