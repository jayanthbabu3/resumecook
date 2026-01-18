/**
 * Interests Grid Variant
 *
 * Responsive grid layout for interests/hobbies.
 * 1 column in sidebar, 2 columns in main content.
 * Uses theme colors for styling.
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { InterestsVariantProps } from '../types';

export const InterestsGrid: React.FC<InterestsVariantProps> = ({
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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container width for responsive layout
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(container);
    setContainerWidth(container.offsetWidth);

    return () => resizeObserver.disconnect();
  }, []);

  if (!items.length && !editable) return null;

  // Responsive: 1 column for narrow (sidebar <280px), 2 columns for wider
  // Default to wide (2 columns) when containerWidth is 0 (e.g., in PDF generation)
  const isNarrow = containerWidth > 0 && containerWidth < 280;

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: isNarrow ? '1fr' : 'repeat(2, 1fr)',
        gap: isNarrow ? '6px' : '8px',
      }}
    >
      {items.map((interest, index) => (
        <div
          key={interest.id || index}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: isNarrow ? '6px 8px' : '8px 10px',
            backgroundColor: `${accentColor}08`,
            borderRadius: '6px',
            border: `1px solid ${accentColor}15`,
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

          <Sparkles
            style={{
              width: '12px',
              height: '12px',
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
                fontWeight: 500,
                color: typography.itemTitle.color,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              placeholder="Interest"
            />
          ) : (
            <span
              style={{
                fontSize: scaleFontSize('12px'),
                fontWeight: 500,
                color: typography.itemTitle.color,
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
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: isNarrow ? '6px 8px' : '8px 10px',
            borderRadius: '6px',
            border: `2px dashed ${accentColor}40`,
            backgroundColor: 'transparent',
            color: accentColor,
            fontSize: '11px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
          className="hover:bg-gray-50 transition-colors"
        >
          <Plus style={{ width: '12px', height: '12px' }} />
          Add
        </button>
      )}
    </div>
  );
};

export default InterestsGrid;
