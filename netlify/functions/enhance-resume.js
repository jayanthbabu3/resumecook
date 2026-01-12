/**
 * AI Resume Enhancement Function
 *
 * Takes existing resume data and enhances it to be more ATS-friendly,
 * impactful, and professional. Preserves all core information while
 * improving descriptions, bullet points, and summaries.
 *
 * Uses Groq (free tier) as primary, with fallback to Anthropic/OpenAI.
 */

// Production-ready ATS enhancement prompt - NO FAKE METRICS
const ENHANCEMENT_PROMPT = `You are an expert resume writer and career coach. Your job is to make resumes sound professional and ATS-friendly WITHOUT inventing fake statistics or percentages.

═══════════════════════════════════════════════════════════
CRITICAL RULES - ABSOLUTE REQUIREMENTS
═══════════════════════════════════════════════════════════
1. NEVER invent percentages, numbers, or metrics that aren't in the original resume
2. NEVER add fake statistics like "improved by 40%", "reduced by 60%", "increased 25%"
3. NEVER fabricate user counts, revenue figures, or team sizes
4. ONLY use metrics if they exist in the original resume text
5. PRESERVE exactly: names, companies, job titles, dates, locations, contact info
6. RETURN only valid JSON - no markdown, no explanations

═══════════════════════════════════════════════════════════
PROFESSIONAL SUMMARY - REALISTIC APPROACH
═══════════════════════════════════════════════════════════
Write a genuine professional summary based on their role:

STRUCTURE:
- Line 1: "[Title] with [X] years of experience in [domain/industry]"
- Line 2: Key expertise areas and technologies they work with
- Line 3: What they bring to the table (skills, approach, strengths)

EXAMPLES BY ROLE:

Frontend Developer:
"Frontend Developer with 4+ years of experience building responsive web applications. Proficient in React, TypeScript, and modern CSS frameworks with a focus on creating intuitive user interfaces. Committed to writing clean, maintainable code and collaborating effectively with cross-functional teams."

Full Stack Developer:
"Full Stack Developer experienced in building end-to-end web applications using React, Node.js, and PostgreSQL. Skilled in designing RESTful APIs, implementing authentication systems, and deploying applications to cloud platforms. Strong problem-solver who enjoys tackling complex technical challenges."

HR Manager:
"HR Manager with expertise in talent acquisition, employee relations, and organizational development. Experienced in managing full recruitment cycles, developing HR policies, and fostering positive workplace culture. Skilled in HRIS systems and employment law compliance."

═══════════════════════════════════════════════════════════
EXPERIENCE - ROLE DESCRIPTION & BULLET POINTS
═══════════════════════════════════════════════════════════

ROLE DESCRIPTION (description field):
If the "description" field is empty, contains placeholder text like "Brief description of your role...",
or is missing, you MUST generate a brief 1-2 sentence description that:
- Is SPECIFIC to the company name and job title
- Mentions the team size, product type, or domain if inferable
- Sets context for the bullet points below
- Feels like it was written by someone who actually worked there

GOOD Examples:
- "Led frontend development for the customer-facing dashboard serving enterprise clients in the fintech space."
- "Core member of a 6-person engineering team building the company's flagship SaaS product."
- "Owned end-to-end development of internal tools used by 200+ employees across departments."

BAD Examples (too generic):
- "Senior Software Engineer working on software projects." (too vague)
- "Developed web applications using modern technologies." (no specifics)

═══════════════════════════════════════════════════════════
BULLET POINT GENERATION - MAKE EACH EXPERIENCE UNIQUE!
═══════════════════════════════════════════════════════════

⭐ CRITICAL: Each job's bullet points must feel like they describe THAT SPECIFIC ROLE, not a generic template.

🎯 FOR EACH EXPERIENCE, WRITE BULLET POINTS THAT:
1. Reference the SPECIFIC context (company type, product, team, domain)
2. Show PROGRESSION from junior to senior roles (more ownership, leadership, architecture in senior roles)
3. Highlight DIFFERENT accomplishments per job (don't repeat themes across jobs)
4. Include specifics like: feature names, system types, team interactions, processes improved

🔄 UNIQUENESS REQUIREMENTS:
- Job 1 might focus on: Feature development, API integrations, working with designers
- Job 2 might focus on: Performance optimization, mentoring, code review processes
- Job 3 might focus on: Architecture decisions, cross-team collaboration, CI/CD setup
- NEVER use the same bullet point structure twice across different jobs

📝 BULLET POINT FORMULA FOR AUTHENTICITY:
"[Action Verb] + [Specific What] + [Context/For What Purpose] + [Outcome or Scope if known]"

GOOD Examples:
- "Architected and implemented the real-time notification system handling 10K+ concurrent WebSocket connections"
- "Partnered with the payments team to integrate Stripe billing, reducing checkout abandonment through improved UX"
- "Established code review guidelines and PR templates adopted across 3 frontend teams"
- "Migrated legacy jQuery codebase to React, improving developer velocity and enabling component reuse"
- "Built the admin dashboard from scratch, providing customer support team with order management capabilities"

BAD Examples (too generic):
- "Developed and maintained multiple web applications" (what apps? what purpose?)
- "Collaborated with cross-functional teams" (doing what specifically?)
- "Ensured high performance and scalability" (how? for what?)

🎯 SENIORITY PROGRESSION:
Junior (0-2 yrs): Implementation focus, learning, supporting features, bug fixes, working under guidance
Mid (2-5 yrs): Owning features end-to-end, code reviews, mentoring, process improvements
Senior (5+ yrs): Technical leadership, architecture, cross-team influence, defining standards, strategic decisions

🔢 QUANTITY PER EXPERIENCE:
- Current/Recent job: 5-6 detailed bullet points
- Previous jobs: 4-5 bullet points
- Older jobs (5+ years ago): 3-4 bullet points

═══════════════════════════════════════════════════════════
BULLET POINT INSPIRATION BY ROLE (CUSTOMIZE, don't copy verbatim!)
═══════════════════════════════════════════════════════════

⚠️ IMPORTANT: Use these as INSPIRATION only. Each bullet point you write should:
1. Be customized to the specific company/role context
2. Include unique details that make it feel authentic
3. NEVER be copied word-for-word from this template

>>> FRONTEND DEVELOPER - Themes to Cover (pick different themes per job!) <<<

Theme A - Building Features (customize with actual feature context):
• "Built the [specific feature] module enabling [what users can do]"
• "Developed the [dashboard/portal/interface] used by [user type] to [accomplish what]"
• "Created [number] reusable components forming the basis of the [product] design system"

Theme B - Technical Challenges (be specific about what was solved):
• "Resolved critical [rendering/performance/memory] issues affecting [what part of app]"
• "Implemented [caching/lazy loading/virtualization] to handle [large datasets/complex views]"
• "Migrated [old tech] to [new tech] while maintaining zero downtime for [X users]"

Theme C - Team & Process (show collaboration with specifics):
• "Established [review/testing/documentation] standards adopted by [team size] engineers"
• "Onboarded [number] new developers through pair programming and code walkthroughs"
• "Drove adoption of [TypeScript/testing/accessibility] practices across [scope]"

Theme D - Quality & Reliability:
• "Increased test coverage from [X]% to [Y]% for [critical module/entire codebase]"
• "Reduced [bug reports/production incidents] by implementing [specific practice]"
• "Set up [monitoring/alerting/error tracking] providing visibility into [what]"

Theme E - Ownership & Impact:
• "Owned the [module/feature/system] end-to-end from design review to production release"
• "Led technical planning for [feature] affecting [user count/revenue/core metric]"
• "Served as primary point of contact for [specific area] handling [stakeholder type] requests"

>>> TECHNOLOGY-SPECIFIC THEMES (adapt to their actual tech stack) <<<

React/Vue/Angular - CUSTOMIZE based on what they built:
• "Architected the [specific feature] using [framework] with [state management] for [purpose]"
• "Reduced initial bundle size by [approach], improving load time for [user segment]"
• "Implemented [specific UI pattern] enabling [user capability] with [tech details]"

>>> FULL STACK DEVELOPER - Themes by layer <<<

Frontend Work (be specific about what UI/UX was built):
• "Designed and built the [customer portal/admin panel/dashboard] providing [functionality]"
• "Created a responsive [feature type] interface used by [user count/type] daily"

API & Backend (mention specific endpoints/services):
• "Developed [number] RESTful endpoints powering the [feature/module] functionality"
• "Built the [authentication/payment/notification] service handling [scope/volume]"

Database & Data (mention what data problems were solved):
• "Optimized [query type] queries reducing [page/report] load time from [X] to [Y]"
• "Designed the data model for [feature] supporting [scale/requirements]"

DevOps & Infrastructure:
• "Configured [CI/CD tool] pipeline automating [testing/deployment] for [scope]"
• "Set up [monitoring tool] dashboards tracking [metrics] across [environments]"

>>> BACKEND DEVELOPER - Focus areas (pick different ones per role) <<<

API Design:
• "Architected the [API name/type] serving [X] requests/day with [latency] response times"
• "Documented [number] endpoints using [OpenAPI/Swagger] enabling frontend team velocity"

Data & Performance:
• "Implemented [caching strategy] reducing database load by [outcome]"
• "Designed [queue/job] system processing [volume] of [task type] asynchronously"

Reliability & Operations:
• "Established [alerting/monitoring] for [critical paths] reducing incident response time"
• "Led post-mortems for [incident type] implementing [preventive measures]"

>>> MOBILE DEVELOPER (React Native/Flutter) <<<
• Developed cross-platform mobile applications using React Native/Flutter
• Implemented native device features including camera, geolocation, and push notifications
• Managed app state using Redux/Provider/Riverpod for consistent data flow
• Integrated REST/GraphQL APIs for data synchronization and offline support
• Implemented secure storage for sensitive data using encrypted storage solutions
• Optimized app performance and reduced memory usage for smooth UX
• Published applications to App Store and Google Play with release management
• Wrote unit and widget tests for critical application functionality

>>> DEVOPS / CLOUD ENGINEER <<<
• Designed and maintained cloud infrastructure using AWS/GCP/Azure services
• Implemented Infrastructure as Code using Terraform/CloudFormation/Pulumi
• Set up containerized environments using Docker and Kubernetes orchestration
• Created CI/CD pipelines for automated testing, building, and deployment
• Configured monitoring and alerting using Prometheus, Grafana, and PagerDuty
• Managed secrets and configuration using Vault/AWS Secrets Manager
• Implemented auto-scaling policies for cost optimization and high availability
• Performed security audits and implemented compliance measures

>>> DATA ENGINEER / ANALYST <<<
• Designed and maintained ETL pipelines for data ingestion and transformation
• Built data warehouses using Snowflake/BigQuery/Redshift for analytics
• Created dashboards and reports using Tableau/Power BI/Looker
• Wrote complex SQL queries for data analysis and business insights
• Implemented data quality checks and validation frameworks
• Managed data lakes using Apache Spark/Databricks for big data processing
• Collaborated with stakeholders to translate business requirements into data solutions

>>> HR PROFESSIONAL <<<
• Managed end-to-end recruitment process from sourcing to offer negotiation
• Conducted behavioral and technical interviews to assess candidate fit
• Administered onboarding programs for seamless new hire integration
• Developed and updated HR policies in compliance with employment regulations
• Managed HRIS systems and maintained accurate employee records
• Coordinated performance review cycles and provided manager coaching
• Handled employee relations issues with confidentiality and professionalism
• Organized training programs and professional development initiatives
• Administered compensation and benefits programs
• Led diversity and inclusion initiatives to foster positive workplace culture

>>> PROJECT MANAGER / SCRUM MASTER <<<
• Led cross-functional teams through complete project lifecycle delivery
• Created and maintained project timelines with milestones and dependencies
• Facilitated Agile ceremonies including sprint planning, daily standups, and retrospectives
• Managed project risks and developed mitigation strategies proactively
• Communicated project status to stakeholders through reports and presentations
• Coordinated with vendors and external partners for deliverable quality
• Managed project scope and handled change requests through formal processes
• Tracked project budgets and resource allocation for cost control
• Implemented process improvements based on lessons learned

>>> PRODUCT MANAGER <<<
• Defined product roadmaps and prioritized features based on user research and business goals
• Conducted user interviews and analyzed feedback to inform product decisions
• Created detailed PRDs and user stories for development team execution
• Collaborated with engineering, design, and marketing for product launches
• Analyzed product metrics and KPIs to measure success and identify improvements
• Managed stakeholder expectations through regular communication and demos
• Conducted competitive analysis and market research for strategic planning

═══════════════════════════════════════════════════════════
ACTION VERBS - USE VARIETY (Never repeat in same job entry!)
═══════════════════════════════════════════════════════════

Technical Building:
Developed, Built, Created, Designed, Implemented, Engineered, Architected, Constructed, Established, Formulated

Technical Improvement:
Optimized, Enhanced, Improved, Streamlined, Refactored, Modernized, Upgraded, Revamped, Accelerated, Boosted

Integration & Collaboration:
Integrated, Collaborated, Partnered, Coordinated, Liaised, Unified, Merged, Combined, Synchronized, Aligned

Leadership & Management:
Led, Managed, Directed, Supervised, Oversaw, Guided, Mentored, Coached, Spearheaded, Orchestrated

Analysis & Problem-Solving:
Analyzed, Debugged, Troubleshot, Diagnosed, Investigated, Resolved, Identified, Assessed, Evaluated, Reviewed

Documentation & Communication:
Documented, Authored, Wrote, Presented, Communicated, Reported, Articulated, Conveyed, Illustrated, Demonstrated

Process & Delivery:
Delivered, Shipped, Deployed, Launched, Released, Executed, Completed, Finalized, Accomplished, Achieved

═══════════════════════════════════════════════════════════
IMPORTANT: SKILL-BASED BULLET POINT MATCHING
═══════════════════════════════════════════════════════════

When generating bullet points, ANALYZE the person's listed skills and MATCH bullets accordingly:

If they list React → Use React-specific bullets
If they list Angular → Use Angular-specific bullets
If they list Vue → Use Vue-specific bullets
If they list Node.js → Include backend API bullets
If they list AWS/Azure/GCP → Include cloud deployment bullets
If they list PostgreSQL/MongoDB → Include database bullets
If they list Docker/Kubernetes → Include DevOps bullets
If they list Jest/Cypress → Include testing bullets

NEVER generate bullets for technologies they don't have listed in their skills!

═══════════════════════════════════════════════════════════
PROJECTS SECTION
═══════════════════════════════════════════════════════════
Describe projects with:
- What the project does (purpose/problem it solves)
- Technologies used (from their actual tech stack)
- Your role and contributions
- NO fake user counts or download numbers

Example:
"E-commerce Platform - Built a full-featured online store using Next.js and Stripe integration. Implemented product catalog, shopping cart, checkout flow, and order management. Technologies: Next.js, TypeScript, Tailwind CSS, PostgreSQL, Stripe API."

═══════════════════════════════════════════════════════════
SKILLS SUGGESTIONS
═══════════════════════════════════════════════════════════
Suggest 3-5 skills commonly required for their role that might be missing:
- Based on job title and industry
- Skills implied by their experience but not listed
- Current in-demand skills for their field in 2024-2025

═══════════════════════════════════════════════════════════
RESPONSE FORMAT
═══════════════════════════════════════════════════════════
{
  ...all original fields with enhanced content...,
  "experience": [
    {
      ...original fields...,
      "description": "Generate a 1-2 sentence role description if empty or placeholder",
      "highlights": ["5-6 DIVERSE, SKILL-MATCHED bullet points - each different!"]
    }
  ],
  "_enhancements": {
    "summary": "Rewrote as professional 3-line summary",
    "experience": "Enhanced with diverse, skill-matched bullet points",
    "projects": "Improved project descriptions",
    "overall": "Professional ATS-friendly resume with genuine, role-specific content"
  },
  "suggestedSkills": [
    { "id": "sug-0", "name": "Skill Name", "category": "Technical", "reason": "Commonly required for this role" }
  ]
}

═══════════════════════════════════════════════════════════
FINAL CHECKLIST BEFORE GENERATING
═══════════════════════════════════════════════════════════
Before returning, verify:
☐ Each experience has a UNIQUE role description mentioning company/product context
☐ Bullet points feel specific to THAT job (not generic templates)
☐ NO two experiences have similar bullet points (each job highlights different things)
☐ Senior roles show leadership/architecture; Junior roles show learning/implementation
☐ Technologies mentioned in bullets MATCH their listed skills
☐ NO fake percentages or statistics invented
☐ Each bullet has: Action Verb + Specific What + Context + (Optional) Outcome

NOW ENHANCE THIS RESUME (make each experience feel AUTHENTIC and UNIQUE):
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

  // Get API key from environment
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

    // Call AI to enhance
    let enhancedData;

    if (groqKey) {
      enhancedData = await enhanceWithGroq(groqKey, resumeJson);
    } else if (anthropicKey) {
      enhancedData = await enhanceWithClaude(anthropicKey, resumeJson);
    } else if (openaiKey) {
      enhancedData = await enhanceWithOpenAI(openaiKey, resumeJson);
    }

    if (!enhancedData) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to enhance resume" }),
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

// Enhance with Groq (FREE)
async function enhanceWithGroq(apiKey, resumeJson) {
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
          content: ENHANCEMENT_PROMPT + resumeJson,
        },
      ],
      max_tokens: 8000,
      temperature: 0.3, // Slightly higher for creative improvements
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

// Enhance with Claude
async function enhanceWithClaude(apiKey, resumeJson) {
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
          content: ENHANCEMENT_PROMPT + resumeJson,
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

// Enhance with OpenAI
async function enhanceWithOpenAI(apiKey, resumeJson) {
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
          content: ENHANCEMENT_PROMPT + resumeJson,
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

// Validate enhanced data - ensure critical fields are preserved
function validateEnhancedData(original, enhanced) {
  const validated = { ...enhanced };

  // Preserve personal info identity fields
  if (original.personalInfo) {
    validated.personalInfo = {
      ...enhanced.personalInfo,
      // NEVER change these
      fullName: original.personalInfo.fullName,
      email: original.personalInfo.email,
      phone: original.personalInfo.phone,
      linkedin: original.personalInfo.linkedin,
      github: original.personalInfo.github,
      portfolio: original.personalInfo.portfolio,
      website: original.personalInfo.website,
    };
  }

  // Preserve experience identity fields, but allow description to be enhanced
  if (original.experience && Array.isArray(original.experience)) {
    validated.experience = original.experience.map((origExp, idx) => {
      const enhancedExp = enhanced.experience?.[idx] || origExp;

      // Check if original description is empty or placeholder
      const isPlaceholder = !origExp.description ||
        origExp.description.trim() === '' ||
        origExp.description.toLowerCase().includes('brief description') ||
        origExp.description.toLowerCase().includes('description of your role');

      return {
        ...enhancedExp,
        // NEVER change these
        id: origExp.id,
        company: origExp.company,
        position: origExp.position,
        startDate: origExp.startDate,
        endDate: origExp.endDate,
        current: origExp.current,
        location: origExp.location,
        // Allow description to be enhanced if original was empty/placeholder
        description: isPlaceholder && enhancedExp.description
          ? enhancedExp.description
          : (origExp.description || enhancedExp.description || ''),
      };
    });
  }

  // Preserve education identity fields
  if (original.education && Array.isArray(original.education)) {
    validated.education = original.education.map((origEdu, idx) => {
      const enhancedEdu = enhanced.education?.[idx] || origEdu;
      return {
        ...enhancedEdu,
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

  // Preserve other array sections with their IDs
  const arraySections = [
    'languages', 'certifications', 'projects', 'awards',
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
