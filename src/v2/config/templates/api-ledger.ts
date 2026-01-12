/**
 * API Ledger Template Configuration (V2)
 *
 * Creative single-column layout with vibrant purple gradient theme.
 * Tech-inspired decorations with circuit patterns for API engineers.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const apiLedgerConfig: TemplateConfig = createTemplateConfig({
  id: 'api-ledger-v2',
  name: 'API Ledger',
  description: 'Creative layout with purple gradient and tech decorations for API engineers.',
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
      color: '#c4b5fd',
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#7c3aed',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#2e1065',
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
      color: '#ddd6fe',
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
    primary: '#7c3aed',
    secondary: '#a855f7',
    text: {
      primary: '#2e1065',
      secondary: '#334155',
      muted: '#64748b',
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
    style: 'left-accent',
    borderWidth: '3px',
    borderColor: '#a855f7',
    marginBottom: '10px',
    padding: '2px 0 2px 12px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '32px',
    textColor: '#ffffff',
    contactIcons: {
      show: true,
      size: '12px',
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
      padding: '5px 12px',
      borderRadius: '20px',
      borderWidth: '0',
      backgroundColor: '#ede9fe',
      textColor: '#6d28d9',
    },
  },

  experience: {
    variant: 'dots-timeline',
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
    variant: 'modern',
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
    { type: 'skills', id: 'skills', title: 'API Stack', defaultTitle: 'API Stack', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'API Projects', defaultTitle: 'API Projects', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - code brackets and circuit patterns for API/dev aesthetic
  decorations: {
    enabled: true,
    elements: ['code-brackets', 'circuit-lines', 'corner-blob'],
    opacity: 0.9,
    gradientBackground: true,
  },
});

export default apiLedgerConfig;
