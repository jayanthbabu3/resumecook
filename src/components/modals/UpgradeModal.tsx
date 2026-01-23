/**
 * Upgrade Modal
 *
 * Shown when authenticated users try to access Pro features without subscription.
 * Shows pricing and trial availability with clear upgrade path.
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/services/subscriptionService';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/config/api';
import {
  Crown,
  Sparkles,
  MessageSquare,
  Target,
  Zap,
  Check,
  Loader2,
  Gift,
  Clock,
} from 'lucide-react';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Feature that requires subscription (for context) */
  feature?: string;
}

interface PricingInfo {
  currency: string;
  symbol: string;
  amount: number;
}

interface TrialInfo {
  trialsAvailable: boolean;
  trialsRemaining: number;
  trialDurationDays: number;
}

export function UpgradeModal({ open, onOpenChange, feature }: UpgradeModalProps) {
  const { user, refreshUser } = useAuth();
  const [pricing, setPricing] = useState<PricingInfo | null>(null);
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimingTrial, setClaimingTrial] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const featureText = feature || 'this feature';

  // Fetch pricing and trial info
  useEffect(() => {
    if (open) {
      fetchPricingAndTrialInfo();
    }
  }, [open]);

  const fetchPricingAndTrialInfo = async () => {
    setLoading(true);
    try {
      const [pricingRes, trialRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/payments/pricing`).then((r) => r.json()),
        fetch(`${API_BASE_URL}/api/payments/trial-status`).then((r) => r.json()),
      ]);

      if (pricingRes.success || pricingRes.pricing) {
        setPricing(pricingRes.pricing);
      }
      if (trialRes.success) {
        setTrialInfo(trialRes);
      }
    } catch (error) {
      console.error('Failed to fetch pricing/trial info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimTrial = async () => {
    setClaimingTrial(true);
    try {
      await subscriptionService.claimTrial();
      toast.success('Your 21-day free Pro trial has started!');
      await refreshUser();
      onOpenChange(false);
    } catch (error: any) {
      const message = error.response?.data?.error?.message || error.message || 'Failed to claim trial';
      if (message.includes('No free trials') || message.includes('trialsExhausted')) {
        toast.error('Sorry, all free trials have been claimed. Please subscribe to continue.');
        setTrialInfo((prev) => prev ? { ...prev, trialsAvailable: false } : null);
      } else if (message.includes('already')) {
        toast.error('You already have an active subscription or trial.');
      } else {
        toast.error(message);
      }
    } finally {
      setClaimingTrial(false);
    }
  };

  const handleSubscribe = async () => {
    setSubscribing(true);
    try {
      const response = await subscriptionService.createSubscription(pricing?.currency || 'INR');

      // Open Razorpay checkout
      await subscriptionService.openCheckout(
        response,
        user?.email || '',
        user?.fullName || '',
        async (paymentData) => {
          // Verify payment
          try {
            await subscriptionService.verifyPayment(paymentData);
            toast.success('Payment successful! Welcome to Pro!');
            await refreshUser();
            onOpenChange(false);
          } catch (verifyError) {
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        (error) => {
          if (error.message !== 'Payment cancelled') {
            toast.error(error.message || 'Payment failed. Please try again.');
          }
        }
      );
    } catch (error: any) {
      const message = error.response?.data?.error?.message || error.message || 'Failed to start subscription';
      toast.error(message);
    } finally {
      setSubscribing(false);
    }
  };

  // Check if user can claim trial (not already on trial, hasn't used trial)
  const canClaimTrial = trialInfo?.trialsAvailable &&
    user?.subscription?.status !== 'trial' &&
    user?.subscription?.status !== 'active';

  const proFeatures = [
    { icon: Sparkles, text: 'AI Resume Enhancement' },
    { icon: MessageSquare, text: 'Chat with AI Assistant' },
    { icon: Target, text: 'ATS Score Analysis' },
    { icon: Zap, text: 'LinkedIn Profile Import' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary/10 via-blue-500/10 to-indigo-500/5 px-6 pt-8 pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/25">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-xl font-semibold">
              Upgrade to Pro
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Subscribe to Pro to access {featureText}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-5">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Pro Features */}
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pro Features
                </p>
                <div className="grid gap-2.5">
                  {proFeatures.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{item.text}</span>
                      <Check className="w-4 h-4 text-emerald-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trial Banner - Only show if trials available and user can claim */}
              {canClaimTrial && trialInfo && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                      <Gift className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                        Free {trialInfo.trialDurationDays}-Day Pro Trial
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Only {trialInfo.trialsRemaining} spots remaining!
                      </p>
                    </div>
                    <Button
                      onClick={handleClaimTrial}
                      disabled={claimingTrial}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white flex-shrink-0"
                    >
                      {claimingTrial ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Claim Free'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Pricing Card */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900/50">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pro Plan</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold text-foreground">
                        {pricing?.symbol || '₹'}{pricing?.amount || 169}
                      </span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      <Zap className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleSubscribe}
                  disabled={subscribing}
                  className="w-full h-11 font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                >
                  {subscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Subscribe Now
                    </>
                  )}
                </Button>
              </div>

              {/* Trial exhausted message */}
              {!canClaimTrial && trialInfo && !trialInfo.trialsAvailable && (
                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  All free trials have been claimed
                </p>
              )}

              {/* Secure payment note */}
              <p className="text-xs text-center text-muted-foreground">
                Secure payment powered by Razorpay. Cancel anytime.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpgradeModal;
