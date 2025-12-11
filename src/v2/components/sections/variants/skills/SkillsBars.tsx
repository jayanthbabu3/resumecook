/**
 * Skills Bars Variant
 * 
 * Renders skills with progress bars or dot ratings.
 */

import React from 'react';
import type { SkillsVariantProps } from './SkillsVariantRenderer';

interface SkillsBarsProps extends SkillsVariantProps {
  /** Show dots instead of bars */
  showDots?: boolean;
}

export const SkillsBars: React.FC<SkillsBarsProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  showDots = false,
}) => {
  const { typography } = config;

  if (!items.length) return null;

  const renderBar = (level: number = 3) => {
    const percentage = (level / 5) * 100;
    
    return (
      <div
        style={{
          width: '100px',
          height: '6px',
          backgroundColor: '#e5e7eb',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: accentColor,
            borderRadius: '3px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    );
  };

  const renderDots = (level: number = 3) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: dot <= level ? accentColor : '#e5e7eb',
              transition: 'background-color 0.2s ease',
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((skill, index) => (
        <div
          key={skill.id || index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: typography.body.fontSize,
              color: typography.body.color,
              flex: 1,
            }}
          >
            {skill.name}
          </span>
          {showDots ? renderDots((skill as any).level) : renderBar((skill as any).level)}
        </div>
      ))}
    </div>
  );
};

export default SkillsBars;
