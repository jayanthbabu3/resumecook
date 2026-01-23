/**
 * Chat Service V2 - Action-Based Architecture
 *
 * Production-ready chat service using action-based responses for 100% reliability.
 * Each AI response contains actions that are validated and executed programmatically.
 */

import type { ChatMessage } from '../types/chat';
import type { V2ResumeData } from '../types/resumeData';
import type { ChatActionResponse, ChatAction, ChatExecutionResult } from '../types/chatActions';
import { parseAndValidateResponse, createRetryPrompt } from './actionValidator';
import { executeActions, type SectionOverride } from './actionExecutor';
import { API_ENDPOINTS, apiFetch } from '../../config/api';

// ============================================================================
// TYPES
// ============================================================================

export interface ChatV2Context {
  resumeData: V2ResumeData;
  config: Record<string, unknown>;
  sectionOverrides: Record<string, SectionOverride>;
  enabledSections: string[];
  sectionLabels: Record<string, string>;
}

export interface ChatV2Response {
  success: boolean;
  message: string;
  actions: ChatAction[];
  executionResult?: ChatExecutionResult;
  suggestedQuestions?: string[];
  followUpQuestion?: string;
  error?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CHAT_API_ENDPOINT = API_ENDPOINTS.chatWithResumeV2; // Uses /api/ai/chat-v2
const MAX_RETRIES = 2;
const RETRY_DELAY = 1500;

// ============================================================================
// MAIN FUNCTIONS
// ============================================================================

/**
 * Send a message to the AI and get an action-based response
 *
 * @param message - User's message
 * @param conversationHistory - Previous messages
 * @param context - Current resume context (data + config)
 * @returns Validated response with actions and optional execution result
 */
export async function sendChatMessageV2(
  message: string,
  conversationHistory: ChatMessage[],
  context: ChatV2Context
): Promise<ChatV2Response> {
  let lastError: Error | null = null;
  let validationErrors: string | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Prepare resume data with current state info
      const resumeDataWithState = {
        ...context.resumeData,
        enabledSections: context.enabledSections,
      };

      // Convert conversation history to API format
      const historyForAPI = conversationHistory
        .filter(msg => msg.role !== 'system' && msg.id !== 'welcome')
        .slice(-6) // Only last 6 messages for context
        .map(msg => ({
          role: msg.role,
          content: msg.content,
        }));

      // Make API request
      const response = await apiFetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          message,
          conversationHistory: historyForAPI,
          currentResumeData: resumeDataWithState,
          retryWithErrors: validationErrors, // Include errors if retrying
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = `HTTP error ${response.status}`;
        if (errorData.error) {
          errorMessage = typeof errorData.error === 'string'
            ? errorData.error
            : errorData.error.message || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      // Parse and validate the AI response
      const validationResult = parseAndValidateResponse(
        typeof data.response === 'string' ? data.response : JSON.stringify(data.response)
      );

      if (!validationResult.valid || !validationResult.sanitizedResponse) {
        // If validation failed and we have retries left, retry with error feedback
        if (attempt < MAX_RETRIES) {
          validationErrors = createRetryPrompt(validationResult.errors);
          console.warn(`[Chat V2] Validation failed, retrying with feedback...`, validationResult.errors);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          continue;
        }

        // No more retries - return partial response if we have any valid actions
        if (validationResult.sanitizedResponse && validationResult.sanitizedResponse.actions.length > 0) {
          console.warn(`[Chat V2] Returning partial response with ${validationResult.sanitizedResponse.actions.length} valid actions`);
          return {
            success: true,
            message: validationResult.sanitizedResponse.message,
            actions: validationResult.sanitizedResponse.actions,
            suggestedQuestions: validationResult.sanitizedResponse.suggestedQuestions,
            followUpQuestion: validationResult.sanitizedResponse.followUpQuestion,
          };
        }

        // Complete failure
        return {
          success: false,
          message: "I had trouble processing your request. Could you try rephrasing it?",
          actions: [],
          error: `Validation failed: ${validationResult.errors.map(e => e.message).join(', ')}`,
        };
      }

      // Validation succeeded - return the response
      const aiResponse = validationResult.sanitizedResponse;

      console.log(`[Chat V2] Successfully parsed ${aiResponse.actions.length} actions`);

      return {
        success: true,
        message: aiResponse.message,
        actions: aiResponse.actions,
        suggestedQuestions: aiResponse.suggestedQuestions,
        followUpQuestion: aiResponse.followUpQuestion,
      };

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[Chat V2] Error (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`, lastError);

      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
      }
    }
  }

  // All retries failed
  return {
    success: false,
    message: "I'm having trouble connecting. Please try again in a moment.",
    actions: [],
    error: lastError?.message || 'Failed to send message after multiple attempts',
  };
}

/**
 * Execute actions from an AI response and return updated state
 *
 * @param actions - Actions to execute
 * @param context - Current resume context
 * @returns Execution result with updated data
 */
export function executeChatActions(
  actions: ChatAction[],
  context: ChatV2Context
): ChatExecutionResult {
  if (actions.length === 0) {
    return {
      success: true,
      results: [],
      modifiedSections: [],
    };
  }

  return executeActions(
    actions,
    context.resumeData,
    context.config,
    context.sectionOverrides,
    context.enabledSections,
    context.sectionLabels
  );
}

/**
 * Combined function: Send message, get response, execute actions
 *
 * @param message - User's message
 * @param conversationHistory - Previous messages
 * @param context - Current resume context
 * @param autoExecute - Whether to automatically execute actions (default: true)
 * @returns Full response with executed results
 */
export async function chatAndExecute(
  message: string,
  conversationHistory: ChatMessage[],
  context: ChatV2Context,
  autoExecute: boolean = true
): Promise<ChatV2Response> {
  // Get AI response
  const response = await sendChatMessageV2(message, conversationHistory, context);

  if (!response.success || response.actions.length === 0 || !autoExecute) {
    return response;
  }

  // Execute actions
  const executionResult = executeChatActions(response.actions, context);

  return {
    ...response,
    executionResult,
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format action type for display
 */
export function formatActionType(type: string): string {
  const typeMap: Record<string, string> = {
    toggleSection: 'Toggle Section',
    changeSectionVariant: 'Change Style',
    renameSection: 'Rename Section',
    moveSectionToColumn: 'Move Section',
    reorderSections: 'Reorder Sections',
    updatePersonalInfo: 'Update Info',
    updatePersonalInfoBulk: 'Update Info',
    addItem: 'Add Item',
    updateItem: 'Update Item',
    removeItem: 'Remove Item',
    reorderItems: 'Reorder Items',
    replaceAllItems: 'Replace Items',
    addBullet: 'Add Bullet',
    updateBullet: 'Update Bullet',
    removeBullet: 'Remove Bullet',
    replaceBullets: 'Replace Bullets',
    updateSetting: 'Update Setting',
    updateThemeColor: 'Change Color',
    updateHeaderConfig: 'Update Header',
    updateSectionConfig: 'Update Config',
    addCustomSection: 'Add Section',
    updateCustomSectionTitle: 'Rename Section',
    addCustomSectionItem: 'Add Item',
    removeCustomSection: 'Remove Section',
    batch: 'Multiple Changes',
  };

  return typeMap[type] || type;
}

/**
 * Get a human-readable description of an action
 */
export function describeAction(action: ChatAction): string {
  switch (action.type) {
    case 'toggleSection':
      return `${action.enabled ? 'Show' : 'Hide'} ${action.sectionId} section`;
    case 'changeSectionVariant':
      return `Change ${action.sectionId} style to ${action.variant}`;
    case 'renameSection':
      return `Rename ${action.sectionId} to "${action.title}"`;
    case 'addItem':
      return `Add item to ${action.section}`;
    case 'updateItem':
      return `Update item in ${action.section}`;
    case 'removeItem':
      return `Remove item from ${action.section}`;
    case 'addBullet':
      return 'Add bullet point';
    case 'updateBullet':
      return 'Update bullet point';
    case 'removeBullet':
      return 'Remove bullet point';
    case 'replaceBullets':
      return 'Replace all bullet points';
    case 'updatePersonalInfo':
      return `Update ${action.field}`;
    case 'updatePersonalInfoBulk':
      return `Update ${Object.keys(action.updates).join(', ')}`;
    case 'updateThemeColor':
      return `Change ${action.colorKey} color`;
    case 'addCustomSection':
      return `Add custom section "${action.title}"`;
    case 'removeCustomSection':
      return 'Remove custom section';
    default:
      return formatActionType(action.type);
  }
}

/**
 * Format section name for display
 */
export function formatSectionName(sectionId: string): string {
  const names: Record<string, string> = {
    personalInfo: 'Personal Info',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    certifications: 'Certifications',
    projects: 'Projects',
    achievements: 'Achievements',
    strengths: 'Strengths',
    awards: 'Awards',
    publications: 'Publications',
    volunteer: 'Volunteer',
    speaking: 'Speaking',
    patents: 'Patents',
    interests: 'Interests',
    references: 'References',
    courses: 'Courses',
    customSections: 'Custom Sections',
    header: 'Header',
    settings: 'Settings',
    colors: 'Theme',
  };

  return names[sectionId] || sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
}
