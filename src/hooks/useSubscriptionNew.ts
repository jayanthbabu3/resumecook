/**
 * Subscription Hook
 *
 * React Query hook for subscription and trial management.
 * Replaces the Firebase-based subscription hook.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  subscriptionService,
  SubscriptionStatus,
  PaymentVerificationData,
} from '@/services';
import { useAuth } from '@/contexts/AuthContext';
import { useTrialWelcome } from '@/contexts/TrialWelcomeContext';

// Query keys
export const subscriptionKeys = {
  all: ['subscription'] as const,
  status: () => [...subscriptionKeys.all, 'status'] as const,
  trial: () => [...subscriptionKeys.all, 'trial'] as const,
  pricing: () => [...subscriptionKeys.all, 'pricing'] as const,
};

/**
 * Hook to get current subscription status
 */
export function useSubscriptionStatus() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: subscriptionKeys.status(),
    queryFn: () => subscriptionService.getStatus(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60, // 1 minute - refresh more frequently for accurate trial count
  });
}

/**
 * Hook to get trial availability (public - shows remaining trials count)
 */
export function useTrialStatus() {
  return useQuery({
    queryKey: subscriptionKeys.trial(),
    queryFn: () => subscriptionService.getTrialStatus(),
    staleTime: 1000 * 60 * 5, // 5 minutes - trial count doesn't change frequently
  });
}

/**
 * Hook to get pricing plans
 */
export function usePricing() {
  return useQuery({
    queryKey: subscriptionKeys.pricing(),
    queryFn: () => subscriptionService.getPricing(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

/**
 * Hook to claim free trial
 * @param onTrialClaimed - Optional callback when trial is successfully claimed (used to show welcome modal)
 */
export function useClaimTrial(onTrialClaimed?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => subscriptionService.claimTrial(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
      // Don't show toast - the welcome modal will handle the success message
      onTrialClaimed?.();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to claim trial'
      );
    },
  });
}

/**
 * Hook to cancel subscription
 */
export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => subscriptionService.cancelSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
      toast.success('Subscription cancelled. You can still access Pro features until the end of your billing period.');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to cancel subscription'
      );
    },
  });
}

/**
 * Hook for subscription checkout flow
 */
export function useSubscriptionCheckout() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const createSubscription = useMutation({
    mutationFn: (currency: string = 'INR') =>
      subscriptionService.createSubscription(currency),
  });

  const verifyPayment = useMutation({
    mutationFn: (data: PaymentVerificationData) =>
      subscriptionService.verifyPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
      toast.success('Payment successful! Welcome to Pro!');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error?.message || 'Payment verification failed'
      );
    },
  });

  const startCheckout = async (currency: string = 'INR') => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    try {
      // Create subscription
      const subscriptionData = await createSubscription.mutateAsync(currency);

      // Open Razorpay checkout
      await subscriptionService.openCheckout(
        subscriptionData,
        user.email,
        user.fullName,
        async (paymentData) => {
          // Verify payment
          await verifyPayment.mutateAsync(paymentData);
        },
        (error) => {
          if (error.message !== 'Payment cancelled') {
            toast.error(error.message);
          }
        }
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.error?.message || 'Failed to start checkout'
      );
    }
  };

  return {
    startCheckout,
    isLoading: createSubscription.isPending || verifyPayment.isPending,
  };
}

/**
 * Main subscription hook - combines status and utility methods
 */
export function useSubscription() {
  const { data: status, isLoading, refetch } = useSubscriptionStatus();
  const { startCheckout, isLoading: isCheckoutLoading } = useSubscriptionCheckout();
  const { showTrialWelcome } = useTrialWelcome();
  const claimTrial = useClaimTrial(showTrialWelcome);
  const cancelSubscription = useCancelSubscription();

  // Computed properties
  const isPro = status?.status === 'active' || status?.status === 'trial';
  const isTrial = status?.status === 'trial';
  const isExpired = status?.status === 'expired';
  const isCancelled = status?.status === 'cancelled';

  // Calculate trial days remaining
  const trialDaysRemaining =
    status?.status === 'trial' && status?.trialEndsAt
      ? Math.max(
          0,
          Math.ceil(
            (new Date(status.trialEndsAt).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  return {
    // Status
    status,
    isLoading,
    isPro,
    isTrial,
    isExpired,
    isCancelled,
    trialDaysRemaining,

    // Actions
    refetch,
    startCheckout,
    claimTrial: claimTrial.mutate,
    cancelSubscription: cancelSubscription.mutate,

    // Loading states
    isCheckoutLoading,
    isClaimingTrial: claimTrial.isPending,
    isCancelling: cancelSubscription.isPending,
  };
}

export default useSubscription;
