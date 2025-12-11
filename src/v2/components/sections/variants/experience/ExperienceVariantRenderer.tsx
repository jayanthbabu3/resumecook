/**
 * Experience Variant Renderer
 * 
 * Dispatcher component that renders experience based on the selected variant.
 * Currently wraps the existing ExperienceSection with variant awareness.
 */

import React from 'react';
import type { TemplateConfig } from '../../../../types';
import type { ExperienceItem } from '@/types/resume';

// ============================================================================
// TYPES
// ============================================================================

export interface ExperienceVariantProps {
  /** Experience data */
  items: ExperienceItem[];
  /** Template configuration */
  config: TemplateConfig;
  /** Primary/accent color */
  accentColor: string;
  /** Enable inline editing */
  editable?: boolean;
  /** Callbacks for editing */
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  onAddExperience?: () => void;
  onRemoveExperience?: (expId: string) => void;
}

export type ExperienceVariant = 
  | 'standard' 
  | 'compact' 
  | 'detailed' 
  | 'timeline' 
  | 'card' 
  | 'minimal';

interface ExperienceVariantRendererProps extends ExperienceVariantProps {
  /** Variant to render */
  variant: ExperienceVariant;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ExperienceVariantRenderer: React.FC<ExperienceVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
  onAddExperience,
  onRemoveExperience,
}) => {
  const { typography, spacing, experience } = config;

  if (!items.length && !editable) return null;

  // Standard variant (default)
  const renderStandard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((exp, index) => (
        <div key={exp.id || index} style={{ marginBottom: index < items.length - 1 ? spacing.itemGap : 0 }}>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div>
              <h3 style={{ 
                fontSize: typography.itemTitle.fontSize, 
                fontWeight: typography.itemTitle.fontWeight,
                color: typography.itemTitle.color,
                margin: 0,
              }}>
                {exp.position}
              </h3>
              <p style={{ 
                fontSize: typography.body.fontSize, 
                color: accentColor,
                fontWeight: 500,
                margin: '2px 0 0 0',
              }}>
                {exp.company}{(exp as any).location ? ` • ${(exp as any).location}` : ''}
              </p>
            </div>
            <span style={{ 
              fontSize: '13px', 
              color: '#6b7280',
              whiteSpace: 'nowrap',
            }}>
              {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
            </span>
          </div>
          
          {/* Description */}
          {exp.description && (
            <p style={{ 
              fontSize: typography.body.fontSize, 
              color: typography.body.color,
              margin: '8px 0',
              lineHeight: typography.body.lineHeight,
            }}>
              {exp.description}
            </p>
          )}
          
          {/* Bullet points */}
          {exp.bulletPoints && exp.bulletPoints.length > 0 && (
            <ul style={{ 
              margin: '8px 0 0 0', 
              paddingLeft: '20px',
              listStyleType: experience.bulletStyle || 'disc',
            }}>
              {exp.bulletPoints.map((bullet, bulletIndex) => (
                <li key={bulletIndex} style={{ 
                  fontSize: typography.body.fontSize,
                  color: typography.body.color,
                  lineHeight: typography.body.lineHeight,
                  marginBottom: '4px',
                }}>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  // Compact variant
  const renderCompact = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((exp, index) => (
        <div key={exp.id || index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
              {exp.position}
            </span>
            <span style={{ color: '#6b7280' }}> at </span>
            <span style={{ color: accentColor, fontWeight: 500 }}>{exp.company}</span>
          </div>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>
            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
          </span>
        </div>
      ))}
    </div>
  );

  // Timeline variant
  const renderTimeline = () => (
    <div style={{ position: 'relative', paddingLeft: '24px' }}>
      {/* Timeline line */}
      <div style={{
        position: 'absolute',
        left: '6px',
        top: '8px',
        bottom: '8px',
        width: '2px',
        backgroundColor: accentColor,
        opacity: 0.3,
      }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
        {items.map((exp, index) => (
          <div key={exp.id || index} style={{ position: 'relative' }}>
            {/* Timeline dot */}
            <div style={{
              position: 'absolute',
              left: '-21px',
              top: '6px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: accentColor,
            }} />
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ 
                  fontSize: typography.itemTitle.fontSize, 
                  fontWeight: typography.itemTitle.fontWeight,
                  color: typography.itemTitle.color,
                  margin: 0,
                }}>
                  {exp.position}
                </h3>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style={{ 
                fontSize: typography.body.fontSize, 
                color: accentColor,
                fontWeight: 500,
                margin: '2px 0 8px 0',
              }}>
                {exp.company}
              </p>
              
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {exp.bulletPoints.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} style={{ 
                      fontSize: typography.body.fontSize,
                      color: typography.body.color,
                      marginBottom: '4px',
                    }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Dispatch based on variant
  switch (variant) {
    case 'compact':
      return renderCompact();
    case 'timeline':
      return renderTimeline();
    case 'standard':
    case 'detailed':
    case 'card':
    case 'minimal':
    default:
      return renderStandard();
  }
};

export default ExperienceVariantRenderer;
