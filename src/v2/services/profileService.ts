/**
 * Profile Service
 *
 * Manages user profile data - the single source of truth for all resume content.
 * Profile data is separate from resume-specific settings (template, colors, visibility).
 *
 * Architecture:
 * - users/{userId}/profile - Single document containing all user's professional data
 * - Profile data is used by all resumes
 * - Each resume stores which items to show/hide, not the data itself
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { toast } from 'sonner';
import type {
  V2ResumeData,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillItem,
  LanguageItem,
  CertificationItem,
  ProjectItem,
  PublicationItem,
  VolunteerItem,
  AwardItem,
  AchievementItem,
  StrengthItem,
  CourseItem,
  InterestItem,
  ReferenceItem,
  SpeakingItem,
  PatentItem,
} from '../types/resumeData';

// ============================================================================
// TYPES
// ============================================================================

/**
 * User Profile - Contains all professional data
 */
export interface UserProfile {
  // Core Info
  personalInfo: PersonalInfo;

  // Professional History
  experience: ExperienceItem[];
  education: EducationItem[];

  // Skills & Languages
  skills: SkillItem[];
  languages: LanguageItem[];

  // Credentials
  certifications: CertificationItem[];
  awards: AwardItem[];

  // Additional Sections
  projects: ProjectItem[];
  publications: PublicationItem[];
  volunteer: VolunteerItem[];
  achievements: AchievementItem[];
  strengths: StrengthItem[];
  courses: CourseItem[];
  interests: InterestItem[];
  references: ReferenceItem[];
  speaking: SpeakingItem[];
  patents: PatentItem[];

  // Metadata
  linkedinUrl?: string;
  linkedinImportedAt?: Date | Timestamp;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

/**
 * Profile update payload - all fields optional for partial updates
 */
export interface UpdateProfilePayload {
  personalInfo?: Partial<PersonalInfo>;
  experience?: ExperienceItem[];
  education?: EducationItem[];
  skills?: SkillItem[];
  languages?: LanguageItem[];
  certifications?: CertificationItem[];
  awards?: AwardItem[];
  projects?: ProjectItem[];
  publications?: PublicationItem[];
  volunteer?: VolunteerItem[];
  achievements?: AchievementItem[];
  strengths?: StrengthItem[];
  courses?: CourseItem[];
  interests?: InterestItem[];
  references?: ReferenceItem[];
  speaking?: SpeakingItem[];
  patents?: PatentItem[];
}

// ============================================================================
// PROFILE SERVICE
// ============================================================================

class ProfileService {
  /**
   * Get user's profile document reference
   */
  private getProfileRef(userId: string) {
    return doc(db, 'users', userId, 'profile', 'data');
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
    if (data.linkedinImportedAt instanceof Timestamp) {
      converted.linkedinImportedAt = data.linkedinImportedAt.toDate();
    }
    return converted;
  }

  /**
   * Create empty profile with defaults
   */
  private createEmptyProfile(): Omit<UserProfile, 'createdAt' | 'updatedAt'> {
    return {
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
      languages: [],
      certifications: [],
      awards: [],
      projects: [],
      publications: [],
      volunteer: [],
      achievements: [],
      strengths: [],
      courses: [],
      interests: [],
      references: [],
      speaking: [],
      patents: [],
    };
  }

