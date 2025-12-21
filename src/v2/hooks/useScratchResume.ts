/**
 * Hook for managing scratch resume state
 * 
 * Handles resume data, section order, and layout configuration.
 */

import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { V2ResumeData, V2SectionType } from '../types/resumeData';
import { createEmptyResumeData } from '../types/resumeData';
import { getLayoutById, type ScratchLayout } from '../config/scratchLayouts';
import { getSectionDefinition } from '../registry/sectionRegistry';
import type { V2SectionType } from '../types/resumeData';

export interface ScratchSection {
  id: string;
  type: V2SectionType;
  variantId: string;
  enabled: boolean;
  column?: 'main' | 'sidebar';
  order: number;
}

export interface ScratchResumeState {
  resumeData: V2ResumeData;
  selectedLayout: ScratchLayout | null;
  sections: ScratchSection[];
  themeColor: string;
}

export function useScratchResume() {
  const [searchParams] = useSearchParams();
  const layoutId = searchParams.get('layout');

  // Get layout from URL param
  const selectedLayout = useMemo(() => {
    if (layoutId) {
      return getLayoutById(layoutId);
    }
    return null;
  }, [layoutId]);

  // Initialize resume data as empty
  const [resumeData, setResumeData] = useState<V2ResumeData>(() => 
    createEmptyResumeData()
  );

  // Initialize sections array (empty initially)
  const [sections, setSections] = useState<ScratchSection[]>([]);

  // Theme color
  const [themeColor, setThemeColor] = useState('#2563eb');

  // Add a new section
  const addSection = useCallback((
    type: V2SectionType,
    variantId: string,
    column?: 'main' | 'sidebar'
  ) => {
    // Check if section already exists (for sections that don't allow multiple)
    const sectionDef = getSectionDefinition(type);
    if (!sectionDef?.allowMultiple) {
      const existingSection = sections.find(s => s.type === type);
      if (existingSection) {
        // Update existing section instead of adding new one
        setSections(prev => prev.map(s => 
          s.id === existingSection.id 
            ? { ...s, variantId, column: column || s.column, order: type === 'header' ? 0 : s.order }
            : s
        ));
        return existingSection.id;
      }
    }

    // Header should always be order 0, other sections follow
    const isHeader = type === 'header';
    const newSection: ScratchSection = {
      id: isHeader ? 'header' : `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      variantId,
      enabled: true,
      column: column || (selectedLayout?.mainSections.includes(type) 
        ? 'main' 
        : selectedLayout?.sidebarSections.includes(type)
        ? 'sidebar'
        : 'main'), // Default to main if not specified
      order: isHeader ? 0 : sections.length,
    };

    setSections(prev => [...prev, newSection]);
    return newSection.id;
  }, [sections, selectedLayout]);

  // Remove a section
  const removeSection = useCallback((sectionId: string) => {
    setSections(prev => {
      const filtered = prev.filter(s => s.id !== sectionId);
      // Reorder remaining sections
      return filtered.map((s, index) => ({ ...s, order: index }));
    });
  }, []);

  // Reorder sections
  const reorderSections = useCallback((newOrder: ScratchSection[]) => {
    setSections(newOrder.map((s, index) => ({ ...s, order: index })));
  }, []);

  // Update section
  const updateSection = useCallback((
    sectionId: string,
    updates: Partial<ScratchSection>
  ) => {
    setSections(prev =>
      prev.map(s => s.id === sectionId ? { ...s, ...updates } : s)
    );
  }, []);

  // Update resume data
  const updateResumeData = useCallback((updates: Partial<V2ResumeData> | ((prev: V2ResumeData) => V2ResumeData)) => {
    if (typeof updates === 'function') {
      setResumeData(updates);
    } else {
      setResumeData(prev => ({ ...prev, ...updates }));
    }
  }, []);

  return {
    resumeData,
    setResumeData: updateResumeData,
    selectedLayout,
    sections,
    themeColor,
    setThemeColor,
    addSection,
    removeSection,
    reorderSections,
    updateSection,
  };
}

