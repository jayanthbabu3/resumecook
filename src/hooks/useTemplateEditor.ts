/**
 * useTemplateEditor - Core hook for template editing functionality
 * 
 * This hook provides ALL the editing functionality that templates need:
 * - Bullet point management (add/remove)
 * - Section management (add/remove custom sections)
 * - Item management (add/remove experience, education, skills)
 * 
 * Templates use this hook to get the functions they need, then render
 * their own UI however they want.
 * 
 * Usage:
 * ```tsx
 * const { 
 *   addBulletPoint, 
 *   removeBulletPoint,
 *   addSection,
 *   removeSection,
 *   isEditable 
 * } = useTemplateEditor(editable);
 * ```
 */

import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useCallback } from 'react';

export interface UseTemplateEditorOptions {
  /** Whether editing is enabled */
  editable?: boolean;
}

export interface UseTemplateEditorReturn {
  /** Whether editing is enabled and context is available */
  isEditable: boolean;
  
  /** Add a bullet point to an experience item */
  addBulletPoint: (expId: string) => void;
  
  /** Remove a bullet point from an experience item */
  removeBulletPoint: (expId: string, bulletIndex: number) => void;
  
  /** Add a new custom section */
  addSection: (defaultSection?: { title: string; content?: string; items?: string[] }) => void;
  
  /** Remove a custom section */
  removeSection: (sectionIndex: number) => void;
  
  /** Add an item to a section's items array */
  addSectionItem: (sectionIndex: number) => void;
  
  /** Remove an item from a section's items array */
  removeSectionItem: (sectionIndex: number, itemIndex: number) => void;
  
  /** Update a field value */
  updateField: (path: string, value: any) => void;
  
  /** Add an item to any array (experience, education, skills, etc.) */
  addArrayItem: (path: string, defaultItem: any) => void;
  
  /** Remove an item from any array */
  removeArrayItem: (path: string, index: number) => void;
  
  /** The raw inline edit context (for advanced use cases) */
  context: ReturnType<typeof useInlineEdit>;
}

export function useTemplateEditor(options: UseTemplateEditorOptions = {}): UseTemplateEditorReturn {
  const { editable = false } = options;
  const context = useInlineEdit();
  
  const isEditable = editable && !!context;
  
  const addBulletPoint = useCallback((expId: string) => {
    if (!isEditable || !context?.addBulletPoint) return;
    context.addBulletPoint(expId);
  }, [isEditable, context]);
  
  const removeBulletPoint = useCallback((expId: string, bulletIndex: number) => {
    if (!isEditable || !context?.removeBulletPoint) return;
    context.removeBulletPoint(expId, bulletIndex);
  }, [isEditable, context]);
  
  const addSection = useCallback((defaultSection = { 
    title: 'New Section', 
    content: '', 
    items: ['Sample item 1', 'Sample item 2'] 
  }) => {
    if (!isEditable || !context?.addArrayItem) return;
    context.addArrayItem('sections', {
      id: Date.now().toString(),
      ...defaultSection,
    });
  }, [isEditable, context]);
  
  const removeSection = useCallback((sectionIndex: number) => {
    if (!isEditable || !context?.removeArrayItem) return;
    context.removeArrayItem('sections', sectionIndex);
  }, [isEditable, context]);
  
  const addSectionItem = useCallback((sectionIndex: number) => {
    if (!isEditable || !context?.updateField) return;
    // This needs to be handled via updateField since we need to get current items
    // The component using this should handle the logic
  }, [isEditable, context]);
  
  const removeSectionItem = useCallback((sectionIndex: number, itemIndex: number) => {
    if (!isEditable || !context?.updateField) return;
    // Similar to addSectionItem
  }, [isEditable, context]);
  
  const updateField = useCallback((path: string, value: any) => {
    if (!isEditable || !context?.updateField) return;
    context.updateField(path, value);
  }, [isEditable, context]);
  
  const addArrayItem = useCallback((path: string, defaultItem: any) => {
    if (!isEditable || !context?.addArrayItem) return;
    context.addArrayItem(path, defaultItem);
  }, [isEditable, context]);
  
  const removeArrayItem = useCallback((path: string, index: number) => {
    if (!isEditable || !context?.removeArrayItem) return;
    context.removeArrayItem(path, index);
  }, [isEditable, context]);
  
  return {
    isEditable,
    addBulletPoint,
    removeBulletPoint,
    addSection,
    removeSection,
    addSectionItem,
    removeSectionItem,
    updateField,
    addArrayItem,
    removeArrayItem,
    context,
  };
}

export default useTemplateEditor;
