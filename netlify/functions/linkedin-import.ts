import type { Handler, HandlerEvent } from "@netlify/functions";

interface LinkedInImportRequest {
  linkedinUrl: string;
}

interface ApifyResponse {
  id?: string;
  publicIdentifier?: string;
  linkedInUrl?: string;
  firstName?: string;
  lastName?: string;
  headline?: string;
  about?: string;
  location?: {
    city?: string;
    country?: string;
    full?: string;
  };
  photoUrl?: string;
  positions?: Array<{
    title?: string;
    companyName?: string;
    companyUrl?: string;
    location?: string;
    startDate?: { month?: number; year?: number };
    endDate?: { month?: number; year?: number };
    description?: string;
    current?: boolean;
  }>;
  educations?: Array<{
    schoolName?: string;
    schoolUrl?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: { year?: number };
    endDate?: { year?: number };
    description?: string;
    activities?: string;
    grade?: string;
  }>;
  skills?: Array<{
    name?: string;
    endorsementCount?: number;
  }>;
  languages?: Array<{
    name?: string;
    proficiency?: string;
  }>;
  certifications?: Array<{
    name?: string;
    authority?: string;
    startDate?: { month?: number; year?: number };
    endDate?: { month?: number; year?: number };
    licenseNumber?: string;
    url?: string;
  }>;
  publications?: Array<{
    name?: string;
    publisher?: string;
    date?: { month?: number; year?: number };
    url?: string;
    description?: string;
  }>;
  volunteerExperiences?: Array<{
    role?: string;
    companyName?: string;
    startDate?: { month?: number; year?: number };
    endDate?: { month?: number; year?: number };
    description?: string;
    cause?: string;
  }>;
  honors?: Array<{
    title?: string;
    issuer?: string;
    issueDate?: { month?: number; year?: number };
    description?: string;
  }>;
  projects?: Array<{
    title?: string;
    description?: string;
    startDate?: { month?: number; year?: number };
    endDate?: { month?: number; year?: number };
    url?: string;
    members?: string[];
  }>;
  courses?: Array<{
    name?: string;
    number?: string;
  }>;
}

