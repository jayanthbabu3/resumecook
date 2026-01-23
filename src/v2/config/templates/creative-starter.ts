/**
 * Creative Starter Template Configuration (V2)
 *
 * Modern creative resume with:
 * - Vibrant gradient header with decorative shapes
 * - Profile photo with white border
 * - Clean modern typography
 * - Colorful skill pills
 * - Modern timeline experience
 * - Purple-to-indigo gradient for a creative vibe
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Vibrant purple gradient - creative and modern
const ACCENT_COLOR = '#8b5cf6';  // Purple
const SECONDARY_COLOR = '#6366f1'; // Indigo

export const creativeStarterConfig: TemplateConfig = createTemplateConfig({
  id: 'creative-starter-v2',
  name: 'Creative Starter',
  description: 'Modern creative layout with vibrant gradient header and decorative elements',
  category: 'creative',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#ffffff', // White on gradient
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      color: 'rgba(255,255,255,0.9)',
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
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: ACCENT_COLOR,
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#4b5563',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: 'rgba(255,255,255,0.95)',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#9ca3af',
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
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#9ca3af',
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
    style: 'simple',
    borderWidth: '0',
    borderColor: 'transparent',
    padding: '0 0 8px 0',
    marginBottom: '12px',
  },

  header: {
    variant: 'gradient-creative',
    showPhoto: true,
    photoSize: '90px',
    photoShape: 'circle',
    padding: '0',
    marginBottom: '24px',
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
    headingText: 'About Me',
  },

  skills: {
    variant: 'pills-accent',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '5px 12px',
      borderRadius: '14px',
      borderWidth: '0',
      borderColor: 'transparent',
      backgroundColor: `${ACCENT_COLOR}15`,
      textColor: ACCENT_COLOR,
    },
  },

  experience: {
    variant: 'elegant-timeline',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '◆',
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
    primary: "'Poppins', 'Inter', 'Helvetica Neue', Arial, sans-serif",
    secondary: "'Poppins', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  },

  decorations: {
    enabled: false,
    elements: [],
    opacity: 1,
    gradientBackground: false,
  },
});

export default creativeStarterConfig;
