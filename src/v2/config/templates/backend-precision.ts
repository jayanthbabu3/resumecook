/**
 * Backend Precision Template Configuration (V2)
 *
 * Creative single-column layout with gradient accents and modern aesthetics.
 * Deep emerald/teal theme representing reliability and precision.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const backendPrecisionConfig: TemplateConfig = createTemplateConfig({
  id: 'backend-precision-v2',
  name: 'Backend Precision',
  description: 'Creative single-column layout with gradient accents for backend engineers.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '34px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#ffffff',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#5eead4', // Teal accent
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: '#0d9488',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#134e4a',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#0d9488',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#334155',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#ccfbf1',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
    },
  },

  spacing: {
    pagePadding: {
      top: '0',
      right: '32px',
      bottom: '32px',
      left: '32px',
    },
    sectionGap: '20px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '5px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#0d9488', // Teal
    secondary: '#14b8a6',
    text: {
      primary: '#134e4a',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f0fdfa',
      accent: '#ccfbf1',
    },
    border: '#99f6e4',
  },

  sectionHeading: {
    style: 'accent-bar',
    borderWidth: '3px',
    borderColor: '#0d9488',
    marginBottom: '10px',
    padding: '0 0 0 12px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '32px',
    backgroundColor: '#134e4a',
    textColor: '#ffffff',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#5eead4',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 3,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '5px 12px',
      borderRadius: '20px',
      borderWidth: '0',
      backgroundColor: '#ccfbf1',
      textColor: '#0f766e',
    },
  },

  experience: {
    variant: 'modern',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  projects: {
    variant: 'cards',
    showLinks: true,
    showTech: true,
  },

  strengths: {
    variant: 'inline-badges',
    showIcons: false,
  },

  achievements: {
    variant: 'numbered',
    showIndicators: true,
  },

  languages: {
    variant: 'inline',
    showCertification: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Tech Stack', defaultTitle: 'Tech Stack', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - gradient fade and geometric elements
  decorations: {
    enabled: true,
    elements: ['bottom-gradient-fade', 'geometric-corner'],
    opacity: 0.8,
    gradientBackground: true,
  },
});

export default backendPrecisionConfig;
