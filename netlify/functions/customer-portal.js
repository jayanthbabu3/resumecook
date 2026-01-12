/**
 * Stripe Customer Portal Session Creator
 *
 * Creates a Stripe Customer Portal session for users to:
 * - View subscription details
 * - Update payment method
 * - Cancel subscription
 * - View invoices
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY not configured");
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Payment service not configured" }),
    };
  }

  try {
    const requestData = JSON.parse(event.body || "{}");
    const { stripeCustomerId, returnUrl } = requestData;

    if (!stripeCustomerId) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Stripe customer ID is required" }),
      };
    }

    // Determine return URL
    const baseUrl = origin || "https://resumecook.com";
    const finalReturnUrl = returnUrl || `${baseUrl}/profile`;

    // Create Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: finalReturnUrl,
    });

    console.log(`Customer portal session created for: ${stripeCustomerId}`);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        url: session.url,
      }),
    };

  } catch (error) {
    console.error("Customer portal error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to create portal session",
        details: errorMessage,
      }),
    };
  }
};

module.exports = { handler };
