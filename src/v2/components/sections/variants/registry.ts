/**
 * Variant Registry
 * 
 * Central registry for all section variants.
 * This makes it easy to:
 * 1. Add new variants without modifying multiple files
 * 2. Query available variants for each section
 * 3. Get variant metadata (name, description, preview)
 */

import type { ExperienceVariant } from './experience/types';
import type { EducationVariant } from './education/types';
import type { SkillsVariant } from './skills/types';
import type { ProjectsVariant } from './projects/types';
import type { CertificationsVariant } from './certifications/types';
import type { AwardsVariant } from './awards/types';

// ============================================================================
// VARIANT METADATA
// ============================================================================

export interface VariantMeta {
  id: string;
  name: string;
  description: string;
  category: 'standard' | 'modern' | 'minimal' | 'creative' | 'academic';
  recommended?: boolean;
}

// ============================================================================
// EXPERIENCE VARIANTS
// ============================================================================

export const experienceVariants: Record<ExperienceVariant, VariantMeta> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    description: 'Classic professional layout with position, company, dates, and bullet points',
    category: 'standard',
    recommended: true,
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient single-line layout for many positions',
    category: 'minimal',
  },
  detailed: {
    id: 'detailed',
    name: 'Detailed',
    description: 'Full details with descriptions and all bullet points',
    category: 'standard',
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    description: 'Visual timeline with connecting line and dots',
    category: 'modern',
    recommended: true,
  },
  cards: {
    id: 'cards',
    name: 'Cards',
    description: 'Card-based layout with shadows and borders',
    category: 'modern',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-minimal text-only layout',
    category: 'minimal',
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Clean modern layout with accent borders',
    category: 'modern',
    recommended: true,
  },
  academic: {
    id: 'academic',
    name: 'Academic',
    description: 'Academic/research focused style',
    category: 'academic',
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Creative industry style with visual flair',
    category: 'creative',
  },
};

// ============================================================================
// EDUCATION VARIANTS
// ============================================================================

export const educationVariants: Record<EducationVariant, VariantMeta> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    description: 'Classic layout with degree, school, and dates',
    category: 'standard',
    recommended: true,
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient single-line layout',
    category: 'minimal',
  },
  detailed: {
    id: 'detailed',
    name: 'Detailed',
    description: 'Full details with GPA, honors, and coursework',
    category: 'standard',
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    description: 'Visual timeline showing educational progression',
    category: 'modern',
  },
  cards: {
    id: 'cards',
    name: 'Cards',
    description: 'Card-based layout with visual appeal',
    category: 'modern',
    recommended: true,
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-minimal text-only layout',
    category: 'minimal',
  },
  academic: {
    id: 'academic',
    name: 'Academic',
    description: 'Academic CV style with research focus',
    category: 'academic',
    recommended: true,
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Modern styling with accent colors',
    category: 'modern',
  },
};

// ============================================================================
// SKILLS VARIANTS
// ============================================================================

export const skillsVariants: Record<SkillsVariant, VariantMeta> = {
  pills: {
    id: 'pills',
    name: 'Pills',
    description: 'Rounded pill badges',
    category: 'standard',
    recommended: true,
  },
  tags: {
    id: 'tags',
    name: 'Tags',
    description: 'Tag-style badges',
    category: 'standard',
  },
  bars: {
    id: 'bars',
    name: 'Progress Bars',
    description: 'Progress bars showing proficiency levels',
    category: 'modern',
    recommended: true,
  },
  dots: {
    id: 'dots',
    name: 'Dot Rating',
    description: 'Dot rating system (1-5)',
    category: 'modern',
  },
  grouped: {
    id: 'grouped',
    name: 'Grouped',
    description: 'Skills grouped by category',
    category: 'standard',
    recommended: true,
  },
  columns: {
    id: 'columns',
    name: 'Columns',
    description: 'Multi-column layout',
    category: 'standard',
  },
  inline: {
    id: 'inline',
    name: 'Inline',
    description: 'Inline bullet-separated list',
    category: 'minimal',
  },
  list: {
    id: 'list',
    name: 'List',
    description: 'Comma-separated list',
    category: 'minimal',
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient inline layout',
    category: 'minimal',
  },
  detailed: {
    id: 'detailed',
    name: 'Detailed',
    description: 'With proficiency levels and categories',
    category: 'modern',
  },
  radar: {
    id: 'radar',
    name: 'Radar',
    description: 'Radar/spider chart visualization',
    category: 'creative',
  },
  modern: {
    id: 'modern',
    name: 'Modern Cards',
    description: 'Modern cards with icons and categories',
    category: 'modern',
    recommended: true,
  },
};

// ============================================================================
// PROJECTS VARIANTS
// ============================================================================

export const projectsVariants: Record<ProjectsVariant, VariantMeta> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    description: 'Classic layout with project details',
    category: 'standard',
    recommended: true,
  },
  cards: {
    id: 'cards',
    name: 'Cards',
    description: 'Card-based grid layout for portfolio',
    category: 'modern',
    recommended: true,
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient layout for many projects',
    category: 'minimal',
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    description: 'Timeline with project dates',
    category: 'modern',
  },
  showcase: {
    id: 'showcase',
    name: 'Showcase',
    description: 'Portfolio showcase style',
    category: 'creative',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-minimal layout',
    category: 'minimal',
  },
  detailed: {
    id: 'detailed',
    name: 'Detailed',
    description: 'Full details with highlights',
    category: 'standard',
  },
};

// ============================================================================
// CERTIFICATIONS VARIANTS
// ============================================================================

export const certificationsVariants: Record<CertificationsVariant, VariantMeta> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    description: 'Classic layout with certification details',
    category: 'standard',
    recommended: true,
  },
  cards: {
    id: 'cards',
    name: 'Cards',
    description: 'Card-based layout',
    category: 'modern',
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient layout',
    category: 'minimal',
  },
  badges: {
    id: 'badges',
    name: 'Badges',
    description: 'Badge-style visual layout',
    category: 'modern',
    recommended: true,
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    description: 'Timeline layout',
    category: 'modern',
  },
};

// ============================================================================
// AWARDS VARIANTS
// ============================================================================

export const awardsVariants: Record<AwardsVariant, VariantMeta> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    description: 'Classic layout with award details',
    category: 'standard',
    recommended: true,
  },
  cards: {
    id: 'cards',
    name: 'Cards',
    description: 'Card-based layout',
    category: 'modern',
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient layout',
    category: 'minimal',
  },
  trophies: {
    id: 'trophies',
    name: 'Trophies',
    description: 'Visual trophy-style layout',
    category: 'creative',
    recommended: true,
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    description: 'Timeline layout',
    category: 'modern',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export type SectionType = 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'awards';

export function getVariantsForSection(section: SectionType): VariantMeta[] {
  switch (section) {
    case 'experience':
      return Object.values(experienceVariants);
    case 'education':
      return Object.values(educationVariants);
    case 'skills':
      return Object.values(skillsVariants);
    case 'projects':
      return Object.values(projectsVariants);
    case 'certifications':
      return Object.values(certificationsVariants);
    case 'awards':
      return Object.values(awardsVariants);
    default:
      return [];
  }
}

export function getRecommendedVariants(section: SectionType): VariantMeta[] {
  return getVariantsForSection(section).filter(v => v.recommended);
}

export function getVariantsByCategory(section: SectionType, category: VariantMeta['category']): VariantMeta[] {
  return getVariantsForSection(section).filter(v => v.category === category);
}
