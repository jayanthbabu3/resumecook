import React, { useMemo } from 'react';
import { useStyleOptions, defaultStyleOptions } from '@/contexts/StyleOptionsContext';

interface StyleOptionsWrapperProps {
  children: React.ReactNode;
  className?: string;
  showPageBreaks?: boolean; // Deprecated (no longer used)
}

/**
 * A wrapper component that applies style options (from StyleOptionsContext) 
 * to all child templates via CSS. This provides a generic solution that works
 * for ALL resume templates without modifying each one individually.
 */
export const StyleOptionsWrapper: React.FC<StyleOptionsWrapperProps> = ({ 
  children, 
  className,
  showPageBreaks // Deprecated
}) => {
  const styleContext = useStyleOptions();
  const styleOptions = styleContext?.styleOptions || defaultStyleOptions;

  // Generate dynamic CSS for applying styles
  const dynamicCSS = useMemo(() => {
    const fontScales = {
      compact: 0.92,
      normal: 1,
      large: 1.08,
    };
    const scale = fontScales[styleOptions.fontSizeScale] || 1;

    // Header case transform - only for h2 section headings, NOT h1 (name)
    const headerTransform = {
      uppercase: 'uppercase',
      capitalize: 'capitalize',
      lowercase: 'lowercase',
    }[styleOptions.headerCase] || 'uppercase';

    // Divider styles
    const dividerStyles = {
      line: '1px solid #d1d5db',
      dotted: '2px dotted #d1d5db',
      double: '3px double #d1d5db',
    } as const;
    const divider = dividerStyles[styleOptions.dividerStyle as keyof typeof dividerStyles];

    // Visibility styles
    const hidePhoto = !styleOptions.showPhoto ? '[data-section="photo"], .resume-photo, img[alt*="photo"], img[alt*="Photo"] { display: none !important; }' : '';
    const hideSummary = !styleOptions.showSummary ? '[data-section="summary"] { display: none !important; }' : '';
    const hideExperience = !styleOptions.showExperience ? '[data-section="experience"] { display: none !important; }' : '';
    const hideEducation = !styleOptions.showEducation ? '[data-section="education"] { display: none !important; }' : '';
    const hideSkills = !styleOptions.showSkills ? '[data-section="skills"] { display: none !important; }' : '';
    const hideSections = !styleOptions.showSections ? '[data-section="custom"] { display: none !important; }' : '';

    return `
      /* Section Header Case - ONLY h2 elements (section headings), NOT h1 (name) */
      .style-options-wrapper h2 {
        text-transform: ${headerTransform} !important;
      }

      ${
        divider
          ? `
      /* Section Dividers - only when style option is enabled */
      .style-options-wrapper h2 {
        border-bottom: ${divider} !important;
      }`
          : `
      /* No divider - respect template default styling */`
      }

      /* Font Size Scaling */
      .style-options-wrapper {
        font-size: calc(13px * ${scale}) !important;
      }
      .style-options-wrapper h1 {
        font-size: calc(32px * ${scale}) !important;
      }
      .style-options-wrapper h2 {
        font-size: calc(16px * ${scale}) !important;
      }
      .style-options-wrapper h3 {
        font-size: calc(15px * ${scale}) !important;
      }
      .style-options-wrapper p,
      .style-options-wrapper li {
        font-size: calc(13px * ${scale}) !important;
      }

      /* Visibility Controls */
      ${hidePhoto}
      ${hideSummary}
      ${hideExperience}
      ${hideEducation}
      ${hideSkills}
      ${hideSections}
    `;
  }, [styleOptions]);

  return (
    <div className={`style-options-wrapper relative ${className || ''}`}>
      <style>{dynamicCSS}</style>
      {children}
    </div>
  );
};

export default StyleOptionsWrapper;
