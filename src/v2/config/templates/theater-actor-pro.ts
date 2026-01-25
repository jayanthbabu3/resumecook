/**
 * Theater Actor Pro Template Configuration
 *
 * Professional template with:
 * - Photo left, name/title/summary right with gray contact bar (new header variant)
 * - Two-column layout with underline section headings
 * - Pills skills, compact education, inline languages
 * - Teal accent color scheme
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const theaterActorProConfig: TemplateConfig = createTemplateConfig({
  id: 'theater-actor-pro-v2',
  name: 'Theater Actor Pro',
  description: 'Professional template with photo header and portfolio-style layout',
  category: 'creative',

  // Typography
  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#1e3a5f',
    },
    title: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#1e3a5f',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#1e3a5f',
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
      color: '#1e3a5f',
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

  // Colors - Navy blue theme (professional & widely used)
  colors: {
    primary: '#1e3a5f',
    secondary: '#2563eb',
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
      accent: '#f0f4f8',
    },
    border: '#e5e7eb',
  },

  // Section heading style - Clean underline
  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#1e3a5f',
    marginBottom: '12px',
    padding: '0 0 6px 0',
  },

  // Header configuration - CIO style with dark contact bar
  header: {
    variant: 'photo-dark-contact-bar',
    showPhoto: true,
    photoSize: '110px',
    photoShape: 'rounded',
    photoPosition: 'left',
    padding: '0',
    marginBottom: '0',
    contactIcons: {
      show: true,
      size: '18px',
      color: '#ffffff',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills - Bordered tags for a distinct look
  skills: {
    variant: 'bordered-tags',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 12px',
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: '#1e3a5f',
      backgroundColor: 'transparent',
      textColor: '#1e3a5f',
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

  // Projects/Courses - Compact cards style
  projects: {
    variant: 'compact',
    showTechnologies: true,
    showLinks: false,
  },

  // Certifications - Badges style for visual distinction
  certifications: {
    variant: 'badges',
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
    { type: 'projects', id: 'projects', title: 'Courses & Training', defaultTitle: 'Courses & Training', enabled: true, order: 2, column: 'main' },
    { type: 'awards', id: 'awards', title: 'Awards', defaultTitle: 'Awards', enabled: true, order: 3, column: 'main' },
    // Sidebar
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 1, column: 'sidebar' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certificates', defaultTitle: 'Certificates', enabled: true, order: 3, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 4, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default theaterActorProConfig;
