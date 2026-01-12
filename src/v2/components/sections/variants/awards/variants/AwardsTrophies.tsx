/**
 * Awards Trophies Variant
 * 
 * Visual trophy-style layout.
 */

import React from 'react';
import { X, Plus, Trophy, Medal, Star } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { AwardsVariantProps } from '../types';

const awardIcons = [Trophy, Medal, Star];

export const AwardsTrophies: React.FC<AwardsVariantProps> = ({
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {items.map((award, index) => {
        const IconComponent = awardIcons[index % awardIcons.length];
        
        return (
          <div
            key={award.id || index}
            className="group relative"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '16px',
              minWidth: '140px',
              maxWidth: '180px',
              backgroundColor: `${accentColor}08`,
              borderRadius: '12px',
              border: `1px solid ${accentColor}20`,
            }}
          >
            {editable && onRemoveAward && (
              <button
                onClick={() => onRemoveAward(award.id)}
                className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              boxShadow: `0 4px 6px -1px ${accentColor}40`,
            }}>
              <IconComponent style={{ width: '24px', height: '24px', color: '#fff' }} />
            </div>
            
            {editable ? (
              <InlineEditableText
                path={`awards.${index}.title`}
                value={award.title}
                style={{ 
                  fontSize: '14px', 
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                  textAlign: 'center',
                }}
                placeholder="Award"
              />
            ) : (
              <div style={{ 
                fontSize: '14px', 
                fontWeight: 600,
                color: typography.itemTitle.color,
              }}>
                {award.title}
              </div>
            )}
            
            {award.issuer && (
              <div style={{ 
                fontSize: '12px', 
                color: '#6b7280',
                marginTop: '4px',
              }}>
                {award.issuer}
              </div>
            )}
            
            {award.date && (
              <div style={{ 
                fontSize: '11px', 
                color: '#9ca3af',
                marginTop: '4px',
              }}>
                {formatDate ? formatDate(award.date) : award.date}
              </div>
            )}
          </div>
        );
      })}
      
      {editable && onAddAward && (
        <button
          onClick={onAddAward}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minWidth: '140px',
            minHeight: '140px',
            borderRadius: '12px',
            border: `2px dashed ${accentColor}40`,
            backgroundColor: `${accentColor}05`,
            color: accentColor,
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <Plus style={{ width: '20px', height: '20px' }} />
          Add Award
        </button>
      )}
    </div>
  );
};

export default AwardsTrophies;
