/**
 * Patents Variant Types
 */

import type { TemplateConfig } from '../../../../types';

export interface PatentItem {
  id: string;
  title: string;
  patentNumber: string;
  date: string;
  status: 'Pending' | 'Granted' | 'Published';
  inventors?: string[];
  description?: string;
  url?: string;
}

export interface PatentsVariantProps {
  items: PatentItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddPatent?: () => void;
  onRemovePatent?: (id: string) => void;
  formatDate?: (date: string) => string;
}

export type PatentsVariant = 'standard' | 'detailed' | 'compact' | 'cards';
