/**
 * Action Executor
 *
 * Executes chat actions on resume data and config.
 * Each action is atomic and validated before execution.
 *
 * This is the core of the reliable chat system - actions either
 * succeed completely or fail cleanly with no partial state changes.
 */

import type {
  ChatAction,
  ChatExecutionResult,
  ActionExecutionResult,
  ContentSection,
  ToggleSectionAction,
  ReorderSectionsAction,
  ChangeSectionVariantAction,
  RenameSectionAction,
  MoveSectionToColumnAction,
  UpdatePersonalInfoAction,
  UpdatePersonalInfoBulkAction,
  AddItemAction,
  UpdateItemAction,
  RemoveItemAction,
  ReorderItemsAction,
  ReplaceAllItemsAction,
  AddBulletAction,
  UpdateBulletAction,
  RemoveBulletAction,
  ReplaceBulletsAction,
  UpdateSettingAction,
  UpdateThemeColorAction,
  UpdateBackgroundColorAction,
  UpdateHeaderConfigAction,
  UpdateSectionConfigAction,
  AddCustomSectionAction,
  UpdateCustomSectionTitleAction,
  AddCustomSectionItemAction,
  RemoveCustomSectionAction,
  BatchAction,
} from '../types/chatActions';
import type { V2ResumeData } from '../types';

// ============================================================================
// TYPES
// ============================================================================

interface ExecutionContext {
  resumeData: V2ResumeData;
  config: ResumeConfig;
  sectionOverrides: Record<string, SectionOverride>;
  enabledSections: string[];
  sectionLabels: Record<string, string>;
}

interface ResumeConfig {
  sections: SectionConfig[];
  header?: Record<string, unknown>;
  skills?: Record<string, unknown>;
  experience?: Record<string, unknown>;
  education?: Record<string, unknown>;
  languages?: Record<string, unknown>;
  projects?: Record<string, unknown>;
  certifications?: Record<string, unknown>;
  layout?: Record<string, unknown>;
  colors?: Record<string, unknown>;
  [key: string]: unknown;
}

interface SectionConfig {
  id: string;
  type: string;
  title?: string;
  enabled?: boolean;
  order?: number;
  column?: 'main' | 'sidebar';
  variant?: string;
}

