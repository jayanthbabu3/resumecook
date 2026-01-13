/**
 * Generate Resume from Job Description
 *
 * For users who don't have an existing resume, this function generates
 * a professional resume structure based on:
 * 1. Job description (required)
 * 2. Basic user info: name, email, target role (required)
 * 3. Years of experience hint from job description
 *
 * The AI will:
 * - Generate 2-3 experience entries with BLANK company names and dates
 * - Create realistic, role-appropriate bullet points
 * - Write a tailored professional summary
 * - Extract and suggest relevant skills from job description
 * - Generate relevant project ideas (if applicable)
 *
 * User fills in: company names, dates, education details, contact info
 */

// OPTIMIZED: Reduced from ~235 lines to ~30 lines
const GENERATE_RESUME_PROMPT = `Generate a resume structure from this job description. Return JSON only.

RULES:
1. Use "[Company Name]" for companies, empty "" for dates (user fills these)
2. Extract skills from the JD
3. Create 1-3 experiences based on seniority (entry=1-2, mid=2-3, senior=3)
4. Each bullet point must be UNIQUE - no repeated themes across experiences
5. No fake metrics/numbers
6. Use "highlights" array for bullet points

OUTPUT: {personalInfo, experience[], education[], skills[], projects[], certifications[], languages[], achievements[], _metadata}

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

  // Get API keys from environment - Priority: Gemini > Groq > Claude > OpenAI
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
    const {
      jobDescription,
      jobTitle,
      companyName,
      userName,
      userEmail
    } = requestData;

    // Validate required fields
    if (!jobDescription || jobDescription.trim().length < 50) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Job description is required (minimum 50 characters)" }),
      };
    }

    if (!userName || userName.trim().length < 2) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Your name is required" }),
      };
    }

    // Build the prompt with user info and job description
    const userContext = `
═══════════════════════════════════════════════════════════════
USER INFORMATION (Use these exact values)
═══════════════════════════════════════════════════════════════
Name: ${userName.trim()}
Email: ${userEmail ? userEmail.trim() : '[Your Email]'}

═══════════════════════════════════════════════════════════════
JOB DESCRIPTION TO TARGET
═══════════════════════════════════════════════════════════════
${jobTitle ? `Target Role: ${jobTitle}` : ''}
${companyName ? `Target Company: ${companyName}` : ''}

${jobDescription}
`;

    console.log(`Generating resume for: ${userName}`);
    console.log(`Target role: ${jobTitle || 'Not specified'}`);

    // Call AI to generate the resume - Priority: Gemini > Groq > Claude > OpenAI
    let generatedData;
    let lastError;

    // Try Gemini first (primary)
    if (geminiKey) {
      try {
        console.log("Trying Gemini 2.5 Flash...");
        generatedData = await generateWithGemini(geminiKey, userContext);
      } catch (err) {
        console.error("Gemini failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to Groq
    if (!generatedData && groqKey) {
      try {
        console.log("Trying Groq...");
        generatedData = await generateWithGroq(groqKey, userContext);
      } catch (err) {
        console.error("Groq failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to Claude
    if (!generatedData && anthropicKey) {
      try {
        console.log("Trying Claude...");
        generatedData = await generateWithClaude(anthropicKey, userContext);
      } catch (err) {
        console.error("Claude failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to OpenAI
    if (!generatedData && openaiKey) {
      try {
        console.log("Trying OpenAI...");
        generatedData = await generateWithOpenAI(openaiKey, userContext);
      } catch (err) {
        console.error("OpenAI failed:", err.message);
        lastError = err;
      }
    }

    if (!generatedData) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to generate resume. All AI providers failed." }),
      };
    }

    // Ensure user-provided values are correctly set
    const validatedData = validateGeneratedData(generatedData, userName, userEmail);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        data: validatedData,
        metadata: validatedData._metadata || {
          generatedFromJD: true,
          fieldsToFill: ["company names", "dates", "education details", "contact info"]
        }
      }),
    };

  } catch (error) {
    console.error("Generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to generate resume",
        details: errorMessage,
      }),
    };
  }
};

// Generate with Gemini 2.5 Flash (PRIMARY)
async function generateWithGemini(apiKey, userContext) {
  const modelName = "gemini-2.5-flash";

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 50000); // 50 second timeout

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
                  text: GENERATE_RESUME_PROMPT + userContext,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
            // Note: responseMimeType removed - causes 400 error on Gemini 2.5
          },
        }),
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const result = await response.json();
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("No content in Gemini response");
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
      throw new Error('Gemini API request timed out');
    }
    throw error;
  }
}

// Generate with Groq (FREE)
async function generateWithGroq(apiKey, userContext) {
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
          content: "You are an expert resume writer.",
        },
        {
          role: "user",
          content: GENERATE_RESUME_PROMPT + userContext,
        },
      ],
      max_tokens: 6000,
      temperature: 0.4,
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

  // Extract JSON from response
  let jsonStr = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  return JSON.parse(jsonStr.trim());
}

// Generate with Claude
async function generateWithClaude(apiKey, userContext) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 6000,
      messages: [
        {
          role: "user",
          content: GENERATE_RESUME_PROMPT + userContext,
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

  let jsonStr = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  return JSON.parse(jsonStr.trim());
}

// Generate with OpenAI
async function generateWithOpenAI(apiKey, userContext) {
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
          content: "You are an expert resume writer.",
        },
        {
          role: "user",
          content: GENERATE_RESUME_PROMPT + userContext,
        },
      ],
      max_tokens: 6000,
      temperature: 0.4,
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

  let jsonStr = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  return JSON.parse(jsonStr.trim());
}

// Validate and ensure required structure
function validateGeneratedData(data, userName, userEmail) {
  const validated = { ...data };

  // Ensure personalInfo has user-provided values
  validated.personalInfo = {
    ...validated.personalInfo,
    fullName: userName,
    email: userEmail || validated.personalInfo?.email || '',
  };

  // Ensure version
  validated.version = "2.0";

  // Ensure all arrays exist
  validated.experience = validated.experience || [];
  validated.education = validated.education || [];
  validated.skills = validated.skills || [];
  validated.projects = validated.projects || [];
  validated.certifications = validated.certifications || [];
  validated.languages = validated.languages || [];
  validated.achievements = validated.achievements || [];

  // Generate IDs for all items
  validated.experience = validated.experience.map((exp, idx) => ({
    ...exp,
    id: exp.id || `exp-${idx + 1}`,
    highlights: exp.highlights || exp.bulletPoints || [],
  }));

  validated.education = validated.education.map((edu, idx) => ({
    ...edu,
    id: edu.id || `edu-${idx + 1}`,
  }));

  validated.skills = validated.skills.map((skill, idx) => ({
    ...skill,
    id: skill.id || `skill-${idx + 1}`,
  }));

  validated.projects = validated.projects.map((proj, idx) => ({
    ...proj,
    id: proj.id || `proj-${idx + 1}`,
  }));

  return validated;
}

module.exports = { handler };
