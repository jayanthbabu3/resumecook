/**
 * Resume Builder V2 - Type Exports
 * 
 * This file exports all v2 types for the config-driven resume builder.
 * 
 * Architecture:
 * - resumeData.ts: Universal data model for all resumes
 * - templateConfig.ts: Template configuration types
 * - config.ts: Legacy types (deprecated, use templateConfig.ts)
 */

// ============================================================================
// V2 RESUME DATA TYPES (Universal Data Model)
// ============================================================================

export * from './resumeData';

// ============================================================================
// V2 TEMPLATE CONFIG TYPES (New Config System)
// ============================================================================

export * from './templateConfig';

// ============================================================================
// LEGACY CONFIG TYPES
// ============================================================================

// Export specific types from legacy config that are still used by existing code
// These will be gradually migrated to templateConfig types
export type {
  TemplateConfig,
  SectionConfig,
  SectionType,
  VariantRegistry,
  VariantOption,
  SectionLabels,
  ColorSlot,
  ColorSlotName,
  LanguagesConfig,
  LanguagesVariant,
} from './config';

// Export values from legacy config
export { DEFAULT_SECTION_LABELS, VARIANT_REGISTRY } from './config';

// ============================================================================
// V1 TYPES (For backward compatibility with existing resumes)
// ============================================================================

export type {
  ResumeData as V1ResumeData,
  ExperienceItem as V1ExperienceItem,
  EducationItem as V1EducationItem,
  SkillItem as V1SkillItem,
  CustomSection as V1CustomSection,
  ProjectItem as V1ProjectItem,
  CertificationItem as V1CertificationItem,
  LanguageItem as V1LanguageItem,
  AwardItem as V1AwardItem,
  PublicationItem as V1PublicationItem,
  VolunteerItem as V1VolunteerItem,
} from '@/types/resume';
