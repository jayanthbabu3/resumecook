/**
 * PDF Generation Route
 *
 * Converts HTML resume to PDF using Puppeteer.
 * On Cloud Run, we use full Puppeteer with system Chromium - no hacks needed!
 */

import { Router } from 'express';
import puppeteer from 'puppeteer';

export const generatePdfRouter = Router();

generatePdfRouter.post('/', async (req, res) => {
  const { html, filename = 'resume.pdf' } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'HTML content is required' });
  }

  let browser = null;

  try {
    console.log('Launching Puppeteer for PDF generation...');

    // Cloud Run uses full Chromium installed via Dockerfile
    // No need for @sparticuz/chromium or other hacks!
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--single-process', // Required for Cloud Run
      ],
      // Use system Chromium (set via PUPPETEER_EXECUTABLE_PATH in Dockerfile)
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    });

    const page = await browser.newPage();

    // Set viewport to A4 size
    await page.setViewport({ width: 794, height: 1123 });

    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 60000, // 60 seconds - plenty on Cloud Run
    });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    // Brief wait for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 500));

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    });

    // Convert to base64
    const base64Data = Buffer.from(pdfBuffer).toString('base64');

    console.log(`PDF generated successfully: ${pdfBuffer.length} bytes`);

    res.json({
      success: true,
      filename,
      data: base64Data,
      size: pdfBuffer.length,
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      error: 'Failed to generate PDF',
      details: error.message,
    });
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // Ignore close errors
      }
    }
  }
});
