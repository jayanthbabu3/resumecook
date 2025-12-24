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
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#ffffff',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#22d3ee',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#0891b2',
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
      color: '#0891b2',
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
      color: '#a5f3fc',
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
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#0891b2',
    secondary: '#22d3ee',
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#ecfeff',
    },
    border: '#cffafe',
  },

  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    borderColor: '#0891b2',
    marginBottom: '10px',
    padding: '0 0 0 10px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '24px',
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    contactIcons: { show: true, size: '12px', color: '#22d3ee' },
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
      borderColor: '#0891b2',
      backgroundColor: '#ecfeff',
      textColor: '#0891b2',
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
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internships', defaultTitle: 'Internships', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'JetBrains Mono', 'Fira Code', monospace",
  },
});

export default fresherTechConfig;
