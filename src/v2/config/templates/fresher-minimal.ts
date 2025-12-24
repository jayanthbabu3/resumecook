/**
 * Fresher Minimal Template Configuration
 * 
 * Ultra-clean minimal layout focused on content.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherMinimalConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-minimal-v2',
  name: 'Fresher Minimal',
  description: 'Ultra-clean minimal layout focused on content for freshers',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#111827',
    },
    title: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#374151',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#111827',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#4b5563',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#9ca3af',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#4b5563',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#6b7280',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#9ca3af',
    },
  },

  spacing: {
    pagePadding: { top: '28px', right: '28px', bottom: '28px', left: '28px' },
    sectionGap: '18px',
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
    primary: '#111827',
    secondary: '#374151',
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      muted: '#9ca3af',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f9fafb',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'simple',
    marginBottom: '10px',
  },

  header: {
    variant: 'minimal',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: { show: false, size: '12px' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'inline',
    separator: ', ',
    showRatings: false,
  },

  experience: {
    variant: 'minimal',
    datePosition: 'right',
    showLocation: false,
    bulletStyle: '•',
  },

  education: {
    variant: 'compact',
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
    variant: 'minimal',
    showIcons: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, sans-serif",
  },
});

export default fresherMinimalConfig;
