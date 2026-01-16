import { V2ResumeData } from '../types/resumeData';
import { API_ENDPOINTS, apiFetch } from '../../config/api';

export interface LinkedInImportResponse {
  success: boolean;
  data: V2ResumeData;
  linkedinProfile: {
    name: string;
    photoUrl?: string;
    linkedInUrl?: string;
  };
}

export interface LinkedInImportError {
  error: string;
  details?: string;
}

/**
 * Import LinkedIn profile and convert to resume data
 * @param linkedinUrl - Full LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)
 * @returns Promise with resume data or throws an error
 */
export async function importLinkedInProfile(linkedinUrl: string): Promise<LinkedInImportResponse> {
  // Validate URL format on client side first
  const linkedinUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
  if (!linkedinUrlPattern.test(linkedinUrl)) {
    throw new Error('Invalid LinkedIn URL format. Expected: https://www.linkedin.com/in/username');
  }

  const functionUrl = API_ENDPOINTS.linkedinImport;

  try {
    const response = await apiFetch(functionUrl, {
      method: 'POST',
      body: JSON.stringify({ linkedinUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as LinkedInImportError;
      throw new Error(errorData.error || 'Failed to import LinkedIn profile');
    }

    return data as LinkedInImportResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to import LinkedIn profile. Please try again.');
  }
}

/**
 * Validate if a URL is a valid LinkedIn profile URL
 */
export function isValidLinkedInUrl(url: string): boolean {
  const linkedinUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
  return linkedinUrlPattern.test(url);
}

/**
 * Extract username from LinkedIn URL
 */
export function extractLinkedInUsername(url: string): string | null {
  const match = url.match(/linkedin\.com\/in\/([\w-]+)/i);
  return match ? match[1] : null;
}
