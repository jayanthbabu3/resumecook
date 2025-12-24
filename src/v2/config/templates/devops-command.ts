/**
 * DevOps Command Template Configuration (V2)
 *
 * Dark sidebar layout tailored to DevOps leadership roles.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const devopsCommandConfig: TemplateConfig = createTemplateConfig({
  id: 'devops-command-v2',
  name: 'DevOps Command',
  description: 'Contrast-heavy sidebar template for DevOps and SRE leadership.',
  category: 'modern',

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
      color: '#16a34a',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#f8fafc',
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
      color: '#16a34a',
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
      color: '#e2e8f0',
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
    mainWidth: '62%',
    sidebarWidth: '35%',
    columnGap: '22px',
    sidebarBackground: '#0f172a',
    sidebarPadding: '16px',
  },

  colors: {
    primary: '#16a34a',
    secondary: '#22c55e',
    text: {
      primary: '#0f172a',
      secondary: '#1f2937',
      muted: '#64748b',
      light: '#f8fafc',
    },
    background: {
      page: '#ffffff',
      section: '#f8fafc',
      accent: '#dcfce7',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#22c55e',
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
      color: '#16a34a',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'bordered-tags',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '4px 8px',
      borderRadius: '6px',
      borderWidth: '1px',
      borderColor: '#22c55e',
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
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
    { type: 'projects', id: 'projects', title: 'Infrastructure Projects', defaultTitle: 'Infrastructure Projects', enabled: true, order: 3, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Tooling', defaultTitle: 'Tooling', enabled: true, order: 5, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 6, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default devopsCommandConfig;
