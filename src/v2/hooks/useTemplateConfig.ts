/**
 * Resume Builder V2 - Template Configuration Hook
 * 
 * Provides access to template configuration with theme color overrides.
 */

import { useMemo, useCallback } from 'react';
import type { TemplateConfig, SectionConfig } from '../types';
import { getTemplateConfig } from '../config/templates';
import { applyThemeColor, applyThemeColors, DEFAULT_TEMPLATE_CONFIG } from '../config/defaultConfig';

interface UseTemplateConfigOptions {
  templateId: string;
  themeColor?: string;
  themeColors?: { primary?: string; secondary?: string };
  sectionOverrides?: Partial<Record<string, Partial<SectionConfig>>>;
}

interface UseTemplateConfigReturn {
  config: TemplateConfig;
  getTypography: (key: keyof TemplateConfig['typography']) => TemplateConfig['typography'][keyof TemplateConfig['typography']];
  getSpacing: (key: keyof TemplateConfig['spacing']) => string;
  getColor: (path: string) => string;
  getSectionConfig: (sectionId: string) => SectionConfig | undefined;
  getEnabledSections: (column?: 'main' | 'sidebar') => SectionConfig[];
  updateSectionOrder: (sectionId: string, newOrder: number) => SectionConfig[];
  toggleSection: (sectionId: string) => SectionConfig[];
  updateSectionTitle: (sectionId: string, newTitle: string) => SectionConfig[];
}

export function useTemplateConfig({
  templateId,
  themeColor,
  themeColors,
  sectionOverrides,
}: UseTemplateConfigOptions): UseTemplateConfigReturn {
  // Get base template config
  const baseConfig = useMemo(() => {
    return getTemplateConfig(templateId) || DEFAULT_TEMPLATE_CONFIG;
  }, [templateId]);

  // Apply theme color and section overrides
  const config = useMemo(() => {
    let result = baseConfig;
    
    // Apply multi-color theme if provided (check if object has any color values)
    const hasThemeColors = themeColors && (themeColors.primary || themeColors.secondary);
    if (hasThemeColors) {
      result = applyThemeColors(result, themeColors);
    }
    // Otherwise apply single theme color (backward compatibility)
    else if (themeColor) {
      result = applyThemeColor(result, themeColor);
    }
    
    if (sectionOverrides) {
      const existingIds = new Set(result.sections.map(s => s.id));
      
      // First apply overrides to existing sections and disable by type if needed
      let sections = result.sections.map(section => {
        const override = sectionOverrides[section.id];
        // Check if this section type should be disabled
        const disableTypeKey = `__disable_type_${section.type}`;
        const shouldDisable = sectionOverrides[disableTypeKey];
        if (shouldDisable) {
          return { ...section, enabled: false };
        }
        // If override exists, use it; otherwise disable the section (for scratch builder)
        // This ensures only explicitly added sections are shown
        if (override) {
          return { ...section, ...override };
        }
        // For scratch builder, disable base sections that aren't overridden
        // Check if we're in scratch builder mode (has __disable_type keys)
        const hasDisableKeys = Object.keys(sectionOverrides).some(k => k.startsWith('__disable_type_'));
        if (hasDisableKeys) {
          return { ...section, enabled: false };
        }
        return section;
      });
      
      // Then append any new sections that are not in base config
      Object.entries(sectionOverrides).forEach(([id, override]) => {
        // Skip special keys (disable keys, header variant, layout override)
        if (id.startsWith('__disable_type_') || id === '__header_variant' || id === '__layout_override') return;
        if (!existingIds.has(id)) {
          const order =
            typeof override.order === 'number'
              ? override.order
              : sections.length + 1;
          sections = [
            ...sections,
            {
              type: override.type || 'custom',
              id,
              title: override.title || 'New Section',
              defaultTitle: override.defaultTitle || override.title || 'New Section',
              enabled: override.enabled !== false,
              order,
              column: override.column || 'main',
              ...override,
            },
          ];
        }
      });

      // Sort by order to keep deterministic rendering
      sections = sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      // Apply header variant if provided in overrides
      if (sectionOverrides['__header_variant']) {
        result = {
          ...result,
          header: {
            ...result.header,
            variant: sectionOverrides['__header_variant'] as any,
          },
        };
      }

      // Apply layout override if provided (for scratch builder)
      if (sectionOverrides['__layout_override']) {
        const layoutOverride = sectionOverrides['__layout_override'] as any;
        result = {
          ...result,
          layout: {
            ...result.layout,
            ...layoutOverride,
          },
        };
      }

      result = {
        ...result,
        sections,
      };
    }
    
    return result;
  }, [baseConfig, themeColor, themeColors, sectionOverrides]);

  // Get typography config
  const getTypography = useCallback(
    (key: keyof TemplateConfig['typography']) => config.typography[key],
    [config.typography]
  );

  // Get spacing value
  const getSpacing = useCallback(
    (key: keyof TemplateConfig['spacing']) => {
      const value = config.spacing[key];
      if (typeof value === 'object') {
        // For pagePadding, return as CSS string
        const padding = value as TemplateConfig['spacing']['pagePadding'];
        return `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`;
      }
      return value;
    },
    [config.spacing]
  );

  // Get color by path (e.g., 'text.primary', 'background.page')
  const getColor = useCallback(
    (path: string) => {
      const parts = path.split('.');
      let result: any = config.colors;
      
      for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          return config.colors.primary; // Fallback
        }
      }
      
      return typeof result === 'string' ? result : config.colors.primary;
    },
    [config.colors]
  );

  // Get section config by ID
  const getSectionConfig = useCallback(
    (sectionId: string) => config.sections.find(s => s.id === sectionId),
    [config.sections]
  );

  // Get enabled sections, optionally filtered by column
  const getEnabledSections = useCallback(
    (column?: 'main' | 'sidebar') => {
      return config.sections
        .filter(s => s.enabled && (column ? s.column === column : true))
        .sort((a, b) => a.order - b.order);
    },
    [config.sections]
  );

  // Update section order
  const updateSectionOrder = useCallback(
    (sectionId: string, newOrder: number) => {
      return config.sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, order: newOrder };
        }
        return section;
      }).sort((a, b) => a.order - b.order);
    },
    [config.sections]
  );

  // Toggle section enabled state
  const toggleSection = useCallback(
    (sectionId: string) => {
      return config.sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, enabled: !section.enabled };
        }
        return section;
      });
    },
    [config.sections]
  );

  // Update section title
  const updateSectionTitle = useCallback(
    (sectionId: string, newTitle: string) => {
      return config.sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, title: newTitle };
        }
        return section;
      });
    },
    [config.sections]
  );

  return {
    config,
    getTypography,
    getSpacing,
    getColor,
    getSectionConfig,
    getEnabledSections,
    updateSectionOrder,
    toggleSection,
    updateSectionTitle,
  };
}
