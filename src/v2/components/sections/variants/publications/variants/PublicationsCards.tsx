/**
 * Publications Cards Variant
 *
 * Compact card-based grid layout for publications.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { PublicationsVariantProps } from '../types';

export const PublicationsCards: React.FC<PublicationsVariantProps> = ({
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
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
    }}>
      {items.map((pub, index) => (
        <div
          key={pub.id || index}
          className="group relative"
          style={{
            padding: '10px 12px',
            backgroundColor: `${accentColor}06`,
            borderRadius: '8px',
            border: `1px solid ${accentColor}15`,
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

          {/* Title */}
          {editable ? (
            <InlineEditableText
              path={`publications.${index}.title`}
              value={pub.title}
              style={{
                fontSize: typography.itemTitle.fontSize,
                fontWeight: 600,
                color: typography.itemTitle.color,
                display: 'block',
              }}
              placeholder="Publication Title"
            />
          ) : (
            <div style={{
              fontSize: typography.itemTitle.fontSize,
              fontWeight: 600,
              color: typography.itemTitle.color,
            }}>
              {pub.title}
            </div>
          )}

          {/* Publisher & Date inline */}
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
                path={`publications.${index}.publisher`}
                value={pub.publisher}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="Publisher"
              />
            ) : (
              <span style={{ color: accentColor }}>{pub.publisher}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableDate
                path={`publications.${index}.date`}
                value={pub.date}
                formatDisplay={formatDate}
                style={{ fontSize: '10px' }}
              />
            ) : (
              <span>{formatDate ? formatDate(pub.date) : pub.date}</span>
            )}

            {!editable && pub.url && (
              <>
                <span style={{ color: '#d1d5db' }}>•</span>
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: accentColor, display: 'flex', alignItems: 'center', gap: '2px' }}
                >
                  <ExternalLink style={{ width: '9px', height: '9px' }} />
                </a>
              </>
            )}
          </div>

          {/* Authors */}
          {(pub.authors?.length || editable) && (
            <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>
              {editable ? (
                <InlineEditableText
                  path={`publications.${index}.authors`}
                  value={Array.isArray(pub.authors) ? pub.authors.join(', ') : (pub.authors || '')}
                  style={{ fontSize: '10px', color: '#6b7280' }}
                  placeholder="Authors"
                />
              ) : (
                Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors
              )}
            </div>
          )}

          {/* Editable URL & DOI */}
          {editable && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ExternalLink style={{ width: '9px', height: '9px', color: accentColor }} />
                <InlineEditableText
                  path={`publications.${index}.url`}
                  value={pub.url || ''}
                  style={{ fontSize: '10px', color: accentColor }}
                  placeholder="URL"
                />
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>
                DOI: <InlineEditableText
                  path={`publications.${index}.doi`}
                  value={pub.doi || ''}
                  style={{ fontSize: '10px', color: '#6b7280' }}
                  placeholder="optional"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {editable && onAddPublication && (
        <button
          onClick={onAddPublication}
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

export default PublicationsCards;
