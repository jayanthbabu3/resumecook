/**
 * Skills Tags Variant
 * 
 * Renders skills as square/rounded tags.
 */

import React from 'react';
import type { SkillsVariantProps } from './SkillsVariantRenderer';

export const SkillsTags: React.FC<SkillsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
}) => {
  const { skills } = config;

  const tagStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: skills.badge?.fontSize || '12px',
    fontWeight: 500,
    padding: skills.badge?.padding || '4px 10px',
    borderRadius: '4px',
    border: `${skills.badge?.borderWidth || '1px'} solid ${accentColor}`,
    backgroundColor: skills.badge?.backgroundColor || `${accentColor}10`,
    color: skills.badge?.textColor || accentColor,
  };

  if (!items.length) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {items.map((skill, index) => (
        <span key={skill.id || index} style={tagStyle}>
          {skill.name}
        </span>
      ))}
    </div>
  );
};

export default SkillsTags;
