/**
 * Achievements Compact Variant
 *
 * Space-efficient single-line layout for achievements.
 * Respects template typography and spacing configuration.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { AchievementsVariantProps } from '../types';

export const AchievementsCompact: React.FC<AchievementsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAchievement,
  onRemoveAchievement,
}) => {
  const { typography, spacing, colors } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  // Use muted text color for bullet, fallback to gray
  const bulletColor = colors?.text?.muted || '#9ca3af';
  const separatorColor = colors?.text?.muted || '#d1d5db';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing?.bulletGap || '6px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '2px 0',
            fontSize: scaleFontSize(typography.body.fontSize),
            lineHeight: typography.body.lineHeight,
          }}
        >
          {editable && onRemoveAchievement && (
            <button
              onClick={() => onRemoveAchievement(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-2.5 h-2.5 text-red-600" />
            </button>
          )}

          {/* Bullet indicator */}
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: bulletColor,
              flexShrink: 0,
              marginTop: '0.5em',
            }}
          />

          {/* Content inline */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flex: 1, minWidth: 0, flexWrap: 'wrap' }}>
            {editable ? (
              <>
                <InlineEditableText
                  path={`achievements.${index}.title`}
                  value={item.title}
                  style={{
                    fontWeight: typography.itemTitle.fontWeight || 600,
                    color: typography.itemTitle.color,
                    fontSize: scaleFontSize(typography.body.fontSize),
                  }}
                  placeholder="Achievement"
                />
                {item.description && (
                  <>
                    <span style={{ color: separatorColor }}>—</span>
                    <InlineEditableText
                      path={`achievements.${index}.description`}
                      value={item.description}
                      style={{
                        color: typography.body.color,
                        fontSize: scaleFontSize(typography.body.fontSize),
                      }}
                      placeholder="Description"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <span style={{
                  fontWeight: typography.itemTitle.fontWeight || 600,
                  color: typography.itemTitle.color,
                }}>
                  {item.title}
                </span>
                {item.description && (
                  <>
                    <span style={{ color: separatorColor }}>—</span>
                    <span style={{ color: typography.body.color }}>{item.description}</span>
                  </>
                )}
              </>
            )}
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
          Add
        </button>
      )}
    </div>
  );
};

export default AchievementsCompact;
