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

interface TemplatePreviewProps {
  templateId: string;
  themeColor?: string;
  sampleData?: ResumeData;
  className?: string;
}

// Template-specific sample data
const getTemplateSpecificData = (templateId: string): ResumeData => {
  // Executive template should show executive-level positions
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

  // Default sample data for other templates
  return {
    personalInfo: {
      fullName: "John Smith",
      title: "Software Engineer",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      summary: "Experienced software engineer with 5+ years of expertise in full-stack development and cloud technologies.",
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
        description: "Led development of scalable web applications using React and Node.js.\nImproved system performance by 40%.\nMentored junior developers and conducted code reviews.",
      },
      {
        id: "exp-2",
        company: "StartupXYZ",
        position: "Full Stack Developer",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: "Developed and maintained web applications using modern technologies.\nCollaborated with cross-functional teams.\nImplemented CI/CD pipelines and automated testing.",
      },
    ],
    education: [
      {
        id: "edu-1",
        school: "University of Technology",
        degree: "Bachelor of Computer Science",
        field: "Software Engineering",
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
    sections: [
      {
        id: "strengths",
        title: "Strengths",
        content: "Problem-solving and analytical thinking\nStrong communication skills\nLeadership and team collaboration\nAdaptability and continuous learning",
      },
      {
        id: "achievements",
        title: "Achievements",
        content: "Led a team of 5 developers to deliver 3 major features\nReduced application load time by 40%\nImplemented automated testing reducing bugs by 60%",
      },
    ],
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
