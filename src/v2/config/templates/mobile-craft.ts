/**
 * Mobile Craft Template Configuration (V2)
 *
 * Unique two-column layout with vibrant coral/orange theme.
 * Sidebar design with app-card inspired sections for mobile developers.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const mobileCraftConfig: TemplateConfig = createTemplateConfig({
  id: 'mobile-craft-v2',
  name: 'Mobile Craft',
  description: 'Creative layout with wave decorations and vibrant orange theme for mobile engineers.',
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
      color: '#fed7aa',
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#ea580c',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#7c2d12',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#ea580c',
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
      color: '#fff7ed',
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
    primary: '#ea580c', // Deep coral orange
    secondary: '#f97316',
    text: {
      primary: '#7c2d12',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#fff7ed',
      accent: '#ffedd5',
    },
    border: '#fdba74',
  },

  sectionHeading: {
    style: 'left-accent',
    borderWidth: '3px',
    borderColor: '#f97316',
    marginBottom: '10px',
    padding: '2px 0 2px 12px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '32px',
    backgroundColor: '#c2410c', // Deep burnt orange
    textColor: '#ffffff',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#fdba74',
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
      backgroundColor: '#ffedd5',
      textColor: '#c2410c',
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
    { type: 'skills', id: 'skills', title: 'Tech Stack', defaultTitle: 'Tech Stack', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Featured Apps', defaultTitle: 'Featured Apps', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'SF Pro Text', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - waves and lines in header area
  decorations: {
    enabled: true,
    elements: ['header-wave', 'diagonal-lines', 'bottom-wave'],
    opacity: 0.9,
    gradientBackground: true,
  },
});

export default mobileCraftConfig;
