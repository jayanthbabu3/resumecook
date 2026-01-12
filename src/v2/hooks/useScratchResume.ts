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
        const targetColumn = column || existingSection.column || 'main';
        setSections(prev => prev.map(s => 
          s.id === existingSection.id 
            ? { ...s, variantId, column: targetColumn, order: type === 'header' ? 0 : s.order }
            : s
        ));
        return existingSection.id;
      }
    }

    // Determine target column
    const targetColumn = column || (selectedLayout?.mainSections.includes(type) 
      ? 'main' 
      : selectedLayout?.sidebarSections.includes(type)
      ? 'sidebar'
      : 'main'); // Default to main if not specified

    // Calculate order based on existing sections in the target column
    // Header should always be order 0
    const isHeader = type === 'header';
    let newOrder: number;
    
    if (isHeader) {
      newOrder = 0;
    } else {
      // Find the highest order in the target column
      const columnSections = sections.filter(s => s.column === targetColumn && s.type !== 'header');
      const maxOrder = columnSections.length > 0 
        ? Math.max(...columnSections.map(s => s.order))
        : -1;
      // Place after the last section in that column
      newOrder = maxOrder + 1;
    }

    const newSection: ScratchSection = {
      id: isHeader ? 'header' : `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      variantId,
      enabled: true,
      column: targetColumn,
      order: newOrder,
    };

    setSections(prev => [...prev, newSection]);
    return newSection.id;
  }, [sections, selectedLayout]);

  // Remove a section
  const removeSection = useCallback((sectionId: string) => {
    setSections(prev => {
      const filtered = prev.filter(s => s.id !== sectionId);
      
      // Separate header from other sections
      const headerSection = filtered.find(s => s.type === 'header');
      const otherSections = filtered.filter(s => s.type !== 'header');
      
      // Group by column and reorder within each column
      const mainSections = otherSections
        .filter(s => s.column === 'main')
        .sort((a, b) => a.order - b.order)
        .map((s, index) => ({ ...s, order: index + 1 }));
      
      const sidebarSections = otherSections
        .filter(s => s.column === 'sidebar')
        .sort((a, b) => a.order - b.order)
        .map((s, index) => ({ ...s, order: index + 1 }));
      
      // Combine: header (order 0) + main + sidebar
      return headerSection 
        ? [headerSection, ...mainSections, ...sidebarSections]
        : [...mainSections, ...sidebarSections];
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

