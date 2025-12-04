import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import OpenAI from "openai";

interface GenerateResumeRequest {
  userProfile: {
    fullName: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    professionalTitle?: string;
    bio?: string;
  };
  jobDescription?: string;
  profession?: string;
  templateId?: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    linkedin?: string;
    portfolio?: string;
    github?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    bulletPoints: string[];
    current: boolean;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    location?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    rating?: string;
    category?: "core" | "toolbox";
  }>;
  sections: Array<{
    id: string;
    title: string;
    content: string;
    items?: string[];
  }>;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY not configured");
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        error: "AI service not configured. Please add OPENAI_API_KEY to environment variables." 
      }),
    };
  }

  // Parse request body
  let requestData: GenerateResumeRequest;
  try {
    requestData = JSON.parse(event.body || "{}");
  } catch (error) {
    console.error("JSON parse error:", error);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const { userProfile, jobDescription, profession, templateId } = requestData;

  if (!userProfile || !userProfile.fullName) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "User profile with fullName is required" }),
    };
  }

  try {
    const openai = new OpenAI({ apiKey });

    // Build the AI prompt
    const systemPrompt = `You are an expert resume writer and career coach. Generate a professional, ATS-friendly resume based on the user's profile and optional job description.

IMPORTANT INSTRUCTIONS:
1. Return ONLY valid JSON matching the exact structure provided
2. Generate realistic, professional content that sounds natural
3. Use action verbs and quantifiable achievements
4. Make the content ATS-friendly with relevant keywords
5. Tailor content to the profession/job description if provided
6. Generate 3-5 experience entries with 4-6 bullet points each
7. Generate 2-3 education entries
8. Generate 10-15 relevant skills
9. Generate 1-2 additional sections (certifications, projects, etc.)
10. Use proper date formats (e.g., "Jan 2020", "Present")`;

    const userPrompt = `Generate a complete resume for:

USER PROFILE:
- Name: ${userProfile.fullName}
- Email: ${userProfile.email || "user@example.com"}
- Phone: ${userProfile.phone || "+1 (555) 123-4567"}
- Location: ${userProfile.location || "City, State"}
- Professional Title: ${userProfile.professionalTitle || profession || "Professional"}
- Bio: ${userProfile.bio || "Experienced professional seeking new opportunities"}
${userProfile.linkedinUrl ? `- LinkedIn: ${userProfile.linkedinUrl}` : ""}
${userProfile.githubUrl ? `- GitHub: ${userProfile.githubUrl}` : ""}
${userProfile.portfolioUrl ? `- Portfolio: ${userProfile.portfolioUrl}` : ""}

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}\n` : ""}
${profession ? `TARGET PROFESSION: ${profession}\n` : ""}

Generate a complete resume with:
1. A compelling professional summary (2-3 sentences)
2. 3-5 relevant work experiences with detailed bullet points
3. 2-3 education entries
4. 10-15 relevant technical and soft skills
5. 1-2 additional sections (certifications, projects, awards, etc.)

Return ONLY a JSON object with this EXACT structure (no markdown, no code blocks):
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "title": "string",
    "summary": "string",
    "linkedin": "string (optional)",
    "portfolio": "string (optional)",
    "github": "string (optional)"
  },
  "experience": [
    {
      "id": "exp-1",
      "company": "string",
      "position": "string",
      "startDate": "MMM YYYY",
      "endDate": "MMM YYYY or Present",
      "description": "Brief role description",
      "bulletPoints": ["Achievement 1", "Achievement 2", "Achievement 3"],
      "current": false
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "school": "string",
      "degree": "string",
      "field": "string",
      "startDate": "MMM YYYY",
      "endDate": "MMM YYYY",
      "gpa": "3.8 (optional)",
      "location": "City, State"
    }
  ],
  "skills": [
    {
      "id": "skill-1",
      "name": "string",
      "rating": "Expert|Advanced|Intermediate",
      "category": "core"
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "title": "Certifications",
      "content": "Brief description",
      "items": ["Item 1", "Item 2"]
    }
  ]
}`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("No response from AI");
    }

    // Parse the AI response
    let resumeData: ResumeData;
    try {
      resumeData = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseContent);
      throw new Error("Invalid JSON response from AI");
    }

    // Validate the structure
    if (!resumeData.personalInfo || !resumeData.experience || !resumeData.education || !resumeData.skills) {
      throw new Error("Invalid resume data structure from AI");
    }

    // Return the generated resume
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        data: resumeData,
        tokensUsed: completion.usage?.total_tokens || 0,
      }),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error("Resume generation error:", errorMessage);
    console.error("Stack:", errorStack);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Failed to generate resume",
        details: errorMessage,
      }),
    };
  }
};

export { handler };
