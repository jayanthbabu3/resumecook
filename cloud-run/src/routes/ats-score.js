/**
 * ATS Score Analysis Route
 *
 * Production-ready ATS compatibility analyzer based on real-world ATS systems
 * like Workday, Taleo, Greenhouse, Lever, and iCIMS.
 *
 * Analyzes resume for:
 * - Contact information completeness
 * - Professional summary quality
 * - Work experience with quantifiable achievements
 * - Action verbs usage
 * - Skills section optimization
 * - Education details
 * - Formatting and ATS compatibility
 * - Job description keyword matching
 */

import { Router } from 'express';

export const atsScoreRouter = Router();

// Action verbs categorized by impact level (used by major ATS systems)
const ACTION_VERBS = {
  leadership: ['led', 'managed', 'directed', 'oversaw', 'supervised', 'coordinated', 'orchestrated', 'spearheaded', 'headed', 'mentored', 'coached', 'guided'],
  achievement: ['achieved', 'exceeded', 'surpassed', 'attained', 'accomplished', 'delivered', 'completed', 'earned', 'won', 'secured'],
  improvement: ['improved', 'increased', 'boosted', 'enhanced', 'optimized', 'streamlined', 'accelerated', 'maximized', 'strengthened', 'elevated', 'advanced'],
  creation: ['created', 'developed', 'built', 'designed', 'established', 'launched', 'initiated', 'founded', 'pioneered', 'introduced', 'implemented'],
  analysis: ['analyzed', 'evaluated', 'assessed', 'researched', 'investigated', 'identified', 'diagnosed', 'measured', 'calculated', 'forecasted'],
  communication: ['presented', 'negotiated', 'persuaded', 'collaborated', 'consulted', 'advised', 'influenced', 'facilitated', 'mediated', 'advocated'],
  technical: ['engineered', 'programmed', 'automated', 'integrated', 'configured', 'deployed', 'architected', 'refactored', 'debugged', 'tested'],
};

// Weak verbs to avoid
const WEAK_VERBS = ['responsible for', 'helped', 'assisted', 'worked on', 'participated', 'involved in', 'handled', 'dealt with', 'was in charge of'];

// Industry-specific keywords (expanded for better matching)
const INDUSTRY_KEYWORDS = {
  technology: [
    'javascript', 'typescript', 'python', 'java', 'go', 'golang', 'rust', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin',
    'react', 'angular', 'vue', 'svelte', 'next.js', 'node.js', 'express', 'django', 'flask', 'spring', 'rails',
    'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'terraform', 'jenkins', 'ci/cd', 'devops',
    'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'firebase',
    'rest', 'graphql', 'api', 'microservices', 'serverless', 'cloud', 'saas', 'paas',
    'git', 'github', 'gitlab', 'bitbucket', 'agile', 'scrum', 'jira', 'confluence',
    'machine learning', 'ml', 'ai', 'artificial intelligence', 'deep learning', 'nlp', 'computer vision',
    'data science', 'data engineering', 'big data', 'spark', 'hadoop', 'airflow', 'kafka',
  ],
  marketing: [
    'seo', 'sem', 'ppc', 'google ads', 'facebook ads', 'social media', 'content marketing', 'email marketing',
    'analytics', 'google analytics', 'hubspot', 'salesforce', 'marketo', 'mailchimp', 'hootsuite',
    'brand management', 'digital marketing', 'inbound marketing', 'lead generation', 'conversion optimization',
    'a/b testing', 'campaign management', 'market research', 'competitive analysis', 'customer segmentation',
    'roi', 'kpi', 'ctr', 'cpc', 'cpm', 'roas', 'ltv', 'cac',
  ],
  finance: [
    'financial analysis', 'financial modeling', 'valuation', 'budgeting', 'forecasting', 'variance analysis',
    'excel', 'power bi', 'tableau', 'bloomberg', 'quickbooks', 'sap', 'oracle',
    'gaap', 'ifrs', 'sox compliance', 'audit', 'tax', 'accounts payable', 'accounts receivable',
    'investment banking', 'equity research', 'portfolio management', 'risk management', 'derivatives',
    'cfa', 'cpa', 'mba', 'series 7', 'series 63',
  ],
  healthcare: [
    'hipaa', 'ehr', 'emr', 'epic', 'cerner', 'meditech', 'patient care', 'clinical',
    'medical terminology', 'icd-10', 'cpt', 'billing', 'coding', 'compliance',
    'rn', 'lpn', 'bsn', 'msn', 'np', 'pa', 'md', 'do', 'pharmd',
    'fda', 'clinical trials', 'research', 'diagnosis', 'treatment', 'medication',
  ],
  sales: [
    'salesforce', 'hubspot', 'crm', 'pipeline management', 'lead qualification', 'prospecting',
    'cold calling', 'account management', 'territory management', 'quota attainment', 'revenue growth',
    'contract negotiation', 'closing', 'upselling', 'cross-selling', 'customer success',
    'b2b', 'b2c', 'saas sales', 'enterprise sales', 'inside sales', 'outside sales',
  ],
  design: [
    'figma', 'sketch', 'adobe xd', 'invision', 'photoshop', 'illustrator', 'indesign', 'after effects',
    'ui design', 'ux design', 'user research', 'wireframing', 'prototyping', 'design systems',
    'visual design', 'interaction design', 'information architecture', 'usability testing',
    'responsive design', 'accessibility', 'wcag', 'color theory', 'typography',
  ],
};

