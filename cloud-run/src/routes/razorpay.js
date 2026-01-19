/**
 * Razorpay Payment Routes
 *
 * Handles all Razorpay payment operations:
 * - Create subscription
 * - Verify payment signature
 * - Manage subscription (cancel, pause, resume)
 * - Webhook handler for subscription events
 * - Trial management (7-day free trial for first 1000 users)
 *
 * Razorpay Subscription Flow:
 * 1. Create a Plan (one-time, done via dashboard or API)
 * 2. Create a Subscription for user
 * 3. User completes payment via Razorpay Checkout
 * 4. Verify payment signature on callback
 * 5. Handle webhooks for subscription lifecycle events
 */

import { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import admin from 'firebase-admin';

export const razorpayRouter = Router();

// Trial configuration
const TRIAL_CONFIG = {
  maxTrialUsers: 1000,
  trialDurationDays: 7,
  trialCollectionName: 'app_config',
  trialDocId: 'trial_stats',
};

// Razorpay Plan configuration
// Note: Create plans first via Razorpay Dashboard
// INR plan for India, USD plan for international users
const RAZORPAY_PLANS = {
  INR: {
    planId: process.env.RAZORPAY_PLAN_ID, // Monthly Pro plan in INR
    currency: 'INR',
    amount: 16900, // ₹169 in paise
    displayAmount: 169,
    symbol: '₹',
  },
  USD: {
    planId: process.env.RAZORPAY_PLAN_ID_USD, // Monthly Pro plan in USD
    currency: 'USD',
    amount: 900, // $9 in cents
    displayAmount: 9,
    symbol: '$',
  },
};

// Default currency for backward compatibility
const DEFAULT_CURRENCY = 'INR';

/**
 * Get the appropriate plan based on currency/country
 * @param {string} currency - 'INR' or 'USD'
 * @returns {object} Plan configuration
 */
const getPlanByCurrency = (currency) => {
  const normalizedCurrency = currency?.toUpperCase() || DEFAULT_CURRENCY;
  return RAZORPAY_PLANS[normalizedCurrency] || RAZORPAY_PLANS[DEFAULT_CURRENCY];
};

// Initialize Razorpay
const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be configured');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

// Initialize Firebase Admin
const initFirebase = () => {
  if (admin.apps.length) return admin.firestore();

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : null;

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'resumecook-90f81',
    });
  } else {
    admin.initializeApp({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'resumecook-90f81',
    });
  }

  return admin.firestore();
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Verify Razorpay payment signature
 * Used for both one-time payments and subscriptions
 */
const verifySignature = (body, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};

/**
 * Verify subscription payment signature
 */
const verifySubscriptionSignature = (razorpayPaymentId, razorpaySubscriptionId, signature) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const body = razorpayPaymentId + '|' + razorpaySubscriptionId;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};

// ============================================================================
// PLAN MANAGEMENT (One-time setup)
// ============================================================================

/**
 * Create a subscription plan (typically done once via dashboard)
 * This endpoint is for programmatic plan creation if needed
 */
razorpayRouter.post('/create-plan', async (req, res) => {
  try {
    const razorpay = getRazorpay();

    const plan = await razorpay.plans.create({
      period: 'monthly',
      interval: 1,
      item: {
        name: 'ResumeCook Pro',
        description: 'Monthly Pro subscription with AI-powered resume features',
        amount: RAZORPAY_CONFIG.amount, // in paise
        currency: RAZORPAY_CONFIG.currency,
      },
    });

    console.log('Plan created:', plan.id);

    res.json({
      success: true,
      planId: plan.id,
      message: 'Plan created successfully. Update RAZORPAY_PLAN_ID env variable with this ID.',
    });
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({
      error: 'Failed to create plan',
      details: error.message,
    });
  }
});

// ============================================================================
// PRICING INFO
// ============================================================================

/**
 * Get pricing information based on currency
 * Frontend uses this to display the correct price
 */
