import type { HelperSection, SectionType } from '@/types/resume';

/**
 * Available helper sections for the section library
 * These sections can be dragged into the resume
 */
export const HELPER_SECTIONS: HelperSection[] = [
  {
    type: 'summary',
    icon: '📄',
    title: 'Professional Summary',
    description: 'Brief overview of your professional background',
    isDefault: true,
  },
  {
    type: 'experience',
    icon: '💼',
    title: 'Work Experience',
    description: 'Your professional work history and achievements',
    isDefault: true,
  },
  {
    type: 'education',
    icon: '🎓',
    title: 'Education',
    description: 'Your academic background and qualifications',
    isDefault: true,
  },
  {
    type: 'skills',
    icon: '⚙️',
    title: 'Skills',
    description: 'Technical and professional skills',
    isDefault: true,
  },
  {
    type: 'certifications',
    icon: '🏆',
    title: 'Certifications',
    description: 'Professional certifications and credentials',
  },
  {
    type: 'languages',
    icon: '🌐',
    title: 'Languages',
    description: 'Language proficiency levels',
  },
  {
    type: 'projects',
    icon: '🚀',
    title: 'Projects',
    description: 'Personal and professional projects',
  },
  {
    type: 'awards',
    icon: '🥇',
    title: 'Awards & Honors',
    description: 'Recognition and achievements',
  },
  {
    type: 'publications',
    icon: '📚',
    title: 'Publications',
    description: 'Published works and papers',
  },
  {
    type: 'volunteer',
    icon: '👥',
    title: 'Volunteer Work',
    description: 'Community service and volunteer experience',
  },
  {
    type: 'speaking',
    icon: '🎤',
    title: 'Speaking',
    description: 'Conference talks and presentations',
  },
  {
    type: 'patents',
    icon: '💡',
    title: 'Patents',
    description: 'Patents and intellectual property',
  },
  {
    type: 'portfolio',
    icon: '🎨',
    title: 'Portfolio Links',
    description: 'Online portfolio and social profiles',
  },
  {
    type: 'custom',
    icon: '➕',
    title: 'Custom Section',
    description: 'Add any custom section you need',
  },
];

/**
 * Default sections that appear in new resumes
 */
export const DEFAULT_SECTION_TYPES: SectionType[] = [
  'summary',
  'experience',
  'education',
  'skills',
];

/**
 * Section icons mapping
 */
export const SECTION_ICONS: Record<SectionType, string> = {
  summary: '📄',
  experience: '💼',
  education: '🎓',
  skills: '⚙️',
  certifications: '🏆',
  languages: '🌐',
  projects: '🚀',
  awards: '🥇',
  publications: '📚',
  volunteer: '👥',
  speaking: '🎤',
  patents: '💡',
  portfolio: '🎨',
  custom: '➕',
};

/**
 * Section default titles
 */
export const SECTION_DEFAULT_TITLES: Record<SectionType, string> = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  certifications: 'Certifications',
  languages: 'Languages',
  projects: 'Projects',
  awards: 'Awards & Honors',
  publications: 'Publications',
  volunteer: 'Volunteer Experience',
  speaking: 'Speaking Engagements',
  patents: 'Patents',
  portfolio: 'Portfolio & Links',
  custom: 'Custom Section',
};