// Soft skills that ATS systems look for
const SOFT_SKILLS = [
  'leadership', 'communication', 'teamwork', 'collaboration', 'problem solving', 'problem-solving',
  'analytical', 'critical thinking', 'time management', 'project management', 'organization',
  'adaptability', 'flexibility', 'creativity', 'innovation', 'attention to detail',
  'interpersonal', 'negotiation', 'presentation', 'public speaking', 'conflict resolution',
  'decision making', 'strategic thinking', 'planning', 'mentoring', 'coaching',
];

atsScoreRouter.post('/', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const analysis = analyzeResume(resumeData, jobDescription);

    res.json({
      success: true,
      ...analysis,
    });
  } catch (error) {
    console.error('ATS analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze resume',
      details: error.message,
    });
  }
});

function analyzeResume(resumeData, jobDescription) {
  const issues = [];
  const suggestions = [];
  const metrics = {};

  // Analyze each section with detailed scoring
  const contactAnalysis = analyzeContact(resumeData.personalInfo, issues, suggestions);
  const summaryAnalysis = analyzeSummary(resumeData.personalInfo?.summary, issues, suggestions);
  const experienceAnalysis = analyzeExperience(resumeData.experience, issues, suggestions);
  const educationAnalysis = analyzeEducation(resumeData.education, issues, suggestions);
  const skillsAnalysis = analyzeSkills(resumeData.skills, issues, suggestions);
  const formattingAnalysis = analyzeFormatting(resumeData, issues, suggestions);
  const actionVerbAnalysis = analyzeActionVerbs(resumeData, issues, suggestions);
  const quantificationAnalysis = analyzeQuantification(resumeData, issues, suggestions);

  // Calculate section scores
  metrics.contact = { score: contactAnalysis.score, max: contactAnalysis.max, percentage: Math.round((contactAnalysis.score / contactAnalysis.max) * 100) };
  metrics.summary = { score: summaryAnalysis.score, max: summaryAnalysis.max, percentage: Math.round((summaryAnalysis.score / summaryAnalysis.max) * 100) };
  metrics.experience = { score: experienceAnalysis.score, max: experienceAnalysis.max, percentage: Math.round((experienceAnalysis.score / experienceAnalysis.max) * 100) };
  metrics.education = { score: educationAnalysis.score, max: educationAnalysis.max, percentage: Math.round((educationAnalysis.score / educationAnalysis.max) * 100) };
  metrics.skills = { score: skillsAnalysis.score, max: skillsAnalysis.max, percentage: Math.round((skillsAnalysis.score / skillsAnalysis.max) * 100) };
  metrics.formatting = { score: formattingAnalysis.score, max: formattingAnalysis.max, percentage: Math.round((formattingAnalysis.score / formattingAnalysis.max) * 100) };
  metrics.actionVerbs = { score: actionVerbAnalysis.score, max: actionVerbAnalysis.max, percentage: Math.round((actionVerbAnalysis.score / actionVerbAnalysis.max) * 100), details: actionVerbAnalysis.details };
  metrics.quantification = { score: quantificationAnalysis.score, max: quantificationAnalysis.max, percentage: Math.round((quantificationAnalysis.score / quantificationAnalysis.max) * 100), details: quantificationAnalysis.details };

  // Calculate format score (weighted)
  const weights = {
    contact: 0.15,
    summary: 0.10,
    experience: 0.25,
    education: 0.10,
    skills: 0.15,
    formatting: 0.05,
    actionVerbs: 0.10,
    quantification: 0.10,
  };

  let formatScore = 0;
  for (const [key, weight] of Object.entries(weights)) {
    formatScore += (metrics[key].score / metrics[key].max) * 100 * weight;
  }
  formatScore = Math.round(formatScore);

  // Analyze sections presence
  const sections = {
    hasSummary: !!(resumeData.personalInfo?.summary && resumeData.personalInfo.summary.length > 50),
    hasExperience: !!(resumeData.experience && resumeData.experience.length > 0),
    hasEducation: !!(resumeData.education && resumeData.education.length > 0),
    hasSkills: !!(resumeData.skills && resumeData.skills.length > 0),
    hasContact: !!(resumeData.personalInfo?.email && resumeData.personalInfo?.fullName),
    hasCertifications: !!(resumeData.certifications && resumeData.certifications.length > 0),
    hasProjects: !!(resumeData.projects && resumeData.projects.length > 0),
    hasAchievements: !!(resumeData.achievements && resumeData.achievements.length > 0),
  };

  // Job Match (if job description provided)
  let keywords = null;
  if (jobDescription && jobDescription.length > 50) {
    keywords = analyzeJobMatch(resumeData, jobDescription);
  }

  // Calculate overall score
  let score = formatScore;
  if (keywords) {
    // Weight: 70% format, 30% keyword match
    score = Math.round(formatScore * 0.7 + keywords.matchPercentage * 0.3);
  }

  // Determine category
  const category = getCategory(score);

  // Sort suggestions by priority and convert to tips format
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const tips = suggestions.slice(0, 12).map(s => ({
    priority: s.priority,
    title: getTipTitle(s.priority),
    description: s.message,
    impact: s.impact || 'medium',
  }));

  // Generate strengths based on high-scoring areas
  const strengths = [];
  if (metrics.contact.percentage >= 80) strengths.push('Complete contact information');
  if (metrics.summary.percentage >= 80) strengths.push('Well-crafted professional summary');
  if (metrics.experience.percentage >= 80) strengths.push('Strong work experience section');
  if (metrics.actionVerbs.percentage >= 80) strengths.push('Good use of action verbs');
  if (metrics.quantification.percentage >= 80) strengths.push('Quantified achievements');
  if (metrics.skills.percentage >= 80) strengths.push('Comprehensive skills section');

  return {
    score,
    category,
    format: {
      score: formatScore,
      issues,
      suggestions: suggestions.map(s => ({
        type: s.type || 'enhancement',
        message: s.message,
        suggestion: s.message,
        priority: s.priority,
      })),
      sections,
      metrics,
    },
    keywords,
    tips,
    strengths,
    analyzedAt: new Date().toISOString(),
  };
}

