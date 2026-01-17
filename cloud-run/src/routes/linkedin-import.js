/**
 * LinkedIn Import Route
 *
 * Imports resume data from LinkedIn profile.
 * Uses Apify HarvestAPI LinkedIn Profile Scraper.
 * Requires APIFY_API_KEY (or APIFY_API_TOKEN).
 */

import { Router } from 'express';

export const linkedinRouter = Router();

linkedinRouter.post('/', async (req, res) => {
  try {
    const { linkedinUrl } = req.body;

    if (!linkedinUrl) {
      return res.status(400).json({ error: 'LinkedIn URL is required' });
    }

    // Validate LinkedIn URL format
    const linkedinUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
    if (!linkedinUrlPattern.test(linkedinUrl)) {
      return res.status(400).json({
        error: 'Invalid LinkedIn URL format. Expected: https://www.linkedin.com/in/username'
      });
    }

    // Support both env var names for compatibility
    const apifyToken = process.env.APIFY_API_TOKEN || process.env.APIFY_API_KEY;
    if (!apifyToken) {
      console.error('APIFY_API_TOKEN/APIFY_API_KEY not configured');
      return res.status(500).json({
        error: 'LinkedIn import not configured. Please set APIFY_API_KEY.',
      });
    }

    console.log(`Importing LinkedIn profile: ${linkedinUrl}`);

    // Call Apify HarvestAPI LinkedIn Profile Scraper (synchronous API)
    const apifyEndpoint = 'https://api.apify.com/v2/acts/harvestapi~linkedin-profile-scraper/run-sync-get-dataset-items';

    const response = await fetch(`${apifyEndpoint}?token=${apifyToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileScraperMode: 'Profile details no email ($4 per 1k)',
        queries: [linkedinUrl],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Apify API error:', response.status, errorText);
      return res.status(502).json({
        error: 'Failed to fetch LinkedIn profile. Please try again later.',
        details: response.status === 402 ? 'API quota exceeded' : `Status: ${response.status}`,
      });
    }

    const apifyData = await response.json();

    // Debug: Log response structure
    console.log('Apify response - Is Array:', Array.isArray(apifyData));
    console.log('Apify response - Length:', apifyData?.length);

    if (!apifyData || apifyData.length === 0) {
      return res.status(404).json({
        error: 'Could not find LinkedIn profile. Please check the URL and try again.'
      });
    }

    const profileData = apifyData[0];

    // Transform to resume format
    const resumeData = transformLinkedInToResume(profileData);

    console.log(`LinkedIn import successful: ${resumeData.personalInfo?.fullName}`);
    console.log(`Experience count: ${resumeData.experience.length}`);
    console.log(`Education count: ${resumeData.education.length}`);

    res.json({
      success: true,
      data: resumeData,
      linkedinProfile: {
        name: resumeData.personalInfo?.fullName,
        photoUrl: profileData.photo || profileData.profilePicture?.url || '',
        linkedInUrl: profileData.linkedinUrl || linkedinUrl,
      },
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
  const createId = (prefix) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Extract bullet points from description
  const extractBulletPoints = (description) => {
    if (!description) return [];
    const lines = description.split(/[\n\r]+/);
    return lines
      .map(line => line.trim().replace(/^[•\-\*]\s*/, '')) // Remove leading bullet chars
      .filter(line => line.length > 0 && line.length < 500);
  };

  // Parse date from "Issued Apr 2021" format
  const parseIssuedDate = (issuedAt) => {
    if (!issuedAt) return '';
    const match = issuedAt.match(/Issued\s+(\w+\s+\d{4})/);
    return match ? match[1] : '';
  };

  // Parse expiry date from "Issued Apr 2021 · Expired Nov 2022"
  const parseExpiryDate = (issuedAt) => {
    if (!issuedAt) return '';
    const match = issuedAt.match(/Expired\s+(\w+\s+\d{4})/);
    return match ? match[1] : '';
  };

  // Parse published date from "Analytics Vidhya · Mar 10, 2020"
  const parsePublishedDate = (publishedAt) => {
    if (!publishedAt) return '';
    const parts = publishedAt.split('·');
    return parts.length > 1 ? parts[1].trim() : '';
  };

  // Parse publisher from "Analytics Vidhya · Mar 10, 2020"
  const parsePublisher = (publishedAt) => {
    if (!publishedAt) return '';
    const parts = publishedAt.split('·');
    return parts.length > 0 ? parts[0].trim() : '';
  };

  // Build location string from HarvestAPI format
  const locationString = profile.location?.linkedinText ||
    profile.location?.parsed?.text ||
    [profile.location?.parsed?.city, profile.location?.parsed?.country].filter(Boolean).join(', ') ||
    (typeof profile.location === 'string' ? profile.location : '') || '';

  // Get photo URL
  const photoUrl = profile.photo || profile.profilePicture?.url || '';

  // Get website from websites array
  const website = profile.websites?.[0] || '';

  return {
    version: '2.0',
    personalInfo: {
      fullName: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
      email: '',
      phone: '',
      location: locationString,
      title: profile.headline || '',
      summary: profile.about || '',
      photo: photoUrl,
      linkedin: profile.linkedinUrl || '',
      github: '',
      portfolio: website,
      twitter: '',
      website: website,
    },
    // Map experience - HarvestAPI uses 'experience' array with 'position' for job title
    experience: (profile.experience || []).map((exp) => ({
      id: createId('exp'),
      company: exp.companyName || '',
      position: exp.position || '',
      location: exp.location || '',
      startDate: exp.startDate?.text || '',
      endDate: exp.endDate?.text || 'Present',
      current: exp.endDate?.text === 'Present' || !exp.endDate?.text,
      description: exp.description || '',
      bulletPoints: exp.description ? extractBulletPoints(exp.description) : [],
      companyUrl: exp.companyLinkedinUrl || '',
      employmentType: exp.employmentType || undefined,
      remote: exp.workplaceType === 'Remote',
    })),
    // Map education - HarvestAPI uses 'education' array
    education: (profile.education || []).map((edu) => ({
      id: createId('edu'),
      school: edu.schoolName || '',
      degree: edu.degree || '',
      field: edu.fieldOfStudy || '',
      location: '',
      startDate: edu.startDate?.text || (edu.startDate?.year ? `${edu.startDate.year}` : ''),
      endDate: edu.endDate?.text || (edu.endDate?.year ? `${edu.endDate.year}` : ''),
      current: false,
      gpa: edu.insights?.replace('Grade: ', '') || '',
      honors: [],
      coursework: [],
      activities: [],
      description: '',
    })),
    // Map skills
    skills: (profile.skills || []).map((skill) => ({
      id: createId('skill'),
      name: skill.name || (typeof skill === 'string' ? skill : ''),
      level: undefined,
      category: 'Technical',
    })),
    // Map languages
    languages: (profile.languages || []).map((lang) => ({
      id: createId('lang'),
      language: lang.name || (typeof lang === 'string' ? lang : ''),
      proficiency: 'Intermediate',
    })),
    // Map certifications - HarvestAPI uses 'title', 'issuedBy', 'issuedAt'
    certifications: (profile.certifications || []).map((cert) => ({
      id: createId('cert'),
      name: cert.title || cert.name || '',
      issuer: cert.issuedBy || cert.authority || '',
      date: parseIssuedDate(cert.issuedAt) || cert.date || '',
      expiryDate: parseExpiryDate(cert.issuedAt) || '',
      credentialId: '',
      url: '',
    })),
    // Map publications
    publications: (profile.publications || []).map((pub) => ({
      id: createId('pub'),
      title: pub.title || '',
      publisher: parsePublisher(pub.publishedAt),
      date: parsePublishedDate(pub.publishedAt),
      url: pub.link || '',
      description: pub.description || '',
    })),
    // Map volunteer work - HarvestAPI uses 'volunteering'
    volunteer: (profile.volunteering || profile.volunteer || []).map((vol) => ({
      id: createId('vol'),
      organization: vol.organization || vol.companyName || '',
      role: vol.role || vol.position || '',
      startDate: vol.startDate?.text || '',
      endDate: vol.endDate?.text || '',
      current: false,
      description: vol.description || '',
      highlights: [],
    })),
    // Map honors/awards - HarvestAPI uses 'honorsAndAwards'
    awards: (profile.honorsAndAwards || profile.awards || []).map((honor) => ({
      id: createId('award'),
      title: honor.title || '',
      issuer: honor.issuer || '',
      date: honor.issuedAt || '',
      description: honor.description || '',
    })),
    // Map projects
    projects: (profile.projects || []).map((proj) => ({
      id: createId('proj'),
      name: proj.title || proj.name || '',
      description: proj.description || '',
      startDate: proj.startDate?.text || '',
      endDate: proj.endDate?.text || '',
      url: proj.link || proj.url || '',
      technologies: [],
      techStack: [],
      highlights: [],
    })),
    // Map courses
    courses: (profile.courses || []).map((course) => ({
      id: createId('course'),
      name: course.name || course.title || '',
      provider: course.provider || '',
      date: '',
      certificate: false,
      description: '',
    })),
    achievements: [],
    strengths: [],
    speaking: [],
    patents: [],
    interests: [],
    references: [],
    customSections: [],
    settings: {
      includeSocialLinks: true,
      includePhoto: !!photoUrl,
      dateFormat: 'MMM YYYY',
    },
  };
}
