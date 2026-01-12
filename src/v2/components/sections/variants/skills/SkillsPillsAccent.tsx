/**
 * Skills Pills Accent Variant
 * 
 * Production-ready skills variant with accent-colored pill badges.
 * Features: Rounded pills with theme color background, clean spacing.
 */

import React from 'react';
import type { TemplateConfig } from '../../../../types';

interface SkillsPillsAccentProps {
  skills: string[] | { name: string; level?: number }[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
}

export const SkillsPillsAccent: React.FC<SkillsPillsAccentProps> = ({
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

  // Create a lighter version of accent color for background
  const bgColor = `${accentColor}15`;
  const borderColor = `${accentColor}30`;

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    }}>
      {normalizedSkills.map((skill, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            padding: '5px 14px',
            fontSize: '13px',
            fontWeight: '500',
            color: accentColor,
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '9999px',
            lineHeight: '1.4',
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillsPillsAccent;
