/**
 * Chat With Resume - Type Definitions
 *
 * Types for the conversational resume builder feature.
 */

import { V2ResumeData } from './resumeData';

/**
 * Message role in the conversation
 */
export type ChatRole = 'user' | 'assistant' | 'system';

/**
 * A single chat message
 */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
  /** Sections that were updated by this message (for assistant messages) */
  updatedSections?: string[];
  /** Whether this message is currently being typed (for animation) */
  isTyping?: boolean;
}

/**
 * Partial updates to resume data from AI
 */
export interface ResumeUpdates {
  personalInfo?: Partial<V2ResumeData['personalInfo']>;
  experience?: V2ResumeData['experience'];
  education?: V2ResumeData['education'];
  skills?: V2ResumeData['skills'];
  languages?: V2ResumeData['languages'];
  certifications?: V2ResumeData['certifications'];
  projects?: V2ResumeData['projects'];
  achievements?: V2ResumeData['achievements'];
  strengths?: V2ResumeData['strengths'];
  awards?: V2ResumeData['awards'];
  publications?: V2ResumeData['publications'];
  volunteer?: V2ResumeData['volunteer'];
  speaking?: V2ResumeData['speaking'];
  patents?: V2ResumeData['patents'];
  interests?: V2ResumeData['interests'];
  references?: V2ResumeData['references'];
  courses?: V2ResumeData['courses'];
  customSections?: V2ResumeData['customSections'];
}

/**
 * Variant change request from AI
 */
export interface VariantChange {
  /** Section ID (e.g., 'skills', 'experience') */
  section: string;
  /** New variant ID to apply */
  variant: string;
}

/**
 * Response from the chat API
 */
export interface ChatAPIResponse {
  success: boolean;
  /** AI's conversational response */
  message: string;
  /** Resume data updates to apply */
  updates: ResumeUpdates;
  /** List of section names that were updated */
  updatedSections: string[];
  /** Suggested follow-up questions */
  suggestedQuestions: string[];
  /** Variant changes to apply (for UI/style changes) */
  variantChanges?: VariantChange[];
  /** Error message if success is false */
  error?: string;
  details?: string;
}

/**
 * Chat state for the hook
 */
export interface ChatState {
  /** All messages in the conversation */
  messages: ChatMessage[];
  /** Whether a message is currently being sent */
  isLoading: boolean;
  /** Error message if something went wrong */
  error: string | null;
  /** Sections currently being highlighted (after update) */
  highlightedSections: string[];
  /** Whether the chat panel is open */
  isOpen: boolean;
  /** Suggested questions from the last response */
  suggestedQuestions: string[];
}

/**
 * Chat context value
 */
export interface ChatContextValue extends ChatState {
  /** Send a message to the AI */
  sendMessage: (content: string) => Promise<void>;
  /** Clear all messages and start fresh */
  clearChat: () => void;
  /** Toggle the chat panel open/closed */
  toggleChat: () => void;
  /** Open the chat panel */
  openChat: () => void;
  /** Close the chat panel */
  closeChat: () => void;
  /** Clear the error */
  clearError: () => void;
  /** Clear highlighted sections */
  clearHighlights: () => void;
}

/**
 * Section highlight info for animations
 */
export interface SectionHighlight {
  sectionId: string;
  timestamp: number;
}

/**
 * Animation context for resume updates
 */
export interface ResumeAnimationContextValue {
  /** Currently highlighted sections */
  highlightedSections: Set<string>;
  /** Add sections to highlight */
  highlightSections: (sections: string[]) => void;
  /** Clear all highlights */
  clearHighlights: () => void;
  /** Check if a section is highlighted */
  isSectionHighlighted: (sectionId: string) => boolean;
}

/**
 * Callback payload for resume updates from chat
 * Includes both the updated data AND the sections that were modified
 */
export interface ChatResumeUpdatePayload {
  /** The updated resume data */
  data: V2ResumeData;
  /** List of section keys that were actually modified by the AI */
  updatedSections: string[];
  /** The raw updates from the AI response */
  updates: ResumeUpdates;
  /** Variant changes to apply (for UI/style changes) */
  variantChanges?: VariantChange[];
}

/**
 * Props for the chat component
 */
export interface ChatWithResumeProps {
  /** Current resume data */
  resumeData: V2ResumeData;
  /** Callback when resume data should be updated - includes section info */
  onResumeUpdate: (payload: ChatResumeUpdatePayload) => void;
  /** Callback when sections should be highlighted */
  onHighlightSections?: (sections: string[]) => void;
  /** Custom class name */
  className?: string;
}

/**
 * Quick action buttons in the chat
 */
export interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  prompt: string;
}

/**
 * Default quick actions for starting conversations
 */
export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'introduce',
    label: 'Introduce myself',
    prompt: "Hi! I'd like to create my resume. Let me introduce myself...",
  },
  {
    id: 'experience',
    label: 'Add experience',
    prompt: "I want to add my work experience",
  },
  {
    id: 'skills',
    label: 'Add skills',
    prompt: "Let me tell you about my skills",
  },
  {
    id: 'education',
    label: 'Add education',
    prompt: "I want to add my educational background",
  },
];

/**
 * Initial welcome message from the assistant
 */
export const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm your AI resume assistant. Tell me about yourself and I'll help build your resume. You can start by sharing your name, current role, and experience - or just chat naturally and I'll extract the relevant information!",
  timestamp: new Date(),
};
