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
export interface APIFeedbackReply {
  id?: string;
  _id?: string;
  authorId: string;
  authorRole: 'user' | 'admin';
  authorName: string;
  message: string;
  createdAt: string;
}

export interface APIFeedback {
  id: string;
  userId: string;
  userEmail: string;
  userName?: string;
  type: 'bug' | 'feature' | 'general' | 'question' | 'payment';
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  adminNotes?: string;
  replies?: APIFeedbackReply[];
  unreadByUser?: boolean;
  unreadByAdmin?: boolean;
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
function mapApiTypeToUi(type: string): FeedbackType {
  const mapping: Record<string, FeedbackType> = {
    bug: 'bug',
    feature: 'feature',
    payment: 'payment',
    general: 'general',
    question: 'general',
  };
  return mapping[type] || 'general';
}

// Map UI type to API type
function mapUiTypeToApi(type: FeedbackType): string {
  return type;
}

function mapApiPriorityToUi(priority: string): FeedbackPriority {
  if (priority === 'urgent') return 'urgent';
  if (priority === 'high') return 'high';
  if (priority === 'medium') return 'medium';
  return 'low';
}

// Convert API feedback to UI format
function convertToUIFeedback(api: APIFeedback): UIFeedback {
  const replies = api.replies || [];
  let latestAdminReply: APIFeedbackReply | undefined;
  for (let i = replies.length - 1; i >= 0; i -= 1) {
    if (replies[i].authorRole === 'admin') {
      latestAdminReply = replies[i];
      break;
    }
  }

  const adminReply = api.adminReply ?? latestAdminReply?.message;
  const repliedAt = api.repliedAt
    ? new Date(api.repliedAt)
    : latestAdminReply?.createdAt
      ? new Date(latestAdminReply.createdAt)
      : undefined;

  return {
    id: api.id,
    userId: api.userId,
    userEmail: api.userEmail,
    userName: api.userName || 'Unknown',
    type: mapApiTypeToUi(api.type),
    subject: api.subject,
    description: api.message,
    status: api.status as FeedbackStatus,
    priority: mapApiPriorityToUi(api.priority),
    createdAt: new Date(api.createdAt),
    updatedAt: new Date(api.updatedAt),
    adminNotes: api.adminNotes,
    adminReply,
    repliedAt,
    replyCount: replies.length,
    hasUnreadAdminReply: !!api.unreadByUser,
    hasUnreadUserReply: !!api.unreadByAdmin,
  };
}

// API response types
interface APIFeedbackListResponse {
  success: boolean;
  data: APIFeedback[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Feedback service methods
export const feedbackService = {
  /**
   * Submit new feedback
   */
  async submit(data: CreateFeedbackData): Promise<UIFeedback> {
    const apiData = {
      type: mapUiTypeToApi(data.type),
      subject: data.subject,
      message: data.description,
    };
    const response = await api.post<{ success: boolean; data: APIFeedback }>('/feedback', apiData);
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Get user's feedback history
   */
  async getMyFeedback(page: number = 1, limit: number = 50): Promise<FeedbackListResponse> {
    const response = await api.get<APIFeedbackListResponse>(
      `/feedback?page=${page}&limit=${limit}`
    );
    const total = response.data.pagination?.total ?? response.data.data.length;
    const totalPages = (response.data.pagination?.totalPages ?? Math.ceil(total / limit)) || 1;
    return {
      feedback: response.data.data.map(convertToUIFeedback),
      pagination: {
        page: response.data.pagination?.page ?? page,
        limit: response.data.pagination?.limit ?? limit,
        total,
        pages: totalPages,
      },
    };
  },

  /**
   * Get a single feedback item
   */
  async getById(id: string, options?: { admin?: boolean }): Promise<UIFeedback> {
    const path = options?.admin ? `/feedback/admin/${id}` : `/feedback/${id}`;
    const response = await api.get<{ success: boolean; data: APIFeedback }>(path);
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Delete user's feedback
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/feedback/admin/${id}`);
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
    if (filters?.type) params.append('type', mapUiTypeToApi(filters.type));
    if (filters?.priority) params.append('priority', filters.priority);

    const response = await api.get<APIFeedbackListResponse>(
      `/feedback/admin/all?${params.toString()}`
    );
    const total = response.data.pagination?.total ?? response.data.data.length;
    const totalPages = (response.data.pagination?.totalPages ?? Math.ceil(total / limit)) || 1;
    return {
      feedback: response.data.data.map(convertToUIFeedback),
      pagination: {
        page: response.data.pagination?.page ?? page,
        limit: response.data.pagination?.limit ?? limit,
        total,
        pages: totalPages,
      },
    };
  },

  /**
   * Update feedback status (admin only)
   */
  async updateStatus(id: string, status: FeedbackStatus): Promise<UIFeedback> {
    const response = await api.patch<{ success: boolean; data: APIFeedback }>(
      `/feedback/admin/${id}`,
      { status }
    );
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Update feedback priority (admin only)
   */
  async updatePriority(id: string, priority: FeedbackPriority): Promise<UIFeedback> {
    const response = await api.patch<{ success: boolean; data: APIFeedback }>(
      `/feedback/admin/${id}`,
      { priority }
    );
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Reply to feedback (admin only)
   */
  async reply(id: string, message: string): Promise<UIFeedback> {
    const response = await api.post<{ success: boolean; data: APIFeedback }>(
      `/feedback/admin/${id}/reply`,
      { message }
    );
    return convertToUIFeedback(response.data.data);
  },

  /**
   * Mark feedback as read by user
   */
  async markAsRead(id: string): Promise<void> {
    await api.get(`/feedback/${id}`);
  },
};

export default feedbackService;
