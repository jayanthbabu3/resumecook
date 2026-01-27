/**
 * Auth Page - Gmail Only Login
 *
 * Minimalist, elegant authentication page focused on login functionality.
 * Clean design with brand theme consistency.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Crown, ArrowLeft, Lock, Shield, CheckCircle2 } from 'lucide-react';

const Auth = () => {
  const { signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Check if user came from upgrade flow
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const isUpgradeFlow = searchParams.get('upgrade') === 'true';

  // Check for OAuth errors in URL params (from backend redirect)
  useEffect(() => {
    const oauthError = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    if (oauthError) {
      const errorMessages: Record<string, string> = {
        'google_auth_failed': 'Google authentication failed. Please try again.',
        'no_user': 'Unable to create user account. Please try again.',
        'callback_failed': 'Authentication callback failed. Please try again.',
        'access_denied': 'Access was denied. Please try again or use a different account.',
      };
      // Use error description if available, otherwise use our mapped message
      setError(errorDescription || errorMessages[oauthError] || `Authentication error: ${oauthError}`);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, loading, navigate, redirectTo]);

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError('');

    // Set a timeout to prevent infinite loading state
    const timeoutId = setTimeout(() => {
      setIsSubmitting(false);
      setError('');
    }, 30000); // 30 second timeout

    try {
      await signInWithGoogle();
      clearTimeout(timeoutId);
      // Navigate to the redirect destination after successful sign-in
      navigate(redirectTo, { replace: true });
    } catch (error: any) {
      clearTimeout(timeoutId);
      // Handle specific error cases
      if (error.message === 'Authentication cancelled') {
        // User closed the popup - just clear the loading state, no error message needed
        setError('');
      } else {
        setError(error.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Animated gradient background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient circle - top left */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />

        {/* Secondary gradient circle - top right */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

        {/* Accent gradient circle - bottom */}
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-primary/15 to-blue-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />

        {/* Geometric shapes for visual interest */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rotate-45 rounded-3xl blur-2xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tl from-blue-400/10 to-transparent rotate-12 rounded-3xl blur-2xl" />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(203 213 225 / 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-br from-primary/15 to-blue-500/15 rounded-full animate-float animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to home</span>
          </Link>

          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">ResumeCook</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Login Card with glassmorphism effect */}
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 ring-1 ring-gray-900/5">
            {/* Card Header */}
            <div className="p-8 pb-0">
              <div className="text-center">
                {/* Logo */}
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-white" />
                </div>

                {/* Title */}
                {isUpgradeFlow ? (
                  <>
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900/20 px-3 py-1 mb-4">
                      <Crown className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Pro Plan</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Sign in to continue
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Unlock all premium features and templates
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Welcome back
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sign in to access your resumes
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {/* Google Sign In Button */}
              <Button
                type="button"
                className="w-full h-11 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-medium transition-colors rounded-lg shadow-sm"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-gray-400 border-t-primary rounded-full animate-spin" />
                    <span className="ml-2">Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="ml-3">Continue with Google</span>
                  </>
                )}
              </Button>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Secure authentication with Google</span>
              </div>
            </div>

            {/* Card Footer - Simple privacy note */}
            <div className="px-8 pb-8">
              <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 p-4 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Secure authentication</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Sign in with your Google account. Your resumes are private and only accessible to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Auth;
