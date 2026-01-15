/**
 * ATS Score Analysis Function
 *
 * Analyzes resume compatibility with Applicant Tracking Systems.
 * Based on real ATS behavior research:
 * - 75% of resumes are rejected by ATS before human review
 * - 99.7% of recruiters use keyword filters
 * - Top factors: keywords (40%), position alignment (35%), baseline (25%)
 *
 * Two modes:
 * 1. Quick Analysis (no job description) - General ATS compatibility
 * 2. Job Match Analysis (with job description) - Keyword matching + compatibility
 */

// CORS configuration
const allowedOrigins = [
  "https://resumecook.com",
  "https://www.resumecook.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
];

// Common ATS-unfriendly elements
const ATS_FORMAT_ISSUES = {
  tables: 'Tables can confuse ATS parsers',
  columns: 'Multi-column layouts may scramble content',
  graphics: 'Images and graphics are ignored by ATS',
  headers_footers: 'Content in headers/footers may not be scanned',
  special_fonts: 'Unusual fonts may not render correctly',
  text_boxes: 'Text boxes can break parsing',
};

// Standard section headers that ATS recognizes
const STANDARD_SECTION_HEADERS = [
  'experience', 'work experience', 'professional experience', 'employment history',
  'education', 'academic background',
  'skills', 'technical skills', 'core competencies',
  'certifications', 'licenses', 'credentials',
  'projects', 'portfolio',
  'summary', 'professional summary', 'objective', 'profile',
  'achievements', 'accomplishments', 'awards',
  'languages', 'language proficiency',
  'volunteer', 'volunteer experience',
  'publications', 'research',
  'references',
];

// Action verbs that ATS and recruiters look for
const ACTION_VERBS = [
  'achieved', 'administered', 'analyzed', 'built', 'collaborated', 'contributed',
  'coordinated', 'created', 'delivered', 'designed', 'developed', 'directed',
  'drove', 'enhanced', 'established', 'executed', 'expanded', 'generated',
  'grew', 'implemented', 'improved', 'increased', 'initiated', 'launched',
  'led', 'managed', 'mentored', 'negotiated', 'optimized', 'orchestrated',
  'organized', 'oversaw', 'pioneered', 'produced', 'reduced', 'resolved',
  'spearheaded', 'streamlined', 'supervised', 'transformed', 'upgraded',
];

// Common resume keywords by category
const COMMON_KEYWORDS = {
  soft_skills: [
    'leadership', 'communication', 'teamwork', 'problem-solving', 'analytical',
    'collaboration', 'adaptability', 'time management', 'organization', 'detail-oriented',
    'creative', 'critical thinking', 'interpersonal', 'negotiation', 'presentation',
  ],
  hard_skills_general: [
    'project management', 'data analysis', 'budget management', 'strategic planning',
    'process improvement', 'stakeholder management', 'vendor management', 'reporting',
    'documentation', 'training', 'quality assurance', 'compliance', 'risk management',
  ],
};

/**
 * Extract text content from resume data for analysis
 */
function extractResumeText(resumeData) {
  const parts = [];

  // Personal info
  if (resumeData.personalInfo) {
    const pi = resumeData.personalInfo;
    if (pi.fullName) parts.push(pi.fullName);
    if (pi.title) parts.push(pi.title);
    if (pi.summary) parts.push(pi.summary);
    if (pi.email) parts.push(pi.email);
    if (pi.phone) parts.push(pi.phone);
    if (pi.location) parts.push(pi.location);
  }

  // Experience
  if (resumeData.experience?.length) {
    resumeData.experience.forEach(exp => {
      if (exp.company) parts.push(exp.company);
      if (exp.position) parts.push(exp.position);
      if (exp.description) parts.push(exp.description);
      if (exp.bulletPoints?.length) {
        parts.push(...exp.bulletPoints);
      }
    });
  }

  // Education
  if (resumeData.education?.length) {
    resumeData.education.forEach(edu => {
      if (edu.school) parts.push(edu.school);
      if (edu.degree) parts.push(edu.degree);
      if (edu.field) parts.push(edu.field);
    });
  }

  // Skills
  if (resumeData.skills?.length) {
    resumeData.skills.forEach(skill => {
      if (skill.name) parts.push(skill.name);
      if (skill.category) parts.push(skill.category);
    });
  }

  // Certifications
  if (resumeData.certifications?.length) {
    resumeData.certifications.forEach(cert => {
      if (cert.name) parts.push(cert.name);
      if (cert.issuer) parts.push(cert.issuer);
    });
  }

  // Projects
  if (resumeData.projects?.length) {
    resumeData.projects.forEach(proj => {
      if (proj.name) parts.push(proj.name);
      if (proj.description) parts.push(proj.description);
      if (proj.technologies?.length) parts.push(...proj.technologies);
      if (proj.highlights?.length) parts.push(...proj.highlights);
    });
  }

  // Achievements
  if (resumeData.achievements?.length) {
    resumeData.achievements.forEach(ach => {
      if (ach.title) parts.push(ach.title);
      if (ach.description) parts.push(ach.description);
    });
  }

  // Languages
  if (resumeData.languages?.length) {
    resumeData.languages.forEach(lang => {
      if (lang.language) parts.push(lang.language);
    });
  }

  // Volunteer
  if (resumeData.volunteer?.length) {
    resumeData.volunteer.forEach(vol => {
      if (vol.organization) parts.push(vol.organization);
      if (vol.role) parts.push(vol.role);
      if (vol.description) parts.push(vol.description);
    });
  }

  return parts.filter(Boolean).join(' ').toLowerCase();
}

