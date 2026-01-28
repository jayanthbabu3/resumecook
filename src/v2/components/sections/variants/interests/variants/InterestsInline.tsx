/**
 * Interests Inline Variant
 *
 * Comma-separated list of interests in a single line/flow.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { InterestsVariantProps } from '../types';

export const InterestsInline: React.FC<InterestsVariantProps> = ({
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
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '4px',
      alignItems: 'center',
      fontSize: scaleFontSize('12px'),
      color: typography.body.color,
      lineHeight: 1.6,
    }}>
      {items.map((interest, index) => (
        <span key={interest.id || index} className="group relative inline-flex items-center">
          {editable ? (
            <InlineEditableText
              path={`interests.${index}.name`}
              value={interest.name}
              style={{ 
                fontSize: scaleFontSize('12px'),
                color: typography.body.color,
              }}
              placeholder="Interest"
            />
          ) : (
            <span>{interest.name}</span>
          )}
          {index < items.length - 1 && (
            <span style={{ color: accentColor, margin: '0 4px' }}>•</span>
          )}
          {editable && onRemoveInterest && (
            <button
              onClick={() => onRemoveInterest(interest.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full ml-1"
            >
              <X className="w-2.5 h-2.5 text-red-600" />
            </button>
          )}
        </span>
      ))}

      {editable && onAddInterest && (
        <button
          onClick={onAddInterest}
          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-dashed hover:bg-gray-50 transition-colors ml-1"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default InterestsInline;

