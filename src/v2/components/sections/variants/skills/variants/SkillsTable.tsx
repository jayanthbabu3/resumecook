/**
 * Skills Table Variant
 *
 * Renders skills in a clean grouped format with category labels.
 * Uses a stacked layout (category on top, skills below) that works
 * in both wide main content and narrow sidebar contexts.
 *
 * Perfect for technical resumes where skills need to be organized by domain.
 */

import React from 'react';
import { Plus, X } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { SkillsVariantProps } from '../types';
import type { SkillItem } from '../../../../types/resumeData';

interface SkillsTableProps extends SkillsVariantProps {
  /** Show category column header */
  showHeaders?: boolean;
  /** Border style for table */
  borderStyle?: 'solid' | 'dashed' | 'none';
  /** Alternate row colors */
  striped?: boolean;
}

export const SkillsTable: React.FC<SkillsTableProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  showHeaders = true,
  borderStyle = 'solid',
  striped = false,
}) => {
  const { typography, colors } = config;
  const { addArrayItem, removeArrayItem } = useInlineEdit();
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  // Group skills by category maintaining insertion order - use 'General' as default to match form editor
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

  // Add a skill to an existing category
  const handleAddSkill = (category: string) => {
    addArrayItem('skills', {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      category: category,
    });
  };

  // Add a new category (creates placeholder that will be managed via form)
  const handleAddCategory = () => {
    addArrayItem('skills', {
      id: `skill-${Date.now()}`,
      name: '', // Empty placeholder - category only, user adds skills via form
      category: 'New Category',
    });
  };

  const handleRemoveSkill = (skillId: string) => {
    const index = items.findIndex((skill) => skill.id === skillId);
    if (index >= 0) {
      removeArrayItem('skills', index);
    }
  };

  const borderColor = colors.border || '#e5e7eb';

  if (!items.length && !editable) return null;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px',
      width: '100%',
    }}>
      {grouped.order.map((category, rowIndex) => {
        // Get valid skills for this category (non-empty names)
        const validSkills = grouped.groups[category].filter(
          (skill) => skill.name && skill.name.trim()
        );
        
        // In non-edit mode, skip categories with no valid skills
        if (!editable && validSkills.length === 0) {
          return null;
        }

        const rowBgColor = striped && rowIndex % 2 === 1
          ? `${accentColor}08`
          : 'transparent';

        return (
          <div 
            key={category} 
            style={{ 
              backgroundColor: rowBgColor,
              borderLeft: `3px solid ${accentColor}`,
              paddingLeft: '10px',
              paddingTop: '4px',
              paddingBottom: '4px',
            }}
          >
            {/* Category Label */}
            <div style={{
              fontSize: scaleFontSize(typography.small?.fontSize || '11px'),
              fontWeight: 600,
              color: accentColor,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '4px',
            }}>
              {editable ? (
                <InlineEditableText
                  path={`skills.${items.findIndex((skill) => skill.category === category)}.category`}
                  value={category}
                  style={{ 
                    color: accentColor, 
                    fontWeight: 600,
                    fontSize: scaleFontSize(typography.small?.fontSize || '11px'),
                  }}
                />
              ) : (
                category
              )}
            </div>

            {/* Skills List */}
            <div style={{ 
              fontSize: scaleFontSize(typography.body.fontSize),
              lineHeight: 1.5,
              color: typography.body.color,
            }}>
              {validSkills.map((skill, skillIndex) => {
                  const index = items.findIndex((s) => s.id === skill.id);
                  const isLast = skillIndex === validSkills.length - 1;

                  return (
                    <span 
                      key={skill.id} 
                      className="group"
                      style={{ 
                        display: 'inline',
                        position: 'relative',
                      }}
                    >
                      {editable ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <InlineEditableText
                            path={`skills.${index}.name`}
                            value={skill.name}
                            style={{ 
                              color: typography.body.color,
                              display: 'inline',
                            }}
                            placeholder="Skill"
                          />
                          <button
                            onClick={() => handleRemoveSkill(skill.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 rounded"
                            style={{
                              marginLeft: '2px',
                              padding: '1px',
                              display: 'inline-flex',
                            }}
                            title="Remove skill"
                          >
                            <X className="w-3 h-3 text-red-500" />
                          </button>
                        </span>
                      ) : (
                        <span>{skill.name}</span>
                      )}
                      {!isLast && (
                        <span style={{ color: colors.text.muted }}>, </span>
                      )}
                    </span>
                  );
                })}

              {editable && (
                <button
                  onClick={() => handleAddSkill(category)}
                  className="ml-1 text-xs px-1 py-0.5 rounded border border-dashed hover:bg-gray-50 transition-colors opacity-50 hover:opacity-100"
                  style={{ 
                    color: accentColor, 
                    borderColor: accentColor,
                    display: 'inline-flex',
                    alignItems: 'center',
                    verticalAlign: 'middle',
                  }}
                >
                  <Plus className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {editable && (
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add New Category
        </button>
      )}
    </div>
  );
};

export default SkillsTable;
