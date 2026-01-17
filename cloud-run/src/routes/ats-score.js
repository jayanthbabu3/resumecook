/**
 * ATS Score Analysis Route
 *
 * Analyzes resume for ATS compatibility and job match scoring.
 * Returns data in format expected by frontend ATSScorePanel component.
 */

import { Router } from 'express';

export const atsScoreRouter = Router();

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
  let formatScore = 0;
  const maxFormatScore = 100;

  // Analyze sections for format score
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

  // Contact Information (20 points)
  const contactAnalysis = analyzeContact(resumeData.personalInfo, issues, suggestions);
  formatScore += contactAnalysis.score;

  // Summary (15 points)
  const summaryAnalysis = analyzeSummary(resumeData.personalInfo?.summary, issues, suggestions);
  formatScore += summaryAnalysis.score;

  // Experience (25 points)
  const experienceAnalysis = analyzeExperience(resumeData.experience, issues, suggestions);
  formatScore += experienceAnalysis.score;

  // Education (15 points)
  const educationAnalysis = analyzeEducation(resumeData.education, issues, suggestions);
  formatScore += educationAnalysis.score;

  // Skills (15 points)
  const skillsAnalysis = analyzeSkills(resumeData.skills, issues, suggestions);
  formatScore += skillsAnalysis.score;

  // Formatting (10 points)
  const formattingAnalysis = analyzeFormatting(resumeData, issues, suggestions);
  formatScore += formattingAnalysis.score;

  // Job Match (if job description provided)
  let keywords = null;
  if (jobDescription && jobDescription.length > 50) {
    keywords = analyzeJobMatch(resumeData, jobDescription);
  }

  // Calculate overall score (format score + keyword match if available)
  let score = formatScore;
  if (keywords) {
    // Weight: 70% format, 30% keyword match
    score = Math.round(formatScore * 0.7 + keywords.matchPercentage * 0.3);
  }

  // Determine category
  const category = getCategory(score);

  // Convert suggestions to tips format
  const tips = suggestions.slice(0, 10).map(s => ({
    priority: s.priority,
    title: getTipTitle(s.priority),
    description: s.message,
  }));

  return {
    score,
    category,
    format: {
      score: formatScore,
      issues,
      suggestions: suggestions.map(s => ({
        type: 'enhancement',
        message: s.message,
        suggestion: s.message,
      })),
      sections,
    },
    keywords,
    tips,
    analyzedAt: new Date().toISOString(),
  };
}

function getTipTitle(priority) {
  switch (priority) {
    case 'high':
      return 'Important';
    case 'medium':
      return 'Recommended';
    case 'low':
      return 'Nice to have';
    default:
      return 'Suggestion';
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

  if (personalInfo?.fullName) {
    score += 5;
  } else {
    issues.push({
      type: 'missing_info',
      severity: 'critical',
      message: 'Full name is missing',
      suggestion: 'Add your full name to help recruiters identify you',
    });
    suggestions.push({ priority: 'high', message: 'Add your full name' });
  }

  if (personalInfo?.email) {
    score += 5;
  } else {
    issues.push({
      type: 'missing_info',
      severity: 'critical',
      message: 'Email address is missing',
      suggestion: 'Add a professional email address',
    });
    suggestions.push({ priority: 'high', message: 'Add your email address' });
  }

  if (personalInfo?.phone) {
    score += 5;
  } else {
    issues.push({
      type: 'missing_info',
      severity: 'high',
      message: 'Phone number is missing',
      suggestion: 'Add your phone number for direct contact',
    });
    suggestions.push({ priority: 'medium', message: 'Add your phone number' });
  }

  if (personalInfo?.location) {
    score += 3;
  } else {
    suggestions.push({ priority: 'low', message: 'Add your location (city, state)' });
  }

  if (personalInfo?.linkedin) {
    score += 2;
  }

  return { score, max };
}

function analyzeSummary(summary, issues, suggestions) {
  let score = 0;
  const max = 15;

  if (!summary || summary.length < 50) {
    issues.push({
      type: 'missing_section',
      severity: 'high',
      message: 'Professional summary is too short or missing',
      suggestion: 'Add a 2-3 sentence summary highlighting your key qualifications',
    });
    suggestions.push({ priority: 'high', message: 'Add a professional summary (2-3 sentences)' });
    return { score: 0, max };
  }

  // Length check
  if (summary.length >= 100 && summary.length <= 500) {
    score += 8;
  } else if (summary.length >= 50) {
    score += 4;
    suggestions.push({ priority: 'medium', message: 'Summary should be 100-500 characters for optimal ATS parsing' });
  }

  // Action words
  const actionWords = ['led', 'managed', 'developed', 'created', 'achieved', 'improved', 'delivered', 'built', 'designed', 'implemented'];
  const hasActionWords = actionWords.some(word => summary.toLowerCase().includes(word));
  if (hasActionWords) {
    score += 4;
  } else {
    suggestions.push({ priority: 'low', message: 'Use action verbs in your summary (led, developed, achieved)' });
  }

  // Keywords density
  score += 3;

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
    suggestions.push({ priority: 'high', message: 'Add work experience to your resume' });
    return { score: 0, max };
  }

  // Has experience
  score += 5;

  // Multiple entries
  if (experience.length >= 2) score += 3;
  if (experience.length >= 3) score += 2;

  // Bullet points
  const hasBullets = experience.some(exp => exp.bulletPoints?.length > 0 || exp.highlights?.length > 0);
  if (hasBullets) {
    score += 5;
  } else {
    issues.push({
      type: 'weak_content',
      severity: 'high',
      message: 'Experience entries lack bullet points',
      suggestion: 'Add 3-5 bullet points per role highlighting your achievements',
    });
    suggestions.push({ priority: 'high', message: 'Add bullet points to describe your achievements' });
  }

  // Dates
  const hasDates = experience.every(exp => exp.startDate);
  if (hasDates) {
    score += 3;
  } else {
    suggestions.push({ priority: 'medium', message: 'Add dates to all experience entries' });
  }

  // Metrics in bullets
  const hasMetrics = experience.some(exp => {
    const bullets = exp.bulletPoints || exp.highlights || [];
    return bullets.some(bp => /\d+%|\$\d+|\d+ (users|customers|projects|team|million|billion)/i.test(bp));
  });
  if (hasMetrics) {
    score += 5;
  } else {
    issues.push({
      type: 'weak_content',
      severity: 'medium',
      message: 'Missing quantifiable achievements',
      suggestion: 'Add metrics like percentages, dollar amounts, or numbers to demonstrate impact',
    });
    suggestions.push({ priority: 'medium', message: 'Add quantifiable metrics to bullet points (%, $, numbers)' });
  }

  // Company names
  score += 2;

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
    suggestions.push({ priority: 'medium', message: 'Add your education details' });
    return { score: 0, max };
  }

  score += 8; // Has education

  const hasField = education.some(edu => edu.field);
  if (hasField) score += 3;

  const hasDates = education.every(edu => edu.endDate || edu.graduationDate);
  if (hasDates) score += 2;

  const hasSchool = education.every(edu => edu.school || edu.institution);
  if (hasSchool) score += 2;

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
    suggestions.push({ priority: 'high', message: 'Add your skills to help ATS match you with jobs' });
    return { score: 0, max };
  }

  score += 5; // Has skills

  if (skills.length >= 5) score += 3;
  if (skills.length >= 10) score += 2;
  if (skills.length >= 15) score += 2;

  // Categorized
  const hasCategories = skills.some(s => s.category);
  if (hasCategories) {
    score += 3;
  } else {
    suggestions.push({ priority: 'low', message: 'Organize skills by category (Technical, Soft Skills, Tools)' });
  }

  return { score, max };
}

