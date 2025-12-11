/**
 * Centered Photo Template Configuration (V2)
 * 
 * Header with centered photo, name below, elegant single-column layout.
 * Professional design with a personal touch.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const centeredPhotoConfig: TemplateConfig = createTemplateConfig({
  id: 'centered-photo-v2',
  name: 'Centered Photo',
  description: 'Elegant layout with centered photo header and clean sections',
  category: 'professional',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      color: '#1a1a2e',
      textTransform: 'none',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6366f1',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#6366f1',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1a1a2e',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#6366f1',
    },
    dates: {
      fontSize: '11px',
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
      color: '#4b5563',
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
      right: '28px',
      bottom: '24px',
      left: '28px',
    },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '4px',
    contactGap: '14px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    text: {
      primary: '#1a1a2e',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f5f3ff',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#6366f1',
    marginBottom: '10px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'centered',
    showPhoto: true,
    photoSize: '90px',
    photoShape: 'circle',
    padding: '0 0 16px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#6366f1',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 3,
    showRatings: false,
    badge: {
      fontSize: '10px',
      padding: '4px 10px',
      borderRadius: '12px',
      borderWidth: '1px',
      backgroundColor: '#f5f3ff',
      textColor: '#6366f1',
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
    datePosition: 'inline',
  },

  strengths: {
    variant: 'minimal',
    showIcons: false,
  },
  
  achievements: {
    variant: 'list',
    showIndicators: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Professional Summary', defaultTitle: 'Professional Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Work Experience', defaultTitle: 'Work Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 5, column: 'main' },
  ],

  fontFamily: {
    primary: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});

export default centeredPhotoConfig;
