/**
 * Patents Compact Variant
 *
 * Most space-efficient layout - single line per patent.
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

export const PatentsCompact: React.FC<PatentsVariantProps> = ({
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
          {editable && onRemovePatent && (
            <button
              onClick={() => onRemovePatent(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-2.5 h-2.5 text-red-600" />
            </button>
          )}

          {/* All info inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            {editable ? (
              <InlineEditableText
                path={`patents.${index}.title`}
                value={item.title}
                style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: '12px' }}
                placeholder="Patent Title"
              />
            ) : (
              <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.title}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableText
                path={`patents.${index}.patentNumber`}
                value={item.patentNumber || ''}
                style={{ color: '#6b7280', fontSize: '11px' }}
                placeholder="Patent #"
              />
            ) : (
              <span style={{ color: '#6b7280', fontSize: '11px' }}>{item.patentNumber}</span>
            )}

            {/* Status badge */}
            <span
              style={{
                fontSize: '9px',
                padding: '1px 5px',
                borderRadius: '3px',
                backgroundColor: `${STATUS_COLORS[item.status] || STATUS_COLORS.Pending}15`,
                color: STATUS_COLORS[item.status] || STATUS_COLORS.Pending,
                fontWeight: 500,
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

            {!editable && item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accentColor, flexShrink: 0 }}
              >
                <ExternalLink style={{ width: '10px', height: '10px' }} />
              </a>
            )}
          </div>

          {/* Date */}
          <div style={{ fontSize: '11px', color: typography.dates.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {editable ? (
              <InlineEditableDate
                path={`patents.${index}.date`}
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

      {editable && onAddPatent && (
        <button
          onClick={onAddPatent}
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

export default PatentsCompact;
