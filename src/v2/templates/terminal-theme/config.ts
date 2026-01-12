/**
 * Terminal Theme Template Configuration (V2)
 *
 * Authentic terminal/CLI aesthetic with monospace typography,
 * muted green accents, and minimal visual clutter.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../../config/defaultConfig';

export const terminalThemeConfig: TemplateConfig = createTemplateConfig({
  id: 'terminal-theme-v2',
  name: 'Terminal Theme',
  description: 'Authentic terminal aesthetic with monospace typography and muted green accents.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0',
      color: '#4ade80', // Terminal green
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0',
      textTransform: 'none',
      color: '#9ca3af',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.35,
      letterSpacing: '0',
      textTransform: 'none',
      color: '#6b7280', // Muted comment color
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.45,
      color: '#e5e7eb',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.35,
      color: '#4ade80', // Green for company names
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.3,
      color: '#6b7280',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#d1d5db',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#9ca3af',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.35,
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: {
      top: '24px',
      right: '28px',
      bottom: '24px',
      left: '28px',
    },
    sectionGap: '16px',
    itemGap: '12px',
    headingToContent: '6px',
    bulletGap: '4px',
    contactGap: '10px',
    skillGap: '6px',
  },

  layout: {
    type: 'two-column-right',
    mainWidth: '65%',
    sidebarWidth: '32%',
    columnGap: '24px',
  },

  colors: {
    primary: '#4ade80', // Muted terminal green
    secondary: '#22c55e',
    text: {
      primary: '#e5e7eb',
      secondary: '#d1d5db',
      muted: '#6b7280',
      light: '#111827',
    },
    background: {
      page: '#111827', // Dark terminal background
      section: '#111827',
      sidebar: '#111827',
      accent: '#1f2937',
    },
    border: '#374151',
  },

  sectionHeading: {
    style: 'simple',
    marginBottom: '6px',
  },

  header: {
    variant: 'stacked',
    showPhoto: false,
    padding: '16px 0 12px',
    backgroundColor: 'transparent',
    textColor: '#4ade80',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#6b7280',
    },
  },

  skills: {
    variant: 'bars',
    columns: 1,
    separator: ' | ',
    badge: {
      fontSize: '10px',
      padding: '2px 6px',
      borderRadius: '2px',
      borderWidth: '0',
      backgroundColor: 'transparent',
      textColor: '#d1d5db',
    },
  },

  experience: {
    variant: 'standard',
    showLocation: true,
    bulletStyle: '→',
  },

  education: {
    variant: 'minimal',
    showGPA: false,
  },

  courses: {
    variant: 'compact',
  },

  achievements: {
    variant: 'bullets',
    showIndicators: false,
  },

  sections: [
    { id: 'header', type: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { id: 'summary', type: 'summary', title: '// summary', defaultTitle: '// summary', enabled: true, order: 1, column: 'main' },
    { id: 'experience', type: 'experience', title: '// experience', defaultTitle: '// experience', enabled: true, order: 2, column: 'main' },
    { id: 'projects', type: 'projects', title: '// projects', defaultTitle: '// projects', enabled: true, order: 3, column: 'main' },
    { id: 'education', type: 'education', title: '// education', defaultTitle: '// education', enabled: true, order: 4, column: 'sidebar' },
    { id: 'courses', type: 'courses', title: '// courses', defaultTitle: '// courses', enabled: true, order: 5, column: 'sidebar' },
    { id: 'skills', type: 'skills', title: '// skills', defaultTitle: '// skills', enabled: true, order: 6, column: 'sidebar' },
    { id: 'languages', type: 'languages', title: '// languages', defaultTitle: '// languages', enabled: true, order: 7, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'Monaco', monospace",
    secondary: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'Monaco', monospace",
  },
});

export default terminalThemeConfig;
