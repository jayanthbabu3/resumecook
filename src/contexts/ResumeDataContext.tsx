import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sanitizeResumeData, getTemplateDefaults, type ResumeData } from '@/lib/resumeUtils';

interface ResumeDataContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
  templateId: string | null;
  setTemplateId: (id: string | null) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
}

const ResumeDataContext = createContext<ResumeDataContextType | undefined>(undefined);

interface ResumeDataProviderProps {
  children: ReactNode;
  initialTemplateId?: string;
  initialThemeColor?: string;
}

export const ResumeDataProvider: React.FC<ResumeDataProviderProps> = ({
  children,
  initialTemplateId = 'professional',
  initialThemeColor = '#7c3aed'
}) => {
  const [resumeData, setResumeDataState] = useState<ResumeData>(() => 
    getTemplateDefaults(initialTemplateId)
  );
  const [templateId, setTemplateId] = useState<string | null>(initialTemplateId);
  const [themeColor, setThemeColor] = useState<string>(initialThemeColor);

  // Update resumeData with sanitization - supports functional updates
  const setResumeData = (data: ResumeData | ((prev: ResumeData) => ResumeData)) => {
    if (typeof data === 'function') {
      setResumeDataState((prev) => {
        const updated = data(prev);
        console.log("🟣 ResumeDataContext: Received functional update, updated data:", {
          experienceCount: updated.experience.length,
          firstExp: updated.experience[0] ? {
            id: updated.experience[0].id,
            bulletPoints: updated.experience[0].bulletPoints
          } : null
        });
        const sanitized = sanitizeResumeData(updated);
        console.log("🟣 ResumeDataContext: After sanitization:", {
          experienceCount: sanitized.experience.length,
          firstExp: sanitized.experience[0] ? {
            id: sanitized.experience[0].id,
            bulletPoints: sanitized.experience[0].bulletPoints
          } : null
        });
        return sanitized;
      });
    } else {
      console.log("🟣 ResumeDataContext: Received direct data update");
      const sanitizedData = sanitizeResumeData(data);
      setResumeDataState(sanitizedData);
    }
  };

  // Update templateId and load corresponding defaults if needed
  useEffect(() => {
    if (templateId && templateId !== initialTemplateId) {
      // We don't automatically reset data here to avoid overwriting user work
      // when they just switch templates. 
    }
  }, [templateId, initialTemplateId]);

  // Save to localStorage for persistence
  useEffect(() => {
    if (templateId) {
      localStorage.setItem(`resume-data-${templateId}`, JSON.stringify(resumeData));
    }
  }, [resumeData, templateId]);

  // Load from localStorage on mount
  useEffect(() => {
    if (templateId) {
      const savedData = localStorage.getItem(`resume-data-${templateId}`);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setResumeDataState(sanitizeResumeData(parsed));
        } catch (error) {
          console.error('Error loading saved resume data:', error);
        }
      }
    }
  }, [templateId]);

  const value: ResumeDataContextType = {
    resumeData,
    setResumeData,
    templateId,
    setTemplateId,
    themeColor,
    setThemeColor,
  };

  return (
    <ResumeDataContext.Provider value={value}>
      {children}
    </ResumeDataContext.Provider>
  );
};

export const useResumeData = (): ResumeDataContextType => {
  const context = useContext(ResumeDataContext);
  if (context === undefined) {
    throw new Error('useResumeData must be used within a ResumeDataProvider');
  }
  return context;
};