razorpayRouter.get('/pricing', async (req, res) => {
  try {
    const { currency = 'INR' } = req.query;
    const plan = getPlanByCurrency(currency);

    res.json({
      success: true,
      pricing: {
        currency: plan.currency,
        symbol: plan.symbol,
        amount: plan.displayAmount,
        period: 'month',
        planAvailable: !!plan.planId,
      },
      // Also return all available pricing for frontend to cache
      allPricing: {
        INR: {
          currency: 'INR',
          symbol: RAZORPAY_PLANS.INR.symbol,
          amount: RAZORPAY_PLANS.INR.displayAmount,
          period: 'month',
          planAvailable: !!RAZORPAY_PLANS.INR.planId,
        },
        USD: {
          currency: 'USD',
          symbol: RAZORPAY_PLANS.USD.symbol,
          amount: RAZORPAY_PLANS.USD.displayAmount,
          period: 'month',
          planAvailable: !!RAZORPAY_PLANS.USD.planId,
        },
      },
    });
  } catch (error) {
    console.error('Get pricing error:', error);
    res.status(500).json({
      error: 'Failed to get pricing',
      details: error.message,
    });
  }
});

// ============================================================================
// SUBSCRIPTION CREATION
// ============================================================================

/**
 * Create a new subscription for a user
 * Returns subscription details for Razorpay Checkout
 *
 * Supports dual-currency: INR for India, USD for international users
 * Currency is determined by the `currency` parameter from frontend
 */
razorpayRouter.post('/create-subscription', async (req, res) => {
  try {
    const razorpay = getRazorpay();
    const { userId, userEmail, userName, currency = 'INR' } = req.body;

    if (!userId || !userEmail) {
      return res.status(400).json({ error: 'User ID and email are required' });
    }

    // Get the appropriate plan based on currency
    const plan = getPlanByCurrency(currency);
    const planId = plan.planId;

    if (!planId) {
      return res.status(500).json({
        error: `Subscription plan not configured for ${plan.currency}. Please set ${plan.currency === 'USD' ? 'RAZORPAY_PLAN_ID_USD' : 'RAZORPAY_PLAN_ID'}.`,
      });
    }

    const db = initFirebase();

    // Check if user already has an active subscription
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData.subscription?.status === 'active' && !userData.subscription?.isTrial) {
        return res.status(400).json({
          error: 'User already has an active subscription',
          alreadySubscribed: true,
        });
      }
    }

    // Create subscription with the selected plan
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12, // 12 billing cycles (1 year max)
      quantity: 1,
      customer_notify: 1, // Razorpay will send payment links/reminders
      notes: {
        firebaseUserId: userId,
        userEmail: userEmail,
        userName: userName || '',
        currency: plan.currency, // Store currency for reference
      },
    });

    // Store pending subscription in Firebase with currency info
    await db.collection('users').doc(userId).set({
      pendingSubscription: {
        razorpaySubscriptionId: subscription.id,
        status: 'created',
        currency: plan.currency,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    }, { merge: true });

    console.log(`Subscription created for user ${userId}: ${subscription.id} (${plan.currency})`);

    res.json({
      success: true,
      subscriptionId: subscription.id,
      currency: plan.currency,
      // Data needed for Razorpay Checkout
      razorpay: {
        key: process.env.RAZORPAY_KEY_ID,
        subscription_id: subscription.id,
        name: 'ResumeCook',
        description: `Pro Monthly Subscription (${plan.symbol}${plan.displayAmount}/${plan.currency === 'INR' ? 'mo' : 'month'})`,
        prefill: {
          name: userName || '',
          email: userEmail,
        },
        theme: {
          color: '#3B82F6', // Blue theme
        },
        notes: {
          firebaseUserId: userId,
          currency: plan.currency,
        },
      },
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({
      error: 'Failed to create subscription',
      details: error.message,
    });
  }
});

// ============================================================================
// PAYMENT VERIFICATION
// ============================================================================

/**
 * Verify payment after Razorpay Checkout completion
 * Called from frontend after successful payment
 */
