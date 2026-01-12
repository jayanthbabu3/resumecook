/**
 * Interests Section Component (V2)
 *
 * Renders interests and hobbies with variant support.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InterestsVariantRenderer } from './variants/interests/InterestsVariantRenderer';
import type { InterestsVariant } from './variants/interests/types';

interface InterestItem {
  id: string;
  name: string;
  description?: string;
}

interface InterestsSectionProps {
  items: InterestItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Interests',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { spacing, colors } = config;
  const accent = colors.primary;

  if (!items?.length && !editable) return null;

  // Determine the variant to use
  const variant: InterestsVariant = (variantOverride as InterestsVariant) || 'pills';

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <InterestsVariantRenderer
          variant={variant}
          items={items}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddInterest={onAddItem}
          onRemoveInterest={onRemoveItem}
        />
      </div>
    </section>
  );
};

export default InterestsSection;
