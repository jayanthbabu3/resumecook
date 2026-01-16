/**
 * Resume Tailoring Route
 *
 * Takes existing resume and job description, optimizes the resume
 * to better match the job requirements.
 */

import { Router } from 'express';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';

export const tailorResumeRouter = Router();

const JOB_TAILOR_PROMPT = `Tailor this resume for the job description. Return JSON only.

RULES:
1. PRESERVE: names, companies, titles, dates, locations, IDs, contact info
2. REWRITE summary to match JD requirements
3. REFRAME bullet points to emphasize JD-relevant skills (use "bulletPoints" array)
4. Integrate JD keywords naturally - no stuffing
5. NO fake metrics - only use numbers from original resume
6. Each bullet must be UNIQUE - no repeated themes across experiences

INCLUDE in response:
- _analysis: {matchScore (0-100), keywordsFound[], keywordsMissing[], keywordsAdded[]}
- suggestedSkills: [{id, name, category, reason}] for missing JD skills

`;

tailorResumeRouter.post('/', async (req, res) => {
  const keys = getApiKeys();

  if (!keys.geminiKey && !keys.groqKey && !keys.anthropicKey && !keys.openaiKey) {
    return res.status(500).json({
      error: 'AI service not configured. Please set at least one API key.',
    });
  }

  try {
    const { resumeData, jobDescription, jobTitle, companyName } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      return res.status(400).json({
        error: 'Job description is required (minimum 50 characters)',
      });
    }

    // Clean data
    const cleanData = { ...resumeData };
    delete cleanData._parsedSections;
    delete cleanData._enhancements;
    delete cleanData._analysis;
    delete cleanData.suggestedSkills;

    const jobContext = `
JOB DESCRIPTION:
${jobTitle ? `Job Title: ${jobTitle}` : ''}
${companyName ? `Company: ${companyName}` : ''}

${jobDescription}

RESUME TO TAILOR:
${JSON.stringify(cleanData, null, 2)}
`;

    console.log(`Tailoring resume for: ${cleanData.personalInfo?.fullName || 'Unknown'}`);
    console.log(`Job: ${jobTitle || 'Not specified'} at ${companyName || 'Not specified'}`);

    // Groq is fastest, use it first for tailoring
    const { data: tailoredData, provider } = await callAIWithFallback(
      JOB_TAILOR_PROMPT + jobContext,
      {
        temperature: 0.3,
        timeout: 90000,
        priority: ['groq', 'gemini', 'claude', 'openai'], // Groq first for speed
        systemPrompt: 'You are an expert resume writer and ATS specialist.',
      }
    );

    const validatedData = validateTailoredData(resumeData, tailoredData);

    const analysis = validatedData._analysis || {
      matchScore: 70,
      keywordsFound: [],
      keywordsMissing: [],
      keywordsAdded: [],
    };

    delete validatedData._analysis;

    console.log(`Tailoring successful using ${provider}`);

    res.json({
      success: true,
      data: validatedData,
      analysis,
      suggestedSkills: validatedData.suggestedSkills || [],
      provider,
    });
  } catch (error) {
    console.error('Tailoring error:', error);
    res.status(500).json({
      error: 'Failed to tailor resume',
      details: error.message,
      suggestion: error.message.includes('timed out')
        ? 'The AI service is taking too long. Please try again.'
        : 'Please try again or contact support.',
    });
  }
});

function validateTailoredData(original, tailored) {
  const validated = { ...tailored };

  // Preserve personal info identity fields
  if (original.personalInfo) {
    validated.personalInfo = {
      ...tailored.personalInfo,
      fullName: original.personalInfo.fullName,
      email: original.personalInfo.email,
      phone: original.personalInfo.phone,
      linkedin: original.personalInfo.linkedin,
      github: original.personalInfo.github,
      portfolio: original.personalInfo.portfolio,
      website: original.personalInfo.website,
      location: original.personalInfo.location,
    };
  }

  // Preserve experience identity fields
  if (original.experience && Array.isArray(original.experience)) {
    validated.experience = original.experience.map((origExp, idx) => {
      const tailoredExp = tailored.experience?.[idx] || origExp;
      return {
        ...tailoredExp,
        id: origExp.id,
        company: origExp.company,
        position: origExp.position,
        startDate: origExp.startDate,
        endDate: origExp.endDate,
        current: origExp.current,
        location: origExp.location,
      };
    });
  }

  // Preserve education
  if (original.education && Array.isArray(original.education)) {
    validated.education = original.education.map((origEdu, idx) => {
      const tailoredEdu = tailored.education?.[idx] || origEdu;
      return {
        ...tailoredEdu,
        id: origEdu.id,
        school: origEdu.school,
        degree: origEdu.degree,
        field: origEdu.field,
        startDate: origEdu.startDate,
        endDate: origEdu.endDate,
        location: origEdu.location,
        gpa: origEdu.gpa,
      };
    });
  }

  // Preserve skills
  if (original.skills && Array.isArray(original.skills)) {
    validated.skills = [...original.skills];
  }

  // Preserve other sections
  const arraySections = [
    'languages', 'certifications', 'projects', 'awards', 'achievements',
    'strengths', 'volunteer', 'publications', 'speaking', 'patents',
    'interests', 'references', 'courses'
  ];

  arraySections.forEach(section => {
    if (original[section] && Array.isArray(original[section])) {
      validated[section] = original[section].map((origItem, idx) => {
        const tailoredItem = tailored[section]?.[idx] || origItem;
        return { ...tailoredItem, id: origItem.id };
      });
    }
  });

  // Preserve custom sections
  if (original.customSections && Array.isArray(original.customSections)) {
    validated.customSections = original.customSections.map((origSection, idx) => {
      const tailoredSection = tailored.customSections?.[idx] || origSection;
      return {
        id: origSection.id,
        title: origSection.title,
        items: origSection.items.map((origItem, itemIdx) => {
          const tailoredItem = tailoredSection.items?.[itemIdx] || origItem;
          return { ...tailoredItem, id: origItem.id };
        }),
      };
    });
  }

  validated.version = original.version || '2.0';
  validated.settings = original.settings;

  if (tailored._analysis) {
    validated._analysis = tailored._analysis;
  }

  return validated;
}
