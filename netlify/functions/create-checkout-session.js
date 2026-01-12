/**
 * Stripe Checkout Session Creator
 *
 * Creates a Stripe Checkout session for Pro subscription.
 * Supports regional pricing (INR for India, USD for rest).
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

  // Check Stripe configuration
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error("STRIPE_SECRET_KEY not configured");
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Payment service not configured" }),
    };
  }

  // Initialize Stripe inside handler (after env vars are loaded)
  const Stripe = require("stripe");
  const stripe = new Stripe(stripeSecretKey);

  try {
    const requestData = JSON.parse(event.body || "{}");
    const { userId, userEmail, region, successUrl, cancelUrl } = requestData;

    console.log("Checkout request:", { userId, userEmail, region });

    // Validate required fields
    if (!userId || !userEmail) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "User ID and email are required" }),
      };
    }

    // For Indian Stripe accounts, we can only use INR pricing
    // Indian regulations require registered businesses for international payments
    // Using INR price for all customers
    const priceId = process.env.STRIPE_PRICE_ID_INR;

    console.log("Using price ID:", priceId, "(INR only due to Stripe India regulations)");

    if (!priceId) {
      console.error("Price ID not configured for region:", region);
      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Pricing not configured for your region" }),
      };
    }

    // Check if customer already exists in Stripe
    let customerId;
    const existingCustomers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
      console.log("Found existing Stripe customer:", customerId);
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          firebaseUserId: userId,
        },
      });
      customerId = customer.id;
      console.log("Created new Stripe customer:", customerId);
    }

    // Determine URLs
    const baseUrl = origin || "https://resumecook.com";
    const finalSuccessUrl = successUrl || `${baseUrl}/profile?subscription=success`;
    const finalCancelUrl = cancelUrl || `${baseUrl}/pricing?subscription=cancelled`;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: {
        firebaseUserId: userId,
        region: region || "us",
      },
      subscription_data: {
        metadata: {
          firebaseUserId: userId,
        },
      },
      // Allow promotion codes
      allow_promotion_codes: true,
      // Billing address collection - REQUIRED for Stripe India compliance
      billing_address_collection: "required",
      // Customer name collection - REQUIRED for Stripe India compliance
      customer_update: {
        name: "auto",
        address: "auto",
      },
    });

    console.log(`Checkout session created for user ${userId}: ${session.id}`);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        sessionId: session.id,
        url: session.url,
      }),
    };

  } catch (error) {
    console.error("Checkout session error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to create checkout session",
        details: errorMessage,
      }),
    };
  }
};

module.exports = { handler };
