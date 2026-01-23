/**
 * Fresher Technical Template Configuration
 *
 * Professional technical resume template for fresh CS/IT graduates.
 *
 * UNIQUE FEATURES:
 * - Skills displayed in table format (Category | Technologies)
 * - Section headings with dark background fill
 * - Projects in 2-column grid layout
 * - Professional summary with bullet points
 * - Clean, ATS-optimized single-column layout
 *
 * Perfect for: CS graduates, IT freshers, Engineering students
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherTechnicalConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-technical-v2',
  name: 'Fresher Technical',
  description: 'Professional technical resume with skills table, grid projects, and dark section headers',
  category: 'modern',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#111827',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      color: '#2563eb',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#ffffff',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#111827',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2563eb',
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
      lineHeight: 1.6,
      color: '#374151',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#374151',
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
    primary: '#2563eb',
    secondary: '#1e293b',
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#eff6ff',
    },
    border: '#e5e7eb',
  },

  // Dark filled section headings (like "TECHNICAL SKILLS:" in the image)
  sectionHeading: {
    style: 'background-filled',
    backgroundColor: '#1e293b',
    padding: '6px 12px',
    marginBottom: '14px',
  },

  // Banner header with summary - white background version
  header: {
    variant: 'banner-with-summary',
    showPhoto: true,
    photoSize: '80px',
    photoShape: 'circle',
    photoPosition: 'right',
    padding: '28px 32px',
    backgroundColor: '#ffffff',
    textColor: '#111827',
    borderBottom: '2px solid #2563eb',
    contactIcons: { show: true, size: '14px', color: '#2563eb' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills in TABLE format with categories
  skills: {
    variant: 'table',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '4px 10px',
      borderRadius: '4px',
      borderWidth: '0',
      backgroundColor: '#eff6ff',
      textColor: '#2563eb',
    },
  },

  // Experience with COMPACT variant (condensed single-line header)
  experience: {
    variant: 'compact',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▪',
  },

  // Education with TIMELINE variant (visual timeline)
  education: {
    variant: 'timeline',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  // Projects in 2-column GRID layout
  projects: {
    variant: 'grid',
    showLinks: true,
    showTech: true,
  },

  // Achievements with CARDS variant (card style with background)
  achievements: {
    variant: 'cards',
    showIndicators: true,
  },

  // Certifications with BADGES variant
  certifications: {
    variant: 'badges',
  },

  // Strengths with GRID variant (2-column grid cards)
  strengths: {
    variant: 'grid',
    showIcons: false,
    columns: 2,
  },

  // Languages with PILLS variant
  languages: {
    variant: 'pills',
    showCertification: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Professional Summary', defaultTitle: 'Professional Summary', enabled: true, order: 1, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internship Experience', defaultTitle: 'Internship Experience', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  colorSlots: [
    {
      name: 'primary',
      label: 'Accent Color',
      defaultColor: '#2563eb',
      description: 'Primary accent color for links and highlights',
    },
    {
      name: 'secondary',
      label: 'Header Background',
      defaultColor: '#1e293b',
      description: 'Dark background for section headings',
    },
  ],

  decorations: {
    enabled: false,
    elements: [],
    opacity: 0,
  },
});

export default fresherTechnicalConfig;
