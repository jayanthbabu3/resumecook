/**
 * V2 Template System
 * 
 * Central registry for all V2 templates.
 * Each template includes: config + component + mockData
 */

import type { TemplateDefinition, TemplateRegistry, TemplateComponentProps } from './types';

// Import templates
import { executiveSplitTemplate } from './executive-split';
import { minimalTemplate } from './minimal';
import { seniorFrontendProTemplate } from './senior-frontend-pro';
import { dataProTemplate } from './data-pro';
import { boldHeadlineTemplate } from './bold-headline';
import { accountantProTemplate } from './accountant-pro';
import { centeredPhotoTemplate } from './centered-photo';
import { creativeSplitTemplate } from './creative-split';
import { classicMinimalTemplate } from './classic-minimal';
import { professionalBlueTemplate } from './professional-blue';
import { elegantAtsTemplate } from './elegant-ats';
import { refinedPortraitTemplate } from './refined-portrait';
import { analystClarityTemplate } from './analyst-clarity';
import { obstacleSolverTemplate } from './obstacle-solver';

// ============================================================================
// TEMPLATE REGISTRY
// ============================================================================

export const V2_TEMPLATE_REGISTRY: TemplateRegistry = {
  'executive-split-v2': executiveSplitTemplate,
  'minimal-v2': minimalTemplate,
  'senior-frontend-pro-v2': seniorFrontendProTemplate,
  'data-pro-v2': dataProTemplate,
  'bold-headline-v2': boldHeadlineTemplate,
  'accountant-pro-v2': accountantProTemplate,
  'centered-photo-v2': centeredPhotoTemplate,
  'creative-split-v2': creativeSplitTemplate,
  'classic-minimal-v2': classicMinimalTemplate,
  'professional-blue-v2': professionalBlueTemplate,
  'elegant-ats-v2': elegantAtsTemplate,
  'refined-portrait-v2': refinedPortraitTemplate,
  'analyst-clarity-v2': analystClarityTemplate,
  'obstacle-solver-v2': obstacleSolverTemplate,
};

// ============================================================================
// REGISTRY FUNCTIONS
// ============================================================================

/**
 * Get a template definition by ID
 */
export function getTemplate(templateId: string): TemplateDefinition | undefined {
  return V2_TEMPLATE_REGISTRY[templateId];
}

/**
 * Get all templates
 */
export function getAllTemplates(): TemplateDefinition[] {
  return Object.values(V2_TEMPLATE_REGISTRY);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: TemplateDefinition['meta']['category']): TemplateDefinition[] {
  return getAllTemplates().filter(t => t.meta.category === category);
}

/**
 * Get featured templates
 */
export function getFeaturedTemplates(): TemplateDefinition[] {
  return getAllTemplates().filter(t => t.meta.featured);
}

/**
 * Get template IDs
 */
export function getTemplateIds(): string[] {
  return Object.keys(V2_TEMPLATE_REGISTRY);
}

/**
 * Check if a template exists
 */
export function hasTemplate(templateId: string): boolean {
  return templateId in V2_TEMPLATE_REGISTRY;
}

// ============================================================================
// EXPORTS
// ============================================================================

// Export types
export type { TemplateDefinition, TemplateRegistry, TemplateComponentProps } from './types';

// Export base template utilities
export { 
  BaseTemplateProvider, 
  useBaseTemplate, 
  useOrderedSections,
  useSectionTitle,
  TemplateSectionRenderer,
} from './BaseTemplate';

// Export individual templates
export { executiveSplitTemplate } from './executive-split';
export { minimalTemplate } from './minimal';
export { seniorFrontendProTemplate } from './senior-frontend-pro';
export { dataProTemplate } from './data-pro';
export { boldHeadlineTemplate } from './bold-headline';
export { accountantProTemplate } from './accountant-pro';
export { centeredPhotoTemplate } from './centered-photo';
export { creativeSplitTemplate } from './creative-split';
export { classicMinimalTemplate } from './classic-minimal';
export { professionalBlueTemplate } from './professional-blue';
export { elegantAtsTemplate } from './elegant-ats';
export { refinedPortraitTemplate } from './refined-portrait';
export { analystClarityTemplate } from './analyst-clarity';
export { obstacleSolverTemplate } from './obstacle-solver';
