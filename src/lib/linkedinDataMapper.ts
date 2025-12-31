/**
 * LinkedIn Data Mapper - Production Ready
 *
 * Transforms Bright Data LinkedIn profile response into V2ResumeData format.
 * Comprehensive mapping of ALL available LinkedIn fields to resume sections.
 *
 * This mapper is designed to extract maximum value from the LinkedIn API response,
 * similar to how EnhanceCV handles LinkedIn imports.
 */

import type {
  V2ResumeData,
  ExperienceItem,
  EducationItem,
  SkillItem,
  CertificationItem,
  ProjectItem,
  PublicationItem,
  LanguageItem,
  AwardItem,
  VolunteerItem,
} from "@/v2/types/resumeData";
import { createItemId } from "@/v2/types/resumeData";

// ============================================================================
// BRIGHT DATA RESPONSE TYPES (Based on actual API response)
// ============================================================================

interface BrightDataEducation {
  title?: string;                    // School name (e.g., "QIS College of Engineering & Technology")
  subtitle?: string;                 // Degree info (e.g., "BTech - Bachelor of Technology, Mechanical Engineering")
  start_year?: string;
  end_year?: string;
  date_range?: string;               // e.g., "2011 - 2015"
  description?: string;              // Additional details, activities, honors
  description_html?: string;
  institute_logo_url?: string | null;
  field_of_study?: string;
  degree?: string;
  grade?: string;
  activities_and_societies?: string;
}

interface BrightDataExperience {
  title?: string;                    // Job title
  subtitle?: string;                 // Company name
  company?: string;                  // Alternative company field
  company_name?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  date_range?: string;               // e.g., "Jan 2020 - Present"
  duration?: string;                 // e.g., "3 yrs 2 mos"
  description?: string;
  description_html?: string;
  employment_type?: string;          // Full-time, Part-time, etc.
  is_current?: boolean;
}

interface BrightDataCertification {
  title?: string;                    // Certificate name
  subtitle?: string;                 // Issuer (e.g., "HackerRank")
  issuing_organization?: string;
  meta?: string;                     // Contains "Issued Apr 2021 · Expires Nov 2022 · Credential ID xxx"
  credential_url?: string;
  credential_id?: string;
  issue_date?: string;
  expiration_date?: string;
}

interface BrightDataPublication {
  title?: string;
  subtitle?: string;                 // Publisher
  publisher?: string;
  date?: string;                     // e.g., "March 10, 2020"
  description?: string;
  url?: string;
  authors?: string[];
}

interface BrightDataProject {
  title?: string;
  subtitle?: string;                 // Associated with (company/education)
  start_date?: string;
  end_date?: string;
  date_range?: string;               // e.g., "Mar 2020 - Apr 2020"
  description?: string;
  description_html?: string;
  url?: string;
  associated_with?: string;
}

interface BrightDataLanguage {
  title?: string;                    // Language name
  subtitle?: string;                 // Proficiency level
  proficiency?: string;
}

interface BrightDataHonorAward {
  title?: string;
  subtitle?: string;                 // Issuer
  issuer?: string;
  date?: string;
  description?: string;
}

interface BrightDataVolunteer {
  title?: string;                    // Role
  subtitle?: string;                 // Organization
  organization?: string;
  start_date?: string;
  end_date?: string;
  date_range?: string;
  description?: string;
  cause?: string;
}

interface BrightDataSkill {
  title?: string;
  name?: string;
  endorsements?: number;
}

interface BrightDataCurrentCompany {
  location?: string | null;
  name?: string;
  title?: string;
}

export interface BrightDataProfile {
  // Identity
  id?: string;
  linkedin_id?: string;
  linkedin_num_id?: string;
  public_identifier?: string;

  // Basic info
  name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  headline?: string;                 // Professional headline

  // Location
  city?: string;
  location?: string;
  country?: string;
  country_code?: string;

  // Professional
  about?: string;
  summary?: string;
  current_company?: BrightDataCurrentCompany;
  current_company_name?: string;
  current_job_title?: string;

  // Media
  avatar?: string;
  profile_picture?: string;
  profile_pic_url?: string;
  banner_image?: string;
  default_avatar?: boolean;

  // URLs
  url?: string;
  input_url?: string;
  linkedin_url?: string;

  // Stats
  followers?: number;
  connections?: number;
  recommendations_count?: number;

