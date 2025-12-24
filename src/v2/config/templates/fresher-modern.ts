/**
 * Fresher Modern Template Configuration
 * 
 * Modern two-column layout with sidebar for skills and education.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherModernConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-modern-v2',
  name: 'Fresher Modern',
  description: 'Modern two-column layout with sidebar for skills and achievements',
  category: 'modern',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#1e293b',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#4f46e5',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#1e293b',
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
      color: '#4f46e5',
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
      fontWeight: 500,
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
    pagePadding: { top: '32px', right: '32px', bottom: '32px', left: '32px' },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '10px',
    bulletGap: '4px',
    contactGap: '10px',
    skillGap: '6px',
  },

  layout: {
    type: 'two-column-left',
    mainWidth: '62%',
    sidebarWidth: '38%',
    columnGap: '24px',
    sidebarBackground: '#f0f4ff',
    sidebarPadding: '28px',
  },

  colors: {
    primary: '#4f46e5',
    secondary: '#818cf8',
    text: {
      primary: '#1e293b',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#f0f4ff',
      accent: '#eef2ff',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#4f46e5',
    marginBottom: '12px',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '28px 32px',
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    contactIcons: { show: true, size: '13px', color: '#64748b' },
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
      borderRadius: '4px',
      backgroundColor: '#4f46e5',
      textColor: '#ffffff',
    },
  },

  experience: {
    variant: 'compact',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  education: {
    variant: 'detailed',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
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
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'sidebar' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 2, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 3, column: 'sidebar' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 4, column: 'sidebar' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 6, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internships', defaultTitle: 'Internships', enabled: true, order: 7, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 8, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 9, column: 'main' },
  ],

  fontFamily: {
    primary: "'Poppins', 'Inter', sans-serif",
  },
});

export default fresherModernConfig;
