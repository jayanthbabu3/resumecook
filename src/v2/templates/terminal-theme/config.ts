/**
 * Terminal Theme Template Configuration (V2)
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../../config/defaultConfig';

export const terminalThemeConfig: TemplateConfig = createTemplateConfig({
  id: 'terminal-theme-v2',
  name: 'Terminal Theme',
  description: 'Terminal-inspired dark layout with neon accents and monospaced typography.',
  category: 'professional',

  typography: {
    name: {
      fontSize: '32px',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      color: '#06181d',
    },
    title: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: '#b7d5dd',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.35,
      letterSpacing: '0.14em',
      textTransform: 'none',
      color: '#d6e7ec',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: 1.45,
      color: '#e6e6e6',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.35,
      color: '#b0bcc6',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#8a97a3',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#c8d1da',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#c8d1da',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.35,
      color: '#8a97a3',
    },
  },

  spacing: {
    pagePadding: {
      top: '28px',
      right: '32px',
      bottom: '28px',
      left: '32px',
    },
    sectionGap: '20px',
    itemGap: '14px',
    headingToContent: '8px',
    bulletGap: '6px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'two-column-right',
    mainWidth: '64%',
    sidebarWidth: '32%',
    columnGap: '26px',
    sidebarPadding: '12px 14px',
  },

  colors: {
    primary: '#0b8fb3',
    secondary: '#18a8cf',
    text: {
      primary: '#eaf2f5',
      secondary: '#cfe1e7',
      muted: '#9bb2bd',
      light: '#06181d',
    },
    background: {
      page: '#0b0f14',
      section: '#10161c',
      sidebar: '#0f151b',
      accent: '#0c1117',
    },
    border: '#1f2b34',
  },

  sectionHeading: {
    style: 'underline',
    marginBottom: '8px',
    borderColor: '#1f2b34',
    borderWidth: '1px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '18px 22px',
    backgroundColor: '#0b8fb3',
    textColor: '#06181d',
    contactIcons: {
      show: true,
      size: '14px',
      color: '#06181d',
    },
  },

  skills: {
    variant: 'category-lines',
    columns: 2,
    separator: ' • ',
    badge: {
      fontSize: '11px',
      padding: '4px 10px',
      borderRadius: '8px',
      borderWidth: '1px',
      backgroundColor: '#111418',
      textColor: '#c8d1da',
      borderColor: '#1f252b',
    },
  },

  experience: {
    variant: 'accent-card',
    showLocation: true,
  },

  achievements: {
    variant: 'bullets',
    showIndicators: true,
  },

  sections: [
    { id: 'header', type: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { id: 'summary', type: 'summary', title: '<summary>', defaultTitle: '<summary>', enabled: true, order: 1, column: 'main' },
    { id: 'experience', type: 'experience', title: '<experience>', defaultTitle: '<experience>', enabled: true, order: 2, column: 'main' },
    { id: 'projects', type: 'projects', title: '<projects>', defaultTitle: '<projects>', enabled: true, order: 3, column: 'main' },
    { id: 'education', type: 'education', title: '<education>', defaultTitle: '<education>', enabled: true, order: 4, column: 'sidebar' },
    { id: 'courses', type: 'courses', title: '<courses>', defaultTitle: '<courses>', enabled: true, order: 5, column: 'sidebar' },
    { id: 'skills', type: 'skills', title: '<skills>', defaultTitle: '<skills>', enabled: true, order: 6, column: 'sidebar' },
    { id: 'languages', type: 'languages', title: '<languages>', defaultTitle: '<languages>', enabled: true, order: 7, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'SF Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace",
    secondary: "'SF Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace",
  },
});

export default terminalThemeConfig;
