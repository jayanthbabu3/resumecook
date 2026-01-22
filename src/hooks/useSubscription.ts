/**
 * Subscription Hook - DEPRECATED
 *
 * This hook has been replaced by useSubscriptionNew.
 * Use @/hooks/useSubscriptionNew instead.
 */

import { useSubscription as useNewSubscription } from './useSubscriptionNew';

export type SubscriptionStatus = 'free' | 'active' | 'past_due' | 'cancelled' | 'expired';

export interface SubscriptionData {
  status: SubscriptionStatus;
  plan: 'free' | 'pro';
  razorpayCustomerId?: string;
  razorpaySubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  updatedAt?: Date;
  isTrial?: boolean;
  trialStartDate?: Date;
  trialEndDate?: Date;
}

/**
 * @deprecated Use useSubscription from @/hooks/useSubscriptionNew instead
 */
export const useSubscription = () => {
  console.warn('DEPRECATED: useSubscription is deprecated. Use useSubscription from @/hooks/useSubscriptionNew instead');
  const sub = useNewSubscription();

  // Map to legacy interface
  const subscription: SubscriptionData = {
    status: sub.isPro ? 'active' : (sub.isTrial ? 'active' : 'free'),
    plan: sub.isPro ? 'pro' : 'free',
    razorpaySubscriptionId: sub.subscription?.razorpaySubscriptionId,
    currentPeriodEnd: sub.subscription?.currentPeriodEnd ? new Date(sub.subscription.currentPeriodEnd) : undefined,
    cancelAtPeriodEnd: sub.subscription?.cancelAtPeriodEnd,
    isTrial: sub.isTrial,
    trialEndDate: sub.subscription?.trialEndsAt ? new Date(sub.subscription.trialEndsAt) : undefined,
  };

  return {
    subscription,
    loading: sub.isLoading,
    error: null as Error | null,
    isPro: sub.isPro,
    isTrial: sub.isTrial,
    trialDaysRemaining: sub.trialDaysRemaining,
    // Use the new checkout flow
    initiateSubscription: sub.startCheckout,
    cancelSubscription: sub.cancelSubscription,
    // Trial methods
    startTrial: async () => {
      console.warn('Trial is now automatically started for new users');
    },
    claimTrial: async () => {
      console.warn('Trial is now automatically started for new users');
      return true;
    },
    checkTrialEligibility: async () => {
      return { eligible: !sub.isPro && !sub.isTrial, reason: 'ok' };
    },
  };
};

export default useSubscription;
