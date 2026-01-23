/**
 * Modern Wave Template Configuration
 *
 * A contemporary resume template with a distinctive wave-accent header,
 * gradient accents, and modern typography.
 *
 * UNIQUE FEATURES:
 * - Wave-accent header with gradient top border and circular photo
 * - Soft gradient backgrounds on sections
 * - Timeline experience with dots
 * - Skills in modern boxed layout
 * - Clean card-style certifications
 * - Two-column layout for efficient space usage
 *
 * Perfect for: Tech professionals, designers, modern job seekers
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const modernWaveConfig: TemplateConfig = createTemplateConfig({
  id: 'modern-wave-v2',
  name: 'Modern Wave',
  description: 'Contemporary template with wave-accent header, gradient accents, and modern layout',
  category: 'modern',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#1a1a1a',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      color: '#1a365d',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#1a365d',
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
      color: '#1a365d',
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
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
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#475569',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
    },
  },

  spacing: {
    pagePadding: { top: '0px', right: '32px', bottom: '32px', left: '32px' },
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
    primary: '#1a365d',
    secondary: '#1a1a1a',
    text: {
      primary: '#1a1a1a',
      secondary: '#444444',
      muted: '#888888',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f8fafc',
      accent: '#eef2f7',
    },
    border: '#e2e8f0',
  },

  // Left border accent style for section headings
  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    borderColor: '#1a365d',
    padding: '0 0 0 12px',
    marginBottom: '14px',
  },

  // Wave-accent header - new unique header style
  header: {
    variant: 'wave-accent',
    showPhoto: true,
    photoSize: '140px',
    photoShape: 'circle',
    photoPosition: 'left',
    padding: '40px 32px 0 32px',
    backgroundColor: '#faf8f8',
    textColor: '#1a1a1a',
    borderBottom: 'none',
    contactIcons: { show: true, size: '14px', color: '#1a365d' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills in modern boxed style
  skills: {
    variant: 'boxed',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '6px 12px',
      borderRadius: '6px',
      borderWidth: '1px',
      borderColor: '#e2e8f0',
      backgroundColor: '#ffffff',
      textColor: '#334155',
    },
  },

  // Experience with dots-timeline variant
  experience: {
    variant: 'dots-timeline',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  // Education with card variant
  education: {
    variant: 'card',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  // Projects with standard variant
  projects: {
    variant: 'standard',
    showLinks: true,
    showTech: true,
  },

  // Achievements with metrics variant
  achievements: {
    variant: 'metrics',
    showIndicators: true,
    showMetrics: true,
  },

  // Certifications with cards variant
  certifications: {
    variant: 'cards',
  },

  // Strengths with accent-border variant
  strengths: {
    variant: 'accent-border',
    showIcons: false,
    columns: 2,
  },

  // Languages with pills variant
  languages: {
    variant: 'pills',
    showCertification: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Work Experience', defaultTitle: 'Work Experience', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills & Technologies', defaultTitle: 'Skills & Technologies', enabled: true, order: 3, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Featured Projects', defaultTitle: 'Featured Projects', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Key Achievements', defaultTitle: 'Key Achievements', enabled: false, order: 7, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 8, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  colorSlots: [
    {
      name: 'primary',
      label: 'Accent Color',
      defaultColor: '#1a365d',
      description: 'Primary accent color for contact bar and highlights',
    },
    {
      name: 'secondary',
      label: 'Text Color',
      defaultColor: '#1a1a1a',
      description: 'Main text and heading color',
    },
  ],

  decorations: {
    enabled: false,
    elements: [],
    opacity: 0,
  },
});

export default modernWaveConfig;
