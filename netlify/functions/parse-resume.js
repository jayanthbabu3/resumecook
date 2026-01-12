// Use require for CommonJS compatibility with Netlify Functions
const mammoth = require("mammoth");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// Helper function to extract text from PDF using pdfjs-dist
async function extractTextFromPDF(buffer) {
  const data = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => item.str)
      .join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
}

// Complete V2ResumeData JSON schema - ALL possible sections
// This schema supports every section type that exists in our template system
const RESUME_SCHEMA = `{
  "version": "2.0",
  "personalInfo": {
    "fullName": "string (required - full name of person)",
    "email": "string (email address)",
    "phone": "string (phone number)",
    "location": "string (city, state/country)",
    "title": "string (professional title/headline like 'Senior Software Engineer')",
    "summary": "string (professional summary/objective paragraph)",
    "linkedin": "string (LinkedIn URL)",
    "github": "string (GitHub URL)",
    "portfolio": "string (portfolio/personal website URL)",
    "website": "string (any other website)"
  },
  "experience": [
    {
      "id": "string (unique id)",
      "company": "string (required - company name)",
      "position": "string (required - job title)",
      "location": "string (city, state)",
      "startDate": "string (format: 'MMM YYYY' e.g. 'Jan 2020')",
      "endDate": "string ('MMM YYYY' or 'Present' for current job)",
      "current": "boolean (true if current job)",
      "description": "string (brief role description)",
      "bulletPoints": ["array of achievements/responsibilities as strings"]
    }
  ],
  "education": [
    {
      "id": "string",
      "school": "string (required - institution name)",
      "degree": "string (e.g. 'Bachelor of Science', 'MBA')",
      "field": "string (field of study/major)",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "gpa": "string (if mentioned)"
    }
  ],
  "skills": [
    {
      "id": "string",
      "name": "string (required - skill name)",
      "category": "string (e.g. 'Technical', 'Programming', 'Soft Skills', 'Tools', 'Frameworks')"
    }
  ],
  "languages": [
    {
      "id": "string",
      "language": "string (language name)",
      "proficiency": "string (Native/Fluent/Professional/Advanced/Intermediate/Basic)"
    }
  ],
  "certifications": [
    {
      "id": "string",
      "name": "string (certification name)",
      "issuer": "string (issuing organization)",
      "date": "string (date obtained)",
      "credentialId": "string (credential ID if available)",
      "url": "string (verification URL if available)"
    }
  ],
  "projects": [
    {
      "id": "string",
      "name": "string (project name)",
      "description": "string (project description)",
      "technologies": ["array of technologies used"],
      "url": "string (project URL/link)",
      "startDate": "string",
      "endDate": "string",
      "highlights": ["array of key achievements/features"]
    }
  ],
  "awards": [
    {
      "id": "string",
      "title": "string (award name)",
      "issuer": "string (awarding organization)",
      "date": "string",
      "description": "string"
    }
  ],
  "achievements": [
    {
      "id": "string",
      "title": "string (achievement title)",
      "description": "string (achievement description)",
      "date": "string",
      "metric": "string (quantifiable result if any)"
    }
  ],
  "strengths": [
    {
      "id": "string",
      "name": "string (strength/core competency)",
      "description": "string (optional description)"
    }
  ],
  "volunteer": [
    {
      "id": "string",
      "organization": "string (organization name)",
      "role": "string (volunteer role/title)",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string",
      "highlights": ["array of contributions"]
    }
  ],
  "publications": [
    {
      "id": "string",
      "title": "string (publication title)",
      "publisher": "string (journal/conference/publisher)",
      "date": "string",
      "url": "string (link to publication)",
      "description": "string",
      "authors": "string (co-authors if any)"
    }
  ],
  "speaking": [
    {
      "id": "string",
      "title": "string (talk/presentation title)",
      "event": "string (conference/event name)",
      "date": "string",
      "location": "string",
      "description": "string",
      "url": "string (link to slides/video)"
    }
  ],
  "patents": [
    {
      "id": "string",
      "title": "string (patent title)",
      "patentNumber": "string",
      "date": "string (filing/grant date)",
      "description": "string",
      "url": "string"
    }
  ],
  "interests": [
    {
      "id": "string",
      "name": "string (interest/hobby name)",
      "description": "string"
    }
  ],
  "references": [
    {
      "id": "string",
      "name": "string (reference name)",
      "title": "string (their job title)",
      "company": "string (their company)",
      "relationship": "string (e.g. 'Former Manager')",
      "email": "string",
      "phone": "string"
    }
  ],
  "courses": [
    {
      "id": "string",
      "name": "string (course name)",
      "institution": "string (where taken)",
      "date": "string",
      "description": "string",
      "url": "string (certificate URL if any)"
    }
  ],
  "customSections": [
    {
      "id": "string",
      "title": "string (section title - e.g. 'Military Service', 'Research', 'Affiliations')",
      "items": [
        {
          "id": "string",
          "title": "string (item title)",
          "content": "string (item content/description)",
          "date": "string",
          "url": "string"
        }
      ]
    }
  ]
}`;

