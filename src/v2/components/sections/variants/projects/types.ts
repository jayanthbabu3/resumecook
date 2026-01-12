/**
 * Projects Variant Types
 * 
 * Shared types for all projects variant components.
 */

import type { TemplateConfig } from '../../../../types';
import type { ProjectItem } from '../../../../types/resumeData';

export interface ProjectsVariantProps {
  /** Projects data */
  items: ProjectItem[];
  /** Template configuration */
  config: TemplateConfig;
  /** Primary/accent color */
  accentColor: string;
  /** Enable inline editing */
  editable?: boolean;
  /** Callbacks for editing */
  onAddProject?: () => void;
  onRemoveProject?: (projectId: string) => void;
  /** Date formatter function */
  formatDate?: (date: string) => string;
  /** Technology management callbacks (for detailed variant) */
  onAddTechnology?: (projectIndex: number) => void;
  onRemoveTechnology?: (projectIndex: number, techIndex: number) => void;
}

export type ProjectsVariant =
  | 'standard'           // Classic layout with description
  | 'list'
  | 'projects-classic'
  | 'cards'              // Card-based grid layout
  | 'grid'
  | 'projects-card'
  | 'projects-grid'
  | 'projects-boxed'
  | 'compact'            // Space-efficient layout
  | 'projects-compact'
  | 'timeline'           // Timeline with dates
  | 'projects-timeline'
  | 'showcase'           // Portfolio showcase style
  | 'projects-showcase'
  | 'minimal'            // Ultra-minimal
  | 'projects-minimal'
  | 'detailed'           // Full details with highlights
  | 'projects-detailed'
  | 'projects-impact';
