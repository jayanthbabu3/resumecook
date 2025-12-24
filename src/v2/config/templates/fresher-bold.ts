/**
 * Fresher Bold Template Configuration
 * 
 * Bold two-column layout with strong visual hierarchy.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherBoldConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-bold-v2',
  name: 'Fresher Bold',
  description: 'Bold two-column layout with strong visual hierarchy for freshers',
  category: 'modern',

  typography: {
    name: {
      fontSize: '32px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    title: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#dc2626',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 800,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#0f172a',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#dc2626',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
    },
    body: {
      fontSize: '11px',
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
    pagePadding: { top: '24px', right: '24px', bottom: '24px', left: '24px' },
    sectionGap: '16px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '3px',
    contactGap: '8px',
    skillGap: '6px',
  },

  layout: {
    type: 'two-column-right',
    mainWidth: '62%',
    sidebarWidth: '38%',
    columnGap: '24px',
  },

  colors: {
    primary: '#dc2626',
    secondary: '#ef4444',
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#fef2f2',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'left-border',
    borderWidth: '4px',
    borderColor: '#dc2626',
    marginBottom: '10px',
    padding: '0 0 0 12px',
  },

  header: {
    variant: 'left-aligned',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: { show: true, size: '12px', color: '#dc2626' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'tags',
    columns: 3,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 8px',
      borderRadius: '2px',
      borderWidth: '1px',
      borderColor: '#dc2626',
      backgroundColor: '#ffffff',
      textColor: '#dc2626',
    },
  },

  experience: {
    variant: 'compact',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▪',
  },

  education: {
    variant: 'standard',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  achievements: {
    variant: 'bullets',
    showIndicators: true,
  },

  strengths: {
    variant: 'accent-border',
    showIcons: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Objective', defaultTitle: 'Objective', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internships', defaultTitle: 'Internships', enabled: true, order: 4, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 5, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'sidebar' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 8, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Montserrat', 'Inter', sans-serif",
  },
});

export default fresherBoldConfig;
