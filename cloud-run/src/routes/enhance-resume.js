/**
 * AI Resume Enhancement Route
 *
 * Intelligent resume enhancement that:
 * 1. Analyzes the resume to understand its current state
 * 2. Builds a context-aware prompt based on analysis
 * 3. Applies targeted enhancements based on what's actually needed
 */

import { Router } from 'express';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';
import { analyzeResume } from '../utils/resume-analyzer.js';
import { buildEnhancementPrompt, buildSystemPrompt, getEnhancementTemperature } from '../utils/prompt-builder.js';

export const enhanceResumeRouter = Router();

enhanceResumeRouter.post('/', async (req, res) => {
  const keys = getApiKeys();

  if (!keys.geminiKey && !keys.groqKey && !keys.anthropicKey && !keys.openaiKey) {
    return res.status(500).json({
      error: 'AI service not configured. Please set at least one API key.',
    });
  }

  try {
    const { resumeData, options } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    // User customization options
    const userOptions = {
      targetRole: options?.targetRole || null,
      additionalContext: options?.additionalContext || null,
      focusAreas: options?.focusAreas || [],
    };

    const userName = resumeData.personalInfo?.fullName || 'Unknown';
    console.log(`\n${'='.repeat(60)}`);
    console.log(`ENHANCING RESUME FOR: ${userName}`);
    console.log(`${'='.repeat(60)}`);

    if (userOptions.targetRole) {
      console.log(`   User specified target role: ${userOptions.targetRole}`);
    }
    if (userOptions.additionalContext) {
      console.log(`   User provided additional context`);
    }
    if (userOptions.focusAreas.length > 0) {
      console.log(`   Focus areas: ${userOptions.focusAreas.join(', ')}`);
    }

    // Step 1: Analyze the resume to understand its current state
    console.log('\n📊 Step 1: Analyzing resume...');
    const analysis = analyzeResume(resumeData);

    console.log(`   Detected Role: ${userOptions.targetRole || analysis.detectedRole}`);
    console.log(`   Career Level: ${analysis.careerLevel} (~${analysis.yearsOfExperience} years)`);
    console.log(`   Scores: Completeness ${analysis.completenessScore}% | Metrics ${analysis.metricsScore}% | ATS ${analysis.atsScore}%`);

    if (analysis.enhancementPriorities.length > 0) {
      console.log(`   Enhancement Priorities:`);
      analysis.enhancementPriorities.slice(0, 3).forEach((p, i) => {
        console.log(`      ${i + 1}. [${p.priority.toUpperCase()}] ${p.message}`);
      });
    }

    // Step 2: Build intelligent, context-aware prompt with user options
    console.log('\n🔧 Step 2: Building context-aware prompt...');
    const prompt = buildEnhancementPrompt(resumeData, analysis, userOptions);
    const systemPrompt = buildSystemPrompt(analysis);
    const temperature = getEnhancementTemperature(analysis);

    console.log(`   Temperature: ${temperature} (${analysis.completenessScore < 50 ? 'higher for sparse resume' : 'standard'})`);

    // Step 3: Call AI with the intelligent prompt
    console.log('\n🤖 Step 3: Calling AI for enhancement...');
    const { data: enhancedData, provider } = await callAIWithFallback(prompt, {
      temperature,
      timeout: 90000,
      systemPrompt,
    });

    // Step 4: Validate and merge the enhanced data
    console.log(`\n✅ Step 4: Validating enhanced data (provider: ${provider})...`);
    const validatedData = validateEnhancedData(resumeData, enhancedData);

    console.log(`\n🎉 Enhancement complete for ${userName}!`);
    console.log(`${'='.repeat(60)}\n`);

    res.json({
      success: true,
      data: validatedData,
      enhancements: validatedData._enhancements || {},
      suggestedSkills: validatedData.suggestedSkills || [],
      provider,
      analysis: {
        detectedRole: analysis.detectedRole,
        careerLevel: analysis.careerLevel,
        completenessScore: analysis.completenessScore,
        metricsScore: analysis.metricsScore,
        atsScore: analysis.atsScore,
        prioritiesAddressed: analysis.enhancementPriorities.length,
      },
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
