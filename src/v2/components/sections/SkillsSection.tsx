/**
 * Resume Builder V2 - Skills Section Component
 * 
 * Configurable skills section with multiple variants:
 * - pills: Rounded pill badges
 * - tags: Square/rounded tags
 * - list: Comma-separated list
 * - grouped: Grouped by category
 * - columns: Multi-column list
 * - inline: Inline text with separator
 */

import React from 'react';
import type { TemplateConfig, SkillsVariant } from '../../types';
import type { SkillItem } from '@/types/resume';
import { SectionHeading } from './SectionHeading';
import { InlineEditableSkills } from '@/components/resume/InlineEditableSkills';

interface SkillsSectionProps {
  items: SkillItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  variantOverride?: SkillsVariant;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Skills',
  variantOverride,
}) => {
  const { typography, colors, spacing, skills } = config;
  const variant = variantOverride || skills.variant;
  const accent = colors.primary;

  // Badge/pill styles from config
  const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    fontSize: skills.badge?.fontSize || '12px',
    fontWeight: 500,
    padding: skills.badge?.padding || '4px 12px',
    borderRadius: skills.badge?.borderRadius || '9999px',
    border: `${skills.badge?.borderWidth || '1px'} solid ${accent}`,
    backgroundColor: skills.badge?.backgroundColor || 'transparent',
    color: skills.badge?.textColor || accent,
  };

  // Render based on variant
  const renderSkills = () => {
    // Handle inline variant separately - just plain text with separator
    if (variant === 'inline') {
      const separator = skills.separator || ' | ';
      
      return (
        <p style={{ 
          fontSize: typography.body.fontSize, 
          color: typography.body.color, 
          lineHeight: typography.body.lineHeight,
          margin: 0,
        }}>
          {items.map(s => s.name).join(separator)}
        </p>
      );
    }

    // Handle columns variant - bullet list in multiple columns
    if (variant === 'columns') {
      const columnCount = skills.columns || 2;
      const itemsPerColumn = Math.ceil(items.length / columnCount);
      const columns: SkillItem[][] = [];
      
      for (let i = 0; i < columnCount; i++) {
        columns.push(items.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn));
      }

      return (
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            gap: spacing.skillGap,
          }}
        >
          {columns.map((column, colIndex) => (
            <ul 
              key={colIndex}
              style={{ 
                margin: 0, 
                paddingLeft: '18px',
                listStyleType: 'disc',
              }}
            >
              {column.map((skill, idx) => (
                <li 
                  key={skill.id || idx}
                  style={{ 
                    fontSize: typography.body.fontSize,
                    color: typography.body.color,
                    lineHeight: 1.6,
                    marginBottom: '2px',
                  }}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      );
    }
    
    // Map v2 variants to existing InlineEditableSkills variants
    const editableVariant = variant === 'pills' ? 'pill' : variant === 'tags' ? 'tag' : 'badge';
    
    // Always use InlineEditableSkills for consistency between live and form editor
    // It handles both editable and non-editable modes with proper styling
    return (
      <InlineEditableSkills
        skills={items}
        editable={editable}
        themeColor={accent}
        variant={editableVariant}
        path="skills"
        fontSize={typography.body.fontSize}
      />
    );
  };

  if (!items.length && !editable) return null;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={accent}
      />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {renderSkills()}
      </div>
    </section>
  );
};

export default SkillsSection;
