/**
 * My Feedback Page
 *
 * Shows user's submitted feedback with status tracking.
 * Clean, organized list view with status indicators.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { feedbackService } from '@/services';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  MessageSquare,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Inbox,
  Loader2,
  Bug,
  CreditCard,
  Lightbulb,
  HelpCircle,
  Bell,
} from 'lucide-react';
import type { Feedback, FeedbackType } from '@/types/feedback';
import { FEEDBACK_TYPE_INFO, FEEDBACK_STATUS_INFO } from '@/types/feedback';

// Type icons mapping
const typeIcons: Record<FeedbackType, React.ReactNode> = {
  bug: <Bug className="w-4 h-4" />,
  payment: <CreditCard className="w-4 h-4" />,
  feature: <Lightbulb className="w-4 h-4" />,
  general: <HelpCircle className="w-4 h-4" />,
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
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
    >
      {/* Type Icon */}
      <div className={cn('p-1.5 rounded-lg', typeInfo.bgColor, 'flex-shrink-0')}>
        <span className={typeInfo.color}>{typeIcons[feedback.type]}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{feedback.subject}</h3>
          {feedback.hasUnreadAdminReply && (
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] px-1.5 py-0">
              <Bell className="w-3 h-3 mr-0.5" />
              New
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{feedback.description}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge
          className={cn(
            'text-[10px] border',
            statusInfo.bgColor,
            statusInfo.color,
            statusInfo.borderColor
          )}
        >
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

// Compact empty state
const EmptyState: React.FC<{ onSubmitFeedback: () => void }> = ({ onSubmitFeedback }) => (
  <div className="text-center py-8">
    <Inbox className="w-10 h-10 mx-auto text-gray-300 mb-3" />
    <h2 className="text-sm font-medium text-gray-900 mb-1">No feedback yet</h2>
    <p className="text-xs text-gray-500 mb-3">Submit your first feedback to get started.</p>
    <Button size="sm" onClick={onSubmitFeedback} className="gap-1.5">
      <Plus className="w-3.5 h-3.5" />
      Submit Feedback
    </Button>
  </div>
);

// Compact status filter tabs
const StatusTabs: React.FC<{
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}> = ({ activeFilter, onFilterChange, counts }) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
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

export const MyFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Fetch user's feedback
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchFeedback = async () => {
      try {
        const response = await feedbackService.getMyFeedback();
        setFeedbackList(response.feedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [user]);

  // Calculate counts for each status
  const statusCounts = feedbackList.reduce(
    (acc, fb) => {
      acc.all++;
      acc[fb.status] = (acc[fb.status] || 0) + 1;
      return acc;
    },
    { all: 0, open: 0, in_progress: 0, resolved: 0, closed: 0 } as Record<string, number>
  );

  // Filter feedback based on active filter
  const filteredFeedback =
    activeFilter === 'all'
      ? feedbackList
      : feedbackList.filter((fb) => fb.status === activeFilter);

  // Loading auth state
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

  // If not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto text-center p-6 bg-white rounded-xl border border-gray-200">
            <MessageSquare className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <h1 className="text-lg font-semibold text-gray-900 mb-1">Sign in required</h1>
            <p className="text-sm text-gray-500 mb-4">Please sign in to view your feedback.</p>
            <Button size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="max-w-xl mx-auto mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">My Feedback</h1>
            <Button size="sm" onClick={() => navigate('/feedback')} className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              New
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : feedbackList.length === 0 ? (
            <EmptyState onSubmitFeedback={() => navigate('/feedback')} />
          ) : (
            <>
              {/* Status Filters */}
              <div className="p-3 border-b border-gray-100">
                <StatusTabs
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={statusCounts}
                />
              </div>

              {/* Feedback List */}
              {filteredFeedback.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  No feedback matching this filter
                </div>
              ) : (
                filteredFeedback.map((feedback) => (
                  <FeedbackRow
                    key={feedback.id}
                    feedback={feedback}
                    onClick={() => navigate(`/feedback/${feedback.id}`)}
                  />
                ))
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyFeedbackPage;
