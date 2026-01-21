#!/bin/bash

# ResumeCook API - Environment Variable Setup Script
# Usage: ./set-env-vars.sh
#
# This script sets/updates environment variables in Cloud Run WITHOUT removing existing ones.
# Run this after deploy.sh if you need to add new API keys.

set -e

SERVICE_NAME="resumecook-api"
REGION="us-central1"

echo "=========================================="
echo "ResumeCook API - Environment Variables"
echo "=========================================="
echo ""

# Show current env vars
echo "Current environment variables:"
gcloud run services describe $SERVICE_NAME --region $REGION --format="yaml(spec.template.spec.containers[0].env)" 2>/dev/null || echo "  (service not found or not authenticated)"
echo ""

# Prompt for API keys (empty means keep existing)
echo "Enter API keys (press Enter to skip/keep existing):"
echo ""

read -p "GROQ_API_KEY: " GROQ_KEY
read -p "OPENAI_API_KEY: " OPENAI_KEY
read -p "ANTHROPIC_API_KEY (Claude): " ANTHROPIC_KEY
read -p "GEMINI_API_KEY: " GEMINI_KEY
read -p "APIFY_API_KEY (LinkedIn import): " APIFY_KEY

# Build the update command
UPDATE_VARS=""

if [ -n "$GROQ_KEY" ]; then
    UPDATE_VARS="$UPDATE_VARS,GROQ_API_KEY=$GROQ_KEY"
fi

if [ -n "$OPENAI_KEY" ]; then
    UPDATE_VARS="$UPDATE_VARS,OPENAI_API_KEY=$OPENAI_KEY"
fi

if [ -n "$ANTHROPIC_KEY" ]; then
    UPDATE_VARS="$UPDATE_VARS,ANTHROPIC_API_KEY=$ANTHROPIC_KEY"
fi

if [ -n "$GEMINI_KEY" ]; then
    UPDATE_VARS="$UPDATE_VARS,GEMINI_API_KEY=$GEMINI_KEY"
fi

if [ -n "$APIFY_KEY" ]; then
    UPDATE_VARS="$UPDATE_VARS,APIFY_API_KEY=$APIFY_KEY"
fi

# Remove leading comma
UPDATE_VARS="${UPDATE_VARS#,}"

if [ -z "$UPDATE_VARS" ]; then
    echo ""
    echo "No changes to make. Exiting."
    exit 0
fi

echo ""
echo "Updating environment variables..."

# Use --update-env-vars to ADD/UPDATE without removing existing
gcloud run services update $SERVICE_NAME \
    --region $REGION \
    --update-env-vars "$UPDATE_VARS"

echo ""
echo "Environment variables updated!"
echo ""
echo "New environment variables:"
gcloud run services describe $SERVICE_NAME --region $REGION --format="yaml(spec.template.spec.containers[0].env)"
