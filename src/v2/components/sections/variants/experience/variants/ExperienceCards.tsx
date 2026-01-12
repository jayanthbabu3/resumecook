/**
 * Experience Cards Variant
 * 
 * Card-based layout with shadow and borders.
 * Modern look suitable for tech and creative industries.
 */

import React from 'react';
import { X, Plus, MapPin, Calendar } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceCards: React.FC<ExperienceVariantProps> = ({
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      {items.map((exp, index) => (
        <div 
          key={exp.id || index}
          className="group relative"
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'box-shadow 0.2s, transform 0.2s',
          }}
        >
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3.5 h-3.5 text-red-600" />
            </button>
          )}
          
          {/* Company badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: `${accentColor}15`,
            color: accentColor,
            fontSize: '12px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '20px',
            marginBottom: '12px',
          }}>
            {editable ? (
              <InlineEditableText
                path={`experience.${index}.company`}
                value={exp.company}
                style={{ color: accentColor, fontWeight: 600, fontSize: '12px' }}
                placeholder="Company"
              />
            ) : (
              exp.company
            )}
          </div>
          
          {/* Position */}
          {editable ? (
            <InlineEditableText
              path={`experience.${index}.position`}
              value={exp.position}
              as="h3"
              style={{ 
                fontSize: typography.itemTitle.fontSize, 
                fontWeight: 700,
                color: typography.itemTitle.color,
                margin: '0 0 8px 0',
                lineHeight: 1.3,
              }}
              placeholder="Position Title"
            />
          ) : (
            <h3 style={{ 
              fontSize: typography.itemTitle.fontSize, 
              fontWeight: 700,
              color: typography.itemTitle.color,
              margin: '0 0 8px 0',
              lineHeight: 1.3,
            }}>
              {exp.position}
            </h3>
          )}
          
          {/* Meta info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280' }}>
              <Calendar style={{ width: '12px', height: '12px' }} />
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
            
            {exp.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280' }}>
                <MapPin style={{ width: '12px', height: '12px' }} />
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.location`}
                    value={exp.location}
                    style={{ fontSize: '12px', color: '#6b7280' }}
                    placeholder="Location"
                  />
                ) : (
                  exp.location
                )}
              </div>
            )}
          </div>
          
          {/* Bullet points */}
          {(exp.bulletPoints?.length > 0 || editable) && (
            <ul style={{ 
              margin: 0, 
              paddingLeft: '16px',
              listStyleType: 'none',
            }}>
              {exp.bulletPoints?.slice(0, 3).map((bullet, bulletIndex) => (
                <li 
                  key={bulletIndex}
                  className="group/bullet"
                  style={{ 
                    fontSize: '13px',
                    color: typography.body.color,
                    lineHeight: 1.5,
                    marginBottom: '6px',
                    position: 'relative',
                    paddingLeft: '12px',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '7px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: accentColor,
                  }} />
                  {editable ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <InlineEditableText
                        path={`experience.${index}.bulletPoints.${bulletIndex}`}
                        value={bullet}
                        style={{ flex: 1, fontSize: '13px' }}
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
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      ))}
      
      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '150px',
            borderRadius: '12px',
            border: `2px dashed ${accentColor}40`,
            backgroundColor: `${accentColor}05`,
            color: accentColor,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          className="hover:border-opacity-100 hover:bg-opacity-10"
        >
          <Plus style={{ width: '24px', height: '24px' }} />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceCards;
