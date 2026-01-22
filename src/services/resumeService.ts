/**
 * Resume Service
 *
 * Handles all resume-related API calls:
 * - CRUD operations
 * - Versioning
 * - Sharing
 * - Duplication
 */

import api from './api';

// Types
export interface ResumeData {
  version: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    title?: string;
    summary?: string;
    photo?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    website?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    bulletPoints?: string[];
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
    description?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    category?: string;
    level?: string;
  }>;
  languages?: Array<{
    id: string;
    language: string;
    proficiency: string;
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    date?: string;
    url?: string;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    url?: string;
    technologies?: string[];
  }>;
  volunteer?: Array<{
    id: string;
    organization: string;
    role: string;
    cause?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  awards?: Array<{
    id: string;
    title: string;
    issuer?: string;
    date?: string;
    description?: string;
  }>;
  achievements?: Array<{
    id: string;
    title: string;
    description?: string;
    date?: string;
  }>;
  references?: Array<{
    id: string;
    name: string;
    title?: string;
    company?: string;
    email?: string;
    phone?: string;
    relationship?: string;
  }>;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  data: ResumeData;
  settings: {
    themeColor?: string;
    fontFamily?: string;
    fontSize?: string;
    spacing?: string;
  };
  isPublic: boolean;
  publicSlug?: string;
  publicUrl?: string;
  lastModified: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeVersion {
  id: string;
  resumeId: string;
  versionNumber: number;
  data: ResumeData;
  settings: Resume['settings'];
  createdAt: string;
  description?: string;
}

export interface CreateResumeData {
  title: string;
  templateId: string;
  data?: Partial<ResumeData>;
  settings?: Resume['settings'];
}

export interface UpdateResumeData {
  title?: string;
  templateId?: string;
  data?: Partial<ResumeData>;
  settings?: Resume['settings'];
}

// Resume service methods
export const resumeService = {
  /**
   * Get all resumes for the current user
   */
  async getAll(): Promise<Resume[]> {
    const response = await api.get<{ success: boolean; data: Resume[] }>('/resumes');
    return response.data.data;
  },

  /**
   * Get a single resume by ID
   */
  async getById(id: string): Promise<Resume> {
    const response = await api.get<{ success: boolean; data: Resume }>(`/resumes/${id}`);
    return response.data.data;
  },

  /**
   * Create a new resume
   */
  async create(data: CreateResumeData): Promise<Resume> {
    const response = await api.post<{ success: boolean; data: Resume }>('/resumes', data);
    return response.data.data;
  },

  /**
   * Update an existing resume
   */
  async update(id: string, data: UpdateResumeData): Promise<Resume> {
    const response = await api.put<{ success: boolean; data: Resume }>(`/resumes/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a resume
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/resumes/${id}`);
  },

  /**
   * Duplicate a resume
   */
  async duplicate(id: string): Promise<Resume> {
    const response = await api.post<{ success: boolean; data: Resume }>(`/resumes/${id}/duplicate`);
    return response.data.data;
  },

  /**
   * Share a resume (make it public)
   */
  async share(id: string): Promise<{ slug: string; publicUrl: string }> {
    const response = await api.post<{
      success: boolean;
      data: { slug: string; publicUrl: string };
    }>(`/resumes/${id}/share`);
    return response.data.data;
  },

  /**
   * Unshare a resume (make it private)
   */
  async unshare(id: string): Promise<Resume> {
    const response = await api.delete<{ success: boolean; data: Resume }>(`/resumes/${id}/share`);
    return response.data.data;
  },

  /**
   * Get a public resume by slug
   */
  async getPublic(slug: string): Promise<Resume> {
    const response = await api.get<{ success: boolean; data: Resume }>(`/resumes/public/${slug}`);
    return response.data.data;
  },

  // Version management

  /**
   * Get all versions of a resume
   */
  async getVersions(resumeId: string): Promise<ResumeVersion[]> {
    const response = await api.get<{ success: boolean; data: ResumeVersion[] }>(
      `/resumes/${resumeId}/versions`
    );
    return response.data.data;
  },

  /**
   * Create a new version (snapshot) of a resume
   */
  async createVersion(resumeId: string, description?: string): Promise<ResumeVersion> {
    const response = await api.post<{ success: boolean; data: ResumeVersion }>(
      `/resumes/${resumeId}/versions`,
      { description }
    );
    return response.data.data;
  },

  /**
   * Restore a resume to a specific version
   */
  async restoreVersion(resumeId: string, versionId: string): Promise<Resume> {
    const response = await api.post<{ success: boolean; data: Resume }>(
      `/resumes/${resumeId}/versions/${versionId}/restore`
    );
    return response.data.data;
  },

  /**
   * Delete a version
   */
  async deleteVersion(resumeId: string, versionId: string): Promise<void> {
    await api.delete(`/resumes/${resumeId}/versions/${versionId}`);
  },

  // Utility methods

  /**
   * Export resume as PDF (returns download URL)
   */
  async exportPdf(id: string): Promise<{ url: string }> {
    const response = await api.get<{ success: boolean; data: { url: string } }>(
      `/resumes/${id}/export/pdf`
    );
    return response.data.data;
  },

  /**
   * Check if user can create more resumes
   */
  async canCreateMore(): Promise<{ canCreate: boolean; current: number; limit: number }> {
    const response = await api.get<{
      success: boolean;
      data: { canCreate: boolean; current: number; limit: number };
    }>('/resumes/can-create');
    return response.data.data;
  },
};

export default resumeService;
