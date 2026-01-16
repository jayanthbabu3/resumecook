# =============================================================================
# ResumeCook API - Cloud Run Dockerfile
# =============================================================================
# This Dockerfile creates a production-ready container for Google Cloud Run
# with full Puppeteer/Chromium support for PDF generation.
#
# Key features:
# - Node.js 20 LTS for modern JavaScript features
# - Full Chromium installation for PDF generation
# - Multi-stage build for smaller final image
# - Non-root user for security
# =============================================================================

# Stage 1: Build dependencies
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev || npm install --omit=dev

# =============================================================================
# Stage 2: Production image
# =============================================================================
FROM node:20-slim

# Install Chromium and dependencies for Puppeteer
# This is the key difference from Netlify - we can install full Chromium!
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    fonts-noto-color-emoji \
    fonts-noto-cjk \
    libgbm1 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copy built dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY src ./src
COPY package*.json ./

# Set ownership to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port (Cloud Run uses PORT env variable)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "fetch('http://localhost:8080/health').then(r => process.exit(r.ok ? 0 : 1))"

# Start the server
CMD ["node", "src/server.js"]
