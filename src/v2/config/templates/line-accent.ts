/**
 * Line Accent Template Configuration (V2)
 *
 * Clean design with full-width accent lines:
 * - Bold top accent line
 * - Two-column header: Name/Title left, Contact stacked right
 * - Thin bottom separator
 * - Indigo/violet accent color
 * - Asymmetric elegant layout
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Deep indigo - sophisticated and modern
const ACCENT_COLOR = '#4f46e5';
const SECONDARY_COLOR = '#6366f1';

export const lineAccentConfig: TemplateConfig = createTemplateConfig({
  id: 'line-accent-v2',
  name: 'Line Accent',
  description: 'Clean design with full-width accent lines and asymmetric layout',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
      color: '#0f172a',
    },
    title: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      color: ACCENT_COLOR,
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#0f172a',
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
      color: ACCENT_COLOR,
    },
    dates: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#94a3b8',
    },
    body: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#475569',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#64748b',
    },
    small: {
      fontSize: '9px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#94a3b8',
    },
  },

  spacing: {
    pagePadding: {
      top: '32px',
      right: '32px',
      bottom: '32px',
      left: '32px',
    },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '4px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
  },

  colors: {
    primary: ACCENT_COLOR,
    secondary: SECONDARY_COLOR,
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#94a3b8',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#ffffff',
      accent: `${ACCENT_COLOR}06`,
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 6px 0',
    marginBottom: '12px',
  },

  header: {
    variant: 'line-accent',
    showPhoto: false,
    padding: '0',
    marginBottom: '22px',
    contactIcons: {
      show: false,
      size: '12px',
      color: ACCENT_COLOR,
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  summary: {
    variant: 'paragraph',
    showHeading: true,
    headingText: 'Summary',
  },

  skills: {
    variant: 'pills',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '9px',
      padding: '4px 12px',
      borderRadius: '20px',
      borderWidth: '1px',
      borderColor: ACCENT_COLOR,
      backgroundColor: `${ACCENT_COLOR}08`,
      textColor: ACCENT_COLOR,
    },
  },

  experience: {
    variant: 'clean-stacked',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
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
    variant: 'compact',
    showLinks: true,
    showTechnologies: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1 },
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

export default lineAccentConfig;
