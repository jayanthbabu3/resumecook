/**
 * Publications Academic Variant
 *
 * Citation-style layout with italic title and description support.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { PublicationsVariantProps } from '../types';

export const PublicationsAcademic: React.FC<PublicationsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddPublication,
  onRemovePublication,
  formatDate,
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((pub, index) => (
        <div
          key={pub.id || index}
          className="group relative"
          style={{
            padding: '10px 12px',
            backgroundColor: `${accentColor}04`,
            borderRadius: '6px',
            borderLeft: `2px solid ${accentColor}`,
          }}
        >
          {editable && onRemovePublication && (
            <button
              onClick={() => onRemovePublication(pub.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* First row: Title (italic) | Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
              {editable ? (
                <InlineEditableText
                  path={`publications.${index}.title`}
                  value={pub.title}
                  style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                    fontStyle: 'italic',
                  }}
                  placeholder="Publication Title"
                />
              ) : (
                <span style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                  fontStyle: 'italic',
                }}>
                  {pub.title}
                </span>
              )}

              {!editable && pub.url && (
                <a
                  href={pub.url}
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
                  path={`publications.${index}.date`}
                  value={pub.date}
                  formatDisplay={formatDate}
                  style={{ fontSize: '11px' }}
                />
              ) : (
                formatDate ? formatDate(pub.date) : pub.date
              )}
            </div>
          </div>

          {/* Second row: Authors • Publisher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '4px',
            fontSize: '11px',
            color: '#6b7280',
            flexWrap: 'wrap',
          }}>
            {(pub.authors?.length || editable) && (
              <>
                {editable ? (
                  <InlineEditableText
                    path={`publications.${index}.authors`}
                    value={Array.isArray(pub.authors) ? pub.authors.join(', ') : (pub.authors || '')}
                    style={{ fontSize: '11px', color: '#6b7280' }}
                    placeholder="Authors"
                  />
                ) : (
                  <span>{Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}</span>
                )}
                <span style={{ color: '#d1d5db' }}>•</span>
              </>
            )}

            {editable ? (
              <InlineEditableText
                path={`publications.${index}.publisher`}
                value={pub.publisher}
                style={{ fontSize: '11px', color: accentColor, fontWeight: 500 }}
                placeholder="Publisher / Journal"
              />
            ) : (
              <span style={{ color: accentColor, fontWeight: 500 }}>{pub.publisher}</span>
            )}

            {(pub.doi || editable) && (
              <>
                <span style={{ color: '#d1d5db' }}>•</span>
                <span>DOI: </span>
                {editable ? (
                  <InlineEditableText
                    path={`publications.${index}.doi`}
                    value={pub.doi || ''}
                    style={{ fontSize: '11px', color: '#6b7280' }}
                    placeholder="DOI"
                  />
                ) : (
                  <span>{pub.doi}</span>
                )}
              </>
            )}
          </div>

          {/* Description */}
          {(pub.description || editable) && (
            <div style={{
              fontSize: typography.body.fontSize,
              color: typography.body.color,
              marginTop: '8px',
              lineHeight: 1.5,
            }}>
              {editable ? (
                <InlineEditableText
                  path={`publications.${index}.description`}
                  value={pub.description || ''}
                  multiline
                  placeholder="Description..."
                  style={{ fontSize: typography.body.fontSize }}
                />
              ) : (
                pub.description
              )}
            </div>
          )}

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <ExternalLink style={{ width: '10px', height: '10px', color: accentColor }} />
              <InlineEditableText
                path={`publications.${index}.url`}
                value={pub.url || ''}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="URL (optional)"
              />
            </div>
          )}
        </div>
      ))}

      {editable && onAddPublication && (
        <button
          onClick={onAddPublication}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Publication
        </button>
      )}
    </div>
  );
};

export default PublicationsAcademic;
