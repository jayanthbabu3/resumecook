/**
 * LinkedIn Import Route
 *
 * Imports resume data from LinkedIn profile.
 * Uses Apify HarvestAPI LinkedIn Profile Scraper.
 * Captures ALL LinkedIn data and maps it intelligently to resume sections.
 * Unmapped data goes to custom sections.
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

    // Log all keys from LinkedIn data for debugging
    console.log('LinkedIn profile keys:', Object.keys(profileData));

    // Transform to resume format - capturing ALL data
    const resumeData = transformLinkedInToResume(profileData);

    console.log(`LinkedIn import successful: ${resumeData.personalInfo?.fullName}`);
    console.log(`Experience count: ${resumeData.experience.length}`);
    console.log(`Education count: ${resumeData.education.length}`);
    console.log(`Skills count: ${resumeData.skills.length}`);
    console.log(`Custom sections count: ${resumeData.customSections?.length || 0}`);

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

/**
 * Transform LinkedIn profile data to resume format
 * Captures ALL available data from LinkedIn
 */
function transformLinkedInToResume(profile) {
  const createId = (prefix) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Extract bullet points from description
  const extractBulletPoints = (description) => {
    if (!description) return [];
    const lines = description.split(/[\n\r]+/);
    return lines
      .map(line => line.trim().replace(/^[•\-\*]\s*/, ''))
      .filter(line => line.length > 0 && line.length < 500);
  };

  // Parse date from various formats
  const parseDate = (dateObj) => {
    if (!dateObj) return '';
    if (typeof dateObj === 'string') return dateObj;
    if (dateObj.text) return dateObj.text;
    if (dateObj.year) {
      const month = dateObj.month ? `${dateObj.month}/` : '';
      return `${month}${dateObj.year}`;
    }
    return '';
  };

  // Parse issued date from "Issued Apr 2021" format
  const parseIssuedDate = (issuedAt) => {
    if (!issuedAt) return '';
    const match = issuedAt.match(/Issued\s+(\w+\s+\d{4})/);
    return match ? match[1] : issuedAt;
  };

  // Parse expiry date from "Issued Apr 2021 · Expired Nov 2022"
  const parseExpiryDate = (issuedAt) => {
    if (!issuedAt) return '';
    const match = issuedAt.match(/Expired\s+(\w+\s+\d{4})/);
    return match ? match[1] : '';
  };

  // Build location string from HarvestAPI format
  const locationString = profile.location?.linkedinText ||
    profile.location?.parsed?.text ||
    [profile.location?.parsed?.city, profile.location?.parsed?.country].filter(Boolean).join(', ') ||
    (typeof profile.location === 'string' ? profile.location : '') || '';

  // Get photo URL
  const photoUrl = profile.photo || profile.profilePicture?.url || '';

  // Get website from websites array
  const websites = profile.websites || [];
  const website = websites[0] || '';

  // Extract social links
  const extractSocialLinks = () => {
    const links = { github: '', twitter: '', portfolio: '' };
    for (const site of websites) {
      const siteLower = (site || '').toLowerCase();
      if (siteLower.includes('github.com')) links.github = site;
      else if (siteLower.includes('twitter.com') || siteLower.includes('x.com')) links.twitter = site;
      else if (!links.portfolio) links.portfolio = site;
    }
    return links;
  };

  const socialLinks = extractSocialLinks();

  // Track what we've mapped to identify unmapped data
  // Also include LinkedIn metadata fields that should never become custom sections
  const mappedKeys = new Set([
    // Standard resume fields we map
    'firstName', 'lastName', 'headline', 'about', 'location', 'photo', 'profilePicture',
    'linkedinUrl', 'websites', 'experience', 'education', 'skills', 'languages',
    'certifications', 'publications', 'volunteering', 'volunteer', 'honorsAndAwards',
    'awards', 'projects', 'courses', 'recommendations', 'recommendationsGiven',
    'peopleAlsoViewed', 'similarProfiles', 'id', 'profileId', 'publicIdentifier',
    // LinkedIn metadata fields that should be ignored (not useful for resumes)
    'objectUrn', 'registeredAt', 'currentPosition', 'profileTopEducation',
    'composeOptionType', 'moreProfiles', 'profileTopPosition', 'followable',
    'connectionCount', 'connectionsCount', 'followerCount', 'followersCount',
    'connectionDistance', 'premium', 'influencer', 'jobSeeker', 'openToWork',
    'backgroundImage', 'backgroundCoverImage', 'urn', 'entityUrn', 'trackingId',
    'member', 'memberUrn', 'query', 'url', 'email', 'phone', 'industry',
    'industryUrn', 'geoUrn', 'profilePictureOriginal', 'timestamp', 'scrapeTimestamp',
    'profileViews', 'articleViews', 'searchAppearances', 'postImpressions',
    'uniqueViewers', 'savedItems', 'network', 'mutualConnections', 'sharedConnections'
  ]);

  // Custom sections for unmapped data
  const customSections = [];

  // Check for recommendations and add as custom section
  if (profile.recommendations && profile.recommendations.length > 0) {
    customSections.push({
      id: createId('custom'),
      title: 'Recommendations',
      items: profile.recommendations.map((rec, idx) => ({
        id: `${createId('rec')}-${idx}`,
        content: `"${rec.text || rec.recommendation || rec}" - ${rec.recommenderName || rec.author || 'Anonymous'}`,
      })),
    });
  }

  // Check for interests/causes
  if (profile.interests && profile.interests.length > 0) {
    customSections.push({
      id: createId('custom'),
      title: 'Interests',
      items: profile.interests.map((interest, idx) => ({
        id: `${createId('int')}-${idx}`,
        content: typeof interest === 'string' ? interest : (interest.name || interest.title || JSON.stringify(interest)),
      })),
    });
  }

  // Check for causes
  if (profile.causes && profile.causes.length > 0) {
    customSections.push({
      id: createId('custom'),
      title: 'Causes',
      items: profile.causes.map((cause, idx) => ({
        id: `${createId('cause')}-${idx}`,
        content: typeof cause === 'string' ? cause : (cause.name || cause.title || JSON.stringify(cause)),
      })),
    });
  }

  // Check for organizations/associations
  if (profile.organizations && profile.organizations.length > 0) {
    customSections.push({
      id: createId('custom'),
      title: 'Organizations',
      items: profile.organizations.map((org, idx) => ({
        id: `${createId('org')}-${idx}`,
        content: typeof org === 'string' ? org : `${org.name || org.title || ''} ${org.position ? `- ${org.position}` : ''}`.trim(),
      })),
    });
  }

  // Check for test scores
  if (profile.testScores && profile.testScores.length > 0) {
    customSections.push({
      id: createId('custom'),
      title: 'Test Scores',
      items: profile.testScores.map((score, idx) => ({
        id: `${createId('score')}-${idx}`,
        content: `${score.name || score.test || ''}: ${score.score || score.result || ''} ${score.date ? `(${score.date})` : ''}`.trim(),
      })),
    });
  }

  // Check for patents
  const patents = [];
  if (profile.patents && profile.patents.length > 0) {
    profile.patents.forEach((patent) => {
      patents.push({
        id: createId('patent'),
        title: patent.title || patent.name || '',
        number: patent.patentNumber || patent.number || '',
        date: patent.issuedDate || patent.date || '',
        description: patent.description || '',
        url: patent.url || '',
      });
    });
  }

  // Capture any remaining unmapped fields as custom sections
  const unmappedData = {};
  for (const key of Object.keys(profile)) {
    if (!mappedKeys.has(key) && profile[key]) {
      const value = profile[key];
      // Skip empty arrays/objects/null
      if (Array.isArray(value) && value.length === 0) continue;
      if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) continue;

      // Only include meaningful data
      if (typeof value === 'string' && value.trim().length > 0) {
        unmappedData[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        unmappedData[key] = value;
      }
    }
  }

  // Add unmapped data as custom sections (only if it looks like useful resume content)
  for (const [key, value] of Object.entries(unmappedData)) {
    // Skip internal/metadata fields by name patterns
    if (key.startsWith('_') || key === 'error' || key === 'errorMessage') continue;
    if (/^(.*)(Urn|Id|Count|Timestamp|Query|Url|Image|Picture)$/i.test(key)) continue;
    if (/^(is|has|can|should|was|will)[A-Z]/.test(key)) continue; // Boolean flags

    // Skip values that look like metadata
    if (typeof value === 'string') {
      // Skip ISO timestamps, URLs, numeric IDs
      if (/^\d{4}-\d{2}-\d{2}T/.test(value)) continue;
      if (/^https?:\/\//.test(value)) continue;
      if (/^\d+$/.test(value) && value.length > 5) continue; // Numeric IDs
    }

    // Skip arrays of objects that look like LinkedIn metadata (have linkedinUrl, companyId, etc.)
    if (Array.isArray(value) && value.length > 0) {
      const firstItem = value[0];
      if (typeof firstItem === 'object' && firstItem !== null) {
        const itemKeys = Object.keys(firstItem);
        // Skip if it has metadata-like keys
        if (itemKeys.some(k => /^(.*)(Urn|Id|linkedinUrl|publicIdentifier)$/i.test(k))) continue;
      }
    }

    const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();

    if (Array.isArray(value)) {
      const items = value.slice(0, 10).map((item, idx) => {
        let content = '';
        if (typeof item === 'string') {
          content = item;
        } else if (item.name || item.title || item.text) {
          content = item.name || item.title || item.text;
        } else {
          // Skip items that would just be JSON blobs
          return null;
        }
        return {
          id: `${createId('item')}-${idx}`,
          content,
        };
      }).filter(Boolean);

      // Only add if we have meaningful items
      if (items.length > 0) {
        customSections.push({
          id: createId('custom'),
          title,
          items,
        });
      }
    } else if (typeof value === 'string' && value.trim().length > 0) {
      customSections.push({
        id: createId('custom'),
        title,
        items: [{
          id: createId('item'),
          content: value,
        }],
      });
    }
  }

  // Build the resume data
  return {
    version: '2.0',
    personalInfo: {
      fullName: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
      email: profile.email || '',
      phone: profile.phone || '',
      location: locationString,
      title: profile.headline || '',
      summary: profile.about || '',
      photo: photoUrl,
      linkedin: profile.linkedinUrl || '',
      github: socialLinks.github,
      portfolio: socialLinks.portfolio || website,
      twitter: socialLinks.twitter,
      website: website,
    },

    // Experience
    experience: (profile.experience || []).map((exp) => ({
      id: createId('exp'),
      company: exp.companyName || exp.company || '',
      position: exp.position || exp.title || '',
      location: exp.location || '',
      startDate: parseDate(exp.startDate),
      endDate: exp.endDate?.text === 'Present' || !exp.endDate ? 'Present' : parseDate(exp.endDate),
      current: !exp.endDate || exp.endDate?.text === 'Present',
      description: exp.description || '',
      bulletPoints: exp.description ? extractBulletPoints(exp.description) : [],
      companyUrl: exp.companyLinkedinUrl || exp.companyUrl || '',
      employmentType: exp.employmentType || undefined,
      remote: exp.workplaceType === 'Remote',
    })),

    // Education
    education: (profile.education || []).map((edu) => ({
      id: createId('edu'),
      school: edu.schoolName || edu.school || edu.institution || '',
      degree: edu.degree || edu.degreeName || '',
      field: edu.fieldOfStudy || edu.field || '',
      location: edu.location || '',
      startDate: parseDate(edu.startDate),
      endDate: parseDate(edu.endDate),
      current: false,
      gpa: edu.grade || edu.gpa || (edu.insights?.replace('Grade: ', '') || ''),
      honors: edu.honors ? [edu.honors] : [],
      coursework: edu.coursework || [],
      activities: edu.activities ? extractBulletPoints(edu.activities) : [],
      description: edu.description || '',
    })),

    // Skills - categorize intelligently
    skills: (profile.skills || []).map((skill) => {
      const skillName = skill.name || (typeof skill === 'string' ? skill : '');
      return {
        id: createId('skill'),
        name: skillName,
        level: skill.endorsementCount ? Math.min(5, Math.ceil(skill.endorsementCount / 20)) : undefined,
        category: categorizeSkill(skillName),
      };
    }),

    // Languages
    languages: (profile.languages || []).map((lang) => ({
      id: createId('lang'),
      language: lang.name || (typeof lang === 'string' ? lang : ''),
      proficiency: mapLanguageProficiency(lang.proficiency),
    })),

    // Certifications
    certifications: (profile.certifications || []).map((cert) => ({
      id: createId('cert'),
      name: cert.title || cert.name || '',
      issuer: cert.issuedBy || cert.authority || cert.issuer || '',
      date: parseIssuedDate(cert.issuedAt) || cert.date || '',
      expiryDate: parseExpiryDate(cert.issuedAt) || cert.expiryDate || '',
      credentialId: cert.credentialId || '',
      url: cert.url || cert.credentialUrl || '',
    })),

    // Publications
    publications: (profile.publications || []).map((pub) => ({
      id: createId('pub'),
      title: pub.title || '',
      publisher: pub.publisher || extractPublisher(pub.publishedAt),
      date: pub.date || extractPublishedDate(pub.publishedAt),
      url: pub.link || pub.url || '',
      description: pub.description || '',
    })),

    // Volunteer
    volunteer: (profile.volunteering || profile.volunteer || []).map((vol) => ({
      id: createId('vol'),
      organization: vol.organization || vol.companyName || vol.company || '',
      role: vol.role || vol.position || vol.title || '',
      cause: vol.cause || '',
      startDate: parseDate(vol.startDate),
      endDate: parseDate(vol.endDate),
      current: !vol.endDate || vol.endDate?.text === 'Present',
      description: vol.description || '',
      highlights: vol.description ? extractBulletPoints(vol.description) : [],
    })),

    // Awards
    awards: (profile.honorsAndAwards || profile.awards || []).map((honor) => ({
      id: createId('award'),
      title: honor.title || honor.name || '',
      issuer: honor.issuer || honor.issuedBy || '',
      date: honor.issuedAt || honor.date || '',
      description: honor.description || '',
    })),

    // Projects
    projects: (profile.projects || []).map((proj) => ({
      id: createId('proj'),
      name: proj.title || proj.name || '',
      description: proj.description || '',
      startDate: parseDate(proj.startDate),
      endDate: parseDate(proj.endDate),
      url: proj.link || proj.url || '',
      technologies: proj.technologies || [],
      techStack: [],
      highlights: proj.description ? extractBulletPoints(proj.description) : [],
    })),

    // Courses
    courses: (profile.courses || []).map((course) => ({
      id: createId('course'),
      name: course.name || course.title || '',
      provider: course.associatedWith || course.provider || course.institution || '',
      date: course.date || '',
      number: course.number || '',
      certificate: false,
      description: '',
    })),

    // Patents
    patents: patents,

    // Interests (if any captured)
    interests: (profile.interests || []).map((interest) => ({
      id: createId('interest'),
      name: typeof interest === 'string' ? interest : (interest.name || interest.title || ''),
    })),

    // Empty sections that might be filled later
    achievements: [],
    strengths: [],
    speaking: [],
    references: [],

    // Custom sections for unmapped data
    customSections: customSections,

    settings: {
      includeSocialLinks: true,
      includePhoto: !!photoUrl,
      dateFormat: 'MMM YYYY',
    },
  };
}

/**
 * Categorize skill into appropriate category
 */
function categorizeSkill(skillName) {
  const skillLower = (skillName || '').toLowerCase();

  // Programming languages
  if (['javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'golang', 'rust', 'swift',
       'kotlin', 'typescript', 'php', 'scala', 'r', 'matlab', 'perl', 'c'].some(s => skillLower.includes(s))) {
    return 'Programming';
  }

  // Frontend
  if (['react', 'vue', 'angular', 'html', 'css', 'sass', 'less', 'tailwind', 'bootstrap',
       'jquery', 'frontend', 'front-end', 'ui', 'ux', 'web design'].some(s => skillLower.includes(s))) {
    return 'Frontend';
  }

  // Backend
  if (['node', 'express', 'django', 'flask', 'spring', 'rails', 'laravel', 'backend',
       'back-end', 'api', 'rest', 'graphql', 'microservice'].some(s => skillLower.includes(s))) {
    return 'Backend';
  }

  // Database
  if (['sql', 'mysql', 'postgres', 'mongodb', 'redis', 'elasticsearch', 'database', 'db',
       'oracle', 'cassandra', 'dynamodb'].some(s => skillLower.includes(s))) {
    return 'Database';
  }

  // Cloud/DevOps
  if (['aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'jenkins', 'ci/cd',
       'terraform', 'devops', 'cloud', 'linux', 'unix'].some(s => skillLower.includes(s))) {
    return 'Cloud & DevOps';
  }

  // Data/AI
  if (['machine learning', 'ml', 'ai', 'artificial intelligence', 'data science', 'deep learning',
       'tensorflow', 'pytorch', 'pandas', 'numpy', 'data analysis', 'analytics'].some(s => skillLower.includes(s))) {
    return 'Data & AI';
  }

  // Leadership/Management
  if (['leadership', 'management', 'team lead', 'project management', 'agile', 'scrum',
       'strategy', 'mentoring', 'coaching'].some(s => skillLower.includes(s))) {
    return 'Leadership';
  }

  // Business
  if (['business', 'marketing', 'sales', 'entrepreneurship', 'finance', 'accounting',
       'consulting', 'strategy'].some(s => skillLower.includes(s))) {
    return 'Business';
  }

  return 'Technical';
}

/**
 * Map LinkedIn language proficiency to our format
 */
function mapLanguageProficiency(proficiency) {
  if (!proficiency) return 'Intermediate';

  const profLower = proficiency.toLowerCase();

  if (profLower.includes('native') || profLower.includes('bilingual')) return 'Native';
  if (profLower.includes('full professional') || profLower.includes('fluent')) return 'Fluent';
  if (profLower.includes('professional')) return 'Professional';
  if (profLower.includes('limited') || profLower.includes('working')) return 'Intermediate';
  if (profLower.includes('elementary') || profLower.includes('basic')) return 'Basic';

  return 'Intermediate';
}

/**
 * Extract publisher from "Analytics Vidhya · Mar 10, 2020" format
 */
function extractPublisher(publishedAt) {
  if (!publishedAt) return '';
  const parts = publishedAt.split('·');
  return parts.length > 0 ? parts[0].trim() : '';
}

/**
 * Extract date from "Analytics Vidhya · Mar 10, 2020" format
 */
function extractPublishedDate(publishedAt) {
  if (!publishedAt) return '';
  const parts = publishedAt.split('·');
  return parts.length > 1 ? parts[1].trim() : '';
}
