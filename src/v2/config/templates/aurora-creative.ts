/**
 * Aurora Creative Template Configuration (V2)
 *
 * Stunning creative resume with:
 * - Aurora borealis-inspired gradient header
 * - Glass morphism effects
 * - Frosted glass contact pills
 * - Elegant timeline experience
 * - Teal to purple to pink gradient palette
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Aurora palette - teal to purple to pink
const ACCENT_COLOR = '#0d9488'; // Teal
const SECONDARY_COLOR = '#8b5cf6'; // Purple

export const auroraCreativeConfig: TemplateConfig = createTemplateConfig({
  id: 'aurora-creative-v2',
  name: 'Aurora Creative',
  description: 'Stunning aurora-inspired design with glass morphism effects',
  category: 'creative',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#ffffff', // White on gradient
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.03em',
      color: 'rgba(255,255,255,0.95)',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.06em',
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
      color: ACCENT_COLOR,
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: SECONDARY_COLOR,
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#334155',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: 'rgba(255,255,255,0.95)',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#94a3b8',
    },
  },

  spacing: {
    pagePadding: {
      top: '0px', // No top padding - header extends to edge
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
      secondary: '#334155',
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
    style: 'simple',
    borderWidth: '0',
    borderColor: 'transparent',
    padding: '0 0 8px 0',
    marginBottom: '12px',
  },

  header: {
    variant: 'aurora-glass',
    showPhoto: true,
    photoSize: '85px',
    photoShape: 'circle',
    padding: '0',
    marginBottom: '28px',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#ffffff',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  summary: {
    variant: 'paragraph',
    showHeading: true,
    headingText: 'About Me',
  },

  skills: {
    variant: 'pills-accent',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '5px 14px',
      borderRadius: '16px',
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
    bulletStyle: '●',
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
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1 },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3 },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4 },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 5 },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 6 },
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

export default auroraCreativeConfig;
