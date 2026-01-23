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
import type { TemplateConfig, SkillsVariant, SkillItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableSkills } from '@/components/resume/InlineEditableSkills';
import { SkillsColumns } from './variants/skills/variants/SkillsColumns';
import { SkillsVariantRenderer } from './variants/skills/SkillsVariantRenderer';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface SkillsSectionProps {
  items: SkillItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  variantOverride?: SkillsVariant;
  onAddSkill?: () => void;
  onRemoveSkill?: (id: string) => void;
  onUpdateSkill?: (id: string, field: string, value: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Skills',
  variantOverride,
  onAddSkill,
  onRemoveSkill,
  onUpdateSkill,
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

  // Helper to get skill name from various possible formats
  const getSkillName = (skill: SkillItem): string => {
    // V2 format: individual skill with name
    if (skill.name && skill.name.trim()) return skill.name;
    // Legacy format: grouped skills with items array
    const legacySkill = skill as SkillItem & { items?: string[] };
    if (legacySkill.items && legacySkill.items.length > 0) {
      return legacySkill.items.filter(Boolean).join(', ');
    }
    // Fallback: use category name if nothing else
    if (skill.category && skill.category.trim()) return skill.category;
    return 'Unnamed skill';
  };

  // Convert V2 SkillItem[] to string[] for InlineEditableSkills
  const skillStrings = items.map(item => getSkillName(item));

  // Render based on variant
  const renderSkills = () => {
    // Variants that should use SkillsVariantRenderer
    const variantRendererVariants: SkillsVariant[] = [
      'bars', 'dots', 'grouped', 'columns', 'category-lines',
      'modern', 'detailed', 'list', 'compact', 'radar',
      'bordered-tags', 'pills-accent', 'inline-dots', 'table'
    ];

    // Use SkillsVariantRenderer for supported variants
    if (variant && variantRendererVariants.includes(variant as SkillsVariant)) {
      return (
        <SkillsVariantRenderer
          variant={variant as SkillsVariant}
          items={items}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddSkill={onAddSkill}
          onRemoveSkill={onRemoveSkill}
          onUpdateSkill={onUpdateSkill}
        />
      );
    }

    // Handle inline variant - use InlineEditableSkills with inline variant
    if (variant === 'inline') {
      // Map separator string to valid type
      const separatorType: 'bullet' | 'comma' | 'pipe' = 
        skills.separator === ' | ' ? 'pipe' : 
        skills.separator === ', ' ? 'comma' : 'bullet';
      
      return (
        <InlineEditableSkills
          skills={skillStrings}
          editable={editable}
          themeColor={accent}
          variant="inline"
          path="skills"
          fontSize={typography.body.fontSize || '12px'}
          separator={separatorType}
        />
      );
    }
    
    // Map v2 variants to existing InlineEditableSkills variants
    // For pills and tags, use SkillsVariantRenderer if available, otherwise fallback to InlineEditableSkills
    if (variant === 'pills' || variant === 'tags') {
      // Try to use SkillsVariantRenderer first
      try {
        return (
          <SkillsVariantRenderer
            variant={variant as SkillsVariant}
            items={items}
            config={config}
            accentColor={accent}
            editable={editable}
            onAddSkill={onAddSkill}
            onRemoveSkill={onRemoveSkill}
            onUpdateSkill={onUpdateSkill}
          />
        );
      } catch {
        // Fallback to InlineEditableSkills
        const editableVariant = variant === 'pills' ? 'pill' : 'tag';
        return (
          <InlineEditableSkills
            skills={skillStrings}
            editable={editable}
            themeColor={accent}
            variant={editableVariant}
            path="skills"
            fontSize={typography.body.fontSize || '12px'}
          />
        );
      }
    }
    
    // Default: use InlineEditableSkills for consistency
    const editableVariant = variant === 'pills' ? 'pill' : variant === 'tags' ? 'tag' : 'badge';
    return (
      <InlineEditableSkills
        skills={skillStrings}
        editable={editable}
        themeColor={accent}
        variant={editableVariant}
        path="skills"
        fontSize={typography.body.fontSize || '12px'}
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