  // Content sections - ALL possible fields
  education?: BrightDataEducation[];
  educations_details?: string;
  experience?: BrightDataExperience[] | null;
  experiences?: BrightDataExperience[];
  certifications?: BrightDataCertification[];
  publications?: BrightDataPublication[];
  projects?: BrightDataProject[];
  skills?: BrightDataSkill[] | string[];
  languages?: BrightDataLanguage[] | string[];
  honors_and_awards?: BrightDataHonorAward[] | null;
  volunteer?: BrightDataVolunteer[];
  volunteer_experience?: BrightDataVolunteer[];
  recommendations?: string[];
  courses?: any[];

  // Other
  posts?: any[];
  activity?: any[];
  people_also_viewed?: any[];
  similar_profiles?: any[];
  bio_links?: any[];
  websites?: string[];
  memorialized_account?: boolean;

  // Timestamp
  timestamp?: string;

  // Input data
  input?: {
    url?: string;
  };
}

// ============================================================================
// DATE PARSING - Comprehensive
// ============================================================================

const MONTH_MAP: Record<string, string> = {
  jan: "01", january: "01",
  feb: "02", february: "02",
  mar: "03", march: "03",
  apr: "04", april: "04",
  may: "05",
  jun: "06", june: "06",
  jul: "07", july: "07",
  aug: "08", august: "08",
  sep: "09", september: "09", sept: "09",
  oct: "10", october: "10",
  nov: "11", november: "11",
  dec: "12", december: "12",
};

/**
 * Parse various date formats to YYYY-MM format
 */
