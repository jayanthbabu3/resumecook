/**
 * Optimized Prompt Builder for Resume Enhancement
 *
 * Goals:
 * - Exactly 4 bullet points per experience (15+ words each)
 * - Consolidate many points into 4 comprehensive ones
 * - Professional resume summary (not narrative style)
 * - Preserve all skills, deduplicated
 */

/**
 * Build enhancement prompt
 */
export function buildEnhancementPrompt(resumeData, analysis, userOptions = {}) {
  const role = userOptions.targetRole || analysis.detectedRole;
  const years = analysis.yearsOfExperience;

  // Get original metrics to preserve
  const metrics = extractAllMetrics(resumeData);

  // Prepare data
  const minimalData = prepareMinimalData(resumeData);
  const expCount = minimalData.experience.length;

  const prompt = `Enhance resume for ${role} (${years}yr). Return valid JSON only.

RULES:
1. NAME: Remove all emojis. Keep only the clean name (e.g., "Akshay Saini" not "Akshay Saini 🚀").

2. TITLE: Make ATS-friendly. Use standard job titles.
   - Good: "Software Engineer | Full Stack Developer"
   - Good: "Content Creator | Technical Educator"
   - Bad: "YouTuber (2.1M+)" - not ATS-friendly
   - Include subscriber count in summary, not title

3. SUMMARY: Professional style, 4 sentences, 50-70 words total.
   Format: "[Role] with [X]+ years in [area]. [Key achievement with metrics]. [What you do/specialize in]. [Core expertise/technologies]."
   Example: "Software Engineer with 8+ years in full-stack development. Built products serving 1M+ users at top tech companies. Specializes in creating scalable web applications and mentoring development teams. Expert in React, Node.js, TypeScript, and cloud architecture."

4. EXPERIENCE: CRITICAL - EVERY SINGLE ONE of ALL ${expCount} experiences MUST have EXACTLY 4 bullets. NO EXCEPTIONS.
   - Each bullet: MINIMUM 15 words, maximum 25 words. Count words carefully. Start with strong action verb.
   - NEVER copy original bullets. You MUST rewrite and expand EVERY bullet to 15+ words.
   - If original bullet is short like "Worked on SEO", expand it to: "Implemented comprehensive SEO strategies and optimizations, significantly improving search rankings and organic traffic across the platform."
   - CONSOLIDATE: If original has 5+ points, merge ALL info into exactly 4 comprehensive bullets
   - EXPAND: If original has 1-3 points, create relevant professional bullets based on role context to reach exactly 4
   - Example good bullet (18 words): "Developed and deployed multiple finance engineering products using GoLang and React, improving operational efficiency across teams."
   - Example bad bullet (8 words): "Built finance products using GoLang and React." - THIS IS UNACCEPTABLE, TOO SHORT
   - VERIFY: Before returning, count words in EACH bullet. If any bullet has fewer than 15 words, expand it.
${metrics.length > 0 ? `   - Preserve these metrics: ${metrics.slice(0, 8).join(', ')}` : ''}

5. SKILLS: Return ALL skills from input (already deduplicated). Do not return empty array.

6. PROJECTS: Enhance description to 20-40 words.

7. NO fake metrics. Only use numbers from original data.

${userOptions.additionalContext ? `CONTEXT: ${userOptions.additionalContext}\n` : ''}
INPUT:
${JSON.stringify(minimalData, null, 0)}

OUTPUT: JSON with personalInfo (fullName without emojis, ATS-friendly title, 4-sentence summary), experience (exactly 4 bulletPoints each), education, skills (from input), projects, suggestedSkills[3].`;

  return prompt;
}

/**
 * Prepare minimal data
 */
