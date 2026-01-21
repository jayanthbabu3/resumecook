/**
 * Resume Analyzer
 *
 * Analyzes resume data to understand its current state before enhancement.
 * This enables intelligent, context-aware enhancements instead of generic rewrites.
 */

/**
 * Common action verbs that indicate strong bullet points
 */
const STRONG_ACTION_VERBS = [
  'led', 'architected', 'designed', 'built', 'developed', 'implemented',
  'optimized', 'reduced', 'increased', 'improved', 'launched', 'delivered',
  'managed', 'scaled', 'automated', 'created', 'established', 'drove',
  'spearheaded', 'orchestrated', 'transformed', 'streamlined', 'pioneered'
];

/**
 * Weak verbs that should be replaced
 */
const WEAK_VERBS = [
  'worked on', 'helped with', 'assisted', 'was responsible for',
  'participated in', 'involved in', 'handled', 'did', 'made'
];

/**
 * Analyze a resume and return insights about its current state
 */
export function analyzeResume(resumeData) {
  const analysis = {
    // Overall scores (0-100)
    completenessScore: 0,
    metricsScore: 0,
    actionVerbScore: 0,
    atsScore: 0,

    // Detected context
    detectedRole: null,
    detectedIndustry: null,
    careerLevel: 'mid', // entry, mid, senior, executive
    yearsOfExperience: 0,

    // Specific issues found
    issues: [],

    // What needs enhancement
    enhancementPriorities: [],

    // Section-level analysis
    sections: {
      summary: { exists: false, quality: 'missing', issues: [] },
      experience: { exists: false, count: 0, bulletsWithMetrics: 0, totalBullets: 0, weakVerbs: [] },
      education: { exists: false, count: 0 },
      skills: { exists: false, count: 0 },
      projects: { exists: false, count: 0 }
    }
  };

  // Analyze Personal Info & Summary
  analyzeSummary(resumeData, analysis);

  // Analyze Experience
  analyzeExperience(resumeData, analysis);

  // Analyze Education
  analyzeEducation(resumeData, analysis);

  // Analyze Skills
  analyzeSkills(resumeData, analysis);

  // Analyze Projects
  analyzeProjects(resumeData, analysis);

  // Detect role and industry
  detectRoleAndIndustry(resumeData, analysis);

  // Calculate career level
  calculateCareerLevel(resumeData, analysis);

  // Calculate overall scores
  calculateScores(analysis);

  // Determine enhancement priorities
  determineEnhancementPriorities(analysis);

  return analysis;
}

/**
 * Analyze summary section
 */
function analyzeSummary(resumeData, analysis) {
  const summary = resumeData.personalInfo?.summary;
  const section = analysis.sections.summary;

  if (!summary || summary.trim().length === 0) {
    section.exists = false;
    section.quality = 'missing';
    section.issues.push('No summary provided');
    analysis.issues.push({ type: 'missing', section: 'summary', severity: 'high', message: 'Resume lacks a professional summary' });
    return;
  }

  section.exists = true;
  const wordCount = summary.split(/\s+/).length;

  if (wordCount < 20) {
    section.quality = 'too_short';
    section.issues.push('Summary is too brief');
    analysis.issues.push({ type: 'quality', section: 'summary', severity: 'medium', message: 'Summary is too short (less than 20 words)' });
  } else if (wordCount > 100) {
    section.quality = 'too_long';
    section.issues.push('Summary is too lengthy');
    analysis.issues.push({ type: 'quality', section: 'summary', severity: 'low', message: 'Summary is too long (over 100 words)' });
  } else {
    section.quality = 'good_length';
  }

  // Check for generic phrases
  const genericPhrases = ['hard worker', 'team player', 'detail-oriented', 'results-driven', 'passionate'];
  const hasGenericPhrases = genericPhrases.some(phrase => summary.toLowerCase().includes(phrase));
  if (hasGenericPhrases) {
    section.issues.push('Contains generic buzzwords');
    analysis.issues.push({ type: 'quality', section: 'summary', severity: 'medium', message: 'Summary contains generic buzzwords that could be more specific' });
  }

  // Check for metrics in summary
  const hasMetrics = /\d+[%+]?|\$[\d,]+|[\d,]+ ?(users|customers|revenue|sales)/i.test(summary);
  if (!hasMetrics) {
    section.issues.push('No quantifiable achievements');
  }
}

/**
 * Analyze experience section
 */
