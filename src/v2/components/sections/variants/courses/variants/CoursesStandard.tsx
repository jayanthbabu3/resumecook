/**
 * Courses Standard Variant
 *
 * Compact layout with course name and provider.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink, CheckCircle } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { CoursesVariantProps } from '../types';

export const CoursesStandard: React.FC<CoursesVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddCourse,
  onRemoveCourse,
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
          {editable && onRemoveCourse && (
            <button
              onClick={() => onRemoveCourse(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* First row: Name • Provider | Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                {editable ? (
                  <InlineEditableText
                    path={`courses.${index}.name`}
                    value={item.name}
                    style={{
                      fontSize: typography.itemTitle.fontSize,
                      fontWeight: 600,
                      color: typography.itemTitle.color,
                    }}
                    placeholder="Course Name"
                  />
                ) : (
                  <span style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                  }}>
                    {item.name}
                  </span>
                )}

                {item.certificate && (
                  <CheckCircle style={{ width: '12px', height: '12px', color: '#10b981', flexShrink: 0 }} />
                )}

                {!editable && item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accentColor, flexShrink: 0 }}
                  >
                    <ExternalLink style={{ width: '12px', height: '12px' }} />
                  </a>
                )}

                <span style={{ color: '#d1d5db' }}>•</span>

                {editable ? (
                  <InlineEditableText
                    path={`courses.${index}.provider`}
                    value={item.provider}
                    style={{ fontSize: '12px', color: accentColor, fontWeight: 500 }}
                    placeholder="Provider"
                  />
                ) : (
                  <span style={{ fontSize: '12px', color: accentColor, fontWeight: 500 }}>
                    {item.provider}
                  </span>
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
                <InlineEditableDate
                  path={`courses.${index}.date`}
                  value={item.date}
                  formatDisplay={formatDate}
                  style={{ fontSize: '11px' }}
                />
              ) : (
                formatDate ? formatDate(item.date) : item.date
              )}
            </div>
          </div>

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <ExternalLink style={{ width: '10px', height: '10px', color: accentColor }} />
              <InlineEditableText
                path={`courses.${index}.url`}
                value={item.url || ''}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="Course URL (optional)"
              />
            </div>
          )}
        </div>
      ))}

      {editable && onAddCourse && (
        <button
          onClick={onAddCourse}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Course
        </button>
      )}
    </div>
  );
};

export default CoursesStandard;
