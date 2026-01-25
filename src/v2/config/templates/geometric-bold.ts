/**
 * Geometric Bold Template Configuration (V2)
 *
 * Bold creative resume with:
 * - Angular geometric shapes and patterns
 * - Strong visual hierarchy with accent bars
 * - Diamond-shaped contact icons
 * - Photo with corner bracket framing
 * - High contrast typography
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Bold coral/orange palette - energetic and creative
const ACCENT_COLOR = '#f97316'; // Orange
const SECONDARY_COLOR = '#ea580c'; // Darker orange

export const geometricBoldConfig: TemplateConfig = createTemplateConfig({
  id: 'geometric-bold-v2',
  name: 'Geometric Bold',
  description: 'Bold geometric design with angular shapes and striking visual hierarchy',
  category: 'creative',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 800,
      lineHeight: 1.0,
      letterSpacing: '-0.03em',
      textTransform: 'uppercase',
      color: '#0f172a',
    },
    title: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR,
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR,
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: ACCENT_COLOR,
    },
    dates: {
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#64748b',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#334155',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#4b5563',
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
    mainWidth: '100%',
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
    style: 'left-border',
    borderWidth: '4px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 0 12px',
    marginBottom: '12px',
  },

  header: {
    variant: 'geometric-bold',
    showPhoto: true,
    photoSize: '80px',
    photoShape: 'rounded',
    padding: '0',
    marginBottom: '16px',
    contactIcons: {
      show: true,
      size: '14px',
      color: '#ffffff',
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
      fontSize: '10px',
      padding: '5px 12px',
      borderRadius: '0', // Square/angular to match geometric theme
      borderWidth: '2px',
      borderColor: ACCENT_COLOR,
      backgroundColor: '#ffffff',
      textColor: ACCENT_COLOR,
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '◆', // Diamond bullet to match theme
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
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1 },
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

export default geometricBoldConfig;
