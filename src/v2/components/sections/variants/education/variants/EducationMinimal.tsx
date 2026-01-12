/**
 * Education Minimal Variant
 * 
 * Ultra-minimal text-only layout.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { EducationVariantProps } from '../types';

export const EducationMinimal: React.FC<EducationVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddEducation,
  onRemoveEducation,
  formatDate,
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((edu, index) => (
        <div 
          key={edu.id || index}
          className="group relative"
          style={{ paddingRight: editable ? '24px' : 0 }}
        >
          {editable && onRemoveEducation && (
            <button
              onClick={() => onRemoveEducation(edu.id)}
              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}
          
          {editable ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
              <InlineEditableText
                path={`education.${index}.degree`}
                value={edu.degree}
                style={{ fontWeight: 600, color: typography.itemTitle.color }}
                placeholder="Degree"
              />
              <span style={{ color: '#9ca3af' }}>–</span>
              <InlineEditableText
                path={`education.${index}.school`}
                value={edu.school}
                style={{ color: typography.body.color }}
                placeholder="School"
              />
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                ({edu.endDate})
              </span>
            </div>
          ) : (
            <div>
              <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
                {edu.degree}
              </span>
              <span style={{ color: '#9ca3af' }}> – </span>
              <span style={{ color: typography.body.color }}>{edu.school}</span>
              {edu.endDate && (
                <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                  {' '}({formatDate ? formatDate(edu.endDate) : edu.endDate})
                </span>
              )}
            </div>
          )}
        </div>
      ))}
      
      {editable && onAddEducation && (
        <button
          onClick={onAddEducation}
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

export default EducationMinimal;
