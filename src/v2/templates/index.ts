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

// ============================================================================
// TEMPLATE REGISTRY
// ============================================================================

export const V2_TEMPLATE_REGISTRY: TemplateRegistry = {
  'executive-split-v2': executiveSplitTemplate,
  'minimal-v2': minimalTemplate,
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
