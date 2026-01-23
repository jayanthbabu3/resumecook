/**
 * Skills Dots Enhanced Variant
 *
 * Dot rating system with interactive editing.
 * Supports clicking on dots to change skill level.
 */

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { SkillsVariantProps } from '../types';

export const SkillsDotsEnhanced: React.FC<SkillsVariantProps> = ({
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
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);
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

  // Use 2-column grid layout for better space utilization
  const columns = config.skills?.columns || 2;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '10px 24px'
    }}>
      {items.map((skill, index) => {
        const level = skill.level || 3;
        const displayLevel = hoverIndex === index && hoverLevel !== null ? hoverLevel : level;

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
              <div style={{ flex: 1 }}>
                {editable ? (
                  <InlineEditableText
                    path={`skills.${index}.name`}
                    value={skill.name}
                    style={{
                      fontSize: scaleFontSize(typography.body.fontSize),
                      color: typography.body.color,
                    }}
                    placeholder="Skill name"
                  />
                ) : (
                  <span style={{
                    fontSize: scaleFontSize(typography.body.fontSize),
                    color: typography.body.color,
                  }}>
                    {skill.name}
                  </span>
                )}
              </div>

              <div
                style={{ display: 'flex', gap: '4px' }}
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
                    onClick={() => editable && handleLevelChange(index, dot)}
                    onMouseEnter={() => {
                      if (editable) {
                        setHoverIndex(index);
                        setHoverLevel(dot);
                      }
                    }}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: dot <= displayLevel ? accentColor : '#e5e7eb',
                      cursor: editable ? 'pointer' : 'default',
                      transition: 'all 0.2s ease',
                      border: dot <= displayLevel ? 'none' : `1px solid #d1d5db`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
      
      {editable && onAddSkill && (
        <div style={{ gridColumn: `span ${columns}` }}>
          <button
            onClick={onAddSkill}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            <Plus className="h-3 w-3" />
            Add Skill
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsDotsEnhanced;
