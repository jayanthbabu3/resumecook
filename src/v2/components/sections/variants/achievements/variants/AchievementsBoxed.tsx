/**
 * Achievements Boxed Variant
 *
 * Displays achievements as stacked bordered boxes - one item per box.
 * Useful for displaying additional skills, certifications, or achievements
 * in a clean, scannable format.
 */

import React from 'react';
import type { AchievementsVariantProps } from '../types';

export const AchievementsBoxed: React.FC<AchievementsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
}) => {
  const { typography, spacing } = config;

  if (!items || items.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.skillGap || '8px',
    }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: '8px 14px',
            fontSize: typography.body.fontSize,
            fontWeight: 400,
            color: typography.body.color || '#374151',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            lineHeight: '1.4',
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default AchievementsBoxed;
