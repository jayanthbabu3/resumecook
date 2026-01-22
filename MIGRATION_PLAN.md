# Frontend Migration Plan: Firebase to MongoDB Backend

## Overview
Migrate from Firebase (Auth + Firestore) to a fully controlled Node.js backend with MongoDB.

**Frontend Branch:** `feature/mongodb-backend`
**Backend Location:** `/Users/jayanth/Desktop/jayanth-projects/resumecook-backend/`

---

## Current Status: ✅ CORE MIGRATION COMPLETE

The build passes (`npm run build` ✅). Core services and contexts have been migrated.

---

## Backend Status: ✅ COMPLETE

| Feature | Status | Endpoint |
|---------|--------|----------|
| Auth (Register/Login/Refresh) | ✅ | `/api/auth/*` |
| Google OAuth | ✅ | `/api/auth/google` |
| Password Reset | ✅ | `/api/auth/forgot-password`, `/api/auth/reset-password` |
| User Profile | ✅ | `/api/users/*` |
| Resume CRUD | ✅ | `/api/resumes/*` |
| Resume Versions | ✅ | `/api/resumes/:id/versions/*` |
| Resume Sharing | ✅ | `/api/resumes/:id/share`, `/api/resumes/public/:slug` |
| AI Enhance | ✅ | `/api/ai/enhance-resume` |
| ATS Scoring | ✅ | `/api/ai/ats-score` |
| Chat with Resume | ✅ | `/api/ai/chat` |
| LinkedIn Import | ✅ | `/api/linkedin/import` |
| Feedback (User + Admin) | ✅ | `/api/feedback/*` |
| Admin Dashboard | ✅ | `/api/admin/*` |
| Payments (Razorpay) | ✅ | `/api/payments/*` |
| Trial Management | ✅ | `/api/payments/trial-status`, `/api/payments/claim-trial` |

---

## Frontend Migration Status

### ✅ COMPLETED - New Service Layer

| File | Purpose | Status |
|------|---------|--------|
| `src/services/api.ts` | Axios client with JWT interceptors | ✅ |
| `src/services/authService.ts` | Auth API calls | ✅ |
| `src/services/resumeService.ts` | Resume CRUD API | ✅ |
| `src/services/aiService.ts` | AI features API | ✅ |
| `src/services/subscriptionService.ts` | Payments/trial API | ✅ |
| `src/services/linkedinService.ts` | LinkedIn import API | ✅ |
| `src/services/feedbackService.ts` | Feedback API | ✅ |
| `src/services/adminService.ts` | Admin dashboard API | ✅ |
| `src/services/index.ts` | Central exports | ✅ |

### ✅ COMPLETED - New Contexts & Hooks

| File | Purpose | Status |
|------|---------|--------|
| `src/contexts/AuthContext.tsx` | JWT-based auth (replaces Firebase) | ✅ |
| `src/hooks/useResumes.ts` | React Query hooks for resumes | ✅ |
| `src/hooks/useSubscriptionNew.ts` | Subscription hooks | ✅ |
| `src/hooks/useAI.ts` | AI feature hooks | ✅ |
| `src/hooks/useLinkedIn.ts` | LinkedIn import hook | ✅ |
| `src/hooks/useFeedback.ts` | Feedback hooks | ✅ |
| `src/hooks/useAdmin.ts` | Admin hooks | ✅ |

### ✅ COMPLETED - Updated Core Files

| File | Changes | Status |
|------|---------|--------|
| `src/App.tsx` | Uses new AuthContext | ✅ |
| `src/pages/Auth.tsx` | Uses `useAuth()` | ✅ |
| `src/pages/AuthCallback.tsx` | Handles JWT tokens from OAuth | ✅ |
| `src/pages/Pricing.tsx` | Uses new subscription hooks | ✅ |
| `src/components/Header.tsx` | Uses `useAuth()` + new subscription | ✅ |
| `src/components/ProtectedRoute.tsx` | Uses `useAuth()` | ✅ |
| `src/components/AdminRoute.tsx` | Uses `useAuth()` | ✅ |
| `vite.config.ts` | Proxy config fixed | ✅ |
| `.env.local` | API URL + Razorpay key | ✅ |

### ⚠️ REMAINING - Files Still Using Firebase

These files still import Firebase but will work because:
1. The new `AuthContext.tsx` exports `useFirebaseAuth` as an alias to `useAuth()`
2. Pages using these will be gradually migrated

| File | Priority | Notes |
|------|----------|-------|
| `src/v2/pages/BuilderV2.tsx` | High | Main resume builder |
| `src/v2/pages/DashboardV2.tsx` | High | Main dashboard |
| `src/v2/pages/ScratchBuilderV2.tsx` | High | Scratch builder |
| `src/v2/pages/ProfilePageV2.tsx` | Medium | Profile page |
| `src/v2/pages/AccountSettings.tsx` | Medium | Account settings |
| `src/v2/services/resumeServiceV2.ts` | High | Still uses Firestore |
| `src/v2/services/profileService.ts` | Medium | Still uses Firestore |
| `src/pages/MyResumes.tsx` | Low | Legacy page |
| `src/pages/Profile.tsx` | Low | Legacy page |
| `src/pages/ScratchBuilder.tsx` | Low | Legacy page |
| `src/hooks/useFirebaseAuth.tsx` | - | Keep for backward compat |
| `src/lib/firestore/*.ts` | - | Keep until full migration |

---

## Running the Stack

### Option 1: Single Command (Recommended)
```bash
cd /Users/jayanth/Desktop/jayanth-projects/resumewithjayanth
npm run dev
```
This runs both frontend (5173) and backend (8080) via concurrently.

