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
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  fullName: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  professionalTitle?: string;
  bio?: string;
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
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in successfully');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Create user profile if it doesn't exist
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        const profileData: UserProfile = {
          fullName: result.user.displayName || '',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await setDoc(doc(db, 'users', result.user.uid), profileData);
        setUserProfile(profileData);
      }
      
      toast.success('Signed in with Google successfully');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
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
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', result.user.uid), profileData);
      setUserProfile(profileData);
      
      toast.success('Account created successfully! Please check your email to verify your account.');
      navigate('/profile-completion');
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
