/**
 * Product Engineer Template Configuration (V2)
 *
 * Clean professional layout with subtle accent blocks.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const productEngineerConfig: TemplateConfig = createTemplateConfig({
  id: 'product-engineer-v2',
  name: 'Product Engineer',
  description: 'Professional layout with product-focused clarity and structured sections.',
  category: 'classic',

  typography: {
    name: {
      fontSize: '27px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.01em',
      color: '#111827',
      textTransform: 'none',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#92400e',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#1f2937',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#111827',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#92400e',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '12px',
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
      color: '#9ca3af',
    },
  },

  spacing: {
    pagePadding: {
      top: '30px',
      right: '32px',
      bottom: '30px',
      left: '32px',
    },
    sectionGap: '18px',
    itemGap: '12px',
    headingToContent: '8px',
    bulletGap: '5px',
    contactGap: '10px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#b45309',
    secondary: '#f59e0b',
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#fffbeb',
      accent: '#fef3c7',
    },
    border: '#f3f4f6',
  },

  sectionHeading: {
    style: 'background',
    borderWidth: '1px',
    borderColor: '#fcd34d',
    marginBottom: '10px',
    padding: '6px 10px',
    backgroundColor: '#fffbeb',
  },

  header: {
    variant: 'left-aligned',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#b45309',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'tags',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '4px 8px',
      borderRadius: '6px',
      borderWidth: '1px',
      borderColor: '#fde68a',
      backgroundColor: '#fffbeb',
      textColor: '#92400e',
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
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 6, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 7, column: 'main' },
  ],

  fontFamily: {
    primary: "'Source Sans 3', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default productEngineerConfig;
