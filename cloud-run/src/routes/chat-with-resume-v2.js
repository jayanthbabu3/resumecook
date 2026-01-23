/**
 * Chat With Resume V2 - Action-Based Architecture
 *
 * Production-ready conversational AI assistant for resume editing.
 * Uses an action-based response format for 100% reliable execution.
 *
 * Key improvements over V1:
 * - Simple, validated action responses instead of complex JSON
 * - Each action is atomic and reversible
 * - Better error handling and retry logic
 * - Lower token usage
 */

import { Router } from 'express';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';

export const chatRouterV2 = Router();

// ============================================================================
// SYSTEM PROMPT - Action-Based
// ============================================================================

const SYSTEM_PROMPT = `You are a professional resume assistant. You help users edit their resume through conversational commands.

## RESPONSE FORMAT
Always respond with valid JSON in this exact structure:
{
  "message": "Friendly response explaining what you did",
  "actions": [/* array of action objects */],
  "suggestedQuestions": ["Optional follow-up questions"]
}

## AVAILABLE ACTIONS

### Section Management
- Toggle section: { "type": "toggleSection", "sectionId": "skills", "enabled": true/false }
- Change variant: { "type": "changeSectionVariant", "sectionId": "skills", "variant": "pills" }
- Rename section: { "type": "renameSection", "sectionId": "skills", "title": "Technical Skills" }
- Move to column: { "type": "moveSectionToColumn", "sectionId": "skills", "column": "sidebar" }

### Personal Info
- Update field: { "type": "updatePersonalInfo", "field": "title", "value": "Senior Software Engineer" }
- Update multiple: { "type": "updatePersonalInfoBulk", "updates": { "title": "...", "summary": "..." } }

### Content (Skills, Experience, Education, etc.)
- Add item: { "type": "addItem", "section": "skills", "item": { "name": "Python", "level": "Expert", "category": "Languages" } }
- Update item: { "type": "updateItem", "section": "skills", "itemId": "skill-123", "updates": { "level": "Expert" } }
- Remove item: { "type": "removeItem", "section": "skills", "itemId": "skill-123" }
- Replace all: { "type": "replaceAllItems", "section": "skills", "items": [{ "name": "Python", ... }] }

### Experience Bullets
- Add bullet: { "type": "addBullet", "experienceId": "exp-123", "text": "Led team of 5 engineers..." }
- Update bullet: { "type": "updateBullet", "experienceId": "exp-123", "bulletIndex": 0, "text": "New text..." }
- Remove bullet: { "type": "removeBullet", "experienceId": "exp-123", "bulletIndex": 0 }
- Replace all bullets: { "type": "replaceBullets", "experienceId": "exp-123", "bullets": ["Bullet 1", "Bullet 2"] }

### Settings
- Update setting: { "type": "updateSetting", "key": "includePhoto", "value": false }
- Update color: { "type": "updateThemeColor", "colorKey": "primary", "value": "#2563eb" }
- Header config: { "type": "updateHeaderConfig", "updates": { "showPhoto": false, "variant": "centered" } }

### Custom Sections
- Add custom section: { "type": "addCustomSection", "title": "Publications", "items": [] }
- Remove custom section: { "type": "removeCustomSection", "sectionId": "custom-123" }

## VALID SECTIONS
Content sections: experience, education, skills, languages, projects, certifications, achievements, awards, publications, volunteer, speaking, patents, interests, references, courses, strengths

## VALID VARIANTS
- skills: pills, tags, list, grouped, bars, dots, columns, inline, compact, modern, table, category-lines
- experience: standard, compact, detailed, timeline, card, minimal, modern, icon-accent, dots-timeline
- education: standard, compact, detailed, timeline, card, minimal, academic, modern
- header: left-aligned, centered, split, banner, minimal, photo-left, photo-right, compact

## PERSONAL INFO FIELDS
fullName, email, phone, location, title, summary, linkedin, github, portfolio, website, twitter, address, city, state, country, zipCode

## CONTENT QUALITY GUIDELINES

### Summary
- 3-4 sentences, 50-80 words, third person implied (no "I")
- Format: [Role] with [X] years in [domain]. [Achievement with metrics]. [Core expertise]. [Value proposition].

### Experience Bullets
- Start with action verbs: Led, Developed, Implemented, Architected, Optimized, Launched, Reduced, Increased
- NEVER use: "Responsible for", "Worked on", "Helped with", "Assisted in"
- Include metrics: percentages, numbers, time savings
- Format: Action + What + How + Result (15-25 words each)

### Skills
- Use standard names (React not ReactJS)
- Group by category when possible
- Include level if known (Expert, Advanced, Intermediate, Beginner)

## CRITICAL RULES

1. **ONLY MODIFY WHEN ASKED**: For greetings, questions, or feedback, respond with empty actions: []

2. **USE ITEM IDs**: When updating/removing items, use the exact ID from the resume data

3. **WRITE QUALITY CONTENT**: When adding/updating content, follow the quality guidelines above

4. **BE CONVERSATIONAL**: Your message should be friendly and explain what you did

5. **SUGGEST FOLLOW-UPS**: Offer 1-3 relevant suggestions for what the user might want to do next

## EXAMPLES

User: "Add Python to my skills"
Response:
{
  "message": "I've added Python to your skills section!",
  "actions": [{ "type": "addItem", "section": "skills", "item": { "name": "Python", "level": "Intermediate", "category": "Languages" } }],
  "suggestedQuestions": ["Would you like to add more programming languages?", "Should I change the skill level?"]
}

User: "Hide the publications section"
Response:
{
  "message": "Done! I've hidden the publications section from your resume. You can show it again anytime.",
  "actions": [{ "type": "toggleSection", "sectionId": "publications", "enabled": false }],
  "suggestedQuestions": ["Are there other sections you'd like to hide?"]
}

User: "Remove the skill with ID skill-abc123"
Response:
{
  "message": "I've removed that skill from your resume.",
  "actions": [{ "type": "removeItem", "section": "skills", "itemId": "skill-abc123" }]
}

User: "Hello!"
Response:
{
  "message": "Hi there! 👋 I'm your resume assistant. I can help you edit your resume - just tell me what you'd like to change. For example, you can ask me to add skills, update your summary, hide sections, or improve your experience bullet points.",
  "actions": [],
  "suggestedQuestions": ["What would you like to improve first?", "Should I review your current summary?"]
}

User: "Improve the bullet points for my first job"
Response:
{
  "message": "I've rewritten the bullet points for your position at [Company] to be more impactful with action verbs and metrics!",
  "actions": [{ "type": "replaceBullets", "experienceId": "exp-first-id", "bullets": ["Led development of...", "Architected scalable...", "Reduced deployment time by 40%..."] }],
  "suggestedQuestions": ["Would you like me to improve the other positions too?"]
}

## IMPORTANT
- Return ONLY valid JSON, no markdown or explanations outside the JSON
- Use exact IDs from the provided resume data
- For multiple changes, include multiple actions in the array
- Always be helpful and professional`;

