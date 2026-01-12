/**
 * Resume Builder V2 - Languages Section Component
 *
 * Displays language proficiency with inline editing support
 * Uses variant renderers for different display styles
 */

import React from 'react';
import type { TemplateConfig, LanguageItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import { LanguagesVariantRenderer, type LanguagesVariant } from '../sections/variants/languages';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface LanguagesSectionProps {
  items: LanguageItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddLanguage?: () => void;
  onRemoveLanguage?: (langId: string) => void;
  onUpdateLanguage?: (langId: string, field: string, value: string) => void;
  variantOverride?: string;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Languages',
  onAddLanguage,
  onRemoveLanguage,
  variantOverride,
}) => {
  const { colors, spacing } = config;
  const accent = colors.primary;

  // Map variant names to LanguagesVariant type
  // Default is 'compact' (horizontal layout) for clean, modern look
  const getVariant = (variantId: string | undefined): LanguagesVariant => {
    // Default to compact (horizontal layout like: ENGLISH (Native) HINDI (Professional))
    // This is the standard format for languages across all templates unless explicitly configured otherwise
    if (!variantId) return 'compact';

    // Direct mappings
    const directVariants: LanguagesVariant[] = [
      'standard',
      'bars',
      'compact',
      'grid',
      'inline',
      'pills',
      'flags',
    ];

    if (directVariants.includes(variantId as LanguagesVariant)) {
      return variantId as LanguagesVariant;
    }

    // Legacy variant ID mappings (from sectionVariants.ts)
    const variantMap: Record<string, LanguagesVariant> = {
      'lang-classic': 'standard',
      'lang-bars': 'bars',
      'lang-pills': 'pills',
      'lang-flag': 'flags',
      'lang-rating': 'bars',
      'lang-minimal': 'compact',
      'lang-inline': 'compact', // inline now maps to compact
      'lang-compact': 'compact',
      'lang-detailed': 'standard',
      'lang-grid': 'grid',
    };

    return variantMap[variantId] || 'compact';
  };

  const variant = getVariant(variantOverride);

  if (!items.length && !editable) return null;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={accent}
      />

      <div style={{ marginTop: spacing.headingToContent }}>
        <LanguagesVariantRenderer
          variant={variant}
          items={items}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddLanguage={onAddLanguage}
          onRemoveLanguage={onRemoveLanguage}
        />
      </div>
    </section>
  );
};

export default LanguagesSection;