// Allowed origins for CORS
const allowedOrigins = [
  "https://resumecook.com",
  "https://www.resumecook.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
];

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const corsHeaders = {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Get Apify API token from environment
  const apifyToken = process.env.APIFY_API_TOKEN;

  // Debug: Log environment variable status
  console.log("APIFY_API_TOKEN present:", !!apifyToken);
  console.log("APIFY_API_TOKEN length:", apifyToken?.length || 0);

  if (!apifyToken) {
    console.error("APIFY_API_TOKEN not configured");
    console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('APIFY') || k.includes('API')));
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "LinkedIn import service not configured" }),
    };
  }

  // Parse request body
  let requestData: LinkedInImportRequest;
  try {
    requestData = JSON.parse(event.body || "{}");
  } catch (error) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const { linkedinUrl } = requestData;

  // Validate LinkedIn URL
  if (!linkedinUrl) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "LinkedIn URL is required" }),
    };
  }

  // Basic LinkedIn URL validation
  const linkedinUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
  if (!linkedinUrlPattern.test(linkedinUrl)) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Invalid LinkedIn URL format. Expected: https://www.linkedin.com/in/username"
      }),
    };
  }

  try {
    // Call Apify LinkedIn Profile Scraper API
    const apifyEndpoint = "https://api.apify.com/v2/acts/harvestapi~linkedin-profile-scraper/run-sync-get-dataset-items";

    const apifyResponse = await fetch(`${apifyEndpoint}?token=${apifyToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileScraperMode: "Profile details no email ($4 per 1k)",
        queries: [linkedinUrl],
      }),
    });

    if (!apifyResponse.ok) {
      const errorText = await apifyResponse.text();
      console.error("Apify API error:", apifyResponse.status, errorText);
      return {
        statusCode: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Failed to fetch LinkedIn profile. Please try again later.",
          details: apifyResponse.status === 402 ? "API quota exceeded" : undefined,
        }),
      };
    }

    const apifyData = await apifyResponse.json();

    // Debug: Log the raw API response to see actual field names
    console.log("=== APIFY RAW RESPONSE ===");
    console.log("Type:", typeof apifyData);
    console.log("Is Array:", Array.isArray(apifyData));
    console.log("Length:", apifyData?.length);
    if (apifyData && apifyData[0]) {
      console.log("First item keys:", Object.keys(apifyData[0]));
      console.log("Experience fields check:");
      console.log("  - positions:", apifyData[0].positions);
      console.log("  - experience:", apifyData[0].experience);
      console.log("  - workExperience:", apifyData[0].workExperience);
      console.log("Education fields check:");
      console.log("  - educations:", apifyData[0].educations);
      console.log("  - education:", apifyData[0].education);
    }
    console.log("=== END RAW RESPONSE ===");

    if (!apifyData || apifyData.length === 0) {
      return {
        statusCode: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Could not find LinkedIn profile. Please check the URL and try again."
        }),
      };
    }

    const profileData = apifyData[0];

    // Transform to V2ResumeData format
    const resumeData = transformLinkedInToResumeData(profileData);

    // Also return raw data for debugging
    console.log("Transformed resume data - experience count:", resumeData.experience.length);
    console.log("Transformed resume data - education count:", resumeData.education.length);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        data: resumeData,
        linkedinProfile: {
          name: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
          photoUrl: profileData.photoUrl,
          linkedInUrl: profileData.linkedInUrl,
        },
      }),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("LinkedIn import error:", errorMessage);

    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to import LinkedIn profile",
        details: errorMessage,
      }),
    };
  }
};

// Transform LinkedIn data to V2ResumeData format
// Based on actual Apify HarvestAPI response structure
function transformLinkedInToResumeData(profile: any) {
  const createId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Extract bullet points from description
  const extractBulletPoints = (description?: string): string[] => {
    if (!description) return [];
    const lines = description.split(/[\n\r]+|(?:^|\s)[•\-\*]\s*/);
    return lines
      .map(line => line.trim())
      .filter(line => line.length > 0 && line.length < 500);
  };

  // Parse date from "Issued Apr 2021" or similar format
  const parseIssuedDate = (issuedAt?: string): string => {
    if (!issuedAt) return '';
    // Extract "Apr 2021" from "Issued Apr 2021" or "Issued Apr 2021 · Expired Nov 2022"
    const match = issuedAt.match(/Issued\s+(\w+\s+\d{4})/);
    return match ? match[1] : '';
  };

  // Parse expiry date from "Issued Apr 2021 · Expired Nov 2022"
  const parseExpiryDate = (issuedAt?: string): string => {
    if (!issuedAt) return '';
    const match = issuedAt.match(/Expired\s+(\w+\s+\d{4})/);
    return match ? match[1] : '';
  };

  // Parse published date from "Analytics Vidhya · Mar 10, 2020"
  const parsePublishedDate = (publishedAt?: string): string => {
    if (!publishedAt) return '';
    const parts = publishedAt.split('·');
    return parts.length > 1 ? parts[1].trim() : '';
  };

  // Parse publisher from "Analytics Vidhya · Mar 10, 2020"
  const parsePublisher = (publishedAt?: string): string => {
    if (!publishedAt) return '';
    const parts = publishedAt.split('·');
    return parts.length > 0 ? parts[0].trim() : '';
  };

  // Build location string
  const locationString = profile.location?.linkedinText ||
    profile.location?.parsed?.text ||
    [profile.location?.parsed?.city, profile.location?.parsed?.country].filter(Boolean).join(', ') || '';

  // Get photo URL
  const photoUrl = profile.photo || profile.profilePicture?.url || '';

  // Get website from websites array
  const website = profile.websites?.[0] || '';

  return {
    version: '2.0' as const,
    personalInfo: {
      fullName: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
      email: '', // Not provided by API without email search mode
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
    // Map experience - note: field is 'experience' not 'positions', and job title is 'position' not 'title'
    experience: (profile.experience || []).map((exp: any) => ({
      id: createId('exp'),
      company: exp.companyName || '',
      position: exp.position || '', // Job title is in 'position' field
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
    // Map education - field is 'education' not 'educations'
    education: (profile.education || []).map((edu: any) => ({
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
    skills: (profile.skills || []).map((skill: any) => ({
      id: createId('skill'),
      name: skill.name || '',
      level: undefined,
      category: 'Technical',
    })),
    // Map languages
    languages: (profile.languages || []).map((lang: any) => ({
      id: createId('lang'),
      language: lang.name || lang,
      proficiency: 'Intermediate' as const,
    })),
    // Map certifications - uses 'title' and 'issuedBy' and 'issuedAt'
    certifications: (profile.certifications || []).map((cert: any) => ({
      id: createId('cert'),
      name: cert.title || '',
      issuer: cert.issuedBy || '',
      date: parseIssuedDate(cert.issuedAt),
      expiryDate: parseExpiryDate(cert.issuedAt),
      credentialId: '',
      url: '',
    })),
    // Map publications - uses 'title', 'publishedAt', 'link'
    publications: (profile.publications || []).map((pub: any) => ({
      id: createId('pub'),
      title: pub.title || '',
      publisher: parsePublisher(pub.publishedAt),
      date: parsePublishedDate(pub.publishedAt),
      url: pub.link || '',
      description: pub.description || '',
    })),
    // Map volunteer work - field is 'volunteering'
    volunteer: (profile.volunteering || []).map((vol: any) => ({
      id: createId('vol'),
      organization: vol.organization || vol.companyName || '',
      role: vol.role || vol.position || '',
      startDate: vol.startDate?.text || '',
      endDate: vol.endDate?.text || '',
      current: false,
      description: vol.description || '',
      highlights: [],
    })),
    // Map honors/awards - field is 'honorsAndAwards'
    awards: (profile.honorsAndAwards || []).map((honor: any) => ({
      id: createId('award'),
      title: honor.title || '',
      issuer: honor.issuer || '',
      date: honor.issuedAt || '',
      description: honor.description || '',
    })),
    // Map projects
    projects: (profile.projects || []).map((proj: any) => ({
      id: createId('proj'),
      name: proj.title || '',
      description: proj.description || '',
      startDate: proj.startDate?.text || '',
      endDate: proj.endDate?.text || '',
      url: proj.link || '',
      technologies: [],
      techStack: [],
      highlights: [],
    })),
    // Map courses
    courses: (profile.courses || []).map((course: any) => ({
      id: createId('course'),
      name: course.name || course.title || '',
      provider: course.provider || '',
      date: '',
      certificate: false,
      description: '',
    })),
    settings: {
      includeSocialLinks: true,
      includePhoto: !!photoUrl,
      dateFormat: 'MMM YYYY' as const,
    },
  };
}

export { handler };
