/**
 * Auth Required Modal
 *
 * Shown when unauthenticated users try to access features that require login.
 * Provides a clear, elegant prompt to sign in with Google.
 */

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Shield, Sparkles, FileText, Check } from 'lucide-react';

interface AuthRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Feature that requires login (for context) */
  feature?: string;
  /** Whether the feature also requires subscription (shows different message) */
  requiresSubscription?: boolean;
}

export function AuthRequiredModal({
  open,
  onOpenChange,
  feature,
  requiresSubscription = false,
}: AuthRequiredModalProps) {
  const { signInWithGoogle, loading } = useAuth();
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      onOpenChange(false);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const featureText = feature || 'this feature';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-blue-500/5 px-6 pt-8 pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/25">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-xl font-semibold">
              Sign in to continue
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {requiresSubscription ? (
                <>Sign in and subscribe to Pro to access {featureText}</>
              ) : (
                <>Sign in to access {featureText}</>
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-5">
          {/* Benefits */}
          <div className="space-y-3 py-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              What you'll get
            </p>
            <div className="grid gap-2.5">
              {[
                { icon: FileText, text: 'Save up to 5 resumes' },
                { icon: Shield, text: 'ATS-optimized templates' },
                { icon: Sparkles, text: 'Professional formatting' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign in button */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isSigningIn || loading}
            className="w-full h-12 gap-3 font-semibold text-base border-2 border-gray-200 bg-white hover:bg-gray-50 text-foreground shadow-sm"
            variant="outline"
          >
            {isSigningIn ? (
              <>
                <span className="h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-primary hover:underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthRequiredModal;
