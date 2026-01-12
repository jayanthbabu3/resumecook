/**
 * Skills Compact Variant
 * 
 * Space-efficient inline layout.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { SkillsVariantProps } from '../types';

interface SkillsCompactProps extends SkillsVariantProps {
  separator?: 'bullet' | 'comma' | 'pipe';
}

export const SkillsCompact: React.FC<SkillsCompactProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddSkill,
  onRemoveSkill,
  separator = 'bullet',
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  const separatorChar = {
    bullet: ' • ',
    comma: ', ',
    pipe: ' | ',
  }[separator];

  if (editable) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        {items.map((skill, index) => (
          <div key={skill.id || index} className="group relative flex items-center">
            <InlineEditableText
              path={`skills.${index}.name`}
              value={skill.name}
              style={{ 
                fontSize: typography.body.fontSize,
                color: typography.body.color,
              }}
              placeholder="Skill"
            />
            {onRemoveSkill && (
              <button
                onClick={() => onRemoveSkill(skill.id)}
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
            )}
            {index < items.length - 1 && (
              <span style={{ color: '#9ca3af', marginLeft: '4px' }}>{separatorChar.trim()}</span>
            )}
          </div>
        ))}
        
        {onAddSkill && (
          <button
            onClick={onAddSkill}
            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            <Plus className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ 
      fontSize: typography.body.fontSize,
      color: typography.body.color,
      lineHeight: 1.6,
    }}>
      {items.map((skill, index) => (
        <span key={skill.id || index}>
          {skill.name}
          {index < items.length - 1 && (
            <span style={{ color: '#9ca3af' }}>{separatorChar}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default SkillsCompact;
