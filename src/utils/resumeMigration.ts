import type { ResumeData, ResumeSection } from '@/types/resume';
import { SECTION_DEFAULT_TITLES } from '@/constants/helperSections';

/**
 * Initializes dynamic sections for a resume if they don't exist
 * This creates default sections from the existing resume data
 */
export function initializeDynamicSections(resumeData: ResumeData): ResumeData {
  // If dynamic sections already exist, return as is
  if (resumeData.dynamicSections && resumeData.dynamicSections.length > 0) {
    return resumeData;
  }

  const dynamicSections: ResumeSection[] = [];
  let order = 0;

  // Add summary section if exists
  if (resumeData.personalInfo.summary) {
    dynamicSections.push({
      id: `section-summary-${Date.now()}`,
      type: 'summary',
      order: order++,
      enabled: true,
      title: SECTION_DEFAULT_TITLES.summary,
      data: {
        type: 'summary',
        content: resumeData.personalInfo.summary,
      },
    });
  }

  // Add experience section if exists
  if (resumeData.experience.length > 0) {
    dynamicSections.push({
      id: `section-experience-${Date.now()}`,
      type: 'experience',
      order: order++,
      enabled: true,
      title: SECTION_DEFAULT_TITLES.experience,
      data: {
        type: 'experience',
        items: resumeData.experience,
      },
    });
  }

  // Add education section if exists
  if (resumeData.education.length > 0) {
    dynamicSections.push({
      id: `section-education-${Date.now()}`,
      type: 'education',
      order: order++,
      enabled: true,
      title: SECTION_DEFAULT_TITLES.education,
      data: {
        type: 'education',
        items: resumeData.education,
      },
    });
  }

  // Add skills section if exists
  if (resumeData.skills.length > 0) {
    dynamicSections.push({
      id: `section-skills-${Date.now()}`,
      type: 'skills',
      order: order++,
      enabled: true,
      title: SECTION_DEFAULT_TITLES.skills,
      data: {
        type: 'skills',
        items: resumeData.skills,
      },
    });
  }

  // Add custom sections if exist
  if (resumeData.sections.length > 0) {
    resumeData.sections.forEach((section) => {
      dynamicSections.push({
        id: `section-custom-${section.id}`,
        type: 'custom',
        order: order++,
        enabled: true,
        title: section.title,
        data: {
          type: 'custom',
          content: section.content,
        },
      });
    });
  }

  return {
    ...resumeData,
    dynamicSections,
  };
}

/**
 * Ensures resume data has a valid structure with default values
 */
export function ensureResumeDataStructure(resumeData: Partial<ResumeData>): ResumeData {
  return {
    personalInfo: resumeData.personalInfo || {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: '',
    },
    experience: resumeData.experience || [],
    education: resumeData.education || [],
    skills: resumeData.skills || [],
    sections: resumeData.sections || [],
    dynamicSections: resumeData.dynamicSections || [],
  };
}

/**
 * Creates empty default dynamic sections for a new resume
 */
export function createDefaultDynamicSections(): ResumeSection[] {
  return [
    {
      id: `section-summary-${Date.now()}`,
      type: 'summary',
      order: 0,
      enabled: true,
      title: SECTION_DEFAULT_TITLES.summary,
      data: {
        type: 'summary',
        content: '',
      },
    },
    {
      id: `section-experience-${Date.now() + 1}`,
      type: 'experience',
      order: 1,
      enabled: true,
      title: SECTION_DEFAULT_TITLES.experience,
      data: {
        type: 'experience',
        items: [],
      },
    },
    {
      id: `section-education-${Date.now() + 2}`,
      type: 'education',
      order: 2,
      enabled: true,
      title: SECTION_DEFAULT_TITLES.education,
      data: {
        type: 'education',
        items: [],
      },
    },
    {
      id: `section-skills-${Date.now() + 3}`,
      type: 'skills',
      order: 3,
      enabled: true,
      title: SECTION_DEFAULT_TITLES.skills,
      data: {
        type: 'skills',
        items: [],
      },
    },
  ];
}
