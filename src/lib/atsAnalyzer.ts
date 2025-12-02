import type { ResumeData } from "@/types/resume";

export interface AtsMetric {
  id: string;
  label: string;
  score: number;
  maxScore: number;
  detail: string;
  passed: boolean;
  recommendation?: string;
  ratio: number;
  category?: string;
}

export interface AtsReport {
  score: number;
  maxScore: number;
  grade: "excellent" | "strong" | "good" | "fair" | "poor";
  summary: string;
  metrics: AtsMetric[];
  keywordHits: string[];
  missingKeywords: string[];
  detectedRole?: string;
  detectedIndustry?: string;
  strengths: string[];
  weaknesses: string[];
  criticalIssues: string[];
  improvementTips: string[];
}

// Enhanced keyword libraries by industry and role
const industryKeywords: Record<string, string[]> = {
  // Technology & Software
  software: [
    "agile", "scrum", "ci/cd", "devops", "microservices", "api", "rest", "graphql",
    "docker", "kubernetes", "aws", "azure", "gcp", "cloud", "serverless",
    "git", "version control", "code review", "testing", "debugging", "optimization"
  ],
  frontend: [
    "react", "vue", "angular", "typescript", "javascript", "html", "css", "sass",
    "responsive", "accessibility", "wcag", "ui/ux", "component", "design system",
    "webpack", "vite", "npm", "performance", "seo", "cross-browser"
  ],
  backend: [
    "node.js", "python", "java", "go", "rust", "c++", "sql", "nosql", "mongodb",
    "postgresql", "redis", "kafka", "rabbitmq", "api design", "authentication",
    "distributed systems", "microservices", "scalability", "load balancing", "caching"
  ],
  fullstack: [
    "full stack", "end-to-end", "mern", "mean", "jamstack", "serverless",
    "database design", "api integration", "deployment", "monitoring", "cicd"
  ],
  devops: [
    "kubernetes", "docker", "jenkins", "gitlab ci", "terraform", "ansible",
    "monitoring", "prometheus", "grafana", "elk stack", "incident response",
    "automation", "infrastructure as code", "ci/cd pipeline", "deployment"
  ],
  mobile: [
    "react native", "flutter", "swift", "kotlin", "ios", "android", "mobile app",
    "app store", "play store", "push notifications", "offline first", "responsive"
  ],
  "data science": [
    "python", "r", "machine learning", "deep learning", "tensorflow", "pytorch",
    "pandas", "numpy", "scikit-learn", "data analysis", "statistics", "visualization",
    "sql", "big data", "hadoop", "spark", "etl", "data pipeline", "modeling"
  ],
  "data engineering": [
    "etl", "data pipeline", "airflow", "spark", "hadoop", "kafka", "data warehouse",
    "bigquery", "redshift", "snowflake", "data modeling", "sql optimization"
  ],
  security: [
    "cybersecurity", "penetration testing", "vulnerability assessment", "owasp",
    "encryption", "authentication", "authorization", "compliance", "gdpr", "hipaa",
    "security audit", "incident response", "firewall", "ids/ips", "siem"
  ],
  "qa/testing": [
    "automation", "selenium", "cypress", "jest", "testing", "quality assurance",
    "test cases", "bug tracking", "regression testing", "performance testing",
    "load testing", "ci/cd", "test strategy", "defect management"
  ],

  // Business & Management
  "product management": [
    "product roadmap", "stakeholder management", "user research", "agile", "scrum",
    "requirements", "prioritization", "a/b testing", "analytics", "kpis", "metrics",
    "go-to-market", "product launch", "feature development", "backlog management"
  ],
  "project management": [
    "pmp", "agile", "waterfall", "risk management", "budget", "timeline", "gantt",
    "stakeholder", "resource allocation", "project planning", "deliverables",
    "milestone tracking", "status reporting", "change management", "jira", "asana"
  ],
  executive: [
    "strategy", "leadership", "vision", "p&l", "budget", "stakeholder management",
    "organizational development", "change management", "business transformation",
    "revenue growth", "cost reduction", "market expansion", "team building", "mentorship"
  ],
  management: [
    "team leadership", "performance management", "hiring", "training", "coaching",
    "strategic planning", "budget management", "cross-functional", "process improvement",
    "kpis", "metrics", "reporting", "stakeholder communication"
  ],

  // Marketing & Sales
  marketing: [
    "digital marketing", "seo", "sem", "content marketing", "social media", "email marketing",
    "marketing automation", "hubspot", "salesforce", "google analytics", "campaign management",
    "brand strategy", "market research", "roi", "conversion optimization", "a/b testing"
  ],
  "content marketing": [
    "content strategy", "copywriting", "seo", "blog", "content creation", "editorial",
    "storytelling", "brand voice", "cms", "wordpress", "analytics", "engagement"
  ],
  sales: [
    "b2b", "b2c", "crm", "salesforce", "lead generation", "pipeline management",
    "closing deals", "negotiation", "account management", "quota attainment",
    "revenue growth", "customer acquisition", "relationship building", "prospecting"
  ],

  // Design & Creative
  "ui/ux design": [
    "figma", "sketch", "adobe xd", "wireframing", "prototyping", "user research",
    "usability testing", "design systems", "accessibility", "responsive design",
    "user flows", "information architecture", "visual design", "interaction design"
  ],
  "graphic design": [
    "adobe creative suite", "photoshop", "illustrator", "indesign", "branding",
    "typography", "color theory", "layout", "print design", "visual identity"
  ],

  // Finance & Accounting
  finance: [
    "financial analysis", "financial modeling", "budgeting", "forecasting", "excel",
    "gaap", "ifrs", "financial reporting", "variance analysis", "fp&a", "valuation",
    "investment analysis", "risk management", "compliance", "audit"
  ],
  accounting: [
    "gaap", "accounts payable", "accounts receivable", "general ledger", "reconciliation",
    "tax preparation", "audit", "quickbooks", "sap", "financial statements", "compliance"
  ],

  // Healthcare
  healthcare: [
    "patient care", "clinical", "hipaa", "ehr", "epic", "cerner", "medical records",
    "healthcare compliance", "quality assurance", "patient safety", "evidence-based practice"
  ],
  nursing: [
    "patient assessment", "care planning", "medication administration", "vital signs",
    "electronic health records", "patient education", "clinical documentation", "bls", "acls"
  ],

  // Education
  education: [
    "curriculum development", "lesson planning", "classroom management", "assessment",
    "differentiated instruction", "student engagement", "educational technology",
    "learning outcomes", "pedagogy", "mentoring", "professional development"
  ],

  // Human Resources
  hr: [
    "recruitment", "talent acquisition", "onboarding", "employee relations",
    "performance management", "compensation", "benefits", "hris", "workday",
    "compliance", "employment law", "training and development", "retention"
  ],

  // Operations
  operations: [
    "process improvement", "lean", "six sigma", "supply chain", "logistics",
    "inventory management", "vendor management", "quality control", "efficiency",
    "cost reduction", "operational excellence", "workflow optimization"
  ],

  // Customer Service
  "customer service": [
    "customer satisfaction", "problem resolution", "communication skills",
    "crm", "zendesk", "customer support", "ticketing system", "response time",
    "customer retention", "escalation management", "quality assurance"
  ],

  // General Business
  business: [
    "strategic planning", "business development", "market analysis", "competitive analysis",
    "roi", "kpis", "data-driven", "stakeholder management", "cross-functional collaboration",
    "process improvement", "cost optimization", "revenue growth"
  ]
};

