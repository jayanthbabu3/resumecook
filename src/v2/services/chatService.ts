/**
 * Chat With Resume - API Service
 *
 * Handles communication with the chat-with-resume Netlify function.
 * Production-ready with ID generation, validation, and retry logic.
 */

import { ChatAPIResponse, ChatMessage, ResumeUpdates, VariantChange } from '../types/chat';
import { V2ResumeData } from '../types/resumeData';
import { API_ENDPOINTS, apiFetch } from '../../config/api';

/** Current section variants map (section ID -> variant ID) */
export type SectionVariantsMap = Record<string, string>;

const CHAT_API_ENDPOINT = API_ENDPOINTS.chatWithResume;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

/**
 * Generate a unique ID for resume items
 * Uses crypto API for better randomness when available
 */
function generateUniqueId(prefix: string): string {
  const timestamp = Date.now();
  const randomPart = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).substring(2, 10);
  return `${prefix}-${timestamp}-${randomPart}`;
}

/**
 * Ensure all items in an array have unique, valid IDs
 * PRESERVES existing IDs - only generates new IDs for items without one
 */
function ensureUniqueIds<T extends { id?: string }>(
  items: T[] | undefined,
  prefix: string,
  existingIds: Set<string>
): T[] {
  if (!items || !Array.isArray(items)) return [];

  return items.map(item => {
    // PRESERVE existing ID if present and valid
    if (item.id && typeof item.id === 'string' && item.id.trim()) {
      existingIds.add(item.id);
      return item as T & { id: string };
    }

    // Only generate new ID for items without one
    let newId = generateUniqueId(prefix);
    while (existingIds.has(newId)) {
      newId = generateUniqueId(prefix);
    }
    existingIds.add(newId);
    return { ...item, id: newId };
  });
}

/**
 * Validate and sanitize AI response updates
 * Ensures all data is properly formatted and has unique IDs
 */
