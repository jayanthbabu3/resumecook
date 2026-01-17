/**
 * Resume Builder V2 - Template Configuration Types
 * 
 * Enhanced configuration types that work with the section registry.
 * These types define how a template looks and behaves.
 * 
 * Design Principles:
 * 1. Config defines WHAT to show and HOW it looks
 * 2. Section registry defines WHAT data is available
 * 3. Template component uses config to render
 * 4. AI can generate these configs from screenshots
 */

import type { CSSProperties } from 'react';
import type { V2SectionType } from './resumeData';

// ============================================================================
// TYPOGRAPHY
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
  /** Name display */
  name: FontConfig;
  /** Professional title */
  title: FontConfig;
  /** Section headings */
  sectionHeading: FontConfig;
  /** Item titles (job title, degree) */
  itemTitle: FontConfig;
  /** Item subtitles (company, school) */
  itemSubtitle: FontConfig;
  /** Date ranges */
  dates: FontConfig;
  /** Body text */
  body: FontConfig;
  /** Contact info */
  contact: FontConfig;
  /** Small/helper text */
  small: FontConfig;
}

// ============================================================================
// SPACING
// ============================================================================

export interface SpacingConfig {
  /** Page margins */
  pagePadding: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  /** Gap between sections */
  sectionGap: string;
  /** Gap between items in a section */
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
// LAYOUT
// ============================================================================

export type LayoutType = 
  | 'single-column' 
  | 'two-column-left'   // Sidebar on left
  | 'two-column-right'; // Sidebar on right

export interface LayoutConfig {
  /** Layout type */
  type: LayoutType;
  /** Main content width */
  mainWidth: string;
  /** Sidebar width (for two-column) */
  sidebarWidth?: string;
  /** Gap between columns */
  columnGap?: string;
  /** Sidebar background color */
  sidebarBackground?: string;
  /** Sidebar padding */
  sidebarPadding?: string;
  /** Sidebar text color override */
  sidebarTextColor?: string;
}

// ============================================================================
// COLORS
// ============================================================================

export interface ColorConfig {
  /** Primary accent color */
  primary: string;
  /** Secondary accent color */
  secondary?: string;
  /** Text colors */
  text: {
    primary: string;   // Headings - #000000
    secondary: string; // Body - #1a1a1a
    muted: string;     // Dates, labels - #6b7280
    light: string;     // On dark backgrounds - #ffffff
  };
  /** Background colors */
  background: {
    page: string;
    section?: string;
    sidebar?: string;
    accent?: string;
  };
  /** Border color */
  border: string;
}

// ============================================================================
// SECTION HEADING STYLES
// ============================================================================

export type SectionHeadingStyle =
  | 'simple'            // Just text
  | 'underline'         // Line under heading
  | 'left-border'       // Colored bar on left
  | 'background'        // Light background color
  | 'background-filled' // Solid dark background with white text
  | 'background-accent' // Solid accent color background
  | 'underline-thick'   // Thick underline
  | 'dotted'            // Dotted underline
  | 'double-line'       // Double line under
  | 'icon-left'         // Icon before text
  | 'accent-text';      // Colored text

export interface SectionHeadingConfig {
  style: SectionHeadingStyle;
  borderWidth?: string;
  borderColor?: string;
  backgroundColor?: string;
  padding?: string;
  marginBottom?: string;
}

// ============================================================================
// SECTION CONFIGURATION (Per Template)
// ============================================================================

export interface TemplateSectionConfig {
  /** Section type from registry */
  type: V2SectionType;
  
  /** Unique ID for this section instance */
  id: string;
  
  /** Display title (can be customized) */
  title: string;
  
  /** Is section enabled/visible */
  enabled: boolean;
  
  /** Display order (lower = higher) */
  order: number;
  
  /** Column placement for two-column layouts */
  column?: 'main' | 'sidebar';
  
  /** Variant to use (from section registry) */
  variant?: string;
  
  /** Custom styles override */
  customStyles?: CSSProperties;
  
