/**
 * Languages Variant Types
 */

import type { TemplateConfig } from '../../../../types';
import type { LanguageItem } from '../../../../types/resumeData';

export interface LanguagesVariantProps {
  items: LanguageItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddLanguage?: () => void;
  onRemoveLanguage?: (id: string) => void;
}

export type LanguagesVariant =
  | 'standard'
  | 'bars'
  | 'compact'
  | 'grid'
  | 'inline'
  | 'pills'
  | 'flags';
