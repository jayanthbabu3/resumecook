/**
 * References Standard Variant
 *
 * Compact layout with contact details.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, Mail, Phone } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { ReferencesVariantProps } from '../types';

export const ReferencesStandard: React.FC<ReferencesVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative"
          style={{
            padding: '10px 12px',
            backgroundColor: `${accentColor}05`,
            borderRadius: '6px',
            borderLeft: `2px solid ${accentColor}`,
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

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Name and Title inline */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                {editable ? (
                  <InlineEditableText
                    path={`references.${index}.name`}
                    value={item.name}
                    style={{
                      fontSize: typography.itemTitle.fontSize,
                      fontWeight: 600,
                      color: typography.itemTitle.color,
                    }}
                    placeholder="Name"
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
                <span style={{ color: '#d1d5db' }}>–</span>
                {editable ? (
                  <>
                    <InlineEditableText
                      path={`references.${index}.title`}
                      value={item.title}
                      style={{ fontSize: '12px', color: accentColor }}
                      placeholder="Title"
                    />
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>at</span>
                    <InlineEditableText
                      path={`references.${index}.company`}
                      value={item.company}
                      style={{ fontSize: '12px', color: accentColor }}
                      placeholder="Company"
                    />
                  </>
                ) : (
                  <span style={{ fontSize: '12px', color: accentColor }}>
                    {item.title} at {item.company}
                  </span>
                )}
              </div>

              {/* Relationship and Contact inline */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '4px',
                fontSize: '11px',
                color: '#6b7280',
                flexWrap: 'wrap',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`references.${index}.relationship`}
                    value={item.relationship}
                    style={{ fontSize: '11px', color: '#6b7280' }}
                    placeholder="Relationship"
                  />
                ) : (
                  <span>{item.relationship}</span>
                )}

                {(item.email || editable) && (
                  <>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Mail style={{ width: '10px', height: '10px', color: accentColor }} />
                      {editable ? (
                        <InlineEditableText
                          path={`references.${index}.email`}
                          value={item.email || ''}
                          style={{ fontSize: '11px', color: accentColor }}
                          placeholder="email"
                        />
                      ) : (
                        <a href={`mailto:${item.email}`} style={{ color: accentColor, textDecoration: 'none', fontSize: '11px' }}>
                          {item.email}
                        </a>
                      )}
                    </div>
                  </>
                )}

                {(item.phone || editable) && (
                  <>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Phone style={{ width: '10px', height: '10px', color: accentColor }} />
                      {editable ? (
                        <InlineEditableText
                          path={`references.${index}.phone`}
                          value={item.phone || ''}
                          style={{ fontSize: '11px', color: '#4b5563' }}
                          placeholder="phone"
                        />
                      ) : (
                        <span style={{ fontSize: '11px' }}>{item.phone}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {editable && onAddReference && (
        <button
          onClick={onAddReference}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Reference
        </button>
      )}
    </div>
  );
};

export default ReferencesStandard;
