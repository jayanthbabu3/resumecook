/**
 * Achievements Cards Variant
 *
 * Full-width cards with shadow and accent top border.
 */

import React from 'react';
import { X, Plus, Star } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { AchievementsVariantProps } from '../types';

export const AchievementsCards: React.FC<AchievementsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAchievement,
  onRemoveAchievement,
}) => {
  const { typography } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '12px 14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
            borderTop: `3px solid ${accentColor}`,
          }}
        >
          {editable && onRemoveAchievement && (
            <button
              onClick={() => onRemoveAchievement(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            {/* Star icon */}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: `${accentColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Star style={{ width: '14px', height: '14px', color: accentColor, fill: accentColor }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Title */}
              <div style={{
                fontSize: scaleFontSize(typography.body.fontSize),
                fontWeight: 600,
                color: typography.itemTitle.color,
                marginBottom: '4px',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`achievements.${index}.title`}
                    value={item.title}
                    placeholder="Achievement Title"
                  />
                ) : (
                  item.title
                )}
              </div>

              {/* Description */}
              {(item.description || editable) && (
                <div style={{
                  fontSize: scaleFontSize(typography.dates?.fontSize || '12px'),
                  lineHeight: 1.5,
                  color: '#6b7280',
                }}>
                  {editable ? (
                    <InlineEditableText
                      path={`achievements.${index}.description`}
                      value={item.description || ''}
                      placeholder="Description of the achievement..."
                      multiline
                    />
                  ) : (
                    item.description
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {editable && onAddAchievement && (
        <button
          onClick={onAddAchievement}
          className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Achievement
        </button>
      )}
    </div>
  );
};

export default AchievementsCards;

