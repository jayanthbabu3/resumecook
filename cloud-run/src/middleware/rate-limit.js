/**
 * Rate Limiting Middleware
 *
 * Prevents abuse by limiting requests per IP address.
 * Uses a simple in-memory store (resets on server restart).
 * For production scale, consider using Redis.
 */

// In-memory store for rate limiting
const requestCounts = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requestCounts.entries()) {
    if (now - data.windowStart > data.windowMs) {
      requestCounts.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Create rate limiter middleware
 * @param {Object} options - Rate limiting options
 * @param {number} options.windowMs - Time window in milliseconds (default: 15 minutes)
 * @param {number} options.max - Maximum requests per window (default: 100)
 * @param {string} options.message - Custom error message
 */
export const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // 100 requests per window
    message = 'Too many requests, please try again later.',
  } = options;

  return (req, res, next) => {
    // Skip rate limiting for health checks
    if (req.path === '/health') {
      return next();
    }

    // Get client identifier (IP address or forwarded IP)
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
                     req.connection?.remoteAddress ||
                     req.ip ||
                     'unknown';

    const now = Date.now();
    const key = `${clientIp}:${req.path}`;

    let clientData = requestCounts.get(key);

    if (!clientData || now - clientData.windowStart > windowMs) {
      // New window
      clientData = {
        count: 1,
        windowStart: now,
        windowMs,
      };
      requestCounts.set(key, clientData);
    } else {
      // Increment count in current window
      clientData.count++;
    }

    // Set rate limit headers
    const remaining = Math.max(0, max - clientData.count);
    const resetTime = new Date(clientData.windowStart + windowMs);

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', resetTime.toISOString());

    // Check if limit exceeded
    if (clientData.count > max) {
      console.warn(`🚫 Rate limit exceeded for ${clientIp} on ${req.path}`);
      return res.status(429).json({
        error: 'Too Many Requests',
        message,
        retryAfter: Math.ceil((clientData.windowStart + windowMs - now) / 1000),
      });
    }

    next();
  };
};

/**
 * Pre-configured rate limiters for different endpoint types
 */

// Standard API endpoints (100 requests per 15 minutes)
export const standardLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// AI endpoints (more expensive, lower limit: 30 requests per 15 minutes)
export const aiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: 'AI request limit exceeded. Please wait before making more AI requests.',
});

// PDF generation (resource intensive: 20 per 15 minutes)
export const pdfLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'PDF generation limit exceeded. Please wait before generating more PDFs.',
});

// Strict limiter for authentication attempts (10 per 15 minutes)
export const strictLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many attempts. Please try again later.',
});