function getTipTitle(priority) {
  switch (priority) {
    case 'high':
      return 'Critical';
    case 'medium':
      return 'Important';
    case 'low':
      return 'Suggested';
    default:
      return 'Tip';
  }
}

function getCategory(score) {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'fair';
  if (score >= 40) return 'needs_improvement';
  return 'poor';
}

function analyzeContact(personalInfo, issues, suggestions) {
  let score = 0;
  const max = 20;

  // Full name (5 points)
  if (personalInfo?.fullName) {
    score += 5;
    // Check if name is properly capitalized
    const words = personalInfo.fullName.split(' ');
    const isProperlyCapitalized = words.every(w => w.charAt(0) === w.charAt(0).toUpperCase());
    if (!isProperlyCapitalized) {
      suggestions.push({ priority: 'low', message: 'Capitalize your name properly (e.g., "John Smith")' });
    }
  } else {
    issues.push({
      type: 'missing_info',
      severity: 'critical',
      message: 'Full name is missing',
      suggestion: 'Add your full name at the top of your resume',
    });
    suggestions.push({ priority: 'high', message: 'Add your full name - this is required for ATS parsing', impact: 'high' });
  }

  // Email (5 points)
  if (personalInfo?.email) {
    score += 3;
    // Check for professional email
    const email = personalInfo.email.toLowerCase();
    const unprofessionalPatterns = ['69', '420', 'sexy', 'cute', 'hot', 'babe', 'lover'];
    const isUnprofessional = unprofessionalPatterns.some(p => email.includes(p));
    const hasCommonProvider = email.includes('@gmail') || email.includes('@outlook') || email.includes('@yahoo') || email.includes('@icloud');

    if (isUnprofessional) {
      issues.push({
        type: 'unprofessional',
        severity: 'high',
        message: 'Email address may appear unprofessional',
        suggestion: 'Consider using a professional email format like firstname.lastname@email.com',
      });
      suggestions.push({ priority: 'high', message: 'Use a professional email address (e.g., name@email.com)', impact: 'high' });
    } else {
      score += 2;
    }
  } else {
    issues.push({
      type: 'missing_info',
      severity: 'critical',
      message: 'Email address is missing',
      suggestion: 'Add a professional email address',
    });
    suggestions.push({ priority: 'high', message: 'Add your email address - recruiters need to contact you', impact: 'high' });
  }

  // Phone (4 points)
  if (personalInfo?.phone) {
    score += 4;
    // Basic phone format check
    const phoneDigits = personalInfo.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      suggestions.push({ priority: 'medium', message: 'Ensure your phone number is complete with country/area code' });
    }
  } else {
    issues.push({
      type: 'missing_info',
      severity: 'high',
      message: 'Phone number is missing',
      suggestion: 'Add your phone number for direct contact',
    });
    suggestions.push({ priority: 'medium', message: 'Add your phone number for direct contact', impact: 'medium' });
  }

  // Location (3 points)
  if (personalInfo?.location) {
    score += 3;
  } else {
    suggestions.push({ priority: 'low', message: 'Add your location (City, State) - helps with local job matching', impact: 'low' });
  }

  // LinkedIn (3 points)
  if (personalInfo?.linkedin) {
    score += 3;
    // Check if it's a proper LinkedIn URL
    if (!personalInfo.linkedin.includes('linkedin.com')) {
      suggestions.push({ priority: 'low', message: 'Ensure LinkedIn URL is complete (linkedin.com/in/yourprofile)' });
    }
  } else {
    suggestions.push({ priority: 'low', message: 'Add your LinkedIn profile URL', impact: 'low' });
  }

  return { score, max };
}

