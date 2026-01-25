/**
 * Chat Action Types
 *
 * Defines all possible actions the AI can return for resume modifications.
 * Each action is atomic, validated, and executed programmatically.
 *
 * This action-based architecture ensures:
 * - 100% reliable execution (actions either succeed or fail cleanly)
 * - Granular validation (each action validated independently)
 * - Easy undo/redo (each action has a natural inverse)
 * - Lower token costs (simple action objects vs full data)
 */

// ============================================================================
// SECTION MANAGEMENT ACTIONS
// ============================================================================

/** Toggle section visibility (show/hide) */
export interface ToggleSectionAction {
  type: 'toggleSection';
  sectionId: string;
  enabled: boolean;
}

/** Reorder sections by providing new order */
export interface ReorderSectionsAction {
  type: 'reorderSections';
  /** Array of section IDs in desired order */
  sectionOrder: string[];
  /** Optional: specify column for two-column layouts */
  column?: 'main' | 'sidebar';
}

/** Change section display variant/style */
export interface ChangeSectionVariantAction {
  type: 'changeSectionVariant';
  sectionId: string;
  variant: string;
}

/** Rename/relabel a section */
export interface RenameSectionAction {
  type: 'renameSection';
  sectionId: string;
  title: string;
}

/** Move section to different column (for two-column layouts) */
export interface MoveSectionToColumnAction {
  type: 'moveSectionToColumn';
  sectionId: string;
  column: 'main' | 'sidebar';
}

// ============================================================================
// PERSONAL INFO ACTIONS
// ============================================================================

/** Update a single personal info field */
export interface UpdatePersonalInfoAction {
  type: 'updatePersonalInfo';
  field: 'fullName' | 'email' | 'phone' | 'location' | 'title' | 'summary' |
         'linkedin' | 'github' | 'portfolio' | 'website' | 'twitter' |
         'address' | 'city' | 'state' | 'country' | 'zipCode' | 'photo';
  value: string;
}

/** Update multiple personal info fields at once */
export interface UpdatePersonalInfoBulkAction {
  type: 'updatePersonalInfoBulk';
  updates: Partial<{
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    linkedin: string;
    github: string;
    portfolio: string;
    website: string;
    twitter: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }>;
}

// ============================================================================
// CONTENT ARRAY ACTIONS (Experience, Education, Skills, etc.)
// ============================================================================

/** Add a new item to a section */
export interface AddItemAction {
  type: 'addItem';
  section: ContentSection;
  item: Record<string, unknown>;
  /** Optional: position to insert at (default: end) */
  position?: number;
}

/** Update an existing item in a section */
export interface UpdateItemAction {
  type: 'updateItem';
  section: ContentSection;
  itemId: string;
  updates: Record<string, unknown>;
}

/** Remove an item from a section */
export interface RemoveItemAction {
  type: 'removeItem';
  section: ContentSection;
  itemId: string;
}

/** Reorder items within a section */
export interface ReorderItemsAction {
  type: 'reorderItems';
  section: ContentSection;
  /** Array of item IDs in desired order */
  itemIds: string[];
}

/** Replace all items in a section (for bulk operations like "optimize all") */
export interface ReplaceAllItemsAction {
  type: 'replaceAllItems';
  section: ContentSection;
  items: Record<string, unknown>[];
}

// ============================================================================
// EXPERIENCE-SPECIFIC ACTIONS (Bullet Points)
// ============================================================================

/** Add a bullet point to an experience entry */
export interface AddBulletAction {
  type: 'addBullet';
  experienceId: string;
  text: string;
  /** Optional: position to insert at (default: end) */
  position?: number;
}

/** Update a bullet point in an experience entry */
export interface UpdateBulletAction {
  type: 'updateBullet';
  experienceId: string;
  bulletIndex: number;
  text: string;
}

/** Remove a bullet point from an experience entry */
export interface RemoveBulletAction {
  type: 'removeBullet';
  experienceId: string;
  bulletIndex: number;
}

