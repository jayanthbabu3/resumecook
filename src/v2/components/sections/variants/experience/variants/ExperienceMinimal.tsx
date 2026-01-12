/**
 * Experience Minimal Variant
 * 
 * Ultra-minimal text-only layout.
 * Perfect for academic CVs or when space is extremely limited.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceMinimal: React.FC<ExperienceVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((exp, index) => (
        <div 
          key={exp.id || index}
          className="group relative"
          style={{ 
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '4px',
            paddingRight: editable ? '24px' : 0,
          }}
        >
          {editable && onRemoveExperience && (
            <button
              onClick={() => onRemoveExperience(exp.id)}
              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}
          
          {editable ? (
            <>
              <InlineEditableText
                path={`experience.${index}.position`}
                value={exp.position}
                style={{ fontWeight: 600, color: typography.itemTitle.color }}
                placeholder="Position"
              />
              <span style={{ color: '#9ca3af' }}>–</span>
              <InlineEditableText
                path={`experience.${index}.company`}
                value={exp.company}
                style={{ color: typography.body.color }}
                placeholder="Company"
              />
              <span style={{ color: '#d1d5db' }}>(</span>
              <InlineEditableDate
                path={`experience.${index}.startDate`}
                value={exp.startDate}
                formatDisplay={formatDate}
                style={{ fontSize: '13px', color: '#9ca3af' }}
              />
              <span style={{ color: '#9ca3af' }}>–</span>
              {exp.current ? (
                <span style={{ fontSize: '13px', color: '#9ca3af' }}>Present</span>
              ) : (
                <InlineEditableDate
                  path={`experience.${index}.endDate`}
                  value={exp.endDate}
                  formatDisplay={formatDate}
                  style={{ fontSize: '13px', color: '#9ca3af' }}
                />
              )}
              <span style={{ color: '#d1d5db' }}>)</span>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
                {exp.position}
              </span>
              <span style={{ color: '#9ca3af' }}>–</span>
              <span style={{ color: typography.body.color }}>{exp.company}</span>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                ({formatDate ? formatDate(exp.startDate) : exp.startDate} – {exp.current ? 'Present' : (formatDate ? formatDate(exp.endDate) : exp.endDate)})
              </span>
            </>
          )}
        </div>
      ))}
      
      {editable && onAddExperience && (
        <button
          onClick={onAddExperience}
          className="mt-2 flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default ExperienceMinimal;
