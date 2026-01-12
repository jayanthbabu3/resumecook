/**
 * Template Configuration Types and Defaults
 */

export interface SectionConfig {
  enabled: boolean;
  order: number;
  title: string;
  titleCase?: 'uppercase' | 'capitalize' | 'lowercase' | 'none';
}

export interface HeaderConfig {
  layout: 'centered' | 'left-aligned' | 'split' | 'modern';
  showTitle: boolean;
  showSocialLinks: boolean;
  contactLayout: 'inline' | 'stacked' | 'grid';
  hasBackground?: boolean;
  backgroundColor?: string;
}

export interface ExperienceConfig {
  layout: 'stacked' | 'timeline' | 'grid';
  showBulletPoints: boolean;
  showDescription: boolean;
  dateFormat: 'full' | 'short' | 'year-only';
  datePosition: 'right' | 'left' | 'below';
  enableBulletPointEditing?: boolean;
}

export interface SkillsConfig {
  style: 'tags' | 'bars' | 'list' | 'pills' | 'grid';
  showRatings: boolean;
  groupByCategory: boolean;
  maxSkills: number;
  tagStyle?: 'pill' | 'square' | 'rounded';
}

export interface EducationConfig {
  showGpa: boolean;
  showField: boolean;
  showDates: boolean;
  dateFormat: 'full' | 'short' | 'year-only';
  layout: 'stacked' | 'inline' | 'grid';
}

export interface TemplateConfig {
  id: string;
  name: string;
  header: HeaderConfig;
  experience: ExperienceConfig;
  education: EducationConfig;
  skills: SkillsConfig;
  sections: {
    summary: SectionConfig;
    experience: SectionConfig;
    education: SectionConfig;
    skills: SectionConfig;
  };
}

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  layout: 'left-aligned',
  showTitle: true,
  showSocialLinks: true,
  contactLayout: 'inline',
  hasBackground: false,
};

export const DEFAULT_EXPERIENCE_CONFIG: ExperienceConfig = {
  layout: 'stacked',
  showBulletPoints: true,
  showDescription: true,
  dateFormat: 'short',
  datePosition: 'right',
  enableBulletPointEditing: true,
};

export const DEFAULT_EDUCATION_CONFIG: EducationConfig = {
  showGpa: false,
  showField: true,
  showDates: true,
  dateFormat: 'short',
  layout: 'stacked',
};

export const DEFAULT_SKILLS_CONFIG: SkillsConfig = {
  style: 'tags',
  showRatings: false,
  groupByCategory: false,
  maxSkills: 0,
  tagStyle: 'pill',
};

export const DEFAULT_SECTION_CONFIG: SectionConfig = {
  enabled: true,
  order: 0,
  title: '',
  titleCase: 'uppercase',
};
