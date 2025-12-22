/**
 * Skills Variant Types
 * 
 * Shared types for all skills variant components.
 */

import type { TemplateConfig } from '../../../../types';
import type { SkillItem } from '../../../../types/resumeData';

export interface SkillsVariantProps {
  /** Skills data */
  items: SkillItem[];
  /** Template configuration */
  config: TemplateConfig;
  /** Primary/accent color */
  accentColor: string;
  /** Enable inline editing */
  editable?: boolean;
  /** Callbacks for editing */
  onAddSkill?: () => void;
  onRemoveSkill?: (skillId: string) => void;
  onUpdateSkill?: (skillId: string, field: string, value: any) => void;
}

export type SkillsVariant = 
  | 'pills'         // Rounded pill badges
  | 'tags'          // Tag-style badges
  | 'bars'          // Progress bars
  | 'dots'          // Dot rating system
  | 'grouped'       // Grouped by category
  | 'columns'       // Multi-column layout
  | 'inline'        // Inline comma-separated
  | 'list'          // Bulleted list
  | 'compact'       // Compact single line
  | 'detailed'      // With proficiency levels
  | 'radar'         // Radar/spider chart style
  | 'modern'        // Modern cards with icons
  | 'category-lines' // Grouped headings with inline lists
  | 'bordered-tags'  // Production-ready bordered rectangular tags
  | 'pills-accent'   // Production-ready accent-colored pills
  | 'inline-dots';   // Production-ready inline with dot separators
