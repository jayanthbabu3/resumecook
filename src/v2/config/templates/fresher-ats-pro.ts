/**
 * Fresher ATS Pro Template Configuration
 *
 * Highly ATS-optimized resume template for fresh graduates.
 *
 * UNIQUE FEATURES:
 * - Skills in category-lines format (inline with category headings)
 * - Section headings with thick underline accent
 * - Projects in 2-column grid layout
 * - Clean single-column layout optimized for ATS parsing
 * - Summary with bullet point highlights
 *
 * Perfect for: All freshers applying through ATS systems
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherAtsProConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-ats-pro-v2',
  name: 'Fresher ATS Pro',
  description: 'Highly ATS-optimized resume with category skills, thick underlines, and grid projects',
  category: 'professional',

  typography: {
    name: {
      fontSize: '26px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0',
      color: '#1a1a1a',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      color: '#4a5568',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#1a1a1a',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    itemSubtitle: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2d3748',
    },
    dates: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#718096',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#2d3748',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#4a5568',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#718096',
    },
  },

  spacing: {
    pagePadding: { top: '28px', right: '28px', bottom: '28px', left: '28px' },
    sectionGap: '16px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '4px',
    contactGap: '10px',
    skillGap: '6px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#1a365d',
    secondary: '#2d3748',
    text: {
      primary: '#1a1a1a',
      secondary: '#2d3748',
      muted: '#718096',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f7fafc',
    },
    border: '#e2e8f0',
  },

  // Thick underline section headings
  sectionHeading: {
    style: 'underline-thick',
    borderWidth: '2px',
    borderColor: '#1a365d',
    marginBottom: '12px',
  },

  // Clean centered header - optimal for ATS parsing
  header: {
    variant: 'centered',
    showPhoto: false,
    photoSize: '72px',
    photoShape: 'circle',
    padding: '0',
    backgroundColor: 'transparent',
    textColor: '#1a1a1a',
    contactIcons: { show: true, size: '12px', color: '#1a365d' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills in TABLE format with categories
  skills: {
    variant: 'table',
    columns: 1,
    showRatings: false,
    separator: ', ',
    badge: {
      fontSize: '11px',
      padding: '4px 8px',
      borderRadius: '4px',
      borderWidth: '0',
      backgroundColor: '#edf2f7',
      textColor: '#1a365d',
    },
  },

  // Experience with TWO-COLUMN-DATES variant (dates on left column)
  experience: {
    variant: 'two-column-dates',
    datePosition: 'left',
    showLocation: true,
    bulletStyle: '•',
  },

  // Education with TWO-COLUMN-DATES variant
  education: {
    variant: 'two-column-dates',
    showGPA: true,
    showField: true,
    showDates: true,
    showHonors: true,
    showCoursework: false,
    datePosition: 'left',
  },

  // Projects in STANDARD variant (clean list)
  projects: {
    variant: 'standard',
    showLinks: true,
    showTech: true,
  },

  // Achievements with METRICS variant (show impact numbers)
  achievements: {
    variant: 'metrics',
    showIndicators: true,
    showMetrics: true,
  },

  // Certifications with COMPACT variant
  certifications: {
    variant: 'compact',
  },

  // Strengths with CARDS variant
  strengths: {
    variant: 'cards',
    showIcons: false,
  },

  // Languages with GRID variant
  languages: {
    variant: 'grid',
    showCertification: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Professional Summary', defaultTitle: 'Professional Summary', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internship Experience', defaultTitle: 'Internship Experience', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements & Awards', defaultTitle: 'Achievements & Awards', enabled: true, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Georgia', 'Times New Roman', serif",
    secondary: "'Arial', 'Helvetica', sans-serif",
  },

  colorSlots: [
    {
      name: 'primary',
      label: 'Accent Color',
      defaultColor: '#1a365d',
      description: 'Primary accent for headings and links',
    },
    {
      name: 'secondary',
      label: 'Text Color',
      defaultColor: '#2d3748',
      description: 'Secondary text color',
    },
  ],

  decorations: {
    enabled: false,
    elements: [],
    opacity: 0,
  },
});

export default fresherAtsProConfig;
