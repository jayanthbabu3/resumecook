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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Full width on mobile, centered on desktop */}
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center py-2 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600">
          <div className="w-10 h-1 bg-white/40 rounded-full" />
        </div>

        {/* Header with gradient - website theme color (blue) */}
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 px-4 sm:px-6 py-5 sm:py-8 text-white">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Icon */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-blue-700/20">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Chat with Resume</h2>
          <p className="text-white/85 text-xs sm:text-sm">
            Build your perfect resume through natural conversation with AI
          </p>

          {/* NEW badge - hidden on very small screens */}
          <div className="absolute top-4 sm:top-6 right-12 sm:right-14 hidden xs:block">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold bg-white/20 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              NEW
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          {/* Features */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {FEATURES.map((feature, index) => (
              <div key={index} className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0 ring-1 ring-blue-100">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/60 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 ring-1 ring-blue-100/50">
            <h4 className="font-semibold text-gray-900 text-sm mb-2 sm:mb-3">How it works</h4>
            <div className="space-y-2 sm:space-y-2.5">
              {STEPS.map((step, index) => (
                <div key={index} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-[10px] sm:text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => setShowTemplateSelector(true)}
            className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all"
          >
            Choose a Template
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Button>

          {/* Skip option */}
          <button
            onClick={() => onSelectTemplate('minimal-v2')}
            className="w-full mt-2.5 sm:mt-3 text-xs sm:text-sm text-gray-400 hover:text-blue-600 transition-colors pb-safe"
          >
            Skip and use default template
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithResumeIntroModal;
