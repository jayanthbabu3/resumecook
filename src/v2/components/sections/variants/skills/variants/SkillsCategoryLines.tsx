/**
 * Skills Category Lines Variant
 *
 * Renders grouped skills with category headings and inline comma-separated lists.
 * Designed for clean, ATS-friendly layouts while preserving inline edit support.
 */

import React from 'react';
import { Plus, X } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import type { SkillsVariantProps } from '../types';
import type { SkillItem } from '../../../../types/resumeData';

interface SkillsCategoryLinesProps extends SkillsVariantProps {
  /** Number of columns for category layout */
  columns?: number;
  /** Separator style between skills */
  separator?: 'bullet' | 'comma' | 'pipe';
}

const separatorMap: Record<Required<SkillsCategoryLinesProps>['separator'], string> = {
  bullet: ' • ',
  comma: ', ',
  pipe: ' | ',
};

export const SkillsCategoryLines: React.FC<SkillsCategoryLinesProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  columns = 1,
  separator = 'bullet',
}) => {
  const { typography } = config;
  const { addArrayItem, removeArrayItem } = useInlineEdit();

  const grouped = React.useMemo(() => {
    const order: string[] = [];
    const groups: Record<string, SkillItem[]> = {};

    items.forEach((skill) => {
      const category = skill.category || 'General';
      if (!groups[category]) {
        groups[category] = [];
        order.push(category);
      }
      groups[category].push(skill);
    });

    return { order, groups };
  }, [items]);

  const handleAddSkill = (category?: string) => {
    addArrayItem('skills', {
      id: `skill-${Date.now()}`,
      name: 'New skill',
      category: category || 'New Category',
    });
  };

  const handleRemoveSkill = (skillId: string) => {
    const index = items.findIndex((skill) => skill.id === skillId);
    if (index >= 0) {
      removeArrayItem('skills', index);
    }
  };

  const contentStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '16px',
  };

  const categoryHeadingStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: 700,
    color: accentColor,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    marginBottom: '6px',
    borderBottom: `2px solid ${accentColor}30`,
    paddingBottom: '4px',
  };

  const skillTextStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
  };

  if (!items.length && !editable) return null;

  return (
    <div>
      <div style={contentStyle}>
        {grouped.order.map((category) => (
          <div key={category} style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              {editable ? (
                <InlineEditableText
                  path={`skills.${items.findIndex((skill) => skill.category === category)}.category`}
                  value={category}
                  style={categoryHeadingStyle}
                />
              ) : (
                <div style={categoryHeadingStyle}>{category}</div>
              )}

              {editable && (
                <button
                  onClick={() => handleAddSkill(category)}
                  className="text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                  style={{ color: accentColor, borderColor: accentColor }}
                >
                  <Plus className="h-3 w-3" />
                </button>
              )}
            </div>

            <div style={{ ...skillTextStyle, display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {grouped.groups[category].map((skill, skillIndex) => {
                const index = items.findIndex((s) => s.id === skill.id);
                const isLastInCategory = skillIndex === grouped.groups[category].length - 1;
                return (
                  <span key={skill.id} className="group relative">
                    {editable ? (
                      <InlineEditableText
                        path={`skills.${index}.name`}
                        value={skill.name}
                        style={{ color: typography.body.color }}
                        placeholder="Skill"
                      />
                    ) : (
                      <>{skill.name}</>
                    )}
                    {!isLastInCategory && (
                      <span style={{ color: '#9ca3af' }}>{separatorMap[separator]}</span>
                    )}

                    {editable && (
                      <button
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="absolute -right-4 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                      >
                        <X className="w-3 h-3 text-red-500" />
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {editable && !items.length && (
        <button
          onClick={() => handleAddSkill('Skills')}
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

export default SkillsCategoryLines;
