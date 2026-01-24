/**
 * Admin Dashboard
 *
 * Comprehensive dashboard with charts, stats, and quick actions.
 * Professional design with data visualizations.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { adminService, feedbackService } from '@/services';
import type { DashboardStats, AdminUser, TrialStats, SystemHealth } from '@/services/adminService';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Users,
  Crown,
  MessageSquare,
  ChevronRight,
  Loader2,
  Shield,
  UserPlus,
  FileText,
  Activity,
  Server,
  Database,
  Zap,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import type { Feedback } from '@/types/feedback';
import { FEEDBACK_STATUS_INFO, FEEDBACK_TYPE_INFO } from '@/types/feedback';

// Chart colors
const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};

const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

// Stats card component
const StatsCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; isPositive: boolean };
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'amber' | 'rose';
  onClick?: () => void;
}> = ({ title, value, subtitle, trend, icon, color, onClick }) => {
  const iconBgClasses = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        'bg-white rounded-xl border border-gray-200 p-4 text-left transition-all w-full',
        onClick && 'hover:shadow-md hover:border-gray-300 cursor-pointer'
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn('p-2.5 rounded-xl', iconBgClasses[color])}>{icon}</div>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded',
              trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            )}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </button>
  );
};

// Mini stats row
const MiniStat: React.FC<{
  label: string;
  value: string | number;
  color?: string;
}> = ({ label, value, color }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-gray-600">{label}</span>
    <span className={cn('text-sm font-semibold', color || 'text-gray-900')}>{value}</span>
  </div>
);

// Recent feedback item
const RecentFeedbackItem: React.FC<{
  feedback: Feedback;
  onClick: () => void;
}> = ({ feedback, onClick }) => {
  const statusInfo = FEEDBACK_STATUS_INFO[feedback.status];
  const typeInfo = FEEDBACK_TYPE_INFO[feedback.type];

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors w-full text-left border-b border-gray-100 last:border-0"
    >
      <div className={cn('p-2 rounded-lg', typeInfo.bgColor)}>
        <MessageSquare className={cn('w-4 h-4', typeInfo.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{feedback.subject}</p>
        <p className="text-xs text-gray-500">{feedback.userName}</p>
      </div>
      <Badge
        className={cn('text-xs border', statusInfo.bgColor, statusInfo.color, statusInfo.borderColor)}
      >
        {statusInfo.label}
      </Badge>
    </button>
  );
};

// Recent user item
const RecentUserItem: React.FC<{
  user: AdminUser;
  onClick: () => void;
}> = ({ user, onClick }) => {
  const getStatusBadge = () => {
    const status = user.subscription?.status;
    if (status === 'active' && !user.subscription?.isTrial) {
      return <Badge className="text-xs bg-primary text-white border-0">Pro</Badge>;
    }
    if (status === 'active' && user.subscription?.isTrial) {
      return <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">Trial</Badge>;
    }
    return <Badge className="text-xs bg-gray-100 text-gray-600 border-gray-200">Free</Badge>;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors w-full text-left border-b border-gray-100 last:border-0"
    >
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
        {user.fullName?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{user.fullName || 'Unknown'}</p>
          {user.role === 'admin' && (
            <Shield className="w-3.5 h-3.5 text-purple-500" />
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>
      <div className="text-right">
        {getStatusBadge()}
        <p className="text-xs text-gray-400 mt-1">{formatDate(user.createdAt)}</p>
      </div>
    </button>
  );
};

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trialStats, setTrialStats] = useState<TrialStats | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [recentFeedback, setRecentFeedback] = useState<Feedback[]>([]);
  const [recentUsers, setRecentUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [dashboardStats, trialStatsData, healthData, feedbackResponse, usersResponse] =
        await Promise.all([
          adminService.getDashboardStats(),
          adminService.getTrialStats().catch(() => null),
          adminService.getSystemHealth().catch(() => null),
          feedbackService.getAllFeedback(1, 5),
          adminService.getUsers(1, 8, { sortBy: 'createdAt', sortOrder: 'desc' }),
        ]);

      setStats(dashboardStats);
      setTrialStats(trialStatsData);
      setSystemHealth(healthData);
      setRecentFeedback(feedbackResponse.feedback);
      setRecentUsers(usersResponse.users);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
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

  // Prepare chart data
  const signupChartData = stats?.dailySignups.map((d) => ({
    date: new Date(d._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    signups: d.count,
  })) || [];

  const subscriptionPieData = [
    { name: 'Pro', value: stats?.users.activeSubscriptions || 0 },
    { name: 'Trial', value: stats?.users.trialUsers || 0 },
    {
      name: 'Free',
      value:
        (stats?.users.total || 0) -
        (stats?.users.activeSubscriptions || 0) -
        (stats?.users.trialUsers || 0),
    },
  ].filter((d) => d.value > 0);

  const templateChartData = stats?.resumesByTemplate.slice(0, 6).map((t) => ({
    name: t._id || 'Unknown',
    count: t.count,
  })) || [];

  const openFeedbackCount = stats?.feedback.open || 0;
  const newThisWeek = stats?.users.newThisWeek || 0;
  const newThisMonth = stats?.users.newThisMonth || 0;
  const totalUsers = stats?.users.total || 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Monitor and manage your application</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
            Refresh
          </Button>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Users"
            value={stats?.users.total || 0}
            subtitle={`+${newThisWeek} this week`}
            trend={newThisWeek ? { value: Math.round((newThisWeek / totalUsers) * 100), isPositive: true } : undefined}
            icon={<Users className="w-5 h-5" />}
            color="blue"
            onClick={() => navigate('/admin/users')}
          />
          <StatsCard
            title="Pro Subscribers"
            value={stats?.users.activeSubscriptions || 0}
            subtitle={`${stats?.users.trialUsers || 0} on trial`}
            icon={<Crown className="w-5 h-5" />}
            color="purple"
            onClick={() => navigate('/admin/users?status=active')}
          />
          <StatsCard
            title="Total Resumes"
            value={stats?.resumes.total || 0}
            subtitle={`${stats?.resumes.totalDownloads || 0} downloads`}
            icon={<FileText className="w-5 h-5" />}
            color="green"
          />
          <StatsCard
            title="Open Feedback"
            value={openFeedbackCount}
            subtitle="Needs attention"
            icon={<MessageSquare className="w-5 h-5" />}
            color={openFeedbackCount > 0 ? 'rose' : 'amber'}
            onClick={() => navigate('/admin/feedback')}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Signups Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">User Signups</h2>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                +{newThisMonth} this month
              </Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={signupChartData}>
                  <defs>
                    <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="signups"
                    stroke={CHART_COLORS.primary}
                    strokeWidth={2}
                    fill="url(#signupGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subscription Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {subscriptionPieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 pt-3 border-t border-gray-100 space-y-1">
              {subscriptionPieData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[i] }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Template Usage */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Templates</h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={templateChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill={CHART_COLORS.secondary} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trial Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Trial Analytics</h2>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <div className="space-y-1 divide-y divide-gray-100">
              <MiniStat label="Total Trials Started" value={trialStats?.totalTrials || 0} />
              <MiniStat label="Active Trials" value={trialStats?.activeTrials || 0} color="text-amber-600" />
              <MiniStat label="Expired Trials" value={trialStats?.expiredTrials || 0} color="text-gray-500" />
              <MiniStat label="Converted to Pro" value={trialStats?.convertedTrials || 0} color="text-emerald-600" />
              <MiniStat
                label="Conversion Rate"
                value={`${trialStats?.conversionRate || 0}%`}
                color="text-primary"
              />
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
              <div
                className={cn(
                  'flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium',
                  systemHealth?.status === 'healthy'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                )}
              >
                <div
                  className={cn(
                    'w-2 h-2 rounded-full',
                    systemHealth?.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
                  )}
                />
                {systemHealth?.status || 'Unknown'}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Database className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">MongoDB</p>
                  <p className="text-xs text-gray-500">{systemHealth?.mongodb || 'Unknown'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Server className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Server Uptime</p>
                  <p className="text-xs text-gray-500">
                    {systemHealth?.uptime
                      ? `${Math.floor(systemHealth.uptime / 3600)}h ${Math.floor((systemHealth.uptime % 3600) / 60)}m`
                      : 'Unknown'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Activity className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Memory Usage</p>
                  <p className="text-xs text-gray-500">
                    {systemHealth?.memoryUsage
                      ? `${Math.round(systemHealth.memoryUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(systemHealth.memoryUsage.heapTotal / 1024 / 1024)}MB`
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Feedback */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <h2 className="font-semibold text-gray-900">Recent Feedback</h2>
                {openFeedbackCount > 0 && (
                  <Badge className="bg-rose-50 text-rose-700 border-rose-200">{openFeedbackCount} open</Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/feedback')} className="gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {recentFeedback.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">No feedback yet</p>
                </div>
              ) : (
                recentFeedback.map((fb) => (
                  <RecentFeedbackItem
                    key={fb.id}
                    feedback={fb}
                    onClick={() => navigate(`/admin/feedback/${fb.id}`)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-gray-400" />
                <h2 className="font-semibold text-gray-900">Recent Signups</h2>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  +{newThisWeek} this week
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/users')} className="gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {recentUsers.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">No users yet</p>
                </div>
              ) : (
                recentUsers.map((user) => (
                  <RecentUserItem
                    key={user._id || user.id}
                    user={user}
                    onClick={() => navigate(`/admin/users/${user._id || user.id}`)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
