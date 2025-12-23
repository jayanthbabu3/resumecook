import type { V2ResumeData } from "../types/resumeData";
import type { V2SectionType } from "../types";

export interface GridSectionLayout {
  /**
   * Starting column (1-12)
   */
  column: number;
  /**
   * Number of columns to span (1-12)
   */
  span: number;
  /**
   * Row index (0-based). Higher numbers appear lower on the page.
   */
  row: number;
  /**
   * Optional height in grid units. If omitted, height is auto.
   */
  height?: number;
}

export interface GridSectionConstraints {
  /**
   * Minimum number of columns a section can span.
   */
  minSpan?: number;
  /**
   * Maximum number of columns a section can span.
   */
  maxSpan?: number;
  /**
   * When true, the section cannot be moved.
   */
  locked?: boolean;
  /**
   * When true, the section size (span/height) cannot be changed.
   */
  sizeFixed?: boolean;
}

export interface GridBasedSection {
  // Identity
  id: string;
  type: V2SectionType;
  variantId: string;
  enabled: boolean;

  // Positioning
  layout: GridSectionLayout;

  // Optional constraints
  constraints?: GridSectionConstraints;
}

export interface GridResumeState {
  resumeData: V2ResumeData;
  sections: GridBasedSection[];
  themeColor: string;
  selectedLayoutPreset?: string;
}


