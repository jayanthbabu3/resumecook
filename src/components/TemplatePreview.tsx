import React, { memo } from 'react';
import type { ResumeData } from "@/pages/Editor";
import { ProfessionalTemplate } from "./resume/templates/ProfessionalTemplate";
import { ModernTemplate } from "./resume/templates/ModernTemplate";
import { MinimalTemplate } from "./resume/templates/MinimalTemplate";
import { ExecutiveTemplate } from "./resume/templates/ExecutiveTemplate";
import { FrontendTemplate } from "./resume/templates/FrontendTemplate";
import { FullstackTemplate } from "./resume/templates/FullstackTemplate";
import { BackendTemplate } from "./resume/templates/BackendTemplate";
import { GraduateTemplate } from "./resume/templates/GraduateTemplate";
import { StarterTemplate } from "./resume/templates/StarterTemplate";
import { FresherTemplate } from "./resume/templates/FresherTemplate";
import { PremiumFresherTemplate } from "./resume/templates/PremiumFresherTemplate";
import { SeniorTemplate } from "./resume/templates/SeniorTemplate";
import { SeniorFrontendTemplate } from "./resume/templates/SeniorFrontendTemplate";
import { SeniorBackendTemplate } from "./resume/templates/SeniorBackendTemplate";
import { SoftwareTemplate } from "./resume/templates/SoftwareTemplate";
import { PremiumUniversalTemplate } from "./resume/templates/PremiumUniversalTemplate";
import { PremiumProTemplate } from "./resume/templates/PremiumProTemplate";
import { FresherEliteTemplate } from "./resume/templates/FresherEliteTemplate";
import { AnalystTemplate } from "./resume/templates/AnalystTemplate";
import { EliteTemplate } from "./resume/templates/EliteTemplate";
import { RefinedTemplate } from "./resume/templates/RefinedTemplate";
import { SapphireExecutiveTemplate } from "./resume/templates/SapphireExecutiveTemplate";
import { CreativeAccentTemplate } from "./resume/templates/CreativeAccentTemplate";
import { ModernSidebarTemplate } from "./resume/templates/ModernSidebarTemplate";
import { MinimalistGeometricTemplate } from "./resume/templates/MinimalistGeometricTemplate";
import { BoldHeadlineTemplate } from "./resume/templates/BoldHeadlineTemplate";
import { DualToneTemplate } from "./resume/templates/DualToneTemplate";
import { ElegantSerifTemplate } from "./resume/templates/ElegantSerifTemplate";
import { TechGridTemplate } from "./resume/templates/TechGridTemplate";
import { ContemporarySplitTemplate } from "./resume/templates/ContemporarySplitTemplate";
import { LuxuryTimelineTemplate } from "./resume/templates/LuxuryTimelineTemplate";
import { FresherMinimalGridTemplate } from "./resume/templates/FresherMinimalGridTemplate";
import { FresherDarkProfessionalTemplate } from "./resume/templates/FresherDarkProfessionalTemplate";
import { FresherColorAccentTemplate } from "./resume/templates/FresherColorAccentTemplate";
import { FresherTimelineTemplate } from "./resume/templates/FresherTimelineTemplate";
import { FresherSkillsFirstTemplate } from "./resume/templates/FresherSkillsFirstTemplate";
import { FresherCardBasedTemplate } from "./resume/templates/FresherCardBasedTemplate";
import { FresherTwoToneTemplate } from "./resume/templates/FresherTwoToneTemplate";
import { FresherCenteredElegantTemplate } from "./resume/templates/FresherCenteredElegantTemplate";
import { FresherGeometricTemplate } from "./resume/templates/FresherGeometricTemplate";
import { FresherAchievementTemplate } from "./resume/templates/FresherAchievementTemplate";

interface TemplatePreviewProps {
  templateId: string;
  themeColor?: string;
  sampleData?: ResumeData;
  className?: string;
}

