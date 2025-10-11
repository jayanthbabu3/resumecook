import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
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
      // First, send OTP to email
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            full_name: userData.fullName,
            password: password, // Store password in metadata for later and remove after verify
            phone: userData.phone || '',
            location: userData.location || '',
            linkedin_url: userData.linkedinUrl || '',
            github_url: userData.githubUrl || '',
            portfolio_url: userData.portfolioUrl || '',
            professional_title: userData.professionalTitle || '',
            bio: userData.bio || '',
          }
        }
      });
      
      if (otpError) {
        const msg = (otpError.message || '').toLowerCase();
        if (msg.includes('already') || msg.includes('exist') || otpError.status === 400 || otpError.status === 422) {
          toast.error('An account with this email already exists. Please sign in instead.');
          throw new Error('User already exists');
        }
        throw otpError;
      }
      
      toast.success('Verification code sent! Please check your email.');
    } catch (error: any) {
      if (error.message !== 'User already exists') {
        toast.error(error.message || 'Failed to sign up');
      }
      throw error;
    }
  };

  const verifyOtp = async (email: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (error) throw error;

      // After OTP verification, Supabase returns a session. Use it to set the password
      const { data: sessionData } = await supabase.auth.getSession();
      const userMeta = sessionData?.session?.user?.user_metadata as any;
      const pendingPassword = userMeta?.password as string | undefined;

      if (pendingPassword) {
        const { error: updateError } = await supabase.auth.updateUser({
          password: pendingPassword,
          data: { password: null }, // clear temporary password from metadata
        });
        if (updateError) {
          // Not fatal for navigation, but inform the user
          toast.error(updateError.message || 'Verified but failed to set password');
        } else {
          toast.success('Email verified! Password set successfully.');
        }
      } else {
        toast.success('Email verified successfully!');
      }

      navigate('/profile-completion');
    } catch (error: any) {
      toast.error(error.message || 'Invalid verification code');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signUp, verifyOtp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};