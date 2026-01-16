/**
 * Generate Resume from Job Description Route
 *
 * Creates a complete resume structure from a job description.
 */

import { Router } from 'express';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';

export const generateResumeRouter = Router();

const GENERATE_PROMPT = `Generate a professional resume structure based on this job description.

Create a realistic resume for someone qualified for this position. Return JSON only.

STRUCTURE:
{
  "personalInfo": {
    "fullName": "[Generate realistic name]",
    "email": "[Generate professional email]",
    "phone": "[Generate phone]",
    "location": "[Generate location]",
    "title": "[Job-relevant title]",
    "summary": "[2-3 sentences tailored to JD]",
    "linkedin": "",
    "github": "",
    "portfolio": "",
    "website": ""
  },
  "experience": [
    {
      "id": "exp-0",
      "company": "[Realistic company]",
      "position": "[Relevant position]",
      "location": "[City, State]",
      "startDate": "[MMM YYYY]",
      "endDate": "[MMM YYYY or Present]",
      "current": true/false,
      "description": "[Role overview]",
      "bulletPoints": ["Achievement 1", "Achievement 2", "Achievement 3"]
    }
  ],
  "education": [
    {
      "id": "edu-0",
      "school": "[University name]",
      "degree": "[Degree]",
      "field": "[Field of study]",
      "location": "[City, State]",
      "startDate": "[YYYY]",
      "endDate": "[YYYY]",
      "gpa": ""
    }
  ],
  "skills": [
    {"id": "skill-0", "name": "[Skill from JD]", "category": "[Category]"}
  ],
  "certifications": [],
  "projects": [],
  "languages": [],
  "awards": [],
  "achievements": [],
  "volunteer": [],
  "interests": []
}

RULES:
1. Extract key skills/requirements from JD
2. Create 2-3 relevant experience entries
3. Include 1-2 education entries
4. Add 8-12 relevant skills
5. Make bullet points achievement-focused with metrics
6. Generate unique IDs for all items

JOB DESCRIPTION:
`;

generateResumeRouter.post('/', async (req, res) => {
  const keys = getApiKeys();

  if (!keys.geminiKey && !keys.groqKey && !keys.anthropicKey && !keys.openaiKey) {
    return res.status(500).json({
      error: 'AI service not configured. Please set at least one API key.',
    });
  }

  try {
    const { jobDescription, jobTitle, companyName } = req.body;

    if (!jobDescription || jobDescription.trim().length < 50) {
      return res.status(400).json({
        error: 'Job description is required (minimum 50 characters)',
      });
    }

    const context = `${jobTitle ? `Job Title: ${jobTitle}\n` : ''}${companyName ? `Company: ${companyName}\n` : ''}\n${jobDescription}`;

    console.log(`Generating resume for job: ${jobTitle || 'Not specified'} at ${companyName || 'Not specified'}`);

    const { data: generatedData, provider } = await callAIWithFallback(
      GENERATE_PROMPT + context,
      {
        temperature: 0.7,
        timeout: 90000,
        systemPrompt: 'You are an expert resume writer.',
      }
    );

    // Validate and ensure structure
    const validatedData = validateGeneratedData(generatedData);

    console.log(`Generation successful using ${provider}`);

    res.json({
      success: true,
      data: validatedData,
      provider,
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      error: 'Failed to generate resume',
      details: error.message,
    });
  }
});

function validateGeneratedData(data) {
  const createId = (prefix, idx) => `${prefix}-${idx}`;

  data.version = '2.0';

  // Ensure personal info exists
  if (!data.personalInfo) {
    data.personalInfo = {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      title: 'Professional',
      summary: '',
      linkedin: '',
      github: '',
      portfolio: '',
      website: '',
    };
  }

  // Ensure experience has IDs
  if (!Array.isArray(data.experience)) data.experience = [];
  data.experience = data.experience.map((exp, idx) => ({
    ...exp,
    id: exp.id || createId('exp', idx),
    bulletPoints: Array.isArray(exp.bulletPoints) ? exp.bulletPoints : [],
  }));

  // Ensure education has IDs
  if (!Array.isArray(data.education)) data.education = [];
  data.education = data.education.map((edu, idx) => ({
    ...edu,
    id: edu.id || createId('edu', idx),
  }));

  // Ensure skills have IDs
  if (!Array.isArray(data.skills)) data.skills = [];
  data.skills = data.skills.map((skill, idx) => ({
    id: skill.id || createId('skill', idx),
    name: typeof skill === 'string' ? skill : skill.name || '',
    category: skill.category || 'Technical',
  }));

  // Ensure other arrays exist
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
