/**
 * Clean Minimal Template Configuration (V2)
 *
 * Ultra-clean minimal resume with:
 * - Simple name with thin accent underline
 * - Contact in single line with dot separators
 * - Clean stacked experience
 * - Charcoal/slate accent color
 * - Maximum whitespace and readability
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Charcoal/slate - minimal and sophisticated
const ACCENT_COLOR = '#334155';
const SECONDARY_COLOR = '#64748b';

export const cleanMinimalConfig: TemplateConfig = createTemplateConfig({
  id: 'clean-minimal-v2',
  name: 'Clean Minimal',
  description: 'Ultra-clean minimal resume with maximum whitespace and readability',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0',
      color: '#1f2937',
    },
    title: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0',
      color: '#6b7280',
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR,
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
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
      color: '#9ca3af',
    },
    body: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#4b5563',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#6b7280',
    },
    small: {
      fontSize: '9px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#9ca3af',
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
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#9ca3af',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#ffffff',
      accent: `${ACCENT_COLOR}05`,
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'simple',
    borderWidth: '0',
    borderColor: 'transparent',
    padding: '0 0 4px 0',
    marginBottom: '8px',
  },

  header: {
    variant: 'modern-minimal',
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
      textColor: '#4b5563',
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

export default cleanMinimalConfig;
