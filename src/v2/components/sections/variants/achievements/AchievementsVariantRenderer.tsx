/**
 * Achievements Variant Renderer
 *
 * Dispatcher component that renders achievements based on the selected variant.
 */

import React from 'react';
import type { AchievementsVariantProps, AchievementsVariant } from './types';
import {
  AchievementsStandard,
  AchievementsCompact,
  AchievementsBadges,
} from './variants';

// Re-export types for external use
export type { AchievementsVariantProps, AchievementsVariant } from './types';

interface AchievementsVariantRendererProps extends AchievementsVariantProps {
  /** Variant to render */
  variant: AchievementsVariant;
}

export const AchievementsVariantRenderer: React.FC<AchievementsVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddAchievement,
  onRemoveAchievement,
  showIndicators = true,
}) => {
  const props: AchievementsVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddAchievement,
    onRemoveAchievement,
    showIndicators,
  };

  // Dispatch based on variant
  if (variant === 'badges' || variant === 'cards' || variant === 'achievements-cards' || variant === 'metrics' || variant === 'achievements-metrics') {
    return <AchievementsBadges {...props} />;
  }

  if (variant === 'compact' || variant === 'minimal' || variant === 'achievements-minimal') {
    return <AchievementsCompact {...props} />;
  }

  // Default to standard for 'standard', 'list', 'bullets', 'timeline', 'achievements-classic', 'achievements-timeline', etc.
  return <AchievementsStandard {...props} />;
};

export default AchievementsVariantRenderer;
