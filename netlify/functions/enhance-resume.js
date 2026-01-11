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
or is missing, you MUST generate a brief 1-2 sentence description based on the bullet points and role context.

The description should:
- Summarize the overall scope of the role
- Mention key technologies or domains if relevant
- Be written in professional third-person or neutral tone
- NOT repeat the bullet points, but provide context for them

═══════════════════════════════════════════════════════════
BULLET POINT GENERATION - CORE PRINCIPLES
═══════════════════════════════════════════════════════════

⭐ IMPORTANT: Generate DIVERSE bullet points based on the person's:
1. Listed SKILLS in their resume (match bullet points to their actual tech stack)
2. Job TITLE and SENIORITY level
3. INDUSTRY/DOMAIN they work in
4. Existing highlights (enhance and ADD NEW DIFFERENT ones, don't repeat)

🎯 KEY RULE: Each experience entry should have 5-6 UNIQUE bullet points covering:
- Core technical responsibilities (based on their skills)
- Collaboration & teamwork
- Quality & best practices
- Problem-solving & optimization
- Tools & technologies specific to their stack

🔄 DIVERSITY REQUIREMENT:
- If they already have bullet points, KEEP the good ones and ADD 2-3 NEW DIFFERENT ones
- NEVER duplicate similar bullet points across different job entries
- For each job, focus on DIFFERENT aspects of the role
- Use VARIED action verbs (don't repeat the same verb twice in one job)

═══════════════════════════════════════════════════════════
BULLET POINT TEMPLATES BY ROLE (Pick DIFFERENT ones each time!)
═══════════════════════════════════════════════════════════

>>> FRONTEND DEVELOPER - Core Competency Areas <<<

Category 1: UI Development & Implementation
• Developed responsive and accessible web applications using HTML5, CSS3, and JavaScript (ES6+)
• Built scalable UI components using React.js with hooks, context API, and reusable patterns
• Translated Figma/Adobe XD designs into pixel-perfect, production-ready user interfaces
• Created interactive dashboards and data visualization components using charting libraries
• Implemented complex form handling with validation, error states, and user feedback

Category 2: Performance & Optimization
• Improved page load performance by optimizing assets, implementing code splitting, and lazy loading
• Reduced bundle size through tree-shaking, dynamic imports, and efficient dependency management
• Implemented caching strategies and service workers for offline functionality
• Optimized rendering performance using React.memo, useMemo, and useCallback hooks
• Conducted Lighthouse audits and improved Core Web Vitals scores

Category 3: API Integration & State Management
• Integrated REST APIs and handled async data fetching using Axios/Fetch with proper error handling
• Managed application state using Redux/Context API/Zustand for predictable data flow
• Implemented real-time features using WebSocket connections and server-sent events
• Built custom hooks for reusable data fetching and business logic
• Handled authentication flows including JWT tokens, OAuth, and session management

Category 4: Testing & Quality
• Wrote unit and integration tests using Jest and React Testing Library
• Implemented end-to-end testing with Cypress/Playwright for critical user flows
• Ensured cross-browser compatibility testing across Chrome, Firefox, Safari, and Edge
• Maintained code quality through ESLint, Prettier, and TypeScript strict mode
• Participated in code reviews, providing feedback and ensuring coding standards

Category 5: Collaboration & Process
• Collaborated with designers, backend developers, and product managers in Agile teams
• Participated in sprint planning, daily standups, and retrospective meetings
• Documented component APIs and usage guidelines for team knowledge sharing
• Mentored junior developers on React best practices and modern JavaScript
• Contributed to technical discussions and architecture decisions

>>> REACT-SPECIFIC BULLET POINTS (Use when React skills are listed) <<<
• Built reusable and maintainable React components following atomic design principles
• Managed complex component state using useState, useReducer, and Context API
• Implemented client-side routing using React Router with protected routes and lazy loading
• Optimized React performance using memoization techniques (useMemo, useCallback, React.memo)
• Handled form state and validation using React Hook Form/Formik with Yup schemas
• Integrated UI frameworks like Material UI, Ant Design, or Tailwind CSS with custom theming
• Debugged and resolved UI issues using React DevTools and browser developer tools
• Implemented error boundaries and fallback UI for graceful error handling

>>> ANGULAR-SPECIFIC BULLET POINTS (Use when Angular skills are listed) <<<
• Developed enterprise applications using Angular with TypeScript and RxJS
• Implemented reactive forms with complex validation and dynamic field generation
• Managed application state using NgRx/NGXS with actions, reducers, and effects
• Created reusable Angular modules, components, and services following DRY principles
• Implemented lazy loading modules for improved initial load performance
• Used Angular Material components with custom theme configuration
• Wrote unit tests using Jasmine/Karma and e2e tests with Protractor/Cypress

>>> VUE.JS-SPECIFIC BULLET POINTS (Use when Vue skills are listed) <<<
• Built single-page applications using Vue.js with Composition API and TypeScript
• Managed application state using Vuex/Pinia with modules and persistent storage
• Implemented routing using Vue Router with navigation guards and dynamic routes
• Created reusable Vue components with props validation and custom events
• Used Vuetify/Quasar framework for consistent Material Design UI
• Implemented server-side rendering using Nuxt.js for SEO optimization

>>> FULL STACK DEVELOPER <<<
• Designed and developed full-stack web applications with React/Vue frontend and Node.js backend
• Created RESTful APIs using Express.js/NestJS with proper routing and middleware
• Implemented GraphQL APIs using Apollo Server with resolvers and schema design
• Designed database schemas using PostgreSQL/MongoDB with efficient indexing strategies
• Implemented user authentication using JWT, OAuth 2.0, and session management
• Deployed applications to cloud platforms (AWS/GCP/Azure) using containerization
• Set up CI/CD pipelines using GitHub Actions/Jenkins for automated deployments
• Implemented WebSocket connections for real-time features like chat and notifications
• Wrote database migrations and seeds for consistent development environments
• Monitored application health using logging, metrics, and alerting systems

>>> BACKEND DEVELOPER <<<
• Developed scalable microservices architecture using Node.js/Python/Java/Go
• Designed and optimized database schemas for high-performance data operations
• Implemented message queues using RabbitMQ/Kafka/SQS for async processing
• Built secure API endpoints with input validation, rate limiting, and authentication
• Created comprehensive API documentation using Swagger/OpenAPI specifications
• Implemented caching layers using Redis/Memcached for improved response times
• Wrote background jobs and scheduled tasks for data processing workflows
• Handled database migrations and schema versioning for safe deployments
• Implemented logging, monitoring, and alerting for production observability
• Participated in on-call rotations and incident response procedures

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

NOW ENHANCE THIS RESUME (remember: NO fake percentages, DIVERSE bullets, MATCH to their skills):
`;

const handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
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
