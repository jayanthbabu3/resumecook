/**
 * Paper Fold Template Configuration (V2)
 *
 * Elegant asymmetric design featuring:
 * - Diagonal corner fold decoration effect
 * - Split layout with name/title left and contact right
 * - Uppercase title with tracking
 * - Contact icons aligned right
 * - Warm amber/orange accent color
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Warm amber - elegant and approachable
const ACCENT_COLOR = '#d97706';
const SECONDARY_COLOR = '#92400e';

export const paperFoldConfig: TemplateConfig = createTemplateConfig({
  id: 'paper-fold-v2',
  name: 'Paper Fold',
  description: 'Elegant asymmetric design with corner fold decoration',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
      color: '#1e293b',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR,
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
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
      primary: '#1e293b',
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
    padding: '0 0 0 10px',
    marginBottom: '10px',
  },

  header: {
    variant: 'paper-fold',
    showPhoto: false,
    padding: '0',
    marginBottom: '22px',
    contactIcons: {
      show: true,
      size: '11px',
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
    variant: 'tags',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '9px',
      padding: '4px 10px',
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: '#e2e8f0',
      backgroundColor: '#fafaf9',
      textColor: '#44403c',
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

export default paperFoldConfig;
