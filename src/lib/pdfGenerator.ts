/**
 * PDF Generation using Netlify Functions + Puppeteer
 * 
 * This generates PDFs by capturing the actual rendered HTML preview,
 * sending it to a Netlify serverless function that uses Puppeteer.
 * 
 * Benefits:
 * - Single codebase: No separate PDF templates needed
 * - Perfect fidelity: What you see is what you get
 * - Full CSS support: Gradients, shadows, flexbox, everything works
 */

import { 
  PDF_STYLES, 
  type PDFStyleConfig,
  SINGLE_COLUMN_CONFIG,
  TWO_COLUMN_CONFIG,
  COMPACT_CONFIG
} from './pdfStyles';

/**
 * Captures the resume preview HTML with all styles inlined
 */
function captureResumeHTML(element: HTMLElement): string {
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Get all computed styles and inline them
  const inlineStyles = (el: HTMLElement, original: HTMLElement) => {
    const computed = window.getComputedStyle(original);
    const styles: string[] = [];
    
    // Copy all computed styles
    for (let i = 0; i < computed.length; i++) {
      const prop = computed[i];
      const value = computed.getPropertyValue(prop);
      if (value) {
        styles.push(`${prop}: ${value}`);
      }
    }
    
    el.setAttribute('style', styles.join('; '));
    
    // Process children
    const originalChildren = original.children;
    const cloneChildren = el.children;
    for (let i = 0; i < originalChildren.length; i++) {
      if (originalChildren[i] instanceof HTMLElement && cloneChildren[i] instanceof HTMLElement) {
        inlineStyles(cloneChildren[i] as HTMLElement, originalChildren[i] as HTMLElement);
      }
    }
  };
  
  inlineStyles(clone, element);
  
  // Build complete HTML document
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 210mm;
            min-height: 297mm;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        </style>
      </head>
      <body>
        ${clone.outerHTML}
      </body>
    </html>
  `;
  
  return html;
}

/**
 * Alternative: Capture HTML with Tailwind CSS included
 * This method includes the actual stylesheet for better compatibility
 * 
 * @param element - The HTML element to capture
 * @param config - Optional PDF style configuration (defaults to SINGLE_COLUMN_CONFIG)
 * @param themeColor - Optional theme color override
 */
function captureResumeHTMLWithStyles(
  element: HTMLElement,
  config: PDFStyleConfig = SINGLE_COLUMN_CONFIG,
  themeColor?: string
): string {
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Remove editing UI elements that shouldn't appear in PDF
  const removeEditingElements = (el: HTMLElement) => {
    // Selectors for elements to remove
    const selectorsToRemove = [
      // Add buttons (border-dashed buttons)
      'button.border-dashed',
      'button[class*="border-dashed"]',
      // Delete/destructive buttons
      'button[class*="destructive"]',
      // Hover-only elements (delete buttons that appear on hover)
      '[class*="group-hover:opacity"]',
      // Any element with data-no-pdf attribute
      '[data-no-pdf]',
      '[data-pdf-hide]',
      // Lucide icons that are part of editing UI (Plus, Trash, etc.)
      'button svg.lucide-plus',
      'button svg.lucide-trash',
      'button svg.lucide-trash-2',
      // Elements marked for print hiding
      '.no-print',
      '.print\\:hidden',
      '[class*="no-print"]',
    ];
    
    selectorsToRemove.forEach(selector => {
      try {
        const elements = el.querySelectorAll(selector);
        elements.forEach(elem => elem.remove());
      } catch (e) {
        // Ignore invalid selectors
      }
    });
    
    // Also remove buttons that contain "Add" text (Add Experience, Add Education, etc.)
    const allButtons = el.querySelectorAll('button');
    allButtons.forEach(button => {
      const text = button.textContent?.toLowerCase() || '';
      const classList = button.className || '';
      
      // Remove add buttons
      if (text.includes('add ') || classList.includes('border-dashed')) {
        button.remove();
      }
      
      // Remove small icon-only buttons (likely delete buttons)
      if (button.classList.contains('h-6') && button.classList.contains('w-6')) {
        button.remove();
      }
    });
  };
  
  removeEditingElements(clone);
  
  // Remove empty list items (bullet points with no content)
  const removeEmptyListItems = (el: HTMLElement) => {
    const listItems = el.querySelectorAll('ul li');
    listItems.forEach(li => {
      // Get text content, excluding placeholder text
      const textContent = li.textContent?.trim() || '';
      const hasPlaceholder = textContent.includes('Click to add') || textContent.includes('placeholder');
      
      // Check if the li only contains empty spans/divs or placeholder text
      if (!textContent || hasPlaceholder || textContent.length < 3) {
        li.remove();
      }
    });
  };
  
  removeEmptyListItems(clone);

  // Remove empty contact fields (social links, etc.) from PDF
  const removeEmptyContactFields = (el: HTMLElement) => {
    // Find all contact items (divs with icons and text)
    const contactContainers = Array.from(el.querySelectorAll('div.flex.items-center'));
    contactContainers.forEach(container => {
      const icon = container.querySelector('svg');
      if (!icon) return; // Skip if no icon (not a contact field)
      
      // Get all text elements (could be span or a)
      const textElements = container.querySelectorAll('span, a');
      let hasValidContent = false;
      
      textElements.forEach(textElement => {
        const textContent = textElement?.textContent?.trim() || '';
        const isLink = textElement?.tagName === 'A';
        
        // Skip placeholder text
        if (textContent === 'Click to edit' || !textContent || textContent.length < 2) {
          return;
        }
        
        // For links, check if href is valid
        if (isLink) {
          const href = (textElement as HTMLAnchorElement).href || '';
          // Valid URL must contain a dot (domain) and not be just "https://" or "http://"
          const isValidUrl = href && 
                            href !== 'https://' && 
                            href !== 'http://' && 
                            href !== 'https://undefined' &&
                            href !== 'http://undefined' &&
                            (href.includes('.') || href.length > 10);
          if (isValidUrl) {
            hasValidContent = true;
          }
        } else {
          // For non-link contact fields, any non-empty text is valid
          hasValidContent = true;
        }
      });
      
      // Remove container if no valid content found
      if (!hasValidContent) {
        container.remove();
      }
    });
    
    // Also remove any standalone "Click to edit" text elements
    const allTextElements = Array.from(el.querySelectorAll('span, a, div, p'));
    allTextElements.forEach(element => {
      const text = element.textContent?.trim();
      // Check if element contains only "Click to edit" and is not an input/textarea
      if (text === 'Click to edit' && 
          element.tagName !== 'INPUT' && 
          element.tagName !== 'TEXTAREA' &&
          !element.closest('input') &&
          !element.closest('textarea')) {
        // Check if it's part of a contact field (has icon nearby)
        const parent = element.parentElement;
        const hasIcon = parent?.querySelector('svg') || element.querySelector('svg');
        if (hasIcon) {
          // Remove the parent container if it's a contact field
          const container = element.closest('div.flex.items-center');
          if (container) {
            container.remove();
          } else {
            element.remove();
          }
        } else {
          // For non-contact fields, just remove the element
          element.remove();
        }
      }
    });
  };
  
  removeEmptyContactFields(clone);

  // Remove any transform styles that might scale the element
  const removeTransforms = (el: HTMLElement) => {
    // Remove transform from inline styles
    if (el.style.transform) {
      el.style.transform = 'none';
    }
    // Also check for transform in the style attribute
    const styleAttr = el.getAttribute('style');
    if (styleAttr && styleAttr.includes('transform')) {
      el.setAttribute('style', styleAttr.replace(/transform:[^;]+;?/gi, ''));
    }
    // Process children
    Array.from(el.children).forEach(child => {
      if (child instanceof HTMLElement) {
        removeTransforms(child);
      }
    });
  };
  
  removeTransforms(clone);
  
  // Ensure the root element respects A4 dimensions while keeping template styling
  if (!clone.style.width) {
    clone.style.width = '210mm';
  }
  // Don't set minHeight as it causes blank first page - let content flow naturally
  clone.style.transform = 'none';
  
  // For V2, ensure the container doesn't have overflow-hidden that cuts off content
  if (clone.classList.contains('resume-v2')) {
    // Remove overflow-hidden that might be cutting off content
    clone.style.overflow = 'visible';
    clone.style.overflowX = 'visible';
    clone.style.overflowY = 'visible';
    
    // Remove any min-height or max-height that might limit content
    clone.style.minHeight = 'auto';
    clone.style.maxHeight = 'none';
    
    // Ensure width is set properly for PDF
    if (!clone.style.width || clone.style.width === '100%') {
      clone.style.width = '210mm';
    }
    clone.style.maxWidth = '210mm';
    
    // Fix two-column flex containers to prevent overflow
    const flexContainers = clone.querySelectorAll('[style*="display: flex"][style*="flex-direction: row"]');
    flexContainers.forEach((container: Element) => {
      const htmlEl = container as HTMLElement;
      htmlEl.style.width = '100%';
      htmlEl.style.maxWidth = '100%';
      htmlEl.style.boxSizing = 'border-box';
    });
  }
  
  // Get all stylesheets from the page
  const styleSheets = Array.from(document.styleSheets);
  let cssText = '';
  
  styleSheets.forEach(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || []);
      rules.forEach(rule => {
        cssText += rule.cssText + '\n';
      });
    } catch (e) {
      // Skip cross-origin stylesheets
    }
  });
  
  // Generate PDF-specific CSS variables and base styles
  const pdfCSSVariables = PDF_STYLES.generateCSSVariables(config, themeColor);
  const pdfBaseStyles = PDF_STYLES.generateBasePDFStyles(config);
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          /* PDF Style Configuration Variables */
          ${pdfCSSVariables}
          
          /* PDF Base Styles */
          ${pdfBaseStyles}
          
          /* Page Styles from Application */
          ${cssText}
          
          /* PDF-Specific Overrides */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            width: ${config.layout.pageWidth};
            min-height: ${config.layout.pageHeight};
            font-family: ${config.fonts.primary};
            margin: 0;
            padding: 0;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          /* Ensure content flows naturally across pages without extra padding */
          @page :first {
            margin-top: 0;
          }
          
          @page :left, @page :right {
            margin-top: 0;
          }
          
          /* Page break indicator should not appear in PDF */
          .page-break-indicator {
            display: none !important;
          }
          
          /* Remove any transforms that might affect the PDF */
          [style*="transform"] {
            transform: none !important;
          }
          
          /* Hide editing UI elements in PDF */
          button.border-dashed,
          button[class*="border-dashed"],
          button[class*="destructive"],
          [class*="group-hover:opacity"],
          [data-no-pdf],
          [data-pdf-hide],
          .no-print,
          [class*="no-print"] {
            display: none !important;
          }
          
          /* Hide dotted borders from editable fields in PDF */
          .border-dashed,
          [class*="border-dashed"],
          .border-dotted,
          [class*="border-dotted"] {
            border: none !important;
            border-style: solid !important;
          }
          
          /* Hide borders from bullet point editable fields but keep content */
          span[class*="border"][class*="dashed"],
          .min-h\\[1\\.2rem\\].border,
          [class*="min-h"][class*="border-dashed"] {
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
          }
          
          /* Ensure bullet point list items are visible */
          ul li,
          ul li span {
            visibility: visible !important;
          }
          
          /* PDF-safe bullet point styling - use hanging indent instead of flexbox */
          ul {
            list-style: none !important;
            padding-left: 0 !important;
            margin: 0 !important;
          }
          
          ul li {
            display: block !important;
            padding-left: 1em !important;
            text-indent: -1em !important;
            line-height: inherit !important;
          }
          
          /* Ensure bullet symbol and text stay on same line */
          ul li > span:first-child,
          ul li > span:first-of-type {
            display: inline !important;
            margin-right: 0.5em !important;
            white-space: nowrap !important;
          }
          
          /* Ensure text content after bullet is inline */
          ul li > span:not(:first-child),
          ul li > span:not(:first-of-type),
          ul li > div > span {
            display: inline !important;
          }
          
          /* Fix for nested div structures (like TwoToneClassic) */
          ul li > div {
            display: inline !important;
          }
          
          ul li > div.flex-1,
          ul li > div[class*="flex-1"] {
            display: inline !important;
          }
          
          /* Ensure all spans inside li are inline to prevent wrapping */
          ul li span {
            display: inline !important;
            white-space: normal !important;
          }
          
          /* Hide empty bullet points (those with only whitespace or placeholder text) */
          ul li:has(span:empty),
          ul li:has(div:empty) {
            display: none !important;
          }
          
          /* Hide any remaining add/delete buttons */
          button:has(svg.lucide-plus),
          button:has(svg.lucide-trash),
          button:has(svg.lucide-trash-2) {
            display: none !important;
          }
          
          /* Ensure icons are visible in PDFs */
          svg, svg * {
            fill: none !important;
            stroke: currentColor !important;
            color: inherit !important;
          }
          
          /* Hide empty contact fields in PDF */
          a[href^="https://"]:empty,
          a[href^="http://"]:empty,
          div:has(> svg):empty,
          /* Hide contact items with empty or placeholder text */
          div:has(> svg) + span:empty,
          div:has(> svg) + span:has-text("Click to edit"),
          /* Hide social links that are empty or invalid */
          a[href*="linkedin"]:not([href*="linkedin.com"]):not([href*="linkedin.com/"]),
          a[href*="github"]:not([href*="github.com"]):not([href*="github.com/"]),
          a[href*="portfolio"]:not([href*="http"]),
          /* More specific: hide if the text content is empty or just whitespace */
          div.flex.items-center:has(> svg):has(+ span:empty),
          div.flex.items-center:has(> svg):has(+ span:is(:empty, :has-text("Click to edit"))),
          /* Contact icons specific styling */
          svg[class*="lucide"] {
            width: 16px !important;
            height: 16px !important;
            flex-shrink: 0 !important;
            stroke-width: 2 !important;
          }
          
          /* Fix second page top padding - ensure content flows naturally */
          @page {
            size: A4;
            margin: 0;
          }
          
          /* Ensure no extra padding on page breaks */
          .page-break, [style*="page-break"] {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          
          /* V2 specific fixes - ensure content is visible and flows across pages */
          .resume-v2 {
            width: 210mm !important;
            max-width: 210mm !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
            min-height: auto !important;
          }
          
          /* Fix V2 two-column layout - ensure it doesn't overflow */
          .resume-v2 > div[style*="display: flex"][style*="flex-direction: row"] {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          
          /* Ensure V2 columns don't overflow */
          .resume-v2 > div > div[style*="width"] {
            box-sizing: border-box !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
            overflow: visible !important;
            max-width: 100% !important;
          }
          
          /* Prevent blank first page - ensure content starts at top */
          .resume-v2 > *:first-child {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          
        </style>
      </head>
      <body>
        ${clone.outerHTML}
      </body>
    </html>
  `;
  
  return html;
}

