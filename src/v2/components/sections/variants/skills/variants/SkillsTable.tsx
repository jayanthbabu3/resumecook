/**
 * Skills Table Variant
 *
 * Renders skills in a professional table format with category rows.
 * Similar to traditional resumes showing:
 * Category | Technology/Skills list
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

  const handleAddSkill = (category?: string) => {
    addArrayItem('skills', {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      category: category || 'New Category',
    });
  };

  const handleRemoveSkill = (skillId: string) => {
    const index = items.findIndex((skill) => skill.id === skillId);
    if (index >= 0) {
      removeArrayItem('skills', index);
    }
  };

  const borderColor = colors.border || '#e5e7eb';
  const getBorderStyle = () => {
    if (borderStyle === 'none') return 'none';
    return `1px ${borderStyle} ${borderColor}`;
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: scaleFontSize(typography.body.fontSize),
    lineHeight: typography.body.lineHeight,
    border: getBorderStyle(),
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '8px 12px',
    fontWeight: 700,
    fontSize: scaleFontSize(typography.small?.fontSize || '11px'),
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: colors.text.muted,
    border: getBorderStyle(),
    borderBottom: `1px solid ${borderColor}`,
    textAlign: 'left',
    backgroundColor: `${accentColor}06`,
  };

  const categoryCellStyle: React.CSSProperties = {
    padding: '10px 12px',
    fontWeight: 600,
    color: accentColor,
    border: getBorderStyle(),
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    width: '160px',
    fontSize: scaleFontSize(typography.body.fontSize),
  };

  const skillsCellStyle: React.CSSProperties = {
    padding: '10px 12px',
    color: typography.body.color,
    border: getBorderStyle(),
    verticalAlign: 'top',
    lineHeight: 1.6,
  };

  if (!items.length && !editable) return null;

  return (
    <div>
      <table style={tableStyle}>
        {showHeaders && (
          <thead>
            <tr>
              <th style={headerCellStyle}>Category</th>
              <th style={headerCellStyle}>Technologies & Tools</th>
            </tr>
          </thead>
        )}
        <tbody>
          {grouped.order.map((category, rowIndex) => {
            const rowBgColor = striped && rowIndex % 2 === 1
              ? `${accentColor}05`
              : 'transparent';

            return (
              <tr key={category} style={{ backgroundColor: rowBgColor }}>
                <td style={categoryCellStyle}>
                  {editable ? (
                    <InlineEditableText
                      path={`skills.${items.findIndex((skill) => skill.category === category)}.category`}
                      value={category}
                      style={{ color: accentColor, fontWeight: 600 }}
                    />
                  ) : (
                    category
                  )}
                </td>
                <td style={skillsCellStyle}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                    {grouped.groups[category]
                      .filter((skill) => skill.name?.trim()) // Filter out empty skills
                      .map((skill, skillIndex, filteredArray) => {
                        const index = items.findIndex((s) => s.id === skill.id);
                        const isLast = skillIndex === filteredArray.length - 1;

                        return (
                          <span key={skill.id} className="group relative inline-flex items-center">
                            {editable ? (
                              <InlineEditableText
                                path={`skills.${index}.name`}
                                value={skill.name}
                                style={{ color: typography.body.color }}
                                placeholder="Skill"
                              />
                            ) : (
                              <span>{skill.name}</span>
                            )}
                            {!isLast && (
                              <span style={{ color: colors.text.muted, marginLeft: '2px' }}>,</span>
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

                    {editable && (
                      <button
                        onClick={() => handleAddSkill(category)}
                        className="ml-2 text-xs px-1.5 py-0.5 rounded border border-dashed hover:bg-gray-50 transition-colors opacity-50 hover:opacity-100"
                        style={{ color: accentColor, borderColor: accentColor }}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editable && (
        <button
          onClick={() => handleAddSkill('New Category')}
          className="mt-3 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add New Category Row
        </button>
      )}
    </div>
  );
};

export default SkillsTable;