// Role detection patterns
const rolePatterns: Record<string, RegExp[]> = {
  software: [/software (engineer|developer)/i, /full[- ]?stack/i, /programmer/i, /sde/i],
  frontend: [/front[- ]?end/i, /react/i, /ui engineer/i, /web developer/i],
  backend: [/back[- ]?end/i, /server[- ]?side/i, /api developer/i],
  fullstack: [/full[- ]?stack/i, /fullstack/i],
  devops: [/devops/i, /site reliability/i, /sre/i, /infrastructure/i, /platform engineer/i],
  mobile: [/mobile/i, /ios/i, /android/i, /react native/i, /flutter/i],
  "data science": [/data scientist/i, /machine learning/i, /ml engineer/i, /ai engineer/i],
  "data engineering": [/data engineer/i, /etl/i, /data pipeline/i],
  security: [/security/i, /cybersecurity/i, /infosec/i, /penetration test/i],
  "qa/testing": [/qa/i, /quality assurance/i, /test engineer/i, /sdet/i, /automation engineer/i],
  "product management": [/product manager/i, /product owner/i, /pm/i],
  "project management": [/project manager/i, /program manager/i, /scrum master/i],
  executive: [/ceo/i, /cto/i, /cfo/i, /coo/i, /vp/i, /vice president/i, /director/i, /head of/i],
  management: [/manager/i, /lead/i, /supervisor/i, /team lead/i],
  marketing: [/marketing/i, /growth/i, /digital marketing/i],
  "content marketing": [/content/i, /copywriter/i, /content strategist/i],
  sales: [/sales/i, /account executive/i, /business development/i, /sales engineer/i],
  "ui/ux design": [/ui\/ux/i, /product design/i, /ux designer/i, /ui designer/i, /interaction designer/i],
  "graphic design": [/graphic design/i, /visual design/i, /brand designer/i],
  finance: [/financial analyst/i, /finance/i, /fp&a/i, /investment/i],
  accounting: [/accountant/i, /bookkeeper/i, /cpa/i],
  healthcare: [/healthcare/i, /medical/i, /clinical/i],
  nursing: [/nurse/i, /rn/i, /lpn/i],
  education: [/teacher/i, /professor/i, /instructor/i, /educator/i],
  hr: [/human resources/i, /hr/i, /recruiter/i, /talent acquisition/i],
  operations: [/operations/i, /supply chain/i, /logistics/i],
  "customer service": [/customer service/i, /customer support/i, /support specialist/i],
};

