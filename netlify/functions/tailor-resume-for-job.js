/**
 * AI Resume Tailoring Function for Job Descriptions
 *
 * Takes existing resume data and a job description, then optimizes the resume
 * to better match the job requirements by:
 * - Extracting keywords and requirements from the job description
 * - Enhancing the professional summary to align with the role
 * - Adding relevant keywords to experience bullet points
 * - Suggesting missing skills
 * - Calculating a match score
 *
 * Provider priority: Groq (fastest) > Gemini > Claude > OpenAI
 * Groq is prioritized because it responds in 3-5 seconds, crucial for Netlify free tier (10s limit)
 */

// OPTIMIZED: Reduced from ~200 lines to ~25 lines
const JOB_TAILOR_PROMPT = `Tailor this resume for the job description. Return JSON only.

RULES:
1. PRESERVE: names, companies, titles, dates, locations, IDs, contact info
2. REWRITE summary to match JD requirements
3. REFRAME bullet points to emphasize JD-relevant skills (use "highlights" array)
4. Integrate JD keywords naturally - no stuffing
5. NO fake metrics - only use numbers from original resume
6. Each bullet must be UNIQUE - no repeated themes across experiences

INCLUDE in response:
- _analysis: {matchScore (0-100), keywordsFound[], keywordsMissing[], keywordsAdded[]}
- suggestedSkills: [{id, name, category, reason}] for missing JD skills

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
    const { resumeData, jobDescription, jobTitle, companyName } = requestData;

    if (!resumeData) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Resume data is required" }),
      };
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Job description is required (minimum 50 characters)" }),
      };
    }

    // Remove any internal fields before sending to AI
    const cleanData = { ...resumeData };
    delete cleanData._parsedSections;
    delete cleanData._enhancements;
    delete cleanData._analysis;
    delete cleanData.suggestedSkills;

    // Build the prompt with job description context
    const jobContext = `
═══════════════════════════════════════════════════════════════
JOB DESCRIPTION:
═══════════════════════════════════════════════════════════════
${jobTitle ? `Job Title: ${jobTitle}` : ''}
${companyName ? `Company: ${companyName}` : ''}

${jobDescription}

