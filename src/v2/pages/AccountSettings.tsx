/**
 * Account Settings Page
 * Clean, compact design
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscriptionNew';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Crown,
  User,
  ChevronRight,
  Check,
  Loader2,
  Zap,
  LogOut,
  ArrowLeft,
  Clock,
  XCircle,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

// Detect user's currency based on locale/timezone
function detectCurrency(): 'INR' | 'USD' {
  try {
    // Check timezone for India
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone?.includes('Kolkata') || timezone?.includes('Calcutta')) {
      return 'INR';
    }

    // Check locale for India
    const locale = navigator.language || (navigator as any).userLanguage || '';
    if (locale.includes('IN') || locale.includes('hi')) {
      return 'INR';
    }

    // Default to USD for international users
    return 'USD';
  } catch {
    return 'USD';
  }
}

// Price display based on currency
const PRICES = {
  INR: { amount: 169, symbol: '₹', display: '₹169/mo' },
  USD: { amount: 9, symbol: '$', display: '$9/mo' },
};

// Google icon
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut, updateUserProfile, loading: authLoading } = useAuth();
  const {
    status: subscription,
    isLoading: subscriptionLoading,
    isPro,
    isTrial,
    trialDaysRemaining,
    startCheckout,
    cancelSubscription,
    isCancelling,
  } = useSubscription();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Auto-detect currency based on user's country
  const currency = useMemo(() => detectCurrency(), []);
  const priceInfo = PRICES[currency];

  const handleUpdateName = useCallback(async () => {
    if (!fullName.trim() || fullName === user?.fullName) return;
    setIsUpdating(true);
    try {
      await updateUserProfile({ fullName: fullName.trim() });
      toast.success('Name updated');
    } catch {
      toast.error('Failed to update');
    } finally {
      setIsUpdating(false);
    }
  }, [fullName, user?.fullName, updateUserProfile]);

  const handleUpgrade = useCallback(async () => {
    try {
      await startCheckout(currency);
    } catch {
      toast.error('Failed to start checkout');
    }
  }, [startCheckout, currency]);

  const handleCancel = useCallback(() => {
    cancelSubscription();
    setShowCancelDialog(false);
  }, [cancelSubscription]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      navigate('/');
    } catch {
      toast.error('Failed to sign out');
    }
  }, [signOut, navigate]);

  const userInitials = user?.fullName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || user?.email?.slice(0, 2).toUpperCase() || 'U';

  // Show loading state while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  // Only show sign-in required after auth loading is complete
  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="text-center px-4">
            <User className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Sign in required</h1>
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Account */}
          <div className="lg:col-span-2 space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.profilePhoto || undefined} />
                  <AvatarFallback className={cn(
                    'text-white font-semibold text-lg',
                    isPro ? 'bg-gradient-to-br from-primary to-blue-600' : 'bg-gray-400'
                  )}>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl font-semibold text-gray-900 truncate">
                      {user.fullName || user.email}
                    </h1>
                    {isPro && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary to-blue-600 text-white">
                        <Crown className="w-3 h-3" />
                        {isTrial ? 'Trial' : 'Pro'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <GoogleIcon />
                    <span>Google Account</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Settings - Inline */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">Display Name</label>
                  <div className="flex gap-2">
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleUpdateName}
                      disabled={isUpdating || !fullName.trim() || fullName === user?.fullName}
                      size="sm"
                      variant="outline"
                    >
                      {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                    </Button>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">Email</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200 h-10 flex items-center">
                    {user.email}
                  </div>
                </div>
              </div>

              {/* Edit Profile Link */}
              <button
                onClick={() => navigate('/profile')}
                className="mt-4 w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-900">Edit Resume Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Right Column - Subscription & Actions */}
          <div className="space-y-4">
            {/* Subscription */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Subscription</h2>
              </div>

              {/* Loading state */}
              {subscriptionLoading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}

              {!subscriptionLoading && (
                <>
                  {/* Expired Subscription */}
                  {subscription?.status === 'expired' && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-700">
                          {subscription.isTrial ? 'Trial expired' : 'Subscription expired'}
                        </span>
                      </div>
                      <p className="text-xs text-red-600 mb-3">Upgrade to continue using Pro features</p>
                      <Button size="sm" onClick={handleUpgrade} className="w-full h-9 gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        Upgrade to Pro — {priceInfo.display}
                      </Button>
                    </div>
                  )}

                  {/* Fully Cancelled (no longer active) */}
                  {subscription?.status === 'cancelled' && (
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Subscription ended
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">Your subscription has been cancelled</p>
                      <Button size="sm" onClick={handleUpgrade} className="w-full h-9 gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        Resubscribe — {priceInfo.display}
                      </Button>
                    </div>
                  )}

                  {/* Trial Banner (active trial, not cancelled) */}
                  {isTrial && !subscription?.cancelledAt && (
                    <div className="p-3 mb-4 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">
                          {trialDaysRemaining} {trialDaysRemaining === 1 ? 'day' : 'days'} left in trial
                        </span>
                      </div>
                      <Button size="sm" onClick={handleUpgrade} className="w-full h-9 gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        Subscribe — {priceInfo.display}
                      </Button>
                    </div>
                  )}

                  {/* Trial Cancelled (pending expiry) */}
                  {isTrial && subscription?.cancelledAt && (
                    <div className="p-3 mb-4 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">
                          Trial cancelled
                        </span>
                      </div>
                      <p className="text-xs text-amber-600 mb-3">
                        You'll have access until {subscription.trialEndsAt
                          ? new Date(subscription.trialEndsAt).toLocaleDateString()
                          : 'the trial ends'}
                      </p>
                      <Button size="sm" onClick={handleUpgrade} className="w-full h-9 gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        Subscribe Now — {priceInfo.display}
                      </Button>
                    </div>
                  )}

                  {/* Free User (not expired, not cancelled) */}
                  {!isPro && subscription?.status !== 'expired' && subscription?.status !== 'cancelled' && (
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Free Plan</p>
                      <p className="text-xs text-gray-500 mb-3">Limited features</p>
                      <Button size="sm" onClick={handleUpgrade} className="w-full h-9 gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        Upgrade — {priceInfo.display}
                      </Button>
                    </div>
                  )}

                  {/* Pro Features (active subscription or trial) */}
                  {isPro && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {['LinkedIn Import', 'AI Enhancement', 'Match to Job', 'Resume Upload'].map((f) => (
                          <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            <Check className="w-3 h-3" />
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Active paid subscription - can cancel */}
                      {!isTrial && !subscription?.cancelledAt && (
                        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                          <AlertDialogTrigger asChild>
                            <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                              Cancel subscription
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel subscription?</AlertDialogTitle>
                              <AlertDialogDescription>
                                You'll lose access to Pro features at the end of your billing period.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep</AlertDialogCancel>
                              <AlertDialogAction onClick={handleCancel} disabled={isCancelling} className="bg-red-600 hover:bg-red-700">
                                {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cancel'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}

                      {/* Active trial - can cancel */}
                      {isTrial && !subscription?.cancelledAt && (
                        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                          <AlertDialogTrigger asChild>
                            <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                              Cancel trial
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel trial?</AlertDialogTitle>
                              <AlertDialogDescription>
                                You still have {trialDaysRemaining} days left. Are you sure?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Trial</AlertDialogCancel>
                              <AlertDialogAction onClick={handleCancel} disabled={isCancelling} className="bg-red-600 hover:bg-red-700">
                                {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cancel'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}

                      {/* Paid subscription cancelled (pending end of period) */}
                      {!isTrial && subscription?.cancelledAt && (
                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-medium text-amber-700">
                              Subscription cancelled
                            </span>
                          </div>
                          <p className="text-xs text-amber-600 mt-1">
                            You'll have access until {subscription.currentPeriodEnd
                              ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                              : 'the end of your billing period'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              <button
                onClick={() => navigate('/feedback')}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Send Feedback</span>
                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
              </button>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors group"
              >
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">Sign Out</span>
              </button>
            </div>

            {/* Help */}
            <p className="text-center text-xs text-gray-400">
              Need help? <a href="mailto:support@resumecook.com" className="text-primary hover:underline">Contact support</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
