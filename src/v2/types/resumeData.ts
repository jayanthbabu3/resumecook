/**
 * Resume Builder V2 - Universal Resume Data Types
 * 
 * This file defines the complete, universal data model for resumes.
 * All templates use this same data structure - only visualization differs.
 * 
 * Design Principles:
 * 1. All possible sections are defined here
 * 2. Data is template-agnostic
 * 3. Each section has a well-defined structure
 * 4. Extensible for future AI integration
 */

// ============================================================================
// PERSONAL INFO
// ============================================================================

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  photo?: string;
  
  // Social Links
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
  website?: string;
  
  // Additional contact options
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

// ============================================================================
// EXPERIENCE
// ============================================================================

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  bulletPoints: string[];
  
  // Optional enhancements
  companyUrl?: string;
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  remote?: boolean;
}

// ============================================================================
// EDUCATION
// ============================================================================

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
  activities?: string[];
  description?: string;
  minor?: string;
}

// ============================================================================
// SKILLS
// ============================================================================

export interface SkillItem {
  id: string;
  name: string;
  level?: number; // 1-5 or 1-100 for progress bars
  category?: string; // e.g., 'Technical', 'Soft Skills', 'Tools'
  yearsOfExperience?: number;
}

// ============================================================================
// LANGUAGES
// ============================================================================

export type LanguageProficiency = 
  | 'Native'
  | 'Fluent'
  | 'Professional'
  | 'Advanced'
  | 'Intermediate'
  | 'Basic'
  | 'Elementary';

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: LanguageProficiency;
  certification?: string; // e.g., 'TOEFL 110', 'JLPT N2'
}

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  metric?: string; // e.g., '150% of target', '$2M revenue'
}

// ============================================================================
// STRENGTHS
// ============================================================================

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
  icon?: string; // Icon name for visual display
}

// ============================================================================
// CERTIFICATIONS
// ============================================================================

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  description?: string;
}

// ============================================================================
// PROJECTS
// ============================================================================

export interface ProjectItem {
  techStack: string[];
  id: string;
  name: string;
  description: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  highlights?: string[];
}

// ============================================================================
// AWARDS
// ============================================================================

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

// ============================================================================
// PUBLICATIONS
// ============================================================================

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  authors?: string[];
  url?: string;
  doi?: string;
  description?: string;
}

// ============================================================================
// VOLUNTEER
// ============================================================================

export interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  highlights?: string[];
}

// ============================================================================
// SPEAKING / CONFERENCES
// ============================================================================

export interface SpeakingItem {
  id: string;
  event: string;
  topic: string;
  date: string;
  location?: string;
  url?: string;
  description?: string;
}

// ============================================================================
// PATENTS
// ============================================================================

export interface PatentItem {
  id: string;
  title: string;
  patentNumber: string;
  date: string;
  status: 'Pending' | 'Granted' | 'Published';
  inventors?: string[];
  description?: string;
  url?: string;
}

// ============================================================================
// INTERESTS / HOBBIES
// ============================================================================

export interface InterestItem {
  id: string;
  name: string;
  description?: string;
}

// ============================================================================
// REFERENCES
// ============================================================================

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
}

// ============================================================================
// COURSES / TRAINING
// ============================================================================

export interface CourseItem {
  id: string;
  name: string;
  provider: string;
  date: string;
  url?: string;
  certificate?: boolean;
  description?: string;
}

// ============================================================================
// CUSTOM SECTIONS
// ============================================================================

export interface CustomSectionItem {
  id: string;
  title?: string;
  content: string;
  date?: string;
  url?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

// ============================================================================
// COMPLETE RESUME DATA
// ============================================================================

/**
 * Universal Resume Data Structure
 * 
 * This is the single source of truth for all resume data.
 * All templates read from this structure.
 * The form editor writes to this structure.
 * AI can populate this structure.
 */
export interface V2ResumeData {
  // Version for migration support
  version: '2.0';
  
  // Personal Information (always present)
  personalInfo: PersonalInfo;
  
