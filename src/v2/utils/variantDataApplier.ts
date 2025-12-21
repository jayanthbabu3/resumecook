/**
 * Variant Data Applier
 * 
 * Applies variant preview data to resume data when a section is added.
 * This ensures the preview content appears in the canvas.
 */

import type { V2ResumeData } from '../types/resumeData';
import type { SectionVariant } from '@/constants/sectionVariants';
import { getSectionVariants } from '@/constants/sectionVariants';
import type { V2SectionType } from '../types/resumeData';

/**
 * Apply variant preview data to resume data
 */
export function applyVariantDataToResume(
  resumeData: V2ResumeData,
  sectionType: V2SectionType,
  variant: SectionVariant
): V2ResumeData {
  const { previewData } = variant;
  const updatedData = { ...resumeData };

  switch (sectionType) {
    case 'summary':
      // Apply summary variant data
      if (previewData.content) {
        if (Array.isArray(previewData.content)) {
          // For bullet point variants, join with newlines
          updatedData.personalInfo = {
            ...updatedData.personalInfo,
            summary: previewData.content.join('\n'),
          };
        } else {
          updatedData.personalInfo = {
            ...updatedData.personalInfo,
            summary: previewData.content,
          };
        }
      }
      break;

    case 'experience':
      // Apply experience variant data
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.experience = [
          ...updatedData.experience,
          ...previewData.items.map((item: any) => ({
            id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            position: item.position || '',
            company: item.company || '',
            location: item.location,
            startDate: item.startDate || '',
            endDate: item.endDate || '',
            current: item.current || false,
            description: item.description || '',
            bulletPoints: item.bulletPoints || [],
          })),
        ];
      }
      break;

    case 'education':
      // Apply education variant data
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.education = [
          ...updatedData.education,
          ...previewData.items.map((item: any) => ({
            id: `edu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            school: item.school || '',
            degree: item.degree || '',
            field: item.field || '',
            location: item.location,
            startDate: item.startDate || '',
            endDate: item.endDate || '',
            gpa: item.gpa,
            honors: item.honors,
            coursework: item.coursework,
          })),
        ];
      }
      break;

    case 'skills':
      // Apply skills variant data
      if (previewData.skills) {
        const skills = previewData.skills;
        if (Array.isArray(skills)) {
          updatedData.skills = [
            ...updatedData.skills,
            ...skills.map((skill: any, index: number) => ({
              id: `skill-${Date.now()}-${index}`,
              name: typeof skill === 'string' ? skill : skill.name || String(skill),
              level: typeof skill === 'object' && skill.level ? skill.level : undefined,
              category: typeof skill === 'object' && skill.category ? skill.category : 'core',
            })),
          ];
        }
      }
      break;

    // Add more section types as needed
    default:
      // For other sections, try to apply generic data
      break;
  }

  return updatedData;
}

