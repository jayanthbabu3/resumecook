/**
 * Achievements Variant Types
 */

import type { TemplateConfig } from '../../../../types';

export interface AchievementItem {
  id: string;
  title: string;
  description?: string;
}

export interface AchievementsVariantProps {
  items: AchievementItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddAchievement?: () => void;
  onRemoveAchievement?: (id: string) => void;
  showIndicators?: boolean;
}

export type AchievementsVariant =
  | 'standard'
  | 'list'
  | 'bullets'
  | 'cards'
  | 'compact'
  | 'badges'
  | 'timeline'
  | 'minimal'
  | 'metrics'
  | 'numbered'
  | 'achievements-classic'
  | 'achievements-metrics'
  | 'achievements-cards'
  | 'achievements-timeline'
  | 'achievements-minimal';
