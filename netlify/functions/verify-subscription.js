/**
 * Verify Subscription Status
 *
 * Checks Stripe for active subscription and returns the data.
 * The client will update Firebase with the returned data.
 * This approach works without Firebase Admin SDK configuration.
 */

const handler = async (event) => {
  // Allowed origins for CORS
  const allowedOrigins = [
    "https://resumecook.com",
    "https://www.resumecook.com",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
  ];

  const origin = event.headers?.origin || event.headers?.Origin || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const corsHeaders = {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Stripe not configured" }),
    };
  }

  const Stripe = require("stripe");
  const stripe = new Stripe(stripeSecretKey);

  try {
    const requestData = JSON.parse(event.body || "{}");
    const { userId, userEmail } = requestData;

    if (!userId || !userEmail) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "User ID and email are required" }),
      };
    }

    console.log(`Verifying subscription for user: ${userId}, email: ${userEmail}`);

    // Find customer by email in Stripe
    const customers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });

    if (customers.data.length === 0) {
      console.log("No Stripe customer found for email:", userEmail);
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          success: true,
          subscription: { status: "free", plan: "free" },
          message: "No subscription found",
        }),
      };
    }

    const customer = customers.data[0];
    console.log("Found Stripe customer:", customer.id);

    // Get active subscriptions for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      // Check for any subscription (including past_due, trialing, etc.)
      const allSubscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        limit: 1,
      });

      if (allSubscriptions.data.length === 0) {
        console.log("No subscriptions found for customer:", customer.id);
        return {
          statusCode: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({
            success: true,
            subscription: {
              status: "free",
              plan: "free",
              stripeCustomerId: customer.id
            },
            message: "No active subscription",
          }),
        };
      }

      // Has a subscription but not active
      const sub = allSubscriptions.data[0];
      const subscriptionData = {
        status: sub.status === "past_due" ? "past_due" : "cancelled",
        plan: "free",
        stripeCustomerId: customer.id,
        stripeSubscriptionId: sub.id,
        currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString(),
      };

      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          success: true,
          subscription: subscriptionData,
          message: `Subscription status: ${sub.status}`,
        }),
      };
    }

    // Has active subscription!
    const subscription = subscriptions.data[0];
    console.log("Found active subscription:", subscription.id);

    const subscriptionData = {
      status: "active",
      plan: "pro",
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };

    console.log(`Pro subscription verified for user: ${userId}`);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        subscription: subscriptionData,
        message: "Pro subscription active!",
      }),
    };

  } catch (error) {
    console.error("Verify subscription error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to verify subscription",
        details: errorMessage,
      }),
    };
  }
};

module.exports = { handler };
