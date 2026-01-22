/**
 * V2 Resume Service
 *
 * Extends the base resume service to work with V2ResumeData type.
 * This service now uses the API backend instead of Firestore directly.
 */

import { resumeService } from '@/services';
import { toast } from 'sonner';
import type { V2ResumeData } from '../types/resumeData';
import { USER_LIMITS, LIMIT_ERRORS } from '@/config/limits';

/**
 * V2 Resume Metadata - stored in backend
 */
export interface V2ResumeMetadata {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  themeColor: string;
  themeColors?: { primary?: string; secondary?: string };
  isPrimary: boolean;
  isPublic: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  lastViewedAt?: Date | string;

  // Analytics
  wordCount?: number;
  viewCount?: number;
  downloadCount?: number;

  // Organization
  tags?: string[];
  folder?: string;

  // Section configuration (optional - for saving user's layout preferences)
  sectionOverrides?: Record<string, any>;
  enabledSections?: string[];
  sectionLabels?: Record<string, string>;
}

/**
 * Complete V2 Resume Document
 */
export interface V2Resume extends V2ResumeMetadata {
  data: V2ResumeData;
}

/**
 * V2 Resume creation options
 */
export interface CreateV2ResumeOptions {
  title?: string;
  themeColor?: string;
  themeColors?: { primary?: string; secondary?: string };
  isPrimary?: boolean;
  tags?: string[];
  sectionOverrides?: Record<string, any>;
  enabledSections?: string[];
  sectionLabels?: Record<string, string>;
}

/**
 * V2 Resume update payload
 */
export interface UpdateV2ResumePayload {
  data?: V2ResumeData;
  title?: string;
  templateId?: string;
  themeColor?: string;
  themeColors?: { primary?: string; secondary?: string };
  isPrimary?: boolean;
  isPublic?: boolean;
  tags?: string[];
  folder?: string;
  sectionOverrides?: Record<string, any>;
  enabledSections?: string[];
  sectionLabels?: Record<string, string>;
}

/**
 * Convert API resume to V2Resume format
 */
function convertToV2Resume(apiResume: any): V2Resume {
  return {
    id: apiResume.id || apiResume._id,
    userId: apiResume.userId,
    title: apiResume.title,
    templateId: apiResume.templateId,
    themeColor: apiResume.settings?.themeColor || '#0891b2',
    themeColors: apiResume.settings?.themeColors,
    isPrimary: apiResume.isPrimary || false,
    isPublic: apiResume.isPublic || false,
    createdAt: apiResume.createdAt,
    updatedAt: apiResume.updatedAt,
    lastViewedAt: apiResume.lastViewedAt,
    wordCount: apiResume.wordCount,
    viewCount: apiResume.viewCount,
    downloadCount: apiResume.downloadCount,
    tags: apiResume.tags,
    folder: apiResume.folder,
    sectionOverrides: apiResume.settings?.sectionOverrides,
    enabledSections: apiResume.settings?.enabledSections,
    sectionLabels: apiResume.settings?.sectionLabels,
    data: normalizeResumeData(apiResume.data),
  };
}

/**
 * Normalize V2 resume data to ensure all required fields exist
 */
function normalizeResumeData(data: any): V2ResumeData {
  return {
    version: '2.0',
    personalInfo: data?.personalInfo || {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: '',
    },
    experience: Array.isArray(data?.experience) ? data.experience : [],
    education: Array.isArray(data?.education) ? data.education : [],
    skills: Array.isArray(data?.skills) ? data.skills : [],
    // Optional sections
    languages: data?.languages,
    achievements: data?.achievements,
    strengths: data?.strengths,
    certifications: data?.certifications,
    projects: data?.projects,
    awards: data?.awards,
    publications: data?.publications,
    volunteer: data?.volunteer,
    speaking: data?.speaking,
    patents: data?.patents,
    interests: data?.interests,
    references: data?.references,
    courses: data?.courses,
    customSections: data?.customSections,
    settings: data?.settings,
  };
}

/**
 * Calculate word count from V2 resume data
 */
