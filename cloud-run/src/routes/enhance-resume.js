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

    // Step 2: Build optimized prompt
    console.log('\n🔧 Step 2: Building optimized prompt...');
    const prompt = buildEnhancementPrompt(resumeData, analysis, userOptions);
    const systemPrompt = buildSystemPrompt();
    const temperature = getEnhancementTemperature();

    console.log(`   Temperature: ${temperature}`);
    console.log(`   Prompt size: ~${Math.round(prompt.length / 4)} tokens`);

    // Step 3: Call AI with optimized settings
    console.log('\n🤖 Step 3: Calling AI for enhancement...');
    const startTime = Date.now();
    const { data: enhancedData, provider } = await callAIWithFallback(prompt, {
      temperature,
      timeout: 60000, // 60 seconds should be enough with optimized prompt
      maxTokens: 8000,
      maxOutputTokens: 8000,
      systemPrompt,
    });
    console.log(`   AI response time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

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
    // Use enhanced fullName (emoji-free) if available, otherwise clean the original
    const cleanName = enhanced.personalInfo?.fullName ||
      original.personalInfo.fullName?.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim() ||
      original.personalInfo.fullName;

    validated.personalInfo = {
      summary: enhanced.personalInfo?.summary || original.personalInfo.summary || '',
      title: enhanced.personalInfo?.title || original.personalInfo.title || '',
      fullName: cleanName,
      email: original.personalInfo.email,
      phone: original.personalInfo.phone,
      location: original.personalInfo.location,
      linkedin: original.personalInfo.linkedin,
      github: original.personalInfo.github,
      portfolio: original.personalInfo.portfolio,
      website: original.personalInfo.website,
      photo: original.personalInfo.photo || '',
      twitter: original.personalInfo.twitter || '',
    };
  }

  // Preserve experience identity fields and enforce 4 bullets
  if (original.experience && Array.isArray(original.experience)) {
    validated.experience = original.experience.map((origExp, idx) => {
      const enhancedExp = enhanced.experience?.[idx] || origExp;
      let bulletPoints = [];

      // Get bullets from enhanced data
      if (enhancedExp.bulletPoints?.length > 0) {
        bulletPoints = enhancedExp.bulletPoints;
      } else if (enhancedExp.highlights?.length > 0) {
        bulletPoints = enhancedExp.highlights;
      } else {
        bulletPoints = origExp.bulletPoints || [];
      }

      // Enforce exactly 4 bullets
      if (bulletPoints.length > 4) {
        // Consolidate: take first 4 (AI should have consolidated, but enforce)
        console.log(`   Warning: ${origExp.company} has ${bulletPoints.length} bullets, truncating to 4`);
        bulletPoints = bulletPoints.slice(0, 4);
      } else if (bulletPoints.length < 4 && bulletPoints.length > 0) {
        console.log(`   Warning: ${origExp.company} has only ${bulletPoints.length} bullets`);
      }

      // Check for short bullets and unchanged bullets
      const origBullets = new Set((origExp.bulletPoints || []).map(b => b?.toLowerCase().trim()));
      bulletPoints.forEach((bullet, i) => {
        const wordCount = bullet?.split(/\s+/).filter(w => w.length > 0).length || 0;
        if (wordCount < 15) {
          console.log(`   Warning: ${origExp.company} bullet ${i + 1} has only ${wordCount} words (should be 15+)`);
        }
        if (origBullets.has(bullet?.toLowerCase().trim())) {
          console.log(`   Warning: ${origExp.company} bullet ${i + 1} was not rewritten (matches original)`);
        }
      });

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
        // Preserve LinkedIn-imported fields
        companyUrl: origExp.companyUrl || '',
        employmentType: origExp.employmentType || '',
        remote: origExp.remote || false,
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
        current: origEdu.current || false,
        location: origEdu.location,
        gpa: origEdu.gpa,
        description: enhancedEdu.description || origEdu.description || '',
        achievements: enhancedEdu.achievements || origEdu.achievements || '',
        activities: enhancedEdu.activities || origEdu.activities || [],
        honors: origEdu.honors || [],
        coursework: origEdu.coursework || [],
      };
    });
  }

  // Handle skills - prefer enhanced if valid, otherwise use deduplicated original
  const originalSkills = (original.skills || []).filter(s => s && s.name);
  const enhancedSkills = (enhanced.skills || []).filter(s => s && s.name);

  if (enhancedSkills.length > 0) {
    // AI returned skills - map with original IDs
    const originalSkillsById = new Map(originalSkills.map(s => [s.name.toLowerCase(), s]));
    validated.skills = enhancedSkills.map(skill => {
      const origSkill = originalSkillsById.get(skill.name.toLowerCase());
      return {
        id: origSkill?.id || skill.id || `skill-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: skill.name,
        category: skill.category || origSkill?.category || 'Technical',
      };
    });
  } else {
    // AI returned empty - use deduplicated original skills
    validated.skills = deduplicateSkillsSimple(originalSkills);
  }

  // Ensure skills is never empty - fallback to original if still empty
  if (!validated.skills || validated.skills.length === 0) {
    validated.skills = originalSkills;
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
        techStack: origProj.techStack || [],
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

/**
 * Simple skill deduplication for fallback
 */
function deduplicateSkillsSimple(skills) {
  const seen = new Map();
  const duplicatePatterns = [
    ['seo', 'search engine optimization', 'search engine optimization (seo)'],
    ['css', 'cascading style sheets', 'cascading style sheets (css)'],
    ['html', 'hypertext markup language', 'html5'],
    ['js', 'javascript'],
    ['c++', 'c/ c++', 'c/c++'],
    ['aws', 'amazon web services', 'amazon web services (aws)'],
    ['redux', 'redux.js'],
    ['react', 'react.js', 'reactjs'],
    ['vue', 'vue.js', 'vuejs'],
    ['angular', 'angularjs'],
    ['web design', 'web designing'],
    ['ux', 'user experience', 'user experience (ux)'],
  ];

  const normalized = new Map();
  duplicatePatterns.forEach(group => {
    const primary = group[0];
    group.forEach(variant => normalized.set(variant.toLowerCase(), primary));
  });

  return skills.filter(skill => {
    if (!skill || !skill.name) return false;
    const nameLower = skill.name.toLowerCase().trim();
    const normalizedName = normalized.get(nameLower) || nameLower;

    if (seen.has(normalizedName)) {
      return false;
    }
    seen.set(normalizedName, true);
    return true;
  });
}
