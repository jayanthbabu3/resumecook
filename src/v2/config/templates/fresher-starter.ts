/**
 * Fresher Starter Template Configuration
 *
 * Clean, professional design for fresh graduates.
 * Theme color used sparingly - primarily in header and section headings.
 * ATS-friendly and perfect for entry-level applications.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherStarterConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-starter-v2',
  name: 'Fresher Starter',
  description: 'Clean professional design for fresh graduates.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#ffffff',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      color: 'rgba(255, 255, 255, 0.9)',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#374151',
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
      color: '#4b5563',
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#4b5563',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: {
      top: '0px',
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
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f9fafb',
      accent: '#f3f4f6',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#e5e7eb',
    marginBottom: '12px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'banner',
    showPhoto: true,
    photoSize: '64px',
    photoShape: 'circle',
    photoPosition: 'left',
    padding: '24px 32px',
    // backgroundColor uses theme's primary color (colors.primary) by default
    textColor: '#ffffff',
    contactIcons: {
      show: true,
      size: '12px',
      color: 'rgba(255, 255, 255, 0.85)',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 4,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '5px 12px',
      borderRadius: '4px',
      borderWidth: '1px',
      backgroundColor: '#f9fafb',
      textColor: '#374151',
      borderColor: '#e5e7eb',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
  },

  education: {
    variant: 'detailed',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  projects: {
    variant: 'standard',
    showLinks: true,
    showTech: true,
  },

  certifications: {
    variant: 'compact',
  },

  achievements: {
    variant: 'compact',
    showIndicators: false,
  },

  strengths: {
    variant: 'inline-badges',
    showIcons: false,
  },

  languages: {
    variant: 'compact',
    showCertification: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Career Objective', defaultTitle: 'Career Objective', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internship', defaultTitle: 'Internship', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 8, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  // Minimal decorations for clean professional look
  decorations: {
    enabled: false,
    elements: [],
    opacity: 0,
    gradientBackground: false,
  },
});

export default fresherStarterConfig;
