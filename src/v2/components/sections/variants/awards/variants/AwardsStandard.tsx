/**
 * Awards Standard Variant
 */

import React from 'react';
import { X, Plus, Trophy } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { AwardsVariantProps } from '../types';

export const AwardsStandard: React.FC<AwardsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAward,
  onRemoveAward,
  formatDate,
}) => {
  const { typography, spacing } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((award, index) => (
        <div key={award.id || index} className="group relative">
          {editable && onRemoveAward && (
            <button
              onClick={() => onRemoveAward(award.id)}
              className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: `${accentColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Trophy style={{ width: '16px', height: '16px', color: accentColor }} />
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  {editable ? (
                    <InlineEditableText
                      path={`awards.${index}.title`}
                      value={award.title}
                      style={{ 
                        fontSize: typography.itemTitle.fontSize, 
                        fontWeight: typography.itemTitle.fontWeight,
                        color: typography.itemTitle.color,
                      }}
                      placeholder="Award Title"
                    />
                  ) : (
                    <span style={{ 
                      fontSize: typography.itemTitle.fontSize, 
                      fontWeight: typography.itemTitle.fontWeight,
                      color: typography.itemTitle.color,
                    }}>
                      {award.title}
                    </span>
                  )}
                  
                  {award.issuer && (
                    <div style={{ 
                      fontSize: typography.body.fontSize, 
                      color: accentColor,
                      fontWeight: 500,
                      marginTop: '2px',
                    }}>
                      {editable ? (
                        <InlineEditableText
                          path={`awards.${index}.issuer`}
                          value={award.issuer}
                          style={{ color: accentColor, fontWeight: 500 }}
                          placeholder="Issuing Organization"
                        />
                      ) : (
                        award.issuer
                      )}
                    </div>
                  )}
                </div>
                
                {award.date && (
                  <div style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {editable ? (
                      <InlineEditableDate
                        path={`awards.${index}.date`}
                        value={award.date}
                        formatDisplay={formatDate}
                      />
                    ) : (
                      formatDate ? formatDate(award.date) : award.date
                    )}
                  </div>
                )}
              </div>
              
              {award.description && (
                <div style={{ 
                  fontSize: typography.body.fontSize, 
                  color: typography.body.color,
                  marginTop: '6px',
                  lineHeight: typography.body.lineHeight,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path={`awards.${index}.description`}
                      value={award.description}
                      multiline
                      placeholder="Description..."
                    />
                  ) : (
                    award.description
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {editable && onAddAward && (
        <button
          onClick={onAddAward}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Award
        </button>
      )}
    </div>
  );
};

export default AwardsStandard;
