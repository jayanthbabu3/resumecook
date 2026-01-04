/**
 * Professional Sales Template Configuration (V2)
 *
 * Bold, confident design for sales professionals.
 * Features gradient header, timeline experience, and metric-focused layout.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const professionalSalesConfig: TemplateConfig = createTemplateConfig({
  id: 'professional-sales-v2',
  name: 'Professional Sales',
  description: 'Bold design with gradient header and timeline experience for sales professionals',
  category: 'professional',

  typography: {
    name: {
      fontSize: '32px',
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: '#ffffff',
      textTransform: 'none',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#fbbf24', // Gold accent for title
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#7c3aed',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#1e1b4b',
    },
    itemSubtitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#7c3aed',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#374151',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#e9d5ff',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#9ca3af',
    },
  },

  spacing: {
    pagePadding: {
      top: '0',
      right: '28px',
      bottom: '28px',
      left: '28px',
    },
    sectionGap: '18px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '5px',
    contactGap: '10px',
    skillGap: '6px',
  },

  layout: {
    type: 'two-column-right',
    mainWidth: '62%',
    sidebarWidth: '35%',
    columnGap: '24px',
    contentPadding: '20px 0 0 0',
  },

  colors: {
    primary: '#7c3aed', // Vibrant purple
    secondary: '#a855f7',
    text: {
      primary: '#1e1b4b',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      sidebar: '#faf5ff',
      accent: '#f3e8ff',
    },
    border: '#e9d5ff',
  },

  sectionHeading: {
    style: 'accent-bar',
    borderWidth: '3px',
    borderColor: '#7c3aed',
    marginBottom: '10px',
    padding: '0 0 0 10px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    backgroundColor: '#4c1d95',
    textColor: '#ffffff',
    padding: '28px 32px',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#c4b5fd',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'dots',
    columns: 1,
    showRatings: true,
    badge: {
      fontSize: '11px',
      padding: '3px 8px',
      borderRadius: '4px',
      borderWidth: '0',
      backgroundColor: '#f3e8ff',
      textColor: '#6b21a8',
    },
  },

  experience: {
    variant: 'timeline-pro',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▹',
  },

  education: {
    variant: 'minimal',
    showGPA: false,
    showField: true,
    showDates: true,
  },

  languages: {
    variant: 'bars',
    showCertification: false,
  },

  strengths: {
    variant: 'simple-list',
    showIcons: true,
    columns: 1,
  },

  achievements: {
    variant: 'numbered',
    showIndicators: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'About Me', defaultTitle: 'About Me', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Career Journey', defaultTitle: 'Career Journey', enabled: true, order: 2, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Key Wins', defaultTitle: 'Key Wins', enabled: true, order: 3, column: 'main' },
    { type: 'strengths', id: 'strengths', title: 'Core Strengths', defaultTitle: 'Core Strengths', enabled: true, order: 4, column: 'sidebar' },
    { type: 'skills', id: 'skills', title: 'Expertise', defaultTitle: 'Expertise', enabled: true, order: 5, column: 'sidebar' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 6, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 7, column: 'sidebar' },
  ],

  fontFamily: {
    primary: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations
  decorations: {
    enabled: true,
    elements: ['diagonal-shape', 'corner-circles'],
    opacity: 0.6,
  },
});

export default professionalSalesConfig;

