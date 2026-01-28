/**
 * Achievements Bullets Variant
 *
 * Simple bullet points with accent-colored dots - minimal and clean.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { AchievementsVariantProps } from '../types';

export const AchievementsBullets: React.FC<AchievementsVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
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

          {/* Bullet dot */}
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: accentColor,
            flexShrink: 0,
            marginTop: '7px',
          }} />

          {/* Content - inline format */}
          <div style={{
            flex: 1,
            fontSize: scaleFontSize(typography.body.fontSize),
            lineHeight: typography.body.lineHeight,
            color: typography.body.color,
          }}>
            {editable ? (
              <>
                <InlineEditableText
                  path={`achievements.${index}.title`}
                  value={item.title}
                  placeholder="Achievement"
                  style={{ fontWeight: 500 }}
                />
                {(item.description || editable) && (
                  <>
                    {' - '}
                    <InlineEditableText
                      path={`achievements.${index}.description`}
                      value={item.description || ''}
                      placeholder="Brief description"
                      multiline
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <span style={{ fontWeight: 500 }}>{item.title}</span>
                {item.description && <> - {item.description}</>}
              </>
            )}
          </div>
        </div>
      ))}

      {editable && onAddAchievement && (
        <button
          onClick={onAddAchievement}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit ml-3"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Achievement
        </button>
      )}
    </div>
  );
};

export default AchievementsBullets;

