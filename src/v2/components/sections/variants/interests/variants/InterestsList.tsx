/**
 * Interests List Variant
 *
 * Clean bullet list layout for interests/hobbies.
 * Responsive with proper text overflow handling.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, Circle } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { InterestsVariantProps } from '../types';

export const InterestsList: React.FC<InterestsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddInterest,
  onRemoveInterest,
}) => {
  const { typography } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {items.map((interest, index) => (
        <div
          key={interest.id || index}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: 0,
          }}
        >
          {editable && onRemoveInterest && (
            <button
              onClick={() => onRemoveInterest(interest.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <Circle
            style={{
              width: '5px',
              height: '5px',
              fill: accentColor,
              color: accentColor,
              flexShrink: 0,
            }}
          />

          {editable ? (
            <InlineEditableText
              path={`interests.${index}.name`}
              value={interest.name}
              style={{
                fontSize: scaleFontSize('12px'),
                color: typography.body.color,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              placeholder="Interest/Hobby"
            />
          ) : (
            <span
              style={{
                fontSize: scaleFontSize('12px'),
                color: typography.body.color,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {interest.name}
            </span>
          )}
        </div>
      ))}

      {editable && onAddInterest && (
        <button
          onClick={onAddInterest}
          className="mt-1 flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor, fontSize: '11px' }}
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default InterestsList;