function analyzeExperience(resumeData, analysis) {
  const experiences = resumeData.experience || [];
  const section = analysis.sections.experience;

  section.exists = experiences.length > 0;
  section.count = experiences.length;

  if (!section.exists) {
    analysis.issues.push({ type: 'missing', section: 'experience', severity: 'high', message: 'No work experience listed' });
    return;
  }

  let totalBullets = 0;
  let bulletsWithMetrics = 0;
  let bulletsWithWeakVerbs = [];

  experiences.forEach((exp, expIndex) => {
    const bullets = exp.bulletPoints || [];

    // Check if experience has enough bullets
    if (bullets.length === 0) {
      analysis.issues.push({
        type: 'sparse',
        section: 'experience',
        severity: 'high',
        message: `${exp.position} at ${exp.company} has no bullet points`,
        index: expIndex
      });
    } else if (bullets.length < 3) {
      analysis.issues.push({
        type: 'sparse',
        section: 'experience',
        severity: 'medium',
        message: `${exp.position} at ${exp.company} has only ${bullets.length} bullet point(s)`,
        index: expIndex
      });
    }

    bullets.forEach((bullet, bulletIndex) => {
      totalBullets++;

      // Check for metrics
      if (/\d+[%+]?|\$[\d,]+|[\d,]+ ?(users|customers|projects|team|members|clients)/i.test(bullet)) {
        bulletsWithMetrics++;
      }

      // Check for weak verbs
      const bulletLower = bullet.toLowerCase();
      const hasWeakVerb = WEAK_VERBS.some(verb => bulletLower.startsWith(verb) || bulletLower.includes(` ${verb} `));
      if (hasWeakVerb) {
        bulletsWithWeakVerbs.push({ expIndex, bulletIndex, text: bullet.substring(0, 50) });
      }

      // Check for bullets that are too short
      if (bullet.split(/\s+/).length < 8) {
        analysis.issues.push({
          type: 'quality',
          section: 'experience',
          severity: 'low',
          message: `Bullet point is too brief: "${bullet.substring(0, 40)}..."`,
          expIndex,
          bulletIndex
        });
      }
    });

    // Check for missing description
    if (!exp.description && bullets.length === 0) {
      analysis.issues.push({
        type: 'missing',
        section: 'experience',
        severity: 'medium',
        message: `${exp.position} at ${exp.company} lacks both description and bullet points`,
        index: expIndex
      });
    }
  });

  section.totalBullets = totalBullets;
  section.bulletsWithMetrics = bulletsWithMetrics;
  section.weakVerbs = bulletsWithWeakVerbs;

  // Add issues for metrics
  if (totalBullets > 0) {
    const metricsPercentage = (bulletsWithMetrics / totalBullets) * 100;
    if (metricsPercentage < 30) {
      analysis.issues.push({
        type: 'quality',
        section: 'experience',
        severity: 'high',
        message: `Only ${Math.round(metricsPercentage)}% of bullet points contain metrics or numbers`
      });
    }
  }

  // Add issues for weak verbs
  if (bulletsWithWeakVerbs.length > 0) {
    analysis.issues.push({
      type: 'quality',
      section: 'experience',
      severity: 'medium',
      message: `${bulletsWithWeakVerbs.length} bullet point(s) use weak action verbs`
    });
  }
}

/**
 * Analyze education section
 */
function analyzeEducation(resumeData, analysis) {
  const education = resumeData.education || [];
  const section = analysis.sections.education;

  section.exists = education.length > 0;
  section.count = education.length;

  if (!section.exists) {
    analysis.issues.push({ type: 'missing', section: 'education', severity: 'medium', message: 'No education listed' });
  }
}

/**
 * Analyze skills section
 */
function analyzeSkills(resumeData, analysis) {
  const skills = resumeData.skills || [];
  const section = analysis.sections.skills;

  section.exists = skills.length > 0;
  section.count = skills.length;

  if (!section.exists) {
    analysis.issues.push({ type: 'missing', section: 'skills', severity: 'medium', message: 'No skills listed' });
  } else if (skills.length < 5) {
    analysis.issues.push({ type: 'sparse', section: 'skills', severity: 'low', message: 'Only a few skills listed' });
  }
}

/**
 * Analyze projects section
 */
function analyzeProjects(resumeData, analysis) {
  const projects = resumeData.projects || [];
  const section = analysis.sections.projects;

  section.exists = projects.length > 0;
  section.count = projects.length;

  projects.forEach((project, index) => {
    if (!project.description && (!project.highlights || project.highlights.length === 0)) {
      analysis.issues.push({
        type: 'sparse',
        section: 'projects',
        severity: 'medium',
        message: `Project "${project.name}" lacks description`,
        index
      });
    }
  });
}

/**
 * Detect role and industry from resume content
 */
