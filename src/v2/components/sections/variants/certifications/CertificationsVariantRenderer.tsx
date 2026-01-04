/**
 * Certifications Variant Renderer
 */

import React from 'react';
import type { CertificationsVariantProps, CertificationsVariant } from './types';
import {
  CertificationsStandard,
  CertificationsBadges,
  CertificationsCompact,
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

  // Dispatch based on variant
  if (variant === 'badges' || variant === 'cert-badges') {
    return <CertificationsBadges {...props} />;
  }

  if (variant === 'cards' || variant === 'cert-two-column' || variant === 'cert-boxed') {
    return <CertificationsBadges {...props} />;
  }

  if (variant === 'compact' || variant === 'cert-compact' || variant === 'cert-minimal') {
    return <CertificationsCompact {...props} />;
  }

  // Default to standard for 'list', 'standard', 'timeline', etc.
  return <CertificationsStandard {...props} />;
};

export default CertificationsVariantRenderer;
