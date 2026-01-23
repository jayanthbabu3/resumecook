/**
 * Chat With Resume V2 - Action-Based Custom Hook
 *
 * Production-ready chat hook using action-based responses for 100% reliability.
 * Actions are validated and executed programmatically for consistent results.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, ChatState, WELCOME_MESSAGE } from '../types/chat';
import type { V2ResumeData } from '../types/resumeData';
import type { ChatAction, ChatExecutionResult } from '../types/chatActions';
import {
  sendChatMessageV2,
  executeChatActions,
  generateMessageId,
  describeAction,
  formatSectionName,
  type ChatV2Context,
} from '../services/chatServiceV2';
import type { SectionOverride } from '../services/actionExecutor';

// ============================================================================
// TYPES
// ============================================================================

interface UseChatWithResumeV2Options {
  /** Current resume data */
  resumeData: V2ResumeData;
  /** Current resume config */
  config: Record<string, unknown>;
  /** Current section overrides */
  sectionOverrides: Record<string, SectionOverride>;
  /** Currently enabled sections */
  enabledSections: string[];
  /** Custom section labels */
  sectionLabels: Record<string, string>;
  /** Callback when resume data is updated */
  onResumeDataUpdate: (data: V2ResumeData) => void;
  /** Callback when config is updated */
  onConfigUpdate: (config: Record<string, unknown>) => void;
  /** Callback when section overrides are updated */
  onSectionOverridesUpdate: (overrides: Record<string, SectionOverride>) => void;
  /** Callback when enabled sections are updated */
  onEnabledSectionsUpdate: (sections: string[]) => void;
  /** Callback when section labels are updated */
  onSectionLabelsUpdate: (labels: Record<string, string>) => void;
  /** Callback to highlight sections */
  onHighlightSections?: (sections: string[]) => void;
}

interface UseChatWithResumeV2Return extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  clearError: () => void;
  clearHighlights: () => void;
  /** Last execution result for debugging/display */
  lastExecutionResult: ChatExecutionResult | null;
  /** Actions from last response (before execution) */
  lastActions: ChatAction[];
}

// Welcome message
const WELCOME_MESSAGE_V2: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Hi! 👋 I'm your resume assistant. I can help you:

- **Add or remove** skills, experience, education, and more
- **Show or hide** sections on your resume
- **Change styles** - try "show skills as pills" or "use timeline for experience"
- **Update your info** - title, summary, contact details
- **Improve content** - "improve my bullet points"

Just tell me what you'd like to change!`,
  timestamp: new Date(),
};

// ============================================================================
// HOOK
// ============================================================================