function detectRoleAndIndustry(resumeData, analysis) {
  // Try to detect from current/most recent title AND positions
  const title = resumeData.personalInfo?.title || '';
  const recentPosition = resumeData.experience?.[0]?.position || '';
  const allPositions = resumeData.experience?.map(e => e.position).join(' ') || '';

  // Combine all role-related text for matching
  const roleText = `${title} ${recentPosition} ${allPositions}`.toLowerCase();

  // Role detection patterns - ORDER MATTERS! More specific patterns first
  const rolePatterns = [
    // Developer Relations / Advocacy (must come BEFORE generic "developer")
    { pattern: /developer advocate|devrel|developer relations|developer evangelist|technical evangelist|community manager|developer experience/i, role: 'Developer Advocate', industry: 'Technology' },
    { pattern: /technical writer|documentation|docs engineer/i, role: 'Technical Writer', industry: 'Technology' },
    { pattern: /content creator|youtuber|influencer|creator/i, role: 'Content Creator', industry: 'Media' },

    // Specific engineering roles (before generic)
    // Mobile must come before frontend because someone might have both "mobile" and "frontend" in their history
    { pattern: /mobile.*(engineer|developer)|ios developer|android developer|react native|flutter developer/i, role: 'Mobile Developer', industry: 'Technology' },
    { pattern: /frontend|front-end|ui engineer|ui developer/i, role: 'Frontend Developer', industry: 'Technology' },
    { pattern: /backend|back-end|server engineer|api engineer/i, role: 'Backend Developer', industry: 'Technology' },
    { pattern: /full.?stack/i, role: 'Full Stack Developer', industry: 'Technology' },
    { pattern: /devops|sre|site reliability|platform engineer|infrastructure/i, role: 'DevOps Engineer', industry: 'Technology' },
    { pattern: /data scientist|machine learning|ml engineer|ai engineer|deep learning/i, role: 'Data Scientist', industry: 'Technology' },
    { pattern: /data analyst|business analyst|bi analyst|analytics/i, role: 'Data Analyst', industry: 'Technology' },
    { pattern: /data engineer|etl|data pipeline/i, role: 'Data Engineer', industry: 'Technology' },
    { pattern: /security engineer|cybersecurity|infosec/i, role: 'Security Engineer', industry: 'Technology' },
    { pattern: /qa|quality assurance|test engineer|sdet/i, role: 'QA Engineer', industry: 'Technology' },

    // Generic software roles (after specific ones)
    { pattern: /software engineer|software developer|programmer|sde|swe/i, role: 'Software Engineer', industry: 'Technology' },
    { pattern: /web developer/i, role: 'Web Developer', industry: 'Technology' },

    // Product & Design
    { pattern: /product manager|product owner/i, role: 'Product Manager', industry: 'Technology' },
    { pattern: /project manager|program manager|scrum master/i, role: 'Project Manager', industry: 'General' },
    { pattern: /ux designer|ui designer|product designer|interaction designer/i, role: 'Designer', industry: 'Design' },
    { pattern: /graphic designer|visual designer/i, role: 'Graphic Designer', industry: 'Design' },

    // Business roles
    { pattern: /marketing|growth|seo specialist|content marketing/i, role: 'Marketing', industry: 'Marketing' },
    { pattern: /sales|account executive|business development|bdm/i, role: 'Sales', industry: 'Sales' },
    { pattern: /hr|human resources|recruiter|talent acquisition/i, role: 'Human Resources', industry: 'HR' },
    { pattern: /finance|accountant|cpa|financial analyst/i, role: 'Finance', industry: 'Finance' },
    { pattern: /consultant|advisory/i, role: 'Consultant', industry: 'Consulting' },

    // Leadership (last as fallback for generic titles)
    { pattern: /cto|ceo|coo|vp of|head of|director of|chief/i, role: 'Executive', industry: 'General' },
    { pattern: /manager|lead|supervisor/i, role: 'Manager', industry: 'General' },
  ];

  for (const { pattern, role, industry } of rolePatterns) {
    if (pattern.test(roleText)) {
      analysis.detectedRole = role;
      analysis.detectedIndustry = industry;
      break;
    }
  }

  // If no match from title, try to detect from skills
  if (!analysis.detectedRole && resumeData.skills?.length > 0) {
    const skillNames = resumeData.skills.map(s => s.name.toLowerCase()).join(' ');

    if (/developer advocacy|devrel|community/i.test(skillNames)) {
      analysis.detectedRole = 'Developer Advocate';
      analysis.detectedIndustry = 'Technology';
    } else if (/react|vue|angular|javascript|typescript|css|html/i.test(skillNames)) {
      analysis.detectedRole = 'Frontend Developer';
      analysis.detectedIndustry = 'Technology';
    } else if (/node|python|java|golang|ruby|php|sql|database/i.test(skillNames)) {
      analysis.detectedRole = 'Backend Developer';
      analysis.detectedIndustry = 'Technology';
    } else if (/aws|azure|gcp|kubernetes|docker|terraform/i.test(skillNames)) {
      analysis.detectedRole = 'DevOps Engineer';
      analysis.detectedIndustry = 'Technology';
    }
  }

  // Default
  if (!analysis.detectedRole) {
    analysis.detectedRole = 'Professional';
    analysis.detectedIndustry = 'General';
  }
}

