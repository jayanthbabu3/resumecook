/**
 * Fullstack Atlas Template Configuration (V2)
 *
 * Creative single-column layout with warm amber/orange gradient theme.
 * Bold header with diagonal accents representing full-stack versatility.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const fullstackAtlasConfig: TemplateConfig = createTemplateConfig({
  id: 'fullstack-atlas-v2',
  name: 'Fullstack Atlas',
  description: 'Creative layout with warm gradient theme for full-stack developers.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '36px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      color: '#78350f',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#d97706', // Amber accent
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#d97706',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#78350f',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#d97706',
    },
    dates: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#92400e',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#44403c',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#92400e',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#78716c',
    },
  },

  spacing: {
    pagePadding: {
      top: '28px',
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
    primary: '#d97706', // Amber
    secondary: '#f59e0b',
    text: {
      primary: '#78350f',
      secondary: '#44403c',
      muted: '#78716c',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#fffbeb',
      accent: '#fef3c7',
    },
    border: '#fde68a',
  },

  sectionHeading: {
    style: 'accent-bar',
    borderWidth: '3px',
    borderColor: '#d97706',
    marginBottom: '10px',
    padding: '0 0 0 12px',
  },

  header: {
    variant: 'split',
    showPhoto: false,
    padding: '28px 32px',
    backgroundColor: 'transparent',
    textColor: '#78350f',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#d97706',
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
      borderRadius: '18px',
      borderWidth: '0',
      backgroundColor: '#fef3c7',
      textColor: '#92400e',
    },
  },

  experience: {
    variant: 'modern',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '◆',
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
    { type: 'summary', id: 'summary', title: 'About', defaultTitle: 'About', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills & Tools', defaultTitle: 'Skills & Tools', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - curved lines and hexagon cluster for fullstack tech aesthetic
  decorations: {
    enabled: true,
    elements: ['curved-lines', 'hexagon-cluster', 'left-gradient-bar'],
    opacity: 0.9,
    gradientBackground: true,
  },
});

export default fullstackAtlasConfig;