function validateAndSanitizeUpdates(
  updates: ResumeUpdates | undefined,
  currentData: V2ResumeData
): ResumeUpdates {
  if (!updates || typeof updates !== 'object') {
    return {};
  }

  // Normalize: If AI returns summary at top level, move it to personalInfo.summary
  // This handles cases where AI returns: { summary: "..." } instead of { personalInfo: { summary: "..." } }
  const normalizedUpdates = { ...updates } as any;
  if (typeof normalizedUpdates.summary === 'string' && normalizedUpdates.summary.trim()) {
    console.log('[Chat Service] Normalizing top-level summary to personalInfo.summary');
    normalizedUpdates.personalInfo = {
      ...(normalizedUpdates.personalInfo || {}),
      summary: normalizedUpdates.summary.trim(),
    };
    delete normalizedUpdates.summary;
  }

  const sanitized: ResumeUpdates = {};

  // Collect existing IDs to prevent duplicates
  const existingIds = new Set<string>();
  const collectIds = (items: { id: string }[] | undefined) => {
    if (items) items.forEach(item => existingIds.add(item.id));
  };

  collectIds(currentData.experience);
  collectIds(currentData.education);
  collectIds(currentData.skills);
  collectIds(currentData.languages);
  collectIds(currentData.certifications);
  collectIds(currentData.projects);
  collectIds(currentData.achievements);
  collectIds(currentData.awards);
  collectIds(currentData.publications);
  collectIds(currentData.volunteer);
  collectIds(currentData.speaking);
  collectIds(currentData.patents);
  collectIds(currentData.interests);
  collectIds(currentData.references);
  collectIds(currentData.courses);
  collectIds(currentData.strengths);
  // Also collect custom section IDs and their item IDs
  if (currentData.customSections) {
    currentData.customSections.forEach(section => {
      existingIds.add(section.id);
      if (section.items) {
        section.items.forEach(item => existingIds.add(item.id));
      }
    });
  }

  // Sanitize personal info
  if (normalizedUpdates.personalInfo && typeof normalizedUpdates.personalInfo === 'object') {
    const pi = normalizedUpdates.personalInfo;
    sanitized.personalInfo = {};

    // Only include valid string fields
    if (typeof pi.fullName === 'string' && pi.fullName.trim()) {
      sanitized.personalInfo.fullName = pi.fullName.trim();
    }
    if (typeof pi.title === 'string' && pi.title.trim()) {
      sanitized.personalInfo.title = pi.title.trim();
    }
    if (typeof pi.email === 'string' && pi.email.trim()) {
      sanitized.personalInfo.email = pi.email.trim();
    }
    if (typeof pi.phone === 'string' && pi.phone.trim()) {
      sanitized.personalInfo.phone = pi.phone.trim();
    }
    if (typeof pi.location === 'string' && pi.location.trim()) {
      sanitized.personalInfo.location = pi.location.trim();
    }
    if (typeof pi.summary === 'string' && pi.summary.trim()) {
      sanitized.personalInfo.summary = pi.summary.trim();
    }
    if (typeof pi.linkedin === 'string' && pi.linkedin.trim()) {
      sanitized.personalInfo.linkedin = pi.linkedin.trim();
    }
    if (typeof pi.github === 'string' && pi.github.trim()) {
      sanitized.personalInfo.github = pi.github.trim();
    }
    if (typeof pi.portfolio === 'string' && pi.portfolio.trim()) {
      sanitized.personalInfo.portfolio = pi.portfolio.trim();
    }
    if (typeof pi.website === 'string' && pi.website.trim()) {
      sanitized.personalInfo.website = pi.website.trim();
    }

    // Remove if empty
    if (Object.keys(sanitized.personalInfo).length === 0) {
      delete sanitized.personalInfo;
    }
  }

  // Sanitize experience
  if (normalizedUpdates.experience && Array.isArray(normalizedUpdates.experience)) {
    const validExperience = normalizedUpdates.experience.filter((exp: any) =>
      exp && typeof exp === 'object' &&
      (typeof exp.company === 'string' || typeof exp.position === 'string')
    ).map((exp: any) => ({
      ...exp,
      company: String(exp.company || '').trim(),
      position: String(exp.position || '').trim(),
      location: exp.location ? String(exp.location).trim() : undefined,
      startDate: exp.startDate ? String(exp.startDate).trim() : '',
      endDate: exp.endDate ? String(exp.endDate).trim() : '',
      current: Boolean(exp.current),
      description: exp.description ? String(exp.description).trim() : '',
      bulletPoints: Array.isArray(exp.bulletPoints)
        ? exp.bulletPoints.filter((bp: any) => typeof bp === 'string' && bp.trim()).map((bp: any) => bp.trim())
        : [],
    }));

    if (validExperience.length > 0) {
      sanitized.experience = ensureUniqueIds(validExperience, 'exp', existingIds);
    }
  }

  // Sanitize education
  if (normalizedUpdates.education && Array.isArray(normalizedUpdates.education)) {
    const validEducation = normalizedUpdates.education.filter((edu: any) =>
      edu && typeof edu === 'object' &&
      (typeof edu.school === 'string' || typeof edu.degree === 'string')
    ).map((edu: any) => ({
      ...edu,
      school: String(edu.school || '').trim(),
      degree: String(edu.degree || '').trim(),
      field: edu.field ? String(edu.field).trim() : '',
      startDate: edu.startDate ? String(edu.startDate).trim() : '',
      endDate: edu.endDate ? String(edu.endDate).trim() : '',
      gpa: edu.gpa ? String(edu.gpa).trim() : undefined,
      location: edu.location ? String(edu.location).trim() : undefined,
    }));

    if (validEducation.length > 0) {
      sanitized.education = ensureUniqueIds(validEducation, 'edu', existingIds);
    }
  }

  // Sanitize skills
  if (normalizedUpdates.skills && Array.isArray(normalizedUpdates.skills)) {
    const validSkills = normalizedUpdates.skills.filter((skill: any) =>
      skill && typeof skill === 'object' && typeof skill.name === 'string' && skill.name.trim()
    ).map((skill: any) => ({
      ...skill,
      name: String(skill.name).trim(),
      category: skill.category ? String(skill.category).trim() : 'Technical',
    }));

    if (validSkills.length > 0) {
      sanitized.skills = ensureUniqueIds(validSkills, 'skill', existingIds);
    }
  }

  // Sanitize languages
  if (normalizedUpdates.languages && Array.isArray(normalizedUpdates.languages)) {
    const validLanguages = normalizedUpdates.languages.filter((lang: any) =>
      lang && typeof lang === 'object' && typeof lang.language === 'string' && lang.language.trim()
    ).map((lang: any) => ({
      ...lang,
      language: String(lang.language).trim(),
      proficiency: lang.proficiency ? String(lang.proficiency).trim() : 'Professional',
    }));

    if (validLanguages.length > 0) {
      sanitized.languages = ensureUniqueIds(validLanguages, 'lang', existingIds);
    }
  }

  // Sanitize certifications
  if (normalizedUpdates.certifications && Array.isArray(normalizedUpdates.certifications)) {
    const validCerts = normalizedUpdates.certifications.filter((cert: any) =>
      cert && typeof cert === 'object' && typeof cert.name === 'string' && cert.name.trim()
    ).map((cert: any) => ({
      ...cert,
      name: String(cert.name).trim(),
      issuer: cert.issuer ? String(cert.issuer).trim() : '',
      date: cert.date ? String(cert.date).trim() : '',
    }));

    if (validCerts.length > 0) {
      sanitized.certifications = ensureUniqueIds(validCerts, 'cert', existingIds);
    }
  }

  // Sanitize projects
  if (normalizedUpdates.projects && Array.isArray(normalizedUpdates.projects)) {
    const validProjects = normalizedUpdates.projects.filter((proj: any) =>
      proj && typeof proj === 'object' && typeof proj.name === 'string' && proj.name.trim()
    ).map((proj: any) => ({
      ...proj,
      name: String(proj.name).trim(),
      description: proj.description ? String(proj.description).trim() : '',
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies.filter((t: any) => typeof t === 'string').map((t: any) => t.trim())
        : [],
      url: proj.url ? String(proj.url).trim() : undefined,
      highlights: Array.isArray(proj.highlights)
        ? proj.highlights.filter((h: any) => typeof h === 'string').map((h: any) => h.trim())
        : [],
    }));

    if (validProjects.length > 0) {
      sanitized.projects = ensureUniqueIds(validProjects, 'proj', existingIds);
    }
  }

  // Sanitize other array sections with generic handling
  const genericArraySections: (keyof ResumeUpdates)[] = [
    'achievements', 'awards', 'publications', 'volunteer',
    'speaking', 'patents', 'interests', 'references', 'courses', 'strengths'
  ];

  for (const section of genericArraySections) {
    const items = normalizedUpdates[section];
    if (items && Array.isArray(items)) {
      const validItems = items.filter((item: any) => item && typeof item === 'object');
      if (validItems.length > 0) {
        (sanitized as any)[section] = ensureUniqueIds(validItems, section.slice(0, 4), existingIds);
      }
    }
  }

  // Sanitize customSections - these have a nested structure with items array
  if (normalizedUpdates.customSections && Array.isArray(normalizedUpdates.customSections)) {
    const validCustomSections = normalizedUpdates.customSections
      .filter((section: any) =>
        section && typeof section === 'object' &&
        typeof section.title === 'string' && section.title.trim()
      )
      .map((section: any) => {
        // Generate unique ID for the section if not present
        let sectionId = section.id;
        if (!sectionId || existingIds.has(sectionId)) {
          sectionId = generateUniqueId('cs');
          while (existingIds.has(sectionId)) {
            sectionId = generateUniqueId('cs');
          }
        }
        existingIds.add(sectionId);

        // Process items within the custom section
        const items = Array.isArray(section.items)
          ? section.items
              .filter((item: any) => item && typeof item === 'object' && item.content)
              .map((item: any) => {
                let itemId = item.id;
                if (!itemId || existingIds.has(itemId)) {
                  itemId = generateUniqueId('csi');
                  while (existingIds.has(itemId)) {
                    itemId = generateUniqueId('csi');
                  }
                }
                existingIds.add(itemId);

                return {
                  id: itemId,
                  title: item.title ? String(item.title).trim() : undefined,
                  content: String(item.content).trim(),
                  date: item.date ? String(item.date).trim() : undefined,
                  url: item.url ? String(item.url).trim() : undefined,
                };
              })
          : [];

        return {
          id: sectionId,
          title: String(section.title).trim(),
          items,
        };
      });

    if (validCustomSections.length > 0) {
      console.log('[Chat Service] Sanitized customSections:', validCustomSections);
      sanitized.customSections = validCustomSections;
    }
  }

  // Pass through settings (resume-level preferences)
  if (normalizedUpdates.settings && typeof normalizedUpdates.settings === 'object') {
    sanitized.settings = {};
    const settings = normalizedUpdates.settings;

    if (typeof settings.includeSocialLinks === 'boolean') {
      sanitized.settings.includeSocialLinks = settings.includeSocialLinks;
    }
    if (typeof settings.includePhoto === 'boolean') {
      sanitized.settings.includePhoto = settings.includePhoto;
    }
    if (typeof settings.dateFormat === 'string' && settings.dateFormat.trim()) {
      sanitized.settings.dateFormat = settings.dateFormat.trim();
    }

    // Remove if empty
    if (Object.keys(sanitized.settings).length === 0) {
      delete sanitized.settings;
    }
  }

  // Pass through config (template & display settings)
  if (normalizedUpdates.config && typeof normalizedUpdates.config === 'object') {
    const config = normalizedUpdates.config;
    sanitized.config = {};

    // Sanitize sections array
    if (Array.isArray(config.sections)) {
      sanitized.config.sections = config.sections
        .filter((s: any) => s && typeof s === 'object' && typeof s.type === 'string')
        .map((s: any) => ({
          type: String(s.type).trim(),
          id: s.id ? String(s.id).trim() : String(s.type).trim(),
          title: s.title ? String(s.title).trim() : undefined,
          enabled: typeof s.enabled === 'boolean' ? s.enabled : true,
          order: typeof s.order === 'number' ? s.order : undefined,
          column: s.column === 'main' || s.column === 'sidebar' ? s.column : undefined,
          variant: s.variant ? String(s.variant).trim() : undefined,
        }));
    }

    // Pass through component configs
    if (config.header && typeof config.header === 'object') {
      sanitized.config.header = { ...config.header };
    }
    if (config.skills && typeof config.skills === 'object') {
      sanitized.config.skills = { ...config.skills };
    }
    if (config.experience && typeof config.experience === 'object') {
      sanitized.config.experience = { ...config.experience };
    }
    if (config.education && typeof config.education === 'object') {
      sanitized.config.education = { ...config.education };
    }
    if (config.layout && typeof config.layout === 'object') {
      sanitized.config.layout = { ...config.layout };
    }
    if (config.colors && typeof config.colors === 'object') {
      sanitized.config.colors = { ...config.colors };
    }
    if (config.sectionHeading && typeof config.sectionHeading === 'object') {
      sanitized.config.sectionHeading = { ...config.sectionHeading };
    }

    // Remove if empty
    if (Object.keys(sanitized.config).length === 0) {
      delete sanitized.config;
    } else {
      console.log('[Chat Service] Sanitized config:', sanitized.config);
    }
  }

  return sanitized;
}

