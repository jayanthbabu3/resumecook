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
  initialThemeColor = '#2563eb'
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
        return sanitizeResumeData(updated);
      });
    } else {
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

  // Load from localStorage on mount - only once per templateId
  const loadedTemplatesRef = React.useRef<Set<string>>(new Set());
  
  useEffect(() => {
    if (templateId && !loadedTemplatesRef.current.has(templateId)) {
      const savedData = localStorage.getItem(`resume-data-${templateId}`);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setResumeDataState(sanitizeResumeData(parsed));
        } catch (error) {
          console.error('Error loading saved resume data:', error);
        }
      }
      loadedTemplatesRef.current.add(templateId);
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