/** Replace all bullet points for an experience entry */
export interface ReplaceBulletsAction {
  type: 'replaceBullets';
  experienceId: string;
  bullets: string[];
}

// ============================================================================
// SETTINGS & CONFIG ACTIONS
// ============================================================================

/** Update a resume setting */
export interface UpdateSettingAction {
  type: 'updateSetting';
  key: 'includeSocialLinks' | 'includePhoto' | 'dateFormat';
  value: boolean | string;
}

/** Update theme/accent color */
export interface UpdateThemeColorAction {
  type: 'updateThemeColor';
  colorKey: 'primary' | 'secondary' | 'headerBackground' | 'sidebarBackground';
  value: string; // hex color
}

/** Update background colors (sidebar, page, section backgrounds) - DEPRECATED, use updateThemeColor with sidebarBackground */
export interface UpdateBackgroundColorAction {
  type: 'updateBackgroundColor';
  target: 'sidebar' | 'page' | 'section' | 'accent';
  value: string; // hex color
}

/** Update header configuration */
export interface UpdateHeaderConfigAction {
  type: 'updateHeaderConfig';
  updates: Partial<{
    variant: string;
    showPhoto: boolean;
    photoSize: string;
    photoShape: 'circle' | 'square' | 'rounded';
    photoPosition: 'left' | 'right';
    showSocialLinks: boolean;
    backgroundColor: string;
    textColor: string;
    padding: string;
  }>;
}

/** Update section-specific config (skills, experience, education display options) */
export interface UpdateSectionConfigAction {
  type: 'updateSectionConfig';
  sectionType: 'skills' | 'experience' | 'education' | 'languages' | 'projects' | 'certifications';
  updates: Record<string, unknown>;
}

// ============================================================================
// CUSTOM SECTION ACTIONS
// ============================================================================

/** Add a new custom section */
export interface AddCustomSectionAction {
  type: 'addCustomSection';
  title: string;
  items?: Array<{
    title?: string;
    content?: string;
    date?: string;
    url?: string;
  }>;
}

/** Update custom section title */
export interface UpdateCustomSectionTitleAction {
  type: 'updateCustomSectionTitle';
  sectionId: string;
  title: string;
}

/** Add item to custom section */
export interface AddCustomSectionItemAction {
  type: 'addCustomSectionItem';
  sectionId: string;
  item: {
    title?: string;
    content?: string;
    date?: string;
    url?: string;
  };
}

/** Remove custom section */
export interface RemoveCustomSectionAction {
  type: 'removeCustomSection';
  sectionId: string;
}

// ============================================================================
// COMPOSITE/BATCH ACTIONS
// ============================================================================

/** Execute multiple actions in sequence */
export interface BatchAction {
  type: 'batch';
  actions: ChatAction[];
}

// ============================================================================
// TYPE UNIONS & HELPERS
// ============================================================================

/** All content sections that contain arrays of items */
export type ContentSection =
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'awards'
  | 'publications'
  | 'volunteer'
  | 'speaking'
  | 'patents'
  | 'interests'
  | 'references'
  | 'courses'
  | 'strengths';

/** Union of all possible chat actions */
export type ChatAction =
  // Section Management
  | ToggleSectionAction
  | ReorderSectionsAction
  | ChangeSectionVariantAction
  | RenameSectionAction
  | MoveSectionToColumnAction
  // Personal Info
  | UpdatePersonalInfoAction
  | UpdatePersonalInfoBulkAction
  // Content Arrays
  | AddItemAction
  | UpdateItemAction
  | RemoveItemAction
  | ReorderItemsAction
  | ReplaceAllItemsAction
  // Experience Bullets
  | AddBulletAction
  | UpdateBulletAction
  | RemoveBulletAction
  | ReplaceBulletsAction
  // Settings & Config
  | UpdateSettingAction
  | UpdateThemeColorAction
  | UpdateBackgroundColorAction
  | UpdateHeaderConfigAction
  | UpdateSectionConfigAction
  // Custom Sections
  | AddCustomSectionAction
  | UpdateCustomSectionTitleAction
  | AddCustomSectionItemAction
  | RemoveCustomSectionAction
  // Batch
  | BatchAction;

