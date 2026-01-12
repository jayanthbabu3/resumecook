/**
 * V2 Template System Types
 * 
 * Defines the complete template pattern: Config + Component + MockData
 */

import type { FC } from 'react';
import type { TemplateConfig, V2ResumeData } from '../types';

// ============================================================================
// TEMPLATE COMPONENT PROPS
// ============================================================================

export interface TemplateComponentProps {
  /** Resume data to render */
  resumeData: V2ResumeData;
  /** Template configuration (auto-injected) */
  config: TemplateConfig;
  /** Enable inline editing */
  editable?: boolean;
  /** Custom section labels */
  sectionLabels?: Record<string, string>;
  /** Section order override */
  sectionOrder?: string[];
  /** Enabled sections override */
  enabledSections?: string[];
  /** Callbacks for editing */
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  onAddExperience?: () => void;
  onRemoveExperience?: (expId: string) => void;
  onAddEducation?: () => void;
  onRemoveEducation?: (eduId: string) => void;
  onAddProject?: () => void;
  onRemoveProject?: (projectId: string) => void;
  onAddLanguage?: () => void;
  onRemoveLanguage?: (langId: string) => void;
  onUpdateLanguage?: (langId: string, field: string, value: string) => void;
  onAddCustomSectionItem?: (sectionIndex: number) => void;
  onRemoveCustomSectionItem?: (sectionIndex: number, itemIndex: number) => void;
}

// ============================================================================
// TEMPLATE DEFINITION
// ============================================================================

export interface TemplateDefinition {
  /** Unique template identifier */
  id: string;
  /** Template configuration */
  config: TemplateConfig;
  /** Template component */
  component: FC<TemplateComponentProps>;
  /** Mock data for preview */
  mockData: V2ResumeData;
  /** Template metadata */
  meta: TemplateMeta;
}

export interface TemplateMeta {
  /** Display name */
  name: string;
  /** Short description */
  description: string;
  /** Category for filtering */
  category: 'professional' | 'creative' | 'modern' | 'minimal' | 'executive';
  /** Tags for search */
  tags: string[];
  /** Preview image URL (optional) */
  previewImage?: string;
  /** Is this template featured? */
  featured?: boolean;
  /** Is this template new? */
  isNew?: boolean;
  /** Template version */
  version: string;
}

// ============================================================================
// TEMPLATE REGISTRY TYPE
// ============================================================================

export type TemplateRegistry = Record<string, TemplateDefinition>;

// ============================================================================
// HELPER TYPES
// ============================================================================

/** Props for the base template wrapper */
export interface BaseTemplateProps extends TemplateComponentProps {
  /** Additional className */
  className?: string;
}

/** Section render function type */
export type SectionRenderFn = (
  sectionId: string,
  title: string,
  content: React.ReactNode
) => React.ReactNode;
