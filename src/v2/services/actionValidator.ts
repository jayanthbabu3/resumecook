/**
 * Action Validator
 *
 * Validates AI responses to ensure they conform to the expected schema.
 * This is critical for ensuring 100% reliable execution.
 *
 * If validation fails, we can:
 * 1. Retry the AI request with error feedback
 * 2. Skip invalid actions while executing valid ones
 * 3. Return a helpful error message to the user
 */

import type {
  ChatAction,
  ChatActionResponse,
  ContentSection,
  AVAILABLE_VARIANTS,
} from '../types/chatActions';

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  /** Cleaned/sanitized response if partially valid */
  sanitizedResponse?: ChatActionResponse;
}

export interface ValidationError {
  path: string;
  message: string;
  value?: unknown;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const VALID_CONTENT_SECTIONS: ContentSection[] = [
  'experience', 'education', 'skills', 'languages', 'projects',
  'certifications', 'achievements', 'awards', 'publications',
  'volunteer', 'speaking', 'patents', 'interests', 'references',
  'courses', 'strengths',
];

const VALID_PERSONAL_INFO_FIELDS = [
  'fullName', 'email', 'phone', 'location', 'title', 'summary',
  'linkedin', 'github', 'portfolio', 'website', 'twitter',
  'address', 'city', 'state', 'country', 'zipCode', 'photo',
];

const VALID_SETTINGS_KEYS = ['includeSocialLinks', 'includePhoto', 'dateFormat'];

const VALID_COLOR_KEYS = ['primary', 'secondary'];

const VALID_SECTION_CONFIG_TYPES = [
  'skills', 'experience', 'education', 'languages', 'projects', 'certifications',
];

const VALID_ACTION_TYPES = [
  'toggleSection', 'reorderSections', 'changeSectionVariant', 'renameSection',
  'moveSectionToColumn', 'updatePersonalInfo', 'updatePersonalInfoBulk',
  'addItem', 'updateItem', 'removeItem', 'reorderItems', 'replaceAllItems',
  'addBullet', 'updateBullet', 'removeBullet', 'replaceBullets',
  'updateSetting', 'updateThemeColor', 'updateHeaderConfig', 'updateSectionConfig',
  'addCustomSection', 'updateCustomSectionTitle', 'addCustomSectionItem',
  'removeCustomSection', 'batch',
];

// ============================================================================
// HELPER VALIDATORS
// ============================================================================

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isHexColor(value: unknown): boolean {
  if (!isString(value)) return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

// ============================================================================
// ACTION VALIDATORS
// ============================================================================

function validateToggleSectionAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.sectionId) || a.sectionId.trim() === '') {
    errors.push({ path: 'sectionId', message: 'sectionId must be a non-empty string', value: a.sectionId });
    return false;
  }

  if (!isBoolean(a.enabled)) {
    errors.push({ path: 'enabled', message: 'enabled must be a boolean', value: a.enabled });
    return false;
  }

  return true;
}

function validateReorderSectionsAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isArray(a.sectionOrder) || a.sectionOrder.length === 0) {
    errors.push({ path: 'sectionOrder', message: 'sectionOrder must be a non-empty array', value: a.sectionOrder });
    return false;
  }

  if (!a.sectionOrder.every(isString)) {
    errors.push({ path: 'sectionOrder', message: 'sectionOrder must contain only strings', value: a.sectionOrder });
    return false;
  }

  if (a.column !== undefined && a.column !== 'main' && a.column !== 'sidebar') {
    errors.push({ path: 'column', message: 'column must be "main" or "sidebar"', value: a.column });
    return false;
  }

  return true;
}

function validateChangeSectionVariantAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.sectionId) || a.sectionId.trim() === '') {
    errors.push({ path: 'sectionId', message: 'sectionId must be a non-empty string', value: a.sectionId });
    return false;
  }

  if (!isString(a.variant) || a.variant.trim() === '') {
    errors.push({ path: 'variant', message: 'variant must be a non-empty string', value: a.variant });
    return false;
  }

  return true;
}

function validateRenameSectionAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.sectionId) || a.sectionId.trim() === '') {
    errors.push({ path: 'sectionId', message: 'sectionId must be a non-empty string', value: a.sectionId });
    return false;
  }

  if (!isString(a.title) || a.title.trim() === '') {
    errors.push({ path: 'title', message: 'title must be a non-empty string', value: a.title });
    return false;
  }

  return true;
}

function validateMoveSectionToColumnAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.sectionId) || a.sectionId.trim() === '') {
    errors.push({ path: 'sectionId', message: 'sectionId must be a non-empty string', value: a.sectionId });
    return false;
  }

  if (a.column !== 'main' && a.column !== 'sidebar') {
    errors.push({ path: 'column', message: 'column must be "main" or "sidebar"', value: a.column });
    return false;
  }

  return true;
}

function validateUpdatePersonalInfoAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.field) || !VALID_PERSONAL_INFO_FIELDS.includes(a.field)) {
    errors.push({ path: 'field', message: `field must be one of: ${VALID_PERSONAL_INFO_FIELDS.join(', ')}`, value: a.field });
    return false;
  }

  if (!isString(a.value)) {
    errors.push({ path: 'value', message: 'value must be a string', value: a.value });
    return false;
  }

  return true;
}

function validateUpdatePersonalInfoBulkAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isObject(a.updates)) {
    errors.push({ path: 'updates', message: 'updates must be an object', value: a.updates });
    return false;
  }

  const invalidFields = Object.keys(a.updates).filter(f => !VALID_PERSONAL_INFO_FIELDS.includes(f));
  if (invalidFields.length > 0) {
    errors.push({ path: 'updates', message: `Invalid fields: ${invalidFields.join(', ')}`, value: invalidFields });
    return false;
  }

  return true;
}

function validateAddItemAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.section) || !VALID_CONTENT_SECTIONS.includes(a.section as ContentSection)) {
    errors.push({ path: 'section', message: `section must be one of: ${VALID_CONTENT_SECTIONS.join(', ')}`, value: a.section });
    return false;
  }

  if (!isObject(a.item)) {
    errors.push({ path: 'item', message: 'item must be an object', value: a.item });
    return false;
  }

  if (a.position !== undefined && !isNumber(a.position)) {
    errors.push({ path: 'position', message: 'position must be a number', value: a.position });
    return false;
  }

  return true;
}

function validateUpdateItemAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.section) || !VALID_CONTENT_SECTIONS.includes(a.section as ContentSection)) {
    errors.push({ path: 'section', message: `section must be one of: ${VALID_CONTENT_SECTIONS.join(', ')}`, value: a.section });
    return false;
  }

  if (!isString(a.itemId) || a.itemId.trim() === '') {
    errors.push({ path: 'itemId', message: 'itemId must be a non-empty string', value: a.itemId });
    return false;
  }

  if (!isObject(a.updates)) {
    errors.push({ path: 'updates', message: 'updates must be an object', value: a.updates });
    return false;
  }

  return true;
}

function validateRemoveItemAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.section) || !VALID_CONTENT_SECTIONS.includes(a.section as ContentSection)) {
    errors.push({ path: 'section', message: `section must be one of: ${VALID_CONTENT_SECTIONS.join(', ')}`, value: a.section });
    return false;
  }

  if (!isString(a.itemId) || a.itemId.trim() === '') {
    errors.push({ path: 'itemId', message: 'itemId must be a non-empty string', value: a.itemId });
    return false;
  }

  return true;
}

function validateReorderItemsAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.section) || !VALID_CONTENT_SECTIONS.includes(a.section as ContentSection)) {
    errors.push({ path: 'section', message: `section must be one of: ${VALID_CONTENT_SECTIONS.join(', ')}`, value: a.section });
    return false;
  }

  if (!isArray(a.itemIds) || a.itemIds.length === 0) {
    errors.push({ path: 'itemIds', message: 'itemIds must be a non-empty array', value: a.itemIds });
    return false;
  }

  if (!a.itemIds.every(isString)) {
    errors.push({ path: 'itemIds', message: 'itemIds must contain only strings', value: a.itemIds });
    return false;
  }

  return true;
}

function validateReplaceAllItemsAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.section) || !VALID_CONTENT_SECTIONS.includes(a.section as ContentSection)) {
    errors.push({ path: 'section', message: `section must be one of: ${VALID_CONTENT_SECTIONS.join(', ')}`, value: a.section });
    return false;
  }

  if (!isArray(a.items)) {
    errors.push({ path: 'items', message: 'items must be an array', value: a.items });
    return false;
  }

  if (!a.items.every(isObject)) {
    errors.push({ path: 'items', message: 'items must contain only objects', value: a.items });
    return false;
  }

  return true;
}

function validateBulletAction(action: unknown, actionType: string, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.experienceId) || a.experienceId.trim() === '') {
    errors.push({ path: 'experienceId', message: 'experienceId must be a non-empty string', value: a.experienceId });
    return false;
  }

  if (actionType === 'addBullet' || actionType === 'updateBullet') {
    if (!isString(a.text) || a.text.trim() === '') {
      errors.push({ path: 'text', message: 'text must be a non-empty string', value: a.text });
      return false;
    }
  }

  if (actionType === 'updateBullet' || actionType === 'removeBullet') {
    if (!isNumber(a.bulletIndex) || a.bulletIndex < 0) {
      errors.push({ path: 'bulletIndex', message: 'bulletIndex must be a non-negative number', value: a.bulletIndex });
      return false;
    }
  }

  if (actionType === 'replaceBullets') {
    if (!isArray(a.bullets) || !a.bullets.every(isString)) {
      errors.push({ path: 'bullets', message: 'bullets must be an array of strings', value: a.bullets });
      return false;
    }
  }

  return true;
}

function validateUpdateSettingAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.key) || !VALID_SETTINGS_KEYS.includes(a.key)) {
    errors.push({ path: 'key', message: `key must be one of: ${VALID_SETTINGS_KEYS.join(', ')}`, value: a.key });
    return false;
  }

  if (a.value === undefined) {
    errors.push({ path: 'value', message: 'value is required', value: a.value });
    return false;
  }

  return true;
}

function validateUpdateThemeColorAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.colorKey) || !VALID_COLOR_KEYS.includes(a.colorKey)) {
    errors.push({ path: 'colorKey', message: `colorKey must be one of: ${VALID_COLOR_KEYS.join(', ')}`, value: a.colorKey });
    return false;
  }

  if (!isHexColor(a.value)) {
    errors.push({ path: 'value', message: 'value must be a valid hex color (e.g., #ff0000)', value: a.value });
    return false;
  }

  return true;
}

function validateUpdateHeaderConfigAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isObject(a.updates)) {
    errors.push({ path: 'updates', message: 'updates must be an object', value: a.updates });
    return false;
  }

  return true;
}

function validateUpdateSectionConfigAction(action: unknown, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (!isString(a.sectionType) || !VALID_SECTION_CONFIG_TYPES.includes(a.sectionType)) {
    errors.push({ path: 'sectionType', message: `sectionType must be one of: ${VALID_SECTION_CONFIG_TYPES.join(', ')}`, value: a.sectionType });
    return false;
  }

  if (!isObject(a.updates)) {
    errors.push({ path: 'updates', message: 'updates must be an object', value: a.updates });
    return false;
  }

  return true;
}