function analyzeSummary(summary, issues, suggestions) {
  let score = 0;
  const max = 15;

  if (!summary || summary.trim().length < 30) {
    issues.push({
      type: 'missing_section',
      severity: 'high',
      message: 'Professional summary is missing or too short',
      suggestion: 'Add a 2-4 sentence summary highlighting your key qualifications and career goals',
    });
    suggestions.push({ priority: 'high', message: 'Add a professional summary (2-4 sentences highlighting your value proposition)', impact: 'high' });
    return { score: 0, max };
  }

  const summaryLower = summary.toLowerCase();
  const wordCount = summary.split(/\s+/).filter(w => w.length > 0).length;

  // Length check (5 points)
  if (wordCount >= 30 && wordCount <= 75) {
    score += 5;
  } else if (wordCount >= 20 && wordCount <= 100) {
    score += 3;
    if (wordCount < 30) {
      suggestions.push({ priority: 'medium', message: 'Expand your summary to 30-75 words for better impact' });
    } else {
      suggestions.push({ priority: 'medium', message: 'Consider condensing your summary to 30-75 words for readability' });
    }
  } else {
    score += 1;
    if (wordCount < 20) {
      suggestions.push({ priority: 'medium', message: 'Your summary is too brief - expand to 30-75 words' });
    } else {
      suggestions.push({ priority: 'medium', message: 'Your summary is too long - keep it to 30-75 words for ATS optimization' });
    }
  }

  // Years of experience mentioned (3 points)
  const yearsPattern = /(\d+)\+?\s*(years?|yrs?)\s*(of)?\s*(experience)?/i;
  if (yearsPattern.test(summary)) {
    score += 3;
  } else {
    suggestions.push({ priority: 'medium', message: 'Include years of experience in your summary (e.g., "5+ years of experience")', impact: 'medium' });
  }

  // Action verbs (3 points)
  const allActionVerbs = Object.values(ACTION_VERBS).flat();
  const actionVerbCount = allActionVerbs.filter(verb => summaryLower.includes(verb)).length;
  if (actionVerbCount >= 2) {
    score += 3;
  } else if (actionVerbCount >= 1) {
    score += 1;
    suggestions.push({ priority: 'low', message: 'Use more action verbs in your summary (developed, led, achieved)' });
  } else {
    suggestions.push({ priority: 'medium', message: 'Include action verbs in your summary to show impact', impact: 'medium' });
  }

  // Industry keywords (2 points)
  const hasIndustryKeywords = Object.values(INDUSTRY_KEYWORDS).flat().some(kw => summaryLower.includes(kw));
  if (hasIndustryKeywords) {
    score += 2;
  } else {
    suggestions.push({ priority: 'low', message: 'Include industry-specific keywords in your summary' });
  }

  // Check for first person pronouns (discouraged) (2 points)
  const firstPersonPronouns = [' i ', ' my ', ' me ', ' i\'m ', ' i\'ve '];
  const hasFirstPerson = firstPersonPronouns.some(p => (' ' + summaryLower + ' ').includes(p));
  if (!hasFirstPerson) {
    score += 2;
  } else {
    suggestions.push({ priority: 'low', message: 'Avoid first-person pronouns (I, my, me) in your summary - use implied subject' });
  }

  return { score, max };
}

