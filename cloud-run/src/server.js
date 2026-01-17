/**
 * ResumeCook API Server
 *
 * Express.js server for Google Cloud Run deployment.
 * Replaces Netlify Functions with proper timeout support (up to 60 minutes).
 *
 * Architecture:
 * - Express.js for routing and middleware
 * - Native Puppeteer for PDF generation (no @sparticuz/chromium hack)
 * - Multi-provider AI fallback (Gemini > Groq > Claude > OpenAI)
 * - Razorpay integration for payments (India-focused)
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// Import security middleware
import { validateApiKey } from './middleware/api-key.js';
import { standardLimiter, aiLimiter, pdfLimiter } from './middleware/rate-limit.js';

// Import routes
import { enhanceResumeRouter } from './routes/enhance-resume.js';
import { parseResumeRouter } from './routes/parse-resume.js';
import { generateResumeRouter } from './routes/generate-resume-from-job.js';
import { tailorResumeRouter } from './routes/tailor-resume-for-job.js';
import { chatRouter } from './routes/chat-with-resume.js';
import { generatePdfRouter } from './routes/generate-pdf.js';
import { atsScoreRouter } from './routes/ats-score.js';
import { razorpayRouter } from './routes/razorpay.js';
import { linkedinRouter } from './routes/linkedin-import.js';

const app = express();
const PORT = process.env.PORT || 8080;

// =============================================================================
// Middleware
// =============================================================================

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, // We handle this manually
}));

// Compression for responses
app.use(compression());

// Parse JSON bodies (50MB limit for large resumes)
app.use(express.json({ limit: '50mb' }));

// CORS configuration
const allowedOrigins = [
  'https://resumecook.com',
  'https://www.resumecook.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:8080',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-razorpay-signature', 'X-API-Key'],
}));

// =============================================================================
// Security Middleware
// =============================================================================

// API Key validation (validates X-API-Key header)
app.use(validateApiKey);

// Global rate limiting (applies to all routes)
app.use(standardLimiter);

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// =============================================================================
// Health Check Endpoint
// =============================================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// =============================================================================
// API Routes
// =============================================================================

// AI Enhancement routes (with stricter rate limiting for expensive AI calls)
app.use('/api/enhance-resume', aiLimiter, enhanceResumeRouter);
app.use('/api/parse-resume', aiLimiter, parseResumeRouter);
app.use('/api/generate-resume-from-job', aiLimiter, generateResumeRouter);
app.use('/api/tailor-resume-for-job', aiLimiter, tailorResumeRouter);
app.use('/api/chat-with-resume', aiLimiter, chatRouter);

// PDF Generation (resource intensive, separate rate limit)
app.use('/api/generate-pdf', pdfLimiter, generatePdfRouter);

// ATS Score Analysis (uses AI)
app.use('/api/ats-score', aiLimiter, atsScoreRouter);

// Razorpay Payment routes
app.use('/api/razorpay', razorpayRouter);

// LinkedIn Import
app.use('/api/linkedin-import', linkedinRouter);

// =============================================================================
// Legacy Netlify-style routes (for backward compatibility during migration)
// These will be removed once frontend is updated
// =============================================================================

app.use('/.netlify/functions/enhance-resume', enhanceResumeRouter);
app.use('/.netlify/functions/parse-resume', parseResumeRouter);
app.use('/.netlify/functions/generate-resume-from-job', generateResumeRouter);
app.use('/.netlify/functions/tailor-resume-for-job', tailorResumeRouter);
app.use('/.netlify/functions/chat-with-resume', chatRouter);
app.use('/.netlify/functions/generate-pdf', generatePdfRouter);
app.use('/.netlify/functions/ats-score', atsScoreRouter);
app.use('/.netlify/functions/linkedin-import', linkedinRouter);

// =============================================================================
// Error Handling
// =============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// =============================================================================
// Server Startup
// =============================================================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                    ResumeCook API Server                       ║
╠═══════════════════════════════════════════════════════════════╣
║  Status:     Running                                           ║
║  Port:       ${PORT}                                              ║
║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(44)}║
╠═══════════════════════════════════════════════════════════════╣
║  Endpoints:                                                    ║
║  • POST /api/enhance-resume      - AI resume enhancement       ║
║  • POST /api/parse-resume        - Resume parsing              ║
║  • POST /api/generate-resume-from-job - Generate from JD       ║
║  • POST /api/tailor-resume-for-job   - Tailor for job          ║
║  • POST /api/chat-with-resume    - AI chat assistant           ║
║  • POST /api/generate-pdf        - PDF generation              ║
║  • POST /api/ats-score           - ATS compatibility score     ║
║  • POST /api/razorpay/*          - Payment endpoints           ║
║  • POST /api/linkedin-import     - LinkedIn import             ║
║  • GET  /health                  - Health check                ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

export default app;
