import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { incrementUsersCount } from '@/lib/firestore/statsService';

interface UserProfile {
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
  // Google-specific fields
  googleId?: string;
  emailVerified?: boolean;
  provider?: string;
  lastSignIn?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, userData: {
    fullName: string;
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    professionalTitle?: string;
    bio?: string;
  }) => Promise<void>;
  verifyOtp: (email: string, token: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Load user profile from Firestore
        try {
          const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (profileDoc.exists()) {
            setUserProfile(profileDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Check if email is verified
      if (!result.user.emailVerified) {
        // Send another verification email
        await sendEmailVerification(result.user);
        // Sign out unverified user
        await firebaseSignOut(auth);
        setUser(null);
        setUserProfile(null);
        toast.error('Please verify your email first. A new verification link has been sent.');
        throw { code: 'auth/email-not-verified', message: 'Email not verified' };
      }

      // Check if this is the first time the user is logging in after verification
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const wasVerified = userDoc.exists() && userDoc.data()?.emailVerified === true;

      // Update last sign-in timestamp and mark as verified
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          lastSignIn: new Date(),
          updatedAt: new Date(),
          emailVerified: true,
        }, { merge: true });

        // Increment users count only on first verified login
        if (!wasVerified) {
          await incrementUsersCount();
        }
      } catch (error) {
        console.error('Error updating last sign-in:', error);
      }

      toast.success('Signed in successfully');
      navigate('/templates');
    } catch (error: any) {
      if (error.code !== 'auth/email-not-verified') {
        toast.error(error.message || 'Failed to sign in');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      
      // Create or update user profile with Google data
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      // Extract all available data from Google profile
      const googleProfileData = {
        fullName: result.user.displayName || '',
        email: result.user.email || '',
        phone: result.user.phoneNumber || '',
        location: '', // Not available from Google
        linkedinUrl: '', // Not available from Google
        githubUrl: '', // Not available from Google
        portfolioUrl: '', // Not available from Google
        professionalTitle: '', // Not available from Google
        bio: '', // Not available from Google
        profilePhoto: result.user.photoURL || '',
        // Additional Google-specific data
        googleId: result.user.uid,
        emailVerified: result.user.emailVerified,
        provider: 'google',
        lastSignIn: new Date(),
        createdAt: userDoc.exists() ? (userDoc.data() as UserProfile).createdAt : new Date(),
        updatedAt: new Date(),
      };

      if (!userDoc.exists()) {
        // Create new profile
        await setDoc(doc(db, 'users', result.user.uid), googleProfileData);
        setUserProfile(googleProfileData);

        // Increment users count for new user
        try {
          await incrementUsersCount();
        } catch (error) {
          console.error('Error incrementing users count:', error);
        }

        toast.success('Welcome! Your account has been created with Google.');
      } else {
        // Update existing profile with latest Google data
        const existingProfile = userDoc.data() as UserProfile;
        const updatedProfile = {
          ...existingProfile,
          fullName: result.user.displayName || existingProfile.fullName,
          email: result.user.email || existingProfile.email,
          profilePhoto: result.user.photoURL || existingProfile.profilePhoto,
          emailVerified: result.user.emailVerified,
          lastSignIn: new Date(),
          updatedAt: new Date(),
        };
        
        await setDoc(doc(db, 'users', result.user.uid), updatedProfile, { merge: true });
        setUserProfile(updatedProfile);
        toast.success('Signed in with Google successfully');
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in was cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Popup was blocked. Please allow popups for this site.');
      } else if (error.code === 'auth/network-request-failed') {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error(error.message || 'Failed to sign in with Google');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: {
    fullName: string;
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    professionalTitle?: string;
    bio?: string;
  }) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase Auth profile
      await updateProfile(result.user, {
        displayName: userData.fullName,
      });

      // Send email verification
      await sendEmailVerification(result.user);

      // Create user profile in Firestore
      const profileData: UserProfile = {
        ...userData,
        email: result.user.email || '',
        profilePhoto: result.user.photoURL || '',
        emailVerified: result.user.emailVerified,
        provider: 'email',
        lastSignIn: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', result.user.uid), profileData);
      setUserProfile(profileData);

      // Don't increment users count until email is verified
      // This will be done after email verification

      toast.success('Account created! Please check your email to verify your account.');

      // Sign out the user - they need to verify email first
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);

      // Don't navigate here - let the Auth page handle it
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, token: string) => {
    // Firebase handles email verification automatically
    // This is a placeholder for any additional verification logic
    toast.success('Email verification sent! Please check your inbox.');
    navigate('/profile-completion');
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Please enter a valid email address.');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many requests. Please try again later.');
      } else {
        toast.error(error.message || 'Failed to send password reset email.');
      }
      throw error;
    }
  };

  const resendVerificationEmail = async (email: string, password: string) => {
    try {
      // Sign in temporarily to resend verification email
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result.user.emailVerified) {
        toast.success('Your email is already verified! You can sign in now.');
        await firebaseSignOut(auth);
        return;
      }

      await sendEmailVerification(result.user);
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      if (error.code === 'auth/too-many-requests') {
        toast.error('Too many requests. Please wait a few minutes before trying again.');
      } else if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid email or password.');
      } else {
        toast.error(error.message || 'Failed to send verification email.');
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
      throw error;
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const updatedProfile = {
        ...userProfile,
        ...profileData,
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
      setUserProfile(updatedProfile as UserProfile);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      signIn,
      signInWithGoogle,
      signUp,
      verifyOtp,
      resetPassword,
      resendVerificationEmail,
      signOut,
      loading,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  }
  return context;
};
