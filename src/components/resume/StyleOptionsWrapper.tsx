import React, { useMemo } from 'react';
import { useStyleOptions, defaultStyleOptions } from '@/contexts/StyleOptionsContext';

interface StyleOptionsWrapperProps {
  children: React.ReactNode;
  className?: string;
  showPageBreaks?: boolean;
}

// A4 page height in pixels (at 96 DPI: 297mm = 1122.52px, but we use 1123px for clean math)
const A4_PAGE_HEIGHT_PX = 1123;

/**
 * A wrapper component that applies style options (from StyleOptionsContext) 
 * to all child templates via CSS. This provides a generic solution that works
 * for ALL resume templates without modifying each one individually.
 */
export const StyleOptionsWrapper: React.FC<StyleOptionsWrapperProps> = ({ 
  children, 
  className,
  showPageBreaks = true 
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
      none: 'none',
    };
    const divider = dividerStyles[styleOptions.dividerStyle] || dividerStyles.line;

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

      /* Section Dividers - h2 elements */
      .style-options-wrapper h2 {
        border-bottom: ${divider} !important;
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

  // Page break indicators - show dotted lines where PDF will cut to next page
  const pageBreakIndicators = useMemo(() => {
    if (!showPageBreaks) return null;
    
    // Generate multiple page break lines (up to 3 pages)
    const indicators = [];
    for (let i = 1; i <= 3; i++) {
      indicators.push(
        <div
          key={`page-break-${i}`}
          className="page-break-indicator absolute left-0 right-0 pointer-events-none z-10"
          style={{
            top: `${A4_PAGE_HEIGHT_PX * i}px`,
            height: '0',
            borderTop: '2px dashed #94a3b8',
          }}
        >
          <div 
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{ fontSize: '10px' }}
          >
            Page {i} ends here
          </div>
        </div>
      );
    }
    return indicators;
  }, [showPageBreaks]);

  return (
    <div className={`style-options-wrapper relative ${className || ''}`}>
      <style>{dynamicCSS}</style>
      {children}
      {pageBreakIndicators}
    </div>
  );
};

export default StyleOptionsWrapper;
