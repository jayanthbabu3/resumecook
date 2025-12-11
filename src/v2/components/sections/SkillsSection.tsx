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
    // Handle inline variant - use InlineEditableSkills with inline variant
    if (variant === 'inline') {
      // Map separator string to valid type
      const separatorType: 'bullet' | 'comma' | 'pipe' = 
        skills.separator === ' | ' ? 'pipe' : 
        skills.separator === ', ' ? 'comma' : 'bullet';
      
      return (
        <InlineEditableSkills
          skills={items}
          editable={editable}
          themeColor={accent}
          variant="inline"
          path="skills"
          fontSize={typography.body.fontSize}
          separator={separatorType}
        />
      );
    }

    // Handle columns variant - use list variant
    if (variant === 'columns') {
      return (
        <InlineEditableSkills
          skills={items}
          editable={editable}
          themeColor={accent}
          variant="list"
          path="skills"
          fontSize={typography.body.fontSize}
        />
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
