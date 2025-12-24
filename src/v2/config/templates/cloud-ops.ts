/**
 * Cloud Ops Template Configuration (V2)
 *
 * Centered header with cloud-inspired palette and clean spacing.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const cloudOpsConfig: TemplateConfig = createTemplateConfig({
  id: 'cloud-ops-v2',
  name: 'Cloud Ops',
  description: 'Centered header with cloud-inspired palette for DevOps and SRE roles.',
  category: 'modern',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      color: '#312e81',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6366f1',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#1e1b4b',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e1b4b',
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
      color: '#6b7280',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#374151',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#4f46e5',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
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
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '5px',
    contactGap: '10px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#4f46e5',
    secondary: '#6366f1',
    text: {
      primary: '#1e1b4b',
      secondary: '#312e81',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#eef2ff',
      accent: '#e0e7ff',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#c7d2fe',
    marginBottom: '10px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '0 0 18px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#6366f1',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'dots',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '4px 8px',
      borderRadius: '999px',
      borderWidth: '1px',
      borderColor: '#c7d2fe',
      backgroundColor: '#eef2ff',
      textColor: '#312e81',
    },
  },

  experience: {
    variant: 'two-column-dates',
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
    { type: 'skills', id: 'skills', title: 'Core Skills', defaultTitle: 'Core Skills', enabled: true, order: 2, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 6, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default cloudOpsConfig;