  /**
   * Check if user has a profile
   */
  async hasProfile(): Promise<boolean> {
    const user = auth.currentUser;
    if (!user) return false;

    const docRef = this.getProfileRef(user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  /**
   * Get user's profile
   */
  async getProfile(): Promise<UserProfile | null> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = this.getProfileRef(user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return this.convertTimestamps(docSnap.data()) as UserProfile;
  }

  /**
   * Create or replace user's profile
   */
  async saveProfile(profile: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = this.getProfileRef(user.uid);
    const existingDoc = await getDoc(docRef);

    const profileData = {
      ...profile,
      updatedAt: serverTimestamp(),
      ...(existingDoc.exists() ? {} : { createdAt: serverTimestamp() }),
    };

    await setDoc(docRef, profileData, { merge: true });
  }

  /**
   * Update specific fields in user's profile
   */
  async updateProfile(updates: UpdateProfilePayload): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = this.getProfileRef(user.uid);

    // Check if profile exists, create if not
    const existingDoc = await getDoc(docRef);
    if (!existingDoc.exists()) {
      const emptyProfile = this.createEmptyProfile();
      await setDoc(docRef, {
        ...emptyProfile,
        ...updates,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return;
    }

    // Update existing profile
    const updatePayload: any = { ...updates, updatedAt: serverTimestamp() };

    // Handle nested personalInfo updates
    if (updates.personalInfo) {
      const existingData = existingDoc.data();
      updatePayload.personalInfo = {
        ...existingData.personalInfo,
        ...updates.personalInfo,
      };
    }

    await updateDoc(docRef, updatePayload);
  }

  /**
   * Import LinkedIn data into profile
   * This is the main entry point when importing from LinkedIn
   */
  async importFromLinkedIn(
    linkedInData: V2ResumeData,
    linkedinUrl?: string
  ): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    // Get existing profile to preserve any data LinkedIn doesn't have
    const existingProfile = await this.getProfile();

    // Merge LinkedIn data with existing profile
    // LinkedIn data takes precedence for fields it provides
    const profile: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
      personalInfo: {
        ...existingProfile?.personalInfo,
        ...linkedInData.personalInfo,
        // Preserve email/phone if LinkedIn doesn't provide them
        email: linkedInData.personalInfo.email || existingProfile?.personalInfo?.email || '',
        phone: linkedInData.personalInfo.phone || existingProfile?.personalInfo?.phone || '',
      },
      experience: linkedInData.experience || existingProfile?.experience || [],
      education: linkedInData.education || existingProfile?.education || [],
      skills: linkedInData.skills || existingProfile?.skills || [],
      languages: linkedInData.languages || existingProfile?.languages || [],
      certifications: linkedInData.certifications || existingProfile?.certifications || [],
      awards: linkedInData.awards || existingProfile?.awards || [],
      projects: linkedInData.projects || existingProfile?.projects || [],
      publications: linkedInData.publications || existingProfile?.publications || [],
      volunteer: linkedInData.volunteer || existingProfile?.volunteer || [],
      achievements: linkedInData.achievements || existingProfile?.achievements || [],
      strengths: linkedInData.strengths || existingProfile?.strengths || [],
      courses: linkedInData.courses || existingProfile?.courses || [],
      interests: linkedInData.interests || existingProfile?.interests || [],
      references: linkedInData.references || existingProfile?.references || [],
      speaking: linkedInData.speaking || existingProfile?.speaking || [],
      patents: linkedInData.patents || existingProfile?.patents || [],
      linkedinUrl: linkedinUrl || linkedInData.personalInfo.linkedin,
    };

    const docRef = this.getProfileRef(user.uid);
    const existingDoc = await getDoc(docRef);

    await setDoc(docRef, {
      ...profile,
      linkedinImportedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(existingDoc.exists() ? {} : { createdAt: serverTimestamp() }),
    });

    toast.success('LinkedIn profile imported successfully!');
  }

  /**
   * Convert profile to V2ResumeData format
   * Used when loading data into the resume builder
   */
  profileToResumeData(profile: UserProfile): V2ResumeData {
    return {
      version: '2.0',
      personalInfo: profile.personalInfo,
      experience: profile.experience,
      education: profile.education,
      skills: profile.skills,
      languages: profile.languages,
      certifications: profile.certifications,
      awards: profile.awards,
      projects: profile.projects,
      publications: profile.publications,
      volunteer: profile.volunteer,
      achievements: profile.achievements,
      strengths: profile.strengths,
      courses: profile.courses,
      interests: profile.interests,
      references: profile.references,
      speaking: profile.speaking,
      patents: profile.patents,
      settings: {
        includeSocialLinks: true,
        includePhoto: !!profile.personalInfo.photo,
        dateFormat: 'MMM YYYY',
      },
    };
  }

  /**
   * Update profile from resume data
   * Called when user edits resume in builder
   */
  async syncFromResumeData(resumeData: V2ResumeData): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    await this.updateProfile({
      personalInfo: resumeData.personalInfo,
      experience: resumeData.experience,
      education: resumeData.education,
      skills: resumeData.skills,
      languages: resumeData.languages,
      certifications: resumeData.certifications,
      awards: resumeData.awards,
      projects: resumeData.projects,
      publications: resumeData.publications,
      volunteer: resumeData.volunteer,
      achievements: resumeData.achievements,
      strengths: resumeData.strengths,
      courses: resumeData.courses,
      interests: resumeData.interests,
      references: resumeData.references,
      speaking: resumeData.speaking,
      patents: resumeData.patents,
    });
  }

