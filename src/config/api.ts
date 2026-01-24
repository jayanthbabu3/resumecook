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
  // Streaming endpoint for real-time progress
  enhanceSectionsStream: `${API_BASE_URL}/api/enhance-sections/stream`,
  // Non-streaming endpoints
  enhanceSectionsBatch: `${API_BASE_URL}/api/enhance-sections/batch`,
  enhanceSections: `${API_BASE_URL}/api/enhance-sections/enhance`,
  parseResume: `${API_BASE_URL}/api/ai/parse-resume`,
  generateResumeFromJob: `${API_BASE_URL}/api/ai/generate-from-job`,
  tailorResumeForJob: `${API_BASE_URL}/api/ai/tailor-for-job`,
  chatWithResume: `${API_BASE_URL}/api/ai/chat`,
  chatWithResumeV2: `${API_BASE_URL}/api/ai/chat-v2`,
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

// Token refresh state
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Attempt to refresh the access token
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = data.data.tokens;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('[API] Token refresh failed:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
}

/**
 * Wrapper around fetch that automatically includes API key and handles token refresh
 * Use this instead of native fetch for all API calls
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = getApiHeaders(
    options.headers as Record<string, string> || {}
  );

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If 401, try to refresh the token and retry
  if (response.status === 401) {
    // Prevent multiple simultaneous refresh attempts
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken();
    }

    const newToken = await refreshPromise;
    isRefreshing = false;
    refreshPromise = null;

    if (newToken) {
      // Retry the request with the new token
      const newHeaders = {
        ...headers,
        'Authorization': `Bearer ${newToken}`,
      };

      response = await fetch(url, {
        ...options,
        headers: newHeaders,
      });
    }
  }

  return response;
}

