/**
 * Volunteer Cards Variant
 *
 * Compact card-based grid layout for volunteer experience.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { VolunteerVariantProps } from '../types';

export const VolunteerCards: React.FC<VolunteerVariantProps> = ({
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            padding: '10px 12px',
            backgroundColor: `${accentColor}06`,
            borderRadius: '8px',
            border: `1px solid ${accentColor}15`,
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

          {/* Role */}
          {editable ? (
            <InlineEditableText
              path={`volunteer.${index}.role`}
              value={item.role}
              style={{
                fontSize: typography.itemTitle.fontSize,
                fontWeight: 600,
                color: typography.itemTitle.color,
                display: 'block',
              }}
              placeholder="Role"
            />
          ) : (
            <div style={{
              fontSize: typography.itemTitle.fontSize,
              fontWeight: 600,
              color: typography.itemTitle.color,
            }}>
              {item.role}
            </div>
          )}

          {/* Organization */}
          <div style={{ fontSize: '11px', color: accentColor, marginTop: '2px' }}>
            {editable ? (
              <InlineEditableText
                path={`volunteer.${index}.organization`}
                value={item.organization}
                style={{ fontSize: '11px', color: accentColor }}
                placeholder="Organization"
              />
            ) : (
              item.organization
            )}
          </div>

          {/* Location & Date inline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '4px',
            fontSize: '10px',
            color: '#6b7280',
            flexWrap: 'wrap',
          }}>
            {(item.location || editable) && (
              <>
                {editable ? (
                  <InlineEditableText
                    path={`volunteer.${index}.location`}
                    value={item.location || ''}
                    style={{ fontSize: '10px', color: '#6b7280' }}
                    placeholder="Location"
                  />
                ) : (
                  <span>{item.location}</span>
                )}
                <span style={{ color: '#d1d5db' }}>•</span>
              </>
            )}
            {editable ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <InlineEditableDate
                  path={`volunteer.${index}.startDate`}
                  value={item.startDate}
                  formatDisplay={formatDate}
                  style={{ fontSize: '10px' }}
                />
                <span>-</span>
                {item.current ? (
                  <span>Present</span>
                ) : (
                  <InlineEditableDate
                    path={`volunteer.${index}.endDate`}
                    value={item.endDate}
                    formatDisplay={formatDate}
                    style={{ fontSize: '10px' }}
                  />
                )}
              </span>
            ) : (
              <span>
                {formatDate ? formatDate(item.startDate) : item.startDate} - {item.current ? 'Present' : (formatDate ? formatDate(item.endDate) : item.endDate)}
              </span>
            )}
          </div>

          {/* Description */}
          {(item.description || editable) && (
            <div style={{
              fontSize: typography.body.fontSize,
              color: typography.body.color,
              marginTop: '6px',
              lineHeight: 1.4,
            }}>
              {editable ? (
                <InlineEditableText
                  path={`volunteer.${index}.description`}
                  value={item.description || ''}
                  multiline
                  placeholder="Brief description..."
                  style={{ fontSize: typography.body.fontSize }}
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
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '12px',
            borderRadius: '8px',
            border: `1px dashed ${accentColor}40`,
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

export default VolunteerCards;
