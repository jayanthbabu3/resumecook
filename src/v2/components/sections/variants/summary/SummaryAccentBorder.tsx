/**
 * Summary Accent Border Variant
 * 
 * Production-ready summary variant with left accent border.
 * Features: Clean paragraph with theme-colored left border,
 * professional and elegant appearance.
 */

import React from 'react';
import type { TemplateConfig } from '../../../../types';
import { InlineEditableText } from '@/components/resume/InlineEditableText';

interface SummaryAccentBorderProps {
  content: string;
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
}

export const SummaryAccentBorder: React.FC<SummaryAccentBorderProps> = ({
  content,
  config,
  accentColor,
  editable = false,
}) => {
  const { typography } = config;

  return (
    <div style={{
      borderLeft: `3px solid ${accentColor}`,
      paddingLeft: '16px',
      paddingTop: '4px',
      paddingBottom: '4px',
    }}>
      {editable ? (
        <InlineEditableText
          path="summary"
          value={content}
          as="p"
          style={{
            fontSize: typography.body.fontSize,
            color: '#374151',
            lineHeight: '1.7',
            margin: 0,
          }}
          placeholder="Write a compelling professional summary..."
          multiline
        />
      ) : (
        <p style={{
          fontSize: typography.body.fontSize,
          color: '#374151',
          lineHeight: '1.7',
          margin: 0,
        }}>
          {content}
        </p>
      )}
    </div>
  );
};

export default SummaryAccentBorder;
