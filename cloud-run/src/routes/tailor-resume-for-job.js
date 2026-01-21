/**
 * Resume Tailoring Route
 *
 * Takes existing resume and job description, optimizes the resume
 * to better match the job requirements.
 *
 * SIMPLIFIED VERSION: Relies on AI's inherent knowledge while providing
 * essential rules and job-specific context.
 */

import { Router } from 'express';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';

export const tailorResumeRouter = Router();

/**
 * Build the tailoring prompt
 */
function buildTailoringPrompt(resumeData, jobDescription, jobTitle, companyName) {
  // Extract key metrics from original summary to preserve
  const originalMetrics = extractMetricsFromText(resumeData.personalInfo?.summary || '');

  return `# Resume Tailoring Task

You are tailoring a resume to match this specific job.

## Job Details
${jobTitle ? `**Position:** ${jobTitle}` : ''}
${companyName ? `**Company:** ${companyName}` : ''}

## Job Description
${jobDescription}

## Core Rules (MUST FOLLOW)

1. **NEVER fabricate** - Don't invent metrics, percentages, or achievements
2. **Mirror the JD language** - Use keywords and phrases from the job description naturally
3. **Preserve ALL original metrics** - Keep exact numbers from the original resume
4. **Rewrite the summary** - Make it directly address this specific job's requirements
5. **Enhance bullet points** - Reframe existing experience to highlight JD-relevant skills
6. **Keep it authentic** - Only use skills/experience the candidate actually has

${originalMetrics.length > 0 ? `## ⚠️ PRESERVE THESE METRICS FROM ORIGINAL:
${originalMetrics.map(m => `- "${m}"`).join('\n')}
` : ''}

## What to Change
- **Summary**: Rewrite to directly address job requirements (lead with most relevant experience)
- **Bullet points**: Use "bulletPoints" array. Reframe using JD keywords naturally
- **Skills**: Keep all original, suggest additions that match JD and candidate's background

## What NOT to Change
- Names, emails, phones, addresses, URLs
- Company names, job titles, employment dates
- Education details

## Output Format

Return valid JSON with this structure:
\`\`\`json
{
  "personalInfo": { /* with enhanced summary and optionally improved title */ },
  "experience": [ /* with enhanced bulletPoints arrays */ ],
  "education": [ /* preserved */ ],
  "skills": [ /* original + new relevant skills */ ],
  ...other sections,
  "_analysis": {
    "matchScore": 0-100,
    "keywordsFound": ["skills already in resume"],
    "keywordsMissing": ["important JD skills still missing"],
    "keywordsAdded": ["keywords newly integrated"],
    "summaryEnhanced": true,
    "experienceEnhanced": true,
    "roleAlignment": "brief explanation of alignment"
  },
  "suggestedSkills": [
    { "id": "suggested-1", "name": "Skill", "category": "Technical", "reason": "Mentioned in JD" }
  ]
}
\`\`\`

## Resume Data

\`\`\`json
${JSON.stringify(cleanResumeData(resumeData), null, 2)}
\`\`\``;
}

/**
 * Extract metrics from text for preservation
 */
function extractMetricsFromText(text) {
  if (!text) return [];

  const metrics = [];
  const patterns = [
    /\d+\+?\s*years?/gi,
    /\d+K\+?\s*\w*/gi,
    /\d+M\+?\s*\w*/gi,
    /\$[\d,]+[KMB]?\+?/gi,
    /\d+\+\s*\w+/gi,
    /\d+%/gi,
  ];

  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches) metrics.push(...matches);
  }

  return [...new Set(metrics)];
}

/**
 * Clean resume data before including in prompt
 */
function cleanResumeData(resumeData) {
  const cleanData = { ...resumeData };
  delete cleanData._parsedSections;
  delete cleanData._enhancements;
  delete cleanData._analysis;
  delete cleanData.suggestedSkills;
  return cleanData;
}

/**
 * Calculate match score based on keyword analysis
 */
function calculateMatchScore(original, tailored, analysis) {
  // If AI provided a score, use it as base
  let score = analysis?.matchScore || 70;

  // Adjust based on keywords added
  const keywordsAdded = analysis?.keywordsAdded?.length || 0;
  const keywordsMissing = analysis?.keywordsMissing?.length || 0;

  // Bonus for keywords added, penalty for still missing
  score = Math.min(100, score + (keywordsAdded * 2));
  score = Math.max(50, score - (keywordsMissing * 1));

  // Check if summary was enhanced
  if (tailored.personalInfo?.summary !== original.personalInfo?.summary) {
    score = Math.min(100, score + 5);
  }

  return Math.round(score);
}

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

    const userName = resumeData.personalInfo?.fullName || 'Unknown';
    console.log(`\n${'='.repeat(60)}`);
    console.log(`TAILORING RESUME FOR: ${userName}`);
    console.log(`Job: ${jobTitle || 'Not specified'} at ${companyName || 'Not specified'}`);
    console.log(`${'='.repeat(60)}`);

    // Build the prompt
    const prompt = buildTailoringPrompt(resumeData, jobDescription, jobTitle, companyName);

    // Call AI
    const { data: tailoredData, provider } = await callAIWithFallback(prompt, {
      temperature: 0.3, // Lower temperature for more consistent output
      timeout: 90000,
      systemPrompt: 'You are an expert resume writer and ATS optimization specialist. Return ONLY valid JSON.',
    });

    // Validate and merge
    const validatedData = validateTailoredData(resumeData, tailoredData);

    // Calculate final match score
    const analysis = validatedData._analysis || {
      matchScore: 70,
      keywordsFound: [],
      keywordsMissing: [],
      keywordsAdded: [],
      summaryEnhanced: true,
      experienceEnhanced: true,
    };

    analysis.matchScore = calculateMatchScore(resumeData, validatedData, analysis);

    delete validatedData._analysis;

    console.log(`\n✅ Tailoring complete (provider: ${provider})`);
    console.log(`   Match Score: ${analysis.matchScore}%`);
    console.log(`   Keywords Added: ${analysis.keywordsAdded?.length || 0}`);
    console.log(`${'='.repeat(60)}\n`);

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

      // Handle both bulletPoints and highlights
      let bulletPoints = origExp.bulletPoints || [];
      if (tailoredExp.bulletPoints?.length > 0) {
        bulletPoints = tailoredExp.bulletPoints;
      } else if (tailoredExp.highlights?.length > 0) {
        bulletPoints = tailoredExp.highlights;
      }

      return {
        id: origExp.id,
        company: origExp.company,
        position: origExp.position,
        startDate: origExp.startDate,
        endDate: origExp.endDate,
        current: origExp.current,
        location: origExp.location,
        description: tailoredExp.description || origExp.description || '',
        bulletPoints,
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

  // Preserve projects
  if (original.projects && Array.isArray(original.projects)) {
    validated.projects = original.projects.map((origProj, idx) => {
      const tailoredProj = tailored.projects?.[idx] || origProj;
      return {
        id: origProj.id,
        name: origProj.name,
        url: origProj.url,
        startDate: origProj.startDate,
        endDate: origProj.endDate,
        technologies: tailoredProj.technologies || origProj.technologies || [],
        description: tailoredProj.description || origProj.description || '',
        highlights: tailoredProj.highlights || origProj.highlights || [],
      };
    });
  }

  // Preserve other sections
  const arraySections = [
    'languages', 'certifications', 'awards', 'achievements',
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