/** AI response format with actions */
export interface ChatActionResponse {
  /** Friendly message to display to user */
  message: string;
  /** Array of actions to execute */
  actions: ChatAction[];
  /** Optional follow-up question if clarification needed */
  followUpQuestion?: string;
  /** Optional suggested next questions */
  suggestedQuestions?: string[];
}

/** Result of executing a single action */
export interface ActionExecutionResult {
  success: boolean;
  action: ChatAction;
  error?: string;
  /** Description of what was changed */
  description?: string;
}

/** Result of executing all actions from a response */
export interface ChatExecutionResult {
  success: boolean;
  results: ActionExecutionResult[];
  /** Updated resume data after all actions */
  updatedResumeData?: unknown;
  /** Updated config after all actions */
  updatedConfig?: unknown;
  /** Updated enabled sections after all actions */
  updatedEnabledSections?: string[];
  /** Updated section overrides after all actions */
  updatedSectionOverrides?: Record<string, unknown>;
  /** Updated section labels after all actions */
  updatedSectionLabels?: Record<string, string>;
  /** Sections that were modified */
  modifiedSections: string[];
  /** Overall error if complete failure */
  error?: string;
}

// ============================================================================
// ACTION TYPE GUARDS
// ============================================================================

export function isToggleSectionAction(action: ChatAction): action is ToggleSectionAction {
  return action.type === 'toggleSection';
}

export function isAddItemAction(action: ChatAction): action is AddItemAction {
  return action.type === 'addItem';
}

export function isUpdateItemAction(action: ChatAction): action is UpdateItemAction {
  return action.type === 'updateItem';
}

export function isRemoveItemAction(action: ChatAction): action is RemoveItemAction {
  return action.type === 'removeItem';
}

export function isBatchAction(action: ChatAction): action is BatchAction {
  return action.type === 'batch';
}

// ============================================================================
// AVAILABLE VARIANTS (for AI reference)
// ============================================================================

export const AVAILABLE_VARIANTS = {
  header: ['left-aligned', 'centered', 'split', 'banner', 'minimal', 'photo-left', 'photo-right', 'compact', 'modern-minimal'],
  skills: ['pills', 'tags', 'list', 'grouped', 'bars', 'dots', 'columns', 'inline', 'compact', 'modern', 'table', 'category-lines', 'bordered-tags', 'pills-accent', 'inline-dots', 'boxed'],
  experience: ['standard', 'compact', 'detailed', 'timeline', 'card', 'minimal', 'modern', 'academic', 'icon-accent', 'icon-clean', 'dots-timeline'],
  education: ['standard', 'compact', 'detailed', 'timeline', 'card', 'minimal', 'academic', 'modern'],
  projects: ['standard', 'cards', 'compact', 'grid', 'timeline', 'showcase', 'minimal', 'detailed'],
  certifications: ['standard', 'list', 'cards', 'compact', 'badges', 'timeline', 'detailed', 'grouped'],
  languages: ['standard', 'list', 'pills', 'bars', 'grid', 'inline', 'compact', 'flags'],
  achievements: ['standard', 'list', 'bullets', 'cards', 'numbered', 'timeline', 'minimal', 'compact', 'badges', 'metrics', 'boxed'],
  awards: ['standard', 'trophies', 'cards', 'compact', 'timeline'],
  interests: ['pills', 'icons', 'grid', 'detailed', 'list', 'standard'],
  strengths: ['cards', 'list', 'pills', 'grid', 'minimal', 'accent-border'],
} as const;

/** All section types that can be toggled */
export const TOGGLEABLE_SECTIONS = [
  'summary', 'experience', 'education', 'skills', 'languages', 'projects',
  'certifications', 'achievements', 'awards', 'publications', 'volunteer',
  'speaking', 'patents', 'interests', 'references', 'courses', 'strengths'
] as const;
