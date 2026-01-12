/**
 * Patents Cards Variant
 *
 * Compact card-based grid layout for patents.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { PatentsVariantProps } from '../types';

const STATUS_COLORS: Record<string, string> = {
  Pending: '#f59e0b',
  Granted: '#10b981',
  Published: '#3b82f6',
};

export const PatentsCards: React.FC<PatentsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddPatent,
  onRemovePatent,
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
          {editable && onRemovePatent && (
            <button
              onClick={() => onRemovePatent(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Title with status badge */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
            {editable ? (
              <InlineEditableText
                path={`patents.${index}.title`}
                value={item.title}
                style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                  flex: 1,
                }}
                placeholder="Patent Title"
              />
            ) : (
              <div style={{
                fontSize: typography.itemTitle.fontSize,
                fontWeight: 600,
                color: typography.itemTitle.color,
                flex: 1,
              }}>
                {item.title}
              </div>
            )}

            {/* Status badge */}
            <span
              style={{
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: `${STATUS_COLORS[item.status] || STATUS_COLORS.Pending}15`,
                color: STATUS_COLORS[item.status] || STATUS_COLORS.Pending,
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              {editable ? (
                <InlineEditableText
                  path={`patents.${index}.status`}
                  value={item.status || 'Pending'}
                  style={{ fontSize: '9px', fontWeight: 500 }}
                  placeholder="Status"
                />
              ) : (
                item.status
              )}
            </span>
          </div>

          {/* Patent Number & Date inline */}
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
                path={`patents.${index}.patentNumber`}
                value={item.patentNumber || ''}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="Patent #"
              />
            ) : (
              <span style={{ color: accentColor }}>{item.patentNumber}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableDate
                path={`patents.${index}.date`}
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
                  style={{ color: accentColor, display: 'flex', alignItems: 'center', gap: '2px' }}
                >
                  <ExternalLink style={{ width: '9px', height: '9px' }} />
                </a>
              </>
            )}
          </div>

          {/* Inventors */}
          {(item.inventors?.length || editable) && (
            <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>
              {editable ? (
                <InlineEditableText
                  path={`patents.${index}.inventors`}
                  value={Array.isArray(item.inventors) ? item.inventors.join(', ') : (item.inventors || '')}
                  style={{ fontSize: '10px', color: '#6b7280' }}
                  placeholder="Inventors"
                />
              ) : (
                Array.isArray(item.inventors) ? item.inventors.join(', ') : item.inventors
              )}
            </div>
          )}

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
              <ExternalLink style={{ width: '9px', height: '9px', color: accentColor }} />
              <InlineEditableText
                path={`patents.${index}.url`}
                value={item.url || ''}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="URL"
              />
            </div>
          )}
        </div>
      ))}

      {editable && onAddPatent && (
        <button
          onClick={onAddPatent}
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

export default PatentsCards;
