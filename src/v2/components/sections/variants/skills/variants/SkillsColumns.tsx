/**
 * Skills Columns Variant
 * 
 * Two-column bullet list layout matching traditional resume style.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import type { SkillsVariantProps } from '../types';

interface SkillsColumnsProps extends SkillsVariantProps {
  columns?: number;
}

export const SkillsColumns: React.FC<SkillsColumnsProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  columns = 2,
}) => {
  const { typography } = config;
  const { addArrayItem, removeArrayItem } = useInlineEdit();

  if (!items.length && !editable) return null;

  const handleAddSkill = () => {
    addArrayItem('skills', { name: 'New Skill', id: `skill-${Date.now()}` });
  };

  const handleRemoveSkill = (index: number) => {
    removeArrayItem('skills', index);
  };

  // Split items into columns
  const midpoint = Math.ceil(items.length / columns);
  const columnItems: typeof items[] = [];
  
  for (let i = 0; i < columns; i++) {
    columnItems.push(items.slice(i * midpoint, (i + 1) * midpoint));
  }

  return (
    <div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '8px 24px',
      }}>
        {columnItems.map((colItems, colIndex) => (
          <ul 
            key={colIndex}
            style={{ 
              margin: 0, 
              paddingLeft: '20px',
              listStyleType: 'disc',
            }}
          >
            {colItems.map((skill) => {
              const skillIndex = items.findIndex(s => s.id === skill.id);
              return (
                <li 
                  key={skill.id}
                  className="group relative"
                  style={{ 
                    fontSize: typography.body.fontSize,
                    color: typography.body.color,
                    marginBottom: '4px',
                    lineHeight: 1.5,
                  }}
                >
                  {editable ? (
                    <InlineEditableText
                      path={`skills.${skillIndex}.name`}
                      value={skill.name}
                      style={{ fontSize: typography.body.fontSize }}
                      placeholder="Skill"
                    />
                  ) : (
                    skill.name
                  )}
                  
                  {editable && (
                    <button
                      onClick={() => handleRemoveSkill(skillIndex)}
                      className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
      
      {editable && (
        <button
          onClick={handleAddSkill}
          className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Skill
        </button>
      )}
    </div>
  );
};

export default SkillsColumns;
