import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Lightweight local auth types and storage to run without a backend
interface LocalUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}

interface LocalSession {
  user: LocalUser;
}

interface AuthContextType {
  user: LocalUser | null;
  session: LocalSession | null;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [session, setSession] = useState<LocalSession | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Bootstrap from localStorage to simulate a session without any backend
    const raw = localStorage.getItem('resumecook_local_session');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as LocalSession;
        setSession(parsed);
        setUser(parsed.user);
      } catch {
        // ignore parse error
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Accept any credentials and create a local session
    const localUser: LocalUser = { id: 'dev-user', email };
    const localSession: LocalSession = { user: localUser };
    localStorage.setItem('resumecook_local_session', JSON.stringify(localSession));
    setUser(localUser);
    setSession(localSession);
    toast.success('Signed in (local)');
    navigate('/dashboard');
  };

  const signInWithGoogle = async () => {
    // Directly create a local session for Google as well
    const localUser: LocalUser = { id: 'dev-user', email: 'google-user@example.com' };
    const localSession: LocalSession = { user: localUser };
    localStorage.setItem('resumecook_local_session', JSON.stringify(localSession));
    setUser(localUser);
    setSession(localSession);
    toast.success('Signed in with Google (local)');
    navigate('/dashboard');
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
    // Create local user and move forward to profile completion
    const localUser: LocalUser = { id: 'dev-user', email, user_metadata: { full_name: userData.fullName } };
    const localSession: LocalSession = { user: localUser };
    localStorage.setItem('resumecook_local_session', JSON.stringify(localSession));
    setUser(localUser);
    setSession(localSession);
    toast.success('Account created (local)');
    navigate('/profile-completion');
  };

  const verifyOtp = async (email: string, token: string) => {
    // No-op in local mode; just move forward
    toast.success('Email verified (local)');
    navigate('/profile-completion');
  };

  const signOut = async () => {
    localStorage.removeItem('resumecook_local_session');
    setUser(null);
    setSession(null);
    toast.success('Signed out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signInWithGoogle, signUp, verifyOtp, signOut, loading }}>
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