  /** Force page break before this section */
  pageBreakBefore?: boolean;
}

// ============================================================================
// COMPONENT-SPECIFIC CONFIGS
// ============================================================================

// Header variants
export type HeaderVariant =
  | 'left-aligned'
  | 'centered'
  | 'split'
  | 'banner'
  | 'minimal'
  | 'photo-left'
  | 'photo-right'
  | 'accent-bar'
  | 'compact'
  | 'gradient-banner'
  | 'elegant-banner'
  | 'creative-underline'
  | 'banner-with-summary'
  | 'sidebar-card'       // Card-style header with accent sidebar stripe
  | 'modern-split'       // Modern split with name on left, contact grid on right
  | 'boxed-accent'       // Boxed header with accent border
  | 'summary-photo-right' // Name, title, summary with photo on right and contact separator line
  | 'boxed-contact-icons' // Serif name, title, contact in bordered boxes with icons, summary section below
  | 'modern-elegant'      // Bold name with accent underline, uppercase title, contact with dot separators
  | 'clean-summary-contact' // Clean header with name, title, summary paragraph, and horizontal contact bar with icons
  | 'photo-summary-contact-bar' // Photo left, name/title/summary right, gray contact bar below
  | 'gradient-split-contact' // Blue gradient banner with content left and contact icons right
  | 'photo-dark-contact-bar' // Photo left, name/title/summary right, dark curved contact bar - CIO style
  | 'gradient-creative'      // Creative gradient header with decorative shapes and photo support
  | 'summary-banner'         // Professional header with integrated summary, name/title at top, accent contact bar
  | 'elegant-photo-card'     // Centered photo with shadow, name below, contact in pills
  | 'modern-minimal'         // Ultra-clean minimal with thin accent underline, contact with dots
  | 'refined-serif'          // Elegant serif typography with thin line separators
  | 'swiss-minimal'          // Swiss design with bold typography and geometric accents
  | 'mono-elegant'           // Monospace typography with elegant spacing
  | 'line-accent';           // Clean design with full-width accent lines

export interface HeaderConfig {
  variant: HeaderVariant;
  showPhoto?: boolean;
  photoSize?: string;
  photoShape?: 'circle' | 'square' | 'rounded';
  /** Photo position: 'left' or 'right' (for left-aligned, minimal, and banner variants) */
  photoPosition?: 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  /** Margin below the header section */
  marginBottom?: string;
  contactIcons?: {
    show: boolean;
    size: string;
    color?: string;
  };
  showSocialLinks?: boolean;
  socialLinksVariant?: 'horizontal' | 'vertical' | 'icons-only' | 'badges';
}

// Skills variants
export type SkillsVariant =
  | 'pills'
  | 'tags'
  | 'list'
  | 'grouped'
  | 'bars'
  | 'dots'
  | 'columns'
  | 'inline'
  | 'category-lines'
  | 'table'           // Table format with categories
  | 'modern'
  | 'detailed'
  | 'compact'
  | 'radar'
  | 'bordered-tags'
  | 'pills-accent'
  | 'inline-dots'
  | 'boxed';          // Stacked bordered boxes - one skill per box

export interface SkillsConfig {
  variant: SkillsVariant;
  columns?: number;
  showRatings?: boolean;
  separator?: string;
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

// Experience variants
export type ExperienceVariant =
  | 'standard'
  | 'compact'
  | 'timeline'
  | 'card'
  | 'minimal'
  | 'two-column-dates'
  | 'accent-card'
  | 'accent-side'
  | 'dots-timeline'    // Connected dots timeline
  | 'timeline-pro'     // Professional timeline with dates on left
  | 'enhanced'         // EnhanceCV-style variant
  | 'premium'          // Premium with numbered bullets
  | 'icon-accent';     // Creative card with icon badge

export interface ExperienceConfig {
  variant: ExperienceVariant;
  showLogo?: boolean;
  datePosition?: 'right' | 'below' | 'inline' | 'left';
  showLocation?: boolean;
  bulletStyle?: '•' | '◦' | '▪' | '–' | '▸' | 'none';
  showDescription?: boolean;
}

// Education variants
export type EducationVariant =
  | 'standard'
  | 'compact'
  | 'detailed'
  | 'timeline'
  | 'card'
  | 'minimal'
  | 'two-column-dates'
  | 'sidebar-minimal'; // Clean sidebar format: Degree • Year, Institution below

export interface EducationConfig {
  variant: EducationVariant;
  showGPA?: boolean;
  showField?: boolean;
  showDates?: boolean;
  showHonors?: boolean;
  showCoursework?: boolean;
  datePosition?: 'right' | 'below' | 'inline' | 'left';
}

// Languages variants
export type LanguagesVariant =
  | 'list'
  | 'pills'
  | 'bars'
  | 'grid'
  | 'inline';

export interface LanguagesConfig {
  variant: LanguagesVariant;
  showCertification?: boolean;
}

// Achievements variants
export type AchievementsVariant =
  | 'list'
  | 'bullets'
  | 'cards'
  | 'metrics'
  | 'numbered'
  | 'timeline'
  | 'minimal'
  | 'boxed';          // Stacked bordered boxes

export interface AchievementsConfig {
  variant: AchievementsVariant;
  showIndicators?: boolean;
  showDates?: boolean;
  showMetrics?: boolean;
}

// Strengths variants
export type StrengthsVariant =
  | 'cards'
  | 'list'
  | 'pills'
  | 'grid'
  | 'minimal'
  | 'accent-border'
  | 'accent-grid';

export interface StrengthsConfig {
  variant: StrengthsVariant;
  showIcons?: boolean;
  columns?: number;
}

// Projects variants
export type ProjectsVariant =
  | 'standard'
  | 'cards'
  | 'compact'
  | 'grid';

export interface ProjectsConfig {
  variant: ProjectsVariant;
  showTechnologies?: boolean;
  showLinks?: boolean;
  showDates?: boolean;
}

// Certifications variants
export type CertificationsVariant =
  | 'list'
  | 'cards'
  | 'compact'
  | 'badges';

export interface CertificationsConfig {
  variant: CertificationsVariant;
  showExpiry?: boolean;
  showCredentialId?: boolean;
}

// ============================================================================
// COMPLETE TEMPLATE CONFIG
// ============================================================================

/**
 * Complete Template Configuration
 * 
 * This is what defines a template's appearance and behavior.
 * Each template has one of these configs.
 * AI can generate these from screenshots.
 */
export interface V2TemplateConfig {
  /** Unique template identifier */
  id: string;
  
