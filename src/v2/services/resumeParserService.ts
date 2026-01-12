/**
 * Resume Parser Service
 *
 * Client-side service for uploading and parsing resumes
 * using the parse-resume Netlify function.
 */

import type { V2ResumeData } from '../types';

export interface ParseResumeResult {
  success: boolean;
  data?: V2ResumeData;
  error?: string;
  extractedTextLength?: number;
}

/**
 * Parse a resume file and return structured V2ResumeData
 */
export async function parseResumeFile(file: File): Promise<ParseResumeResult> {
  // Validate file type
  const validTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];
  const validExtensions = ['.pdf', '.docx', '.txt'];

  const isValidType = validTypes.includes(file.type) ||
    validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

  if (!isValidType) {
    return {
      success: false,
      error: 'Please upload a PDF, DOCX, or TXT file.',
    };
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      success: false,
      error: 'File size must be less than 10MB.',
    };
  }

  try {
    // Convert file to base64
    const base64Data = await fileToBase64(file);

    // Call the parse-resume Netlify function
    const response = await fetch('/.netlify/functions/parse-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileData: base64Data,
        fileName: file.name,
        fileType: file.type,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to parse resume',
      };
    }

    if (result.success && result.data) {
      return {
        success: true,
        data: result.data,
        extractedTextLength: result.extractedTextLength,
      };
    }

    return {
      success: false,
      error: 'Invalid response from parser',
    };
  } catch (err) {
    console.error('Resume parsing error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to parse resume',
    };
  }
}

/**
 * Convert a File to base64 string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Merge parsed resume data with existing data
 * Useful when user wants to update only certain sections
 */
export function mergeResumeData(
  existing: V2ResumeData,
  parsed: V2ResumeData,
  options?: {
    overwritePersonalInfo?: boolean;
    overwriteExperience?: boolean;
    overwriteEducation?: boolean;
    overwriteSkills?: boolean;
    mergeSkills?: boolean;
  }
): V2ResumeData {
  const opts = {
    overwritePersonalInfo: true,
    overwriteExperience: true,
    overwriteEducation: true,
    overwriteSkills: true,
    mergeSkills: false,
    ...options,
  };

  const merged: V2ResumeData = { ...existing };

  // Personal Info
  if (opts.overwritePersonalInfo) {
    merged.personalInfo = {
      ...existing.personalInfo,
      ...parsed.personalInfo,
      // Don't overwrite empty values
      fullName: parsed.personalInfo.fullName || existing.personalInfo.fullName,
      email: parsed.personalInfo.email || existing.personalInfo.email,
      phone: parsed.personalInfo.phone || existing.personalInfo.phone,
      location: parsed.personalInfo.location || existing.personalInfo.location,
      title: parsed.personalInfo.title || existing.personalInfo.title,
      summary: parsed.personalInfo.summary || existing.personalInfo.summary,
    };
  }

  // Experience
  if (opts.overwriteExperience && parsed.experience.length > 0) {
    merged.experience = parsed.experience;
  }

  // Education
  if (opts.overwriteEducation && parsed.education.length > 0) {
    merged.education = parsed.education;
  }

  // Skills
  if (parsed.skills.length > 0) {
    if (opts.mergeSkills) {
      // Merge skills, avoiding duplicates
      const existingNames = new Set(existing.skills.map(s => s.name.toLowerCase()));
      const newSkills = parsed.skills.filter(s => !existingNames.has(s.name.toLowerCase()));
      merged.skills = [...existing.skills, ...newSkills];
    } else if (opts.overwriteSkills) {
      merged.skills = parsed.skills;
    }
  }

  // Optional sections - only overwrite if parsed has data
  if (parsed.languages && parsed.languages.length > 0) {
    merged.languages = parsed.languages;
  }
  if (parsed.certifications && parsed.certifications.length > 0) {
    merged.certifications = parsed.certifications;
  }
  if (parsed.projects && parsed.projects.length > 0) {
    merged.projects = parsed.projects;
  }
  if (parsed.awards && parsed.awards.length > 0) {
    merged.awards = parsed.awards;
  }
  if (parsed.volunteer && parsed.volunteer.length > 0) {
    merged.volunteer = parsed.volunteer;
  }
  if (parsed.publications && parsed.publications.length > 0) {
    merged.publications = parsed.publications;
  }
  if (parsed.courses && parsed.courses.length > 0) {
    merged.courses = parsed.courses;
  }

  return merged;
}

export default parseResumeFile;
