/**
 * Awards Section Component (V2)
 *
 * Renders awards and honors with variant support.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { AwardsVariantRenderer } from './variants/awards/AwardsVariantRenderer';
import type { AwardsVariant } from './variants/awards/types';

interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

interface AwardsSectionProps {
  items: AwardItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Awards',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { spacing, colors } = config;
  const accent = colors.primary;

  const styleContext = useStyleOptions();
  const formatDate = styleContext?.formatDate || ((date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  if (!items?.length && !editable) return null;

  // Determine the variant to use - pass through directly
  const variant: AwardsVariant = (variantOverride as AwardsVariant) || 'standard';

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <AwardsVariantRenderer
          variant={variant}
          items={items}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddAward={onAddItem}
          onRemoveAward={onRemoveItem}
          formatDate={formatDate}
        />
      </div>
    </section>
  );
};

export default AwardsSection;
