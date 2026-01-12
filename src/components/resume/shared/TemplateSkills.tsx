/**
 * TemplateSkills - Standardized skills section for all templates
 * 
 * This component handles:
 * - Skills display in various styles (tags, pills, list, bars)
 * - Skill ratings (optional)
 * - Editable/non-editable modes
 * - Consistent styling via config
 */

import React from 'react';
import { SkillItem } from '@/types/resume';
import { InlineEditableSkills } from '@/components/resume/InlineEditableSkills';
import { PDFStyleConfig, SKILL_BADGE_STYLES } from '@/lib/pdfStyles';
import { SkillsConfig, SectionConfig } from '@/lib/templateConfig';

export interface TemplateSkillsProps {
  /** Skills items */
  skills: SkillItem[];
  /** Whether the section is editable */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** PDF style configuration */
  styles: PDFStyleConfig;
  /** Skills configuration */
  config?: SkillsConfig;
  /** Section configuration */
  sectionConfig?: SectionConfig;
  /** Section title override */
  title?: string;
  /** Custom className */
  className?: string;
}

const DEFAULT_SKILLS_CONFIG: SkillsConfig = {
  style: 'tags',
  showRatings: false,
  groupByCategory: false,
  maxSkills: 0,
  tagStyle: 'pill',
};

const DEFAULT_SECTION_CONFIG: SectionConfig = {
  enabled: true,
  order: 4,
  title: 'Skills',
  titleCase: 'uppercase',
};

// Helper to add opacity to hex color
const withOpacity = (color: string, alpha: string): string => {
  if (!color || !color.startsWith('#')) return color;
  const normalized = color.length === 4 
    ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
    : color.slice(0, 7);
  return `${normalized}${alpha}`;
};

export const TemplateSkills: React.FC<TemplateSkillsProps> = ({
  skills,
  editable = false,
  accentColor = '#2563eb',
  styles,
  config = DEFAULT_SKILLS_CONFIG,
  sectionConfig = DEFAULT_SECTION_CONFIG,
  title,
  className = '',
}) => {
  if (!skills || skills.length === 0) {
    if (!editable) return null;
  }

  const sectionTitle = title || sectionConfig.title || 'Skills';
  const titleStyle: React.CSSProperties = {
    fontSize: styles.sectionHeading.size,
    fontWeight: styles.sectionHeading.weight,
    color: accentColor,
    marginBottom: '12px',
    textTransform: sectionConfig.titleCase === 'uppercase' ? 'uppercase' : 
                   sectionConfig.titleCase === 'capitalize' ? 'capitalize' : 'none',
    letterSpacing: sectionConfig.titleCase === 'uppercase' ? '0.05em' : undefined,
  };

  // Get tag style based on config
  const getTagStyle = (): React.CSSProperties => {
    const tagConfig = config.tagStyle || 'pill';
    const badgeStyle = SKILL_BADGE_STYLES[tagConfig];
    const accentBorder = withOpacity(accentColor, '33');
    
    return {
      padding: badgeStyle.padding,
      fontSize: badgeStyle.fontSize,
      fontWeight: badgeStyle.fontWeight,
      borderRadius: badgeStyle.borderRadius,
      color: styles.itemDescription.color,
      border: `1px solid ${accentBorder}`,
    };
  };

  // Limit skills if maxSkills is set
  const displaySkills = config.maxSkills && config.maxSkills > 0 
    ? skills.slice(0, config.maxSkills) 
    : skills;

  const renderSkillTag = (skill: SkillItem, index: number) => (
    <span
      key={skill.id || index}
      className="font-medium"
      style={getTagStyle()}
    >
      {skill.name}
    </span>
  );

  const renderSkillsList = () => {
    if (config.style === 'list') {
      return (
        <ul className="list-disc ml-5 space-y-1">
          {displaySkills.map((skill, index) => (
            <li 
              key={skill.id || index}
              style={{
                fontSize: styles.itemDescription.size,
                color: styles.colors.text.secondary,
              }}
            >
              {skill.name}
            </li>
          ))}
        </ul>
      );
    }

    // Default: tags/pills style
    return (
      <div className="flex flex-wrap gap-2">
        {displaySkills.map((skill, index) => renderSkillTag(skill, index))}
      </div>
    );
  };

  return (
    <div className={className} style={{ marginBottom: styles.spacing.sectionGap }}>
      <h2 className="tracking-wide" style={titleStyle}>
        {sectionTitle}
      </h2>
      
      {editable ? (
        <InlineEditableSkills
          path="skills"
          skills={skills}
          renderSkill={(skill, index) => renderSkillTag(skill, index)}
        />
      ) : (
        renderSkillsList()
      )}
    </div>
  );
};

export default TemplateSkills;