function analyzeExperience(experience, issues, suggestions) {
  let score = 0;
  const max = 25;

  if (!experience || experience.length === 0) {
    issues.push({
      type: 'missing_section',
      severity: 'critical',
      message: 'Work experience section is missing',
      suggestion: 'Add your work experience with job titles, companies, and accomplishments',
    });
    suggestions.push({ priority: 'high', message: 'Add work experience - this is the most important section for ATS', impact: 'high' });
    return { score: 0, max };
  }

  // Has experience (5 points)
  score += 5;

  // Multiple entries (3 points)
  if (experience.length >= 2) score += 2;
  if (experience.length >= 3) score += 1;

  // Check each entry for completeness
  let hasAllDates = true;
  let hasAllTitles = true;
  let hasAllCompanies = true;
  let totalBullets = 0;
  let entriesWithBullets = 0;

  experience.forEach((exp, index) => {
    // Job title
    if (!exp.title && !exp.jobTitle && !exp.position) {
      hasAllTitles = false;
    }

    // Company
    if (!exp.company && !exp.employer && !exp.organization) {
      hasAllCompanies = false;
    }

    // Dates
    if (!exp.startDate && !exp.from) {
      hasAllDates = false;
    }

    // Bullet points
    const bullets = exp.bulletPoints || exp.highlights || exp.achievements || exp.description?.split('\n').filter(b => b.trim()) || [];
    if (bullets.length > 0) {
      entriesWithBullets++;
      totalBullets += bullets.length;
    }
  });

  // Job titles (2 points)
  if (hasAllTitles) {
    score += 2;
  } else {
    issues.push({
      type: 'missing_info',
      severity: 'high',
      message: 'Some experience entries are missing job titles',
      suggestion: 'Add job titles to all experience entries',
    });
    suggestions.push({ priority: 'high', message: 'Add job titles to all experience entries', impact: 'high' });
  }

  // Company names (2 points)
  if (hasAllCompanies) {
    score += 2;
  } else {
    suggestions.push({ priority: 'medium', message: 'Add company names to all experience entries' });
  }

  // Dates (2 points)
  if (hasAllDates) {
    score += 2;
  } else {
    suggestions.push({ priority: 'medium', message: 'Add start/end dates to all experience entries', impact: 'medium' });
  }

  // Bullet points (5 points)
  if (entriesWithBullets === experience.length && totalBullets >= experience.length * 3) {
    score += 5;
  } else if (entriesWithBullets > 0) {
    score += 2;
    const avgBullets = Math.round(totalBullets / Math.max(entriesWithBullets, 1));
    if (avgBullets < 3) {
      suggestions.push({ priority: 'high', message: 'Add 3-5 bullet points per role to describe your achievements', impact: 'high' });
    }
    if (entriesWithBullets < experience.length) {
      issues.push({
        type: 'weak_content',
        severity: 'high',
        message: 'Some experience entries lack bullet points',
        suggestion: 'Add bullet points to all roles',
      });
    }
  } else {
    issues.push({
      type: 'weak_content',
      severity: 'critical',
      message: 'Experience entries lack bullet points',
      suggestion: 'Add 3-5 bullet points per role highlighting your achievements',
    });
    suggestions.push({ priority: 'high', message: 'Add bullet points describing your achievements and responsibilities', impact: 'high' });
  }

  // Check for recent experience (3 points)
  const hasRecentExperience = experience.some(exp => {
    const endDate = exp.endDate || exp.to || exp.current;
    if (endDate === 'present' || endDate === 'Present' || exp.current === true || exp.isCurrentRole) {
      return true;
    }
    if (endDate) {
      const year = parseInt(endDate.toString().slice(-4));
      return year >= new Date().getFullYear() - 2;
    }
    return false;
  });

  if (hasRecentExperience) {
    score += 3;
  } else {
    suggestions.push({ priority: 'medium', message: 'Ensure your most recent experience shows as current or within last 2 years' });
  }

  return { score, max };
}

function analyzeEducation(education, issues, suggestions) {
  let score = 0;
  const max = 15;

  if (!education || education.length === 0) {
    issues.push({
      type: 'missing_section',
      severity: 'medium',
      message: 'Education section is missing',
      suggestion: 'Add your educational background including degrees and institutions',
    });
    suggestions.push({ priority: 'medium', message: 'Add your education details', impact: 'medium' });
    return { score: 0, max };
  }

  // Has education (6 points)
  score += 6;

  // Check each entry
  let hasAllSchools = true;
  let hasAllDegrees = true;
  let hasAllDates = true;

  education.forEach((edu) => {
    if (!edu.school && !edu.institution && !edu.university) {
      hasAllSchools = false;
    }
    if (!edu.degree && !edu.qualification) {
      hasAllDegrees = false;
    }
    if (!edu.endDate && !edu.graduationDate && !edu.year && !edu.graduationYear) {
      hasAllDates = false;
    }
  });

  // Institution names (3 points)
  if (hasAllSchools) {
    score += 3;
  } else {
    suggestions.push({ priority: 'medium', message: 'Add institution names to all education entries' });
  }

  // Degree names (3 points)
  if (hasAllDegrees) {
    score += 3;
  } else {
    suggestions.push({ priority: 'medium', message: 'Add degree/qualification to all education entries' });
  }

  // Graduation dates (2 points)
  if (hasAllDates) {
    score += 2;
  } else {
    suggestions.push({ priority: 'low', message: 'Add graduation dates to education entries' });
  }

  // Field of study (1 point)
  const hasField = education.some(edu => edu.field || edu.major || edu.concentration);
  if (hasField) {
    score += 1;
  }

  return { score, max };
}

