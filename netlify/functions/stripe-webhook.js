/**
 * Stripe Webhook Handler
 *
 * Handles Stripe webhook events for subscription lifecycle:
 * - checkout.session.completed: New subscription created
 * - customer.subscription.updated: Subscription changed
 * - customer.subscription.deleted: Subscription cancelled
 * - invoice.payment_succeeded: Renewal payment successful
 * - invoice.payment_failed: Payment failed
 *
 * Updates Firebase Firestore with subscription status.
 */

const handler = async (event) => {
  // Webhooks should only be POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Webhook secret not configured" }),
    };
  }

  if (!stripeSecretKey) {
    console.error("STRIPE_SECRET_KEY not configured");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Stripe not configured" }),
    };
  }

  // Initialize Stripe inside handler (after env vars are loaded)
  const Stripe = require("stripe");
  const stripe = new Stripe(stripeSecretKey);

  // Firebase Admin SDK for server-side Firestore updates
  const admin = require("firebase-admin");

  // Initialize Firebase Admin (if not already initialized)
  if (!admin.apps.length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : null;

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.VITE_FIREBASE_PROJECT_ID || "resumecook-90f81",
      });
    } else {
      admin.initializeApp({
        projectId: process.env.VITE_FIREBASE_PROJECT_ID || "resumecook-90f81",
      });
    }
  }

  const db = admin.firestore();

  // Helper to get Firebase user ID from Stripe customer
  const getFirebaseUserIdFromCustomer = async (customerId) => {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return customer.metadata?.firebaseUserId || null;
    } catch (error) {
      console.error("Error retrieving customer:", error);
      return null;
    }
  };

  // Handle successful checkout - activate Pro subscription
  const handleCheckoutCompleted = async (session) => {
    const firebaseUserId = session.metadata?.firebaseUserId;

    if (!firebaseUserId) {
      console.error("No Firebase user ID in checkout session metadata");
      return;
    }

    console.log(`Checkout completed for user: ${firebaseUserId}`);

    // Get subscription details
    const subscriptionId = session.subscription;
    const customerId = session.customer;

    // Fetch subscription to get end date
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Update Firestore
    await db.collection("users").doc(firebaseUserId).set({
      subscription: {
        status: "active",
        plan: "pro",
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    }, { merge: true });

    console.log(`Pro subscription activated for user: ${firebaseUserId}`);
  };

  // Handle subscription updates (plan changes, renewals, etc.)
  const handleSubscriptionUpdate = async (subscription) => {
    let userId = subscription.metadata?.firebaseUserId;

    if (!userId) {
      // Try to get user ID from customer metadata
      userId = await getFirebaseUserIdFromCustomer(subscription.customer);
    }

    if (!userId) {
      console.error("Could not determine Firebase user ID for subscription update");
      return;
    }

    console.log(`Subscription updated for user: ${userId}, status: ${subscription.status}`);

    // Map Stripe status to our status
    let status = "inactive";
    if (subscription.status === "active" || subscription.status === "trialing") {
      status = "active";
    } else if (subscription.status === "past_due") {
      status = "past_due";
    } else if (subscription.status === "canceled" || subscription.status === "unpaid") {
      status = "cancelled";
    }

    await db.collection("users").doc(userId).set({
      subscription: {
        status: status,
        plan: status === "active" ? "pro" : "free",
        stripeSubscriptionId: subscription.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    }, { merge: true });
  };

  // Handle subscription deletion (cancelled and expired)
  const handleSubscriptionDeleted = async (subscription) => {
    const userId = subscription.metadata?.firebaseUserId ||
      await getFirebaseUserIdFromCustomer(subscription.customer);

    if (!userId) {
      console.error("Could not determine Firebase user ID for subscription deletion");
      return;
    }

    console.log(`Subscription deleted for user: ${userId}`);

    await db.collection("users").doc(userId).set({
      subscription: {
        status: "cancelled",
        plan: "free",
        stripeSubscriptionId: null,
        cancelAtPeriodEnd: false,
        cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    }, { merge: true });
  };

  // Handle successful payment (renewal)
  const handlePaymentSucceeded = async (invoice) => {
    if (invoice.billing_reason !== "subscription_cycle") {
      // Not a renewal, skip
      return;
    }

    const subscriptionId = invoice.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const userId = subscription.metadata?.firebaseUserId ||
      await getFirebaseUserIdFromCustomer(invoice.customer);

    if (!userId) {
      console.error("Could not determine Firebase user ID for payment success");
      return;
    }

    console.log(`Renewal payment succeeded for user: ${userId}`);

    await db.collection("users").doc(userId).set({
      subscription: {
        status: "active",
        plan: "pro",
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        lastPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    }, { merge: true });
  };

  // Handle failed payment
  const handlePaymentFailed = async (invoice) => {
    const subscriptionId = invoice.subscription;

    if (!subscriptionId) {
      return;
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const userId = subscription.metadata?.firebaseUserId ||
      await getFirebaseUserIdFromCustomer(invoice.customer);

    if (!userId) {
      console.error("Could not determine Firebase user ID for payment failure");
      return;
    }

    console.log(`Payment failed for user: ${userId}`);

    await db.collection("users").doc(userId).set({
      subscription: {
        status: "past_due",
        paymentFailedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    }, { merge: true });
  };

  let stripeEvent;

  try {
    // Verify webhook signature
    const signature = event.headers["stripe-signature"];
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    };
  }

  console.log(`Received Stripe webhook: ${stripeEvent.type}`);

  try {
    switch (stripeEvent.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(stripeEvent.data.object);
        break;

      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(stripeEvent.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(stripeEvent.data.object);
        break;

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(stripeEvent.data.object);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(stripeEvent.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };

  } catch (error) {
    console.error("Error processing webhook:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Webhook processing failed" }),
    };
  }
};

module.exports = { handler };
