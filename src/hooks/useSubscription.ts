/**
 * Subscription Hook
 *
 * Manages user subscription state and provides methods for:
 * - Checking subscription status
 * - Creating Razorpay subscriptions
 * - Verifying payments
 * - Cancelling subscriptions
 */

import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useFirebaseAuth } from './useFirebaseAuth';

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
  // Trial-specific fields
  isTrial?: boolean;
  trialStartDate?: Date;
  trialEndDate?: Date;
}

// Razorpay checkout options type
interface RazorpayOptions {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  notes: {
    firebaseUserId: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

// Declare Razorpay global
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, handler: () => void) => void;
    };
  }
}

interface UseSubscriptionReturn {
  subscription: SubscriptionData;
  loading: boolean;
  error: string | null;
  isPro: boolean;
  isActive: boolean;
  isTrial: boolean;
  trialDaysRemaining: number | null;
  initiateSubscription: () => Promise<void>;
  cancelSubscription: (immediately?: boolean) => Promise<boolean>;
  verifySubscription: () => Promise<boolean>;
  refreshSubscription: () => void;
}

const DEFAULT_SUBSCRIPTION: SubscriptionData = {
  status: 'free',
  plan: 'free',
};

// Load Razorpay script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useSubscription = (): UseSubscriptionReturn => {
  const { user, userProfile } = useFirebaseAuth();
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
              razorpayCustomerId: subData.razorpayCustomerId,
              razorpaySubscriptionId: subData.razorpaySubscriptionId,
              currentPeriodStart: subData.currentPeriodStart?.toDate?.(),
              currentPeriodEnd: subData.currentPeriodEnd?.toDate?.(),
              cancelAtPeriodEnd: subData.cancelAtPeriodEnd,
              updatedAt: subData.updatedAt?.toDate?.(),
              // Trial fields
              isTrial: subData.isTrial || false,
              trialStartDate: subData.trialStartDate?.toDate?.(),
              trialEndDate: subData.trialEndDate?.toDate?.(),
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

  // Initiate Razorpay subscription checkout
  const initiateSubscription = useCallback(async (): Promise<void> => {
    if (!user?.uid || !user?.email) {
      setError('Please sign in to upgrade');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway. Please try again.');
      }

      // Create subscription on backend
      const { API_ENDPOINTS, apiFetch } = await import('../config/api');
      const response = await apiFetch(API_ENDPOINTS.createSubscription, {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          userName: userProfile?.fullName || user.displayName || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription');
      }

      // Open Razorpay Checkout
      const options: RazorpayOptions = {
        ...data.razorpay,
        handler: async (razorpayResponse: RazorpayResponse) => {
          // Verify payment on backend
          try {
            setLoading(true);
            const verifyResponse = await apiFetch(API_ENDPOINTS.verifyPayment, {
              method: 'POST',
              body: JSON.stringify({
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_subscription_id: razorpayResponse.razorpay_subscription_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                userId: user.uid,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            // Success! Firebase listener will update subscription state
            console.log('Payment verified successfully');

            // Navigate to success page or show success message
            window.location.href = '/profile?subscription=success';
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Payment verification failed';
            console.error('Payment verification error:', errorMessage);
            setError(errorMessage);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            console.log('Checkout cancelled by user');
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initiate subscription';
      console.error('Subscription error:', errorMessage);
      setError(errorMessage);
      setLoading(false);
    }
  }, [user?.uid, user?.email, user?.displayName, userProfile?.fullName]);

  // Cancel subscription
  const cancelSubscription = useCallback(async (immediately: boolean = false): Promise<boolean> => {
    if (!user?.uid) {
      setError('Please sign in to cancel subscription');
      return false;
    }

    if (!subscription.razorpaySubscriptionId) {
      setError('No active subscription to cancel');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { API_ENDPOINTS, apiFetch } = await import('../config/api');
      const response = await apiFetch(API_ENDPOINTS.cancelSubscription, {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          cancelAtPeriodEnd: !immediately,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      console.log('Subscription cancelled:', data.message);
      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel subscription';
      console.error('Cancel subscription error:', errorMessage);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.uid, subscription.razorpaySubscriptionId]);

  // Verify subscription status with backend
  const verifySubscription = useCallback(async (): Promise<boolean> => {
    if (!user?.uid) {
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { API_ENDPOINTS, apiFetch } = await import('../config/api');
      const response = await apiFetch(API_ENDPOINTS.verifySubscription, {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify subscription');
      }

      // The Firestore listener will pick up any updates
      return data.hasActiveSubscription || false;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify subscription';
      console.error('Verify subscription error:', errorMessage);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  // Manual refresh (triggers re-subscription to Firestore)
  const refreshSubscription = useCallback(() => {
    // Force a re-render which will trigger the useEffect
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  }, []);

  // Computed properties
  const isPro = subscription.plan === 'pro' && subscription.status === 'active';
  const isActive = subscription.status === 'active';
  const isTrial = subscription.isTrial || false;

  // Calculate trial days remaining
  const trialDaysRemaining = (() => {
    if (!subscription.isTrial || !subscription.trialEndDate) return null;
    const now = new Date();
    const endDate = subscription.trialEndDate;
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  })();

  return {
    subscription,
    loading,
    error,
    isPro,
    isActive,
    isTrial,
    trialDaysRemaining,
    initiateSubscription,
    cancelSubscription,
    verifySubscription,
    refreshSubscription,
  };
};
