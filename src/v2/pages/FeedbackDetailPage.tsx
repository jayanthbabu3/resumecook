/**
 * Feedback Detail Page
 *
 * Shows feedback details with conversation thread.
 * Users can view status updates and add replies.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import {
  getFeedbackById,
  getFeedbackReplies,
  addReply,
  markFeedbackAsReadByUser,
  subscribeToFeedbackReplies,
} from '@/lib/firestore/feedbackService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Loader2,
  Bug,
  CreditCard,
  Lightbulb,
  HelpCircle,
  Clock,
  Shield,
  User,
} from 'lucide-react';
import type { Feedback, FeedbackReply, FeedbackType } from '@/types/feedback';
import { FEEDBACK_TYPE_INFO, FEEDBACK_STATUS_INFO, FEEDBACK_PRIORITY_INFO } from '@/types/feedback';

// Type icons mapping
const typeIcons: Record<FeedbackType, React.ReactNode> = {
  bug: <Bug className="w-4 h-4" />,
  payment: <CreditCard className="w-4 h-4" />,
  feature: <Lightbulb className="w-4 h-4" />,
  general: <HelpCircle className="w-4 h-4" />,
};

// Format date helper
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

// Compact reply bubble component
const ReplyBubble: React.FC<{
  reply: FeedbackReply;
  isCurrentUser: boolean;
}> = ({ reply, isCurrentUser }) => {
  const isAdmin = reply.authorRole === 'admin';

  return (
    <div className={cn('flex gap-2', isCurrentUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar */}
      <Avatar className={cn('w-7 h-7 flex-shrink-0', isAdmin && 'ring-1 ring-primary/30')}>
        <AvatarImage src={reply.authorPhoto} alt={reply.authorName} />
        <AvatarFallback
          className={cn(
            'text-xs font-semibold text-white',
            isAdmin ? 'bg-gradient-to-br from-primary to-blue-600' : 'bg-gray-400'
          )}
        >
          {isAdmin ? (
            <Shield className="w-3 h-3" />
          ) : (
            reply.authorName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
          )}
        </AvatarFallback>
      </Avatar>

      {/* Message */}
      <div className={cn('flex-1 max-w-[85%]', isCurrentUser && 'flex flex-col items-end')}>
        <div className={cn('flex items-center gap-1.5 mb-0.5', isCurrentUser && 'flex-row-reverse')}>
          <span className="text-xs font-medium text-gray-900">
            {isAdmin ? 'Support' : reply.authorName}
          </span>
          <span className="text-[10px] text-gray-400">
            {formatDate(reply.createdAt instanceof Date ? reply.createdAt : new Date())}
          </span>
        </div>
        <div
          className={cn(
            'px-3 py-2 rounded-xl text-sm',
            isCurrentUser
              ? 'bg-primary text-white rounded-tr-sm'
              : isAdmin
                ? 'bg-primary/5 border border-primary/10 rounded-tl-sm'
                : 'bg-gray-100 rounded-tl-sm text-gray-700'
          )}
        >
          <p className="whitespace-pre-wrap">{reply.message}</p>
        </div>
      </div>
    </div>
  );
};

export const FeedbackDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, userProfile } = useFirebaseAuth();
  const repliesEndRef = useRef<HTMLDivElement>(null);

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [replies, setReplies] = useState<FeedbackReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Load feedback and replies
  useEffect(() => {
    const loadFeedback = async () => {
      if (!id || !user) {
        setLoading(false);
        return;
      }

      try {
        const feedbackData = await getFeedbackById(id);

        if (!feedbackData) {
          toast.error('Feedback not found');
          navigate('/my-feedback');
          return;
        }

        // Check if user owns this feedback
        if (feedbackData.userId !== user.uid) {
          toast.error('You do not have access to this feedback');
          navigate('/my-feedback');
          return;
        }

        setFeedback(feedbackData);

        // Mark as read if there's an unread admin reply
        if (feedbackData.hasUnreadAdminReply) {
          await markFeedbackAsReadByUser(id);
        }

        // Load replies
        const repliesData = await getFeedbackReplies(id);
        setReplies(repliesData);
      } catch (error) {
        console.error('Error loading feedback:', error);
        toast.error('Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, [id, user, navigate]);

  // Subscribe to real-time reply updates
  useEffect(() => {
    if (!id) return;

    const unsubscribe = subscribeToFeedbackReplies(id, (newReplies) => {
      setReplies(newReplies);
    });

    return () => unsubscribe();
  }, [id]);

  // Scroll to bottom when new replies arrive
  useEffect(() => {
    repliesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [replies]);

  // Handle send reply
  const handleSendReply = useCallback(async () => {
    if (!id || !user || !userProfile || !replyText.trim()) return;

    setIsSending(true);
    try {
      await addReply(
        id,
        user.uid,
        userProfile.fullName || user.displayName || 'User',
        'user',
        { message: replyText.trim() },
        user.photoURL || undefined
      );

      setReplyText('');
      toast.success('Reply sent');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setIsSending(false);
    }
  }, [id, user, userProfile, replyText]);

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
                    {formatDate(feedback.createdAt instanceof Date ? feedback.createdAt : new Date())}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{feedback.description}</p>
            {feedback.status === 'resolved' && feedback.resolvedAt && (
              <div className="mt-3 p-2 rounded-lg bg-green-50 border border-green-200">
                <p className="text-xs text-green-700">
                  Resolved: {formatDate(feedback.resolvedAt instanceof Date ? feedback.resolvedAt : new Date())}
                </p>
              </div>
            )}
          </div>

          {/* Conversation Thread */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                Conversation
                {replies.length > 0 && <span className="text-xs text-gray-400">({replies.length})</span>}
              </h2>
            </div>

            {/* Replies */}
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              {replies.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No replies yet</p>
                </div>
              ) : (
                replies.map((reply) => (
                  <ReplyBubble
                    key={reply.id}
                    reply={reply}
                    isCurrentUser={reply.authorId === user.uid}
                  />
                ))
              )}
              <div ref={repliesEndRef} />
            </div>

            <Separator />

            {/* Reply Input */}
            <div className="p-3">
              <div className="flex gap-2">
                <Avatar className="w-7 h-7 flex-shrink-0">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs font-medium">
                    {(user.displayName || user.email || 'U').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="min-h-[36px] max-h-[80px] resize-none text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendReply}
                    disabled={isSending || !replyText.trim()}
                    size="icon"
                    className="h-9 w-9 flex-shrink-0"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackDetailPage;
