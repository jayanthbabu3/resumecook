/**
 * Auth Page - Gmail Only Login
 *
 * Simplified authentication page with Google Sign-In only.
 * Clean, modern UI focused on quick sign-in.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Sparkles, Shield, Zap, Check, Crown } from 'lucide-react';

const Auth = () => {
  const { signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Check if user came from upgrade flow
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const isUpgradeFlow = searchParams.get('upgrade') === 'true';

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, loading, navigate, redirectTo]);

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await signInWithGoogle();
      // Navigation will happen via useEffect when user state updates
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-[#0a0a0f] overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.3),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_0%_100%,rgba(139,92,246,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_100%_0%,rgba(6,182,212,0.1),transparent)]" />
        </div>

        {/* Floating elements */}
        <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-blue-500/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-72 h-72 rounded-full bg-blue-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Content container */}
        <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-14">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 w-fit">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/25">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">ResumeCook</span>
          </Link>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg py-12">
            {/* Main heading */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                Free to use
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Create your
                <span className="relative mx-3">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                    perfect
                  </span>
                </span>
                resume
              </h1>

              <p className="text-base xl:text-lg text-white/50 leading-relaxed max-w-md">
                Professional templates, ATS-optimized formatting. Build your resume in minutes.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-10 pt-10 border-t border-white/10">
              {[
                { icon: Sparkles, text: "AI-powered resume enhancement" },
                { icon: Shield, text: "ATS-optimized templates" },
                { icon: Zap, text: "Create in under 5 minutes" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm text-white/70">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-white/30">
            <span>&copy; {new Date().getFullYear()} ResumeCook</span>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-background dark:to-blue-950/20 relative overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3),transparent_70%)]" />

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b relative z-10 bg-background/80 backdrop-blur-sm">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">ResumeCook</span>
          </Link>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 relative z-10">
          <div className="w-full max-w-[400px] space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              {isUpgradeFlow ? (
                <>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center mb-4">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Sign in to upgrade
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Create an account or sign in to upgrade to Pro and unlock AI-powered features
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground">
                    Welcome to ResumeCook
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Sign in with your Google account to create amazing resumes
                  </p>
                </>
              )}
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="text-sm">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 gap-3 font-semibold text-base border-2 border-gray-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-gray-300 transition-all rounded-xl shadow-sm"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            {/* Features below button */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-muted-foreground mb-4">
                What you'll get:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Free resume builder",
                  "10+ templates",
                  "PDF downloads",
                  "ATS optimization",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-foreground hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden p-4 text-center border-t">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ResumeCook. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
