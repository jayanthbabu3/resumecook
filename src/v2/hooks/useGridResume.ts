import { useCallback, useMemo, useState } from "react";
import type { GridBasedSection, GridResumeState } from "../types/gridBuilder";
import { GRID_SECTION_DEFAULTS } from "../config/gridLayouts";
import type { V2SectionType } from "../types";
import type { V2ResumeData } from "../types/resumeData";

export interface UseGridResumeOptions {
  /**
   * Optional initial resume data. If omitted, the hook will start with an empty shell.
   */
  initialResumeData?: V2ResumeData;
}

export interface UseGridResumeResult extends GridResumeState {
  addSection: (type: V2SectionType, variantId: string) => void;
  updateSectionLayout: (id: string, layout: Partial<GridBasedSection["layout"]>) => void;
  toggleSectionEnabled: (id: string, enabled?: boolean) => void;
  setResumeData: (updater: V2ResumeData | ((prev: V2ResumeData) => V2ResumeData)) => void;
}

const DEFAULT_THEME_COLOR = "#2563eb";

export function useGridResume(options: UseGridResumeOptions = {}): UseGridResumeResult {
  const { initialResumeData } = options;

  const [state, setState] = useState<GridResumeState>(() => ({
    resumeData: initialResumeData ?? ({} as V2ResumeData),
    sections: [],
    themeColor: DEFAULT_THEME_COLOR,
    selectedLayoutPreset: undefined,
  }));

  const addSection = useCallback(
    (type: V2SectionType, variantId: string) => {
      setState((prev) => {
        const defaultSpan = GRID_SECTION_DEFAULTS[type]?.span ?? 8;
        const nextRow = prev.sections.length;

        const newSection: GridBasedSection = {
          id: `grid-section-${Date.now()}-${prev.sections.length}`,
          type,
          variantId,
          enabled: true,
          layout: {
            column: 1,
            span: defaultSpan,
            row: nextRow,
          },
          constraints: {
            minSpan: 4,
            maxSpan: 12,
          },
        };

        return {
          ...prev,
          sections: [...prev.sections, newSection],
        };
      });
    },
    []
  );

  const updateSectionLayout = useCallback(
    (id: string, layout: Partial<GridBasedSection["layout"]>) => {
      setState((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === id
            ? {
                ...section,
                layout: {
                  ...section.layout,
                  ...layout,
                },
              }
            : section
        ),
      }));
    },
    []
  );

  const toggleSectionEnabled = useCallback((id: string, enabled?: boolean) => {
    setState((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === id
          ? {
              ...section,
              enabled: enabled ?? !section.enabled,
            }
          : section
      ),
    }));
  }, []);

  const setResumeData = useCallback(
    (updater: V2ResumeData | ((prev: V2ResumeData) => V2ResumeData)) => {
      setState((prev) => ({
        ...prev,
        resumeData:
          typeof updater === "function"
            ? (updater as (prev: V2ResumeData) => V2ResumeData)(prev.resumeData)
            : updater,
      }));
    },
    []
  );

  const value: UseGridResumeResult = useMemo(
    () => ({
      ...state,
      addSection,
      updateSectionLayout,
      toggleSectionEnabled,
      setResumeData,
    }),
    [state, addSection, updateSectionLayout, toggleSectionEnabled, setResumeData]
  );

  return value;
}


