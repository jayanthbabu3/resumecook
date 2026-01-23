# Claude Code Instructions for ResumeCook Frontend

## Project Overview

ResumeCook is a resume builder application with:
- **Frontend**: React + TypeScript + Vite (this project)
- **Backend**: Node.js + Express + MongoDB (at `../resumecook-backend`)

## Local Development

Run both frontend and backend:
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## Architecture - Single Source of Truth

The app follows a "Single Source of Truth" architecture:
- **Profile** (stored in User.profile in MongoDB) is the central data store
- LinkedIn import and resume upload save to Profile automatically
- Resumes sync from Profile using "Sync from Profile" button
- Each resume can customize sections, but data comes from Profile

### Key Services

| Service | Purpose | Location |
|---------|---------|----------|
| `profileService` | Profile CRUD (single source of truth) | `src/v2/services/profileService.ts` |
| `resumeServiceV2` | Resume management | `src/v2/services/resumeServiceV2.ts` |
| `authService` | JWT authentication | `src/services/authService.ts` |
| `api` | Axios instance with token refresh | `src/services/api.ts` |

### API Response Format

Backend always returns: `{ success: boolean, data: T, message?: string }`

```typescript
// Login response
{ success: true, data: { user: User, tokens: { accessToken, refreshToken } } }

// Profile response
{ success: true, data: IUserProfile }
```

## Key Files

| File | Purpose |
|------|---------|
| `src/v2/pages/BuilderV2.tsx` | Main resume builder |
| `src/v2/components/ResumeUploadModal.tsx` | Resume upload with profile sync |
| `src/contexts/AuthContext.tsx` | JWT auth context |
| `src/v2/types/resumeData.ts` | Resume data types |

## Common Tasks

### Adding a new resume section
1. Add type to `src/v2/types/resumeData.ts`
2. Add to `profileService.ts` UserProfile interface
3. Add editor in `BuilderV2.tsx`
4. Add renderer in template components

### Debugging auth issues
1. Check localStorage tokens (`accessToken`, `refreshToken`)
2. Check `api.ts` interceptors
3. Backend endpoint: `/api/auth/refresh-token`

## Environment Variables

### Local Development (.env)
```
VITE_API_BASE_URL=http://localhost:8080
```

### Cloud Run Deployment
**NEVER use `--set-env-vars`** - always use `--update-env-vars` to preserve existing vars.

| Variable | Purpose |
|----------|---------|
| `GROQ_API_KEY` | Groq AI (primary) |
| `OPENAI_API_KEY` | OpenAI (fallback) |
| `APIFY_API_KEY` | LinkedIn import |
| `RAZORPAY_*` | Payments |
| `MONGODB_URI` | MongoDB Atlas connection |

## Important Notes

- Always use `api` instance from `@/services/api` for authenticated requests
- Profile data uses `IUserProfile` type
- Run `npm run build` before deployment to check TypeScript errors
- Backend is MongoDB-based (no Firebase dependency)

---

## Design System Guidelines

This is a SaaS product that requires **consistent, professional, and elegant** design across all pages (except resume templates which have their own themes).

### Color Palette

We use **TWO primary accent colors** throughout the app:

| Color | Tailwind Class | Usage |
|-------|----------------|-------|
| **Primary Blue** | `primary`, `blue-500`, `blue-600` | Brand, CTAs, links, active states |
| **Emerald Green** | `emerald-500`, `emerald-600` | Success states, checkmarks, confirmations |

#### Color Rules

```
✓ ALWAYS use Tailwind classes - NEVER hardcode hex colors
✓ Use "primary" for brand/CTA/interactive elements
✓ Use "emerald-500" ONLY for success indicators and checkmarks
✓ Use "amber" for warnings and trial-related elements
✓ Use "destructive" or "red-600" for destructive actions
✓ Use "gray-*" for neutral text and borders
```

#### Semantic Colors

| Purpose | Color | Example |
|---------|-------|---------|
| Brand/CTA | `text-primary`, `bg-primary` | Buttons, links |
| Success | `text-emerald-500` | Check icons, success messages |
| Warning | `text-amber-600`, `bg-amber-50` | Trial banners, warnings |
| Error | `text-destructive`, `bg-red-50` | Error messages, delete buttons |
| Neutral | `text-foreground`, `text-muted-foreground` | Body text, descriptions |