// Template-specific sample data
const getTemplateSpecificData = (templateId: string): ResumeData => {
  // Executive/Senior Leadership templates
  if (templateId === 'executive') {
    return {
      personalInfo: {
        fullName: "Michael Thompson",
        title: "Chief Technology Officer",
        email: "michael.thompson@email.com",
        phone: "+1 (555) 345-6789",
        location: "Chicago, IL",
        summary: "Visionary technology executive with 15+ years leading digital transformation initiatives. Proven track record of building high-performing engineering teams and delivering innovative solutions that drive business growth and competitive advantage.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Global Tech Corp",
          position: "Chief Technology Officer",
          startDate: "2019-01",
          endDate: "present",
          current: true,
          description: "Lead technology strategy and innovation for organization with 2,000+ employees\nBuilt engineering team from 50 to 200+ across multiple locations\nSpearheaded cloud migration initiative saving $5M annually\nDrive product roadmap and architecture decisions for flagship products",
        },
        {
          id: "exp-2",
          company: "Enterprise Solutions Inc",
          position: "VP of Engineering",
          startDate: "2015-03",
          endDate: "2018-12",
          current: false,
          description: "Managed 80+ person engineering organization across 6 product teams\nEstablished technical standards and best practices company-wide\nLed successful IPO preparation and technical due diligence\nReduced infrastructure costs by 40% through strategic optimization",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Stanford University",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2001-09",
          endDate: "2003-06",
        },
      ],
      skills: [
        { id: "skill-1", name: "Strategic Planning" },
        { id: "skill-2", name: "Team Leadership" },
        { id: "skill-3", name: "Cloud Architecture" },
        { id: "skill-4", name: "Digital Transformation" },
        { id: "skill-5", name: "Product Strategy" },
        { id: "skill-6", name: "Stakeholder Management" },
        { id: "skill-7", name: "Budget Management" },
        { id: "skill-8", name: "Innovation" },
      ],
      sections: [],
    };
  }

  // Frontend Developer templates
  if (templateId === 'frontend' || templateId === 'senior-frontend') {
    const isSenior = templateId === 'senior-frontend';
    return {
      personalInfo: {
        fullName: isSenior ? "Sarah Chen" : "Alex Rivera",
        title: isSenior ? "Senior Frontend Engineer" : "Frontend Developer",
        email: isSenior ? "sarah.chen@email.com" : "alex.rivera@email.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, CA",
        summary: isSenior 
          ? "Senior frontend engineer with 8+ years crafting performant, accessible web applications. Expert in React, TypeScript, and modern frontend architecture. Passionate about user experience and component design systems."
          : "Creative frontend developer with 3+ years building responsive, user-friendly web applications. Proficient in React, TypeScript, and modern CSS frameworks.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isSenior ? "TechCorp Solutions" : "Digital Agency",
          position: isSenior ? "Senior Frontend Engineer" : "Frontend Developer",
          startDate: isSenior ? "2020-03" : "2022-01",
          endDate: "present",
          current: true,
          description: isSenior
            ? "Lead frontend architecture for enterprise SaaS platform serving 100K+ users\nDesigned and implemented component library used across 15+ product teams\nReduced bundle size by 45% and improved Lighthouse scores to 95+\nMentor team of 6 frontend engineers and establish best practices"
            : "Develop responsive web applications using React and TypeScript\nCollaborate with designers to implement pixel-perfect UI components\nImprove page load times by 30% through code optimization\nWrite comprehensive unit and integration tests",
        },
        {
          id: "exp-2",
          company: isSenior ? "StartupXYZ" : "Web Studio",
          position: isSenior ? "Frontend Engineer" : "Junior Frontend Developer",
          startDate: isSenior ? "2017-06" : "2021-03",
          endDate: isSenior ? "2020-02" : "2021-12",
          current: false,
          description: isSenior
            ? "Built real-time collaborative features using WebSockets\nImplemented state management architecture with Redux\nEstablished CI/CD pipelines for automated testing and deployment\nImproved accessibility compliance to WCAG 2.1 AA standards"
            : "Assisted in developing client websites and web applications\nConverted design mockups into responsive HTML/CSS/JavaScript\nFixed bugs and improved cross-browser compatibility\nParticipated in code reviews and agile ceremonies",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2013-09",
          endDate: "2017-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "React" },
        { id: "skill-2", name: "TypeScript" },
        { id: "skill-3", name: "JavaScript" },
        { id: "skill-4", name: "HTML/CSS" },
        { id: "skill-5", name: "Tailwind CSS" },
        { id: "skill-6", name: "Next.js" },
        { id: "skill-7", name: "Redux" },
        { id: "skill-8", name: "Webpack" },
      ],
      sections: [],
    };
  }

  // Backend Developer templates
  if (templateId === 'backend' || templateId === 'senior-backend') {
    const isSenior = templateId === 'senior-backend';
    return {
      personalInfo: {
        fullName: isSenior ? "David Kumar" : "Jordan Lee",
        title: isSenior ? "Senior Backend Engineer" : "Backend Developer",
        email: isSenior ? "david.kumar@email.com" : "jordan.lee@email.com",
        phone: "+1 (555) 345-6789",
        location: "Seattle, WA",
        summary: isSenior
          ? "Senior backend engineer with 9+ years designing scalable distributed systems. Expert in microservices architecture, database optimization, and cloud infrastructure. Strong focus on system reliability and performance."
          : "Backend developer with 3+ years building robust APIs and server-side applications. Experienced in Node.js, Python, and database design.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isSenior ? "Cloud Platform Inc" : "Tech Solutions",
          position: isSenior ? "Senior Backend Engineer" : "Backend Developer",
          startDate: isSenior ? "2019-01" : "2022-06",
          endDate: "present",
          current: true,
          description: isSenior
            ? "Architect and implement microservices handling 10M+ daily requests\nOptimize database queries reducing response time by 60%\nDesign event-driven architecture using Kafka and Redis\nLead backend team of 5 engineers and establish coding standards"
            : "Develop RESTful APIs using Node.js and Express\nDesign and optimize PostgreSQL database schemas\nImplement authentication and authorization systems\nWrite unit tests achieving 85% code coverage",
        },
        {
          id: "exp-2",
          company: isSenior ? "Enterprise Systems" : "StartupCo",
          position: isSenior ? "Backend Engineer" : "Junior Backend Developer",
          startDate: isSenior ? "2015-03" : "2021-01",
          endDate: isSenior ? "2018-12" : "2022-05",
          current: false,
          description: isSenior
            ? "Built scalable API infrastructure serving 1M+ users\nImplemented caching strategies improving performance by 40%\nMigrated monolithic application to microservices architecture\nEstablished monitoring and alerting systems"
            : "Assisted in API development and maintenance\nWrote database migration scripts\nFixed bugs and improved error handling\nDocumented API endpoints and system architecture",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Carnegie Mellon University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2011-09",
          endDate: "2015-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "Node.js" },
        { id: "skill-2", name: "Python" },
        { id: "skill-3", name: "PostgreSQL" },
        { id: "skill-4", name: "MongoDB" },
        { id: "skill-5", name: "Redis" },
        { id: "skill-6", name: "Docker" },
        { id: "skill-7", name: "Kubernetes" },
        { id: "skill-8", name: "AWS" },
      ],
      sections: [],
    };
  }

  // Fullstack Developer template
  if (templateId === 'fullstack') {
    return {
      personalInfo: {
        fullName: "Jamie Taylor",
        title: "Full Stack Developer",
        email: "jamie.taylor@email.com",
        phone: "+1 (555) 456-7890",
        location: "Austin, TX",
        summary: "Versatile full stack developer with 5+ years building end-to-end web applications. Proficient in React, Node.js, and cloud technologies. Strong problem-solver with experience across the entire software development lifecycle.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Tech Innovations",
          position: "Full Stack Developer",
          startDate: "2021-01",
          endDate: "present",
          current: true,
          description: "Develop full stack web applications using React and Node.js\nDesign and implement RESTful APIs and database schemas\nDeploy applications to AWS using CI/CD pipelines\nCollaborate with product team to define feature requirements",
        },
        {
          id: "exp-2",
          company: "Digital Solutions",
          position: "Full Stack Developer",
          startDate: "2019-06",
          endDate: "2020-12",
          current: false,
          description: "Built responsive web applications from concept to deployment\nIntegrated third-party APIs and payment systems\nOptimized application performance and database queries\nProvided technical support and bug fixes",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "University of Texas at Austin",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "React" },
        { id: "skill-2", name: "Node.js" },
        { id: "skill-3", name: "TypeScript" },
        { id: "skill-4", name: "PostgreSQL" },
        { id: "skill-5", name: "MongoDB" },
        { id: "skill-6", name: "AWS" },
        { id: "skill-7", name: "Docker" },
        { id: "skill-8", name: "Git" },
      ],
      sections: [],
    };
  }

  // Fresher templates (entry-level, recent graduates)
  if (templateId === 'fresher' || templateId === 'premium-fresher' || templateId === 'fresher-elite' || templateId === 'graduate' || templateId === 'starter') {
    return {
      personalInfo: {
        fullName: "Priya Sharma",
        title: "Computer Science Graduate",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        location: "Bangalore, India",
        summary: "Recent Computer Science graduate with strong foundation in programming and software development. Passionate about learning new technologies and solving complex problems. Completed multiple projects during coursework and internships.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Tech Solutions Pvt Ltd",
          position: "Software Development Intern",
          startDate: "2024-01",
          endDate: "2024-06",
          current: false,
          description: "Developed web application features using React and Node.js\nWrote unit tests and participated in code reviews\nCollaborated with team using Agile methodology\nFixed bugs and improved application performance",
        },
        {
          id: "exp-2",
          company: "StartupHub",
          position: "Summer Intern",
          startDate: "2023-05",
          endDate: "2023-07",
          current: false,
          description: "Assisted in developing mobile application features\nLearned software development best practices\nParticipated in daily standup meetings\nDocumented code and created user guides",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Indian Institute of Technology",
          degree: "Bachelor of Technology",
          field: "Computer Science and Engineering",
          startDate: "2020-08",
          endDate: "2024-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "C++" },
        { id: "skill-2", name: "Java" },
        { id: "skill-3", name: "Python" },
        { id: "skill-4", name: "JavaScript" },
        { id: "skill-5", name: "React" },
        { id: "skill-6", name: "SQL" },
        { id: "skill-7", name: "Git" },
        { id: "skill-8", name: "Data Structures" },
      ],
      sections: [
        {
          id: "projects",
          title: "Academic Projects",
          content: "E-commerce Website - Built full stack application with React and Node.js\nMachine Learning Model - Developed image classifier using Python and TensorFlow\nMobile App - Created Android app for expense tracking",
        },
      ],
    };
  }

  // Senior/Elite templates
  if (templateId === 'senior' || templateId === 'elite') {
    return {
      personalInfo: {
        fullName: "Robert Martinez",
        title: "Senior Software Architect",
        email: "robert.martinez@email.com",
        phone: "+1 (555) 567-8901",
        location: "New York, NY",
        summary: "Accomplished software architect with 12+ years designing and building enterprise-scale applications. Expert in system design, cloud architecture, and team leadership. Track record of delivering innovative solutions that drive business value.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Enterprise Tech Corp",
          position: "Senior Software Architect",
          startDate: "2018-01",
          endDate: "present",
          current: true,
          description: "Design architecture for enterprise applications serving 500K+ users\nLead technical decision-making and establish engineering standards\nMentor engineers and conduct technical training sessions\nDrive cloud migration strategy reducing costs by $2M annually",
        },
        {
          id: "exp-2",
          company: "Innovation Labs",
          position: "Lead Software Engineer",
          startDate: "2013-06",
          endDate: "2017-12",
          current: false,
          description: "Led development of core platform features\nEstablished microservices architecture and DevOps practices\nManaged team of 8 engineers across multiple projects\nImproved system reliability to 99.9% uptime",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Massachusetts Institute of Technology",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2009-09",
          endDate: "2011-06",
        },
      ],
      skills: [
        { id: "skill-1", name: "System Design" },
        { id: "skill-2", name: "Cloud Architecture" },
        { id: "skill-3", name: "Microservices" },
        { id: "skill-4", name: "Java" },
        { id: "skill-5", name: "Python" },
        { id: "skill-6", name: "Kubernetes" },
        { id: "skill-7", name: "AWS" },
        { id: "skill-8", name: "Team Leadership" },
      ],
      sections: [],
    };
  }

  // Analyst template
  if (templateId === 'analyst') {
    return {
      personalInfo: {
        fullName: "Emily Johnson",
        title: "Data Analyst",
        email: "emily.johnson@email.com",
        phone: "+1 (555) 678-9012",
        location: "Boston, MA",
        summary: "Data analyst with 4+ years transforming complex data into actionable insights. Proficient in SQL, Python, and data visualization tools. Strong analytical skills with focus on business intelligence and reporting.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Analytics Corp",
          position: "Data Analyst",
          startDate: "2021-03",
          endDate: "present",
          current: true,
          description: "Analyze business data to identify trends and opportunities\nCreate dashboards and reports using Tableau and Power BI\nCollaborate with stakeholders to define KPIs and metrics\nAutomate data pipelines reducing manual work by 50%",
        },
        {
          id: "exp-2",
          company: "Business Insights LLC",
          position: "Junior Data Analyst",
          startDate: "2020-01",
          endDate: "2021-02",
          current: false,
          description: "Performed data cleaning and preprocessing\nGenerated weekly and monthly reports for management\nConducted statistical analysis to support business decisions\nAssisted in building predictive models",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Boston University",
          degree: "Bachelor of Science",
          field: "Statistics",
          startDate: "2016-09",
          endDate: "2020-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "SQL" },
        { id: "skill-2", name: "Python" },
        { id: "skill-3", name: "Tableau" },
        { id: "skill-4", name: "Power BI" },
        { id: "skill-5", name: "Excel" },
        { id: "skill-6", name: "Statistics" },
        { id: "skill-7", name: "Data Visualization" },
        { id: "skill-8", name: "R" },
      ],
      sections: [],
    };
  }

  // Default sample data for remaining templates (software, premium-universal, premium-pro, modern, minimal, professional)
  return {
    personalInfo: {
      fullName: "John Smith",
      title: "Software Engineer",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      summary: "Experienced software engineer with 5+ years of expertise in full-stack development and cloud technologies. Passionate about building scalable applications and solving complex problems.",
      photo: null,
    },
    experience: [
      {
        id: "exp-1",
        company: "Tech Corp",
        position: "Senior Software Engineer",
        startDate: "2022-01",
        endDate: "present",
        current: true,
        description: "Lead development of scalable web applications using React and Node.js\nImproved system performance by 40% through optimization\nMentored junior developers and conducted code reviews\nCollaborated with cross-functional teams on product features",
      },
      {
        id: "exp-2",
        company: "StartupXYZ",
        position: "Software Engineer",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: "Developed and maintained web applications using modern technologies\nImplemented CI/CD pipelines and automated testing\nWorked in Agile environment with two-week sprints\nContributed to architectural decisions and technical planning",
      },
    ],
    education: [
      {
        id: "edu-1",
        school: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2016-09",
        endDate: "2020-05",
      },
    ],
    skills: [
      { id: "skill-1", name: "JavaScript" },
      { id: "skill-2", name: "TypeScript" },
      { id: "skill-3", name: "React" },
      { id: "skill-4", name: "Node.js" },
      { id: "skill-5", name: "Python" },
      { id: "skill-6", name: "AWS" },
      { id: "skill-7", name: "Docker" },
      { id: "skill-8", name: "Git" },
    ],
    sections: [],
  };
};

