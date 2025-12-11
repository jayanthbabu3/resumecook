/**
 * Data Pro Template Configuration (V2)
 * 
 * Clean professional template with two-column experience layout,
 * dates on the left, navy blue heading with orange accents.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const dataProConfig: TemplateConfig = createTemplateConfig({
  id: 'data-pro-v2',
  name: 'Data Pro',
  description: 'Professional template with dates sidebar and orange accents.',
  category: 'professional',

  typography: {
    name: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '0.02em',
      color: '#1e3a5f', // Navy blue
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#e97316', // Orange
      letterSpacing: '0.02em',
    },
    sectionHeading: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#1e3a5f', // Navy blue
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#e97316', // Orange for company name
    },
    dates: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e3a5f', // Navy blue
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
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
      top: '24px',
      right: '24px',
      bottom: '24px',
      left: '24px',
    },
    sectionGap: '16px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '3px',
    contactGap: '16px',
    skillGap: '6px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#1e3a5f', // Navy blue
    secondary: '#e97316', // Orange
    text: {
      primary: '#1f2937',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f8fafc',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '3px',
    borderColor: '#e97316', // Orange underline
    marginBottom: '12px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'left-aligned',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#e97316', // Orange icons
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'tags',
    columns: 1,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 10px',
      borderRadius: '2px',
      borderWidth: '1px',
      backgroundColor: '#f1f5f9',
      textColor: '#374151',
      borderColor: '#e2e8f0',
    },
  },

  experience: {
    variant: 'two-column-dates', // New variant for this template
    datePosition: 'left',
    showLocation: true,
    bulletStyle: '•',
  },

  education: {
    variant: 'two-column-dates',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'left',
  },

  // Strengths - accent border for professional look
  strengths: {
    variant: 'accent-border',
    showIcons: true,
  },
  
  // Achievements - timeline style for data-focused design
  achievements: {
    variant: 'timeline',
    showIndicators: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Key Achievements', defaultTitle: 'Key Achievements', enabled: true, order: 5, column: 'main' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 6, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default dataProConfig;