function prepareMinimalData(resumeData) {
  return {
    personalInfo: resumeData.personalInfo ? {
      fullName: resumeData.personalInfo.fullName,
      title: resumeData.personalInfo.title,
      summary: resumeData.personalInfo.summary,
      email: resumeData.personalInfo.email,
      phone: resumeData.personalInfo.phone,
      location: resumeData.personalInfo.location,
      linkedin: resumeData.personalInfo.linkedin,
      github: resumeData.personalInfo.github,
      portfolio: resumeData.personalInfo.portfolio,
      website: resumeData.personalInfo.website,
    } : {},
    experience: (resumeData.experience || []).map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      location: exp.location,
      description: exp.description,
      bulletPoints: exp.bulletPoints || [],
    })),
    education: (resumeData.education || []).map(edu => ({
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      gpa: edu.gpa,
    })),
    skills: deduplicateSkills((resumeData.skills || []).slice(0, 30)),
    projects: (resumeData.projects || []).slice(0, 5).map(p => ({
      id: p.id,
      name: p.name,
      description: p.description?.substring(0, 200),
    })),
  };
}

/**
 * Deduplicate skills before sending
 */
function deduplicateSkills(skills) {
  const seen = new Map();
  const duplicatePatterns = [
    ['seo', 'search engine optimization', 'search engine optimization (seo)'],
    ['css', 'cascading style sheets', 'cascading style sheets (css)'],
    ['html', 'hypertext markup language', 'html5'],
    ['js', 'javascript'],
    ['c++', 'c/ c++', 'c/c++'],
    ['ui', 'user interface'],
    ['ux', 'user experience', 'user experience (ux)'],
    ['aws', 'amazon web services', 'amazon web services (aws)'],
    ['redux', 'redux.js'],
    ['react', 'react.js', 'reactjs'],
    ['vue', 'vue.js', 'vuejs'],
    ['angular', 'angularjs'],
    ['jquery', 'j query'],
    ['web design', 'web designing'],
    ['front-end', 'frontend', 'front-end coding'],
  ];

  const normalized = new Map();
  duplicatePatterns.forEach(group => {
    const primary = group[0];
    group.forEach(variant => normalized.set(variant.toLowerCase(), primary));
  });

  return skills.filter(skill => {
    if (!skill || !skill.name) return false;
    const nameLower = skill.name.toLowerCase().trim();
    const normalizedName = normalized.get(nameLower) || nameLower;

    if (seen.has(normalizedName)) {
      return false;
    }
    seen.set(normalizedName, true);
    return true;
  }).map(s => ({ id: s.id, name: s.name, category: s.category || 'Technical' }));
}

/**
 * Extract metrics to preserve
 */
function extractAllMetrics(resumeData) {
  const metrics = new Set();

  const extract = (text) => {
    if (!text) return;
    const patterns = [
      /\d+\.?\d*[KMB]\+?\s*(?:subscribers?|users?|downloads?|views?)?/gi,
      /\d+\+?\s*years?/gi,
      /\d+\.?\d*%/gi,
      /\$[\d,]+[KMB]?/gi,
      /\d+\+?\s*(?:team|engineers?|projects?|people|niche)/gi,
    ];
    patterns.forEach(p => {
      const matches = text.match(p);
      if (matches) matches.forEach(m => metrics.add(m.trim()));
    });
  };

  extract(resumeData.personalInfo?.summary);
  (resumeData.experience || []).forEach(exp => {
    extract(exp.description);
    (exp.bulletPoints || []).forEach(extract);
  });
  (resumeData.projects || []).forEach(p => extract(p.description));

  return [...metrics];
}

/**
 * Build system prompt
 */
export function buildSystemPrompt() {
  return `Expert ATS-optimized resume writer. Return valid JSON only.

CRITICAL RULES:
- Name: Remove all emojis
- Title: ATS-friendly only (no subscriber counts in title)
- Summary: 4 sentences, 50-70 words
- Experience: EXACTLY 4 bullets per job, EACH bullet 15-25 words - THIS IS MANDATORY
  * NEVER copy original text. Rewrite and expand EVERY bullet professionally.
  * If bullet is under 15 words, add context, impact, or details until it reaches 15+ words.
  * If 8 original bullets → consolidate into 4 comprehensive bullets (15-25 words each)
  * If 3 original bullets → expand to 4 bullets (15-25 words each)
  * NEVER return bullets shorter than 15 words
- Skills: Return all input skills (don't omit any)
- No fake metrics`;
}

/**
 * Get temperature
 */
export function getEnhancementTemperature() {
  return 0.4; // Lower temperature for more consistent rule-following
}

// Backward compatibility
export function getRoleKeywords() {
  return { keywords: [], actionVerbs: [], metricsTemplates: [] };
}
