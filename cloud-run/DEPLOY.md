# ResumeCook API - Deployment Guide

## Quick Deploy Command

```bash
cd cloud-run && gcloud run deploy resumecook-api --source . --region us-central1 --allow-unauthenticated
```

## Why Deployments Are Slow

Each deployment:
1. Uploads source code to Google Cloud
2. Builds Docker image from scratch (~5-8 min)
3. Deploys to Cloud Run (~1-2 min)

**Total: ~7-10 minutes per deployment**

---

## Faster Deployment Options

### Option 1: Use the Deploy Script (Recommended)

```bash
# From project root
./cloud-run/deploy.sh
```

### Option 2: Skip Rebuild (If Only Env Vars Changed)

```bash
gcloud run services update resumecook-api \
    --region us-central1 \
    --set-env-vars "KEY=value"
```

### Option 3: Local Docker Build + Push (Faster for Code Changes)

```bash
# Build locally (faster on your machine)
cd cloud-run
docker build -t gcr.io/resumecook-484507/resumecook-api:latest .

# Push to registry
docker push gcr.io/resumecook-484507/resumecook-api:latest

# Deploy from registry (no rebuild)
gcloud run deploy resumecook-api \
    --image gcr.io/resumecook-484507/resumecook-api:latest \
    --region us-central1 \
    --allow-unauthenticated
```

---

## Current Configuration

| Setting | Value |
|---------|-------|
| **Project** | `resumecook-484507` |
| **Service** | `resumecook-api` |
| **Region** | `us-central1` |
| **URL** | `https://resumecook-api-70255328091.us-central1.run.app` |
| **Memory** | 1GB |
| **CPU** | 1 |
| **Timeout** | 120 seconds |

---

## Environment Variables

These are set in Cloud Run (not in code):

```
NODE_ENV=production
GEMINI_API_KEY=xxx
GROQ_API_KEY=xxx
OPENAI_API_KEY=xxx
STRIPE_SECRET_KEY=xxx
STRIPE_WEBHOOK_SECRET=xxx
STRIPE_PRICE_ID_INR=xxx
VITE_FIREBASE_PROJECT_ID=xxx
API_KEYS=xxx  # Comma-separated list of valid API keys
```

---

## API Security

The API is protected by:

### 1. API Key Authentication
- All requests must include `X-API-Key` header
- Set `API_KEYS` env var with comma-separated keys on Cloud Run
- Set `VITE_API_KEY` in frontend `.env` file

### 2. Rate Limiting
- **Standard endpoints**: 100 requests per 15 minutes per IP
- **AI endpoints**: 30 requests per 15 minutes per IP (expensive operations)
- **PDF generation**: 20 requests per 15 minutes per IP (resource intensive)

### 3. CORS
- Only allowed origins can make requests (see `server.js`)

### Generating a New API Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Adding New API Keys
```bash
# Get current keys first
gcloud run services describe resumecook-api --region us-central1 --format='value(spec.template.spec.containers[0].env)'

# Add new key (comma-separated if multiple)
gcloud run services update resumecook-api \
    --region us-central1 \
    --set-env-vars "API_KEYS=key1,key2,key3"
```

### Update Env Vars Only (No Rebuild)

```bash
gcloud run services update resumecook-api \
    --region us-central1 \
    --set-env-vars "NEW_KEY=new_value"
```

---

## Common Commands

### Check Service Status
```bash
gcloud run services describe resumecook-api --region us-central1
```

### View Logs
```bash
gcloud run services logs read resumecook-api --region us-central1 --limit 50
```

### Stream Logs (Live)
```bash
gcloud run services logs tail resumecook-api --region us-central1
```

### Test Health
```bash
curl https://resumecook-api-70255328091.us-central1.run.app/health
```

### Delete Service (Caution!)
```bash
gcloud run services delete resumecook-api --region us-central1
```

---

## Troubleshooting

### CORS Errors
Add the origin to `cloud-run/src/server.js` in `allowedOrigins` array, then redeploy.

### Timeout Errors
Increase timeout:
```bash
gcloud run services update resumecook-api --region us-central1 --timeout 300s
```

### Memory Errors
Increase memory:
```bash
gcloud run services update resumecook-api --region us-central1 --memory 2Gi
```

### Cold Start Issues
Set minimum instances:
```bash
gcloud run services update resumecook-api --region us-central1 --min-instances 1
```

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/api/enhance-resume` | POST | AI enhancement |
| `/api/parse-resume` | POST | Parse PDF/DOCX |
| `/api/tailor-resume-for-job` | POST | Tailor for job |
| `/api/generate-resume-from-job` | POST | Generate from JD |
| `/api/chat-with-resume` | POST | AI chat |
| `/api/generate-pdf` | POST | PDF generation |
| `/api/ats-score` | POST | ATS analysis |
| `/api/stripe/*` | POST | Payment endpoints |
| `/api/linkedin-import` | POST | LinkedIn import |
