/**
 * Admin Service
 *
 * Handles admin dashboard and management functionality
 */

import api from './api';
import { User } from './authService';

// Types
export interface DashboardStats {
  users: {
    total: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
    activeSubscriptions: number;
    trialUsers: number;
  };
  resumes: {
    total: number;
    totalDownloads: number;
    averagePerUser: number;
  };
  feedback: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
  };
  subscriptionStats: Record<string, number>;
  resumesByTemplate: Array<{ _id: string; count: number }>;
  dailySignups: Array<{ _id: string; count: number }>;
}

export interface AdminUserSubscription {
  status?: 'none' | 'trial' | 'active' | 'cancelled' | 'expired';
  plan?: string;
  isTrial?: boolean;
  startDate?: string;
  endDate?: string;
  trialEndsAt?: string;
  razorpaySubscriptionId?: string;
}

export interface AdminUser extends Omit<User, 'subscription'> {
  _id?: string;
  subscription?: AdminUserSubscription;
  resumeCount?: number;
  lastActive?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminUserListResponse {
  users: AdminUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AdminResume {
  _id: string;
  title: string;
  templateId: string;
  userId: {
    _id: string;
    email: string;
    fullName: string;
  };
  createdAt: string;
  updatedAt: string;
  downloads: number;
  views?: number;
  isPublic?: boolean;
}

export interface AdminResumeListResponse {
  resumes: AdminResume[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UserDetailResponse {
  user: AdminUser;
  stats: {
    resumeCount: number;
  };
  recentResumes: Array<{
    _id: string;
    title: string;
    templateId: string;
    createdAt: string;
    updatedAt: string;
    downloads: number;
  }>;
}

export interface TrialStats {
  totalTrials: number;
  activeTrials: number;
  expiredTrials: number;
  convertedTrials: number;
  conversionRate: string | number;
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  mongodb: string;
  uptime: number;
  memoryUsage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  nodeVersion: string;
  timestamp: string;
}

// Admin service methods
export const adminService = {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<{
      success: boolean;
      data: {
        overview: {
          totalUsers: number;
          totalResumes: number;
          totalDownloads: number;
          newUsersThisMonth: number;
          newUsersThisWeek: number;
          activeSubscriptions: number;
          trialUsers: number;
          openFeedback: number;
        };
        subscriptionStats: Record<string, number>;
        resumesByTemplate: Array<{ _id: string; count: number }>;
        dailySignups: Array<{ _id: string; count: number }>;
      };
    }>('/admin/stats');

    const { overview, subscriptionStats, resumesByTemplate, dailySignups } = response.data.data;
    const averagePerUser = overview.totalUsers
      ? Math.round((overview.totalResumes / overview.totalUsers) * 100) / 100
      : 0;

    return {
      users: {
        total: overview.totalUsers,
        newToday: 0,
        newThisWeek: overview.newUsersThisWeek,
        newThisMonth: overview.newUsersThisMonth,
        activeSubscriptions: overview.activeSubscriptions,
        trialUsers: overview.trialUsers,
      },
      resumes: {
        total: overview.totalResumes,
        totalDownloads: overview.totalDownloads,
        averagePerUser,
      },
      feedback: {
        total: overview.openFeedback,
        open: overview.openFeedback,
        inProgress: 0,
        resolved: 0,
      },
      subscriptionStats: subscriptionStats || {},
      resumesByTemplate: resumesByTemplate || [],
      dailySignups: dailySignups || [],
    };
  },

  /**
   * Get trial statistics
   */
  async getTrialStats(): Promise<TrialStats> {
    const response = await api.get<{
      success: boolean;
      data: TrialStats;
    }>('/admin/trial-stats');
    return response.data.data;
  },

  /**
   * Get system health
   */
  async getSystemHealth(): Promise<SystemHealth> {
    const response = await api.get<{
      success: boolean;
      data: SystemHealth;
    }>('/admin/system/health');
    return response.data.data;
  },

  /**
   * Get all users with pagination and filters
   */
  async getUsers(
    page: number = 1,
    limit: number = 20,
    filters?: {
      search?: string;
      status?: 'all' | 'active' | 'trial' | 'expired' | 'none' | 'cancelled';
      sortBy?: 'createdAt' | 'lastActive' | 'email' | 'fullName';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<AdminUserListResponse> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (filters?.search) params.append('search', filters.search);
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get<{
      success: boolean;
      data: AdminUser[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/admin/users?${params.toString()}`);

    return {
      users: response.data.data,
      pagination: {
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.total,
        pages: response.data.pagination.totalPages,
      },
    };
  },

  /**
   * Get a single user by ID with details
   */
  async getUserById(userId: string): Promise<UserDetailResponse> {
    const response = await api.get<{ success: boolean; data: UserDetailResponse }>(
      `/admin/users/${userId}`
    );
    return response.data.data;
  },

  /**
   * Update user (role, subscription, emailVerified)
   */
  async updateUser(
    userId: string,
    updates: {
      role?: 'user' | 'admin';
      subscription?: Partial<AdminUserSubscription>;
      emailVerified?: boolean;
    }
  ): Promise<AdminUser> {
    const response = await api.patch<{ success: boolean; data: AdminUser }>(
      `/admin/users/${userId}`,
      updates
    );
    return response.data.data;
  },

  /**
   * Manage user subscription (grant, revoke, extend)
   */
  async manageSubscription(
    userId: string,
    action: 'grant' | 'revoke' | 'extend',
    options?: {
      plan?: string;
      durationDays?: number;
    }
  ): Promise<{ subscription: AdminUserSubscription }> {
    const response = await api.post<{
      success: boolean;
      data: { subscription: AdminUserSubscription };
    }>(`/admin/users/${userId}/subscription`, {
      action,
      ...options,
    });
    return response.data.data;
  },

  /**
   * Delete a user and all their data
   */
  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/admin/users/${userId}`);
  },

  /**
   * Get all resumes with pagination
   */
  async getResumes(
    page: number = 1,
    limit: number = 20,
    filters?: {
      userId?: string;
      search?: string;
      templateId?: string;
      sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'downloads';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<AdminResumeListResponse> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.templateId) params.append('templateId', filters.templateId);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get<{
      success: boolean;
      data: AdminResume[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/admin/resumes?${params.toString()}`);

    return {
      resumes: response.data.data,
      pagination: {
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.total,
        pages: response.data.pagination.totalPages,
      },
    };
  },

  /**
   * Delete a resume (admin override)
   */
  async deleteResume(resumeId: string): Promise<void> {
    await api.delete(`/admin/resumes/${resumeId}`);
  },
};

export default adminService;
