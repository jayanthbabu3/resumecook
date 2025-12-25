/**
 * Variant Data Applier
 * 
 * Applies variant preview data to resume data when a section is added.
 * This ensures the preview content appears in the canvas.
 * Supports ALL section types with proper data mapping.
 */

import type { V2ResumeData } from '../types/resumeData';
import type { SectionVariant } from '@/constants/sectionVariants';
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
      if (previewData.content) {
        if (Array.isArray(previewData.content)) {
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
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.experience = [
          ...updatedData.experience,
          ...previewData.items.map((item: any) => ({
            id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            position: item.position || '',
            company: item.company || '',
            location: item.location || '',
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
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.education = [
          ...updatedData.education,
          ...previewData.items.map((item: any) => ({
            id: `edu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            school: item.school || '',
            degree: item.degree || '',
            field: item.field || '',
            location: item.location || '',
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
      if (previewData.skills) {
        const skills = previewData.skills;
        if (Array.isArray(skills)) {
          updatedData.skills = skills.map((skill: any, index: number) => ({
            id: `skill-${Date.now()}-${index}`,
            name: typeof skill === 'string' ? skill : skill.name || String(skill),
            level: typeof skill === 'object' && skill.level ? skill.level : undefined,
            category: typeof skill === 'object' && skill.category ? skill.category : 'core',
          }));
        } else if (typeof skills === 'string') {
          const skillNames = skills.split(',').map(s => s.trim()).filter(Boolean);
          updatedData.skills = skillNames.map((name: string, index: number) => ({
            id: `skill-${Date.now()}-${index}`,
            name,
            category: 'core',
          }));
        }
      } else if (previewData.skillGroups) {
        const allSkills: any[] = [];
        previewData.skillGroups.forEach((group: any) => {
          if (Array.isArray(group.skills)) {
            group.skills.forEach((skillName: string, index: number) => {
              allSkills.push({
                id: `skill-${Date.now()}-${group.category}-${index}`,
                name: skillName,
                category: group.category || 'core',
              });
            });
          }
        });
        updatedData.skills = allSkills;
      }
      break;

    case 'projects':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.projects = [
          ...(updatedData.projects || []),
          ...previewData.items.map((item: any) => ({
            id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name || '',
            description: item.description || '',
            technologies: item.techStack || item.technologies || [],
            url: item.url || '',
            githubUrl: item.githubUrl || '',
            startDate: item.startDate || '',
            endDate: item.endDate || '',
          })),
        ];
      }
      break;

    case 'certifications':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.certifications = [
          ...(updatedData.certifications || []),
          ...previewData.items.map((item: any) => ({
            id: `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name || '',
            issuer: item.issuer || '',
            date: item.date || '',
            expiryDate: item.expiryDate || '',
            credentialId: item.credentialId || '',
            url: item.url || '',
          })),
        ];
      }
      break;

    case 'languages':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.languages = [
          ...(updatedData.languages || []),
          ...previewData.items.map((item: any) => ({
            id: `lang-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            language: typeof item === 'string' ? item : item.language || '',
            proficiency: typeof item === 'object' ? item.proficiency || 'Intermediate' : 'Intermediate',
          })),
        ];
      } else if (previewData.content) {
        // Handle inline format
        const langs = previewData.content.split(',').map((l: string) => l.trim());
        updatedData.languages = langs.map((lang: string) => ({
          id: `lang-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          language: lang.split('(')[0].trim(),
          proficiency: lang.includes('(') ? lang.split('(')[1].replace(')', '').trim() : 'Intermediate',
        }));
      }
      break;

    case 'awards':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.awards = [
          ...(updatedData.awards || []),
          ...previewData.items.map((item: any) => ({
            id: `award-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: item.title || '',
            issuer: item.issuer || '',
            date: item.date || '',
            description: item.description || '',
          })),
        ];
      }
      break;

    case 'publications':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.publications = [
          ...(updatedData.publications || []),
          ...previewData.items.map((item: any) => ({
            id: `pub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: item.title || '',
            publisher: item.publisher || '',
            date: item.date || '',
            url: item.url || '',
            description: item.description || '',
          })),
        ];
      }
      break;

    case 'volunteer':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.volunteer = [
          ...(updatedData.volunteer || []),
          ...previewData.items.map((item: any) => ({
            id: `vol-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            organization: item.organization || '',
            role: item.role || '',
            startDate: item.startDate || '',
            endDate: item.endDate || '',
            description: item.description || '',
          })),
        ];
      }
      break;

    case 'achievements':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.achievements = [
          ...(updatedData.achievements || []),
          ...previewData.items.map((item: any) => ({
            id: `ach-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: typeof item === 'string' ? item : item.title || item.text || '',
            description: typeof item === 'object' ? item.description || '' : '',
          })),
        ];
      }
      break;

    case 'strengths':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.strengths = [
          ...(updatedData.strengths || []),
          ...previewData.items.map((item: any) => ({
            id: `str-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            text: typeof item === 'string' ? item : item.text || item.title || '',
          })),
        ];
      }
      break;

    case 'interests':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.interests = [
          ...(updatedData.interests || []),
          ...previewData.items.map((item: any) => ({
            id: `int-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: typeof item === 'string' ? item : item.name || '',
          })),
        ];
      }
      break;

    case 'references':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.references = [
          ...(updatedData.references || []),
          ...previewData.items.map((item: any) => ({
            id: `ref-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name || '',
            title: item.title || '',
            company: item.company || '',
            email: item.email || '',
            phone: item.phone || '',
            relationship: item.relationship || '',
          })),
        ];
      }
      break;

    case 'speaking':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.speaking = [
          ...(updatedData.speaking || []),
          ...previewData.items.map((item: any) => ({
            id: `speak-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            event: item.event || '',
            topic: item.topic || '',
            date: item.date || '',
            location: item.location || '',
          })),
        ];
      }
      break;

    case 'patents':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.patents = [
          ...(updatedData.patents || []),
          ...previewData.items.map((item: any) => ({
            id: `pat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: item.title || '',
            patentNumber: item.patentNumber || item.number || '',
            date: item.date || '',
            description: item.description || '',
          })),
        ];
      }
      break;

    case 'courses':
      if (previewData.items && Array.isArray(previewData.items)) {
        updatedData.courses = [
          ...(updatedData.courses || []),
          ...previewData.items.map((item: any) => ({
            id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name || item.title || '',
            institution: item.institution || item.provider || '',
            date: item.date || '',
            description: item.description || '',
          })),
        ];
      }
      break;

    default:
      // For header and other sections, no data transformation needed
      break;
  }

  return updatedData;
}

