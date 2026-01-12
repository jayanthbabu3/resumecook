/**
 * Volunteer Compact Variant
 *
 * Most space-efficient layout - single line per volunteer entry.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { VolunteerVariantProps } from '../types';

export const VolunteerCompact: React.FC<VolunteerVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 10px',
            backgroundColor: index % 2 === 0 ? `${accentColor}04` : 'transparent',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          {editable && onRemoveVolunteer && (
            <button
              onClick={() => onRemoveVolunteer(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-2.5 h-2.5 text-red-600" />
            </button>
          )}

          {/* All info inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            {editable ? (
              <InlineEditableText
                path={`volunteer.${index}.role`}
                value={item.role}
                style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: '12px' }}
                placeholder="Role"
              />
            ) : (
              <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.role}</span>
            )}

            <span style={{ color: '#d1d5db' }}>@</span>

            {editable ? (
              <InlineEditableText
                path={`volunteer.${index}.organization`}
                value={item.organization}
                style={{ color: accentColor, fontSize: '12px' }}
                placeholder="Organization"
              />
            ) : (
              <span style={{ color: accentColor }}>{item.organization}</span>
            )}

            {(item.location || editable) && (
              <>
                <span style={{ color: '#d1d5db' }}>•</span>
                {editable ? (
                  <InlineEditableText
                    path={`volunteer.${index}.location`}
                    value={item.location || ''}
                    style={{ color: '#6b7280', fontSize: '11px' }}
                    placeholder="Location"
                  />
                ) : (
                  <span style={{ color: '#6b7280', fontSize: '11px' }}>{item.location}</span>
                )}
              </>
            )}
          </div>

          {/* Date on right */}
          <div style={{ fontSize: '11px', color: typography.dates.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {editable ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <InlineEditableDate
                  path={`volunteer.${index}.startDate`}
                  value={item.startDate}
                  formatDisplay={formatDate}
                  style={{ fontSize: '11px' }}
                />
                <span>-</span>
                {item.current ? (
                  <span>Now</span>
                ) : (
                  <InlineEditableDate
                    path={`volunteer.${index}.endDate`}
                    value={item.endDate}
                    formatDisplay={formatDate}
                    style={{ fontSize: '11px' }}
                  />
                )}
              </span>
            ) : (
              <span>
                {formatDate ? formatDate(item.startDate) : item.startDate} - {item.current ? 'Now' : (formatDate ? formatDate(item.endDate) : item.endDate)}
              </span>
            )}
          </div>
        </div>
      ))}

      {editable && onAddVolunteer && (
        <button
          onClick={onAddVolunteer}
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

export default VolunteerCompact;
