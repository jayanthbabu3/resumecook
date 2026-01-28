/**
 * Achievements List Variant
 *
 * Title on top line, description below - clean stacked format.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { AchievementsVariantProps } from '../types';

export const AchievementsList: React.FC<AchievementsVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            borderLeft: `3px solid ${accentColor}`,
            paddingLeft: '12px',
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

          {/* Title on top */}
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

          {/* Description below */}
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
      ))}

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

export default AchievementsList;

