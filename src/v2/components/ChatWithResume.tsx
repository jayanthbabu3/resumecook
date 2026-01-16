/**
 * Chat With Resume - Main Component
 *
 * A beautiful chat interface for building resumes through conversation.
 * Features:
 * - Floating chat button OR integrated side panel mode
 * - Expandable chat panel
 * - Message bubbles with typing animation
 * - Quick action buttons
 * - Suggested questions
 * - Section update badges
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  Trash2,
  User,
  Bot,
  Zap,
  ArrowLeft,
  Mic,
  MicOff,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChatMessage, ChatResumeUpdatePayload, DEFAULT_QUICK_ACTIONS } from '../types/chat';
import { V2ResumeData } from '../types/resumeData';
import { useChatWithResume } from '../hooks/useChatWithResume';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { formatSectionName, SectionVariantsMap } from '../services/chatService';

interface ChatWithResumeProps {
  resumeData: V2ResumeData;
  /** Current section variants for context (e.g., {skills: 'pills', experience: 'timeline'}) */
  sectionVariants?: SectionVariantsMap;
  /** Callback when resume is updated - includes section info for selective enabling */
  onResumeUpdate: (payload: ChatResumeUpdatePayload) => void;
  onHighlightSections?: (sections: string[]) => void;
  className?: string;
  /** When true, renders as a side panel instead of floating button */
  mode?: 'floating' | 'panel';
  /** Callback when panel should close (only used in panel mode) */
  onClose?: () => void;
}

export function ChatWithResume({
  resumeData,
  sectionVariants,
  onResumeUpdate,
  onHighlightSections,
  className,
  mode = 'floating',
  onClose,
}: ChatWithResumeProps) {
  const {
    messages,
    isLoading,
    isOpen,
    suggestedQuestions,
    highlightedSections,
    isStreamingResume,
    sendMessage,
    clearChat,
    toggleChat,
    closeChat,
    openChat,
  } = useChatWithResume({
    resumeData,
    sectionVariants,
    onResumeUpdate,
    onHighlightSections,
  });

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Voice input hook
  const {
    isSupported: voiceSupported,
    isListening,
    transcript,
    interimTranscript,
    error: voiceError,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript,
  } = useVoiceInput({
    language: 'en-US',
    autoSubmitDelay: 0, // Disabled - user will review and send manually
    onResult: (finalText) => {
      // When voice input is complete, set as input value for user to review
      if (finalText.trim()) {
        setInputValue(finalText.trim());
      }
    },
    onInterimResult: (interim) => {
      // Show interim results in real-time
      if (interim) {
        setInputValue(prev => {
          // Replace only the interim part
          const finalPart = transcript.replace(interimTranscript, '');
          return finalPart + interim;
        });
      }
    },
  });

  // Update input when transcript changes during voice input
  useEffect(() => {
    if (isListening && transcript) {
      setInputValue(transcript);
    }
  }, [isListening, transcript]);

  // Auto-resize textarea based on content
  const adjustTextareaHeight = useCallback(() => {
    const textarea = inputRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight, capped at max height
      const maxHeight = 150; // Max 150px height
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, []);

  // Trigger resize when input value changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue, adjustTextareaHeight]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens or in panel mode
  useEffect(() => {
    if (isOpen || mode === 'panel') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, mode]);

  // Auto-open in panel mode
  useEffect(() => {
    if (mode === 'panel' && !isOpen) {
      openChat();
    }
  }, [mode, isOpen, openChat]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!inputValue.trim() || isLoading) return;

      const message = inputValue;
      setInputValue('');
      await sendMessage(message);
    },
    [inputValue, isLoading, sendMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleQuickAction = useCallback(
    (prompt: string) => {
      setInputValue(prompt);
      inputRef.current?.focus();
    },
    []
  );

  const handleSuggestedQuestion = useCallback(
    async (question: string) => {
      await sendMessage(question);
    },
    [sendMessage]
  );

  const handleClose = useCallback(() => {
    if (mode === 'panel' && onClose) {
      onClose();
    } else {
      closeChat();
    }
  }, [mode, onClose, closeChat]);

  // Floating mode - show button when closed, popup when open
  if (mode === 'floating') {
    return (
      <div className={cn('fixed bottom-4 right-4 z-50', className)}>
        {isOpen ? (
          <FloatingChatPanel
            messages={messages}
            isLoading={isLoading}
            inputValue={inputValue}
            suggestedQuestions={suggestedQuestions}
            highlightedSections={highlightedSections}
            isStreamingResume={isStreamingResume}
            messagesEndRef={messagesEndRef}
            inputRef={inputRef}
            onInputChange={setInputValue}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            onQuickAction={handleQuickAction}
            onSuggestedQuestion={handleSuggestedQuestion}
            onClear={clearChat}
            onClose={handleClose}
            onAdjustHeight={adjustTextareaHeight}
            voiceSupported={voiceSupported}
            isListening={isListening}
            voiceError={voiceError}
            onToggleVoice={toggleListening}
          />
        ) : (
          <ChatButton onClick={toggleChat} />
        )}
      </div>
    );
  }

  // Panel mode - full height side panel
  return (
    <SidePanelChat
      messages={messages}
      isLoading={isLoading}
      inputValue={inputValue}
      suggestedQuestions={suggestedQuestions}
      highlightedSections={highlightedSections}
      isStreamingResume={isStreamingResume}
      messagesEndRef={messagesEndRef}
      inputRef={inputRef}
      onInputChange={setInputValue}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      onQuickAction={handleQuickAction}
      onSuggestedQuestion={handleSuggestedQuestion}
      onClear={clearChat}
      onClose={handleClose}
      onAdjustHeight={adjustTextareaHeight}
      className={className}
      voiceSupported={voiceSupported}
      isListening={isListening}
      voiceError={voiceError}
      onToggleVoice={toggleListening}
    />
  );
}

// ============================================================================
// CHAT BUTTON (for floating mode)
// ============================================================================

interface ChatButtonProps {
  onClick: () => void;
}

function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-3 rounded-full',
        'bg-gradient-to-r from-primary via-blue-600 to-indigo-600',
        'text-white font-medium shadow-lg shadow-primary/30',
        'hover:shadow-xl hover:shadow-primary/40',
        'active:scale-95',
        'transition-all duration-200'
      )}
    >
      <Sparkles className="w-5 h-5" />
      <span className="hidden sm:inline">Talk with Resume</span>
      <MessageCircle className="w-5 h-5 sm:hidden" />
    </button>
  );
}

