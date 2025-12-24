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
import { professionalSalesConfig } from './professional-sales';
import { frontendHorizonConfig } from './frontend-horizon';
import { backendPrecisionConfig } from './backend-precision';
import { fullstackAtlasConfig } from './fullstack-atlas';
import { platformCoreConfig } from './platform-core';
import { cloudOpsConfig } from './cloud-ops';
import { systemArchitectConfig } from './system-architect';
import { productEngineerConfig } from './product-engineer';
import { devopsCommandConfig } from './devops-command';
import { mobileCraftConfig } from './mobile-craft';
import { apiLedgerConfig } from './api-ledger';

// Fresher Templates
import { fresherStarterConfig } from './fresher-starter';
import { fresherModernConfig } from './fresher-modern';
import { fresherElegantConfig } from './fresher-elegant';
import { fresherBoldConfig } from './fresher-bold';
import { fresherMinimalConfig } from './fresher-minimal';
import { fresherCreativeConfig } from './fresher-creative';
import { fresherProfessionalConfig } from './fresher-professional';
import { fresherCompactConfig } from './fresher-compact';
import { fresherTechConfig } from './fresher-tech';
import { fresherGradientConfig } from './fresher-gradient';
import { fresherClassicConfig } from './fresher-classic';

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
  'professional-sales-v2': professionalSalesConfig,
  'frontend-horizon-v2': frontendHorizonConfig,
  'backend-precision-v2': backendPrecisionConfig,
  'fullstack-atlas-v2': fullstackAtlasConfig,
  'platform-core-v2': platformCoreConfig,
  'cloud-ops-v2': cloudOpsConfig,
  'system-architect-v2': systemArchitectConfig,
  'product-engineer-v2': productEngineerConfig,
  'devops-command-v2': devopsCommandConfig,
  'mobile-craft-v2': mobileCraftConfig,
  'api-ledger-v2': apiLedgerConfig,
  // Fresher Templates
  'fresher-starter-v2': fresherStarterConfig,
  'fresher-modern-v2': fresherModernConfig,
  'fresher-elegant-v2': fresherElegantConfig,
  'fresher-bold-v2': fresherBoldConfig,
  'fresher-minimal-v2': fresherMinimalConfig,
  'fresher-creative-v2': fresherCreativeConfig,
  'fresher-professional-v2': fresherProfessionalConfig,
  'fresher-compact-v2': fresherCompactConfig,
  'fresher-tech-v2': fresherTechConfig,
  'fresher-gradient-v2': fresherGradientConfig,
  'fresher-classic-v2': fresherClassicConfig,
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
  professionalSalesConfig,
  frontendHorizonConfig,
  backendPrecisionConfig,
  fullstackAtlasConfig,
  platformCoreConfig,
  cloudOpsConfig,
  systemArchitectConfig,
  productEngineerConfig,
  devopsCommandConfig,
  mobileCraftConfig,
  apiLedgerConfig,
  // Fresher Templates
  fresherStarterConfig,
  fresherModernConfig,
  fresherElegantConfig,
  fresherBoldConfig,
  fresherMinimalConfig,
  fresherCreativeConfig,
  fresherProfessionalConfig,
  fresherCompactConfig,
  fresherTechConfig,
  fresherGradientConfig,
  fresherClassicConfig,
};
