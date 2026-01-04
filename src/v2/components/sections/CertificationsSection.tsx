/**
 * Certifications Section Component (V2)
 *
 * Renders certifications with multiple visual variants using variant renderer.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { CertificationsVariantRenderer } from './variants/certifications/CertificationsVariantRenderer';
import type { CertificationsVariant } from './variants/certifications/types';

interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  expiryDate?: string;
  url?: string;
  description?: string;
}

interface CertificationsSectionProps {
  items: CertificationItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Certifications',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { spacing, colors } = config;
  const accent = colors.primary;

  // Determine the variant to use
  const variant: CertificationsVariant = (variantOverride as CertificationsVariant) || 'standard';

  const styleContext = useStyleOptions();
  const formatDate = styleContext?.formatDate || ((date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  if (!items?.length && !editable) return null;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <CertificationsVariantRenderer
          variant={variant}
          items={items || []}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddCertification={onAddItem}
          onRemoveCertification={onRemoveItem}
          formatDate={formatDate}
        />
      </div>
    </section>
  );
};

export default CertificationsSection;