/**
 * Extract keywords from job description
 */
function extractJobKeywords(jobDescription) {
  if (!jobDescription) return { hardSkills: [], softSkills: [], tools: [], requirements: [] };

  const text = jobDescription.toLowerCase();
  const words = text.split(/[\s,;:.()[\]{}|/\\]+/).filter(w => w.length > 2);

  // Common tech tools/platforms
  const techPatterns = [
    'javascript', 'typescript', 'python', 'java', 'react', 'angular', 'vue',
    'node', 'nodejs', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'sql',
    'mongodb', 'postgresql', 'mysql', 'redis', 'git', 'github', 'gitlab',
    'jenkins', 'terraform', 'ansible', 'linux', 'windows', 'macos',
    'figma', 'sketch', 'photoshop', 'illustrator', 'excel', 'powerpoint',
    'salesforce', 'hubspot', 'jira', 'confluence', 'slack', 'teams',
    'tableau', 'powerbi', 'looker', 'snowflake', 'databricks', 'spark',
    'machine learning', 'ml', 'ai', 'artificial intelligence', 'deep learning',
    'nlp', 'computer vision', 'tensorflow', 'pytorch', 'scikit-learn',
    'agile', 'scrum', 'kanban', 'waterfall', 'devops', 'cicd', 'ci/cd',
  ];

  const hardSkills = [];
  const softSkills = [];
  const tools = [];

  // Find tech tools
  techPatterns.forEach(tech => {
    if (text.includes(tech)) {
      tools.push(tech);
    }
  });

  // Find soft skills
  COMMON_KEYWORDS.soft_skills.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      softSkills.push(skill);
    }
  });

  // Find hard skills
  COMMON_KEYWORDS.hard_skills_general.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      hardSkills.push(skill);
    }
  });

  // Extract years of experience requirements
  const yearsMatch = text.match(/(\d+)\+?\s*(?:years?|yrs?)/gi);
  const requirements = [];
  if (yearsMatch) {
    requirements.push(...yearsMatch.map(m => m.trim()));
  }

  // Extract degree requirements
  const degreePatterns = ['bachelor', 'master', 'phd', 'doctorate', 'mba', 'bs', 'ms', 'ba', 'ma'];
  degreePatterns.forEach(degree => {
    if (text.includes(degree)) {
      requirements.push(degree);
    }
  });

  return {
    hardSkills: [...new Set(hardSkills)],
    softSkills: [...new Set(softSkills)],
    tools: [...new Set(tools)],
    requirements: [...new Set(requirements)],
  };
}

/**
 * Analyze resume format and structure for ATS compatibility
 */
