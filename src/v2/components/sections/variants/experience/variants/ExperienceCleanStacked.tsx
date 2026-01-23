/**
 * Experience Clean Stacked Variant
 *
 * Clean minimal stacked layout with subtle separators.
 * Position and company on same line, dates below, bullet points with minimal styling.
 * Perfect for modern minimal templates.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../types';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

export const ExperienceCleanStacked: React.FC<ExperienceVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing?.itemGap || '16px' }}>
      {items.map((exp, index) => (
        <div
          key={exp.id || index}
          className="group relative pdf-experience-entry"
          data-experience-entry="true"
          style={{
            paddingBottom: index < items.length - 1 ? '16px' : '0',
            borderBottom: index < items.length - 1 ? `1px solid ${accentColor}15` : 'none',
          }}
        >
          {/* Remove button */}
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Entry Header - keep together for PDF page breaks */}
          <div data-entry-header="true">
          {/* Header: Position | Company */}
          <div style={{ marginBottom: '4px' }}>
            {editable ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                <InlineEditableText
                  path={`experience.${index}.position`}
                  value={exp.position}
                  style={{
                    fontSize: scaleFontSize(typography.itemTitle.fontSize),
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                  }}
                  placeholder="Position Title"
                />
                <span style={{ color: accentColor, fontWeight: 300 }}>|</span>
                <InlineEditableText
                  path={`experience.${index}.company`}
                  value={exp.company}
                  style={{
                    fontSize: scaleFontSize(typography.itemSubtitle?.fontSize || '11px'),
                    fontWeight: 500,
                    color: accentColor,
                  }}
                  placeholder="Company Name"
                />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: scaleFontSize(typography.itemTitle.fontSize),
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                }}>
                  {exp.position}
                </span>
                <span style={{ color: accentColor, fontWeight: 300 }}>|</span>
                <span style={{
                  fontSize: scaleFontSize(typography.itemSubtitle?.fontSize || '11px'),
                  fontWeight: 500,
                  color: accentColor,
                }}>
                  {exp.company}
                </span>
              </div>
            )}
          </div>

          {/* Date and Location line */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px',
            fontSize: scaleFontSize(typography.dates?.fontSize || '11px'),
            color: typography.dates?.color || '#6b7280',
          }}>
            {editable ? (
              <>
                <InlineEditableDate
                  path={`experience.${index}.startDate`}
                  value={exp.startDate}
                  formatDisplay={formatDate}
                  style={{ fontSize: scaleFontSize(typography.dates?.fontSize || '11px'), color: typography.dates?.color || '#6b7280' }}
                />
                <span>–</span>
                {exp.current ? (
                  <span>Present</span>
                ) : (
                  <InlineEditableDate
                    path={`experience.${index}.endDate`}
                    value={exp.endDate}
                    formatDisplay={formatDate}
                    style={{ fontSize: scaleFontSize(typography.dates?.fontSize || '11px'), color: typography.dates?.color || '#6b7280' }}
                  />
                )}
              </>
            ) : (
              <span>
                {formatDate ? formatDate(exp.startDate) : exp.startDate} – {exp.current ? 'Present' : (formatDate ? formatDate(exp.endDate) : exp.endDate)}
              </span>
            )}
            {exp.location && (
              <>
                <span style={{ color: '#d1d5db' }}>•</span>
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.location`}
                    value={exp.location}
                    style={{ fontSize: scaleFontSize(typography.dates?.fontSize || '11px'), color: typography.dates?.color || '#6b7280' }}
                    placeholder="Location"
                  />
                ) : (
                  <span>{exp.location}</span>
                )}
              </>
            )}
          </div>
          </div>
          {/* End Entry Header */}

          {/* Bullet Points */}
          {(exp.bulletPoints?.length > 0 || editable) && (
            <ul style={{
              margin: 0,
              paddingLeft: '16px',
              listStyle: 'none',
            }}>
              {exp.bulletPoints?.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  className="group/bullet relative"
                  style={{
                    fontSize: scaleFontSize(typography.body.fontSize),
                    lineHeight: typography.body.lineHeight,
                    color: typography.body.color,
                    textAlign: 'justify',
                    marginBottom: '4px',
                    paddingLeft: '8px',
                    position: 'relative',
                  }}
                >
                  {/* Custom bullet marker */}
                  <span style={{
                    position: 'absolute',
                    left: '-12px',
                    top: '0.6em',
                    width: '4px',
                    height: '4px',
                    backgroundColor: accentColor,
                    borderRadius: '50%',
                  }} />

                  {editable ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                      <InlineEditableText
                        path={`experience.${index}.bulletPoints.${bulletIndex}`}
                        value={bullet}
                        style={{
                          fontSize: scaleFontSize(typography.body.fontSize),
                          lineHeight: typography.body.lineHeight,
                          color: typography.body.color,
                          flex: 1,
                        }}
                        placeholder="Describe your achievement..."
                        multiline
                      />
                      {onRemoveBulletPoint && (
                        <button
                          onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                          className="opacity-0 group-hover/bullet:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded flex-shrink-0"
                        >
                          <X className="w-3 h-3 text-red-600" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <span>{bullet}</span>
                  )}
                </li>
              ))}

              {editable && onAddBulletPoint && (
                <li style={{ marginTop: '4px' }}>
                  <button
                    onClick={() => onAddBulletPoint(exp.id)}
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded hover:bg-gray-100 transition-colors"
                    style={{ color: accentColor }}
                  >
                    <Plus className="h-3 w-3" />
                    Add point
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      ))}

      {/* Add Experience Button */}
      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceCleanStacked;
