/**
 * Dynamic Prompt Builder for Resume Enhancement
 *
 * SIMPLIFIED VERSION: Relies on AI's inherent knowledge of resume best practices.
 * We only provide essential rules and context - the AI knows the rest.
 */

/**
 * Build an enhancement prompt
 *
 * @param {object} resumeData - The resume data to enhance
 * @param {object} analysis - Analysis results from resume-analyzer
 * @param {object} userOptions - Optional user customization
 */
export function buildEnhancementPrompt(resumeData, analysis, userOptions = {}) {
  const role = userOptions.targetRole || analysis.detectedRole;
  const years = analysis.yearsOfExperience;

  // Extract metrics from original summary to ensure preservation
  const originalMetrics = extractMetricsFromSummary(resumeData.summary);

  const prompt = `# Resume Enhancement Task

You are enhancing a resume for a **${role}** with approximately **${years} years** of experience.

${userOptions.additionalContext ? `## User Context:\n${userOptions.additionalContext}\n` : ''}
${userOptions.focusAreas?.length ? `## Focus Areas: ${userOptions.focusAreas.join(', ')}\n` : ''}

## Core Rules (MUST FOLLOW)

1. **NEVER fabricate** - Don't invent metrics, percentages, or achievements
2. **Preserve ALL original metrics** - If summary says "300K users" or "8+ years", keep them exactly
3. **Keep it authentic** - Improve language, not facts
4. **Don't over-optimize** - If something is already well-written, leave it alone

${originalMetrics.length > 0 ? `## ⚠️ PRESERVE THESE METRICS FROM ORIGINAL SUMMARY:
${originalMetrics.map(m => `- "${m}" - MUST appear in enhanced summary`).join('\n')}
` : ''}

## What to Improve
- Weak verbs (worked on → Led, helped → Delivered)
- Vague descriptions → More specific (using existing info only)
- Passive voice → Active voice
- **Job titles that aren't ATS-friendly** - Make them more standard/searchable (e.g., "Tech Lead" → "Senior Software Engineer", "Code Ninja" → "Software Developer")

## What NOT to Do
- Don't add technologies not mentioned
- Don't stuff keywords that don't fit the actual work
- Don't make things longer for no reason
- Don't change content that's already good

## Output Format
- Return ONLY valid JSON matching the input structure
- Use "bulletPoints" array for experience items (not "highlights")
- Include "suggestedSkills" array: [{ "id": "suggested-1", "name": "...", "category": "...", "reason": "..." }]
- Preserve all IDs, names, dates, emails, company names exactly
- You CAN enhance personalInfo.title to be more ATS-friendly if needed

## Resume Data

\`\`\`json
${JSON.stringify(cleanResumeData(resumeData), null, 2)}
\`\`\``;

  return prompt;
}

/**
 * Extract metrics from summary for preservation checking
 */
function extractMetricsFromSummary(summary) {
  if (!summary) return [];

  const metrics = [];

  // Years patterns
  const yearsMatch = summary.match(/(\d+\+?\s*years?)/gi);
  if (yearsMatch) metrics.push(...yearsMatch);

  // Number patterns (300K, 1M, 50+, etc.)
  const numberPatterns = [
    /\d+K\+?\s*\w*/gi,           // 300K users
    /\d+M\+?\s*\w*/gi,           // 1M downloads
    /\$[\d,]+[KMB]?\+?/gi,       // $1M, $500K
    /\d+\+\s*\w+/gi,             // 50+ clients
    /\d+%/gi,                     // 95%
  ];

  for (const pattern of numberPatterns) {
    const matches = summary.match(pattern);
    if (matches) metrics.push(...matches);
  }

  return [...new Set(metrics)]; // Remove duplicates
}

/**
 * Clean resume data before including in prompt
 */
function cleanResumeData(resumeData) {
  const cleanData = { ...resumeData };
  delete cleanData._parsedSections;
  delete cleanData._enhancements;
  delete cleanData.suggestedSkills;
  return cleanData;
}

/**
 * Build the system prompt for the AI
 */
export function buildSystemPrompt(analysis) {
  return `You are an expert resume writer. Enhance resumes by improving language and clarity while preserving all original facts.

CRITICAL: Never fabricate metrics or achievements. Return ONLY valid JSON.`;
}

/**
 * Get enhancement temperature based on resume state
 */
export function getEnhancementTemperature(analysis) {
  if (analysis.completenessScore < 50) return 0.7;
  if (analysis.completenessScore >= 70) return 0.5;
  return 0.6;
}

// Keep this export for backward compatibility, but it's no longer needed
export function getRoleKeywords() {
  return {
    keywords: [],
    actionVerbs: [],
    metricsTemplates: []
  };
}
