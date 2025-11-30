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

const buildSkills = (
  templateId: string,
  names: string[],
  levels?: number[],
): ResumeData["skills"] =>
  names.map((name, index) => ({
    id: `${templateId}-skill-${index}`,
    name,
    level: levels?.[index] ?? Math.max(1, Math.min(10, 10 - index)),
    category: index < 6 ? "core" : "toolbox",
  }));

export const getTemplateDefaults = (templateId: string): ResumeData => {
  const professionalDefaults: ResumeData = {
    personalInfo: {
      fullName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      title: "Senior Financial Analyst",
      summary:
        "Results-driven financial analyst with 8+ years of experience in corporate finance, financial modeling, and strategic planning. Proven track record of delivering actionable insights that drive business growth and operational efficiency.",
      photo: "",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      portfolio: "https://sarahjohnson-portfolio.com",
      github: "https://github.com/sarahjohnson",
    },
    includeSocialLinks: true,
    experience: [
      {
        id: "1",
        company: "Goldman Sachs",
        position: "Senior Financial Analyst",
        startDate: "2020-03",
        endDate: "",
        current: true,
        description: "",
        bulletPoints: [
          "Led financial planning and analysis for $500M portfolio, delivering actionable insights that drove 15% revenue growth",
          "Developed complex financial models to support strategic decision-making, improving forecast accuracy by 25%",
          "Presented quarterly business reviews to C-suite executives, influencing $100M+ investment decisions",
          "Managed and mentored team of 3 junior analysts, improving team productivity by 40%"
        ],
      },
      {
        id: "2",
        company: "JPMorgan Chase",
        position: "Financial Analyst",
        startDate: "2016-06",
        endDate: "2020-02",
        current: false,
        description: "",
        bulletPoints: [
          "Conducted comprehensive financial analysis and forecasting for 5 business units, supporting $2B in annual revenue",
          "Streamlined reporting processes, reducing monthly close time by 30% and saving 40 hours per month",
          "Collaborated with cross-functional teams on budgeting initiatives, identifying $5M in cost savings"
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
    skills: buildSkills(
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
      [9, 9, 8, 8, 8, 8, 7, 7],
    ),
    sections: [
      {
        id: "1",
        title: "Certifications",
        content:
          "Chartered Financial Analyst (CFA) - Level III Candidate\nFinancial Risk Manager (FRM) Certified",
      },
    ],
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
  };

  // Default fallback is professional
  return templates[templateId] || templates.professional;
};
