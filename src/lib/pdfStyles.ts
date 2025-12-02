/**
 * PDF Styles Configuration
 * 
 * Centralized configuration for resume PDF styling.
 * Based on industry standards and ATS-friendly formatting.
 * 
 * Industry Standards Reference:
 * - A4 size: 210mm x 297mm (8.27" x 11.69")
 * - Recommended margins: 0.5" to 1" (12.7mm to 25.4mm)
 * - Font sizes: 10-12pt for body, 14-16pt for headings, 18-24pt for name
 * - Line height: 1.15-1.5 for readability
 * - ATS-friendly fonts: Arial, Calibri, Helvetica, Times New Roman, Georgia
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface FontConfig {
  family: string;
  size: string;
  weight: string | number;
  lineHeight: string | number;
  letterSpacing?: string;
  color?: string;
}

export interface SpacingConfig {
  padding: string;
  margin: string;
  gap: string;
}

export interface PDFLayoutConfig {
  type: 'single-column' | 'two-column';
  pageWidth: string;
  pageHeight: string;
  margins: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  contentWidth: string;
  sidebarWidth?: string; // For two-column layouts
}

export interface PDFStyleConfig {
  // Layout
  layout: PDFLayoutConfig;
  
  // Typography
  fonts: {
    primary: string;
    secondary?: string;
    monospace?: string;
  };
  
  // Header Section (Name, Title, Contact)
  header: {
    name: FontConfig;
    title: FontConfig;
    contact: FontConfig;
    spacing: SpacingConfig;
  };
  
  // Section Headings
  sectionHeading: FontConfig & {
    borderWidth?: string;
    borderColor?: string;
    spacing: SpacingConfig;
  };
  
  // Experience/Education Items
  itemTitle: FontConfig;      // Job title, Degree
  itemSubtitle: FontConfig;   // Company name, Institution
  itemDate: FontConfig;       // Date ranges
  itemDescription: FontConfig; // Bullet points, descriptions
  
  // Skills Section
  skills: {
    label: FontConfig;
    tag: FontConfig & {
      background?: string;
      borderRadius?: string;
      padding?: string;
    };
  };
  
  // General Spacing
  spacing: {
    sectionGap: string;      // Gap between major sections
    itemGap: string;         // Gap between items within a section
    bulletGap: string;       // Gap between bullet points
    lineHeight: string;      // Default line height
  };
  
  // Colors
  colors: {
    primary: string;         // Theme/accent color
    text: {
      primary: string;       // Main text
      secondary: string;     // Muted text
      light: string;         // Light text (on dark backgrounds)
    };
    background: {
      primary: string;       // Main background
      secondary: string;     // Section backgrounds
      accent: string;        // Accent backgrounds
    };
    border: string;
  };
}

// ============================================================================
// DEFAULT CONFIGURATIONS
// ============================================================================

/**
 * Single Column Layout - Default Configuration
 * 
 * Best for: Traditional resumes, ATS optimization, senior professionals
 * Based on the Executive template style shown in the screenshot
 */
