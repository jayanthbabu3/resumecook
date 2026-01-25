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

export type ColorSlotName = 'primary' | 'secondary' | 'headerBackground' | 'sidebarBackground';

export interface ColorSlot {
  /** Slot identifier */
  name: ColorSlotName;
  /** Display label for UI */
  label: string;
  /** Default color value */
  defaultColor: string;
  /** Description of what this color affects */
  description: string;
}

export interface ColorConfig {
  /** Primary accent color (theme color) */
  primary: string;
  /** Secondary accent color */
  secondary?: string;
  /** Accent color (tertiary) */
  accent?: string;
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
  | 'underline'         // Line under heading
  | 'left-border'       // Colored bar on left
  | 'background'        // Full background color
  | 'background-filled' // Solid dark background with white text
  | 'background-accent' // Solid accent color background
  | 'accent-bar'        // Accent bar on left
  | 'simple'            // Just text, no decoration
  | 'dotted'            // Dotted underline
  | 'double-line'       // Double line under
  | 'underline-thick'   // Thick underline
  | 'icon-left';        // Icon before text

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
  | 'inline'         // Inline text with separator
  | 'category-lines' // Grouped headings with inline lists
  | 'table'          // Table format with categories
  | 'modern'         // Modern cards with icons
  | 'detailed'       // With proficiency levels
  | 'compact'        // Compact single line
  | 'radar'          // Radar/spider chart style
  | 'bordered-tags'  // Production-ready bordered rectangular tags
  | 'pills-accent'   // Production-ready accent-colored pills
  | 'inline-dots'    // Production-ready inline with dot separators
  | 'boxed';         // Stacked bordered boxes - one skill per box

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
  | 'centered'         // Name centered, contact below
  | 'left-aligned'     // Name left, contact right
  | 'split'            // Name left, contact in columns
  | 'banner'           // Full-width colored banner
  | 'minimal'          // Just name and title
  | 'photo-left'       // Photo on left side
  | 'photo-right'      // Photo on right side
  | 'accent-bar'       // Thin accent bar top, name centered
  | 'compact'          // Name | Title | Contact inline
  | 'gradient-banner'  // Full-width gradient background
  | 'elegant-banner'   // Gradient banner with centered photo and icon badge
  | 'creative-underline' // Creative header with stylized underline and modern layout
  | 'banner-with-summary' // Dark banner with name, title, summary and contact info
  | 'clean-summary-contact' // Clean header with name, title, summary paragraph, and horizontal contact bar with icons
  | 'photo-summary-contact-bar' // Photo left, name/title/summary right, gray contact bar below
  | 'gradient-split-contact' // Blue gradient banner with content left and contact icons right
  | 'sidebar-card'       // Card-style header with accent sidebar stripe
  | 'modern-split'       // Modern split with name on left, contact grid on right
  | 'boxed-accent'       // Boxed header with accent border
  | 'summary-photo-right' // Name, title, summary with photo on right and contact separator line
  | 'boxed-contact-icons' // Serif name, title, contact in bordered boxes with icons, summary section below
  | 'modern-elegant'      // Bold name with accent underline, uppercase title, contact with dot separators
  | 'photo-dark-contact-bar' // Photo left, name/title/summary right, dark curved contact bar - CIO style
  | 'gradient-creative'      // Creative gradient header with decorative shapes and photo support
  | 'summary-banner'         // Professional header with integrated summary, name/title at top, accent contact bar
  | 'elegant-photo-card'     // Centered photo with shadow, name below, contact in pills
  | 'modern-minimal'         // Ultra-clean minimal with thin accent underline, contact with dots
  | 'refined-serif'          // Elegant serif typography with thin line separators
  | 'swiss-minimal'          // Swiss design with bold typography and geometric accents
  | 'mono-elegant'           // Monospace typography with elegant spacing
  | 'line-accent'            // Clean design with full-width accent lines
  | 'gradient-flow'          // Diagonal gradient accent with asymmetric modern layout
  | 'minimal-edge'           // Sharp geometric accents with split contact layout
  | 'ink-blot'               // Circular accent blob behind name with clean minimal typography
  | 'paper-fold'             // Diagonal corner fold effect with asymmetric elegant layout
  | 'dot-grid'               // Subtle dot grid pattern accent with clean modern typography
  | 'accent-stripe'          // Vertical accent stripe on left with bold name and stacked contact
  | 'aurora-glass'           // Aurora glass effect header
  | 'wave-accent'            // Wave accent design
  | 'geometric-bold';        // Bold geometric shapes header

export interface HeaderConfig {
  /** Header layout variant */
  variant: HeaderVariant;
  /** Show photo */
  showPhoto?: boolean;
  /** Photo size */
  photoSize?: string;
  /** Photo shape */
  photoShape?: 'circle' | 'square' | 'rounded';
  /** Photo position: 'left' or 'right' (for left-aligned, minimal, and banner variants) */
  photoPosition?: 'left' | 'right';
  /** Background color (for banner style) */
  backgroundColor?: string;
  /** Text color override */
  textColor?: string;
  /** Padding */
  padding?: string;
  /** Margin below the header section */
  marginBottom?: string;
  /** Border bottom (e.g., '2px solid #2563eb') */
  borderBottom?: string;
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
  | 'standard'         // Title, company, dates, bullets
  | 'compact'          // Condensed single-line header
  | 'detailed'         // Full details with descriptions
  | 'timeline'         // Visual timeline on left
  | 'card'             // Card-style with border (singular)
  | 'cards'            // Card-based layout (plural alias)
  | 'minimal'          // Just essentials
  | 'modern'           // Modern with accent borders
  | 'left-border'      // Left colored border accent
  | 'dates-left'       // Dates on left column
  | 'dates-right'      // Dates on right side
  | 'two-column-dates' // Dates/location on left column, content on right
  | 'accent-card'      // Lined header with accent bar and bullets
  | 'accent-side'      // Left-accent column with stacked content
  | 'academic'         // Academic/research focused
  | 'creative'         // Creative industry style
  | 'dots-timeline'    // Simple connected dots timeline
  | 'timeline-pro'     // Professional timeline with dates on left
  | 'enhanced'         // EnhanceCV-style variant
  | 'premium'          // Premium with numbered bullets
  | 'icon-accent'      // Creative card with company icon badge
  | 'icon-clean'       // Clean layout with circular icon
  | 'elegant-timeline' // Modern elegant timeline with subtle dots
  | 'clean-stacked';   // Clean minimal stacked with pipe separator

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
  bulletStyle?: '•' | '◦' | '▪' | '–' | '▸' | 'none' | 'numbered';
  /** Show description */
  showDescription?: boolean;
}

// ============================================================================
// EDUCATION DISPLAY CONFIGURATION
// ============================================================================

export type EducationVariant =
  | 'standard'         // Full details
  | 'compact'          // Single line
  | 'detailed'         // With description
  | 'timeline'         // Visual timeline
  | 'card'             // Card style
  | 'minimal'          // Just degree and school
  | 'two-column-dates' // Dates/location on left column, content on right
  | 'sidebar-minimal'; // Clean sidebar format: Degree • Year, Institution below

export interface EducationConfig {
  /** Display variant */
  variant: EducationVariant;
  /** Show GPA */
  showGPA?: boolean;
  /** Show field of study */
  showField?: boolean;
  /** Show dates */
  showDates?: boolean;
  /** Show honors */
  showHonors?: boolean;
  /** Show coursework */
  showCoursework?: boolean;
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
  | 'accent-border'  // Left accent border cards
  | 'accent-grid';   // Grid cards with top accent line

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
  | 'metrics'        // Metrics cards with percentages
  | 'numbered'       // Numbered list
  | 'timeline'       // Timeline style
  | 'minimal'        // Clean minimal text
  | 'boxed';         // Stacked bordered boxes

export interface AchievementsConfig {
  /** Display variant */
  variant: AchievementsVariant;
  /** Show icons/numbers */
  showIndicators?: boolean;
  /** Show dates */
  showDates?: boolean;
  /** Show metrics */
  showMetrics?: boolean;
}

// ============================================================================
// LANGUAGES DISPLAY CONFIGURATION
// ============================================================================

export type LanguagesVariant =
  | 'standard'       // Default with progress bars
  | 'bars'           // Horizontal progress bars
  | 'compact'        // Inline with proficiency text
  | 'grid'           // 2-column grid with dots
  | 'inline'         // Comma-separated inline
  | 'pills'          // Pill badges with proficiency colors
  | 'flags';         // Language with emoji flags

export interface LanguagesConfig {
  /** Display variant */
  variant: LanguagesVariant;
  /** Number of columns for grid layout */
  columns?: number;
  /** Show proficiency level */
  showProficiency?: boolean;
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
  | 'speaking'
  | 'patents'
  | 'interests'
  | 'references'
  | 'courses'
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
// DECORATIONS CONFIGURATION
// ============================================================================

export type DecorationElement =
  | 'top-accent-line'      // Gradient line at top of resume
  | 'corner-blob'          // Organic blob shape in corner
  | 'corner-circles'       // Decorative circles pattern
  | 'bottom-wave'          // Wave pattern at bottom
  | 'dot-pattern'          // Subtle dot grid pattern
  | 'diagonal-shape'       // Bold diagonal geometric shape (like reference)
  | 'header-accent'        // Accent shape behind header area
  | 'side-stripe'          // Vertical stripe accent
  | 'geometric-corner'     // Elegant layered rectangles in corner
  | 'curved-lines'         // Flowing curved lines from corner
  | 'data-grid'            // Analyst-inspired grid with chart line
  | 'hexagon-cluster'      // Tech-inspired hexagon pattern
  | 'circuit-lines'        // Circuit board pattern on left side
  | 'left-gradient-bar'    // Bold gradient bar on left edge
  | 'left-dots-accent'     // Scattered dots on left side
  | 'bottom-left-corner'   // Decorative arc in bottom-left corner
  | 'bottom-gradient-fade' // Gradient fade at bottom of page
  | 'code-brackets'        // Decorative code brackets for dev resumes
  | 'header-wave'          // Wave pattern inside banner headers
  | 'diagonal-lines'       // Diagonal stripes for headers
  | 'header-circles'       // Overlapping circles for headers
  | 'header-dots-grid'     // Dot grid pattern for headers
  | 'full-page-gradient';  // Full page gradient background for PDF compatibility

export interface DecorationsConfig {
  /** Enable decorative elements */
  enabled: boolean;
  /** Which decorative elements to show */
  elements?: DecorationElement[];
  /** Opacity multiplier for all decorations (0-1) */
  opacity?: number;
  /** Use gradient background */
  gradientBackground?: boolean;
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
  languages?: LanguagesConfig;

  // Section order and visibility
  sections: SectionConfig[];

  // Font family
  fontFamily: {
    primary: string;
    secondary?: string;
  };

  // Theme color slots (1-3 customizable colors)
  colorSlots?: ColorSlot[];

  // Creative decorations (background elements, accent lines, etc.)
  decorations?: DecorationsConfig;
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
