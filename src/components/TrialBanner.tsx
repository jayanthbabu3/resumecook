/**
 * Trial Banner Component
 *
 * Shows trial status to users:
 * - For non-logged-in users: Shows trial availability (X of 1000 remaining)
 * - For trial users: Shows days remaining
 * - For Pro users or when trials exhausted: Hidden
 *
 * Controlled by FEATURES.TRIAL_SYSTEM_ENABLED flag
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { useTrial } from '@/hooks/useTrial';
import { FEATURES } from '@/config/features';
import { Gift, Timer, Sparkles, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TrialBannerProps {
  variant?: 'full' | 'compact';
  className?: string;
  onClaimClick?: () => void;
}

export const TrialBanner = ({
  variant = 'full',
  className,
  onClaimClick
}: TrialBannerProps) => {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();
  const { isPro, isTrial, trialDaysRemaining } = useSubscription();
  const { trialStatus } = useTrial();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if trial system is disabled
  if (!FEATURES.TRIAL_SYSTEM_ENABLED) return null;

  // Don't show if dismissed
  if (dismissed) return null;

  // Don't show for paid Pro users (not trial)
  if (isPro && !isTrial) return null;

  // Active trial user - show countdown
  if (isTrial && trialDaysRemaining !== null) {
    const isUrgent = trialDaysRemaining <= 2;

    return (
      <div className={cn(
        "relative overflow-hidden",
        isUrgent
          ? "bg-gradient-to-r from-amber-500 to-orange-500"
          : "bg-gradient-to-r from-emerald-500 to-teal-500",
        "text-white",
        className
      )}>
        <div className="container mx-auto max-w-6xl px-4 py-2.5">
          <div className="flex items-center justify-center gap-3 text-sm">
            <Timer className="h-4 w-4 flex-shrink-0" />
            <span>
              <strong>Pro Trial:</strong>{' '}
              {trialDaysRemaining === 0
                ? 'Expires today!'
                : `${trialDaysRemaining} day${trialDaysRemaining !== 1 ? 's' : ''} remaining`
              }
            </span>
            <Button
              size="sm"
              className="h-7 px-3 text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
              onClick={() => navigate('/pricing')}
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Non-trial user - show trial availability
  if (trialStatus?.trialsAvailable && !isPro) {
    const remaining = trialStatus.trialsRemaining || 0;
    const isLimited = remaining < 500;

    if (variant === 'compact') {
      return (
        <div className={cn(
          "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white py-2 px-4",
          className
        )}>
          <div className="container mx-auto max-w-6xl flex items-center justify-center gap-3 text-sm">
            <Gift className="h-4 w-4" />
            <span>
              <strong>{remaining}</strong> free Pro trials left
            </span>
            <Button
              size="sm"
              className="h-7 px-3 text-xs font-semibold bg-white text-purple-700 hover:bg-white/90"
              onClick={onClaimClick || (() => navigate('/pricing'))}
            >
              {user ? 'Claim Now' : 'Get Started'}
            </Button>
          </div>
        </div>
      );
    }

    // Full variant - for Dashboard/Homepage
    return (
      <div className={cn(
        "relative bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 border border-violet-200 rounded-xl p-4 sm:p-5",
        className
      )}>
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 p-1 rounded-full text-violet-400 hover:text-violet-600 hover:bg-violet-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 mb-0.5">
              Try Pro Free for 7 Days
            </h3>
            <p className="text-sm text-gray-600">
              {isLimited ? (
                <>Only <strong className="text-violet-600">{remaining}</strong> trials remaining!</>
              ) : (
                <>Unlock AI features, LinkedIn import, and job tailoring</>
              )}
            </p>
          </div>

          {/* CTA */}
          <Button
            className="flex-shrink-0 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25"
            onClick={onClaimClick || (() => navigate('/pricing'))}
          >
            {user ? 'Start Free Trial' : 'Get Started Free'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Progress bar showing remaining trials */}
        {isLimited && (
          <div className="mt-4 pt-3 border-t border-violet-200">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span>Free trials claimed</span>
              <span>{1000 - remaining} of 1,000</span>
            </div>
            <div className="h-1.5 bg-violet-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${((1000 - remaining) / 1000) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Trials exhausted or user already Pro - don't show anything
  return null;
};

export default TrialBanner;
