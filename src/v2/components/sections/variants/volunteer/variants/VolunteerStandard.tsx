/**
 * Volunteer Standard Variant
 *
 * Compact layout for volunteer work.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { VolunteerVariantProps } from '../types';

export const VolunteerStandard: React.FC<VolunteerVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddVolunteer,
  onRemoveVolunteer,
  formatDate,
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            padding: '10px 12px',
            backgroundColor: `${accentColor}05`,
            borderRadius: '6px',
            borderLeft: `2px solid ${accentColor}`,
          }}
        >
          {editable && onRemoveVolunteer && (
            <button
              onClick={() => onRemoveVolunteer(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* First row: Role - Organization - Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                {editable ? (
                  <InlineEditableText
                    path={`volunteer.${index}.role`}
                    value={item.role}
                    style={{
                      fontSize: typography.itemTitle.fontSize,
                      fontWeight: 600,
                      color: typography.itemTitle.color,
                    }}
                    placeholder="Role"
                  />
                ) : (
                  <span style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                  }}>
                    {item.role}
                  </span>
                )}
                <span style={{ color: '#d1d5db' }}>@</span>
                {editable ? (
                  <InlineEditableText
                    path={`volunteer.${index}.organization`}
                    value={item.organization}
                    style={{ fontSize: '12px', color: accentColor, fontWeight: 500 }}
                    placeholder="Organization"
                  />
                ) : (
                  <span style={{ fontSize: '12px', color: accentColor, fontWeight: 500 }}>
                    {item.organization}
                  </span>
                )}
                {(item.location || editable) && (
                  <>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    {editable ? (
                      <InlineEditableText
                        path={`volunteer.${index}.location`}
                        value={item.location || ''}
                        style={{ fontSize: '11px', color: '#6b7280' }}
                        placeholder="Location"
                      />
                    ) : (
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>{item.location}</span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Date */}
            <div style={{
              fontSize: '11px',
              color: typography.dates.color,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {editable ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <InlineEditableDate
                    path={`volunteer.${index}.startDate`}
                    value={item.startDate}
                    formatDisplay={formatDate}
                    style={{ fontSize: '11px' }}
                  />
                  <span>-</span>
                  {item.current ? (
                    <span>Present</span>
                  ) : (
                    <InlineEditableDate
                      path={`volunteer.${index}.endDate`}
                      value={item.endDate}
                      formatDisplay={formatDate}
                      style={{ fontSize: '11px' }}
                    />
                  )}
                </div>
              ) : (
                <span>
                  {formatDate ? formatDate(item.startDate) : item.startDate} - {item.current ? 'Present' : (formatDate ? formatDate(item.endDate) : item.endDate)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {(item.description || editable) && (
            <div style={{
              fontSize: typography.body.fontSize,
              color: typography.body.color,
              marginTop: '6px',
              lineHeight: 1.5,
            }}>
              {editable ? (
                <InlineEditableText
                  path={`volunteer.${index}.description`}
                  value={item.description || ''}
                  multiline
                  placeholder="Brief description..."
                />
              ) : (
                item.description
              )}
            </div>
          )}
        </div>
      ))}

      {editable && onAddVolunteer && (
        <button
          onClick={onAddVolunteer}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Volunteer
        </button>
      )}
    </div>
  );
};

export default VolunteerStandard;
