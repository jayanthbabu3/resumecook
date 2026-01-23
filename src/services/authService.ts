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

// Response from login/register endpoints
export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
  // Flattened version for backward compatibility
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}

export interface GoogleAuthResponse {
  success: boolean;
  redirectUrl: string;
}

// Auth service methods
export const authService = {
  /**
   * Register a new user
   * Note: Returns user data but no tokens - user must verify email first
   */
  async register(data: RegisterData): Promise<{ user: Partial<User> }> {
    const response = await api.post<{ success: boolean; data: { user: Partial<User> } }>('/auth/register', data);
    return { user: response.data.data.user };
  },

  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: { accessToken: string; refreshToken: string } }> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    // Backend returns { success: true, data: { user, tokens } }
    const { user, tokens } = response.data.data;
    tokenManager.setTokens(tokens.accessToken, tokens.refreshToken);
    return { user, tokens };
  },

  /**
   * Initiate Google OAuth login
   * Returns the redirect URL for Google sign-in
   */
  async googleAuth(): Promise<string> {
    // Clear any previous auth data
    localStorage.removeItem('google_auth_success');

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
      let resolved = false;

      const cleanup = () => {
        window.removeEventListener('message', handleMessage);
        clearInterval(checkClosed);
        clearInterval(checkLocalStorage);
      };

      // Listen for message from popup
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          if (resolved) return;
          resolved = true;
          const { accessToken, refreshToken } = event.data;
          tokenManager.setTokens(accessToken, refreshToken);
          cleanup();
          popup?.close();
          localStorage.removeItem('google_auth_success');
          resolve('success');
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          if (resolved) return;
          resolved = true;
          cleanup();
          popup?.close();
          reject(new Error(event.data.error || 'Google authentication failed'));
        }
      };

      window.addEventListener('message', handleMessage);

      // Check localStorage for auth success (fallback when postMessage doesn't work)
      const checkLocalStorage = setInterval(() => {
        const authData = localStorage.getItem('google_auth_success');
        if (authData) {
          try {
            const { accessToken, refreshToken, timestamp } = JSON.parse(authData);
            // Only accept if recent (within last 60 seconds - extended for slower networks)
            if (Date.now() - timestamp < 60000) {
              if (resolved) return;
              resolved = true;
              tokenManager.setTokens(accessToken, refreshToken);
              cleanup();
              popup?.close();
              localStorage.removeItem('google_auth_success');
              resolve('success');
            }
          } catch (e) {
            // Invalid data, ignore
          }
        }
      }, 500);

      // Check if popup was closed without auth
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);

          // Do an immediate localStorage check
          const checkAuth = () => {
            const authData = localStorage.getItem('google_auth_success');
            if (authData) {
              try {
                const { accessToken, refreshToken, timestamp } = JSON.parse(authData);
                if (Date.now() - timestamp < 60000) { // Extended to 60 seconds
                  if (resolved) return true;
                  resolved = true;
                  tokenManager.setTokens(accessToken, refreshToken);
                  cleanup();
                  localStorage.removeItem('google_auth_success');
                  resolve('success');
                  return true;
                }
              } catch (e) {
                // Invalid data
              }
            }
            return false;
          };

          // Check immediately
          if (checkAuth()) return;

          // Multiple retry checks with increasing delays to handle race conditions
          // This is crucial for slower networks or when the callback page takes time to load
          const retryDelays = [300, 500, 800, 1000, 1500];
          let retryIndex = 0;

          const retryCheck = () => {
            if (checkAuth()) return;
            retryIndex++;
            if (retryIndex < retryDelays.length) {
              setTimeout(retryCheck, retryDelays[retryIndex]);
            } else {
              // All retry checks failed, auth was cancelled
              if (!resolved) {
                cleanup();
                reject(new Error('Authentication cancelled'));
              }
            }
          };

          // Start first retry
          setTimeout(retryCheck, retryDelays[0]);
        }
      }, 500);
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

    const response = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {
      refreshToken,
    });

    // Backend returns { success: true, data: { tokens: { accessToken, refreshToken } } }
    const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
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
