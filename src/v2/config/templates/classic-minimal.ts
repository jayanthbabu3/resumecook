/**
 * Classic Minimal Template Configuration (V2)
 * 
 * Ultra-clean, text-focused design with no bells and whistles.
 * Timeless professional layout.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const classicMinimalConfig: TemplateConfig = createTemplateConfig({
  id: 'classic-minimal-v2',
  name: 'Classic Minimal',
  description: 'Ultra-clean text-focused design for traditional industries',
  category: 'professional',

  typography: {
    name: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '0.08em',
      color: '#1a1a1a',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#666666',
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: '#1a1a1a',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    itemSubtitle: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#666666',
    },
    dates: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#888888',
    },
    body: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#333333',
    },
    contact: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#666666',
    },
    small: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#888888',
    },
  },

  spacing: {
    pagePadding: {
      top: '40px',
      right: '40px',
      bottom: '40px',
      left: '40px',
    },
    sectionGap: '24px',
    itemGap: '14px',
    headingToContent: '12px',
    bulletGap: '5px',
    contactGap: '16px',
    skillGap: '12px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#1a1a1a',
    secondary: '#666666',
    text: {
      primary: '#1a1a1a',
      secondary: '#333333',
      muted: '#888888',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f9f9f9',
    },
    border: '#dddddd',
  },

  sectionHeading: {
    style: 'simple',
    borderWidth: '0',
    borderColor: 'transparent',
    marginBottom: '12px',
    padding: '0',
  },

  header: {
    variant: 'left-aligned',
    showPhoto: false,
    padding: '0 0 20px 0',
    contactIcons: {
      show: false,
      size: '13px',
      color: '#666666',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'inline',
    columns: 1,
    showRatings: false,
    separator: ' • ',
    badge: {
      fontSize: '13px',
      padding: '0',
      borderRadius: '0',
      borderWidth: '0',
      backgroundColor: 'transparent',
      textColor: '#333333',
    },
  },

  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '–',
  },

  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'right',
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
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Professional Experience', defaultTitle: 'Professional Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Core Competencies', defaultTitle: 'Core Competencies', enabled: true, order: 4, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 5, column: 'main' },
  ],

  fontFamily: {
    primary: "'Times New Roman', Georgia, 'Cambria', serif",
  },
});

export default classicMinimalConfig;
