/**
 * Product Engineer Template Configuration (V2)
 *
 * Creative single-column layout with vibrant lime-to-emerald gradient theme.
 * Unique asymmetric header with diagonal accent representing product innovation.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const productEngineerConfig: TemplateConfig = createTemplateConfig({
  id: 'product-engineer-v2',
  name: 'Product Engineer',
  description: 'Creative layout with gradient accents for product-focused engineers.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '36px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      color: '#ffffff',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#d9f99d', // Light lime accent
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#4d7c0f',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#14532d',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#15803d',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#334155',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#ecfccb',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#64748b',
    },
  },

  spacing: {
    pagePadding: {
      top: '0',
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
    primary: '#15803d', // Emerald green
    secondary: '#22c55e',
    text: {
      primary: '#14532d',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f0fdf4',
      accent: '#dcfce7',
    },
    border: '#86efac',
  },

  sectionHeading: {
    style: 'left-accent',
    borderWidth: '3px',
    borderColor: '#22c55e',
    marginBottom: '10px',
    padding: '2px 0 2px 12px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '32px',
    backgroundColor: '#166534', // Deep emerald
    textColor: '#ffffff',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#86efac',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 4,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '5px 12px',
      borderRadius: '20px',
      borderWidth: '0',
      backgroundColor: '#dcfce7',
      textColor: '#166534',
    },
  },

  experience: {
    variant: 'dots-timeline',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▸',
  },

  education: {
    variant: 'standard',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'right',
  },

  projects: {
    variant: 'modern',
    showLinks: true,
    showTech: true,
  },

  strengths: {
    variant: 'inline-badges',
    showIcons: false,
  },

  achievements: {
    variant: 'numbered',
    showIndicators: true,
  },

  languages: {
    variant: 'inline',
    showCertification: false,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Profile', defaultTitle: 'Profile', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Product Skills', defaultTitle: 'Product Skills', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Shipped Products', defaultTitle: 'Shipped Products', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'Nunito Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - gradient fade and geometric elements for product aesthetic
  decorations: {
    enabled: true,
    elements: ['bottom-gradient-fade', 'corner-dots', 'side-accent'],
    opacity: 0.85,
    gradientBackground: true,
  },
});

export default productEngineerConfig;
