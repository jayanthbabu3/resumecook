/**
 * Fresher Creative Template Configuration
 * 
 * Creative layout with colorful accents for design-oriented freshers.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherCreativeConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-creative-v2',
  name: 'Fresher Creative',
  description: 'Creative layout with colorful accents for design-oriented freshers',
  category: 'creative',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#7c3aed',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#a78bfa',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
      color: '#7c3aed',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#7c3aed',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#374151',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#4b5563',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: { top: '24px', right: '24px', bottom: '24px', left: '24px' },
    sectionGap: '16px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '3px',
    contactGap: '10px',
    skillGap: '6px',
  },

  layout: {
    type: 'two-column-left',
    mainWidth: '60%',
    sidebarWidth: '40%',
    columnGap: '20px',
  },

  colors: {
    primary: '#7c3aed',
    secondary: '#a78bfa',
    text: {
      primary: '#1f2937',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#faf5ff',
      accent: '#ede9fe',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'background',
    backgroundColor: '#ede9fe',
    padding: '6px 12px',
    marginBottom: '10px',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: { show: true, size: '12px', color: '#7c3aed' },
    showSocialLinks: true,
    socialLinksVariant: 'badges',
  },

  skills: {
    variant: 'pills-accent',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 10px',
      borderRadius: '12px',
      backgroundColor: '#7c3aed',
      textColor: '#ffffff',
    },
  },

  experience: {
    variant: 'card',
    datePosition: 'below',
    showLocation: true,
    bulletStyle: '◦',
  },

  education: {
    variant: 'card',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'below',
  },

  achievements: {
    variant: 'cards',
    showIndicators: true,
  },

  strengths: {
    variant: 'grid',
    showIcons: false,
    columns: 2,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'sidebar' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 2, column: 'sidebar' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 3, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 4, column: 'sidebar' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 6, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internships', defaultTitle: 'Internships', enabled: true, order: 7, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 8, column: 'main' },
  ],

  fontFamily: {
    primary: "'Nunito', 'Inter', sans-serif",
  },
});

export default fresherCreativeConfig;