/**
 * Calculate career level based on experience
 */
function calculateCareerLevel(resumeData, analysis) {
  const experiences = resumeData.experience || [];

  if (experiences.length === 0) {
    analysis.careerLevel = 'entry';
    analysis.yearsOfExperience = 0;
    return;
  }

  // First, check if years of experience is mentioned in the summary
  // This takes priority because the user knows their experience best
  const summary = resumeData.personalInfo?.summary || '';
  const yearsFromSummary = extractYearsFromSummary(summary);

  let years;

  if (yearsFromSummary !== null) {
    // Trust what the user wrote in their summary
    years = yearsFromSummary;
  } else {
    // Calculate from earliest start to latest end (not summing overlapping jobs)
    const now = new Date();
    let earliestStart = null;
    let latestEnd = null;

    experiences.forEach(exp => {
      const startDate = parseDate(exp.startDate);
      const endDate = exp.current ? now : parseDate(exp.endDate);

      if (startDate && (!earliestStart || startDate < earliestStart)) {
        earliestStart = startDate;
      }
      if (endDate && (!latestEnd || endDate > latestEnd)) {
        latestEnd = endDate;
      }
    });

    if (earliestStart && latestEnd) {
      const months = (latestEnd.getFullYear() - earliestStart.getFullYear()) * 12 +
                     (latestEnd.getMonth() - earliestStart.getMonth());
      years = Math.round(months / 12);
    } else {
      years = 0;
    }
  }

  analysis.yearsOfExperience = years;

  // Check for senior titles
  const hasSeniorTitle = experiences.some(exp =>
    /senior|lead|principal|staff|architect|manager|director|head|vp|chief/i.test(exp.position)
  );

  if (years >= 10 || /director|vp|chief|head of/i.test(experiences[0]?.position)) {
    analysis.careerLevel = 'executive';
  } else if (years >= 6 || hasSeniorTitle) {
    analysis.careerLevel = 'senior';
  } else if (years >= 2) {
    analysis.careerLevel = 'mid';
  } else {
    analysis.careerLevel = 'entry';
  }
}

/**
 * Extract years of experience from summary text
 * Looks for patterns like "8+ years", "8 years", "over 8 years", etc.
 */
function extractYearsFromSummary(summary) {
  if (!summary) return null;

  // Match patterns like "8+ years", "8 years", "over 8 years", "more than 8 years"
  const patterns = [
    /(\d+)\+?\s*years?\s*(of)?\s*(experience|exp)?/i,
    /over\s*(\d+)\s*years?/i,
    /more\s*than\s*(\d+)\s*years?/i,
    /around\s*(\d+)\s*years?/i,
    /approximately\s*(\d+)\s*years?/i,
    /nearly\s*(\d+)\s*years?/i,
  ];

  for (const pattern of patterns) {
    const match = summary.match(pattern);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }

  return null;
}

/**
 * Parse date string to Date object
 */
function parseDate(dateStr) {
  if (!dateStr) return null;

  // Handle "Present" or "Current"
  if (/present|current/i.test(dateStr)) {
    return new Date();
  }

  // Try to parse various formats
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  // Try MM/YYYY format
  const match = dateStr.match(/(\d{1,2})\/(\d{4})/);
  if (match) {
    return new Date(parseInt(match[2]), parseInt(match[1]) - 1);
  }

  // Try YYYY format
  const yearMatch = dateStr.match(/(\d{4})/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1]), 0);
  }

  return null;
}

/**
 * Calculate overall scores
 */