function analyzeFormatting(resumeData, issues, suggestions) {
  let score = 0;
  const max = 10;

  // Check completeness
  const sections = ['experience', 'education', 'skills'];
  const completeSections = sections.filter(s => resumeData[s]?.length > 0).length;
  score += completeSections * 2;

  // Check consistency
  score += 4;

  return { score, max };
}

function analyzeJobMatch(resumeData, jobDescription) {
  const jdLower = jobDescription.toLowerCase();

  // Extract skills from resume (handle both formats)
  const resumeSkills = (resumeData.skills || []).map(s =>
    (typeof s === 'string' ? s : s.name || '').toLowerCase()
  ).filter(s => s);

  // Common tech keywords to look for
  const commonKeywords = [
    'javascript', 'python', 'java', 'react', 'node', 'nodejs', 'aws', 'docker',
    'kubernetes', 'sql', 'agile', 'scrum', 'leadership', 'communication',
    'typescript', 'git', 'ci/cd', 'api', 'rest', 'graphql', 'mongodb',
    'postgresql', 'redis', 'linux', 'cloud', 'azure', 'gcp', 'machine learning',
    'data analysis', 'project management', 'product management', 'design',
    'figma', 'excel', 'tableau', 'power bi', 'salesforce', 'jira'
  ];

  // Find keywords in job description
  const jdKeywords = commonKeywords.filter(kw => jdLower.includes(kw));

  // Find matching keywords
  const matchingKeywords = jdKeywords.filter(kw =>
    resumeSkills.some(skill => skill.includes(kw) || kw.includes(skill))
  );

  // Also check experience bullets for keywords
  const experienceBullets = (resumeData.experience || [])
    .flatMap(exp => exp.bulletPoints || exp.highlights || [])
    .join(' ')
    .toLowerCase();

  const additionalMatches = jdKeywords.filter(kw =>
    !matchingKeywords.includes(kw) && experienceBullets.includes(kw)
  );

  const totalMatched = matchingKeywords.length + additionalMatches.length;
  const matchScore = jdKeywords.length > 0
    ? Math.round((totalMatched / jdKeywords.length) * 100)
    : 50;

  // Categorize matched and missing keywords
  const hardSkillKeywords = ['javascript', 'python', 'java', 'react', 'node', 'nodejs', 'typescript', 'sql', 'aws', 'docker', 'kubernetes', 'mongodb', 'postgresql', 'redis', 'linux', 'azure', 'gcp', 'graphql'];
  const softSkillKeywords = ['leadership', 'communication', 'agile', 'scrum', 'project management', 'product management'];
  const toolKeywords = ['git', 'jira', 'figma', 'excel', 'tableau', 'power bi', 'salesforce'];

  const categorize = (keywords) => ({
    hardSkills: keywords.filter(kw => hardSkillKeywords.includes(kw)),
    softSkills: keywords.filter(kw => softSkillKeywords.includes(kw)),
    tools: keywords.filter(kw => toolKeywords.includes(kw)),
    requirements: keywords.filter(kw => !hardSkillKeywords.includes(kw) && !softSkillKeywords.includes(kw) && !toolKeywords.includes(kw)),
  });

  const allMatched = [...matchingKeywords, ...additionalMatches];
  const missingKeywords = jdKeywords.filter(kw => !allMatched.includes(kw));

  return {
    matchPercentage: matchScore,
    matched: categorize(allMatched),
    missing: categorize(missingKeywords),
    totalFound: totalMatched,
    totalInJob: jdKeywords.length,
  };
}
