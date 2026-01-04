/**
 * Achievements Compact Variant
 *
 * Space-efficient single-line layout for achievements.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { AchievementsVariantProps } from '../types';

export const AchievementsCompact: React.FC<AchievementsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAchievement,
  onRemoveAchievement,
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px',
            backgroundColor: index % 2 === 0 ? `${accentColor}08` : 'transparent',
            borderRadius: '4px',
            fontSize: '11px',
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
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              flexShrink: 0,
            }}
          />

          {/* Content inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0 }}>
            {editable ? (
              <>
                <InlineEditableText
                  path={`achievements.${index}.title`}
                  value={item.title}
                  style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: '11px' }}
                  placeholder="Achievement"
                />
                {item.description && (
                  <>
                    <span style={{ color: '#d1d5db' }}>—</span>
                    <InlineEditableText
                      path={`achievements.${index}.description`}
                      value={item.description}
                      style={{ color: typography.body.color, fontSize: '11px' }}
                      placeholder="Description"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.title}</span>
                {item.description && (
                  <>
                    <span style={{ color: '#d1d5db' }}>—</span>
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