function analyzeSkills(skills, issues, suggestions) {
  let score = 0;
  const max = 15;

  if (!skills || skills.length === 0) {
    issues.push({
      type: 'missing_section',
      severity: 'high',
      message: 'Skills section is missing',
      suggestion: 'Add a skills section with relevant technical and soft skills',
    });
    suggestions.push({ priority: 'high', message: 'Add skills - ATS systems heavily rely on keyword matching', impact: 'high' });
    return { score: 0, max };
  }

  // Extract skill names
  const skillNames = skills.map(s =>
    (typeof s === 'string' ? s : s.name || s.skill || '').toLowerCase()
  ).filter(s => s);

  // Has skills (4 points)
  score += 4;

  // Number of skills (4 points)
  if (skillNames.length >= 15) {
    score += 4;
  } else if (skillNames.length >= 10) {
    score += 3;
  } else if (skillNames.length >= 5) {
    score += 2;
    suggestions.push({ priority: 'medium', message: `Add more skills (currently ${skillNames.length}) - aim for 10-20 relevant skills` });
  } else {
    score += 1;
    suggestions.push({ priority: 'high', message: `Add more skills (currently ${skillNames.length}) - aim for 10-20 relevant skills`, impact: 'high' });
  }

  // Check for mix of hard and soft skills (4 points)
  const allIndustryKeywords = Object.values(INDUSTRY_KEYWORDS).flat();
  const hardSkillCount = skillNames.filter(s => allIndustryKeywords.some(kw => s.includes(kw) || kw.includes(s))).length;
  const softSkillCount = skillNames.filter(s => SOFT_SKILLS.some(ss => s.includes(ss) || ss.includes(s))).length;

  if (hardSkillCount >= 5 && softSkillCount >= 2) {
    score += 4;
  } else if (hardSkillCount >= 3 || softSkillCount >= 1) {
    score += 2;
    if (hardSkillCount < 5) {
      suggestions.push({ priority: 'medium', message: 'Add more technical/hard skills relevant to your industry' });
    }
    if (softSkillCount < 2) {
      suggestions.push({ priority: 'low', message: 'Add soft skills like communication, leadership, problem-solving' });
    }
  } else {
    suggestions.push({ priority: 'medium', message: 'Include both technical skills and soft skills', impact: 'medium' });
  }

  // Check for skill categories (3 points)
  const hasCategories = skills.some(s => typeof s === 'object' && s.category);
  if (hasCategories) {
    score += 3;
  } else if (skills.length >= 10) {
    suggestions.push({ priority: 'low', message: 'Consider organizing skills by category (Technical, Tools, Languages)' });
  }

  return { score, max };
}

function analyzeFormatting(resumeData, issues, suggestions) {
  let score = 0;
  const max = 10;

  // Check section completeness (4 points)
  const requiredSections = ['experience', 'education', 'skills'];
  const optionalSections = ['certifications', 'projects', 'achievements'];

  const completeRequired = requiredSections.filter(s => resumeData[s]?.length > 0).length;
  score += Math.min(completeRequired, 3) * 1.33; // Up to 4 points

  // Check for optional sections that add value (2 points)
  const completeOptional = optionalSections.filter(s => resumeData[s]?.length > 0).length;
  if (completeOptional >= 1) score += 1;
  if (completeOptional >= 2) score += 1;

  // Check for ATS-unfriendly elements (4 points)
  let atsWarnings = 0;

  // Check if personal info has unnecessary fields
  const personalInfo = resumeData.personalInfo || {};
  if (personalInfo.photo || personalInfo.image || personalInfo.picture) {
    atsWarnings++;
    suggestions.push({ priority: 'medium', message: 'Remove photo/image - many ATS systems cannot process images', impact: 'medium' });
  }

  // Check for tables/columns (based on presence of certain structured data)
  // This is a heuristic since we don't have actual formatting info

  if (atsWarnings === 0) {
    score += 4;
  } else {
    score += Math.max(0, 4 - atsWarnings);
  }

  return { score, max };
}

