import { TemplateConfig, createTemplateConfig } from '../../types/templateConfig';

/**
 * Professional Standard Template - Industry Standard Resume
 *
 * A clean, ATS-friendly professional template suitable for all industries.
 * Features a two-column layout with main content and sidebar.
 *
 * Key Features:
 * - Professional dark blue color scheme
 * - Left-aligned header with prominent name
 * - Two-column layout (65% main, 32% sidebar)
 * - Clean typography with good hierarchy
 * - ATS-friendly structure
 * - Supports all v2 sections and variants
 */
export const professionalStandardConfig: TemplateConfig = createTemplateConfig({
  id: 'professional-standard-v2',
  name: 'Professional Standard',
  description: 'Industry-standard professional resume template, ATS-friendly and suitable for all industries',
  category: 'professional',

  // Typography - Clean and professional
  typography: {
    name: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#111827',
      letterSpacing: '-0.5px',
    },
    title: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#1e40af',
      letterSpacing: '0px',
    },
    sectionHeading: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.4,
      color: '#1e40af',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: '2px solid #1e40af',
      paddingBottom: '6px',
      marginBottom: '12px',
    },
    body: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#374151',
    },
    small: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#6b7280',
    },
    itemTitle: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#111827',
    },
    itemSubtitle: {
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#1e40af',
    },
    label: {
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
    },
  },

  // Spacing - Balanced and professional
  spacing: {
    pagePadding: {
      top: '32px',
      right: '32px',
      bottom: '32px',
      left: '32px',
    },
    sectionGap: '20px',
    itemGap: '16px',
    contentGap: '8px',
  },

  // Layout - Two-column with right sidebar
  layout: {
    type: 'two-column-right',
    mainWidth: '65%',
    sidebarWidth: '32%',
    columnGap: '24px',
    sidebarBackground: '#f9fafb',
    sidebarPadding: '20px',
    sidebarBorderRadius: '0px',
  },

  // Colors - Professional dark blue
  colors: {
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6b7280',
    },
    background: {
      page: '#ffffff',
      sidebar: '#f9fafb',
      section: 'transparent',
    },
    border: {
      light: '#e5e7eb',
      medium: '#d1d5db',
      dark: '#9ca3af',
    },
  },

  // Header Configuration
  header: {
    variant: 'left-aligned',
    showPhoto: false,
    photoSize: '80px',
    photoShape: 'circle',
    layout: {
      nameAlignment: 'left',
      contactAlignment: 'right',
      titlePosition: 'below-name',
    },
    styles: {
      container: {
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '16px',
        marginBottom: '20px',
      },
      name: {
        marginBottom: '4px',
      },
      title: {
        marginBottom: '8px',
      },
    },
  },

  // Summary/Profile Configuration
  summary: {
    variant: 'paragraph',
    maxLines: 4,
    styles: {
      fontSize: '11px',
      lineHeight: 1.6,
      textAlign: 'left',
    },
  },

  // Experience Configuration
  experience: {
    variant: 'standard',
    datePosition: 'right',
    dateFormat: 'MMM YYYY',
    showLocation: true,
    showDuration: false,
    bulletStyle: '•',
    bulletIndent: '16px',
    styles: {
      item: {
        marginBottom: '16px',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '6px',
      },
      position: {
        fontWeight: 600,
        fontSize: '12px',
        color: '#111827',
      },
      company: {
        fontWeight: 500,
        fontSize: '11px',
        color: '#1e40af',
      },
      date: {
        fontSize: '10px',
        color: '#6b7280',
        whiteSpace: 'nowrap',
      },
      bulletPoints: {
        marginTop: '6px',
        paddingLeft: '16px',
      },
    },
  },

  // Education Configuration
  education: {
    variant: 'standard',
    datePosition: 'right',
    dateFormat: 'MMM YYYY',
    showGPA: true,
    showLocation: true,
    styles: {
      item: {
        marginBottom: '14px',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '4px',
      },
      degree: {
        fontWeight: 600,
        fontSize: '12px',
        color: '#111827',
      },
      school: {
        fontWeight: 500,
        fontSize: '11px',
        color: '#1e40af',
      },
    },
  },

  // Skills Configuration
  skills: {
    variant: 'pills',
    showRatings: false,
    groupByCategory: false,
    maxColumns: 2,
    styles: {
      pill: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: 500,
        border: '1px solid #93c5fd',
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      },
    },
  },

  // Languages Configuration
  languages: {
    variant: 'standard',
    showProficiency: true,
    styles: {
      item: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
      },
      name: {
        fontSize: '11px',
        fontWeight: 500,
        color: '#111827',
      },
      proficiency: {
        fontSize: '10px',
        color: '#6b7280',
      },
    },
  },

  // Certifications Configuration
  certifications: {
    variant: 'compact',
    dateFormat: 'MMM YYYY',
    showIssuer: true,
    showExpiryDate: true,
    styles: {
      item: {
        marginBottom: '12px',
      },
      name: {
        fontSize: '11px',
        fontWeight: 600,
        color: '#111827',
      },
      issuer: {
        fontSize: '10px',
        color: '#1e40af',
        fontStyle: 'italic',
      },
    },
  },

  // Projects Configuration
  projects: {
    variant: 'standard',
    dateFormat: 'MMM YYYY',
    showTechnologies: true,
    showLink: true,
    bulletStyle: '•',
    styles: {
      item: {
        marginBottom: '14px',
      },
      name: {
        fontSize: '12px',
        fontWeight: 600,
        color: '#111827',
      },
      description: {
        fontSize: '11px',
        lineHeight: 1.5,
        color: '#374151',
        marginTop: '4px',
      },
    },
  },

  // Achievements Configuration
  achievements: {
    variant: 'bullets',
    bulletStyle: '▪',
    styles: {
      item: {
        fontSize: '11px',
        lineHeight: 1.5,
        marginBottom: '8px',
        paddingLeft: '14px',
      },
    },
  },

  // Strengths Configuration
  strengths: {
    variant: 'tags',
    maxColumns: 2,
    styles: {
      tag: {
        backgroundColor: '#f3f4f6',
        color: '#374151',
        padding: '5px 10px',
        borderRadius: '3px',
        fontSize: '10px',
        fontWeight: 500,
        border: '1px solid #d1d5db',
      },
    },
  },

  // Section Order and Column Placement
  sections: [
    // Header (always full width, order 0)
    {
      type: 'header',
      id: 'header',
      enabled: true,
      order: 0,
      column: 'main',
      title: 'Header',
    },
    // Main Column
    {
      type: 'summary',
      id: 'summary',
      enabled: true,
      order: 1,
      column: 'main',
      title: 'Professional Summary',
    },
    {
      type: 'experience',
      id: 'experience',
      enabled: true,
      order: 2,
      column: 'main',
      title: 'Professional Experience',
    },
    {
      type: 'education',
      id: 'education',
      enabled: true,
      order: 3,
      column: 'main',
      title: 'Education',
    },
    {
      type: 'projects',
      id: 'projects',
      enabled: true,
      order: 4,
      column: 'main',
      title: 'Projects',
    },
    // Sidebar Column
    {
      type: 'skills',
      id: 'skills',
      enabled: true,
      order: 1,
      column: 'sidebar',
      title: 'Skills',
    },
    {
      type: 'certifications',
      id: 'certifications',
      enabled: true,
      order: 2,
      column: 'sidebar',
      title: 'Certifications',
    },
    {
      type: 'languages',
      id: 'languages',
      enabled: true,
      order: 3,
      column: 'sidebar',
      title: 'Languages',
    },
    {
      type: 'achievements',
      id: 'achievements',
      enabled: true,
      order: 4,
      column: 'sidebar',
      title: 'Key Achievements',
    },
    {
      type: 'strengths',
      id: 'strengths',
      enabled: false,
      order: 5,
      column: 'sidebar',
      title: 'Core Strengths',
    },
    // Optional sections (disabled by default)
    {
      type: 'awards',
      id: 'awards',
      enabled: false,
      order: 5,
      column: 'main',
      title: 'Awards & Honors',
    },
    {
      type: 'publications',
      id: 'publications',
      enabled: false,
      order: 6,
      column: 'main',
      title: 'Publications',
    },
    {
      type: 'volunteer',
      id: 'volunteer',
      enabled: false,
      order: 7,
      column: 'main',
      title: 'Volunteer Experience',
    },
    {
      type: 'interests',
      id: 'interests',
      enabled: false,
      order: 6,
      column: 'sidebar',
      title: 'Interests',
    },
  ],

  // PDF-specific configuration
  pdfConfig: {
    pageSize: 'A4',
    margins: {
      top: 32,
      right: 32,
      bottom: 32,
      left: 32,
    },
    scale: 1,
    quality: 'high',
  },
});

export default professionalStandardConfig;
