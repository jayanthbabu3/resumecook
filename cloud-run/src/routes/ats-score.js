/**
 * ATS Score Analysis Route
 *
 * Analyzes resume for ATS compatibility and job match scoring.
 * This is a local analysis - no AI calls required.
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
      error: 'Failed to analyze resume',
      details: error.message,
    });
  }
});

function analyzeResume(resumeData, jobDescription) {
  const scores = {};
  const suggestions = [];
  let totalScore = 0;
  let maxScore = 0;

  // Contact Information (20 points)
  const contactScore = analyzeContact(resumeData.personalInfo, suggestions);
  scores.contact = contactScore;
  totalScore += contactScore.score;
  maxScore += contactScore.max;

  // Summary (15 points)
  const summaryScore = analyzeSummary(resumeData.personalInfo?.summary, suggestions);
  scores.summary = summaryScore;
  totalScore += summaryScore.score;
  maxScore += summaryScore.max;

  // Experience (25 points)
  const experienceScore = analyzeExperience(resumeData.experience, suggestions);
  scores.experience = experienceScore;
  totalScore += experienceScore.score;
  maxScore += experienceScore.max;

  // Education (15 points)
  const educationScore = analyzeEducation(resumeData.education, suggestions);
  scores.education = educationScore;
  totalScore += educationScore.score;
  maxScore += educationScore.max;

  // Skills (15 points)
  const skillsScore = analyzeSkills(resumeData.skills, suggestions);
  scores.skills = skillsScore;
  totalScore += skillsScore.score;
  maxScore += skillsScore.max;

  // Formatting (10 points)
  const formattingScore = analyzeFormatting(resumeData, suggestions);
  scores.formatting = formattingScore;
  totalScore += formattingScore.score;
  maxScore += formattingScore.max;

  // Job Match (if job description provided)
  let jobMatchScore = null;
  if (jobDescription && jobDescription.length > 50) {
    jobMatchScore = analyzeJobMatch(resumeData, jobDescription);
  }

  const overallScore = Math.round((totalScore / maxScore) * 100);

  return {
    overallScore,
    scores,
    suggestions: suggestions.slice(0, 10), // Top 10 suggestions
    jobMatch: jobMatchScore,
    grade: getGrade(overallScore),
  };
}

function analyzeContact(personalInfo, suggestions) {
  let score = 0;
  const max = 20;

  if (personalInfo?.fullName) score += 5;
  else suggestions.push({ priority: 'high', message: 'Add your full name' });

  if (personalInfo?.email) score += 5;
  else suggestions.push({ priority: 'high', message: 'Add your email address' });

  if (personalInfo?.phone) score += 5;
  else suggestions.push({ priority: 'medium', message: 'Add your phone number' });

  if (personalInfo?.location) score += 3;
  else suggestions.push({ priority: 'low', message: 'Add your location' });

  if (personalInfo?.linkedin) score += 2;

  return { score, max, label: 'Contact Information' };
}

function analyzeSummary(summary, suggestions) {
  let score = 0;
  const max = 15;

  if (!summary || summary.length < 50) {
    suggestions.push({
      priority: 'high',
      message: 'Add a professional summary (2-3 sentences)',
    });
    return { score: 0, max, label: 'Professional Summary' };
  }

  // Length check
  if (summary.length >= 100 && summary.length <= 500) {
    score += 8;
  } else if (summary.length >= 50) {
    score += 4;
    suggestions.push({
      priority: 'medium',
      message: 'Summary should be 100-500 characters',
    });
  }

  // Action words
  const actionWords = ['led', 'managed', 'developed', 'created', 'achieved', 'improved'];
  const hasActionWords = actionWords.some(word => summary.toLowerCase().includes(word));
  if (hasActionWords) score += 4;
  else suggestions.push({ priority: 'low', message: 'Use action verbs in your summary' });

  // Keywords density
  score += 3;

  return { score, max, label: 'Professional Summary' };
}

function analyzeExperience(experience, suggestions) {
  let score = 0;
  const max = 25;

  if (!experience || experience.length === 0) {
    suggestions.push({ priority: 'high', message: 'Add work experience' });
    return { score: 0, max, label: 'Work Experience' };
  }

  // Has experience
  score += 5;

  // Multiple entries
  if (experience.length >= 2) score += 3;
  if (experience.length >= 3) score += 2;

  // Bullet points
  const hasBullets = experience.some(exp => exp.bulletPoints?.length > 0);
  if (hasBullets) score += 5;
  else suggestions.push({ priority: 'high', message: 'Add bullet points to your experience' });

  // Dates
  const hasDates = experience.every(exp => exp.startDate);
  if (hasDates) score += 3;
  else suggestions.push({ priority: 'medium', message: 'Add dates to all experience entries' });

  // Metrics in bullets
  const hasMetrics = experience.some(exp =>
    exp.bulletPoints?.some(bp => /\d+%|\$\d+|\d+ (users|customers|projects)/i.test(bp))
  );
  if (hasMetrics) score += 5;
  else suggestions.push({ priority: 'medium', message: 'Add quantifiable metrics to bullet points' });

  // Company names
  score += 2;

  return { score, max, label: 'Work Experience' };
}

function analyzeEducation(education, suggestions) {
  let score = 0;
  const max = 15;

  if (!education || education.length === 0) {
    suggestions.push({ priority: 'medium', message: 'Add your education' });
    return { score: 0, max, label: 'Education' };
  }

  score += 8; // Has education

  const hasField = education.some(edu => edu.field);
  if (hasField) score += 3;

  const hasDates = education.every(edu => edu.endDate);
  if (hasDates) score += 2;

  const hasSchool = education.every(edu => edu.school);
  if (hasSchool) score += 2;

  return { score, max, label: 'Education' };
}

function analyzeSkills(skills, suggestions) {
  let score = 0;
  const max = 15;

  if (!skills || skills.length === 0) {
    suggestions.push({ priority: 'high', message: 'Add your skills' });
    return { score: 0, max, label: 'Skills' };
  }

  score += 5; // Has skills

  if (skills.length >= 5) score += 3;
  if (skills.length >= 10) score += 2;
  if (skills.length >= 15) score += 2;

  // Categorized
  const hasCategories = skills.some(s => s.category);
  if (hasCategories) score += 3;
  else suggestions.push({ priority: 'low', message: 'Categorize your skills' });

  return { score, max, label: 'Skills' };
}

function analyzeFormatting(resumeData, suggestions) {
  let score = 0;
  const max = 10;

  // Check completeness
  const sections = ['experience', 'education', 'skills'];
  const completeSections = sections.filter(s => resumeData[s]?.length > 0).length;
  score += completeSections * 2;

  // Check consistency
  score += 4;

  return { score, max, label: 'Formatting & Structure' };
}

function analyzeJobMatch(resumeData, jobDescription) {
  const jdLower = jobDescription.toLowerCase();

  // Extract skills from resume
  const resumeSkills = (resumeData.skills || []).map(s => s.name.toLowerCase());

  // Find matching skills
  const matchedSkills = resumeSkills.filter(skill => jdLower.includes(skill));

  // Extract common keywords from JD
  const commonKeywords = [
    'javascript', 'python', 'java', 'react', 'node', 'aws', 'docker',
    'kubernetes', 'sql', 'agile', 'scrum', 'leadership', 'communication',
    'typescript', 'git', 'ci/cd', 'api', 'rest', 'graphql', 'mongodb',
  ];

  const jdKeywords = commonKeywords.filter(kw => jdLower.includes(kw));
  const resumeKeywords = resumeSkills.filter(skill =>
    commonKeywords.some(kw => skill.includes(kw))
  );
  const matchingKeywords = jdKeywords.filter(kw =>
    resumeSkills.some(skill => skill.includes(kw))
  );

  const matchScore = jdKeywords.length > 0
    ? Math.round((matchingKeywords.length / jdKeywords.length) * 100)
    : 50;

  return {
    score: matchScore,
    matchedSkills,
    missingSkills: jdKeywords.filter(kw => !matchingKeywords.includes(kw)),
    keywordsInJD: jdKeywords.length,
    keywordsMatched: matchingKeywords.length,
  };
}

function getGrade(score) {
  if (score >= 90) return { letter: 'A+', description: 'Excellent' };
  if (score >= 80) return { letter: 'A', description: 'Very Good' };
  if (score >= 70) return { letter: 'B', description: 'Good' };
  if (score >= 60) return { letter: 'C', description: 'Fair' };
  if (score >= 50) return { letter: 'D', description: 'Needs Improvement' };
  return { letter: 'F', description: 'Significant Improvement Needed' };
}
