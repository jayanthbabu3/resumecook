/**
 * Retail Manager Pro Template Configuration
 *
 * Clean two-column layout with:
 * - Header with name, title, summary paragraph, and horizontal contact icons
 * - Left column: Work Experience, Education
 * - Right column: Skills, Projects, Certifications, Languages, Interests
 * - Teal accent color scheme
 * - Based on Carolyn Potter design
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const retailManagerProConfig: TemplateConfig = createTemplateConfig({
  id: 'retail-manager-pro-v2',
  name: 'Retail Manager Pro',
  description: 'Clean two-column layout with summary header, perfect for retail and management professionals',
  category: 'professional',

  // Typography - Clean and professional
  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1a1a1a',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0d9488', // Teal accent
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#1a1a1a',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0d9488', // Teal accent for company names
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
      color: '#4b5563',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#6b7280',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  // Spacing - Standard for two-column
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

  // Layout - Two column with right sidebar
  layout: {
    type: 'two-column-right',
    mainWidth: '60%',
    sidebarWidth: '37%',
    columnGap: '24px',
    sidebarBackground: 'transparent',
    sidebarPadding: '0',
  },

  // Colors - Teal theme
  colors: {
    primary: '#0d9488',
    secondary: '#14b8a6',
    text: {
      primary: '#1a1a1a',
      secondary: '#4b5563',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: 'transparent',
      sidebar: 'transparent',
      accent: '#f0fdfa',
    },
    border: '#e5e7eb',
  },

  // Section heading style - Clean underline
  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#e5e7eb',
    marginBottom: '12px',
    padding: '0 0 6px 0',
  },

  // Header configuration - Clean summary contact variant
  header: {
    variant: 'clean-summary-contact',
    showPhoto: false,
    padding: '0 0 20px 0',
    marginBottom: '8px',
    contactIcons: {
      show: true,
      size: '13px',
      color: '#0d9488',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills - Pill style with teal background
  skills: {
    variant: 'pills',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 10px',
      borderRadius: '12px',
      borderWidth: '0',
      backgroundColor: '#0d9488',
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

  // Education - Compact style
  education: {
    variant: 'compact',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'inline',
  },

  // Projects - Standard display
  projects: {
    variant: 'standard',
    showTechnologies: true,
    showLinks: true,
  },

  // Certifications - Compact style
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

  // Section order and placement
  sections: [
    // Header always first (handled separately)
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },

    // Main column sections (left)
    { type: 'experience', id: 'experience', title: 'Work Experience', defaultTitle: 'Work Experience', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },

    // Sidebar sections (right)
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 1, column: 'sidebar' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 2, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certificates', defaultTitle: 'Certificates', enabled: true, order: 3, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 4, column: 'sidebar' },
    { type: 'interests', id: 'interests', title: 'Interests', defaultTitle: 'Interests', enabled: true, order: 5, column: 'sidebar' },

  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default retailManagerProConfig;
