/**
 * Achievements Section Component (V2)
 *
 * Renders achievements with multiple visual variants using the variant renderer pattern.
 */

import React from 'react';
import type { TemplateConfig, AchievementItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import { AchievementsVariantRenderer, type AchievementsVariant } from './variants/achievements/AchievementsVariantRenderer';

interface AchievementsSectionProps {
  items: AchievementItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Achievements',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { spacing, colors } = config;

  // Direct type cast like other sections
  const variant: AchievementsVariant = (variantOverride as AchievementsVariant) || 'standard';
  const showIndicators = config.achievements?.showIndicators ?? true;

  if (!items || items.length === 0) {
    if (!editable) return null;
  }

  return (
    <div style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} />
      <div style={{ marginTop: spacing.headingToContent }}>
        <AchievementsVariantRenderer
          variant={variant}
          items={items || []}
          config={config}
          accentColor={colors.primary}
          editable={editable}
          onAddAchievement={onAddItem}
          onRemoveAchievement={onRemoveItem}
          showIndicators={showIndicators}
        />
      </div>
    </div>
  );
};

export default AchievementsSection;
