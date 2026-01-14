/**
 * Admin Assistant Pro Template Configuration (V2)
 *
 * Professional two-column layout with golden/yellow accent color,
 * designed for administrative professionals. Features:
 * - Name in accent color with photo on top-right
 * - Summary paragraph with contact row below
 * - Two-column layout: Experience on left, Skills/Education on right
 * - Boxed skill tags with clean borders
 * - Yellow/golden section headings with underline
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Golden/yellow accent color from the screenshot
const ACCENT_COLOR = '#d4a012';
const ACCENT_COLOR_DARK = '#b8900f';

export const adminAssistantProConfig: TemplateConfig = createTemplateConfig({
  id: 'admin-assistant-pro-v2',
  name: 'Admin Assistant Pro',
  description: 'Professional two-column layout with golden accent, perfect for administrative roles',
  category: 'professional',

  typography: {
    name: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: ACCENT_COLOR, // Golden name
    },
    title: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#1a1a1a', // Dark gray title
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: ACCENT_COLOR, // Golden section headings
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#4b5563', // Gray for company/location
    },
    dates: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#374151',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#1a1a1a',
    },
    small: {
      fontSize: '11px',
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
      left: '32px',
    },
    sectionGap: '20px',
    itemGap: '16px',
    headingToContent: '12px',
    bulletGap: '4px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'two-column-right',
    mainWidth: '62%',
    sidebarWidth: '35%',
    columnGap: '28px',
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
      accent: '#fef9e7', // Warm cream/golden tint for gradient background
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 8px 0',
    marginBottom: '14px',
  },

  header: {
    variant: 'summary-photo-right',
    showPhoto: true,
    photoSize: '90px',
    photoShape: 'rounded',
    padding: '0',
    marginBottom: '20px',
    contactIcons: {
      show: false, // No icons, just text with separators
      size: '14px',
      color: ACCENT_COLOR,
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'boxed',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '12px',
      padding: '8px 14px',
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: '#e5e7eb',
      backgroundColor: '#ffffff',
      textColor: '#374151',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
    showDescription: true,
  },

  education: {
    variant: 'compact',
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
    variant: 'boxed',
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

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'experience', id: 'experience', title: 'Professional Experience', defaultTitle: 'Professional Experience', enabled: true, order: 1, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 1, column: 'sidebar' },
    { type: 'skills', id: 'skills', title: 'Key Skills', defaultTitle: 'Key Skills', enabled: true, order: 2, column: 'sidebar' },
    { type: 'achievements', id: 'achievements', title: 'Additional Skills', defaultTitle: 'Additional Skills', enabled: true, order: 3, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 4, column: 'sidebar' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 5, column: 'sidebar' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 2, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    secondary: "'Georgia', 'Times New Roman', serif",
  },

  decorations: {
    enabled: true,
    elements: ['full-page-gradient', 'header-accent'],
    opacity: 1,
    gradientBackground: false, // Using full-page-gradient element instead for PDF compatibility
  },
});

export default adminAssistantProConfig;
