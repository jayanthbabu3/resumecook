import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Style options types
export type HeaderCase = 'uppercase' | 'capitalize' | 'lowercase';
export type BulletStyle = '•' | '◦' | '▪' | '–' | '▸' | 'none';
export type DividerStyle = 'line' | 'dotted' | 'double' | 'thin' | 'none';
export type FontSizeScale = 'compact' | 'normal' | 'large';
export type DateFormat = 'short' | 'medium' | 'long'; // Jan 2024, January 2024, 01/2024

export interface StyleOptions {
  headerCase: HeaderCase;
  bulletStyle: BulletStyle;
  dividerStyle: DividerStyle;
  fontSizeScale: FontSizeScale;
  dateFormat: DateFormat;
  showPhoto: boolean;
  showSummary: boolean;
  showExperience: boolean;
  showEducation: boolean;
  showSkills: boolean;
  showStrengths: boolean;
  showSections: boolean;
}

export const defaultStyleOptions: StyleOptions = {
  headerCase: 'uppercase',
  bulletStyle: '•',
  dividerStyle: 'thin',
  fontSizeScale: 'normal',
  dateFormat: 'short',
  showPhoto: true,
  showSummary: true,
  showExperience: true,
  showEducation: true,
  showSkills: true,
  showStrengths: true,
  showSections: true,
};

interface StyleOptionsContextType {
  styleOptions: StyleOptions;
  setStyleOptions: React.Dispatch<React.SetStateAction<StyleOptions>>;
  updateStyleOption: <K extends keyof StyleOptions>(key: K, value: StyleOptions[K]) => void;
  resetStyleOptions: () => void;
  // Helper functions
  formatHeader: (text: string) => string;
  getBulletChar: () => string;
  getDividerStyle: () => React.CSSProperties;
  /** Get section header border style with accent color. Returns empty object if divider is 'none' */
  getSectionBorder: (accentColor: string) => React.CSSProperties;
  getFontScale: () => { name: number; title: number; section: number; body: number; small: number };
  formatDate: (dateString: string) => string;
}

const StyleOptionsContext = createContext<StyleOptionsContextType | undefined>(undefined);

export const StyleOptionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [styleOptions, setStyleOptions] = useState<StyleOptions>(defaultStyleOptions);

  const updateStyleOption = useCallback(<K extends keyof StyleOptions>(key: K, value: StyleOptions[K]) => {
    setStyleOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetStyleOptions = useCallback(() => {
    setStyleOptions(defaultStyleOptions);
  }, []);

  // Helper: Format header text based on case setting
  const formatHeader = useCallback((text: string): string => {
    if (!text) return '';
    switch (styleOptions.headerCase) {
      case 'uppercase':
        return text.toUpperCase();
      case 'capitalize':
        return text.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
      case 'lowercase':
        return text.toLowerCase();
      default:
        return text;
    }
  }, [styleOptions.headerCase]);

  // Helper: Get bullet character
  const getBulletChar = useCallback((): string => {
    return styleOptions.bulletStyle === 'none' ? '' : styleOptions.bulletStyle;
  }, [styleOptions.bulletStyle]);

  // Helper: Get divider CSS styles
  const getDividerStyle = useCallback((): React.CSSProperties => {
    switch (styleOptions.dividerStyle) {
      case 'line':
        return { borderBottom: '1px solid currentColor' };
      case 'dotted':
        return { borderBottom: '1px dotted currentColor' };
      case 'double':
        return { borderBottom: '3px double currentColor' };
      case 'thin':
        return { borderBottom: '0.5px solid currentColor' };
      case 'none':
      default:
        return { borderBottom: 'none' };
    }
  }, [styleOptions.dividerStyle]);

  // Helper: Get section header border with accent color
  const getSectionBorder = useCallback((accentColor: string): React.CSSProperties => {
    switch (styleOptions.dividerStyle) {
      case 'line':
        return { borderBottom: `1px solid ${accentColor}` };
      case 'dotted':
        return { borderBottom: `1px dotted ${accentColor}` };
      case 'double':
        return { borderBottom: `3px double ${accentColor}` };
      case 'thin':
        return { borderBottom: `0.5px solid ${accentColor}` };
      case 'none':
      default:
        return {};
    }
  }, [styleOptions.dividerStyle]);

  // Helper: Get font size scale multipliers
  const getFontScale = useCallback(() => {
    switch (styleOptions.fontSizeScale) {
      case 'compact':
        return { name: 28, title: 14, section: 14, body: 12, small: 11 };
      case 'large':
        return { name: 36, title: 18, section: 18, body: 14, small: 13 };
      case 'normal':
      default:
        return { name: 32, title: 16, section: 16, body: 13, small: 12 };
    }
  }, [styleOptions.fontSizeScale]);

  // Helper: Format date based on format setting
  const formatDate = useCallback((dateString: string): string => {
    if (!dateString) return '';
    
    // Handle "Present" or similar text
    if (dateString.toLowerCase() === 'present' || dateString.toLowerCase() === 'current') {
      return 'Present';
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
      const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const month = date.getMonth();
      const year = date.getFullYear();

      switch (styleOptions.dateFormat) {
        case 'short':
          return `${shortMonths[month]} ${year}`;
        case 'medium':
          // Medium format: 01/2024 (month/year)
          return `${String(month + 1).padStart(2, '0')}/${year}`;
        case 'long':
          // Long format: January 2024 (full month name)
          return `${months[month]} ${year}`;
        default:
          return `${shortMonths[month]} ${year}`;
      }
    } catch {
      return dateString;
    }
  }, [styleOptions.dateFormat]);

  return (
    <StyleOptionsContext.Provider value={{
      styleOptions,
      setStyleOptions,
      updateStyleOption,
      resetStyleOptions,
      formatHeader,
      getBulletChar,
      getDividerStyle,
      getSectionBorder,
      getFontScale,
      formatDate,
    }}>
      {children}
    </StyleOptionsContext.Provider>
  );
};

export const useStyleOptions = (): StyleOptionsContextType | undefined => {
  return useContext(StyleOptionsContext);
};

// Safe hook that returns default values if outside provider
export const useStyleOptionsWithDefaults = (): StyleOptionsContextType => {
  const context = useContext(StyleOptionsContext);
  
  if (context) return context;
  
  // Return default implementations when outside provider
  return {
    styleOptions: defaultStyleOptions,
    setStyleOptions: () => {},
    updateStyleOption: () => {},
    resetStyleOptions: () => {},
    formatHeader: (text: string) => text.toUpperCase(),
    getBulletChar: () => '•',
    getDividerStyle: () => ({ borderBottom: '0.5px solid currentColor' }),
    getSectionBorder: (accentColor: string) => ({ borderBottom: `0.5px solid ${accentColor}` }),
    getFontScale: () => ({ name: 32, title: 16, section: 16, body: 13, small: 12 }),
    formatDate: (dateString: string) => dateString,
  };
};
