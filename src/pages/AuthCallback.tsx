import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      // In local mode, just go to the auth page
      navigate('/auth', { replace: true });
      setProcessing(false);
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
