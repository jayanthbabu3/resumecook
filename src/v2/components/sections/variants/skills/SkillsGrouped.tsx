/**
 * Skills Grouped Variant
 * 
 * Renders skills grouped by category.
 */

import React from 'react';
import type { SkillsVariantProps } from './SkillsVariantRenderer';
import { getPillTextColor } from './utils';

interface SkillsGroupedProps extends SkillsVariantProps {
  /** Number of columns */
  columns?: number;
}

export const SkillsGrouped: React.FC<SkillsGroupedProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  columns = 1,
}) => {
  const { typography, skills } = config;

  if (!items.length) return null;

  // Group skills by category
  const groupedSkills = items.reduce((acc, skill) => {
    const category = (skill as any).category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof items>);

  const categories = Object.keys(groupedSkills);

  const pillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: skills.badge?.fontSize || '11px',
    fontWeight: 500,
    padding: skills.badge?.padding || '3px 10px',
    borderRadius: '9999px',
    border: `${skills.badge?.borderWidth || '1px'} solid ${accentColor}`,
    backgroundColor: skills.badge?.backgroundColor || 'transparent',
    color: skills.badge?.textColor || getPillTextColor(skills.badge?.backgroundColor, accentColor),
  };

  // If no categories, just render as columns
  if (categories.length === 1 && categories[0] === 'Other') {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '8px',
        }}
      >
        {items.map((skill, index) => (
          <span key={skill.id || index} style={pillStyle}>
            {skill.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns > 1 ? `repeat(${columns}, 1fr)` : '1fr',
        gap: '16px',
      }}
    >
      {categories.map((category) => (
        <div key={category}>
          <h4
            style={{
              fontSize: typography.body.fontSize,
              fontWeight: 600,
              color: accentColor,
              marginBottom: '8px',
            }}
          >
            {category}
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {groupedSkills[category].map((skill, index) => (
              <span key={skill.id || index} style={pillStyle}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrouped;
