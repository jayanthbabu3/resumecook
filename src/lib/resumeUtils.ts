import type { ResumeData } from "@/types/resume";

// Re-export ResumeData type for other components to use
export type { ResumeData };

// Helper function to ensure data has valid array fields
export const sanitizeResumeData = (data: any): ResumeData => {
  // Migrate existing experience descriptions to bullet points for backward compatibility
  const migratedExperience = Array.isArray(data.experience) 
    ? data.experience.map((exp: any) => {
        // Ensure exp exists and has required properties
        if (!exp) return { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "", bulletPoints: [], current: false };
        
        let bulletPoints: string[] = [];
        
        // Use existing bulletPoints if they exist and are valid
        // Preserve empty strings as they may be placeholders for new bullet points being edited
        if (exp.bulletPoints && Array.isArray(exp.bulletPoints)) {
          bulletPoints = exp.bulletPoints; // Keep all bullet points including empty ones for editing
        }
        
        // If no bulletPoints but description exists, migrate description to bulletPoints
        // Only migrate if bulletPoints is truly empty (not just has empty strings)
        const hasNonEmptyBulletPoints = bulletPoints.some(bp => bp && bp.trim().length > 0);
        if (!hasNonEmptyBulletPoints && exp.description && exp.description.trim()) {
          bulletPoints = exp.description
            .split('\n')
            .filter((line: string) => line.trim())
            .map((line: string) => line.trim());
          
          // If no bullet points could be extracted, create one from the entire description
          if (bulletPoints.length === 0) {
            bulletPoints.push(exp.description.trim());
          }
        }
        
        // Ensure bulletPoints is always an array
        if (!Array.isArray(bulletPoints)) {
          bulletPoints = [];
        }
        
        return {
          ...exp,
          bulletPoints,
          description: "", // Always clear description after migration
        };
      })
    : [];

  const migratedEducation = Array.isArray(data.education)
    ? data.education.map((edu: any) => ({
        ...edu,
        coursework: Array.isArray(edu.coursework) ? edu.coursework : [],
        honors: Array.isArray(edu.honors) ? edu.honors : [],
      }))
    : [];

  const migratedSkills = Array.isArray(data.skills)
    ? data.skills.map((skill: any) => ({
        ...skill,
        level: skill.level ?? 10,
        category: skill.category ?? "core",
      }))
    : [];

  return {
    personalInfo: {
      fullName: data.personalInfo?.fullName || "",
      email: data.personalInfo?.email || "",
      phone: data.personalInfo?.phone || "",
      location: data.personalInfo?.location || "",
      title: data.personalInfo?.title || "",
      summary: data.personalInfo?.summary || "",
      photo: data.personalInfo?.photo || "",
      linkedin: data.personalInfo?.linkedin || "",
      portfolio: data.personalInfo?.portfolio || "",
      github: data.personalInfo?.github || "",
    },
    includeSocialLinks: data.includeSocialLinks ?? true,
    experience: migratedExperience,
    education: migratedEducation,
    skills: migratedSkills,
    sections: Array.isArray(data.sections) ? data.sections : [],
    dynamicSections: Array.isArray(data.dynamicSections) ? data.dynamicSections : [],
  };
};

export const generateSkills = (
  templateId: string,
  names: string[],
  levels?: string[],
): ResumeData["skills"] =>
  names.map((name, index) => ({
    id: `${templateId}-skill-${index}`,
    name,
    rating: levels?.[index] ?? Math.max(1, Math.min(10, 10 - index)).toString(),
    category: index < 6 ? "core" : "toolbox",
  }));

