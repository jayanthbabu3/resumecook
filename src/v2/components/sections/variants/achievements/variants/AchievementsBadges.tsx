/**
 * Achievements Badges Variant
 *
 * 2-column grid layout with card-style badges.
 */

import React from 'react';
import { X, Plus, Award } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { AchievementsVariantProps } from '../types';

export const AchievementsBadges: React.FC<AchievementsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAchievement,
  onRemoveAchievement,
  showIndicators = true,
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="group relative"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              padding: '10px 12px',
              backgroundColor: `${accentColor}08`,
              borderRadius: '6px',
              border: `1px solid ${accentColor}20`,
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

            {showIndicators && (
              <Award
                style={{
                  width: '16px',
                  height: '16px',
                  color: accentColor,
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              />
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: typography.body.fontSize,
                  lineHeight: typography.body.lineHeight,
                }}
              >
                {editable ? (
                  <>
                    <InlineEditableText
                      path={`achievements.${index}.title`}
                      value={item.title}
                      style={{ fontWeight: 600, color: typography.itemTitle.color, display: 'block' }}
                      placeholder="Achievement Title"
                    />
                    {(item.description || editable) && (
                      <InlineEditableText
                        path={`achievements.${index}.description`}
                        value={item.description || ''}
                        style={{ color: typography.body.color, fontSize: '11px', marginTop: '2px', display: 'block' }}
                        placeholder="Description"
                        multiline
                      />
                    )}
                  </>
                ) : (
                  <>
                    <span style={{ fontWeight: 600, color: typography.itemTitle.color, display: 'block' }}>
                      {item.title}
                    </span>
                    {item.description && (
                      <span style={{ color: typography.body.color, fontSize: '11px', marginTop: '2px', display: 'block' }}>
                        {item.description}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {editable && onAddAchievement && (
        <button
          onClick={onAddAchievement}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Achievement
        </button>
      )}
    </div>
  );
};

export default AchievementsBadges;
