/**
 * TemplateSummary - Standardized summary/objective section for all templates
 * 
 * This component handles:
 * - Professional summary display
 * - Editable/non-editable modes
 * - Consistent styling via config
 */

import React from 'react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { PDFStyleConfig } from '@/lib/pdfStyles';
import { SectionConfig } from '@/lib/templateConfig';

export interface TemplateSummaryProps {
  /** Summary text */
  summary: string;
  /** Whether the section is editable */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** PDF style configuration */
  styles: PDFStyleConfig;
  /** Section configuration */
  config?: SectionConfig;
  /** Section title override */
  title?: string;
  /** Custom className */
  className?: string;
}

const DEFAULT_CONFIG: SectionConfig = {
  enabled: true,
  order: 1,
  title: 'Professional Summary',
  titleCase: 'uppercase',
};

export const TemplateSummary: React.FC<TemplateSummaryProps> = ({
  summary,
  editable = false,
  accentColor = '#2563eb',
  styles,
  config = DEFAULT_CONFIG,
  title,
  className = '',
}) => {
  if (!summary && !editable) return null;

  const sectionTitle = title || config.title || 'Professional Summary';
  const titleStyle: React.CSSProperties = {
    fontSize: styles.sectionHeading.size,
    fontWeight: styles.sectionHeading.weight,
    color: accentColor,
    marginBottom: '12px',
    textTransform: config.titleCase === 'uppercase' ? 'uppercase' : 
                   config.titleCase === 'capitalize' ? 'capitalize' : 'none',
    letterSpacing: config.titleCase === 'uppercase' ? '0.05em' : undefined,
  };

  return (
    <div className={className} style={{ marginBottom: styles.spacing.sectionGap }}>
      <h2 className="tracking-wide" style={titleStyle}>
        {sectionTitle}
      </h2>
      {editable ? (
        <InlineEditableText
          path="personalInfo.summary"
          value={summary}
          className="block"
          style={{
            fontSize: styles.itemDescription.size,
            color: styles.colors.text.secondary,
            lineHeight: styles.itemDescription.lineHeight,
          }}
          multiline
          as="p"
        />
      ) : (
        <p style={{
          fontSize: styles.itemDescription.size,
          color: styles.colors.text.secondary,
          lineHeight: styles.itemDescription.lineHeight,
        }}>
          {summary}
        </p>
      )}
    </div>
  );
};

export default TemplateSummary;
