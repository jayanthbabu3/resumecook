/**
 * Fresher Minimal Template Configuration
 *
 * Creative, modern design with stylized accents for freshers.
 * Features the new creative-underline header with a clean, professional look.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherMinimalConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-minimal-v2',
  name: 'Fresher Minimal',
  description: 'Creative modern layout with stylized accents for freshers',
  category: 'modern',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1e293b',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0ea5e9', // Will be overridden by accent
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#334155',
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
      color: '#0ea5e9', // Accent color for subtitles
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#475569',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#475569',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#94a3b8',
    },
  },

  spacing: {
    pagePadding: { top: '24px', right: '28px', bottom: '24px', left: '28px' },
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
    primary: '#0ea5e9', // Sky blue - vibrant and modern
    secondary: '#0284c7',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f0f9ff', // Light sky blue tint
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    marginBottom: '12px',
    padding: '0 0 0 10px',
  },

  header: {
    variant: 'creative-underline',
    showPhoto: true,
    photoSize: '56px',
    photoShape: 'rounded',
    photoPosition: 'left',
    padding: '0',
    marginBottom: '0',
    contactIcons: { show: true, size: '13px' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills-accent',
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 10px',
      borderRadius: '12px',
      borderWidth: '0',
      backgroundColor: '#0ea5e910',
      textColor: '#0284c7',
    },
  },

  experience: {
    variant: 'modern',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  education: {
    variant: 'standard',
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
    variant: 'accent-grid',
    showIcons: false,
    columns: 2,
  },

  languages: {
    variant: 'compact',
    showProficiency: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 5, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 6, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 7, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 8, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  decorations: {
    enabled: false,
  },
});

export default fresherMinimalConfig;
