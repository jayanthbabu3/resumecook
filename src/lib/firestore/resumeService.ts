import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import type {
  Resume,
  ResumeData,
  ResumeMetadata,
  CreateResumeOptions,
  UpdateResumePayload,
  ResumeVersion,
  PublicResume,
} from '@/types/resume';
import { toast } from 'sonner';

/**
 * Firestore Resume Service with Hybrid Architecture
 *
 * Collections:
 * - /users/{userId}/resumes - User's private resumes
 * - /publicResumes - Shared resumes and templates
 * - /resumeVersions/{resumeId}/versions - Version history
 */
class ResumeService {
  /**
   * Get user's resumes collection reference
   */
  private getUserResumesRef(userId: string) {
    return collection(db, 'users', userId, 'resumes');
  }

  /**
   * Get public resumes collection reference
   */
  private getPublicResumesRef() {
    return collection(db, 'publicResumes');
  }

  /**
   * Get resume versions collection reference
   */
  private getResumeVersionsRef(resumeId: string) {
    return collection(db, 'resumeVersions', resumeId, 'versions');
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
   * Normalize resume data to ensure all required arrays exist
   */
  private normalizeResumeData(data: any): ResumeData {
    return {
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
      sections: Array.isArray(data.sections) ? data.sections : [],
    };
  }

  /**
   * Create a new resume
   */
  async createResume(
    templateId: string,
    data: ResumeData,
    options?: CreateResumeOptions
  ): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const resumesRef = this.getUserResumesRef(user.uid);
    const resumeId = doc(resumesRef).id;

    // Calculate word count
    const wordCount = this.calculateWordCount(data);

    const resume: Omit<Resume, 'id'> = {
      userId: user.uid,
      templateId,
      themeColor: options?.themeColor || '#2563eb',
      title: options?.title || `Resume - ${new Date().toLocaleDateString()}`,
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
    };

    await setDoc(doc(resumesRef, resumeId), resume);

    // Create initial version
    await this.createVersion(resumeId, data, templateId, options?.themeColor || '#7c3aed', 'Initial version');

    toast.success('Resume created successfully');
    return resumeId;
  }

  /**
   * Get a single resume by ID
   */
  async getResume(resumeId: string): Promise<Resume | null> {
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

    const data = docSnap.data();
    const resume = {
      id: docSnap.id,
      ...this.convertTimestamps(data),
    } as Resume;

    // Normalize the resume data to ensure all arrays are properly initialized
    if (resume.data) {
      resume.data = this.normalizeResumeData(resume.data);
    }

    return resume;
  }

