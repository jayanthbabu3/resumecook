/**
 * Platform Core Template Configuration (V2)
 *
 * Left sidebar layout with structured platform engineering focus.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const platformCoreConfig: TemplateConfig = createTemplateConfig({
  id: 'platform-core-v2',
  name: 'Platform Core',
  description: 'Left sidebar layout with platform engineering emphasis and structured sections.',
  category: 'professional',

  typography: {
    name: {
      fontSize: '26px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      color: '#0f172a',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#059669',
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
      color: '#059669',
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
      color: '#334155',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b',
    },
  },

  spacing: {
    pagePadding: {
      top: '28px',
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
    mainWidth: '64%',
    sidebarWidth: '33%',
    columnGap: '22px',
    sidebarBackground: '#ecfdf5',
    sidebarPadding: '16px',
  },

  colors: {
    primary: '#059669',
    secondary: '#10b981',
    text: {
      primary: '#0f172a',
      secondary: '#1f2937',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ecfdf5',
      accent: '#d1fae5',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#a7f3d0',
    marginBottom: '10px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'left-aligned',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#059669',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'inline',
    columns: 1,
    showRatings: false,
    separator: ' • ',
  },

  experience: {
    variant: 'enhanced',
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
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Core Skills', defaultTitle: 'Core Skills', enabled: true, order: 4, column: 'sidebar' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 5, column: 'sidebar' },
    { type: 'achievements', id: 'achievements', title: 'Highlights', defaultTitle: 'Highlights', enabled: true, order: 6, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 7, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default platformCoreConfig;
