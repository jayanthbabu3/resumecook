/**
 * Professional Blue Template Configuration (V2)
 * 
 * Clean professional design with blue accent, centered section headers,
 * left border accent, and structured layout.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const professionalBlueConfig: TemplateConfig = createTemplateConfig({
  id: 'professional-blue-v2',
  name: 'Professional Blue',
  description: 'Clean professional design with blue accent and centered headers',
  category: 'professional',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      color: '#1e3a5f',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#4b5563',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#1e3a5f',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e3a5f',
    },
    dates: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#374151',
    },
    contact: {
      fontSize: '12px',
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
    pagePadding: {
      top: '28px',
      right: '28px',
      bottom: '28px',
      left: '28px',
    },
    sectionGap: '8px',
    itemGap: '8px',
    headingToContent: '6px',
    bulletGap: '2px',
    contactGap: '8px',
    skillGap: '4px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#1e3a5f',
    secondary: '#2563eb',
    text: {
      primary: '#1f2937',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#e8f0fa', // Soft blue tint for gradient background
    },
    border: '#1e3a5f',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#1e3a5f',
    marginBottom: '12px',
    padding: '0',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: {
      show: false,
      size: '12px',
      color: '#4b5563',
    },
    showSocialLinks: false,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'columns',
    columns: 2,
    showRatings: false,
    separator: '',
    badge: {
      fontSize: '12px',
      padding: '0',
      borderRadius: '0',
      borderWidth: '0',
      backgroundColor: 'transparent',
      textColor: '#374151',
    },
  },

  languages: {
    variant: 'pills',
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
  },

  education: {
    variant: 'compact',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'right',
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
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 2, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 3, column: 'main' },
    { type: 'education', id: 'education', title: 'Education and Training', defaultTitle: 'Education and Training', enabled: true, order: 4, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'main' },
    { type: 'interests', id: 'interests', title: 'Interests and Hobbies', defaultTitle: 'Interests and Hobbies', enabled: true, order: 8, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 9, column: 'main' },
    { type: 'publications', id: 'publications', title: 'Publications', defaultTitle: 'Publications', enabled: false, order: 10, column: 'main' },
    { type: 'awards', id: 'awards', title: 'Awards', defaultTitle: 'Awards', enabled: false, order: 11, column: 'main' },
    { type: 'volunteer', id: 'volunteer', title: 'Volunteer Experience', defaultTitle: 'Volunteer Experience', enabled: false, order: 12, column: 'main' },
  ],

  fontFamily: {
    primary: "'Calibri', 'Segoe UI', 'Arial', sans-serif",
  },

  // Creative decorations - elegant blue accents
  decorations: {
    enabled: true,
    elements: ['side-stripe', 'curved-lines', 'bottom-wave'],
    opacity: 1,
    gradientBackground: true,
  },
});

export default professionalBlueConfig;
