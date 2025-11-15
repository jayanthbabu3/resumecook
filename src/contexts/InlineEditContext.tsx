import React, { createContext, useContext, useState } from "react";
import type { ResumeData } from "@/pages/Editor";

interface InlineEditContextType {
  resumeData: ResumeData;
  updateField: (path: string, value: any) => void;
  addArrayItem: (path: string, defaultItem: any) => void;
  removeArrayItem: (path: string, index: number) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

const InlineEditContext = createContext<InlineEditContextType | undefined>(undefined);

export const useInlineEdit = () => {
  const context = useContext(InlineEditContext);
  if (!context) {
    throw new Error("useInlineEdit must be used within InlineEditProvider");
  }
  return context;
};

interface InlineEditProviderProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  children: React.ReactNode;
}

export const InlineEditProvider = ({
  resumeData,
  setResumeData,
  children,
}: InlineEditProviderProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const updateField = (path: string, value: any) => {
    const pathParts = path.split(".");
    const newData = JSON.parse(JSON.stringify(resumeData));
    
    let current = newData;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);
      
      if (arrayMatch) {
        const [, arrayName, index] = arrayMatch;
        current = current[arrayName][parseInt(index)];
      } else {
        current = current[part];
      }
    }
    
    const lastPart = pathParts[pathParts.length - 1];
    const arrayMatch = lastPart.match(/^(.+)\[(\d+)\]$/);
    
    if (arrayMatch) {
      const [, arrayName, index] = arrayMatch;
      current[arrayName][parseInt(index)] = value;
    } else {
      current[lastPart] = value;
    }
    
    setResumeData(newData);
  };

  const addArrayItem = (path: string, defaultItem: any) => {
    const newData = JSON.parse(JSON.stringify(resumeData));
    const pathParts = path.split(".");

    let current = newData;
    for (const part of pathParts) {
      const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);

      if (arrayMatch) {
        const [, arrayName, index] = arrayMatch;
        current = current[arrayName][parseInt(index)];
      } else {
        current = current[part];
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

  const removeArrayItem = (path: string, index: number) => {
    const newData = JSON.parse(JSON.stringify(resumeData));
    const pathParts = path.split(".");

    let current = newData;
    for (const part of pathParts) {
      const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);

      if (arrayMatch) {
        const [, arrayName, arrayIndex] = arrayMatch;
        current = current[arrayName][parseInt(arrayIndex)];
      } else {
        current = current[part];
      }
    }

    if (Array.isArray(current)) {
      current.splice(index, 1);
      setResumeData(newData);
    }
  };

  return (
    <InlineEditContext.Provider
      value={{
        resumeData,
        updateField,
        addArrayItem,
        removeArrayItem,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </InlineEditContext.Provider>
  );
};
