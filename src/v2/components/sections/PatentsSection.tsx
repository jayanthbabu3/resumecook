/**
 * Patents Section Component (V2)
 *
 * Renders patents and intellectual property with variant support.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { PatentsVariantRenderer } from './variants/patents/PatentsVariantRenderer';
import type { PatentsVariant } from './variants/patents/types';

interface PatentItem {
  id: string;
  title: string;
  patentNumber: string;
  date: string;
  status: 'Pending' | 'Granted' | 'Published';
  inventors?: string[];
  description?: string;
  url?: string;
}

interface PatentsSectionProps {
  items: PatentItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const PatentsSection: React.FC<PatentsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Patents',
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
  const variant: PatentsVariant = (variantOverride as PatentsVariant) || 'standard';

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <PatentsVariantRenderer
          variant={variant}
          items={items}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddPatent={onAddItem}
          onRemovePatent={onRemoveItem}
          formatDate={formatDate}
        />
      </div>
    </section>
  );
};

export default PatentsSection;
