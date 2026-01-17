/**
 * Modern Elegance Template Configuration (V2)
 *
 * Sophisticated modern resume with:
 * - Centered header with bold name and accent underline
 * - Uppercase title with elegant letter spacing
 * - Clean contact row with dot separators
 * - Elegant timeline experience with diamond bullets
 * - Modern skills with accent-colored pills
 * - Deep teal accent color for professional appeal
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Deep teal accent - sophisticated and professional
const ACCENT_COLOR = '#0d9488';
const ACCENT_COLOR_DARK = '#0f766e';

export const modernEleganceConfig: TemplateConfig = createTemplateConfig({
  id: 'modern-elegance-v2',
  name: 'Modern Elegance',
  description: 'Sophisticated modern layout with elegant typography and refined design elements',
  category: 'professional',

  typography: {
    name: {
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#111827', // Dark charcoal
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#6b7280', // Muted gray
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR,
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
      fontWeight: 500,
      lineHeight: 1.4,
      color: ACCENT_COLOR,
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.65,
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
    pagePadding: {
      top: '36px',
      right: '36px',
      bottom: '36px',
      left: '36px',
    },
    sectionGap: '22px',
    itemGap: '16px',
    headingToContent: '14px',
    bulletGap: '5px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
  },

  colors: {
    primary: ACCENT_COLOR,
    secondary: ACCENT_COLOR_DARK,
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#ffffff',
      accent: `${ACCENT_COLOR}08`,
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'accent-line',
    borderWidth: '2px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 6px 0',
    marginBottom: '14px',
  },

  header: {
    variant: 'modern-elegant',
    showPhoto: false,
    padding: '0',
    marginBottom: '28px',
    contactIcons: {
      show: true,
      size: '13px',
      color: ACCENT_COLOR,
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  summary: {
    variant: 'paragraph',
    showHeading: true,
    headingText: 'Professional Summary',
  },

  skills: {
    variant: 'pills-accent',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '5px 12px',
      borderRadius: '14px',
      borderWidth: '0',
      borderColor: 'transparent',
      backgroundColor: `${ACCENT_COLOR}12`,
      textColor: ACCENT_COLOR,
    },
  },

  experience: {
    variant: 'elegant-timeline',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '◆',
    showDescription: false,
  },

  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    showHonors: true,
    datePosition: 'right',
  },

  strengths: {
    variant: 'list',
    showIcons: false,
  },

  achievements: {
    variant: 'list',
    showIndicators: false,
    showMetrics: true,
  },

  languages: {
    variant: 'inline',
  },

  certifications: {
    variant: 'compact',
    showExpiry: false,
    showCredentialId: false,
  },

  projects: {
    variant: 'standard',
    showLinks: true,
    showTechnologies: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Professional Summary', defaultTitle: 'Professional Summary', enabled: true, order: 1 },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3 },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4 },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 5 },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 6 },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7 },
  ],

  fontFamily: {
    primary: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    secondary: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  },

  decorations: {
    enabled: false,
    elements: [],
    opacity: 1,
    gradientBackground: false,
  },
});

export default modernEleganceConfig;
