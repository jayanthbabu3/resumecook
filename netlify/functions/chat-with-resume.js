/**
 * Chat With Resume - Conversational Resume Builder
 * OPTIMIZED: Reduced prompt from ~8000 tokens to ~800 tokens (90% reduction)
 *
 * Uses minimal prompting - LLMs already understand resume writing and JSON formatting.
 * Structured output mode guarantees valid JSON responses.
 */

// Available variants for each section - used for UI style changes
const SECTION_VARIANTS = {
  experience: ['standard', 'compact', 'timeline', 'cards', 'minimal', 'modern', 'enhanced', 'timeline-pro', 'icon-accent', 'icon-clean', 'dots-timeline'],
  education: ['standard', 'compact', 'detailed', 'timeline', 'cards', 'minimal', 'academic', 'modern'],
  skills: ['pills', 'tags', 'list', 'grouped', 'bars', 'dots', 'columns', 'inline', 'table', 'category-lines', 'bordered-tags', 'pills-accent', 'inline-dots', 'boxed', 'compact', 'modern'],
  projects: ['standard', 'cards', 'compact', 'grid', 'timeline', 'showcase', 'minimal', 'detailed'],
  certifications: ['standard', 'list', 'cards', 'compact', 'badges', 'timeline', 'detailed', 'grouped'],
  languages: ['standard', 'list', 'pills', 'bars', 'grid', 'inline', 'compact', 'flags'],
  achievements: ['standard', 'list', 'bullets', 'cards', 'numbered', 'timeline', 'minimal', 'compact', 'badges', 'metrics', 'boxed'],
  interests: ['pills', 'icons', 'grid', 'detailed', 'list', 'standard'],
  awards: ['standard', 'trophies', 'cards', 'compact', 'timeline'],
  publications: ['modern', 'academic', 'cards', 'compact'],
  volunteer: ['standard', 'compact', 'timeline', 'cards'],
  patents: ['standard', 'detailed', 'compact', 'cards'],
  references: ['standard', 'compact', 'cards', 'available'],
  courses: ['standard', 'detailed', 'compact', 'cards'],
  strengths: ['cards', 'list', 'pills', 'grid', 'minimal', 'accent-border'],
};

// Popular/recommended variants per section for quick suggestions
const POPULAR_VARIANTS = {
  skills: ['pills', 'tags', 'bars', 'grouped', 'modern'],
  experience: ['standard', 'timeline', 'cards', 'modern'],
  education: ['standard', 'cards', 'timeline'],
  projects: ['cards', 'grid', 'showcase'],
  certifications: ['badges', 'cards', 'timeline'],
  languages: ['pills', 'bars', 'flags'],
  achievements: ['cards', 'badges', 'metrics'],
  interests: ['pills', 'icons', 'grid'],
};

