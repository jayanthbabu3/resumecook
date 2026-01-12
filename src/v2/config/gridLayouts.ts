import type { GridBasedSection } from "../types/gridBuilder";
import type { V2SectionType } from "../types";

export type GridLayoutPresetId =
  | "single-column"
  | "two-column-left-sidebar"
  | "two-column-right-sidebar"
  | "three-column-header"
  | "centered-content";

export interface GridLayoutPreset {
  id: GridLayoutPresetId;
  name: string;
  description: string;
  /**
   * Optional hint about which section types this preset is best for.
   */
  recommendedFor?: V2SectionType[];
}

export const GRID_LAYOUT_PRESETS: GridLayoutPreset[] = [
  {
    id: "single-column",
    name: "Single Column Stack",
    description: "All sections full width in a clean vertical stack.",
  },
  {
    id: "two-column-left-sidebar",
    name: "Two-Column (Left Sidebar)",
    description: "Sidebar on the left with main content on the right.",
  },
  {
    id: "two-column-right-sidebar",
    name: "Two-Column (Right Sidebar)",
    description: "Main content on the left with sidebar on the right.",
  },
  {
    id: "three-column-header",
    name: "Three-Column Header",
    description: "Compact three-column header with flexible body layout.",
  },
  {
    id: "centered-content",
    name: "Centered Content",
    description: "Narrow centered column for a focused reading experience.",
  },
];

/**
 * Smart defaults for section widths based on section type.
 * These are used by the grid builder when placing new sections.
 */
export const GRID_SECTION_DEFAULTS: Partial<Record<V2SectionType, Pick<GridBasedSection["layout"], "span">>> = {
  header: { span: 12 },
  summary: { span: 12 },
  experience: { span: 8 },
  education: { span: 8 },
  skills: { span: 4 },
  projects: { span: 12 },
};


