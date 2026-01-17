/**
 * Experience Elegant Timeline Variant
 *
 * Modern elegant layout with subtle timeline dots on the left,
 * clean typography, and refined spacing. Perfect for professional
 * and creative roles.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceElegantTimeline: React.FC<ExperienceVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {items.map((exp, index) => (
        <div
          key={exp.id || index}
          className="group relative"
          style={{
            display: 'flex',
            gap: '20px',
            paddingBottom: index < items.length - 1 ? spacing.itemGap : 0,
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
          }}
        >
          {/* Timeline column with dot and line */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '16px',
            flexShrink: 0,
          }}>
            {/* Timeline dot */}
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              marginTop: '6px',
              flexShrink: 0,
              boxShadow: `0 0 0 3px ${accentColor}20`,
            }} />
            {/* Timeline line - show for all except last item */}
            {index < items.length - 1 && (
              <div style={{
                width: '2px',
                flex: 1,
                backgroundColor: `${accentColor}30`,
                marginTop: '8px',
                minHeight: '20px',
              }} />
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0, paddingBottom: index < items.length - 1 ? '12px' : 0 }}>
            {editable && onRemoveExperience && (
              <button
                onClick={() => onRemoveExperience(exp.id)}
                className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            {/* Header: Position & Dates on same row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              {/* Position Title */}
              <div>
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.position`}
                    value={exp.position}
                    as="h3"
                    style={{
                      fontSize: typography.itemTitle.fontSize,
                      fontWeight: 600,
                      color: typography.itemTitle.color || '#1a1a1a',
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                    placeholder="Position Title"
                  />
                ) : (
                  <h3 style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 600,
                    color: typography.itemTitle.color || '#1a1a1a',
                    margin: 0,
                    lineHeight: 1.4,
                  }}>
                    {exp.position}
                  </h3>
                )}
              </div>

              {/* Dates */}
              <div style={{
                fontSize: typography.dates.fontSize,
                color: accentColor,
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
                    <span> — </span>
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
                    {formatDate ? formatDate(exp.startDate) : exp.startDate} — {' '}
                    {exp.current ? 'Present' : (formatDate ? formatDate(exp.endDate) : exp.endDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Company & Location */}
            <div style={{
              fontSize: typography.itemSubtitle.fontSize,
              fontWeight: 500,
              color: typography.itemSubtitle.color || '#4b5563',
              marginBottom: '10px',
            }}>
              {editable ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                  <InlineEditableText
                    path={`experience.${index}.company`}
                    value={exp.company}
                    style={{
                      fontWeight: 500,
                      color: typography.itemSubtitle.color || '#4b5563',
                    }}
                    placeholder="Company Name"
                  />
                  {exp.location && (
                    <>
                      <span style={{ color: '#9ca3af' }}> · </span>
                      <InlineEditableText
                        path={`experience.${index}.location`}
                        value={exp.location || ''}
                        style={{ color: '#9ca3af', fontWeight: 400 }}
                        placeholder="Location"
                      />
                    </>
                  )}
                </span>
              ) : (
                <span>
                  {exp.company}
                  {exp.location && <span style={{ color: '#9ca3af' }}> · {exp.location}</span>}
                </span>
              )}
            </div>

            {/* Bullet points with elegant diamond markers */}
            {(exp.bulletPoints?.length > 0 || editable) && (
              <ul style={{
                margin: 0,
                paddingLeft: '0',
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
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    {/* Diamond bullet marker */}
                    <span style={{
                      width: '5px',
                      height: '5px',
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
        </div>
      ))}

      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor, marginLeft: '36px' }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceElegantTimeline;
