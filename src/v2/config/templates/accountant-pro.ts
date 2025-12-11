/**
 * Accountant Pro Template Configuration (V2)
 * 
 * Clean professional template with blue accents,
 * title case name, standard layout with dates on right.
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const accountantProConfig: TemplateConfig = createTemplateConfig({
  id: 'accountant-pro-v2',
  name: 'Accountant Pro',
  description: 'Clean professional template with blue accents and standard layout.',
  category: 'professional',

  typography: {
    name: {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0',
      color: '#1f2937', // Dark gray
      textTransform: 'none', // Title case, not uppercase
    },
    title: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#2563eb', // Blue
      letterSpacing: '0.01em',
    },
    sectionHeading: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#374151', // Dark gray
    },
    itemTitle: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2563eb', // Blue for company name
    },
    dates: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280', // Gray
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.55,
      color: '#4b5563',
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
      color: '#6b7280',
    },
  },

  spacing: {
    pagePadding: {
      top: '28px',
      right: '28px',
      bottom: '28px',
      left: '28px',
    },
    sectionGap: '18px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '3px',
    contactGap: '20px',
    skillGap: '8px',
  },

  layout: {
    type: 'single-column',
    mainWidth: '100%',
  },

  colors: {
    primary: '#2563eb', // Blue
    secondary: '#3b82f6', // Lighter blue
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#ffffff',
      accent: '#f8fafc',
    },
    border: '#e5e7eb',
  },

  sectionHeading: {
    style: 'simple', // No underline for this template
    borderWidth: '0',
    borderColor: 'transparent',
    marginBottom: '10px',
    padding: '0 0 4px 0',
  },

  header: {
    variant: 'centered',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: {
      show: false, // No icons in contact line
      size: '12px',
      color: '#4b5563',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },

  skills: {
    variant: 'inline',
    columns: 1,
    showRatings: false,
    separator: ' | ',
    badge: {
      fontSize: '11px',
      padding: '0',
      borderRadius: '0',
      borderWidth: '0',
      backgroundColor: 'transparent',
      textColor: '#4b5563',
      borderColor: 'transparent',
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
    datePosition: 'right',
  },

  // Strengths - pills for clean professional look
  strengths: {
    variant: 'pills',
    showIcons: false,
  },
  
  // Achievements - cards with award icons
  achievements: {
    variant: 'cards',
    showIndicators: true,
  },

  sections: [
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 4, column: 'main' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 5, column: 'main' },
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 6, column: 'main' },
  ],

  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default accountantProConfig;