### Gradients

Use gradients **sparingly** and only with the approved color combinations:

#### Primary Gradient (CTAs, Hero sections)
```tsx
className="bg-gradient-to-r from-primary to-blue-600"
// Or with hover:
className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
```

#### Background Gradients (Subtle, light)
```tsx
// Page backgrounds
className="bg-gradient-to-br from-gray-50 to-white"

// Card hover backgrounds
className="bg-gradient-to-br from-primary/5 to-blue-500/5"
```

#### Icon Background Gradients (Feature cards only)
```tsx
// Blue features
className="bg-gradient-to-br from-primary to-blue-600"

// Green/success features
className="bg-gradient-to-br from-emerald-500 to-green-600"
```

### Typography

**Font Family**: Inter (system-ui fallback)

| Element | Size | Weight | Class |
|---------|------|--------|-------|
| Page Title (H1) | 2xl-4xl | Bold | `text-2xl md:text-4xl font-bold` |
| Section Title (H2) | xl-2xl | Semibold | `text-xl md:text-2xl font-semibold` |
| Card Title (H3) | lg-xl | Semibold | `text-lg font-semibold` |
| Body Text | base | Normal | `text-base` (default) |
| Labels | sm | Medium | `text-sm font-medium` |
| Small/Meta | xs | Normal | `text-xs text-muted-foreground` |

### Components

#### Buttons

**Primary CTA** (main actions):
```tsx
<Button className="bg-primary hover:bg-primary/90 text-white">
  Action
</Button>
// Or with gradient for hero/important CTAs:
<Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
  Action
</Button>
```

**Secondary** (less prominent):
```tsx
<Button variant="outline">Secondary</Button>
```

**Destructive** (delete/danger):
```tsx
<Button variant="destructive">Delete</Button>
```

#### Cards

**Standard Card**:
```tsx
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
  {/* content */}
</div>
```

**Interactive Card** (with hover):
```tsx
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6
               hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer">
  {/* content */}
</div>
```

#### Badges/Status

```tsx
// Success
<Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
  Active
</Badge>

// Warning/Trial
<Badge className="bg-amber-50 text-amber-700 border border-amber-200">
  Trial
</Badge>

// Pro/Premium
<Badge className="bg-gradient-to-r from-primary to-blue-600 text-white">
  Pro
</Badge>

// Neutral
<Badge variant="secondary">Default</Badge>
```

#### Check Icons (Success indicators)
```tsx
// ALWAYS use emerald for success checkmarks
<Check className="h-4 w-4 text-emerald-500" />
```

### Icons

- Use Lucide React icons consistently
- Icon sizes should match text hierarchy:
  - Small (xs text): `h-3 w-3` or `h-3.5 w-3.5`
  - Normal (sm/base text): `h-4 w-4`
  - Large (buttons, headings): `h-5 w-5`
  - Hero/Feature: `h-6 w-6` to `h-8 w-8`

### Spacing

Use Tailwind's spacing scale consistently:
- Section padding: `py-12 md:py-16` or `py-16 md:py-24`
- Card padding: `p-4` to `p-6`
- Element gaps: `gap-2`, `gap-3`, `gap-4`, `gap-6`
- Margin between sections: `space-y-6` to `space-y-8`

### Exceptions

- **Resume Templates**: Can use any colors/themes as they are creative/customizable
- **Third-party brand colors**: LinkedIn (#0077B5), Google OAuth colors are acceptable ONLY in their respective branded buttons/icons
- **Data visualizations**: Charts may use additional colors for clarity

### What NOT to Do

```
✗ Don't hardcode hex colors (use Tailwind classes)
✗ Don't mix emerald for CTAs (emerald = success only)
✗ Don't use purple/violet as brand colors (except resume templates)
✗ Don't create new gradient combinations without approval
✗ Don't vary font weights inconsistently (stick to the typography scale)
✗ Don't use different border-radius values (stick to rounded-xl or rounded-2xl)
```
