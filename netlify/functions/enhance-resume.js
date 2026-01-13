/**
 * AI Resume Enhancement Function
 *
 * Takes existing resume data and enhances it to be more ATS-friendly,
 * impactful, and professional. Preserves all core information while
 * improving descriptions, bullet points, and summaries.
 *
 * Provider priority: Gemini 2.5 Flash > Groq > Claude > OpenAI
 */

// OPTIMIZED: Reduced from ~70 lines to ~20 lines
const ENHANCEMENT_PROMPT = `Rewrite this resume professionally. Return JSON only.

PRESERVE: names, emails, phones, companies, titles, dates, schools, degrees, skill names, IDs
REWRITE: summary, descriptions, ALL bulletPoints (use action verbs: Led, Architected, Optimized, Delivered)

Add ATS keywords naturally. Use "bulletPoints" array (not "highlights"). Suggest 3-5 relevant skills in "suggestedSkills" array.

Seed: {{ENHANCEMENT_SEED}}

RESUME:
`;

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
    const { resumeData } = requestData;

    if (!resumeData) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Resume data is required" }),
      };
    }

    // Remove any internal fields before sending to AI
    const cleanData = { ...resumeData };
    delete cleanData._parsedSections;
    delete cleanData._enhancements;
    delete cleanData.suggestedSkills;

    const resumeJson = JSON.stringify(cleanData, null, 2);

    console.log(`Enhancing resume for: ${cleanData.personalInfo?.fullName || 'Unknown'}`);

    // Call AI to enhance - Priority: Gemini > Groq > Claude > OpenAI
    // Gemini is primary (paid), Groq is free but has rate limits
    let enhancedData;
    let lastError;

    // Try Gemini FIRST (paid, reliable)
    if (geminiKey) {
      try {
        console.log("Trying Gemini 2.5 Flash...");
        enhancedData = await enhanceWithGemini(geminiKey, resumeJson);
      } catch (err) {
        console.error("Gemini failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to Groq (free but rate limited)
    if (!enhancedData && groqKey) {
      try {
        console.log("Trying Groq...");
        enhancedData = await enhanceWithGroq(groqKey, resumeJson);
      } catch (err) {
        console.error("Groq failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to Claude
    if (!enhancedData && anthropicKey) {
      try {
        console.log("Trying Claude...");
        enhancedData = await enhanceWithClaude(anthropicKey, resumeJson);
      } catch (err) {
        console.error("Claude failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to OpenAI
    if (!enhancedData && openaiKey) {
      try {
        console.log("Trying OpenAI...");
        enhancedData = await enhanceWithOpenAI(openaiKey, resumeJson);
      } catch (err) {
        console.error("OpenAI failed:", err.message);
        lastError = err;
      }
    }

    if (!enhancedData) {
      const errorMsg = lastError?.message || "All AI providers failed";
      console.error("All providers failed. Last error:", errorMsg);
      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Failed to enhance resume",
          details: errorMsg
        }),
      };
    }

    // Validate and ensure structure is preserved
    const validatedData = validateEnhancedData(resumeData, enhancedData);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        data: validatedData,
        enhancements: validatedData._enhancements || {},
        suggestedSkills: validatedData.suggestedSkills || [],
      }),
    };

  } catch (error) {
    console.error("Enhancement error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to enhance resume",
        details: errorMessage,
      }),
    };
  }
};

// Generate unique enhancement seed for variation
function generateEnhancementSeed() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

// Get prompt with unique seed for each enhancement
function getPromptWithSeed() {
  const seed = generateEnhancementSeed();
  return ENHANCEMENT_PROMPT.replace('{{ENHANCEMENT_SEED}}', seed);
}

