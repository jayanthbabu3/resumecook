/**
 * Elegant ATS Template Configuration (V2)
 *
 * Minimal, ATS-friendly two-column layout with a structured sidebar
 * for fast scanning and clean typography for easy parsing.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const elegantAtsConfig: TemplateConfig = createTemplateConfig({
  id: 'elegant-ats-v2',
  name: 'Elegant ATS',
  description: 'Minimal two-column layout with a structured sidebar and crisp typography',
  category: 'professional',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#0f172a',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#0ea5e9',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#0f172a',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#0ea5e9',
    },
    dates: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#475569',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#1e293b',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#0f172a',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.3,
      color: '#475569',
    },
  },

  spacing: {
    pagePadding: {
      top: '28px',
      right: '32px',
      bottom: '30px',
      left: '32px',
    },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '10px',
    bulletGap: '4px',
    contactGap: '10px',
    skillGap: '8px',
  },

  layout: {
    type: 'two-column-right',
    mainWidth: '68%',
    sidebarWidth: '30%',
    columnGap: '28px',
    sidebarBackground: '#f8fafc',
    sidebarPadding: '18px',
    sidebarTextColor: '#0f172a',
  },

  colors: {
    primary: '#0ea5e9', // Sky blue - modern professional
    secondary: '#0891b2',
    text: {
      primary: '#0f172a',
      secondary: '#1e293b',
      muted: '#475569',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#f8fafc',
      accent: '#e2e8f0',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'left-border',
    borderWidth: '3px',
    borderColor: '#0ea5e9',
    padding: '0 0 8px 12px',
    marginBottom: '10px',
  },

  header: {
    variant: 'elegant-banner',
    showPhoto: true,
    photoSize: '80px',
    photoShape: 'circle',
    padding: '0',
    marginBottom: '0',
    contactIcons: {
      show: true,
      size: '14px',
      color: '#0ea5e9',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'bars',
    columns: 1,
    showRatings: true,
    badge: {
      fontSize: '11px',
      padding: '6px 10px',
      borderRadius: '10px',
      borderWidth: '1px',
      borderColor: '#e2e8f0',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: 'disc',
    showDescription: true,
  },

  education: {
    variant: 'compact',
    showGPA: false,
    showField: true,
    showDates: true,
    showHonors: true,
    datePosition: 'right',
  },

  strengths: {
    variant: 'accent-border',
    showIcons: false,
  },

  achievements: {
    variant: 'minimal',
    showIndicators: true,
    showMetrics: true,
  },

  languages: {
    variant: 'bars',
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Professional Summary', defaultTitle: 'Professional Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Key Achievements', defaultTitle: 'Key Achievements', enabled: true, order: 5, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 1, column: 'sidebar' },
    { type: 'strengths', id: 'strengths', title: 'Core Strengths', defaultTitle: 'Core Strengths', enabled: true, order: 2, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 3, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 4, column: 'sidebar' },
    { type: 'interests', id: 'interests', title: 'Interests', defaultTitle: 'Interests', enabled: false, order: 5, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    secondary: "'Source Serif 4', 'Georgia', serif",
  },
});

export default elegantAtsConfig;
