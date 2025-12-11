/**
 * Education Variant Renderer
 * 
 * Dispatcher component that renders education based on the selected variant.
 */

import React from 'react';
import type { TemplateConfig } from '../../../../types';
import type { EducationItem } from '@/types/resume';

// ============================================================================
// TYPES
// ============================================================================

export interface EducationVariantProps {
  /** Education data */
  items: EducationItem[];
  /** Template configuration */
  config: TemplateConfig;
  /** Primary/accent color */
  accentColor: string;
  /** Enable inline editing */
  editable?: boolean;
  /** Callbacks for editing */
  onAddEducation?: () => void;
  onRemoveEducation?: (eduId: string) => void;
}

export type EducationVariant = 
  | 'standard' 
  | 'compact' 
  | 'detailed' 
  | 'timeline' 
  | 'card' 
  | 'minimal';

interface EducationVariantRendererProps extends EducationVariantProps {
  /** Variant to render */
  variant: EducationVariant;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const EducationVariantRenderer: React.FC<EducationVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddEducation,
  onRemoveEducation,
}) => {
  const { typography, spacing } = config;

  if (!items.length && !editable) return null;

  // Standard variant (default)
  const renderStandard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
      {items.map((edu, index) => (
        <div key={edu.id || index}>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div>
              <h3 style={{ 
                fontSize: typography.itemTitle.fontSize, 
                fontWeight: typography.itemTitle.fontWeight,
                color: typography.itemTitle.color,
                margin: 0,
              }}>
                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
              </h3>
              <p style={{ 
                fontSize: typography.body.fontSize, 
                color: accentColor,
                fontWeight: 500,
                margin: '2px 0 0 0',
              }}>
                {edu.school}{(edu as any).location ? ` • ${(edu as any).location}` : ''}
              </p>
            </div>
            <span style={{ 
              fontSize: '13px', 
              color: '#6b7280',
              whiteSpace: 'nowrap',
            }}>
              {edu.startDate ? `${edu.startDate} – ` : ''}{(edu as any).current ? 'Present' : edu.endDate}
            </span>
          </div>
          
          {/* GPA */}
          {(edu as any).gpa && (
            <p style={{ 
              fontSize: typography.body.fontSize, 
              color: typography.body.color,
              margin: '4px 0 0 0',
            }}>
              GPA: {(edu as any).gpa}
            </p>
          )}
          
          {/* Honors */}
          {(edu as any).honors && (edu as any).honors.length > 0 && (
            <p style={{ 
              fontSize: typography.body.fontSize, 
              color: typography.body.color,
              margin: '4px 0 0 0',
            }}>
              <span style={{ fontWeight: 500 }}>Honors:</span> {(edu as any).honors.join(', ')}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  // Compact variant
  const renderCompact = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((edu, index) => (
        <div key={edu.id || index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
              {edu.degree}
            </span>
            {edu.field && <span style={{ color: '#6b7280' }}> in {edu.field}</span>}
            <span style={{ color: '#6b7280' }}> • </span>
            <span style={{ color: accentColor, fontWeight: 500 }}>{edu.school}</span>
          </div>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>
            {edu.endDate}
          </span>
        </div>
      ))}
    </div>
  );

  // Minimal variant
  const renderMinimal = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((edu, index) => (
        <div key={edu.id || index}>
          <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
            {edu.degree}
          </span>
          <span style={{ color: '#6b7280' }}> – {edu.school}</span>
          {edu.endDate && <span style={{ color: '#9ca3af' }}> ({edu.endDate})</span>}
        </div>
      ))}
    </div>
  );

  // Dispatch based on variant
  switch (variant) {
    case 'compact':
      return renderCompact();
    case 'minimal':
      return renderMinimal();
    case 'standard':
    case 'detailed':
    case 'timeline':
    case 'card':
    default:
      return renderStandard();
  }
};

export default EducationVariantRenderer;