const AI_PROMPT = `You are an expert resume parser. Your task is to extract ALL information from the resume and return a complete JSON object.

CRITICAL INSTRUCTIONS:
1. Return ONLY valid JSON - no explanations, no markdown code blocks, no text before or after
2. Extract EVERY section found in the resume - do not skip any information
3. Generate unique IDs using format: "section-index" (e.g., "exp-0", "edu-1", "proj-2")
4. For dates, use format "MMM YYYY" (e.g., "Jan 2020"). If only year, use "2020"
5. If a field is not found, use empty string "" or empty array []

SECTION MAPPING - Map resume sections to these standard fields:
- Work Experience / Employment / Professional Experience → "experience"
- Education / Academic Background / Qualifications → "education"
- Skills / Technical Skills / Core Competencies → "skills"
- Languages / Language Proficiency → "languages"
- Certifications / Licenses / Credentials → "certifications"
- Projects / Portfolio / Personal Projects / Side Projects → "projects"
- Awards / Honors / Recognition → "awards"
- Achievements / Accomplishments / Key Results → "achievements"
- Strengths / Core Strengths / Key Competencies → "strengths"
- Volunteer / Community Service / Pro Bono → "volunteer"
- Publications / Papers / Research → "publications"
- Speaking / Presentations / Conferences → "speaking"
- Patents / Inventions → "patents"
- Interests / Hobbies → "interests"
- References → "references"
- Courses / Training / Professional Development → "courses"

CUSTOM SECTIONS - For any section that doesn't fit the above (e.g., "Military Service", "Research Experience", "Affiliations", "Memberships", "Board Positions", etc.):
- Add to "customSections" array with the original section title preserved
- Each custom section has: id, title, and items array

EXTRACTION PRIORITIES:
1. Parse ALL bullet points from job descriptions into bulletPoints arrays
2. Extract technologies/tools mentioned in projects
3. Capture quantifiable metrics and achievements
4. Preserve URLs for projects, publications, certifications
5. Include ALL skills mentioned anywhere in the resume
6. Don't miss any dates, locations, or contact information

SCHEMA:
${RESUME_SCHEMA}

RESUME TEXT TO PARSE:
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

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Get API key from environment - support Groq (free), Anthropic, and OpenAI
  const groqKey = process.env.GROQ_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!groqKey && !anthropicKey && !openaiKey) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "AI service not configured. Please set GROQ_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY." }),
    };
  }

  try {
    // Parse request body - expecting base64 encoded file
    const requestData = JSON.parse(event.body || "{}");
    const { fileData, fileName, fileType } = requestData;

    if (!fileData || !fileName) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "File data and name are required" }),
      };
    }

    // Decode base64 file
    const fileBuffer = Buffer.from(fileData, "base64");
    let extractedText = "";

    // Determine file type and extract text
    const lowerFileName = fileName.toLowerCase();

    if (lowerFileName.endsWith(".pdf") || fileType === "application/pdf") {
      // Extract text from PDF using pdfjs-dist
      try {
        extractedText = await extractTextFromPDF(fileBuffer);
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        return {
          statusCode: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "Failed to parse PDF file. Please ensure it's a valid PDF with text content (not scanned image)."
          }),
        };
      }
    } else if (
      lowerFileName.endsWith(".docx") ||
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Extract text from DOCX
      try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value;
      } catch (docxError) {
        console.error("DOCX parsing error:", docxError);
        return {
          statusCode: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "Failed to parse DOCX file. Please ensure it's a valid Word document."
          }),
        };
      }
    } else if (
      lowerFileName.endsWith(".doc") ||
      fileType === "application/msword"
    ) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Old .doc format not supported. Please convert to .docx or .pdf"
        }),
      };
    } else if (lowerFileName.endsWith(".txt") || fileType === "text/plain") {
      // Plain text file
      extractedText = fileBuffer.toString("utf-8");
    } else {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Unsupported file format. Please upload PDF, DOCX, or TXT file."
        }),
      };
    }

    // Clean extracted text
    extractedText = extractedText
      .replace(/\s+/g, " ") // Normalize whitespace
      .replace(/\n{3,}/g, "\n\n") // Limit consecutive newlines
      .trim();

    if (!extractedText || extractedText.length < 50) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Could not extract text from file. The file may be empty, image-based, or corrupted."
        }),
      };
    }

    // Limit text length to avoid token limits
    const maxTextLength = 15000;
    if (extractedText.length > maxTextLength) {
      extractedText = extractedText.substring(0, maxTextLength);
    }

    console.log(`Extracted ${extractedText.length} characters from ${fileName}`);

    // Call AI to structure the data - prioritize Groq (free tier)
    let structuredData;

    if (groqKey) {
      structuredData = await parseWithGroq(groqKey, extractedText);
    } else if (anthropicKey) {
      structuredData = await parseWithClaude(anthropicKey, extractedText);
    } else if (openaiKey) {
      structuredData = await parseWithOpenAI(openaiKey, extractedText);
    }

    if (!structuredData) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to parse resume with AI" }),
      };
    }

    // Validate and ensure required fields
    const validatedData = validateAndFixResumeData(structuredData);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        data: validatedData,
        extractedTextLength: extractedText.length,
      }),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Resume parsing error:", errorMessage);

    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to parse resume",
        details: errorMessage,
      }),
    };
  }
};

// Parse with Groq (FREE - using Llama 3.3 70B)
async function parseWithGroq(apiKey, resumeText) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", // Free and powerful model
      messages: [
        {
          role: "system",
          content: "You are an expert resume parser. Return only valid JSON, no explanations or markdown code blocks.",
        },
        {
          role: "user",
          content: AI_PROMPT + resumeText,
        },
      ],
      max_tokens: 8000,
      temperature: 0.1, // Low temperature for consistent parsing
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

  // Extract JSON from response (handle potential markdown code blocks)
  let jsonStr = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  return JSON.parse(jsonStr.trim());
}

// Parse with Claude (Anthropic)
async function parseWithClaude(apiKey, resumeText) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307", // Using Haiku for cost efficiency
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: AI_PROMPT + resumeText,
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

  // Extract JSON from response (handle potential markdown code blocks)
  let jsonStr = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  return JSON.parse(jsonStr.trim());
}

// Parse with OpenAI
async function parseWithOpenAI(apiKey, resumeText) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Using 3.5 for cost efficiency
      messages: [
        {
          role: "system",
          content: "You are an expert resume parser. Return only valid JSON, no explanations.",
        },
        {
          role: "user",
          content: AI_PROMPT + resumeText,
        },
      ],
      max_tokens: 4096,
      temperature: 0.1, // Low temperature for consistent parsing
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

  // Extract JSON from response
  let jsonStr = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  return JSON.parse(jsonStr.trim());
}

// Validate and fix resume data structure - comprehensive handler for ALL sections
function validateAndFixResumeData(data) {
  const createId = (prefix, idx) => `${prefix}-${idx}`;

  // Ensure version
  data.version = "2.0";

  // ===========================================
  // PERSONAL INFO
  // ===========================================
  if (!data.personalInfo) {
    data.personalInfo = {};
  }
  data.personalInfo = {
    fullName: data.personalInfo.fullName || "",
    email: data.personalInfo.email || "",
    phone: data.personalInfo.phone || "",
    location: data.personalInfo.location || "",
    title: data.personalInfo.title || "",
    summary: data.personalInfo.summary || "",
    linkedin: data.personalInfo.linkedin || "",
    github: data.personalInfo.github || "",
    portfolio: data.personalInfo.portfolio || "",
    website: data.personalInfo.website || "",
  };

  // ===========================================
  // EXPERIENCE
  // ===========================================
  if (!Array.isArray(data.experience)) {
    data.experience = [];
  }
  data.experience = data.experience.map((exp, idx) => ({
    id: exp.id || createId("exp", idx),
    company: exp.company || "",
    position: exp.position || exp.title || "",
    location: exp.location || "",
    startDate: exp.startDate || "",
    endDate: exp.endDate || "",
    current: exp.current || (exp.endDate && exp.endDate.toLowerCase() === "present") || false,
    description: exp.description || "",
    bulletPoints: Array.isArray(exp.bulletPoints) ? exp.bulletPoints : [],
  }));

  // ===========================================
  // EDUCATION
  // ===========================================
  if (!Array.isArray(data.education)) {
    data.education = [];
  }
  data.education = data.education.map((edu, idx) => ({
    id: edu.id || createId("edu", idx),
    school: edu.school || edu.institution || "",
    degree: edu.degree || "",
    field: edu.field || edu.fieldOfStudy || edu.major || "",
    location: edu.location || "",
    startDate: edu.startDate || "",
    endDate: edu.endDate || "",
    gpa: edu.gpa || "",
  }));

  // ===========================================
  // SKILLS
  // ===========================================
  if (!Array.isArray(data.skills)) {
    data.skills = [];
  }
  data.skills = data.skills.map((skill, idx) => ({
    id: skill.id || createId("skill", idx),
    name: typeof skill === "string" ? skill : skill.name || "",
    category: skill.category || "Technical",
  }));

  // ===========================================
  // LANGUAGES
  // ===========================================
  if (!Array.isArray(data.languages)) {
    data.languages = [];
  }
  data.languages = data.languages.map((lang, idx) => ({
    id: lang.id || createId("lang", idx),
    language: lang.language || lang.name || "",
    proficiency: lang.proficiency || lang.level || "Professional",
  }));

  // ===========================================
  // CERTIFICATIONS
  // ===========================================
  if (!Array.isArray(data.certifications)) {
    data.certifications = [];
  }
  data.certifications = data.certifications.map((cert, idx) => ({
    id: cert.id || createId("cert", idx),
    name: cert.name || cert.title || "",
    issuer: cert.issuer || cert.organization || "",
    date: cert.date || "",
    credentialId: cert.credentialId || "",
    url: cert.url || "",
  }));

  // ===========================================
  // PROJECTS
  // ===========================================
  if (!Array.isArray(data.projects)) {
    data.projects = [];
  }
  data.projects = data.projects.map((proj, idx) => ({
    id: proj.id || createId("proj", idx),
    name: proj.name || proj.title || "",
    description: proj.description || "",
    technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
    url: proj.url || proj.link || "",
    startDate: proj.startDate || "",
    endDate: proj.endDate || "",
    highlights: Array.isArray(proj.highlights) ? proj.highlights : [],
  }));

  // ===========================================
  // AWARDS
  // ===========================================
  if (!Array.isArray(data.awards)) {
    data.awards = [];
  }
  data.awards = data.awards.map((award, idx) => ({
    id: award.id || createId("award", idx),
    title: award.title || award.name || "",
    issuer: award.issuer || award.organization || "",
    date: award.date || "",
    description: award.description || "",
  }));

  // ===========================================
  // ACHIEVEMENTS
  // ===========================================
  if (!Array.isArray(data.achievements)) {
    data.achievements = [];
  }
  data.achievements = data.achievements.map((ach, idx) => ({
    id: ach.id || createId("ach", idx),
    title: ach.title || ach.name || "",
    description: ach.description || "",
    date: ach.date || "",
    metric: ach.metric || "",
  }));

  // ===========================================
  // STRENGTHS
  // ===========================================
  if (!Array.isArray(data.strengths)) {
    data.strengths = [];
  }
  data.strengths = data.strengths.map((str, idx) => ({
    id: str.id || createId("str", idx),
    name: str.name || str.title || "",
    description: str.description || "",
  }));

  // ===========================================
  // VOLUNTEER
  // ===========================================
  if (!Array.isArray(data.volunteer)) {
    data.volunteer = [];
  }
  data.volunteer = data.volunteer.map((vol, idx) => ({
    id: vol.id || createId("vol", idx),
    organization: vol.organization || vol.company || "",
    role: vol.role || vol.position || vol.title || "",
    location: vol.location || "",
    startDate: vol.startDate || "",
    endDate: vol.endDate || "",
    description: vol.description || "",
    highlights: Array.isArray(vol.highlights) ? vol.highlights : [],
  }));

  // ===========================================
  // PUBLICATIONS
  // ===========================================
  if (!Array.isArray(data.publications)) {
    data.publications = [];
  }
  data.publications = data.publications.map((pub, idx) => ({
    id: pub.id || createId("pub", idx),
    title: pub.title || pub.name || "",
    publisher: pub.publisher || pub.journal || pub.venue || "",
    date: pub.date || "",
    url: pub.url || pub.link || "",
    description: pub.description || "",
    authors: pub.authors || "",
  }));

  // ===========================================
  // SPEAKING
  // ===========================================
  if (!Array.isArray(data.speaking)) {
    data.speaking = [];
  }
  data.speaking = data.speaking.map((spk, idx) => ({
    id: spk.id || createId("spk", idx),
    title: spk.title || spk.name || "",
    event: spk.event || spk.conference || "",
    date: spk.date || "",
    location: spk.location || "",
    description: spk.description || "",
    url: spk.url || "",
  }));

  // ===========================================
  // PATENTS
  // ===========================================
  if (!Array.isArray(data.patents)) {
    data.patents = [];
  }
  data.patents = data.patents.map((pat, idx) => ({
    id: pat.id || createId("pat", idx),
    title: pat.title || pat.name || "",
    patentNumber: pat.patentNumber || pat.number || "",
    date: pat.date || "",
    description: pat.description || "",
    url: pat.url || "",
  }));

  // ===========================================
  // INTERESTS
  // ===========================================
  if (!Array.isArray(data.interests)) {
    data.interests = [];
  }
  data.interests = data.interests.map((int, idx) => ({
    id: int.id || createId("int", idx),
    name: typeof int === "string" ? int : int.name || "",
    description: int.description || "",
  }));

  // ===========================================
  // REFERENCES
  // ===========================================
  if (!Array.isArray(data.references)) {
    data.references = [];
  }
  data.references = data.references.map((ref, idx) => ({
    id: ref.id || createId("ref", idx),
    name: ref.name || "",
    title: ref.title || ref.position || "",
    company: ref.company || ref.organization || "",
    relationship: ref.relationship || "",
    email: ref.email || "",
    phone: ref.phone || "",
  }));

  // ===========================================
  // COURSES
  // ===========================================
  if (!Array.isArray(data.courses)) {
    data.courses = [];
  }
  data.courses = data.courses.map((course, idx) => ({
    id: course.id || createId("course", idx),
    name: course.name || course.title || "",
    institution: course.institution || course.provider || "",
    date: course.date || "",
    description: course.description || "",
    url: course.url || "",
  }));

  // ===========================================
  // CUSTOM SECTIONS
  // ===========================================
  if (!Array.isArray(data.customSections)) {
    data.customSections = [];
  }
  data.customSections = data.customSections.map((section, sIdx) => ({
    id: section.id || createId("custom", sIdx),
    title: section.title || "Custom Section",
    items: Array.isArray(section.items)
      ? section.items.map((item, iIdx) => ({
          id: item.id || createId(`custom-${sIdx}-item`, iIdx),
          title: item.title || "",
          content: item.content || item.description || "",
          date: item.date || "",
          url: item.url || "",
        }))
      : [],
  }));

  // ===========================================
  // SETTINGS
  // ===========================================
  data.settings = {
    includeSocialLinks: true,
    includePhoto: false,
    dateFormat: "MMM YYYY",
  };

  // ===========================================
  // ENABLED SECTIONS TRACKING
  // Add metadata about which sections have data
  // ===========================================
  data._parsedSections = {
    hasExperience: data.experience.length > 0,
    hasEducation: data.education.length > 0,
    hasSkills: data.skills.length > 0,
    hasLanguages: data.languages.length > 0,
    hasCertifications: data.certifications.length > 0,
    hasProjects: data.projects.length > 0,
    hasAwards: data.awards.length > 0,
    hasAchievements: data.achievements.length > 0,
    hasStrengths: data.strengths.length > 0,
    hasVolunteer: data.volunteer.length > 0,
    hasPublications: data.publications.length > 0,
    hasSpeaking: data.speaking.length > 0,
    hasPatents: data.patents.length > 0,
    hasInterests: data.interests.length > 0,
    hasReferences: data.references.length > 0,
    hasCourses: data.courses.length > 0,
    hasCustomSections: data.customSections.length > 0,
    hasSummary: !!(data.personalInfo.summary && data.personalInfo.summary.trim()),
  };

  return data;
}

module.exports = { handler };
