/**
 * Admin Service
 *
 * Handles admin dashboard and management functionality
 */

import api from './api';
import { User } from './authService';
import { Resume } from './resumeService';
import { SubscriptionStatus } from './subscriptionService';

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
    createdToday: number;
    createdThisWeek: number;
    averagePerUser: number;
  };
  revenue: {
    totalLifetime: number;
    thisMonth: number;
    thisWeek: number;
    currency: string;
  };
  feedback: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
  };
}

export interface AdminUser extends User {
  subscription: SubscriptionStatus;
  resumeCount: number;
  lastActive: string;
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

export interface AdminResumeListResponse {
  resumes: (Resume & { userName: string; userEmail: string })[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
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
      };
    }>('/admin/stats');

    const { overview } = response.data.data;
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
        createdToday: 0,
        createdThisWeek: 0,
        averagePerUser,
      },
      revenue: {
        totalLifetime: 0,
        thisMonth: 0,
        thisWeek: 0,
        currency: 'USD',
      },
      feedback: {
        total: overview.openFeedback,
        open: overview.openFeedback,
        inProgress: 0,
        resolved: 0,
      },
    };
  },

  /**
   * Get all users with pagination and filters
   */
  async getUsers(
    page: number = 1,
    limit: number = 20,
    filters?: {
      search?: string;
      status?: 'all' | 'active' | 'trial' | 'expired' | 'none';
      sortBy?: 'createdAt' | 'lastActive' | 'email';
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

    const response = await api.get<{ success: boolean; data: AdminUserListResponse }>(
      `/admin/users?${params.toString()}`
    );
    return response.data.data;
  },

  /**
   * Get a single user by ID
   */
  async getUserById(userId: string): Promise<AdminUser> {
    const response = await api.get<{ success: boolean; data: AdminUser }>(`/admin/users/${userId}`);
    return response.data.data;
  },

  /**
   * Update user role
   */
  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<AdminUser> {
    const response = await api.patch<{ success: boolean; data: AdminUser }>(
      `/admin/users/${userId}/role`,
      { role }
    );
    return response.data.data;
  },

  /**
   * Update user subscription status (manual override)
   */
  async updateUserSubscription(
    userId: string,
    subscription: Partial<SubscriptionStatus>
  ): Promise<AdminUser> {
    const response = await api.patch<{ success: boolean; data: AdminUser }>(
      `/admin/users/${userId}/subscription`,
      { subscription }
    );
    return response.data.data;
  },

  /**
   * Delete a user
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
      sortBy?: 'createdAt' | 'updatedAt' | 'title';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<AdminResumeListResponse> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get<{ success: boolean; data: AdminResumeListResponse }>(
      `/admin/resumes?${params.toString()}`
    );
    return response.data.data;
  },

  /**
   * Delete a resume (admin override)
   */
  async deleteResume(resumeId: string): Promise<void> {
    await api.delete(`/admin/resumes/${resumeId}`);
  },

  /**
   * Get system health and metrics
   */
  async getSystemHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptime: number;
    memory: { used: number; total: number };
    database: { status: string; latency: number };
  }> {
    const response = await api.get<{
      success: boolean;
      data: {
        status: 'healthy' | 'degraded' | 'unhealthy';
        uptime: number;
        memory: { used: number; total: number };
        database: { status: string; latency: number };
      };
    }>('/admin/health');
    return response.data.data;
  },

  /**
   * Export users data (CSV)
   */
  async exportUsers(): Promise<Blob> {
    const response = await api.get('/admin/users/export', {
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Send announcement email to all users
   */
  async sendAnnouncement(subject: string, message: string): Promise<{ sent: number }> {
    const response = await api.post<{ success: boolean; data: { sent: number } }>(
      '/admin/announcement',
      { subject, message }
    );
    return response.data.data;
  },
};

export default adminService;
