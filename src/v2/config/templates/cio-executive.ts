/**
 * CIO Executive Template Configuration
 *
 * Professional executive template with:
 * - Photo left, name/title/summary right with gray contact bar (new header variant)
 * - Two-column layout with left-border section headings
 * - Columns skills, standard education, columns languages
 * - Gray/black professional color scheme
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const cioExecutiveConfig: TemplateConfig = createTemplateConfig({
  id: 'cio-executive-v2',
  name: 'CIO Executive',
  description: 'Professional executive template for C-level and senior technology leaders',
  category: 'executive',

  // Typography
  typography: {
    name: {
      fontSize: '34px',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#1f2937',
    },
    title: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#374151',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#9ca3af',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#4b5563',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#374151',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  // Spacing
  spacing: {
    pagePadding: {
      top: '24px',
      right: '28px',
      bottom: '24px',
      left: '28px',
    },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '10px',
    bulletGap: '4px',
    contactGap: '16px',
    skillGap: '6px',
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

  // Colors - Professional gray/black
  colors: {
    primary: '#374151',
    secondary: '#6b7280',
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: 'transparent',
      sidebar: 'transparent',
      accent: '#f9fafb',
    },
    border: '#e5e7eb',
  },

  // Section heading style - Left border
  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    borderColor: '#374151',
    marginBottom: '12px',
    padding: '2px 0 2px 10px',
  },

  // Header configuration - Photo with contact bar (new variant)
  header: {
    variant: 'photo-summary-contact-bar',
    showPhoto: true,
    photoSize: '95px',
    photoShape: 'circle',
    photoPosition: 'left',
    backgroundColor: '#f3f4f6',
    padding: '24px 28px',
    marginBottom: '0',
    contactIcons: {
      show: true,
      size: '16px',
      color: '#374151',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills - Columns layout with bullets
  skills: {
    variant: 'columns',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '0',
      borderRadius: '0',
      borderWidth: '0',
      backgroundColor: 'transparent',
      textColor: '#4b5563',
    },
  },

  // Experience - Standard with bullet points
  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
  },

  // Education - Standard style
  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  // Projects - Standard
  projects: {
    variant: 'standard',
    showTechnologies: true,
    showLinks: true,
  },

  // Certifications - Standard
  certifications: {
    variant: 'standard',
    showDates: true,
  },

  // Languages - Columns style
  languages: {
    variant: 'columns',
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
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    // Sidebar
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 1, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 2, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 3, column: 'sidebar' },
    { type: 'interests', id: 'interests', title: 'Interests', defaultTitle: 'Interests', enabled: true, order: 4, column: 'sidebar' },
    { type: 'awards', id: 'awards', title: 'Awards', defaultTitle: 'Awards', enabled: true, order: 5, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default cioExecutiveConfig;
