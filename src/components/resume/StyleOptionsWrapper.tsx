import React, { useMemo, useEffect, useRef } from 'react';
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
      thin: '0.5px solid currentColor',
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
      /* Preserve banner header typography */
      .style-options-wrapper [data-header="banner"] p,
      .style-options-wrapper [data-header="banner"] li,
      .style-options-wrapper [data-header="banner"] h1,
      .style-options-wrapper [data-header="banner"] h2,
      .style-options-wrapper [data-header="banner"] h3 {
        font-size: inherit !important;
        color: inherit !important;
      }

      /* Section Header Case - ONLY h2 elements (section headings), NOT h1 (name) */
      /* For capitalize to work on already-uppercase text, normalize to lowercase first */
      ${styleOptions.headerCase === 'capitalize' 
        ? `.style-options-wrapper h2:not([data-accent-color]) { text-transform: lowercase !important; font-weight: 600 !important;
        margin-bottom: 12px !important; color: #111827 !important;}` 
        : ''}
      .style-options-wrapper h2:not([data-accent-color]) {
        text-transform: ${headerTransform} !important;
        font-weight: 600 !important;
        margin-bottom: 12px !important;
        color: #111827 !important;
      }

      ${
        divider
          ? `
      /* Section Dividers - only when style option is enabled */
      /* Don't override templates with custom accent colors */
      .style-options-wrapper h2:not([data-accent-color]) {
        border-bottom: ${divider} !important;
        font-weight: 600 !important;
        margin-bottom: 12px !important;
        color: #111827 !important;
      }`
          : `
      /* No divider - respect template default styling */`
      }

      /* Font Size Scaling - ONLY for V1 templates (not .resume-v2) */
      .style-options-wrapper:not(:has(.resume-v2)) {
        font-size: calc(13px * ${scale}) !important;
        color: #1a1a1a !important;
      }
      /* Do not override banner header name/title */
      .style-options-wrapper:not(:has(.resume-v2)) h1:not([data-header="banner"]) {
        font-size: calc(32px * ${scale}) !important;
      }
      .style-options-wrapper:not(:has(.resume-v2)) h2:not([data-accent-color]) {
        font-size: calc(16px * ${scale}) !important;
        font-weight: 600 !important;
        margin-bottom: 12px !important;
        color: #111827 !important;
      }
      .style-options-wrapper:not(:has(.resume-v2)) h3 {
        font-size: calc(15px * ${scale}) !important;
      }
      .style-options-wrapper:not(:has(.resume-v2)) p,
      .style-options-wrapper:not(:has(.resume-v2)) li {
        font-size: calc(13px * ${scale}) !important;
        color: #1a1a1a !important;
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

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Apply text transformation for capitalize option (needs JS since CSS can't lowercase then capitalize)
  // Only transform h2 elements that are section headings (not h1 name)
  useEffect(() => {
    if (styleOptions.headerCase === 'capitalize' && wrapperRef.current) {
      const h2Elements = wrapperRef.current.querySelectorAll('h2:not([data-no-transform])');
      h2Elements.forEach((h2) => {
        // Skip if it's an editable field (has data attributes or is inside an editable component)
        if (h2.closest('[contenteditable="true"]') || h2.hasAttribute('data-editable')) {
          return;
        }
        
        // Only transform if the text is already uppercase (to avoid double transformation)
        const text = h2.textContent || '';
        if (text && text === text.toUpperCase() && text !== text.toLowerCase()) {
          // Transform: lowercase first, then capitalize each word
          const transformed = text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          if (h2.textContent !== transformed) {
            // Store original to avoid re-transforming
            h2.setAttribute('data-transformed', 'true');
            h2.textContent = transformed;
          }
        }
      });
    } else if (styleOptions.headerCase !== 'capitalize' && wrapperRef.current) {
      // Reset transformed state when switching away from capitalize
      const h2Elements = wrapperRef.current.querySelectorAll('h2[data-transformed="true"]');
      h2Elements.forEach((h2) => {
        h2.removeAttribute('data-transformed');
      });
    }
  }, [styleOptions.headerCase]);

  return (
    <div ref={wrapperRef} className={`style-options-wrapper relative ${className || ''}`}>
      <style>{dynamicCSS}</style>
      {children}
    </div>
  );
};

export default StyleOptionsWrapper;
