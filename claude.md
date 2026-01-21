# Claude Code Instructions for ResumeCook

## Local Development

Run both frontend and backend with a single command:
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

The frontend proxies `/api/*` requests to the backend automatically.

## Environment Variables - CRITICAL

**NEVER remove or overwrite existing environment variables in Cloud Run.**

When deploying to Cloud Run:
1. Always use `--update-env-vars` to ADD/UPDATE variables (preserves existing)
2. Never use `--set-env-vars` (this REPLACES all variables)
3. Check existing env vars before deployment with:
   ```bash
   gcloud run services describe resumecook-api --region us-central1 --format="yaml(spec.template.spec.containers[0].env)"
   ```

### Required Environment Variables in Cloud Run

| Variable | Purpose | Required |
|----------|---------|----------|
| `GROQ_API_KEY` | Groq AI (primary) | Yes (at least one AI key) |
| `OPENAI_API_KEY` | OpenAI (fallback) | Recommended |
| `ANTHROPIC_API_KEY` | Claude API | Optional |
| `GEMINI_API_KEY` | Google Gemini | Optional |
| `APIFY_API_KEY` | LinkedIn import | Required for LinkedIn |
| `RAZORPAY_KEY_ID` | Payments | Required for subscriptions |
| `RAZORPAY_KEY_SECRET` | Payments | Required for subscriptions |
| `RAZORPAY_WEBHOOK_SECRET` | Payment webhooks | Required for subscriptions |
| `RAZORPAY_PLAN_ID` | Subscription plan | Required for subscriptions |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Firestore access | Required |

### Adding New Environment Variables

```bash
gcloud run services update resumecook-api --region us-central1 --update-env-vars "KEY=value"
```

### Multiple Variables at Once

```bash
gcloud run services update resumecook-api --region us-central1 --update-env-vars "KEY1=value1,KEY2=value2"
```

## AI Provider Priority

Current priority order (defined in `cloud-run/src/utils/ai-providers.js`):
1. Groq (free, fast)
2. OpenAI (paid, reliable)
3. Claude (paid)
4. Gemini (free tier)

## Deployment

Use `cloud-run/deploy.sh` - it preserves existing environment variables.

If env vars are missing after deployment, use `cloud-run/set-env-vars.sh` to restore them.
