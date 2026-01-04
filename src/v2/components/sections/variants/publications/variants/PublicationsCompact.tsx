/**
 * Publications Compact Variant
 *
 * Most space-efficient layout - single line per publication.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { PublicationsVariantProps } from '../types';

export const PublicationsCompact: React.FC<PublicationsVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((pub, index) => (
        <div
          key={pub.id || index}
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
          {editable && onRemovePublication && (
            <button
              onClick={() => onRemovePublication(pub.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-2.5 h-2.5 text-red-600" />
            </button>
          )}

          {/* All info inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            {editable ? (
              <InlineEditableText
                path={`publications.${index}.title`}
                value={pub.title}
                style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: '12px' }}
                placeholder="Title"
              />
            ) : (
              <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{pub.title}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableText
                path={`publications.${index}.publisher`}
                value={pub.publisher}
                style={{ color: accentColor, fontSize: '12px' }}
                placeholder="Publisher"
              />
            ) : (
              <span style={{ color: accentColor }}>{pub.publisher}</span>
            )}

            {(pub.authors?.length || editable) && (
              <>
                <span style={{ color: '#d1d5db' }}>•</span>
                {editable ? (
                  <InlineEditableText
                    path={`publications.${index}.authors`}
                    value={Array.isArray(pub.authors) ? pub.authors.join(', ') : (pub.authors || '')}
                    style={{ color: '#6b7280', fontSize: '11px' }}
                    placeholder="Authors"
                  />
                ) : (
                  <span style={{ color: '#6b7280', fontSize: '11px' }}>
                    {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                  </span>
                )}
              </>
            )}

            {!editable && pub.url && (
              <a
                href={pub.url}
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
      ))}

      {editable && onAddPublication && (
        <button
          onClick={onAddPublication}
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

export default PublicationsCompact;
