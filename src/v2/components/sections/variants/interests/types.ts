/**
 * Interests/Hobbies Variant Types
 */

import type { TemplateConfig } from '../../../../types';
import type { InterestItem } from '../../../../types/resumeData';

export interface InterestsVariantProps {
  items: InterestItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddInterest?: () => void;
  onRemoveInterest?: (id: string) => void;
}

export type InterestsVariant =
  | 'standard'
  | 'pills'
  | 'list'
  | 'detailed'
  | 'grid'
  | 'icons';
