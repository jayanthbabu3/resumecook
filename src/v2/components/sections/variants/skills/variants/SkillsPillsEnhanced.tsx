/**
 * Skills Pills Enhanced Variant
 * 
 * Rounded pill badges with inline editing support.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { SkillsVariantProps } from '../types';
import { getPillTextColor } from '../utils';

export const SkillsPillsEnhanced: React.FC<SkillsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddSkill,
  onRemoveSkill,
}) => {
  const { skills } = config;

  if (!items.length && !editable) return null;

  const pillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: skills?.badge?.fontSize || '12px',
    fontWeight: 500,
    padding: skills?.badge?.padding || '4px 12px',
    borderRadius: '9999px',
    border: `${skills?.badge?.borderWidth || '1px'} solid ${accentColor}`,
    backgroundColor: skills?.badge?.backgroundColor || 'transparent',
    color: skills?.badge?.textColor || getPillTextColor(skills?.badge?.backgroundColor, accentColor),
    transition: 'all 0.2s ease',
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
      {items.map((skill, index) => (
        <div key={skill.id || index} className="group relative">
          <span style={pillStyle}>
            {editable ? (
              <InlineEditableText
                path={`skills.${index}.name`}
                value={skill.name}
                style={{ fontSize: skills?.badge?.fontSize || '12px' }}
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
      
      {editable && onAddSkill && (
        <button
          onClick={onAddSkill}
          className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default SkillsPillsEnhanced;
