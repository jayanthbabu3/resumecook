/**
 * Awards Timeline Variant
 *
 * Chronological timeline layout with vertical connector line.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, Award } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { AwardsVariantProps } from '../types';

export const AwardsTimeline: React.FC<AwardsVariantProps> = ({
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

  return (
    <div style={{ position: 'relative', paddingLeft: '24px' }}>
      {/* Timeline line */}
      <div style={{
        position: 'absolute',
        left: '7px',
        top: '8px',
        bottom: editable ? '50px' : '8px',
        width: '2px',
        backgroundColor: `${accentColor}30`,
        borderRadius: '1px',
      }} />

      {items.map((award, index) => (
        <div
          key={award.id || index}
          className="group relative"
          style={{
            paddingBottom: index < items.length - 1 ? spacing.itemGap : '0',
            position: 'relative',
          }}
        >
          {/* Timeline dot */}
          <div style={{
            position: 'absolute',
            left: '-20px',
            top: '4px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: accentColor,
            border: '2px solid #fff',
            boxShadow: `0 0 0 2px ${accentColor}30`,
            zIndex: 1,
          }} />

          {editable && onRemoveAward && (
            <button
              onClick={() => onRemoveAward(award.id)}
              className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award style={{ width: '14px', height: '14px', color: accentColor }} />
                {editable ? (
                  <InlineEditableText
                    path={`awards.${index}.title`}
                    value={award.title}
                    style={{
                      fontSize: typography.itemTitle.fontSize,
                      fontWeight: typography.itemTitle.fontWeight,
                      color: typography.itemTitle.color,
                    }}
                    placeholder="Award Title"
                  />
                ) : (
                  <span style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: typography.itemTitle.fontWeight,
                    color: typography.itemTitle.color,
                  }}>
                    {award.title}
                  </span>
                )}
              </div>

              <div style={{
                fontSize: typography.body.fontSize,
                color: accentColor,
                fontWeight: 500,
                marginTop: '2px',
                marginLeft: '22px',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`awards.${index}.issuer`}
                    value={award.issuer}
                    style={{ color: accentColor, fontWeight: 500 }}
                    placeholder="Issuing Organization"
                  />
                ) : (
                  award.issuer
                )}
              </div>

              {(award.description || editable) && (
                <div style={{
                  fontSize: typography.body.fontSize,
                  color: typography.body.color,
                  marginTop: '6px',
                  marginLeft: '22px',
                  lineHeight: typography.body.lineHeight,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path={`awards.${index}.description`}
                      value={award.description || ''}
                      multiline
                      placeholder="Description..."
                    />
                  ) : (
                    award.description
                  )}
                </div>
              )}
            </div>

            {award.date && (
              <div style={{
                fontSize: typography.dates.fontSize,
                color: typography.dates.color,
                whiteSpace: 'nowrap',
                padding: '2px 8px',
                backgroundColor: `${accentColor}10`,
                borderRadius: '4px',
              }}>
                {editable ? (
                  <InlineEditableDate
                    path={`awards.${index}.date`}
                    value={award.date}
                    formatDisplay={formatDate}
                  />
                ) : (
                  formatDate ? formatDate(award.date) : award.date
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {editable && onAddAward && (
        <div style={{ position: 'relative', marginTop: '12px' }}>
          {/* Add button dot */}
          <div style={{
            position: 'absolute',
            left: '-20px',
            top: '8px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: `2px dashed ${accentColor}`,
            zIndex: 1,
          }} />
          <button
            onClick={onAddAward}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            <Plus className="h-3 w-3" />
            Add Award
          </button>
        </div>
      )}
    </div>
  );
};

export default AwardsTimeline;
