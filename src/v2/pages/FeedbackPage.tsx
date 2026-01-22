/**
 * Feedback Submission Page - Enhanced UI
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { feedbackService } from '@/services';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  MessageSquarePlus,
  Bug,
  CreditCard,
  Lightbulb,
  HelpCircle,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import type { FeedbackType } from '@/types/feedback';
import { FEEDBACK_TYPE_INFO } from '@/types/feedback';

// Category card with icon and gradient
const CategoryCard: React.FC<{
  type: FeedbackType;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  color: string;
  bgGradient: string;
}> = ({ type, icon, selected, onClick, color, bgGradient }) => {
  const info = FEEDBACK_TYPE_INFO[type];
  const label = info.label.replace(' Report', '').replace(' Issue', '').replace(' Request', '').replace(' Feedback', '');

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 min-w-[80px] group',
        selected
          ? `border-transparent ${bgGradient} shadow-md`
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      )}
    >
      <div
        className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110',
          selected ? 'bg-white/90 shadow-sm' : color
        )}
      >
        {icon}
      </div>
      <span className={cn('text-xs font-medium', selected ? 'text-white' : 'text-gray-700')}>
        {label}
      </span>
      {selected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        </div>
      )}
    </button>
  );
};

export const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categoryConfig: Record<FeedbackType, { icon: React.ReactNode; color: string; bgGradient: string }> = {
    bug: {
      icon: <Bug className="w-5 h-5 text-red-500" />,
      color: 'bg-red-50',
      bgGradient: 'bg-gradient-to-br from-red-500 to-rose-600',
    },
    payment: {
      icon: <CreditCard className="w-5 h-5 text-amber-500" />,
      color: 'bg-amber-50',
      bgGradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
    feature: {
      icon: <Lightbulb className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-50',
      bgGradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    general: {
      icon: <HelpCircle className="w-5 h-5 text-purple-500" />,
      color: 'bg-purple-50',
      bgGradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
    },
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!user || !userProfile) {
        toast.error('Please sign in to submit feedback');
        navigate('/auth');
        return;
      }

      if (!selectedType) {
        toast.error('Please select a category');
        return;
      }

      if (!subject.trim()) {
        toast.error('Please enter a subject');
        return;
      }

      if (!description.trim()) {
        toast.error('Please enter a description');
        return;
      }

      setIsSubmitting(true);
      try {
        await feedbackService.submit({
          type: selectedType,
          subject: subject.trim(),
          description: description.trim(),
        });

        setIsSuccess(true);
        toast.success('Feedback submitted!');
      } catch (error) {
        console.error('Error submitting feedback:', error);
        toast.error('Failed to submit feedback');
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, selectedType, subject, description, navigate]
  );

  const handleSubmitAnother = useCallback(() => {
    setSelectedType(null);
    setSubject('');
    setDescription('');
    setIsSuccess(false);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-sm mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center">
              <MessageSquarePlus className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Sign in to continue</h1>
            <p className="text-sm text-gray-500 mb-6">Create an account or sign in to submit feedback and track your requests.</p>
            <Button onClick={() => navigate('/auth')} className="gap-2">
              <Sparkles className="w-4 h-4" />
              Get Started
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-sm mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-sm text-gray-500 mb-6">Your feedback has been submitted successfully. Our team will review it and get back to you soon.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate('/my-feedback')}>View My Feedback</Button>
              <Button variant="outline" onClick={handleSubmitAnother}>Submit Another</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md shadow-primary/20">
              <MessageSquarePlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Send Feedback</h1>
              <p className="text-xs text-gray-500">We'd love to hear from you</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Category Selection */}
            <div className="p-5 border-b border-gray-100">
              <Label className="text-sm font-medium text-gray-900 mb-3 block">What's this about?</Label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(FEEDBACK_TYPE_INFO) as FeedbackType[]).map((type) => (
                  <CategoryCard
                    key={type}
                    type={type}
                    icon={categoryConfig[type].icon}
                    color={categoryConfig[type].color}
                    bgGradient={categoryConfig[type].bgGradient}
                    selected={selectedType === type}
                    onClick={() => setSelectedType(type)}
                  />
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-5 space-y-4">
              {/* Subject */}
              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-900 mb-1.5 block">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your feedback"
                  className="h-10 border-gray-200 focus:border-primary focus:ring-primary/20"
                  maxLength={100}
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-900 mb-1.5 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more about your feedback, suggestion, or issue..."
                  className="min-h-[120px] resize-none border-gray-200 focus:border-primary focus:ring-primary/20"
                  maxLength={2000}
                />
                <p className="text-xs text-gray-400 mt-1.5 text-right">{description.length}/2000</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate('/my-feedback')}
                className="text-gray-600"
              >
                View My Feedback
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !selectedType || !subject.trim() || !description.trim()}
                className="gap-2 shadow-md shadow-primary/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FeedbackPage;
