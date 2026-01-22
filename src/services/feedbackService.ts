/**
 * Feedback Service
 *
 * Handles user feedback submission and management
 */

import api from './api';
import type {
  Feedback as UIFeedback,
  FeedbackType,
  FeedbackStatus,
  FeedbackPriority
} from '@/types/feedback';

// API types
export interface APIFeedback {
  id: string;
  userId: string;
  userEmail: string;
  userName?: string;
  category: 'bug' | 'feature' | 'improvement' | 'other' | 'payment' | 'general';
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Re-export UI types for backwards compatibility
export type { UIFeedback as Feedback };

export interface CreateFeedbackData {
  type: FeedbackType;
  subject: string;
  description: string;
}

export interface FeedbackListResponse {
  feedback: UIFeedback[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Map API category to UI type
function mapCategoryToType(category: string): FeedbackType {
  const mapping: Record<string, FeedbackType> = {
    bug: 'bug',
    feature: 'feature',
    improvement: 'feature',
    payment: 'payment',
    general: 'general',
    other: 'general',
  };
  return mapping[category] || 'general';
}

// Map UI type to API category
function mapTypeToCategory(type: FeedbackType): string {
  const mapping: Record<FeedbackType, string> = {
    bug: 'bug',
    feature: 'feature',
    payment: 'payment',
    general: 'general',
  };
  return mapping[type] || 'general';
}

// Convert API feedback to UI format
function convertToUIFeedback(api: APIFeedback): UIFeedback {
  return {
    id: api.id,
    userId: api.userId,
    userEmail: api.userEmail,
    userName: api.userName || 'Unknown',
    type: mapCategoryToType(api.category),
    subject: api.subject,
    description: api.message,
    status: api.status as FeedbackStatus,
    priority: api.priority as FeedbackPriority,
    createdAt: new Date(api.createdAt),
    updatedAt: new Date(api.updatedAt),
    adminReply: api.adminReply,
    repliedAt: api.repliedAt ? new Date(api.repliedAt) : undefined,
    hasUnreadAdminReply: !!api.adminReply && !api.repliedAt,
  };
}

// API response types
interface APIFeedbackListResponse {
  feedback: APIFeedback[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Feedback service methods
export const feedbackService = {
  /**
   * Submit new feedback
   */
  async submit(data: CreateFeedbackData): Promise<UIFeedback> {
    const apiData = {
      category: mapTypeToCategory(data.type),
      subject: data.subject,
      message: data.description,
    };
    const response = await api.post<{ success: boolean; data: APIFeedback }>('/feedback', apiData);
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Get user's feedback history
   */
  async getMyFeedback(page: number = 1, limit: number = 100): Promise<FeedbackListResponse> {
    const response = await api.get<{ success: boolean; data: APIFeedbackListResponse }>(
      `/feedback/my?page=${page}&limit=${limit}`
    );
    return {
      feedback: response.data.data.feedback.map(convertToUIFeedback),
      pagination: response.data.data.pagination,
    };
  },

  /**
   * Get a single feedback item
   */
  async getById(id: string): Promise<UIFeedback> {
    const response = await api.get<{ success: boolean; data: APIFeedback }>(`/feedback/${id}`);
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Delete user's feedback
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/feedback/${id}`);
  },

  // Admin methods

  /**
   * Get all feedback (admin only)
   */
  async getAllFeedback(
    page: number = 1,
    limit: number = 100,
    filters?: {
      status?: FeedbackStatus;
      type?: FeedbackType;
      priority?: FeedbackPriority;
    }
  ): Promise<FeedbackListResponse> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (filters?.status) params.append('status', filters.status);
    if (filters?.type) params.append('category', mapTypeToCategory(filters.type));
    if (filters?.priority) params.append('priority', filters.priority);

    const response = await api.get<{ success: boolean; data: APIFeedbackListResponse }>(
      `/feedback/admin?${params.toString()}`
    );
    return {
      feedback: response.data.data.feedback.map(convertToUIFeedback),
      pagination: response.data.data.pagination,
    };
  },

  /**
   * Update feedback status (admin only)
   */
  async updateStatus(id: string, status: FeedbackStatus): Promise<UIFeedback> {
    const response = await api.patch<{ success: boolean; data: APIFeedback }>(
      `/feedback/${id}/status`,
      { status }
    );
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Update feedback priority (admin only)
   */
  async updatePriority(id: string, priority: FeedbackPriority): Promise<UIFeedback> {
    const response = await api.patch<{ success: boolean; data: APIFeedback }>(
      `/feedback/${id}/priority`,
      { priority }
    );
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Reply to feedback (admin only)
   */
  async reply(id: string, message: string): Promise<UIFeedback> {
    const response = await api.post<{ success: boolean; data: APIFeedback }>(
      `/feedback/${id}/reply`,
      { reply: message }
    );
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Mark feedback as read by user
   */
  async markAsRead(id: string): Promise<void> {
    await api.patch(`/feedback/${id}/read`);
  },
};

export default feedbackService;
