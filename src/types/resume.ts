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
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  sections: CustomSection[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: number;
  category?: 'core' | 'toolbox';
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
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