// Optimized system prompt - complete formats for ALL sections
const SYSTEM_PROMPT = `You are a proactive resume assistant. Take ACTION instead of asking questions.

RESPOND with valid JSON:
{
  "message": "Your response",
  "updates": { /* ONLY sections you're changing */ },
  "updatedSections": ["sectionName"],
  "suggestedQuestions": ["Follow-up?"],
  "variantChanges": [{"section": "sectionName", "variant": "variantId"}]
}

BE PROACTIVE - TAKE ACTION:
- "Add DevOps skills" → ADD common DevOps skills (Docker, Kubernetes, CI/CD, AWS, Terraform, Jenkins, Ansible)
- "Add more skills related to X" → ADD 5-8 relevant skills immediately, don't ask which ones
- "Add frontend skills" → ADD React, Vue, Angular, TypeScript, CSS, HTML, Webpack, etc.
- "Add a DevOps category" → CREATE skills with category "DevOps" and add relevant skills
- "Improve my summary" → REWRITE the summary to be better, don't ask how
- Only ask questions when truly ambiguous (e.g., "which company?" for experience)

CRITICAL RULES:
1. ONLY include sections in "updates" that you are actually modifying
2. If user asks to add interests, ONLY return interests - NOT experience/education
3. All data goes inside "updates" object, never at root level
4. Generate IDs as "type-timestamp-random" (e.g., "int-1736789-abc")
5. Use EXACT field names as specified below

UI/STYLE CHANGE HANDLING:
When users ask about UI, design, style, layout, or appearance:
- For vague requests ("change skills UI"): Show options in a CONCISE format:
  "Here are the available styles for skills: pills, tags, bars, grouped, cards. Which one would you like?"
- For specific requests ("make it cards", "use timeline"): Apply directly with variantChanges
- Keep style descriptions SHORT - just the name, user will see the preview

SECTION FORMATS (all items need id):

personalInfo: {fullName, email, phone, location, title, summary, linkedin, github, portfolio, website}

experience: [{id, company, position, location, startDate, endDate, current, description, bulletPoints[]}]
education: [{id, school, degree, field, location, startDate, endDate, gpa}]
projects: [{id, name, description, technologies[], url, highlights[]}]

skills: [{id, name, category}]
languages: [{id, language, proficiency}]  // proficiency: Native/Fluent/Professional/Advanced/Intermediate/Basic
interests: [{id, name}]
certifications: [{id, name, issuer, date, credentialId, url}]
courses: [{id, name, provider, date}]

strengths: [{id, title, description}]
achievements: [{id, title, description, date, metric}]
awards: [{id, title, issuer, date, description}]
publications: [{id, title, publisher, date, authors[], url}]
patents: [{id, title, patentNumber, date, status}]  // status: Pending/Granted/Published
speaking: [{id, event, topic, date, location}]
volunteer: [{id, organization, role, location, startDate, endDate, current, description, highlights[]}]
references: [{id, name, title, company, email, phone, relationship}]

customSections: [{id, title, items: [{id, content, date?, url?}]}]

For experience/education/projects: return COMPLETE array (preserve existing IDs)
For other sections: return only NEW items to append

Return valid JSON only.
`;

// Resume sections that should be inside updates object
const RESUME_SECTIONS = [
  'personalInfo', 'experience', 'education', 'skills', 'languages',
  'certifications', 'projects', 'achievements', 'awards', 'publications',
  'volunteer', 'speaking', 'patents', 'interests', 'references', 'courses', 'strengths',
  'customSections'
];

/**
 * Section field configurations
 * Defines the primary text field and required fields for each section
 */
const SECTION_CONFIG = {
  // Sections using 'title' as primary text field
  strengths: { primaryField: 'title', requiredFields: ['title'], defaults: { description: '' } },
  achievements: { primaryField: 'title', requiredFields: ['title'], defaults: { description: '' } },
  awards: { primaryField: 'title', requiredFields: ['title'], defaults: { issuer: '', date: '' } },
  publications: { primaryField: 'title', requiredFields: ['title'], defaults: { publisher: '', date: '' } },
  patents: { primaryField: 'title', requiredFields: ['title'], defaults: { patentNumber: '', date: '', status: 'Pending' } },

  // Sections using 'name' as primary text field
  skills: { primaryField: 'name', requiredFields: ['name'], defaults: { category: '' } },
  interests: { primaryField: 'name', requiredFields: ['name'], defaults: {} },
  certifications: { primaryField: 'name', requiredFields: ['name'], defaults: { issuer: '', date: '' } },
  courses: { primaryField: 'name', requiredFields: ['name'], defaults: { provider: '', date: '' } },
  projects: { primaryField: 'name', requiredFields: ['name'], defaults: { description: '', technologies: [] } },

  // Sections with unique primary fields
  languages: { primaryField: 'language', requiredFields: ['language'], defaults: { proficiency: 'Intermediate' } },
  speaking: { primaryField: 'topic', requiredFields: ['topic', 'event'], defaults: { event: '', date: '' } },
  volunteer: { primaryField: 'organization', requiredFields: ['organization', 'role'], defaults: { role: '', startDate: '', endDate: '', current: false } },
  references: { primaryField: 'name', requiredFields: ['name'], defaults: { title: '', company: '', relationship: '' } },

  // Complex sections (experience/education handled separately)
  experience: { primaryField: 'company', requiredFields: ['company', 'position'], defaults: { position: '', startDate: '', endDate: '', current: false, bulletPoints: [] } },
  education: { primaryField: 'school', requiredFields: ['school'], defaults: { degree: '', field: '', startDate: '', endDate: '' } },

  // Custom sections (nested structure)
  customSections: { primaryField: 'title', requiredFields: ['title'], defaults: { items: [] }, isNested: true },
};