export function parseLinkedInDate(date?: string | null): string {
  if (!date) return "";

  const trimmed = date.trim();

  // Already in YYYY-MM format
  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  // Just year (e.g., "2015")
  if (/^\d{4}$/.test(trimmed)) {
    return `${trimmed}-01`;
  }

  // Month Year format (e.g., "Mar 2020", "March 2020")
  const monthYearMatch = trimmed.match(
    /^(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{4})$/i
  );
  if (monthYearMatch) {
    const monthKey = monthYearMatch[1].toLowerCase().slice(0, 3);
    const month = MONTH_MAP[monthKey] || "01";
    const year = monthYearMatch[2];
    return `${year}-${month}`;
  }

  // ISO date format (2020-01-15)
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}`;
  }

  // Date format like "January 15, 2020" or "March 10, 2020"
  const fullDateMatch = trimmed.match(
    /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},?\s+(\d{4})/i
  );
  if (fullDateMatch) {
    const monthKey = fullDateMatch[1].toLowerCase().slice(0, 3);
    const month = MONTH_MAP[monthKey] || "01";
    const year = fullDateMatch[2];
    return `${year}-${month}`;
  }

  // MM/YYYY or M/YYYY format
  const slashMatch = trimmed.match(/^(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const month = slashMatch[1].padStart(2, '0');
    return `${slashMatch[2]}-${month}`;
  }

  return "";
}

/**
 * Parse date range string like "2011 - 2015" or "Jan 2020 - Present"
 */
function parseDateRange(dateRange?: string): { startDate: string; endDate: string; isCurrent: boolean } {
  const result = { startDate: "", endDate: "", isCurrent: false };
  if (!dateRange) return result;

  const trimmed = dateRange.trim();

  // Check for "Present" or "current"
  result.isCurrent = /present|current|now/i.test(trimmed);

  // Split by common separators
  const parts = trimmed.split(/\s*[-–—·]\s*/);

  if (parts.length >= 1) {
    result.startDate = parseLinkedInDate(parts[0]);
  }
  if (parts.length >= 2 && !result.isCurrent) {
    result.endDate = parseLinkedInDate(parts[1]);
  }

  return result;
}

// ============================================================================
// TEXT PROCESSING
// ============================================================================

/**
 * Extract bullet points from a description text
 */
export function extractBulletPoints(description?: string | null): string[] {
  if (!description || typeof description !== "string") return [];

  const trimmed = description.trim();
  if (!trimmed) return [];

  // First, try to split by newlines
  let lines = trimmed.split(/[\n\r]+/).map(line => line.trim());

  // Remove bullet characters from beginning of lines
  lines = lines.map(line =>
    line.replace(/^[•·●○■□▪▫–—-]\s*/, '').replace(/^\d+\.\s*/, '').trim()
  ).filter(line => line.length > 5);

  // If we got good results, return them
  if (lines.length > 1) {
    return lines.slice(0, 8);
  }

  // If single block of text, try to split by sentences
  if (trimmed.length > 50) {
    const sentences = trimmed
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 15 && s.length < 500);

    if (sentences.length > 1) {
      return sentences.slice(0, 6);
    }
  }

  // Return the original if it's meaningful
  if (trimmed.length > 20) {
    return [trimmed];
  }

  return [];
}

/**
 * Clean and process about/summary text
 */
function cleanAboutText(about?: string): string {
  if (!about) return "";

  let cleaned = about.trim();

  // Remove trailing ellipsis
  if (cleaned.endsWith("…")) {
    cleaned = cleaned.slice(0, -1).trim();
  }

  // Remove "see more" type text
  cleaned = cleaned.replace(/\s*see more\.?$/i, '').trim();

  return cleaned;
}

/**
 * Parse education subtitle to extract degree and field
 * Examples:
 *   "BTech - Bachelor of Technology, Mechanical Engineering"
 *   "Master of Science in Computer Science"
 *   "Bachelor of Arts, Economics"
 */
function parseEducationSubtitle(subtitle?: string): { degree: string; field: string } {
  const result = { degree: "", field: "" };
  if (!subtitle) return result;

  const trimmed = subtitle.trim();

  // Pattern: "Degree - Full Degree Name, Field"
  const dashPattern = trimmed.match(/^([^-]+)\s*-\s*([^,]+),?\s*(.*)$/);
  if (dashPattern) {
    result.degree = `${dashPattern[1].trim()} - ${dashPattern[2].trim()}`;
    result.field = dashPattern[3]?.trim() || "";
    return result;
  }

  // Pattern: "Degree, Field" or "Degree in Field"
  const commaPattern = trimmed.match(/^([^,]+),\s*(.+)$/);
  if (commaPattern) {
    result.degree = commaPattern[1].trim();
    result.field = commaPattern[2].trim();
    return result;
  }

  const inPattern = trimmed.match(/^(.+?)\s+in\s+(.+)$/i);
  if (inPattern) {
    result.degree = inPattern[1].trim();
    result.field = inPattern[2].trim();
    return result;
  }

  // Just the degree
  result.degree = trimmed;
  return result;
}

/**
 * Parse certification meta field to extract date, expiry, and credential ID
 * Example: "Issued Apr 2021 · Expires Nov 2022 · Credential ID ABC123"
 */
function parseCertificationMeta(meta?: string): { date: string; expiryDate: string; credentialId: string } {
  const result = { date: "", expiryDate: "", credentialId: "" };
  if (!meta) return result;

  // Extract "Issued Apr 2021" or "Issued April 2021"
  const issuedMatch = meta.match(/Issued\s+((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4})/i);
  if (issuedMatch) {
    result.date = parseLinkedInDate(issuedMatch[1]);
  }

  // Extract "Expires Nov 2022"
  const expiresMatch = meta.match(/Expires\s+((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4})/i);
  if (expiresMatch) {
    result.expiryDate = parseLinkedInDate(expiresMatch[1]);
  }

  // Extract "Credential ID xxx"
  const credentialMatch = meta.match(/Credential ID\s+([^\s·]+)/i);
  if (credentialMatch) {
    result.credentialId = credentialMatch[1].trim();
  }

  return result;
}

// ============================================================================
// FIELD EXTRACTION HELPERS
// ============================================================================

function extractName(profile: BrightDataProfile): string {
  if (profile.full_name) return profile.full_name;
  if (profile.name) return profile.name;
  if (profile.first_name || profile.last_name) {
    return [profile.first_name, profile.last_name].filter(Boolean).join(" ");
  }
  return "";
}

function extractTitle(profile: BrightDataProfile): string {
  // Use headline first (most accurate)
  if (profile.headline) {
    return profile.headline.replace(/…$/, '').trim();
  }

  // Try current job title
  if (profile.current_job_title) {
    return profile.current_job_title;
  }

  // Try current_company title
  if (profile.current_company?.title) {
    return profile.current_company.title;
  }

  return "";
}

function extractLocation(profile: BrightDataProfile): string {
  // Prefer full location string
  if (profile.location) return profile.location;

  // Build from parts
  const parts = [profile.city, profile.country].filter(Boolean);
  if (parts.length > 0) return parts.join(", ");

  return "";
}

function extractSummary(profile: BrightDataProfile): string {
  // Try about first, then summary
  if (profile.about) return cleanAboutText(profile.about);
  if (profile.summary) return cleanAboutText(profile.summary);
  return "";
}

function extractPhoto(profile: BrightDataProfile): string | undefined {
  // Check if avatar is default/placeholder
  if (profile.default_avatar) return undefined;

  // Try various photo fields
  const photo = profile.avatar || profile.profile_picture || profile.profile_pic_url;

  // Validate it's not a default avatar URL
  if (photo && !photo.includes('ghost') && !photo.includes('default')) {
    return photo;
  }

  return undefined;
}

function extractLinkedInUrl(profile: BrightDataProfile): string {
  if (profile.url) return profile.url;
  if (profile.linkedin_url) return profile.linkedin_url;
  if (profile.input_url) return profile.input_url;
  if (profile.public_identifier) return `https://www.linkedin.com/in/${profile.public_identifier}`;
  if (profile.linkedin_id) return `https://www.linkedin.com/in/${profile.linkedin_id}`;
  if (profile.id) return `https://www.linkedin.com/in/${profile.id}`;
  return "";
}

