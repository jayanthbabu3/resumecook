/**
 * Experience Enhanced Variant
 * 
 * Production-ready experience variant inspired by EnhanceCV.
 * Features: Clean layout, company in accent color, calendar/location icons,
 * professional bullet points with accent dots.
 * 
 * Adapts to theme colors automatically.
 */

import React from 'react';
import { X, Plus, Calendar, MapPin } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceEnhanced: React.FC<ExperienceVariantProps> = ({
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
        <div key={exp.id || index} className="group relative">
          {/* Delete button */}
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Position Title */}
          <div style={{ marginBottom: '4px' }}>
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
          </div>

          {/* Company Name in Accent Color */}
          <div style={{ marginBottom: '6px' }}>
            {editable ? (
              <InlineEditableText
                path={`experience.${index}.company`}
                value={exp.company}
                style={{
                  fontSize: typography.itemSubtitle?.fontSize || '14px',
                  fontWeight: '500',
                  color: accentColor,
                  lineHeight: '1.4',
                }}
                placeholder="Company Name"
              />
            ) : (
              <span style={{
                fontSize: typography.itemSubtitle?.fontSize || '14px',
                fontWeight: '500',
                color: accentColor,
                lineHeight: '1.4',
              }}>
                {exp.company}
              </span>
            )}
          </div>

          {/* Date and Location Row with Icons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '10px',
            flexWrap: 'wrap',
          }}>
            {/* Date with Calendar Icon */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#6b7280',
            }}>
              <Calendar style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
              {editable ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <InlineEditableDate
                    path={`experience.${index}.startDate`}
                    value={exp.startDate}
                    formatDisplay={formatDate}
                  />
                  <span> - </span>
                  {exp.current ? 'Present' : (
                    <InlineEditableDate
                      path={`experience.${index}.endDate`}
                      value={exp.endDate}
                      formatDisplay={formatDate}
                    />
                  )}
                </div>
              ) : (
                <span>
                  {formatDate ? formatDate(exp.startDate) : exp.startDate} - {exp.current ? 'Present' : (formatDate ? formatDate(exp.endDate) : exp.endDate)}
                </span>
              )}
            </div>

            {/* Location with Pin Icon */}
            {(exp.location || editable) && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#6b7280',
              }}>
                <MapPin style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.location`}
                    value={exp.location || ''}
                    style={{ fontSize: '12px', color: '#6b7280' }}
                    placeholder="Location"
                  />
                ) : (
                  <span>{exp.location}</span>
                )}
              </div>
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
                    gap: '10px',
                    marginBottom: '6px',
                    fontSize: typography.body.fontSize,
                    color: '#374151',
                    lineHeight: '1.6',
                  }}
                >
                  <span style={{
                    marginTop: '8px',
                    width: '5px',
                    height: '5px',
                    minWidth: '5px',
                    borderRadius: '50%',
                    backgroundColor: accentColor,
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
                <li style={{ marginTop: '8px', marginLeft: '15px' }}>
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

      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-3 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceEnhanced;
