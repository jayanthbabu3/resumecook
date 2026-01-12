/**
 * Achievements Standard Variant
 *
 * Clean layout with trophy icons - the variant shown in the screenshot.
 */

import React from 'react';
import { X, Plus, Trophy } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { AchievementsVariantProps } from '../types';

export const AchievementsStandard: React.FC<AchievementsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAchievement,
  onRemoveAchievement,
  showIndicators = true,
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
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
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
            <Trophy style={{ width: '16px', height: '16px', color: accentColor, flexShrink: 0, marginTop: '2px' }} />
          )}

          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: scaleFontSize(typography.body.fontSize),
              lineHeight: typography.body.lineHeight,
              color: typography.body.color,
            }}>
              {editable ? (
                <>
                  <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
                    <InlineEditableText
                      path={`achievements.${index}.title`}
                      value={item.title}
                      placeholder="Achievement Title"
                    />
                  </span>
                  {' - '}
                  <InlineEditableText
                    path={`achievements.${index}.description`}
                    value={item.description || ''}
                    placeholder="Description"
                    multiline
                  />
                </>
              ) : (
                <>
                  <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.title}</span>
                  {item.description && <> - {item.description}</>}
                </>
              )}
            </div>
          </div>
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

export default AchievementsStandard;
