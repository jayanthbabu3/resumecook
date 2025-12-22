/**
 * Skills Inline Dots Variant
 * 
 * Production-ready skills variant with dot separators.
 * Features: Inline text with accent-colored dots between skills.
 * Clean, space-efficient, and professional.
 */

import React from 'react';
import type { TemplateConfig } from '../../../../types';

interface SkillsInlineDotsProps {
  skills: string[] | { name: string; level?: number }[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
}

export const SkillsInlineDots: React.FC<SkillsInlineDotsProps> = ({
  skills,
  config,
  accentColor,
  editable = false,
}) => {
  const { typography } = config;

  // Normalize skills to string array
  const normalizedSkills = skills.map(skill => 
    typeof skill === 'string' ? skill : skill.name
  );

  if (!normalizedSkills.length) return null;

  return (
    <div style={{
      fontSize: typography.body.fontSize,
      color: '#374151',
      lineHeight: '1.8',
    }}>
      {normalizedSkills.map((skill, index) => (
        <React.Fragment key={index}>
          <span style={{ fontWeight: '500' }}>{skill}</span>
          {index < normalizedSkills.length - 1 && (
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              margin: '0 10px',
              verticalAlign: 'middle',
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SkillsInlineDots;
