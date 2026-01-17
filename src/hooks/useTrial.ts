/**
 * Trial Hook
 *
 * Manages free trial state and provides methods for:
 * - Checking trial availability (remaining count)
 * - Claiming a free trial
 * - Checking trial expiry
 */

import { useState, useEffect, useCallback } from 'react';
import { API_ENDPOINTS, apiFetch } from '@/config/api';
import { useFirebaseAuth } from './useFirebaseAuth';

export interface TrialStatus {
  trialsAvailable: boolean;
  trialsRemaining: number;
  maxTrials: number;
  trialDurationDays: number;
}

export interface TrialInfo {
  isTrial: boolean;
  trialEndDate?: Date;
  daysRemaining?: number;
  trialExpired?: boolean;
}

interface UseTrialReturn {
  trialStatus: TrialStatus | null;
  trialInfo: TrialInfo | null;
  loading: boolean;
  error: string | null;
  fetchTrialStatus: () => Promise<void>;
  claimTrial: () => Promise<boolean>;
  checkTrialExpiry: () => Promise<TrialInfo | null>;
}

export const useTrial = (): UseTrialReturn => {
  const { user } = useFirebaseAuth();
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch global trial availability (no auth required)
  const fetchTrialStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(API_ENDPOINTS.trialStatus);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch trial status');
      }

      setTrialStatus({
        trialsAvailable: data.trialsAvailable,
        trialsRemaining: data.trialsRemaining,
        maxTrials: data.maxTrials,
        trialDurationDays: data.trialDurationDays,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trial status';
      console.error('Trial status error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Claim a free trial (requires auth)
  const claimTrial = useCallback(async (): Promise<boolean> => {
    if (!user?.uid) {
      setError('Please sign in to claim your free trial');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(API_ENDPOINTS.claimTrial, {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (data.trialsExhausted) {
          setError('Sorry, all free trials have been claimed!');
        } else if (data.trialAlreadyClaimed) {
          setError('You have already used your free trial');
        } else if (data.alreadySubscribed) {
          setError('You already have an active subscription');
        } else {
          throw new Error(data.error || 'Failed to claim trial');
        }
        return false;
      }

      // Update trial status with new remaining count
      if (trialStatus) {
        setTrialStatus({
          ...trialStatus,
          trialsRemaining: data.trialsRemaining,
          trialsAvailable: data.trialsRemaining > 0,
        });
      }

      // Set trial info
      setTrialInfo({
        isTrial: true,
        trialEndDate: new Date(data.trialEndDate),
        daysRemaining: data.trialDurationDays,
      });

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to claim trial';
      console.error('Claim trial error:', errorMessage);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.uid, user?.email, trialStatus]);

  // Check if user's trial has expired
  const checkTrialExpiry = useCallback(async (): Promise<TrialInfo | null> => {
    if (!user?.uid) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(API_ENDPOINTS.checkTrialExpiry, {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check trial expiry');
      }

      const info: TrialInfo = {
        isTrial: data.trialActive || false,
        trialEndDate: data.trialEndDate ? new Date(data.trialEndDate) : undefined,
        daysRemaining: data.daysRemaining,
        trialExpired: data.trialExpired,
      };

      setTrialInfo(info);
      return info;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check trial expiry';
      console.error('Check trial expiry error:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  // Fetch trial status on mount
  useEffect(() => {
    fetchTrialStatus();
  }, [fetchTrialStatus]);

  // Check trial expiry when user changes
  useEffect(() => {
    if (user?.uid) {
      checkTrialExpiry();
    }
  }, [user?.uid, checkTrialExpiry]);

  return {
    trialStatus,
    trialInfo,
    loading,
    error,
    fetchTrialStatus,
    claimTrial,
    checkTrialExpiry,
  };
};
