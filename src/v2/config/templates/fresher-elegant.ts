/**
 * Fresher Elegant Template Configuration
 *
 * Refined elegant single-column design for fresh graduates.
 * Features sophisticated typography with a serif name and
 * warm amber accents. Clean, professional layout that
 * prioritizes education and projects for entry-level candidates.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherElegantConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-elegant-v2',
  name: 'Fresher Elegant',
  description: 'Refined elegant single-column design with sophisticated typography for fresh graduates',
  category: 'classic',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: '0.01em',
      color: '#1c1917',
      fontFamily: "'Playfair Display', Georgia, serif",
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#b45309',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#92400e',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1c1917',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#b45309',
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#78716c',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#44403c',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#57534e',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#78716c',
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
    primary: '#b45309',
    secondary: '#d97706',
    text: {
      primary: '#1c1917',
      secondary: '#44403c',
      muted: '#78716c',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#fef3c7',
    },
    border: '#e7e5e4',
  },

  sectionHeading: {
    style: 'elegant-line',
    borderWidth: '1px',
    borderColor: '#d6d3d1',
    marginBottom: '12px',
    padding: '0 0 8px 0',
  },

  header: {
    variant: 'centered',
    showPhoto: true,
    photoSize: '80px',
    photoShape: 'rounded',
    padding: '0 0 24px 0',
    contactIcons: { show: true, size: '12px', color: '#b45309' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 4,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '5px 12px',
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: '#e7e5e4',
      backgroundColor: '#fafaf9',
      textColor: '#44403c',
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

  projects: {
    variant: 'standard',
    showLinks: true,
    showTech: true,
  },

  achievements: {
    variant: 'compact',
    showIndicators: false,
  },

  strengths: {
    variant: 'inline-badges',
    showIcons: false,
  },

  languages: {
    variant: 'inline',
    showCertification: false,
  },

  certifications: {
    variant: 'standard',
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internship', defaultTitle: 'Internship', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 8, column: 'main' },
  ],

  fontFamily: {
    primary: "'Source Sans Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Playfair Display', Georgia, serif",
  },

  colorSlots: [
    {
      name: 'primary',
      label: 'Accent Color',
      defaultColor: '#b45309',
      description: 'Main accent color for headings and highlights',
    },
    {
      name: 'secondary',
      label: 'Secondary Color',
      defaultColor: '#d97706',
      description: 'Secondary accent for subtle highlights',
    },
  ],

  decorations: {
    enabled: true,
    elements: ['corner-accent'],
    opacity: 0.5,
  },
});

export default fresherElegantConfig;
