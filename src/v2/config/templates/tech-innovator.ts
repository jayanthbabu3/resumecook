/**
 * Tech Innovator Template Configuration
 *
 * A modern, clean template for tech professionals and innovators.
 * Features icon-accent experience cards and category-lines skills.
 * Perfect for software engineers, product managers, and tech leaders.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const techInnovatorConfig: TemplateConfig = createTemplateConfig({
  id: 'tech-innovator-v2',
  name: 'Tech Innovator',
  description: 'Modern template with icon cards and categorized skills for tech professionals',
  category: 'modern',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      color: '#0891b2', // Cyan-600
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#0e7490', // Cyan-700
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0891b2',
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
      lineHeight: 1.6,
      color: '#334155',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#475569',
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
      top: '32px',
      right: '32px',
      bottom: '32px',
      left: '32px',
    },
    sectionGap: '22px',
    itemGap: '16px',
    headingToContent: '12px',
    bulletGap: '5px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#0891b2', // Cyan-600
    secondary: '#06b6d4', // Cyan-500
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f0f9ff', // Sky-50
      accent: '#e0f2fe', // Sky-100
    },
    border: '#bae6fd', // Sky-200
  },

  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    borderColor: '#0891b2',
    marginBottom: '14px',
    padding: '2px 0 2px 12px',
  },

  header: {
    variant: 'left-aligned',
    showPhoto: false,
    padding: '0 0 20px 0',
    marginBottom: '8px',
    borderBottom: '2px solid #0891b2',
    contactIcons: {
      show: true,
      size: '14px',
      color: '#0891b2',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'dots',
    columns: 2,
    showRatings: true,
    badge: {
      fontSize: '11px',
      padding: '4px 10px',
      borderRadius: '4px',
      borderWidth: '1px',
      backgroundColor: '#ecfeff',
      borderColor: '#a5f3fc',
      textColor: '#0e7490',
    },
  },

  experience: {
    variant: 'icon-accent',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  education: {
    variant: 'standard',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  languages: {
    variant: 'inline',
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Professional Summary', defaultTitle: 'Professional Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 6, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default techInnovatorConfig;
