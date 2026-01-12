/**
 * Subscription Hook
 *
 * Manages user subscription state and provides methods for:
 * - Checking subscription status
 * - Creating checkout sessions
 * - Managing subscription via customer portal
 */

import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useFirebaseAuth } from './useFirebaseAuth';

export type SubscriptionStatus = 'free' | 'active' | 'past_due' | 'cancelled';

export interface SubscriptionData {
  status: SubscriptionStatus;
  plan: 'free' | 'pro';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  updatedAt?: Date;
}

interface UseSubscriptionReturn {
  subscription: SubscriptionData;
  loading: boolean;
  error: string | null;
  isPro: boolean;
  isActive: boolean;
  createCheckoutSession: (region: 'india' | 'us') => Promise<string | null>;
  openCustomerPortal: () => Promise<string | null>;
  verifySubscription: () => Promise<boolean>;
  refreshSubscription: () => void;
}

const DEFAULT_SUBSCRIPTION: SubscriptionData = {
  status: 'free',
  plan: 'free',
};

export const useSubscription = (): UseSubscriptionReturn => {
  const { user } = useFirebaseAuth();
  const [subscription, setSubscription] = useState<SubscriptionData>(DEFAULT_SUBSCRIPTION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time subscription updates from Firestore
  useEffect(() => {
    if (!user?.uid) {
      setSubscription(DEFAULT_SUBSCRIPTION);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          if (data.subscription) {
            // Convert Firestore timestamps to Date objects
            const subData = data.subscription;
            setSubscription({
              status: subData.status || 'free',
              plan: subData.plan || 'free',
              stripeCustomerId: subData.stripeCustomerId,
              stripeSubscriptionId: subData.stripeSubscriptionId,
              currentPeriodStart: subData.currentPeriodStart?.toDate?.(),
              currentPeriodEnd: subData.currentPeriodEnd?.toDate?.(),
              cancelAtPeriodEnd: subData.cancelAtPeriodEnd,
              updatedAt: subData.updatedAt?.toDate?.(),
            });
          } else {
            setSubscription(DEFAULT_SUBSCRIPTION);
          }
        } else {
          setSubscription(DEFAULT_SUBSCRIPTION);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching subscription:', err);
        setError('Failed to load subscription status');
        setSubscription(DEFAULT_SUBSCRIPTION);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  // Create Stripe Checkout session for upgrading to Pro
  const createCheckoutSession = useCallback(async (region: 'india' | 'us'): Promise<string | null> => {
    if (!user?.uid || !user?.email) {
      setError('Please sign in to upgrade');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          region,
          successUrl: `${window.location.origin}/profile?subscription=success`,
          cancelUrl: `${window.location.origin}/pricing?subscription=cancelled`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Return the Stripe Checkout URL
      return data.url || null;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create checkout session';
      console.error('Checkout error:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.uid, user?.email]);

  // Open Stripe Customer Portal for managing subscription
  const openCustomerPortal = useCallback(async (): Promise<string | null> => {
    if (!subscription.stripeCustomerId) {
      setError('No active subscription to manage');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripeCustomerId: subscription.stripeCustomerId,
          returnUrl: `${window.location.origin}/profile`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open customer portal');
      }

      return data.url || null;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to open customer portal';
      console.error('Portal error:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [subscription.stripeCustomerId]);

  // Verify subscription with Stripe and sync to Firebase
  const verifySubscription = useCallback(async (): Promise<boolean> => {
    if (!user?.uid || !user?.email) {
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/verify-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify subscription');
      }

      // If the server returned subscription data, update Firestore from client
      // This works as a fallback when Firebase Admin isn't configured on the server
      if (data.subscription) {
        const subData = data.subscription;

        // Update Firestore directly from client (user has write permission to their own doc)
        await setDoc(doc(db, 'users', user.uid), {
          subscription: {
            status: subData.status || 'free',
            plan: subData.plan || 'free',
            stripeCustomerId: subData.stripeCustomerId,
            stripeSubscriptionId: subData.stripeSubscriptionId,
            currentPeriodStart: subData.currentPeriodStart ? new Date(subData.currentPeriodStart) : null,
            currentPeriodEnd: subData.currentPeriodEnd ? new Date(subData.currentPeriodEnd) : null,
            cancelAtPeriodEnd: subData.cancelAtPeriodEnd || false,
            updatedAt: serverTimestamp(),
          },
        }, { merge: true });

        console.log('Subscription synced to Firestore:', subData.status);
      }

      // The Firestore listener will pick up the update automatically
      return data.subscription?.status === 'active';

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify subscription';
      console.error('Verify subscription error:', errorMessage);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.uid, user?.email]);

  // Manual refresh (triggers re-subscription to Firestore)
  const refreshSubscription = useCallback(() => {
    // Force a re-render which will trigger the useEffect
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  }, []);

  // Computed properties
  const isPro = subscription.plan === 'pro' && subscription.status === 'active';
  const isActive = subscription.status === 'active';

  return {
    subscription,
    loading,
    error,
    isPro,
    isActive,
    createCheckoutSession,
    openCustomerPortal,
    verifySubscription,
    refreshSubscription,
  };
};