function calculateWordCount(data: V2ResumeData): number {
  let text = '';
  text += data.personalInfo?.summary || '';

  // Experience descriptions and bullet points
  (data.experience || []).forEach((exp) => {
    text += ' ' + (exp.description || '');
    (exp.bulletPoints || []).forEach((bp) => {
      text += ' ' + bp;
    });
  });

  // Education descriptions
  (data.education || []).forEach((edu) => {
    text += ' ' + (edu.description || '');
  });

  // Skills
  (data.skills || []).forEach((skill) => {
    text += ' ' + skill.name;
  });

  // Achievements
  (data.achievements || []).forEach((ach) => {
    text += ' ' + ach.title + ' ' + ach.description;
  });

  // Strengths
  (data.strengths || []).forEach((str) => {
    text += ' ' + str.title + ' ' + str.description;
  });

  // Projects
  (data.projects || []).forEach((proj) => {
    text += ' ' + proj.name + ' ' + proj.description;
    (proj.highlights || []).forEach((h) => {
      text += ' ' + h;
    });
  });

  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

class ResumeServiceV2 {
  /**
   * Get the count of user's resumes
   */
  async getResumeCount(): Promise<number> {
    try {
      const resumes = await resumeService.getAll();
      return resumes.length;
    } catch {
      return 0;
    }
  }

  /**
   * Check if user can create a new resume
   */
  async canCreateResume(): Promise<{ allowed: boolean; count: number; limit: number }> {
    try {
      const result = await resumeService.canCreateMore();
      return {
        allowed: result.canCreate,
        count: result.current,
        limit: result.limit,
      };
    } catch {
      const count = await this.getResumeCount();
      return {
        allowed: count < USER_LIMITS.MAX_RESUMES,
        count,
        limit: USER_LIMITS.MAX_RESUMES,
      };
    }
  }

  /**
   * Create a new V2 resume
   */
  async createResume(
    templateId: string,
    data: V2ResumeData,
    options?: CreateV2ResumeOptions
  ): Promise<string> {
    // Check resume limit
    const { allowed } = await this.canCreateResume();
    if (!allowed) {
      toast.error(LIMIT_ERRORS.RESUMES_LIMIT_REACHED);
      throw new Error(LIMIT_ERRORS.RESUMES_LIMIT_REACHED);
    }

    const title = options?.title || (data.personalInfo?.fullName
      ? `${data.personalInfo.fullName}'s Resume`
      : `Resume - ${new Date().toLocaleDateString()}`);

    const resume = await resumeService.create({
      title,
      templateId,
      data: data as any,
      settings: {
        themeColor: options?.themeColor || '#2563eb',
        themeColors: options?.themeColors,
        sectionOverrides: options?.sectionOverrides,
        enabledSections: options?.enabledSections,
        sectionLabels: options?.sectionLabels,
      } as any,
    });

    toast.success('Resume saved successfully');
    return resume.id;
  }

  /**
   * Get a single resume by ID
   */
  async getResume(resumeId: string): Promise<V2Resume | null> {
    try {
      const apiResume = await resumeService.getById(resumeId);
      return convertToV2Resume(apiResume);
    } catch {
      return null;
    }
  }

  /**
   * Get all user's resumes (metadata only)
   */
  async getUserResumes(): Promise<V2ResumeMetadata[]> {
    const apiResumes = await resumeService.getAll();
    return apiResumes.map((resume) => ({
      id: resume.id,
      userId: resume.userId,
      title: resume.title,
      templateId: resume.templateId,
      themeColor: (resume.settings as any)?.themeColor || '#0891b2',
      themeColors: (resume.settings as any)?.themeColors,
      isPrimary: (resume as any).isPrimary || false,
      isPublic: resume.isPublic,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      lastViewedAt: (resume as any).lastViewedAt,
      wordCount: (resume as any).wordCount,
      viewCount: (resume as any).viewCount,
      downloadCount: (resume as any).downloadCount,
      tags: (resume as any).tags,
      folder: (resume as any).folder,
      sectionOverrides: (resume.settings as any)?.sectionOverrides,
      enabledSections: (resume.settings as any)?.enabledSections,
      sectionLabels: (resume.settings as any)?.sectionLabels,
    }));
  }

  /**
   * Update resume
   */
  async updateResume(resumeId: string, updates: UpdateV2ResumePayload): Promise<void> {
    await resumeService.update(resumeId, {
      title: updates.title,
      templateId: updates.templateId,
      data: updates.data as any,
      settings: {
        themeColor: updates.themeColor,
        themeColors: updates.themeColors,
        sectionOverrides: updates.sectionOverrides,
        enabledSections: updates.enabledSections,
        sectionLabels: updates.sectionLabels,
      } as any,
    });
  }

  /**
   * Update only resume data (for auto-save)
   */
  async updateResumeData(resumeId: string, data: V2ResumeData): Promise<void> {
    await this.updateResume(resumeId, { data });
  }

  /**
   * Save resume with all settings (for full save)
   */
  async saveResume(
    resumeId: string,
    data: V2ResumeData,
    templateId: string,
    options: {
      themeColor?: string;
      themeColors?: { primary?: string; secondary?: string };
      sectionOverrides?: Record<string, any>;
      enabledSections?: string[];
      sectionLabels?: Record<string, string>;
      title?: string;
    }
  ): Promise<void> {
    await this.updateResume(resumeId, {
      data,
      templateId,
      ...options,
    });
    toast.success('Resume saved');
  }

  /**
   * Change template for a resume
   */
  async changeTemplate(resumeId: string, templateId: string): Promise<void> {
    await this.updateResume(resumeId, { templateId });
    toast.success('Template changed successfully');
  }

  /**
   * Change theme color
   */
  async changeThemeColor(resumeId: string, themeColor: string, themeColors?: { primary?: string; secondary?: string }): Promise<void> {
    await this.updateResume(resumeId, { themeColor, themeColors });
  }

  /**
   * Update resume title
   */
  async updateTitle(resumeId: string, title: string): Promise<void> {
    await this.updateResume(resumeId, { title });
    toast.success('Title updated');
  }

  /**
   * Delete resume
   */
  async deleteResume(resumeId: string): Promise<void> {
    await resumeService.delete(resumeId);
    toast.success('Resume deleted');
  }

  /**
   * Duplicate resume
   */
  async duplicateResume(resumeId: string): Promise<string> {
    const newResume = await resumeService.duplicate(resumeId);
    toast.success('Resume duplicated');
    return newResume.id;
  }

  /**
   * Increment download count
   */
  async incrementDownloadCount(_resumeId: string): Promise<void> {
    // This will be tracked by the backend when PDF is generated
    // No explicit call needed, but kept for backwards compatibility
  }
}

export const resumeServiceV2 = new ResumeServiceV2();
