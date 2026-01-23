/**
 * Resume Builder V2 - Default Configuration
 * 
 * This is the base configuration that all templates inherit from.
 * Templates can override any of these values.
 */

import type { TemplateConfig, TypographyConfig, SpacingConfig, LayoutConfig, ColorConfig, LanguagesConfig } from '../types';

// ============================================================================
// DEFAULT TYPOGRAPHY
// ============================================================================

// ============================================================================
// IDEAL RESUME FONT SIZES (Industry Standard)
// ============================================================================
// Body text: 10-12px (11px is ideal)
// Dates: 10-11px
// Section headings: 11-12px
// Item titles: 11-13px
// Name: 18-24px
// ============================================================================

export const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  name: {
    fontSize: '22px',    // 18-24px range
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: '#000000',
  },
  title: {
    fontSize: '12px',    // Professional title below name
    fontWeight: 500,
    lineHeight: 1.4,
    color: '#2563eb', // Accent color
  },
  sectionHeading: {
    fontSize: '11px',    // 11-12px range
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#000000',
  },
  itemTitle: {
    fontSize: '12px',    // 11-13px range (position titles, degree names)
    fontWeight: 600,
    lineHeight: 1.4,
    color: '#000000',
  },
  itemSubtitle: {
    fontSize: '11px',    // Company names, school names
    fontWeight: 500,
    lineHeight: 1.4,
    color: '#2563eb', // Accent color
  },
  dates: {
    fontSize: '10px',    // 10-11px range
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#6b7280',
  },
  body: {
    fontSize: '11px',    // 10-12px range (11px is ideal)
    fontWeight: 400,
    lineHeight: 1.6,
    color: '#1a1a1a',
  },
  contact: {
    fontSize: '10px',    // Contact info should be compact
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#1a1a1a',
  },
  small: {
    fontSize: '10px',    // Meta info, labels
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#6b7280',
  },
};

// ============================================================================
// DEFAULT SPACING
// ============================================================================

// ============================================================================
// IDEAL RESUME SPACING (Industry Standard)
// ============================================================================
// Page margins: 0.5-1 inch (32-40px on screen)
// Section gap: 16-20px (clear separation without wasting space)
// Item gap: 10-14px (distinguish items within sections)
// Heading to content: 6-10px (tight connection)
// Bullet gap: 3-4px (minimal, readable)
// Contact gap: 10-12px (moderate)
// Skill gap: 6-8px (compact)
// Column gap (two-column): 20-24px
// ============================================================================

export const DEFAULT_SPACING: SpacingConfig = {
  pagePadding: {
    top: '32px',       // ~0.5 inch
    right: '32px',
    bottom: '32px',
    left: '32px',
  },
  sectionGap: '18px',      // Standard section separation
  itemGap: '12px',         // Standard item separation
  headingToContent: '8px', // Tight heading-to-content
  bulletGap: '4px',        // Minimal bullet spacing
  contactGap: '12px',      // Moderate contact spacing
  skillGap: '8px',         // Compact skill spacing
};

// ============================================================================
// SPACING PRESETS (for template standardization)
// ============================================================================

/**
 * Compact spacing - for ATS-friendly, content-dense resumes
 * Use when maximizing content on page is priority
 */
export const COMPACT_SPACING: SpacingConfig = {
  pagePadding: {
    top: '24px',
    right: '28px',
    bottom: '24px',
    left: '28px',
  },
  sectionGap: '14px',
  itemGap: '10px',
  headingToContent: '6px',
  bulletGap: '3px',
  contactGap: '8px',
  skillGap: '6px',
};

/**
 * Standard spacing - for most professional resumes
 * Balanced readability and content density
 */
export const STANDARD_SPACING: SpacingConfig = {
  pagePadding: {
    top: '32px',
    right: '32px',
    bottom: '32px',
    left: '32px',
  },
  sectionGap: '18px',
  itemGap: '12px',
  headingToContent: '8px',
  bulletGap: '4px',
  contactGap: '12px',
  skillGap: '8px',
};

/**
 * Generous spacing - for minimal/creative resumes
 * More whitespace, elegant appearance
 */
export const GENEROUS_SPACING: SpacingConfig = {
  pagePadding: {
    top: '40px',
    right: '40px',
    bottom: '40px',
    left: '40px',
  },
  sectionGap: '22px',
  itemGap: '14px',
  headingToContent: '10px',
  bulletGap: '4px',
  contactGap: '16px',
  skillGap: '8px',
};

/**
 * Two-column layout standard settings
 */
export const TWO_COLUMN_LAYOUT = {
  columnGap: '24px',           // Standard gap between columns
  mainWidth: '62%',            // Main column width
  sidebarWidth: '35%',         // Sidebar width (3% gap accounted)
};

// ============================================================================
// DEFAULT LAYOUT
// ============================================================================

export const DEFAULT_LAYOUT: LayoutConfig = {
  type: 'single-column',
  mainWidth: '100%',
};

/**
 * Standard two-column layout configuration
 * Use for templates with sidebar
 */
export const TWO_COLUMN_RIGHT_LAYOUT: LayoutConfig = {
  type: 'two-column-right',
  mainWidth: '62%',
  sidebarWidth: '35%',
  columnGap: '24px',
};

// ============================================================================
// DEFAULT COLORS
// ============================================================================

export const DEFAULT_COLORS: ColorConfig = {
  primary: '#2563eb',
  text: {
    primary: '#000000',
    secondary: '#1a1a1a',
    muted: '#6b7280',
    light: '#ffffff',
  },
  background: {
    page: '#ffffff',
    section: '#f9fafb',
    accent: '#eff6ff',
  },
  border: '#e5e7eb',
};

