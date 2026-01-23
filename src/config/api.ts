/**
 * API Configuration
 *
 * All API calls go to Cloud Run backend.
 * Configure VITE_API_BASE_URL and VITE_API_KEY in .env
 */

// Cloud Run API base URL (required)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// API Key for authentication (prevents unauthorized API usage)
const API_KEY = import.meta.env.VITE_API_KEY || '';

// Validate configuration
if (!API_BASE_URL) {
  console.error('[API Config] VITE_API_BASE_URL is not set! API calls will fail.');
}

/**
 * API Endpoints - All routes on Cloud Run
 */
export const API_ENDPOINTS = {
  // AI Enhancement endpoints (mounted at /api/ai)
  enhanceResume: `${API_BASE_URL}/api/ai/enhance-resume`,
  parseResume: `${API_BASE_URL}/api/ai/parse-resume`,
  generateResumeFromJob: `${API_BASE_URL}/api/ai/generate-from-job`,
  tailorResumeForJob: `${API_BASE_URL}/api/ai/tailor-for-job`,
  chatWithResume: `${API_BASE_URL}/api/ai/chat`,
  atsScore: `${API_BASE_URL}/api/ai/ats-score`,

  // PDF Generation
  generatePdf: `${API_BASE_URL}/api/generate-pdf`,

  // Razorpay Payment endpoints (mounted at /api/payments)
  createSubscription: `${API_BASE_URL}/api/payments/create-subscription`,
  verifyPayment: `${API_BASE_URL}/api/payments/verify-payment`,
  cancelSubscription: `${API_BASE_URL}/api/payments/cancel-subscription`,
  getPricing: `${API_BASE_URL}/api/payments/pricing`,
  subscriptionStatus: `${API_BASE_URL}/api/payments/subscription-status`,

  // Trial endpoints
  trialStatus: `${API_BASE_URL}/api/payments/trial-status`,
  claimTrial: `${API_BASE_URL}/api/payments/claim-trial`,
  checkTrialExpiry: `${API_BASE_URL}/api/payments/check-trial-expiry`,

  // LinkedIn Import (mounted at /api/linkedin)
  linkedinImport: `${API_BASE_URL}/api/linkedin/import`,
};

/**
 * Get the appropriate endpoint URL
 */
export function getApiEndpoint(endpoint: keyof typeof API_ENDPOINTS): string {
  return API_ENDPOINTS[endpoint];
}

/**
 * Get the API base URL
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

/**
 * Get headers for API requests (includes API key and auth token)
 */
export function getApiHeaders(additionalHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  // Add API key header if configured
  if (API_KEY) {
    headers['X-API-Key'] = API_KEY;
  }

  // Add auth token if available
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
}

/**
 * Wrapper around fetch that automatically includes API key
 * Use this instead of native fetch for all API calls
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = getApiHeaders(
    options.headers as Record<string, string> || {}
  );

  return fetch(url, {
    ...options,
    headers,
  });
}