/**
 * PDF Generation Options
 */
export interface PDFGenerationOptions {
  /** PDF style configuration (defaults to single-column) */
  config?: PDFStyleConfig;
  /** Theme color override */
  themeColor?: string;
  /** Layout type shortcut (alternative to full config) */
  layoutType?: 'single-column' | 'two-column' | 'compact';
}

/**
 * V2-specific PDF generation function that handles two-column layouts properly
 */
function captureV2ResumeHTMLWithStyles(
  element: HTMLElement,
  config: PDFStyleConfig = SINGLE_COLUMN_CONFIG,
  themeColor?: string
): string {
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Remove editing UI elements
  const removeEditingElements = (el: HTMLElement) => {
    const selectorsToRemove = [
      'button.border-dashed',
      'button[class*="border-dashed"]',
      'button[class*="destructive"]',
      '[class*="group-hover:opacity"]',
      '[data-no-pdf]',
      '[data-pdf-hide]',
      '.no-print',
      '[class*="no-print"]',
    ];
    
    selectorsToRemove.forEach(selector => {
      try {
        const elements = el.querySelectorAll(selector);
        elements.forEach(elem => elem.remove());
      } catch (e) {
        // Ignore invalid selectors
      }
    });
    
    const allButtons = el.querySelectorAll('button');
    allButtons.forEach(button => {
      const text = button.textContent?.toLowerCase() || '';
      const classList = button.className || '';
      if (text.includes('add ') || classList.includes('border-dashed')) {
        button.remove();
      }
      if (button.classList.contains('h-6') && button.classList.contains('w-6')) {
        button.remove();
      }
    });
  };
  
  removeEditingElements(clone);
  
  // Remove empty list items
  const removeEmptyListItems = (el: HTMLElement) => {
    const listItems = el.querySelectorAll('ul li');
    listItems.forEach(li => {
      const textContent = li.textContent?.trim() || '';
      const hasPlaceholder = textContent.includes('Click to add') || textContent.includes('placeholder');
      if (!textContent || hasPlaceholder || textContent.length < 3) {
        li.remove();
      }
    });
  };
  
  removeEmptyListItems(clone);
  
  // Remove transforms
  const removeTransforms = (el: HTMLElement) => {
    if (el.style.transform) {
      el.style.transform = 'none';
    }
    const styleAttr = el.getAttribute('style');
    if (styleAttr && styleAttr.includes('transform')) {
      el.setAttribute('style', styleAttr.replace(/transform:[^;]+;?/gi, ''));
    }
    Array.from(el.children).forEach(child => {
      if (child instanceof HTMLElement) {
        removeTransforms(child);
      }
    });
  };
  
  removeTransforms(clone);
  
  // V2-specific fixes for two-column layout
  if (clone.classList.contains('resume-v2')) {
    clone.style.width = '210mm';
    clone.style.maxWidth = '210mm';
    clone.style.boxSizing = 'border-box';
    clone.style.overflow = 'visible';
    clone.style.minHeight = 'auto';
    
    // Fix spacing for single-column layouts: if content wrapper has padding-top: 0, 
    // ensure first section also has no top padding (header's bottom padding handles spacing)
    const contentWrappers = clone.querySelectorAll('div[style*="padding"]');
    contentWrappers.forEach((wrapper: Element) => {
      const htmlEl = wrapper as HTMLElement;
      const paddingTop = htmlEl.style.paddingTop || '';
      // Check if padding-top is 0 or 0px
      if (paddingTop === '0' || paddingTop === '0px') {
        const firstSection = htmlEl.querySelector('[data-section]:first-child');
        if (firstSection) {
          (firstSection as HTMLElement).style.paddingTop = '0';
          (firstSection as HTMLElement).style.marginTop = '0';
        }
      }
    });
    
    // Fix two-column flex containers - use fixed pixel widths for PDF
    const flexContainers = clone.querySelectorAll('[style*="display: flex"][style*="flex-direction: row"]');
    flexContainers.forEach((container: Element) => {
      const htmlEl = container as HTMLElement;
      htmlEl.style.width = '100%';
      htmlEl.style.maxWidth = '100%';
      htmlEl.style.boxSizing = 'border-box';
      htmlEl.style.overflow = 'visible';
      
      // Fix column widths - convert percentages to fixed pixels for PDF
      const columns = htmlEl.children;
      if (columns.length === 2) {
        // Calculate A4 width minus padding (210mm = 794px at 96dpi)
        const containerWidth = 794;
        const paddingLeft = parseInt(htmlEl.style.paddingLeft || '0') || 28;
        const paddingRight = parseInt(htmlEl.style.paddingRight || '0') || 28;
        const gap = 24; // 3% of 794px ≈ 24px
        const availableWidth = containerWidth - paddingLeft - paddingRight - gap;
        
        // Get columns and check original widths before conversion
        const leftCol = columns[0] as HTMLElement;
        const rightCol = columns[1] as HTMLElement;
        
        // Get original widths to determine which is sidebar
        const leftOriginalWidth = leftCol.style.width || '';
        const rightOriginalWidth = rightCol.style.width || '';
        const leftWidthPercent = leftOriginalWidth.includes('%') ? parseFloat(leftOriginalWidth) : null;
        const rightWidthPercent = rightOriginalWidth.includes('%') ? parseFloat(rightOriginalWidth) : null;
        
        // Check if columns have background color (indicating sidebar) - check both inline and computed
        const leftInlineBg = leftCol.style.backgroundColor;
        const rightInlineBg = rightCol.style.backgroundColor;
        const leftHasBg = leftInlineBg && 
          leftInlineBg !== 'transparent' && 
          leftInlineBg !== 'rgba(0, 0, 0, 0)' &&
          leftInlineBg !== '';
        const rightHasBg = rightInlineBg && 
          rightInlineBg !== 'transparent' && 
          rightInlineBg !== 'rgba(0, 0, 0, 0)' &&
          rightInlineBg !== '';
        
        // Determine which column is sidebar (has background OR is narrower - typically < 50%)
        const isRightSidebar = rightHasBg || (rightWidthPercent !== null && rightWidthPercent < 50);
        const isLeftSidebar = leftHasBg || (leftWidthPercent !== null && leftWidthPercent < 50);
        
        // Calculate widths based on original percentages or defaults
        const leftWidth = Math.floor(availableWidth * (leftWidthPercent ? leftWidthPercent / 100 : 0.60));
        const rightWidth = Math.floor(availableWidth * (rightWidthPercent ? rightWidthPercent / 100 : 0.35));
        
        // Apply widths
        leftCol.style.width = `${leftWidth}px`;
        leftCol.style.maxWidth = `${leftWidth}px`;
        leftCol.style.minWidth = `${leftWidth}px`;
        leftCol.style.flexShrink = '0';
        leftCol.style.flexGrow = '0';
        leftCol.style.boxSizing = 'border-box';
        leftCol.style.overflow = 'hidden';
        leftCol.style.overflowWrap = 'break-word';
        leftCol.style.wordWrap = 'break-word';
        
        rightCol.style.width = `${rightWidth}px`;
        rightCol.style.maxWidth = `${rightWidth}px`;
        rightCol.style.minWidth = `${rightWidth}px`;
        rightCol.style.flexShrink = '0';
        rightCol.style.flexGrow = '0';
        rightCol.style.boxSizing = 'border-box';
        rightCol.style.overflow = 'hidden';
        rightCol.style.overflowWrap = 'break-word';
        rightCol.style.wordWrap = 'break-word';
        
        // Fix sidebar padding - remove outer edge padding to align with page padding
        
        // If right column is sidebar, remove its right padding
        if (isRightSidebar) {
          const currentPadding = rightCol.style.padding || '';
          const paddingTop = rightCol.style.paddingTop || '';
          const paddingBottom = rightCol.style.paddingBottom || '';
          const paddingLeft = rightCol.style.paddingLeft || '';
          
          if (currentPadding) {
            // Parse padding and set right to 0
            const paddingValues = currentPadding.split(' ').filter(Boolean);
            if (paddingValues.length === 1) {
              // Single value - apply to top/bottom/left only
              rightCol.style.padding = `${paddingValues[0]} 0 ${paddingValues[0]} ${paddingValues[0]}`;
            } else if (paddingValues.length === 4) {
              // Four values - set right (index 1) to 0
              rightCol.style.padding = `${paddingValues[0]} 0 ${paddingValues[2]} ${paddingValues[3]}`;
            }
          } else if (paddingTop || paddingBottom || paddingLeft) {
            // Individual properties - set right to 0
            rightCol.style.paddingRight = '0';
          }
        }
        
        // If left column is sidebar, remove its left padding
        if (isLeftSidebar) {
          const currentPadding = leftCol.style.padding || '';
          const paddingTop = leftCol.style.paddingTop || '';
          const paddingBottom = leftCol.style.paddingBottom || '';
          const paddingRight = leftCol.style.paddingRight || '';
          
          if (currentPadding) {
            // Parse padding and set left to 0
            const paddingValues = currentPadding.split(' ').filter(Boolean);
            if (paddingValues.length === 1) {
              // Single value - apply to top/right/bottom only
              leftCol.style.padding = `${paddingValues[0]} ${paddingValues[0]} ${paddingValues[0]} 0`;
            } else if (paddingValues.length === 4) {
              // Four values - set left (index 3) to 0
              leftCol.style.padding = `${paddingValues[0]} ${paddingValues[1]} ${paddingValues[2]} 0`;
            }
          } else if (paddingTop || paddingBottom || paddingRight) {
            // Individual properties - set left to 0
            leftCol.style.paddingLeft = '0';
          }
        }
        
        // Set gap
        htmlEl.style.gap = `${gap}px`;
      }
    });
  }
  
  // Get all stylesheets
  const styleSheets = Array.from(document.styleSheets);
  let cssText = '';
  
  styleSheets.forEach(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || []);
      rules.forEach(rule => {
        cssText += rule.cssText + '\n';
      });
    } catch (e) {
      // Skip cross-origin stylesheets
    }
  });
  
  // Generate PDF-specific CSS
  const pdfCSSVariables = PDF_STYLES.generateCSSVariables(config, themeColor);
  const pdfBaseStyles = PDF_STYLES.generateBasePDFStyles(config);
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          /* PDF Style Configuration Variables */
          ${pdfCSSVariables}
          
          /* PDF Base Styles */
          ${pdfBaseStyles}
          
          /* Page Styles from Application */
          ${cssText}
          
          /* PDF-Specific Overrides */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box;
          }
          html, body {
            width: ${config.layout.pageWidth};
            min-height: ${config.layout.pageHeight};
            font-family: ${config.fonts.primary};
            margin: 0;
            padding: 0;
          }
          
          /* Set default page margins - all pages get top margin */
          @page {
            size: A4;
            margin: 28px 0 0 0;
          }
          
          /* First page has no top margin */
          @page :first {
            margin-top: 0;
          }
          
          /* V2 Two-Column Layout Fixes */
          .resume-v2 {
            width: 210mm !important;
            max-width: 210mm !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            min-height: auto !important;
          }
          
          /* Fix two-column flex container */
          .resume-v2 > div[style*="display: flex"][style*="flex-direction: row"] {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          
          /* Ensure columns are properly constrained */
          .resume-v2 > div > div[style*="width"] {
            box-sizing: border-box !important;
            overflow: hidden !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
            word-break: break-word !important;
          }
          
          /* Fix sidebar padding for two-column layouts - ensure outer edge aligns with page padding */
          /* The page padding already handles outer edges, so remove padding from column outer edges */
          /* For two-column layouts, remove left padding from first column and right padding from last column */
          .resume-v2 > div[style*="display: flex"][style*="flex-direction: row"] {
            /* Container already has page padding, so columns shouldn't add to outer edges */
          }
          
          .resume-v2 > div[style*="display: flex"][style*="flex-direction: row"] > div:first-child {
            padding-left: 0 !important;
          }
          
          .resume-v2 > div[style*="display: flex"][style*="flex-direction: row"] > div:last-child {
            padding-right: 0 !important;
          }
          
          /* Additional fix: if a column has a background color (sidebar), ensure outer edge has no padding */
          /* This handles cases where background is set via inline style */
          .resume-v2 > div[style*="display: flex"] > div[style*="background-color"]:not([style*="background-color: transparent"]):not([style*="background-color: rgba(0, 0, 0, 0)"]):last-child {
            padding-right: 0 !important;
          }
          
          .resume-v2 > div[style*="display: flex"] > div[style*="background-color"]:not([style*="background-color: transparent"]):not([style*="background-color: rgba(0, 0, 0, 0)"]):first-child {
            padding-left: 0 !important;
          }
          
          /* Prevent content from overflowing columns */
          .resume-v2 > div > div > * {
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
          }
          
          /* Hide editing UI */
          button.border-dashed,
          button[class*="border-dashed"],
          button[class*="destructive"],
          [class*="group-hover:opacity"],
          [data-no-pdf],
          [data-pdf-hide],
          .no-print {
            display: none !important;
          }
          
          /* Hide dotted borders */
          .border-dashed,
          [class*="border-dashed"],
          .border-dotted {
            border: none !important;
          }
          
          /* Bullet points - preserve list-style-type from component */
          /* Don't override list-style - let component's inline styles work */
          ul {
            margin: 0 !important;
            /* Preserve padding-left from component inline styles */
          }
          
          /* Ensure list items display properly with bullets */
          ul li {
            display: list-item !important;
            list-style-position: outside !important;
            /* Preserve component's list-style-type (disc, circle, square) */
            margin-bottom: 0.25em !important;
          }
          
          /* For V2 experience bullets specifically, ensure proper spacing */
          .resume-v2 ul {
            /* Don't override - component sets padding-left: 20px inline */
          }
          
          .resume-v2 ul li {
            display: list-item !important;
            list-style-position: outside !important;
            /* Component sets list-style-type inline, preserve it */
          }
          
          /* CRITICAL FIX: Ensure sections have proper top spacing in PDF */
          /* This is a common problem - sections at top of new page lose spacing */
          
          /* Preserve section bottom margins */
          .resume-v2 [data-section] {
            margin-bottom: 20px !important;
          }
          
          /* Add top margin for sections with explicit page breaks */
          .resume-v2 [data-section][style*="page-break-before"],
          .resume-v2 [data-section][style*="break-before"] {
            margin-top: 20px !important;
          }
          
          /* CRITICAL: Use padding-top that will be preserved when section breaks to new page */
          /* Padding is more reliable than margin for page breaks in PDF */
          .resume-v2 [data-section] {
            padding-top: 0 !important;
          }
          
          /* Add padding-top only for sections that appear at the top of a new page */
          .resume-v2 [data-section][style*="page-break-before"],
          .resume-v2 [data-section][style*="break-before"] {
            padding-top: 20px !important;
          }
          
          /* For single-column layouts: first section after header should NOT have top padding */
          /* The header's bottom padding already handles the spacing */
          .resume-v2 > div[style*="padding"] > [data-section]:first-child {
            padding-top: 0 !important;
            margin-top: 0 !important;
          }
          
          /* For two-column layouts: first section in each column should NOT have top padding */
          .resume-v2 > div[style*="display: flex"] > div > [data-section]:first-child {
            padding-top: 0 !important;
            margin-top: 0 !important;
          }
          
          /* Remove padding-top for sections that follow another section (not at page top) */
          .resume-v2 > div > div > [data-section] ~ [data-section] {
            padding-top: 0 !important;
          }
          
          /* For single-column layouts - ensure no extra padding on first section */
          .resume-v2 > div[style*="padding"] > [data-section]:first-child {
            padding-top: 0 !important;
          }
        </style>
      </head>
      <body>
        ${clone.outerHTML}
      </body>
    </html>
  `;
  
  return html;
}

/**
 * Generate PDF using Netlify Function
 * 
 * @param previewElementId - ID of the resume preview element in DOM
 * @param filename - Output filename for the PDF
 * @param options - Optional PDF generation options
 */
export async function generatePDFFromPreview(
  previewElementId: string = 'resume-preview',
  filename: string = 'resume.pdf',
  options: PDFGenerationOptions = {}
): Promise<void> {
  // Find the preview element
  const previewElement = document.getElementById(previewElementId);
  if (!previewElement) {
    throw new Error(`Preview element with ID "${previewElementId}" not found`);
  }
  
  // Determine the config to use
  const config = options.config || PDF_STYLES.getDefault(options.layoutType);
  
  // Get the actual template content to avoid capturing wrapper divs
  // V1 structure: #resume-preview > StyleOptionsWrapper > TemplateComponent
  // V2 structure: StyleOptionsWrapper > #resume-preview-v2 > InlineEditProvider > ResumeRenderer (div.resume-v2)
  // For V2, we need to find the .resume-v2 element inside which contains the actual content
  let resumeContent: HTMLElement = previewElement;
  let isV2 = false;
  
  // Check if this is V2 by looking for .resume-v2 class inside
  const v2Content = previewElement.querySelector('.resume-v2') as HTMLElement;
  
  if (v2Content) {
    // For V2, use the .resume-v2 element which is the actual ResumeRenderer content
    // This is inside InlineEditProvider, which is inside #resume-preview-v2
    resumeContent = v2Content;
    isV2 = true;
  } else {
    // V1: Get the first child element (the actual template content)
    const firstChild = previewElement.firstElementChild as HTMLElement;
    if (firstChild) {
      // If StyleOptionsWrapper, get its first child (the actual template/resume content)
      const templateContent = firstChild.firstElementChild as HTMLElement;
      if (templateContent) {
        resumeContent = templateContent;
      } else {
        // Fallback to first child if no nested content
        resumeContent = firstChild;
      }
    }
  }
  
  // Use V2-specific function for V2, regular function for V1
  const html = isV2 
    ? captureV2ResumeHTMLWithStyles(resumeContent, config, options.themeColor)
    : captureResumeHTMLWithStyles(resumeContent, config, options.themeColor);
  
  // Send to Netlify function
  const response = await fetch('/.netlify/functions/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html, filename }),
  });
  
  // Check if function exists (404 means netlify dev is not running)
  if (response.status === 404) {
    throw new Error('PDF generation service not available. Please run "netlify dev" instead of "npm run dev" to enable PDF downloads.');
  }
  
  // Parse JSON response
  const result = await response.json();
  
  if (!response.ok || !result.success) {
    throw new Error(result.error || result.details || 'PDF generation failed');
  }
  
  // Clean and decode base64 to binary
  const cleanBase64 = result.data.replace(/[\s\n\r]/g, '');
  
  // Decode base64 to binary using fetch API
  const response2 = await fetch(`data:application/pdf;base64,${cleanBase64}`);
  const pdfBlob = await response2.blob();
  
  // Download the PDF
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = result.filename || filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate PDF with custom HTML (for advanced use cases)
 */
export async function generatePDFFromHTML(
  html: string,
  filename: string = 'resume.pdf'
): Promise<Blob> {
  const response = await fetch('/.netlify/functions/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html, filename }),
  });
  
  // Check if function exists (404 means netlify dev is not running)
  if (response.status === 404) {
    throw new Error('PDF generation service not available. Please run "netlify dev" instead of "npm run dev" to enable PDF downloads.');
  }
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'PDF generation failed');
  }
  
  return response.blob();
}

// Re-export PDF styles for use in templates
export { PDF_STYLES, SINGLE_COLUMN_CONFIG, TWO_COLUMN_CONFIG, COMPACT_CONFIG } from './pdfStyles';
export type { PDFStyleConfig, FontConfig, SpacingConfig, PDFLayoutConfig } from './pdfStyles';