### Option 2: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd /Users/jayanth/Desktop/jayanth-projects/resumecook-backend
npm run dev
# Runs on http://localhost:8080
```

**Terminal 2 - Frontend:**
```bash
cd /Users/jayanth/Desktop/jayanth-projects/resumewithjayanth
npm run dev:frontend
# Runs on http://localhost:5173
```

---

## Environment Variables

### Backend (.env) - REQUIRED

```bash
# Server
NODE_ENV=development
PORT=8080

# MongoDB - REQUIRED
MONGODB_URI=mongodb://localhost:27017/resumecook

# JWT - Use strong secrets in production
JWT_SECRET=your-strong-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth - REQUIRED for Google Sign-in
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback

# AI Providers - At least one required
GROQ_API_KEY=your-groq-key           # Free, recommended
OPENAI_API_KEY=your-openai-key       # Optional
ANTHROPIC_API_KEY=your-anthropic-key # Optional
GEMINI_API_KEY=your-gemini-key       # Optional

# Razorpay - REQUIRED for payments
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_PLAN_ID=your-plan-id

# Apify - REQUIRED for LinkedIn import
APIFY_API_KEY=your-apify-key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local) - Already configured
```bash
VITE_API_BASE_URL="http://localhost:8080"
VITE_RAZORPAY_KEY_ID="rzp_test_S5112ifBbwLBTQ"
```

---

## User Checklist

### 1. Prerequisites

- [ ] Install MongoDB locally or have a MongoDB Atlas URI
- [ ] Have Google Cloud Console project with OAuth credentials
- [ ] Have Razorpay test/live keys
- [ ] Have at least one AI provider API key (Groq is free)
- [ ] Have Apify API key (for LinkedIn import)

### 2. Backend Setup

```bash
# Navigate to backend
cd /Users/jayanth/Desktop/jayanth-projects/resumecook-backend

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env  # If not already done
# Edit .env with your actual keys
```

### 3. Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB (macOS)
brew install mongodb-community
brew services start mongodb-community

# Verify it's running
mongosh --eval "db.version()"
```

**Option B: MongoDB Atlas**
- Create a free cluster at https://www.mongodb.com/atlas
- Get connection string
- Update `MONGODB_URI` in backend `.env`

### 4. Google OAuth Setup

1. Go to https://console.cloud.google.com/
2. Create or select a project
3. Go to "APIs & Services" > "Credentials"
4. Create "OAuth 2.0 Client ID" (Web application)
5. Add authorized redirect URI: `http://localhost:8080/api/auth/google/callback`
6. Copy Client ID and Client Secret to backend `.env`

### 5. Start Development

```bash
# From frontend directory
cd /Users/jayanth/Desktop/jayanth-projects/resumewithjayanth

# Start both frontend and backend
npm run dev
```

### 6. Test Each Feature

| Feature | How to Test | Expected Result |
|---------|-------------|-----------------|
| Google Sign-in | Click "Continue with Google" on login page | Should redirect and create account |
| Resume List | Go to /dashboard after login | Should show empty or existing resumes |
| Create Resume | Click "New Resume" | Should create and redirect to builder |
| AI Enhance | Open resume, click "Enhance" | Should show AI suggestions |
| ATS Score | Open resume, click "ATS Score" | Should show score and feedback |
| Subscription | Go to /pricing, click "Upgrade" | Should open Razorpay checkout |
| Free Trial | On pricing page, click "Start Trial" | Should activate 21-day trial |

---

## API Endpoint Reference

### Auth
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (invalidate refresh token)
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Initiate Google OAuth
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Resumes
- `GET /api/resumes` - List user's resumes
- `POST /api/resumes` - Create resume
- `GET /api/resumes/:id` - Get resume by ID
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/duplicate` - Duplicate resume
- `POST /api/resumes/:id/share` - Enable sharing
- `DELETE /api/resumes/:id/share` - Disable sharing
- `GET /api/resumes/public/:slug` - Get shared resume

### AI Features
- `POST /api/ai/enhance-resume` - Enhance resume content
- `POST /api/ai/ats-score` - Get ATS compatibility score
- `POST /api/ai/chat` - Chat with resume assistant

### Payments
- `GET /api/payments/subscription-status` - Get subscription status
- `POST /api/payments/claim-trial` - Claim free trial
- `POST /api/payments/create-subscription` - Create Razorpay subscription
- `POST /api/payments/verify-payment` - Verify payment
- `POST /api/payments/cancel-subscription` - Cancel subscription

### LinkedIn
- `POST /api/linkedin/import` - Import from LinkedIn URL

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/my` - Get user's feedback
- `GET /api/feedback/:id` - Get feedback detail

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `GET /api/admin/feedback` - List all feedback

---

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `brew services list | grep mongodb`
- Check connection string in `.env`

### "Google OAuth not working"
- Verify callback URL matches exactly
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Ensure OAuth consent screen is configured

### "AI features return errors"
- Ensure at least one AI provider key is set
- Check API key validity
- Groq is recommended (free tier available)

### "Razorpay checkout not opening"
- Verify RAZORPAY_KEY_ID is set in both frontend and backend
- Verify RAZORPAY_KEY_SECRET is set in backend
- Ensure test mode keys are used for development

### "CORS errors"
- Verify FRONTEND_URL in backend `.env` matches frontend URL
- Check proxy configuration in `vite.config.ts`

---

## Next Steps (Future Migrations)

These V2 pages still use Firebase SDK directly and should be migrated to use the new API services:

1. `src/v2/pages/BuilderV2.tsx` - Update to use `useResumes` hook
2. `src/v2/pages/DashboardV2.tsx` - Update to use `useResumes` hook
3. `src/v2/services/resumeServiceV2.ts` - Replace Firestore with API calls
4. `src/v2/services/profileService.ts` - Replace Firestore with API calls

The app will work with current migration, but full Firestore removal requires these updates.
