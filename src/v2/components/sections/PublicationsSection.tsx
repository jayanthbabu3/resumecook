/**
 * Publications Section Component (V2)
 *
 * Renders publications, papers, and articles with variant support.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { PublicationsVariantRenderer } from './variants/publications/PublicationsVariantRenderer';
import type { PublicationsVariant } from './variants/publications/types';

interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  authors?: string[];
  url?: string;
  doi?: string;
  description?: string;
}

interface PublicationsSectionProps {
  items: PublicationItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Publications',
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

  // Determine the variant to use
  const variant: PublicationsVariant = (variantOverride as PublicationsVariant) || 'modern';

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <PublicationsVariantRenderer
          variant={variant}
          items={items}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddPublication={onAddItem}
          onRemovePublication={onRemoveItem}
          formatDate={formatDate}
        />
      </div>
    </section>
  );
};

export default PublicationsSection;
