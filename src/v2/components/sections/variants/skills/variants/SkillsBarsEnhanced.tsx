/**
 * Skills Bars Enhanced Variant
 *
 * Progress bars with proficiency levels and inline editing.
 * Supports clicking on the progress bar to change skill level.
 */

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import type { SkillsVariantProps } from '../types';

export const SkillsBarsEnhanced: React.FC<SkillsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddSkill,
  onRemoveSkill,
  onUpdateSkill,
}) => {
  const { typography } = config;
  const inlineEdit = useInlineEdit();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverLevel, setHoverLevel] = useState<number | null>(null);

  if (!items.length && !editable) return null;

  const handleLevelChange = (index: number, newLevel: number) => {
    // Try using onUpdateSkill prop first, then fall back to inlineEdit
    if (onUpdateSkill) {
      const skillId = items[index]?.id;
      if (skillId) {
        onUpdateSkill(skillId, 'level', newLevel);
      }
    } else if (inlineEdit) {
      inlineEdit.updateField(`skills.${index}.level`, newLevel);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((skill, index) => {
        const level = skill.level || 3;
        const displayLevel = hoverIndex === index && hoverLevel !== null ? hoverLevel : level;
        const percentage = (displayLevel / 5) * 100;

        return (
          <div key={skill.id || index} className="group relative">
            {editable && onRemoveSkill && (
              <button
                onClick={() => onRemoveSkill(skill.id)}
                className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: '100px' }}>
                {editable ? (
                  <InlineEditableText
                    path={`skills.${index}.name`}
                    value={skill.name}
                    style={{
                      fontSize: typography.body.fontSize,
                      color: typography.body.color,
                      fontWeight: 500,
                    }}
                    placeholder="Skill name"
                  />
                ) : (
                  <span style={{
                    fontSize: typography.body.fontSize,
                    color: typography.body.color,
                    fontWeight: 500,
                  }}>
                    {skill.name}
                  </span>
                )}
              </div>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '200px' }}
                onMouseLeave={() => {
                  if (editable) {
                    setHoverIndex(null);
                    setHoverLevel(null);
                  }
                }}
              >
                {editable ? (
                  // Interactive clickable segments for editing
                  <div
                    style={{
                      flex: 1,
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
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
                          setHoverIndex(index);
                          setHoverLevel(lvl);
                        }}
                        onClick={() => handleLevelChange(index, lvl)}
                      />
                    ))}
                  </div>
                ) : (
                  // Static bar for non-editable mode
                  <div
                    style={{
                      flex: 1,
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: accentColor,
                        borderRadius: '4px',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                )}
                <span style={{ fontSize: '11px', color: '#9ca3af', minWidth: '24px' }}>
                  {displayLevel}/5
                </span>
              </div>
            </div>
          </div>
        );
      })}
      
      {editable && onAddSkill && (
        <button
          onClick={onAddSkill}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Skill
        </button>
      )}
    </div>
  );
};

export default SkillsBarsEnhanced;
