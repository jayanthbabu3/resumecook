/**
 * Skills Boxed Variant
 *
 * Displays skills as stacked bordered boxes - one skill per box.
 * Perfect for administrative/professional resumes where skills
 * should be clearly separated and easy to scan.
 */

import React from 'react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { TemplateConfig } from '../../../../types';
import type { SkillItem } from '../../../../types/resumeData';

interface SkillsBoxedProps {
  skills: SkillItem[] | string[] | { name: string; level?: number }[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
}

export const SkillsBoxed: React.FC<SkillsBoxedProps> = ({
  skills,
  config,
  accentColor,
  editable = false,
}) => {
  const { typography, spacing } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  // Normalize skills to array of names
  const normalizedSkills = skills.map(skill => {
    if (typeof skill === 'string') return skill;
    return skill.name;
  });

  if (!normalizedSkills.length) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.skillGap || '8px',
    }}>
      {normalizedSkills.map((skill, index) => (
        <div
          key={index}
          style={{
            padding: '8px 14px',
            fontSize: scaleFontSize(typography.body.fontSize),
            fontWeight: 400,
            color: typography.body.color || '#374151',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            lineHeight: '1.4',
          }}
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

export default SkillsBoxed;
