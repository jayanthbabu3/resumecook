#!/bin/bash

# ResumeCook API - Quick Deploy Script
# Usage: ./deploy.sh
#
# IMPORTANT: Environment variables are managed in Google Cloud Console.
# This script preserves existing env vars during deployment.
# To add/update env vars, use: gcloud run services update resumecook-api --update-env-vars KEY=VALUE

set -e

echo "🚀 Deploying ResumeCook API to Cloud Run..."
echo ""

cd "$(dirname "$0")"

# Check if service exists and get current env vars
SERVICE_EXISTS=$(gcloud run services describe resumecook-api --region us-central1 --format="value(status.url)" 2>/dev/null || echo "")

if [ -n "$SERVICE_EXISTS" ]; then
    echo "📋 Existing service found. Preserving environment variables..."

    # Deploy with source - Cloud Run preserves env vars from previous revision by default
    # when using --source deployment
    gcloud run deploy resumecook-api \
        --source . \
        --region us-central1 \
        --allow-unauthenticated \
        --memory 1Gi \
        --cpu 1 \
        --timeout 120s
else
    echo "📦 New service deployment..."
    gcloud run deploy resumecook-api \
        --source . \
        --region us-central1 \
        --allow-unauthenticated \
        --memory 1Gi \
        --cpu 1 \
        --timeout 120s
fi

echo ""
echo "✅ Deployment complete!"
echo "🔗 URL: https://resumecook-api-70255328091.us-central1.run.app"
echo ""
echo "📝 To update environment variables:"
echo "   gcloud run services update resumecook-api --region us-central1 --update-env-vars KEY=VALUE"
echo ""
echo "📝 Current environment variables:"
gcloud run services describe resumecook-api --region us-central1 --format="yaml(spec.template.spec.containers[0].env)" 2>/dev/null || echo "   (run 'gcloud auth login' to view)"
echo ""
echo "Test with: curl https://resumecook-api-70255328091.us-central1.run.app/health"
