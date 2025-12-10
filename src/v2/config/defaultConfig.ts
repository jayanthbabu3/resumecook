/**
 * Resume Builder V2 - Default Configuration
 * 
 * This is the base configuration that all templates inherit from.
 * Templates can override any of these values.
 */

import type { TemplateConfig, TypographyConfig, SpacingConfig, LayoutConfig, ColorConfig } from '../types';

// ============================================================================
// DEFAULT TYPOGRAPHY
// ============================================================================

export const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  name: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: '#000000',
  },
  title: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.4,
    color: '#2563eb', // Accent color
  },
  sectionHeading: {
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#000000',
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.4,
    color: '#000000',
  },
  itemSubtitle: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1.4,
    color: '#2563eb', // Accent color
  },
  dates: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#6b7280',
  },
  body: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.6,
    color: '#1a1a1a',
  },
  contact: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#1a1a1a',
  },
  small: {
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#6b7280',
  },
};

// ============================================================================
// DEFAULT SPACING
// ============================================================================

export const DEFAULT_SPACING: SpacingConfig = {
  pagePadding: {
    top: '32px',
    right: '32px',
    bottom: '32px',
    left: '32px',
  },
  sectionGap: '20px',
  itemGap: '16px',
  headingToContent: '12px',
  bulletGap: '4px',
  contactGap: '16px',
  skillGap: '8px',
};

// ============================================================================
// DEFAULT LAYOUT
// ============================================================================

export const DEFAULT_LAYOUT: LayoutConfig = {
  type: 'single-column',
  mainWidth: '100%',
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
 * Apply theme color to a template config
 */
export function applyThemeColor(config: TemplateConfig, themeColor: string): TemplateConfig {
  return {
    ...config,
    colors: {
      ...config.colors,
      primary: themeColor,
      background: {
        ...config.colors.background,
        accent: `${themeColor}15`, // 15% opacity
      },
    },
    typography: {
      ...config.typography,
      title: {
        ...config.typography.title,
        color: themeColor,
      },
      itemSubtitle: {
        ...config.typography.itemSubtitle,
        color: themeColor,
      },
    },
  };
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
