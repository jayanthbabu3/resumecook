/**
 * Education Academic Variant
 * 
 * Academic CV style with research focus and detailed information.
 */

import React from 'react';
import { X, Plus, BookOpen, Award, Users } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { EducationVariantProps } from '../types';

export const EducationAcademic: React.FC<EducationVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((edu, index) => (
        <div 
          key={edu.id || index}
          className="group relative"
          style={{ 
            borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none',
            paddingBottom: index < items.length - 1 ? spacing.itemGap : 0,
          }}
        >
          {editable && onRemoveEducation && (
            <button
              onClick={() => onRemoveEducation(edu.id)}
              className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Main header */}
          <div style={{ marginBottom: '8px' }}>
            {editable ? (
              <InlineEditableText
                path={`education.${index}.degree`}
                value={edu.degree}
                as="h3"
                style={{ 
                  fontSize: '16px', 
                  fontWeight: 700,
                  color: typography.itemTitle.color,
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
                placeholder="Degree"
              />
            ) : (
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: 700,
                color: typography.itemTitle.color,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
              </h3>
            )}
          </div>

          {/* Institution and dates */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px',
          }}>
            <div style={{ color: accentColor, fontWeight: 600, fontSize: '15px' }}>
              {editable ? (
                <InlineEditableText
                  path={`education.${index}.school`}
                  value={edu.school}
                  style={{ color: accentColor, fontWeight: 600 }}
                  placeholder="Institution"
                />
              ) : (
                edu.school
              )}
              {edu.location && (
                <span style={{ color: typography.body.color, fontWeight: 400 }}>
                  , {edu.location}
                </span>
              )}
            </div>
            
            <div style={{ 
              fontSize: '13px', 
              color: '#6b7280', 
              fontStyle: 'italic',
              whiteSpace: 'nowrap',
            }}>
              {editable ? (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  flexWrap: 'nowrap',
                }}>
                  <InlineEditableDate
                    path={`education.${index}.startDate`}
                    value={edu.startDate}
                    formatDisplay={formatDate}
                    style={{ whiteSpace: 'nowrap' }}
                  />
                  <span style={{ whiteSpace: 'nowrap' }}> – </span>
                  <InlineEditableDate
                    path={`education.${index}.endDate`}
                    value={edu.endDate}
                    formatDisplay={formatDate}
                    style={{ whiteSpace: 'nowrap' }}
                  />
                </div>
              ) : (
                <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                  {`${formatDate ? formatDate(edu.startDate) : edu.startDate} – ${formatDate ? formatDate(edu.endDate) : edu.endDate}`}
                </span>
              )}
            </div>
          </div>

          {/* Academic details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '12px', borderLeft: `2px solid ${accentColor}30` }}>
            {edu.gpa && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <Award style={{ width: '14px', height: '14px', color: accentColor }} />
                <span><strong>GPA:</strong> {edu.gpa}</span>
              </div>
            )}
            
            {edu.honors && edu.honors.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px' }}>
                <Award style={{ width: '14px', height: '14px', color: accentColor, marginTop: '3px' }} />
                <span><strong>Honors:</strong> {edu.honors.join(', ')}</span>
              </div>
            )}
            
            {edu.coursework && edu.coursework.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px' }}>
                <BookOpen style={{ width: '14px', height: '14px', color: accentColor, marginTop: '3px' }} />
                <span><strong>Relevant Coursework:</strong> {edu.coursework.join(', ')}</span>
              </div>
            )}
            
            {edu.activities && edu.activities.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px' }}>
                <Users style={{ width: '14px', height: '14px', color: accentColor, marginTop: '3px' }} />
                <span><strong>Activities:</strong> {edu.activities.join(', ')}</span>
              </div>
            )}

            {edu.description && (
              <div style={{ fontSize: '14px', color: typography.body.color, marginTop: '4px' }}>
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.description`}
                    value={edu.description}
                    multiline
                    placeholder="Thesis, research focus, or additional details..."
                  />
                ) : (
                  edu.description
                )}
              </div>
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

export default EducationAcademic;