/**
 * Common field name variations that AI might use
 * Maps incorrect field names to correct ones per section
 */
const FIELD_ALIASES = {
  // 'name' field should be 'title' for these sections
  name: { strengths: 'title', achievements: 'title', awards: 'title', publications: 'title', patents: 'title' },

  // 'title' field should be 'name' for these sections, 'topic' for speaking
  title: { skills: 'name', interests: 'name', certifications: 'name', courses: 'name', speaking: 'topic' },

  // Language field variations
  lang: { languages: 'language' },
  languageName: { languages: 'language' },
  name: { languages: 'language' }, // Will be overridden, handle separately

  // Speaking field variations
  talkTitle: { speaking: 'topic' },
  presentation: { speaking: 'topic' },
  conference: { speaking: 'event' },

  // Volunteer field confusion
  company: { volunteer: 'organization' },
  position: { volunteer: 'role' },

  // Experience bullet points confusion
  highlights: { experience: 'bulletPoints', projects: 'highlights' }, // Keep highlights for projects
  bullets: { experience: 'bulletPoints' },
  responsibilities: { experience: 'bulletPoints' },
};

/**
 * Special handling for sections where 'name' means different things
 */
function fixFieldForSection(item, section) {
  // Special case: languages uses 'language' not 'name'
  if (section === 'languages') {
    if (item.name && !item.language) {
      item.language = item.name;
      delete item.name;
      return true;
    }
  }
  return false;
}

/**
 * Normalize AI response to ensure consistent structure
 * - Moves root-level sections into updates
 * - Fixes malformed section names
 * - Converts field names to correct ones per section
 * - Ensures all items have IDs and required fields
 */
