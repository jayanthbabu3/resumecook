/**
 * Dot Grid Template Configuration (V2)
 *
 * Modern minimal design featuring:
 * - Subtle dot grid pattern accent in corner
 * - Clean typography with accent-colored title
 * - Separator line with dot accent
 * - Contact row with icons
 * - Teal/Cyan accent color
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

// Modern teal - fresh and professional
const ACCENT_COLOR = '#0891b2';
const SECONDARY_COLOR = '#0e7490';

export const dotGridConfig: TemplateConfig = createTemplateConfig({
  id: 'dot-grid-v2',
  name: 'Dot Grid',
  description: 'Modern minimal with subtle dot grid pattern accent',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#111827',
    },
    title: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      color: ACCENT_COLOR,
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#111827',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: ACCENT_COLOR,
    },
    dates: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.7,
      color: '#4b5563',
    },
    contact: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#6b7280',
    },
    small: {
      fontSize: '9px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#9ca3af',
    },
  },

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

  layout: {
    type: 'single-column',
  },

  colors: {
    primary: ACCENT_COLOR,
    secondary: SECONDARY_COLOR,
    text: {
      primary: '#111827',
      secondary: '#4b5563',
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
    style: 'underline',
    borderWidth: '2px',
    borderColor: ACCENT_COLOR,
    padding: '0 0 6px 0',
    marginBottom: '10px',
  },

  header: {
    variant: 'dot-grid',
    showPhoto: false,
    padding: '0',
    marginBottom: '22px',
    contactIcons: {
      show: true,
      size: '12px',
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
    variant: 'inline',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '9px',
      padding: '4px 10px',
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: '#e5e7eb',
      backgroundColor: '#f9fafb',
      textColor: '#374151',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
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
    variant: 'compact',
    showLinks: true,
    showTechnologies: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1 },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2 },
    { type: 'skills', id: 'skills', title: 'Tech Stack', defaultTitle: 'Tech Stack', enabled: true, order: 3 },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 4 },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 5 },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 6 },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7 },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  decorations: {
    enabled: false,
    elements: [],
    opacity: 1,
    gradientBackground: false,
  },
});

export default dotGridConfig;
