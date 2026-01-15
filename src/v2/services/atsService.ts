/**
 * ATS Score Service
 *
 * Handles communication with the ATS analysis Netlify function.
 */

import type { V2ResumeData } from '../types/resumeData';
import type { ATSScoreResponse } from '../types/ats';

const ATS_API_ENDPOINT = '/.netlify/functions/ats-score';

export interface AnalyzeATSOptions {
  resumeData: V2ResumeData;
  jobDescription?: string;
}

/**
 * Analyze resume for ATS compatibility
 */
export async function analyzeATSScore(options: AnalyzeATSOptions): Promise<ATSScoreResponse> {
  const { resumeData, jobDescription } = options;

  try {
    const response = await fetch(ATS_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeData,
        jobDescription,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data as ATSScoreResponse;

  } catch (error) {
    console.error('ATS Score Error:', error);
    throw error;
  }
}

/**
 * Get severity color for issues
 */
export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'high':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'medium':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'low':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

/**
 * Get priority badge color for tips
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-amber-100 text-amber-700';
    case 'low':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
