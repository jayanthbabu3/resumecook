/**
 * Feedback Detail Page
 *
 * Shows feedback details with admin reply.
 * Users can view status updates and admin responses.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { feedbackService } from '@/services';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  MessageSquare,
  Loader2,
  Bug,
  CreditCard,
  Lightbulb,
  HelpCircle,
  Clock,
  Shield,
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

// Format date helper
const formatDate = (date: Date | string) => {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);
};

export const FeedbackDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);

  // Load feedback
  useEffect(() => {
    const loadFeedback = async () => {
      if (!id || !user) {
        setLoading(false);
        return;
      }

      try {
        const feedbackData = await feedbackService.getById(id);

        if (!feedbackData) {
          toast.error('Feedback not found');
          navigate('/my-feedback');
          return;
        }

        // Check if user owns this feedback
        if (feedbackData.userId !== user.id) {
          toast.error('You do not have access to this feedback');
          navigate('/my-feedback');
          return;
        }

        setFeedback(feedbackData);

        // Mark as read if there's an unread admin reply
        if (feedbackData.hasUnreadAdminReply) {
          try {
            await feedbackService.markAsRead(id);
          } catch {
            // Ignore if mark as read fails
          }
        }
      } catch (error) {
        console.error('Error loading feedback:', error);
        toast.error('Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, [id, user, navigate]);

  // Auth loading state
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

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto text-center p-6 bg-white rounded-xl border border-gray-200">
            <MessageSquare className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <h1 className="text-lg font-semibold text-gray-900 mb-1">Sign in required</h1>
            <p className="text-sm text-gray-500 mb-4">Please sign in to view feedback.</p>
            <Button size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
          </div>
        </main>
      </div>
    );
  }

  // Loading state
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

  // Feedback not found
  if (!feedback) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto text-center p-6 bg-white rounded-xl border border-gray-200">
            <MessageSquare className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <h1 className="text-lg font-semibold text-gray-900 mb-1">Feedback not found</h1>
            <p className="text-sm text-gray-500 mb-4">This feedback may have been deleted.</p>
            <Button size="sm" onClick={() => navigate('/my-feedback')}>Back</Button>
          </div>
        </main>
      </div>
    );
  }

  const typeInfo = FEEDBACK_TYPE_INFO[feedback.type];
  const statusInfo = FEEDBACK_STATUS_INFO[feedback.status];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="max-w-2xl mx-auto mb-4">
          <button
            onClick={() => navigate('/my-feedback')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {/* Feedback Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className={cn('p-2 rounded-lg', typeInfo.bgColor, 'flex-shrink-0')}>
                <span className={typeInfo.color}>{typeIcons[feedback.type]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base font-semibold text-gray-900 mb-1">{feedback.subject}</h1>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge className={cn('text-[10px] border', statusInfo.bgColor, statusInfo.color, statusInfo.borderColor)}>
                    {statusInfo.label}
                  </Badge>
                  <Badge className={cn('text-[10px] border', typeInfo.bgColor, typeInfo.color, typeInfo.borderColor)}>
                    {typeInfo.label}
                  </Badge>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(feedback.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{feedback.description}</p>
            {feedback.status === 'resolved' && feedback.resolvedAt && (
              <div className="mt-3 p-2 rounded-lg bg-green-50 border border-green-200">
                <p className="text-xs text-green-700">
                  Resolved: {formatDate(feedback.resolvedAt)}
                </p>
              </div>
            )}
          </div>

          {/* Admin Reply */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                Response
              </h2>
            </div>

            <div className="p-4">
              {feedback.adminReply ? (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0 ring-1 ring-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-xs font-semibold">
                      <Shield className="w-3.5 h-3.5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">Support Team</span>
                      {feedback.repliedAt && (
                        <span className="text-xs text-gray-400">
                          {formatDate(feedback.repliedAt)}
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{feedback.adminReply}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No response yet</p>
                  <p className="text-xs text-gray-400 mt-1">Our team will respond to your feedback soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackDetailPage;
