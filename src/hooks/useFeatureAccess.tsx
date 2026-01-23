/**
 * Feature Access Hook
 *
 * Central hook for managing feature access control.
 * Handles authentication checks and subscription requirements.
 *
 * Usage:
 * ```tsx
 * const { checkAccess, AuthModal, UpgradeModal } = useFeatureAccess();
 *
 * const handleProFeature = () => {
 *   if (!checkAccess('AI Enhancement', true)) return;
 *   // Feature logic here
 * };
 *
 * return (
 *   <>
 *     <button onClick={handleProFeature}>Enhance</button>
 *     <AuthModal />
 *     <UpgradeModal />
 *   </>
 * );
 * ```
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthRequiredModal } from '@/components/modals/AuthRequiredModal';
import { UpgradeModal } from '@/components/modals/UpgradeModal';

type SubscriptionStatus = 'none' | 'free' | 'trial' | 'active' | 'cancelled' | 'expired';

interface UseFeatureAccessReturn {
  /** Check if user can access a feature. Shows appropriate modal if not. Returns true if access granted. */
  checkAccess: (featureName?: string, requiresSubscription?: boolean) => boolean;
  /** Check access without showing modals (for UI state) */
  hasAccess: (requiresSubscription?: boolean) => boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Whether user has active subscription (active or trial) */
  hasSubscription: boolean;
  /** User's subscription status */
  subscriptionStatus: SubscriptionStatus;
  /** Days remaining in trial (0 if not on trial) */
  trialDaysRemaining: number;
  /** Component to render for auth modal */
  AuthModal: React.FC;
  /** Component to render for upgrade modal */
  UpgradeModal: React.FC;
}

export function useFeatureAccess(): UseFeatureAccessReturn {
  const { user, isAuthenticated } = useAuth();

  // Modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<string>('');
  const [featureRequiresSubscription, setFeatureRequiresSubscription] = useState(false);

  // Get subscription status
  const subscriptionStatus: SubscriptionStatus = useMemo(() => {
    if (!user?.subscription) return 'none';
    return (user.subscription.status as SubscriptionStatus) || 'none';
  }, [user?.subscription]);

  // Check if user has active subscription
  const hasSubscription = useMemo(() => {
    return subscriptionStatus === 'active' || subscriptionStatus === 'trial';
  }, [subscriptionStatus]);

  // Calculate trial days remaining
  const trialDaysRemaining = useMemo(() => {
    if (subscriptionStatus !== 'trial') return 0;
    const trialEndsAt = user?.subscription?.trialEndsAt;
    if (!trialEndsAt) return 0;

    const trialEnd = new Date(trialEndsAt);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }, [subscriptionStatus, user?.subscription?.trialEndsAt]);

  /**
   * Check if user has access without showing modals (for UI state)
   */
  const hasAccess = useCallback(
    (requiresSubscription = false): boolean => {
      if (!isAuthenticated) return false;
      if (requiresSubscription && !hasSubscription) return false;
      return true;
    },
    [isAuthenticated, hasSubscription]
  );

  /**
   * Check if user can access a feature.
   * Shows appropriate modal if access denied.
   * Returns true if access is granted.
   */
  const checkAccess = useCallback(
    (featureName = 'this feature', requiresSubscription = false): boolean => {
      setCurrentFeature(featureName);
      setFeatureRequiresSubscription(requiresSubscription);

      // Check authentication first
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return false;
      }

      // Check subscription if required
      if (requiresSubscription && !hasSubscription) {
        setShowUpgradeModal(true);
        return false;
      }

      return true;
    },
    [isAuthenticated, hasSubscription]
  );

  // Auth Modal Component
  const AuthModalComponent: React.FC = useCallback(
    () => (
      <AuthRequiredModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        feature={currentFeature}
        requiresSubscription={featureRequiresSubscription}
      />
    ),
    [showAuthModal, currentFeature, featureRequiresSubscription]
  );

  // Upgrade Modal Component
  const UpgradeModalComponent: React.FC = useCallback(
    () => (
      <UpgradeModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        feature={currentFeature}
      />
    ),
    [showUpgradeModal, currentFeature]
  );

  return {
    checkAccess,
    hasAccess,
    isAuthenticated,
    hasSubscription,
    subscriptionStatus,
    trialDaysRemaining,
    AuthModal: AuthModalComponent,
    UpgradeModal: UpgradeModalComponent,
  };
}

/**
 * Feature Access Context
 *
 * Optional context for providing feature access to deeply nested components.
 * Use this when you need to check access from many places without passing props.
 */
interface FeatureAccessContextValue extends UseFeatureAccessReturn {}

const FeatureAccessContext = React.createContext<FeatureAccessContextValue | null>(null);

export function FeatureAccessProvider({ children }: { children: React.ReactNode }) {
  const featureAccess = useFeatureAccess();

  return (
    <FeatureAccessContext.Provider value={featureAccess}>
      {children}
      {/* Render modals at provider level */}
      <featureAccess.AuthModal />
      <featureAccess.UpgradeModal />
    </FeatureAccessContext.Provider>
  );
}

export function useFeatureAccessContext(): FeatureAccessContextValue {
  const context = React.useContext(FeatureAccessContext);
  if (!context) {
    throw new Error('useFeatureAccessContext must be used within FeatureAccessProvider');
  }
  return context;
}

export default useFeatureAccess;