function analyzeFormat(resumeData) {
  const issues = [];
  const suggestions = [];
  let formatScore = 100;

  // Check for essential sections
  const hasSummary = resumeData.personalInfo?.summary?.trim().length > 0;
  const hasExperience = resumeData.experience?.length > 0;
  const hasEducation = resumeData.education?.length > 0;
  const hasSkills = resumeData.skills?.length > 0;
  const hasContact = resumeData.personalInfo?.email && resumeData.personalInfo?.phone;

  if (!hasSummary) {
    issues.push({
      type: 'missing_section',
      severity: 'medium',
      message: 'Missing professional summary',
      suggestion: 'Add a 2-3 sentence professional summary highlighting your key qualifications',
    });
    formatScore -= 10;
  }

  if (!hasExperience) {
    issues.push({
      type: 'missing_section',
      severity: 'high',
      message: 'Missing work experience section',
      suggestion: 'Add your work experience with bullet points describing achievements',
    });
    formatScore -= 20;
  }

  if (!hasEducation) {
    issues.push({
      type: 'missing_section',
      severity: 'medium',
      message: 'Missing education section',
      suggestion: 'Add your educational background including degrees and institutions',
    });
    formatScore -= 10;
  }

  if (!hasSkills) {
    issues.push({
      type: 'missing_section',
      severity: 'high',
      message: 'Missing skills section',
      suggestion: 'Add a dedicated skills section with relevant technical and soft skills',
    });
    formatScore -= 15;
  }

  if (!hasContact) {
    issues.push({
      type: 'missing_info',
      severity: 'critical',
      message: 'Missing contact information',
      suggestion: 'Include your email and phone number in the header',
    });
    formatScore -= 20;
  }

  // Check experience quality
  if (hasExperience) {
    const expWithBullets = resumeData.experience.filter(e => e.bulletPoints?.length > 0);
    if (expWithBullets.length < resumeData.experience.length) {
      issues.push({
        type: 'weak_content',
        severity: 'medium',
        message: 'Some experience entries lack bullet points',
        suggestion: 'Add 3-5 bullet points per role describing your achievements and responsibilities',
      });
      formatScore -= 10;
    }

    // Check for metrics in bullet points
    const allBullets = resumeData.experience.flatMap(e => e.bulletPoints || []);
    const bulletsWithMetrics = allBullets.filter(b => /\d+%|\$[\d,]+|\d+\+?/.test(b));
    if (bulletsWithMetrics.length < allBullets.length * 0.3) {
      suggestions.push({
        type: 'enhancement',
        message: 'Add more quantifiable achievements',
        suggestion: 'Include metrics like percentages, dollar amounts, or numbers to demonstrate impact',
      });
    }

    // Check for action verbs
    const bulletsWithActionVerbs = allBullets.filter(b => {
      const firstWord = b.trim().split(/\s+/)[0]?.toLowerCase();
      return ACTION_VERBS.includes(firstWord);
    });
    if (bulletsWithActionVerbs.length < allBullets.length * 0.5) {
      suggestions.push({
        type: 'enhancement',
        message: 'Start bullet points with strong action verbs',
        suggestion: 'Begin each bullet with verbs like "Led", "Developed", "Achieved", "Implemented"',
      });
    }
  }

  // Check summary length
  if (hasSummary && resumeData.personalInfo.summary.length < 50) {
    suggestions.push({
      type: 'enhancement',
      message: 'Professional summary is too short',
      suggestion: 'Expand your summary to 2-3 sentences highlighting key qualifications and career goals',
    });
  }

  // Check skills count
  if (hasSkills && resumeData.skills.length < 5) {
    suggestions.push({
      type: 'enhancement',
      message: 'Skills section could be stronger',
      suggestion: 'Add more relevant skills (aim for 8-15 skills)',
    });
  }

  return {
    score: Math.max(0, formatScore),
    issues,
    suggestions,
    sections: {
      hasSummary,
      hasExperience,
      hasEducation,
      hasSkills,
      hasContact,
      hasCertifications: resumeData.certifications?.length > 0,
      hasProjects: resumeData.projects?.length > 0,
      hasAchievements: resumeData.achievements?.length > 0,
    },
  };
}

/**
 * Calculate keyword match score between resume and job description
 */
function analyzeKeywordMatch(resumeText, jobKeywords) {
  const matchedKeywords = {
    hardSkills: [],
    softSkills: [],
    tools: [],
    requirements: [],
  };

  const missingKeywords = {
    hardSkills: [],
    softSkills: [],
    tools: [],
    requirements: [],
  };

  // Check hard skills
  jobKeywords.hardSkills.forEach(skill => {
    if (resumeText.includes(skill.toLowerCase())) {
      matchedKeywords.hardSkills.push(skill);
    } else {
      missingKeywords.hardSkills.push(skill);
    }
  });

  // Check soft skills
  jobKeywords.softSkills.forEach(skill => {
    if (resumeText.includes(skill.toLowerCase())) {
      matchedKeywords.softSkills.push(skill);
    } else {
      missingKeywords.softSkills.push(skill);
    }
  });

  // Check tools
  jobKeywords.tools.forEach(tool => {
    if (resumeText.includes(tool.toLowerCase())) {
      matchedKeywords.tools.push(tool);
    } else {
      missingKeywords.tools.push(tool);
    }
  });

  // Check requirements
  jobKeywords.requirements.forEach(req => {
    if (resumeText.includes(req.toLowerCase())) {
      matchedKeywords.requirements.push(req);
    } else {
      missingKeywords.requirements.push(req);
    }
  });

  // Calculate match percentage
  const totalKeywords =
    jobKeywords.hardSkills.length +
    jobKeywords.softSkills.length +
    jobKeywords.tools.length;

  const matchedCount =
    matchedKeywords.hardSkills.length +
    matchedKeywords.softSkills.length +
    matchedKeywords.tools.length;

  const matchPercentage = totalKeywords > 0 ? Math.round((matchedCount / totalKeywords) * 100) : 0;

  return {
    matchPercentage,
    matchedKeywords,
    missingKeywords,
    totalKeywords,
    matchedCount,
  };
}

