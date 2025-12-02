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
  
  // Ensure the root element has proper A4 sizing
  clone.style.width = '210mm';
  clone.style.minHeight = '297mm';
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.padding = clone.style.padding || '0';
  
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
          }
          @page {
            size: A4;
            margin: 0;
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
          ul li span,
          ul li div {
            display: list-item !important;
            visibility: visible !important;
          }
          
          ul li div {
            display: block !important;
          }
          
          /* Ensure list bullets are visible */
          ul {
            list-style-type: disc !important;
            list-style-position: outside !important;
            padding-left: 20px !important;
          }
          
          ul li {
            display: list-item !important;
            list-style-type: disc !important;
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
          
          /* Contact icons specific styling */
          svg[class*="lucide"] {
            width: 16px !important;
            height: 16px !important;
            flex-shrink: 0 !important;
            stroke-width: 2 !important;
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
  
  // Use the element directly - it should contain the resume template
  // The captureResumeHTMLWithStyles function will handle transforms and sizing
  const resumeContent = previewElement;
  
  // Capture HTML with styles using the config
  const html = captureResumeHTMLWithStyles(resumeContent, config, options.themeColor);
  
  // Send to Netlify function
  const response = await fetch('/.netlify/functions/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html, filename }),
  });
  
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
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'PDF generation failed');
  }
  
  return response.blob();
}

// Re-export PDF styles for use in templates
export { PDF_STYLES, SINGLE_COLUMN_CONFIG, TWO_COLUMN_CONFIG, COMPACT_CONFIG } from './pdfStyles';
export type { PDFStyleConfig, FontConfig, SpacingConfig, PDFLayoutConfig } from './pdfStyles';
