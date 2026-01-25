/**
 * Refined Serif Template Configuration (V2)
 *
 * Elegant centered typography with:
 * - Centered header with decorative line
 * - Thin decorative line separators
 * - Vertical bar contact separators
 * - Classic sophisticated aesthetic
 * - Warm neutral tones
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Warm burgundy accent - sophisticated and timeless
const ACCENT_COLOR = '#7c2d12';
const SECONDARY_COLOR = '#a16207';

export const refinedSerifConfig: TemplateConfig = createTemplateConfig({
  id: 'refined-serif-v2',
  name: 'Refined Serif',
  description: 'Elegant centered typography with thin line separators and classic aesthetic',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '0.02em',
      color: '#1a1a1a',
    },
    title: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#666666',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR,
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1a1a1a',
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
      color: '#888888',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#444444',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#666666',
    },
    small: {
      fontSize: '9px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#888888',
    },
  },

  spacing: {
    pagePadding: {
      top: '40px',
      right: '40px',
      bottom: '40px',
      left: '40px',
    },
    sectionGap: '18px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '4px',
    contactGap: '16px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: ACCENT_COLOR,
    secondary: SECONDARY_COLOR,
    text: {
      primary: '#1a1a1a',
      secondary: '#444444',
      muted: '#888888',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#ffffff',
      accent: `${ACCENT_COLOR}08`,
    },
    border: '#e5e5e5',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#e5e5e5',
    padding: '0 0 6px 0',
    marginBottom: '12px',
  },

  header: {
    variant: 'refined-serif',
    showPhoto: false,
    padding: '0',
    marginBottom: '16px',
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
    headingText: 'Profile',
  },

  skills: {
    variant: 'inline-dots',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '0',
      borderRadius: '0',
      borderWidth: '0',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      textColor: '#444444',
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
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1 },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3 },
    { type: 'skills', id: 'skills', title: 'Expertise', defaultTitle: 'Skills', enabled: true, order: 4 },
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

export default refinedSerifConfig;
