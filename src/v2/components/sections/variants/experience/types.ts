/**
 * Experience Variant Types
 * 
 * Shared types for all experience variant components.
 */

import type { TemplateConfig } from '../../../../types';
import type { ExperienceItem } from '../../../../types/resumeData';

export interface ExperienceVariantProps {
  /** Experience data */
  items: ExperienceItem[];
  /** Template configuration */
  config: TemplateConfig;
  /** Primary/accent color */
  accentColor: string;
  /** Enable inline editing */
  editable?: boolean;
  /** Callbacks for editing */
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  onAddExperience?: () => void;
  onRemoveExperience?: (expId: string) => void;
  /** Date formatter function */
  formatDate?: (date: string) => string;
}

export type ExperienceVariant =
  | 'standard'      // Classic corporate layout
  | 'compact'       // Space-efficient single line
  | 'detailed'      // Full details with descriptions
  | 'timeline'      // Visual timeline with dots/line
  | 'cards'         // Card-based layout
  | 'minimal'       // Ultra-minimal text only
  | 'modern'        // Modern with accent borders
  | 'left-border'   // Left colored border accent
  | 'dates-left'    // Dates on left column
  | 'dates-right'   // Dates on right side
  | 'academic'      // Academic/research focused
  | 'creative'      // Creative industry style
  | 'enhanced'      // Production-ready EnhanceCV style
  | 'timeline-pro'  // Professional timeline with dates on left
  | 'icon-accent';  // Creative card with company icon badge
