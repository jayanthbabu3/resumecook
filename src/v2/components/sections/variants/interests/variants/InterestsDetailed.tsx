/**
 * Interests Detailed Variant
 *
 * Card-based layout with descriptions for interests/hobbies.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, Heart } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { InterestsVariantProps } from '../types';

export const InterestsDetailed: React.FC<InterestsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddInterest,
  onRemoveInterest,
}) => {
  const { typography, spacing } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((interest, index) => (
        <div
          key={interest.id || index}
          className="group relative"
          style={{
            padding: '12px 16px',
            backgroundColor: `${accentColor}08`,
            borderRadius: '8px',
            borderLeft: `3px solid ${accentColor}`,
          }}
        >
          {editable && onRemoveInterest && (
            <button
              onClick={() => onRemoveInterest(interest.id)}
              className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Heart
              style={{
                width: '16px',
                height: '16px',
                color: accentColor,
                flexShrink: 0,
                marginTop: '2px',
              }}
            />

            <div style={{ flex: 1 }}>
              {editable ? (
                <InlineEditableText
                  path={`interests.${index}.name`}
                  value={interest.name}
                  style={{
                    fontWeight: 600,
                    fontSize: typography.itemTitle.fontSize,
                    color: typography.itemTitle.color,
                  }}
                  placeholder="Interest/Hobby"
                />
              ) : (
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: typography.itemTitle.fontSize,
                    color: typography.itemTitle.color,
                  }}
                >
                  {interest.name}
                </div>
              )}

              {(interest.description || editable) && (
                <div
                  style={{
                    marginTop: '4px',
                    fontSize: typography.body.fontSize,
                    color: typography.body.color,
                    lineHeight: typography.body.lineHeight,
                  }}
                >
                  {editable ? (
                    <InlineEditableText
                      path={`interests.${index}.description`}
                      value={interest.description || ''}
                      multiline
                      placeholder="Add a brief description..."
                    />
                  ) : (
                    interest.description
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {editable && onAddInterest && (
        <button
          onClick={onAddInterest}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Interest
        </button>
      )}
    </div>
  );
};

export default InterestsDetailed;
