/**
 * V2 Resume Service
 *
 * Extends the base resume service to work with V2ResumeData type.
 * This service stores resumes using the universal V2 data format,
 * which is template-agnostic and can be rendered with any template.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  increment,
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { toast } from 'sonner';
import type { V2ResumeData } from '../types/resumeData';

/**
 * V2 Resume Metadata - stored in Firestore
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
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  lastViewedAt: Date | Timestamp;

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

class ResumeServiceV2 {
  /**
   * Get user's resumes collection reference
   */
  private getUserResumesRef(userId: string) {
    return collection(db, 'users', userId, 'resumes');
  }

  /**
   * Convert Firestore timestamps to Date objects
   */
  private convertTimestamps(data: any): any {
    const converted = { ...data };
    if (data.createdAt instanceof Timestamp) {
      converted.createdAt = data.createdAt.toDate();
    }
    if (data.updatedAt instanceof Timestamp) {
      converted.updatedAt = data.updatedAt.toDate();
    }
    if (data.lastViewedAt instanceof Timestamp) {
      converted.lastViewedAt = data.lastViewedAt.toDate();
    }
    return converted;
  }

  /**
   * Normalize V2 resume data to ensure all required fields exist
   */
  private normalizeResumeData(data: any): V2ResumeData {
    return {
      version: '2.0',
      personalInfo: data.personalInfo || {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        summary: '',
      },
      experience: Array.isArray(data.experience) ? data.experience : [],
      education: Array.isArray(data.education) ? data.education : [],
      skills: Array.isArray(data.skills) ? data.skills : [],
      // Optional sections
      languages: data.languages,
      achievements: data.achievements,
      strengths: data.strengths,
      certifications: data.certifications,
      projects: data.projects,
      awards: data.awards,
      publications: data.publications,
      volunteer: data.volunteer,
      speaking: data.speaking,
      patents: data.patents,
      interests: data.interests,
      references: data.references,
      courses: data.courses,
      customSections: data.customSections,
      settings: data.settings,
    };
  }

  /**
   * Calculate word count from V2 resume data
   */
  private calculateWordCount(data: V2ResumeData): number {
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

  /**
   * Create a new V2 resume
   */
  async createResume(
    templateId: string,
    data: V2ResumeData,
    options?: CreateV2ResumeOptions
  ): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const resumesRef = this.getUserResumesRef(user.uid);
    const resumeId = doc(resumesRef).id;

    // Calculate word count
    const wordCount = this.calculateWordCount(data);

    const resume: Omit<V2Resume, 'id'> = {
      userId: user.uid,
      templateId,
      themeColor: options?.themeColor || '#2563eb',
      themeColors: options?.themeColors,
      title: options?.title || data.personalInfo?.fullName
        ? `${data.personalInfo.fullName}'s Resume`
        : `Resume - ${new Date().toLocaleDateString()}`,
      isPrimary: options?.isPrimary || false,
      isPublic: false,
      data,
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
      lastViewedAt: serverTimestamp() as any,
      wordCount,
      viewCount: 0,
      downloadCount: 0,
      tags: options?.tags || [],
      sectionOverrides: options?.sectionOverrides,
      enabledSections: options?.enabledSections,
      sectionLabels: options?.sectionLabels,
    };

    await setDoc(doc(resumesRef, resumeId), resume);

    toast.success('Resume saved successfully');
    return resumeId;
  }

  /**
   * Get a single resume by ID
   */
  async getResume(resumeId: string): Promise<V2Resume | null> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = doc(this.getUserResumesRef(user.uid), resumeId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    // Update last viewed timestamp (don't await)
    updateDoc(docRef, {
      lastViewedAt: serverTimestamp(),
      viewCount: increment(1),
    }).catch(console.error);

    const docData = docSnap.data();
    const resume = {
      id: docSnap.id,
      ...this.convertTimestamps(docData),
    } as V2Resume;

    // Normalize the resume data
    if (resume.data) {
      resume.data = this.normalizeResumeData(resume.data);
    }

    return resume;
  }

  /**
   * Get all user's resumes (metadata only)
   */
  async getUserResumes(): Promise<V2ResumeMetadata[]> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const q = query(
      this.getUserResumesRef(user.uid),
      orderBy('updatedAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...this.convertTimestamps(doc.data()),
    })) as V2ResumeMetadata[];
  }

  /**
   * Update resume
   */
  async updateResume(resumeId: string, updates: UpdateV2ResumePayload): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = doc(this.getUserResumesRef(user.uid), resumeId);

    // Calculate word count if data is being updated
    const updatePayload: any = { ...updates };
    if (updates.data) {
      updatePayload.wordCount = this.calculateWordCount(updates.data);
    }

    updatePayload.updatedAt = serverTimestamp();

    await updateDoc(docRef, updatePayload);
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
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    await deleteDoc(doc(this.getUserResumesRef(user.uid), resumeId));
    toast.success('Resume deleted');
  }

  /**
   * Duplicate resume
   */
  async duplicateResume(resumeId: string): Promise<string> {
    const resume = await this.getResume(resumeId);
    if (!resume) throw new Error('Resume not found');

    const newId = await this.createResume(resume.templateId, resume.data, {
      title: `${resume.title} (Copy)`,
      themeColor: resume.themeColor,
      themeColors: resume.themeColors,
      tags: resume.tags,
      sectionOverrides: resume.sectionOverrides,
      enabledSections: resume.enabledSections,
      sectionLabels: resume.sectionLabels,
    });

    toast.success('Resume duplicated');
    return newId;
  }

  /**
   * Increment download count
   */
  async incrementDownloadCount(resumeId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(this.getUserResumesRef(user.uid), resumeId);
    await updateDoc(docRef, {
      downloadCount: increment(1),
    });
  }
}

export const resumeServiceV2 = new ResumeServiceV2();
