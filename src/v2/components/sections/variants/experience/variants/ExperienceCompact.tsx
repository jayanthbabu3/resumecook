/**
 * Experience Compact Variant
 * 
 * Space-efficient layout showing key info in single lines.
 * Ideal for resumes with many positions or limited space.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceCompact: React.FC<ExperienceVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddExperience,
  onRemoveExperience,
  formatDate,
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: config.spacing?.itemGap || '12px' }}>
      {items.map((exp, index) => (
        <div
          key={exp.id || index}
          className="group relative"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '16px',
          }}
        >
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flex: 1 }}>
            {editable ? (
              <>
                <InlineEditableText
                  path={`experience.${index}.position`}
                  value={exp.position}
                  style={{
                    fontWeight: typography.itemTitle.fontWeight,
                    fontSize: typography.itemTitle.fontSize,
                    color: typography.itemTitle.color,
                  }}
                  placeholder="Position"
                />
                <span style={{ color: typography.dates.color, fontSize: typography.body.fontSize }}>at</span>
                <InlineEditableText
                  path={`experience.${index}.company`}
                  value={exp.company}
                  style={{
                    color: accentColor,
                    fontWeight: typography.itemSubtitle.fontWeight,
                    fontSize: typography.itemSubtitle.fontSize,
                  }}
                  placeholder="Company"
                />
              </>
            ) : (
              <>
                <span style={{
                  fontWeight: typography.itemTitle.fontWeight,
                  fontSize: typography.itemTitle.fontSize,
                  color: typography.itemTitle.color,
                }}>
                  {exp.position}
                </span>
                <span style={{ color: typography.dates.color, fontSize: typography.body.fontSize }}>at</span>
                <span style={{
                  color: accentColor,
                  fontWeight: typography.itemSubtitle.fontWeight,
                  fontSize: typography.itemSubtitle.fontSize,
                }}>{exp.company}</span>
              </>
            )}
          </div>

          <div style={{
            fontSize: typography.dates.fontSize,
            color: typography.dates.color,
            whiteSpace: 'nowrap',
            flexShrink: 0,
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
      ))}
      
      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceCompact;
