/**
 * Mobile Craft Template Configuration (V2)
 *
 * Minimal layout with bright accent for mobile developers.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const mobileCraftConfig: TemplateConfig = createTemplateConfig({
  id: 'mobile-craft-v2',
  name: 'Mobile Craft',
  description: 'Minimal single-column template with lively accents for mobile engineers.',
  category: 'minimal',

  typography: {
    name: {
      fontSize: '28px',
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
      color: '#f97316',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#111827',
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
      color: '#f97316',
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
      top: '28px',
      right: '32px',
      bottom: '28px',
      left: '32px',
    },
    sectionGap: '20px',
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
    primary: '#f97316',
    secondary: '#fb923c',
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#fff7ed',
      accent: '#ffedd5',
    },
    border: '#fde68a',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#fed7aa',
    marginBottom: '10px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'minimal',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#f97316',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'inline',
    columns: 2,
    showRatings: false,
    separator: '·',
  },

  experience: {
    variant: 'compact',
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
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 2, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default mobileCraftConfig;
