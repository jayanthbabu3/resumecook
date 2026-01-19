/**
 * Admin Dashboard Page
 *
 * Overview of app statistics, recent activity, and quick actions.
 * Beautiful, informative dashboard for administrators.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAdminDashboardStats, getRecentSignups, type UserWithSubscription } from '@/lib/firestore/adminService';
import { getAllFeedback } from '@/lib/firestore/feedbackService';
import { cn } from '@/lib/utils';
import {
  Users,
  Crown,
  Download,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Shield,
  UserPlus,
  CreditCard,
  BarChart3,
  Activity,
} from 'lucide-react';
import type { AdminDashboardStats } from '@/types/feedback';
import type { Feedback } from '@/types/feedback';
import { FEEDBACK_STATUS_INFO, FEEDBACK_TYPE_INFO } from '@/types/feedback';

// Compact stats card component
const StatsCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'rose';
  onClick?: () => void;
}> = ({ title, value, subtitle, icon, color, onClick }) => {
  const bgColorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        'bg-white rounded-xl border border-gray-200 p-3 text-left transition-all',
        onClick && 'hover:border-gray-300 cursor-pointer'
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-lg', bgColorClasses[color])}>
          {icon}
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{title}</p>
          {subtitle && <p className="text-[10px] text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </button>
  );
};

// Compact quick action card
const QuickActionCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
}> = ({ title, icon, onClick, badge }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all text-left w-full"
  >
    <div className="p-1.5 rounded-md bg-gray-100">{icon}</div>
    <span className="text-sm font-medium text-gray-900 flex-1">{title}</span>
    {badge && <Badge className="text-[10px] bg-rose-100 text-rose-700">{badge}</Badge>}
    <ChevronRight className="w-4 h-4 text-gray-300" />
  </button>
);

// Compact recent feedback item
const RecentFeedbackItem: React.FC<{
  feedback: Feedback;
  onClick: () => void;
}> = ({ feedback, onClick }) => {
  const statusInfo = FEEDBACK_STATUS_INFO[feedback.status];
  const typeInfo = FEEDBACK_TYPE_INFO[feedback.type];

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-2.5 hover:bg-gray-50 transition-colors w-full text-left"
    >
      <div className={cn('p-1.5 rounded-md', typeInfo.bgColor)}>
        <MessageSquare className={cn('w-3.5 h-3.5', typeInfo.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{feedback.subject}</p>
        <p className="text-xs text-gray-500 truncate">{feedback.userName}</p>
      </div>
      <Badge className={cn('text-[10px] border', statusInfo.bgColor, statusInfo.color, statusInfo.borderColor)}>
        {statusInfo.label}
      </Badge>
    </button>
  );
};

// Compact recent user item
const RecentUserItem: React.FC<{
  user: UserWithSubscription;
}> = ({ user }) => {
  const getSubscriptionBadge = () => {
    if (user.subscriptionStatus === 'active') {
      return <Badge className="text-[10px] bg-primary text-white border-0">Pro</Badge>;
    }
    if (user.subscriptionStatus === 'trialing') {
      return <Badge className="text-[10px] bg-amber-100 text-amber-700">Trial</Badge>;
    }
    return <Badge className="text-[10px] bg-gray-100 text-gray-600">Free</Badge>;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Now';
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-xs font-semibold text-primary">
          {user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
          {getSubscriptionBadge()}
        </div>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>
      <span className="text-[10px] text-gray-400">{formatDate(user.createdAt)}</span>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentFeedback, setRecentFeedback] = useState<Feedback[]>([]);
  const [recentUsers, setRecentUsers] = useState<UserWithSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dashboardStats, feedbackList, userList] = await Promise.all([
          getAdminDashboardStats(),
          getAllFeedback(),
          getRecentSignups(7),
        ]);

        setStats(dashboardStats);
        setRecentFeedback(feedbackList.slice(0, 5));
        setRecentUsers(userList.slice(0, 5));
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  const openFeedbackCount = stats?.feedbackStats.open || 0;
  const inProgressCount = stats?.feedbackStats.inProgress || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-100">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            subtitle={`+${stats?.recentSignups || 0} this week`}
            icon={<Users className="w-4 h-4" />}
            color="blue"
            onClick={() => navigate('/admin/users')}
          />
          <StatsCard
            title="Pro Users"
            value={stats?.proUsers || 0}
            subtitle={`${stats?.trialUsers || 0} trial`}
            icon={<Crown className="w-4 h-4" />}
            color="purple"
            onClick={() => navigate('/admin/users?filter=pro')}
          />
          <StatsCard
            title="Downloads"
            value={stats?.totalDownloads || 0}
            icon={<Download className="w-4 h-4" />}
            color="green"
          />
          <StatsCard
            title="Open Feedback"
            value={openFeedbackCount + inProgressCount}
            subtitle={`${openFeedbackCount} new`}
            icon={<MessageSquare className="w-4 h-4" />}
            color={openFeedbackCount > 0 ? 'rose' : 'amber'}
            onClick={() => navigate('/admin/feedback')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Feedback */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <h2 className="text-sm font-medium text-gray-900">Recent Feedback</h2>
                {openFeedbackCount > 0 && (
                  <Badge className="text-[10px] bg-rose-100 text-rose-700">{openFeedbackCount} new</Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => navigate('/admin/feedback')}>
                View All
              </Button>
            </div>
            <div className="divide-y divide-gray-100">
              {recentFeedback.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No feedback yet</p>
                </div>
              ) : (
                recentFeedback.map((fb) => (
                  <RecentFeedbackItem key={fb.id} feedback={fb} onClick={() => navigate(`/admin/feedback/${fb.id}`)} />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-gray-100">
                <h2 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-gray-500" />
                  Quick Actions
                </h2>
              </div>
              <div className="p-2.5 space-y-1.5">
                <QuickActionCard
                  title="Feedback"
                  icon={<MessageSquare className="w-4 h-4 text-gray-600" />}
                  onClick={() => navigate('/admin/feedback')}
                  badge={openFeedbackCount > 0 ? `${openFeedbackCount}` : undefined}
                />
                <QuickActionCard
                  title="Users"
                  icon={<Users className="w-4 h-4 text-gray-600" />}
                  onClick={() => navigate('/admin/users')}
                />
              </div>
            </div>

            {/* Recent Signups */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4 text-gray-500" />
                  Recent Signups
                </h2>
                <Badge className="text-[10px] bg-green-100 text-green-700">+{stats?.recentSignups || 0}</Badge>
              </div>
              <div className="divide-y divide-gray-100">
                {recentUsers.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p className="text-xs">No new signups</p>
                  </div>
                ) : (
                  recentUsers.slice(0, 4).map((user) => <RecentUserItem key={user.id} user={user} />)
                )}
              </div>
            </div>

            {/* Feedback Summary */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-gray-100">
                <h2 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                  Feedback Summary
                </h2>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs text-gray-600">Open</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{stats?.feedbackStats.open || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs text-gray-600">In Progress</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{stats?.feedbackStats.inProgress || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs text-gray-600">Resolved</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{stats?.feedbackStats.resolved || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
