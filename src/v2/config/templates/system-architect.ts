/**
 * System Architect Template Configuration (V2)
 *
 * Executive-grade layout with banner header and structured columns.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const systemArchitectConfig: TemplateConfig = createTemplateConfig({
  id: 'system-architect-v2',
  name: 'System Architect',
  description: 'Banner-led two-column template for senior system architects.',
  category: 'professional',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '0.02em',
      color: '#f8fafc',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#cbd5f5',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#0f172a',
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
      color: '#6366f1',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#1f2937',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#e0e7ff',
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
      right: '28px',
      bottom: '28px',
      left: '28px',
    },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '4px',
    contactGap: '10px',
    skillGap: '8px',
  },

  layout: {
    type: 'two-column',
    mainWidth: '63%',
    sidebarWidth: '34%',
    columnGap: '22px',
    sidebarBackground: '#f5f7ff',
    sidebarPadding: '16px',
  },

  colors: {
    primary: '#4f46e5',
    secondary: '#818cf8',
    text: {
      primary: '#0f172a',
      secondary: '#1f2937',
      muted: '#64748b',
      light: '#f8fafc',
    },
    background: {
      page: '#ffffff',
      section: '#f5f7ff',
      accent: '#e0e7ff',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'background',
    borderWidth: '1px',
    borderColor: '#c7d2fe',
    marginBottom: '10px',
    padding: '6px 10px',
    backgroundColor: '#e0e7ff',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '26px 28px',
    backgroundColor: '#1e1b4b',
    textColor: '#f8fafc',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#a5b4fc',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '4px 10px',
      borderRadius: '999px',
      borderWidth: '1px',
      borderColor: '#c7d2fe',
      backgroundColor: '#eef2ff',
      textColor: '#1e1b4b',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
  },

  education: {
    variant: 'standard',
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
    showIndicators: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Architecture Projects', defaultTitle: 'Architecture Projects', enabled: true, order: 3, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Core Skills', defaultTitle: 'Core Skills', enabled: true, order: 5, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 6, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default systemArchitectConfig;