/**
 * Generate overall ATS score and recommendations
 */
function generateATSScore(formatAnalysis, keywordAnalysis, hasJobDescription) {
  let overallScore;
  let category;

  if (hasJobDescription) {
    // With job description: 40% keywords, 35% alignment, 25% format
    overallScore = Math.round(
      (keywordAnalysis.matchPercentage * 0.4) +
      (formatAnalysis.score * 0.35) +
      (formatAnalysis.score * 0.25) // Use format score as baseline
    );
  } else {
    // Without job description: Pure format/ATS compatibility score
    overallScore = formatAnalysis.score;
  }

  // Determine category
  if (overallScore >= 90) {
    category = 'excellent';
  } else if (overallScore >= 80) {
    category = 'good';
  } else if (overallScore >= 70) {
    category = 'fair';
  } else if (overallScore >= 50) {
    category = 'needs_improvement';
  } else {
    category = 'poor';
  }

  // Generate tips based on score
  const tips = [];

  if (overallScore < 80) {
    if (hasJobDescription && keywordAnalysis.missingKeywords.tools.length > 0) {
      tips.push({
        priority: 'high',
        title: 'Add missing technical skills',
        description: `Consider adding these skills if you have experience: ${keywordAnalysis.missingKeywords.tools.slice(0, 5).join(', ')}`,
      });
    }

    if (formatAnalysis.issues.some(i => i.type === 'missing_section')) {
      tips.push({
        priority: 'high',
        title: 'Complete missing sections',
        description: 'ATS systems expect standard resume sections. Add any missing sections.',
      });
    }

    if (hasJobDescription && keywordAnalysis.missingKeywords.softSkills.length > 0) {
      tips.push({
        priority: 'medium',
        title: 'Include soft skills from job description',
        description: `The job mentions these skills: ${keywordAnalysis.missingKeywords.softSkills.slice(0, 3).join(', ')}`,
      });
    }
  }

  // Always include general tips
  tips.push({
    priority: 'low',
    title: 'Use standard section headers',
    description: 'Headers like "Work Experience", "Education", and "Skills" are easily recognized by ATS',
  });

  if (!hasJobDescription) {
    tips.push({
      priority: 'medium',
      title: 'Paste a job description for better analysis',
      description: 'Adding a job description enables keyword matching and improves accuracy',
    });
  }

  return {
    overallScore,
    category,
    tips: tips.slice(0, 5), // Max 5 tips
  };
}

/**
 * Main handler
 */
const handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const corsHeaders = {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const requestData = JSON.parse(event.body || "{}");
    const { resumeData, jobDescription } = requestData;

    if (!resumeData) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Resume data is required" }),
      };
    }

    // Extract resume text for keyword analysis
    const resumeText = extractResumeText(resumeData);

    // Analyze format and structure
    const formatAnalysis = analyzeFormat(resumeData);

    // Analyze keywords if job description provided
    const hasJobDescription = jobDescription && jobDescription.trim().length > 50;
    let keywordAnalysis = null;
    let jobKeywords = null;

    if (hasJobDescription) {
      jobKeywords = extractJobKeywords(jobDescription);
      keywordAnalysis = analyzeKeywordMatch(resumeText, jobKeywords);
    }

    // Generate overall score
    const { overallScore, category, tips } = generateATSScore(
      formatAnalysis,
      keywordAnalysis || { matchPercentage: 0, missingKeywords: {}, matchedKeywords: {} },
      hasJobDescription
    );

    // Build response
    const response = {
      success: true,
      score: overallScore,
      category,
      format: {
        score: formatAnalysis.score,
        issues: formatAnalysis.issues,
        suggestions: formatAnalysis.suggestions,
        sections: formatAnalysis.sections,
      },
      keywords: hasJobDescription ? {
        matchPercentage: keywordAnalysis.matchPercentage,
        matched: keywordAnalysis.matchedKeywords,
        missing: keywordAnalysis.missingKeywords,
        totalFound: keywordAnalysis.matchedCount,
        totalInJob: keywordAnalysis.totalKeywords,
      } : null,
      tips,
      analyzedAt: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify(response),
    };

  } catch (error) {
    console.error("ATS Score Error:", error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to analyze resume",
        details: error.message
      }),
    };
  }
};

module.exports = { handler };
