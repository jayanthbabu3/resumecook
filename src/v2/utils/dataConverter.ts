/**
 * Resume Builder V2 - Data Converter
 * 
 * Utilities for converting between v1 and v2 data formats.
 * Ensures backward compatibility with existing resumes.
 */

import type { ResumeData as V1ResumeData, LanguageItem as V1LanguageItem } from '@/types/resume';
import type { 
  V2ResumeData, 
  LanguageProficiency,
} from '../types/resumeData';

// ============================================================================
// PROFICIENCY MAPPING
// ============================================================================

/**
 * Map v2 proficiency to v1 compatible values
 * v1 only supports: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic'
 * v2 adds: 'Advanced' | 'Elementary'
 */
function mapV2ProficiencyToV1(proficiency: LanguageProficiency): V1LanguageItem['proficiency'] {
  switch (proficiency) {
    case 'Native':
      return 'Native';
    case 'Fluent':
      return 'Fluent';
    case 'Professional':
      return 'Professional';
    case 'Advanced':
      return 'Professional'; // Map Advanced to Professional
    case 'Intermediate':
      return 'Intermediate';
    case 'Basic':
      return 'Basic';
    case 'Elementary':
      return 'Basic'; // Map Elementary to Basic
    default:
      return 'Intermediate';
  }
}

// ============================================================================
// V1 TO V2 CONVERSION
// ============================================================================

/**
 * Convert v1 resume data to v2 format
 */
export function convertV1ToV2(v1Data: V1ResumeData): V2ResumeData {
  return {
    version: '2.0',
    
    personalInfo: {
      fullName: v1Data.personalInfo.fullName || '',
      email: v1Data.personalInfo.email || '',
      phone: v1Data.personalInfo.phone || '',
      location: v1Data.personalInfo.location || '',
      title: v1Data.personalInfo.title || '',
      summary: v1Data.personalInfo.summary || '',
      photo: v1Data.personalInfo.photo,
      linkedin: v1Data.personalInfo.linkedin,
      github: v1Data.personalInfo.github,
      portfolio: v1Data.personalInfo.portfolio,
    },
    
    experience: (v1Data.experience || []).map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      location: undefined, // v1 doesn't have location on experience
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      bulletPoints: exp.bulletPoints || [],
    })),
    
    education: (v1Data.education || []).map(edu => ({
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      gpa: edu.gpa,
      honors: edu.honors,
      coursework: edu.coursework,
    })),
    
    skills: (v1Data.skills || []).map(skill => ({
      id: skill.id,
      name: skill.name,
      level: skill.rating ? parseInt(skill.rating) : undefined,
      category: skill.category,
    })),
    
    // Optional sections
    languages: v1Data.languages?.map(lang => ({
      id: lang.id,
      language: lang.language,
      proficiency: lang.proficiency,
    })),
    
    achievements: v1Data.achievements?.map(ach => ({
      id: ach.id,
      title: ach.title,
      description: ach.description,
    })),
    
    strengths: v1Data.strengths?.map(str => ({
      id: str.id,
      title: str.title,
      description: str.description,
    })),
    
    // Convert custom sections
    customSections: v1Data.sections?.map(section => ({
      id: section.id,
      title: section.title,
      items: section.items?.map((item, idx) => ({
        id: `${section.id}-item-${idx}`,
        content: item,
      })) || (section.content ? [{
        id: `${section.id}-item-0`,
        content: section.content,
      }] : []),
    })),
    
    settings: {
      includeSocialLinks: v1Data.includeSocialLinks ?? true,
      includePhoto: !!v1Data.personalInfo.photo,
      dateFormat: 'MMM YYYY',
    },
  };
}

// ============================================================================
// V2 TO V1 CONVERSION (For backward compatibility)
// ============================================================================

/**
 * Convert v2 resume data back to v1 format
 * Used when saving to existing v1 storage
 */
