/**
 * useAuthState Hook
 *
 * Provides a consistent way to check authentication and subscription status
 * with proper loading state handling to prevent UI flashing.
 *
 * This hook combines auth and subscription loading states to provide
 * a single source of truth for whether the app is ready to show
 * user-specific UI elements.
 */

import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscriptionNew';

export function useAuthState() {
  const { user, isAuthenticated, loading: authLoading, isAdmin } = useAuth();
  const {
    isPro,
    isTrial,
    isLoading: subscriptionLoading,
    trialDaysRemaining,
    status
  } = useSubscription();

  // Combined loading state:
  // - Always loading during initial auth check
  // - If authenticated, also loading while fetching subscription
  const isLoading = authLoading || (isAuthenticated && subscriptionLoading);

  // Ready state - safe to show UI without flashing
  const isReady = !isLoading;

  return {
    // User state
    user,
    isAuthenticated,
    isAdmin,

    // Subscription state
    isPro,
    isTrial,
    trialDaysRemaining,
    subscriptionStatus: status,

    // Loading states
    isLoading,
    isReady,
    authLoading,
    subscriptionLoading,

    // Common patterns
    isFreeTier: isReady && isAuthenticated && !isPro,
    isProUser: isReady && isAuthenticated && isPro,
    isTrialUser: isReady && isAuthenticated && isTrial,
    needsUpgrade: isReady && isAuthenticated && !isPro,
    isGuest: isReady && !isAuthenticated,
  };
}