function validateCustomSectionAction(action: unknown, actionType: string, errors: ValidationError[]): boolean {
  const a = action as Record<string, unknown>;

  if (actionType === 'addCustomSection') {
    if (!isString(a.title) || a.title.trim() === '') {
      errors.push({ path: 'title', message: 'title must be a non-empty string', value: a.title });
      return false;
    }
    if (a.items !== undefined && !isArray(a.items)) {
      errors.push({ path: 'items', message: 'items must be an array if provided', value: a.items });
      return false;
    }
  }

  if (actionType === 'updateCustomSectionTitle') {
    if (!isString(a.sectionId) || a.sectionId.trim() === '') {
      errors.push({ path: 'sectionId', message: 'sectionId must be a non-empty string', value: a.sectionId });
      return false;
    }
    if (!isString(a.title) || a.title.trim() === '') {
      errors.push({ path: 'title', message: 'title must be a non-empty string', value: a.title });
      return false;
    }
  }

  if (actionType === 'addCustomSectionItem') {
    if (!isString(a.sectionId) || a.sectionId.trim() === '') {
      errors.push({ path: 'sectionId', message: 'sectionId must be a non-empty string', value: a.sectionId });
      return false;
    }
    if (!isObject(a.item)) {
      errors.push({ path: 'item', message: 'item must be an object', value: a.item });
      return false;
    }
  }

  if (actionType === 'removeCustomSection') {
    if (!isString(a.sectionId) || a.sectionId.trim() === '') {
      errors.push({ path: 'sectionId', message: 'sectionId must be a non-empty string', value: a.sectionId });
      return false;
    }
  }

  return true;
}

// ============================================================================
// MAIN VALIDATOR
// ============================================================================

/**
 * Validate a single action
 */
function validateAction(action: unknown, index: number): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  const prefix = `actions[${index}]`;

  if (!isObject(action)) {
    errors.push({ path: prefix, message: 'Action must be an object', value: action });
    return { valid: false, errors };
  }

  const a = action as Record<string, unknown>;

  if (!isString(a.type) || !VALID_ACTION_TYPES.includes(a.type)) {
    errors.push({ path: `${prefix}.type`, message: `Invalid action type: ${a.type}`, value: a.type });
    return { valid: false, errors };
  }

  let valid = false;

  switch (a.type) {
    case 'toggleSection':
      valid = validateToggleSectionAction(action, errors);
      break;
    case 'reorderSections':
      valid = validateReorderSectionsAction(action, errors);
      break;
    case 'changeSectionVariant':
      valid = validateChangeSectionVariantAction(action, errors);
      break;
    case 'renameSection':
      valid = validateRenameSectionAction(action, errors);
      break;
    case 'moveSectionToColumn':
      valid = validateMoveSectionToColumnAction(action, errors);
      break;
    case 'updatePersonalInfo':
      valid = validateUpdatePersonalInfoAction(action, errors);
      break;
    case 'updatePersonalInfoBulk':
      valid = validateUpdatePersonalInfoBulkAction(action, errors);
      break;
    case 'addItem':
      valid = validateAddItemAction(action, errors);
      break;
    case 'updateItem':
      valid = validateUpdateItemAction(action, errors);
      break;
    case 'removeItem':
      valid = validateRemoveItemAction(action, errors);
      break;
    case 'reorderItems':
      valid = validateReorderItemsAction(action, errors);
      break;
    case 'replaceAllItems':
      valid = validateReplaceAllItemsAction(action, errors);
      break;
    case 'addBullet':
    case 'updateBullet':
    case 'removeBullet':
    case 'replaceBullets':
      valid = validateBulletAction(action, a.type, errors);
      break;
    case 'updateSetting':
      valid = validateUpdateSettingAction(action, errors);
      break;
    case 'updateThemeColor':
      valid = validateUpdateThemeColorAction(action, errors);
      break;
    case 'updateHeaderConfig':
      valid = validateUpdateHeaderConfigAction(action, errors);
      break;
    case 'updateSectionConfig':
      valid = validateUpdateSectionConfigAction(action, errors);
      break;
    case 'addCustomSection':
    case 'updateCustomSectionTitle':
    case 'addCustomSectionItem':
    case 'removeCustomSection':
      valid = validateCustomSectionAction(action, a.type, errors);
      break;
    case 'batch':
      if (!isArray(a.actions)) {
        errors.push({ path: `${prefix}.actions`, message: 'batch.actions must be an array', value: a.actions });
        valid = false;
      } else {
        // Recursively validate batch actions
        const batchErrors: ValidationError[] = [];
        a.actions.forEach((batchAction, batchIndex) => {
          const result = validateAction(batchAction, batchIndex);
          if (!result.valid) {
            batchErrors.push(...result.errors.map(e => ({
              ...e,
              path: `${prefix}.actions.${e.path}`,
            })));
          }
        });
        if (batchErrors.length > 0) {
          errors.push(...batchErrors);
          valid = false;
        } else {
          valid = true;
        }
      }
      break;
    default:
      valid = false;
  }

  // Add prefix to errors
  errors.forEach(e => {
    if (!e.path.startsWith(prefix)) {
      e.path = `${prefix}.${e.path}`;
    }
  });

  return { valid, errors };
}

