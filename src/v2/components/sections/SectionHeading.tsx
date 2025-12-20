/**
 * Resume Builder V2 - Section Heading Component
 * 
 * Configurable section heading that reads from template config.
 * Supports multiple visual styles: underline, left-border, background, simple, etc.
 */

import React from 'react';
import type { TemplateConfig, SectionHeadingStyle } from '../../types';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface SectionHeadingProps {
  /** Section title text */
  title: string;
  /** Path for inline editing (e.g., 'sections.0.title') */
  editPath?: string;
  /** Is editing enabled */
  editable?: boolean;
  /** Template configuration */
  config: TemplateConfig;
  /** Override heading style */
  styleOverride?: SectionHeadingStyle;
  /** Additional className */
  className?: string;
  /** Custom accent color override */
  accentColor?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  editPath,
  editable = false,
  config,
  styleOverride,
  className = '',
  accentColor,
}) => {
  const { typography, sectionHeading, colors } = config;
  const styleContext = useStyleOptions();
  
  // Get style options with fallbacks
  const headerCase = styleContext?.styleOptions?.headerCase || 'uppercase';
  const dividerStyle = styleContext?.styleOptions?.dividerStyle || 'thin';
  
  const style = styleOverride || sectionHeading.style;
  const accent = accentColor || colors.primary;

  // Apply header case transformation
  const getTransformedTitle = (text: string): string => {
    switch (headerCase) {
      case 'uppercase':
        return text.toUpperCase();
      case 'capitalize':
        return text.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
      case 'lowercase':
        return text.toLowerCase();
      default:
        return text;
    }
  };

  // Base text styles from config
  const textStyle: React.CSSProperties = {
    fontSize: typography.sectionHeading.fontSize,
    fontWeight: typography.sectionHeading.fontWeight,
    lineHeight: typography.sectionHeading.lineHeight,
    letterSpacing: typography.sectionHeading.letterSpacing,
    textTransform: 'none', // We handle transformation manually
    color: typography.sectionHeading.color,
    margin: 0,
  };

  // Container styles based on heading style - uses StyleOptions dividerStyle
  const getContainerStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      marginBottom: sectionHeading.marginBottom || '12px',
    };

    // Use dividerStyle from StyleOptions context
    const effectiveDividerStyle = dividerStyle || style;

    switch (effectiveDividerStyle) {
      case 'line':
      case 'underline':
        return {
          ...base,
          borderBottom: `${sectionHeading.borderWidth || '1px'} solid ${sectionHeading.borderColor || colors.border}`,
          paddingBottom: '8px',
        };

      case 'left-border':
        return {
          ...base,
          borderLeft: `3px solid ${accent}`,
          paddingLeft: '12px',
        };

      case 'background':
        return {
          ...base,
          backgroundColor: sectionHeading.backgroundColor || `${accent}15`,
          padding: sectionHeading.padding || '8px 12px',
          borderRadius: '4px',
        };

      case 'dotted':
        return {
          ...base,
          borderBottom: `1px dotted ${sectionHeading.borderColor || colors.border}`,
          paddingBottom: '8px',
        };

      case 'double':
      case 'double-line':
        return {
          ...base,
          borderBottom: `3px double ${sectionHeading.borderColor || colors.border}`,
          paddingBottom: '8px',
        };

      case 'thin':
        return {
          ...base,
          borderBottom: `0.5px solid ${sectionHeading.borderColor || colors.border}`,
          paddingBottom: '8px',
        };

      case 'none':
      case 'simple':
      default:
        return base;
    }
  };

  const containerStyle = getContainerStyle();

  // Get the transformed title
  const preserveCase = title.includes('<') && title.includes('>');
  const displayTitle = preserveCase ? title : getTransformedTitle(title);

  // Render editable or static heading
  // Use data-accent-color to prevent StyleOptionsWrapper from adding extra borders
  // Ensure fontSize is explicitly set to match config and override any global styles
  const headingStyle: React.CSSProperties = {
    ...textStyle,
    fontSize: typography.sectionHeading.fontSize,
    fontWeight: typography.sectionHeading.fontWeight,
    lineHeight: typography.sectionHeading.lineHeight,
    letterSpacing: typography.sectionHeading.letterSpacing,
    color: typography.sectionHeading.color,
    margin: 0,
    display: 'block',
  };

  if (editable && editPath) {
    return (
      <div style={containerStyle} className={className}>
        <h2 
          style={headingStyle} 
          data-accent-color="true"
          className="block"
        >
          <InlineEditableText
            path={editPath}
            value={displayTitle}
            as="span"
            style={headingStyle}
          />
        </h2>
      </div>
    );
  }

  return (
    <div style={containerStyle} className={className}>
      <h2 style={headingStyle} data-accent-color="true">{displayTitle}</h2>
    </div>
  );
};

export default SectionHeading;
