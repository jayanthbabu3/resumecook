/**
 * Experience Timeline Variant
 * 
 * Clean, modern timeline with subtle connecting elements.
 * Professional design that's ATS-friendly and print-ready.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { ExperienceVariantProps } from '../../experience/types';

export const ExperienceTimeline: React.FC<ExperienceVariantProps> = ({
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

  // Timeline dot size for alignment calculation
  const dotSize = 8;
  const dotLeft = 0; // Position from left edge
  const lineLeft = dotLeft + (dotSize / 2) - 0.5; // Center line on dot (subtract half line width)
  const contentPaddingLeft = dotLeft + dotSize + 12; // Space after dot for content

  return (
    <div style={{ position: 'relative', paddingLeft: `${contentPaddingLeft}px` }}>
      {/* Timeline line - perfectly centered on dots */}
      <div style={{
        position: 'absolute',
        left: `${lineLeft}px`,
        top: '12px',
        bottom: editable ? '50px' : '12px',
        width: '1px',
        backgroundColor: accentColor,
        opacity: 0.2,
      }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
        {items.map((exp, index) => (
          <div key={exp.id || index} className="group relative pdf-experience-entry" data-experience-entry="true">
            {/* Timeline dot - centered on the line */}
            <div style={{
              position: 'absolute',
              left: `${dotLeft - contentPaddingLeft}px`,
              top: '6px',
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              borderRadius: '50%',
              backgroundColor: accentColor,
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
            
            <div style={{ paddingBottom: '4px' }}>
              {/* Entry Header */}
              <div data-entry-header="true" style={{ marginBottom: '8px' }}>
                {/* Title and Date Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
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
                        flex: 1,
                      }}
                      placeholder="Position Title"
                    />
                  ) : (
                    <h3 style={{ 
                      fontSize: typography.itemTitle.fontSize, 
                      fontWeight: typography.itemTitle.fontWeight,
                      color: typography.itemTitle.color,
                      margin: 0,
                      flex: 1,
                    }}>
                      {exp.position}
                    </h3>
                  )}
                  
                  <div style={{ 
                    fontSize: scaleFontSize(typography.body.fontSize), 
                    color: '#64748b',
                    whiteSpace: 'nowrap',
                    fontWeight: 400,
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
                
                {/* Company - muted, secondary */}
                <div style={{ 
                  fontSize: typography.body.fontSize, 
                  color: '#64748b',
                  fontWeight: 500,
                  marginTop: '2px',
                }}>
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.company`}
                      value={exp.company}
                      style={{ color: '#64748b', fontWeight: 500 }}
                      placeholder="Company Name"
                    />
                  ) : (
                    exp.company
                  )}
                  {exp.location && (
                    <span style={{ fontWeight: 400, color: '#94a3b8' }}> · {exp.location}</span>
                  )}
                </div>
              </div>

              {/* Bullet points - improved spacing */}
              {(exp.bulletPoints?.length > 0 || editable) && (
                <div style={{ 
                  marginTop: '10px',
                }}>
                  {exp.bulletPoints?.map((bullet, bulletIndex) => (
                    <div
                      key={bulletIndex}
                      className="group/bullet"
                      style={{
                        fontSize: typography.body.fontSize,
                        color: typography.body.color,
                        lineHeight: '1.6',
                        textAlign: 'justify',
                        marginBottom: '6px',
                        position: 'relative',
                        paddingLeft: '14px',
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: '2px',
                        top: '9px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#94a3b8',
                      }} />
                      {editable ? (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
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
                        bullet
                      )}
                    </div>
                  ))}
                  
                  {editable && onAddBulletPoint && (
                    <div style={{ marginTop: '8px' }}>
                      <button
                        onClick={() => onAddBulletPoint(exp.id)}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                        style={{ color: accentColor, borderColor: `${accentColor}60` }}
                      >
                        <Plus className="w-3 h-3" />
                        Add bullet
                      </button>
                    </div>
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
          style={{ color: accentColor, borderColor: `${accentColor}60` }}
        >
          <Plus className="h-3 w-3" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceTimeline;
