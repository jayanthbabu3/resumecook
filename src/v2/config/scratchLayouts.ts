/**
 * Scratch Builder Layout Definitions
 * 
 * Defines all available layout options for the "Create from Scratch" feature.
 * Each layout has a visual preview, description, and configuration.
 */

import type { V2SectionType } from '../types/resumeData';

export type ScratchLayoutType = 
  | 'single-column' 
  | 'two-column-left'   // Sidebar on left, main content on right
  | 'two-column-right'  // Sidebar on right, main content on left
  | 'split'              // Header with two columns below
  | 'compact';           // Dense, space-efficient single column

export interface ScratchLayout {
  id: string;
  name: string;
  description: string;
  layoutType: ScratchLayoutType;
  useCase: string;
  icon: string; // Emoji or icon identifier
  // Sections that typically go to main column
  mainSections: V2SectionType[];
  // Sections that typically go to sidebar (for two-column layouts)
  sidebarSections: V2SectionType[];
  // Default config for this layout
  defaultConfig: {
    layout: {
      type: ScratchLayoutType;
      mainWidth?: string;
      sidebarWidth?: string;
      columnGap?: string;
    };
    spacing?: {
      sectionGap: string;
      itemGap: string;
    };
  };
}

export const SCRATCH_LAYOUTS: ScratchLayout[] = [
  {
    id: 'single-column',
    name: 'Single Column',
    description: 'Traditional vertical layout with all sections in one column. Perfect for ATS-friendly resumes.',
    layoutType: 'single-column',
    useCase: 'Best for: Traditional resumes, ATS-heavy applications, entry-level positions',
    icon: '📄',
    mainSections: [
      'summary',
      'experience',
      'education',
      'projects',
      'certifications',
      'skills',
      'languages',
      'achievements',
      'awards',
      'publications',
      'volunteer',
      'speaking',
      'patents',
      'interests',
      'references',
      'courses',
    ],
    sidebarSections: [],
    defaultConfig: {
      layout: {
        type: 'single-column',
      },
      spacing: {
        sectionGap: '1.5rem',
        itemGap: '1rem',
      },
    },
  },
  {
    id: 'two-column-left',
    name: 'Two Column (Left Sidebar)',
    description: 'Main content on the right, sidebar on the left. Great for highlighting skills and certifications.',
    layoutType: 'two-column-left',
    useCase: 'Best for: Technical roles, skills-heavy resumes, experienced professionals',
    icon: '📊',
    mainSections: [
      'summary',
      'experience',
      'education',
      'projects',
      'achievements',
      'publications',
      'volunteer',
      'speaking',
      'patents',
    ],
    sidebarSections: [
      'skills',
      'languages',
      'certifications',
      'awards',
      'interests',
      'references',
      'courses',
    ],
    defaultConfig: {
      layout: {
        type: 'two-column-left',
        mainWidth: '62%',
        sidebarWidth: '35%',
        columnGap: '24px',
      },
      spacing: {
        sectionGap: '1.25rem',
        itemGap: '0.875rem',
      },
    },
  },
  {
    id: 'two-column-right',
    name: 'Two Column (Right Sidebar)',
    description: 'Main content on the left, sidebar on the right. Classic executive resume style.',
    layoutType: 'two-column-right',
    useCase: 'Best for: Executive roles, experience-heavy resumes, leadership positions',
    icon: '💼',
    mainSections: [
      'summary',
      'experience',
      'education',
      'projects',
      'achievements',
      'publications',
      'volunteer',
      'speaking',
      'patents',
    ],
    sidebarSections: [
      'skills',
      'languages',
      'certifications',
      'awards',
      'interests',
      'references',
      'courses',
    ],
    defaultConfig: {
      layout: {
        type: 'two-column-right',
        mainWidth: '62%',
        sidebarWidth: '35%',
        columnGap: '24px',
      },
      spacing: {
        sectionGap: '1.25rem',
        itemGap: '0.875rem',
      },
    },
  },
  {
    id: 'split',
    name: 'Split Layout',
    description: 'Header at top with two columns below. Modern and creative design.',
    layoutType: 'split',
    useCase: 'Best for: Modern resumes, creative professionals, design-focused roles',
    icon: '🎨',
    mainSections: [
      'summary',
      'experience',
      'education',
      'projects',
      'achievements',
    ],
    sidebarSections: [
      'skills',
      'languages',
      'certifications',
      'awards',
      'interests',
    ],
    defaultConfig: {
      layout: {
        type: 'two-column-right', // Uses two-column internally
        mainWidth: '60%',
        sidebarWidth: '35%',
        columnGap: '24px',
      },
      spacing: {
        sectionGap: '1.5rem',
        itemGap: '1rem',
      },
    },
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense, space-efficient single column. Maximize content in minimal space.',
    layoutType: 'compact',
    useCase: 'Best for: Entry-level resumes, concise formats, maximum content density',
    icon: '📋',
    mainSections: [
      'summary',
      'experience',
      'education',
      'projects',
      'certifications',
      'skills',
      'languages',
      'achievements',
      'awards',
      'publications',
      'volunteer',
      'speaking',
      'patents',
      'interests',
      'references',
      'courses',
    ],
    sidebarSections: [],
    defaultConfig: {
      layout: {
        type: 'single-column',
      },
      spacing: {
        sectionGap: '1rem',
        itemGap: '0.75rem',
      },
    },
  },
];

/**
 * Get layout by ID
 */
export function getLayoutById(id: string): ScratchLayout | undefined {
  return SCRATCH_LAYOUTS.find(layout => layout.id === id);
}

/**
 * Get layout by type
 */
export function getLayoutByType(type: ScratchLayoutType): ScratchLayout | undefined {
  return SCRATCH_LAYOUTS.find(layout => layout.layoutType === type);
}
