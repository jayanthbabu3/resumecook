/**
 * Admin User Detail Page
 *
 * Detailed view of a user with all their information.
 * Manage subscription and role directly from this page.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { adminService } from '@/services';
import type { UserDetailResponse, AdminUserSubscription } from '@/services/adminService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Loader2,
  Crown,
  Clock,
  Mail,
  Shield,
  ShieldOff,
  Zap,
  ZapOff,
  Calendar,
  Trash2,
  FileText,
  Download,
  User,
  CalendarDays,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

// Duration selection for subscription management
const DURATION_OPTIONS = [
  { value: 7, label: '7 days' },
  { value: 30, label: '30 days' },
  { value: 90, label: '3 months' },
  { value: 180, label: '6 months' },
  { value: 365, label: '1 year' },
];

// Info row component
const InfoRow: React.FC<{
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {icon && <span className="text-gray-400">{icon}</span>}
      {label}
    </div>
    <div className="text-sm font-medium text-gray-900 text-right">{value}</div>
  </div>
);

// Resume item component
const ResumeItem: React.FC<{
  resume: {
    _id: string;
    title: string;
    templateId: string;
    createdAt: string;
    updatedAt: string;
    downloads: number;
  };
}> = ({ resume }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="p-2 rounded-lg bg-blue-50">
        <FileText className="w-4 h-4 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{resume.title || 'Untitled Resume'}</p>
        <p className="text-xs text-gray-500">
          {resume.templateId} • Updated {formatDate(resume.updatedAt)}
        </p>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Download className="w-3 h-3" />
        {resume.downloads}
      </div>
    </div>
  );
};

export const AdminUserDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetailResponse | null>(null);

  // Action states
  const [actionLoading, setActionLoading] = useState(false);
  const [showGrantDialog, setShowGrantDialog] = useState(false);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [showExtendDialog, setShowExtendDialog] = useState(false);
  const [showMakeAdminDialog, setShowMakeAdminDialog] = useState(false);
  const [showRemoveAdminDialog, setShowRemoveAdminDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [duration, setDuration] = useState(30);

  const loadUserDetail = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await adminService.getUserById(userId);
      setUserDetail(data);
    } catch (error) {
      console.error('Error loading user:', error);
      toast.error('Failed to load user details');
      navigate('/admin/users');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId, navigate]);

  useEffect(() => {
    loadUserDetail();
  }, [loadUserDetail]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadUserDetail();
  };

  const user = userDetail?.user;
  const stats = userDetail?.stats;
  const recentResumes = userDetail?.recentResumes || [];

  const isPro = user?.subscription?.status === 'active' && !user?.subscription?.isTrial;
  const isTrial = user?.subscription?.status === 'active' && user?.subscription?.isTrial;
  const isAdmin = user?.role === 'admin';

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Action handlers
  const handleGrantPro = async () => {
    if (!userId) return;
    setActionLoading(true);
    try {
      await adminService.manageSubscription(userId, 'grant', {
        plan: 'pro',
        durationDays: duration,
      });
      toast.success(`Pro access granted for ${duration} days`);
      setShowGrantDialog(false);
      loadUserDetail();
    } catch (error) {
      console.error('Error granting Pro:', error);
      toast.error('Failed to grant Pro access');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevokePro = async () => {
    if (!userId) return;
    setActionLoading(true);
    try {
      await adminService.manageSubscription(userId, 'revoke');
      toast.success('Pro access revoked');
      setShowRevokeDialog(false);
      loadUserDetail();
    } catch (error) {
      console.error('Error revoking Pro:', error);
      toast.error('Failed to revoke Pro access');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExtendSub = async () => {
    if (!userId) return;
    setActionLoading(true);
    try {
      await adminService.manageSubscription(userId, 'extend', {
        durationDays: duration,
      });
      toast.success(`Subscription extended by ${duration} days`);
      setShowExtendDialog(false);
      loadUserDetail();
    } catch (error) {
      console.error('Error extending subscription:', error);
      toast.error('Failed to extend subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMakeAdmin = async () => {
    if (!userId) return;
    setActionLoading(true);
    try {
      await adminService.updateUser(userId, { role: 'admin' });
      toast.success('User is now an admin');
      setShowMakeAdminDialog(false);
      loadUserDetail();
    } catch (error) {
      console.error('Error making admin:', error);
      toast.error('Failed to make admin');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveAdmin = async () => {
    if (!userId) return;
    setActionLoading(true);
    try {
      await adminService.updateUser(userId, { role: 'user' });
      toast.success('Admin role removed');
      setShowRemoveAdminDialog(false);
      loadUserDetail();
    } catch (error) {
      console.error('Error removing admin:', error);
      toast.error('Failed to remove admin role');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userId) return;
    setActionLoading(true);
    try {
      await adminService.deleteUser(userId);
      toast.success('User deleted');
      navigate('/admin/users');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <User className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">User not found</h1>
          <Button onClick={() => navigate('/admin/users')}>Back to Users</Button>
        </main>
      </div>
    );
  }

  const userInitials = user.fullName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';

  const getSubscriptionStatus = (sub?: AdminUserSubscription) => {
    if (!sub?.status || sub.status === 'none') {
      return { label: 'Free', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
    if (sub.status === 'active' && sub.isTrial) {
      return { label: 'Trial', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
    if (sub.status === 'active') {
      return { label: 'Pro', color: 'bg-primary/10 text-primary border-primary/20' };
    }
    if (sub.status === 'cancelled') {
      return { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200' };
    }
    if (sub.status === 'expired') {
      return { label: 'Expired', color: 'bg-gray-100 text-gray-600 border-gray-200' };
    }
    return { label: sub.status, color: 'bg-gray-100 text-gray-700 border-gray-200' };
  };

  const subStatus = getSubscriptionStatus(user.subscription);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Avatar className={cn('w-16 h-16', isPro && 'ring-2 ring-primary/30')}>
                    <AvatarImage src={user.profilePhoto} alt={user.fullName} />
                    <AvatarFallback
                      className={cn(
                        'text-xl font-semibold text-white',
                        isPro ? 'bg-gradient-to-br from-primary to-blue-600' : 'bg-gray-400'
                      )}
                    >
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-xl font-semibold text-gray-900">
                        {user.fullName || 'Unknown User'}
                      </h1>
                      {isAdmin && (
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                          <Shield className="w-3 h-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={cn('border', subStatus.color)}>{subStatus.label}</Badge>
                      {user.emailVerified ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                          <XCircle className="w-3 h-3 mr-1" />
                          Unverified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                  <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
                </Button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats?.resumeCount || 0}</p>
                  <p className="text-xs text-gray-500">Resumes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {recentResumes.reduce((acc, r) => acc + (r.downloads || 0), 0)}
                  </p>
                  <p className="text-xs text-gray-500">Downloads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {user.createdAt
                      ? Math.floor(
                          (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
                        )
                      : 0}
                  </p>
                  <p className="text-xs text-gray-500">Days Active</p>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h2>
              <div className="divide-y divide-gray-100">
                <InfoRow
                  label="User ID"
                  value={<code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{user._id || user.id}</code>}
                  icon={<User className="w-4 h-4" />}
                />
                <InfoRow
                  label="Email"
                  value={
                    <a href={`mailto:${user.email}`} className="text-primary hover:underline flex items-center gap-1">
                      {user.email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  }
                  icon={<Mail className="w-4 h-4" />}
                />
                <InfoRow
                  label="Joined"
                  value={formatDate(user.createdAt)}
                  icon={<CalendarDays className="w-4 h-4" />}
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDateTime(user.updatedAt)}
                  icon={<Clock className="w-4 h-4" />}
                />
                <InfoRow
                  label="Role"
                  value={
                    <Badge className={isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}>
                      {user.role || 'user'}
                    </Badge>
                  }
                  icon={<Shield className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Subscription Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h2>
              <div className="divide-y divide-gray-100">
                <InfoRow
                  label="Status"
                  value={<Badge className={cn('border', subStatus.color)}>{subStatus.label}</Badge>}
                  icon={<Crown className="w-4 h-4" />}
                />
                {user.subscription?.plan && (
                  <InfoRow
                    label="Plan"
                    value={user.subscription.plan}
                    icon={<Zap className="w-4 h-4" />}
                  />
                )}
                {user.subscription?.startDate && (
                  <InfoRow
                    label="Start Date"
                    value={formatDate(user.subscription.startDate)}
                    icon={<Calendar className="w-4 h-4" />}
                  />
                )}
                {user.subscription?.endDate && (
                  <InfoRow
                    label="End Date"
                    value={formatDate(user.subscription.endDate)}
                    icon={<Calendar className="w-4 h-4" />}
                  />
                )}
                {user.subscription?.trialEndsAt && (
                  <InfoRow
                    label="Trial Ends"
                    value={formatDate(user.subscription.trialEndsAt)}
                    icon={<Clock className="w-4 h-4" />}
                  />
                )}
                {user.subscription?.razorpaySubscriptionId && (
                  <InfoRow
                    label="Razorpay ID"
                    value={
                      <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {user.subscription.razorpaySubscriptionId}
                      </code>
                    }
                  />
                )}
              </div>
            </div>

            {/* Recent Resumes */}
            {recentResumes.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Resumes</h2>
                <div className="space-y-1">
                  {recentResumes.map((resume) => (
                    <ResumeItem key={resume._id} resume={resume} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>

              {/* Contact */}
              <Button
                variant="outline"
                className="w-full justify-start gap-2 mb-2"
                onClick={() => window.open(`mailto:${user.email}`, '_blank')}
              >
                <Mail className="w-4 h-4" />
                Send Email
              </Button>

              {/* Subscription Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Subscription
                </p>

                {!isPro && !isTrial && (
                  <Button
                    className="w-full justify-start gap-2 mb-2 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setShowGrantDialog(true)}
                  >
                    <Zap className="w-4 h-4" />
                    Grant Pro Access
                  </Button>
                )}

                {(isPro || isTrial) && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 mb-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => setShowExtendDialog(true)}
                    >
                      <Calendar className="w-4 h-4" />
                      Extend Subscription
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 mb-2 text-amber-600 border-amber-200 hover:bg-amber-50"
                      onClick={() => setShowRevokeDialog(true)}
                    >
                      <ZapOff className="w-4 h-4" />
                      Revoke Access
                    </Button>
                  </>
                )}
              </div>

              {/* Role Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Role
                </p>

                {!isAdmin ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 mb-2 text-purple-600 border-purple-200 hover:bg-purple-50"
                    onClick={() => setShowMakeAdminDialog(true)}
                  >
                    <Shield className="w-4 h-4" />
                    Make Admin
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 mb-2"
                    onClick={() => setShowRemoveAdminDialog(true)}
                  >
                    <ShieldOff className="w-4 h-4" />
                    Remove Admin Role
                  </Button>
                )}
              </div>

              {/* Danger Zone */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-red-500 uppercase tracking-wider mb-3">
                  Danger Zone
                </p>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete User
                </Button>
              </div>
            </div>

            {/* Help */}
            <p className="text-center text-xs text-gray-400">
              User ID: {user._id || user.id}
            </p>
          </div>
        </div>
      </main>

      {/* Grant Pro Dialog */}
      <Dialog open={showGrantDialog} onOpenChange={setShowGrantDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              Grant Pro Access
            </DialogTitle>
            <DialogDescription>
              Grant Pro subscription to <strong>{user.fullName || user.email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDuration(opt.value)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium border transition-colors',
                    duration === opt.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGrantDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleGrantPro} disabled={actionLoading} className="gap-2">
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              Grant Pro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Pro Dialog */}
      <AlertDialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Pro Access?</AlertDialogTitle>
            <AlertDialogDescription>
              This will immediately revoke Pro access for <strong>{user.fullName || user.email}</strong>.
              They will lose access to all Pro features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevokePro}
              disabled={actionLoading}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Revoke Access'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Extend Subscription Dialog */}
      <Dialog open={showExtendDialog} onOpenChange={setShowExtendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Extend Subscription
            </DialogTitle>
            <DialogDescription>
              Extend subscription for <strong>{user.fullName || user.email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Extend by</label>
            <div className="grid grid-cols-3 gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDuration(opt.value)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium border transition-colors',
                    duration === opt.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExtendDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExtendSub} disabled={actionLoading} className="gap-2">
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
              Extend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Make Admin Dialog */}
      <AlertDialog open={showMakeAdminDialog} onOpenChange={setShowMakeAdminDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Make Admin?</AlertDialogTitle>
            <AlertDialogDescription>
              This will grant admin privileges to <strong>{user.fullName || user.email}</strong>.
              They will have full access to the admin dashboard and user management.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleMakeAdmin}
              disabled={actionLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Make Admin'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Admin Dialog */}
      <AlertDialog open={showRemoveAdminDialog} onOpenChange={setShowRemoveAdminDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Admin Role?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove admin privileges from <strong>{user.fullName || user.email}</strong>.
              They will no longer have access to the admin dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveAdmin} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Remove Admin'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{user.fullName || user.email}</strong> and all their data
              including {stats?.resumeCount || 0} resume(s). This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={actionLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUserDetailPage;
