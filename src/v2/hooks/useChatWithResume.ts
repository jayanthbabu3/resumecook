/**
 * Chat With Resume - Custom Hook
 *
 * Manages chat state and communication with the AI.
 * Includes streaming/typewriter effect for resume updates.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ChatMessage,
  ChatState,
  ChatResumeUpdatePayload,
  WELCOME_MESSAGE,
} from '../types/chat';
import { V2ResumeData } from '../types/resumeData';
import {
  sendChatMessage,
  generateMessageId,
  SectionVariantsMap,
} from '../services/chatService';
import { useStreamingResumeUpdate } from './useStreamingResumeUpdate';

interface UseChatWithResumeOptions {
  resumeData: V2ResumeData;
  /** Current section variants (e.g., {skills: 'pills', experience: 'timeline'}) */
  sectionVariants?: SectionVariantsMap;
  /** Callback when resume is updated - includes section info for selective enabling */
  onResumeUpdate: (payload: ChatResumeUpdatePayload) => void;
  onHighlightSections?: (sections: string[]) => void;
}

interface UseChatWithResumeReturn extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  clearError: () => void;
  clearHighlights: () => void;
  /** Whether resume is currently streaming updates */
  isStreamingResume: boolean;
}

export function useChatWithResume({
  resumeData,
  sectionVariants,
  onResumeUpdate,
  onHighlightSections,
}: UseChatWithResumeOptions): UseChatWithResumeReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightedSections, setHighlightedSections] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  // Keep track of current resume data and variants for API calls
  const resumeDataRef = useRef(resumeData);
  const sectionVariantsRef = useRef(sectionVariants);
  useEffect(() => {
    resumeDataRef.current = resumeData;
  }, [resumeData]);
  useEffect(() => {
    sectionVariantsRef.current = sectionVariants;
  }, [sectionVariants]);

  // Streaming resume update hook
  const { streamUpdates, isStreaming: isStreamingResume, stopStreaming } = useStreamingResumeUpdate({
    baseData: resumeData,
    onUpdate: onResumeUpdate,
    typingSpeed: 12, // Fast but visible typing
    fieldDelay: 80,
  });

  // Auto-clear highlights after a delay
  useEffect(() => {
    if (highlightedSections.length > 0) {
      const timer = setTimeout(() => {
        setHighlightedSections([]);
        onHighlightSections?.([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedSections, onHighlightSections]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Stop any ongoing streaming
      stopStreaming();

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

      // Add a temporary "typing" message
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
        const response = await sendChatMessage(
          content.trim(),
          [...messages, userMessage],
          resumeDataRef.current,
          sectionVariantsRef.current
        );

        // Remove typing message and add actual response
        setMessages(prev => {
          const filtered = prev.filter(m => m.id !== typingMessageId);
          const assistantMessage: ChatMessage = {
            id: generateMessageId(),
            role: 'assistant',
            content: response.message,
            timestamp: new Date(),
            updatedSections: response.updatedSections,
          };
          return [...filtered, assistantMessage];
        });

        // Apply resume updates with streaming effect
        if (response.updates && Object.keys(response.updates).length > 0) {
          // Highlight updated sections
          if (response.updatedSections && response.updatedSections.length > 0) {
            setHighlightedSections(response.updatedSections);
            onHighlightSections?.(response.updatedSections);
          }

          // Stream the updates with typewriter effect
          // Pass updatedSections and variantChanges so the callback knows which sections were modified
          await streamUpdates(response.updates, response.updatedSections || [], response.variantChanges);
        } else if (response.variantChanges && response.variantChanges.length > 0) {
          // Only variant changes, no data updates - still need to notify parent
          // Highlight the sections that are getting variant changes
          const sectionsWithVariantChanges = response.variantChanges.map(vc => vc.section);
          setHighlightedSections(sectionsWithVariantChanges);
          onHighlightSections?.(sectionsWithVariantChanges);

          // Call onResumeUpdate with just the variant changes
          onResumeUpdate({
            data: resumeDataRef.current,
            updatedSections: [],
            updates: {},
            variantChanges: response.variantChanges,
          });
        }

        // Set suggested questions
        if (response.suggestedQuestions) {
          setSuggestedQuestions(response.suggestedQuestions);
        }
      } catch (err) {
        // Remove typing message
        setMessages(prev => prev.filter(m => m.id !== typingMessageId));

        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        setError(errorMessage);

        // Create user-friendly error messages based on error type
        let userFriendlyMessage: string;
        if (errorMessage.includes('HTTP error 5') || errorMessage.includes('Failed to fetch')) {
          userFriendlyMessage = "I'm having trouble connecting to the server. Please check your internet connection and try again.";
        } else if (errorMessage.includes('HTTP error 429')) {
          userFriendlyMessage = "I'm getting too many requests right now. Please wait a moment and try again.";
        } else if (errorMessage.includes('HTTP error 4')) {
          userFriendlyMessage = "There was an issue with your request. Please try rephrasing your message.";
        } else if (errorMessage.includes('multiple attempts')) {
          userFriendlyMessage = "I tried several times but couldn't process your request. Please try again in a moment.";
        } else {
          userFriendlyMessage = `I encountered an issue: ${errorMessage}. Please try again.`;
        }

        // Add error message to chat
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
    [messages, isLoading, onHighlightSections, streamUpdates, stopStreaming]
  );

  const clearChat = useCallback(() => {
    stopStreaming();
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    setHighlightedSections([]);
    setSuggestedQuestions([]);
  }, [stopStreaming]);

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
    isStreamingResume,
  };
}
