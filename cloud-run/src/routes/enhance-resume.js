/**
 * AI Resume Enhancement Route
 *
 * Takes existing resume data and enhances it to be more ATS-friendly,
 * impactful, and professional.
 */

import { Router } from 'express';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';

export const enhanceResumeRouter = Router();

const ENHANCEMENT_PROMPT = `Rewrite this resume professionally. Return JSON only.

PRESERVE: names, emails, phones, companies, titles, dates, schools, degrees, skill names, IDs
REWRITE: summary, descriptions, ALL bulletPoints (use action verbs: Led, Architected, Optimized, Delivered)

Add ATS keywords naturally. Use "bulletPoints" array (not "highlights"). Suggest 3-5 relevant skills in "suggestedSkills" array.

Seed: {{ENHANCEMENT_SEED}}

RESUME:
`;

function generateEnhancementSeed() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

enhanceResumeRouter.post('/', async (req, res) => {
  const keys = getApiKeys();

  if (!keys.geminiKey && !keys.groqKey && !keys.anthropicKey && !keys.openaiKey) {
    return res.status(500).json({
      error: 'AI service not configured. Please set at least one API key.',
    });
  }

  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    // Clean data before sending to AI
    const cleanData = { ...resumeData };
    delete cleanData._parsedSections;
    delete cleanData._enhancements;
    delete cleanData.suggestedSkills;

    const resumeJson = JSON.stringify(cleanData, null, 2);
    const prompt = ENHANCEMENT_PROMPT.replace('{{ENHANCEMENT_SEED}}', generateEnhancementSeed()) + resumeJson;

    console.log(`Enhancing resume for: ${cleanData.personalInfo?.fullName || 'Unknown'}`);

    const { data: enhancedData, provider } = await callAIWithFallback(prompt, {
      temperature: 0.6,
      timeout: 90000, // 90 seconds - plenty of headroom on Cloud Run
      systemPrompt: 'You are an expert resume writer. Use bulletPoints (not highlights) for experience items.',
    });

    const validatedData = validateEnhancedData(resumeData, enhancedData);

    console.log(`Enhancement successful using ${provider}`);

    res.json({
      success: true,
      data: validatedData,
      enhancements: validatedData._enhancements || {},
      suggestedSkills: validatedData.suggestedSkills || [],
      provider,
    });
  } catch (error) {
    console.error('Enhancement error:', error);
    res.status(500).json({
      error: 'Failed to enhance resume',
      details: error.message,
    });
  }
});

function validateEnhancedData(original, enhanced) {
  const validated = { ...enhanced };

  // Preserve personal info identity fields
  if (original.personalInfo) {
    validated.personalInfo = {
      summary: enhanced.personalInfo?.summary || original.personalInfo.summary || '',
      title: enhanced.personalInfo?.title || original.personalInfo.title || '',
      fullName: original.personalInfo.fullName,
      email: original.personalInfo.email,
      phone: original.personalInfo.phone,
      location: original.personalInfo.location,
      linkedin: original.personalInfo.linkedin,
      github: original.personalInfo.github,
      portfolio: original.personalInfo.portfolio,
      website: original.personalInfo.website,
    };
  }

  // Preserve experience identity fields
  if (original.experience && Array.isArray(original.experience)) {
    validated.experience = original.experience.map((origExp, idx) => {
      const enhancedExp = enhanced.experience?.[idx] || origExp;
      let bulletPoints = origExp.bulletPoints || [];

      if (enhancedExp.bulletPoints?.length > 0) {
        bulletPoints = enhancedExp.bulletPoints;
      } else if (enhancedExp.highlights?.length > 0) {
        bulletPoints = enhancedExp.highlights;
      }

      return {
        id: origExp.id,
        company: origExp.company,
        position: origExp.position,
        startDate: origExp.startDate,
        endDate: origExp.endDate,
        current: origExp.current,
        location: origExp.location,
        description: enhancedExp.description || origExp.description || '',
        bulletPoints,
      };
    });
  }

  // Preserve education identity fields
  if (original.education && Array.isArray(original.education)) {
    validated.education = original.education.map((origEdu, idx) => {
      const enhancedEdu = enhanced.education?.[idx] || origEdu;
      return {
        id: origEdu.id,
        school: origEdu.school,
        degree: origEdu.degree,
        field: origEdu.field,
        startDate: origEdu.startDate,
        endDate: origEdu.endDate,
        location: origEdu.location,
        gpa: origEdu.gpa,
        description: enhancedEdu.description || origEdu.description || '',
        achievements: enhancedEdu.achievements || origEdu.achievements || '',
        activities: enhancedEdu.activities || origEdu.activities || '',
      };
    });
  }

  // Preserve skills
  if (original.skills && Array.isArray(original.skills)) {
    const originalSkillNames = new Set(original.skills.map(s => s.name.toLowerCase()));
    const enhancedSkills = enhanced.skills || [];

    validated.skills = [...original.skills];
    enhancedSkills.forEach(skill => {
      if (!originalSkillNames.has(skill.name.toLowerCase())) {
        validated.skills.push(skill);
      }
    });
  }

  // Preserve projects
  if (original.projects && Array.isArray(original.projects)) {
    validated.projects = original.projects.map((origProj, idx) => {
      const enhancedProj = enhanced.projects?.[idx] || origProj;
      return {
        id: origProj.id,
        name: origProj.name,
        url: origProj.url,
        startDate: origProj.startDate,
        endDate: origProj.endDate,
        technologies: enhancedProj.technologies || origProj.technologies || [],
        description: enhancedProj.description || origProj.description || '',
        highlights: enhancedProj.highlights || origProj.highlights || [],
      };
    });
  }

  // Preserve other sections
  const arraySections = [
    'languages', 'certifications', 'awards', 'achievements', 'strengths',
    'volunteer', 'publications', 'speaking', 'patents', 'interests',
    'references', 'courses'
  ];

  arraySections.forEach(section => {
    if (original[section] && Array.isArray(original[section])) {
      validated[section] = original[section].map((origItem, idx) => {
        const enhancedItem = enhanced[section]?.[idx] || origItem;
        return { ...enhancedItem, id: origItem.id };
      });
    }
  });

  // Preserve custom sections
  if (original.customSections && Array.isArray(original.customSections)) {
    validated.customSections = original.customSections.map((origSection, idx) => {
      const enhancedSection = enhanced.customSections?.[idx] || origSection;
      return {
        id: origSection.id,
        title: origSection.title,
        items: origSection.items.map((origItem, itemIdx) => {
          const enhancedItem = enhancedSection.items?.[itemIdx] || origItem;
          return { ...enhancedItem, id: origItem.id };
        }),
      };
    });
  }

  validated.version = original.version || '2.0';
  validated.settings = original.settings;

  return validated;
}
