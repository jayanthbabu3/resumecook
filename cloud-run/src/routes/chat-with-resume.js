/**
 * Chat With Resume Route
 *
 * Conversational AI assistant for building resumes.
 */

import { Router } from 'express';
import { callAIWithFallback, getApiKeys } from '../utils/ai-providers.js';

export const chatRouter = Router();

const SYSTEM_PROMPT = `You are a friendly, conversational resume assistant. Be helpful and engaging.

IMPORTANT BEHAVIOR RULES:
1. For greetings (hi, hello, hey, etc.) or casual chat - just respond conversationally. DO NOT make any updates.
2. For questions about the resume - answer helpfully. DO NOT make updates unless asked.
3. ONLY make updates when the user EXPLICITLY asks you to change, add, update, improve, or modify something.

RESPOND with valid JSON:
{
  "message": "Your conversational response",
  "updates": {},
  "updatedSections": [],
  "suggestedQuestions": ["Helpful follow-up suggestions"]
}

WHEN USER EXPLICITLY REQUESTS CHANGES (e.g., "add skills", "improve summary", "update experience"):
- Then and ONLY then include updates
- Be proactive about WHAT to add when they ask (e.g., "Add DevOps skills" → add Docker, Kubernetes, CI/CD, AWS)
- Don't ask unnecessary clarifying questions for straightforward requests

EXAMPLES:
- User says "hi" → Respond with greeting, NO updates
- User says "how does my resume look?" → Give feedback, NO updates
- User says "add Python to my skills" → Make the update
- User says "improve my summary" → Rewrite it and include in updates

CRITICAL RULES:
1. ONLY include sections in "updates" that you are actually modifying
2. Empty updates = {} and updatedSections = [] for conversational responses
3. All data goes inside "updates" object, never at root level
4. Generate IDs as "type-timestamp-random" (e.g., "int-1736789-abc")

SECTION FORMATS:
personalInfo: {fullName, email, phone, location, title, summary, linkedin, github, portfolio, website}
experience: [{id, company, position, location, startDate, endDate, current, description, bulletPoints[]}]
education: [{id, school, degree, field, location, startDate, endDate, gpa}]
skills: [{id, name, category}]
projects: [{id, name, description, technologies[], url, highlights[]}]
languages: [{id, language, proficiency}]
interests: [{id, name}]
certifications: [{id, name, issuer, date, credentialId, url}]
achievements: [{id, title, description, date, metric}]
awards: [{id, title, issuer, date, description}]
strengths: [{id, title, description}]

Return valid JSON only.`;

chatRouter.post('/', async (req, res) => {
  const keys = getApiKeys();

  if (!keys.geminiKey && !keys.groqKey && !keys.anthropicKey && !keys.openaiKey) {
    return res.status(500).json({
      error: 'AI service not configured. Please set at least one API key.',
    });
  }

  try {
    const { message, conversationHistory, currentResumeData } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation context
    let context = '';

    // Include resume summary
    if (currentResumeData) {
      const summary = createResumeSummary(currentResumeData);
      if (summary) {
        context += `CURRENT RESUME:\n${summary}\n\n`;
      }
    }

    // Include recent conversation history
    if (conversationHistory?.length > 0) {
      const recent = conversationHistory.slice(-6);
      context += 'CONVERSATION:\n';
      recent.forEach(msg => {
        if (msg.role === 'user') {
          context += `User: ${msg.content}\n`;
        } else {
          const truncated = msg.content.length > 200 ? msg.content.substring(0, 200) + '...' : msg.content;
          context += `Assistant: ${truncated}\n`;
        }
      });
      context += '\n';
    }

    context += `USER MESSAGE: ${message}`;

    console.log(`Chat processing: "${message.substring(0, 100)}..."`);

    const { data: response, provider } = await callAIWithFallback(
      SYSTEM_PROMPT + '\n\n' + context,
      {
        temperature: 0.7,
        maxTokens: 4000,
        timeout: 60000,
      }
    );

    const normalized = normalizeResponse(response);

    console.log(`Chat successful using ${provider}`);

    res.json({
      success: true,
      modelUsed: provider,
      ...normalized,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error.message,
    });
  }
});

function createResumeSummary(resumeData) {
  if (!resumeData) return null;

  const parts = [];

  const pi = resumeData.personalInfo;
  if (pi) {
    const personalParts = [];
    if (pi.fullName) personalParts.push(`Name: ${pi.fullName}`);
    if (pi.title) personalParts.push(`Title: ${pi.title}`);
    if (personalParts.length > 0) parts.push(personalParts.join(' | '));
  }

  if (resumeData.experience?.length > 0) {
    parts.push(`Experience: ${resumeData.experience.map(e => `${e.position} @ ${e.company}`).join(', ')}`);
  }

  if (resumeData.skills?.length > 0) {
    parts.push(`Skills: ${resumeData.skills.map(s => s.name).join(', ')}`);
  }

  if (resumeData.education?.length > 0) {
    parts.push(`Education: ${resumeData.education.map(e => `${e.degree} @ ${e.school}`).join(', ')}`);
  }

  return parts.join('\n');
}

function normalizeResponse(response) {
  const normalized = {
    message: response.message || "I've updated your resume.",
    updates: response.updates || {},
    updatedSections: response.updatedSections || [],
    suggestedQuestions: response.suggestedQuestions || [],
  };

  // Ensure items have IDs
  for (const [section, value] of Object.entries(normalized.updates)) {
    if (Array.isArray(value)) {
      normalized.updates[section] = value.map((item, idx) => {
        if (typeof item === 'string') {
          return {
            id: `${section.slice(0, 3)}-${Date.now()}-${idx}`,
            name: item,
          };
        }
        if (!item.id) {
          item.id = `${section.slice(0, 3)}-${Date.now()}-${idx}`;
        }
        return item;
      });
    }
  }

  return normalized;
}
