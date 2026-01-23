/**
 * Ink Blot Template Configuration (V2)
 *
 * Modern minimal design featuring:
 * - Circular accent blob behind the name
 * - Clean typography with negative letter spacing
 * - Title with accent dot indicator
 * - Inline contact with pipe separators
 * - Violet/Purple accent color
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Modern violet - creative yet professional
const ACCENT_COLOR = '#7c3aed';
const SECONDARY_COLOR = '#4c1d95';

export const inkBlotConfig: TemplateConfig = createTemplateConfig({
  id: 'ink-blot-v2',
  name: 'Ink Blot',
  description: 'Modern minimal with circular accent blob and clean typography',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      color: '#475569',
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
      color: '#1e293b',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: ACCENT_COLOR,
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
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
    style: 'underline',
    borderWidth: '2px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 6px 0',
    marginBottom: '12px',
  },

  header: {
    variant: 'ink-blot',
    showPhoto: false,
    padding: '0',
    marginBottom: '24px',
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
    headingText: 'About',
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
      borderColor: '#e2e8f0',
      backgroundColor: '#f8fafc',
      textColor: '#475569',
    },
  },

  experience: {
    variant: 'standard',
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
    { type: 'summary', id: 'summary', title: 'About', defaultTitle: 'About', enabled: true, order: 1 },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2 },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 3 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4 },
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

export default inkBlotConfig;
