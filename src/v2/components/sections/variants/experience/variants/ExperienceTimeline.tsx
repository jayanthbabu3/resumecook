/**
 * Experience Timeline Variant
 * 
 * Visual timeline with connecting line and dots.
 * Great for showing career progression.
 */

import React from 'react';
import { X, Plus, Briefcase } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceTimeline: React.FC<ExperienceVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
  onAddExperience,
  onRemoveExperience,
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
        {items.map((exp, index) => (
          <div key={exp.id || index} className="group relative">
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
              <Briefcase style={{ width: '12px', height: '12px', color: '#fff' }} />
            </div>
            
            {/* Delete button */}
            {editable && onRemoveExperience && (
              <button
                onClick={() => onRemoveExperience(exp.id)}
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
                      path={`experience.${index}.position`}
                      value={exp.position}
                      as="h3"
                      style={{ 
                        fontSize: typography.itemTitle.fontSize, 
                        fontWeight: typography.itemTitle.fontWeight,
                        color: typography.itemTitle.color,
                        margin: 0,
                      }}
                      placeholder="Position Title"
                    />
                  ) : (
                    <h3 style={{ 
                      fontSize: typography.itemTitle.fontSize, 
                      fontWeight: typography.itemTitle.fontWeight,
                      color: typography.itemTitle.color,
                      margin: 0,
                    }}>
                      {exp.position}
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
                        path={`experience.${index}.company`}
                        value={exp.company}
                        style={{ color: accentColor, fontWeight: 500 }}
                        placeholder="Company Name"
                      />
                    ) : (
                      exp.company
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <InlineEditableDate
                        path={`experience.${index}.startDate`}
                        value={exp.startDate}
                        formatDisplay={formatDate}
                      />
                      <span> – </span>
                      {exp.current ? 'Present' : (
                        <InlineEditableDate
                          path={`experience.${index}.endDate`}
                          value={exp.endDate}
                          formatDisplay={formatDate}
                        />
                      )}
                    </div>
                  ) : (
                    `${formatDate ? formatDate(exp.startDate) : exp.startDate} – ${exp.current ? 'Present' : (formatDate ? formatDate(exp.endDate) : exp.endDate)}`
                  )}
                </div>
              </div>
              
              {/* Bullet points */}
              {(exp.bulletPoints?.length > 0 || editable) && (
                <ul style={{ 
                  margin: '12px 0 0 0', 
                  paddingLeft: '16px',
                  listStyleType: 'none',
                }}>
                  {exp.bulletPoints?.map((bullet, bulletIndex) => (
                    <li 
                      key={bulletIndex}
                      className="group/bullet"
                      style={{ 
                        fontSize: typography.body.fontSize,
                        color: typography.body.color,
                        lineHeight: typography.body.lineHeight,
                        marginBottom: '6px',
                        position: 'relative',
                        paddingLeft: '12px',
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                      }} />
                      {editable ? (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <InlineEditableText
                            path={`experience.${index}.bulletPoints.${bulletIndex}`}
                            value={bullet}
                            style={{ flex: 1 }}
                            placeholder="Achievement..."
                          />
                          {onRemoveBulletPoint && (
                            <button
                              onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                              className="opacity-0 group-hover/bullet:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                            >
                              <X className="w-3 h-3 text-red-500" />
                            </button>
                          )}
                        </div>
                      ) : (
                        bullet
                      )}
                    </li>
                  ))}
                  
                  {editable && onAddBulletPoint && (
                    <li style={{ listStyle: 'none', marginTop: '8px' }}>
                      <button
                        onClick={() => onAddBulletPoint(exp.id)}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-white/50 transition-colors"
                        style={{ color: accentColor, borderColor: accentColor }}
                      >
                        <Plus className="w-3 h-3" />
                        Add bullet
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceTimeline;
