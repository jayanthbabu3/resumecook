import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ResumeData } from "@/types/resume";

interface InlineEditContextType {
  resumeData: ResumeData;
  updateField: (path: string, value: any) => void;
  addArrayItem: (path: string, defaultItem: any) => void;
  removeArrayItem: (path: string, index: number) => void;
  addBulletPoint: (expId: string) => void;
  removeBulletPoint: (expId: string, bulletIndex: number) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

const InlineEditContext = createContext<InlineEditContextType | undefined>(undefined);

export const useInlineEdit = () => {
  const context = useContext(InlineEditContext);
  // Return undefined if not within provider (for non-editable mode)
  return context;
};

interface InlineEditProviderProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
  children: React.ReactNode;
}

export const InlineEditProvider = ({
  resumeData,
  setResumeData,
  children,
}: InlineEditProviderProps) => {
  const [isEditing, setIsEditing] = useState(false);

  // Use functional update pattern to always work with latest state
  const updateField = useCallback((path: string, value: any) => {
    console.log('[InlineEditContext] updateField called', { path, value });
    
    // Use functional update to always work with the latest state
    setResumeData((currentResumeData: ResumeData) => {
      console.log('[InlineEditContext] Functional update - current resumeData', {
        resumeDataKeys: Object.keys(currentResumeData),
        sectionsLength: currentResumeData.sections?.length,
        sections: currentResumeData.sections
      });
      
      // Parse path, handling both dot notation and bracket notation
      // e.g., "skills[0].name" -> ["skills", "0", "name"]
      const pathParts = path
        .replace(/\[(\d+)\]/g, '.$1')  // Convert bracket notation to dot notation
        .split(".")
        .filter(part => part !== '');  // Remove empty parts
      const newData = JSON.parse(JSON.stringify(currentResumeData));
      
      let current: any = newData;
      console.log('[InlineEditContext] Starting navigation', { 
        pathParts, 
        pathPartsLength: pathParts.length,
        currentType: typeof current, 
        isArray: Array.isArray(current),
        currentKeys: current && typeof current === 'object' ? Object.keys(current) : 'N/A'
      });
      
      // Navigate to the parent of the target field
      // For path "sections.0.items", we navigate to sections[0], then set .items
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        const index = parseInt(part);
        const isNumeric = !isNaN(index) && part === String(index); // Check if part is purely numeric
        
        console.log('[InlineEditContext] Navigating part', { 
          i, 
          part, 
          index, 
          isNumeric,
          currentType: typeof current, 
          isArray: Array.isArray(current),
          currentKeys: current && typeof current === 'object' && !Array.isArray(current) ? Object.keys(current) : 'N/A',
          currentLength: Array.isArray(current) ? current.length : 'N/A'
        });
        
        // If current is an array and part is numeric, access by index
        if (Array.isArray(current) && isNumeric) {
          console.log('[InlineEditContext] Accessing array by index', { index, arrayLength: current.length });
          if (index >= 0 && index < current.length) {
            current = current[index];
          } else {
            console.error('[InlineEditContext] Array index out of bounds', { index, arrayLength: current.length });
            return currentResumeData; // Return unchanged data on error
          }
        }
        // If current is an object, access by property name
        else if (current && typeof current === 'object' && !Array.isArray(current)) {
          if (part in current) {
            console.log('[InlineEditContext] Accessing object property', { part, value: current[part], valueType: typeof current[part] });
            current = current[part];
          } else {
            console.error('[InlineEditContext] Property not found in object', { 
              part, 
              availableKeys: Object.keys(current),
              current
            });
            return currentResumeData; // Return unchanged data on error
          }
        }
        else {
          console.error('[InlineEditContext] Cannot navigate - invalid state', { 
            part, 
            currentType: typeof current, 
            isArray: Array.isArray(current),
            isNumeric
          });
          return currentResumeData; // Return unchanged data on error
        }
      }
      
      const lastPart = pathParts[pathParts.length - 1];
      const lastPartIndex = parseInt(lastPart);
      const isLastPartNumeric = !isNaN(lastPartIndex) && lastPart === String(lastPartIndex);
      
      console.log('[InlineEditContext] Setting value', { 
        lastPart, 
        lastPartIndex,
        isLastPartNumeric,
        currentType: typeof current, 
        isArray: Array.isArray(current),
        currentKeys: current && typeof current === 'object' && !Array.isArray(current) ? Object.keys(current) : 'N/A',
        value,
        valueType: typeof value
      });
      
      // Set the value - handle both array indices and object properties
      if (Array.isArray(current) && isLastPartNumeric) {
        // Setting an array element by index
        if (lastPartIndex >= 0 && lastPartIndex < current.length) {
          current[lastPartIndex] = value;
          console.log('[InlineEditContext] Array element set successfully', { 
            index: lastPartIndex,
            newValue: current[lastPartIndex],
            arrayLength: current.length
          });
        } else {
          console.error('[InlineEditContext] Array index out of bounds', { 
            index: lastPartIndex,
            arrayLength: current.length
          });
          return currentResumeData; // Return unchanged data on error
        }
      } else if (current && typeof current === 'object' && !Array.isArray(current)) {
        // Setting an object property
        current[lastPart] = value;
        console.log('[InlineEditContext] Object property set successfully', { 
          lastPart, 
          newValue: current[lastPart],
          newValueType: typeof current[lastPart],
          updatedCurrent: current
        });
      } else {
        console.error('[InlineEditContext] Cannot set value - invalid state', { 
          lastPart, 
          currentType: typeof current,
          isArray: Array.isArray(current),
          isLastPartNumeric,
          current
        });
        return currentResumeData; // Return unchanged data on error
      }
      
      const targetSectionIndex = pathParts[1] ? parseInt(pathParts[1]) : null;
      // Support both V1 sections and V2 customSections
      const sectionsArray = newData.sections || newData.customSections || [];
      console.log('[InlineEditContext] Returning updated data from functional update', { 
        newDataSections: sectionsArray?.length,
        newDataSectionsItems: sectionsArray?.map((s: any, i: number) => ({ 
          index: i, 
          id: s.id, 
          title: s.title, 
          itemsLength: s.items?.length,
          items: s.items
        })),
        targetSectionIndex,
        targetSectionItems: targetSectionIndex !== null ? sectionsArray[targetSectionIndex]?.items : null,
        targetSectionItemsLength: targetSectionIndex !== null ? sectionsArray[targetSectionIndex]?.items?.length : null
      });
      
      return newData;
    });
    console.log('[InlineEditContext] setResumeData functional update called - update complete');
  }, [setResumeData]);

  const addArrayItem = (path: string, defaultItem: any) => {
    const newData = JSON.parse(JSON.stringify(resumeData));
    // Parse path, handling both dot notation and bracket notation
    const pathParts = path
      .replace(/\[(\d+)\]/g, '.$1')
      .split(".")
      .filter(part => part !== '');

    let current = newData;
    for (const part of pathParts) {
      const index = parseInt(part);
      if (!isNaN(index) && Array.isArray(current)) {
        current = current[index];
      } else if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Path doesn't exist, return early
        return;
      }
    }

    if (Array.isArray(current)) {
      // Don't add id if defaultItem is a primitive (string, number)
      if (typeof defaultItem === 'object' && defaultItem !== null) {
        current.push({ ...defaultItem, id: defaultItem.id || Date.now().toString() });
      } else {
        current.push(defaultItem);
      }
      setResumeData(newData);
    }
  };

  const removeArrayItem = (path: string, itemIndex: number) => {
    const newData = JSON.parse(JSON.stringify(resumeData));
    // Parse path, handling both dot notation and bracket notation
    const pathParts = path
      .replace(/\[(\d+)\]/g, '.$1')
      .split(".")
      .filter(part => part !== '');

    let current = newData;
    for (const part of pathParts) {
      const index = parseInt(part);
      if (!isNaN(index) && Array.isArray(current)) {
        current = current[index];
      } else if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Path doesn't exist, return early
        return;
      }
    }

    if (Array.isArray(current)) {
      current.splice(itemIndex, 1);
      setResumeData(newData);
    }
  };

  const addBulletPoint = (expId: string) => {
    const newData = JSON.parse(JSON.stringify(resumeData));
    const expIndex = newData.experience.findIndex((exp: any) => exp.id === expId);
    
    if (expIndex !== -1) {
      const exp = newData.experience[expIndex];
      if (!exp.bulletPoints) {
        exp.bulletPoints = [];
      }
      exp.bulletPoints.push("");
      setResumeData(newData);
    }
  };

  const removeBulletPoint = (expId: string, bulletIndex: number) => {
    const newData = JSON.parse(JSON.stringify(resumeData));
    const expIndex = newData.experience.findIndex((exp: any) => exp.id === expId);
    
    if (expIndex !== -1) {
      const exp = newData.experience[expIndex];
      if (exp.bulletPoints && Array.isArray(exp.bulletPoints)) {
        exp.bulletPoints.splice(bulletIndex, 1);
        setResumeData(newData);
      }
    }
  };

  // Memoize context value to ensure it updates when resumeData changes
  const contextValue = useMemo(() => ({
    resumeData,
    updateField,
    addArrayItem,
    removeArrayItem,
    addBulletPoint,
    removeBulletPoint,
    isEditing,
    setIsEditing,
  }), [resumeData, updateField, addArrayItem, removeArrayItem, addBulletPoint, removeBulletPoint, isEditing]);

  return (
    <InlineEditContext.Provider value={contextValue}>
      {children}
    </InlineEditContext.Provider>
  );
};
