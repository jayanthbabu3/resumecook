/**
 * Senior Frontend Pro Template Configuration (V2)
 * 
 * Professional template with dark header, initials box,
 * two-column skills layout, and clean sections.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const seniorFrontendProConfig: TemplateConfig = createTemplateConfig({
  id: 'senior-frontend-pro-v2',
  name: 'Senior Frontend Pro',
  description: 'Professional template with dark header, initials box, and clean layout for senior developers.',
  category: 'professional',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '0.02em',
      color: '#ffffff', // White for dark header
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#d1d5db', // Light gray
      letterSpacing: '0.01em',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#374151', // Dark gray
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280', // Muted gray
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#4b5563',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#4b5563',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#d1d5db', // Light gray for dark header
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
      top: '0px',
      right: '24px',
      bottom: '24px',
      left: '24px',
    },
    sectionGap: '16px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '4px',
    contactGap: '12px',
    skillGap: '6px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#4b5563', // Gray-600
    secondary: '#6b7280', // Gray-500
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f9fafb', // Light gray for section backgrounds
      accent: '#f3f4f6',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#d1d5db',
    marginBottom: '12px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    backgroundColor: '#4b5563', // Dark gray banner
    textColor: '#ffffff',
    padding: '24px',
    contactIcons: {
      show: false,
      size: '12px',
      color: '#d1d5db',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'columns',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '0',
      borderRadius: '0',
      backgroundColor: 'transparent',
      textColor: '#4b5563',
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
    variant: 'list',
    showIcons: false,
  },
  
  achievements: {
    variant: 'list',
    showIndicators: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 2, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 3, column: 'main' },
    { type: 'education', id: 'education', title: 'Education and Training', defaultTitle: 'Education and Training', enabled: true, order: 4, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 5, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Key Achievements', defaultTitle: 'Key Achievements', enabled: false, order: 6, column: 'main' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: false, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default seniorFrontendProConfig;
