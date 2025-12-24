/**
 * Fresher Gradient Template Configuration
 * 
 * Modern layout with gradient header for freshers.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherGradientConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-gradient-v2',
  name: 'Fresher Gradient',
  description: 'Modern layout with gradient header for freshers',
  category: 'modern',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#ffffff',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#fde68a',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#ea580c',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e293b',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#ea580c',
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
      lineHeight: 1.6,
      color: '#334155',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#fef3c7',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b',
    },
  },

  spacing: {
    pagePadding: { top: '0px', right: '24px', bottom: '24px', left: '24px' },
    sectionGap: '16px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '3px',
    contactGap: '10px',
    skillGap: '6px',
  },

  layout: {
    type: 'two-column-right',
    mainWidth: '62%',
    sidebarWidth: '38%',
    columnGap: '20px',
  },

  colors: {
    primary: '#ea580c',
    secondary: '#f97316',
    text: {
      primary: '#1e293b',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#fff7ed',
    },
    border: '#fed7aa',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#ea580c',
    marginBottom: '10px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '24px',
    backgroundColor: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
    textColor: '#ffffff',
    contactIcons: { show: true, size: '12px', color: '#fde68a' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 10px',
      borderRadius: '12px',
      backgroundColor: '#fff7ed',
      textColor: '#ea580c',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
  },

  education: {
    variant: 'detailed',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  achievements: {
    variant: 'list',
    showIndicators: true,
  },

  strengths: {
    variant: 'cards',
    showIcons: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internships', defaultTitle: 'Internships', enabled: true, order: 4, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 5, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'sidebar' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 8, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Outfit', 'Inter', sans-serif",
  },
});

export default fresherGradientConfig;
