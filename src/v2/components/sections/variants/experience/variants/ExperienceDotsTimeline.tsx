/**
 * Experience Dots Timeline Variant
 *
 * Simple, clean timeline with connected dots.
 * Minimalist design without icons or card backgrounds.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceDotsTimeline: React.FC<ExperienceVariantProps> = ({
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

  const dotSize = 12;
  const lineWidth = 2;
  const lineLeft = (dotSize - lineWidth) / 2; // Center line under dots

  return (
    <div style={{ position: 'relative', paddingLeft: '28px' }}>
      {/* Timeline vertical line - centered under dots */}
      <div style={{
        position: 'absolute',
        left: `${lineLeft}px`,
        top: `${dotSize / 2}px`,
        bottom: editable ? '50px' : `${dotSize / 2}px`,
        width: `${lineWidth}px`,
        backgroundColor: accentColor,
        opacity: 0.35,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
        {items.map((exp, index) => (
          <div key={exp.id || index} className="group relative">
            {/* Timeline dot - centered on line */}
            <div style={{
              position: 'absolute',
              left: `-28px`,
              top: '4px',
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              borderRadius: '50%',
              backgroundColor: accentColor,
              border: '2px solid #fff',
              boxShadow: `0 0 0 2px ${accentColor}50`,
              zIndex: 1,
            }} />

            {/* Delete button */}
            {editable && onRemoveExperience && (
              <button
                onClick={() => onRemoveExperience(exp.id)}
                className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            <div>
              {/* Header row with title and dates */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
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
                    fontSize: typography.itemSubtitle.fontSize,
                    color: typography.itemSubtitle.color,
                    fontWeight: typography.itemSubtitle.fontWeight,
                    marginTop: '2px',
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.company`}
                        value={exp.company}
                        style={{
                          fontSize: typography.itemSubtitle.fontSize,
                          color: typography.itemSubtitle.color,
                          fontWeight: typography.itemSubtitle.fontWeight,
                        }}
                        placeholder="Company Name"
                      />
                    ) : (
                      exp.company
                    )}
                    {exp.location && (
                      <span style={{ color: typography.dates.color, fontWeight: 400 }}>
                        {' · '}{exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{
                  fontSize: typography.dates.fontSize,
                  color: typography.dates.color,
                  fontWeight: typography.dates.fontWeight,
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

              {/* Bullet points - no list style, just custom bullet character */}
              {(exp.bulletPoints?.length > 0 || editable) && (
                <div style={{ marginTop: '10px' }}>
                  {exp.bulletPoints?.map((bullet, bulletIndex) => (
                    <div
                      key={bulletIndex}
                      className="group/bullet"
                      style={{
                        fontSize: typography.body.fontSize,
                        color: typography.body.color,
                        lineHeight: typography.body.lineHeight,
                        marginBottom: spacing.bulletGap,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                      }}
                    >
                      <span style={{
                        color: accentColor,
                        fontWeight: 'bold',
                        flexShrink: 0,
                        lineHeight: typography.body.lineHeight,
                      }}>
                        {config.experience?.bulletStyle || '▸'}
                      </span>
                      {editable ? (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
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
                        <span>{bullet}</span>
                      )}
                    </div>
                  ))}

                  {editable && onAddBulletPoint && (
                    <button
                      onClick={() => onAddBulletPoint(exp.id)}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-white/50 transition-colors mt-2"
                      style={{ color: accentColor, borderColor: accentColor }}
                    >
                      <Plus className="w-3 h-3" />
                      Add bullet
                    </button>
                  )}
                </div>
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

export default ExperienceDotsTimeline;
