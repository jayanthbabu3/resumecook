/**
 * Achievements Minimal Variant
 *
 * Ultra-clean format with no bullets or icons - just text.
 * Title in bold, description in lighter weight.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { AchievementsVariantProps } from '../types';

export const AchievementsMinimal: React.FC<AchievementsVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            paddingBottom: '8px',
            borderBottom: index < items.length - 1 ? '1px solid #f3f4f6' : 'none',
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

          {/* Title */}
          <div style={{
            fontSize: scaleFontSize(typography.body.fontSize),
            fontWeight: 600,
            color: typography.itemTitle.color,
            marginBottom: item.description ? '2px' : 0,
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

          {/* Description - lighter weight, smaller */}
          {(item.description || editable) && (
            <div style={{
              fontSize: scaleFontSize(typography.body.fontSize),
              lineHeight: typography.body.lineHeight,
              color: '#6b7280',
            }}>
              {editable ? (
                <InlineEditableText
                  path={`achievements.${index}.description`}
                  value={item.description || ''}
                  placeholder="Brief description..."
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

export default AchievementsMinimal;

