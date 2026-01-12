/**
 * System Architect Template Configuration (V2)
 *
 * Creative single-column layout with sophisticated slate/charcoal theme
 * and warm rose/coral accents. Centered header with elegant typography.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const systemArchitectConfig: TemplateConfig = createTemplateConfig({
  id: 'system-architect-v2',
  name: 'System Architect',
  description: 'Sophisticated slate theme with rose accents for senior architects.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '38px',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      color: '#1e293b',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#e11d48', // Rose accent
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: '#475569',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#1e293b',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#be123c',
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
      color: '#64748b',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#94a3b8',
    },
  },

  spacing: {
    pagePadding: {
      top: '36px',
      right: '36px',
      bottom: '36px',
      left: '36px',
    },
    sectionGap: '22px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '5px',
    contactGap: '14px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#e11d48', // Rose
    secondary: '#fb7185',
    text: {
      primary: '#1e293b',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f8fafc',
      accent: '#ffe4e6',
    },
    border: '#fecdd3',
  },

  sectionHeading: {
    style: 'simple',
    marginBottom: '12px',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '0 0 24px 0',
    backgroundColor: 'transparent',
    textColor: '#1e293b',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#e11d48',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'grouped',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '4px 10px',
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: '#fecdd3',
      backgroundColor: '#fff1f2',
      textColor: '#9f1239',
    },
  },

  experience: {
    variant: 'left-border',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '–',
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
    { type: 'skills', id: 'skills', title: 'Architecture Expertise', defaultTitle: 'Architecture Expertise', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Key Projects', defaultTitle: 'Key Projects', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'Sora', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - top accent line and side stripe for elegant minimal look
  decorations: {
    enabled: true,
    elements: ['top-accent-line', 'side-stripe', 'bottom-wave'],
    opacity: 1,
  },
});

export default systemArchitectConfig;
