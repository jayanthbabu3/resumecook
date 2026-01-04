/**
 * Courses Cards Variant
 *
 * Compact card-based grid layout for courses.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink, CheckCircle } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { CoursesVariantProps } from '../types';

export const CoursesCards: React.FC<CoursesVariantProps> = ({
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
          {editable && onRemoveCourse && (
            <button
              onClick={() => onRemoveCourse(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Name with certificate badge */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
            {editable ? (
              <InlineEditableText
                path={`courses.${index}.name`}
                value={item.name}
                style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                  flex: 1,
                }}
                placeholder="Course Name"
              />
            ) : (
              <div style={{
                fontSize: typography.itemTitle.fontSize,
                fontWeight: 600,
                color: typography.itemTitle.color,
                flex: 1,
              }}>
                {item.name}
              </div>
            )}

            {item.certificate && (
              <CheckCircle style={{ width: '12px', height: '12px', color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
            )}
          </div>

          {/* Provider & Date inline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '4px',
            fontSize: '10px',
            color: '#6b7280',
            flexWrap: 'wrap',
          }}>
            {editable ? (
              <InlineEditableText
                path={`courses.${index}.provider`}
                value={item.provider}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="Provider"
              />
            ) : (
              <span style={{ color: accentColor }}>{item.provider}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableDate
                path={`courses.${index}.date`}
                value={item.date}
                formatDisplay={formatDate}
                style={{ fontSize: '10px' }}
              />
            ) : (
              <span>{formatDate ? formatDate(item.date) : item.date}</span>
            )}

            {!editable && item.url && (
              <>
                <span style={{ color: '#d1d5db' }}>•</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: accentColor }}
                >
                  <ExternalLink style={{ width: '9px', height: '9px' }} />
                </a>
              </>
            )}
          </div>

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
              <ExternalLink style={{ width: '9px', height: '9px', color: accentColor }} />
              <InlineEditableText
                path={`courses.${index}.url`}
                value={item.url || ''}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="URL"
              />
            </div>
          )}
        </div>
      ))}

      {editable && onAddCourse && (
        <button
          onClick={onAddCourse}
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

export default CoursesCards;
