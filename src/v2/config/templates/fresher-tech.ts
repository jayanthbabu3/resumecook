/**
 * Fresher Tech Template Configuration
 * 
 * Tech-focused layout with dark header for IT freshers.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherTechConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-tech-v2',
  name: 'Fresher Tech',
  description: 'Tech-focused layout with dark header for IT freshers',
  category: 'modern',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#ffffff',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#d4a853',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#d4a853',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#d4a853',
    },
    dates: {
      fontSize: '10px',
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
      color: '#ffffff',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b',
    },
  },

  spacing: {
    pagePadding: { top: '0px', right: '28px', bottom: '24px', left: '28px' },
    sectionGap: '14px',
    itemGap: '10px',
    headingToContent: '6px',
    bulletGap: '3px',
    contactGap: '8px',
    skillGap: '6px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#d4a853',
    secondary: '#e6c17a',
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#fdf8ed',
    },
    border: '#f5e6c8',
  },

  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    borderColor: '#d4a853',
    marginBottom: '10px',
    padding: '0 0 0 10px',
  },

  header: {
    variant: 'banner-with-summary',
    showPhoto: true,
    photoSize: '80px',
    photoShape: 'circle',
    photoPosition: 'right',
    padding: '28px 32px',
    backgroundColor: '#334155',
    textColor: '#ffffff',
    contactIcons: { show: true, size: '14px', color: '#d4a853' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'bordered-tags',
    columns: 4,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 8px',
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: '#d4a853',
      backgroundColor: '#fdf8ed',
      textColor: '#d4a853',
    },
  },

  experience: {
    variant: 'accent-card',
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
    variant: 'bullets',
    showIndicators: true,
  },

  strengths: {
    variant: 'accent-border',
    showIcons: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 1, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internships', defaultTitle: 'Internships', enabled: true, order: 4, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 5, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'JetBrains Mono', 'Fira Code', monospace",
  },
});

export default fresherTechConfig;
