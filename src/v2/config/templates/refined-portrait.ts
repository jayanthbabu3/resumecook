/**
 * Refined Portrait Template Configuration (V2)
 *
 * Single-column resume with centered photo header, soft neutral palette,
 * and spacious separators for ATS-friendly readability.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const refinedPortraitConfig: TemplateConfig = createTemplateConfig({
  id: 'refined-portrait-v2',
  name: 'Refined Portrait',
  description: 'Centered photo header with warm accent and single-column clarity',
  category: 'professional',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 800,
      lineHeight: 1.25,
      letterSpacing: '0.08em',
      color: '#1f2937',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#b07a44',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#4b5563',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: 1.45,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#9a6b3a',
    },
    dates: {
      fontSize: '12px',
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
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#374151',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.45,
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: {
      top: '26px',
      right: '32px',
      bottom: '26px',
      left: '32px',
    },
    sectionGap: '18px',
    itemGap: '10px',
    headingToContent: '8px',
    bulletGap: '5px',
    contactGap: '14px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#b07a44',
    secondary: '#c99a6b',
    text: {
      primary: '#1f2937',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f5f5f4',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'line',
    borderWidth: '1px',
    borderColor: '#d1d5db',
    marginBottom: '10px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'centered',
    showPhoto: true,
    photoSize: '88px',
    photoShape: 'circle',
    padding: '20px 0 10px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#b07a44',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'columns',
    columns: 2,
    badge: {
      fontSize: '12px',
      padding: '4px 10px',
      borderRadius: '10px',
      borderWidth: '1px',
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
    datePosition: 'inline',
  },

  languages: {
    variant: 'standard',
  },

  achievements: {
    variant: 'bullets',
    showIndicators: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 5, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 6, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Source Sans 3', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});

export default refinedPortraitConfig;
