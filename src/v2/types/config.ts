/**
 * Resume Builder V2 - Configuration Types
 * 
 * This file defines the complete type system for the new config-driven resume builder.
 * Every aspect of a template is configurable through these types.
 */

import type { CSSProperties } from 'react';

// ============================================================================
// TYPOGRAPHY CONFIGURATION
// ============================================================================

export interface FontConfig {
  fontSize: string;
  fontWeight: number | string;
  lineHeight: number | string;
  letterSpacing?: string;
  color?: string;
  fontFamily?: string;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
}

export interface TypographyConfig {
  /** Name display (e.g., "JORDAN SMITH") */
  name: FontConfig;
  /** Professional title (e.g., "Experienced Technology Executive") */
  title: FontConfig;
  /** Section headings (e.g., "EXPERIENCE", "EDUCATION") */
  sectionHeading: FontConfig;
  /** Job title / Degree name */
  itemTitle: FontConfig;
  /** Company name / School name */
  itemSubtitle: FontConfig;
  /** Date ranges */
  dates: FontConfig;
  /** Body text / descriptions */
  body: FontConfig;
  /** Contact info text */
  contact: FontConfig;
  /** Small text / labels */
  small: FontConfig;
}

// ============================================================================
// SPACING CONFIGURATION
// ============================================================================

export interface SpacingConfig {
  /** Page padding (top, right, bottom, left) */
  pagePadding: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  /** Gap between major sections */
  sectionGap: string;
  /** Gap between items within a section (e.g., between jobs) */
  itemGap: string;
  /** Gap between heading and content */
  headingToContent: string;
  /** Gap between bullet points */
  bulletGap: string;
  /** Gap between contact items */
  contactGap: string;
  /** Gap between skill badges */
  skillGap: string;
}

// ============================================================================
// LAYOUT CONFIGURATION
// ============================================================================

export type LayoutType = 'single-column' | 'two-column-left' | 'two-column-right';

export interface LayoutConfig {
  /** Layout type */
  type: LayoutType;
  /** Main content width (percentage or px) */
  mainWidth: string;
  /** Sidebar width for two-column layouts */
  sidebarWidth?: string;
  /** Gap between columns */
  columnGap?: string;
  /** Sidebar background color */
  sidebarBackground?: string;
  /** Sidebar padding */
  sidebarPadding?: string;
}

// ============================================================================
// COLOR CONFIGURATION
// ============================================================================

export interface ColorConfig {
  /** Primary accent color (theme color) */
  primary: string;
  /** Secondary accent color */
  secondary?: string;
  /** Text colors */
  text: {
    /** Primary text (headings, important content) - usually #000000 */
    primary: string;
    /** Secondary text (body content) - usually #1a1a1a */
    secondary: string;
    /** Muted text (dates, labels) - usually #6b7280 */
    muted: string;
    /** Light text (on dark backgrounds) */
    light: string;
  };
  /** Background colors */
  background: {
    /** Main page background */
    page: string;
    /** Section/card backgrounds */
    section?: string;
    /** Sidebar background for two-column */
    sidebar?: string;
    /** Accent background (light version of primary) */
    accent?: string;
  };
  /** Border color */
  border: string;
}

// ============================================================================
// SECTION HEADING STYLES
// ============================================================================

export type SectionHeadingStyle = 
  | 'underline'      // Line under heading
  | 'left-border'    // Colored bar on left
  | 'background'     // Full background color
  | 'simple'         // Just text, no decoration
  | 'dotted'         // Dotted underline
  | 'double-line'    // Double line under
  | 'icon-left';     // Icon before text

export interface SectionHeadingConfig {
  /** Visual style of section headings */
  style: SectionHeadingStyle;
  /** Border/underline width */
  borderWidth?: string;
  /** Border/underline color (uses primary if not set) */
  borderColor?: string;
  /** Background color for 'background' style */
  backgroundColor?: string;
  /** Padding around heading */
  padding?: string;
  /** Margin below heading */
  marginBottom?: string;
}

// ============================================================================
// SKILLS DISPLAY CONFIGURATION
// ============================================================================

export type SkillsVariant = 
  | 'pills'          // Rounded pill badges
  | 'tags'           // Square/rounded tags
  | 'list'           // Simple comma-separated list
  | 'grouped'        // Grouped by category
  | 'bars'           // Progress bars
  | 'dots'           // Dot rating system
  | 'columns'        // Multi-column list
  | 'inline';        // Inline text with separator

