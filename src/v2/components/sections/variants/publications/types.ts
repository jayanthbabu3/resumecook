/**
 * Publications Variant Types
 */

import type { TemplateConfig } from '../../../../types';

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  authors?: string[];
  url?: string;
  doi?: string;
  description?: string;
}

export interface PublicationsVariantProps {
  items: PublicationItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddPublication?: () => void;
  onRemovePublication?: (id: string) => void;
  formatDate?: (date: string) => string;
}

export type PublicationsVariant =
  | 'academic'
  | 'modern'
  | 'compact'
  | 'cards';
