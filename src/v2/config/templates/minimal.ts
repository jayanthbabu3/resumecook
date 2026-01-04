/**
 * Minimal Professional Template Configuration (V2)
 * 
 * Clean single-column layout with generous spacing and simple typography.
 * Suitable for universal/professional use-cases.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const minimalConfig: TemplateConfig = createTemplateConfig({
  id: 'minimal-v2',
  name: 'Minimal',
  description: 'Clean single-column layout with clear hierarchy and generous spacing',
  category: 'professional',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#0f172a',
      textTransform: 'none',
    },
    title: {
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2563eb',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#0f172a',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2563eb',
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
      color: '#475569',
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
    sectionGap: '22px',
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
    borderColor: '#e5e7eb',
    marginBottom: '10px',
    padding: '0 0 8px 0',
  },

  header: {
    variant: 'minimal',
    showPhoto: true,
    photoSize: '70px',
    photoShape: 'circle',
    photoPosition: 'right', // Photo on the right side of header
    padding: '0 0 18px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#2563eb',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'columns',
    columns: 2,
    showRatings: false,
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
    bulletStyle: '•',
  },

  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'inline',
  },

  // Strengths - minimal inline text
  strengths: {
    variant: 'minimal',
    showIcons: false,
  },
  
  // Achievements - clean list format
  achievements: {
    variant: 'list',
    showIndicators: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 5, column: 'main' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 6, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default minimalConfig;




