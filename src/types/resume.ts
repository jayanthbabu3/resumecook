import type { Timestamp } from 'firebase/firestore';

/**
 * Core resume data structure - template agnostic
 */
export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    photo?: string;
    linkedin?: string;
    portfolio?: string;
    github?: string;
  };
  includeSocialLinks?: boolean;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  sections: CustomSection[];
  // New dynamic sections feature
  dynamicSections?: ResumeSection[]; // Optional for backward compatibility
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  bulletPoints?: string[];
  current: boolean;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  coursework?: string[];
  honors?: string[];
  location?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  rating?: string;
  category?: 'core' | 'toolbox';
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  items?: string[]; // Array of items for list-style content (like certifications)
}

// Dynamic Section Types
export type SectionType =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'languages'
  | 'projects'
  | 'awards'
  | 'publications'
  | 'volunteer'
  | 'speaking'
  | 'patents'
  | 'portfolio'
  | 'custom';

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  expiryDate?: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  githubUrl?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

export interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface SpeakingItem {
  id: string;
  event: string;
  topic: string;
  date: string;
  location: string;
  url?: string;
}

export interface PatentItem {
  id: string;
  title: string;
  patentNumber: string;
  date: string;
  status: 'Pending' | 'Granted' | 'Published';
  description?: string;
  url?: string;
}

export interface PortfolioItem {
  id: string;
  platform: string;
  url: string;
  description?: string;
}

// Union type for all section data with variant support
export type SectionData = {
  type: SectionType;
  content?: string | string[];
  items?: any[];
  skills?: (string | { name: string; level?: number; rating?: number })[];
  variantId?: string;
  stats?: string[];
  tags?: string[];
  skillGroups?: { category: string; skills: string[] }[];
  technical?: string[];
  soft?: string[];
};

export interface ResumeSection {
  id: string;
  type: SectionType;
  order: number;
  enabled: boolean;
  title: string;
  titleCase?: 'title' | 'upper' | 'lower'; // Text case for the section title
  titleAlignment?: 'left' | 'center' | 'right'; // Alignment for section title
  contentAlignment?: 'left' | 'center' | 'right' | 'justify'; // Alignment for section content
  data: SectionData;
}

// Helper section metadata for the library
export interface HelperSection {
  type: SectionType;
  icon: string;
  title: string;
  description: string;
  isDefault?: boolean; // Whether this section is included by default
}

/**
 * Resume metadata - stored in Firestore
 */
export interface ResumeMetadata {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  themeColor: string;
  isPrimary: boolean;
  isPublic: boolean;
  shareSlug?: string; // For public sharing
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  lastViewedAt: Date | Timestamp;

  // Analytics
  wordCount?: number;
  atsScore?: number;
  atsReport?: any; // Detailed ATS report (from atsAnalyzer)
  atsAnalyzedAt?: Date | Timestamp; // When was the last ATS analysis
  viewCount?: number;
  downloadCount?: number;

  // Organization
  tags?: string[];
  folder?: string;
}

/**
 * Complete resume document
 */
export interface Resume extends ResumeMetadata {
  data: ResumeData;
}

/**
 * Version history entry
 */
export interface ResumeVersion {
  id: string;
  resumeId: string;
  data: ResumeData;
  templateId: string;
  themeColor: string;
  createdAt: Date | Timestamp;
  createdBy: string;
  versionNumber: number;
  changeDescription?: string;
}

/**
 * Public resume for sharing/templates
 */
export interface PublicResume {
  id: string;
  slug: string;
  title: string;
  description?: string;
  templateId: string;
  themeColor: string;
  data: ResumeData;
  authorId: string;
  authorName: string;
  isTemplate: boolean; // True if it's a template, false if it's a shared resume
  downloads: number;
  views: number;
  rating?: number;
  tags: string[];
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

/**
 * Resume creation options
 */
export interface CreateResumeOptions {
  title?: string;
  themeColor?: string;
  isPrimary?: boolean;
  tags?: string[];
}

/**
 * Resume update payload
 */
export interface UpdateResumePayload {
  data?: ResumeData;
  title?: string;
  templateId?: string;
  themeColor?: string;
  isPrimary?: boolean;
  isPublic?: boolean;
  tags?: string[];
  folder?: string;
}
