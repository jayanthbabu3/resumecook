/**
 * Services Index
 *
 * Central export point for all API services.
 * Import from this file for clean imports:
 *
 * import { authService, resumeService } from '@/services';
 */

// API client and utilities
export { default as api, tokenManager, API_BASE_URL } from './api';

// Auth service
export { authService } from './authService';
export type {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from './authService';

// Resume service
export { resumeService } from './resumeService';
export type {
  Resume,
  ResumeData,
  ResumeVersion,
  CreateResumeData,
  UpdateResumeData,
} from './resumeService';

// AI service
export { aiService } from './aiService';
export type {
  EnhanceOptions,
  EnhanceResponse,
  ATSScoreResponse,
  ChatMessage,
  ChatResponse,
} from './aiService';

// Subscription service
export { subscriptionService } from './subscriptionService';
export type {
  SubscriptionStatus,
  PricingPlan,
  CreateSubscriptionResponse,
  PaymentVerificationData,
  TrialStatus,
} from './subscriptionService';

// LinkedIn service
export { linkedinService } from './linkedinService';
export type { LinkedInProfile, LinkedInImportResponse } from './linkedinService';

// Feedback service
export { feedbackService } from './feedbackService';
export type { Feedback, CreateFeedbackData, FeedbackListResponse } from './feedbackService';

// Admin service
export { adminService } from './adminService';
export type {
  DashboardStats,
  AdminUser,
  AdminUserListResponse,
  AdminResumeListResponse,
} from './adminService';
