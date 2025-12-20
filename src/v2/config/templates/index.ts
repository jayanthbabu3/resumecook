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
import { centeredPhotoConfig } from './centered-photo';
import { creativeSplitConfig } from './creative-split';
import { classicMinimalConfig } from './classic-minimal';
import { professionalBlueConfig } from './professional-blue';
import { elegantAtsConfig } from './elegant-ats';
import { refinedPortraitConfig } from './refined-portrait';
import { analystClarityConfig } from './analyst-clarity';
import { obstacleSolverConfig } from './obstacle-solver';
import { terminalThemeConfig } from './terminal-theme';

// Registry of all available templates
export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
  'executive-split-v2': executiveSplitConfig,
  'minimal-v2': minimalConfig,
  'bold-headline-v2': boldHeadlineConfig,
  'data-pro-v2': dataProConfig,
  'accountant-pro-v2': accountantProConfig,
  'senior-frontend-pro-v2': seniorFrontendProConfig,
  'centered-photo-v2': centeredPhotoConfig,
  'creative-split-v2': creativeSplitConfig,
  'classic-minimal-v2': classicMinimalConfig,
  'professional-blue-v2': professionalBlueConfig,
  'elegant-ats-v2': elegantAtsConfig,
  'refined-portrait-v2': refinedPortraitConfig,
  'analyst-clarity-v2': analystClarityConfig,
  'obstacle-solver-v2': obstacleSolverConfig,
  'terminal-theme-v2': terminalThemeConfig,
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
export {
  executiveSplitConfig,
  minimalConfig,
  boldHeadlineConfig,
  dataProConfig,
  accountantProConfig,
  seniorFrontendProConfig,
  centeredPhotoConfig,
  creativeSplitConfig,
  classicMinimalConfig,
  professionalBlueConfig,
  elegantAtsConfig,
  refinedPortraitConfig,
  analystClarityConfig,
  obstacleSolverConfig,
  terminalThemeConfig,
};
