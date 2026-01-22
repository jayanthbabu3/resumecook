/**
 * Authentication Service
 *
 * Handles all authentication-related API calls:
 * - Register, Login, Logout
 * - Google OAuth
 * - Password reset
 * - Token refresh
 * - User profile
 */

import api, { tokenManager, API_BASE_URL } from './api';
import axios from 'axios';

// Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  professionalTitle?: string;
  bio?: string;
  profilePhoto?: string;
  emailVerified: boolean;
  provider: 'email' | 'google';
  subscription: {
    status: 'none' | 'trial' | 'active' | 'cancelled' | 'expired';
    plan?: string;
    isTrial?: boolean;
    trialEndsAt?: string;
    currentPeriodEnd?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  professionalTitle?: string;
  bio?: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface GoogleAuthResponse {
  success: boolean;
  redirectUrl: string;
}

// Auth service methods
export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    const { accessToken, refreshToken, user } = response.data;
    tokenManager.setTokens(accessToken, refreshToken);
    return response.data;
  },

  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { accessToken, refreshToken } = response.data;
    tokenManager.setTokens(accessToken, refreshToken);
    return response.data;
  },

  /**
   * Initiate Google OAuth login
   * Returns the redirect URL for Google sign-in
   */
  async googleAuth(): Promise<string> {
    // Open Google OAuth in a popup
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      `${API_BASE_URL}/api/auth/google`,
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    return new Promise((resolve, reject) => {
      // Listen for message from popup
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          const { accessToken, refreshToken } = event.data;
          tokenManager.setTokens(accessToken, refreshToken);
          window.removeEventListener('message', handleMessage);
          popup?.close();
          resolve('success');
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          popup?.close();
          reject(new Error(event.data.error || 'Google authentication failed'));
        }
      };

      window.addEventListener('message', handleMessage);

      // Check if popup was closed without auth
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          reject(new Error('Authentication cancelled'));
        }
      }, 1000);
    });
  },

  /**
   * Logout - invalidate refresh token
   */
  async logout(): Promise<void> {
    const refreshToken = tokenManager.getRefreshToken();
    try {
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      // Ignore errors during logout
      console.error('Logout error:', error);
    } finally {
      tokenManager.clearTokens();
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ success: boolean; data: User }>('/auth/me');
    return response.data.data;
  },

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<{ success: boolean; data: User }>('/users/profile', data);
    return response.data.data;
  },

  /**
   * Request password reset email
   */
  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword });
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<void> {
    await api.post('/auth/verify-email', { token });
  },

  /**
   * Resend verification email
   */
  async resendVerificationEmail(): Promise<void> {
    await api.post('/auth/resend-verification');
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    tokenManager.setTokens(accessToken, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return tokenManager.hasTokens();
  },

  /**
   * Change password (when logged in)
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { currentPassword, newPassword });
  },
};

export default authService;