// Comprehensive action verbs
const actionVerbs = [
  // Leadership
  "led", "directed", "managed", "supervised", "coordinated", "orchestrated", "spearheaded",
  "championed", "mentored", "coached", "guided", "facilitated",

  // Achievement
  "achieved", "accomplished", "delivered", "exceeded", "surpassed", "attained", "completed",

  // Creation/Development
  "built", "created", "developed", "designed", "architected", "engineered", "established",
  "launched", "implemented", "deployed", "released", "introduced", "pioneered",

  // Improvement
  "improved", "optimized", "enhanced", "streamlined", "modernized", "transformed",
  "upgraded", "refactored", "automated", "accelerated", "increased", "boosted",

  // Problem Solving
  "solved", "resolved", "troubleshot", "debugged", "diagnosed", "fixed", "addressed",

  // Reduction
  "reduced", "decreased", "minimized", "eliminated", "cut", "lowered",

  // Analysis
  "analyzed", "evaluated", "assessed", "investigated", "researched", "examined",

  // Collaboration
  "collaborated", "partnered", "worked with", "cooperated", "contributed",

  // Communication
  "presented", "communicated", "documented", "reported", "articulated", "demonstrated"
];

// Quantifiable achievement patterns
const quantifiablePatterns = [
  /\d+%/,           // Percentages: 50%, 25%
  /\$[\d,]+[kKmMbB]?/, // Money: $50K, $1M
  /\d+[kKmMbB]\+?/,   // Numbers with K/M/B: 10K+, 5M
  /\d+x/i,          // Multipliers: 2x, 10x
  /\d+[-–]\d+/,     // Ranges: 5-10, 100-200
  /\d{1,3}(,\d{3})*/  // Large numbers: 1,000 or 50,000
];

// Date format patterns (for consistency checking)
const datePatterns = [
  /\d{4}-\d{2}/,           // YYYY-MM
  /\d{2}\/\d{4}/,          // MM/YYYY
  /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/i, // Mon YYYY
  /\d{4}/                  // YYYY only
];

/**
 * Detect role/industry from resume data
 */
const detectRole = (resume: ResumeData): { role: string; industry: string; confidence: number } => {
  const textToAnalyze = [
    resume.personalInfo.title,
    resume.personalInfo.summary,
    ...resume.experience.map(exp => `${exp.position} ${exp.description}`),
    resume.skills.map(skill => skill.name).join(' ')
  ].join(' ').toLowerCase();

  let bestMatch = { role: "general", industry: "business", confidence: 0 };

  for (const [role, patterns] of Object.entries(rolePatterns)) {
    let matchCount = 0;
    for (const pattern of patterns) {
      if (pattern.test(textToAnalyze)) {
        matchCount += 2; // Direct match has high weight
      }
    }

    // Check for keyword matches
    const keywords = industryKeywords[role] || [];
    const keywordMatches = keywords.filter(kw => textToAnalyze.includes(kw.toLowerCase())).length;
    matchCount += keywordMatches;

    const confidence = Math.min(100, (matchCount / (patterns.length + keywords.length * 0.5)) * 100);

    if (confidence > bestMatch.confidence) {
      bestMatch = { role, industry: role, confidence };
    }
  }

  return bestMatch;
};

