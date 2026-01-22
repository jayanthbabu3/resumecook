/**
 * Auth Context
 *
 * JWT-based authentication context that replaces Firebase Auth.
 * Provides the same interface as the old Firebase auth for easy migration.
 *
 * Features:
 * - JWT token management with auto-refresh
 * - User profile management
 * - Google OAuth support
 * - Password reset flow
 * - Admin role detection
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService, User, tokenManager } from '@/services';
import { subscriptionService } from '@/services';

// Re-export User type for backward compatibility
export type { User } from '@/services';

// Extended user profile for backward compatibility with old Firebase auth
export interface UserProfile {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  professionalTitle?: string;
  bio?: string;
  profilePhoto?: string;
  emailVerified?: boolean;
  provider?: string;
  lastSignIn?: Date;
  createdAt: Date;
  updatedAt: Date;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  // User state
  user: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  isAuthenticated: boolean;

  // Auth methods
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    userData: {
      fullName: string;
      phone?: string;
      location?: string;
      linkedinUrl?: string;
      githubUrl?: string;
      portfolioUrl?: string;
      professionalTitle?: string;
      bio?: string;
    }
  ) => Promise<void>;
  signOut: () => Promise<void>;

  // Password management
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: (email: string, password: string) => Promise<void>;

  // Profile management
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;

  // Legacy method for OTP verification (no-op for JWT)
  verifyOtp: (email: string, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Convert User to UserProfile for backward compatibility
  const userProfile: UserProfile | null = user
    ? {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        location: user.location,
        linkedinUrl: user.linkedinUrl,
        githubUrl: user.githubUrl,
        portfolioUrl: user.portfolioUrl,
        professionalTitle: user.professionalTitle,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        emailVerified: user.emailVerified,
        provider: user.provider,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        role: user.role,
      }
    : null;

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    if (!tokenManager.hasTokens()) {
      setLoading(false);
      return;
    }

    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Auth check failed:', error);
      tokenManager.clearTokens();
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!tokenManager.hasTokens()) return;
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      setUser(response.user);

      // Check if this is a new verified user - claim trial
      if (response.user.subscription.status === 'none') {
        try {
          await subscriptionService.claimTrial();
          toast.success('Signed in successfully! Your 21-day free Pro trial has started!');
          await refreshUser();
        } catch {
          toast.success('Signed in successfully');
        }
      } else {
        toast.success('Signed in successfully');
      }

      navigate('/templates');
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || error.message || 'Failed to sign in';

      if (message.includes('not verified')) {
        toast.error('Please verify your email first. Check your inbox for verification link.');
      } else if (message.includes('Invalid credentials')) {
        toast.error('Invalid email or password');
      } else {
        toast.error(message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await authService.googleAuth();

      // Fetch user after successful Google auth
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      // Check if new user - claim trial
      if (currentUser.subscription.status === 'none') {
        try {
          await subscriptionService.claimTrial();
          toast.success(
            'Welcome! Your account has been created with a 21-day free Pro trial!'
          );
          await refreshUser();
        } catch {
          toast.success('Welcome! Your account has been created with Google.');
        }
      } else {
        toast.success('Signed in with Google successfully');
      }

      navigate('/dashboard');
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || error.message || 'Failed to sign in with Google';

      if (message === 'Authentication cancelled') {
        toast.error('Sign-in was cancelled');
      } else {
        toast.error(message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: {
      fullName: string;
      phone?: string;
      location?: string;
      linkedinUrl?: string;
      githubUrl?: string;
      portfolioUrl?: string;
      professionalTitle?: string;
      bio?: string;
    }
  ) => {
    try {
      setLoading(true);
      await authService.register({
        email,
        password,
        ...userData,
      });

      // After registration, user needs to verify email
      // Clear tokens and don't set user state
      tokenManager.clearTokens();
      setUser(null);

      toast.success('Account created! Please check your email to verify your account.');
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || error.message || 'Failed to create account';

      if (message.includes('already exists')) {
        toast.error('An account with this email already exists');
      } else {
        toast.error(message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      // Still clear state even if logout API fails
      setUser(null);
      navigate('/');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.forgotPassword(email);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || error.message || 'Failed to send reset email';

      if (message.includes('not found')) {
        toast.error('No account found with this email address.');
      } else {
        toast.error(message);
      }
      throw error;
    }
  };

  const resendVerificationEmail = async (email: string, _password: string) => {
    try {
      await authService.resendVerificationEmail();
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message ||
        error.message ||
        'Failed to send verification email';
      toast.error(message);
      throw error;
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const updatedUser = await authService.updateProfile({
        fullName: profileData.fullName,
        phone: profileData.phone,
        location: profileData.location,
        linkedinUrl: profileData.linkedinUrl,
        githubUrl: profileData.githubUrl,
        portfolioUrl: profileData.portfolioUrl,
        professionalTitle: profileData.professionalTitle,
        bio: profileData.bio,
        profilePhoto: profileData.profilePhoto,
      });
      setUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || error.message || 'Failed to update profile';
      toast.error(message);
      throw error;
    }
  };

  // Legacy method - no-op for JWT
  const verifyOtp = async (_email: string, _token: string) => {
    toast.success('Email verification link sent! Please check your inbox.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isAdmin,
        loading,
        isAuthenticated,
        signIn,
        signInWithGoogle,
        signUp,
        signOut,
        resetPassword,
        resendVerificationEmail,
        updateUserProfile,
        refreshUser,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Alias for backward compatibility with Firebase auth hook name
export const useFirebaseAuth = useAuth;

// Re-export AuthProvider as FirebaseAuthProvider for backward compatibility
export const FirebaseAuthProvider = AuthProvider;
