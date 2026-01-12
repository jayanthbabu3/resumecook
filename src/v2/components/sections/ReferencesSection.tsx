/**
 * References Section Component (V2)
 *
 * Renders professional references with variant support.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { ReferencesVariantRenderer } from './variants/references/ReferencesVariantRenderer';
import type { ReferencesVariant } from './variants/references/types';

interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
}

interface ReferencesSectionProps {
  items: ReferenceItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'References',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { spacing, colors } = config;
  const accent = colors.primary;

  // For 'available' variant, always show the section
  const variant: ReferencesVariant = (variantOverride as ReferencesVariant) || 'standard';

  if (!items?.length && !editable && variant !== 'available') return null;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <ReferencesVariantRenderer
          variant={variant}
          items={items || []}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddReference={onAddItem}
          onRemoveReference={onRemoveItem}
        />
      </div>
    </section>
  );
};

export default ReferencesSection;
