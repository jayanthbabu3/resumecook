/**
 * Firestore Utilities - DEPRECATED STUB
 *
 * Firestore has been removed. This file exists for backwards compatibility.
 * All data operations now use the API backend.
 *
 * Use @/services for all data operations.
 */

// Stub exports for backwards compatibility
export interface ResumeData {
  id?: string;
  userId: string;
  templateId: string;
  personalInfo: any;
  experience: any[];
  education: any[];
  skills: any[];
  additionalSections: any[];
  createdAt: Date;
  updatedAt: Date;
}

// No-op stub functions
export const saveResume = async () => {
  console.warn('DEPRECATED: Use resumeService from @/services instead');
};

export const getResume = async () => {
  console.warn('DEPRECATED: Use resumeService from @/services instead');
  return null;
};

export const getUserResumes = async () => {
  console.warn('DEPRECATED: Use resumeService from @/services instead');
  return [];
};

export const deleteResume = async () => {
  console.warn('DEPRECATED: Use resumeService from @/services instead');
};
