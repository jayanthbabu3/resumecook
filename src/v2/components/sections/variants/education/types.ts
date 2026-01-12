/**
 * Education Variant Types
 * 
 * Shared types for all education variant components.
 */

import type { TemplateConfig } from '../../../../types';
import type { EducationItem } from '../../../../types/resumeData';

export interface EducationVariantProps {
  /** Education data */
  items: EducationItem[];
  /** Template configuration */
  config: TemplateConfig;
  /** Primary/accent color */
  accentColor: string;
  /** Enable inline editing */
  editable?: boolean;
  /** Callbacks for editing */
  onAddEducation?: () => void;
  onRemoveEducation?: (eduId: string) => void;
  /** Date formatter function */
  formatDate?: (date: string) => string;
}

export type EducationVariant = 
  | 'standard'      // Classic layout with degree, school, dates
  | 'compact'       // Space-efficient single line
  | 'detailed'      // Full details with GPA, honors, coursework
  | 'timeline'      // Visual timeline with dots/line
  | 'cards'         // Card-based layout
  | 'minimal'       // Ultra-minimal text only
  | 'academic'      // Academic CV style with research focus
  | 'modern';       // Modern with accent styling
