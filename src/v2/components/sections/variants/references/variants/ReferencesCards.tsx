/**
 * References Cards Variant
 *
 * Compact card-based grid layout for references.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, Mail, Phone } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { ReferencesVariantProps } from '../types';

export const ReferencesCards: React.FC<ReferencesVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddReference,
  onRemoveReference,
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
          {editable && onRemoveReference && (
            <button
              onClick={() => onRemoveReference(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Name */}
          {editable ? (
            <InlineEditableText
              path={`references.${index}.name`}
              value={item.name}
              style={{
                fontSize: typography.itemTitle.fontSize,
                fontWeight: 600,
                color: typography.itemTitle.color,
                display: 'block',
              }}
              placeholder="Name"
            />
          ) : (
            <div style={{
              fontSize: typography.itemTitle.fontSize,
              fontWeight: 600,
              color: typography.itemTitle.color,
            }}>
              {item.name}
            </div>
          )}

          {/* Title at Company */}
          <div style={{ fontSize: '11px', color: accentColor, marginTop: '2px' }}>
            {editable ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', flexWrap: 'wrap' }}>
                <InlineEditableText
                  path={`references.${index}.title`}
                  value={item.title}
                  style={{ fontSize: '11px', color: accentColor }}
                  placeholder="Title"
                />
                <span style={{ color: '#9ca3af' }}>at</span>
                <InlineEditableText
                  path={`references.${index}.company`}
                  value={item.company}
                  style={{ fontSize: '11px', color: accentColor }}
                  placeholder="Company"
                />
              </span>
            ) : (
              <span>{item.title} at {item.company}</span>
            )}
          </div>

          {/* Relationship */}
          <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>
            {editable ? (
              <InlineEditableText
                path={`references.${index}.relationship`}
                value={item.relationship}
                style={{ fontSize: '10px', color: '#6b7280' }}
                placeholder="Relationship"
              />
            ) : (
              item.relationship
            )}
          </div>

          {/* Contact - inline */}
          {(item.email || item.phone || editable) && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '6px',
              fontSize: '10px',
              flexWrap: 'wrap',
            }}>
              {(item.email || editable) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Mail style={{ width: '9px', height: '9px', color: accentColor }} />
                  {editable ? (
                    <InlineEditableText
                      path={`references.${index}.email`}
                      value={item.email || ''}
                      style={{ fontSize: '10px', color: accentColor }}
                      placeholder="email"
                    />
                  ) : (
                    <a href={`mailto:${item.email}`} style={{ color: accentColor, textDecoration: 'none' }}>
                      {item.email}
                    </a>
                  )}
                </div>
              )}
              {(item.phone || editable) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Phone style={{ width: '9px', height: '9px', color: accentColor }} />
                  {editable ? (
                    <InlineEditableText
                      path={`references.${index}.phone`}
                      value={item.phone || ''}
                      style={{ fontSize: '10px', color: '#4b5563' }}
                      placeholder="phone"
                    />
                  ) : (
                    <span style={{ color: '#4b5563' }}>{item.phone}</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {editable && onAddReference && (
        <button
          onClick={onAddReference}
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

export default ReferencesCards;
