/**
 * Swiss Minimal Template Configuration (V2)
 *
 * Swiss design inspired with:
 * - Bold uppercase name with tight tracking
 * - Geometric accent bar
 * - Grid-based contact layout with square bullets
 * - Strong visual hierarchy
 * - Red accent on neutral background
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Swiss red - bold and confident
const ACCENT_COLOR = '#dc2626';
const SECONDARY_COLOR = '#1f2937';

export const swissMinimalConfig: TemplateConfig = createTemplateConfig({
  id: 'swiss-minimal-v2',
  name: 'Swiss Minimal',
  description: 'Swiss design with bold typography and geometric accents',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.0,
      letterSpacing: '-0.03em',
      textTransform: 'uppercase',
      color: '#000000',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0',
      color: '#333333',
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#000000',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#000000',
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
      color: '#666666',
    },
    body: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#333333',
    },
    contact: {
      fontSize: '10px',
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
      primary: '#000000',
      secondary: '#333333',
      muted: '#666666',
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
    style: 'left-border',
    borderWidth: '3px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 0 10px',
    marginBottom: '10px',
  },

  header: {
    variant: 'swiss-minimal',
    showPhoto: false,
    padding: '0',
    marginBottom: '20px',
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
    variant: 'tags',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '9px',
      padding: '4px 10px',
      borderRadius: '0',
      borderWidth: '1px',
      borderColor: '#e5e7eb',
      backgroundColor: '#ffffff',
      textColor: '#333333',
    },
  },

  experience: {
    variant: 'clean-stacked',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '■',
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
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 3 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4 },
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

export default swissMinimalConfig;