razorpayRouter.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      userId,
    } = req.body;

    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature || !userId) {
      return res.status(400).json({
        error: 'Missing required payment verification parameters',
      });
    }

    // Verify signature
    const isValid = verifySubscriptionSignature(
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature
    );

    if (!isValid) {
      console.error('Payment signature verification failed');
      return res.status(400).json({
        error: 'Payment verification failed. Invalid signature.',
        verified: false,
      });
    }

    // Fetch subscription details from Razorpay
    const razorpay = getRazorpay();
    const subscription = await razorpay.subscriptions.fetch(razorpay_subscription_id);

    // Update Firebase with subscription details
    const db = initFirebase();

    // Calculate period dates
    const currentPeriodStart = subscription.current_start
      ? new Date(subscription.current_start * 1000)
      : new Date();
    const currentPeriodEnd = subscription.current_end
      ? new Date(subscription.current_end * 1000)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Default 30 days

    // Get the currency from subscription notes or pending subscription
    const userDoc = await db.collection('users').doc(userId).get();
    const pendingCurrency = userDoc.exists ? userDoc.data()?.pendingSubscription?.currency : null;
    const subscriptionCurrency = subscription.notes?.currency || pendingCurrency || 'INR';

    await db.collection('users').doc(userId).set({
      subscription: {
        status: 'active',
        plan: 'pro',
        razorpayCustomerId: subscription.customer_id || null,
        razorpaySubscriptionId: razorpay_subscription_id,
        razorpayPaymentId: razorpay_payment_id,
        currentPeriodStart: currentPeriodStart,
        currentPeriodEnd: currentPeriodEnd,
        cancelAtPeriodEnd: false,
        isTrial: false, // Paid subscription, not trial
        currency: subscriptionCurrency, // Store the currency used for subscription
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      // Clear pending subscription
      pendingSubscription: admin.firestore.FieldValue.delete(),
    }, { merge: true });

    console.log(`Payment verified and subscription activated for user ${userId}`);

    res.json({
      success: true,
      verified: true,
      message: 'Payment verified successfully. Your Pro subscription is now active!',
      subscription: {
        status: 'active',
        plan: 'pro',
        currentPeriodEnd: currentPeriodEnd,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      error: 'Failed to verify payment',
      details: error.message,
    });
  }
});

// ============================================================================
// SUBSCRIPTION MANAGEMENT
// ============================================================================

/**
 * Get subscription details
 */
razorpayRouter.post('/verify-subscription', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const db = initFirebase();
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.json({ hasActiveSubscription: false, plan: 'free' });
    }

    const userData = userDoc.data();
    const subscription = userData.subscription;

    if (!subscription) {
      return res.json({ hasActiveSubscription: false, plan: 'free' });
    }

    // If it's a trial, check if it's still valid
    if (subscription.isTrial) {
      const trialEndDate = subscription.trialEndDate?.toDate
        ? subscription.trialEndDate.toDate()
        : new Date(subscription.trialEndDate);

      if (new Date() > trialEndDate) {
        // Trial expired
        return res.json({
          hasActiveSubscription: false,
          plan: 'free',
          trialExpired: true,
        });
      }

      return res.json({
        hasActiveSubscription: true,
        plan: 'pro',
        status: 'active',
        isTrial: true,
        trialEndDate: trialEndDate,
        daysRemaining: Math.ceil((trialEndDate - new Date()) / (1000 * 60 * 60 * 24)),
      });
    }

    // For paid subscriptions, verify with Razorpay if we have a subscription ID
    if (subscription.razorpaySubscriptionId) {
      try {
        const razorpay = getRazorpay();
        const razorpaySub = await razorpay.subscriptions.fetch(subscription.razorpaySubscriptionId);

        const isActive = ['active', 'authenticated'].includes(razorpaySub.status);

        // Update local status if it differs
        if (isActive !== (subscription.status === 'active')) {
          await db.collection('users').doc(userId).set({
            subscription: {
              status: isActive ? 'active' : razorpaySub.status,
              plan: isActive ? 'pro' : 'free',
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            },
          }, { merge: true });
        }

        return res.json({
          hasActiveSubscription: isActive,
          plan: isActive ? 'pro' : 'free',
          status: razorpaySub.status,
          currentPeriodEnd: razorpaySub.current_end
            ? new Date(razorpaySub.current_end * 1000)
            : subscription.currentPeriodEnd,
          cancelAtPeriodEnd: razorpaySub.ended_at ? true : false,
        });
      } catch (razorpayError) {
        console.error('Error fetching from Razorpay:', razorpayError);
        // Fall back to local data
      }
    }

    // Return local subscription data
    const isActive = subscription.status === 'active';
    return res.json({
      hasActiveSubscription: isActive,
      plan: isActive ? 'pro' : 'free',
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
    });
  } catch (error) {
    console.error('Verify subscription error:', error);
    res.status(500).json({
      error: 'Failed to verify subscription',
      details: error.message,
    });
  }
});

