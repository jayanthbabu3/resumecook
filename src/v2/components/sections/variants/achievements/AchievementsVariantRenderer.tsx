/**
 * Achievements Variant Renderer
 *
 * Dispatcher component that renders achievements based on the selected variant.
 */

import React from 'react';
import type { AchievementsVariantProps, AchievementsVariant } from './types';
import {
  AchievementsStandard,
  AchievementsList,
  AchievementsBullets,
  AchievementsNumbered,
  AchievementsTimeline,
  AchievementsCompact,
  AchievementsMinimal,
  AchievementsBadges,
  AchievementsCards,
  AchievementsMetrics,
  AchievementsBoxed,
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
  switch (variant) {
    case 'boxed':
      return <AchievementsBoxed {...props} />;

    case 'badges':
      // Badges: 2-column grid with Award icons, tinted background
      return <AchievementsBadges {...props} />;

    case 'cards':
    case 'achievements-cards':
      // Cards: Full-width cards with shadow and accent top border
      return <AchievementsCards {...props} />;

    case 'metrics':
    case 'achievements-metrics':
      // Metrics: Large numbers/percentages prominently displayed
      return <AchievementsMetrics {...props} />;

    case 'compact':
      // Compact: Bullet dots with em-dash separator
      return <AchievementsCompact {...props} />;

    case 'minimal':
    case 'achievements-minimal':
      // Minimal: No bullets, clean stacked text with subtle separators
      return <AchievementsMinimal {...props} />;

    case 'list':
      // List variant: Title on top, description below with left accent border
      return <AchievementsList {...props} />;

    case 'bullets':
      // Bullets variant: Simple bullet points with accent-colored dots
      return <AchievementsBullets {...props} />;

    case 'numbered':
      // Numbered variant: Numbers in accent-colored circles
      return <AchievementsNumbered {...props} />;

    case 'timeline':
    case 'achievements-timeline':
      // Timeline variant: Vertical timeline with connecting line and dots
      return <AchievementsTimeline {...props} />;

    case 'standard':
    case 'achievements-classic':
    default:
      // Standard variant: Trophy icons with "Title - Description" format
      return <AchievementsStandard {...props} />;
  }
};

export default AchievementsVariantRenderer;