export function convertV2ToV1(v2Data: V2ResumeData): V1ResumeData {
  return {
    personalInfo: {
      fullName: v2Data.personalInfo.fullName,
      email: v2Data.personalInfo.email,
      phone: v2Data.personalInfo.phone,
      location: v2Data.personalInfo.location,
      title: v2Data.personalInfo.title,
      summary: v2Data.personalInfo.summary,
      photo: v2Data.personalInfo.photo,
      linkedin: v2Data.personalInfo.linkedin,
      github: v2Data.personalInfo.github,
      portfolio: v2Data.personalInfo.portfolio,
    },
    
    includeSocialLinks: v2Data.settings?.includeSocialLinks ?? true,
    
    experience: v2Data.experience.map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description || '',
      bulletPoints: exp.bulletPoints,
    })),
    
    education: v2Data.education.map(edu => ({
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      gpa: edu.gpa,
      location: edu.location,
      honors: edu.honors,
      coursework: edu.coursework,
    })),
    
    skills: v2Data.skills.map(skill => ({
      id: skill.id,
      name: skill.name,
      rating: skill.level?.toString(),
      category: skill.category as 'core' | 'toolbox' | undefined,
    })),
    
    sections: v2Data.customSections?.map(section => ({
      id: section.id,
      title: section.title,
      content: section.items.map(item => item.content).join('\n'),
      items: section.items.map(item => item.content),
    })) || [],
    
    achievements: v2Data.achievements,
    strengths: v2Data.strengths,
    // Map v2 proficiency to v1 (v1 has fewer options)
    languages: v2Data.languages?.map(lang => ({
      ...lang,
      proficiency: mapV2ProficiencyToV1(lang.proficiency),
    })),
  };
}

// ============================================================================
// DATA VALIDATION
// ============================================================================

/**
 * Check if data is v2 format
 */
export function isV2Data(data: any): data is V2ResumeData {
  return data?.version === '2.0';
}

/**
 * Check if data is v1 format
 */
export function isV1Data(data: any): data is V1ResumeData {
  return data?.personalInfo && !data?.version;
}

/**
 * Ensure data is in v2 format
 */
export function ensureV2Data(data: V1ResumeData | V2ResumeData): V2ResumeData {
  if (isV2Data(data)) {
    return data;
  }
  return convertV1ToV2(data as V1ResumeData);
}

// ============================================================================
// DATA HELPERS
// ============================================================================

/**
 * Get section data from resume by section type
 */
export function getSectionData(
  resumeData: V2ResumeData,
  sectionType: string
): any[] | string | undefined {
  switch (sectionType) {
    case 'header':
    case 'summary':
      return resumeData.personalInfo.summary;
    case 'experience':
      return resumeData.experience;
    case 'education':
      return resumeData.education;
    case 'skills':
      return resumeData.skills;
    case 'languages':
      return resumeData.languages;
    case 'achievements':
      return resumeData.achievements;
    case 'strengths':
      return resumeData.strengths;
    case 'certifications':
      return resumeData.certifications;
    case 'projects':
      return resumeData.projects;
    case 'awards':
      return resumeData.awards;
    case 'publications':
      return resumeData.publications;
    case 'volunteer':
      return resumeData.volunteer;
    case 'speaking':
      return resumeData.speaking;
    case 'patents':
      return resumeData.patents;
    case 'interests':
      return resumeData.interests;
    case 'references':
      return resumeData.references;
    case 'courses':
      return resumeData.courses;
    default:
      // Check custom sections
      return resumeData.customSections?.find(s => s.id === sectionType)?.items;
  }
}

/**
 * Check if section has data
 */
export function sectionHasData(
  resumeData: V2ResumeData,
  sectionType: string
): boolean {
  const data = getSectionData(resumeData, sectionType);
  
  if (data === undefined || data === null) return false;
  if (typeof data === 'string') return data.trim().length > 0;
  if (Array.isArray(data)) return data.length > 0;
  
  return false;
}

/**
 * Get all sections that have data
 */
export function getSectionsWithData(resumeData: V2ResumeData): string[] {
  const allSections = [
    'summary',
    'experience',
    'education',
    'skills',
    'languages',
    'achievements',
    'strengths',
    'certifications',
    'projects',
    'awards',
    'publications',
    'volunteer',
    'speaking',
    'patents',
    'interests',
    'references',
    'courses',
  ];
  
  const sectionsWithData = allSections.filter(section => 
    sectionHasData(resumeData, section)
  );
  
  // Add custom sections
  resumeData.customSections?.forEach(section => {
    if (section.items.length > 0) {
      sectionsWithData.push(section.id);
    }
  });
  
  return sectionsWithData;
}

