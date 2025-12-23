/**
 * Professional Sales Template Configuration (V2)
 * 
 * Clean single-column layout designed for sales professionals.
 * Features progress bars for skills and languages proficiency.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const professionalSalesConfig: TemplateConfig = createTemplateConfig({
  id: 'professional-sales-v2',
  name: 'Professional Sales',
  description: 'Clean single-column layout with progress bars for skills and languages',
  category: 'professional',

  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#ffffff',
      textTransform: 'none',
    },
    title: {
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#ffffff',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#0f172a',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1e40af',
    },
    itemSubtitle: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#3b82f6',
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
      color: '#1f2937',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#ffffff',
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
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '5px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#2563eb',
    secondary: '#0ea5e9',
    text: {
      primary: '#0f172a',
      secondary: '#1f2937',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#eff6ff',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#0f172a',
    marginBottom: '10px',
    padding: '0 0 8px 0',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    padding: '24px 32px',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#ffffff',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'bars',
    columns: 1,
    showRatings: true,
    badge: {
      fontSize: '12px',
      padding: '4px 10px',
      borderRadius: '6px',
      borderWidth: '1px',
      backgroundColor: '#f8fafc',
      textColor: '#1f2937',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: 'numbered',
  },

  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'inline',
    showCoursework: true,
  },

  languages: {
    variant: 'bars',
    showCertification: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Professional Summary', defaultTitle: 'Professional Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 5, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default professionalSalesConfig;