/**
 * Cancel subscription
 * Handles both paid subscriptions (via Razorpay) and trial subscriptions
 */
razorpayRouter.post('/cancel-subscription', async (req, res) => {
  try {
    const { userId, cancelAtPeriodEnd = true } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const db = initFirebase();
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const subscription = userData.subscription;

    // Check if user has any active subscription (trial or paid)
    if (!subscription || subscription.status !== 'active') {
      return res.status(400).json({ error: 'No active subscription to cancel' });
    }

    // Handle trial cancellation
    if (subscription.isTrial) {
      // For trials, we can either cancel immediately or let it expire naturally
      if (cancelAtPeriodEnd) {
        // Mark trial as cancelled but let it continue until expiry
        await db.collection('users').doc(userId).set({
          subscription: {
            cancelAtPeriodEnd: true,
            cancelRequestedAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        res.json({
          success: true,
          message: 'Trial will end at the scheduled date and will not convert to a paid subscription.',
          cancelAtPeriodEnd: true,
          isTrial: true,
        });
      } else {
        // Cancel trial immediately
        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'cancelled',
            plan: 'free',
            isTrial: false,
            cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        res.json({
          success: true,
          message: 'Trial cancelled immediately.',
          cancelAtPeriodEnd: false,
          isTrial: true,
        });
      }
      return;
    }

    // Handle paid subscription cancellation
    if (!subscription.razorpaySubscriptionId) {
      return res.status(400).json({ error: 'No Razorpay subscription found to cancel' });
    }

    const razorpay = getRazorpay();

    if (cancelAtPeriodEnd) {
      // Cancel at end of billing period (don't charge again but keep access)
      await razorpay.subscriptions.cancel(subscription.razorpaySubscriptionId, {
        cancel_at_cycle_end: 1,
      });

      await db.collection('users').doc(userId).set({
        subscription: {
          cancelAtPeriodEnd: true,
          cancelRequestedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
      }, { merge: true });

      res.json({
        success: true,
        message: 'Subscription will be cancelled at the end of the billing period.',
        cancelAtPeriodEnd: true,
      });
    } else {
      // Cancel immediately
      await razorpay.subscriptions.cancel(subscription.razorpaySubscriptionId);

      await db.collection('users').doc(userId).set({
        subscription: {
          status: 'cancelled',
          plan: 'free',
          cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
      }, { merge: true });

      res.json({
        success: true,
        message: 'Subscription cancelled immediately.',
        cancelAtPeriodEnd: false,
      });
    }
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      error: 'Failed to cancel subscription',
      details: error.message,
    });
  }
});

// ============================================================================
// RAZORPAY WEBHOOK
// ============================================================================

/**
 * Handle Razorpay webhook events
 * Configure webhook URL in Razorpay Dashboard: https://your-domain.com/api/razorpay/webhook
 */
razorpayRouter.post('/webhook', async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('RAZORPAY_WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  try {
    // Verify webhook signature
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const isValid = verifySignature(rawBody, signature, webhookSecret);

    if (!isValid) {
      console.error('Webhook signature verification failed');
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const eventType = event.event;
    const payload = event.payload;

    console.log(`Received Razorpay webhook: ${eventType}`);

    const db = initFirebase();

    // Helper to find Firebase user ID from subscription notes
    const getFirebaseUserId = (subscription) => {
      return subscription?.notes?.firebaseUserId || null;
    };

    switch (eventType) {
      case 'subscription.activated': {
        const subscription = payload.subscription.entity;
        const userId = getFirebaseUserId(subscription);
        if (!userId) break;

        const currentPeriodEnd = subscription.current_end
          ? new Date(subscription.current_end * 1000)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'active',
            plan: 'pro',
            razorpaySubscriptionId: subscription.id,
            razorpayCustomerId: subscription.customer_id,
            currentPeriodStart: subscription.current_start
              ? new Date(subscription.current_start * 1000)
              : new Date(),
            currentPeriodEnd: currentPeriodEnd,
            isTrial: false,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        console.log(`Subscription activated for user: ${userId}`);
        break;
      }

      case 'subscription.charged': {
        // Recurring payment successful
        const subscription = payload.subscription.entity;
        const payment = payload.payment?.entity;
        const userId = getFirebaseUserId(subscription);
        if (!userId) break;

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'active',
            plan: 'pro',
            currentPeriodStart: subscription.current_start
              ? new Date(subscription.current_start * 1000)
              : new Date(),
            currentPeriodEnd: subscription.current_end
              ? new Date(subscription.current_end * 1000)
              : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            lastPaymentId: payment?.id,
            lastPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        console.log(`Subscription charged for user: ${userId}`);
        break;
      }

      case 'subscription.pending': {
        // Payment pending/retry
        const subscription = payload.subscription.entity;
        const userId = getFirebaseUserId(subscription);
        if (!userId) break;

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'past_due',
            paymentPendingAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        console.log(`Subscription pending for user: ${userId}`);
        break;
      }

      case 'subscription.halted': {
        // Subscription halted due to payment failures
        const subscription = payload.subscription.entity;
        const userId = getFirebaseUserId(subscription);
        if (!userId) break;

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'past_due',
            plan: 'free', // Downgrade access
            haltedAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        console.log(`Subscription halted for user: ${userId}`);
        break;
      }

      case 'subscription.cancelled': {
        const subscription = payload.subscription.entity;
        const userId = getFirebaseUserId(subscription);
        if (!userId) break;

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'cancelled',
            plan: 'free',
            cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        console.log(`Subscription cancelled for user: ${userId}`);
        break;
      }

      case 'subscription.completed': {
        // Subscription ended after all cycles
        const subscription = payload.subscription.entity;
        const userId = getFirebaseUserId(subscription);
        if (!userId) break;

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'expired',
            plan: 'free',
            completedAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        console.log(`Subscription completed for user: ${userId}`);
        break;
      }

      case 'payment.failed': {
        // Payment failed
        const payment = payload.payment?.entity;
        const subscriptionId = payment?.subscription_id;
        if (!subscriptionId) break;

        // Fetch subscription to get user ID
        try {
          const razorpay = getRazorpay();
          const subscription = await razorpay.subscriptions.fetch(subscriptionId);
          const userId = getFirebaseUserId(subscription);
          if (!userId) break;

          await db.collection('users').doc(userId).set({
            subscription: {
              status: 'past_due',
              paymentFailedAt: admin.firestore.FieldValue.serverTimestamp(),
              lastFailedPaymentId: payment?.id,
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            },
          }, { merge: true });

          console.log(`Payment failed for user: ${userId}`);
        } catch (e) {
          console.error('Error handling payment.failed:', e);
        }
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// ============================================================================
// TRIAL MANAGEMENT ENDPOINTS (Same as Stripe version)
// ============================================================================

// Get trial availability and remaining count
razorpayRouter.get('/trial-status', async (req, res) => {
  try {
    const db = initFirebase();
    const trialDoc = await db
      .collection(TRIAL_CONFIG.trialCollectionName)
      .doc(TRIAL_CONFIG.trialDocId)
      .get();

    let trialCount = 0;
    if (trialDoc.exists) {
      trialCount = trialDoc.data().trialUsersCount || 0;
    }

    const remaining = Math.max(0, TRIAL_CONFIG.maxTrialUsers - trialCount);
    const isAvailable = remaining > 0;

    res.json({
      success: true,
      trialsAvailable: isAvailable,
      trialsRemaining: remaining,
      maxTrials: TRIAL_CONFIG.maxTrialUsers,
      trialDurationDays: TRIAL_CONFIG.trialDurationDays,
    });
  } catch (error) {
    console.error('Error getting trial status:', error);
    res.status(500).json({
      error: 'Failed to get trial status',
      details: error.message,
    });
  }
});

// Claim a free trial (called on user signup)
razorpayRouter.post('/claim-trial', async (req, res) => {
  try {
    const { userId, userEmail } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const db = initFirebase();

    // Check if user already has a subscription or trial
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData.subscription?.status === 'active' && !userData.subscription?.isTrial) {
        return res.status(400).json({
          error: 'User already has an active subscription',
          alreadySubscribed: true,
        });
      }
      if (userData.trialClaimed) {
        return res.status(400).json({
          error: 'Trial already claimed',
          trialAlreadyClaimed: true,
        });
      }
    }

    // Use a transaction to safely increment the counter and claim trial
    const trialRef = db.collection(TRIAL_CONFIG.trialCollectionName).doc(TRIAL_CONFIG.trialDocId);
    const userRef = db.collection('users').doc(userId);

    const result = await db.runTransaction(async (transaction) => {
      const trialDoc = await transaction.get(trialRef);

      let currentCount = 0;
      if (trialDoc.exists) {
        currentCount = trialDoc.data().trialUsersCount || 0;
      }

      // Check if trials are still available
      if (currentCount >= TRIAL_CONFIG.maxTrialUsers) {
        return { success: false, reason: 'no_trials_available' };
      }

      // Calculate trial end date (7 days from now)
      const trialStartDate = new Date();
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + TRIAL_CONFIG.trialDurationDays);

      // Increment trial counter
      transaction.set(trialRef, {
        trialUsersCount: currentCount + 1,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      // Grant trial to user
      transaction.set(userRef, {
        subscription: {
          status: 'active',
          plan: 'pro',
          isTrial: true,
          trialStartDate: trialStartDate,
          trialEndDate: trialEndDate,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        trialClaimed: true,
        trialClaimedAt: admin.firestore.FieldValue.serverTimestamp(),
        email: userEmail || null,
      }, { merge: true });

      return {
        success: true,
        trialEndDate: trialEndDate,
        trialsRemaining: TRIAL_CONFIG.maxTrialUsers - (currentCount + 1),
      };
    });

    if (!result.success) {
      return res.status(410).json({
        error: 'No free trials available',
        trialsExhausted: true,
      });
    }

    console.log(`Trial claimed by user ${userId}. Remaining: ${result.trialsRemaining}`);

    res.json({
      success: true,
      message: 'Free trial activated!',
      trialEndDate: result.trialEndDate,
      trialDurationDays: TRIAL_CONFIG.trialDurationDays,
      trialsRemaining: result.trialsRemaining,
    });
  } catch (error) {
    console.error('Error claiming trial:', error);
    res.status(500).json({
      error: 'Failed to claim trial',
      details: error.message,
    });
  }
});

// Check and expire trials
razorpayRouter.post('/check-trial-expiry', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const db = initFirebase();
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.json({ trialExpired: false, noUser: true });
    }

    const userData = userDoc.data();
    const subscription = userData.subscription;

    // Check if this is a trial subscription
    if (!subscription?.isTrial) {
      return res.json({ trialExpired: false, notATrial: true });
    }

    // Check if trial has expired
    const trialEndDate = subscription.trialEndDate?.toDate
      ? subscription.trialEndDate.toDate()
      : new Date(subscription.trialEndDate);

    const now = new Date();

    if (now > trialEndDate) {
      // Trial has expired - downgrade to free
      await db.collection('users').doc(userId).set({
        subscription: {
          status: 'expired',
          plan: 'free',
          isTrial: false,
          trialExpiredAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
      }, { merge: true });

      console.log(`Trial expired for user ${userId}`);

      return res.json({
        trialExpired: true,
        message: 'Your free trial has ended. Upgrade to Pro to continue using premium features.',
      });
    }

    // Trial is still active
    const daysRemaining = Math.ceil((trialEndDate - now) / (1000 * 60 * 60 * 24));

    res.json({
      trialExpired: false,
      trialActive: true,
      daysRemaining,
      trialEndDate,
    });
  } catch (error) {
    console.error('Error checking trial expiry:', error);
    res.status(500).json({
      error: 'Failed to check trial expiry',
      details: error.message,
    });
  }
});
