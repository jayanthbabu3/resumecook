/**
 * Resume Builder V2 - Summary Section Component
 * 
 * Professional summary/objective section.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface SummarySectionProps {
  summary: string;
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  config,
  editable = false,
  sectionTitle = 'Summary',
}) => {
  const { typography, colors, spacing } = config;
  const accent = colors.primary;

  // Get style options for font scaling
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  const textStyle: React.CSSProperties = {
    fontSize: scaleFontSize(typography.body.fontSize),
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
    textAlign: 'justify',
  };

  if (!summary && !editable) return null;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={accent}
      />

      <div style={{ marginTop: spacing.headingToContent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write a brief professional summary...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

export default SummarySection;