/**
 * Validate a complete AI response
 */
export function validateChatResponse(response: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  // Check if response is an object
  if (!isObject(response)) {
    return {
      valid: false,
      errors: [{ path: 'response', message: 'Response must be an object' }],
    };
  }

  const r = response as Record<string, unknown>;

  // Validate message
  if (!isString(r.message)) {
    errors.push({ path: 'message', message: 'message must be a string', value: r.message });
  }

  // Validate actions array
  if (!isArray(r.actions)) {
    errors.push({ path: 'actions', message: 'actions must be an array', value: r.actions });
  } else {
    // Validate each action
    const validActions: ChatAction[] = [];
    r.actions.forEach((action, index) => {
      const result = validateAction(action, index);
      if (result.valid) {
        validActions.push(action as ChatAction);
      } else {
        errors.push(...result.errors);
      }
    });

    // Create sanitized response with only valid actions
    if (validActions.length > 0 || errors.length === 0) {
      // Support both suggestedActions (new) and suggestedQuestions (legacy)
      // Priority: suggestedActions > suggestedQuestions
      let suggestions: string[] | undefined;
      if (isArray(r.suggestedActions)) {
        suggestions = r.suggestedActions.filter(isString).slice(0, 3);
      } else if (isArray(r.suggestedQuestions)) {
        suggestions = r.suggestedQuestions.filter(isString).slice(0, 3);
      }

      const sanitizedResponse: ChatActionResponse = {
        message: isString(r.message) ? r.message : 'I processed your request.',
        actions: validActions,
        followUpQuestion: isString(r.followUpQuestion) ? r.followUpQuestion : undefined,
        suggestedQuestions: suggestions,
      };

      return {
        valid: errors.length === 0,
        errors,
        sanitizedResponse,
      };
    }
  }

  return {
    valid: false,
    errors,
  };
}

/**
 * Try to parse and validate a JSON response from AI
 */
export function parseAndValidateResponse(jsonString: string): ValidationResult {
  try {
    // Try to parse JSON
    const parsed = JSON.parse(jsonString);
    return validateChatResponse(parsed);
  } catch (error) {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        return validateChatResponse(parsed);
      } catch {
        // Fall through to error
      }
    }

    return {
      valid: false,
      errors: [{
        path: 'response',
        message: `Failed to parse JSON: ${(error as Error).message}`,
        value: jsonString.substring(0, 200),
      }],
    };
  }
}

/**
 * Create a helpful error message for the AI to retry
 */
export function createRetryPrompt(errors: ValidationError[]): string {
  const errorMessages = errors.map(e => `- ${e.path}: ${e.message}`).join('\n');
  return `Your previous response had validation errors. Please fix these issues and try again:

${errorMessages}

Remember to return valid JSON with this exact structure:
{
  "message": "Your friendly response",
  "actions": [/* array of valid actions */],
  "suggestedActions": ["actionable", "command", "suggestions"]
}`;
}
