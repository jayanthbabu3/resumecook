/**
 * ATS Score Analysis Types
 *
 * Types for the ATS (Applicant Tracking System) compatibility analysis feature.
 */

export type ATSScoreCategory = 'excellent' | 'good' | 'fair' | 'needs_improvement' | 'poor';

export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';
export type TipPriority = 'high' | 'medium' | 'low';

export interface ATSIssue {
  type: 'missing_section' | 'missing_info' | 'weak_content' | 'format_issue';
  severity: IssueSeverity;
  message: string;
  suggestion: string;
}

export interface ATSSuggestion {
  type: 'enhancement';
  message: string;
  suggestion: string;
}

export interface ATSTip {
  priority: TipPriority;
  title: string;
  description: string;
}

export interface ATSSections {
  hasSummary: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  hasContact: boolean;
  hasCertifications: boolean;
  hasProjects: boolean;
  hasAchievements: boolean;
}

export interface ATSFormatAnalysis {
  score: number;
  issues: ATSIssue[];
  suggestions: ATSSuggestion[];
  sections: ATSSections;
}

export interface ATSKeywordMatch {
  matchPercentage: number;
  matched: {
    hardSkills: string[];
    softSkills: string[];
    tools: string[];
    requirements: string[];
  };
  missing: {
    hardSkills: string[];
    softSkills: string[];
    tools: string[];
    requirements: string[];
  };
  totalFound: number;
  totalInJob: number;
}

export interface ATSScoreResponse {
  success: boolean;
  score: number;
  category: ATSScoreCategory;
  format: ATSFormatAnalysis;
  keywords: ATSKeywordMatch | null;
  tips: ATSTip[];
  analyzedAt: string;
  error?: string;
  details?: string;
}

/**
 * Get color scheme for score category
 */
export function getScoreColor(category: ATSScoreCategory): {
  bg: string;
  text: string;
  ring: string;
  gradient: string;
} {
  switch (category) {
    case 'excellent':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        ring: 'ring-emerald-500',
        gradient: 'from-emerald-500 to-green-500',
      };
    case 'good':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        ring: 'ring-blue-500',
        gradient: 'from-blue-500 to-cyan-500',
      };
    case 'fair':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-600',
        ring: 'ring-amber-500',
        gradient: 'from-amber-500 to-yellow-500',
      };
    case 'needs_improvement':
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        ring: 'ring-orange-500',
        gradient: 'from-orange-500 to-red-400',
      };
    case 'poor':
      return {
        bg: 'bg-red-50',
        text: 'text-red-600',
        ring: 'ring-red-500',
        gradient: 'from-red-500 to-rose-500',
      };
    default:
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-600',
        ring: 'ring-gray-500',
        gradient: 'from-gray-500 to-gray-400',
      };
  }
}

/**
 * Get human-readable label for score category
 */
export function getScoreLabel(category: ATSScoreCategory): string {
  switch (category) {
    case 'excellent':
      return 'Excellent';
    case 'good':
      return 'Good';
    case 'fair':
      return 'Fair';
    case 'needs_improvement':
      return 'Needs Work';
    case 'poor':
      return 'Poor';
    default:
      return 'Unknown';
  }
}

/**
 * Get description for score category
 */
export function getScoreDescription(category: ATSScoreCategory, hasJobDescription: boolean): string {
  if (hasJobDescription) {
    switch (category) {
      case 'excellent':
        return 'Your resume is highly optimized for this job. Great keyword match!';
      case 'good':
        return 'Good match for this position. Minor improvements could help.';
      case 'fair':
        return 'Moderate match. Consider adding more relevant keywords.';
      case 'needs_improvement':
        return 'Below average match. Review missing keywords and sections.';
      case 'poor':
        return 'Low compatibility. Significant updates needed for this job.';
      default:
        return '';
    }
  } else {
    switch (category) {
      case 'excellent':
        return 'Your resume follows ATS best practices excellently.';
      case 'good':
        return 'Well-structured resume with good ATS compatibility.';
      case 'fair':
        return 'Decent structure but some improvements recommended.';
      case 'needs_improvement':
        return 'Several issues may affect ATS parsing.';
      case 'poor':
        return 'Major structural issues. Review recommendations below.';
      default:
        return '';
    }
  }
}
