/**
 * Skills Bars Variant
 *
 * Renders skills with progress bars or dot ratings.
 * Supports inline editing for both skill name and rating level.
 */

import React, { useState } from 'react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
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
  const inlineEdit = useInlineEdit();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverLevel, setHoverLevel] = useState<number | null>(null);

  if (!items.length) return null;

  const handleLevelClick = (skillIndex: number, newLevel: number) => {
    if (!editable || !inlineEdit) return;
    inlineEdit.updateField(`skills.${skillIndex}.level`, newLevel);
  };

  const renderBar = (level: number = 3, skillIndex: number) => {
    const displayLevel = hoverIndex === skillIndex && hoverLevel !== null ? hoverLevel : level;
    const percentage = (displayLevel / 5) * 100;

    if (!editable) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
          <span style={{ fontSize: '11px', color: '#6b7280', minWidth: '24px' }}>
            {level}/5
          </span>
        </div>
      );
    }

    return (
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        onMouseLeave={() => {
          setHoverIndex(null);
          setHoverLevel(null);
        }}
      >
        <div
          style={{
            width: '100px',
            height: '6px',
            backgroundColor: '#e5e7eb',
            borderRadius: '3px',
            overflow: 'hidden',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              style={{
                width: '20%',
                height: '100%',
                backgroundColor: lvl <= displayLevel ? accentColor : 'transparent',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={() => {
                setHoverIndex(skillIndex);
                setHoverLevel(lvl);
              }}
              onClick={() => handleLevelClick(skillIndex, lvl)}
            />
          ))}
        </div>
        <span style={{ fontSize: '11px', color: '#6b7280', minWidth: '24px' }}>
          {displayLevel}/5
        </span>
      </div>
    );
  };

  const renderDots = (level: number = 3, skillIndex: number) => {
    const displayLevel = hoverIndex === skillIndex && hoverLevel !== null ? hoverLevel : level;

    return (
      <div
        style={{ display: 'flex', gap: '4px', cursor: editable ? 'pointer' : 'default' }}
        onMouseLeave={() => {
          if (editable) {
            setHoverIndex(null);
            setHoverLevel(null);
          }
        }}
      >
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: dot <= displayLevel ? accentColor : '#e5e7eb',
              transition: 'background-color 0.2s ease',
              cursor: editable ? 'pointer' : 'default',
            }}
            onMouseEnter={() => {
              if (editable) {
                setHoverIndex(skillIndex);
                setHoverLevel(dot);
              }
            }}
            onClick={() => {
              if (editable) {
                handleLevelClick(skillIndex, dot);
              }
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
          {editable ? (
            <InlineEditableText
              path={`skills.${index}.name`}
              value={skill.name}
              style={{
                fontSize: typography.body.fontSize,
                color: typography.body.color,
                flex: 1,
              }}
              placeholder="Skill name"
            />
          ) : (
            <span
              style={{
                fontSize: typography.body.fontSize,
                color: typography.body.color,
                flex: 1,
              }}
            >
              {skill.name}
            </span>
          )}
          {showDots
            ? renderDots((skill as any).level || 3, index)
            : renderBar((skill as any).level || 3, index)
          }
        </div>
      ))}
    </div>
  );
};

export default SkillsBars;
