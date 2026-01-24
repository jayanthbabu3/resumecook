/**
 * Feedback Submission Page
 * Clean, minimal design
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { feedbackService } from '@/services';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  Bug,
  CreditCard,
  Lightbulb,
  HelpCircle,
  Send,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import type { FeedbackType } from '@/types/feedback';

const categories = [
  { type: 'bug' as FeedbackType, label: 'Bug Report', icon: Bug, color: 'text-red-500', bg: 'bg-red-50', ring: 'ring-red-500' },
  { type: 'feature' as FeedbackType, label: 'Feature Request', icon: Lightbulb, color: 'text-blue-500', bg: 'bg-blue-50', ring: 'ring-blue-500' },
  { type: 'payment' as FeedbackType, label: 'Payment Issue', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50', ring: 'ring-amber-500' },
  { type: 'general' as FeedbackType, label: 'General', icon: HelpCircle, color: 'text-gray-500', bg: 'bg-gray-100', ring: 'ring-gray-500' },
];

export const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!user || !selectedType || !subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      await feedbackService.submit({
        type: selectedType,
        subject: subject.trim(),
        description: description.trim(),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [user, selectedType, subject, description]);

  // Loading auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="text-center px-4">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Sign in to send feedback</h1>
            <p className="text-gray-500 mb-6">We'd love to hear from you</p>
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          </div>
        </main>
      </div>
    );
  }

  // Success
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="text-center px-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Feedback sent!</h2>
            <p className="text-gray-500 mb-8">Thank you for helping us improve.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/my-feedback')}>
                View My Feedback
              </Button>
              <Button onClick={() => { setSelectedType(null); setSubject(''); setDescription(''); setIsSuccess(false); }}>
                Send Another
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isFormValid = selectedType && subject.trim() && description.trim();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <Button
            variant="outline"
            onClick={() => navigate('/my-feedback')}
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            My Feedback
          </Button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Send Feedback</h1>
          <p className="text-gray-500 mt-1">Help us make ResumeCook better</p>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            What's this about?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedType === cat.type;
              return (
                <button
                  key={cat.type}
                  type="button"
                  onClick={() => setSelectedType(cat.type)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    isSelected
                      ? `${cat.bg} border-transparent ring-2 ${cat.ring}`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isSelected ? cat.color : 'text-gray-400')} />
                  <span className={cn('text-sm font-medium', isSelected ? 'text-gray-900' : 'text-gray-600')}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Subject
          </label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary"
            maxLength={100}
            className="h-12 text-base"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Details
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us more..."
            className="min-h-[200px] text-base resize-none"
            maxLength={2000}
          />
          <div className="text-right mt-1">
            <span className="text-xs text-gray-400">{description.length}/2000</span>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <span className="text-sm text-gray-400">We typically respond within 24 hours</span>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid}
            className="h-11 px-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Feedback
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FeedbackPage;
