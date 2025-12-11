/**
 * Skills Inline Variant
 * 
 * Renders skills as inline text with separators.
 */

import React from 'react';
import type { SkillsVariantProps } from './SkillsVariantRenderer';

interface SkillsInlineProps extends SkillsVariantProps {
  /** Separator type */
  separator?: 'bullet' | 'comma' | 'pipe';
}

export const SkillsInline: React.FC<SkillsInlineProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  separator = 'bullet',
}) => {
  const { typography } = config;

  if (!items.length) return null;

  const separatorMap = {
    bullet: ' • ',
    comma: ', ',
    pipe: ' | ',
  };

  const sep = separatorMap[separator];

  return (
    <p
      style={{
        fontSize: typography.body.fontSize,
        lineHeight: typography.body.lineHeight,
        color: typography.body.color,
        margin: 0,
      }}
    >
      {items.map((skill, index) => (
        <React.Fragment key={skill.id || index}>
          <span style={{ color: accentColor, fontWeight: 500 }}>
            {skill.name}
          </span>
          {index < items.length - 1 && (
            <span style={{ color: '#9ca3af' }}>{sep}</span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};

export default SkillsInline;
