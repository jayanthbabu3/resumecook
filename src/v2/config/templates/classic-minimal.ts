/**
 * Classic Minimal Template Configuration (V2)
 *
 * Clean, professional design with modern typography.
 * Perfect for all industries with a timeless look.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const classicMinimalConfig: TemplateConfig = createTemplateConfig({
  id: 'classic-minimal-v2',
  name: 'Classic Minimal',
  description: 'Clean professional design with modern typography',
  category: 'professional',

  typography: {
    name: {
      fontSize: '22px',      // 18-24px range
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      color: '#111827',
      textTransform: 'none',
    },
    title: {
      fontSize: '12px',      // Professional title
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#4b5563',
    },
    sectionHeading: {
      fontSize: '11px',      // 11-12px range
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#111827',
    },
    itemTitle: {
      fontSize: '12px',      // 11-13px range
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#111827',
    },
    itemSubtitle: {
      fontSize: '11px',      // Company/school names
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#4b5563',
    },
    dates: {
      fontSize: '10px',      // 10-11px range
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '11px',      // 10-12px (11px ideal)
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#374151',
    },
    contact: {
      fontSize: '10px',      // Contact info
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#4b5563',
    },
    small: {
      fontSize: '10px',      // Meta info
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: {
      top: '40px',
      right: '40px',
      bottom: '40px',
      left: '40px',
    },
    sectionGap: '22px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '4px',
    contactGap: '16px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#1e3a5f', // Navy blue - classic professional
    secondary: '#3b82f6', // Lighter blue for accents
    text: {
      primary: '#1f2937',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f0f7ff', // Soft blue tint for gradient
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#e5e7eb',
    marginBottom: '10px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '0 0 16px 0',
    marginBottom: '0',
    contactIcons: {
      show: false,
      size: '12px',
      color: '#6b7280',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'inline',
    columns: 1,
    showRatings: false,
    separator: '  •  ',
    badge: {
      fontSize: '13px',
      padding: '0',
      borderRadius: '0',
      borderWidth: '0',
      backgroundColor: 'transparent',
      textColor: '#374151',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
  },

  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  strengths: {
    variant: 'minimal',
    showIcons: false,
  },

  achievements: {
    variant: 'minimal',
    showIndicators: false,
  },

  languages: {
    variant: 'compact',
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 5, column: 'main' },
  ],

  fontFamily: {
    primary: "'Source Sans Pro', 'Lato', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - subtle top accent only
  // header-accent provides a gradient that fades from top to transparent
  // gradientBackground disabled to avoid dark gradient at bottom of pages
  decorations: {
    enabled: true,
    elements: ['top-accent-line', 'header-accent'],
    opacity: 1,
    gradientBackground: false,
  },
});

export default classicMinimalConfig;
