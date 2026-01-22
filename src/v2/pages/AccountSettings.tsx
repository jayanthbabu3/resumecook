/**
 * Account Settings Page
 *
 * Comprehensive account management page with:
 * - Subscription management (view plan, upgrade, cancel)
 * - Profile settings (name, email, photo)
 * - Account security (password change, connected accounts)
 * - Data & privacy (export data, delete account)
 * - Preferences (notifications, language)
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
  CreditCard,
  User,
  Shield,
  Bell,
  Download,
  Trash2,
  ChevronRight,
  Calendar,
  Check,
  X,
  Loader2,
  Sparkles,
  Zap,
  AlertCircle,
  ExternalLink,
  Mail,
  Lock,
  RefreshCw,
  LogOut,
  Settings,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Info,
} from 'lucide-react';

// Google icon component
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Section Card Component
const SectionCard: React.FC<{
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, description, icon, children, className }) => (
  <div className={cn('bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden', className)}>
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white shadow-sm border border-gray-100">
          {icon}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// Setting Row Component
const SettingRow: React.FC<{
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, description, children, className }) => (
  <div className={cn('flex items-center justify-between py-4', className)}>
    <div className="flex-1 min-w-0 mr-4">
      <p className="font-medium text-gray-900">{label}</p>
      {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

export const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const {
    subscription,
    isLoading: subscriptionLoading,
    isPro,
    isTrial,
    trialDaysRemaining,
    startCheckout,
    cancelSubscription,
  } = useSubscription();

  // Local state
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Profile form state
  const [fullName, setFullName] = useState(user?.fullName || '');

  // Format date helper
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Handle profile update
  const handleUpdateProfile = useCallback(async () => {
    if (!fullName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsUpdatingProfile(true);
    try {
      await updateUserProfile({ fullName: fullName.trim() });
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  }, [fullName, updateUserProfile]);

  // Handle password reset
  const handlePasswordReset = useCallback(async () => {
    if (!user?.email) {
      toast.error('No email associated with this account');
      return;
    }

    // Password reset not available for Google sign-in
    toast.info('You signed in with Google. Manage your password through your Google account.');
    setIsResettingPassword(false);
  }, []);

  // Handle subscription upgrade
  const handleUpgrade = useCallback(async () => {
    try {
      await startCheckout();
    } catch {
      toast.error('Failed to initiate upgrade. Please try again.');
    }
  }, [startCheckout]);

  // Handle subscription cancellation
  const handleCancelSubscription = useCallback(async () => {
    setIsCancelling(true);
    try {
      const success = await cancelSubscription(false); // Cancel at period end
      if (success) {
        toast.success('Subscription cancelled. You will retain access until the end of your billing period.');
        setShowCancelDialog(false);
      } else {
        toast.error('Failed to cancel subscription. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  }, [cancelSubscription]);

  // Handle sign out
  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Signed out successfully');
    } catch {
      toast.error('Failed to sign out');
    }
  }, [signOut, navigate]);

  // Get user initials
  const userInitials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || 'U';

  // Auth provider
  const authProvider = 'google';

  // If not logged in, redirect to auth
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Sign in required</h1>
            <p className="text-gray-500 mb-6">Please sign in to access your account settings.</p>
            <Button onClick={() => navigate('/auth')} className="gap-2">
              Sign In
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-500 mt-1">Manage your subscription, profile, and preferences</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Subscription Section */}
          <SectionCard
            title="Subscription"
            description="Manage your plan and billing"
            icon={<CreditCard className="w-5 h-5 text-primary" />}
          >
            {subscriptionLoading ? (
              <div className="flex items-center gap-3 py-4">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                <span className="text-gray-500">Loading subscription...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className={cn(
                  'p-4 rounded-xl border',
                  isPro
                    ? 'bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20'
                    : 'bg-gray-50 border-gray-200'
                )}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {isPro ? (
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/20">
                          <Crown className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-gray-200">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {isPro ? 'Pro Plan' : 'Free Plan'}
                          </h3>
                          {isTrial && (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                              <Clock className="w-3 h-3 mr-1" />
                              Trial
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {isPro
                            ? 'All features unlocked'
                            : 'Basic features only'}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn(
                      'font-semibold',
                      isPro
                        ? 'bg-gradient-to-r from-primary to-blue-600 text-white border-0'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    )}>
                      {isPro ? (
                        <>
                          <Sparkles className="w-3 h-3 mr-1" />
                          Active
                        </>
                      ) : (
                        'Free'
                      )}
                    </Badge>
                  </div>

                  {/* Trial Countdown */}
                  {isTrial && trialDaysRemaining !== null && (
                    <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="flex items-center gap-2 text-amber-700">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining in trial
                        </span>
                      </div>
                      <p className="text-xs text-amber-600 mt-1">
                        Subscribe before your trial ends to keep Pro features
                      </p>
                    </div>
                  )}

                  {/* Pro Features */}
                  {isPro && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['LinkedIn Import', 'AI Enhancement', 'Job Tailoring', 'Resume Upload'].map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/80 text-primary text-xs font-medium rounded-full border border-primary/20"
                        >
                          <Check className="w-3 h-3" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Billing Info */}
                  {isPro && subscription.currentPeriodEnd && !isTrial && (
                    <div className="mt-4 pt-4 border-t border-gray-200/50">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {subscription.cancelAtPeriodEnd
                            ? `Access until ${formatDate(subscription.currentPeriodEnd)}`
                            : `Next billing on ${formatDate(subscription.currentPeriodEnd)}`}
                        </span>
                      </div>
                      {subscription.cancelAtPeriodEnd && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-amber-600">
                          <AlertCircle className="w-4 h-4" />
                          <span>Your subscription will not renew</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Pricing Info for Free Users */}
                {!isPro && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Upgrade to unlock all Pro features</p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-bold text-gray-900">₹169</span>
                        <span className="text-gray-500">/month</span>
                      </div>
                    </div>
                    <Button
                      onClick={handleUpgrade}
                      className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/20"
                    >
                      <Zap className="w-4 h-4" />
                      Upgrade to Pro
                    </Button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/pricing')}
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View All Plans
                  </Button>

                  {/* Cancel Subscription - for paid subscribers */}
                  {isPro && !subscription.cancelAtPeriodEnd && !isTrial && (
                    <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="text-gray-500 hover:text-red-600 hover:bg-red-50">
                          Cancel Subscription
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
                          <AlertDialogDescription className="space-y-3">
                            <p>
                              You will lose access to Pro features at the end of your current billing period
                              on <strong>{formatDate(subscription.currentPeriodEnd)}</strong>.
                            </p>
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                              <p className="text-sm text-amber-700 font-medium">Features you'll lose:</p>
                              <ul className="mt-2 space-y-1 text-sm text-amber-600">
                                <li className="flex items-center gap-2">
                                  <XCircle className="w-3.5 h-3.5" />
                                  LinkedIn Import
                                </li>
                                <li className="flex items-center gap-2">
                                  <XCircle className="w-3.5 h-3.5" />
                                  AI Resume Enhancement
                                </li>
                                <li className="flex items-center gap-2">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Job-specific Tailoring
                                </li>
                                <li className="flex items-center gap-2">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Resume Upload & Parse
                                </li>
                              </ul>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleCancelSubscription}
                            disabled={isCancelling}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {isCancelling ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Cancelling...
                              </>
                            ) : (
                              'Yes, Cancel'
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {/* Cancel Trial - for trial users */}
                  {isTrial && !subscription.cancelAtPeriodEnd && (
                    <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="text-gray-500 hover:text-red-600 hover:bg-red-50">
                          Cancel Trial
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel your free trial?</AlertDialogTitle>
                          <AlertDialogDescription className="space-y-3">
                            <p>
                              Your trial will end on <strong>{formatDate(subscription.trialEndDate)}</strong>.
                              Are you sure you want to cancel early?
                            </p>
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                              <p className="text-sm text-amber-700 font-medium">You still have {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} left!</p>
                              <p className="text-xs text-amber-600 mt-1">
                                Consider using your remaining trial time to explore all Pro features.
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                              <p className="text-sm text-gray-700 font-medium">Features you'll lose:</p>
                              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                  <XCircle className="w-3.5 h-3.5" />
                                  LinkedIn Import
                                </li>
                                <li className="flex items-center gap-2">
                                  <XCircle className="w-3.5 h-3.5" />
                                  AI Resume Enhancement
                                </li>
                                <li className="flex items-center gap-2">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Job-specific Tailoring
                                </li>
                                <li className="flex items-center gap-2">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Resume Upload & Parse
                                </li>
                              </ul>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Trial</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleCancelSubscription}
                            disabled={isCancelling}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {isCancelling ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Cancelling...
                              </>
                            ) : (
                              'Yes, Cancel Trial'
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            )}
          </SectionCard>

          {/* Profile Section */}
          <SectionCard
            title="Profile"
            description="Your personal information"
            icon={<User className="w-5 h-5 text-primary" />}
          >
            <div className="space-y-6">
              {/* Avatar and Email */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className={cn(
                    'w-16 h-16 ring-4',
                    isPro ? 'ring-primary/20' : 'ring-gray-100'
                  )}>
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback className={cn(
                      'text-lg font-semibold text-white',
                      isPro
                        ? 'bg-gradient-to-br from-primary to-blue-600'
                        : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    )}>
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  {isPro && (
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center ring-2 ring-white">
                      <Crown className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.displayName || 'User'}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {user.emailVerified ? (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Not Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="flex gap-3">
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={isUpdatingProfile || fullName === (user?.fullName)}
                  >
                    {isUpdatingProfile ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Save'
                    )}
                  </Button>
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-600">
                    {user.email}
                  </div>
                  <Button variant="outline" size="icon" disabled>
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              {/* Quick Link to Full Profile */}
              <button
                onClick={() => navigate('/profile')}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Edit Full Profile</p>
                    <p className="text-sm text-gray-500">Update experience, education, skills & more</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </SectionCard>

          {/* Security Section */}
          <SectionCard
            title="Security"
            description="Password and authentication"
            icon={<Shield className="w-5 h-5 text-primary" />}
          >
            <div className="space-y-4">
              {/* Connected Account */}
              <SettingRow
                label="Sign-in Method"
                description={
                  authProvider === 'google'
                    ? 'You signed up with Google'
                    : 'You signed up with email and password'
                }
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                  {authProvider === 'google' ? (
                    <>
                      <GoogleIcon />
                      <span className="text-sm font-medium text-gray-700">Google</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </>
                  )}
                </div>
              </SettingRow>

              <Separator />

              {/* Password Reset */}
              {authProvider === 'email' && (
                <SettingRow
                  label="Password"
                  description="Send a password reset link to your email"
                >
                  <Button
                    variant="outline"
                    onClick={handlePasswordReset}
                    disabled={isResettingPassword}
                    className="gap-2"
                  >
                    {isResettingPassword ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                    Reset Password
                  </Button>
                </SettingRow>
              )}

              <Separator />

              {/* Sign Out */}
              <SettingRow
                label="Sign Out"
                description="Sign out from this device"
              >
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </SettingRow>
            </div>
          </SectionCard>

          {/* Preferences Section */}
          <SectionCard
            title="Preferences"
            description="Notifications and settings"
            icon={<Bell className="w-5 h-5 text-primary" />}
          >
            <div className="space-y-4">
              <SettingRow
                label="Email Notifications"
                description="Receive updates about new features and tips"
              >
                <Switch defaultChecked />
              </SettingRow>

              <Separator />

              <SettingRow
                label="Marketing Emails"
                description="Promotional content and special offers"
              >
                <Switch />
              </SettingRow>
            </div>
          </SectionCard>

          {/* Data & Privacy Section */}
          <SectionCard
            title="Data & Privacy"
            description="Export or delete your data"
            icon={<Download className="w-5 h-5 text-primary" />}
          >
            <div className="space-y-4">
              <SettingRow
                label="Export Data"
                description="Download all your resumes and profile data"
              >
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </SettingRow>

              <Separator />

              <SettingRow
                label="Delete Account"
                description="Permanently delete your account and all data"
                className="border-t-0"
              >
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-600">Delete your account?</AlertDialogTitle>
                      <AlertDialogDescription className="space-y-3">
                        <p>This action cannot be undone. This will permanently delete:</p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            Your profile and all personal information
                          </li>
                          <li className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            All saved resumes
                          </li>
                          <li className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            Your subscription (if any)
                          </li>
                        </ul>
                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                          <p className="text-sm text-amber-700">
                            <Info className="w-4 h-4 inline mr-1" />
                            To delete your account, please contact support at{' '}
                            <a href="mailto:support@resumecook.com" className="font-medium underline">
                              support@resumecook.com
                            </a>
                          </p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          window.location.href = 'mailto:support@resumecook.com?subject=Account%20Deletion%20Request';
                          setShowDeleteDialog(false);
                        }}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Contact Support
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SettingRow>
            </div>
          </SectionCard>

          {/* Help Section */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Need help?</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Contact us at{' '}
                  <a href="mailto:support@resumecook.com" className="text-primary hover:underline">
                    support@resumecook.com
                  </a>{' '}
                  for any questions or issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
