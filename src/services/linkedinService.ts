/**
 * LinkedIn Service
 *
 * Handles LinkedIn profile import functionality
 */

import api from './api';
import { ResumeData } from './resumeService';

// Types
export interface LinkedInProfile {
  name: string;
  photoUrl: string;
  linkedInUrl: string;
}

export interface LinkedInImportResponse {
  success: boolean;
  data: ResumeData;
  linkedinProfile: LinkedInProfile;
}

// LinkedIn service methods
export const linkedinService = {
  /**
   * Import LinkedIn profile and convert to resume data
   */
  async importProfile(linkedinUrl: string): Promise<LinkedInImportResponse> {
    const response = await api.post<LinkedInImportResponse>('/linkedin/import', {
      linkedinUrl,
    });
    return response.data;
  },

  /**
   * Validate LinkedIn URL format
   */
  validateUrl(url: string): { valid: boolean; error?: string } {
    if (!url) {
      return { valid: false, error: 'LinkedIn URL is required' };
    }

    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
    if (!linkedinPattern.test(url)) {
      return {
        valid: false,
        error: 'Invalid LinkedIn URL format. Expected: https://www.linkedin.com/in/username',
      };
    }

    return { valid: true };
  },

  /**
   * Extract username from LinkedIn URL
   */
  extractUsername(url: string): string | null {
    const match = url.match(/linkedin\.com\/in\/([\w-]+)/i);
    return match ? match[1] : null;
  },
};

export default linkedinService;