function normalizeResponse(response, updatedSections = []) {
  const normalized = {
    message: response.message || "I've updated your resume.",
    updates: response.updates || {},
    updatedSections: response.updatedSections || updatedSections,
    suggestedQuestions: response.suggestedQuestions || [],
    variantChanges: response.variantChanges || []
  };

  // Validate and filter variantChanges to only include valid section/variant combinations
  if (normalized.variantChanges.length > 0) {
    normalized.variantChanges = normalized.variantChanges.filter(change => {
      if (!change.section || !change.variant) return false;
      const validVariants = SECTION_VARIANTS[change.section];
      if (!validVariants) {
        console.log(`[Normalize] Invalid section for variant change: ${change.section}`);
        return false;
      }
      if (!validVariants.includes(change.variant)) {
        console.log(`[Normalize] Invalid variant "${change.variant}" for section "${change.section}". Valid: ${validVariants.join(', ')}`);
        return false;
      }
      return true;
    });
    if (normalized.variantChanges.length > 0) {
      console.log(`[Normalize] Valid variant changes: ${JSON.stringify(normalized.variantChanges)}`);
    }
  }

  // Fix malformed combined section names and wrong field names
  const combinedSectionFixes = {
    'achievements/awards/strengths': 'strengths',
    'achievements/awards': 'achievements',
    'interests/hobbies': 'interests',
    'skills/abilities': 'skills',
    'certifications/licenses': 'certifications',
    'speaking/presentations': 'speaking',
    'volunteer/community': 'volunteer',
    // Common wrong names for customSections
    'customDetails': 'customSections',
    'custom': 'customSections',
    'customSection': 'customSections',
    'additionalSections': 'customSections',
    'otherSections': 'customSections',
  };

  // Check updates for combined section names and fix them
  for (const [badKey, goodKey] of Object.entries(combinedSectionFixes)) {
    if (normalized.updates[badKey]) {
      normalized.updates[goodKey] = normalized.updates[badKey];
      delete normalized.updates[badKey];
      const idx = normalized.updatedSections.indexOf(badKey);
      if (idx !== -1) {
        normalized.updatedSections[idx] = goodKey;
      }
      console.log(`[Normalize] Fixed section name: "${badKey}" → "${goodKey}"`);
    }
  }

  // Move any root-level resume sections into updates
  for (const section of RESUME_SECTIONS) {
    if (response[section] && !normalized.updates[section]) {
      normalized.updates[section] = response[section];
      if (!normalized.updatedSections.includes(section)) {
        normalized.updatedSections.push(section);
      }
    }
  }

  // Remove sections from updates that weren't actually requested
  if (normalized.updatedSections.length > 0) {
    for (const section of Object.keys(normalized.updates)) {
      if (!normalized.updatedSections.includes(section) && section !== 'personalInfo') {
        const value = normalized.updates[section];
        if (Array.isArray(value) && value.length > 0) {
          if (['experience', 'education', 'projects'].includes(section)) {
            delete normalized.updates[section];
            console.log(`[Normalize] Removed unchanged section: ${section}`);
          }
        }
      }
    }
  }

  // Normalize array items to have proper structure
  for (const [section, value] of Object.entries(normalized.updates)) {
    if (!Array.isArray(value)) continue;

    const config = SECTION_CONFIG[section];
    if (!config) continue; // Skip unknown sections

    normalized.updates[section] = value.map((item, idx) => {
      // If item is a string, convert to object with primary field
      if (typeof item === 'string') {
        const newItem = {
          id: `${section.slice(0, 3)}-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
          [config.primaryField]: item,
          ...config.defaults
        };
        console.log(`[Normalize] Converted string to object for ${section}: "${item}"`);
        return newItem;
      }

      // Ensure item has an ID
      if (!item.id) {
        item.id = `${section.slice(0, 3)}-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`;
      }

      // Apply special field fixes first (e.g., languages.name → languages.language)
      if (fixFieldForSection(item, section)) {
        console.log(`[Normalize] Applied special field fix for ${section}`);
      }

      // Fix field name aliases (e.g., 'name' → 'title' for strengths)
      for (const [aliasField, sectionMap] of Object.entries(FIELD_ALIASES)) {
        if (sectionMap[section] && item[aliasField] && !item[sectionMap[section]]) {
          item[sectionMap[section]] = item[aliasField];
          delete item[aliasField];
          console.log(`[Normalize] Fixed field ${aliasField}→${sectionMap[section]} for ${section}`);
        }
      }

      // Apply defaults for missing required fields
      for (const [defaultField, defaultValue] of Object.entries(config.defaults)) {
        if (item[defaultField] === undefined) {
          item[defaultField] = defaultValue;
        }
      }

      // Special handling for nested structures (customSections)
      if (config.isNested && section === 'customSections') {
        // Ensure items array exists and has proper structure
        if (!item.items) {
          item.items = [];
        }
        // Normalize each item in the nested items array
        item.items = item.items.map((subItem, subIdx) => {
          if (typeof subItem === 'string') {
            return {
              id: `csi-${Date.now()}-${subIdx}-${Math.random().toString(36).slice(2, 7)}`,
              content: subItem
            };
          }
          if (!subItem.id) {
            subItem.id = `csi-${Date.now()}-${subIdx}-${Math.random().toString(36).slice(2, 7)}`;
          }
          return subItem;
        });
      }

      return item;
    });
  }

  return normalized;
}

const handler = async (event) => {
  // Allowed origins for CORS
  const allowedOrigins = [
    "https://resumecook.com",
    "https://www.resumecook.com",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
  ];

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

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Get API keys from environment
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !groqKey && !anthropicKey && !openaiKey) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "AI service not configured. Please set GEMINI_API_KEY, GROQ_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY."
      }),
    };
  }

  try {
    const requestData = JSON.parse(event.body || "{}");
    const { message, conversationHistory, currentResumeData, currentSectionVariants } = requestData;

    if (!message) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Build conversation context with SMART token optimization
    let conversationContext = "";

    const isFirstMessage = !conversationHistory || conversationHistory.length === 0;

    // Include resume context
    if (currentResumeData) {
      if (!isFirstMessage) {
        // Send compact summary to save tokens
        const summary = createResumeSummary(currentResumeData, currentSectionVariants);
        if (summary) {
          conversationContext += `CURRENT RESUME STATE:\n${summary}\n\n`;
        }
      }
    }

    // Include conversation history (last 6 messages max to save tokens)
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-6);
      conversationContext += "CONVERSATION HISTORY:\n";
      recentHistory.forEach((msg) => {
        if (msg.role === 'user') {
          conversationContext += `User: ${msg.content}\n`;
        } else {
          // Truncate long assistant messages to save tokens
          const truncated = msg.content.length > 200
            ? msg.content.substring(0, 200) + '...'
            : msg.content;
          conversationContext += `Assistant: ${truncated}\n`;
        }
      });
      conversationContext += "\n";
    }

    conversationContext += `NEW MESSAGE FROM USER: ${message}`;

    console.log(`Chat with resume - Processing message: "${message.substring(0, 100)}..."`);

    // Call AI to process the message
    // Priority: Gemini (free) > Groq (free) > Claude > OpenAI
    let response;
    let modelUsed = "unknown";
    const errors = {}; // Track errors from each provider

    if (geminiKey) {
      try {
        console.log("[Chat] Attempting Gemini (gemini-2.5-flash)...");
        response = await processWithGemini(geminiKey, conversationContext);
        modelUsed = "gemini-2.5-flash";
        console.log("[Chat] Successfully used Gemini");
      } catch (error) {
        errors.gemini = error.message;
        console.error("[Chat] Gemini failed:", error.message);
      }
    }

    if (!response && groqKey) {
      try {
        console.log("[Chat] Attempting Groq (llama-3.3-70b-versatile)...");
        response = await processWithGroq(groqKey, conversationContext);
        modelUsed = "groq/llama-3.3-70b-versatile";
        console.log("[Chat] Successfully used Groq");
      } catch (error) {
        errors.groq = error.message;
        console.error("[Chat] Groq failed:", error.message);
      }
    }

    if (!response && anthropicKey) {
      try {
        console.log("[Chat] Attempting Claude (claude-3-haiku)...");
        response = await processWithClaude(anthropicKey, conversationContext);
        modelUsed = "claude-3-haiku";
        console.log("[Chat] Successfully used Claude");
      } catch (error) {
        errors.claude = error.message;
        console.error("[Chat] Claude failed:", error.message);
      }
    }

    if (!response && openaiKey) {
      try {
        console.log("[Chat] Attempting OpenAI (gpt-4o-mini)...");
        response = await processWithOpenAI(openaiKey, conversationContext);
        modelUsed = "gpt-4o-mini";
        console.log("[Chat] Successfully used OpenAI");
      } catch (error) {
        errors.openai = error.message;
        console.error("[Chat] OpenAI failed:", error.message);
      }
    }

    if (!response) {
      // Collect info about which providers were attempted
      const attemptedProviders = [];
      if (geminiKey) attemptedProviders.push("Gemini");
      if (groqKey) attemptedProviders.push("Groq");
      if (anthropicKey) attemptedProviders.push("Claude");
      if (openaiKey) attemptedProviders.push("OpenAI");

      const missingProviders = [];
      if (!geminiKey) missingProviders.push("GEMINI_API_KEY");
      if (!groqKey) missingProviders.push("GROQ_API_KEY");
      if (!anthropicKey) missingProviders.push("ANTHROPIC_API_KEY");
      if (!openaiKey) missingProviders.push("OPENAI_API_KEY");

      console.error(`[Chat] All providers failed. Attempted: ${attemptedProviders.join(", ")}. Missing keys: ${missingProviders.join(", ")}`);

      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Failed to process message. All AI providers failed.",
          attempted: attemptedProviders,
          missingKeys: missingProviders,
          providerErrors: errors
        }),
      };
    }

    // Normalize response to ensure consistent structure
    const normalizedResponse = normalizeResponse(response);
    console.log(`[Chat] Normalized response - updatedSections: ${normalizedResponse.updatedSections.join(', ')}`);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        modelUsed,
        ...normalizedResponse,
      }),
    };

  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to process message",
        details: errorMessage,
      }),
    };
  }
};

// Process with Gemini (FREE - Primary)
// Using Gemini 2.5 Flash - latest stable model (2025)
async function processWithGemini(apiKey, conversationContext) {
  // Validate API key format
  if (!apiKey || apiKey.length < 20) {
    throw new Error("Invalid Gemini API key format");
  }

  // Use Gemini 2.5 Flash - the latest stable model
  const modelName = "gemini-2.5-flash";
  console.log(`[Gemini] Making API request with model: ${modelName}...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: SYSTEM_PROMPT + "\n\n" + conversationContext,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
          // Note: responseMimeType removed - causes 400 error on Gemini 2.5
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Gemini] API error:", response.status);
    console.error("[Gemini] Error details:", errorText);

    // Parse error for more details
    try {
      const errorJson = JSON.parse(errorText);
      const errorMessage = errorJson.error?.message || errorText;
      throw new Error(`Gemini API error ${response.status}: ${errorMessage}`);
    } catch (parseError) {
      throw new Error(`Gemini API error ${response.status}: ${errorText.substring(0, 200)}`);
    }
  }

  const result = await response.json();
  console.log("[Gemini] Response received, candidates:", result.candidates?.length || 0);

  const content = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    console.error("[Gemini] No content in response. Full result:", JSON.stringify(result).substring(0, 500));
    throw new Error("No content in Gemini response");
  }

  console.log("[Gemini] Content length:", content.length);
  return parseAIResponse(content);
}

// Process with Groq (FREE - Secondary)
async function processWithGroq(apiKey, conversationContext) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: conversationContext,
        },
      ],
      max_tokens: 4000,
      temperature: 0.7,
      response_format: { type: "json_object" }, // Groq supports JSON mode
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Groq API error:", response.status, errorText);
    throw new Error(`Groq API error: ${response.status}`);
  }

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in Groq response");
  }

  return parseAIResponse(content);
}

