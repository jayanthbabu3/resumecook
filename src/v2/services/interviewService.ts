/**
 * Interview Service - Mock Interview Simulator
 *
 * Handles API calls for the resume-based mock interview feature.
 */

import { API_ENDPOINTS, apiFetch } from '../../config/api';
import type { V2ResumeData } from '../types/resumeData';

// ============================================================================
// TYPES
// ============================================================================

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'behavioral' | 'technical' | 'experience' | 'situational' | 'skills';
  difficulty: 'easy' | 'medium' | 'hard';
  context?: string;
  followUpHints?: string[];
  expectedTopics?: string[];
}

export interface AnswerFeedback {
  overallScore: number;
  scores: {
    specificity: number;
    structure: number;
    relevance: number;
    completeness: number;
    impact: number;
  };
  strengths: string[];
  improvements: string[];
  suggestedAnswer?: string;
  followUpQuestion?: string;
}

export interface InterviewReport {
  overallScore: number;
  categoryScores: {
    behavioral: number;
    technical: number;
    experience: number;
    communication: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
  readinessLevel: 'not_ready' | 'needs_practice' | 'almost_ready' | 'interview_ready';
}

export type InterviewType = 'behavioral' | 'technical' | 'mixed';

export interface InterviewSession {
  questions: InterviewQuestion[];
  answers: string[];
  feedbacks: AnswerFeedback[];
  currentQuestionIndex: number;
  startTime: Date;
  endTime?: Date;
  interviewType: InterviewType;
  report?: InterviewReport;
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Generate personalized interview questions based on resume data
 */
export async function generateInterviewQuestions(
  resumeData: V2ResumeData,
  options?: {
    interviewType?: InterviewType;
    jobDescription?: string;
    questionCount?: number;
  }
): Promise<{
  success: boolean;
  questions: InterviewQuestion[];
  candidateName?: string;
  error?: string;
}> {
  try {
    const response = await apiFetch(API_ENDPOINTS.interviewGenerateQuestions, {
      method: 'POST',
      body: JSON.stringify({
        resumeData,
        interviewType: options?.interviewType || 'mixed',
        jobDescription: options?.jobDescription,
        questionCount: options?.questionCount || 8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to generate questions');
    }

    return {
      success: true,
      questions: data.questions || [],
      candidateName: data.candidateName,
    };
  } catch (error) {
    console.error('[InterviewService] Error generating questions:', error);
    return {
      success: false,
      questions: [],
      error: error instanceof Error ? error.message : 'Failed to generate questions',
    };
  }
}

/**
 * Analyze a candidate's answer and provide feedback
 */
export async function analyzeAnswer(
  question: InterviewQuestion,
  answer: string,
  resumeData?: V2ResumeData
): Promise<{
  success: boolean;
  feedback?: AnswerFeedback;
  error?: string;
}> {
  try {
    const response = await apiFetch(API_ENDPOINTS.interviewAnalyzeAnswer, {
      method: 'POST',
      body: JSON.stringify({
        question,
        answer,
        resumeData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to analyze answer');
    }

    return {
      success: true,
      feedback: data.feedback,
    };
  } catch (error) {
    console.error('[InterviewService] Error analyzing answer:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze answer',
    };
  }
}

/**
 * Generate a comprehensive interview report
 */
export async function generateInterviewReport(
  questions: InterviewQuestion[],
  answers: string[],
  feedbacks?: AnswerFeedback[],
  resumeData?: V2ResumeData
): Promise<{
  success: boolean;
  report?: InterviewReport;
  error?: string;
}> {
  try {
    const response = await apiFetch(API_ENDPOINTS.interviewGenerateReport, {
      method: 'POST',
      body: JSON.stringify({
        questions,
        answers,
        feedbacks,
        resumeData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to generate report');
    }

    return {
      success: true,
      report: data.report,
    };
  } catch (error) {
    console.error('[InterviewService] Error generating report:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate report',
    };
  }
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

/**
 * Create a new interview session
 */
export function createInterviewSession(
  questions: InterviewQuestion[],
  interviewType: InterviewType
): InterviewSession {
  return {
    questions,
    answers: new Array(questions.length).fill(''),
    feedbacks: [],
    currentQuestionIndex: 0,
    startTime: new Date(),
    interviewType,
  };
}

/**
 * Update session with an answer
 */
export function updateSessionAnswer(
  session: InterviewSession,
  questionIndex: number,
  answer: string
): InterviewSession {
  const newAnswers = [...session.answers];
  newAnswers[questionIndex] = answer;
  return {
    ...session,
    answers: newAnswers,
  };
}

/**
 * Update session with feedback
 */
export function updateSessionFeedback(
  session: InterviewSession,
  questionIndex: number,
  feedback: AnswerFeedback
): InterviewSession {
  const newFeedbacks = [...session.feedbacks];
  newFeedbacks[questionIndex] = feedback;
  return {
    ...session,
    feedbacks: newFeedbacks,
  };
}

/**
 * Complete the interview session
 */
export function completeSession(
  session: InterviewSession,
  report: InterviewReport
): InterviewSession {
  return {
    ...session,
    endTime: new Date(),
    report,
  };
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Get difficulty badge color
 */
export function getDifficultyColor(difficulty: InterviewQuestion['difficulty']): string {
  switch (difficulty) {
    case 'easy':
      return 'bg-emerald-100 text-emerald-700';
    case 'medium':
      return 'bg-amber-100 text-amber-700';
    case 'hard':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Get question type badge color
 */
export function getTypeColor(type: InterviewQuestion['type']): string {
  switch (type) {
    case 'behavioral':
      return 'bg-blue-100 text-blue-700';
    case 'technical':
      return 'bg-purple-100 text-purple-700';
    case 'experience':
      return 'bg-teal-100 text-teal-700';
    case 'situational':
      return 'bg-orange-100 text-orange-700';
    case 'skills':
      return 'bg-indigo-100 text-indigo-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Get score color based on value
 */
export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-emerald-600';
  if (score >= 6) return 'text-blue-600';
  if (score >= 4) return 'text-amber-600';
  return 'text-red-600';
}

/**
 * Get readiness level display info
 */
export function getReadinessInfo(level: InterviewReport['readinessLevel']): {
  label: string;
  color: string;
  description: string;
} {
  switch (level) {
    case 'interview_ready':
      return {
        label: 'Interview Ready',
        color: 'text-emerald-600 bg-emerald-50',
        description: 'You are well-prepared and confident for your interview!',
      };
    case 'almost_ready':
      return {
        label: 'Almost Ready',
        color: 'text-blue-600 bg-blue-50',
        description: 'Solid answers with minor improvements needed.',
      };
    case 'needs_practice':
      return {
        label: 'Needs Practice',
        color: 'text-amber-600 bg-amber-50',
        description: 'Good foundation but needs more preparation.',
      };
    case 'not_ready':
      return {
        label: 'Not Ready',
        color: 'text-red-600 bg-red-50',
        description: 'Major gaps in answers - focus on the recommendations.',
      };
    default:
      return {
        label: 'Unknown',
        color: 'text-gray-600 bg-gray-50',
        description: '',
      };
  }
}

/**
 * Format duration in minutes and seconds
 */
export function formatDuration(startTime: Date, endTime?: Date): string {
  const end = endTime || new Date();
  const durationMs = end.getTime() - startTime.getTime();
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