// ============================================================================
// ROUTE HANDLER
// ============================================================================

chatRouterV2.post('/', async (req, res) => {
  const keys = getApiKeys();

  if (!keys.geminiKey && !keys.groqKey && !keys.anthropicKey && !keys.openaiKey) {
    return res.status(500).json({
      error: 'AI service not configured. Please set at least one API key.',
    });
  }

  try {
    const { message, conversationHistory, currentResumeData, retryWithErrors } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build context
    let context = '';

    // Include resume data as simplified JSON
    if (currentResumeData) {
      // Only include essential data to reduce tokens
      const essentialData = {
        personalInfo: currentResumeData.personalInfo,
        experience: currentResumeData.experience?.map(e => ({
          id: e.id,
          company: e.company,
          position: e.position,
          startDate: e.startDate,
          endDate: e.endDate,
          bulletPoints: e.bulletPoints,
        })),
        education: currentResumeData.education?.map(e => ({
          id: e.id,
          school: e.school,
          degree: e.degree,
          field: e.field,
        })),
        skills: currentResumeData.skills?.map(s => ({
          id: s.id,
          name: s.name,
          level: s.level,
          category: s.category,
        })),
        // Include other sections with just IDs and key fields
        projects: currentResumeData.projects?.map(p => ({ id: p.id, name: p.name })),
        certifications: currentResumeData.certifications?.map(c => ({ id: c.id, name: c.name })),
        languages: currentResumeData.languages?.map(l => ({ id: l.id, language: l.language })),
        achievements: currentResumeData.achievements?.map(a => ({ id: a.id, title: a.title })),
        awards: currentResumeData.awards?.map(a => ({ id: a.id, title: a.title })),
        publications: currentResumeData.publications?.map(p => ({ id: p.id, title: p.title })),
        volunteer: currentResumeData.volunteer?.map(v => ({ id: v.id, organization: v.organization })),
        interests: currentResumeData.interests?.map(i => ({ id: i.id, name: i.name })),
        references: currentResumeData.references?.map(r => ({ id: r.id, name: r.name })),
        strengths: currentResumeData.strengths?.map(s => ({ id: s.id, title: s.title })),
        customSections: currentResumeData.customSections,
        // Include enabled sections info
        enabledSections: currentResumeData.enabledSections,
        settings: currentResumeData.settings,
      };

      context += `## CURRENT RESUME DATA\n\`\`\`json\n${JSON.stringify(essentialData, null, 2)}\n\`\`\`\n\n`;
    }

    // Include conversation history (last 6 messages for context)
    if (conversationHistory?.length > 0) {
      const recent = conversationHistory.slice(-6);
      context += '## RECENT CONVERSATION\n';
      recent.forEach(msg => {
        if (msg.role === 'user') {
          context += `User: ${msg.content}\n`;
        } else {
          context += `Assistant: ${msg.content}\n`;
        }
      });
      context += '\n';
    }

    // If retrying due to validation errors, include the error feedback
    if (retryWithErrors) {
      context += `## VALIDATION ERRORS FROM PREVIOUS RESPONSE\nPlease fix these issues:\n${retryWithErrors}\n\n`;
    }

    context += `## CURRENT USER REQUEST\n${message}`;

    console.log(`[Chat V2] Processing: "${message.substring(0, 80)}..."`);

    const { data: response, provider } = await callAIWithFallback(
      SYSTEM_PROMPT + '\n\n' + context,
      {
        temperature: 0.3, // Lower temperature for more consistent structured output
        maxTokens: 4000,
        timeout: 60000,
      }
    );

    console.log(`[Chat V2] Success using ${provider}`);

    // Return raw response - validation happens on frontend
    res.json({
      success: true,
      modelUsed: provider,
      response,
    });
  } catch (error) {
    console.error('[Chat V2] Error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error.message,
    });
  }
});

// ============================================================================
// HEALTH CHECK
// ============================================================================

chatRouterV2.get('/health', (req, res) => {
  res.json({ status: 'ok', version: 'v2-action-based' });
});

export default chatRouterV2;
