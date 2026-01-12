/**
 * Awards Variant Types
 */

import type { TemplateConfig } from '../../../../types';
import type { AwardItem } from '../../../../types/resumeData';

export interface AwardsVariantProps {
  items: AwardItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddAward?: () => void;
  onRemoveAward?: (id: string) => void;
  formatDate?: (date: string) => string;
}

export type AwardsVariant = 
  | 'standard'
  | 'cards'
  | 'compact'
  | 'trophies'
  | 'timeline';
