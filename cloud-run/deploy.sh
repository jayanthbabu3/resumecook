#!/bin/bash

# ResumeCook API - Quick Deploy Script
# Usage: ./deploy.sh

set -e

echo "🚀 Deploying ResumeCook API to Cloud Run..."
echo ""

cd "$(dirname "$0")"

# Deploy
gcloud run deploy resumecook-api \
    --source . \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 1Gi \
    --cpu 1 \
    --timeout 120s

echo ""
echo "✅ Deployment complete!"
echo "🔗 URL: https://resumecook-api-70255328091.us-central1.run.app"
echo ""
echo "Test with: curl https://resumecook-api-70255328091.us-central1.run.app/health"
