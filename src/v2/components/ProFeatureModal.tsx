/**
 * Pro Feature Modal
 *
 * Shows when a user tries to access a Pro feature without being logged in or subscribed.
 *
 * Flow:
 * - Not logged in: Shows sign in with Google
 * - Logged in, no subscription: Shows upgrade options with trial if available
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscriptionNew';
import { useCountry } from '@/hooks/useCountry';
import { subscriptionService } from '@/services/subscriptionService';
import {
  Sparkles,
  Crown,
  LogIn,
  Zap,
  Check,
  Loader2,
  Target,
  FileUp,
  Linkedin,
  X,
  Gift,
  Clock,
  Shield,
  FileText,
  Mic,
  Wand2,
  MessageSquare,
  Layers,
  Palette,
  Download,
  ArrowUpDown,
} from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/config/api';
import { cn } from '@/lib/utils';

// Default prices based on currency (used as fallback)
const DEFAULT_PRICES = {
  INR: { currency: 'INR', symbol: '₹', amount: 169 },
  USD: { currency: 'USD', symbol: '$', amount: 9 },
};

interface ProFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  featureDescription?: string;
  onLoginSuccess?: () => void; // Callback after successful login
}

interface TrialInfo {
  trialsAvailable: boolean;
  trialsRemaining: number;
  trialDurationDays: number;
}

interface PricingInfo {
  currency: string;
  symbol: string;
  amount: number;
}

export const ProFeatureModal: React.FC<ProFeatureModalProps> = ({
  isOpen,
  onClose,
  featureName = 'AI Features',
  onLoginSuccess,
}) => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, refreshUser } = useAuth();
  const { startCheckout } = useSubscription();
  const { currency } = useCountry();
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimingTrial, setIsClaimingTrial] = useState(false);
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [pricing, setPricing] = useState<PricingInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(true);

  // Get the default price based on detected currency (for fallback)
  const defaultPrice = DEFAULT_PRICES[currency];

  // Fetch trial and pricing info when modal opens for logged-in users
  useEffect(() => {
    if (isOpen && user) {
      fetchTrialAndPricing();
    } else if (!isOpen) {
      // Reset states when modal closes
      setLoadingInfo(true);
    }
  }, [isOpen, user, currency]);

  const fetchTrialAndPricing = async () => {
    setLoadingInfo(true);
    try {
      const [trialRes, pricingRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/payments/trial-status`).then((r) => r.json()),
        fetch(`${API_BASE_URL}/api/payments/pricing?currency=${currency}`).then((r) => r.json()),
      ]);

      if (trialRes.success !== false) {
        setTrialInfo(trialRes);
      }
      if (pricingRes.success !== false && pricingRes.pricing) {
        setPricing(pricingRes.pricing);
      }
    } catch (error) {
      console.error('Failed to fetch info:', error);
    } finally {
      setLoadingInfo(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // Don't close - modal will show upgrade options after sign in
      toast.success('Signed in successfully!');

      // Call onLoginSuccess callback if provided (e.g., to trigger pending save action)
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimTrial = async () => {
    setIsClaimingTrial(true);
    try {
      await subscriptionService.claimTrial();
      toast.success(`Your ${trialInfo?.trialDurationDays || 21}-day free Pro trial has started!`);
      await refreshUser();
      onClose();
    } catch (error: any) {
      const message = error.response?.data?.error?.message || error.message || 'Failed to claim trial';
      if (message.includes('No free trials') || message.includes('trialsExhausted')) {
        toast.error('Sorry, all free trials have been claimed.');
        setTrialInfo((prev) => prev ? { ...prev, trialsAvailable: false } : null);
      } else if (message.includes('already')) {
        toast.error('You already have an active subscription.');
        onClose();
      } else {
        toast.error(message);
      }
    } finally {
      setIsClaimingTrial(false);
    }
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      // Pass the detected currency to ensure correct plan is selected
      await startCheckout(pricing?.currency || currency);
      onClose();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user can claim trial
  const canClaimTrial = trialInfo?.trialsAvailable &&
    user?.subscription?.status !== 'trial' &&
    user?.subscription?.status !== 'active';

  const proFeatures = [
    { icon: Linkedin, label: 'LinkedIn Import', highlight: true },
    { icon: Wand2, label: 'AI Enhancement', highlight: true },
    { icon: Target, label: 'Match to Job', highlight: true },
    { icon: FileUp, label: 'Resume Upload' },
    { icon: MessageSquare, label: 'AI Chat Assistant' },
    { icon: Mic, label: 'AI Mock Interview', highlight: true },
    { icon: Layers, label: 'Unlimited Versions' },
  ];

  const freeFeatures = [
    { icon: FileText, label: 'All Professional Templates' },
    { icon: Palette, label: 'Custom Colors & Fonts' },
    { icon: Download, label: 'Unlimited PDF Downloads' },
    { icon: ArrowUpDown, label: 'Section Reordering' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] p-0 gap-0 border-0 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 transition-colors shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header - Enhanced gradient */}
        <div className="bg-gradient-to-br from-primary via-primary to-blue-600 px-6 pt-6 pb-5 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="mb-3 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              {user ? (
                <Crown className="h-7 w-7 text-white" />
              ) : (
                <LogIn className="h-7 w-7 text-white" />
              )}
            </div>
            <h2 className="text-xl font-bold text-white mb-1.5">
              {user ? 'Upgrade to Pro' : 'Sign in to continue'}
            </h2>
            <p className="text-white/90 text-sm leading-relaxed max-w-[300px]">
              {user
                ? `Unlock ${featureName} and all AI-powered tools`
                : `Sign in to access ${featureName}`
              }
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {user ? (
            // Logged in - Show upgrade options
            <>
              {loadingInfo ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  {/* Trial Banner - Only if available */}
                  {canClaimTrial && trialInfo && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4 mb-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <Gift className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-emerald-800">
                            Free {trialInfo.trialDurationDays}-Day Pro Trial
                          </p>
                          <p className="text-xs text-emerald-600 mt-0.5">
                            Only {trialInfo.trialsRemaining.toLocaleString()} spots left!
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleClaimTrial}
                        disabled={isClaimingTrial}
                        className="w-full mt-3 h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                      >
                        {isClaimingTrial ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Claiming...
                          </>
                        ) : (
                          <>
                            <Gift className="mr-2 h-4 w-4" />
                            Start Free Trial
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {/* Trial exhausted message */}
                  {!canClaimTrial && trialInfo && !trialInfo.trialsAvailable && (
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4 py-2 px-3 bg-gray-50 rounded-lg">
                      <Clock className="w-3.5 h-3.5" />
                      All free trials have been claimed
                    </div>
                  )}

                  {/* Pro Features */}
                  <div className="bg-primary/5 rounded-xl p-4 mb-5">
                    <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Pro Features</p>
                    <div className="space-y-2.5">
                      {proFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="p-1.5 rounded-lg bg-white shadow-sm">
                            <feature.icon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span className="text-sm text-gray-700 flex-1">{feature.label}</span>
                          <Check className="h-4 w-4 text-emerald-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border border-gray-200 rounded-xl p-4 mb-5">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xs text-gray-500 font-medium">Pro Plan</span>
                        <div className="flex items-baseline gap-0.5 mt-0.5">
                          <span className="text-2xl font-bold text-gray-900">
                            {pricing?.symbol || defaultPrice.symbol}{pricing?.amount || defaultPrice.amount}
                          </span>
                          <span className="text-sm text-gray-500">/month</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                    <Button
                      onClick={handleUpgrade}
                      disabled={isLoading}
                      className="w-full h-11 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 font-semibold"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Subscribe Now
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-gray-500">
                    Secure payment via Razorpay. Cancel anytime.
                  </p>
                </>
              )}
            </>
          ) : (
            // Not logged in - Compact side-by-side layout
            <>
              {/* Primary CTA - Most prominent */}
              <div className="space-y-2 pt-2 mb-4">
                <Button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full h-12 gap-3 font-semibold text-base border-2 border-gray-200 bg-white hover:bg-gray-50 text-foreground shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
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
                <p className="text-xs text-center text-muted-foreground">
                  Free to sign up • No credit card required
                </p>
              </div>

              {/* Features Grid - Clean & Elegant */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Free Column */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Free</h3>
                    <span className="text-xs font-semibold text-gray-500">$0</span>
                  </div>
                  <div className="space-y-2">
                    {freeFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700 leading-relaxed">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Column */}
                <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl p-4 border border-primary/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Crown className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-gray-900">Pro</h3>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold">
                      Upgrade
                    </span>
                  </div>
                  <div className="space-y-2">
                    {proFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className={cn(
                          "h-4 w-4 flex-shrink-0 mt-0.5",
                          feature.highlight ? "text-emerald-500" : "text-gray-400"
                        )} />
                        <span className={cn(
                          "text-xs leading-relaxed",
                          feature.highlight ? "text-gray-900 font-medium" : "text-gray-700"
                        )}>
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-center text-muted-foreground pt-2">
                By signing in, you agree to our{' '}
                <a href="/terms" className="text-primary hover:underline">Terms</a>
                {' '}and{' '}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProFeatureModal;
