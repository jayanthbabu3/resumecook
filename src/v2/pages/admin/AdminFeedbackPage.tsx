/**
 * Admin Feedback Management Page
 *
 * List all feedback with filters and search.
 * Allows admins to view, respond, and manage feedback.
 */

import React, { useState, useEffect } from 'react';
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
import { subscribeToAllFeedback } from '@/lib/firestore/feedbackService';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  MessageSquare,
  Search,
  Filter,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Bug,
  CreditCard,
  Lightbulb,
  HelpCircle,
  Bell,
  Inbox,
  XCircle,
} from 'lucide-react';
import type { Feedback, FeedbackType, FeedbackStatus } from '@/types/feedback';
import { FEEDBACK_TYPE_INFO, FEEDBACK_STATUS_INFO, FEEDBACK_PRIORITY_INFO } from '@/types/feedback';

// Type icons
const typeIcons: Record<FeedbackType, React.ReactNode> = {
  bug: <Bug className="w-4 h-4" />,
  payment: <CreditCard className="w-4 h-4" />,
  feature: <Lightbulb className="w-4 h-4" />,
  general: <HelpCircle className="w-4 h-4" />,
};

// Status icons
const statusIcons: Record<FeedbackStatus, React.ReactNode> = {
  open: <AlertCircle className="w-3.5 h-3.5" />,
  in_progress: <Clock className="w-3.5 h-3.5" />,
  resolved: <CheckCircle2 className="w-3.5 h-3.5" />,
  closed: <XCircle className="w-3.5 h-3.5" />,
};

// Compact feedback row component
const FeedbackRow: React.FC<{
  feedback: Feedback;
  onClick: () => void;
}> = ({ feedback, onClick }) => {
  const typeInfo = FEEDBACK_TYPE_INFO[feedback.type];
  const statusInfo = FEEDBACK_STATUS_INFO[feedback.status];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Now';
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
    >
      {/* Type Icon */}
      <div className={cn('p-1.5 rounded-md', typeInfo.bgColor, 'flex-shrink-0')}>
        <span className={typeInfo.color}>{typeIcons[feedback.type]}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{feedback.subject}</h3>
          {feedback.hasUnreadUserReply && (
            <Badge className="bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0">
              <Bell className="w-3 h-3 mr-0.5" />
              New
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{feedback.userName} • {feedback.userEmail}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge className={cn('text-[10px] border', statusInfo.bgColor, statusInfo.color, statusInfo.borderColor)}>
          {statusInfo.label}
        </Badge>
        <span className="text-xs text-gray-400 hidden sm:block">
          {formatDate(feedback.createdAt instanceof Date ? feedback.createdAt : new Date())}
        </span>
        <ChevronRight className="w-4 h-4 text-gray-300" />
      </div>
    </button>
  );
};

// Compact filter tabs
const FilterTabs: React.FC<{
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}> = ({ activeFilter, onFilterChange, counts }) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
    { id: 'closed', label: 'Closed' },
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

export const AdminFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all');

  // Subscribe to all feedback
  useEffect(() => {
    const unsubscribe = subscribeToAllFeedback((feedback) => {
      setFeedbackList(feedback);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Calculate counts
  const statusCounts = feedbackList.reduce(
    (acc, fb) => {
      acc.all++;
      acc[fb.status] = (acc[fb.status] || 0) + 1;
      return acc;
    },
    { all: 0, open: 0, in_progress: 0, resolved: 0, closed: 0 } as Record<string, number>
  );

  // Filter feedback
  const filteredFeedback = feedbackList.filter((fb) => {
    // Status filter
    if (statusFilter !== 'all' && fb.status !== statusFilter) return false;

    // Type filter
    if (typeFilter !== 'all' && fb.type !== typeFilter) return false;

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        fb.subject.toLowerCase().includes(query) ||
        fb.description.toLowerCase().includes(query) ||
        fb.userName.toLowerCase().includes(query) ||
        fb.userEmail.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (typeFilter !== 'all') params.set('type', typeFilter);
    setSearchParams(params, { replace: true });
  }, [statusFilter, typeFilter, setSearchParams]);

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
            <h1 className="text-xl font-semibold text-gray-900">Feedback</h1>
            <span className="text-xs text-gray-500">{feedbackList.length} total • {statusCounts.open} open</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="feature">Feature</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <FilterTabs activeFilter={statusFilter} onFilterChange={setStatusFilter} counts={statusCounts} />
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : filteredFeedback.length === 0 ? (
            <div className="text-center py-10">
              <Inbox className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No feedback found</h3>
              <p className="text-xs text-gray-500">
                {searchQuery || typeFilter !== 'all' || statusFilter !== 'all' ? 'Try adjusting filters' : 'No feedback yet'}
              </p>
            </div>
          ) : (
            filteredFeedback.map((feedback) => (
              <FeedbackRow key={feedback.id} feedback={feedback} onClick={() => navigate(`/admin/feedback/${feedback.id}`)} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminFeedbackPage;