// Process with Claude
async function processWithClaude(apiKey, conversationContext) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: SYSTEM_PROMPT + "\n\n" + conversationContext,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Claude API error:", response.status, errorText);
    throw new Error(`Claude API error: ${response.status}`);
  }

  const result = await response.json();
  const content = result.content?.[0]?.text;

  if (!content) {
    throw new Error("No content in Claude response");
  }

  return parseAIResponse(content);
}

// Process with OpenAI
async function processWithOpenAI(apiKey, conversationContext) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: conversationContext,
        },
      ],
      max_tokens: 4000,
      temperature: 0.7,
      response_format: { type: "json_object" }, // Guarantees valid JSON output
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI API error:", response.status, errorText);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in OpenAI response");
  }

  return parseAIResponse(content);
}

// Parse AI response and extract JSON
function parseAIResponse(content) {
  // Try to extract JSON from the response
  let jsonStr = content.trim();

  // Remove markdown code blocks if present
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  // Try to find JSON object in the response
  const jsonObjectMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (jsonObjectMatch) {
    jsonStr = jsonObjectMatch[0];
  }

  try {
    const parsed = JSON.parse(jsonStr);

    // Validate required fields
    if (!parsed.message) {
      parsed.message = "I've processed your information. What would you like to add next?";
    }
    if (!parsed.updates) {
      parsed.updates = {};
    }
    if (!parsed.updatedSections) {
      parsed.updatedSections = Object.keys(parsed.updates);
    }
    if (!parsed.suggestedQuestions) {
      parsed.suggestedQuestions = [];
    }

    return parsed;
  } catch (e) {
    console.error("Failed to parse AI response:", e);
    console.error("Raw content:", content);

    // Return a fallback response
    return {
      message: content.substring(0, 500) || "I understood your message. Could you provide more details about your professional background?",
      updates: {},
      updatedSections: [],
      suggestedQuestions: ["What is your current job title?", "How many years of experience do you have?"],
    };
  }
}