const templates = {
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  frontend: FrontendTemplate,
  fullstack: FullstackTemplate,
  backend: BackendTemplate,
  graduate: GraduateTemplate,
  starter: StarterTemplate,
  fresher: FresherTemplate,
  "premium-fresher": PremiumFresherTemplate,
  senior: SeniorTemplate,
  "senior-frontend": SeniorFrontendTemplate,
  "senior-backend": SeniorBackendTemplate,
  software: SoftwareTemplate,
  "premium-universal": PremiumUniversalTemplate,
  "premium-pro": PremiumProTemplate,
  "fresher-elite": FresherEliteTemplate,
  analyst: AnalystTemplate,
  elite: EliteTemplate,
  refined: RefinedTemplate,
  "sapphire-executive": SapphireExecutiveTemplate,
  "creative-accent": CreativeAccentTemplate,
  "modern-sidebar": ModernSidebarTemplate,
  "minimalist-geometric": MinimalistGeometricTemplate,
  "bold-headline": BoldHeadlineTemplate,
  "dual-tone": DualToneTemplate,
  "elegant-serif": ElegantSerifTemplate,
  "tech-grid": TechGridTemplate,
  "contemporary-split": ContemporarySplitTemplate,
  "luxury-timeline": LuxuryTimelineTemplate,
  "fresher-minimal-grid": FresherMinimalGridTemplate,
  "fresher-dark-professional": FresherDarkProfessionalTemplate,
  "fresher-color-accent": FresherColorAccentTemplate,
  "fresher-timeline": FresherTimelineTemplate,
  "fresher-skills-first": FresherSkillsFirstTemplate,
  "fresher-card-based": FresherCardBasedTemplate,
  "fresher-two-tone": FresherTwoToneTemplate,
  "fresher-centered-elegant": FresherCenteredElegantTemplate,
  "fresher-geometric": FresherGeometricTemplate,
  "fresher-achievement": FresherAchievementTemplate,
};

export const TemplatePreview = memo<TemplatePreviewProps>(({
  templateId,
  themeColor = "#7c3aed",
  sampleData,
  className = "",
}) => {
  const Template = templates[templateId as keyof typeof templates] || ProfessionalTemplate;
  const resumeData = sampleData || getTemplateSpecificData(templateId);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="w-full origin-top-left"
          style={{ 
            transform: 'scale(0.35)',
            width: '285.7%',
            minHeight: '285.7%'
          }}
        >
          <Template resumeData={resumeData} themeColor={themeColor} />
        </div>
      </div>
    </div>
  );
});

TemplatePreview.displayName = "TemplatePreview";
