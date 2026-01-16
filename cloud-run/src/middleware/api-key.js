/**
 * API Key Authentication Middleware
 *
 * Validates X-API-Key header against configured API keys.
 * This prevents unauthorized use of the API from other websites/servers.
 */

// API keys are stored as comma-separated values in environment variable
// Format: API_KEYS=key1,key2,key3
const getValidApiKeys = () => {
  const keys = process.env.API_KEYS || '';
  return keys.split(',').map(k => k.trim()).filter(k => k.length > 0);
};

/**
 * Middleware to validate API key
 * Expects header: X-API-Key: <your-api-key>
 */
export const validateApiKey = (req, res, next) => {
  // Skip validation for health check endpoint
  if (req.path === '/health') {
    return next();
  }

  // Skip validation for Stripe webhooks (they use their own signature validation)
  if (req.path.includes('/stripe/webhook')) {
    return next();
  }

  const apiKey = req.headers['x-api-key'];
  const validKeys = getValidApiKeys();

  // If no API keys are configured, allow all requests (for development)
  if (validKeys.length === 0) {
    console.warn('⚠️  No API_KEYS configured - API is open to all requests');
    return next();
  }

  // Check if API key is provided
  if (!apiKey) {
    console.warn(`🚫 Missing API key from origin: ${req.headers.origin || 'unknown'}`);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing API key. Include X-API-Key header in your request.',
    });
  }

  // Validate API key
  if (!validKeys.includes(apiKey)) {
    console.warn(`🚫 Invalid API key attempt: ${apiKey.substring(0, 8)}... from origin: ${req.headers.origin || 'unknown'}`);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid API key.',
    });
  }

  // API key is valid
  next();
};

/**
 * Generate a random API key
 * Run this command to generate new keys:
 * node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */
export const generateApiKey = async () => {
  const crypto = await import('crypto');
  return crypto.randomBytes(32).toString('hex');
};
