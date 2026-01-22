/**
 * AI Service
 *
 * Handles all AI-related API calls:
 * - Resume enhancement
 * - ATS scoring
 * - Chat with resume
 * - Resume generation
 */

import api from './api';
import { ResumeData } from './resumeService';

// Types
export interface EnhanceOptions {
  sections?: string[];
  style?: 'professional' | 'creative' | 'technical' | 'executive';
  targetRole?: string;
  targetCompany?: string;
  industry?: string;
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
}

export interface EnhanceResponse {
  success: boolean;
  data: {
    enhancedData: Partial<ResumeData>;
    suggestions?: string[];
    improvements?: Array<{
      section: string;
      original: string;
      enhanced: string;
      reason: string;
    }>;
  };
}

export interface ATSScoreResponse {
  success: boolean;
  data: {
    score: number;
    breakdown: {
      keywords: number;
      formatting: number;
      sections: number;
      experience: number;
      education: number;
      skills: number;
    };
    suggestions: Array<{
      category: string;
      issue: string;
      recommendation: string;
      priority: 'high' | 'medium' | 'low';
    }>;
    keywords: {
      found: string[];
      missing: string[];
      recommended: string[];
    };
    overallFeedback: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    message: string;
    suggestions?: string[];
    updatedData?: Partial<ResumeData>;
  };
}

export interface GenerateFromJobResponse {
  success: boolean;
  data: {
    resumeData: ResumeData;
    matchScore: number;
    keywordsExtracted: string[];
  };
}

// AI service methods
export const aiService = {
  /**
   * Enhance resume with AI
   */
  async enhanceResume(
    resumeData: ResumeData,
    options?: EnhanceOptions
  ): Promise<EnhanceResponse['data']> {
    const response = await api.post<EnhanceResponse>('/ai/enhance-resume', {
      resumeData,
      options,
    });
    return response.data.data;
  },

  /**
   * Get ATS score for resume
   */
  async getATSScore(
    resumeData: ResumeData,
    jobDescription?: string
  ): Promise<ATSScoreResponse['data']> {
    const response = await api.post<ATSScoreResponse>('/ai/ats-score', {
      resumeData,
      jobDescription,
    });
    return response.data.data;
  },

  /**
   * Chat with resume - ask questions and get suggestions
   */
  async chat(
    resumeData: ResumeData,
    message: string,
    conversationHistory?: ChatMessage[]
  ): Promise<ChatResponse['data']> {
    const response = await api.post<ChatResponse>('/ai/chat', {
      resumeData,
      message,
      conversationHistory,
    });
    return response.data.data;
  },

  /**
   * Generate resume from job description
   */
  async generateFromJob(
    jobDescription: string,
    baseResumeData?: Partial<ResumeData>
  ): Promise<GenerateFromJobResponse['data']> {
    const response = await api.post<GenerateFromJobResponse>('/ai/generate-resume-from-job', {
      jobDescription,
      baseResumeData,
    });
    return response.data.data;
  },

  /**
   * Tailor resume for a specific job
   */
  async tailorForJob(
    resumeData: ResumeData,
    jobDescription: string
  ): Promise<EnhanceResponse['data']> {
    const response = await api.post<EnhanceResponse>('/ai/tailor-resume-for-job', {
      resumeData,
      jobDescription,
    });
    return response.data.data;
  },

  /**
   * Enhance a specific section
   */
  async enhanceSection(
    section: string,
    content: string,
    context?: {
      targetRole?: string;
      industry?: string;
      experienceLevel?: string;
    }
  ): Promise<{ enhanced: string; suggestions: string[] }> {
    const response = await api.post<{
      success: boolean;
      data: { enhanced: string; suggestions: string[] };
    }>('/ai/enhance-section', {
      section,
      content,
      context,
    });
    return response.data.data;
  },

  /**
   * Generate bullet points from description
   */
  async generateBulletPoints(
    description: string,
    role?: string,
    count?: number
  ): Promise<string[]> {
    const response = await api.post<{
      success: boolean;
      data: { bulletPoints: string[] };
    }>('/ai/generate-bullets', {
      description,
      role,
      count: count || 5,
    });
    return response.data.data.bulletPoints;
  },

  /**
   * Generate professional summary
   */
  async generateSummary(
    resumeData: Partial<ResumeData>,
    targetRole?: string
  ): Promise<string> {
    const response = await api.post<{
      success: boolean;
      data: { summary: string };
    }>('/ai/generate-summary', {
      resumeData,
      targetRole,
    });
    return response.data.data.summary;
  },

  /**
   * Analyze resume for improvements
   */
  async analyzeResume(
    resumeData: ResumeData
  ): Promise<{
    strengths: string[];
    weaknesses: string[];
    recommendations: Array<{
      section: string;
      suggestion: string;
      priority: 'high' | 'medium' | 'low';
    }>;
  }> {
    const response = await api.post<{
      success: boolean;
      data: {
        strengths: string[];
        weaknesses: string[];
        recommendations: Array<{
          section: string;
          suggestion: string;
          priority: 'high' | 'medium' | 'low';
        }>;
      };
    }>('/ai/analyze', { resumeData });
    return response.data.data;
  },
};

export default aiService;
