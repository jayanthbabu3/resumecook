/**
 * Obstacle Solver Template Configuration (V2)
 *
 * Bold coral-accent single column with timeline experience layout,
 * arrow-style bullets, and unique left-side decorative accents.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../../config/defaultConfig';

export const obstacleSolverConfig: TemplateConfig = createTemplateConfig({
  id: 'obstacle-solver-v2',
  name: 'Obstacle Solver',
  description: 'Bold coral-accent single column with timeline layout and left-side accents.',
  category: 'creative',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
      color: '#1e293b',
    },
    title: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#e85d4c',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#1e293b',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: 1.45,
      color: '#1e293b',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.35,
      color: '#e85d4c',
    },
    dates: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.35,
      color: '#64748b',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#334155',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#1e293b',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#64748b',
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
    itemGap: '14px',
    headingToContent: '8px',
    bulletGap: '6px',
    contactGap: '12px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#e85d4c',
    secondary: '#d14433',
    text: {
      primary: '#1e293b',
      secondary: '#334155',
      muted: '#64748b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#fef5f4',
    },
    border: '#fbd5d0',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#e85d4c',
    marginBottom: '6px',
    padding: '0 0 6px 0',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '10px 16px 12px',
    contactIcons: {
      show: true,
      size: '14px',
      color: '#e85d4c',
    },
  },

  skills: {
    variant: 'category-lines',
    columns: 1,
    separator: ' • ',
    badge: {
      fontSize: '11px',
      padding: '4px 10px',
      borderRadius: '9999px',
      borderWidth: '1px',
      backgroundColor: '#fef5f4',
      textColor: '#1e293b',
    },
  },

  experience: {
    variant: 'modern',
    showLocation: true,
    bulletStyle: '▸',
  },

  strengths: {
    variant: 'accent-grid',
    showIcons: true,
    columns: 3,
  },

  languages: {
    variant: 'inline',
    showCertification: false,
  },

  sections: [
    { id: 'header', type: 'header', title: 'Header', enabled: true, order: 0 },
    { id: 'summary', type: 'summary', title: 'Profile', enabled: true, order: 1 },
    {
      id: 'experience',
      type: 'experience',
      title: 'Professional Experience',
      enabled: true,
      order: 2,
    },
    { id: 'languages', type: 'languages', title: 'Languages', enabled: true, order: 3 },
    { id: 'strengths', type: 'strengths', title: 'Strengths', enabled: true, order: 4 },
    { id: 'skills', type: 'skills', title: 'Technical Skills', enabled: true, order: 5 },
    { id: 'education', type: 'education', title: 'Education', enabled: true, order: 6 },
  ],

  fontFamily: {
    primary: 'Inter, Arial, sans-serif',
    secondary: 'Source Sans Pro, Arial, sans-serif',
  },

  // Creative decorations - left-side accents for unique look
  decorations: {
    enabled: true,
    elements: ['left-gradient-bar', 'left-dots-accent', 'bottom-left-corner'],
    opacity: 1,
    gradientBackground: true,
  },
});

export default obstacleSolverConfig;
