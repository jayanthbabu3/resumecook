/**
 * Courses Compact Variant
 *
 * Most space-efficient layout - single line per course.
 * Minimal info: name, provider, date only.
 */

import React from 'react';
import { X, Plus, CheckCircle } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { CoursesVariantProps } from '../types';

export const CoursesCompact: React.FC<CoursesVariantProps> = ({
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
          {editable && onRemoveCourse && (
            <button
              onClick={() => onRemoveCourse(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-2.5 h-2.5 text-red-600" />
            </button>
          )}

          {/* All info inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            {editable ? (
              <InlineEditableText
                path={`courses.${index}.name`}
                value={item.name}
                style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: '12px' }}
                placeholder="Course Name"
              />
            ) : (
              <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.name}</span>
            )}

            {item.certificate && (
              <CheckCircle style={{ width: '10px', height: '10px', color: '#10b981', flexShrink: 0 }} />
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableText
                path={`courses.${index}.provider`}
                value={item.provider}
                style={{ color: accentColor, fontSize: '12px' }}
                placeholder="Provider"
              />
            ) : (
              <span style={{ color: accentColor }}>{item.provider}</span>
            )}
          </div>

          {/* Date */}
          <div style={{ fontSize: '11px', color: typography.dates.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
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
      ))}

      {editable && onAddCourse && (
        <button
          onClick={onAddCourse}
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

export default CoursesCompact;
