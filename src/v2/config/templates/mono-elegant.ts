/**
 * Mono Elegant Template Configuration (V2)
 *
 * Elegant typography with wide letter spacing:
 * - Uppercase name with wide letter spacing
 * - Dotted separator line
 * - Slash separators for contact
 * - Emerald/teal accent color
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Deep emerald - tech-forward yet elegant
const ACCENT_COLOR = '#059669';
const SECONDARY_COLOR = '#0d9488';

export const monoElegantConfig: TemplateConfig = createTemplateConfig({
  id: 'mono-elegant-v2',
  name: 'Mono Elegant',
  description: 'Elegant typography with wide letter spacing and tech-forward aesthetic',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#18181b',
    },
    title: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.03em',
      color: ACCENT_COLOR,
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#18181b',
    },
    itemTitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#18181b',
    },
    itemSubtitle: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: ACCENT_COLOR,
    },
    dates: {
      fontSize: '9px',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      color: '#71717a',
    },
    body: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#3f3f46',
    },
    contact: {
      fontSize: '9px',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      color: '#52525b',
    },
    small: {
      fontSize: '8px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#71717a',
    },
  },

  spacing: {
    pagePadding: {
      top: '36px',
      right: '36px',
      bottom: '36px',
      left: '36px',
    },
    sectionGap: '20px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '3px',
    contactGap: '6px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
  },

  colors: {
    primary: ACCENT_COLOR,
    secondary: SECONDARY_COLOR,
    text: {
      primary: '#18181b',
      secondary: '#3f3f46',
      muted: '#71717a',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#ffffff',
      accent: `${ACCENT_COLOR}08`,
    },
    border: '#e4e4e7',
  },

  sectionHeading: {
    style: 'simple',
    borderWidth: '0',
    borderColor: 'transparent',
    padding: '0 0 6px 0',
    marginBottom: '10px',
  },

  header: {
    variant: 'mono-elegant',
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
    variant: 'inline-dots',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '9px',
      padding: '0',
      borderRadius: '0',
      borderWidth: '0',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      textColor: '#3f3f46',
    },
  },

  experience: {
    variant: 'clean-stacked',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '→',
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
    { type: 'skills', id: 'skills', title: 'Tech Stack', defaultTitle: 'Skills', enabled: true, order: 3 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4 },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 5 },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 6 },
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

export default monoElegantConfig;