export const SINGLE_COLUMN_CONFIG: PDFStyleConfig = {
  layout: {
    type: 'single-column',
    pageWidth: '210mm',
    pageHeight: '297mm',
    margins: {
      top: '0',        // Header goes edge-to-edge
      right: '0',
      bottom: '20mm',
      left: '0',
    },
    contentWidth: '100%',
  },
  
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Georgia', 'Times New Roman', serif",
    monospace: "'Fira Code', 'Consolas', monospace",
  },
  
  header: {
    name: {
      family: 'inherit',
      size: '32px',          // ~24pt - Industry standard for name
      weight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: 'white',
    },
    title: {
      family: 'inherit',
      size: '16px',          // ~12pt
      weight: 400,
      lineHeight: 1.4,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    contact: {
      family: 'inherit',
      size: '13px',          // ~10pt
      weight: 400,
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.85)',
    },
    spacing: {
      padding: '32px 40px',
      margin: '0',
      gap: '8px',
    },
  },
  
  sectionHeading: {
    family: 'inherit',
    size: '16px',            // ~12pt - Clear but not overpowering
    weight: 600,
    lineHeight: 1.3,
    letterSpacing: '0.01em',
    color: '#1a1a1a',
    borderWidth: '0.75px',
    borderColor: 'currentColor', // Uses theme color
    spacing: {
      padding: '0 0 0 12px',
      margin: '0 0 16px 0',
      gap: '0',
    },
  },
  
  itemTitle: {
    family: 'inherit',
    size: '15px',            // ~11pt
    weight: 600,
    lineHeight: 1.4,
    color: '#1a1a1a',
  },
  
  itemSubtitle: {
    family: 'inherit',
    size: '14px',            // ~10.5pt
    weight: 500,
    lineHeight: 1.4,
    color: 'inherit',        // Uses theme color
  },
  
  itemDate: {
    family: 'inherit',
    size: '12px',            // ~9pt
    weight: 400,
    lineHeight: 1.4,
    color: 'inherit',        // Uses theme color
  },
  
  itemDescription: {
    family: 'inherit',
    size: '13px',            // ~10pt - Optimal for body text
    weight: 400,
    lineHeight: 1.6,         // Good readability
    color: '#4a4a4a',
  },
  
  skills: {
    label: {
      family: 'inherit',
      size: '13px',
      weight: 500,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    tag: {
      family: 'inherit',
      size: '12px',
      weight: 500,
      lineHeight: 1.4,
      color: 'inherit',      // Uses theme color
      background: 'transparent',
      borderRadius: '9999px',
      padding: '6px 16px',
    },
  },
  
  spacing: {
    sectionGap: '28px',      // Gap between sections
    itemGap: '20px',         // Gap between experience/education items
    bulletGap: '6px',        // Gap between bullet points
    lineHeight: '1.6',
  },
  
  colors: {
    primary: '#10b981',      // Emerald green (from screenshot)
    text: {
      primary: '#1a1a1a',
      secondary: '#6b7280',
      light: '#ffffff',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      accent: '#10b981',
    },
    border: '#e5e7eb',
  },
};

/**
 * Two Column Layout - Default Configuration
 * 
 * Best for: Creative roles, designers, developers with many skills
 * Sidebar typically contains: Contact, Skills, Languages, Certifications
 */
export const TWO_COLUMN_CONFIG: PDFStyleConfig = {
  layout: {
    type: 'two-column',
    pageWidth: '210mm',
    pageHeight: '297mm',
    margins: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    },
    contentWidth: '65%',
    sidebarWidth: '35%',
  },
  
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Georgia', 'Times New Roman', serif",
    monospace: "'Fira Code', 'Consolas', monospace",
  },
  
  header: {
    name: {
      family: 'inherit',
      size: '28px',          // Slightly smaller for two-column
      weight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1a1a1a',
    },
    title: {
      family: 'inherit',
      size: '14px',
      weight: 500,
      lineHeight: 1.4,
      color: 'inherit',      // Theme color
    },
    contact: {
      family: 'inherit',
      size: '12px',
      weight: 400,
      lineHeight: 1.5,
      color: '#6b7280',
    },
    spacing: {
      padding: '24px',
      margin: '0',
      gap: '6px',
    },
  },
  
  sectionHeading: {
    family: 'inherit',
    size: '14px',
    weight: 600,
    lineHeight: 1.3,
    letterSpacing: '0.02em',
    color: '#1a1a1a',
    borderWidth: '0.75px',
    borderColor: 'currentColor',
    spacing: {
      padding: '0 0 8px 0',
      margin: '0 0 12px 0',
      gap: '0',
    },
  },
  
  itemTitle: {
    family: 'inherit',
    size: '14px',
    weight: 600,
    lineHeight: 1.4,
    color: '#1a1a1a',
  },
  
  itemSubtitle: {
    family: 'inherit',
    size: '13px',
    weight: 500,
    lineHeight: 1.4,
    color: 'inherit',
  },
  
  itemDate: {
    family: 'inherit',
    size: '11px',
    weight: 400,
    lineHeight: 1.4,
    color: '#6b7280',
  },
  
  itemDescription: {
    family: 'inherit',
    size: '12px',
    weight: 400,
    lineHeight: 1.55,
    color: '#4a4a4a',
  },
  
  skills: {
    label: {
      family: 'inherit',
      size: '12px',
      weight: 500,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    tag: {
      family: 'inherit',
      size: '11px',
      weight: 500,
      lineHeight: 1.4,
      color: '#4a4a4a',
      background: '#f3f4f6',
      borderRadius: '4px',
      padding: '4px 10px',
    },
  },
  
  spacing: {
    sectionGap: '24px',
    itemGap: '16px',
    bulletGap: '4px',
    lineHeight: '1.55',
  },
  
  colors: {
    primary: '#3b82f6',      // Blue
    text: {
      primary: '#1a1a1a',
      secondary: '#6b7280',
      light: '#ffffff',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      accent: '#3b82f6',
    },
    border: '#e5e7eb',
  },
};