// ============================================================================
// MOCK DATA GENERATOR
// ============================================================================

/**
 * Generate sample v2 resume data
 */
export function generateSampleV2Data(): V2ResumeData {
  return {
    version: '2.0',
    
    personalInfo: {
      fullName: 'Jordan Smith',
      email: 'jordan.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      title: 'Senior Software Engineer',
      summary: 'Experienced software engineer with 8+ years of expertise in building scalable web applications. Passionate about clean code, mentoring teams, and delivering exceptional user experiences.',
      linkedin: 'linkedin.com/in/jordansmith',
      github: 'github.com/jordansmith',
      portfolio: 'jordansmith.dev',
    },
    
    experience: [
      {
        id: 'exp-1',
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2021-01',
        endDate: '',
        current: true,
        bulletPoints: [
          'Led development of microservices architecture serving 10M+ users',
          'Mentored team of 5 junior developers, improving code quality by 40%',
          'Reduced API response time by 60% through optimization initiatives',
        ],
      },
      {
        id: 'exp-2',
        company: 'StartupXYZ',
        position: 'Software Engineer',
        location: 'Remote',
        startDate: '2018-06',
        endDate: '2020-12',
        current: false,
        bulletPoints: [
          'Built React-based dashboard used by 500+ enterprise clients',
          'Implemented CI/CD pipeline reducing deployment time by 70%',
          'Collaborated with product team to define technical requirements',
        ],
      },
    ],
    
    education: [
      {
        id: 'edu-1',
        school: 'Stanford University',
        degree: 'Master of Science',
        field: 'Computer Science',
        location: 'Stanford, CA',
        startDate: '2016-09',
        endDate: '2018-05',
        gpa: '3.9',
      },
      {
        id: 'edu-2',
        school: 'UC Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Berkeley, CA',
        startDate: '2012-09',
        endDate: '2016-05',
      },
    ],
    
    skills: [
      { id: 'skill-1', name: 'TypeScript', level: 5, category: 'Languages' },
      { id: 'skill-2', name: 'React', level: 5, category: 'Frontend' },
      { id: 'skill-3', name: 'Node.js', level: 4, category: 'Backend' },
      { id: 'skill-4', name: 'PostgreSQL', level: 4, category: 'Database' },
      { id: 'skill-5', name: 'AWS', level: 4, category: 'Cloud' },
      { id: 'skill-6', name: 'Docker', level: 4, category: 'DevOps' },
      { id: 'skill-7', name: 'GraphQL', level: 4, category: 'API' },
      { id: 'skill-8', name: 'Python', level: 3, category: 'Languages' },
    ],
    
    languages: [
      { id: 'lang-1', language: 'English', proficiency: 'Native' },
      { id: 'lang-2', language: 'Spanish', proficiency: 'Professional' },
      { id: 'lang-3', language: 'Mandarin', proficiency: 'Basic' },
    ],
    
    achievements: [
      {
        id: 'ach-1',
        title: 'Performance Optimization Award',
        description: 'Recognized for reducing system latency by 60%, saving $200K annually',
      },
      {
        id: 'ach-2',
        title: 'Patent Holder',
        description: 'Co-inventor on distributed caching system patent',
      },
    ],
    
    strengths: [
      {
        id: 'str-1',
        title: 'Technical Leadership',
        description: 'Experience leading cross-functional teams and driving technical decisions',
      },
      {
        id: 'str-2',
        title: 'Problem Solving',
        description: 'Strong analytical skills with focus on scalable solutions',
      },
      {
        id: 'str-3',
        title: 'Communication',
        description: 'Effective at translating technical concepts for diverse audiences',
      },
    ],
    
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Solutions Architect Professional',
        issuer: 'Amazon Web Services',
        date: '2023-03',
        credentialId: 'AWS-SAP-12345',
      },
    ],
    
    projects: [
      {
        id: 'proj-1',
        name: 'Open Source CLI Tool',
        description: 'Developer productivity tool with 5K+ GitHub stars',
        technologies: ['Rust', 'CLI', 'Open Source'],
        url: 'github.com/jordansmith/cli-tool',
      },
    ],
    
    settings: {
      includeSocialLinks: true,
      includePhoto: false,
      dateFormat: 'MMM YYYY',
    },
  };
}