  // Core Sections (arrays, can be empty)
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  
  // Optional Built-in Sections
  languages?: LanguageItem[];
  achievements?: AchievementItem[];
  strengths?: StrengthItem[];
  certifications?: CertificationItem[];
  projects?: ProjectItem[];
  awards?: AwardItem[];
  publications?: PublicationItem[];
  volunteer?: VolunteerItem[];
  speaking?: SpeakingItem[];
  patents?: PatentItem[];
  interests?: InterestItem[];
  references?: ReferenceItem[];
  courses?: CourseItem[];
  
  // Custom Sections (user-defined)
  customSections?: CustomSection[];
  
  // Settings
  settings?: {
    includeSocialLinks?: boolean;
    includePhoto?: boolean;
    dateFormat?: 'MM/YYYY' | 'MMM YYYY' | 'MMMM YYYY' | 'YYYY';
  };
}

// ============================================================================
// SECTION TYPE ENUM
// ============================================================================

/**
 * All possible section types
 * Used for type safety and section registry
 */
export type V2SectionType =
  | 'header'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'achievements'
  | 'strengths'
  | 'certifications'
  | 'projects'
  | 'awards'
  | 'publications'
  | 'volunteer'
  | 'speaking'
  | 'patents'
  | 'interests'
  | 'references'
  | 'courses'
  | 'custom';

// ============================================================================
// DATA KEY MAPPING
// ============================================================================

/**
 * Maps section types to their data keys in V2ResumeData
 * Used by form and preview to access correct data
 */
export const SECTION_DATA_KEYS: Record<V2SectionType, keyof V2ResumeData | null> = {
  header: 'personalInfo',
  summary: 'personalInfo', // summary is part of personalInfo
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  languages: 'languages',
  achievements: 'achievements',
  strengths: 'strengths',
  certifications: 'certifications',
  projects: 'projects',
  awards: 'awards',
  publications: 'publications',
  volunteer: 'volunteer',
  speaking: 'speaking',
  patents: 'patents',
  interests: 'interests',
  references: 'references',
  courses: 'courses',
  custom: 'customSections',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create empty resume data with defaults
 */
export function createEmptyResumeData(): V2ResumeData {
  return {
    version: '2.0',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    settings: {
      includeSocialLinks: true,
      includePhoto: false,
      dateFormat: 'MMM YYYY',
    },
  };
}

/**
 * Create a new item with generated ID
 */
export function createItemId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create empty experience item
 */
export function createEmptyExperience(): ExperienceItem {
  return {
    id: createItemId('exp'),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    bulletPoints: [],
  };
}

/**
 * Create empty education item
 */
export function createEmptyEducation(): EducationItem {
  return {
    id: createItemId('edu'),
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
  };
}

/**
 * Create empty skill item
 */
export function createEmptySkill(): SkillItem {
  return {
    id: createItemId('skill'),
    name: '',
  };
}

/**
 * Create empty language item
 */
export function createEmptyLanguage(): LanguageItem {
  return {
    id: createItemId('lang'),
    language: '',
    proficiency: 'Intermediate',
  };
}

/**
 * Create empty achievement item
 */
export function createEmptyAchievement(): AchievementItem {
  return {
    id: createItemId('ach'),
    title: '',
    description: '',
  };
}

/**
 * Create empty strength item
 */
export function createEmptyStrength(): StrengthItem {
  return {
    id: createItemId('str'),
    title: '',
    description: '',
  };
}

/**
 * Create empty certification item
 */
export function createEmptyCertification(): CertificationItem {
  return {
    id: createItemId('cert'),
    name: '',
    issuer: '',
    date: '',
  };
}

/**
 * Create empty project item
 */
export function createEmptyProject(): ProjectItem {
  return {
    id: createItemId('proj'),
    name: '',
    description: '',
    technologies: [],
  };
}

/**
 * Create empty volunteer item
 */
export function createEmptyVolunteer(): VolunteerItem {
  return {
    id: createItemId('vol'),
    organization: '',
    role: '',
    startDate: '',
    endDate: '',
    current: false,
  };
}

/**
 * Create empty custom section
 */
export function createEmptyCustomSection(): CustomSection {
  return {
    id: createItemId('section'),
    title: 'New Section',
    items: [],
  };
}