function calculateScores(analysis) {
  const sections = analysis.sections;

  // Completeness score (0-100)
  let completenessPoints = 0;
  if (sections.summary.exists && sections.summary.quality !== 'missing') completenessPoints += 20;
  if (sections.experience.exists) completenessPoints += 30;
  if (sections.experience.totalBullets >= 10) completenessPoints += 10;
  if (sections.education.exists) completenessPoints += 15;
  if (sections.skills.exists) completenessPoints += 15;
  if (sections.skills.count >= 5) completenessPoints += 5;
  if (sections.projects.exists) completenessPoints += 5;
  analysis.completenessScore = Math.min(100, completenessPoints);

  // Metrics score (0-100)
  if (sections.experience.totalBullets > 0) {
    analysis.metricsScore = Math.round((sections.experience.bulletsWithMetrics / sections.experience.totalBullets) * 100);
  } else {
    analysis.metricsScore = 0;
  }

  // Action verb score (0-100)
  if (sections.experience.totalBullets > 0) {
    const weakVerbCount = sections.experience.weakVerbs.length;
    const strongVerbRatio = 1 - (weakVerbCount / sections.experience.totalBullets);
    analysis.actionVerbScore = Math.round(strongVerbRatio * 100);
  } else {
    analysis.actionVerbScore = 50; // Neutral
  }

  // ATS score (simplified - based on having key sections and content)
  let atsPoints = 0;
  if (sections.summary.exists) atsPoints += 20;
  if (sections.experience.exists && sections.experience.count >= 2) atsPoints += 30;
  if (sections.skills.exists && sections.skills.count >= 5) atsPoints += 25;
  if (sections.education.exists) atsPoints += 15;
  if (analysis.metricsScore >= 30) atsPoints += 10;
  analysis.atsScore = Math.min(100, atsPoints);
}

/**
 * Determine enhancement priorities based on analysis
 */
function determineEnhancementPriorities(analysis) {
  const priorities = [];

  // High priority: Missing summary
  if (!analysis.sections.summary.exists || analysis.sections.summary.quality === 'missing') {
    priorities.push({
      priority: 'critical',
      area: 'summary',
      action: 'create',
      message: 'Create a compelling professional summary tailored to target role'
    });
  } else if (analysis.sections.summary.issues.length > 0) {
    priorities.push({
      priority: 'high',
      area: 'summary',
      action: 'improve',
      message: 'Enhance summary with specific achievements and role-relevant keywords'
    });
  }

  // High priority: Low metrics
  if (analysis.metricsScore < 40 && analysis.sections.experience.totalBullets > 0) {
    const bulletsNeedingMetrics = analysis.sections.experience.totalBullets - analysis.sections.experience.bulletsWithMetrics;
    priorities.push({
      priority: 'high',
      area: 'experience_metrics',
      action: 'add_metrics',
      message: `Add quantifiable metrics to ${bulletsNeedingMetrics} bullet points`,
      count: bulletsNeedingMetrics
    });
  }

  // Medium priority: Weak action verbs
  if (analysis.sections.experience.weakVerbs.length > 0) {
    priorities.push({
      priority: 'medium',
      area: 'experience_verbs',
      action: 'strengthen_verbs',
      message: `Replace ${analysis.sections.experience.weakVerbs.length} weak action verbs with powerful alternatives`,
      count: analysis.sections.experience.weakVerbs.length
    });
  }

  // Medium priority: Sparse experience descriptions
  const sparseExperiences = analysis.issues.filter(i => i.section === 'experience' && i.type === 'sparse');
  if (sparseExperiences.length > 0) {
    priorities.push({
      priority: 'medium',
      area: 'experience_content',
      action: 'expand',
      message: `Expand ${sparseExperiences.length} experience entries with more bullet points`,
      count: sparseExperiences.length
    });
  }

  // Low priority: Skills suggestions
  if (analysis.sections.skills.count < 10) {
    priorities.push({
      priority: 'low',
      area: 'skills',
      action: 'suggest',
      message: 'Suggest additional relevant skills based on experience'
    });
  }

  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  priorities.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  analysis.enhancementPriorities = priorities;
}

/**
 * Get a human-readable summary of the analysis
 */
export function getAnalysisSummary(analysis) {
  const lines = [];

  lines.push(`Resume Analysis for ${analysis.detectedRole} (${analysis.careerLevel} level, ~${analysis.yearsOfExperience} years)`);
  lines.push('');
  lines.push(`Scores: Completeness ${analysis.completenessScore}% | Metrics ${analysis.metricsScore}% | ATS ${analysis.atsScore}%`);
  lines.push('');

  if (analysis.enhancementPriorities.length > 0) {
    lines.push('Enhancement Priorities:');
    analysis.enhancementPriorities.forEach((p, i) => {
      lines.push(`${i + 1}. [${p.priority.toUpperCase()}] ${p.message}`);
    });
  }

  return lines.join('\n');
}