function extractWebsite(profile: BrightDataProfile): string | undefined {
  if (profile.websites && profile.websites.length > 0) {
    return profile.websites[0];
  }
  if (profile.bio_links && profile.bio_links.length > 0) {
    const link = profile.bio_links[0];
    return typeof link === 'string' ? link : link?.url;
  }
  return undefined;
}

// ============================================================================
// SECTION MAPPERS - Comprehensive
// ============================================================================

function mapExperience(experience?: BrightDataExperience[] | null): ExperienceItem[] {
  if (!experience || !Array.isArray(experience)) return [];

  return experience
    .filter(exp => exp.title || exp.subtitle || exp.company)
    .map((exp, index) => {
      // Parse dates from various sources
      let startDate = "";
      let endDate = "";
      let isCurrent = exp.is_current || false;

      if (exp.date_range) {
        const parsed = parseDateRange(exp.date_range);
        startDate = parsed.startDate;
        endDate = parsed.endDate;
        isCurrent = isCurrent || parsed.isCurrent;
      } else {
        startDate = parseLinkedInDate(exp.start_date);
        endDate = parseLinkedInDate(exp.end_date);
      }

      // Get company name from various fields
      const company = exp.subtitle || exp.company || exp.company_name || "";

      return {
        id: createItemId(`exp-import-${index}`),
        company,
        position: exp.title || "",
        location: exp.location || "",
        startDate,
        endDate,
        current: isCurrent,
        description: exp.description || "",
        bulletPoints: extractBulletPoints(exp.description),
        employmentType: exp.employment_type as any,
      };
    });
}

function mapEducation(education?: BrightDataEducation[]): EducationItem[] {
  if (!education || !Array.isArray(education)) return [];

  return education
    .filter(edu => edu.title)
    .map((edu, index) => {
      // Parse dates
      let startDate = "";
      let endDate = "";

      if (edu.date_range) {
        const parsed = parseDateRange(edu.date_range);
        startDate = parsed.startDate;
        endDate = parsed.endDate;
      } else {
        startDate = parseLinkedInDate(edu.start_year);
        endDate = parseLinkedInDate(edu.end_year);
      }

      // Parse degree and field from subtitle or separate fields
      let degree = edu.degree || "";
      let field = edu.field_of_study || "";

      if (!degree && edu.subtitle) {
        const parsed = parseEducationSubtitle(edu.subtitle);
        degree = parsed.degree;
        field = field || parsed.field;
      }

      // Build description from various fields
      const descParts: string[] = [];
      if (edu.grade) descParts.push(`Grade: ${edu.grade}`);
      if (edu.activities_and_societies) descParts.push(edu.activities_and_societies);
      if (edu.description) descParts.push(edu.description);
      const description = descParts.join('\n');

      return {
        id: createItemId(`edu-import-${index}`),
        school: edu.title || "",
        degree,
        field,
        location: "",
        startDate,
        endDate,
        gpa: edu.grade || "",
        description,
      };
    });
}

function mapCertifications(certifications?: BrightDataCertification[]): CertificationItem[] {
  if (!certifications || !Array.isArray(certifications)) return [];

  return certifications
    .filter(cert => cert.title)
    .map((cert, index) => {
      // Parse meta for date info
      const metaData = parseCertificationMeta(cert.meta);

      // Use direct fields if available, fallback to parsed meta
      const date = cert.issue_date ? parseLinkedInDate(cert.issue_date) : metaData.date;
      const expiryDate = cert.expiration_date ? parseLinkedInDate(cert.expiration_date) : metaData.expiryDate;
      const credentialId = cert.credential_id || metaData.credentialId;

      return {
        id: createItemId(`cert-import-${index}`),
        name: cert.title || "",
        issuer: cert.subtitle || cert.issuing_organization || "",
        date,
        expiryDate,
        credentialId,
        url: cert.credential_url || "",
      };
    });
}

