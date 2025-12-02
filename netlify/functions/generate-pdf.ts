import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

interface PDFRequest {
  html: string;
  filename?: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Parse request body
  let requestData: PDFRequest;
  try {
    requestData = JSON.parse(event.body || "{}");
  } catch (error) {
    console.error("JSON parse error:", error);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const { html, filename = "resume.pdf" } = requestData;

  if (!html) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "HTML content is required" }),
    };
  }

  let browser = null;

  try {
    const isDev = process.env.NETLIFY_DEV === "true";

    let puppeteer: any;
    let launchOptions: any;

    if (isDev) {
      // Local development: try full puppeteer first, fallback to system Chrome
      try {
        puppeteer = await import("puppeteer");
        launchOptions = {
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu",
          ],
        };
        const testBrowser = await puppeteer.launch(launchOptions);
        await testBrowser.close();
      } catch (puppeteerError) {
        // Fallback to puppeteer-core with system Chrome
        puppeteer = await import("puppeteer-core");
        
        // Try to find Chrome in common locations
        const possibleChromePaths = [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // macOS
          "/usr/bin/google-chrome", // Linux
          "/usr/bin/chromium-browser", // Linux
          "/usr/bin/chromium", // Linux
          process.env.PUPPETEER_EXECUTABLE_PATH, // Custom path
        ].filter(Boolean);
        
        let chromePath: string | undefined;
        const fs = await import("fs");
        for (const path of possibleChromePaths) {
          try {
            if (fs.existsSync(path!)) {
              chromePath = path;
              break;
            }
          } catch (e) {
            // Continue searching
          }
        }
        
        if (!chromePath) {
          throw new Error(
            "Chrome not found. Please install Google Chrome or set PUPPETEER_EXECUTABLE_PATH environment variable."
          );
        }
        
        launchOptions = {
          executablePath: chromePath,
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu",
          ],
        };
      }
    } else {
      // Production: use puppeteer-core with @sparticuz/chromium
      const puppeteerCore = await import("puppeteer-core");
      puppeteer = puppeteerCore.default || puppeteerCore;
      
      const chromiumModule = await import("@sparticuz/chromium");
      const chromium = chromiumModule.default || chromiumModule;
      
      // Disable WebGL for better compatibility
      chromium.setGraphicsMode = false;
      
      const executablePath = await chromium.executablePath();
      
      launchOptions = {
        args: chromium.args,
        defaultViewport: { width: 794, height: 1123 },
        executablePath: executablePath,
        headless: "shell",
      };
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();
    
    // Set viewport to A4 size (794x1123 pixels at 96 DPI)
    await page.setViewport({ width: 794, height: 1123 });
    
    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    
    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    // Wait a bit more for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 500));
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
      preferCSSPageSize: true,
    });

    // Convert Uint8Array to Buffer for proper base64 encoding
    const buffer = Buffer.from(pdfBuffer);
    const base64Data = buffer.toString("base64");
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        filename: filename,
        data: base64Data,
        size: pdfBuffer.length,
      }),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log error for Netlify function logs
    console.error("PDF generation error:", errorMessage);
    console.error("Stack:", errorStack);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Failed to generate PDF",
        details: errorMessage,
        stack: errorStack,
      }),
    };
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        // Ignore close errors
      }
    }
  }
};

export { handler };