export function useChatWithResumeV2({
  resumeData,
  config,
  sectionOverrides,
  enabledSections,
  sectionLabels,
  onResumeDataUpdate,
  onConfigUpdate,
  onSectionOverridesUpdate,
  onEnabledSectionsUpdate,
  onSectionLabelsUpdate,
  onHighlightSections,
}: UseChatWithResumeV2Options): UseChatWithResumeV2Return {
  // State
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE_V2]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightedSections, setHighlightedSections] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [lastExecutionResult, setLastExecutionResult] = useState<ChatExecutionResult | null>(null);
  const [lastActions, setLastActions] = useState<ChatAction[]>([]);

  // Refs to keep current values for API calls
  const contextRef = useRef<ChatV2Context>({
    resumeData,
    config,
    sectionOverrides,
    enabledSections,
    sectionLabels,
  });

  // Update ref when props change
  useEffect(() => {
    contextRef.current = {
      resumeData,
      config,
      sectionOverrides,
      enabledSections,
      sectionLabels,
    };
  }, [resumeData, config, sectionOverrides, enabledSections, sectionLabels]);

  // Auto-clear highlights after delay
  useEffect(() => {
    if (highlightedSections.length > 0) {
      const timer = setTimeout(() => {
        setHighlightedSections([]);
        onHighlightSections?.([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedSections, onHighlightSections]);

  /**
   * Send a message and execute resulting actions
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      // Add typing indicator
      const typingMessageId = generateMessageId();
      const typingMessage: ChatMessage = {
        id: typingMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages(prev => [...prev, typingMessage]);

      try {
        // Get AI response
        const response = await sendChatMessageV2(
          content.trim(),
          [...messages, userMessage],
          contextRef.current
        );

        // Store actions
        setLastActions(response.actions);

        // Remove typing indicator
        setMessages(prev => prev.filter(m => m.id !== typingMessageId));

        if (!response.success) {
          // Add error message
          const errorMessage: ChatMessage = {
            id: generateMessageId(),
            role: 'assistant',
            content: response.message || "I had trouble processing that. Please try again.",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
          setError(response.error || 'Unknown error');
          return;
        }

        // Execute actions if any
        if (response.actions.length > 0) {
          const executionResult = executeChatActions(response.actions, contextRef.current);
          setLastExecutionResult(executionResult);

          if (executionResult.success) {
            // Apply updates to parent state
            if (executionResult.updatedResumeData) {
              onResumeDataUpdate(executionResult.updatedResumeData as V2ResumeData);
            }
            if (executionResult.updatedConfig) {
              onConfigUpdate(executionResult.updatedConfig as Record<string, unknown>);
            }

            // Update other state from execution result
            // Check if enabledSections changed
            if (response.actions.some(a => a.type === 'toggleSection') && executionResult.updatedEnabledSections) {
              onEnabledSectionsUpdate(executionResult.updatedEnabledSections);
            }

            // Check if sectionOverrides changed
            if (response.actions.some(a =>
              ['changeSectionVariant', 'reorderSections', 'moveSectionToColumn'].includes(a.type)
            ) && executionResult.updatedSectionOverrides) {
              onSectionOverridesUpdate(executionResult.updatedSectionOverrides as Record<string, SectionOverride>);
            }

            // Check if sectionLabels changed
            if (response.actions.some(a => a.type === 'renameSection') && executionResult.updatedSectionLabels) {
              onSectionLabelsUpdate(executionResult.updatedSectionLabels);
            }

            // Highlight modified sections
            if (executionResult.modifiedSections.length > 0) {
              setHighlightedSections(executionResult.modifiedSections);
              onHighlightSections?.(executionResult.modifiedSections);
            }

            // Build success message with action details
            const actionDescriptions = response.actions.map(a => `• ${describeAction(a)}`).join('\n');
            const sectionsChanged = executionResult.modifiedSections
              .map(s => formatSectionName(s))
              .join(', ');

            const assistantMessage: ChatMessage = {
              id: generateMessageId(),
              role: 'assistant',
              content: response.message,
              timestamp: new Date(),
              updatedSections: executionResult.modifiedSections,
              // Store metadata for display
              metadata: {
                actionsExecuted: response.actions.length,
                sectionsModified: executionResult.modifiedSections,
              },
            };
            setMessages(prev => [...prev, assistantMessage]);
          } else {
            // Execution had errors
            const failedActions = executionResult.results
              .filter(r => !r.success)
              .map(r => r.error)
              .join(', ');

            const assistantMessage: ChatMessage = {
              id: generateMessageId(),
              role: 'assistant',
              content: `${response.message}\n\n⚠️ Note: Some actions couldn't be completed: ${failedActions}`,
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, assistantMessage]);
          }
        } else {
          // No actions - just a conversational response
          const assistantMessage: ChatMessage = {
            id: generateMessageId(),
            role: 'assistant',
            content: response.message,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, assistantMessage]);
        }

        // Update suggested questions
        if (response.suggestedQuestions) {
          setSuggestedQuestions(response.suggestedQuestions);
        } else {
          setSuggestedQuestions([]);
        }

      } catch (err) {
        // Remove typing indicator
        setMessages(prev => prev.filter(m => m.id !== typingMessageId));

        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        setError(errorMessage);

        // User-friendly error message
        let userFriendlyMessage: string;
        if (errorMessage.includes('subscription') || errorMessage.includes('403')) {
          userFriendlyMessage = "🔒 This feature requires an active Pro subscription.";
        } else if (errorMessage.includes('429')) {
          userFriendlyMessage = "⏳ Too many requests. Please wait a moment and try again.";
        } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('network')) {
          userFriendlyMessage = "🌐 Connection issue. Please check your internet and try again.";
        } else {
          userFriendlyMessage = `I ran into an issue: ${errorMessage}. Please try again.`;
        }

        const errorChatMessage: ChatMessage = {
          id: generateMessageId(),
          role: 'assistant',
          content: userFriendlyMessage,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorChatMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [
      messages,
      isLoading,
      onResumeDataUpdate,
      onConfigUpdate,
      onSectionOverridesUpdate,
      onEnabledSectionsUpdate,
      onSectionLabelsUpdate,
      onHighlightSections,
    ]
  );

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE_V2]);
    setError(null);
    setHighlightedSections([]);
    setSuggestedQuestions([]);
    setLastExecutionResult(null);
    setLastActions([]);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearHighlights = useCallback(() => {
    setHighlightedSections([]);
    onHighlightSections?.([]);
  }, [onHighlightSections]);

  return {
    messages,
    isLoading,
    error,
    highlightedSections,
    isOpen,
    suggestedQuestions,
    sendMessage,
    clearChat,
    toggleChat,
    openChat,
    closeChat,
    clearError,
    clearHighlights,
    lastExecutionResult,
    lastActions,
  };
}

export default useChatWithResumeV2;
