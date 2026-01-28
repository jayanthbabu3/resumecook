/**
 * Experience Icon Clean Variant
 *
 * Clean, minimal stacked layout with a subtle left accent border.
 * No icons - focuses on clear typography and content hierarchy.
 * ATS-friendly and works well with any resume template.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

export const ExperienceIconClean: React.FC<ExperienceVariantProps> = ({
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
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((exp, index) => (
        <div
          key={exp.id || index}
          className="group relative pdf-experience-entry"
          data-experience-entry="true"
          style={{
            paddingLeft: '16px',
            borderLeft: `3px solid ${accentColor}`,
            paddingBottom: index < items.length - 1 ? '4px' : 0,
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

          {/* Entry Header */}
          <div data-entry-header="true">
            {/* Header Row: Position + Date */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '4px',
              }}
            >
              {/* Position */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.position`}
                    value={exp.position}
                    as="h3"
                    style={{
                      fontSize: scaleFontSize(typography.itemTitle.fontSize),
                      fontWeight: 600,
                      color: '#111827',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                    placeholder="Position Title"
                  />
                ) : (
                  <h3
                    style={{
                      fontSize: scaleFontSize(typography.itemTitle.fontSize),
                      fontWeight: 600,
                      color: '#111827',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {exp.position}
                  </h3>
                )}
              </div>

              {/* Date Range */}
              <div
                style={{
                  fontSize: scaleFontSize(typography.dates.fontSize),
                  color: '#6b7280',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                }}
              >
                {editable ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <InlineEditableDate
                      path={`experience.${index}.startDate`}
                      value={exp.startDate}
                      formatDisplay={formatDate}
                    />
                    <span>–</span>
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
                    {formatDate ? formatDate(exp.startDate) : exp.startDate} –{' '}
                    {exp.current ? (
                      <span style={{ color: accentColor, fontWeight: 600 }}>Present</span>
                    ) : (
                      formatDate ? formatDate(exp.endDate) : exp.endDate
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Company & Location Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '6px',
              }}
            >
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.company`}
                  value={exp.company}
                  style={{
                    fontSize: scaleFontSize(typography.itemSubtitle?.fontSize || '13px'),
                    fontWeight: 500,
                    color: accentColor,
                  }}
                  placeholder="Company Name"
                />
              ) : (
                <span
                  style={{
                    fontSize: scaleFontSize(typography.itemSubtitle?.fontSize || '13px'),
                    fontWeight: 500,
                    color: accentColor,
                  }}
                >
                  {exp.company}
                </span>
              )}

              {(exp.location || editable) && (
                <>
                  <span style={{ color: '#d1d5db' }}>•</span>
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.location`}
                      value={exp.location || ''}
                      style={{
                        fontSize: scaleFontSize(typography.body.fontSize),
                        color: '#6b7280',
                      }}
                      placeholder="Location"
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: scaleFontSize(typography.body.fontSize),
                        color: '#6b7280',
                      }}
                    >
                      {exp.location}
                    </span>
                  )}
                </>
              )}

              {(exp.employmentType || editable) && (
                <>
                  <span style={{ color: '#d1d5db' }}>•</span>
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.employmentType`}
                      value={exp.employmentType || ''}
                      style={{
                        fontSize: scaleFontSize(typography.body.fontSize),
                        color: '#6b7280',
                      }}
                      placeholder="Full-time"
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: scaleFontSize(typography.body.fontSize),
                        color: '#6b7280',
                      }}
                    >
                      {exp.employmentType}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {(exp.description || editable) && (
            <div
              style={{
                fontSize: scaleFontSize(typography.body.fontSize),
                color: '#4b5563',
                marginBottom: '6px',
                lineHeight: 1.55,
                textAlign: 'justify',
              }}
            >
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

          {/* Bullet Points */}
          {(exp.bulletPoints?.length > 0 || editable) && (
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {exp.bulletPoints?.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  className="group/bullet"
                  style={{
                    fontSize: scaleFontSize(typography.body.fontSize),
                    color: '#374151',
                    lineHeight: 1.55,
                    textAlign: 'justify',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: accentColor,
                      marginTop: '8px',
                      flexShrink: 0,
                    }}
                  />
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
                <li style={{ marginTop: '6px', marginLeft: '14px' }}>
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
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceIconClean;
