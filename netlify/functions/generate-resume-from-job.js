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

const GENERATE_RESUME_PROMPT = `You are an expert resume writer helping someone create a professional resume from scratch based on a job description. Your goal is to create a realistic, ATS-optimized resume structure that the user can then fill in with their actual details.

═══════════════════════════════════════════════════════════════
CRITICAL RULES - ABSOLUTE REQUIREMENTS (MUST FOLLOW!)
═══════════════════════════════════════════════════════════════
1. NEVER invent fake company names - use placeholder "[Company Name]"
2. NEVER invent fake dates - leave dates as empty strings ""
3. NEVER fabricate specific numbers, metrics, or statistics
4. DO create realistic, role-appropriate bullet points
5. DO extract real skills from the job description
6. DO create a compelling professional summary
7. RETURN only valid JSON - no markdown, no explanations

⚠️ CRITICAL - BULLET POINT UNIQUENESS (THIS IS MANDATORY):
8. EVERY bullet point MUST be 100% unique across the ENTIRE resume
9. NEVER repeat the same point with different words - each bullet must describe a DIFFERENT accomplishment
10. NEVER copy-paste or rephrase the same achievement across experiences
11. Each experience section should show DIFFERENT aspects of the candidate's capabilities
12. If you run out of unique ideas, use FEWER bullet points rather than repeating content

═══════════════════════════════════════════════════════════════
JOB DESCRIPTION ANALYSIS
═══════════════════════════════════════════════════════════════
Analyze the job description to extract:
1. Required years of experience (to determine number of positions to create)
2. Must-have technical skills
3. Nice-to-have skills
4. Key responsibilities and daily work
5. Seniority level (entry-level, mid-level, senior, lead)
6. Industry/domain context

═══════════════════════════════════════════════════════════════
EXPERIENCE GENERATION RULES
═══════════════════════════════════════════════════════════════

Based on the required experience level in the job description:
- Entry-level (0-2 years): Create 1-2 experience entries
- Mid-level (2-5 years): Create 2-3 experience entries
- Senior (5+ years): Create 3 experience entries

For EACH experience entry:
1. Position Title: Use a realistic title that would lead to the target role
   - If target is "Senior Frontend Developer", previous roles might be:
     "Frontend Developer" → "[Company Name]"
     "Junior Web Developer" → "[Company Name]"

2. Company: ALWAYS use "[Company Name]" - user will fill this
3. Location: Use "[City, State]" as placeholder
4. Dates: ALWAYS empty strings "" - user will fill this
5. Description: One-line role summary relevant to job requirements

6. Bullet Points (4-6 per experience) - THIS IS THE MOST IMPORTANT PART:
   ⚠️ UNIQUENESS IS MANDATORY - NO EXCEPTIONS:
   - EVERY single bullet point must be COMPLETELY UNIQUE across ALL experiences
   - NEVER use similar phrasing, structure, or accomplishments
   - If Experience 1 mentions "collaboration with teams", Experience 2 CANNOT mention team collaboration
   - Track what you've written - no thematic overlap allowed
   - Quality over quantity - 4 unique bullets beats 6 repetitive ones

   Each bullet should also:
   - Start with a strong action verb (vary these too!)
   - Be specific to the role and industry
   - Mention technologies/skills from the job description
   - Describe realistic accomplishments without fake metrics

   ⚠️ DUPLICATION CHECK: Before writing each bullet, ask yourself:
   "Have I already written something similar anywhere in this resume?"
   If YES → write something completely different

═══════════════════════════════════════════════════════════════
BULLET POINT EXAMPLES BY ROLE TYPE
═══════════════════════════════════════════════════════════════

FOR SOFTWARE DEVELOPER ROLES:
✅ "Developed and maintained RESTful APIs using Node.js and Express to support core product features"
✅ "Collaborated with design team to implement responsive UI components using React and TypeScript"
✅ "Participated in code reviews and contributed to team's best practices documentation"
✅ "Integrated third-party services and APIs to extend platform functionality"
✅ "Optimized database queries and implemented caching strategies to improve application performance"

FOR PRODUCT MANAGER ROLES:
✅ "Conducted user research and synthesized insights to inform product roadmap decisions"
✅ "Collaborated with engineering teams to define requirements and prioritize feature development"
✅ "Created and maintained product documentation including PRDs and user stories"
✅ "Facilitated cross-functional meetings to align stakeholders on product direction"

FOR DATA ANALYST ROLES:
✅ "Built and maintained dashboards using Tableau to track key business metrics"
✅ "Performed exploratory data analysis to identify trends and opportunities"
✅ "Collaborated with stakeholders to translate business questions into analytical projects"
✅ "Developed SQL queries and Python scripts to automate data extraction processes"

FOR MARKETING ROLES:
✅ "Developed and executed multi-channel marketing campaigns across digital platforms"
✅ "Created content strategies aligned with brand voice and business objectives"
✅ "Analyzed campaign performance data to optimize marketing spend and messaging"
✅ "Collaborated with sales team to develop lead nurturing programs"

═══════════════════════════════════════════════════════════════
PROFESSIONAL SUMMARY
═══════════════════════════════════════════════════════════════
Write a 2-3 sentence summary that:
- Opens with role title and experience level hint
- Highlights 3-4 key skills that match the job description
- Ends with value proposition aligned to the role

Example for Frontend Developer:
"Frontend Developer with expertise in building responsive web applications using React, TypeScript, and modern CSS frameworks. Skilled in collaborating with cross-functional teams to deliver user-centric solutions with clean, maintainable code. Passionate about performance optimization and creating intuitive user experiences."

═══════════════════════════════════════════════════════════════
SKILLS GENERATION
═══════════════════════════════════════════════════════════════
Extract skills directly from the job description and categorize them:
- Technical/Hard Skills: Programming languages, frameworks, tools
- Soft Skills: Communication, leadership, collaboration (limit to 3-4)

Only include skills that are explicitly mentioned or directly implied by the job.

═══════════════════════════════════════════════════════════════
PROJECTS (Optional, for technical roles)
═══════════════════════════════════════════════════════════════
If the role is technical, create 1-2 project ideas:
- Name: Generic but realistic (e.g., "E-commerce Platform", "Task Management App")
- Description: Brief overview using relevant technologies from the JD
- Technologies: List from the job requirements
- User will fill in actual details or remove

═══════════════════════════════════════════════════════════════
RESPONSE FORMAT
═══════════════════════════════════════════════════════════════
{
  "personalInfo": {
    "fullName": "[USER_PROVIDED_NAME]",
    "email": "[USER_PROVIDED_EMAIL]",
    "phone": "",
    "location": "[City, State]",
    "linkedin": "",
    "github": "",
    "portfolio": "",
    "title": "[Target Role Title from JD]",
    "summary": "[Generated professional summary]"
  },
  "experience": [
    {
      "id": "exp-1",
      "position": "[Realistic prior role title]",
      "company": "[Company Name]",
      "location": "[City, State]",
      "startDate": "",
      "endDate": "",
      "current": false,
      "description": "[One-line role summary]",
      "highlights": [
        "[5-6 unique, JD-tailored bullet points]"
      ]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "school": "[University/College Name]",
      "degree": "[Relevant Degree]",
      "field": "[Relevant Field based on JD]",
      "startDate": "",
      "endDate": "",
      "location": "[City, State]",
      "gpa": "",
      "achievements": []
    }
  ],
  "skills": [
    { "id": "skill-1", "name": "[Skill from JD]", "category": "Technical" }
  ],
  "projects": [
    {
      "id": "proj-1",
      "name": "[Project Name]",
      "description": "[Brief description using JD technologies]",
      "technologies": ["Tech1", "Tech2"],
      "url": "",
      "startDate": "",
      "endDate": ""
    }
  ],
  "certifications": [],
  "languages": [],
  "achievements": [],
  "_metadata": {
    "generatedFromJD": true,
    "targetRole": "[Role from JD]",
    "experienceLevel": "[entry/mid/senior]",
    "fieldsToFill": ["company names", "dates", "education details", "contact info"]
  }
}

═══════════════════════════════════════════════════════════════
FINAL CHECKLIST (VERIFY BEFORE RETURNING!)
═══════════════════════════════════════════════════════════════
☐ All company names are "[Company Name]" placeholders
☐ All dates are empty strings ""
☐ Bullet points are realistic and tailored to the JD
☐ Skills are extracted from the actual job description
☐ Summary aligns with the target role
☐ Experience count matches the seniority level in JD
☐ No fake metrics or statistics

⚠️ CRITICAL UNIQUENESS VERIFICATION:
☐ Read through ALL bullet points - is each one TRULY unique?
☐ No repeated themes (collaboration, optimization, leadership) across experiences
☐ No similar sentence structures or phrasing patterns
☐ Each experience highlights DIFFERENT skills and accomplishments
☐ If duplicates found → REWRITE before returning

NOW GENERATE THE RESUME:

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

    // Call AI to generate the resume
    let generatedData;

    if (groqKey) {
      generatedData = await generateWithGroq(groqKey, userContext);
    } else if (anthropicKey) {
      generatedData = await generateWithClaude(anthropicKey, userContext);
    } else if (openaiKey) {
      generatedData = await generateWithOpenAI(openaiKey, userContext);
    }

    if (!generatedData) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to generate resume" }),
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
          content: "You are an expert resume writer. Return only valid JSON, no explanations or markdown code blocks.",
        },
        {
          role: "user",
          content: GENERATE_RESUME_PROMPT + userContext,
        },
      ],
      max_tokens: 6000,
      temperature: 0.4,
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
          content: "You are an expert resume writer. Return only valid JSON.",
        },
        {
          role: "user",
          content: GENERATE_RESUME_PROMPT + userContext,
        },
      ],
      max_tokens: 6000,
      temperature: 0.4,
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
