/**
 * Scratch Config Generator
 * 
 * Generates template configuration from scratch builder sections.
 * Everything is config-driven based on variant IDs.
 * IMPORTANT: Only explicitly added sections should appear - no defaults.
 */

import type { ScratchSection } from '../hooks/useScratchResume';
import type { ScratchLayout } from '../config/scratchLayouts';
import { getTemplateConfig } from '../config/templates';
import { DEFAULT_TEMPLATE_CONFIG } from '../config/defaultConfig';
import { getSectionDefinition } from '../registry/sectionRegistry';
import { getSectionVariants } from '@/constants/sectionVariants';

/**
 * Generate template config from scratch sections
 * Only includes sections that have been explicitly added by the user
 */
export function generateScratchConfig(
  sections: ScratchSection[],
  selectedLayout: ScratchLayout | null,
  themeColor: string = '#2563eb'
): any {
  // Start with a minimal base config but EXCLUDE default sections
  const templateConfig = getTemplateConfig('minimal-v2') || DEFAULT_TEMPLATE_CONFIG;
  // Create base config without default sections - we only want explicitly added sections
  const baseConfig = {
    ...templateConfig,
    sections: [], // Clear default sections - we'll only use explicitly added ones
  };

  // Apply layout configuration
  const layoutConfig = selectedLayout?.defaultConfig || {};
  
  // Separate header from other sections
  const headerSection = sections.find(s => s.type === 'header');
  const otherSections = sections.filter(s => s.type !== 'header');

  // Generate section configs ONLY from explicitly added scratch sections
  const sectionConfigs = otherSections
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order)
    .map((section) => {
      const sectionDef = getSectionDefinition(section.type);
      
      // Get variant title from variant definition
      let sectionTitle = sectionDef?.defaultTitle || section.type;
      if (section.variantId) {
        const variants = getSectionVariants(section.type);
        const variant = variants.find(v => v.id === section.variantId);
        if (variant?.previewData?.title) {
          sectionTitle = variant.previewData.title;
        }
      }
      
      return {
        type: section.type,
        id: section.id,
        title: sectionTitle,
        defaultTitle: sectionDef?.defaultTitle || section.type,
        enabled: true,
        order: section.order,
        column: section.column,
        variant: section.variantId,
      };
    });

  // Create header section config ONLY if explicitly added
  const headerSectionConfig = headerSection ? {
    type: 'header',
    id: 'header',
    title: 'Header',
    defaultTitle: 'Header',
    enabled: true,
    order: 0,
    variant: headerSection.variantId,
    // Mark full-width headers
    fullWidth: isFullWidthHeader(headerSection.variantId),
  } : null;

  // Build final sections array - ONLY explicitly added sections
  const finalSections: any[] = [];
  if (headerSectionConfig) {
    finalSections.push(headerSectionConfig);
  }
  finalSections.push(...sectionConfigs);

  // Find section variants
  const skillsSection = sections.find(s => s.type === 'skills' && s.enabled);
  const experienceSection = sections.find(s => s.type === 'experience' && s.enabled);

  // Create config with ONLY the explicitly added sections
  const config = {
    ...baseConfig,
    id: 'scratch-v2',
    name: 'Scratch Builder',
    colors: {
      ...baseConfig.colors,
      primary: themeColor,
    },
    layout: {
      ...baseConfig.layout,
      ...(layoutConfig as any).layout,
      type: selectedLayout?.layoutType || 'single-column',
    },
    spacing: {
      ...baseConfig.spacing,
      ...(layoutConfig as any).spacing,
    },
    // CRITICAL: Only use explicitly added sections - no defaults
    sections: finalSections,
    // Update header config if header variant is specified
    header: headerSection ? {
      ...baseConfig.header,
      variant: headerSection.variantId,
    } : baseConfig.header,
    // Update skills config if skills variant is specified
    skills: skillsSection ? {
      ...baseConfig.skills,
      variant: skillsSection.variantId,
    } : baseConfig.skills,
    // Update experience config if experience variant is specified
    experience: experienceSection ? {
      ...baseConfig.experience,
      variant: experienceSection.variantId,
    } : baseConfig.experience,
  };

  return config;
}

/**
 * Check if a header variant should be full-width (no padding)
 */
export function isFullWidthHeader(variantId: string): boolean {
  const fullWidthVariants = ['banner', 'photo-banner', 'gradient-banner', 'accent-bar'];
  return fullWidthVariants.includes(variantId);
}
