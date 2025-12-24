/**
 * Skills Grouped Enhanced Variant
 * 
 * Skills grouped by category with inline editing.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
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
  onAddSkill,
  onRemoveSkill,
  columns = 1,
}) => {
  const { typography, skills } = config;

  if (!items.length && !editable) return null;

  // Group skills by category
  const groupedSkills = items.reduce((acc, skill) => {
    const category = skill.category || 'Other';
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
    fontSize: skills?.badge?.fontSize || '11px',
    fontWeight: 500,
    padding: skills?.badge?.padding || '3px 10px',
    borderRadius: '9999px',
    border: `${skills?.badge?.borderWidth || '1px'} solid ${accentColor}`,
    backgroundColor: skills?.badge?.backgroundColor || 'transparent',
    color: skills?.badge?.textColor || getPillTextColor(skills?.badge?.backgroundColor, accentColor),
  };

  // If no categories, just render as columns
  if (categories.length === 1 && categories[0] === 'Other') {
    return (
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '8px',
          }}
        >
          {items.map((skill, index) => (
            <div key={skill.id || index} className="group relative inline-block">
              <span style={pillStyle}>
                {editable ? (
                  <InlineEditableText
                    path={`skills.${index}.name`}
                    value={skill.name}
                    style={{ fontSize: skills?.badge?.fontSize || '11px' }}
                    placeholder="Skill"
                  />
                ) : (
                  skill.name
                )}
              </span>
              {editable && onRemoveSkill && (
                <button
                  onClick={() => onRemoveSkill(skill.id)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full"
                >
                  <X className="w-2.5 h-2.5 text-red-600" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        {editable && onAddSkill && (
          <button
            onClick={onAddSkill}
            className="mt-3 flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            <Plus className="w-3 h-3" />
            Add Skill
          </button>
        )}
      </div>
    );
  }

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
              fontSize: typography.body.fontSize,
              fontWeight: 600,
              color: accentColor,
              marginBottom: '10px',
              borderBottom: `2px solid ${accentColor}20`,
              paddingBottom: '4px',
            }}
          >
            {category}
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {groupedSkills[category].map((skill) => {
              const skillIndex = items.findIndex(s => s.id === skill.id);
              return (
                <div key={skill.id} className="group relative">
                  <span style={pillStyle}>
                    {editable ? (
                      <InlineEditableText
                        path={`skills.${skillIndex}.name`}
                        value={skill.name}
                        style={{ fontSize: skills?.badge?.fontSize || '11px' }}
                        placeholder="Skill"
                      />
                    ) : (
                      skill.name
                    )}
                  </span>
                  {editable && onRemoveSkill && (
                    <button
                      onClick={() => onRemoveSkill(skill.id)}
                      className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full"
                    >
                      <X className="w-2.5 h-2.5 text-red-600" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      {editable && onAddSkill && (
        <button
          onClick={onAddSkill}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="w-3 h-3" />
          Add Skill
        </button>
      )}
    </div>
  );
};

export default SkillsGroupedEnhanced;
