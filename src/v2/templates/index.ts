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
import { classicMinimalTemplate } from './classic-minimal';
import { professionalBlueTemplate } from './professional-blue';
import { elegantAtsTemplate } from './elegant-ats';
import { refinedPortraitTemplate } from './refined-portrait';
import { analystClarityTemplate } from './analyst-clarity';
import { obstacleSolverTemplate } from './obstacle-solver';
import { terminalThemeTemplate } from './terminal-theme';
import { professionalSalesTemplate } from './professional-sales';
import { frontendHorizonTemplate } from './frontend-horizon';
import { backendPrecisionTemplate } from './backend-precision';
import { fullstackAtlasTemplate } from './fullstack-atlas';
import { platformCoreTemplate } from './platform-core';
import { cloudOpsTemplate } from './cloud-ops';
import { systemArchitectTemplate } from './system-architect';
import { productEngineerTemplate } from './product-engineer';
import { mobileCraftTemplate } from './mobile-craft';
import { apiLedgerTemplate } from './api-ledger';

// Fresher Templates
import { fresherStarterTemplate } from './fresher-starter';
import { fresherElegantTemplate } from './fresher-elegant';
import { fresherBoldTemplate } from './fresher-bold';
import { fresherMinimalTemplate } from './fresher-minimal';
import { fresherProfessionalTemplate } from './fresher-professional';
import { fresherTechTemplate } from './fresher-tech';
import { fresherClassicTemplate } from './fresher-classic';
import { fresherTechnicalTemplate } from './fresher-technical';
import { fresherAtsProTemplate } from './fresher-ats-pro';
import { fresherCreativeCardTemplate } from './fresher-creative-card';

// Professional Templates
import { adminAssistantProTemplate } from './admin-assistant-pro';
import { projectManagerProTemplate } from './project-manager-pro';
import { impactLeaderTemplate } from './impact-leader';
import { techInnovatorTemplate } from './tech-innovator';
import { retailManagerProTemplate } from './retail-manager-pro';
import { theaterActorProTemplate } from './theater-actor-pro';
import { cioExecutiveTemplate } from './cio-executive';
import { hrProfessionalTemplate } from './hr-professional';
import { modernEleganceTemplate } from './modern-elegance';
import { creativeStarterTemplate } from './creative-starter';
import { professionalCompactTemplate } from './professional-compact';
import { elegantPortfolioTemplate } from './elegant-portfolio';
import { cleanMinimalTemplate } from './clean-minimal';
import { refinedSerifTemplate } from './refined-serif';
import { swissMinimalTemplate } from './swiss-minimal';
import { monoElegantTemplate } from './mono-elegant';
import { lineAccentTemplate } from './line-accent';

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
  'classic-minimal-v2': classicMinimalTemplate,
  'professional-blue-v2': professionalBlueTemplate,
  'elegant-ats-v2': elegantAtsTemplate,
  'refined-portrait-v2': refinedPortraitTemplate,
  'analyst-clarity-v2': analystClarityTemplate,
  'obstacle-solver-v2': obstacleSolverTemplate,
  'terminal-theme-v2': terminalThemeTemplate,
  'professional-sales-v2': professionalSalesTemplate,
  'frontend-horizon-v2': frontendHorizonTemplate,
  'backend-precision-v2': backendPrecisionTemplate,
  'fullstack-atlas-v2': fullstackAtlasTemplate,
  'platform-core-v2': platformCoreTemplate,
  'cloud-ops-v2': cloudOpsTemplate,
  'system-architect-v2': systemArchitectTemplate,
  'product-engineer-v2': productEngineerTemplate,
  'mobile-craft-v2': mobileCraftTemplate,
  'api-ledger-v2': apiLedgerTemplate,
  // Fresher Templates
  'fresher-starter-v2': fresherStarterTemplate,
  'fresher-elegant-v2': fresherElegantTemplate,
  'fresher-bold-v2': fresherBoldTemplate,
  'fresher-minimal-v2': fresherMinimalTemplate,
  'fresher-professional-v2': fresherProfessionalTemplate,
  'fresher-tech-v2': fresherTechTemplate,
  'fresher-classic-v2': fresherClassicTemplate,
  'fresher-technical-v2': fresherTechnicalTemplate,
  'fresher-ats-pro-v2': fresherAtsProTemplate,
  'fresher-creative-card-v2': fresherCreativeCardTemplate,
  // Professional Templates
  'admin-assistant-pro-v2': adminAssistantProTemplate,
  'project-manager-pro-v2': projectManagerProTemplate,
  'impact-leader-v2': impactLeaderTemplate,
  'tech-innovator-v2': techInnovatorTemplate,
  'retail-manager-pro-v2': retailManagerProTemplate,
  'theater-actor-pro-v2': theaterActorProTemplate,
  'cio-executive-v2': cioExecutiveTemplate,
  'hr-professional-v2': hrProfessionalTemplate,
  'modern-elegance-v2': modernEleganceTemplate,
  'creative-starter-v2': creativeStarterTemplate,
  'professional-compact-v2': professionalCompactTemplate,
  'elegant-portfolio-v2': elegantPortfolioTemplate,
  'clean-minimal-v2': cleanMinimalTemplate,
  'refined-serif-v2': refinedSerifTemplate,
  'swiss-minimal-v2': swissMinimalTemplate,
  'mono-elegant-v2': monoElegantTemplate,
  'line-accent-v2': lineAccentTemplate,
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
 * Get fresher templates
 */
