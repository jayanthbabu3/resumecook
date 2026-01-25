/**
 * HR Professional Template Configuration
 *
 * Professional template with:
 * - Blue gradient banner header with split contact (new header variant)
 * - Two-column layout with underline section headings
 * - Pills skills, compact certifications, inline languages
 * - Teal/blue accent color scheme
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const hrProfessionalConfig: TemplateConfig = createTemplateConfig({
  id: 'hr-professional-v2',
  name: 'HR Professional',
  description: 'Professional template for HR and people operations specialists',
  category: 'professional',

  // Typography
  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#ffffff',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#a7f3d0',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#0891b2',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0891b2',
    },
    dates: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#374151',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#374151',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  // Spacing
  spacing: {
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
  },

  // Layout - Two column
  layout: {
    type: 'two-column-right',
    mainWidth: '58%',
    sidebarWidth: '38%',
    columnGap: '24px',
    sidebarBackground: 'transparent',
    sidebarPadding: '0',
  },

  // Colors - Teal/blue theme
  colors: {
    primary: '#0891b2',
    secondary: '#0e7490',
    text: {
      primary: '#1f2937',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: 'transparent',
      sidebar: 'transparent',
      accent: '#ecfeff',
    },
    border: '#e5e7eb',
  },

  // Section heading style - Clean underline with teal
  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#0891b2',
    marginBottom: '12px',
    padding: '0 0 6px 0',
  },

  // Header configuration - Gradient split contact (new variant)
  header: {
    variant: 'gradient-split-contact',
    showPhoto: false,
    padding: '0',
    marginBottom: '0',
    contactIcons: {
      show: true,
      size: '16px',
      color: '#0891b2',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills - Pills style with teal background
  skills: {
    variant: 'pills',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 10px',
      borderRadius: '12px',
      borderWidth: '0',
      backgroundColor: '#0891b2',
      textColor: '#ffffff',
    },
  },

  // Experience - Standard with dash bullets
  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '–',
  },

  // Education - Sidebar-minimal for clean sidebar display
  education: {
    variant: 'sidebar-minimal',
    showGPA: false,
    showField: false,
    showDates: true,
    datePosition: 'right',
  },

  // Projects - Standard
  projects: {
    variant: 'standard',
    showTechnologies: true,
    showLinks: true,
  },

  // Certifications - Compact
  certifications: {
    variant: 'compact',
    showDates: true,
  },

  // Languages - Inline style
  languages: {
    variant: 'inline',
  },

  // Interests - Tags style
  interests: {
    variant: 'tags',
  },

  // Section order and placement - All sections enabled
  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    // Main column
    { type: 'experience', id: 'experience', title: 'Work Experience', defaultTitle: 'Work Experience', enabled: true, order: 1, column: 'main' },
    { type: 'awards', id: 'awards', title: 'Awards', defaultTitle: 'Awards', enabled: true, order: 2, column: 'main' },
    // Sidebar
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 1, column: 'sidebar' },
    { type: 'projects', id: 'projects', title: 'Courses & Training', defaultTitle: 'Courses & Training', enabled: true, order: 2, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certificates', defaultTitle: 'Certificates', enabled: true, order: 3, column: 'sidebar' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 5, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default hrProfessionalConfig;