function analyzeActionVerbs(resumeData, issues, suggestions) {
  let score = 0;
  const max = 15;
  const details = {
    strongVerbs: [],
    weakVerbs: [],
    verbCoverage: 0,
  };

  // Get all bullet points from experience
  const bullets = (resumeData.experience || [])
    .flatMap(exp => exp.bulletPoints || exp.highlights || exp.achievements || [])
    .filter(b => b && b.trim());

  if (bullets.length === 0) {
    return { score: 0, max, details };
  }

  const allActionVerbs = Object.values(ACTION_VERBS).flat();
  let strongVerbCount = 0;
  let weakVerbCount = 0;
  const usedStrongVerbs = new Set();
  const usedWeakVerbs = new Set();

  bullets.forEach(bullet => {
    const bulletLower = bullet.toLowerCase();
    const firstWord = bulletLower.split(/\s+/)[0];

    // Check for strong action verbs
    const foundStrong = allActionVerbs.find(verb => bulletLower.startsWith(verb) || firstWord === verb);
    if (foundStrong) {
      strongVerbCount++;
      usedStrongVerbs.add(foundStrong);
    }

    // Check for weak verbs
    const foundWeak = WEAK_VERBS.find(verb => bulletLower.includes(verb));
    if (foundWeak) {
      weakVerbCount++;
      usedWeakVerbs.add(foundWeak);
    }
  });

  details.strongVerbs = Array.from(usedStrongVerbs);
  details.weakVerbs = Array.from(usedWeakVerbs);
  details.verbCoverage = Math.round((strongVerbCount / bullets.length) * 100);

  // Score based on action verb usage (10 points)
  const verbRatio = strongVerbCount / bullets.length;
  if (verbRatio >= 0.8) {
    score += 10;
  } else if (verbRatio >= 0.6) {
    score += 7;
    suggestions.push({ priority: 'medium', message: 'Start more bullet points with strong action verbs (led, developed, achieved)' });
  } else if (verbRatio >= 0.4) {
    score += 4;
    suggestions.push({ priority: 'medium', message: 'Start bullet points with action verbs to show impact (currently only ' + Math.round(verbRatio * 100) + '% do)', impact: 'medium' });
  } else {
    score += 2;
    suggestions.push({ priority: 'high', message: 'Most bullet points should start with action verbs (led, developed, achieved, improved)', impact: 'high' });
  }

  // Penalize weak verbs (5 points)
  if (weakVerbCount === 0) {
    score += 5;
  } else if (weakVerbCount <= 2) {
    score += 3;
    suggestions.push({ priority: 'medium', message: `Replace weak phrases like "${Array.from(usedWeakVerbs).join(', ')}" with action verbs` });
  } else {
    score += 1;
    issues.push({
      type: 'weak_content',
      severity: 'medium',
      message: 'Resume contains weak verbs that reduce impact',
      suggestion: 'Replace "responsible for", "helped", "assisted" with strong action verbs',
    });
    suggestions.push({ priority: 'high', message: 'Replace weak phrases with strong action verbs', impact: 'medium' });
  }

  return { score, max, details };
}

function analyzeQuantification(resumeData, issues, suggestions) {
  let score = 0;
  const max = 15;
  const details = {
    quantifiedBullets: 0,
    totalBullets: 0,
    examples: [],
  };

  // Get all bullet points
  const bullets = (resumeData.experience || [])
    .flatMap(exp => exp.bulletPoints || exp.highlights || exp.achievements || [])
    .filter(b => b && b.trim());

  details.totalBullets = bullets.length;

  if (bullets.length === 0) {
    return { score: 0, max, details };
  }

  // Patterns for quantified achievements
  const quantificationPatterns = [
    /\d+%/,                                          // Percentages
    /\$[\d,]+(?:\.\d{2})?(?:[KMB])?/i,              // Dollar amounts
    /[\d,]+\+?\s*(users|customers|clients|employees|members|subscribers)/i,  // User/customer counts
    /[\d,]+\+?\s*(projects?|products?|features?|applications?)/i,            // Project counts
    /\d+x/i,                                         // Multipliers (2x, 10x)
    /\d+\s*(million|billion|thousand|k|m|b)\b/i,    // Large numbers
    /top\s*\d+%?/i,                                  // Rankings
    /\d+\s*(hours?|days?|weeks?|months?|years?)/i,  // Time saved
    /\d+:\d+/,                                       // Ratios
    /\d+\s*(team members?|direct reports?|people)/i, // Team size
    /reduced.*by\s*\d+/i,                           // Reductions
    /increased.*by\s*\d+/i,                         // Increases
    /saved.*\$?[\d,]+/i,                            // Savings
    /grew.*\d+/i,                                    // Growth
    /\d+\s*to\s*\d+/i,                              // Ranges showing improvement
  ];

  let quantifiedCount = 0;

  bullets.forEach(bullet => {
    const isQuantified = quantificationPatterns.some(pattern => pattern.test(bullet));
    if (isQuantified) {
      quantifiedCount++;
      if (details.examples.length < 3) {
        // Extract the number/metric from the bullet
        const match = bullet.match(/(\d+%|\$[\d,]+[KMB]?|[\d,]+\+?\s*\w+)/i);
        if (match) {
          details.examples.push(match[0]);
        }
      }
    }
  });

  details.quantifiedBullets = quantifiedCount;

  // Score based on quantification (15 points)
  const quantRatio = quantifiedCount / bullets.length;
  if (quantRatio >= 0.6) {
    score += 15;
  } else if (quantRatio >= 0.4) {
    score += 10;
    suggestions.push({ priority: 'medium', message: 'Add more metrics to your achievements (%, $, numbers)' });
  } else if (quantRatio >= 0.2) {
    score += 5;
    issues.push({
      type: 'weak_content',
      severity: 'medium',
      message: 'Only ' + Math.round(quantRatio * 100) + '% of bullet points have quantifiable metrics',
      suggestion: 'Add numbers, percentages, or dollar amounts to demonstrate impact',
    });
    suggestions.push({ priority: 'high', message: `Quantify more achievements - only ${quantifiedCount} of ${bullets.length} bullets have metrics`, impact: 'high' });
  } else {
    score += 2;
    issues.push({
      type: 'weak_content',
      severity: 'high',
      message: 'Resume lacks quantifiable achievements',
      suggestion: 'Add metrics like "increased sales by 25%" or "managed team of 10"',
    });
    suggestions.push({ priority: 'high', message: 'Add quantifiable metrics to your achievements (%, $, numbers)', impact: 'high' });
  }

  return { score, max, details };
}