function mapPublications(publications?: BrightDataPublication[]): PublicationItem[] {
  if (!publications || !Array.isArray(publications)) return [];

  return publications
    .filter(pub => pub.title)
    .map((pub, index) => {
      const date = parseLinkedInDate(pub.date);

      return {
        id: createItemId(`pub-import-${index}`),
        title: pub.title || "",
        publisher: pub.subtitle || pub.publisher || "",
        date,
        description: pub.description || "",
        url: pub.url,
        authors: pub.authors,
      };
    });
}

function mapProjects(projects?: BrightDataProject[]): ProjectItem[] {
  if (!projects || !Array.isArray(projects)) return [];

  return projects
    .filter(proj => proj.title)
    .map((proj, index) => {
      // Parse dates
      let startDate = "";
      let endDate = "";

      if (proj.date_range) {
        const parsed = parseDateRange(proj.date_range);
        startDate = parsed.startDate;
        endDate = parsed.endDate;
      } else {
        startDate = parseLinkedInDate(proj.start_date);
        endDate = parseLinkedInDate(proj.end_date);
      }

      // Extract technologies from description
      const technologies = extractTechnologiesFromText(proj.description);

      return {
        id: createItemId(`proj-import-${index}`),
        name: proj.title || "",
        description: proj.description || "",
        role: proj.associated_with || proj.subtitle || "",
        startDate,
        endDate,
        technologies,
        url: proj.url || "",
        highlights: extractBulletPoints(proj.description),
      };
    });
}

function mapLanguages(languages?: BrightDataLanguage[] | string[]): LanguageItem[] {
  if (!languages || !Array.isArray(languages)) return [];

  return languages
    .map((lang, index) => {
      if (typeof lang === 'string') {
        return {
          id: createItemId(`lang-import-${index}`),
          language: lang,
          proficiency: "Professional" as const,
        };
      }

      // Map proficiency levels
      const proficiencyMap: Record<string, any> = {
        'native': 'Native',
        'native or bilingual': 'Native',
        'bilingual': 'Native',
        'full professional': 'Fluent',
        'professional working': 'Professional',
        'professional': 'Professional',
        'limited working': 'Intermediate',
        'elementary': 'Basic',
        'basic': 'Basic',
      };

      const rawProficiency = (lang.subtitle || lang.proficiency || '').toLowerCase();
      const proficiency = proficiencyMap[rawProficiency] || 'Intermediate';

      return {
        id: createItemId(`lang-import-${index}`),
        language: lang.title || "",
        proficiency,
      };
    })
    .filter(lang => lang.language);
}

function mapAwards(awards?: BrightDataHonorAward[] | null): AwardItem[] {
  if (!awards || !Array.isArray(awards)) return [];

  return awards
    .filter(award => award.title)
    .map((award, index) => {
      const date = parseLinkedInDate(award.date);

      return {
        id: createItemId(`award-import-${index}`),
        title: award.title || "",
        issuer: award.subtitle || award.issuer || "",
        date,
        description: award.description || "",
      };
    });
}

function mapVolunteer(volunteer?: BrightDataVolunteer[]): VolunteerItem[] {
  if (!volunteer || !Array.isArray(volunteer)) return [];

  return volunteer
    .filter(vol => vol.title || vol.subtitle)
    .map((vol, index) => {
      let startDate = "";
      let endDate = "";
      let isCurrent = false;

      if (vol.date_range) {
        const parsed = parseDateRange(vol.date_range);
        startDate = parsed.startDate;
        endDate = parsed.endDate;
        isCurrent = parsed.isCurrent;
      } else {
        startDate = parseLinkedInDate(vol.start_date);
        endDate = parseLinkedInDate(vol.end_date);
      }

      return {
        id: createItemId(`vol-import-${index}`),
        organization: vol.subtitle || vol.organization || "",
        role: vol.title || "",
        startDate,
        endDate,
        current: isCurrent,
        description: vol.description || "",
        highlights: extractBulletPoints(vol.description),
      };
    });
}

/**
 * Extract skills from multiple sources in the profile
 */