// ============================================================================
// DEFAULT TEMPLATE CONFIG
// ============================================================================

export const DEFAULT_TEMPLATE_CONFIG: TemplateConfig = {
  id: 'default',
  name: 'Default Template',
  description: 'A clean, professional resume template',
  category: 'professional',
  
  typography: DEFAULT_TYPOGRAPHY,
  spacing: DEFAULT_SPACING,
  layout: DEFAULT_LAYOUT,
  colors: DEFAULT_COLORS,
  
  sectionHeading: {
    style: 'simple',
    marginBottom: '12px',
  },
  
  header: {
    variant: 'left-aligned',
    showPhoto: false,
    contactIcons: {
      show: true,
      size: '14px',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },
  
  skills: {
    variant: 'pills',
    columns: 3,
    showRatings: false,
    badge: {
      fontSize: '12px',
      padding: '4px 12px',
      borderRadius: '9999px',
      borderWidth: '1px',
    },
  },
  
  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
  },
  
  education: {
    variant: 'standard',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  languages: {
    variant: 'standard',
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 6, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7, column: 'sidebar' },
    { type: 'awards', id: 'awards', title: 'Awards', defaultTitle: 'Awards', enabled: false, order: 8, column: 'main' },
    { type: 'volunteer', id: 'volunteer', title: 'Volunteer', defaultTitle: 'Volunteer Experience', enabled: false, order: 9, column: 'main' },
    { type: 'interests', id: 'interests', title: 'Interests', defaultTitle: 'Interests', enabled: false, order: 10, column: 'sidebar' },
  ],
  
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Georgia', 'Times New Roman', serif",
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Deep merge two objects
 */
function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof target[key] === 'object' &&
        target[key] !== null
      ) {
        (result as any)[key] = deepMerge(target[key] as object, source[key] as object);
      } else {
        (result as any)[key] = source[key];
      }
    }
  }
  
  return result;
}

/**
 * Create a template config by merging with defaults
 */
export function createTemplateConfig(overrides: Partial<TemplateConfig> & { id: string; name: string }): TemplateConfig {
  return deepMerge(DEFAULT_TEMPLATE_CONFIG, overrides) as TemplateConfig;
}

/**
 * Apply theme color to a template config (legacy single color)
 */
export function applyThemeColor(config: TemplateConfig, themeColor: string): TemplateConfig {
  return applyThemeColors(config, { primary: themeColor });
}

/**
 * Apply multiple theme colors to a template config
 * Primary color: Main accent (headings, links, skill badges, section borders)
 * Secondary color: Sidebar/accent background
 */
export function applyThemeColors(
  config: TemplateConfig, 
  colors: { primary?: string; secondary?: string }
): TemplateConfig {
  let result = { ...config };
  
  // Apply primary color - affects all accent elements
  if (colors.primary) {
    result.colors = {
      ...result.colors,
      primary: colors.primary,
      background: {
        ...result.colors.background,
        accent: `${colors.primary}15`, // 15% opacity for light backgrounds
      },
    };
    
    // Update typography that uses primary color
    result.typography = {
      ...result.typography,
      title: {
        ...result.typography.title,
        color: colors.primary,
      },
      sectionHeading: {
        ...result.typography.sectionHeading,
        color: colors.primary,
      },
      itemSubtitle: {
        ...result.typography.itemSubtitle,
        color: colors.primary,
      },
    };
    
    // Update section heading border color
    if (result.sectionHeading) {
      result.sectionHeading = {
        ...result.sectionHeading,
        borderColor: colors.primary,
      };
    }
    
    // Update skill badge colors - this is critical for pills/tags
    if (result.skills?.badge) {
      result.skills = {
        ...result.skills,
        badge: {
          ...result.skills.badge,
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          textColor: '#ffffff',
        },
      };
    }
    
    // Update header contact icons if they use primary
    if (result.header?.contactIcons) {
      result.header = {
        ...result.header,
        contactIcons: {
          ...result.header.contactIcons,
          color: colors.primary,
        },
      };
    }
  }
  
  // Apply secondary color - affects sidebar/accent backgrounds and header
  if (colors.secondary) {
    result.colors = {
      ...result.colors,
      secondary: colors.secondary,
      background: {
        ...result.colors.background,
        sidebar: colors.secondary,
      },
    };

    // Update layout sidebar background
    if (result.layout.sidebarBackground) {
      result.layout = {
        ...result.layout,
        sidebarBackground: colors.secondary,
      };
    }

    // Update header background color for banner headers
    if (result.header?.backgroundColor) {
      result.header = {
        ...result.header,
        backgroundColor: colors.secondary,
      };
    }
  }

  return result;
}

/**
 * Get CSS variables from config
 */
export function getConfigCSSVariables(config: TemplateConfig): Record<string, string> {
  return {
    '--resume-font-primary': config.fontFamily.primary,
    '--resume-font-secondary': config.fontFamily.secondary || config.fontFamily.primary,
    '--resume-color-primary': config.colors.primary,
    '--resume-color-text-primary': config.colors.text.primary,
    '--resume-color-text-secondary': config.colors.text.secondary,
    '--resume-color-text-muted': config.colors.text.muted,
    '--resume-color-bg-page': config.colors.background.page,
    '--resume-color-border': config.colors.border,
    '--resume-spacing-section': config.spacing.sectionGap,
    '--resume-spacing-item': config.spacing.itemGap,
  };
}