  /** Template display name */
  name: string;
  
  /** Template description */
  description?: string;
  
  /** Template category */
  category?: 'professional' | 'creative' | 'minimal' | 'modern' | 'classic' | 'academic';
  
  /** Template thumbnail URL */
  thumbnail?: string;
  
  /** Template tags for search */
  tags?: string[];
  
  // -------------------------------------------------------------------------
  // Core Styling
  // -------------------------------------------------------------------------
  
  /** Typography settings */
  typography: TypographyConfig;
  
  /** Spacing settings */
  spacing: SpacingConfig;
  
  /** Layout settings */
  layout: LayoutConfig;
  
  /** Color settings */
  colors: ColorConfig;
  
  /** Font families */
  fontFamily: {
    primary: string;
    secondary?: string;
  };
  
  // -------------------------------------------------------------------------
  // Section Styling
  // -------------------------------------------------------------------------
  
  /** Section heading style */
  sectionHeading: SectionHeadingConfig;
  
  // -------------------------------------------------------------------------
  // Component Configs
  // -------------------------------------------------------------------------
  
  /** Header configuration */
  header: HeaderConfig;
  
  /** Skills section configuration */
  skills: SkillsConfig;
  
  /** Experience section configuration */
  experience: ExperienceConfig;
  
  /** Education section configuration */
  education: EducationConfig;
  
  /** Languages section configuration (optional) */
  languages?: LanguagesConfig;
  
  /** Achievements section configuration (optional) */
  achievements?: AchievementsConfig;
  
  /** Strengths section configuration (optional) */
  strengths?: StrengthsConfig;
  
  /** Projects section configuration (optional) */
  projects?: ProjectsConfig;
  
  /** Certifications section configuration (optional) */
  certifications?: CertificationsConfig;
  
  // -------------------------------------------------------------------------
  // Section Order & Visibility
  // -------------------------------------------------------------------------
  
  /** Sections configuration */
  sections: TemplateSectionConfig[];
}

// ============================================================================
// TEMPLATE METADATA (For Template Picker)
// ============================================================================

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: V2TemplateConfig['category'];
  thumbnail: string;
  tags: string[];
  isPremium?: boolean;
  isNew?: boolean;
}

// ============================================================================
// RUNTIME CONFIG (With User Overrides)
// ============================================================================

/**
 * Runtime configuration with user customizations
 */
export interface RuntimeTemplateConfig extends V2TemplateConfig {
  /** User's theme color override */
  themeColorOverride?: string;
  
  /** User's section order override */
  sectionOrderOverride?: string[];
  
  /** User's enabled sections override */
  enabledSectionsOverride?: string[];
  
  /** User's section title overrides */
  sectionTitleOverrides?: Record<string, string>;
}

// ============================================================================
// AI GENERATION TYPES
// ============================================================================

/**
 * Simplified config for AI generation
 * AI generates this, then we expand to full config
 */
export interface AITemplateConfig {
  /** Layout type */
  layout: LayoutType;
  
  /** Primary color (hex) */
  primaryColor: string;
  
  /** Font style preference */
  fontStyle: 'modern' | 'classic' | 'minimal';
  
  /** Header style */
  headerVariant: HeaderVariant;
  
  /** Sections to include with their variants */
  sections: Array<{
    type: V2SectionType;
    variant: string;
    column?: 'main' | 'sidebar';
  }>;
  
  /** Section heading style */
  headingStyle: SectionHeadingStyle;
  
  /** Overall style notes */
  styleNotes?: string;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Section config update payload
 */
export interface SectionConfigUpdate {
  id: string;
  enabled?: boolean;
  order?: number;
  column?: 'main' | 'sidebar';
  title?: string;
  variant?: string;
  pageBreakBefore?: boolean;
}

/**
 * Template config update payload
 */
export interface TemplateConfigUpdate {
  themeColor?: string;
  sections?: SectionConfigUpdate[];
  typography?: Partial<TypographyConfig>;
  spacing?: Partial<SpacingConfig>;
}
