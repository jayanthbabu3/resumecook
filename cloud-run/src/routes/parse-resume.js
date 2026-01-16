/**
 * Resume Parsing Route
 *
 * Extracts text from PDF/DOCX and structures it using AI.
 */

import { Router } from 'express';
import mammoth from 'mammoth';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';

export const parseResumeRouter = Router();

const AI_PROMPT = `Parse this resume into JSON. Return JSON only, no markdown.

SECTIONS to extract:
- personalInfo: {fullName, email, phone, location, title, summary, linkedin, github, portfolio, website}
- experience[]: {id, company, position, location, startDate, endDate, current, description, bulletPoints[]}
- education[]: {id, school, degree, field, location, startDate, endDate, gpa}
- skills[]: {id, name, category}
- languages[]: {id, language, proficiency}
- certifications[]: {id, name, issuer, date, credentialId, url}
- projects[]: {id, name, description, technologies[], url, startDate, endDate, highlights[]}
- awards[], achievements[], strengths[], volunteer[], publications[], speaking[], patents[], interests[], references[], courses[]
- customSections[]: for non-standard sections like Military Service, Affiliations

RULES:
1. Generate IDs as "type-index" (e.g., "exp-0", "edu-1")
2. Dates as "MMM YYYY" or just year
3. Use empty string "" or [] for missing fields
4. Extract ALL bullet points into bulletPoints arrays

RESUME:
`;

// Dynamic import for PDF parsing (ES module)
async function extractTextFromPDF(buffer) {
  // Use pdfjs-dist for PDF extraction
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const data = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

parseResumeRouter.post('/', async (req, res) => {
  const keys = getApiKeys();

  if (!keys.geminiKey && !keys.groqKey && !keys.anthropicKey && !keys.openaiKey) {
    return res.status(500).json({
      error: 'AI service not configured. Please set at least one API key.',
    });
  }

  try {
    const { fileData, fileName, fileType } = req.body;

    if (!fileData || !fileName) {
      return res.status(400).json({ error: 'File data and name are required' });
    }

    const fileBuffer = Buffer.from(fileData, 'base64');
    let extractedText = '';
    const lowerFileName = fileName.toLowerCase();

    // Extract text based on file type
    if (lowerFileName.endsWith('.pdf') || fileType === 'application/pdf') {
      try {
        extractedText = await extractTextFromPDF(fileBuffer);
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError);
        return res.status(400).json({
          error: 'Failed to parse PDF file. Please ensure it\'s a valid PDF with text content.',
        });
      }
    } else if (lowerFileName.endsWith('.docx') || fileType?.includes('wordprocessingml')) {
      try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value;
      } catch (docxError) {
        console.error('DOCX parsing error:', docxError);
        return res.status(400).json({
          error: 'Failed to parse DOCX file. Please ensure it\'s a valid Word document.',
        });
      }
    } else if (lowerFileName.endsWith('.txt') || fileType === 'text/plain') {
      extractedText = fileBuffer.toString('utf-8');
    } else {
      return res.status(400).json({
        error: 'Unsupported file format. Please upload PDF, DOCX, or TXT file.',
      });
    }

    // Clean extracted text
    extractedText = extractedText
      .replace(/\s+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (!extractedText || extractedText.length < 50) {
      return res.status(400).json({
        error: 'Could not extract text from file. The file may be empty or image-based.',
      });
    }

    // Limit text length
    if (extractedText.length > 15000) {
      extractedText = extractedText.substring(0, 15000);
    }

    console.log(`Extracted ${extractedText.length} characters from ${fileName}`);

    const { data: structuredData, provider } = await callAIWithFallback(
      AI_PROMPT + extractedText,
      {
        temperature: 0.1,
        timeout: 90000,
        systemPrompt: 'You are an expert resume parser.',
      }
    );

    const validatedData = validateResumeData(structuredData);

    console.log(`Parse successful using ${provider}`);

    res.json({
      success: true,
      data: validatedData,
      extractedTextLength: extractedText.length,
      provider,
    });
  } catch (error) {
    console.error('Resume parsing error:', error);
    res.status(500).json({
      error: 'Failed to parse resume',
      details: error.message,
    });
  }
});

function validateResumeData(data) {
  const createId = (prefix, idx) => `${prefix}-${idx}`;

  data.version = '2.0';

  // Personal Info
  if (!data.personalInfo) data.personalInfo = {};
  data.personalInfo = {
    fullName: data.personalInfo.fullName || '',
    email: data.personalInfo.email || '',
    phone: data.personalInfo.phone || '',
    location: data.personalInfo.location || '',
    title: data.personalInfo.title || '',
    summary: data.personalInfo.summary || '',
    linkedin: data.personalInfo.linkedin || '',
    github: data.personalInfo.github || '',
    portfolio: data.personalInfo.portfolio || '',
    website: data.personalInfo.website || '',
  };

  // Experience
  if (!Array.isArray(data.experience)) data.experience = [];
  data.experience = data.experience.map((exp, idx) => ({
    id: exp.id || createId('exp', idx),
    company: exp.company || '',
    position: exp.position || exp.title || '',
    location: exp.location || '',
    startDate: exp.startDate || '',
    endDate: exp.endDate || '',
    current: exp.current || false,
    description: exp.description || '',
    bulletPoints: Array.isArray(exp.bulletPoints) ? exp.bulletPoints : [],
  }));

  // Education
  if (!Array.isArray(data.education)) data.education = [];
  data.education = data.education.map((edu, idx) => ({
    id: edu.id || createId('edu', idx),
    school: edu.school || edu.institution || '',
    degree: edu.degree || '',
    field: edu.field || edu.fieldOfStudy || edu.major || '',
    location: edu.location || '',
    startDate: edu.startDate || '',
    endDate: edu.endDate || '',
    gpa: edu.gpa || '',
  }));

  // Skills
  if (!Array.isArray(data.skills)) data.skills = [];
  data.skills = data.skills.map((skill, idx) => ({
    id: skill.id || createId('skill', idx),
    name: typeof skill === 'string' ? skill : skill.name || '',
    category: skill.category || 'Technical',
  }));

  // Ensure other sections exist as arrays
  const arraySections = [
    'languages', 'certifications', 'projects', 'awards', 'achievements',
    'strengths', 'volunteer', 'publications', 'speaking', 'patents',
    'interests', 'references', 'courses', 'customSections'
  ];

  arraySections.forEach(section => {
    if (!Array.isArray(data[section])) data[section] = [];
  });

  // Settings
  data.settings = {
    includeSocialLinks: true,
    includePhoto: false,
    dateFormat: 'MMM YYYY',
  };

  return data;
}
