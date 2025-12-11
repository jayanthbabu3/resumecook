/**
 * Template Registry
 * 
 * Central registry for all v2 template configurations.
 * Add new templates here to make them available in the builder.
 */

import type { TemplateConfig } from '../../types';
import { executiveSplitConfig } from './executive-split';
import { minimalConfig } from './minimal';
import { boldHeadlineConfig } from './bold-headline';
import { dataProConfig } from './data-pro';
import { accountantProConfig } from './accountant-pro';
import { seniorFrontendProConfig } from './senior-frontend-pro';

// Registry of all available templates
export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
  'executive-split-v2': executiveSplitConfig,
  'minimal-v2': minimalConfig,
  'bold-headline-v2': boldHeadlineConfig,
  'data-pro-v2': dataProConfig,
  'accountant-pro-v2': accountantProConfig,
  'senior-frontend-pro-v2': seniorFrontendProConfig,
};

// Get template by ID
export function getTemplateConfig(templateId: string): TemplateConfig | undefined {
  return TEMPLATE_REGISTRY[templateId];
}

// Get all templates
export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATE_REGISTRY);
}

// Get templates by category
export function getTemplatesByCategory(category: TemplateConfig['category']): TemplateConfig[] {
  return Object.values(TEMPLATE_REGISTRY).filter(t => t.category === category);
}

// Export individual templates
export { executiveSplitConfig, minimalConfig, boldHeadlineConfig, dataProConfig, accountantProConfig, seniorFrontendProConfig };
