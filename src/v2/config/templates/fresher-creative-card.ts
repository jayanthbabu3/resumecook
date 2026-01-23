/**
 * Fresher Creative Card Template Configuration
 *
 * Unique creative resume template for fresh graduates with modern card-based design.
 *
 * UNIQUE FEATURES:
 * - Sidebar-card header with accent stripe
 * - Skills in dots rating variant (visual skill levels)
 * - Projects in cards variant with shadows
 * - Experience with timeline variant (visual timeline on left)
 * - Education in card variant
 * - Achievements in numbered variant
 * - Strengths in accent-grid variant
 * - Background section headings for modern look
 *
 * Perfect for: Creative tech freshers, designers, and modern professionals
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherCreativeCardConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-creative-card-v2',
  name: 'Fresher Creative Card',
  description: 'Modern creative resume with card-based design, timeline experience, and visual skill ratings',
  category: 'creative',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1a1a1a',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      color: '#6366f1',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#ffffff',
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
      color: '#4b5563',
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#374151',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#4b5563',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: { top: '24px', right: '28px', bottom: '24px', left: '28px' },
    sectionGap: '14px',
    itemGap: '10px',
    headingToContent: '6px',
    bulletGap: '3px',
    contactGap: '8px',
    skillGap: '6px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#6366f1', // Indigo accent
    secondary: '#4f46e5',
    text: {
      primary: '#1a1a1a',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f5f3ff',
    },
    border: '#e5e7eb',
  },

  // Background-filled section headings (solid dark background with white text)
  sectionHeading: {
    style: 'background-filled',
    borderWidth: '0',
    borderColor: '#6366f1',
    backgroundColor: '#6366f1',
    marginBottom: '14px',
    padding: '8px 14px',
  },

  header: {
    variant: 'sidebar-card',
    showPhoto: true,
    photoSize: '70px',
    photoShape: 'rounded',
    padding: '0',
    backgroundColor: 'transparent',
    textColor: '#1a1a1a',
    contactIcons: { show: true, size: '13px', color: '#6366f1' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills with DOTS rating variant (visual skill levels)
  skills: {
    variant: 'dots',
    columns: 2,
    showRatings: true,
    separator: ', ',
    badge: {
      fontSize: '11px',
      padding: '5px 12px',
      borderRadius: '6px',
      borderWidth: '1px',
      borderColor: '#6366f1',
      backgroundColor: 'transparent',
      textColor: '#4f46e5',
    },
  },

  // Experience with DOTS-TIMELINE variant (connected dots timeline)
  experience: {
    variant: 'dots-timeline',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  // Education with CARD variant
  education: {
    variant: 'card',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  // Projects in CARDS variant with shadows
  projects: {
    variant: 'cards',
    showLinks: true,
    showTech: true,
  },

  // Achievements with NUMBERED variant
  achievements: {
    variant: 'numbered',
    showIndicators: true,
  },

  // Certifications with BADGES variant
  certifications: {
    variant: 'badges',
  },

  // Strengths with ACCENT-GRID variant
  strengths: {
    variant: 'accent-grid',
    showIcons: false,
    columns: 2,
  },

  // Languages with BARS variant
  languages: {
    variant: 'bars',
    showCertification: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  colorSlots: [
    {
      name: 'primary',
      label: 'Accent Color',
      defaultColor: '#6366f1',
      description: 'Primary accent for headings, icons, and highlights',
    },
    {
      name: 'secondary',
      label: 'Text Color',
      defaultColor: '#374151',
      description: 'Secondary text color',
    },
  ],

  decorations: {
    enabled: false,
    elements: [],
    opacity: 0,
  },
});

export default fresherCreativeCardConfig;
