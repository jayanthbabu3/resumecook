/**
 * Cloud Ops Template Configuration (V2)
 *
 * Creative single-column layout with sky blue/cyan cloud-inspired theme.
 * Features dot pattern and geometric decorations for infrastructure aesthetic.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const cloudOpsConfig: TemplateConfig = createTemplateConfig({
  id: 'cloud-ops-v2',
  name: 'Cloud Ops',
  description: 'Creative layout with sky blue theme and cloud-inspired decorations for DevOps/SRE roles.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '34px',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#ffffff',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#7dd3fc', // Light sky blue accent
    },
    sectionHeading: {
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#0284c7',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#0c4a6e',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#0284c7',
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
      color: '#bae6fd',
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
    primary: '#0284c7', // Sky blue
    secondary: '#38bdf8',
    text: {
      primary: '#0c4a6e',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f0f9ff',
      accent: '#bae6fd',
    },
    border: '#7dd3fc',
  },

  sectionHeading: {
    style: 'accent-bar',
    borderWidth: '3px',
    borderColor: '#0284c7',
    marginBottom: '10px',
    padding: '0 0 0 12px',
  },

  header: {
    variant: 'banner',
    showPhoto: false,
    padding: '32px',
    backgroundColor: '#0369a1', // Deep sky blue
    textColor: '#ffffff',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#7dd3fc',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'pills',
    columns: 3,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '5px 12px',
      borderRadius: '20px',
      borderWidth: '0',
      backgroundColor: '#e0f2fe',
      textColor: '#0369a1',
    },
  },

  experience: {
    variant: 'modern',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '▹',
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
    { type: 'skills', id: 'skills', title: 'Cloud Stack', defaultTitle: 'Cloud Stack', enabled: true, order: 3, column: 'main' },
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: true, order: 4, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 5, column: 'main' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Creative decorations - dot pattern and geometric corner for cloud/infrastructure aesthetic
  decorations: {
    enabled: true,
    elements: ['dot-pattern', 'geometric-corner', 'bottom-left-corner'],
    opacity: 0.9,
    gradientBackground: true,
  },
});

export default cloudOpsConfig;
