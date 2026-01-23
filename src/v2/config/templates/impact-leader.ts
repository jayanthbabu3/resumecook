/**
 * Impact Leader Template Configuration
 *
 * A modern, ATS-friendly resume template designed for executives,
 * senior professionals, and leaders. Features:
 * - Clean single-column layout (100% ATS compatible)
 * - Bold header with distinctive accent bar
 * - Left-border section headings for visual hierarchy
 * - Professional slate/teal color scheme
 * - Impact-focused experience formatting
 * - Excellent readability with generous spacing
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const impactLeaderConfig: TemplateConfig = createTemplateConfig({
  id: 'impact-leader-v2',
  name: 'Impact Leader',
  description: 'Modern ATS-friendly template for executives and senior professionals',
  category: 'professional',

  // Typography - Modern, professional hierarchy
  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.025em',
      color: '#0f172a', // Slate-900
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      color: '#0d9488', // Teal-600
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#0f172a', // Slate-900
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e293b', // Slate-800
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0d9488', // Teal-600
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b', // Slate-500
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#334155', // Slate-700
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#475569', // Slate-600
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b', // Slate-500
    },
  },

  // Spacing - Standard spacing
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

  // Layout - Clean single column (best for ATS)
  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  // Colors - Professional slate/teal scheme
  colors: {
    primary: '#0d9488', // Teal-600
    secondary: '#14b8a6', // Teal-500
    text: {
      primary: '#0f172a', // Slate-900
      secondary: '#334155', // Slate-700
      muted: '#64748b', // Slate-500
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f8fafc', // Slate-50
      accent: '#f0fdfa', // Teal-50
    },
    border: '#e2e8f0', // Slate-200
  },

  // Section heading - Distinctive left border style
  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    borderColor: '#0d9488', // Teal-600
    marginBottom: '16px',
    padding: '4px 0 4px 12px',
  },

  // Header configuration
  header: {
    variant: 'left-aligned',
    showPhoto: false, // ATS-friendly: no photo
    padding: '0 0 20px 0',
    marginBottom: '8px',
    borderBottom: '2px solid #0d9488', // Teal accent bar
    contactIcons: {
      show: true,
      size: '14px',
      color: '#0d9488',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  // Skills - Clean tag style
  skills: {
    variant: 'tags',
    columns: 4,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '5px 12px',
      borderRadius: '4px',
      borderWidth: '1px',
      backgroundColor: '#f0fdfa', // Teal-50
      borderColor: '#99f6e4', // Teal-200
      textColor: '#0f766e', // Teal-700
    },
  },

  // Experience - Impact-focused formatting
  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸', // Modern arrow bullet
  },

  // Education
  education: {
    variant: 'standard',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  // Languages
  languages: {
    variant: 'inline',
  },

  // Section order
  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Professional Summary', defaultTitle: 'Professional Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Professional Experience', defaultTitle: 'Professional Experience', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Core Competencies', defaultTitle: 'Core Competencies', enabled: true, order: 3, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 5, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Key Projects', defaultTitle: 'Key Projects', enabled: false, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Key Achievements', defaultTitle: 'Key Achievements', enabled: false, order: 7, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 8, column: 'main' },
    { type: 'awards', id: 'awards', title: 'Awards & Recognition', defaultTitle: 'Awards & Recognition', enabled: false, order: 9, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default impactLeaderConfig;