// ============================================================================
// SIDE PANEL CHAT (for integrated mode)
// ============================================================================

interface SidePanelChatProps {
  messages: ChatMessage[];
  isLoading: boolean;
  inputValue: string;
  suggestedQuestions: string[];
  highlightedSections: string[];
  isStreamingResume: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  onInputChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onQuickAction: (prompt: string) => void;
  onSuggestedQuestion: (question: string) => void;
  onClear: () => void;
  onClose: () => void;
  onAdjustHeight: () => void;
  className?: string;
  // Voice input props
  voiceSupported: boolean;
  isListening: boolean;
  voiceError: string | null;
  onToggleVoice: () => void;
}

function SidePanelChat({
  messages,
  isLoading,
  inputValue,
  suggestedQuestions,
  highlightedSections,
  isStreamingResume,
  messagesEndRef,
  inputRef,
  onInputChange,
  onSubmit,
  onKeyDown,
  onQuickAction,
  onSuggestedQuestion,
  onClear,
  onClose,
  onAdjustHeight,
  className,
  voiceSupported,
  isListening,
  voiceError,
  onToggleVoice,
}: SidePanelChatProps) {
  const showQuickActions = messages.length <= 1;

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white rounded-xl border border-gray-200 shadow-sm',
        'overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Back to form"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Talk with Resume</h3>
              <p className="text-xs text-white/80">AI-powered resume builder</p>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
          title="Clear chat"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {/* Quick actions for new chat */}
        {showQuickActions && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-blue-100 mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                Let's build your resume together
              </h4>
              <p className="text-xs text-gray-500 max-w-[280px] mx-auto">
                Tell me about yourself - your experience, skills, education - and I'll help structure it perfectly.
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center">Quick start:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {DEFAULT_QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => onQuickAction(action.prompt)}
                  className={cn(
                    'px-3 py-2 text-xs font-medium rounded-lg',
                    'bg-white border border-gray-200',
                    'text-gray-700 hover:text-primary',
                    'hover:border-primary/30 hover:bg-primary/5',
                    'transition-all duration-200',
                    'shadow-sm hover:shadow'
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}

        {/* Streaming indicator */}
        {isStreamingResume && (
          <div className="flex items-center justify-center gap-2 py-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full">
              <Loader2 className="w-3 h-3 text-primary animate-spin" />
              <span className="text-xs font-medium text-primary">
                Updating resume...
              </span>
            </div>
          </div>
        )}

        {/* Updated sections badges */}
        {highlightedSections.length > 0 && !isStreamingResume && (
          <div className="flex flex-wrap gap-1.5 justify-center animate-in fade-in zoom-in-95 duration-300">
            {highlightedSections.map((section) => (
              <span
                key={section}
                className={cn(
                  'px-2 py-0.5 text-xs font-medium rounded-full',
                  'bg-green-100 text-green-700 border border-green-200'
                )}
              >
                {formatSectionName(section)} updated
              </span>
            ))}
          </div>
        )}

        {/* Suggested questions */}
        {suggestedQuestions.length > 0 && !isLoading && messages.length > 1 && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs text-gray-500 text-center">Suggestions:</p>
            <div className="flex flex-col gap-1.5">
              {suggestedQuestions.slice(0, 2).map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => onSuggestedQuestion(question)}
                  className={cn(
                    'w-full px-3 py-2 text-xs text-left rounded-lg',
                    'bg-white border border-gray-200',
                    'text-gray-600 hover:text-primary',
                    'hover:border-primary/30 hover:bg-primary/5',
                    'transition-all duration-200',
                    'flex items-center gap-2'
                  )}
                >
                  <Zap className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="line-clamp-2">{question}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Error Toast */}
      {voiceError && (
        <div className="px-3 sm:px-4 py-2 bg-red-50 border-t border-red-100">
          <div className="flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{voiceError}</span>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
        <form onSubmit={onSubmit}>
          <div className={cn(
            "flex items-end gap-2 sm:gap-3 bg-gray-50 rounded-2xl border transition-all duration-200 p-1.5 sm:p-2",
            isListening
              ? "border-red-400 ring-2 ring-red-500/20 bg-red-50/30"
              : "border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
          )}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                onInputChange(e.target.value);
                onAdjustHeight();
              }}
              onKeyDown={onKeyDown}
              placeholder={isListening ? "Listening..." : "Tell me about yourself..."}
              rows={1}
              className={cn(
                'flex-1 px-3 py-2.5 sm:py-3',
                'bg-transparent border-none',
                'text-sm text-gray-900 placeholder:text-gray-400',
                'focus:outline-none',
                'resize-none overflow-y-auto',
                'transition-all duration-200',
                isListening && 'placeholder:text-red-400'
              )}
              style={{
                minHeight: '44px',
                maxHeight: '150px',
              }}
              disabled={isLoading || isListening}
            />

            {/* Voice Input Button */}
            {voiceSupported && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      onClick={onToggleVoice}
                      disabled={isLoading}
                      className={cn(
                        'h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex-shrink-0 self-end mb-0.5',
                        isListening
                          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-600',
                        'transition-all duration-200'
                      )}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{isListening ? 'Stop recording' : 'Voice input'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading || isListening}
              className={cn(
                'h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex-shrink-0 self-end mb-0.5',
                'bg-gradient-to-r from-primary to-blue-600',
                'hover:from-primary/90 hover:to-blue-700',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'shadow-md hover:shadow-lg',
                'transition-all duration-200'
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </form>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          {isListening ? (
            <span className="text-red-500 font-medium">🎤 Recording... Click mic again to stop</span>
          ) : (
            <>Press Enter to send • {voiceSupported ? 'Click mic to speak' : 'Shift+Enter for new line'}</>
          )}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// FLOATING CHAT PANEL (popup style)
// ============================================================================

interface FloatingChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  inputValue: string;
  suggestedQuestions: string[];
  highlightedSections: string[];
  isStreamingResume: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  onInputChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onQuickAction: (prompt: string) => void;
  onSuggestedQuestion: (question: string) => void;
  onClear: () => void;
  onClose: () => void;
  onAdjustHeight: () => void;
  // Voice input props
  voiceSupported: boolean;
  isListening: boolean;
  voiceError: string | null;
  onToggleVoice: () => void;
}

function FloatingChatPanel({
  messages,
  isLoading,
  inputValue,
  suggestedQuestions,
  highlightedSections,
  isStreamingResume,
  messagesEndRef,
  inputRef,
  onInputChange,
  onSubmit,
  onKeyDown,
  onQuickAction,
  onSuggestedQuestion,
  onClear,
  onClose,
  onAdjustHeight,
  voiceSupported,
  isListening,
  voiceError,
  onToggleVoice,
}: FloatingChatPanelProps) {
  const showQuickActions = messages.length <= 1;

  return (
    <div
      className={cn(
        'flex flex-col',
        'w-[95vw] sm:w-[420px] h-[70vh] sm:h-[600px] max-h-[80vh]',
        'bg-white rounded-2xl shadow-2xl',
        'border border-gray-200',
        'overflow-hidden',
        'animate-in fade-in slide-in-from-bottom-5 duration-300'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Talk with Resume</h3>
            <p className="text-xs text-white/80">AI-powered resume builder</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {/* Quick actions for new chat */}
        {showQuickActions && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs text-gray-500 text-center">Quick start:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {DEFAULT_QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => onQuickAction(action.prompt)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-full',
                    'bg-white border border-gray-200',
                    'text-gray-700 hover:text-primary',
                    'hover:border-primary/30 hover:bg-primary/5',
                    'transition-all duration-200',
                    'shadow-sm hover:shadow'
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}

        {/* Streaming indicator */}
        {isStreamingResume && (
          <div className="flex items-center justify-center gap-2 py-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full">
              <Loader2 className="w-3 h-3 text-primary animate-spin" />
              <span className="text-xs font-medium text-primary">
                Updating resume...
              </span>
            </div>
          </div>
        )}

        {/* Updated sections badges */}
        {highlightedSections.length > 0 && !isStreamingResume && (
          <div className="flex flex-wrap gap-1.5 justify-center animate-in fade-in zoom-in-95 duration-300">
            {highlightedSections.map((section) => (
              <span
                key={section}
                className={cn(
                  'px-2 py-0.5 text-xs font-medium rounded-full',
                  'bg-green-100 text-green-700 border border-green-200'
                )}
              >
                {formatSectionName(section)} updated
              </span>
            ))}
          </div>
        )}

        {/* Suggested questions */}
        {suggestedQuestions.length > 0 && !isLoading && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs text-gray-500 text-center">Suggestions:</p>
            <div className="flex flex-col gap-1.5">
              {suggestedQuestions.slice(0, 2).map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => onSuggestedQuestion(question)}
                  className={cn(
                    'w-full px-3 py-2 text-xs text-left rounded-lg',
                    'bg-white border border-gray-200',
                    'text-gray-600 hover:text-primary',
                    'hover:border-primary/30 hover:bg-primary/5',
                    'transition-all duration-200',
                    'flex items-center gap-2'
                  )}
                >
                  <Zap className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="line-clamp-2">{question}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Error Toast */}
      {voiceError && (
        <div className="px-3 py-2 bg-red-50 border-t border-red-100">
          <div className="flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{voiceError}</span>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100">
        <form onSubmit={onSubmit}>
          <div className={cn(
            "flex items-end gap-2 bg-gray-50 rounded-2xl border transition-all duration-200 p-1.5",
            isListening
              ? "border-red-400 ring-2 ring-red-500/20 bg-red-50/30"
              : "border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
          )}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                onInputChange(e.target.value);
                onAdjustHeight();
              }}
              onKeyDown={onKeyDown}
              placeholder={isListening ? "Listening..." : "Tell me about yourself..."}
              rows={1}
              className={cn(
                'flex-1 px-3 py-2.5',
                'bg-transparent border-none',
                'text-sm text-gray-900 placeholder:text-gray-400',
                'focus:outline-none',
                'resize-none overflow-y-auto',
                'transition-all duration-200',
                isListening && 'placeholder:text-red-400'
              )}
              style={{
                minHeight: '40px',
                maxHeight: '120px',
              }}
              disabled={isLoading || isListening}
            />

            {/* Voice Input Button */}
            {voiceSupported && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      onClick={onToggleVoice}
                      disabled={isLoading}
                      className={cn(
                        'h-10 w-10 rounded-xl flex-shrink-0 self-end mb-0.5',
                        isListening
                          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-600',
                        'transition-all duration-200'
                      )}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4 text-white" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{isListening ? 'Stop recording' : 'Voice input'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading || isListening}
              className={cn(
                'h-10 w-10 rounded-xl flex-shrink-0 self-end mb-0.5',
                'bg-gradient-to-r from-primary to-blue-600',
                'hover:from-primary/90 hover:to-blue-700',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'shadow-md hover:shadow-lg',
                'transition-all duration-200'
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          {isListening ? (
            <span className="text-red-500 font-medium">🎤 Recording... Click mic again to stop</span>
          ) : (
            <>Press Enter to send • {voiceSupported ? 'Click mic to speak' : 'Shift+Enter for new line'}</>
          )}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// MESSAGE BUBBLE
// ============================================================================

interface MessageBubbleProps {
  message: ChatMessage;
  isLast: boolean;
}

function MessageBubble({ message, isLast }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isTyping = message.isTyping;

  return (
    <div
      className={cn(
        'flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-gray-200 text-gray-600'
            : 'bg-gradient-to-br from-primary to-blue-600 text-white'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message content */}
      <div
        className={cn(
          'max-w-[80%] px-4 py-2.5 rounded-2xl',
          isUser
            ? 'bg-gradient-to-r from-primary to-blue-600 text-white rounded-br-md'
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
        )}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        )}

        {/* Updated sections badge */}
        {message.updatedSections && message.updatedSections.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-100">
            {message.updatedSections.map((section) => (
              <span
                key={section}
                className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-green-100 text-green-700"
              >
                {formatSectionName(section)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TYPING INDICATOR
// ============================================================================

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1">
      <span className="w-2 h-2 bg-primary rounded-full animate-typing-dot" />
      <span className="w-2 h-2 bg-primary rounded-full animate-typing-dot" style={{ animationDelay: '0.2s' }} />
      <span className="w-2 h-2 bg-primary rounded-full animate-typing-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  );
}

export default ChatWithResume;
