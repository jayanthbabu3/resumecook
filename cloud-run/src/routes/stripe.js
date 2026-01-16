/**
 * Stripe Payment Routes
 *
 * Handles all Stripe payment operations:
 * - Create checkout session
 * - Customer portal
 * - Verify subscription
 * - Webhook handler
 */

import { Router } from 'express';
import Stripe from 'stripe';
import admin from 'firebase-admin';

export const stripeRouter = Router();

// Initialize Stripe
const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
  return new Stripe(key);
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

// Create Checkout Session
stripeRouter.post('/create-checkout-session', async (req, res) => {
  try {
    const stripe = getStripe();
    const { userId, userEmail, region, successUrl, cancelUrl } = req.body;

    if (!userId || !userEmail) {
      return res.status(400).json({ error: 'User ID and email are required' });
    }

    const priceId = process.env.STRIPE_PRICE_ID_INR;
    if (!priceId) {
      return res.status(500).json({ error: 'Pricing not configured' });
    }

    // Find or create customer
    let customerId;
    const existingCustomers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: { firebaseUserId: userId },
      });
      customerId = customer.id;
    }

    // Determine URLs
    const origin = req.headers.origin || 'https://resumecook.com';
    const finalSuccessUrl = successUrl || `${origin}/profile?subscription=success`;
    const finalCancelUrl = cancelUrl || `${origin}/pricing?subscription=cancelled`;

    // Create session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: { firebaseUserId: userId, region: region || 'us' },
      subscription_data: { metadata: { firebaseUserId: userId } },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: { name: 'auto', address: 'auto' },
    });

    console.log(`Checkout session created for user ${userId}: ${session.id}`);

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      details: error.message,
    });
  }
});

// Customer Portal
stripeRouter.post('/customer-portal', async (req, res) => {
  try {
    const stripe = getStripe();
    const { customerId, returnUrl } = req.body;

    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    const origin = req.headers.origin || 'https://resumecook.com';
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${origin}/profile`,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Customer portal error:', error);
    res.status(500).json({
      error: 'Failed to create portal session',
      details: error.message,
    });
  }
});

// Verify Subscription
stripeRouter.post('/verify-subscription', async (req, res) => {
  try {
    const stripe = getStripe();
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

    if (!subscription?.stripeSubscriptionId) {
      return res.json({ hasActiveSubscription: false, plan: 'free' });
    }

    // Verify with Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    );

    const isActive = ['active', 'trialing'].includes(stripeSubscription.status);

    res.json({
      hasActiveSubscription: isActive,
      plan: isActive ? 'pro' : 'free',
      status: stripeSubscription.status,
      currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    });
  } catch (error) {
    console.error('Verify subscription error:', error);
    res.status(500).json({
      error: 'Failed to verify subscription',
      details: error.message,
    });
  }
});

// Stripe Webhook
stripeRouter.post('/webhook', async (req, res) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  const stripe = getStripe();
  const db = initFirebase();

  let event;

  try {
    const signature = req.headers['stripe-signature'];
    // For webhooks, we need the raw body
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  console.log(`Received Stripe webhook: ${event.type}`);

  const getFirebaseUserId = async (customerId) => {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return customer.metadata?.firebaseUserId || null;
    } catch (error) {
      console.error('Error retrieving customer:', error);
      return null;
    }
  };

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.firebaseUserId;
        if (!userId) break;

        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'active',
            plan: 'pro',
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });

        console.log(`Pro subscription activated for user: ${userId}`);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        let userId = subscription.metadata?.firebaseUserId;
        if (!userId) userId = await getFirebaseUserId(subscription.customer);
        if (!userId) break;

        let status = 'inactive';
        if (['active', 'trialing'].includes(subscription.status)) {
          status = 'active';
        } else if (subscription.status === 'past_due') {
          status = 'past_due';
        } else if (['canceled', 'unpaid'].includes(subscription.status)) {
          status = 'cancelled';
        }

        await db.collection('users').doc(userId).set({
          subscription: {
            status,
            plan: status === 'active' ? 'pro' : 'free',
            stripeSubscriptionId: subscription.id,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        let userId = subscription.metadata?.firebaseUserId;
        if (!userId) userId = await getFirebaseUserId(subscription.customer);
        if (!userId) break;

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'cancelled',
            plan: 'free',
            stripeSubscriptionId: null,
            cancelAtPeriodEnd: false,
            cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        if (invoice.billing_reason !== 'subscription_cycle') break;

        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        let userId = subscription.metadata?.firebaseUserId;
        if (!userId) userId = await getFirebaseUserId(invoice.customer);
        if (!userId) break;

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'active',
            plan: 'pro',
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            lastPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        if (!invoice.subscription) break;

        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        let userId = subscription.metadata?.firebaseUserId;
        if (!userId) userId = await getFirebaseUserId(invoice.customer);
        if (!userId) break;

        await db.collection('users').doc(userId).set({
          subscription: {
            status: 'past_due',
            paymentFailedAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        }, { merge: true });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});
