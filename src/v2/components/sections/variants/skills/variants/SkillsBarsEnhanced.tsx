/**
 * Skills Bars Enhanced Variant
 *
 * Progress bars with proficiency levels and inline editing.
 * Supports clicking on the progress bar to change skill level.
 * 2 columns in main content, 1 column in sidebar (auto-responsive).
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { SkillsVariantProps } from '../types';

export const SkillsBarsEnhanced: React.FC<SkillsVariantProps> = ({
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
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverLevel, setHoverLevel] = useState<number | null>(null);
  
  // Detect container width for responsive columns
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);
  
  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        setIsNarrow(containerRef.current.offsetWidth < 280);
      }
    };
    checkWidth();
    const resizeObserver = new ResizeObserver(checkWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

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
  };

  // Filter out empty/whitespace-only skill names
  const validItems = items.filter(skill => skill.name && skill.name.trim());

  return (
    <div ref={containerRef}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isNarrow ? '1fr' : 'repeat(2, 1fr)', 
        gap: isNarrow ? '8px' : '12px 16px',
      }}>
        {validItems.map((skill) => {
          // Find original index for correct path
          const originalIndex = items.findIndex(s => s.id === skill.id);
          const level = skill.level || 3;
          const displayLevel = hoverIndex === originalIndex && hoverLevel !== null ? hoverLevel : level;
          const percentage = (displayLevel / 5) * 100;

          return (
            <div key={skill.id} className="group relative">
              {editable && onRemoveSkill && (
                <button
                  onClick={() => onRemoveSkill(skill.id)}
                  className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
                >
                  <X className="w-3 h-3 text-red-600" />
                </button>
              )}

              {/* Skill name and bar in compact layout with fixed name width */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: isNarrow ? '80px 1fr' : '90px 1fr',
                alignItems: 'center',
                gap: '10px',
              }}>
                {/* Skill name - fixed width */}
                <div style={{ 
                  overflow: 'hidden',
                }}>
                  {editable ? (
                    <InlineEditableText
                      path={`skills.${originalIndex}.name`}
                      value={skill.name}
                      style={{
                        fontSize: scaleFontSize(typography.body.fontSize),
                        color: typography.body.color,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'block',
                      }}
                      placeholder="Skill"
                    />
                  ) : (
                    <span style={{
                      fontSize: scaleFontSize(typography.body.fontSize),
                      color: typography.body.color,
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
                    }}>
                      {skill.name}
                    </span>
                  )}
                </div>

                {/* Progress bar - takes remaining space */}
                <div
                  onMouseLeave={() => {
                    if (editable) {
                      setHoverIndex(null);
                      setHoverLevel(null);
                    }
                  }}
                >
                  {editable ? (
                    <div
                      style={{
                        width: '100%',
                        height: '5px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'flex',
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          style={{
                            width: '20%',
                            height: '100%',
                            backgroundColor: lvl <= displayLevel ? accentColor : 'transparent',
                            transition: 'background-color 0.15s ease',
                          }}
                          onMouseEnter={() => {
                            setHoverIndex(originalIndex);
                            setHoverLevel(lvl);
                          }}
                          onClick={() => handleLevelChange(originalIndex, lvl)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '5px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          backgroundColor: accentColor,
                          borderRadius: '3px',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {editable && onAddSkill && (
        <button
          onClick={onAddSkill}
          className="mt-2 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Skill
        </button>
      )}
    </div>
  );
};

export default SkillsBarsEnhanced;
