/**
 * Scratch Config Generator
 * 
 * Generates template configuration from scratch builder sections.
 * Everything is config-driven based on variant IDs.
 */

import type { TemplateConfig, SectionConfig } from '../types/templateConfig';
import type { ScratchSection } from '../hooks/useScratchResume';
import type { ScratchLayout } from '../config/scratchLayouts';
import { getTemplateConfig } from '../config/templates';
import { DEFAULT_TEMPLATE_CONFIG } from '../config/defaultConfig';
import { getSectionDefinition } from '../registry/sectionRegistry';
import { getSectionVariants } from '@/constants/sectionVariants';

/**
 * Generate template config from scratch sections
 */
export function generateScratchConfig(
  sections: ScratchSection[],
  selectedLayout: ScratchLayout | null,
  themeColor: string = '#2563eb'
): TemplateConfig {
  // Start with a default template config
  const baseConfig = getTemplateConfig('professional-blue-v2') || DEFAULT_TEMPLATE_CONFIG;

  // Apply layout configuration
  const layoutConfig = selectedLayout?.defaultConfig || {};
  
  // Separate header from other sections
  const headerSection = sections.find(s => s.type === 'header');
  const otherSections = sections.filter(s => s.type !== 'header');

  // Generate section configs from scratch sections
  const sectionConfigs: SectionConfig[] = otherSections
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
        } else if (variant?.name) {
          sectionTitle = variant.name;
        }
      }
      
      return {
        type: section.type,
        id: section.id,
        title: sectionTitle,
        defaultTitle: sectionDef?.defaultTitle || section.type,
        enabled: section.enabled,
        order: section.order,
        column: section.column,
        variant: section.variantId, // Store variant ID for rendering
      } as SectionConfig;
    });

  // Create header section config (enabled if explicitly added, otherwise disabled but space reserved)
  const headerSectionConfig: SectionConfig = headerSection ? {
    type: 'header',
    id: 'header',
    title: 'Header',
    defaultTitle: 'Header',
    enabled: true,
    order: 0,
    variant: headerSection.variantId, // Store header variant ID
  } : {
    type: 'header',
    id: 'header',
    title: 'Header',
    defaultTitle: 'Header',
    enabled: false, // Disabled but space will be reserved
    order: 0,
  };

  // Merge with base config - use only scratch sections
  const config: TemplateConfig = {
    ...baseConfig,
    id: 'scratch-v2',
    name: 'Scratch Builder',
    colors: {
      ...baseConfig.colors,
      primary: themeColor,
    },
    layout: {
      ...baseConfig.layout,
      ...layoutConfig.layout,
    },
    spacing: {
      ...baseConfig.spacing,
      ...layoutConfig.spacing,
    },
    // Only use scratch sections + header (enabled or disabled)
    // This ensures no base template sections appear
    sections: [headerSectionConfig, ...sectionConfigs],
    // Update header config if header variant is specified
    header: headerSection ? {
      ...baseConfig.header,
      variant: headerSection.variantId as any, // Use header variant
    } : baseConfig.header,
  };

  return config;
}

