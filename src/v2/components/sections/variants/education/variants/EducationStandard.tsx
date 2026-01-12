/**
 * Education Standard Variant
 * 
 * Classic professional layout with degree, school, dates, and details.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { EducationVariantProps } from '../types';

export const EducationStandard: React.FC<EducationVariantProps> = ({
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
        >
          {editable && onRemoveEducation && (
            <button
              onClick={() => onRemoveEducation(edu.id)}
              className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div style={{ flex: 1 }}>
              {editable ? (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
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
                  {edu.field && (
                    <>
                      <span style={{ color: typography.body.color }}> in </span>
                      <InlineEditableText
                        path={`education.${index}.field`}
                        value={edu.field}
                        style={{ 
                          fontSize: typography.itemTitle.fontSize, 
                          fontWeight: typography.itemTitle.fontWeight,
                          color: typography.itemTitle.color,
                        }}
                        placeholder="Field of Study"
                      />
                    </>
                  )}
                </div>
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
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                    <InlineEditableText
                      path={`education.${index}.school`}
                      value={edu.school}
                      style={{ color: accentColor, fontWeight: 500 }}
                      placeholder="School Name"
                    />
                    {edu.location && (
                      <>
                        <span style={{ color: typography.body.color }}> • </span>
                        <InlineEditableText
                          path={`education.${index}.location`}
                          value={edu.location}
                          style={{ color: typography.body.color, fontWeight: 400 }}
                          placeholder="Location"
                        />
                      </>
                    )}
                  </span>
                ) : (
                  <span>
                    {edu.school}
                    {edu.location && <span style={{ color: typography.body.color, fontWeight: 400 }}> • {edu.location}</span>}
                  </span>
                )}
              </div>
            </div>
            
            <div style={{ 
              fontSize: typography.dates?.fontSize || '13px', 
              color: typography.dates?.color || '#6b7280',
              whiteSpace: 'nowrap',
              marginLeft: '16px',
            }}>
              {editable ? (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  flexWrap: 'nowrap',
                }}>
                  {edu.startDate && (
                    <>
                      <InlineEditableDate
                        path={`education.${index}.startDate`}
                        value={edu.startDate}
                        formatDisplay={formatDate}
                        style={{ whiteSpace: 'nowrap' }}
                      />
                      <span style={{ whiteSpace: 'nowrap' }}> – </span>
                    </>
                  )}
                  {edu.current ? (
                    <span style={{ whiteSpace: 'nowrap' }}>Present</span>
                  ) : (
                    <InlineEditableDate
                      path={`education.${index}.endDate`}
                      value={edu.endDate}
                      formatDisplay={formatDate}
                      style={{ whiteSpace: 'nowrap' }}
                    />
                  )}
                </div>
              ) : (
                <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                  {edu.startDate ? `${formatDate ? formatDate(edu.startDate) : edu.startDate} – ` : ''}
                  {edu.current ? 'Present' : (formatDate ? formatDate(edu.endDate) : edu.endDate)}
                </span>
              )}
            </div>
          </div>
          
          {/* GPA */}
          {(edu.gpa || editable) && (
            <div style={{ 
              fontSize: typography.body.fontSize, 
              color: typography.body.color,
              marginTop: '4px',
            }}>
              <span style={{ fontWeight: 500 }}>GPA: </span>
              {editable ? (
                <InlineEditableText
                  path={`education.${index}.gpa`}
                  value={edu.gpa || ''}
                  placeholder="3.8/4.0"
                />
              ) : (
                edu.gpa
              )}
            </div>
          )}
          
          {/* Honors */}
          {edu.honors && edu.honors.length > 0 && (
            <div style={{ 
              fontSize: typography.body.fontSize, 
              color: typography.body.color,
              marginTop: '4px',
            }}>
              <span style={{ fontWeight: 500 }}>Honors: </span>
              {edu.honors.join(', ')}
            </div>
          )}

          {/* Coursework */}
          {edu.coursework && edu.coursework.length > 0 && (
            <div style={{ 
              fontSize: typography.body.fontSize, 
              color: typography.body.color,
              marginTop: '4px',
            }}>
              <span style={{ fontWeight: 500 }}>Relevant Coursework: </span>
              {edu.coursework.join(', ')}
            </div>
          )}

          {/* Minor */}
          {edu.minor && (
            <div style={{ 
              fontSize: typography.body.fontSize, 
              color: typography.body.color,
              marginTop: '4px',
            }}>
              <span style={{ fontWeight: 500 }}>Minor: </span>
              {editable ? (
                <InlineEditableText
                  path={`education.${index}.minor`}
                  value={edu.minor}
                  placeholder="Minor field"
                />
              ) : (
                edu.minor
              )}
            </div>
          )}
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

export default EducationStandard;
