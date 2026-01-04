/**
 * References Compact Variant
 *
 * Most space-efficient layout - single line per reference.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { ReferencesVariantProps } from '../types';

export const ReferencesCompact: React.FC<ReferencesVariantProps> = ({
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
          {editable && onRemoveReference && (
            <button
              onClick={() => onRemoveReference(item.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-2.5 h-2.5 text-red-600" />
            </button>
          )}

          {/* All info inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            {editable ? (
              <InlineEditableText
                path={`references.${index}.name`}
                value={item.name}
                style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: '12px' }}
                placeholder="Name"
              />
            ) : (
              <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.name}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <>
                <InlineEditableText
                  path={`references.${index}.title`}
                  value={item.title}
                  style={{ color: accentColor, fontSize: '12px' }}
                  placeholder="Title"
                />
                <span style={{ color: '#9ca3af' }}>at</span>
                <InlineEditableText
                  path={`references.${index}.company`}
                  value={item.company}
                  style={{ color: accentColor, fontSize: '12px' }}
                  placeholder="Company"
                />
              </>
            ) : (
              <span style={{ color: accentColor }}>{item.title} at {item.company}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableText
                path={`references.${index}.relationship`}
                value={item.relationship}
                style={{ color: '#6b7280', fontSize: '11px' }}
                placeholder="Relationship"
              />
            ) : (
              <span style={{ color: '#6b7280', fontSize: '11px' }}>{item.relationship}</span>
            )}
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
          Add
        </button>
      )}
    </div>
  );
};

export default ReferencesCompact;
