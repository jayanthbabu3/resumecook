/**
 * Resume Builder V2 - Main Exports
 * 
 * This is the new config-driven resume builder system.
 * Import from this file to access all v2 functionality.
 */

// Types
export * from './types';

// Configuration
export * from './config';

// Hooks
export * from './hooks';

// Components
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

// Pages
export { DashboardV2, BuilderV2 } from './pages';

// Data
export { MOCK_RESUME_DATA, EMPTY_RESUME_DATA, MINIMAL_RESUME_DATA } from './data/mockData';