export function getFresherTemplates(): TemplateDefinition[] {
  return getAllTemplates().filter(t => t.meta.tags?.includes('fresher'));
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
export { classicMinimalTemplate } from './classic-minimal';
export { professionalBlueTemplate } from './professional-blue';
export { elegantAtsTemplate } from './elegant-ats';
export { refinedPortraitTemplate } from './refined-portrait';
export { analystClarityTemplate } from './analyst-clarity';
export { obstacleSolverTemplate } from './obstacle-solver';
export { terminalThemeTemplate } from './terminal-theme';
export { professionalSalesTemplate } from './professional-sales';
export { frontendHorizonTemplate } from './frontend-horizon';
export { backendPrecisionTemplate } from './backend-precision';
export { fullstackAtlasTemplate } from './fullstack-atlas';
export { platformCoreTemplate } from './platform-core';
export { cloudOpsTemplate } from './cloud-ops';
export { systemArchitectTemplate } from './system-architect';
export { productEngineerTemplate } from './product-engineer';
export { mobileCraftTemplate } from './mobile-craft';
export { apiLedgerTemplate } from './api-ledger';

// Fresher Templates
export { fresherStarterTemplate } from './fresher-starter';
export { fresherElegantTemplate } from './fresher-elegant';
export { fresherBoldTemplate } from './fresher-bold';
export { fresherMinimalTemplate } from './fresher-minimal';
export { fresherProfessionalTemplate } from './fresher-professional';
export { fresherTechTemplate } from './fresher-tech';
export { fresherClassicTemplate } from './fresher-classic';
export { fresherTechnicalTemplate } from './fresher-technical';
export { fresherAtsProTemplate } from './fresher-ats-pro';
export { fresherCreativeCardTemplate } from './fresher-creative-card';

// Professional Templates
export { adminAssistantProTemplate } from './admin-assistant-pro';
export { impactLeaderTemplate } from './impact-leader';
export { techInnovatorTemplate } from './tech-innovator';
export { retailManagerProTemplate } from './retail-manager-pro';
export { theaterActorProTemplate } from './theater-actor-pro';
export { cioExecutiveTemplate } from './cio-executive';
export { hrProfessionalTemplate } from './hr-professional';
export { professionalCompactTemplate } from './professional-compact';
export { elegantPortfolioTemplate } from './elegant-portfolio';
export { cleanMinimalTemplate } from './clean-minimal';
