/**
 * Skills Grouped Enhanced Variant
 *
 * Skills grouped by category with inline editing.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { SkillsVariantProps } from '../types';
import { getPillTextColor } from '../utils';

interface SkillsGroupedEnhancedProps extends SkillsVariantProps {
  columns?: number;
}

export const SkillsGroupedEnhanced: React.FC<SkillsGroupedEnhancedProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  columns = 1,
}) => {
  const { typography, skills } = config;
  const { addArrayItem, removeArrayItem } = useInlineEdit();
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  // Group skills by category - use 'General' as default to match form editor
  const groupedSkills = items.reduce((acc, skill) => {
    const category = skill.category || 'General';
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
    fontSize: scaleFontSize(skills?.badge?.fontSize || '11px'),
    fontWeight: 500,
    padding: skills?.badge?.padding || '3px 10px',
    borderRadius: '9999px',
    border: `${skills?.badge?.borderWidth || '1px'} solid ${accentColor}`,
    backgroundColor: skills?.badge?.backgroundColor || 'transparent',
    color: skills?.badge?.textColor || getPillTextColor(skills?.badge?.backgroundColor, accentColor),
  };

  const handleAddSkill = (category: string) => {
    addArrayItem('skills', {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      category: category,
      level: 3,
    });
  };

  const handleRemoveSkill = (skillId: string) => {
    const index = items.findIndex((skill) => skill.id === skillId);
    if (index >= 0) {
      removeArrayItem('skills', index);
    }
  };

  const handleAddCategory = () => {
    addArrayItem('skills', {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      category: 'New Category',
      level: 3,
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns > 1 ? `repeat(${columns}, 1fr)` : '1fr',
        gap: '20px',
      }}
    >
      {categories.map((category) => (
        <div key={category}>
          <h4
            style={{
              fontSize: scaleFontSize(typography.body.fontSize),
              fontWeight: 600,
              color: accentColor,
              marginBottom: '10px',
              borderBottom: `2px solid ${accentColor}20`,
              paddingBottom: '4px',
            }}
          >
            {category}
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            {groupedSkills[category]
              .filter((skill) => skill.name?.trim()) // Filter out empty skills
              .map((skill) => {
                const skillIndex = items.findIndex(s => s.id === skill.id);
                return (
                  <div key={skill.id} className="group relative">
                    <span style={pillStyle}>
                      {editable ? (
                        <InlineEditableText
                          path={`skills.${skillIndex}.name`}
                          value={skill.name}
                          style={{ fontSize: scaleFontSize(skills?.badge?.fontSize || '11px') }}
                          placeholder="Skill"
                        />
                      ) : (
                        skill.name
                      )}
                    </span>
                    {editable && (
                      <button
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full"
                      >
                        <X className="w-2.5 h-2.5 text-red-600" />
                      </button>
                    )}
                  </div>
                );
              })}
            {/* Add skill to this category button */}
            {editable && (
              <button
                onClick={() => handleAddSkill(category)}
                className="flex items-center justify-center w-6 h-6 rounded-full border border-dashed hover:bg-gray-50 transition-colors opacity-60 hover:opacity-100"
                style={{ color: accentColor, borderColor: accentColor }}
                title={`Add skill to ${category}`}
              >
                <Plus className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add new category button */}
      {editable && (
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="w-3 h-3" />
          Add Category
        </button>
      )}
    </div>
  );
};

export default SkillsGroupedEnhanced;
