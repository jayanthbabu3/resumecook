# ResumeCook API - Google Cloud Run Setup Guide

This guide walks you through setting up Google Cloud Run from scratch for the ResumeCook API.

## Prerequisites

- Google account (Gmail works)
- Credit card (for verification - you won't be charged with free tier)
- 15-20 minutes for initial setup

---

## Step 1: Create Google Cloud Account

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Click **"Get started for free"**
3. Sign in with your Google account
4. Complete the billing setup (required, but free tier won't charge you)
5. You get **$300 free credits** for 90 days!

---

## Step 2: Create a New Project

1. In Google Cloud Console, click the project dropdown (top left)
2. Click **"New Project"**
3. Enter project name: `resumecook-api`
4. Click **"Create"**
5. Wait for project creation, then select it

---

## Step 3: Enable Required APIs

Run these commands in Cloud Shell (click the terminal icon in top right):

```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry
gcloud services enable containerregistry.googleapis.com

# Enable Cloud Build (for CI/CD)
gcloud services enable cloudbuild.googleapis.com

# Enable Secret Manager (for environment variables)
gcloud services enable secretmanager.googleapis.com
```

---

## Step 4: Install Google Cloud CLI (Local Development)

### macOS
```bash
brew install google-cloud-sdk
```

### Windows
Download from: https://cloud.google.com/sdk/docs/install

### Linux
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### Authenticate
```bash
gcloud auth login
gcloud config set project resumecook-api
```

---

## Step 5: Set Up Environment Variables as Secrets

Cloud Run uses Secret Manager for sensitive data.

### Create Secrets

```bash
# Navigate to cloud-run folder
cd cloud-run

# Create secrets (you'll be prompted to enter values)
echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets create GEMINI_API_KEY --data-file=-
echo -n "YOUR_GROQ_API_KEY" | gcloud secrets create GROQ_API_KEY --data-file=-
echo -n "YOUR_STRIPE_SECRET_KEY" | gcloud secrets create STRIPE_SECRET_KEY --data-file=-
echo -n "YOUR_STRIPE_WEBHOOK_SECRET" | gcloud secrets create STRIPE_WEBHOOK_SECRET --data-file=-
echo -n "YOUR_STRIPE_PRICE_ID_INR" | gcloud secrets create STRIPE_PRICE_ID_INR --data-file=-

# For Firebase service account (save JSON to file first)
gcloud secrets create FIREBASE_SERVICE_ACCOUNT_KEY --data-file=./firebase-service-account.json
```

### Grant Cloud Run Access to Secrets

```bash
# Get the compute service account
PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')

# Grant access
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
    --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"

# Repeat for other secrets...
```

---

## Step 6: Deploy to Cloud Run

### Option A: Deploy from Source (Recommended for first deploy)

```bash
cd cloud-run

# Deploy directly from source
gcloud run deploy resumecook-api \
    --source . \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 1Gi \
    --cpu 1 \
    --timeout 120s \
    --set-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest,GROQ_API_KEY=GROQ_API_KEY:latest,STRIPE_SECRET_KEY=STRIPE_SECRET_KEY:latest,STRIPE_WEBHOOK_SECRET=STRIPE_WEBHOOK_SECRET:latest,STRIPE_PRICE_ID_INR=STRIPE_PRICE_ID_INR:latest,FIREBASE_SERVICE_ACCOUNT_KEY=FIREBASE_SERVICE_ACCOUNT_KEY:latest"
```

### Option B: Build and Deploy with Docker

```bash
# Build locally
docker build -t gcr.io/resumecook-api/resumecook-api:latest .

# Push to Container Registry
docker push gcr.io/resumecook-api/resumecook-api:latest

# Deploy
gcloud run deploy resumecook-api \
    --image gcr.io/resumecook-api/resumecook-api:latest \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 1Gi \
    --timeout 120s
```

---

## Step 7: Get Your API URL

After deployment, Cloud Run will show your URL:

```
Service [resumecook-api] revision [resumecook-api-00001-xxx] has been deployed
and is serving 100 percent of traffic.

Service URL: https://resumecook-api-xxxxxxxxxx-uc.a.run.app
```

**Save this URL!** You'll need it for the frontend.

---

## Step 8: Test Your Deployment

```bash
# Health check
curl https://resumecook-api-xxxxxxxxxx-uc.a.run.app/health

# Should return:
# {"status":"healthy","timestamp":"...","version":"1.0.0","environment":"production"}
```

---

## Step 9: Update Frontend API URL

Create or edit `src/config/api.ts`:

```typescript
// API Configuration
const API_BASE_URL = import.meta.env.PROD
  ? 'https://resumecook-api-xxxxxxxxxx-uc.a.run.app'  // Your Cloud Run URL
  : '';  // Empty for local development (uses Vite proxy)

export const API_ENDPOINTS = {
  enhanceResume: `${API_BASE_URL}/api/enhance-resume`,
  parseResume: `${API_BASE_URL}/api/parse-resume`,
  generateResumeFromJob: `${API_BASE_URL}/api/generate-resume-from-job`,
  tailorResumeForJob: `${API_BASE_URL}/api/tailor-resume-for-job`,
  chatWithResume: `${API_BASE_URL}/api/chat-with-resume`,
  generatePdf: `${API_BASE_URL}/api/generate-pdf`,
  atsScore: `${API_BASE_URL}/api/ats-score`,
  createCheckoutSession: `${API_BASE_URL}/api/stripe/create-checkout-session`,
  customerPortal: `${API_BASE_URL}/api/stripe/customer-portal`,
  verifySubscription: `${API_BASE_URL}/api/stripe/verify-subscription`,
  linkedinImport: `${API_BASE_URL}/api/linkedin-import`,
};
```

---

## Step 10: Update Stripe Webhook URL

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://resumecook-api-xxxxxxxxxx-uc.a.run.app/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook signing secret and update in Secret Manager

---

## Cost Estimation

### Free Tier (Monthly)
- **CPU**: 180,000 vCPU-seconds (~50 hours)
- **Memory**: 360,000 GiB-seconds
- **Requests**: 2 million
- **Network**: 1 GB to North America

### Your Usage (Estimated)
- 1,000 users/month: **FREE**
- 10,000 users/month: **~$10-15**
- 100,000 users/month: **~$100-150**

---

## Monitoring

View logs and metrics:

```bash
# Stream logs
gcloud run services logs tail resumecook-api --region us-central1

# View in console
# https://console.cloud.google.com/run?project=resumecook-api
```

---

## Troubleshooting

### Cold Starts
If first request is slow, set minimum instances:

```bash
gcloud run services update resumecook-api \
    --min-instances 1 \
    --region us-central1
```

### Memory Issues
Increase memory for PDF generation:

```bash
gcloud run services update resumecook-api \
    --memory 2Gi \
    --region us-central1
```

### Timeout Issues
Increase timeout (max 60 minutes):

```bash
gcloud run services update resumecook-api \
    --timeout 300s \
    --region us-central1
```

---

## CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: [main]
    paths:
      - 'cloud-run/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: google-github-actions/setup-gcloud@v2
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: resumecook-api

      - name: Deploy to Cloud Run
        run: |
          cd cloud-run
          gcloud run deploy resumecook-api \
            --source . \
            --region us-central1 \
            --allow-unauthenticated
```

---

## Next Steps

1. ✅ Deploy API to Cloud Run
2. ⬜ Update frontend to use new API URL
3. ⬜ Update Stripe webhook URL
4. ⬜ Test all endpoints
5. ⬜ Remove Netlify functions (optional, can keep as backup)

---

## Support

- Cloud Run Docs: https://cloud.google.com/run/docs
- Pricing Calculator: https://cloud.google.com/products/calculator
- Status Page: https://status.cloud.google.com
