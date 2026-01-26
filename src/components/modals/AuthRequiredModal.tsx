/**
 * Auth Required Modal
 *
 * Shown when unauthenticated users try to access features that require login.
 * Comprehensive, engaging modal showing all features with strong focus on CTA.
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
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  LogIn,
  Check,
  Crown,
  Palette,
  FileText,
  Download,
  ArrowUpDown,
  Linkedin,
  Wand2,
  Target,
  FileUp,
  MessageSquare,
  Mic,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const featureText = feature || 'Save Resume';

  // Free features
  const freeFeatures = [
    { icon: FileText, text: 'All Professional Templates' },
    { icon: Palette, text: 'Custom Colors & Fonts' },
    { icon: Download, text: 'Unlimited PDF Downloads' },
    { icon: ArrowUpDown, text: 'Section Reordering' },
  ];

  // Pro features
  const proFeatures = [
    { icon: Linkedin, text: 'LinkedIn Import', highlight: true },
    { icon: Wand2, text: 'AI Enhancement', highlight: true },
    { icon: Target, text: 'Match to Job', highlight: true },
    { icon: FileUp, text: 'Resume Upload' },
    { icon: MessageSquare, text: 'AI Chat Assistant' },
    { icon: Mic, text: 'AI Mock Interview', highlight: true },
    { icon: Layers, text: 'Unlimited Versions' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] p-0 overflow-hidden">
        {/* Header with gradient - more prominent */}
        <div className="bg-gradient-to-br from-primary via-primary to-blue-600 px-6 pt-8 pb-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogHeader className="text-center space-y-2">
              <DialogTitle className="text-2xl font-bold text-white">
                Sign in to continue
              </DialogTitle>
              <DialogDescription className="text-base text-white/90">
                {requiresSubscription ? (
                  <>Sign in and unlock Pro to access <span className="font-semibold">{featureText}</span></>
                ) : (
                  <>Sign in to access <span className="font-semibold">{featureText}</span></>
                )}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[60vh]">
          {/* Primary CTA - Most prominent */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn || loading}
              className="w-full h-14 gap-3 font-semibold text-base border-2 border-gray-200 bg-white hover:bg-gray-50 text-foreground shadow-lg hover:shadow-xl transition-all"
              variant="outline"
            >
              {isSigningIn ? (
                <>
                  <span className="h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
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
            <p className="text-xs text-center text-muted-foreground">
              Free to sign up • No credit card required
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-muted-foreground font-medium">What you'll get</span>
            </div>
          </div>

          {/* Free Features Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">Free Forever</h3>
              <Badge variant="secondary" className="text-xs">
                $0/month
              </Badge>
            </div>
            <div className="grid gap-2">
              {freeFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Features Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Crown className="h-4 w-4 text-primary" />
                Pro Features
              </h3>
              <Badge className="text-xs bg-gradient-to-r from-primary to-blue-600 text-white border-0">
                Upgrade
              </Badge>
            </div>
            <div className="grid gap-2">
              {proFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                    item.highlight
                      ? "bg-gradient-to-br from-primary/10 to-blue-500/10"
                      : "bg-gray-100"
                  )}>
                    <item.icon className={cn(
                      "w-3.5 h-3.5",
                      item.highlight ? "text-primary" : "text-gray-600"
                    )} />
                  </div>
                  <span className={cn(
                    "text-sm",
                    item.highlight ? "text-foreground font-medium" : "text-foreground"
                  )}>
                    {item.text}
                  </span>
                  {item.highlight && (
                    <Check className="h-4 w-4 text-emerald-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Value proposition */}
          <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-4 border border-primary/10">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex-shrink-0">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Save up to 5 resumes instantly
                </p>
                <p className="text-xs text-muted-foreground">
                  Create an account to save your work and access it anywhere
                </p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground pt-2">
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