  /**
   * Add a single experience item
   */
  async addExperience(experience: ExperienceItem): Promise<void> {
    const profile = await this.getProfile();
    const experiences = profile?.experience || [];
    await this.updateProfile({
      experience: [...experiences, experience],
    });
  }

  /**
   * Update a single experience item
   */
  async updateExperience(experienceId: string, updates: Partial<ExperienceItem>): Promise<void> {
    const profile = await this.getProfile();
    if (!profile) return;

    const experiences = profile.experience.map((exp) =>
      exp.id === experienceId ? { ...exp, ...updates } : exp
    );
    await this.updateProfile({ experience: experiences });
  }

  /**
   * Remove an experience item
   */
  async removeExperience(experienceId: string): Promise<void> {
    const profile = await this.getProfile();
    if (!profile) return;

    const experiences = profile.experience.filter((exp) => exp.id !== experienceId);
    await this.updateProfile({ experience: experiences });
  }

  /**
   * Add a single education item
   */
  async addEducation(education: EducationItem): Promise<void> {
    const profile = await this.getProfile();
    const educations = profile?.education || [];
    await this.updateProfile({
      education: [...educations, education],
    });
  }

  /**
   * Add a single skill
   */
  async addSkill(skill: SkillItem): Promise<void> {
    const profile = await this.getProfile();
    const skills = profile?.skills || [];
    await this.updateProfile({
      skills: [...skills, skill],
    });
  }

  /**
   * Get profile completeness percentage
   */
  calculateCompleteness(profile: UserProfile): number {
    let score = 0;
    const weights = {
      personalInfo: 20,
      experience: 25,
      education: 15,
      skills: 15,
      summary: 10,
      photo: 5,
      socialLinks: 10,
    };

    // Personal Info (name, email, phone, location)
    const { fullName, email, phone, location, title, summary, linkedin, github, portfolio, photo } =
      profile.personalInfo;

    if (fullName) score += weights.personalInfo * 0.3;
    if (email) score += weights.personalInfo * 0.3;
    if (phone) score += weights.personalInfo * 0.2;
    if (location) score += weights.personalInfo * 0.1;
    if (title) score += weights.personalInfo * 0.1;

    // Experience
    if (profile.experience.length > 0) {
      score += weights.experience * Math.min(profile.experience.length / 3, 1);
    }

    // Education
    if (profile.education.length > 0) {
      score += weights.education * Math.min(profile.education.length / 2, 1);
    }

    // Skills
    if (profile.skills.length > 0) {
      score += weights.skills * Math.min(profile.skills.length / 5, 1);
    }

    // Summary
    if (summary && summary.length > 50) {
      score += weights.summary;
    }

    // Photo
    if (photo) {
      score += weights.photo;
    }

    // Social Links
    const socialLinksCount = [linkedin, github, portfolio].filter(Boolean).length;
    score += weights.socialLinks * Math.min(socialLinksCount / 2, 1);

    return Math.round(score);
  }
}

export const profileService = new ProfileService();