  /**
   * Get all user's resumes (metadata only)
   */
  async getUserResumes(): Promise<ResumeMetadata[]> {
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
    })) as ResumeMetadata[];
  }

  /**
   * Update resume
   */
  async updateResume(resumeId: string, updates: UpdateResumePayload): Promise<void> {
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
  async updateResumeData(resumeId: string, data: ResumeData): Promise<void> {
    await this.updateResume(resumeId, { data });
  }

  /**
   * Change template
   */
  async changeTemplate(resumeId: string, templateId: string): Promise<void> {
    await this.updateResume(resumeId, { templateId });
    toast.success('Template changed successfully');
  }

  /**
   * Change theme color
   */
  async changeThemeColor(resumeId: string, themeColor: string): Promise<void> {
    await this.updateResume(resumeId, { themeColor });
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
      tags: resume.tags,
    });

    toast.success('Resume duplicated');
    return newId;
  }

  /**
   * Set as primary resume
   */
  async setPrimaryResume(resumeId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const batch = writeBatch(db);

    // Get all resumes
    const resumes = await this.getUserResumes();

    // Unset all primary flags
    resumes.forEach((r) => {
      const docRef = doc(this.getUserResumesRef(user.uid), r.id);
      batch.update(docRef, { isPrimary: false });
    });

    // Set this one as primary
    const docRef = doc(this.getUserResumesRef(user.uid), resumeId);
    batch.update(docRef, { isPrimary: true });

    await batch.commit();
    toast.success('Set as primary resume');
  }

  /**
   * Make resume public
   */
  async makePublic(resumeId: string, slug?: string): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const resume = await this.getResume(resumeId);
    if (!resume) throw new Error('Resume not found');

    const shareSlug = slug || this.generateSlug(resume.title);

    // Update original resume
    await this.updateResume(resumeId, {
      isPublic: true,
    });

    // Create public resume entry
    const publicResume: Omit<PublicResume, 'id'> = {
      slug: shareSlug,
      title: resume.title,
      templateId: resume.templateId,
      themeColor: resume.themeColor,
      data: resume.data,
      authorId: user.uid,
      authorName: user.displayName || 'Anonymous',
      isTemplate: false,
      downloads: 0,
      views: 0,
      tags: resume.tags || [],
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
    };

    await setDoc(doc(this.getPublicResumesRef(), resumeId), publicResume);

    toast.success('Resume is now public');
    return shareSlug;
  }

  /**
   * Make resume private
   */
  async makePrivate(resumeId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    // Update original resume
    await this.updateResume(resumeId, {
      isPublic: false,
    });

    // Delete public resume entry
    await deleteDoc(doc(this.getPublicResumesRef(), resumeId));

    toast.success('Resume is now private');
  }

  /**
   * Get public resume by slug
   */
  async getPublicResume(slug: string): Promise<PublicResume | null> {
    const q = query(
      this.getPublicResumesRef(),
      where('slug', '==', slug),
      limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];

    // Increment view count
    updateDoc(doc.ref, {
      views: increment(1),
    }).catch(console.error);

    const publicResume = {
      id: doc.id,
      ...this.convertTimestamps(doc.data()),
    } as PublicResume;

    // Normalize the resume data to ensure all arrays are properly initialized
    if (publicResume.data) {
      publicResume.data = this.normalizeResumeData(publicResume.data);
    }

    return publicResume;
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

  // ========== VERSION HISTORY ==========

  /**
   * Create a version snapshot
   */
  async createVersion(
    resumeId: string,
    data: ResumeData,
    templateId: string,
    themeColor: string,
    changeDescription?: string
  ): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const versionsRef = this.getResumeVersionsRef(resumeId);

    // Get version count
    const versions = await getDocs(versionsRef);
    const versionNumber = versions.size + 1;

    const version: Omit<ResumeVersion, 'id'> = {
      resumeId,
      data,
      templateId,
      themeColor,
      createdAt: serverTimestamp() as any,
      createdBy: user.uid,
      versionNumber,
      changeDescription,
    };

    await setDoc(doc(versionsRef), version);
  }

  /**
   * Get version history for a resume
   */
  async getVersionHistory(resumeId: string): Promise<ResumeVersion[]> {
    const q = query(
      this.getResumeVersionsRef(resumeId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...this.convertTimestamps(doc.data()),
    })) as ResumeVersion[];
  }

  /**
   * Restore a version
   */
  async restoreVersion(resumeId: string, versionId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    // Get the version
    const versionDoc = await getDoc(
      doc(this.getResumeVersionsRef(resumeId), versionId)
    );

    if (!versionDoc.exists()) throw new Error('Version not found');

    const version = versionDoc.data() as ResumeVersion;

    // Update resume with version data
    await this.updateResume(resumeId, {
      data: version.data,
      templateId: version.templateId,
      themeColor: version.themeColor,
    });

    // Create a new version for this restore
    await this.createVersion(
      resumeId,
      version.data,
      version.templateId,
      version.themeColor,
      `Restored from version ${version.versionNumber}`
    );

    toast.success('Version restored');
  }

  // ========== UTILITIES ==========

  /**
   * Calculate word count from resume data
   */
  private calculateWordCount(data: ResumeData): number {
    let text = '';
    text += data.personalInfo?.summary || '';

    // Safely handle arrays that might be undefined or null
    const experience = Array.isArray(data.experience) ? data.experience : [];
    experience.forEach((exp) => {
      text += exp.description || '';
    });

    const sections = Array.isArray(data.sections) ? data.sections : [];
    sections.forEach((section) => {
      text += section.content || '';
    });

    return text.split(/\s+/).filter((word) => word.length > 0).length;
  }

  /**
   * Generate URL-friendly slug
   */
  private generateSlug(title: string): string {
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') +
      '-' +
      Math.random().toString(36).substring(2, 8)
    );
  }

  /**
   * Update ATS score and report
   */
  async updateAtsScore(resumeId: string, score: number, report?: any): Promise<void> {
    const updates: any = {
      atsScore: score,
      atsAnalyzedAt: serverTimestamp()
    };

    if (report) {
      updates.atsReport = report;
    }

    await this.updateResume(resumeId, updates as any);
  }

  // ========== FAVORITE TEMPLATES ==========

  /**
   * Get user's favorites document reference
   */
  private getUserPreferencesRef(userId: string) {
    return doc(db, 'users', userId, 'preferences', 'favorites');
  }

  /**
   * Get user's favorite templates
   */
  async getFavoriteTemplates(): Promise<string[]> {
    const user = auth.currentUser;
    if (!user) {
      return [];
    }

    try {
      const docRef = this.getUserPreferencesRef(user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return [];
      }

      const data = docSnap.data();
      return Array.isArray(data.templateIds) ? data.templateIds : [];
    } catch (error) {
      console.error('Error getting favorite templates:', error);
      return [];
    }
  }

  /**
   * Check if a template is favorited
   */
  async isFavoriteTemplate(templateId: string): Promise<boolean> {
    const favorites = await this.getFavoriteTemplates();
    return favorites.includes(templateId);
  }

  /**
   * Add template to favorites
   */
  async addFavoriteTemplate(templateId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const docRef = this.getUserPreferencesRef(user.uid);
      const docSnap = await getDoc(docRef);

      let favorites: string[] = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        favorites = Array.isArray(data.templateIds) ? data.templateIds : [];
      }

      // Add if not already in favorites
      if (!favorites.includes(templateId)) {
        favorites.push(templateId);
        await setDoc(docRef, {
          templateIds: favorites,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        toast.success('Template added to favorites');
      }
    } catch (error) {
      console.error('Error adding favorite template:', error);
      toast.error('Failed to add to favorites');
      throw error;
    }
  }

  /**
   * Remove template from favorites
   */
  async removeFavoriteTemplate(templateId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const docRef = this.getUserPreferencesRef(user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        let favorites: string[] = Array.isArray(data.templateIds) ? data.templateIds : [];

        // Remove from favorites
        favorites = favorites.filter(id => id !== templateId);

        await setDoc(docRef, {
          templateIds: favorites,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        toast.success('Template removed from favorites');
      }
    } catch (error) {
      console.error('Error removing favorite template:', error);
      toast.error('Failed to remove from favorites');
      throw error;
    }
  }

  /**
   * Toggle template favorite status
   */
  async toggleFavoriteTemplate(templateId: string): Promise<boolean> {
    const isFavorite = await this.isFavoriteTemplate(templateId);

    if (isFavorite) {
      await this.removeFavoriteTemplate(templateId);
      return false;
    } else {
      await this.addFavoriteTemplate(templateId);
      return true;
    }
  }
}

export const resumeService = new ResumeService();