const gradeFromScore = (ratio: number): AtsReport["grade"] => {
  if (ratio >= 0.90) return "excellent";
  if (ratio >= 0.80) return "strong";
  if (ratio >= 0.65) return "good";
  if (ratio >= 0.50) return "fair";
  return "poor";
};

const summaryFromGrade = (grade: AtsReport["grade"]): string => {
  switch (grade) {
    case "excellent":
      return "Outstanding! Your resume is highly optimized for ATS systems. Minor refinements only.";
    case "strong":
      return "Very good! Your resume should pass most ATS systems with strong visibility.";
    case "good":
      return "Good foundation. Some improvements will help increase your ATS compatibility.";
    case "fair":
      return "Fair. Several areas need attention to improve ATS parsing and ranking.";
    default:
      return "Needs significant improvement. Critical issues may prevent proper ATS parsing.";
  }
};

const scoreMetric = (
  id: string,
  label: string,
  score: number,
  maxScore: number,
  detail: string,
  recommendation?: string,
  category?: string
): AtsMetric => ({
  id,
  label,
  score,
  maxScore,
  detail,
  passed: score >= maxScore * 0.7,
  recommendation,
  ratio: maxScore ? score / maxScore : 0,
  category
});

interface AnalyzerOptions {
  templateId?: string;
  useAI?: boolean; // For future AI-powered analysis
}

/**
 * Comprehensive ATS Resume Analyzer
 * Analyzes resume for ATS compatibility and provides detailed feedback
 */
