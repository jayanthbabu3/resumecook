/**
 * Executive Split Template Configuration
 * 
 * Based on EnhanceCV style - Two-column layout with:
 * - Left column: Summary, Experience, Education
 * - Right column: Strengths, Skills, Achievements
 * - Clean typography with cyan accent color
 */

import type { TemplateConfig } from '../../types';
import { createTemplateConfig } from '../defaultConfig';

export const executiveSplitConfig: TemplateConfig = createTemplateConfig({
  id: 'executive-split-v2',
  name: 'Executive Split',
  description: 'Professional two-column layout ideal for experienced professionals',
  category: 'professional',
  
  // Typography - Based on EnhanceCV
  typography: {
    name: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#000000',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0891b2', // Cyan accent
    },
    sectionHeading: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#000000',
    },
    itemTitle: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#000000',
    },
    itemSubtitle: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#0891b2', // Cyan accent
    },
    dates: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
    body: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.55,
      color: '#374151',
    },
    contact: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#374151',
    },
    small: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6b7280',
    },
  },
  
  // Spacing - Compact for two-column
  spacing: {
    pagePadding: {
      top: '28px',
      right: '28px',
      bottom: '28px',
      left: '28px',
    },
    sectionGap: '20px',
    itemGap: '14px',
    headingToContent: '10px',
    bulletGap: '4px',
    contactGap: '12px',
    skillGap: '6px',
  },
  
  // Layout - Two column with right sidebar
  layout: {
    type: 'two-column-right',
    mainWidth: '62%',
    sidebarWidth: '35%',
    columnGap: '24px',
    sidebarBackground: '#f8fafc',
    sidebarPadding: '20px',
  },
  
  // Colors - Cyan theme like EnhanceCV
  colors: {
    primary: '#0891b2',
    secondary: '#06b6d4',
    text: {
      primary: '#000000',
      secondary: '#374151',
      muted: '#6b7280',
      light: '#ffffff',
    },
    background: {
      page: '#ffffff',
      section: '#f8fafc',
      sidebar: '#f8fafc',
      accent: '#ecfeff',
    },
    border: '#e5e7eb',
  },
  
  // Section heading style
  sectionHeading: {
    style: 'underline',
    borderWidth: '1px',
    borderColor: '#e5e7eb',
    marginBottom: '12px',
    padding: '0 0 8px 0',
  },
  
  // Header configuration
  header: {
    variant: 'left-aligned',
    showPhoto: false,
    padding: '0 0 16px 0',
    contactIcons: {
      show: true,
      size: '12px',
      color: '#0891b2',
    },
    showSocialLinks: true,
    socialLinksVariant: 'horizontal',
  },
  
  // Skills - Pill style
  skills: {
    variant: 'pills',
    columns: 2,
    showRatings: false,
    badge: {
      fontSize: '11px',
      padding: '4px 10px',
      borderRadius: '4px',
      borderWidth: '1px',
      backgroundColor: '#ffffff',
      textColor: '#374151',
    },
  },
  
  // Experience
  experience: {
    variant: 'standard',
    datePosition: 'right',
    showLocation: true,
    bulletStyle: '•',
  },
  
  // Education
  education: {
    variant: 'compact',
    showGPA: false,
    showField: true,
    showDates: true,
    datePosition: 'inline',
  },
  
  // Strengths - cards with icons
  strengths: {
    variant: 'cards',
    showIcons: true,
  },
  
  // Achievements - bullets with trophy icons  
  achievements: {
    variant: 'bullets',
    showIndicators: true,
  },
  
  // Section order and placement
  sections: [
    // Header always first
    { type: 'header', id: 'header', title: 'Header', defaultTitle: 'Header', enabled: true, order: 0 },
    
    // Main column sections
    { type: 'summary', id: 'summary', title: 'Summary', defaultTitle: 'Summary', enabled: true, order: 1, column: 'main' },
    { type: 'experience', id: 'experience', title: 'Experience', defaultTitle: 'Experience', enabled: true, order: 2, column: 'main' },
    { type: 'education', id: 'education', title: 'Education', defaultTitle: 'Education', enabled: true, order: 3, column: 'main' },
    
    // Sidebar sections
    { type: 'strengths', id: 'strengths', title: 'Strengths', defaultTitle: 'Strengths', enabled: true, order: 1, column: 'sidebar' },
    { type: 'skills', id: 'skills', title: 'Skills', defaultTitle: 'Skills', enabled: true, order: 2, column: 'sidebar' },
    { type: 'achievements', id: 'achievements', title: 'Achievements', defaultTitle: 'Achievements', enabled: true, order: 3, column: 'sidebar' },
    
    // Optional sections
    { type: 'projects', id: 'projects', title: 'Projects', defaultTitle: 'Projects', enabled: false, order: 4, column: 'main' },
    { type: 'certifications', id: 'certifications', title: 'Certifications', defaultTitle: 'Certifications', enabled: false, order: 4, column: 'sidebar' },
    { type: 'languages', id: 'languages', title: 'Languages', defaultTitle: 'Languages', enabled: false, order: 5, column: 'sidebar' },
  ],
  
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
});

export default executiveSplitConfig;
