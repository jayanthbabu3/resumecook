/**
 * Skills Pills Variant
 * 
 * Renders skills as rounded pill badges.
 */

import React from 'react';
import type { SkillsVariantProps } from './SkillsVariantRenderer';
import { getPillTextColor } from './utils';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

export const SkillsPills: React.FC<SkillsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
}) => {
  const { skills } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  // Use configured borderColor if provided, otherwise fall back to accent color
  const borderColor = skills.badge?.borderColor || accentColor;

  const pillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: scaleFontSize(skills.badge?.fontSize || '12px'),
    fontWeight: 500,
    padding: skills.badge?.padding || '4px 12px',
    borderRadius: skills.badge?.borderRadius || '9999px',
    border: `${skills.badge?.borderWidth || '1px'} solid ${borderColor}`,
    backgroundColor: skills.badge?.backgroundColor || 'transparent',
    color: skills.badge?.textColor || getPillTextColor(skills.badge?.backgroundColor, accentColor),
    transition: 'all 0.2s ease',
  };

  if (!items.length) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {items.map((skill, index) => (
        <span key={skill.id || index} style={pillStyle}>
          {skill.name}
        </span>
      ))}
    </div>
  );
};

export default SkillsPills;
