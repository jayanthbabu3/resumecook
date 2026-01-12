/**
 * Frontend Horizon Template Configuration (V2)
 *
 * Modern banner header with airy spacing and crisp typography
 * for senior frontend roles.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const frontendHorizonConfig: TemplateConfig = createTemplateConfig({
  id: 'frontend-horizon-v2',
  name: 'Frontend Horizon',
  description: 'Banner-led layout with clear hierarchy and modern frontend focus.',
  category: 'modern',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '0.02em',
      color: '#f8fafc',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#bae6fd',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#0f172a',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2563eb',
    },
    dates: {
      fontSize: '12px',
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
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#e0f2fe',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#94a3b8',
    },
  },

  spacing: {
    pagePadding: {
      top: '0px',
      right: '32px',
      bottom: '28px',
      left: '32px',
    },
    sectionGap: '20px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '5px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#2563eb',
    secondary: '#38bdf8',
    text: {
      primary: '#0f172a',
      secondary: '#1f2937',
      muted: '#64748b',
      light: '#f8fafc',
    },
    background: {
      page: '#ffffff',
      section: '#f8fafc',
      accent: '#e0f2fe',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#e2e8f0',
    marginBottom: '10px',
    padding: '0 0 8px 0',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '26px 32px',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#38bdf8',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills-accent',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '12px',
      padding: '4px 10px',
      borderRadius: '999px',
      borderWidth: '1px',
      borderColor: '#bfdbfe',
      backgroundColor: '#eff6ff',
      textColor: '#1d4ed8',
    },
  },

  experience: {
    variant: 'left-border',
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
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 4, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 5, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 6, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 7, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 8, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  // Creative decorations - bottom gradient fade and code brackets for frontend aesthetic
  decorations: {
    enabled: true,
    elements: ['bottom-gradient-fade', 'code-brackets'],
    opacity: 1,
  },
});

export default frontendHorizonConfig;