═══════════════════════════════════════════════════════════════
RESUME TO TAILOR:
═══════════════════════════════════════════════════════════════
${JSON.stringify(cleanData, null, 2)}
`;

    console.log(`Tailoring resume for: ${cleanData.personalInfo?.fullName || 'Unknown'}`);
    console.log(`Job: ${jobTitle || 'Not specified'} at ${companyName || 'Not specified'}`);

    // Call AI to tailor the resume - Priority: Groq (fastest) > Gemini > Claude > OpenAI
    // Groq is prioritized because it responds in 3-5 seconds, crucial for Netlify free tier (10s limit)
    let tailoredData;
    let lastError;

    // Try Groq first (fastest - often under 5 seconds)
    if (groqKey) {
      try {
        console.log("Trying Groq (fastest provider)...");
        tailoredData = await tailorWithGroq(groqKey, jobContext);
      } catch (err) {
        console.error("Groq failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to Gemini
    if (!tailoredData && geminiKey) {
      try {
        console.log("Trying Gemini 2.5 Flash...");
        tailoredData = await tailorWithGemini(geminiKey, jobContext);
      } catch (err) {
        console.error("Gemini failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to Claude
    if (!tailoredData && anthropicKey) {
      try {
        console.log("Trying Claude...");
        tailoredData = await tailorWithClaude(anthropicKey, jobContext);
      } catch (err) {
        console.error("Claude failed:", err.message);
        lastError = err;
      }
    }

    // Fallback to OpenAI (slowest - often 15-30+ seconds)
    if (!tailoredData && openaiKey) {
      try {
        console.log("Trying OpenAI...");
        tailoredData = await tailorWithOpenAI(openaiKey, jobContext);
      } catch (err) {
        console.error("OpenAI failed:", err.message);
        lastError = err;
      }
    }

    if (!tailoredData) {
      const errorDetails = lastError?.message || "Unknown error";
      console.error("All AI providers failed. Last error:", errorDetails);
      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Failed to tailor resume. All AI providers failed.",
          details: errorDetails,
          suggestion: errorDetails.includes('timed out')
            ? "The AI service is taking too long. Please try again in a moment."
            : "Please try again or contact support if the issue persists."
        }),
      };
    }

    // Validate and ensure structure is preserved
    const validatedData = validateTailoredData(resumeData, tailoredData);

    // Extract analysis from the response
    const analysis = validatedData._analysis || {
      matchScore: 70,
      keywordsFound: [],
      keywordsMissing: [],
      keywordsAdded: [],
      summaryEnhanced: true,
      experienceEnhanced: true,
    };

    // Remove internal analysis field from the resume data
    delete validatedData._analysis;

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        data: validatedData,
        analysis: analysis,
        suggestedSkills: validatedData.suggestedSkills || [],
      }),
    };

  } catch (error) {
    console.error("Tailoring error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to tailor resume",
        details: errorMessage,
      }),
    };
  }
};

// Tailor with Gemini 2.5 Flash (PRIMARY)
async function tailorWithGemini(apiKey, jobContext) {
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
                  text: JOB_TAILOR_PROMPT + jobContext,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
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

// Tailor with Groq (FREE)
async function tailorWithGroq(apiKey, jobContext) {
  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

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
            content: "You are an expert resume writer and ATS specialist.",
          },
          {
            role: "user",
            content: JOB_TAILOR_PROMPT + jobContext,
          },
        ],
        max_tokens: 8000,
        temperature: 0.3,
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

// Tailor with Claude
async function tailorWithClaude(apiKey, jobContext) {
  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

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
        messages: [
          {
            role: "user",
            content: JOB_TAILOR_PROMPT + jobContext,
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

// Tailor with OpenAI
async function tailorWithOpenAI(apiKey, jobContext) {
  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

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
            content: "You are an expert resume writer and ATS specialist.",
          },
          {
            role: "user",
            content: JOB_TAILOR_PROMPT + jobContext,
          },
        ],
        max_tokens: 8000,
        temperature: 0.3,
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

// Validate tailored data - ensure critical fields are preserved
function validateTailoredData(original, tailored) {
  const validated = { ...tailored };

  // Preserve personal info identity fields
  if (original.personalInfo) {
    validated.personalInfo = {
      ...tailored.personalInfo,
      // NEVER change these
      fullName: original.personalInfo.fullName,
      email: original.personalInfo.email,
      phone: original.personalInfo.phone,
      linkedin: original.personalInfo.linkedin,
      github: original.personalInfo.github,
      portfolio: original.personalInfo.portfolio,
      website: original.personalInfo.website,
      location: original.personalInfo.location,
      address: original.personalInfo.address,
      city: original.personalInfo.city,
      state: original.personalInfo.state,
      country: original.personalInfo.country,
      zipCode: original.personalInfo.zipCode,
    };
  }

  // Preserve experience identity fields
  if (original.experience && Array.isArray(original.experience)) {
    validated.experience = original.experience.map((origExp, idx) => {
      const tailoredExp = tailored.experience?.[idx] || origExp;
      return {
        ...tailoredExp,
        // NEVER change these
        id: origExp.id,
        company: origExp.company,
        position: origExp.position,
        startDate: origExp.startDate,
        endDate: origExp.endDate,
        current: origExp.current,
        location: origExp.location,
        companyUrl: origExp.companyUrl,
        employmentType: origExp.employmentType,
        remote: origExp.remote,
      };
    });
  }

  // Preserve education identity fields
  if (original.education && Array.isArray(original.education)) {
    validated.education = original.education.map((origEdu, idx) => {
      const tailoredEdu = tailored.education?.[idx] || origEdu;
      return {
        ...tailoredEdu,
        id: origEdu.id,
        school: origEdu.school,
        degree: origEdu.degree,
        field: origEdu.field,
        startDate: origEdu.startDate,
        endDate: origEdu.endDate,
        location: origEdu.location,
        gpa: origEdu.gpa,
      };
    });
  }

  // Preserve original skills but allow reordering
  if (original.skills && Array.isArray(original.skills)) {
    // Keep all original skills
    validated.skills = [...original.skills];
  }

  // Preserve other array sections with their IDs
  const arraySections = [
    'languages', 'certifications', 'projects', 'awards',
    'achievements', 'strengths', 'volunteer', 'publications',
    'speaking', 'patents', 'interests', 'references', 'courses'
  ];

  arraySections.forEach(section => {
    if (original[section] && Array.isArray(original[section])) {
      validated[section] = original[section].map((origItem, idx) => {
        const tailoredItem = tailored[section]?.[idx] || origItem;
        return {
          ...tailoredItem,
          id: origItem.id, // Always preserve ID
        };
      });
    }
  });

  // Preserve custom sections structure
  if (original.customSections && Array.isArray(original.customSections)) {
    validated.customSections = original.customSections.map((origSection, idx) => {
      const tailoredSection = tailored.customSections?.[idx] || origSection;
      return {
        id: origSection.id,
        title: origSection.title,
        items: origSection.items.map((origItem, itemIdx) => {
          const tailoredItem = tailoredSection.items?.[itemIdx] || origItem;
          return {
            ...tailoredItem,
            id: origItem.id,
          };
        }),
      };
    });
  }

  // Preserve version and settings
  validated.version = original.version || "2.0";
  validated.settings = original.settings;

  // Keep the analysis from the AI response
  if (tailored._analysis) {
    validated._analysis = tailored._analysis;
  }

  return validated;
}

module.exports = { handler };
