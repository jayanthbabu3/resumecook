/**
 * Minimal Edge Template Configuration (V2)
 *
 * Ultra-clean design with sharp geometric accents:
 * - Corner geometric accent (diagonal square)
 * - Name with offset from accent
 * - Contact with labels and vertical separators
 * - Bold accent border on sections
 * - Rose/pink accent color palette
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Deep rose - elegant and distinctive
const ACCENT_COLOR = '#e11d48';
const SECONDARY_COLOR = '#f43f5e';

export const minimalEdgeConfig: TemplateConfig = createTemplateConfig({
  id: 'minimal-edge-v2',
  name: 'Minimal Edge',
  description: 'Ultra-clean design with sharp geometric accents and modern typography',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    title: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.04em',
      color: ACCENT_COLOR,
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR,
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
      color: '#334155',
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
      lineHeight: 1.7,
      color: '#475569',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#334155',
    },
    small: {
      fontSize: '9px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
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
    style: 'simple',
    borderWidth: '0',
    borderColor: 'transparent',
    padding: '0',
    marginBottom: '14px',
  },

  header: {
    variant: 'minimal-edge',
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
    headingText: 'Summary',
  },

  skills: {
    variant: 'bordered-tags',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '9px',
      padding: '5px 12px',
      borderRadius: '2px',
      borderWidth: '1px',
      borderColor: '#e2e8f0',
      backgroundColor: '#ffffff',
      textColor: '#334155',
    },
  },

  experience: {
    variant: 'modern',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '–',
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
    variant: 'minimal',
    showIcons: false,
  },

  achievements: {
    variant: 'minimal',
    showIndicators: false,
    showMetrics: true,
  },

  languages: {
    variant: 'list',
  },

  certifications: {
    variant: 'list',
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
    primary: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  decorations: {
    enabled: false,
    elements: [],
    opacity: 1,
    gradientBackground: false,
  },
});

export default minimalEdgeConfig;
