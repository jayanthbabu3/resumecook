/**
 * Chat With Resume - Intro Modal
 *
 * Shows a welcome screen explaining the "Chat with Resume" feature
 * with steps and benefits, then allows user to select a template.
 */

import React, { useState } from 'react';
import { X, MessageSquare, Sparkles, FileText, Wand2, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TemplateSelectorModal } from './TemplateSelectorModal';

interface ChatWithResumeIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Natural Conversation',
    description: 'Just chat naturally - tell the AI about your experience, skills, and goals.',
  },
  {
    icon: Wand2,
    title: 'AI-Powered Writing',
    description: 'AI transforms your input into professional resume content instantly.',
  },
  {
    icon: FileText,
    title: 'Live Preview',
    description: 'Watch your resume update in real-time as you chat.',
  },
];

const STEPS = [
  'Choose a template to get started',
  'Chat with AI about your experience',
  'Review and download your resume',
];

export const ChatWithResumeIntroModal: React.FC<ChatWithResumeIntroModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  if (!isOpen) return null;

  // If showing template selector, render that instead
  if (showTemplateSelector) {
    return (
      <TemplateSelectorModal
        isOpen={true}
        onClose={() => {
          setShowTemplateSelector(false);
          onClose();
        }}
        onSelect={(templateId) => {
          setShowTemplateSelector(false);
          onSelectTemplate(templateId);
        }}
        themeColor="#3b82f6"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header with gradient - website theme color (blue) */}
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 px-6 py-8 text-white">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg shadow-blue-700/20">
            <MessageSquare className="w-8 h-8" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2">Chat with Resume</h2>
          <p className="text-white/85 text-sm">
            Build your perfect resume through natural conversation with AI
          </p>

          {/* NEW badge */}
          <div className="absolute top-6 right-14">
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" />
              NEW
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Features */}
          <div className="space-y-4 mb-6">
            {FEATURES.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0 ring-1 ring-blue-100">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/60 rounded-xl p-4 mb-6 ring-1 ring-blue-100/50">
            <h4 className="font-semibold text-gray-900 text-sm mb-3">How it works</h4>
            <div className="space-y-2.5">
              {STEPS.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => setShowTemplateSelector(true)}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all"
          >
            Choose a Template
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Skip option */}
          <button
            onClick={() => onSelectTemplate('minimal-v2')}
            className="w-full mt-3 text-sm text-gray-400 hover:text-blue-600 transition-colors"
          >
            Skip and use default template
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithResumeIntroModal;
