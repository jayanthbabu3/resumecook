/**
 * Experience Timeline Pro Variant
 * 
 * Production-ready timeline variant inspired by professional resume builders.
 * Features: Dates on left column, timeline dots, company in accent color,
 * clean separation between entries.
 * 
 * Adapts to theme colors automatically.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceTimelinePro: React.FC<ExperienceVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((exp, index) => (
        <div 
          key={exp.id || index} 
          className="group relative"
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 20px 1fr',
            gap: '0',
            alignItems: 'start',
          }}
        >
          {/* Delete button */}
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute right-0 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Left Column - Date and Location */}
          <div style={{
            textAlign: 'right',
            paddingRight: '12px',
            paddingTop: '2px',
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '4px',
            }}>
              {editable ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <InlineEditableDate
                    path={`experience.${index}.startDate`}
                    value={exp.startDate}
                    formatDisplay={formatDate}
                  />
                  <span style={{ color: '#9ca3af' }}>-</span>
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
                <>
                  <div>{formatDate ? formatDate(exp.startDate) : exp.startDate}</div>
                  <div style={{ color: '#9ca3af', fontSize: '10px' }}>-</div>
                  <div>{exp.current ? 'Present' : (formatDate ? formatDate(exp.endDate) : exp.endDate)}</div>
                </>
              )}
            </div>
            {(exp.location || editable) && (
              <div style={{
                fontSize: '11px',
                color: '#6b7280',
                marginTop: '8px',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.location`}
                    value={exp.location || ''}
                    style={{ fontSize: '11px', color: '#6b7280', textAlign: 'right' }}
                    placeholder="Location"
                  />
                ) : (
                  exp.location
                )}
              </div>
            )}
          </div>

          {/* Timeline Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
            {/* Timeline dot */}
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              marginTop: '6px',
              zIndex: 1,
            }} />
            {/* Timeline line */}
            {index < items.length - 1 && (
              <div style={{
                width: '2px',
                flex: 1,
                backgroundColor: `${accentColor}30`,
                marginTop: '4px',
              }} />
            )}
          </div>

          {/* Right Column - Content */}
          <div style={{ paddingLeft: '12px', paddingBottom: '16px' }}>
            {/* Position */}
            {editable ? (
              <InlineEditableText
                path={`experience.${index}.position`}
                value={exp.position}
                as="h3"
                style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0,
                  lineHeight: '1.3',
                }}
                placeholder="Position Title"
              />
            ) : (
              <h3 style={{
                fontSize: typography.itemTitle.fontSize,
                fontWeight: '600',
                color: '#1f2937',
                margin: 0,
                lineHeight: '1.3',
              }}>
                {exp.position}
              </h3>
            )}

            {/* Company */}
            <div style={{ marginTop: '2px', marginBottom: '10px' }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.company`}
                  value={exp.company}
                  style={{
                    fontSize: typography.itemSubtitle?.fontSize || '14px',
                    fontWeight: '500',
                    color: accentColor,
                  }}
                  placeholder="Company Name"
                />
              ) : (
                <span style={{
                  fontSize: typography.itemSubtitle?.fontSize || '14px',
                  fontWeight: '500',
                  color: accentColor,
                }}>
                  {exp.company}
                </span>
              )}
            </div>

            {/* Bullet Points */}
            {(exp.bulletPoints?.length > 0 || editable) && (
              <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}>
                {exp.bulletPoints?.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    className="group/bullet"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '5px',
                      fontSize: typography.body.fontSize,
                      color: '#374151',
                      lineHeight: '1.55',
                    }}
                  >
                    <span style={{
                      marginTop: '8px',
                      width: '4px',
                      height: '4px',
                      minWidth: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#9ca3af',
                    }} />
                    {editable ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                        <InlineEditableText
                          path={`experience.${index}.bulletPoints.${bulletIndex}`}
                          value={bullet}
                          style={{ flex: 1 }}
                          placeholder="Describe your achievement..."
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
                      <span>{bullet}</span>
                    )}
                  </li>
                ))}

                {editable && onAddBulletPoint && (
                  <li style={{ marginTop: '6px', marginLeft: '12px' }}>
                    <button
                      onClick={() => onAddBulletPoint(exp.id)}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
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

      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor, marginLeft: '140px' }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceTimelinePro;
