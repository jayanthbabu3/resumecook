/**
 * Fresher Elegant Template Configuration
 * 
 * Elegant single-column layout with serif typography.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherElegantConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-elegant-v2',
  name: 'Fresher Elegant',
  description: 'Elegant single-column layout with classic typography for freshers',
  category: 'classic',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      color: '#1a1a1a',
    },
    title: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#b45309',
      fontFamily: "'Georgia', serif",
    },
    sectionHeading: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#b45309',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    itemSubtitle: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#374151',
    },
    dates: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
      fontFamily: "'Georgia', serif",
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#374151',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#4b5563',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: { top: '32px', right: '32px', bottom: '32px', left: '32px' },
    sectionGap: '20px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '4px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#b45309',
    secondary: '#d97706',
    text: {
      primary: '#1a1a1a',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#fffbf5',
      section: '#fffbf5',
      accent: '#fef3c7',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'simple',
    marginBottom: '12px',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '0 0 20px 0',
    contactIcons: { show: false, size: '12px' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'inline',
    separator: ' • ',
    showRatings: false,
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '–',
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
    showIndicators: false,
  },

  strengths: {
    variant: 'list',
    showIcons: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Academic Projects', defaultTitle: 'Academic Projects', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Proficiencies', defaultTitle: 'Technical Proficiencies', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internship Experience', defaultTitle: 'Internship Experience', enabled: true, order: 5, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Honors & Awards', defaultTitle: 'Honors & Awards', enabled: true, order: 6, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Crimson Pro', 'Georgia', serif",
  },
});

export default fresherElegantConfig;
