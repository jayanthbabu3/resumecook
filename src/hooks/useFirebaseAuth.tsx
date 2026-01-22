/**
 * Firebase Auth Hook - DEPRECATED
 * This hook has been replaced by the new AuthContext.
 * Use @/contexts/AuthContext instead.
 */

import React, { createContext, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * @deprecated Use useAuth from @/contexts/AuthContext instead
 */
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
  googleId?: string;
  emailVerified?: boolean;
  provider?: string;
  lastSignIn?: Date;
  createdAt: Date;
  updatedAt: Date;
  role?: 'user' | 'admin';
}

/**
 * @deprecated Use useAuth from @/contexts/AuthContext instead
 */
export const useFirebaseAuth = () => {
  console.warn('DEPRECATED: useFirebaseAuth is deprecated. Use useAuth from @/contexts/AuthContext instead');
  const auth = useAuth();

  // Map to legacy interface
  const userProfile: UserProfile | null = auth.user ? {
    fullName: auth.user.fullName,
    email: auth.user.email,
    profilePhoto: auth.user.profilePhoto,
    provider: 'google',
    role: auth.user.role,
    createdAt: new Date(auth.user.createdAt),
    updatedAt: new Date(auth.user.updatedAt || auth.user.createdAt),
  } : null;

  return {
    user: auth.user ? { uid: auth.user.id, email: auth.user.email, displayName: auth.user.fullName } : null,
    userProfile,
    isAdmin: auth.user?.role === 'admin',
    signIn: async () => { throw new Error('Use signInWithGoogle from @/contexts/AuthContext'); },
    signInWithGoogle: auth.signInWithGoogle,
    signUp: async () => { throw new Error('Use signInWithGoogle from @/contexts/AuthContext'); },
    verifyOtp: async () => { throw new Error('OTP not supported'); },
    resetPassword: async () => { throw new Error('Password reset managed by Google'); },
    resendVerificationEmail: async () => { throw new Error('Not supported'); },
    signOut: auth.signOut,
    loading: auth.loading,
    updateUserProfile: async () => { console.warn('Profile updates not supported in this version'); },
  };
};

/**
 * @deprecated Use AuthProvider from @/contexts/AuthContext instead
 */
export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.warn('DEPRECATED: FirebaseAuthProvider is deprecated. Use AuthProvider from @/contexts/AuthContext instead');
  return <>{children}</>;
};
