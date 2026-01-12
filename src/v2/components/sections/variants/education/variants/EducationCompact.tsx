/**
 * Education Compact Variant
 * 
 * Space-efficient single-line layout.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { EducationVariantProps } from '../types';

export const EducationCompact: React.FC<EducationVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((edu, index) => (
        <div 
          key={edu.id || index}
          className="group relative"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 12px',
            backgroundColor: index % 2 === 0 ? '#f9fafb' : 'transparent',
            borderRadius: '4px',
          }}
        >
          {editable && onRemoveEducation && (
            <button
              onClick={() => onRemoveEducation(edu.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
            {editable ? (
              <>
                <InlineEditableText
                  path={`education.${index}.degree`}
                  value={edu.degree}
                  style={{ fontWeight: 600, color: typography.itemTitle.color }}
                  placeholder="Degree"
                />
                {edu.field && (
                  <>
                    <span style={{ color: '#9ca3af' }}>in</span>
                    <InlineEditableText
                      path={`education.${index}.field`}
                      value={edu.field}
                      style={{ color: typography.body.color }}
                      placeholder="Field"
                    />
                  </>
                )}
                <span style={{ color: '#d1d5db' }}>•</span>
                <InlineEditableText
                  path={`education.${index}.school`}
                  value={edu.school}
                  style={{ color: accentColor, fontWeight: 500 }}
                  placeholder="School"
                />
              </>
            ) : (
              <>
                <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
                  {edu.degree}
                </span>
                {edu.field && <span style={{ color: '#9ca3af' }}>in {edu.field}</span>}
                <span style={{ color: '#d1d5db' }}>•</span>
                <span style={{ color: accentColor, fontWeight: 500 }}>{edu.school}</span>
              </>
            )}
          </div>
          
          <div style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>
            {editable ? (
              <InlineEditableDate
                path={`education.${index}.endDate`}
                value={edu.endDate}
                formatDisplay={formatDate}
              />
            ) : (
              formatDate ? formatDate(edu.endDate) : edu.endDate
            )}
          </div>
        </div>
      ))}
      
      {editable && onAddEducation && (
        <button
          onClick={onAddEducation}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Education
        </button>
      )}
    </div>
  );
};

export default EducationCompact;
