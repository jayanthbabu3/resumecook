/**
 * Firestore Resume Service - DEPRECATED
 * This service has been migrated to the API-based service.
 * Use @/services/resumeService instead.
 */

import { resumeService as apiResumeService, type Resume as APIResume } from '@/services';
import type { Resume, ResumeData, ResumeMetadata, CreateResumeOptions, UpdateResumePayload } from '@/types/resume';

/**
 * DEPRECATED - Use @/services/resumeService instead
 */
class ResumeService {
  async getUserResumes(): Promise<Resume[]> {
    console.warn('DEPRECATED: Use resumeService from @/services instead');
    const resumes = await apiResumeService.getAll();
    return resumes.map(r => ({
      id: r.id,
      userId: r.userId,
      title: r.title,
      templateId: r.templateId,
      themeColor: (r.settings as any)?.themeColor || '#2563eb',
      isPrimary: false,
      isPublic: r.isPublic,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
      data: r.data as any,
    }));
  }

  async getResume(resumeId: string): Promise<Resume | null> {
    console.warn('DEPRECATED: Use resumeService from @/services instead');
    try {
      const resume = await apiResumeService.getById(resumeId);
      return {
        id: resume.id,
        userId: resume.userId,
        title: resume.title,
        templateId: resume.templateId,
        themeColor: (resume.settings as any)?.themeColor || '#2563eb',
        isPrimary: false,
        isPublic: resume.isPublic,
        createdAt: new Date(resume.createdAt),
        updatedAt: new Date(resume.updatedAt),
        data: resume.data as any,
      };
    } catch {
      return null;
    }
  }

  async createResume(templateId: string, data: ResumeData, options?: CreateResumeOptions): Promise<string> {
    console.warn('DEPRECATED: Use resumeService from @/services instead');
    const resume = await apiResumeService.create({
      title: options?.title || 'Untitled Resume',
      templateId,
      data: data as any,
      settings: { themeColor: options?.themeColor },
    });
    return resume.id;
  }

  async updateResume(resumeId: string, updates: UpdateResumePayload): Promise<void> {
    console.warn('DEPRECATED: Use resumeService from @/services instead');
    await apiResumeService.update(resumeId, {
      title: updates.title,
      templateId: updates.templateId,
      data: updates.data as any,
    });
  }

  async deleteResume(resumeId: string): Promise<void> {
    console.warn('DEPRECATED: Use resumeService from @/services instead');
    await apiResumeService.delete(resumeId);
  }

  async duplicateResume(resumeId: string): Promise<string> {
    console.warn('DEPRECATED: Use resumeService from @/services instead');
    const resume = await apiResumeService.duplicate(resumeId);
    return resume.id;
  }

  async getResumeCount(): Promise<number> {
    const resumes = await apiResumeService.getAll();
    return resumes.length;
  }

  async canCreateResume(): Promise<{ allowed: boolean; count: number; limit: number }> {
    try {
      const result = await apiResumeService.canCreateMore();
      return {
        allowed: result.canCreate,
        count: result.current,
        limit: result.limit,
      };
    } catch {
      return { allowed: true, count: 0, limit: 10 };
    }
  }
}

export const resumeService = new ResumeService();
export default resumeService;
