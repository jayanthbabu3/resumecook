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
      none: 'none',
    } as const;
    const divider = dividerStyles[styleOptions.dividerStyle as keyof typeof dividerStyles];

    // Bullet character mapping for CSS content
    const bulletChars: Record<string, string> = {
      '•': '"•"',
      '◦': '"◦"',
      '▪': '"▪"',
      '▸': '"▸"',
      '–': '"–"',
      'none': '""',
    };
    const bulletContent = bulletChars[styleOptions.bulletStyle] || '"•"';

    // Visibility styles
    const hidePhoto = !styleOptions.showPhoto ? '[data-section="photo"], .resume-photo, img[alt*="photo"], img[alt*="Photo"] { display: none !important; }' : '';
    const hideSummary = !styleOptions.showSummary ? '[data-section="summary"] { display: none !important; }' : '';
    const hideExperience = !styleOptions.showExperience ? '[data-section="experience"] { display: none !important; }' : '';
    const hideEducation = !styleOptions.showEducation ? '[data-section="education"] { display: none !important; }' : '';
    const hideSkills = !styleOptions.showSkills ? '[data-section="skills"] { display: none !important; }' : '';
    const hideSections = !styleOptions.showSections ? '[data-section="custom"] { display: none !important; }' : '';

    return `
      /* ========================================
         V1 TEMPLATES STYLES (not .resume-v2)
         ======================================== */

      /* Preserve banner header typography - ONLY for V1 templates (not .resume-v2) */
      .style-options-wrapper:not(:has(.resume-v2)) [data-header="banner"] p,
      .style-options-wrapper:not(:has(.resume-v2)) [data-header="banner"] li,
      .style-options-wrapper:not(:has(.resume-v2)) [data-header="banner"] h1,
      .style-options-wrapper:not(:has(.resume-v2)) [data-header="banner"] h2,
      .style-options-wrapper:not(:has(.resume-v2)) [data-header="banner"] h3 {
        font-size: inherit !important;
        color: inherit !important;
      }

      /* Section Header Case - ONLY h2 elements (section headings), NOT h1 (name) - V1 only */
      ${styleOptions.headerCase === 'capitalize'
        ? `.style-options-wrapper:not(:has(.resume-v2)) h2:not([data-accent-color]) { text-transform: lowercase !important; font-weight: 600 !important;
        margin-bottom: 12px !important; color: #111827 !important;}`
        : ''}
      .style-options-wrapper:not(:has(.resume-v2)) h2:not([data-accent-color]) {
        text-transform: ${headerTransform} !important;
        font-weight: 600 !important;
        margin-bottom: 12px !important;
        color: #111827 !important;
      }

      ${
        divider && divider !== 'none'
          ? `
      /* Section Dividers - only when style option is enabled - V1 only */
      .style-options-wrapper:not(:has(.resume-v2)) h2:not([data-accent-color]) {
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

      /* ========================================
         V2 TEMPLATES STYLES (.resume-v2)
         ======================================== */

      /* Font Size Scaling for V2 templates */
      .style-options-wrapper .resume-v2 {
        --font-scale: ${scale};
      }

      /* Scale all text elements in V2 - respect template typography */
      /* Only scale section content, NOT header which has its own typography config */
      .style-options-wrapper .resume-v2 section h2 {
        font-size: calc(var(--resume-section-size, 11px) * ${scale}) !important;
      }
      .style-options-wrapper .resume-v2 section h3 {
        font-size: calc(var(--resume-item-size, 14px) * ${scale}) !important;
      }
      /* Only apply body size scaling to section content, not header */
      .style-options-wrapper .resume-v2 section p,
      .style-options-wrapper .resume-v2 section span:not(.bullet-char) {
        font-size: calc(var(--resume-body-size, 12px) * ${scale}) !important;
      }

      /* Bullet styles for V2 - use custom bullets via CSS */
      .style-options-wrapper .resume-v2 ul {
        list-style: none !important;
        padding-left: 1.25em !important;
      }
      .style-options-wrapper .resume-v2 ul li {
        position: relative !important;
      }
      .style-options-wrapper .resume-v2 ul li::before {
        content: ${bulletContent} !important;
        position: absolute !important;
        left: -1.25em !important;
        color: inherit !important;
      }
      ${styleOptions.bulletStyle === 'none' ? `
      .style-options-wrapper .resume-v2 ul {
        padding-left: 0 !important;
      }
      .style-options-wrapper .resume-v2 ul li::before {
        content: "" !important;
        display: none !important;
      }
      ` : ''}

      /* ========================================
         COMMON VISIBILITY CONTROLS (both V1 & V2)
         ======================================== */
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
  useEffect(() => {
    if (styleOptions.headerCase === 'capitalize' && wrapperRef.current) {
      const h2Elements = wrapperRef.current.querySelectorAll('h2:not([data-no-transform])');
      h2Elements.forEach((h2) => {
        if (h2.closest('[contenteditable="true"]') || h2.hasAttribute('data-editable')) {
          return;
        }

        const text = h2.textContent || '';
        if (text && text === text.toUpperCase() && text !== text.toLowerCase()) {
          const transformed = text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          if (h2.textContent !== transformed) {
            h2.setAttribute('data-transformed', 'true');
            h2.textContent = transformed;
          }
        }
      });
    } else if (styleOptions.headerCase !== 'capitalize' && wrapperRef.current) {
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
