import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Header } from '@/components/Header';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    document.title = 'Authenticating • ResumeCook';

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    const handleExchange = async () => {
      try {
        if (error) {
          throw new Error(errorDescription || 'Authentication failed');
        }
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
          toast.success('Signed in successfully');
          navigate('/dashboard', { replace: true });
        } else {
          // No code present, just go to auth
          navigate('/auth', { replace: true });
        }
      } catch (e: any) {
        toast.error(e.message || 'Authentication failed');
        navigate('/auth', { replace: true });
      } finally {
        setProcessing(false);
      }
    };

    // Defer to avoid running in onAuthStateChange context
    setTimeout(handleExchange, 0);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {processing ? 'Finalizing sign-in…' : 'Redirecting…'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
