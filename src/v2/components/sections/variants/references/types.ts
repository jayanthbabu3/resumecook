/**
 * References Variant Types
 */

import type { TemplateConfig } from '../../../../types';

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
}

export interface ReferencesVariantProps {
  items: ReferenceItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddReference?: () => void;
  onRemoveReference?: (id: string) => void;
}

export type ReferencesVariant = 'standard' | 'compact' | 'cards' | 'available';
