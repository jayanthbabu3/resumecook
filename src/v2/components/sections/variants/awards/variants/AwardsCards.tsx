/**
 * Awards Cards Variant
 *
 * Card-based layout with visual hierarchy.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, Award } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { AwardsVariantProps } from '../types';

export const AwardsCards: React.FC<AwardsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAward,
  onRemoveAward,
  formatDate,
}) => {
  const { typography, spacing } = config;

  if (!items.length && !editable) return null;

  // Generate light background from accent color
  const lightBg = `${accentColor}08`;
  const borderColor = `${accentColor}20`;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
    }}>
      {items.map((award, index) => (
        <div
          key={award.id || index}
          className="group relative"
          style={{
            padding: '14px 16px',
            backgroundColor: lightBg,
            borderRadius: '10px',
            border: `1px solid ${borderColor}`,
          }}
        >
          {editable && onRemoveAward && (
            <button
              onClick={() => onRemoveAward(award.id)}
              className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Award style={{ width: '14px', height: '14px', color: '#fff' }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {editable ? (
                <InlineEditableText
                  path={`awards.${index}.title`}
                  value={award.title}
                  style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                    display: 'block',
                  }}
                  placeholder="Award Title"
                />
              ) : (
                <div style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                }}>
                  {award.title}
                </div>
              )}

              <div style={{
                fontSize: '12px',
                color: accentColor,
                fontWeight: 500,
                marginTop: '2px',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`awards.${index}.issuer`}
                    value={award.issuer}
                    style={{ color: accentColor, fontWeight: 500, fontSize: '12px' }}
                    placeholder="Organization"
                  />
                ) : (
                  award.issuer
                )}
              </div>

              {award.date && (
                <div style={{
                  fontSize: '11px',
                  color: typography.dates.color,
                  marginTop: '6px',
                }}>
                  {editable ? (
                    <InlineEditableDate
                      path={`awards.${index}.date`}
                      value={award.date}
                      formatDisplay={formatDate}
                      style={{ fontSize: '11px' }}
                    />
                  ) : (
                    formatDate ? formatDate(award.date) : award.date
                  )}
                </div>
              )}

              {(award.description || editable) && (
                <div style={{
                  fontSize: typography.body.fontSize,
                  color: typography.body.color,
                  marginTop: '8px',
                  lineHeight: 1.5,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path={`awards.${index}.description`}
                      value={award.description || ''}
                      multiline
                      placeholder="Description..."
                      style={{ fontSize: typography.body.fontSize }}
                    />
                  ) : (
                    award.description
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {editable && onAddAward && (
        <button
          onClick={onAddAward}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '20px',
            borderRadius: '10px',
            border: `2px dashed ${accentColor}40`,
            backgroundColor: 'transparent',
            color: accentColor,
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            minHeight: '80px',
          }}
          className="hover:bg-gray-50 transition-colors"
        >
          <Plus style={{ width: '16px', height: '16px' }} />
          Add Award
        </button>
      )}
    </div>
  );
};

export default AwardsCards;
