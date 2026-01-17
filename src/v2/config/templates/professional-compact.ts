/**
 * Professional Compact Template Configuration (V2)
 *
 * Elegant professional resume with:
 * - Summary integrated into header with left accent stripe
 * - Split layout: name/title left, contact card right
 * - Decorative accent underline on name
 * - Rich emerald accent color
 * - Left-border section headings
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Rich emerald - elegant and professional
const ACCENT_COLOR = '#047857';
const SECONDARY_COLOR = '#10b981';

export const professionalCompactConfig: TemplateConfig = createTemplateConfig({
  id: 'professional-compact-v2',
  name: 'Professional Compact',
  description: 'Elegant layout with integrated header summary, accent stripe, and split contact design',
  category: 'professional',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#1f2937',
    },
    title: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      color: ACCENT_COLOR,
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR,
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: ACCENT_COLOR,
    },
    dates: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.7,
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
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#9ca3af',
    },
  },

  spacing: {
    pagePadding: {
      top: '28px',
      right: '32px',
      bottom: '28px',
      left: '32px',
    },
    sectionGap: '18px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '4px',
    contactGap: '8px',
    skillGap: '6px',
  },

  layout: {
    type: 'single-column',
  },

  colors: {
    primary: ACCENT_COLOR,
    secondary: SECONDARY_COLOR,
    text: {
      primary: '#1f2937',
      secondary: '#374151',
      muted: '#6b7280',
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
    marginBottom: '12px',
  },

  header: {
    variant: 'summary-banner',
    showPhoto: false,
    padding: '0',
    marginBottom: '20px',
    contactIcons: {
      show: true,
      size: '13px',
      color: ACCENT_COLOR,
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  summary: {
    variant: 'paragraph',
    showHeading: false,
    headingText: 'Summary',
  },

  skills: {
    variant: 'pills-accent',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 10px',
      borderRadius: '12px',
      borderWidth: '0',
      borderColor: 'transparent',
      backgroundColor: `${ACCENT_COLOR}12`,
      textColor: ACCENT_COLOR,
    },
  },

  experience: {
    variant: 'elegant-timeline',
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
    variant: 'standard',
    showLinks: true,
    showTechnologies: true,
  },

  // NOTE: Summary section is disabled because it's integrated into the header
  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: false, order: 1 },
    { type: 'experience', id: 'experience', title: 'Professional Experience', defaultTitle: 'Professional Experience', enabled: true, order: 2 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3 },
    { type: 'skills', id: 'skills', title: 'Core Competencies', defaultTitle: 'Core Competencies', enabled: true, order: 4 },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 5 },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 6 },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7 },
  ],

  fontFamily: {
    primary: "'Source Sans Pro', 'Inter', 'Helvetica Neue', Arial, sans-serif",
    secondary: "'Source Sans Pro', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  },

  decorations: {
    enabled: false,
    elements: [],
    opacity: 1,
    gradientBackground: false,
  },
});

export default professionalCompactConfig;