/**
 * Compact Layout - For resumes with lots of content
 * 
 * Best for: Senior professionals, academics, those with extensive experience
 */
export const COMPACT_CONFIG: PDFStyleConfig = {
  ...SINGLE_COLUMN_CONFIG,
  
  header: {
    ...SINGLE_COLUMN_CONFIG.header,
    name: {
      ...SINGLE_COLUMN_CONFIG.header.name,
      size: '26px',
    },
    title: {
      ...SINGLE_COLUMN_CONFIG.header.title,
      size: '14px',
    },
    contact: {
      ...SINGLE_COLUMN_CONFIG.header.contact,
      size: '11px',
    },
    spacing: {
      padding: '24px 32px',
      margin: '0',
      gap: '6px',
    },
  },
  
  sectionHeading: {
    ...SINGLE_COLUMN_CONFIG.sectionHeading,
    size: '14px',
    borderWidth: '0.75px',
    spacing: {
      padding: '0 0 0 10px',
      margin: '0 0 12px 0',
      gap: '0',
    },
  },
  
  itemTitle: {
    ...SINGLE_COLUMN_CONFIG.itemTitle,
    size: '13px',
  },
  
  itemSubtitle: {
    ...SINGLE_COLUMN_CONFIG.itemSubtitle,
    size: '12px',
  },
  
  itemDate: {
    ...SINGLE_COLUMN_CONFIG.itemDate,
    size: '11px',
  },
  
  itemDescription: {
    ...SINGLE_COLUMN_CONFIG.itemDescription,
    size: '11px',
    lineHeight: 1.5,
  },
  
  spacing: {
    sectionGap: '20px',
    itemGap: '14px',
    bulletGap: '4px',
    lineHeight: '1.5',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the default config based on layout type
 */
export function getDefaultConfig(layoutType: 'single-column' | 'two-column' | 'compact' = 'single-column'): PDFStyleConfig {
  switch (layoutType) {
    case 'two-column':
      return TWO_COLUMN_CONFIG;
    case 'compact':
      return COMPACT_CONFIG;
    default:
      return SINGLE_COLUMN_CONFIG;
  }
}

/**
 * Merge custom config with default config
 * Allows templates to override specific values while keeping defaults
 */
export function mergeConfig(
  customConfig: Partial<PDFStyleConfig>,
  baseConfig: PDFStyleConfig = SINGLE_COLUMN_CONFIG
): PDFStyleConfig {
  return {
    ...baseConfig,
    ...customConfig,
    layout: {
      ...baseConfig.layout,
      ...customConfig.layout,
      margins: {
        ...baseConfig.layout.margins,
        ...customConfig.layout?.margins,
      },
    },
    fonts: {
      ...baseConfig.fonts,
      ...customConfig.fonts,
    },
    header: {
      ...baseConfig.header,
      ...customConfig.header,
      name: { ...baseConfig.header.name, ...customConfig.header?.name },
      title: { ...baseConfig.header.title, ...customConfig.header?.title },
      contact: { ...baseConfig.header.contact, ...customConfig.header?.contact },
      spacing: { ...baseConfig.header.spacing, ...customConfig.header?.spacing },
    },
    sectionHeading: {
      ...baseConfig.sectionHeading,
      ...customConfig.sectionHeading,
      spacing: { ...baseConfig.sectionHeading.spacing, ...customConfig.sectionHeading?.spacing },
    },
    itemTitle: { ...baseConfig.itemTitle, ...customConfig.itemTitle },
    itemSubtitle: { ...baseConfig.itemSubtitle, ...customConfig.itemSubtitle },
    itemDate: { ...baseConfig.itemDate, ...customConfig.itemDate },
    itemDescription: { ...baseConfig.itemDescription, ...customConfig.itemDescription },
    skills: {
      ...baseConfig.skills,
      ...customConfig.skills,
      label: { ...baseConfig.skills.label, ...customConfig.skills?.label },
      tag: { ...baseConfig.skills.tag, ...customConfig.skills?.tag },
    },
    spacing: { ...baseConfig.spacing, ...customConfig.spacing },
    colors: {
      ...baseConfig.colors,
      ...customConfig.colors,
      text: { ...baseConfig.colors.text, ...customConfig.colors?.text },
      background: { ...baseConfig.colors.background, ...customConfig.colors?.background },
    },
  };
}

/**
 * Generate CSS variables from config
 * Can be injected into the PDF HTML for consistent styling
 */
export function generateCSSVariables(config: PDFStyleConfig, themeColor?: string): string {
  const primaryColor = themeColor || config.colors.primary;
  
  return `
    :root {
      /* Fonts */
      --pdf-font-primary: ${config.fonts.primary};
      --pdf-font-secondary: ${config.fonts.secondary || config.fonts.primary};
      
      /* Header */
      --pdf-header-name-size: ${config.header.name.size};
      --pdf-header-name-weight: ${config.header.name.weight};
      --pdf-header-name-line-height: ${config.header.name.lineHeight};
      --pdf-header-title-size: ${config.header.title.size};
      --pdf-header-title-weight: ${config.header.title.weight};
      --pdf-header-contact-size: ${config.header.contact.size};
      --pdf-header-padding: ${config.header.spacing.padding};
      
      /* Section Heading */
      --pdf-section-heading-size: ${config.sectionHeading.size};
      --pdf-section-heading-weight: ${config.sectionHeading.weight};
      --pdf-section-border-width: ${config.sectionHeading.borderWidth};
      --pdf-section-margin: ${config.sectionHeading.spacing.margin};
      
      /* Items */
      --pdf-item-title-size: ${config.itemTitle.size};
      --pdf-item-title-weight: ${config.itemTitle.weight};
      --pdf-item-subtitle-size: ${config.itemSubtitle.size};
      --pdf-item-date-size: ${config.itemDate.size};
      --pdf-item-description-size: ${config.itemDescription.size};
      --pdf-item-description-line-height: ${config.itemDescription.lineHeight};
      
      /* Skills */
      --pdf-skill-tag-size: ${config.skills.tag.size};
      --pdf-skill-tag-padding: ${config.skills.tag.padding};
      --pdf-skill-tag-radius: ${config.skills.tag.borderRadius};
      
      /* Spacing */
      --pdf-section-gap: ${config.spacing.sectionGap};
      --pdf-item-gap: ${config.spacing.itemGap};
      --pdf-bullet-gap: ${config.spacing.bulletGap};
      --pdf-line-height: ${config.spacing.lineHeight};
      
      /* Colors */
      --pdf-color-primary: ${primaryColor};
      --pdf-color-text-primary: ${config.colors.text.primary};
      --pdf-color-text-secondary: ${config.colors.text.secondary};
      --pdf-color-text-light: ${config.colors.text.light};
      --pdf-color-bg-primary: ${config.colors.background.primary};
      --pdf-color-bg-secondary: ${config.colors.background.secondary};
      --pdf-color-border: ${config.colors.border};
    }
  `;
}

/**
 * Generate base CSS styles for PDF
 * These styles use the CSS variables and provide consistent formatting
 */
export function generateBasePDFStyles(config: PDFStyleConfig): string {
  return `
    /* Base PDF Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html, body {
      font-family: var(--pdf-font-primary);
      font-size: var(--pdf-item-description-size);
      line-height: var(--pdf-line-height);
      color: var(--pdf-color-text-primary);
      background: var(--pdf-color-bg-primary);
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    /* Resume Name */
    .resume-name {
      font-size: var(--pdf-header-name-size);
      font-weight: var(--pdf-header-name-weight);
      line-height: var(--pdf-header-name-line-height);
      letter-spacing: -0.02em;
    }
    
    /* Resume Title */
    .resume-title {
      font-size: var(--pdf-header-title-size);
      font-weight: var(--pdf-header-title-weight);
    }
    
    /* Contact Info */
    .resume-contact {
      font-size: var(--pdf-header-contact-size);
    }
    
    /* Section Headings */
    .section-heading {
      font-size: var(--pdf-section-heading-size);
      font-weight: var(--pdf-section-heading-weight);
      border-left: var(--pdf-section-border-width) solid var(--pdf-color-primary);
      padding-left: 12px;
      margin-bottom: 16px;
    }
    
    /* Item Titles (Job Title, Degree) */
    .item-title {
      font-size: var(--pdf-item-title-size);
      font-weight: var(--pdf-item-title-weight);
      color: var(--pdf-color-text-primary);
    }
    
    /* Item Subtitles (Company, Institution) */
    .item-subtitle {
      font-size: var(--pdf-item-subtitle-size);
      color: var(--pdf-color-primary);
    }
    
    /* Dates */
    .item-date {
      font-size: var(--pdf-item-date-size);
      color: var(--pdf-color-primary);
    }
    
    /* Descriptions */
    .item-description {
      font-size: var(--pdf-item-description-size);
      line-height: var(--pdf-item-description-line-height);
      color: var(--pdf-color-text-secondary);
    }
    
    /* Skill Tags */
    .skill-tag {
      font-size: var(--pdf-skill-tag-size);
      padding: var(--pdf-skill-tag-padding);
      border-radius: var(--pdf-skill-tag-radius);
      border: 1px solid var(--pdf-color-primary);
      color: var(--pdf-color-primary);
    }
    
    /* Section Spacing */
    .resume-section {
      margin-bottom: var(--pdf-section-gap);
    }
    
    .resume-section:last-child {
      margin-bottom: 0;
    }
    
    /* Item Spacing */
    .resume-item {
      margin-bottom: var(--pdf-item-gap);
    }
    
    .resume-item:last-child {
      margin-bottom: 0;
    }
    
    /* Bullet Points */
    .bullet-list {
      list-style: disc;
      padding-left: 20px;
    }
    
    .bullet-list li {
      margin-bottom: var(--pdf-bullet-gap);
    }
    
    .bullet-list li:last-child {
      margin-bottom: 0;
    }
  `;
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export const PDF_STYLES = {
  singleColumn: SINGLE_COLUMN_CONFIG,
  twoColumn: TWO_COLUMN_CONFIG,
  compact: COMPACT_CONFIG,
  getDefault: getDefaultConfig,
  merge: mergeConfig,
  generateCSSVariables,
  generateBasePDFStyles,
};

export default PDF_STYLES;