function extractSkills(profile: BrightDataProfile): SkillItem[] {
  const skillsSet = new Set<string>();

  // 1. Direct skills array
  if (profile.skills && Array.isArray(profile.skills)) {
    profile.skills.forEach(skill => {
      const name = typeof skill === 'string' ? skill : (skill.title || skill.name);
      if (name) skillsSet.add(name.trim());
    });
  }

  // 2. Extract from about/summary
  const aboutText = profile.about || profile.summary || "";
  if (aboutText) {
    extractTechnologiesFromText(aboutText).forEach(skill => skillsSet.add(skill));
  }

  // 3. Extract from certifications
  if (profile.certifications) {
    profile.certifications.forEach(cert => {
      if (cert.title) {
        extractTechnologiesFromText(cert.title).forEach(skill => skillsSet.add(skill));
      }
    });
  }

  // 4. Extract from experience descriptions
  const experiences = profile.experience || profile.experiences || [];
  if (Array.isArray(experiences)) {
    experiences.forEach(exp => {
      if (exp.description) {
        extractTechnologiesFromText(exp.description).forEach(skill => skillsSet.add(skill));
      }
    });
  }

  // 5. Extract from project descriptions
  if (profile.projects) {
    profile.projects.forEach(proj => {
      if (proj.description) {
        extractTechnologiesFromText(proj.description).forEach(skill => skillsSet.add(skill));
      }
    });
  }

  // 6. Extract from publications
  if (profile.publications) {
    profile.publications.forEach(pub => {
      if (pub.title) {
        extractTechnologiesFromText(pub.title).forEach(skill => skillsSet.add(skill));
      }
    });
  }

  return Array.from(skillsSet).map((skill, index) => ({
    id: createItemId(`skill-import-${index}`),
    name: skill,
  }));
}

/**
 * Extract technology/skill keywords from text
 */
