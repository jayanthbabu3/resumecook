/**
 * Experience Premium Variant
 *
 * A polished, modern experience variant with clean typography,
 * subtle accent colors, and professional spacing.
 *
 * Features:
 * - Clean numbered bullet points with accent color
 * - Elegant date badge on the right
 * - Company name in accent color with subtle styling
 * - Proper spacing and hierarchy
 * - Theme-compliant colors
 */

import React from 'react';
import { X, Plus, Briefcase } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperiencePremium: React.FC<ExperienceVariantProps> = ({
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

  // Generate a lighter version of accent color for backgrounds
  const accentBgColor = `${accentColor}10`;
  const accentBorderColor = `${accentColor}30`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {items.map((exp, index) => (
        <div
          key={exp.id || index}
          className="group relative"
          style={{
            paddingBottom: index < items.length - 1 ? '16px' : '0',
            borderBottom: index < items.length - 1 ? '1px solid #f0f0f0' : 'none',
          }}
        >
          {/* Delete button */}
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Header Row: Position + Date */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px',
            marginBottom: '4px',
          }}>
            {/* Position Title */}
            <div style={{ flex: 1 }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.position`}
                  value={exp.position}
                  as="h3"
                  style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: '600',
                    color: typography.itemTitle.color || '#111827',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                  placeholder="Position Title"
                />
              ) : (
                <h3 style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: '600',
                  color: typography.itemTitle.color || '#111827',
                  margin: 0,
                  lineHeight: '1.4',
                }}>
                  {exp.position}
                </h3>
              )}
            </div>

            {/* Date Badge */}
            <div style={{
              fontSize: '11px',
              fontWeight: '500',
              color: '#6b7280',
              whiteSpace: 'nowrap',
              padding: '3px 10px',
              backgroundColor: '#f9fafb',
              borderRadius: '4px',
              border: '1px solid #e5e7eb',
            }}>
              {editable ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <InlineEditableDate
                    path={`experience.${index}.startDate`}
                    value={exp.startDate}
                    formatDisplay={formatDate}
                  />
                  <span style={{ color: '#9ca3af' }}>&ndash;</span>
                  {exp.current ? (
                    <span style={{ color: accentColor, fontWeight: '600' }}>Present</span>
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
                  {formatDate ? formatDate(exp.startDate) : exp.startDate}
                  <span style={{ color: '#9ca3af', margin: '0 4px' }}>&ndash;</span>
                  {exp.current ? (
                    <span style={{ color: accentColor, fontWeight: '600' }}>Present</span>
                  ) : (
                    formatDate ? formatDate(exp.endDate) : exp.endDate
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Company Name */}
          <div style={{ marginBottom: '10px' }}>
            {editable ? (
              <InlineEditableText
                path={`experience.${index}.company`}
                value={exp.company}
                style={{
                  fontSize: typography.itemSubtitle?.fontSize || '13px',
                  fontWeight: '500',
                  color: accentColor,
                  lineHeight: '1.4',
                }}
                placeholder="Company Name"
              />
            ) : (
              <span style={{
                fontSize: typography.itemSubtitle?.fontSize || '13px',
                fontWeight: '500',
                color: accentColor,
                lineHeight: '1.4',
              }}>
                {exp.company}
              </span>
            )}
            {/* Location */}
            {exp.location && (
              <span style={{
                fontSize: '12px',
                color: '#9ca3af',
                marginLeft: '8px',
              }}>
                &bull; {exp.location}
              </span>
            )}
          </div>

          {/* Description if present */}
          {exp.description && (
            <p style={{
              fontSize: typography.body.fontSize,
              color: typography.body.color || '#4b5563',
              lineHeight: '1.6',
              margin: '0 0 10px 0',
            }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.description`}
                  value={exp.description}
                  placeholder="Brief description..."
                />
              ) : (
                exp.description
              )}
            </p>
          )}

          {/* Bullet Points with numbered style */}
          {(exp.bulletPoints?.length > 0 || editable) && (
            <ol style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              counterReset: 'bullet-counter',
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
                    color: typography.body.color || '#374151',
                    lineHeight: '1.65',
                    counterIncrement: 'bullet-counter',
                  }}
                >
                  {/* Numbered bullet */}
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '18px',
                    height: '18px',
                    marginTop: '2px',
                    fontSize: '9px',
                    fontWeight: '600',
                    color: accentColor,
                    backgroundColor: accentBgColor,
                    borderRadius: '4px',
                    border: `1px solid ${accentBorderColor}`,
                  }}>
                    {bulletIndex + 1}
                  </span>
                  {editable ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                      <InlineEditableText
                        path={`experience.${index}.bulletPoints.${bulletIndex}`}
                        value={bullet}
                        style={{ flex: 1 }}
                        placeholder="Describe your achievement or responsibility..."
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
                <li style={{ marginTop: '8px', marginLeft: '28px' }}>
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
            </ol>
          )}
        </div>
      ))}

      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Briefcase className="h-3.5 w-3.5" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperiencePremium;
