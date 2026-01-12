/**
 * Patents Detailed Variant
 *
 * More detailed view with description, but still compact.
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

export const PatentsDetailed: React.FC<PatentsVariantProps> = ({
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
          {editable && onRemovePatent && (
            <button
              onClick={() => onRemovePatent(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* First row: Title | Status | Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              {editable ? (
                <InlineEditableText
                  path={`patents.${index}.title`}
                  value={item.title}
                  style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                  }}
                  placeholder="Patent Title"
                />
              ) : (
                <span style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                }}>
                  {item.title}
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

              {/* Status badge */}
              <span
                style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: `${STATUS_COLORS[item.status] || STATUS_COLORS.Pending}15`,
                  color: STATUS_COLORS[item.status] || STATUS_COLORS.Pending,
                  fontWeight: 500,
                }}
              >
                {editable ? (
                  <InlineEditableText
                    path={`patents.${index}.status`}
                    value={item.status || 'Pending'}
                    style={{ fontSize: '10px', fontWeight: 500 }}
                    placeholder="Status"
                  />
                ) : (
                  item.status
                )}
              </span>
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

          {/* Second row: Patent Number • Inventors */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '4px',
            fontSize: '11px',
            color: '#6b7280',
            flexWrap: 'wrap',
          }}>
            {editable ? (
              <InlineEditableText
                path={`patents.${index}.patentNumber`}
                value={item.patentNumber || ''}
                style={{ fontSize: '11px', color: accentColor }}
                placeholder="Patent #"
              />
            ) : (
              <span style={{ color: accentColor }}>{item.patentNumber}</span>
            )}

            {(item.inventors?.length || editable) && (
              <>
                <span style={{ color: '#d1d5db' }}>•</span>
                <span>Inventors: </span>
                {editable ? (
                  <InlineEditableText
                    path={`patents.${index}.inventors`}
                    value={Array.isArray(item.inventors) ? item.inventors.join(', ') : (item.inventors || '')}
                    style={{ fontSize: '11px', color: '#6b7280' }}
                    placeholder="Names"
                  />
                ) : (
                  <span>{Array.isArray(item.inventors) ? item.inventors.join(', ') : item.inventors}</span>
                )}
              </>
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
                  path={`patents.${index}.description`}
                  value={item.description || ''}
                  multiline
                  placeholder="Description..."
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
                path={`patents.${index}.url`}
                value={item.url || ''}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="Patent URL (optional)"
              />
            </div>
          )}
        </div>
      ))}

      {editable && onAddPatent && (
        <button
          onClick={onAddPatent}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Patent
        </button>
      )}
    </div>
  );
};

export default PatentsDetailed;
