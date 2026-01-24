/**
 * Admin Users Management Page
 *
 * View all users with search and filter capabilities.
 * Manage subscriptions: grant Pro, revoke, extend.
 * Manage roles: make admin.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import type { AdminUser } from '@/services/adminService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Users,
  Search,
  Loader2,
  Crown,
  Clock,
  Mail,
  UserCheck,
  Inbox,
  MoreVertical,
  Shield,
  ShieldOff,
  Zap,
  ZapOff,
  Calendar,
  ExternalLink,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// User row component with actions
const UserRow: React.FC<{
  user: AdminUser;
  onGrantPro: (user: AdminUser) => void;
  onRevokePro: (user: AdminUser) => void;
  onExtendSub: (user: AdminUser) => void;
  onMakeAdmin: (user: AdminUser) => void;
  onRemoveAdmin: (user: AdminUser) => void;
  onViewDetails: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}> = ({ user, onGrantPro, onRevokePro, onExtendSub, onMakeAdmin, onRemoveAdmin, onViewDetails, onDelete }) => {
  const isPro = user.subscription?.status === 'active' && !user.subscription?.isTrial;
  const isTrial = user.subscription?.status === 'active' && user.subscription?.isTrial;
  const isAdmin = user.role === 'admin';

  const getSubscriptionBadge = () => {
    if (isPro) {
      return <Badge className="text-[10px] bg-primary text-white border-0">Pro</Badge>;
    }
    if (isTrial) {
      return <Badge className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">Trial</Badge>;
    }
    return <Badge className="text-[10px] bg-gray-100 text-gray-600 border-gray-200">Free</Badge>;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  const getSubEndDate = () => {
    if (user.subscription?.endDate) {
      return formatDate(user.subscription.endDate);
    }
    if (user.subscription?.trialEndsAt) {
      return formatDate(user.subscription.trialEndsAt);
    }
    return null;
  };

  const endDate = getSubEndDate();

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group">
      <Avatar className={cn('w-9 h-9', isPro && 'ring-2 ring-primary/30')}>
        <AvatarImage src={user.profilePhoto} alt={user.fullName} />
        <AvatarFallback className={cn('text-xs font-semibold text-white', isPro ? 'bg-gradient-to-br from-primary to-blue-600' : 'bg-gray-400')}>
          {user.fullName?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-gray-900 truncate">{user.fullName || 'Unknown'}</p>
          {isAdmin && (
            <Badge className="text-[10px] bg-purple-100 text-purple-700 border-purple-200">
              <Shield className="w-2.5 h-2.5 mr-0.5" />
              Admin
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {getSubscriptionBadge()}
        {endDate && (isPro || isTrial) && (
          <span className="text-[10px] text-gray-400 hidden md:block">
            ends {endDate}
          </span>
        )}
        <span className="text-xs text-gray-400 hidden sm:block">{formatDate(user.createdAt)}</span>

        {/* Actions dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => onViewDetails(user)} className="gap-2">
              <ExternalLink className="w-4 h-4" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => window.open(`mailto:${user.email}`, '_blank')} className="gap-2">
              <Mail className="w-4 h-4" />
              Send Email
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs">Subscription</DropdownMenuLabel>

            {!isPro && (
              <DropdownMenuItem onClick={() => onGrantPro(user)} className="gap-2 text-emerald-600">
                <Zap className="w-4 h-4" />
                Grant Pro Access
              </DropdownMenuItem>
            )}

            {(isPro || isTrial) && (
              <>
                <DropdownMenuItem onClick={() => onExtendSub(user)} className="gap-2 text-blue-600">
                  <Calendar className="w-4 h-4" />
                  Extend Subscription
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRevokePro(user)} className="gap-2 text-amber-600">
                  <ZapOff className="w-4 h-4" />
                  Revoke Access
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs">Role</DropdownMenuLabel>

            {!isAdmin ? (
              <DropdownMenuItem onClick={() => onMakeAdmin(user)} className="gap-2 text-purple-600">
                <Shield className="w-4 h-4" />
                Make Admin
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onRemoveAdmin(user)} className="gap-2 text-gray-600">
                <ShieldOff className="w-4 h-4" />
                Remove Admin
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(user)} className="gap-2 text-red-600">
              <Trash2 className="w-4 h-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

// Compact stats card
const StatsCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}> = ({ title, value, icon, color, onClick }) => (
  <button
    onClick={onClick}
    disabled={!onClick}
    className={cn(
      'bg-white rounded-xl border border-gray-200 p-3 text-left w-full transition-all',
      onClick && 'hover:shadow-md hover:border-gray-300 cursor-pointer'
    )}
  >
    <div className="flex items-center gap-2.5">
      <div className={cn('p-1.5 rounded-lg', color)}>{icon}</div>
      <div>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{title}</p>
      </div>
    </div>
  </button>
);

// Compact filter tabs
const FilterTabs: React.FC<{
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}> = ({ activeFilter, onFilterChange, counts }) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Pro' },
    { id: 'trial', label: 'Trial' },
    { id: 'none', label: 'Free' },
  ];

  return (
    <div className="flex gap-1.5 overflow-x-auto">
      {tabs.map((tab) => {
        const count = counts[tab.id] || 0;
        return (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors',
              activeFilter === tab.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {tab.label}
            {count > 0 && (
              <span className={cn('text-[10px]', activeFilter === tab.id ? 'opacity-70' : 'text-gray-400')}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Duration selection for extending subscription
const DURATION_OPTIONS = [
  { value: 7, label: '7 days' },
  { value: 30, label: '30 days' },
  { value: 90, label: '3 months' },
  { value: 180, label: '6 months' },
  { value: 365, label: '1 year' },
];

export const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState(
    searchParams.get('filter') || searchParams.get('status') || 'all'
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Stats for cards (independent of filter)
  const [stats, setStats] = useState({ total: 0, pro: 0, trial: 0, free: 0 });

  // Action states
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showGrantDialog, setShowGrantDialog] = useState(false);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [showExtendDialog, setShowExtendDialog] = useState(false);
  const [showMakeAdminDialog, setShowMakeAdminDialog] = useState(false);
  const [showRemoveAdminDialog, setShowRemoveAdminDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [extendDuration, setExtendDuration] = useState(30);
  const [grantDuration, setGrantDuration] = useState(30);

  // Load stats (independent of filters)
  const loadStats = useCallback(async () => {
    try {
      const dashboardStats = await adminService.getDashboardStats();
      setStats({
        total: dashboardStats.users.total,
        pro: dashboardStats.users.activeSubscriptions,
        trial: dashboardStats.users.trialUsers,
        free: dashboardStats.users.total - dashboardStats.users.activeSubscriptions - dashboardStats.users.trialUsers,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  // Load users
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminService.getUsers(page, 20, {
        status: subscriptionFilter === 'all' ? undefined : subscriptionFilter as 'active' | 'trial' | 'expired' | 'none' | 'cancelled',
        search: searchQuery || undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
      setUsers(response.users);
      setTotalPages(response.pagination.pages);
      setTotalUsers(response.pagination.total);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [page, subscriptionFilter, searchQuery]);

  // Load stats on mount
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Load users when filters change
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Refresh stats after any action
  const refreshData = useCallback(() => {
    loadUsers();
    loadStats();
  }, [loadUsers, loadStats]);

  // Counts for filter tabs (from current filtered result)
  const counts = {
    all: stats.total,
    active: stats.pro,
    trial: stats.trial,
    none: stats.free,
  };

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (subscriptionFilter !== 'all') params.set('filter', subscriptionFilter);
    if (page > 1) params.set('page', String(page));
    setSearchParams(params, { replace: true });
  }, [subscriptionFilter, page, setSearchParams]);

  // Action handlers
  const handleGrantPro = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminService.manageSubscription(selectedUser._id || selectedUser.id || '', 'grant', {
        plan: 'pro',
        durationDays: grantDuration,
      });
      toast.success(`Pro access granted to ${selectedUser.fullName || selectedUser.email} for ${grantDuration} days`);
      setShowGrantDialog(false);
      refreshData();
    } catch (error) {
      console.error('Error granting Pro:', error);
      toast.error('Failed to grant Pro access');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevokePro = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminService.manageSubscription(selectedUser._id || selectedUser.id || '', 'revoke');
      toast.success(`Pro access revoked from ${selectedUser.fullName || selectedUser.email}`);
      setShowRevokeDialog(false);
      refreshData();
    } catch (error) {
      console.error('Error revoking Pro:', error);
      toast.error('Failed to revoke Pro access');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExtendSub = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminService.manageSubscription(selectedUser._id || selectedUser.id || '', 'extend', {
        durationDays: extendDuration,
      });
      toast.success(`Subscription extended by ${extendDuration} days for ${selectedUser.fullName || selectedUser.email}`);
      setShowExtendDialog(false);
      refreshData();
    } catch (error) {
      console.error('Error extending subscription:', error);
      toast.error('Failed to extend subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMakeAdmin = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminService.updateUser(selectedUser._id || selectedUser.id || '', { role: 'admin' });
      toast.success(`${selectedUser.fullName || selectedUser.email} is now an admin`);
      setShowMakeAdminDialog(false);
      refreshData();
    } catch (error) {
      console.error('Error making admin:', error);
      toast.error('Failed to make admin');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveAdmin = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminService.updateUser(selectedUser._id || selectedUser.id || '', { role: 'user' });
      toast.success(`Admin role removed from ${selectedUser.fullName || selectedUser.email}`);
      setShowRemoveAdminDialog(false);
      refreshData();
    } catch (error) {
      console.error('Error removing admin:', error);
      toast.error('Failed to remove admin role');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminService.deleteUser(selectedUser._id || selectedUser.id || '');
      toast.success(`User ${selectedUser.fullName || selectedUser.email} deleted`);
      setShowDeleteDialog(false);
      refreshData();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
              <p className="text-sm text-gray-500">{stats.total} total users</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <StatsCard
            title="Total"
            value={stats.total}
            icon={<Users className="w-4 h-4 text-blue-600" />}
            color="bg-blue-100"
            onClick={() => setSubscriptionFilter('all')}
          />
          <StatsCard
            title="Pro"
            value={stats.pro}
            icon={<Crown className="w-4 h-4 text-purple-600" />}
            color="bg-purple-100"
            onClick={() => setSubscriptionFilter('active')}
          />
          <StatsCard
            title="Trial"
            value={stats.trial}
            icon={<Clock className="w-4 h-4 text-amber-600" />}
            color="bg-amber-100"
            onClick={() => setSubscriptionFilter('trial')}
          />
          <StatsCard
            title="Free"
            value={stats.free}
            icon={<UserCheck className="w-4 h-4 text-green-600" />}
            color="bg-green-100"
            onClick={() => setSubscriptionFilter('none')}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
          <FilterTabs
            activeFilter={subscriptionFilter}
            onFilterChange={(filter) => {
              setSubscriptionFilter(filter);
              setPage(1);
            }}
            counts={counts}
          />
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-10">
              <Inbox className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No users found</h3>
              <p className="text-xs text-gray-500">
                {searchQuery || subscriptionFilter !== 'all' ? 'Try adjusting filters' : 'No users yet'}
              </p>
            </div>
          ) : (
            <>
              {users.map((user) => (
                <UserRow
                  key={user._id || user.id}
                  user={user}
                  onGrantPro={(u) => { setSelectedUser(u); setShowGrantDialog(true); }}
                  onRevokePro={(u) => { setSelectedUser(u); setShowRevokeDialog(true); }}
                  onExtendSub={(u) => { setSelectedUser(u); setShowExtendDialog(true); }}
                  onMakeAdmin={(u) => { setSelectedUser(u); setShowMakeAdminDialog(true); }}
                  onRemoveAdmin={(u) => { setSelectedUser(u); setShowRemoveAdminDialog(true); }}
                  onViewDetails={(u) => navigate(`/admin/users/${u._id || u.id}`)}
                  onDelete={(u) => { setSelectedUser(u); setShowDeleteDialog(true); }}
                />
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
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
              Grant Pro subscription to <strong>{selectedUser?.fullName || selectedUser?.email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setGrantDuration(opt.value)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium border transition-colors',
                    grantDuration === opt.value
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
              This will immediately revoke Pro access for <strong>{selectedUser?.fullName || selectedUser?.email}</strong>.
              They will lose access to all Pro features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevokePro} disabled={actionLoading} className="bg-amber-600 hover:bg-amber-700">
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
              Extend subscription for <strong>{selectedUser?.fullName || selectedUser?.email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Extend by</label>
            <div className="grid grid-cols-3 gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setExtendDuration(opt.value)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium border transition-colors',
                    extendDuration === opt.value
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
              This will grant admin privileges to <strong>{selectedUser?.fullName || selectedUser?.email}</strong>.
              They will have full access to the admin dashboard and user management.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleMakeAdmin} disabled={actionLoading} className="bg-purple-600 hover:bg-purple-700">
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
              This will remove admin privileges from <strong>{selectedUser?.fullName || selectedUser?.email}</strong>.
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
              This will permanently delete <strong>{selectedUser?.fullName || selectedUser?.email}</strong> and all their data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} disabled={actionLoading} className="bg-red-600 hover:bg-red-700">
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsersPage;
