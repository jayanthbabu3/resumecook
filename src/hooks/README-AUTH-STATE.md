# Authentication State Management Guide

## Problem
UI elements were flashing different states (sign in → upgrade → pro) when pages loaded because components were rendering before authentication and subscription status were fully loaded.

## Solution
Use the `useAuthState` hook which provides proper loading state management.

## Usage

### ❌ BAD - Causes UI Flashing
```tsx
const MyComponent = () => {
  const { user } = useAuth();
  const { isPro } = useSubscription();

  // This renders immediately, showing wrong state
  return (
    <div>
      {!user && <SignInButton />}
      {user && !isPro && <UpgradeButton />}
      {user && isPro && <ProBadge />}
    </div>
  );
};
```

### ✅ GOOD - No UI Flashing
```tsx
import { useAuthState } from '@/hooks/useAuthState';

const MyComponent = () => {
  const { isLoading, isGuest, needsUpgrade, isProUser } = useAuthState();

  // Don't show auth-dependent UI while loading
  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <div>
      {isGuest && <SignInButton />}
      {needsUpgrade && <UpgradeButton />}
      {isProUser && <ProBadge />}
    </div>
  );
};
```

## Available Properties

### Loading States
- `isLoading` - True while auth or subscription is loading
- `isReady` - True when safe to show UI (inverse of isLoading)

### User States
- `user` - User object or null
- `isAuthenticated` - User is logged in
- `isAdmin` - User has admin role

### Subscription States
- `isPro` - User has active pro subscription or trial
- `isTrial` - User is on trial
- `trialDaysRemaining` - Days left in trial

### Common Patterns (only true when isReady)
- `isGuest` - Not logged in
- `isFreeTier` - Logged in but not pro
- `isProUser` - Logged in with pro/trial
- `isTrialUser` - Logged in with active trial
- `needsUpgrade` - Logged in but needs to upgrade

## Component Examples

### Header Component
```tsx
const Header = () => {
  const { isLoading, isGuest, needsUpgrade, isProUser } = useAuthState();

  return (
    <header>
      {isLoading ? (
        <div className="h-9 w-20 bg-gray-100 rounded animate-pulse" />
      ) : (
        <>
          {isGuest && <SignInButton />}
          {needsUpgrade && <UpgradeButton />}
          {isProUser && <UserMenu />}
        </>
      )}
    </header>
  );
};
```

### Trial Banner
```tsx
const TrialBanner = () => {
  const { isLoading, isTrialUser, trialDaysRemaining } = useAuthState();

  // Don't show anything while loading
  if (isLoading) return null;

  // Only show for trial users
  if (!isTrialUser) return null;

  return <Banner days={trialDaysRemaining} />;
};
```

### Pro Feature Gate
```tsx
const ProFeature = () => {
  const { isLoading, isProUser } = useAuthState();

  if (isLoading) {
    return <FeatureSkeleton />;
  }

  if (!isProUser) {
    return <UpgradePrompt />;
  }

  return <ActualFeature />;
};
```

## Migration Guide

1. Replace direct usage of `useAuth()` and `useSubscription()` with `useAuthState()`
2. Add loading checks before rendering auth-dependent UI
3. Use the pre-computed patterns (isGuest, needsUpgrade, etc.) for cleaner code

## Rules

1. **Always check `isLoading`** before rendering auth-dependent UI
2. **Never show auth UI during loading** - use placeholders or return null
3. **Use pre-computed patterns** instead of checking `user && !isPro` manually
4. **Components should be loading-aware** - every component that shows user state should handle loading