/**
 * Education Timeline Variant
 * 
 * Visual timeline layout showing educational progression.
 */

import React from 'react';
import { X, Plus, GraduationCap } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { EducationVariantProps } from '../types';

export const EducationTimeline: React.FC<EducationVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddEducation,
  onRemoveEducation,
  formatDate,
}) => {
  const { typography, spacing } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ position: 'relative', paddingLeft: '32px' }}>
      {/* Timeline line */}
      <div style={{
        position: 'absolute',
        left: '11px',
        top: '12px',
        bottom: editable ? '60px' : '12px',
        width: '2px',
        backgroundColor: accentColor,
        opacity: 0.2,
      }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
        {items.map((edu, index) => (
          <div key={edu.id || index} className="group relative">
            {/* Timeline dot */}
            <div style={{
              position: 'absolute',
              left: '-26px',
              top: '4px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 0 4px ${accentColor}20`,
            }}>
              <GraduationCap style={{ width: '12px', height: '12px', color: '#fff' }} />
            </div>
            
            {editable && onRemoveEducation && (
              <button
                onClick={() => onRemoveEducation(edu.id)}
                className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}
            
            <div style={{ 
              backgroundColor: `${accentColor}08`,
              borderRadius: '8px',
              padding: '12px 16px',
              borderLeft: `3px solid ${accentColor}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.degree`}
                      value={edu.degree}
                      as="h3"
                      style={{ 
                        fontSize: typography.itemTitle.fontSize, 
                        fontWeight: typography.itemTitle.fontWeight,
                        color: typography.itemTitle.color,
                        margin: 0,
                      }}
                      placeholder="Degree"
                    />
                  ) : (
                    <h3 style={{ 
                      fontSize: typography.itemTitle.fontSize, 
                      fontWeight: typography.itemTitle.fontWeight,
                      color: typography.itemTitle.color,
                      margin: 0,
                    }}>
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </h3>
                  )}
                  
                  <div style={{ 
                    fontSize: typography.body.fontSize, 
                    color: accentColor,
                    fontWeight: 500,
                    marginTop: '2px',
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path={`education.${index}.school`}
                        value={edu.school}
                        style={{ color: accentColor, fontWeight: 500 }}
                        placeholder="School Name"
                      />
                    ) : (
                      edu.school
                    )}
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6b7280',
                  backgroundColor: '#f3f4f6',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}>
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
              
              {edu.gpa && (
                <div style={{ 
                  fontSize: '13px', 
                  color: typography.body.color,
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{ 
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 500,
                  }}>
                    GPA: {edu.gpa}
                  </span>
                </div>
              )}
              
              {edu.honors && edu.honors.length > 0 && (
                <div style={{ 
                  fontSize: '13px', 
                  color: typography.body.color,
                  marginTop: '6px',
                }}>
                  {edu.honors.join(' • ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {editable && onAddEducation && (
        <button
          onClick={onAddEducation}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Education
        </button>
      )}
    </div>
  );
};

export default EducationTimeline;
