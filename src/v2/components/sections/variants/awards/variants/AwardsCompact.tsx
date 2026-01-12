/**
 * Awards Compact Variant
 */

import React from 'react';
import { X, Plus, Trophy } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { AwardsVariantProps } from '../types';

export const AwardsCompact: React.FC<AwardsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAward,
  onRemoveAward,
  formatDate,
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((award, index) => (
        <div
          key={award.id || index}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 10px',
            backgroundColor: index % 2 === 0 ? `${accentColor}08` : 'transparent',
            borderRadius: '4px',
          }}
        >
          {editable && onRemoveAward && (
            <button
              onClick={() => onRemoveAward(award.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <Trophy style={{ width: '14px', height: '14px', color: accentColor, flexShrink: 0 }} />
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {editable ? (
              <>
                <InlineEditableText
                  path={`awards.${index}.title`}
                  value={award.title}
                  style={{ fontWeight: 600, color: typography.itemTitle.color }}
                  placeholder="Award"
                />
                {award.issuer && (
                  <>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <InlineEditableText
                      path={`awards.${index}.issuer`}
                      value={award.issuer}
                      style={{ color: '#6b7280' }}
                      placeholder="Issuer"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
                  {award.title}
                </span>
                {award.issuer && (
                  <>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <span style={{ color: '#6b7280' }}>{award.issuer}</span>
                  </>
                )}
              </>
            )}
          </div>
          
          {award.date && (
            <div style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
              {formatDate ? formatDate(award.date) : award.date}
            </div>
          )}
        </div>
      ))}
      
      {editable && onAddAward && (
        <button
          onClick={onAddAward}
          className="mt-2 flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default AwardsCompact;
