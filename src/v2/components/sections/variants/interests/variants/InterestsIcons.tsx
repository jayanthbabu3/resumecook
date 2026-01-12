/**
 * Interests Icons Variant
 *
 * Visual icon-based cards for interests/hobbies.
 * Responsive: smaller icons and cards in narrow sidebars.
 * Uses theme colors for styling.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Plus,
  Heart,
  Music,
  Camera,
  Book,
  Gamepad2,
  Palette,
  Plane,
  Coffee,
  Dumbbell,
  Film,
} from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { InterestsVariantProps } from '../types';

// Rotating icons for visual variety
const interestIcons = [Heart, Music, Camera, Book, Gamepad2, Palette, Plane, Coffee, Dumbbell, Film];

export const InterestsIcons: React.FC<InterestsVariantProps> = ({
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

  // Responsive sizing based on container width
  const isNarrow = containerWidth < 280;
  const isVeryNarrow = containerWidth < 180;

  // In very narrow spaces, use a simpler horizontal layout
  if (isVeryNarrow) {
    return (
      <div
        ref={containerRef}
        style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
      >
        {items.map((interest, index) => {
          const IconComponent = interestIcons[index % interestIcons.length];

          return (
            <div
              key={interest.id || index}
              className="group relative"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                backgroundColor: `${accentColor}08`,
                borderRadius: '6px',
                border: `1px solid ${accentColor}15`,
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

              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: accentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <IconComponent style={{ width: '12px', height: '12px', color: '#fff' }} />
              </div>

              {editable ? (
                <InlineEditableText
                  path={`interests.${index}.name`}
                  value={interest.name}
                  style={{
                    fontSize: scaleFontSize('11px'),
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
                    fontSize: scaleFontSize('11px'),
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
          );
        })}

        {editable && onAddInterest && (
          <button
            onClick={onAddInterest}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '6px 8px',
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
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: isNarrow ? '8px' : '10px',
        justifyContent: isNarrow ? 'flex-start' : 'flex-start',
      }}
    >
      {items.map((interest, index) => {
        const IconComponent = interestIcons[index % interestIcons.length];

        return (
          <div
            key={interest.id || index}
            className="group relative"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: isNarrow ? '10px 10px' : '12px 14px',
              minWidth: isNarrow ? '70px' : '80px',
              maxWidth: isNarrow ? '90px' : '100px',
              backgroundColor: `${accentColor}08`,
              borderRadius: isNarrow ? '8px' : '10px',
              border: `1px solid ${accentColor}20`,
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

            <div
              style={{
                width: isNarrow ? '28px' : '32px',
                height: isNarrow ? '28px' : '32px',
                borderRadius: '50%',
                backgroundColor: accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isNarrow ? '6px' : '8px',
                boxShadow: `0 2px 4px -1px ${accentColor}40`,
              }}
            >
              <IconComponent style={{ width: isNarrow ? '14px' : '16px', height: isNarrow ? '14px' : '16px', color: '#fff' }} />
            </div>

            {editable ? (
              <InlineEditableText
                path={`interests.${index}.name`}
                value={interest.name}
                style={{
                  fontSize: scaleFontSize(isNarrow ? '10px' : '11px'),
                  fontWeight: 500,
                  color: typography.itemTitle.color,
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  lineHeight: 1.2,
                }}
                placeholder="Interest"
              />
            ) : (
              <span
                style={{
                  fontSize: scaleFontSize(isNarrow ? '10px' : '11px'),
                  fontWeight: 500,
                  color: typography.itemTitle.color,
                  wordBreak: 'break-word',
                  lineHeight: 1.2,
                }}
              >
                {interest.name}
              </span>
            )}
          </div>
        );
      })}

      {editable && onAddInterest && (
        <button
          onClick={onAddInterest}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: isNarrow ? '10px 10px' : '12px 14px',
            minWidth: isNarrow ? '70px' : '80px',
            borderRadius: isNarrow ? '8px' : '10px',
            border: `2px dashed ${accentColor}40`,
            backgroundColor: 'transparent',
            color: accentColor,
            fontSize: '11px',
            fontWeight: 500,
            cursor: 'pointer',
            minHeight: isNarrow ? '60px' : '70px',
          }}
          className="hover:bg-gray-50 transition-colors"
        >
          <Plus style={{ width: isNarrow ? '14px' : '16px', height: isNarrow ? '14px' : '16px' }} />
          Add
        </button>
      )}
    </div>
  );
};

export default InterestsIcons;
