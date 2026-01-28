/**
 * Achievements Timeline Variant
 *
 * Vertical timeline with connecting line and dots.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { AchievementsVariantProps } from '../types';

export const AchievementsTimeline: React.FC<AchievementsVariantProps> = ({
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
    <div style={{ position: 'relative', paddingLeft: '20px' }}>
      {/* Vertical timeline line */}
      <div style={{
        position: 'absolute',
        left: '5px',
        top: '6px',
        bottom: editable ? '40px' : '6px',
        width: '2px',
        backgroundColor: `${accentColor}30`,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="group relative"
            style={{
              position: 'relative',
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

            {/* Timeline dot */}
            <div style={{
              position: 'absolute',
              left: '-18px',
              top: '4px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              border: '2px solid #fff',
              boxShadow: `0 0 0 2px ${accentColor}30`,
            }} />

            {/* Content */}
            <div>
              {/* Title */}
              <div style={{
                fontSize: scaleFontSize(typography.itemTitle.fontSize || typography.body.fontSize),
                fontWeight: 600,
                color: typography.itemTitle.color,
                marginBottom: '2px',
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
                  fontSize: scaleFontSize(typography.body.fontSize),
                  lineHeight: typography.body.lineHeight,
                  color: typography.body.color,
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
        ))}
      </div>

      {editable && onAddAchievement && (
        <button
          onClick={onAddAchievement}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit mt-3"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Achievement
        </button>
      )}
    </div>
  );
};

export default AchievementsTimeline;