interface SectionOverride {
  order?: number;
  column?: 'main' | 'sidebar';
  variant?: string;
  [key: string]: unknown;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate a unique ID for a new item
 */
function generateId(prefix: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Deep clone an object
 */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get array from resume data by section name
 */
function getSectionArray(resumeData: V2ResumeData, section: ContentSection): unknown[] {
  const data = resumeData as Record<string, unknown>;
  return Array.isArray(data[section]) ? data[section] as unknown[] : [];
}

/**
 * Set array in resume data by section name
 */
function setSectionArray(resumeData: V2ResumeData, section: ContentSection, items: unknown[]): void {
  (resumeData as Record<string, unknown>)[section] = items;
}

// ============================================================================
// ACTION EXECUTORS
// ============================================================================

/**
 * Execute toggleSection action
 */
function executeToggleSection(
  action: ToggleSectionAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionId, enabled } = action;

    // Update enabledSections array
    if (enabled) {
      if (!context.enabledSections.includes(sectionId)) {
        context.enabledSections.push(sectionId);
      }
    } else {
      const index = context.enabledSections.indexOf(sectionId);
      if (index > -1) {
        context.enabledSections.splice(index, 1);
      }
    }

    // Also update config.sections if it exists
    const configSection = context.config.sections?.find(s => s.id === sectionId || s.type === sectionId);
    if (configSection) {
      configSection.enabled = enabled;
    }

    return {
      success: true,
      action,
      description: `${enabled ? 'Enabled' : 'Disabled'} ${sectionId} section`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to toggle section: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute reorderSections action
 */
function executeReorderSections(
  action: ReorderSectionsAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionOrder } = action;

    // Update order in config.sections
    sectionOrder.forEach((sectionId, index) => {
      const configSection = context.config.sections?.find(s => s.id === sectionId || s.type === sectionId);
      if (configSection) {
        configSection.order = index;
      }
      // Also update sectionOverrides
      if (!context.sectionOverrides[sectionId]) {
        context.sectionOverrides[sectionId] = {};
      }
      context.sectionOverrides[sectionId].order = index;
    });

    return {
      success: true,
      action,
      description: `Reordered sections`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to reorder sections: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute changeSectionVariant action
 */
function executeChangeSectionVariant(
  action: ChangeSectionVariantAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionId, variant } = action;

    // Update in sectionOverrides
    if (!context.sectionOverrides[sectionId]) {
      context.sectionOverrides[sectionId] = {};
    }
    context.sectionOverrides[sectionId].variant = variant;

    // Also update config if section-specific config exists
    const sectionConfigKey = sectionId as keyof ResumeConfig;
    if (context.config[sectionConfigKey] && typeof context.config[sectionConfigKey] === 'object') {
      (context.config[sectionConfigKey] as Record<string, unknown>).variant = variant;
    }

    return {
      success: true,
      action,
      description: `Changed ${sectionId} variant to ${variant}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to change variant: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute renameSection action
 */
function executeRenameSection(
  action: RenameSectionAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionId, title } = action;

    // Update sectionLabels
    context.sectionLabels[sectionId] = title;

    // Also update config.sections if exists
    const configSection = context.config.sections?.find(s => s.id === sectionId || s.type === sectionId);
    if (configSection) {
      configSection.title = title;
    }

    return {
      success: true,
      action,
      description: `Renamed ${sectionId} to "${title}"`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to rename section: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute moveSectionToColumn action
 */
function executeMoveSectionToColumn(
  action: MoveSectionToColumnAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionId, column } = action;

    // Update sectionOverrides
    if (!context.sectionOverrides[sectionId]) {
      context.sectionOverrides[sectionId] = {};
    }
    context.sectionOverrides[sectionId].column = column;

    // Also update config.sections
    const configSection = context.config.sections?.find(s => s.id === sectionId || s.type === sectionId);
    if (configSection) {
      configSection.column = column;
    }

    return {
      success: true,
      action,
      description: `Moved ${sectionId} to ${column} column`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to move section: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updatePersonalInfo action
 */
function executeUpdatePersonalInfo(
  action: UpdatePersonalInfoAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { field, value } = action;

    if (!context.resumeData.personalInfo) {
      context.resumeData.personalInfo = {} as V2ResumeData['personalInfo'];
    }

    (context.resumeData.personalInfo as Record<string, unknown>)[field] = value;

    return {
      success: true,
      action,
      description: `Updated ${field}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update personal info: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updatePersonalInfoBulk action
 */
function executeUpdatePersonalInfoBulk(
  action: UpdatePersonalInfoBulkAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { updates } = action;

    if (!context.resumeData.personalInfo) {
      context.resumeData.personalInfo = {} as V2ResumeData['personalInfo'];
    }

    Object.entries(updates).forEach(([field, value]) => {
      if (value !== undefined) {
        (context.resumeData.personalInfo as Record<string, unknown>)[field] = value;
      }
    });

    return {
      success: true,
      action,
      description: `Updated ${Object.keys(updates).join(', ')}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update personal info: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute addItem action
 */
function executeAddItem(
  action: AddItemAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { section, item, position } = action;
    const items = getSectionArray(context.resumeData, section);

    // Ensure item has an ID
    const newItem = {
      id: generateId(section.substring(0, 3)),
      ...item,
    };

    if (position !== undefined && position >= 0 && position <= items.length) {
      items.splice(position, 0, newItem);
    } else {
      items.push(newItem);
    }

    setSectionArray(context.resumeData, section, items);

    return {
      success: true,
      action,
      description: `Added item to ${section}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to add item: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updateItem action
 */
function executeUpdateItem(
  action: UpdateItemAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { section, itemId, updates } = action;
    const items = getSectionArray(context.resumeData, section);

    const itemIndex = items.findIndex((item: unknown) => (item as { id: string }).id === itemId);
    if (itemIndex === -1) {
      return {
        success: false,
        action,
        error: `Item with ID ${itemId} not found in ${section}`,
      };
    }

    // Merge updates while preserving ID
    items[itemIndex] = {
      ...(items[itemIndex] as object),
      ...updates,
      id: itemId, // Ensure ID is never changed
    };

    setSectionArray(context.resumeData, section, items);

    return {
      success: true,
      action,
      description: `Updated item in ${section}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update item: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute removeItem action
 */
function executeRemoveItem(
  action: RemoveItemAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { section, itemId } = action;
    const items = getSectionArray(context.resumeData, section);

    const itemIndex = items.findIndex((item: unknown) => (item as { id: string }).id === itemId);
    if (itemIndex === -1) {
      return {
        success: false,
        action,
        error: `Item with ID ${itemId} not found in ${section}`,
      };
    }

    items.splice(itemIndex, 1);
    setSectionArray(context.resumeData, section, items);

    return {
      success: true,
      action,
      description: `Removed item from ${section}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to remove item: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute reorderItems action
 */
function executeReorderItems(
  action: ReorderItemsAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { section, itemIds } = action;
    const items = getSectionArray(context.resumeData, section);

    // Create a map for quick lookup
    const itemMap = new Map(items.map((item: unknown) => [(item as { id: string }).id, item]));

    // Reorder based on provided IDs
    const reorderedItems = itemIds
      .map(id => itemMap.get(id))
      .filter(Boolean);

    // Add any items not in the list at the end
    items.forEach((item: unknown) => {
      const id = (item as { id: string }).id;
      if (!itemIds.includes(id)) {
        reorderedItems.push(item);
      }
    });

    setSectionArray(context.resumeData, section, reorderedItems as unknown[]);

    return {
      success: true,
      action,
      description: `Reordered items in ${section}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to reorder items: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute replaceAllItems action
 */
function executeReplaceAllItems(
  action: ReplaceAllItemsAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { section, items } = action;

    // Ensure all items have IDs
    const itemsWithIds = items.map((item, index) => ({
      id: (item as { id?: string }).id || generateId(`${section.substring(0, 3)}-${index}`),
      ...item,
    }));

    setSectionArray(context.resumeData, section, itemsWithIds);

    return {
      success: true,
      action,
      description: `Replaced all items in ${section}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to replace items: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute addBullet action
 */
function executeAddBullet(
  action: AddBulletAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { experienceId, text, position } = action;
    const experiences = getSectionArray(context.resumeData, 'experience') as Array<{
      id: string;
      bulletPoints?: string[];
    }>;

    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) {
      return {
        success: false,
        action,
        error: `Experience with ID ${experienceId} not found`,
      };
    }

    if (!experience.bulletPoints) {
      experience.bulletPoints = [];
    }

    if (position !== undefined && position >= 0 && position <= experience.bulletPoints.length) {
      experience.bulletPoints.splice(position, 0, text);
    } else {
      experience.bulletPoints.push(text);
    }

    setSectionArray(context.resumeData, 'experience', experiences);

    return {
      success: true,
      action,
      description: `Added bullet point to experience`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to add bullet: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updateBullet action
 */
function executeUpdateBullet(
  action: UpdateBulletAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { experienceId, bulletIndex, text } = action;
    const experiences = getSectionArray(context.resumeData, 'experience') as Array<{
      id: string;
      bulletPoints?: string[];
    }>;

    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) {
      return {
        success: false,
        action,
        error: `Experience with ID ${experienceId} not found`,
      };
    }

    if (!experience.bulletPoints || bulletIndex >= experience.bulletPoints.length) {
      return {
        success: false,
        action,
        error: `Bullet point at index ${bulletIndex} not found`,
      };
    }

    experience.bulletPoints[bulletIndex] = text;
    setSectionArray(context.resumeData, 'experience', experiences);

    return {
      success: true,
      action,
      description: `Updated bullet point`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update bullet: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute removeBullet action
 */
function executeRemoveBullet(
  action: RemoveBulletAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { experienceId, bulletIndex } = action;
    const experiences = getSectionArray(context.resumeData, 'experience') as Array<{
      id: string;
      bulletPoints?: string[];
    }>;

    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) {
      return {
        success: false,
        action,
        error: `Experience with ID ${experienceId} not found`,
      };
    }

    if (!experience.bulletPoints || bulletIndex >= experience.bulletPoints.length) {
      return {
        success: false,
        action,
        error: `Bullet point at index ${bulletIndex} not found`,
      };
    }

    experience.bulletPoints.splice(bulletIndex, 1);
    setSectionArray(context.resumeData, 'experience', experiences);

    return {
      success: true,
      action,
      description: `Removed bullet point`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to remove bullet: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute replaceBullets action
 */
function executeReplaceBullets(
  action: ReplaceBulletsAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { experienceId, bullets } = action;
    const experiences = getSectionArray(context.resumeData, 'experience') as Array<{
      id: string;
      bulletPoints?: string[];
    }>;

    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) {
      return {
        success: false,
        action,
        error: `Experience with ID ${experienceId} not found`,
      };
    }

    experience.bulletPoints = bullets;
    setSectionArray(context.resumeData, 'experience', experiences);

    return {
      success: true,
      action,
      description: `Replaced all bullet points`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to replace bullets: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updateSetting action
 */
function executeUpdateSetting(
  action: UpdateSettingAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { key, value } = action;

    if (!context.resumeData.settings) {
      context.resumeData.settings = {} as V2ResumeData['settings'];
    }

    (context.resumeData.settings as Record<string, unknown>)[key] = value;

    return {
      success: true,
      action,
      description: `Updated ${key} setting`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update setting: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updateThemeColor action
 * Supports: primary, secondary, headerBackground, sidebarBackground
 */
function executeUpdateThemeColor(
  action: UpdateThemeColorAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { colorKey, value } = action;

    if (!context.config.colors) {
      context.config.colors = {};
    }

    // Store all theme colors at the top level of config.colors for easy extraction
    // The actual application to config structure happens in applyThemeColors
    (context.config.colors as Record<string, unknown>)[colorKey] = value;

    // Also apply to the appropriate nested location for immediate use
    if (colorKey === 'headerBackground') {
      if (!context.config.header) {
        context.config.header = {};
      }
      (context.config.header as Record<string, unknown>).backgroundColor = value;
    } else if (colorKey === 'sidebarBackground') {
      const colors = context.config.colors as Record<string, unknown>;
      if (!colors.background) {
        colors.background = {};
      }
      (colors.background as Record<string, unknown>).sidebar = value;
    }

    return {
      success: true,
      action,
      description: `Updated ${colorKey} color to ${value}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update color: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updateBackgroundColor action
 */
function executeUpdateBackgroundColor(
  action: UpdateBackgroundColorAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { target, value } = action;

    if (!context.config.colors) {
      context.config.colors = {};
    }
    const colors = context.config.colors as Record<string, unknown>;
    if (!colors.background) {
      colors.background = {};
    }
    (colors.background as Record<string, unknown>)[target] = value;

    return {
      success: true,
      action,
      description: `Updated ${target} background color to ${value}`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update background color: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updateHeaderConfig action
 */
function executeUpdateHeaderConfig(
  action: UpdateHeaderConfigAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { updates } = action;

    if (!context.config.header) {
      context.config.header = {};
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        (context.config.header as Record<string, unknown>)[key] = value;
      }
    });

    return {
      success: true,
      action,
      description: `Updated header configuration`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update header config: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updateSectionConfig action
 */
function executeUpdateSectionConfig(
  action: UpdateSectionConfigAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionType, updates } = action;

    if (!context.config[sectionType]) {
      context.config[sectionType] = {};
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        (context.config[sectionType] as Record<string, unknown>)[key] = value;
      }
    });

    return {
      success: true,
      action,
      description: `Updated ${sectionType} configuration`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update section config: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute addCustomSection action
 */
function executeAddCustomSection(
  action: AddCustomSectionAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { title, items } = action;

    if (!context.resumeData.customSections) {
      context.resumeData.customSections = [];
    }

    const newSection = {
      id: generateId('custom'),
      title,
      items: items?.map((item, index) => ({
        id: generateId(`item-${index}`),
        ...item,
      })) || [],
    };

    context.resumeData.customSections.push(newSection);

    return {
      success: true,
      action,
      description: `Added custom section "${title}"`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to add custom section: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute updateCustomSectionTitle action
 */
function executeUpdateCustomSectionTitle(
  action: UpdateCustomSectionTitleAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionId, title } = action;

    const customSections = context.resumeData.customSections || [];
    const section = customSections.find(s => s.id === sectionId);

    if (!section) {
      return {
        success: false,
        action,
        error: `Custom section with ID ${sectionId} not found`,
      };
    }

    section.title = title;

    return {
      success: true,
      action,
      description: `Updated custom section title to "${title}"`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to update custom section title: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute addCustomSectionItem action
 */
function executeAddCustomSectionItem(
  action: AddCustomSectionItemAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionId, item } = action;

    const customSections = context.resumeData.customSections || [];
    const section = customSections.find(s => s.id === sectionId);

    if (!section) {
      return {
        success: false,
        action,
        error: `Custom section with ID ${sectionId} not found`,
      };
    }

    if (!section.items) {
      section.items = [];
    }

    section.items.push({
      id: generateId('item'),
      ...item,
    });

    return {
      success: true,
      action,
      description: `Added item to custom section`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to add custom section item: ${(error as Error).message}`,
    };
  }
}

/**
 * Execute removeCustomSection action
 */
function executeRemoveCustomSection(
  action: RemoveCustomSectionAction,
  context: ExecutionContext
): ActionExecutionResult {
  try {
    const { sectionId } = action;

    if (!context.resumeData.customSections) {
      return {
        success: false,
        action,
        error: `No custom sections exist`,
      };
    }

    const index = context.resumeData.customSections.findIndex(s => s.id === sectionId);
    if (index === -1) {
      return {
        success: false,
        action,
        error: `Custom section with ID ${sectionId} not found`,
      };
    }

    context.resumeData.customSections.splice(index, 1);

    return {
      success: true,
      action,
      description: `Removed custom section`,
    };
  } catch (error) {
    return {
      success: false,
      action,
      error: `Failed to remove custom section: ${(error as Error).message}`,
    };
  }
}

// ============================================================================
// MAIN EXECUTOR
// ============================================================================

/**
 * Execute a single action
 */
function executeSingleAction(
  action: ChatAction,
  context: ExecutionContext
): ActionExecutionResult {
  switch (action.type) {
    // Section Management
    case 'toggleSection':
      return executeToggleSection(action, context);
    case 'reorderSections':
      return executeReorderSections(action, context);
    case 'changeSectionVariant':
      return executeChangeSectionVariant(action, context);
    case 'renameSection':
      return executeRenameSection(action, context);
    case 'moveSectionToColumn':
      return executeMoveSectionToColumn(action, context);

    // Personal Info
    case 'updatePersonalInfo':
      return executeUpdatePersonalInfo(action, context);
    case 'updatePersonalInfoBulk':
      return executeUpdatePersonalInfoBulk(action, context);

    // Content Arrays
    case 'addItem':
      return executeAddItem(action, context);
    case 'updateItem':
      return executeUpdateItem(action, context);
    case 'removeItem':
      return executeRemoveItem(action, context);
    case 'reorderItems':
      return executeReorderItems(action, context);
    case 'replaceAllItems':
      return executeReplaceAllItems(action, context);

    // Experience Bullets
    case 'addBullet':
      return executeAddBullet(action, context);
    case 'updateBullet':
      return executeUpdateBullet(action, context);
    case 'removeBullet':
      return executeRemoveBullet(action, context);
    case 'replaceBullets':
      return executeReplaceBullets(action, context);

    // Settings & Config
    case 'updateSetting':
      return executeUpdateSetting(action, context);
    case 'updateThemeColor':
      return executeUpdateThemeColor(action, context);
    case 'updateBackgroundColor':
      return executeUpdateBackgroundColor(action, context);
    case 'updateHeaderConfig':
      return executeUpdateHeaderConfig(action, context);
    case 'updateSectionConfig':
      return executeUpdateSectionConfig(action, context);

    // Custom Sections
    case 'addCustomSection':
      return executeAddCustomSection(action, context);
    case 'updateCustomSectionTitle':
      return executeUpdateCustomSectionTitle(action, context);
    case 'addCustomSectionItem':
      return executeAddCustomSectionItem(action, context);
    case 'removeCustomSection':
      return executeRemoveCustomSection(action, context);

    // Batch - recursive
    case 'batch':
      const batchResults = action.actions.map(a => executeSingleAction(a, context));
      const allSucceeded = batchResults.every(r => r.success);
      return {
        success: allSucceeded,
        action,
        description: `Executed ${action.actions.length} actions`,
        error: allSucceeded ? undefined : 'One or more batch actions failed',
      };

    default:
      return {
        success: false,
        action,
        error: `Unknown action type: ${(action as ChatAction).type}`,
      };
  }
}

/**
 * Get modified sections from actions
 */
function getModifiedSections(actions: ChatAction[]): string[] {
  const sections = new Set<string>();

  actions.forEach(action => {
    switch (action.type) {
      case 'toggleSection':
      case 'changeSectionVariant':
      case 'renameSection':
      case 'moveSectionToColumn':
        sections.add(action.sectionId);
        break;
      case 'reorderSections':
        action.sectionOrder.forEach(s => sections.add(s));
        break;
      case 'updatePersonalInfo':
      case 'updatePersonalInfoBulk':
        sections.add('personalInfo');
        break;
      case 'addItem':
      case 'updateItem':
      case 'removeItem':
      case 'reorderItems':
      case 'replaceAllItems':
        sections.add(action.section);
        break;
      case 'addBullet':
      case 'updateBullet':
      case 'removeBullet':
      case 'replaceBullets':
        sections.add('experience');
        break;
      case 'updateSetting':
        sections.add('settings');
        break;
      case 'updateThemeColor':
      case 'updateBackgroundColor':
        sections.add('colors');
        break;
      case 'updateHeaderConfig':
        sections.add('header');
        break;
      case 'updateSectionConfig':
        sections.add(action.sectionType);
        break;
      case 'addCustomSection':
      case 'updateCustomSectionTitle':
      case 'addCustomSectionItem':
      case 'removeCustomSection':
        sections.add('customSections');
        break;
      case 'batch':
        getModifiedSections(action.actions).forEach(s => sections.add(s));
        break;
    }
  });

  return Array.from(sections);
}

/**
 * Execute all actions from an AI response
 *
 * @param actions - Array of actions to execute
 * @param resumeData - Current resume data
 * @param config - Current resume config
 * @param sectionOverrides - Current section overrides
 * @param enabledSections - Currently enabled sections
 * @param sectionLabels - Custom section labels
 * @returns Execution result with updated data
 */
export function executeActions(
  actions: ChatAction[],
  resumeData: V2ResumeData,
  config: Record<string, unknown>,
  sectionOverrides: Record<string, SectionOverride>,
  enabledSections: string[],
  sectionLabels: Record<string, string>
): ChatExecutionResult {
  // Deep clone all inputs to avoid mutations
  const context: ExecutionContext = {
    resumeData: deepClone(resumeData),
    config: deepClone(config) as ResumeConfig,
    sectionOverrides: deepClone(sectionOverrides),
    enabledSections: [...enabledSections],
    sectionLabels: { ...sectionLabels },
  };

  const results: ActionExecutionResult[] = [];

  // Execute each action
  for (const action of actions) {
    const result = executeSingleAction(action, context);
    results.push(result);

    // If an action fails, we continue but track the failure
    if (!result.success) {
      console.warn(`Action failed:`, result.error, action);
    }
  }

  const allSucceeded = results.every(r => r.success);
  const modifiedSections = getModifiedSections(actions);

  return {
    success: allSucceeded,
    results,
    updatedResumeData: context.resumeData,
    updatedConfig: context.config,
    updatedEnabledSections: context.enabledSections,
    updatedSectionOverrides: context.sectionOverrides,
    updatedSectionLabels: context.sectionLabels,
    modifiedSections,
    error: allSucceeded ? undefined : 'One or more actions failed',
  };
}

/**
 * Export context types for external use
 */
export type { ExecutionContext, ResumeConfig, SectionConfig, SectionOverride };
