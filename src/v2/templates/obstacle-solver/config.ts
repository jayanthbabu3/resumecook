/**
 * Obstacle Solver Template Configuration (V2)
 *
 * Teal-accent single column with lined headings, centered header, and grouped skills rows.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../../config/defaultConfig';

export const obstacleSolverConfig: TemplateConfig = createTemplateConfig({
  id: 'obstacle-solver-v2',
  name: 'Obstacle Solver',
  description: 'Teal-accent single column with crisp lines and grouped skill categories.',
  category: 'professional',

  typography: {
    name: {
      fontSize: '30px',
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
      color: '#0b4950',
    },
    title: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#0fb5b7',
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#0b4950',
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: 1.45,
      color: '#0b4950',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.35,
      color: '#0fb5b7',
    },
    dates: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.35,
      color: '#5b6b73',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#22313a',
    },
    contact: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#0b4950',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#60727b',
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
    primary: '#0fb5b7',
    secondary: '#0a8c8f',
    text: {
      primary: '#0b4950',
      secondary: '#22313a',
      muted: '#60727b',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f1f8f9',
    },
    border: '#d9e5e7',
  },

  sectionHeading: {
    style: 'underline',
    borderWidth: '2px',
    borderColor: '#0fb5b7',
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
      color: '#0fb5b7',
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
      backgroundColor: '#eef7f7',
      textColor: '#0b4950',
    },
  },

  experience: {
    variant: 'accent-card',
    showLocation: true,
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
});

export default obstacleSolverConfig;
