/**
 * Resume Builder V2 - Main Exports
 * 
 * This is the new config-driven resume builder system.
 * Import from this file to access all v2 functionality.
 * 
 * Architecture Overview:
 * =====================
 * 
 * 1. TYPES (./types)
 *    - resumeData.ts: Universal data model for all resumes
 *    - templateConfig.ts: Template configuration types
 *    - config.ts: Legacy types (deprecated)
 * 
 * 2. REGISTRY (./registry)
 *    - sectionRegistry.ts: All section definitions with form fields & variants
 * 
 * 3. UTILS (./utils)
 *    - dataConverter.ts: Convert between v1 and v2 data formats
 * 
 * 4. CONFIG (./config)
 *    - Template configurations
 *    - Default config values
 * 
 * 5. COMPONENTS
 *    - Section renderers (variant-aware)
 *    - Form components (config-driven)
 * 
 * 6. HOOKS
 *    - useTemplateConfig: Access template configuration
 *    - useResumeData: Manage resume data
 */

// ============================================================================
// TYPES
// ============================================================================

export * from './types';

// ============================================================================
// REGISTRY (Section definitions, form fields, variants)
// ============================================================================

export * from './registry';

// ============================================================================
// UTILITIES (Data conversion, helpers)
// ============================================================================

export * from './utils';

// ============================================================================
// CONFIGURATION
// ============================================================================

export * from './config';

// ============================================================================
// HOOKS
// ============================================================================

export * from './hooks';

// ============================================================================
// COMPONENTS
// ============================================================================

export { ResumeRenderer } from './components/ResumeRenderer';
export { 
  SectionHeading,
  HeaderSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  CustomSection as CustomSectionComponent,
} from './components/sections';

// ============================================================================
// PAGES
// ============================================================================

export { DashboardV2, BuilderV2 } from './pages';

// ============================================================================
// MOCK DATA
// ============================================================================

export { MOCK_RESUME_DATA, EMPTY_RESUME_DATA, MINIMAL_RESUME_DATA } from './data/mockData';
