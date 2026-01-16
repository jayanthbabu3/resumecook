/**
 * API Configuration
 *
 * All API calls go to Cloud Run backend.
 * Configure VITE_API_BASE_URL and VITE_API_KEY in .env
 */

// Cloud Run API base URL (required)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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
  // AI Enhancement endpoints
  enhanceResume: `${API_BASE_URL}/api/enhance-resume`,
  parseResume: `${API_BASE_URL}/api/parse-resume`,
  generateResumeFromJob: `${API_BASE_URL}/api/generate-resume-from-job`,
  tailorResumeForJob: `${API_BASE_URL}/api/tailor-resume-for-job`,
  chatWithResume: `${API_BASE_URL}/api/chat-with-resume`,

  // PDF Generation
  generatePdf: `${API_BASE_URL}/api/generate-pdf`,

  // ATS Score
  atsScore: `${API_BASE_URL}/api/ats-score`,

  // Stripe Payment endpoints
  createCheckoutSession: `${API_BASE_URL}/api/stripe/create-checkout-session`,
  customerPortal: `${API_BASE_URL}/api/stripe/customer-portal`,
  verifySubscription: `${API_BASE_URL}/api/stripe/verify-subscription`,

  // LinkedIn Import
  linkedinImport: `${API_BASE_URL}/api/linkedin-import`,
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
 * Get headers for API requests (includes API key)
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

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('[API Config]', {
    baseUrl: API_BASE_URL || '(NOT SET!)',
    hasApiKey: !!API_KEY,
    sampleEndpoint: API_ENDPOINTS.enhanceResume,
  });
}
