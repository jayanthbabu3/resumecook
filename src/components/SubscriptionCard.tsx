/**
 * Subscription Card Component
 *
 * Displays user's subscription status and provides management options:
 * - Current plan status
 * - Upgrade button for free users
 * - Manage subscription for Pro users
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';
import {
  Crown,
  Zap,
  Check,
  Calendar,
  CreditCard,
  ExternalLink,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubscriptionCardProps {
  className?: string;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ className }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    subscription,
    loading,
    error,
    isPro,
    createCheckoutSession,
    openCustomerPortal,
    verifySubscription,
  } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle success redirect from Stripe - verify and sync subscription
  useEffect(() => {
    const subscriptionStatus = searchParams.get('subscription');
    if (subscriptionStatus === 'success') {
      // Clear the query param first
      window.history.replaceState({}, '', window.location.pathname);

      // Verify subscription with Stripe and sync to Firebase
      verifySubscription().then((isActive) => {
        if (isActive) {
          toast.success('Welcome to Pro! Your subscription is now active.');
        } else {
          toast.info('Verifying your subscription...');
        }
      });
    }
  }, [searchParams, verifySubscription]);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      // Using "india" for INR pricing (Stripe India account limitation)
      const url = await createCheckoutSession('india');
      if (url) {
        window.location.href = url;
      } else {
        toast.error('Failed to start checkout. Please try again.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsProcessing(true);
    try {
      const url = await openCustomerPortal();
      if (url) {
        window.location.href = url;
      } else {
        toast.error('Failed to open subscription portal.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className={cn('bg-white rounded-2xl border border-gray-200 shadow-sm p-6', className)}>
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          <span className="text-gray-500">Loading subscription...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden', className)}>
      {/* Header */}
      <div className={cn(
        'px-6 py-4 border-b',
        isPro
          ? 'bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20'
          : 'bg-gray-50 border-gray-200'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isPro ? (
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg">
                <Crown className="h-5 w-5 text-white" />
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-gray-200">
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">
                {isPro ? 'Pro Plan' : 'Free Plan'}
              </h3>
              <p className="text-sm text-gray-500">
                {isPro ? 'All features unlocked' : 'Basic features'}
              </p>
            </div>
          </div>
          <Badge
            className={cn(
              'font-semibold',
              isPro
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white border-0'
                : 'bg-gray-100 text-gray-600 border-gray-200'
            )}
          >
            {isPro ? (
              <>
                <Sparkles className="h-3 w-3 mr-1" />
                Active
              </>
            ) : (
              'Free'
            )}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isPro ? (
          <>
            {/* Pro Status */}
            <div className="space-y-4">
              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {['LinkedIn Import', 'AI Enhancement', 'Job Tailoring', 'Resume Upload'].map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full"
                  >
                    <Check className="h-3 w-3" />
                    {feature}
                  </span>
                ))}
              </div>

              {/* Billing Info */}
              {subscription.currentPeriodEnd && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {subscription.cancelAtPeriodEnd
                      ? `Expires on ${formatDate(subscription.currentPeriodEnd)}`
                      : `Renews on ${formatDate(subscription.currentPeriodEnd)}`}
                  </span>
                </div>
              )}

              {subscription.cancelAtPeriodEnd && (
                <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span>Your subscription will not renew</span>
                </div>
              )}

              {/* Manage Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleManageSubscription}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Manage Subscription
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Free Plan - Upgrade CTA */}
            <div className="space-y-4">
              {/* What you're missing */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Upgrade to unlock:</p>
                <div className="grid gap-2">
                  {[
                    'LinkedIn Import',
                    'AI Resume Enhancement',
                    'Job-specific Tailoring',
                    'Resume Upload & Parse',
                    'Generate from Job Description',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 py-2">
                <span className="text-2xl font-bold text-gray-900">₹149</span>
                <span className="text-gray-500">/month</span>
              </div>

              {/* Upgrade Button */}
              <Button
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/20"
                onClick={handleUpgrade}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </>
                )}
              </Button>

              {/* View pricing link */}
              <button
                onClick={() => navigate('/pricing')}
                className="w-full text-center text-sm text-gray-500 hover:text-primary transition-colors"
              >
                View full pricing details
              </button>
            </div>
          </>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
