/**
 * Certifications Variant Types
 */

import type { TemplateConfig } from '../../../../types';
import type { CertificationItem } from '../../../../types/resumeData';

export interface CertificationsVariantProps {
  items: CertificationItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddCertification?: () => void;
  onRemoveCertification?: (id: string) => void;
  formatDate?: (date: string) => string;
}

export type CertificationsVariant =
  | 'standard'
  | 'list'
  | 'cert-classic'
  | 'cert-modern'
  | 'cards'
  | 'cert-two-column'
  | 'cert-boxed'
  | 'compact'
  | 'cert-compact'
  | 'cert-minimal'
  | 'badges'
  | 'cert-badges'
  | 'timeline'
  | 'cert-timeline'
  | 'cert-detailed'
  | 'cert-grouped';
