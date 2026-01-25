/**
 * Project Manager Pro Template Configuration (V2)
 *
 * Clean professional single-column layout with:
 * - Left blue accent bar decoration
 * - Large serif name with sans-serif body
 * - Contact info in bordered boxes with icons
 * - Summary section with underline accent
 * - Work experience with colored company initial icons
 * - Education with separator line
 * - Skills in bordered boxes
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Blue accent color from the screenshot
const ACCENT_COLOR = '#4A90D9';
const ACCENT_COLOR_DARK = '#3A7BC8';

export const projectManagerProConfig: TemplateConfig = createTemplateConfig({
  id: 'project-manager-pro-v2',
  name: 'Project Manager Pro',
  description: 'Clean professional layout with accent bar, perfect for project managers and corporate roles',
  category: 'professional',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#1a1a1a', // Dark name, not accent color
    },
    title: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#1a1a1a',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#1a1a1a',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR, // Position title in accent color
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#1a1a1a', // Company name in bold black
    },
    dates: {
      fontSize: '10px',
      fontWeight: 400,
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
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#374151',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: {
      top: '32px',
      right: '32px',
      bottom: '32px',
      left: '40px', // Extra left padding for accent bar
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
    mainWidth: '100%',
  },

  colors: {
    primary: ACCENT_COLOR,
    secondary: ACCENT_COLOR_DARK,
    text: {
      primary: '#1a1a1a',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#ffffff',
      accent: `${ACCENT_COLOR}08`, // Very subtle blue tint
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 8px 0',
    marginBottom: '16px',
  },

  header: {
    variant: 'boxed-contact-icons',
    showPhoto: false,
    padding: '0',
    marginBottom: '16px',
    contactIcons: {
      show: true,
      size: '14px',
      color: ACCENT_COLOR,
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  summary: {
    variant: 'paragraph',
    showHeading: true,
    headingText: 'Summary',
  },

  skills: {
    variant: 'bordered-tags',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '6px 12px',
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: '#e5e7eb',
      backgroundColor: '#ffffff',
      textColor: '#374151',
    },
  },

  experience: {
    variant: 'icon-clean',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '■',
    showDescription: false,
  },

  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  strengths: {
    variant: 'list',
    showIcons: false,
  },

  achievements: {
    variant: 'list',
    showIndicators: false,
    showMetrics: false,
  },

  languages: {
    variant: 'list',
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
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1 },
    { type: 'experience', id: 'experience', title: 'Work Experience', defaultTitle: 'Work Experience', enabled: true, order: 2 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3 },
    { type: 'skills', id: 'skills', title: 'Relevant Skills', defaultTitle: 'Relevant Skills', enabled: true, order: 4 },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 5 },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 6 },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7 },
  ],

  fontFamily: {
    primary: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    secondary: "'Georgia', 'Times New Roman', serif",
  },

  decorations: {
    enabled: true,
    elements: ['left-gradient-bar'],
    opacity: 1,
    gradientBackground: false,
  },
});

export default projectManagerProConfig;
