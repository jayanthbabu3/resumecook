/**
 * Experience Modern Variant
 * 
 * Clean modern layout with accent borders and subtle backgrounds.
 * Popular in tech startups and modern companies.
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceModern: React.FC<ExperienceVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {items.map((exp, index) => (
        <div 
          key={exp.id || index}
          className="group relative"
          style={{ 
            borderLeft: `4px solid ${accentColor}`,
            paddingLeft: '20px',
            paddingBottom: '4px',
          }}
        >
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ flex: 1 }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.position`}
                  value={exp.position}
                  as="h3"
                  style={{ 
                    fontSize: '17px', 
                    fontWeight: 700,
                    color: typography.itemTitle.color,
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                  placeholder="Position Title"
                />
              ) : (
                <h3 style={{ 
                  fontSize: '17px', 
                  fontWeight: 700,
                  color: typography.itemTitle.color,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}>
                  {exp.position}
                </h3>
              )}
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginTop: '4px',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.company`}
                    value={exp.company}
                    style={{ 
                      fontSize: '15px',
                      color: accentColor,
                      fontWeight: 600,
                    }}
                    placeholder="Company Name"
                  />
                ) : (
                  <span style={{ 
                    fontSize: '15px',
                    color: accentColor,
                    fontWeight: 600,
                  }}>
                    {exp.company}
                  </span>
                )}
                
                {exp.companyUrl && !editable && (
                  <a 
                    href={exp.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: accentColor, opacity: 0.7 }}
                  >
                    <ExternalLink style={{ width: '12px', height: '12px' }} />
                  </a>
                )}
                
                {exp.location && (
                  <>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.location`}
                        value={exp.location}
                        style={{ fontSize: '13px', color: '#6b7280' }}
                        placeholder="Location"
                      />
                    ) : (
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>{exp.location}</span>
                    )}
                  </>
                )}
              </div>
            </div>
            
            <div style={{ 
              fontSize: '13px', 
              color: '#6b7280',
              fontWeight: 500,
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
                    <span style={{ color: accentColor, fontWeight: 600 }}>Present</span>
                  ) : (
                    <InlineEditableDate
                      path={`experience.${index}.endDate`}
                      value={exp.endDate}
                      formatDisplay={formatDate}
                    />
                  )}
                </div>
              ) : (
                <>
                  {formatDate ? formatDate(exp.startDate) : exp.startDate} – {' '}
                  {exp.current ? (
                    <span style={{ color: accentColor, fontWeight: 600 }}>Present</span>
                  ) : (
                    formatDate ? formatDate(exp.endDate) : exp.endDate
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Description */}
          {(exp.description || editable) && (
            <div style={{ 
              fontSize: typography.body.fontSize, 
              color: '#4b5563',
              marginBottom: '10px',
              lineHeight: 1.6,
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
            <div style={{
              margin: 0,
              paddingLeft: 0,
            }}>
              {exp.bulletPoints?.map((bullet, bulletIndex) => (
                <div
                  key={bulletIndex}
                  className="group/bullet"
                  style={{
                    fontSize: typography.body.fontSize,
                    color: typography.body.color,
                    lineHeight: 1.6,
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}
                >
                  <span style={{
                    color: accentColor,
                    fontWeight: 600,
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    {config.experience?.bulletStyle || '▸'}
                  </span>
                  {editable ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
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
                    <span style={{ flex: 1 }}>{bullet}</span>
                  )}
                </div>
              ))}
              
              {editable && onAddBulletPoint && (
                <div style={{ marginTop: '8px', marginLeft: '16px' }}>
                  <button
                    onClick={() => onAddBulletPoint(exp.id)}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    <Plus className="w-3 h-3" />
                    Add bullet point
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      
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

export default ExperienceModern;
