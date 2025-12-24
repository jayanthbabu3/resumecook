/**
 * Fresher Compact Template Configuration
 * 
 * Compact two-column layout maximizing content density.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherCompactConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-compact-v2',
  name: 'Fresher Compact',
  description: 'Compact two-column layout maximizing content density for freshers',
  category: 'professional',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#1e293b',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#059669',
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#059669',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e293b',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#475569',
    },
    dates: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b',
    },
    body: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#334155',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#475569',
    },
    small: {
      fontSize: '9px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b',
    },
  },

  spacing: {
    pagePadding: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    sectionGap: '12px',
    itemGap: '8px',
    headingToContent: '6px',
    bulletGap: '2px',
    contactGap: '6px',
    skillGap: '4px',
  },

  layout: {
    type: 'two-column-right',
    mainWidth: '65%',
    sidebarWidth: '35%',
    columnGap: '16px',
  },

  colors: {
    primary: '#059669',
    secondary: '#10b981',
    text: {
      primary: '#1e293b',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#ecfdf5',
    },
    border: '#d1fae5',
  },

  sectionHeading: {
    style: 'simple',
    marginBottom: '6px',
  },

  header: {
    variant: 'split',
    showPhoto: false,
    padding: '0 0 12px 0',
    contactIcons: { show: true, size: '10px', color: '#059669' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'compact',
    columns: 2,
    showRatings: false,
  },

  experience: {
    variant: 'compact',
    datePosition: 'inline',
    showLocation: false,
    bulletStyle: '•',
  },

  education: {
    variant: 'compact',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'inline',
  },

  achievements: {
    variant: 'minimal',
    showIndicators: false,
  },

  strengths: {
    variant: 'pills',
    showIcons: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internships', defaultTitle: 'Internships', enabled: true, order: 4, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 5, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'sidebar' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 8, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Roboto', 'Inter', sans-serif",
  },
});

export default fresherCompactConfig;