/**
 * Send a message to the chat API and get a response
 * Includes retry logic and response validation
 */
export async function sendChatMessage(
  message: string,
  conversationHistory: ChatMessage[],
  currentResumeData: V2ResumeData,
  currentSectionVariants?: SectionVariantsMap
): Promise<ChatAPIResponse> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Convert conversation history to the format expected by the API
      const historyForAPI = conversationHistory
        .filter(msg => msg.role !== 'system' && msg.id !== 'welcome')
        .map(msg => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await apiFetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          message,
          conversationHistory: historyForAPI,
          currentResumeData,
          currentSectionVariants,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      // Validate and sanitize the response
      const sanitizedUpdates = validateAndSanitizeUpdates(data.updates, currentResumeData);

      // Normalize updatedSections array
      // If AI returns "summary" as a section, convert it to "personalInfo"
      // since summary is part of personalInfo
      let normalizedSections = Array.isArray(data.updatedSections)
        ? data.updatedSections.filter((s: unknown) => typeof s === 'string')
        : Object.keys(sanitizedUpdates);

      // If the sanitized updates include personalInfo (which may have come from a top-level "summary"),
      // ensure "personalInfo" is in the sections array
      if (sanitizedUpdates.personalInfo && !normalizedSections.includes('personalInfo')) {
        // Check if 'summary' was in the original sections and replace it with 'personalInfo'
        const summaryIndex = normalizedSections.indexOf('summary');
        if (summaryIndex !== -1) {
          normalizedSections[summaryIndex] = 'personalInfo';
        } else {
          normalizedSections.push('personalInfo');
        }
      }

      // Validate and extract variantChanges
      const variantChanges: VariantChange[] = Array.isArray(data.variantChanges)
        ? data.variantChanges.filter((change: any) =>
            change &&
            typeof change === 'object' &&
            typeof change.section === 'string' &&
            typeof change.variant === 'string'
          )
        : [];

      // Ensure we have valid response structure
      const validatedResponse: ChatAPIResponse = {
        success: true,
        message: typeof data.message === 'string' && data.message.trim()
          ? data.message.trim()
          : "I've processed your information. What would you like to add next?",
        updates: sanitizedUpdates,
        updatedSections: normalizedSections,
        suggestedQuestions: Array.isArray(data.suggestedQuestions)
          ? data.suggestedQuestions.filter((q: unknown) => typeof q === 'string' && q.trim()).slice(0, 3)
          : [],
        variantChanges: variantChanges.length > 0 ? variantChanges : undefined,
      };

      return validatedResponse;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Chat service error (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`, lastError);

      // Only retry on network errors or server errors
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
      }
    }
  }

  // All retries failed
  throw lastError || new Error('Failed to send message after multiple attempts');
}

/**
 * Merge resume updates into existing data
 *
 * IMPORTANT: AI returns COMPLETE arrays for all sections.
 * This function uses REPLACE strategy - the AI's array becomes the new state.
 * This ensures deletions, reordering, and modifications all work correctly.
 */
export function mergeResumeUpdates(
  currentData: V2ResumeData,
  updates: ResumeUpdates
): V2ResumeData {
  const merged = { ...currentData };

  // Merge personal info (partial update - AI only sends changed fields)
  if (updates.personalInfo) {
    merged.personalInfo = {
      ...currentData.personalInfo,
      ...updates.personalInfo,
    };
  }

  // Merge settings (partial update)
  if (updates.settings) {
    merged.settings = {
      ...currentData.settings,
      ...updates.settings,
    };
  }

  // For ALL array sections: AI returns COMPLETE arrays, so REPLACE entirely
  // This ensures deletions, reordering, and modifications work correctly

  if (updates.experience !== undefined) {
    merged.experience = updates.experience;
  }

  if (updates.education !== undefined) {
    merged.education = updates.education;
  }

  if (updates.skills !== undefined) {
    merged.skills = updates.skills;
  }

  if (updates.languages !== undefined) {
    merged.languages = updates.languages;
  }

  if (updates.certifications !== undefined) {
    merged.certifications = updates.certifications;
  }

  if (updates.projects !== undefined) {
    merged.projects = updates.projects;
  }

  if (updates.achievements !== undefined) {
    merged.achievements = updates.achievements;
  }

  if (updates.strengths !== undefined) {
    merged.strengths = updates.strengths;
  }

  if (updates.awards !== undefined) {
    merged.awards = updates.awards;
  }

  if (updates.publications !== undefined) {
    merged.publications = updates.publications;
  }

  if (updates.volunteer !== undefined) {
    merged.volunteer = updates.volunteer;
  }

  if (updates.speaking !== undefined) {
    merged.speaking = updates.speaking;
  }

  if (updates.patents !== undefined) {
    merged.patents = updates.patents;
  }

  if (updates.interests !== undefined) {
    merged.interests = updates.interests;
  }

  if (updates.references !== undefined) {
    merged.references = updates.references;
  }

  if (updates.courses !== undefined) {
    merged.courses = updates.courses;
  }

  if (updates.customSections !== undefined) {
    merged.customSections = updates.customSections;
  }

  return merged;
}

/**
 * Merge config updates into existing config
 * Returns the config changes to be applied to the template
 */
export function mergeConfigUpdates(
  currentConfig: any,
  configUpdates: ResumeUpdates['config']
): any {
  if (!configUpdates) return currentConfig;

  const merged = { ...currentConfig };

  // Merge sections array - REPLACE with AI's version if provided
  if (configUpdates.sections) {
    merged.sections = configUpdates.sections;
  }

  // Merge component-level configs (header, skills, experience, etc.)
  const componentConfigs = ['header', 'skills', 'experience', 'education', 'layout', 'colors', 'sectionHeading'] as const;

  for (const component of componentConfigs) {
    if (configUpdates[component]) {
      merged[component] = {
        ...currentConfig[component],
        ...configUpdates[component],
      };
    }
  }

  return merged;
}


/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format a section name for display
 */
export function formatSectionName(sectionId: string): string {
  const names: Record<string, string> = {
    personalInfo: 'Personal Info',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    certifications: 'Certifications',
    projects: 'Projects',
    achievements: 'Achievements',
    strengths: 'Strengths',
    awards: 'Awards',
    publications: 'Publications',
    volunteer: 'Volunteer',
    speaking: 'Speaking',
    patents: 'Patents',
    interests: 'Interests',
    references: 'References',
    courses: 'Courses',
  };

  return names[sectionId] || sectionId;
}
