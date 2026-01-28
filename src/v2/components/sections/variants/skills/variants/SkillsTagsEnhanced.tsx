/**
 * Skills Tags Enhanced Variant
 * 
 * Rectangular tag badges with slight rounding - distinct from rounded pills.
 * Features a subtle left accent border for visual distinction.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { SkillsVariantProps } from '../types';

export const SkillsTagsEnhanced: React.FC<SkillsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddSkill,
  onRemoveSkill,
}) => {
  const { skills, typography } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  // Filter out empty/whitespace-only skill names
  const validItems = items.filter(skill => skill.name && skill.name.trim());

  const tagStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: scaleFontSize(skills?.badge?.fontSize || '11px'),
    fontWeight: 500,
    padding: '4px 10px',
    borderRadius: '4px', // Rectangular with slight rounding - different from pills
    backgroundColor: `${accentColor}10`, // Light tinted background
    color: typography.body.color,
    borderLeft: `3px solid ${accentColor}`, // Left accent border
    transition: 'all 0.2s ease',
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
      {validItems.map((skill) => {
        // Find original index for correct path
        const originalIndex = items.findIndex(s => s.id === skill.id);
        return (
          <div key={skill.id} className="group relative">
            <span style={tagStyle}>
              {editable ? (
                <InlineEditableText
                  path={`skills.${originalIndex}.name`}
                  value={skill.name}
                  style={{ fontSize: scaleFontSize(skills?.badge?.fontSize || '11px') }}
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
      
      {editable && onAddSkill && (
        <button
          onClick={onAddSkill}
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default SkillsTagsEnhanced;