export interface SkillsConfig {
  /** Display variant */
  variant: SkillsVariant;
  /** Number of columns for grid layouts */
  columns?: number;
  /** Show skill ratings */
  showRatings?: boolean;
  /** Separator for inline variant */
  separator?: string;
  /** Badge/pill style */
  badge?: {
    fontSize: string;
    padding: string;
    borderRadius: string;
    borderWidth?: string;
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

// ============================================================================
// HEADER VARIANTS
// ============================================================================

export type HeaderVariant = 
  | 'centered'       // Name centered, contact below
  | 'left-aligned'   // Name left, contact right
  | 'split'          // Name left, contact in columns
  | 'banner'         // Full-width colored banner
  | 'minimal'        // Just name and title
  | 'photo-left'     // Photo on left side
  | 'photo-right';   // Photo on right side

export interface HeaderConfig {
  /** Header layout variant */
  variant: HeaderVariant;
  /** Show photo */
  showPhoto?: boolean;
  /** Photo size */
  photoSize?: string;
  /** Photo shape */
  photoShape?: 'circle' | 'square' | 'rounded';
  /** Background color (for banner style) */
  backgroundColor?: string;
  /** Text color override */
  textColor?: string;
  /** Padding */
  padding?: string;
  /** Contact icons style */
  contactIcons?: {
    show: boolean;
    size: string;
    color?: string;
  };
  /** Show social links */
  showSocialLinks?: boolean;
  /** Social links variant */
  socialLinksVariant?: 'horizontal' | 'vertical' | 'icons-only' | 'badges';
}

// ============================================================================
// EXPERIENCE DISPLAY CONFIGURATION
// ============================================================================

export type ExperienceVariant = 
  | 'standard'       // Title, company, dates, bullets
  | 'compact'        // Condensed single-line header
  | 'timeline'       // Visual timeline on left
  | 'card'           // Card-style with border
  | 'minimal'        // Just essentials
  | 'two-column-dates'; // Dates/location on left column, content on right

export interface ExperienceConfig {
  /** Display variant */
  variant: ExperienceVariant;
  /** Show company logo placeholder */
  showLogo?: boolean;
  /** Date position */
  datePosition?: 'right' | 'below' | 'inline' | 'left';
  /** Show location */
  showLocation?: boolean;
  /** Bullet point style */
  bulletStyle?: '•' | '◦' | '▪' | '–' | '▸' | 'none';
}

// ============================================================================
// EDUCATION DISPLAY CONFIGURATION
// ============================================================================

export type EducationVariant = 
  | 'standard'       // Full details
  | 'compact'        // Single line
  | 'detailed'       // With description
  | 'timeline'       // Visual timeline
  | 'card'           // Card style
  | 'minimal'        // Just degree and school
  | 'two-column-dates'; // Dates/location on left column, content on right

export interface EducationConfig {
  /** Display variant */
  variant: EducationVariant;
  /** Show GPA */
  showGPA?: boolean;
  /** Show field of study */
  showField?: boolean;
  /** Show dates */
  showDates?: boolean;
  /** Date position */
  datePosition?: 'right' | 'below' | 'inline' | 'left';
}

// ============================================================================
// STRENGTHS DISPLAY CONFIGURATION
// ============================================================================

export type StrengthsVariant = 
  | 'cards'          // Cards with icon and description
  | 'list'           // Simple bulleted list
  | 'pills'          // Pill badges (title only)
  | 'grid'           // 2-column grid cards
  | 'minimal'        // Clean inline text
  | 'accent-border'; // Left accent border cards

export interface StrengthsConfig {
  /** Display variant */
  variant: StrengthsVariant;
  /** Show icons */
  showIcons?: boolean;
  /** Number of columns for grid layout */
  columns?: number;
}

// ============================================================================
// ACHIEVEMENTS DISPLAY CONFIGURATION  
// ============================================================================

export type AchievementsVariant =
  | 'list'           // Title - description format
  | 'bullets'        // Bulleted list
  | 'cards'          // Card style with background
  | 'numbered'       // Numbered list
  | 'timeline'       // Timeline style
  | 'minimal';       // Clean minimal text

export interface AchievementsConfig {
  /** Display variant */
  variant: AchievementsVariant;
  /** Show icons/numbers */
  showIndicators?: boolean;
}

// ============================================================================
// SECTION CONFIGURATION
// ============================================================================

export type SectionType = 
  | 'header'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'achievements'
  | 'strengths'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'awards'
  | 'publications'
  | 'volunteer'
  | 'interests'
  | 'references'
  | 'custom';

export interface SectionConfig {
  /** Section type */
  type: SectionType;
  /** Unique identifier */
  id: string;
  /** Display title (user can customize) */
  title: string;
  /** Default title (for reset) */
  defaultTitle: string;
  /** Is section enabled */
  enabled: boolean;
  /** Display order (lower = higher) */
  order: number;
  /** Which column for two-column layouts ('main' | 'sidebar') */
  column?: 'main' | 'sidebar';
  /** Section-specific variant */
  variant?: string;
  /** Custom styles override */
  customStyles?: CSSProperties;
}

// ============================================================================
// COMPLETE TEMPLATE CONFIGURATION
// ============================================================================

export interface TemplateConfig {
  /** Unique template identifier */
  id: string;
  /** Template display name */
  name: string;
  /** Template description */
  description?: string;
  /** Template category */
  category?: 'professional' | 'creative' | 'minimal' | 'modern' | 'classic';
  /** Template thumbnail URL */
  thumbnail?: string;
  
  // Core configurations
  typography: TypographyConfig;
  spacing: SpacingConfig;
  layout: LayoutConfig;
  colors: ColorConfig;
  
  // Section styling
  sectionHeading: SectionHeadingConfig;
  
  // Component-specific configs
  header: HeaderConfig;
  skills: SkillsConfig;
  experience: ExperienceConfig;
  education: EducationConfig;
  strengths?: StrengthsConfig;
  achievements?: AchievementsConfig;
  
  // Section order and visibility
  sections: SectionConfig[];
  
  // Font family
  fontFamily: {
    primary: string;
    secondary?: string;
  };
}

// ============================================================================
// SECTION LABELS (USER CUSTOMIZABLE)
// ============================================================================

export interface SectionLabels {
  summary: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  certifications: string;
  languages: string;
  awards: string;
  publications: string;
  volunteer: string;
  interests: string;
  references: string;
  [key: string]: string; // For custom sections
}

export const DEFAULT_SECTION_LABELS: SectionLabels = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  awards: 'Awards',
  publications: 'Publications',
  volunteer: 'Volunteer Experience',
  interests: 'Interests',
  references: 'References',
};

// ============================================================================
// RESUME DATA (EXTENDS EXISTING)
// ============================================================================

export interface V2ResumeData {
  /** Template configuration ID */
  templateId: string;
  /** Theme/accent color override */
  themeColor?: string;
  /** Custom section labels */
  sectionLabels?: Partial<SectionLabels>;
  /** Section order override */
  sectionOrder?: string[];
  /** Enabled sections override */
  enabledSections?: string[];
  /** Typography overrides */
  typographyOverrides?: Partial<TypographyConfig>;
  /** Spacing overrides */
  spacingOverrides?: Partial<SpacingConfig>;
}

// ============================================================================
// VARIANT REGISTRY
// ============================================================================

export interface VariantOption {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

export interface VariantRegistry {
  header: VariantOption[];
  skills: VariantOption[];
  experience: VariantOption[];
  education: VariantOption[];
}

export const VARIANT_REGISTRY: VariantRegistry = {
  header: [
    { id: 'centered', name: 'Centered', description: 'Name centered with contact below' },
    { id: 'left-aligned', name: 'Left Aligned', description: 'Name left, contact right' },
    { id: 'split', name: 'Split', description: 'Name left, contact in columns' },
    { id: 'banner', name: 'Banner', description: 'Full-width colored header' },
    { id: 'minimal', name: 'Minimal', description: 'Just name and title' },
    { id: 'photo-left', name: 'Photo Left', description: 'Photo on left side' },
    { id: 'photo-right', name: 'Photo Right', description: 'Photo on right side' },
  ],
  skills: [
    { id: 'pills', name: 'Pills', description: 'Rounded pill badges' },
    { id: 'tags', name: 'Tags', description: 'Square/rounded tags' },
    { id: 'list', name: 'List', description: 'Comma-separated list' },
    { id: 'grouped', name: 'Grouped', description: 'Grouped by category' },
    { id: 'columns', name: 'Columns', description: 'Multi-column list' },
  ],
  experience: [
    { id: 'standard', name: 'Standard', description: 'Full details with bullets' },
    { id: 'compact', name: 'Compact', description: 'Condensed layout' },
    { id: 'timeline', name: 'Timeline', description: 'Visual timeline' },
    { id: 'card', name: 'Card', description: 'Card-style entries' },
    { id: 'minimal', name: 'Minimal', description: 'Essential info only' },
    { id: 'two-column-dates', name: 'Two Column Dates', description: 'Dates on left, content on right' },
  ],
  education: [
    { id: 'standard', name: 'Standard', description: 'Full details' },
    { id: 'compact', name: 'Compact', description: 'Single line' },
    { id: 'detailed', name: 'Detailed', description: 'With description' },
    { id: 'timeline', name: 'Timeline', description: 'Visual timeline' },
    { id: 'card', name: 'Card', description: 'Card style' },
    { id: 'minimal', name: 'Minimal', description: 'Degree and school only' },
    { id: 'two-column-dates', name: 'Two Column Dates', description: 'Dates on left, content on right' },
  ],
};
