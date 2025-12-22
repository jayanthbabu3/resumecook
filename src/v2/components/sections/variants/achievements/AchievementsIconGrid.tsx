/**
 * Achievements Icon Grid Variant
 * 
 * Production-ready achievements variant inspired by EnhanceCV.
 * Features: Circular accent icons, bold titles, description text,
 * works in both single and two-column layouts.
 */

import React from 'react';
import { Star, Award, TrendingUp, Target, Zap, CheckCircle, Trophy, Medal } from 'lucide-react';
import type { TemplateConfig } from '../../../../types';
import { InlineEditableText } from '@/components/resume/InlineEditableText';

interface Achievement {
  id: string;
  title: string;
  description?: string;
  text?: string;
}

interface AchievementsIconGridProps {
  items: Achievement[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
}

// Icon pool for achievements
const iconPool = [TrendingUp, Target, Zap, CheckCircle, Trophy, Star, Award, Medal];

export const AchievementsIconGrid: React.FC<AchievementsIconGridProps> = ({
  items,
  config,
  accentColor,
  editable = false,
}) => {
  const { typography, spacing } = config;

  if (!items?.length) return null;

  // Get icon for index (cycles through pool)
  const getIcon = (index: number) => iconPool[index % iconPool.length];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.itemGap || '16px',
    }}>
      {items.map((item, index) => {
        const Icon = getIcon(index);
        const description = item.description || item.text || '';
        
        return (
          <div
            key={item.id || index}
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            {/* Icon Circle */}
            <div style={{
              width: '32px',
              height: '32px',
              minWidth: '32px',
              borderRadius: '50%',
              backgroundColor: `${accentColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2px',
            }}>
              <Icon style={{
                width: '16px',
                height: '16px',
                color: accentColor,
              }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              {editable ? (
                <InlineEditableText
                  path={`achievements.${index}.title`}
                  value={item.title}
                  as="h4"
                  style={{
                    fontSize: typography.itemTitle?.fontSize || '14px',
                    fontWeight: '600',
                    color: accentColor,
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                  placeholder="Achievement Title"
                />
              ) : (
                <h4 style={{
                  fontSize: typography.itemTitle?.fontSize || '14px',
                  fontWeight: '600',
                  color: accentColor,
                  margin: 0,
                  lineHeight: '1.4',
                }}>
                  {item.title}
                </h4>
              )}
              
              {(description || editable) && (
                <div style={{ marginTop: '4px' }}>
                  {editable ? (
                    <InlineEditableText
                      path={`achievements.${index}.description`}
                      value={description}
                      style={{
                        fontSize: typography.body.fontSize,
                        color: '#4b5563',
                        lineHeight: '1.5',
                      }}
                      placeholder="Describe your achievement..."
                    />
                  ) : (
                    <p style={{
                      fontSize: typography.body.fontSize,
                      color: '#4b5563',
                      lineHeight: '1.5',
                      margin: 0,
                    }}>
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementsIconGrid;
