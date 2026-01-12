/**
 * Certifications Variant Renderer
 *
 * Available variants:
 * - standard: Clean list with name, issuer, date (most common)
 * - compact: Single-line minimal format
 * - detailed: Full info with icon, credential ID, expiry, description
 * - badges/grid: Two-column grid layout
 */

import React from 'react';
import type { CertificationsVariantProps, CertificationsVariant } from './types';
import {
  CertificationsStandard,
  CertificationsBadges,
  CertificationsCompact,
  CertificationsDetailed,
} from './variants';

export type { CertificationsVariantProps, CertificationsVariant } from './types';

interface CertificationsVariantRendererProps extends CertificationsVariantProps {
  variant: CertificationsVariant;
}

export const CertificationsVariantRenderer: React.FC<CertificationsVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddCertification,
  onRemoveCertification,
  formatDate,
}) => {
  const props: CertificationsVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddCertification,
    onRemoveCertification,
    formatDate,
  };

  // Detailed variant - shows all fields with icon
  if (variant === 'detailed' || variant === 'cert-detailed' || variant === 'timeline' || variant === 'cert-timeline') {
    return <CertificationsDetailed {...props} />;
  }

  // Grid/badges variant - two-column layout
  if (variant === 'badges' || variant === 'cert-badges' || variant === 'cards' || variant === 'cert-two-column' || variant === 'cert-boxed') {
    return <CertificationsBadges {...props} />;
  }

  // Compact variant - single line
  if (variant === 'compact' || variant === 'cert-compact' || variant === 'cert-minimal') {
    return <CertificationsCompact {...props} />;
  }

  // Default to standard - clean list format
  return <CertificationsStandard {...props} />;
};

export default CertificationsVariantRenderer;
