/**
 * Experience Standard Variant
 * 
 * Classic professional layout with position, company, dates, and bullet points.
 * Most commonly used format in corporate resumes.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceStandard: React.FC<ExperienceVariantProps> = ({
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
  const { typography, spacing, experience } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((exp, index) => (
        <div 
          key={exp.id || index} 
          className="group relative"
          style={{ 
            marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
            // Prevent individual items from breaking across pages
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
          }}
        >
          {/* Delete button */}
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
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
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                    <InlineEditableText
                      path={`experience.${index}.company`}
                      value={exp.company}
                      style={{ color: accentColor, fontWeight: 500 }}
                      placeholder="Company Name"
                    />
                    {exp.location && (
                      <>
                        <span style={{ color: typography.body.color }}> • </span>
                        <InlineEditableText
                          path={`experience.${index}.location`}
                          value={exp.location || ''}
                          style={{ color: typography.body.color, fontWeight: 400 }}
                          placeholder="Location"
                        />
                      </>
                    )}
                  </span>
                ) : (
                  <span>
                    {exp.company}
                    {exp.location && <span style={{ color: typography.body.color, fontWeight: 400 }}> • {exp.location}</span>}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <InlineEditableDate
                    path={`experience.${index}.startDate`}
                    value={exp.startDate}
                    formatDisplay={formatDate}
                  />
                  <span> – </span>
                  {exp.current ? (
                    <span>Present</span>
                  ) : (
                    <InlineEditableDate
                      path={`experience.${index}.endDate`}
                      value={exp.endDate}
                      formatDisplay={formatDate}
                    />
                  )}
                </div>
              ) : (
                <span>
                  {formatDate ? formatDate(exp.startDate) : exp.startDate} – {exp.current ? 'Present' : (formatDate ? formatDate(exp.endDate) : exp.endDate)}
                </span>
              )}
            </div>
          </div>
          
          {/* Description */}
          {(exp.description || editable) && (
            <div style={{ 
              fontSize: typography.body.fontSize, 
              color: typography.body.color,
              margin: '8px 0',
              lineHeight: typography.body.lineHeight,
            }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.description`}
                  value={exp.description || ''}
                  multiline
                  placeholder="Brief description of your role..."
                />
              ) : (
                exp.description
              )}
            </div>
          )}
          
          {/* Bullet points */}
          {(exp.bulletPoints?.length > 0 || editable) && (
            <ul style={{ 
              margin: '8px 0 0 0', 
              paddingLeft: '20px',
              listStyleType: experience?.bulletStyle || 'disc',
            }}>
              {exp.bulletPoints?.map((bullet, bulletIndex) => (
                <li 
                  key={bulletIndex} 
                  className="group/bullet relative"
                  style={{ 
                    fontSize: typography.body.fontSize,
                    color: typography.body.color,
                    lineHeight: typography.body.lineHeight,
                    marginBottom: spacing.bulletGap || '4px',
                  }}
                >
                  {editable ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <InlineEditableText
                        path={`experience.${index}.bulletPoints.${bulletIndex}`}
                        value={bullet}
                        style={{ flex: 1 }}
                        placeholder="Achievement or responsibility..."
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
                <li style={{ listStyle: 'none', marginLeft: '-20px', marginTop: '8px' }}>
                  <button
                    onClick={() => onAddBulletPoint(exp.id)}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    <Plus className="w-3 h-3" />
                    Add bullet point
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      ))}
      
      {/* Add experience button */}
      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceStandard;
