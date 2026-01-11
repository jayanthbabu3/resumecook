/**
 * Fresher Starter Template Configuration
 *
 * Bold modern design with vibrant purple-pink gradient for fresh graduates.
 * Eye-catching banner header with geometric decorations.
 * Perfect for standing out in entry-level applications.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherStarterConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-starter-v2',
  name: 'Fresher Starter',
  description: 'Bold modern design with vibrant gradient for fresh graduates starting their career.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '38px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      color: '#ffffff',
    },
    title: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#fcd34d', // Bright yellow accent on purple
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 800,
      lineHeight: 1.3,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#7c3aed',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#1e1b4b',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#7c3aed',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#374151',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#e9d5ff',
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
      top: '0',
      right: '28px',
      bottom: '28px',
      left: '28px',
    },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '10px',
    bulletGap: '5px',
    contactGap: '14px',
    skillGap: '6px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#7c3aed', // Vibrant purple
    secondary: '#a855f7',
    text: {
      primary: '#1e1b4b',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#faf5ff',
      accent: '#ede9fe',
    },
    border: '#c4b5fd',
  },

  sectionHeading: {
    style: 'accent-bar',
    borderWidth: '4px',
    borderColor: '#a855f7',
    marginBottom: '12px',
    padding: '0 0 0 14px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '36px 32px',
    backgroundColor: '#6d28d9', // Deep purple
    textColor: '#ffffff',
    contactIcons: {
      show: true,
      size: '13px',
      color: '#c4b5fd',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 4,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '6px 14px',
      borderRadius: '20px',
      borderWidth: '0',
      backgroundColor: '#ede9fe',
      textColor: '#6d28d9',
    },
  },

  experience: {
    variant: 'modern',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  education: {
    variant: 'detailed',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  projects: {
    variant: 'modern',
    showLinks: true,
    showTech: true,
  },

  achievements: {
    variant: 'numbered',
    showIndicators: true,
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
    primary: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - geometric patterns for bold modern look
  decorations: {
    enabled: true,
    elements: ['geometric-corner', 'dot-pattern', 'corner-blob'],
    opacity: 0.9,
    gradientBackground: true,
  },
});

export default fresherStarterConfig;
