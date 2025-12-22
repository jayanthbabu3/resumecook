/**
 * Skills Bordered Tags Variant
 * 
 * Production-ready skills variant inspired by professional resume builders.
 * Features: Clean bordered rectangular tags, consistent spacing,
 * adapts to theme colors.
 */

import React from 'react';
import type { TemplateConfig } from '../../../../types';

interface SkillsBorderedTagsProps {
  skills: string[] | { name: string; level?: number }[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
}

export const SkillsBorderedTags: React.FC<SkillsBorderedTagsProps> = ({
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
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    }}>
      {normalizedSkills.map((skill, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            fontSize: typography.body.fontSize,
            color: '#374151',
            backgroundColor: '#ffffff',
            border: `1px solid #e5e7eb`,
            borderRadius: '4px',
            lineHeight: '1.4',
            transition: 'all 0.2s ease',
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillsBorderedTags;
