/**
 * Fresher Bold Template Configuration
 *
 * Industry-ready bold design for fresh graduates.
 * Features a striking dark header with gradient accent,
 * clean two-column layout optimized for ATS systems,
 * and strong visual hierarchy that catches recruiters' attention.
 * Perfect for tech, engineering, and business freshers.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fresherBoldConfig: TemplateConfig = createTemplateConfig({
  id: 'fresher-bold-v2',
  name: 'Fresher Bold',
  description: 'Industry-ready bold design with striking header for fresh graduates',
  category: 'modern',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#ffffff',
    },
    title: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#94a3b8',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#1e293b',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#3b82f6',
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
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#cbd5e1',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
    },
  },

  spacing: {
    pagePadding: { top: '0px', right: '28px', bottom: '24px', left: '28px' },
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
    primary: '#3b82f6',
    secondary: '#0f172a',
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#eff6ff',
    },
    border: '#e2e8f0',
  },

  sectionHeading: {
    style: 'accent-bar',
    borderWidth: '3px',
    borderColor: '#3b82f6',
    marginBottom: '12px',
    padding: '0 0 0 12px',
  },

  header: {
    variant: 'banner',
    showPhoto: true,
    photoSize: '90px',
    photoShape: 'rounded',
    padding: '32px 32px',
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    contactIcons: { show: true, size: '12px', color: '#3b82f6' },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 4,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '6px 14px',
      borderRadius: '6px',
      borderWidth: '0',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
    },
  },

  experience: {
    variant: 'modern',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  education: {
    variant: 'detailed',
    showGPA: true,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  projects: {
    variant: 'modern',
    showLinks: true,
    showTech: true,
  },

  achievements: {
    variant: 'compact',
    showIndicators: true,
  },

  certifications: {
    variant: 'compact',
  },

  strengths: {
    variant: 'inline-badges',
    showIcons: false,
  },

  languages: {
    variant: 'inline',
    showCertification: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Technical Skills', defaultTitle: 'Technical Skills', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Internship Experience', defaultTitle: 'Internship Experience', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: true, order: 6, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 7, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 8, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  colorSlots: [
    {
      name: 'primary',
      label: 'Accent Color',
      defaultColor: '#3b82f6',
      description: 'Primary accent color for highlights and headings',
    },
    {
      name: 'secondary',
      label: 'Header Color',
      defaultColor: '#0f172a',
      description: 'Dark header background color',
    },
  ],

  decorations: {
    enabled: true,
    elements: ['header-circles', 'geometric-corner'],
    opacity: 0.8,
  },
});

export default fresherBoldConfig;
