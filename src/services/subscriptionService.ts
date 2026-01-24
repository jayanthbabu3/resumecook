/**
 * Subscription Service
 *
 * Handles all payment and subscription-related API calls:
 * - Subscription status
 * - Trial management
 * - Razorpay integration
 * - Plan management
 */

import api from './api';

// Types
export interface SubscriptionStatus {
  status: 'none' | 'trial' | 'active' | 'cancelled' | 'expired';
  plan?: string;
  isTrial: boolean;
  trialEndsAt?: string;
  currentPeriodEnd?: string;
  cancelledAt?: string;
  razorpaySubscriptionId?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  currency: string;
  features: string[];
  isPopular?: boolean;
}

export interface CreateSubscriptionResponse {
  subscriptionId: string;
  razorpayKeyId: string;
  orderId?: string;
  amount: number;
  currency: string;
  planName: string;
}

export interface PaymentVerificationData {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export interface TrialStatus {
  trialsAvailable: boolean;
  trialsRemaining: number;
  maxTrials: number;
  trialDurationDays: number;
}

// Subscription service methods
export const subscriptionService = {
  /**
   * Get current subscription status
   */
  async getStatus(): Promise<SubscriptionStatus> {
    const response = await api.get<{ success: boolean; data: SubscriptionStatus }>(
      '/payments/subscription-status'
    );
    return response.data.data;
  },

  /**
   * Get pricing plans
   */
  async getPricing(): Promise<PricingPlan[]> {
    const response = await api.get<{ success: boolean; data: PricingPlan[] }>('/payments/pricing');
    return response.data.data;
  },

  /**
   * Get trial status
   */
  async getTrialStatus(): Promise<TrialStatus> {
    const response = await api.get<{ success: boolean; data: TrialStatus }>(
      '/payments/trial-status'
    );
    return response.data.data;
  },

  /**
   * Claim free trial
   */
  async claimTrial(): Promise<SubscriptionStatus> {
    const response = await api.post<{ success: boolean; data: SubscriptionStatus }>(
      '/payments/claim-trial'
    );
    return response.data.data;
  },

  /**
   * Create a new subscription (initiates Razorpay payment)
   */
  async createSubscription(currency: string = 'INR'): Promise<CreateSubscriptionResponse> {
    const response = await api.post<{ success: boolean; data: CreateSubscriptionResponse }>(
      '/payments/create-subscription',
      { currency }
    );
    return response.data.data;
  },

  /**
   * Verify payment after Razorpay callback
   */
  async verifyPayment(data: PaymentVerificationData): Promise<SubscriptionStatus> {
    const response = await api.post<{ success: boolean; data: SubscriptionStatus }>(
      '/payments/verify-payment',
      data
    );
    return response.data.data;
  },

  /**
   * Cancel subscription
   */
  async cancelSubscription(): Promise<SubscriptionStatus> {
    const response = await api.post<{ success: boolean; data: SubscriptionStatus }>(
      '/payments/cancel-subscription'
    );
    return response.data.data;
  },

  /**
   * Reactivate cancelled subscription
   */
  async reactivateSubscription(): Promise<SubscriptionStatus> {
    const response = await api.post<{ success: boolean; data: SubscriptionStatus }>(
      '/payments/reactivate-subscription'
    );
    return response.data.data;
  },

  /**
   * Check if trial has expired (for background checks)
   */
  async checkTrialExpiry(): Promise<{ expired: boolean; status: SubscriptionStatus }> {
    const response = await api.get<{
      success: boolean;
      data: { expired: boolean; status: SubscriptionStatus };
    }>('/payments/check-trial-expiry');
    return response.data.data;
  },

  // Utility methods

  /**
   * Check if user has active subscription or trial
   */
  async hasAccess(): Promise<boolean> {
    const status = await this.getStatus();
    return status.status === 'active' || status.status === 'trial';
  },

  /**
   * Get days remaining in trial
   */
  async getTrialDaysRemaining(): Promise<number> {
    const status = await this.getStatus();
    if (status.status !== 'trial' || !status.trialEndsAt) {
      return 0;
    }
    const trialEnd = new Date(status.trialEndsAt);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  },

  /**
   * Load Razorpay script
   */
  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  /**
   * Open Razorpay checkout
   */
  async openCheckout(
    options: CreateSubscriptionResponse,
    userEmail: string,
    userName: string,
    onSuccess: (data: PaymentVerificationData) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    const loaded = await this.loadRazorpayScript();
    if (!loaded) {
      onError(new Error('Failed to load payment gateway'));
      return;
    }

    const razorpay = new (window as any).Razorpay({
      key: options.razorpayKeyId,
      subscription_id: options.subscriptionId,
      name: 'ResumeCook',
      description: options.planName,
      prefill: {
        email: userEmail,
        name: userName,
      },
      theme: {
        color: '#6366f1',
      },
      handler: (response: any) => {
        // Razorpay may not return subscription_id in the callback for subscription payments
        // Use the subscription ID we already have from the create-subscription response
        const subscriptionId = response.razorpay_subscription_id || options.subscriptionId;

        const verificationData: PaymentVerificationData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_subscription_id: subscriptionId,
          razorpay_signature: response.razorpay_signature,
        };

        // Validate before sending
        if (!verificationData.razorpay_payment_id ||
            !verificationData.razorpay_subscription_id ||
            !verificationData.razorpay_signature) {
          onError(new Error('Missing required payment verification parameters'));
          return;
        }

        onSuccess(verificationData);
      },
      modal: {
        ondismiss: () => {
          onError(new Error('Payment cancelled'));
        },
      },
    });

    razorpay.open();
  },
};

export default subscriptionService;
