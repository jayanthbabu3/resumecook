/**
 * LinkedIn Import Route
 *
 * Imports resume data from LinkedIn profile.
 * Uses Apify for scraping (requires APIFY_API_KEY).
 */

import { Router } from 'express';

export const linkedinRouter = Router();

linkedinRouter.post('/', async (req, res) => {
  try {
    const { linkedinUrl } = req.body;

    if (!linkedinUrl) {
      return res.status(400).json({ error: 'LinkedIn URL is required' });
    }

    // Validate LinkedIn URL
    if (!linkedinUrl.includes('linkedin.com/in/')) {
      return res.status(400).json({ error: 'Invalid LinkedIn URL format' });
    }

    const apifyKey = process.env.APIFY_API_KEY;
    if (!apifyKey) {
      return res.status(500).json({
        error: 'LinkedIn import not configured. Please set APIFY_API_KEY.',
      });
    }

    console.log(`Importing LinkedIn profile: ${linkedinUrl}`);

    // Call Apify LinkedIn scraper
    const response = await fetch(
      `https://api.apify.com/v2/acts/apify~linkedin-profile-scraper/runs?token=${apifyKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startUrls: [{ url: linkedinUrl }],
          proxy: { useApifyProxy: true },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.status}`);
    }

    const runData = await response.json();
    const runId = runData.data?.id;

    if (!runId) {
      throw new Error('Failed to start LinkedIn import');
    }

    // Wait for completion (with timeout)
    let attempts = 0;
    const maxAttempts = 30; // 30 * 2s = 60s max wait
    let profileData = null;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const statusResponse = await fetch(
        `https://api.apify.com/v2/acts/apify~linkedin-profile-scraper/runs/${runId}?token=${apifyKey}`
      );
      const statusData = await statusResponse.json();

      if (statusData.data?.status === 'SUCCEEDED') {
        // Get results
        const datasetId = statusData.data?.defaultDatasetId;
        const resultsResponse = await fetch(
          `https://api.apify.com/v2/datasets/${datasetId}/items?token=${apifyKey}`
        );
        const results = await resultsResponse.json();
        profileData = results[0];
        break;
      } else if (statusData.data?.status === 'FAILED') {
        throw new Error('LinkedIn import failed');
      }

      attempts++;
    }

    if (!profileData) {
      throw new Error('LinkedIn import timed out');
    }

    // Transform to resume format
    const resumeData = transformLinkedInToResume(profileData);

    console.log(`LinkedIn import successful: ${resumeData.personalInfo?.fullName}`);

    res.json({
      success: true,
      data: resumeData,
    });
  } catch (error) {
    console.error('LinkedIn import error:', error);
    res.status(500).json({
      error: 'Failed to import LinkedIn profile',
      details: error.message,
    });
  }
});

function transformLinkedInToResume(profile) {
  const createId = (prefix, idx) => `${prefix}-${idx}`;

  return {
    version: '2.0',
    personalInfo: {
      fullName: profile.fullName || '',
      email: '',
      phone: '',
      location: profile.location || '',
      title: profile.headline || '',
      summary: profile.summary || '',
      linkedin: profile.linkedInUrl || '',
      github: '',
      portfolio: '',
      website: '',
    },
    experience: (profile.experiences || []).map((exp, idx) => ({
      id: createId('exp', idx),
      company: exp.companyName || '',
      position: exp.title || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: !exp.endDate,
      description: exp.description || '',
      bulletPoints: [],
    })),
    education: (profile.education || []).map((edu, idx) => ({
      id: createId('edu', idx),
      school: edu.schoolName || '',
      degree: edu.degreeName || '',
      field: edu.fieldOfStudy || '',
      location: '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      gpa: '',
    })),
    skills: (profile.skills || []).map((skill, idx) => ({
      id: createId('skill', idx),
      name: typeof skill === 'string' ? skill : skill.name || '',
      category: 'Technical',
    })),
    certifications: (profile.certifications || []).map((cert, idx) => ({
      id: createId('cert', idx),
      name: cert.name || '',
      issuer: cert.authority || '',
      date: cert.date || '',
      credentialId: cert.credentialId || '',
      url: cert.url || '',
    })),
    languages: (profile.languages || []).map((lang, idx) => ({
      id: createId('lang', idx),
      language: lang.name || lang,
      proficiency: lang.proficiency || 'Professional',
    })),
    projects: [],
    awards: [],
    achievements: [],
    strengths: [],
    volunteer: (profile.volunteer || []).map((vol, idx) => ({
      id: createId('vol', idx),
      organization: vol.company || '',
      role: vol.role || '',
      location: '',
      startDate: vol.startDate || '',
      endDate: vol.endDate || '',
      current: !vol.endDate,
      description: vol.description || '',
      highlights: [],
    })),
    publications: [],
    speaking: [],
    patents: [],
    interests: [],
    references: [],
    courses: [],
    customSections: [],
    settings: {
      includeSocialLinks: true,
      includePhoto: false,
      dateFormat: 'MMM YYYY',
    },
  };
}
