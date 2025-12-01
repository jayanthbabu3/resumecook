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
 */
function captureResumeHTMLWithStyles(element: HTMLElement): string {
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
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
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          ${cssText}
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            width: 210mm;
            min-height: 297mm;
          }
          @page {
            size: A4;
            margin: 0;
          }
          /* Remove any transforms that might affect the PDF */
          [style*="transform"] {
            transform: none !important;
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
 */
export async function generatePDFFromPreview(
  previewElementId: string = 'resume-preview',
  filename: string = 'resume.pdf'
): Promise<void> {
  // Find the preview element
  const previewElement = document.getElementById(previewElementId);
  if (!previewElement) {
    throw new Error(`Preview element with ID "${previewElementId}" not found`);
  }
  
  // Use the element directly - it should contain the resume template
  // The captureResumeHTMLWithStyles function will handle transforms and sizing
  const resumeContent = previewElement;
  
  // Capture HTML with styles
  const html = captureResumeHTMLWithStyles(resumeContent);
  
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

