/**
 * Skills Dots Enhanced Variant
 *
 * Dot rating system with intuitive interactive editing.
 * Features a clear level selector that's easy to discover and use.
 * Responsive design works in both sidebar and main content areas.
 */

import React, { useState } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
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
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  if (!items.length && !editable) return null;

  const handleLevelChange = (index: number, newLevel: number) => {
    if (onUpdateSkill) {
      const skillId = items[index]?.id;
      if (skillId) {
        onUpdateSkill(skillId, 'level', newLevel);
      }
    } else if (inlineEdit) {
      inlineEdit.updateField(`skills.${index}.level`, newLevel);
    }
    setOpenDropdown(null);
  };

  const renderDots = (level: number) => {
    return (
      <div style={{ display: 'flex', gap: '3px' }}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: dot <= level ? accentColor : '#d1d5db',
            }}
          />
        ))}
      </div>
    );
  };

  // Editable rating selector with dropdown
  const renderEditableRating = (level: number, index: number) => {
    const isOpen = openDropdown === index;

    return (
      <div style={{ position: 'relative' }}>
        {/* Clickable rating button */}
        <button
          onClick={() => setOpenDropdown(isOpen ? null : index)}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          style={{ minWidth: '70px' }}
        >
          {/* Mini dots preview */}
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: dot <= level ? accentColor : '#e5e7eb',
                }}
              />
            ))}
          </div>
          <ChevronDown 
            className="text-gray-400" 
            style={{ 
              width: '12px', 
              height: '12px',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
            }} 
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setOpenDropdown(null)}
            />
            
            {/* Dropdown content */}
            <div 
              className="absolute right-0 mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-2"
              style={{ minWidth: '140px' }}
            >
              <div className="text-[10px] font-medium text-gray-500 uppercase px-2 pb-1.5 border-b border-gray-100 mb-1.5">
                Skill Level
              </div>
              {[
                { level: 5, label: 'Expert' },
                { level: 4, label: 'Advanced' },
                { level: 3, label: 'Intermediate' },
                { level: 2, label: 'Basic' },
                { level: 1, label: 'Beginner' },
              ].map((option) => (
                <button
                  key={option.level}
                  onClick={() => handleLevelChange(index, option.level)}
                  className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left text-xs hover:bg-gray-50 transition-colors ${
                    level === option.level ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className={level === option.level ? 'font-medium text-gray-900' : 'text-gray-600'}>
                    {option.label}
                  </span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: dot <= option.level ? accentColor : '#e5e7eb',
                        }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Filter out empty/whitespace-only skill names
  const validItems = items.filter(skill => skill.name && skill.name.trim());

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      {validItems.map((skill) => {
        const level = skill.level || 3;
        // Find original index in items array for correct path
        const originalIndex = items.findIndex(s => s.id === skill.id);

        return (
          <div key={skill.id} className="group">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              gap: '8px',
              minWidth: 0,
            }}>
              {/* Skill name - truncate if too long */}
              <div style={{ 
                flex: '1 1 auto',
                minWidth: 0,
                overflow: 'hidden',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`skills.${originalIndex}.name`}
                    value={skill.name}
                    style={{
                      fontSize: scaleFontSize(typography.body.fontSize),
                      color: typography.body.color,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
                    }}
                    placeholder="Skill name"
                  />
                ) : (
                  <span style={{
                    fontSize: scaleFontSize(typography.body.fontSize),
                    color: typography.body.color,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}>
                    {skill.name}
                  </span>
                )}
              </div>

              {/* Rating and actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {editable ? (
                  // Editable dropdown selector
                  renderEditableRating(level, originalIndex)
                ) : (
                  // Static dots display
                  renderDots(level)
                )}

                {/* Delete button */}
                {editable && onRemoveSkill && (
                  <button
                    onClick={() => onRemoveSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                  >
                    <X className="w-3.5 h-3.5 text-red-400 hover:text-red-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {editable && onAddSkill && (
        <button
          onClick={onAddSkill}
          className="mt-1 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Skill
        </button>
      )}
    </div>
  );
};

export default SkillsDotsEnhanced;
