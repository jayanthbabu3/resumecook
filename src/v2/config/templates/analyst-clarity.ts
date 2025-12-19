/**
 * Analyst Clarity Template Configuration (V2)
 *
 * Single-column analyst resume with crisp blue accent, lined headings,
 * and balanced spacing for ATS-friendly readability.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const analystClarityConfig: TemplateConfig = createTemplateConfig({
  id: 'analyst-clarity-v2',
  name: 'Analyst Clarity',
  description: 'Sharp blue-accented layout tailored for data and business analysts',
  category: 'professional',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#1f2937',
    },
    title: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#2563eb',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.35,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: '#1f2937',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: 1.45,
      color: '#111827',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.35,
      color: '#2563eb',
    },
    dates: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.35,
      color: '#4b5563',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#1f2937',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#111827',
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
      top: '26px',
      right: '28px',
      bottom: '26px',
      left: '28px',
    },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '6px',
    contactGap: '10px',
    skillGap: '10px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#2563eb',
    secondary: '#1d4ed8',
    text: {
      primary: '#1f2937',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f3f7ff',
    },
    border: '#d8dee9',
  },

  sectionHeading: {
    style: 'line',
    borderWidth: '1px',
    borderColor: '#d9e2ec',
    marginBottom: '8px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'modern',
    showPhoto: false,
    padding: '18px 22px',
    contactIcons: {
      show: true,
      size: '14px',
      color: '#2563eb',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'tags',
    badge: {
      fontSize: '12px',
      padding: '6px 12px',
      borderRadius: '12px',
      borderWidth: '1px',
      borderColor: '#cbd5e1',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
    },
  },

  experience: {
    variant: 'accent-card',
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
    datePosition: 'inline',
    showCoursework: false,
  },

  strengths: {
    variant: 'accent-grid',
    showIcons: false,
    columns: 2,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 5, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});

export default analystClarityConfig;