/**
 * Create a compact text summary of the resume to minimize tokens
 * Includes ALL sections that have content
 * @param {object} resumeData - The resume data
 * @param {object} currentVariants - Current section variants (e.g., {skills: 'pills', experience: 'timeline'})
 */
function createResumeSummary(resumeData, currentVariants = {}) {
  if (!resumeData) return null;

  const parts = [];

  // Add UI/Style context if user has sections with variants
  const sectionsWithVariants = Object.keys(SECTION_VARIANTS);
  const currentVariantEntries = Object.entries(currentVariants || {}).filter(([section]) =>
    sectionsWithVariants.includes(section)
  );

  if (currentVariantEntries.length > 0 || Object.keys(resumeData).some(k => sectionsWithVariants.includes(k))) {
    parts.push('SECTION UI STYLES (for style/layout change requests):');
    parts.push('Current styles: ' + (currentVariantEntries.length > 0
      ? currentVariantEntries.map(([s, v]) => `${s}=${v}`).join(', ')
      : 'default for all sections'));

    // Only include available variants for sections that exist in resume
    const existingSections = sectionsWithVariants.filter(section => {
      if (section === 'personalInfo') return false;
      const data = resumeData[section];
      return data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0);
    });

    if (existingSections.length > 0) {
      parts.push('Available styles (show POPULAR ones first when listing options):');
      existingSections.forEach(section => {
        const popular = POPULAR_VARIANTS[section] || SECTION_VARIANTS[section].slice(0, 5);
        const others = SECTION_VARIANTS[section].filter(v => !popular.includes(v));
        parts.push(`  ${section}: ${popular.join(', ')}${others.length > 0 ? ` (+ ${others.length} more)` : ''}`);
      });
    }
    parts.push('');
  }

  // Personal Info - one line
  const pi = resumeData.personalInfo;
  if (pi) {
    const personalParts = [];
    if (pi.fullName) personalParts.push(`Name: ${pi.fullName}`);
    if (pi.title) personalParts.push(`Title: ${pi.title}`);
    if (pi.email) personalParts.push(`Email: ${pi.email}`);
    if (pi.location) personalParts.push(`Location: ${pi.location}`);
    if (personalParts.length > 0) {
      parts.push(personalParts.join(' | '));
    }
    if (pi.summary) {
      parts.push(`Summary: ${pi.summary.substring(0, 100)}${pi.summary.length > 100 ? '...' : ''}`);
    }
  }

  // Experience - FULL DATA with IDs (needed for AI to return complete arrays)
  if (resumeData.experience && resumeData.experience.length > 0) {
    parts.push(`Experience (${resumeData.experience.length}) - FULL DATA (preserve IDs when returning):`);
    parts.push(JSON.stringify(resumeData.experience, null, 0));
  }

  // Education - FULL DATA with IDs (needed for AI to return complete arrays)
  if (resumeData.education && resumeData.education.length > 0) {
    parts.push(`Education (${resumeData.education.length}) - FULL DATA (preserve IDs when returning):`);
    parts.push(JSON.stringify(resumeData.education, null, 0));
  }

  // Skills - just names
  if (resumeData.skills && resumeData.skills.length > 0) {
    const skillNames = resumeData.skills.map(s => s.name).join(', ');
    parts.push(`Skills (${resumeData.skills.length}): ${skillNames}`);
  }

  // Languages - just names with proficiency
  if (resumeData.languages && resumeData.languages.length > 0) {
    const langSummary = resumeData.languages.map(l => `${l.language || l.name} (${l.proficiency || 'Intermediate'})`).join(', ');
    parts.push(`Languages (${resumeData.languages.length}): ${langSummary}`);
  }

  // Certifications - just names
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    const certNames = resumeData.certifications.map(c => c.name).join(', ');
    parts.push(`Certifications (${resumeData.certifications.length}): ${certNames}`);
  }

  // Projects - FULL DATA with IDs (needed for AI to return complete arrays)
  if (resumeData.projects && resumeData.projects.length > 0) {
    parts.push(`Projects (${resumeData.projects.length}) - FULL DATA (preserve IDs when returning):`);
    parts.push(JSON.stringify(resumeData.projects, null, 0));
  }

  // Achievements
  if (resumeData.achievements && resumeData.achievements.length > 0) {
    const achNames = resumeData.achievements.map(a => a.title || a.name).join(', ');
    parts.push(`Achievements (${resumeData.achievements.length}): ${achNames}`);
  }

  // Awards
  if (resumeData.awards && resumeData.awards.length > 0) {
    const awardNames = resumeData.awards.map(a => a.title || a.name).join(', ');
    parts.push(`Awards (${resumeData.awards.length}): ${awardNames}`);
  }

  // Publications
  if (resumeData.publications && resumeData.publications.length > 0) {
    const pubNames = resumeData.publications.map(p => p.title || p.name).join(', ');
    parts.push(`Publications (${resumeData.publications.length}): ${pubNames}`);
  }

  // Volunteer
  if (resumeData.volunteer && resumeData.volunteer.length > 0) {
    const volSummary = resumeData.volunteer.map(v => `${v.role} @ ${v.organization}`).join(', ');
    parts.push(`Volunteer (${resumeData.volunteer.length}): ${volSummary}`);
  }

  // Speaking
  if (resumeData.speaking && resumeData.speaking.length > 0) {
    const speakSummary = resumeData.speaking.map(s => `${s.topic || s.title} @ ${s.event}`).join(', ');
    parts.push(`Speaking (${resumeData.speaking.length}): ${speakSummary}`);
  }

  // Patents
  if (resumeData.patents && resumeData.patents.length > 0) {
    const patNames = resumeData.patents.map(p => p.title || p.name).join(', ');
    parts.push(`Patents (${resumeData.patents.length}): ${patNames}`);
  }

  // Interests
  if (resumeData.interests && resumeData.interests.length > 0) {
    const intNames = resumeData.interests.map(i => i.name).join(', ');
    parts.push(`Interests (${resumeData.interests.length}): ${intNames}`);
  }

  // References
  if (resumeData.references && resumeData.references.length > 0) {
    const refNames = resumeData.references.map(r => r.name).join(', ');
    parts.push(`References (${resumeData.references.length}): ${refNames}`);
  }

  // Courses
  if (resumeData.courses && resumeData.courses.length > 0) {
    const courseNames = resumeData.courses.map(c => c.name).join(', ');
    parts.push(`Courses (${resumeData.courses.length}): ${courseNames}`);
  }

  // Strengths
  if (resumeData.strengths && resumeData.strengths.length > 0) {
    const strNames = resumeData.strengths.map(s => s.title || s.name).join(', ');
    parts.push(`Strengths (${resumeData.strengths.length}): ${strNames}`);
  }

  // Custom Sections - FULL DATA with IDs
  if (resumeData.customSections && resumeData.customSections.length > 0) {
    parts.push(`Custom Sections (${resumeData.customSections.length}) - FULL DATA (preserve IDs when returning):`);
    parts.push(JSON.stringify(resumeData.customSections, null, 0));
  }

  return parts.length > 0 ? parts.join('\n') : null;
}

module.exports = { handler };