function extractTechnologiesFromText(text?: string): string[] {
  if (!text) return [];

  const skills: Set<string> = new Set();

  // Comprehensive skill patterns
  const skillPatterns: Array<{ pattern: RegExp; name: string }> = [
    // Programming Languages
    { pattern: /\bJavaScript\b/gi, name: "JavaScript" },
    { pattern: /\bTypeScript\b/gi, name: "TypeScript" },
    { pattern: /\bPython\b/gi, name: "Python" },
    { pattern: /\bJava\b(?!\s*Script)/gi, name: "Java" },
    { pattern: /\bC\+\+\b/gi, name: "C++" },
    { pattern: /\bC#\b/gi, name: "C#" },
    { pattern: /\bGo\b(?:lang)?\b/gi, name: "Go" },
    { pattern: /\bRust\b/gi, name: "Rust" },
    { pattern: /\bSwift\b/gi, name: "Swift" },
    { pattern: /\bKotlin\b/gi, name: "Kotlin" },
    { pattern: /\bRuby\b/gi, name: "Ruby" },
    { pattern: /\bPHP\b/gi, name: "PHP" },
    { pattern: /\bScala\b/gi, name: "Scala" },
    { pattern: /\bR\b(?:\s+programming)?/gi, name: "R" },

    // Frontend Frameworks
    { pattern: /\bReact(?:\.?js)?\b/gi, name: "React" },
    { pattern: /\bAngular\b/gi, name: "Angular" },
    { pattern: /\bVue(?:\.?js)?\b/gi, name: "Vue.js" },
    { pattern: /\bNext\.?js\b/gi, name: "Next.js" },
    { pattern: /\bNuxt(?:\.?js)?\b/gi, name: "Nuxt.js" },
    { pattern: /\bSvelte\b/gi, name: "Svelte" },

    // Backend Frameworks
    { pattern: /\bNode\.?js\b/gi, name: "Node.js" },
    { pattern: /\bExpress(?:\.?js)?\b/gi, name: "Express.js" },
    { pattern: /\bDjango\b/gi, name: "Django" },
    { pattern: /\bFlask\b/gi, name: "Flask" },
    { pattern: /\bSpring\s*Boot\b/gi, name: "Spring Boot" },
    { pattern: /\bRails\b/gi, name: "Ruby on Rails" },
    { pattern: /\bLaravel\b/gi, name: "Laravel" },
    { pattern: /\b\.NET\b/gi, name: ".NET" },
    { pattern: /\bASP\.NET\b/gi, name: "ASP.NET" },

    // Databases
    { pattern: /\bMySQL\b/gi, name: "MySQL" },
    { pattern: /\bPostgreSQL\b/gi, name: "PostgreSQL" },
    { pattern: /\bMongoDB\b/gi, name: "MongoDB" },
    { pattern: /\bRedis\b/gi, name: "Redis" },
    { pattern: /\bElasticsearch\b/gi, name: "Elasticsearch" },
    { pattern: /\bCassandra\b/gi, name: "Cassandra" },
    { pattern: /\bOracle\b/gi, name: "Oracle" },
    { pattern: /\bSQL\s*Server\b/gi, name: "SQL Server" },
    { pattern: /\bSQLite\b/gi, name: "SQLite" },
    { pattern: /\bFirebase\b/gi, name: "Firebase" },
    { pattern: /\bSupabase\b/gi, name: "Supabase" },

    // Cloud & DevOps
    { pattern: /\bAWS\b/gi, name: "AWS" },
    { pattern: /\bAmazon\s+Web\s+Services\b/gi, name: "AWS" },
    { pattern: /\bAzure\b/gi, name: "Azure" },
    { pattern: /\bGCP\b/gi, name: "GCP" },
    { pattern: /\bGoogle\s+Cloud\b/gi, name: "GCP" },
    { pattern: /\bDocker\b/gi, name: "Docker" },
    { pattern: /\bKubernetes\b/gi, name: "Kubernetes" },
    { pattern: /\bK8s\b/gi, name: "Kubernetes" },
    { pattern: /\bTerraform\b/gi, name: "Terraform" },
    { pattern: /\bAnsible\b/gi, name: "Ansible" },
    { pattern: /\bJenkins\b/gi, name: "Jenkins" },
    { pattern: /\bCI\/CD\b/gi, name: "CI/CD" },
    { pattern: /\bGitHub\s*Actions\b/gi, name: "GitHub Actions" },

    // Web Technologies
    { pattern: /\bHTML5?\b/gi, name: "HTML" },
    { pattern: /\bCSS3?\b/gi, name: "CSS" },
    { pattern: /\bSASS\b/gi, name: "SASS" },
    { pattern: /\bSCSS\b/gi, name: "SCSS" },
    { pattern: /\bTailwind\b/gi, name: "Tailwind CSS" },
    { pattern: /\bBootstrap\b/gi, name: "Bootstrap" },
    { pattern: /\bMaterial[\s-]?UI\b/gi, name: "Material UI" },

    // APIs & Protocols
    { pattern: /\bREST(?:\s*API)?\b/gi, name: "REST API" },
    { pattern: /\bGraphQL\b/gi, name: "GraphQL" },
    { pattern: /\bgRPC\b/gi, name: "gRPC" },
    { pattern: /\bWebSocket\b/gi, name: "WebSocket" },

    // Tools & Version Control
    { pattern: /\bGit\b(?!\s*Hub)/gi, name: "Git" },
    { pattern: /\bGitHub\b/gi, name: "GitHub" },
    { pattern: /\bGitLab\b/gi, name: "GitLab" },
    { pattern: /\bBitbucket\b/gi, name: "Bitbucket" },
    { pattern: /\bJira\b/gi, name: "Jira" },
    { pattern: /\bConfluence\b/gi, name: "Confluence" },

    // Testing
    { pattern: /\bJest\b/gi, name: "Jest" },
    { pattern: /\bMocha\b/gi, name: "Mocha" },
    { pattern: /\bCypress\b/gi, name: "Cypress" },
    { pattern: /\bSelenium\b/gi, name: "Selenium" },
    { pattern: /\bPytest\b/gi, name: "Pytest" },

    // Data & ML
    { pattern: /\bPandas\b/gi, name: "Pandas" },
    { pattern: /\bNumPy\b/gi, name: "NumPy" },
    { pattern: /\bTensorFlow\b/gi, name: "TensorFlow" },
    { pattern: /\bPyTorch\b/gi, name: "PyTorch" },
    { pattern: /\bScikit[\s-]?learn\b/gi, name: "Scikit-learn" },
    { pattern: /\bMachine\s+Learning\b/gi, name: "Machine Learning" },
    { pattern: /\bDeep\s+Learning\b/gi, name: "Deep Learning" },
    { pattern: /\bAI\b/gi, name: "AI" },
    { pattern: /\bNLP\b/gi, name: "NLP" },

    // Mobile
    { pattern: /\bReact\s+Native\b/gi, name: "React Native" },
    { pattern: /\bFlutter\b/gi, name: "Flutter" },
    { pattern: /\biOS\b/gi, name: "iOS" },
    { pattern: /\bAndroid\b/gi, name: "Android" },

    // ServiceNow (from your profile)
    { pattern: /\bServiceNow\b/gi, name: "ServiceNow" },

    // Methodologies
    { pattern: /\bAgile\b/gi, name: "Agile" },
    { pattern: /\bScrum\b/gi, name: "Scrum" },
    { pattern: /\bKanban\b/gi, name: "Kanban" },
    { pattern: /\bDevOps\b/gi, name: "DevOps" },
    { pattern: /\bMicroservices\b/gi, name: "Microservices" },
  ];

  skillPatterns.forEach(({ pattern, name }) => {
    if (pattern.test(text)) {
      skills.add(name);
    }
  });

  return Array.from(skills);
}

// ============================================================================
// MAIN MAPPER FUNCTION
// ============================================================================

/**
 * Transform Bright Data LinkedIn profile to V2ResumeData format
 * Comprehensive mapping of ALL available LinkedIn data
 */
export function mapLinkedInToResumeData(profile: BrightDataProfile): V2ResumeData {
  const photo = extractPhoto(profile);

  // Map all sections
  const experience = mapExperience(profile.experience || profile.experiences);
  const education = mapEducation(profile.education);
  const skills = extractSkills(profile);
  const certifications = mapCertifications(profile.certifications);
  const publications = mapPublications(profile.publications);
  const projects = mapProjects(profile.projects);
  const languages = mapLanguages(profile.languages);
  const awards = mapAwards(profile.honors_and_awards);
  const volunteer = mapVolunteer(profile.volunteer || profile.volunteer_experience);

  // Log what we extracted for debugging
  console.log('[LinkedIn Import] Extracted data:', {
    name: extractName(profile),
    title: extractTitle(profile),
    location: extractLocation(profile),
    hasPhoto: !!photo,
    experienceCount: experience.length,
    educationCount: education.length,
    skillsCount: skills.length,
    certificationsCount: certifications.length,
    publicationsCount: publications.length,
    projectsCount: projects.length,
    languagesCount: languages.length,
    awardsCount: awards.length,
    volunteerCount: volunteer.length,
  });

  return {
    version: "2.0",
    personalInfo: {
      fullName: extractName(profile),
      email: "", // Not provided by LinkedIn API
      phone: "", // Not provided by LinkedIn API
      location: extractLocation(profile),
      title: extractTitle(profile),
      summary: extractSummary(profile),
      photo,
      linkedin: extractLinkedInUrl(profile),
      website: extractWebsite(profile),
    },
    experience,
    education,
    skills,
    certifications,
    publications,
    projects,
    languages: languages.length > 0 ? languages : undefined,
    awards: awards.length > 0 ? awards : undefined,
    volunteer: volunteer.length > 0 ? volunteer : undefined,
    settings: {
      includeSocialLinks: true,
      includePhoto: !!photo,
      dateFormat: "MMM YYYY",
    },
  };
}

// ============================================================================
// URL UTILITIES
// ============================================================================

/**
 * Validate if input is a valid LinkedIn URL or username
 */
export function isValidLinkedInInput(input: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.|[a-z]{2}\.)?linkedin\.com\/in\/[\w-]+\/?(\?.*)?$/i,
    /^linkedin\.com\/in\/[\w-]+\/?$/i,
    /^\/in\/[\w-]+\/?$/i,
    /^[\w-]{3,100}$/i,
  ];

  return patterns.some((pattern) => pattern.test(input.trim()));
}

/**
 * Normalize any LinkedIn input to a full URL
 */
export function normalizeLinkedInUrl(input: string): string {
  const trimmed = input.trim();

  if (trimmed.startsWith("http")) {
    return trimmed.split("?")[0];
  }

  if (trimmed.toLowerCase().startsWith("linkedin.com")) {
    return `https://${trimmed.split("?")[0]}`;
  }

  if (trimmed.startsWith("/in/")) {
    return `https://www.linkedin.com${trimmed.split("?")[0]}`;
  }

  // Assume it's a username
  return `https://www.linkedin.com/in/${trimmed}`;
}

/**
 * Extract username from LinkedIn URL
 */
export function extractLinkedInUsername(url: string): string | null {
  const match = url.match(/linkedin\.com\/in\/([\w-]+)/i);
  return match ? match[1] : null;
}
