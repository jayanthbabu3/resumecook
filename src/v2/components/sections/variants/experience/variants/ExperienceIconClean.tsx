/**
 * Experience Icon Clean Variant
 *
 * Clean professional layout with circular company icon, position in accent color,
 * company/location with em dash, and dates on right side. No card backgrounds.
 * Matches the Jane Rutherford Project Manager design.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

// Get company initials for the icon
const getCompanyInitial = (company: string): string => {
  if (!company) return '?';
  return company.charAt(0).toUpperCase();
};

// Simple SVG icon patterns based on company initial
const getIconPattern = (initial: string, color: string) => {
  // Different simple patterns for variety
  const patterns: Record<string, JSX.Element> = {
    'N': (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    'B': (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
    'E': (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
      </svg>
    ),
  };

  return patterns[initial] || (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
};

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

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((exp, index) => (
        <div
          key={exp.id || index}
          className="group relative"
          style={{
            display: 'flex',
            gap: '14px',
            paddingBottom: index < items.length - 1 ? spacing.itemGap : 0,
            borderBottom: index < items.length - 1 ? `1px solid #f3f4f6` : 'none',
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
          }}
        >
          {/* Company Icon - Circular with subtle background */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: `${accentColor}12`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            {getIconPattern(getCompanyInitial(exp.company), accentColor)}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {editable && onRemoveExperience && (
              <button
                onClick={() => onRemoveExperience(exp.id)}
                className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            {/* Position Title & Dates Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
              {/* Position Title - Accent color, uppercase */}
              <div>
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.position`}
                    value={exp.position}
                    as="h3"
                    style={{
                      fontSize: typography.itemTitle.fontSize,
                      fontWeight: 700,
                      color: accentColor,
                      margin: 0,
                      lineHeight: 1.4,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                    placeholder="Position Title"
                  />
                ) : (
                  <h3 style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 700,
                    color: accentColor,
                    margin: 0,
                    lineHeight: 1.4,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    {exp.position}
                  </h3>
                )}
              </div>

              {/* Dates on right */}
              <div style={{
                fontSize: typography.dates.fontSize,
                color: typography.dates.color,
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
                    <span> - </span>
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
                    {formatDate ? formatDate(exp.startDate) : exp.startDate} - {' '}
                    {exp.current ? 'Present' : (formatDate ? formatDate(exp.endDate) : exp.endDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Company & Location Row */}
            <div style={{
              fontSize: typography.itemSubtitle.fontSize,
              fontWeight: typography.itemSubtitle.fontWeight || 700,
              color: typography.itemSubtitle.color || '#1a1a1a',
              marginBottom: '8px',
            }}>
              {editable ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                  <InlineEditableText
                    path={`experience.${index}.company`}
                    value={exp.company}
                    style={{
                      fontWeight: 700,
                      color: typography.itemSubtitle.color || '#1a1a1a',
                    }}
                    placeholder="Company Name"
                  />
                  {exp.location && (
                    <>
                      <span style={{ color: typography.body.color }}> — </span>
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
                  {exp.location && <span style={{ color: typography.body.color, fontWeight: 400 }}> — {exp.location}</span>}
                </span>
              )}
            </div>

            {/* Bullet points with square markers */}
            {(exp.bulletPoints?.length > 0 || editable) && (
              <ul style={{
                margin: 0,
                paddingLeft: '16px',
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
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <span style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: accentColor,
                      marginTop: '8px',
                      flexShrink: 0,
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
                  <li style={{ marginTop: '8px' }}>
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

export default ExperienceIconClean;
