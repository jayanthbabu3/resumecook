/**
 * Creative Split Template Configuration (V2)
 * 
 * Two-column creative layout with sidebar for skills/info.
 * Modern design for creative professionals.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const creativeSplitConfig: TemplateConfig = createTemplateConfig({
  id: 'creative-split-v2',
  name: 'Creative Split',
  description: 'Bold two-column layout with accent sidebar for creatives',
  category: 'creative',

  typography: {
    name: {
      fontSize: '26px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#ffffff',
      textTransform: 'none',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#fcd34d',
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#0891b2',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0891b2',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.55,
      color: '#334155',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#e2e8f0',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#94a3b8',
    },
  },

  spacing: {
    pagePadding: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
    sectionGap: '16px',
    itemGap: '10px',
    headingToContent: '8px',
    bulletGap: '4px',
    contactGap: '10px',
    skillGap: '6px',
  },

  layout: {
    type: 'two-column-left',
    mainWidth: '65%',
    sidebarWidth: '35%',
  },

  colors: {
    primary: '#0891b2',
    secondary: '#0ea5e9',
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#ecfeff',
      sidebar: '#0f172a',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'simple',
    borderWidth: '0',
    borderColor: 'transparent',
    marginBottom: '8px',
    padding: '0',
  },

  header: {
    variant: 'banner',
    showPhoto: true,
    photoSize: '70px',
    photoShape: 'rounded',
    padding: '20px 24px',
    backgroundColor: '#0f172a',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#0ea5e9',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'tags',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '3px 8px',
      borderRadius: '4px',
      borderWidth: '0',
      backgroundColor: '#0891b2',
      textColor: '#ffffff',
    },
  },

  experience: {
    variant: 'compact',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  education: {
    variant: 'compact',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'inline',
  },

  strengths: {
    variant: 'minimal',
    showIcons: false,
  },
  
  achievements: {
    variant: 'list',
    showIndicators: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 3, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});

export default creativeSplitConfig;
