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
 * Uses Groq (free tier) as primary, with fallback to Anthropic/OpenAI.
 */

const JOB_TAILOR_PROMPT = `You are an expert resume writer and ATS optimization specialist. Your job is to tailor a resume to match a specific job description while keeping all content truthful, unique, and authentic.

═══════════════════════════════════════════════════════════════
CRITICAL RULES - ABSOLUTE REQUIREMENTS (MUST FOLLOW!)
═══════════════════════════════════════════════════════════════
1. NEVER invent percentages, numbers, or metrics that aren't in the original resume
2. NEVER add fake statistics like "improved by 40%", "reduced by 60%", "increased 25%"
3. NEVER fabricate user counts, revenue figures, or team sizes
4. ONLY use metrics if they exist in the original resume text
5. PRESERVE exactly: names, companies, job titles, dates, locations, contact info
6. RETURN only valid JSON - no markdown, no explanations

⚠️ CRITICAL - BULLET POINT UNIQUENESS (THIS IS MANDATORY!):
7. EVERY bullet point MUST be 100% unique across the ENTIRE resume
8. NEVER create duplicate or similar bullet points, even with different wording
9. NEVER repeat the same accomplishment, theme, or idea across experiences
10. Each experience must showcase DIFFERENT aspects of the candidate
11. Quality over quantity - 4 unique bullets beats 6 repetitive ones
12. Before finalizing, VERIFY no two bullets say the same thing

═══════════════════════════════════════════════════════════════
JOB DESCRIPTION ANALYSIS - DO THIS FIRST
═══════════════════════════════════════════════════════════════
Before tailoring, extract from the job description:
1. MUST-HAVE skills/technologies (explicitly required)
2. NICE-TO-HAVE skills (preferred/bonus)
3. Key responsibilities and daily work
4. Team structure hints (cross-functional, agile, etc.)
5. Seniority expectations (leadership, mentoring, etc.)
6. Domain/industry context (fintech, healthcare, e-commerce, etc.)

═══════════════════════════════════════════════════════════════
PROFESSIONAL SUMMARY - JOB-ALIGNED
═══════════════════════════════════════════════════════════════
Rewrite the summary to directly address THIS job:
- Line 1: [Role] with [X] years in [domain relevant to JD]
- Line 2: Highlight 3-4 skills that MATCH the JD requirements
- Line 3: Value prop that addresses what THIS company is looking for

GOOD Example (for a Frontend role at a fintech company):
"Frontend Developer with 5+ years building scalable web applications in the financial services sector. Expert in React, TypeScript, and component-driven architecture with experience implementing secure, compliant user interfaces. Passionate about performance optimization and creating intuitive experiences for complex financial workflows."

BAD Example (too generic):
"Experienced developer looking for new opportunities to grow."

═══════════════════════════════════════════════════════════════
EXPERIENCE BULLET POINTS - MAKE EACH ONE COUNT!
═══════════════════════════════════════════════════════════════

⭐ CRITICAL: Each bullet point should feel TAILORED to this specific job, not generic.

STRATEGY FOR EACH EXPERIENCE:
1. REFRAME existing bullets to emphasize JD-relevant aspects
2. ADD 2-3 NEW bullets that directly address JD requirements (based on their actual skills)
3. PRIORITIZE bullets that match the job's key responsibilities
4. Each experience should have 5-6 strong, UNIQUE bullet points

📝 BULLET POINT FORMULA FOR JOB TAILORING:
"[Action Verb from JD language] + [Specific accomplishment] + [Using JD-relevant tech/skill] + [Business context if applicable]"

EXAMPLES OF TAILORING (if JD mentions "scalable systems" and "cross-functional collaboration"):

BEFORE (generic):
"Developed web applications using React"

AFTER (tailored):
"Architected scalable React component library serving 15+ product teams, establishing patterns for consistent UI across the platform"

BEFORE (generic):
"Worked with backend team on API integration"

AFTER (tailored):
"Partnered with backend engineers to design and implement RESTful API contracts, reducing integration bugs and accelerating feature delivery"

🎯 WHAT TO EMPHASIZE BASED ON JD:
- If JD mentions "leadership" → Add bullets about mentoring, leading initiatives, making decisions
- If JD mentions "performance" → Add bullets about optimization, load time, scalability
- If JD mentions "collaboration" → Add bullets about cross-team work, stakeholder communication
- If JD mentions specific tech → Ensure bullets reference that tech with specific use cases
- If JD mentions "ownership" → Add bullets about end-to-end delivery, taking initiative

🔄 UNIQUENESS ACROSS EXPERIENCES (CRITICAL - NO EXCEPTIONS!):
⚠️ THIS IS THE MOST IMPORTANT RULE FOR QUALITY:
- Job 1 bullets must be COMPLETELY DIFFERENT from Job 2 bullets
- NEVER repeat themes like "collaboration", "optimization", "leadership" across jobs
- Each job should highlight DIFFERENT skills from the JD requirements
- Show PROGRESSION: recent roles show more senior responsibilities
- Before writing a bullet, CHECK if similar content exists elsewhere in resume

⚠️ DUPLICATION CHECK (DO THIS FOR EVERY BULLET):
Ask yourself: "Have I already written something similar in ANY experience?"
If YES → Write something completely different
If UNSURE → Write something completely different

EXAMPLES OF FORBIDDEN DUPLICATES:
❌ Job 1: "Collaborated with cross-functional teams on projects"
❌ Job 2: "Worked closely with teams across departments" (SAME THEME - NOT ALLOWED)

✅ Job 1: "Collaborated with designers to implement responsive UI components"
✅ Job 2: "Optimized database queries reducing page load time significantly" (DIFFERENT THEME)

═══════════════════════════════════════════════════════════════
KEYWORD INJECTION - NATURAL INTEGRATION
═══════════════════════════════════════════════════════════════
- Extract 10-15 key terms from the JD (technologies, methodologies, soft skills)
- Integrate these NATURALLY into bullet points where truthful
- Max 2-3 new keywords per bullet - avoid stuffing
- If a keyword doesn't fit their experience truthfully, add to suggestedSkills

GOOD keyword integration:
"Led migration to microservices architecture using Docker and Kubernetes, improving deployment frequency"
(naturally includes: microservices, Docker, Kubernetes, deployment)

BAD keyword stuffing:
"Used Docker, Kubernetes, microservices, CI/CD, agile for various projects"
(just listing keywords without context)

═══════════════════════════════════════════════════════════════
SKILLS SECTION OPTIMIZATION
═══════════════════════════════════════════════════════════════
- Reorder skills: JD MUST-HAVE skills first, then NICE-TO-HAVE, then others
- DO NOT add skills they don't have
- Track which JD skills are missing → add to suggestedSkills

═══════════════════════════════════════════════════════════════
MATCH SCORE CALCULATION
═══════════════════════════════════════════════════════════════
Calculate matchScore (0-100) based on:
- Skills match: What % of required skills do they have? (40% weight)
- Responsibilities: Can their experience map to JD duties? (30% weight)
- Seniority: Does their level match JD expectations? (20% weight)
- Domain: Do they have relevant industry experience? (10% weight)

═══════════════════════════════════════════════════════════════
RESPONSE FORMAT
═══════════════════════════════════════════════════════════════
{
  ...all original fields with tailored content...,
  "personalInfo": {
    ...original with JOB-SPECIFIC enhanced summary...
  },
  "experience": [
    {
      ...original identity fields preserved...,
      "description": "Role description framed for THIS job",
      "highlights": ["5-6 UNIQUE, JOB-TAILORED bullet points"]
    }
  ],
  "_analysis": {
    "matchScore": 75,
    "keywordsFound": ["React", "TypeScript", "API"],
    "keywordsMissing": ["GraphQL", "AWS"],
    "keywordsAdded": ["agile", "cross-functional", "scalable"],
    "summaryEnhanced": true,
    "experienceEnhanced": true,
    "roleAlignment": "Strong match - candidate has 4/5 required skills and relevant experience"
  },
  "suggestedSkills": [
    { "id": "sug-0", "name": "GraphQL", "category": "Technical", "reason": "Required in JD - consider learning" },
    { "id": "sug-1", "name": "AWS", "category": "Technical", "reason": "Listed as preferred - would strengthen candidacy" }
  ]
}

═══════════════════════════════════════════════════════════════
FINAL CHECKLIST BEFORE RETURNING (VERIFY ALL!)
═══════════════════════════════════════════════════════════════
☐ Summary directly addresses THIS job's requirements
☐ JD keywords are naturally integrated (not stuffed)
☐ NO fake metrics or statistics invented
☐ Skills reordered with JD-relevant ones first
☐ Missing skills noted in suggestedSkills with helpful reasons
☐ Match score reflects honest assessment

⚠️ CRITICAL UNIQUENESS VERIFICATION (MANDATORY!):
☐ Read through ALL bullet points across ALL experiences
☐ Verify ZERO duplicate themes or similar accomplishments
☐ Each experience showcases DIFFERENT skills and achievements
☐ No repeated patterns like "worked with teams" appearing twice
☐ No similar sentence structures used multiple times
☐ If ANY duplicates found → REWRITE THEM before returning

This uniqueness check is NON-NEGOTIABLE. Duplicate content = plagiarism = immediate rejection by recruiters.

NOW TAILOR THIS RESUME FOR THE JOB DESCRIPTION:

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
  const groqKey = process.env.GROQ_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!groqKey && !anthropicKey && !openaiKey) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "AI service not configured. Please set GROQ_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY."
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

    // Call AI to tailor the resume
    let tailoredData;

    if (groqKey) {
      tailoredData = await tailorWithGroq(groqKey, jobContext);
    } else if (anthropicKey) {
      tailoredData = await tailorWithClaude(anthropicKey, jobContext);
    } else if (openaiKey) {
      tailoredData = await tailorWithOpenAI(openaiKey, jobContext);
    }

    if (!tailoredData) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to tailor resume" }),
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

// Tailor with Groq (FREE)
async function tailorWithGroq(apiKey, jobContext) {
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
          content: "You are an expert resume writer and ATS specialist. Return only valid JSON, no explanations or markdown code blocks.",
        },
        {
          role: "user",
          content: JOB_TAILOR_PROMPT + jobContext,
        },
      ],
      max_tokens: 8000,
      temperature: 0.3,
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

// Tailor with Claude
async function tailorWithClaude(apiKey, jobContext) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
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

// Tailor with OpenAI
async function tailorWithOpenAI(apiKey, jobContext) {
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
          content: "You are an expert resume writer and ATS specialist. Return only valid JSON.",
        },
        {
          role: "user",
          content: JOB_TAILOR_PROMPT + jobContext,
        },
      ],
      max_tokens: 8000,
      temperature: 0.3,
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