export const analyzeResumeForATS = (
  resume: ResumeData,
  options: AnalyzerOptions = {}
): AtsReport => {
  const metrics: AtsMetric[] = [];
  let totalScore = 0;
  let totalMax = 0;
  let ratioTotal = 0;
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const criticalIssues: string[] = [];
  const improvementTips: string[] = [];

  const safeAdd = (metric: AtsMetric) => {
    metrics.push(metric);
    totalScore += metric.score;
    totalMax += metric.maxScore;
    ratioTotal += metric.ratio;

    if (metric.passed) {
      strengths.push(metric.label);
    } else {
      weaknesses.push(metric.label);
      if (metric.ratio < 0.5) {
        criticalIssues.push(metric.label);
      }
    }

    if (metric.recommendation) {
      improvementTips.push(metric.recommendation);
    }
  };

  // Detect role and industry for smart keyword matching
  const detection = detectRole(resume);
  const relevantKeywords = industryKeywords[detection.role] || industryKeywords["business"];

  // ========================================
  // 1. CONTACT INFORMATION (Weight: 5%)
  // ========================================
  const hasName = Boolean(resume.personalInfo.fullName?.trim());
  const hasEmail = Boolean(resume.personalInfo.email?.trim());
  const hasPhone = Boolean(resume.personalInfo.phone?.trim());
  const hasLocation = Boolean(resume.personalInfo.location?.trim());
  const hasTitle = Boolean(resume.personalInfo.title?.trim());

  const missingContacts: string[] = [];
  if (!hasName) missingContacts.push("name");
  if (!hasEmail) missingContacts.push("email");
  if (!hasPhone) missingContacts.push("phone");
  if (!hasLocation) missingContacts.push("location");
  if (!hasTitle) missingContacts.push("professional title");

  let contactScore = 0;
  if (hasName) contactScore += 3;
  if (hasEmail) contactScore += 3;
  if (hasPhone) contactScore += 2;
  if (hasLocation) contactScore += 1;
  if (hasTitle) contactScore += 1;

  safeAdd(
    scoreMetric(
      "contact",
      "Contact Information",
      contactScore,
      10,
      missingContacts.length
        ? `Missing: ${missingContacts.join(', ')}`
        : "All essential contact information present",
      missingContacts.length
        ? `Add ${missingContacts.join(', ')} to ensure ATS can parse your contact details.`
        : undefined,
      "basics"
    )
  );

  // ========================================
  // 2. PROFESSIONAL SUMMARY (Weight: 10%)
  // ========================================
  const summaryContent = resume.personalInfo.summary?.trim() || "";
  const summaryWordCount = summaryContent.split(/\s+/).filter(Boolean).length;
  const summarySentences = summaryContent.split(/[.!?]+/).filter(s => s.trim().length > 0);

  const summaryKeywordMatches = relevantKeywords.filter(kw =>
    summaryContent.toLowerCase().includes(kw.toLowerCase())
  ).length;

  let summaryScore = 0;
  if (summaryContent) {
    summaryScore += 3; // Has summary
    if (summaryWordCount >= 30 && summaryWordCount <= 100) summaryScore += 3; // Good length
    else if (summaryWordCount >= 20) summaryScore += 2;
    else if (summaryWordCount >= 10) summaryScore += 1;

    if (summarySentences.length >= 2) summaryScore += 2; // Multiple sentences
    if (summaryKeywordMatches >= 3) summaryScore += 2; // Good keyword density
    else if (summaryKeywordMatches >= 1) summaryScore += 1;
  }

  safeAdd(
    scoreMetric(
      "summary",
      "Professional Summary",
      summaryScore,
      10,
      summaryContent
        ? `${summaryWordCount} words, ${summarySentences.length} sentence(s), ${summaryKeywordMatches} relevant keywords`
        : "Summary missing",
      summaryScore < 7
        ? summaryContent
          ? `Enhance with more industry keywords. Current: ${summaryKeywordMatches}/10+ keywords. Aim for 50-100 words.`
          : "Add a compelling 50-100 word summary with role-relevant keywords and quantifiable achievements."
        : undefined,
      "content"
    )
  );

  // ========================================
  // 3. EXPERIENCE QUALITY (Weight: 25%)
  // ========================================
  const experienceCount = resume.experience.length;
  const recentExperience = resume.experience.filter(exp => {
    const year = parseInt(exp.startDate?.split('-')[0] || "0");
    return year >= new Date().getFullYear() - 10;
  });

  let experienceScore = 0;
  let quantifiableCount = 0;
  let actionVerbCount = 0;
  let bulletCount = 0;

  resume.experience.forEach(exp => {
    const description = exp.description || "";
    const bullets = description.split('\n').filter(b => b.trim());
    bulletCount += bullets.length;

    bullets.forEach(bullet => {
      const lowerBullet = bullet.toLowerCase();
      // Check for action verbs
      if (actionVerbs.some(verb => lowerBullet.includes(verb))) {
        actionVerbCount++;
      }
      // Check for quantifiable achievements
      if (quantifiablePatterns.some(pattern => pattern.test(bullet))) {
        quantifiableCount++;
      }
    });
  });

  // Scoring
  if (experienceCount > 0) {
    experienceScore += Math.min(5, experienceCount * 1.25); // Up to 5 points for experience count
    experienceScore += Math.min(5, (bulletCount / experienceCount) * 1.25); // Up to 5 for bullet density
    experienceScore += Math.min(5, actionVerbCount * 0.5); // Up to 5 for action verbs
    experienceScore += Math.min(5, quantifiableCount * 0.7); // Up to 5 for quantifiable achievements
    if (recentExperience.length >= experienceCount * 0.6) experienceScore += 5; // Recent experience bonus
  }

  const experienceRecommendations: string[] = [];
  if (experienceCount === 0) {
    experienceRecommendations.push("Add at least 2-3 relevant work experiences.");
  } else {
    if (bulletCount / experienceCount < 3) {
      experienceRecommendations.push("Use 3-5 bullet points per role.");
    }
    if (actionVerbCount < bulletCount * 0.6) {
      experienceRecommendations.push("Start more bullets with strong action verbs (Led, Built, Improved, etc.).");
    }
    if (quantifiableCount < bulletCount * 0.5) {
      experienceRecommendations.push("Add numbers and metrics (increased revenue by 30%, reduced costs by $50K, etc.).");
    }
  }

  safeAdd(
    scoreMetric(
      "experience",
      "Experience Quality",
      Math.min(25, experienceScore),
      25,
      `${experienceCount} roles, ${bulletCount} bullets, ${actionVerbCount} action verbs, ${quantifiableCount} quantified achievements`,
      experienceRecommendations.length > 0 ? experienceRecommendations.join(' ') : undefined,
      "content"
    )
  );

  // ========================================
  // 4. EDUCATION & CREDENTIALS (Weight: 10%)
  // ========================================
  const educationCount = resume.education.length;
  const hasDegree = educationCount > 0;
  const hasGPA = resume.education.some(edu => edu.gpa && parseFloat(edu.gpa) >= 3.0);
  const hasHonors = resume.education.some(edu => edu.honors && edu.honors.length > 0);

  let educationScore = 0;
  if (hasDegree) {
    educationScore += 6;
    if (educationCount > 1) educationScore += 1;
    if (hasGPA) educationScore += 2;
    if (hasHonors) educationScore += 1;
  }

  safeAdd(
    scoreMetric(
      "education",
      "Education & Credentials",
      educationScore,
      10,
      hasDegree
        ? `${educationCount} degree(s) listed${hasGPA ? ', GPA included' : ''}${hasHonors ? ', honors mentioned' : ''}`
        : "No education listed",
      !hasDegree
        ? "Add your highest degree, institution, and graduation year."
        : educationScore < 8
          ? "Consider adding GPA (if 3.0+), relevant coursework, or honors."
          : undefined,
      "basics"
    )
  );

  // ========================================
  // 5. SKILLS MATCH (Weight: 20%)
  // ========================================
  const skillCount = resume.skills.length;
  const uniqueSkillNames = new Set(
    resume.skills.map(skill => skill.name?.toLowerCase().trim()).filter(Boolean)
  );

  // Check for skills categorization
  const coreSkills = resume.skills.filter(s => s.category === 'core').length;
  const toolboxSkills = resume.skills.filter(s => s.category === 'toolbox').length;

  // Match against industry keywords
  const resumeText = [
    resume.personalInfo.summary,
    ...resume.experience.map(exp => `${exp.position} ${exp.description}`),
    resume.skills.map(skill => skill.name).join(' '),
  ].join(' ').toLowerCase();

  const keywordMatches = relevantKeywords.filter(kw =>
    resumeText.includes(kw.toLowerCase())
  ).length;

  let skillScore = 0;
  if (skillCount > 0) {
    skillScore += Math.min(8, uniqueSkillNames.size * 0.6); // Up to 8 for skill count
    if (coreSkills > 0 && toolboxSkills > 0) skillScore += 2; // Categorization bonus
    skillScore += Math.min(10, keywordMatches * 0.5); // Up to 10 for keyword matches
  }

  safeAdd(
    scoreMetric(
      "skills",
      "Skills & Keywords",
      Math.min(20, skillScore),
      20,
      `${uniqueSkillNames.size} unique skills, ${keywordMatches}/${relevantKeywords.length} industry keywords matched`,
      skillScore < 14
        ? `Add ${Math.max(0, 12 - uniqueSkillNames.size)} more relevant skills. Target keywords: ${relevantKeywords.slice(0, 5).join(', ')}.`
        : undefined,
      "content"
    )
  );

  // ========================================
  // 6. FORMATTING & STRUCTURE (Weight: 15%)
  // ========================================
  let formattingScore = 0;
  const formattingIssues: string[] = [];

  // Check date consistency
  const allDates = [
    ...resume.experience.map(exp => [exp.startDate, exp.endDate]).flat(),
    ...resume.education.map(edu => [edu.startDate, edu.endDate]).flat()
  ].filter(Boolean);

  const dateFormats = allDates.map(date => {
    for (const pattern of datePatterns) {
      if (pattern.test(date)) return pattern.source;
    }
    return 'unknown';
  });

  const uniqueDateFormats = new Set(dateFormats);
  if (uniqueDateFormats.size <= 1) {
    formattingScore += 4; // Consistent date format
  } else {
    formattingIssues.push("Inconsistent date formats");
  }

  // Check for bullet structure
  const bulletsUsed = resume.experience.every(exp =>
    exp.description && exp.description.includes('\n')
  );
  if (bulletsUsed) {
    formattingScore += 3;
  } else {
    formattingIssues.push("Not all roles use bullet points");
  }

  // Check for section completeness
  if (resume.experience.length > 0) formattingScore += 2;
  if (resume.education.length > 0) formattingScore += 2;
  if (resume.skills.length > 0) formattingScore += 2;

  // Check for excessive length (ATS preference: 1-2 pages = 400-800 words)
  const totalWords = [
    resume.personalInfo.summary,
    ...resume.experience.map(exp => exp.description),
    ...resume.education.map(edu => edu.field + ' ' + edu.degree)
  ].join(' ').split(/\s+/).filter(Boolean).length;

  if (totalWords >= 300 && totalWords <= 900) {
    formattingScore += 2;
  } else if (totalWords > 900) {
    formattingIssues.push("Resume may be too lengthy (>900 words)");
  } else {
    formattingIssues.push("Resume may be too brief (<300 words)");
  }

  safeAdd(
    scoreMetric(
      "formatting",
      "Formatting & Structure",
      formattingScore,
      15,
      formattingIssues.length === 0
        ? `Well-structured: ${totalWords} words, consistent formatting`
        : `Issues: ${formattingIssues.join(', ')}`,
      formattingIssues.length > 0
        ? "Use consistent date formats (YYYY-MM recommended), bullet points for all roles, and aim for 400-800 words total."
        : undefined,
      "formatting"
    )
  );

  // ========================================
  // 7. CONTENT DEPTH (Weight: 10%)
  // ========================================
  let contentScore = 0;

  // Word count per section
  const avgWordsPerRole = experienceCount > 0
    ? resume.experience.map(exp => exp.description.split(/\s+/).length)
        .reduce((a, b) => a + b, 0) / experienceCount
    : 0;

  if (avgWordsPerRole >= 40) contentScore += 4;
  else if (avgWordsPerRole >= 25) contentScore += 2;
  else if (avgWordsPerRole >= 15) contentScore += 1;

  // Summary depth
  if (summaryWordCount >= 50) contentScore += 3;
  else if (summaryWordCount >= 30) contentScore += 2;
  else if (summaryWordCount >= 20) contentScore += 1;

  // Skills depth
  if (uniqueSkillNames.size >= 12) contentScore += 3;
  else if (uniqueSkillNames.size >= 8) contentScore += 2;
  else if (uniqueSkillNames.size >= 5) contentScore += 1;

  safeAdd(
    scoreMetric(
      "content_depth",
      "Content Depth",
      contentScore,
      10,
      `${totalWords} total words, ${Math.round(avgWordsPerRole)} avg words/role`,
      contentScore < 7
        ? "Add more detail to each role (40+ words per position), expand summary to 50+ words, and list 12+ skills."
        : undefined,
      "content"
    )
  );

  // ========================================
  // 8. KEYWORD OPTIMIZATION (Weight: 5%)
  // ========================================
  const keywordHits = relevantKeywords.filter(kw =>
    resumeText.includes(kw.toLowerCase())
  );
  const missingKeywords = relevantKeywords.filter(kw => !keywordHits.includes(kw));

  const keywordScore = relevantKeywords.length
    ? (keywordHits.length / relevantKeywords.length) * 5
    : 4;

  safeAdd(
    scoreMetric(
      "keywords",
      "Keyword Optimization",
      keywordScore,
      5,
      `${keywordHits.length}/${relevantKeywords.length} target keywords for ${detection.role} role`,
      keywordScore < 3.5
        ? `Add these keywords naturally: ${missingKeywords.slice(0, 5).join(', ')}`
        : undefined,
      "content"
    )
  );

  // ========================================
  // CALCULATE FINAL SCORE & GRADE
  // ========================================
  const averageRatio = metrics.length ? ratioTotal / metrics.length : 0;
  const finalScore = Math.round(averageRatio * 100) / 10; // Score out of 10
  const grade = gradeFromScore(averageRatio);

  return {
    score: finalScore,
    maxScore: 10,
    grade,
    summary: summaryFromGrade(grade),
    metrics,
    keywordHits,
    missingKeywords: missingKeywords.slice(0, 10), // Top 10 missing keywords
    detectedRole: detection.role,
    detectedIndustry: detection.industry,
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 5),
    criticalIssues,
    improvementTips: improvementTips.slice(0, 8)
  };
};

/**
 * AI-Powered ATS Analysis (Premium Feature - Placeholder)
 * This would use Claude API or similar for deeper analysis
 */
export const analyzeResumeWithAI = async (
  resume: ResumeData,
  options: AnalyzerOptions = {}
): Promise<AtsReport> => {
  // TODO: Implement AI-powered analysis
  // This would call Claude API with a detailed prompt analyzing:
  // - Writing quality and tone
  // - Career progression narrative
  // - Industry-specific best practices
  // - Personalized recommendations
  // - Competitive analysis against job descriptions

  // For now, return enhanced rule-based analysis
  return analyzeResumeForATS(resume, options);
};
