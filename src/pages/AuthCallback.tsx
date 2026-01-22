import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { tokenManager } from '@/services';

/**
 * Auth Callback Page
 *
 * Handles the callback from Google OAuth.
 * The backend redirects here with tokens in query params.
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    document.title = 'Authenticating • ResumeCook';

    const handleCallback = async () => {
      // Check for tokens in URL params (backend Google OAuth callback)
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // Handle error from OAuth
      if (error) {
        setStatus('error');
        setErrorMessage(errorDescription || error || 'Authentication failed');
        toast.error(errorDescription || 'Authentication failed');
        setTimeout(() => navigate('/auth?mode=login', { replace: true }), 2000);
        return;
      }

      // Handle successful OAuth with tokens
      if (accessToken && refreshToken) {
        try {
          // Store tokens
          tokenManager.setTokens(accessToken, refreshToken);

          // If this is opened in a popup (from authService.googleAuth)
          if (window.opener) {
            window.opener.postMessage(
              {
                type: 'GOOGLE_AUTH_SUCCESS',
                accessToken,
                refreshToken,
              },
              window.location.origin
            );
            window.close();
            return;
          }

          // If not a popup, redirect to dashboard
          setStatus('success');
          toast.success('Signed in successfully!');
          navigate('/dashboard', { replace: true });
        } catch (err) {
          setStatus('error');
          setErrorMessage('Failed to complete authentication');
          toast.error('Failed to complete authentication');
          setTimeout(() => navigate('/auth?mode=login', { replace: true }), 2000);
        }
        return;
      }

      // No tokens found - might be a legacy callback, redirect to auth
      navigate('/auth?mode=login', { replace: true });
    };

    // Defer to avoid running during render
    const timer = setTimeout(handleCallback, 100);
    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Finalizing sign-in...</p>
            </>
          )}
          {status === 'success' && (
            <>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">Success! Redirecting...</p>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-red-600 font-medium mb-2">Authentication Failed</p>
              <p className="text-muted-foreground text-sm">{errorMessage}</p>
              <p className="text-muted-foreground text-sm mt-2">Redirecting to login...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
