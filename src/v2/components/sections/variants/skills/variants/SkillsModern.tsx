/**
 * Skills Modern Variant
 * 
 * Modern card-style layout with icons and categories.
 */

import React from 'react';
import { X, Plus, Code, Palette, Database, Globe, Settings, Zap } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { SkillsVariantProps } from '../types';

const categoryIcons: Record<string, React.ReactNode> = {
  'Technical': <Code className="w-4 h-4" />,
  'Programming': <Code className="w-4 h-4" />,
  'Design': <Palette className="w-4 h-4" />,
  'Database': <Database className="w-4 h-4" />,
  'Web': <Globe className="w-4 h-4" />,
  'Tools': <Settings className="w-4 h-4" />,
  'Other': <Zap className="w-4 h-4" />,
};

export const SkillsModern: React.FC<SkillsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddSkill,
  onRemoveSkill,
}) => {
  const { typography } = config;

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

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {categories.map((category) => (
        <div
          key={category}
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
          }}
        >
          {/* Category header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: `2px solid ${accentColor}20`,
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: `${accentColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accentColor,
            }}>
              {categoryIcons[category] || categoryIcons['Other']}
            </div>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: typography.itemTitle.color,
            }}>
              {category}
            </span>
          </div>
          
          {/* Skills list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {groupedSkills[category].map((skill) => {
              const skillIndex = items.findIndex(s => s.id === skill.id);
              return (
                <div 
                  key={skill.id} 
                  className="group relative"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#f9fafb',
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: accentColor,
                    flexShrink: 0,
                  }} />
                  {editable ? (
                    <InlineEditableText
                      path={`skills.${skillIndex}.name`}
                      value={skill.name}
                      style={{ 
                        fontSize: '13px',
                        color: typography.body.color,
                        flex: 1,
                      }}
                      placeholder="Skill"
                    />
                  ) : (
                    <span style={{ 
                      fontSize: '13px',
                      color: typography.body.color,
                    }}>
                      {skill.name}
                    </span>
                  )}
                  
                  {skill.level && (
                    <span style={{
                      fontSize: '10px',
                      color: '#9ca3af',
                      backgroundColor: '#e5e7eb',
                      padding: '1px 6px',
                      borderRadius: '10px',
                    }}>
                      {skill.level}/5
                    </span>
                  )}
                  
                  {editable && onRemoveSkill && (
                    <button
                      onClick={() => onRemoveSkill(skill.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                    >
                      <X className="w-3 h-3 text-red-500" />
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
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '120px',
            borderRadius: '12px',
            border: `2px dashed ${accentColor}40`,
            backgroundColor: `${accentColor}05`,
            color: accentColor,
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <Plus style={{ width: '20px', height: '20px' }} />
          Add Skill
        </button>
      )}
    </div>
  );
};

export default SkillsModern;
