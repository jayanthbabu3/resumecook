/**
 * Volunteer Section Component (V2)
 *
 * Renders volunteer experience with variant support.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { VolunteerVariantRenderer } from './variants/volunteer/VolunteerVariantRenderer';
import type { VolunteerVariant } from './variants/volunteer/types';

interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  highlights?: string[];
}

interface VolunteerSectionProps {
  items: VolunteerItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Volunteer Experience',
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
  const variant: VolunteerVariant = (variantOverride as VolunteerVariant) || 'standard';

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <VolunteerVariantRenderer
          variant={variant}
          items={items}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddVolunteer={onAddItem}
          onRemoveVolunteer={onRemoveItem}
          formatDate={formatDate}
        />
      </div>
    </section>
  );
};

export default VolunteerSection;
