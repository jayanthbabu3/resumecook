/**
 * Admin Users Management Page
 *
 * View all users with search and filter capabilities.
 * Shows subscription status and user details.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAllUsers, type UserWithSubscription } from '@/lib/firestore/adminService';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Users,
  Search,
  Filter,
  Loader2,
  Crown,
  Clock,
  Mail,
  Calendar,
  ChevronRight,
  UserCheck,
  UserX,
  Inbox,
} from 'lucide-react';

// Compact user row component
const UserRow: React.FC<{
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
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <Avatar className={cn('w-8 h-8', user.subscriptionStatus === 'active' && 'ring-1 ring-primary/30')}>
        <AvatarImage src={user.profilePhoto} alt={user.fullName} />
        <AvatarFallback className={cn('text-xs font-semibold text-white', user.subscriptionStatus === 'active' ? 'bg-gradient-to-br from-primary to-blue-600' : 'bg-gray-400')}>
          {user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
          {user.role === 'admin' && <Badge className="text-[10px] bg-purple-100 text-purple-700">Admin</Badge>}
        </div>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {getSubscriptionBadge()}
        <span className="text-xs text-gray-400 hidden sm:block">{formatDate(user.createdAt)}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); window.open(`mailto:${user.email}`, '_blank'); }}>
          <Mail className="w-3.5 h-3.5 text-gray-400" />
        </Button>
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
}> = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-3">
    <div className="flex items-center gap-2.5">
      <div className={cn('p-1.5 rounded-lg', color)}>{icon}</div>
      <div>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{title}</p>
      </div>
    </div>
  </div>
);

// Compact filter tabs
const FilterTabs: React.FC<{
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}> = ({ activeFilter, onFilterChange, counts }) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pro', label: 'Pro' },
    { id: 'trial', label: 'Trial' },
    { id: 'free', label: 'Free' },
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

export const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [users, setUsers] = useState<UserWithSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState(
    searchParams.get('filter') || 'all'
  );

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Calculate counts
  const counts = users.reduce(
    (acc, user) => {
      acc.all++;
      if (user.subscriptionStatus === 'active') acc.pro++;
      else if (user.subscriptionStatus === 'trialing') acc.trial++;
      else acc.free++;
      return acc;
    },
    { all: 0, pro: 0, trial: 0, free: 0 } as Record<string, number>
  );

  // Filter users
  const filteredUsers = users.filter((user) => {
    // Subscription filter
    if (subscriptionFilter === 'pro' && user.subscriptionStatus !== 'active') return false;
    if (subscriptionFilter === 'trial' && user.subscriptionStatus !== 'trialing') return false;
    if (
      subscriptionFilter === 'free' &&
      (user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing')
    )
      return false;

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (subscriptionFilter !== 'all') params.set('filter', subscriptionFilter);
    setSearchParams(params, { replace: true });
  }, [subscriptionFilter, setSearchParams]);

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
            Back
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <span className="text-xs text-gray-500">{users.length} total • {counts.pro} pro</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <StatsCard title="Total" value={counts.all} icon={<Users className="w-4 h-4 text-blue-600" />} color="bg-blue-100" />
          <StatsCard title="Pro" value={counts.pro} icon={<Crown className="w-4 h-4 text-purple-600" />} color="bg-purple-100" />
          <StatsCard title="Trial" value={counts.trial} icon={<Clock className="w-4 h-4 text-amber-600" />} color="bg-amber-100" />
          <StatsCard title="Free" value={counts.free} icon={<UserCheck className="w-4 h-4 text-green-600" />} color="bg-green-100" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
          <FilterTabs activeFilter={subscriptionFilter} onFilterChange={setSubscriptionFilter} counts={counts} />
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-10">
              <Inbox className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No users found</h3>
              <p className="text-xs text-gray-500">
                {searchQuery || subscriptionFilter !== 'all' ? 'Try adjusting filters' : 'No users yet'}
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => <UserRow key={user.id} user={user} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUsersPage;
