/**
 * Experience Icon Accent Variant
 *
 * Creative layout with company initial icon, gradient accent bar,
 * and modern card-style presentation. Perfect for creative professionals.
 */

import React from 'react';
import { X, Plus, MapPin, Calendar } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

// Get company initials for the icon
const getCompanyInitial = (company: string): string => {
  if (!company) return '?';
  return company.charAt(0).toUpperCase();
};

export const ExperienceIconAccent: React.FC<ExperienceVariantProps> = ({
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

  // Create a lighter version of the accent color
  const lightAccent = `${accentColor}15`;
  const mediumAccent = `${accentColor}30`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((exp, index) => (
        <div
          key={exp.id || index}
          className="group relative"
          style={{
            display: 'flex',
            gap: '16px',
            padding: '16px',
            backgroundColor: lightAccent,
            borderRadius: '12px',
            border: `1px solid ${mediumAccent}`,
          }}
        >
          {/* Company Initial Icon */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 4px 12px ${accentColor}40`,
            }}
          >
            <span
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              {getCompanyInitial(exp.company)}
            </span>
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {editable && onRemoveExperience && (
              <button
                onClick={() => onRemoveExperience(exp.id)}
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            {/* Position & Company Row */}
            <div style={{ marginBottom: '8px' }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.position`}
                  value={exp.position}
                  as="h3"
                  style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 700,
                    color: typography.itemTitle.color,
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                  placeholder="Position Title"
                />
              ) : (
                <h3 style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: 700,
                  color: typography.itemTitle.color,
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {exp.position}
                </h3>
              )}

              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.company`}
                  value={exp.company}
                  style={{
                    fontSize: typography.itemSubtitle.fontSize,
                    color: accentColor,
                    fontWeight: 600,
                    marginTop: '2px',
                  }}
                  placeholder="Company Name"
                />
              ) : (
                <div style={{
                  fontSize: typography.itemSubtitle.fontSize,
                  color: accentColor,
                  fontWeight: 600,
                  marginTop: '2px',
                }}>
                  {exp.company}
                </div>
              )}
            </div>

            {/* Date & Location Row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '10px',
              fontSize: typography.small.fontSize,
              color: typography.dates.color,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar style={{ width: '12px', height: '12px', opacity: 0.7 }} />
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
                  <span>
                    {formatDate ? formatDate(exp.startDate) : exp.startDate} – {' '}
                    {exp.current ? (
                      <span style={{ color: accentColor, fontWeight: 600 }}>Present</span>
                    ) : (
                      formatDate ? formatDate(exp.endDate) : exp.endDate
                    )}
                  </span>
                )}
              </div>

              {exp.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin style={{ width: '12px', height: '12px', opacity: 0.7 }} />
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.location`}
                      value={exp.location}
                      placeholder="Location"
                    />
                  ) : (
                    <span>{exp.location}</span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {(exp.description || editable) && (
              <div style={{
                fontSize: typography.body.fontSize,
                color: typography.body.color,
                marginBottom: '8px',
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

            {/* Bullet points with accent squares */}
            {(exp.bulletPoints?.length > 0 || editable) && (
              <ul style={{
                margin: 0,
                paddingLeft: 0,
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
                      marginBottom: '5px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <span style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '1px',
                      backgroundColor: accentColor,
                      marginTop: '7px',
                      flexShrink: 0,
                      transform: 'rotate(45deg)',
                    }} />
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
                  </li>
                ))}

                {editable && onAddBulletPoint && (
                  <li style={{ marginTop: '8px', marginLeft: '15px' }}>
                    <button
                      onClick={() => onAddBulletPoint(exp.id)}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-white/50 transition-colors"
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
        </div>
      ))}

      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceIconAccent;
