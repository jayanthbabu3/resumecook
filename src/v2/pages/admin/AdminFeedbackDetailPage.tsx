/**
 * Admin Feedback Detail Page
 *
 * View feedback details, change status/priority, and respond to users.
 * Full admin controls for managing individual feedback items.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { feedbackService } from '@/services';
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
  Trash2,
  Mail,
} from 'lucide-react';
import type { Feedback, FeedbackType, FeedbackStatus, FeedbackPriority } from '@/types/feedback';
import { FEEDBACK_TYPE_INFO, FEEDBACK_STATUS_INFO, FEEDBACK_PRIORITY_INFO } from '@/types/feedback';

// Type icons
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

// Compact info row component
const InfoRow: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-xs font-medium text-gray-900">{value}</span>
  </div>
);

export const AdminFeedbackDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Load feedback
  useEffect(() => {
    const loadFeedback = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const feedbackData = await feedbackService.getById(id, { admin: true });

        if (!feedbackData) {
          toast.error('Feedback not found');
          navigate('/admin/feedback');
          return;
        }

        setFeedback(feedbackData);
        // Pre-fill reply if exists
        if (feedbackData.adminReply) {
          setReplyText(feedbackData.adminReply);
        }
      } catch (error) {
        console.error('Error loading feedback:', error);
        toast.error('Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, [id, navigate]);

  // Handle send reply
  const handleSendReply = useCallback(async () => {
    if (!id || !replyText.trim()) return;

    setIsSending(true);
    try {
      const updated = await feedbackService.reply(id, replyText.trim());
      setFeedback(updated);
      toast.success('Reply sent to user');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setIsSending(false);
    }
  }, [id, replyText]);

  // Handle status change
  const handleStatusChange = useCallback(
    async (newStatus: FeedbackStatus) => {
      if (!id || !feedback) return;

      try {
        const updated = await feedbackService.updateStatus(id, newStatus);
        setFeedback(updated);
        toast.success(`Status updated to ${FEEDBACK_STATUS_INFO[newStatus].label}`);
      } catch (error) {
        console.error('Error updating status:', error);
        toast.error('Failed to update status');
      }
    },
    [id, feedback]
  );

  // Handle priority change
  const handlePriorityChange = useCallback(
    async (newPriority: FeedbackPriority) => {
      if (!id || !feedback) return;

      try {
        const updated = await feedbackService.updatePriority(id, newPriority);
        setFeedback(updated);
        toast.success(`Priority updated to ${FEEDBACK_PRIORITY_INFO[newPriority].label}`);
      } catch (error) {
        console.error('Error updating priority:', error);
        toast.error('Failed to update priority');
      }
    },
    [id, feedback]
  );

  // Handle delete
  const handleDelete = useCallback(async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await feedbackService.delete(id);
      toast.success('Feedback deleted');
      navigate('/admin/feedback');
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Failed to delete feedback');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  }, [id, navigate]);

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

  // Not found
  if (!feedback) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto text-center p-6 bg-white rounded-xl border border-gray-200">
            <MessageSquare className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <h1 className="text-lg font-semibold text-gray-900 mb-1">Feedback not found</h1>
            <Button size="sm" onClick={() => navigate('/admin/feedback')}>Back</Button>
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
        <div className="mb-4">
          <button
            onClick={() => navigate('/admin/feedback')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
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
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{feedback.description}</p>
            </div>

            {/* Reply Section */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  {feedback.adminReply ? 'Edit Response' : 'Send Response'}
                </h2>
              </div>

              {/* Current Reply if exists */}
              {feedback.adminReply && (
                <div className="p-4 border-b border-gray-100 bg-gray-50/30">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0 ring-1 ring-primary/30">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-xs font-semibold">
                        <Shield className="w-3.5 h-3.5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">Current Response</span>
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
                </div>
              )}

              {/* Reply Input */}
              <div className="p-4">
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0 ring-1 ring-primary/30">
                    <AvatarImage src={user?.profilePhoto || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-xs font-semibold">
                      <Shield className="w-3.5 h-3.5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a response..."
                      className="min-h-[100px] resize-none text-sm"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSendReply}
                        disabled={isSending || !replyText.trim()}
                        size="sm"
                        className="gap-1.5"
                      >
                        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {feedback.adminReply ? 'Update Response' : 'Send Response'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* User Info */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-500" />
                  Submitted By
                </h2>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2.5 mb-3">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xs font-semibold">
                      {feedback.userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{feedback.userName}</p>
                    <p className="text-xs text-gray-500">{feedback.userEmail}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-1.5 h-8 text-xs" onClick={() => window.open(`mailto:${feedback.userEmail}`, '_blank')}>
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-medium text-gray-900">Actions</h2>
              </div>
              <div className="p-3 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Status</label>
                  <Select value={feedback.status} onValueChange={(v) => handleStatusChange(v as FeedbackStatus)}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Priority</label>
                  <Select value={feedback.priority} onValueChange={(v) => handlePriorityChange(v as FeedbackPriority)}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
              </div>
              <div className="p-3 divide-y divide-gray-100">
                <InfoRow label="Created" value={formatDate(feedback.createdAt)} />
                <InfoRow label="Updated" value={formatDate(feedback.updatedAt)} />
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-red-100 bg-red-50/50">
                <h2 className="text-xs font-medium text-red-900">Danger</h2>
              </div>
              <div className="p-3">
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full gap-1.5 h-8 text-xs text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete feedback?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the feedback and the response.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminFeedbackDetailPage;
