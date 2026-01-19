/**
 * Resume Tailoring Route
 *
 * Takes existing resume and job description, optimizes the resume
 * to better match the job requirements.
 */

import { Router } from 'express';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';

export const tailorResumeRouter = Router();

/**
 * RESUME OPTIMIZATION PROMPT
 *
 * This prompt is designed to transform a resume to perfectly match a target job.
 * It focuses on three key areas:
 * 1. Professional Summary - Rewritten to mirror job requirements
 * 2. Experience Bullet Points - Reframed to highlight relevant achievements
 * 3. Skills - Augmented with missing but relevant skills from the JD
 */
const JOB_TAILOR_PROMPT = `You are an expert resume writer, ATS optimization specialist, and career coach with 15+ years of experience helping candidates land their dream jobs.

Your task: Transform this resume to perfectly match the target job description while maintaining authenticity.

## CRITICAL RULES (MUST FOLLOW):

### 1. PRESERVE UNCHANGED (Never modify):
- Full name, email, phone, LinkedIn, GitHub, portfolio URLs
- Company names, job titles, employment dates, locations
- Education institution names, degrees, graduation dates
- All IDs in the data structure

### 2. PROFESSIONAL SUMMARY (MUST REWRITE):
- Analyze the job description for: required years of experience, key responsibilities, must-have skills, and industry keywords
- Rewrite the summary to directly address these requirements
- Lead with the most relevant experience/skills for THIS specific role
- Include 2-3 key technical skills or tools mentioned in the JD
- Keep it concise (3-4 sentences, ~50-75 words)
- Use action-oriented, confident language
- Example transformation:
  * Before: "Software developer with experience in various technologies"
  * After: "Senior Full-Stack Developer with 5+ years building scalable React and Node.js applications. Proven track record of leading cross-functional teams and delivering high-impact features that increased user engagement by 40%. Expertise in AWS cloud architecture, CI/CD pipelines, and agile methodologies."

### 3. EXPERIENCE BULLET POINTS (MUST REFRAME):
- Each experience entry has a "bulletPoints" array - update these bullets
- Analyze each responsibility/achievement and reframe to emphasize JD-relevant skills
- Use the CAR format: Challenge → Action → Result
- Start each bullet with a strong action verb (Led, Developed, Implemented, Optimized, etc.)
- Quantify achievements where possible using ONLY numbers from the original resume
- Mirror language and keywords from the job description naturally
- Prioritize bullets that demonstrate skills mentioned in the JD
- Each bullet should be unique - no repeated themes across experiences
- Keep 3-5 bullets per experience, focusing on the most impactful

### 4. SKILLS SECTION (MUST AUGMENT):
- Keep ALL existing skills from the original resume
- Analyze the job description for required/preferred skills
- Add NEW skills that:
  * Are mentioned in the JD but missing from the resume
  * Are closely related to the candidate's existing skills
  * Would realistically be possessed by someone with this background
- For suggestedSkills array: include skills the candidate might want to add
- Categorize skills appropriately (Technical, Soft Skills, Tools, Languages, etc.)

### 5. KEYWORD INTEGRATION:
- Identify key terms, technologies, and phrases from the job description
- Naturally integrate these throughout the resume
- DO NOT stuff keywords - they must flow naturally in context
- Focus on: technical skills, tools, methodologies, certifications mentioned in JD

## OUTPUT FORMAT (JSON ONLY):
Return the complete resume JSON with these additions:
- "_analysis" object containing:
  - "matchScore": 0-100 (how well the resume now matches the JD)
  - "keywordsFound": [list of JD keywords already present in original]
  - "keywordsMissing": [list of important JD keywords still missing]
  - "keywordsAdded": [list of keywords newly integrated]
  - "summaryEnhanced": true/false
  - "experienceEnhanced": true/false
  - "roleAlignment": "brief explanation of how resume now aligns with role"

- "suggestedSkills" array containing skills to consider adding:
  [{
    "id": "unique-id",
    "name": "Skill Name",
    "category": "Technical/Tools/Soft Skills",
    "reason": "Why this skill would help (mentioned in JD, related to existing skills, etc.)"
  }]

## QUALITY CHECKLIST:
Before responding, verify:
✓ Summary directly addresses job requirements
✓ Bullet points use action verbs and show impact
✓ Keywords integrated naturally (not stuffed)
✓ No fabricated metrics or experiences
✓ Skills section includes relevant additions
✓ All personal/company info preserved exactly

Return ONLY valid JSON. No markdown, no explanations outside the JSON.
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

  // Skills: Keep original skills AND add new skills from AI
  // The AI is allowed to add new relevant skills based on the job description
  if (tailored.skills && Array.isArray(tailored.skills)) {
    const originalSkillIds = new Set((original.skills || []).map(s => s.id));
    const originalSkillNames = new Set((original.skills || []).map(s => s.name?.toLowerCase()));

    // Start with original skills (preserve them exactly)
    const mergedSkills = [...(original.skills || [])];

    // Add new skills from AI that don't already exist
    tailored.skills.forEach(skill => {
      const isDuplicate = originalSkillIds.has(skill.id) ||
                          originalSkillNames.has(skill.name?.toLowerCase());
      if (!isDuplicate && skill.name) {
        mergedSkills.push({
          id: skill.id || `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: skill.name,
          category: skill.category || 'Technical',
          level: skill.level,
        });
      }
    });

    validated.skills = mergedSkills;
  } else if (original.skills && Array.isArray(original.skills)) {
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