export const getTemplateDefaults = (templateId: string): ResumeData => {
  const professionalDefaults: ResumeData = {
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      title: "Senior Software Engineer",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      summary: "Experienced software engineer with expertise in full-stack development, system architecture, and team leadership. Passionate about building scalable solutions and mentoring junior developers.",
    },
    includeSocialLinks: true,
    experience: [
      {
        id: "1",
        company: "Tech Company",
        position: "Senior Software Engineer",
        startDate: "2020-01",
        endDate: "2024-01",
        description: "Led development of enterprise applications",
        current: false,
        bulletPoints: [
          "Conducted comprehensive financial analysis and forecasting for 5 business units, supporting $2B in annual revenue",
          "Streamlined reporting processes, reducing monthly close time by 30% and saving 40 hours per month",
          "Collaborated with cross-functional teams on budgeting initiatives, identifying $5M in cost savings"
        ],
      },
      {
        id: "2",
        company: "Digital Solutions Inc",
        position: "Software Engineer",
        startDate: "2018-06",
        endDate: "2020-01",
        description: "Developed scalable web applications and APIs",
        current: false,
        bulletPoints: [
          "Built and maintained RESTful APIs serving 100K+ daily users",
          "Implemented automated testing reducing bugs by 40%",
          "Led migration to microservices architecture improving system scalability"
        ],
      },
    ],
    education: [
      {
        id: "1",
        school: "Columbia University",
        degree: "Master of Business Administration",
        field: "Finance",
        startDate: "2014-09",
        endDate: "2016-05",
        gpa: "3.8/4.0",
      },
      {
        id: "2",
        school: "University of Pennsylvania",
        degree: "Bachelor of Science",
        field: "Economics",
        startDate: "2010-09",
        endDate: "2014-05",
        gpa: "3.9/4.0",
      },
    ],
    skills: generateSkills(
      "professional",
      [
        "Financial Modeling",
        "Excel & VBA",
        "SQL",
        "Tableau",
        "Budget Planning",
        "Risk Analysis",
        "Bloomberg Terminal",
        "Financial Reporting",
      ],
      ["9", "9", "8", "8", "8", "8", "7", "7"],
    ),
    sections: [
      {
        id: "default-section-1",
        title: "Certifications",
        content: "Certification Name - Issuing Organization (Year)\nAdditional certifications can be added here",
      },
    ],
    dynamicSections: [],
  };

  const graduateDefaults: ResumeData = {
    personalInfo: {
      fullName: "Aarav Mishra",
      email: "aarav.mishra@example.com",
      phone: "+91 98765 43210",
      location: "Bengaluru, India",
      title: "Computer Science Graduate",
      linkedin: "linkedin.com/in/aarav-mishra",
      github: "github.com/aarav-mishra",
      summary:
        "Final-year Computer Science graduate with hands-on experience in building web applications, collaborating in agile teams, and shipping features from concept to deployment. Passionate about writing clean, readable code and continuously improving through code reviews, side projects, and open-source contributions.\n\nComfortable working across the stack with TypeScript, React, Node.js, and SQL/NoSQL databases. Looking for an entry-level software engineering role where I can contribute to real-world products while continuing to grow as an engineer.",
    },
    includeSocialLinks: true,
    experience: [
      {
        id: "exp-intern-1",
        company: "InnovaSoft Labs",
        position: "Software Engineering Intern",
        startDate: "2024-01",
        endDate: "2024-06",
        description: "",
        current: false,
        bulletPoints: [
          "Built a React + TypeScript dashboard that reduced manual reporting time for the support team by ~40%.",
          "Implemented REST APIs in Node.js/Express and integrated them with a PostgreSQL database using Prisma.",
          "Wrote unit tests with Jest and React Testing Library, improving test coverage for the feature area from 15% to 65%.",
          "Collaborated with a senior engineer in code reviews, learning best practices around accessibility, error handling, and performance.",
        ],
      },
      {
        id: "exp-project-1",
        company: "Capstone Project – University",
        position: "Full-Stack Developer",
        startDate: "2023-08",
        endDate: "2023-12",
        description: "",
        current: false,
        bulletPoints: [
          "Designed and developed a placement-tracking web app for students and faculty using React, Node.js, and MongoDB.",
          "Implemented authentication, role-based access, and a simple analytics dashboard for placement statistics.",
          "Deployed the project on a cloud platform and documented the setup so that juniors could continue maintaining it.",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        school: "National Institute of Technology",
        degree: "Bachelor of Technology",
        field: "Computer Science and Engineering",
        startDate: "2020-08",
        endDate: "2024-05",
        gpa: "8.4 / 10.0",
      },
    ],
    skills: generateSkills("graduate", [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "HTML & CSS",
      "REST APIs",
      "SQL & MongoDB",
      "Git & GitHub",
    ]),
    sections: [
      {
        id: "sec-certifications",
        title: "Certifications",
        content: "",
        items: [
          "AWS Academy Cloud Foundations – Amazon Web Services",
          "JavaScript Algorithms and Data Structures – freeCodeCamp",
        ],
      },
      {
        id: "sec-activities",
        title: "Activities & Achievements",
        content: "",
        items: [
          "Led a 4-member team to the finals of a national-level hackathon focused on ed-tech solutions.",
          "Organised weekly coding interview practice sessions for juniors as part of the Programming Club.",
        ],
      },
    ],
    dynamicSections: [],
  };

  const templates: Record<string, ResumeData> = {
    professional: professionalDefaults,
    modern: {
      ...professionalDefaults,
      personalInfo: {
        ...professionalDefaults.personalInfo,
        fullName: "Alex Chen",
        title: "Full Stack Developer",
      }
    },
    minimal: {
      ...professionalDefaults,
      personalInfo: {
        ...professionalDefaults.personalInfo,
        fullName: "Emily Rodriguez",
        title: "UX Designer",
      }
    },
    graduate: graduateDefaults,
  };

  // List of all fresher template IDs to use graduate defaults
  const fresherTemplateIds = [
    "starter", "fresher", "premium-fresher", "fresher-elite", "fresher-minimal-grid",
    "fresher-dark-professional", "fresher-color-accent", "fresher-timeline", "fresher-skills-first",
    "fresher-card-based", "fresher-two-tone", "fresher-centered-elegant", "fresher-geometric",
    "fresher-achievement", "fresher-modern-two-column", "fresher-professional-sidebar",
    "fresher-clean-modern", "fresher-tech-split", "fresher-executive-style", "fresher-bold-header",
    "fresher-minimalist-two-column", "fresher-creative-edge", "fresher-professional-grid",
    "fresher-modern-classic", "fresher-split-layout", "fresher-compact-pro", "fresher-elegant-sidebar",
    "fresher-tech-modern", "fresher-professional-minimal", "graduate-momentum", "entry-elite",
    "freshers-vision", "graduate-prime", "entry-horizon", "freshers-crafted", "graduate-zenith",
    "entry-sphere", "fresher-neon-accent", "fresher-glassmorphism", "fresher-progressive",
    "fresher-polaroid-style", "fresher-ribbon-style", "fresher-double-column", "fresher-gradient-border",
    "fresher-circular-progress", "fresher-modern-tabs", "fresher-lightweight", "fresher-timeline-dots",
    "fresher-box-shadow", "fresher-step-by-step", "fresher-left-stripe", "fresher-top-bottom",
    "fresher-dash-border", "fresher-iconography", "fresher-modern-split", "fresher-wave-header",
    "fresher-academic-style", "academic-achiever", "graduate-innovator", "campus-leader",
    "scholarship-graduate", "honors-student", "stem-graduate", "internship-ready", "research-graduate",
    "entrepreneurial-graduate", "volunteer-leader", "coding-bootcamp-grad", "liberal-arts-graduate",
    "business-graduate", "engineering-fresher", "design-school-grad", "masters-graduate",
    "phd-candidate", "student-athlete", "study-abroad-graduate", "dual-degree-graduate",
    "digital-native-graduate", "tech-savvy-fresher", "linkedin-ready-graduate", "github-student-developer",
    "portfolio-first-graduate", "connected-graduate", "social-media-savvy-grad", "open-source-contributor",
    "hackathon-winner", "coding-challenge-champion", "capstone-showcase", "research-publication-grad",
    "conference-presenter", "startup-intern", "faang-aspirant", "bootcamp-success-story",
    "remote-work-ready", "community-builder", "tech-blogger-graduate", "youtube-educator",
    "launchpad-graduate", "momentum-fresher", "horizon-graduate", "catalyst-fresher",
    "pathway-graduate", "spark-fresher", "ascend-graduate", "pioneer-fresher", "keystone-graduate",
    "venture-fresher", "aspire-graduate", "emerge-fresher", "bright-graduate", "nextstep-fresher",
    "foundation-graduate", "elevate-fresher", "genesis-graduate", "achiever-fresher", "milestone-graduate",
    "potential-fresher", "gen-z-graduate", "digital-native-grad", "social-first-fresher",
    "portfolio-graduate", "project-showcase-grad", "github-student", "linkedin-graduate",
    "online-portfolio-fresher", "social-graduate", "digital-graduate", "web-portfolio-grad",
    "hackathon-graduate", "bootcamp-portfolio", "internship-showcase", "campus-influencer",
    "student-developer-portfolio", "digital-portfolio-grad", "online-presence-fresher",
    "networked-graduate", "profile-driven-grad"
  ];

  fresherTemplateIds.forEach(id => {
    templates[id] = graduateDefaults;
  });

  // Default fallback is professional
  return templates[templateId] || templates.professional;
};
