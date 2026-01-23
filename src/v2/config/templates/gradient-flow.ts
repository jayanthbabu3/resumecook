/**
 * Gradient Flow Template Configuration (V2)
 *
 * Modern asymmetric design with gradient accents:
 * - Horizontal gradient accent bar at top
 * - Bold name with accent line prefix
 * - Contact grid with icon badges
 * - Clean section separators
 * - Teal/cyan accent color palette
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Vibrant teal - fresh and modern
const ACCENT_COLOR = '#0d9488';
const SECONDARY_COLOR = '#14b8a6';

export const gradientFlowConfig: TemplateConfig = createTemplateConfig({
  id: 'gradient-flow-v2',
  name: 'Gradient Flow',
  description: 'Modern asymmetric design with gradient accents and bold typography',
  category: 'modern',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
      color: '#0f172a',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      color: ACCENT_COLOR,
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
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
      color: '#64748b',
    },
    body: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#475569',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#475569',
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
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#ffffff',
      accent: `${ACCENT_COLOR}08`,
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 0 12px',
    marginBottom: '12px',
  },

  header: {
    variant: 'gradient-flow',
    showPhoto: false,
    padding: '0',
    marginBottom: '20px',
    contactIcons: {
      show: true,
      size: '14px',
      color: ACCENT_COLOR,
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  summary: {
    variant: 'paragraph',
    showHeading: true,
    headingText: 'Profile',
  },

  skills: {
    variant: 'pills',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '9px',
      padding: '5px 14px',
      borderRadius: '4px',
      borderWidth: '0',
      borderColor: 'transparent',
      backgroundColor: `${ACCENT_COLOR}12`,
      textColor: ACCENT_COLOR,
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
    showDescription: false,
  },

  education: {
    variant: 'standard',
    showGPA: true,
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
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1 },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3 },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4 },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 5 },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 6 },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7 },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  decorations: {
    enabled: false,
    elements: [],
    opacity: 1,
    gradientBackground: false,
  },
});

export default gradientFlowConfig;