function analyzeJobMatch(resumeData, jobDescription) {
  const jdLower = jobDescription.toLowerCase();

  // Extract keywords from job description using NLP-like approach
  const extractedKeywords = extractKeywordsFromJD(jdLower);

  // Get resume content for matching
  const resumeSkills = (resumeData.skills || []).map(s =>
    (typeof s === 'string' ? s : s.name || s.skill || '').toLowerCase()
  ).filter(s => s);

  const resumeSummary = (resumeData.personalInfo?.summary || '').toLowerCase();

  const experienceBullets = (resumeData.experience || [])
    .flatMap(exp => [
      exp.title || exp.jobTitle || exp.position || '',
      ...(exp.bulletPoints || exp.highlights || exp.achievements || []),
    ])
    .join(' ')
    .toLowerCase();

  const educationText = (resumeData.education || [])
    .flatMap(edu => [edu.degree || '', edu.field || '', edu.major || ''])
    .join(' ')
    .toLowerCase();

  const resumeText = [resumeSkills.join(' '), resumeSummary, experienceBullets, educationText].join(' ');

  // Find matching keywords
  const matched = {
    hardSkills: [],
    softSkills: [],
    tools: [],
    requirements: [],
  };

  const missing = {
    hardSkills: [],
    softSkills: [],
    tools: [],
    requirements: [],
  };

  // Categorize and match keywords
  extractedKeywords.forEach(keyword => {
    const kw = keyword.toLowerCase();
    const isMatched = resumeText.includes(kw) ||
      resumeSkills.some(skill => skill.includes(kw) || kw.includes(skill));

    // Determine category
    const allTechKeywords = INDUSTRY_KEYWORDS.technology || [];
    const isTech = allTechKeywords.some(t => kw.includes(t) || t.includes(kw));
    const isSoft = SOFT_SKILLS.some(s => kw.includes(s) || s.includes(kw));
    const toolIndicators = ['software', 'tool', 'platform', 'system'];
    const isTool = toolIndicators.some(t => kw.includes(t)) ||
      ['excel', 'jira', 'confluence', 'slack', 'salesforce', 'hubspot', 'figma', 'sketch'].includes(kw);

    let category = 'requirements';
    if (isTech) category = 'hardSkills';
    else if (isSoft) category = 'softSkills';
    else if (isTool) category = 'tools';

    if (isMatched) {
      matched[category].push(keyword);
    } else {
      missing[category].push(keyword);
    }
  });

  // Calculate match percentage
  const totalKeywords = extractedKeywords.length;
  const totalMatched = matched.hardSkills.length + matched.softSkills.length +
    matched.tools.length + matched.requirements.length;

  const matchPercentage = totalKeywords > 0
    ? Math.round((totalMatched / totalKeywords) * 100)
    : 50;

  return {
    matchPercentage,
    matched,
    missing,
    totalFound: totalMatched,
    totalInJob: totalKeywords,
    keywordDensity: {
      skills: matched.hardSkills.length,
      softSkills: matched.softSkills.length,
      tools: matched.tools.length,
    },
  };
}

function extractKeywordsFromJD(jobDescription) {
  const keywords = new Set();

  // Add industry keywords found in JD
  Object.values(INDUSTRY_KEYWORDS).flat().forEach(kw => {
    if (jobDescription.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });

  // Add soft skills found in JD
  SOFT_SKILLS.forEach(skill => {
    if (jobDescription.includes(skill.toLowerCase())) {
      keywords.add(skill);
    }
  });

  // Extract additional keywords using patterns
  const patterns = [
    /(?:experience with|knowledge of|proficiency in|expertise in|familiar with)\s+([a-zA-Z0-9\s,/+-]+)/gi,
    /(?:required|preferred|must have|should have):\s*([a-zA-Z0-9\s,/+-]+)/gi,
    /(\d+\+?\s*years?)\s+(?:of\s+)?experience/gi,
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(jobDescription)) !== null) {
      const extracted = match[1].split(/[,;]/).map(s => s.trim()).filter(s => s.length > 2);
      extracted.forEach(kw => keywords.add(kw));
    }
  });

  return Array.from(keywords).slice(0, 50); // Limit to top 50 keywords
}
