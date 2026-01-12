/**
 * Courses Detailed Variant
 *
 * Full info with description support.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink, CheckCircle } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { CoursesVariantProps } from '../types';

export const CoursesDetailed: React.FC<CoursesVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            padding: '12px 14px',
            backgroundColor: `${accentColor}04`,
            borderRadius: '8px',
            border: `1px solid ${accentColor}15`,
          }}
        >
          {editable && onRemoveCourse && (
            <button
              onClick={() => onRemoveCourse(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* First row: Name | Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
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
                <span style={{
                  fontSize: '9px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: '#10b98115',
                  color: '#10b981',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}>
                  <CheckCircle style={{ width: '10px', height: '10px' }} />
                  Certified
                </span>
              )}

              {!editable && item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: accentColor }}
                >
                  <ExternalLink style={{ width: '12px', height: '12px' }} />
                </a>
              )}
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

          {/* Second row: Provider */}
          <div style={{
            fontSize: '11px',
            color: accentColor,
            fontWeight: 500,
            marginTop: '4px',
          }}>
            {editable ? (
              <InlineEditableText
                path={`courses.${index}.provider`}
                value={item.provider}
                style={{ fontSize: '11px', color: accentColor, fontWeight: 500 }}
                placeholder="Provider (e.g., Coursera, Udemy)"
              />
            ) : (
              item.provider
            )}
          </div>

          {/* Description */}
          {(item.description || editable) && (
            <div style={{
              fontSize: typography.body.fontSize,
              color: typography.body.color,
              marginTop: '8px',
              lineHeight: 1.5,
            }}>
              {editable ? (
                <InlineEditableText
                  path={`courses.${index}.description`}
                  value={item.description || ''}
                  multiline
                  placeholder="What you learned..."
                  style={{ fontSize: typography.body.fontSize }}
                />
              ) : (
                item.description
              )}
            </div>
          )}

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
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

export default CoursesDetailed;