// Enhance with Gemini 2.5 Flash (PRIMARY) - with thinking disabled for speed
async function enhanceWithGemini(apiKey, resumeJson) {
  const modelName = "gemini-2.5-flash";
  const promptWithSeed = getPromptWithSeed();

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 80000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: promptWithSeed + resumeJson,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
            // Note: responseMimeType removed - causes 400 error on Gemini 2.5
            // Disable thinking mode for faster responses
            thinkingConfig: {
              thinkingBudget: 0
            }
          },
        }),
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText.substring(0, 200)}`);
    }

    const result = await response.json();
    console.log("Gemini response received, parsing...");

    const content = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      console.error("No content in Gemini response:", JSON.stringify(result).substring(0, 500));
      throw new Error("No content in Gemini response");
    }

    // Extract JSON from response
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    try {
      return JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("JSON parse error. Content preview:", jsonStr.substring(0, 500));
      throw new Error(`Failed to parse Gemini response as JSON: ${parseError.message}`);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Gemini API timed out after 80s');
    }
    throw error;
  }
}

// Enhance with Groq (FREE but rate limited - 429 errors common)
async function enhanceWithGroq(apiKey, resumeJson) {
  const promptWithSeed = getPromptWithSeed();

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 50000);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer. Use bulletPoints (not highlights) for experience items.",
          },
          {
            role: "user",
            content: promptWithSeed + resumeJson,
          },
        ],
        max_tokens: 8000,
        temperature: 0.6,
        response_format: { type: "json_object" }, // Groq supports JSON mode
      }),
    });

    clearTimeout(timeoutId);

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

    // Extract JSON from response
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    return JSON.parse(jsonStr.trim());
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Groq API request timed out');
    }
    throw error;
  }
}

// Enhance with Claude
async function enhanceWithClaude(apiKey, resumeJson) {
  const promptWithSeed = getPromptWithSeed();

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 8000,
        temperature: 0.5,
        messages: [
          {
            role: "user",
            content: promptWithSeed + resumeJson,
          },
        ],
      }),
    });

    clearTimeout(timeoutId);

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

    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    return JSON.parse(jsonStr.trim());
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Claude API request timed out');
    }
    throw error;
  }
}

// Enhance with OpenAI
async function enhanceWithOpenAI(apiKey, resumeJson) {
  const promptWithSeed = getPromptWithSeed();

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer.",
          },
          {
            role: "user",
            content: promptWithSeed + resumeJson,
          },
        ],
        max_tokens: 8000,
        temperature: 0.5,
        response_format: { type: "json_object" }, // Guarantees valid JSON output
      }),
    });

    clearTimeout(timeoutId);

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

    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    return JSON.parse(jsonStr.trim());
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('OpenAI API request timed out');
    }
    throw error;
  }
}

// Validate enhanced data - ensure critical fields are preserved while allowing content rewriting
function validateEnhancedData(original, enhanced) {
  const validated = { ...enhanced };

  // Preserve personal info identity fields BUT allow summary/title to be rewritten
  if (original.personalInfo) {
    validated.personalInfo = {
      // ALLOW these to be rewritten by AI
      summary: enhanced.personalInfo?.summary || original.personalInfo.summary || '',
      title: enhanced.personalInfo?.title || original.personalInfo.title || '',
      // NEVER change these identity fields
      fullName: original.personalInfo.fullName,
      email: original.personalInfo.email,
      phone: original.personalInfo.phone,
      location: original.personalInfo.location,
      linkedin: original.personalInfo.linkedin,
      github: original.personalInfo.github,
      portfolio: original.personalInfo.portfolio,
      website: original.personalInfo.website,
    };
  }

  // Preserve experience identity fields, but ALLOW description and bulletPoints to be COMPLETELY REWRITTEN
  if (original.experience && Array.isArray(original.experience)) {
    validated.experience = original.experience.map((origExp, idx) => {
      const enhancedExp = enhanced.experience?.[idx] || origExp;

      // Handle bulletPoints - AI might return "highlights" instead of "bulletPoints"
      // Priority: enhancedExp.bulletPoints > enhancedExp.highlights > origExp.bulletPoints
      let bulletPoints = origExp.bulletPoints || [];
      if (enhancedExp.bulletPoints && Array.isArray(enhancedExp.bulletPoints) && enhancedExp.bulletPoints.length > 0) {
        bulletPoints = enhancedExp.bulletPoints;
      } else if (enhancedExp.highlights && Array.isArray(enhancedExp.highlights) && enhancedExp.highlights.length > 0) {
        // Map highlights to bulletPoints if AI used wrong field name
        bulletPoints = enhancedExp.highlights;
      }

      return {
        // NEVER change these identity fields
        id: origExp.id,
        company: origExp.company,
        position: origExp.position,
        startDate: origExp.startDate,
        endDate: origExp.endDate,
        current: origExp.current,
        location: origExp.location,
        // ALLOW description to be completely rewritten
        description: enhancedExp.description || origExp.description || '',
        // Use enhanced bulletPoints (mapped from highlights if needed)
        bulletPoints: bulletPoints,
      };
    });
  }

  // Preserve education identity fields, but ALLOW descriptions/achievements to be rewritten
  if (original.education && Array.isArray(original.education)) {
    validated.education = original.education.map((origEdu, idx) => {
      const enhancedEdu = enhanced.education?.[idx] || origEdu;
      return {
        // NEVER change these identity fields
        id: origEdu.id,
        school: origEdu.school,
        degree: origEdu.degree,
        field: origEdu.field,
        startDate: origEdu.startDate,
        endDate: origEdu.endDate,
        location: origEdu.location,
        gpa: origEdu.gpa,
        // ALLOW these to be rewritten
        description: enhancedEdu.description || origEdu.description || '',
        achievements: enhancedEdu.achievements || origEdu.achievements || '',
        activities: enhancedEdu.activities || origEdu.activities || '',
      };
    });
  }

  // NEVER remove skills - merge with enhanced
  if (original.skills && Array.isArray(original.skills)) {
    const originalSkillNames = new Set(original.skills.map(s => s.name.toLowerCase()));
    const enhancedSkills = enhanced.skills || [];

    // Start with all original skills
    validated.skills = [...original.skills];

    // Add any new skills from enhancement that don't already exist
    enhancedSkills.forEach(skill => {
      if (!originalSkillNames.has(skill.name.toLowerCase())) {
        validated.skills.push(skill);
      }
    });
  }

  // Handle PROJECTS separately - allow description/highlights to be rewritten
  if (original.projects && Array.isArray(original.projects)) {
    validated.projects = original.projects.map((origProj, idx) => {
      const enhancedProj = enhanced.projects?.[idx] || origProj;
      return {
        // NEVER change these identity fields
        id: origProj.id,
        name: origProj.name,
        url: origProj.url,
        startDate: origProj.startDate,
        endDate: origProj.endDate,
        technologies: enhancedProj.technologies || origProj.technologies || [],
        // ALLOW these to be rewritten
        description: enhancedProj.description || origProj.description || '',
        highlights: enhancedProj.highlights || origProj.highlights || [],
      };
    });
  }

  // Preserve other array sections with their IDs (allow content rewriting)
  const arraySections = [
    'languages', 'certifications', 'awards',
    'achievements', 'strengths', 'volunteer', 'publications',
    'speaking', 'patents', 'interests', 'references', 'courses'
  ];

  arraySections.forEach(section => {
    if (original[section] && Array.isArray(original[section])) {
      validated[section] = original[section].map((origItem, idx) => {
        const enhancedItem = enhanced[section]?.[idx] || origItem;
        return {
          ...enhancedItem,
          id: origItem.id, // Always preserve ID
        };
      });
    }
  });

  // Preserve custom sections structure
  if (original.customSections && Array.isArray(original.customSections)) {
    validated.customSections = original.customSections.map((origSection, idx) => {
      const enhancedSection = enhanced.customSections?.[idx] || origSection;
      return {
        id: origSection.id,
        title: origSection.title,
        items: origSection.items.map((origItem, itemIdx) => {
          const enhancedItem = enhancedSection.items?.[itemIdx] || origItem;
          return {
            ...enhancedItem,
            id: origItem.id,
          };
        }),
      };
    });
  }

  // Preserve version and settings
  validated.version = original.version || "2.0";
  validated.settings = original.settings;

  return validated;
}

module.exports = { handler };
