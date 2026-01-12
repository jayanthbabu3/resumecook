/**
 * Education Cards Variant
 * 
 * Card-based layout with visual appeal.
 */

import React from 'react';
import { X, Plus, GraduationCap, Award, BookOpen } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { EducationVariantProps } from '../types';

export const EducationCards: React.FC<EducationVariantProps> = ({
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      {items.map((edu, index) => (
        <div 
          key={edu.id || index}
          className="group relative"
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
          }}
        >
          {editable && onRemoveEducation && (
            <button
              onClick={() => onRemoveEducation(edu.id)}
              className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3.5 h-3.5 text-red-600" />
            </button>
          )}
          
          {/* Icon */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: `${accentColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}>
            <GraduationCap style={{ width: '20px', height: '20px', color: accentColor }} />
          </div>
          
          {/* Degree */}
          {editable ? (
            <InlineEditableText
              path={`education.${index}.degree`}
              value={edu.degree}
              as="h3"
              style={{ 
                fontSize: '16px', 
                fontWeight: 700,
                color: typography.itemTitle.color,
                margin: '0 0 4px 0',
              }}
              placeholder="Degree"
            />
          ) : (
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 700,
              color: typography.itemTitle.color,
              margin: '0 0 4px 0',
            }}>
              {edu.degree}
            </h3>
          )}
          
          {/* Field */}
          {edu.field && (
            <div style={{ fontSize: '14px', color: typography.body.color, marginBottom: '8px' }}>
              {editable ? (
                <InlineEditableText
                  path={`education.${index}.field`}
                  value={edu.field}
                  placeholder="Field of Study"
                />
              ) : (
                edu.field
              )}
            </div>
          )}
          
          {/* School */}
          <div style={{ 
            fontSize: '14px', 
            color: accentColor,
            fontWeight: 600,
            marginBottom: '8px',
          }}>
            {editable ? (
              <InlineEditableText
                path={`education.${index}.school`}
                value={edu.school}
                style={{ color: accentColor, fontWeight: 600 }}
                placeholder="School Name"
              />
            ) : (
              edu.school
            )}
          </div>
          
          {/* Date */}
          <div style={{ 
            fontSize: '12px', 
            color: '#6b7280',
            marginBottom: '12px',
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
          
          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {edu.gpa && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <Award style={{ width: '14px', height: '14px', color: accentColor }} />
                <span>GPA: {edu.gpa}</span>
              </div>
            )}
            
            {edu.honors && edu.honors.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px' }}>
                <Award style={{ width: '14px', height: '14px', color: accentColor, marginTop: '2px' }} />
                <span>{edu.honors.join(', ')}</span>
              </div>
            )}
            
            {edu.coursework && edu.coursework.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px' }}>
                <BookOpen style={{ width: '14px', height: '14px', color: accentColor, marginTop: '2px' }} />
                <span>{edu.coursework.slice(0, 3).join(', ')}{edu.coursework.length > 3 ? '...' : ''}</span>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {editable && onAddEducation && (
        <button
          onClick={onAddEducation}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '180px',
            borderRadius: '12px',
            border: `2px dashed ${accentColor}40`,
            backgroundColor: `${accentColor}05`,
            color: accentColor,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <Plus style={{ width: '24px', height: '24px' }} />
          Add Education
        </button>
      )}
    </div>
  );
};

export default EducationCards;
