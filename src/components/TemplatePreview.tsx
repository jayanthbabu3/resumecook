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
// Healthcare & Medical Templates
import { MedicalProfessionalTemplate } from "./resume/templates/MedicalProfessionalTemplate";
import { HealthcareTwoColumnTemplate } from "./resume/templates/HealthcareTwoColumnTemplate";
import { NurseSpecialistTemplate } from "./resume/templates/NurseSpecialistTemplate";
import { MedicalExecutiveTemplate } from "./resume/templates/MedicalExecutiveTemplate";
import { ClinicalMinimalTemplate } from "./resume/templates/ClinicalMinimalTemplate";
// Education & Teaching Templates
import { TeacherProfessionalTemplate } from "./resume/templates/TeacherProfessionalTemplate";
import { AcademicScholarTemplate } from "./resume/templates/AcademicScholarTemplate";
import { EducatorModernTemplate } from "./resume/templates/EducatorModernTemplate";
import { TeachingCertifiedTemplate } from "./resume/templates/TeachingCertifiedTemplate";
import { StudentEducatorTemplate } from "./resume/templates/StudentEducatorTemplate";
// Finance & Accounting Templates
import { CPAProfessionalTemplate } from "./resume/templates/CPAProfessionalTemplate";
import { FinanceAnalystTemplate } from "./resume/templates/FinanceAnalystTemplate";
import { AccountingExecutiveTemplate } from "./resume/templates/AccountingExecutiveTemplate";
import { AuditorTemplate } from "./resume/templates/AuditorTemplate";
import { FinanceTwoColumnTemplate } from "./resume/templates/FinanceTwoColumnTemplate";
// Sales & Marketing Templates
import { SalesExecutiveTemplate } from "./resume/templates/SalesExecutiveTemplate";
import { MarketingProfessionalTemplate } from "./resume/templates/MarketingProfessionalTemplate";
import { SalesMarketingHybridTemplate } from "./resume/templates/SalesMarketingHybridTemplate";
import { DigitalMarketerTemplate } from "./resume/templates/DigitalMarketerTemplate";
import { SalesManagerTemplate } from "./resume/templates/SalesManagerTemplate";
// Legal & Consulting Templates
import { AttorneyProfessionalTemplate } from "./resume/templates/AttorneyProfessionalTemplate";
import { LegalCounselTemplate } from "./resume/templates/LegalCounselTemplate";
import { ConsultantTemplate } from "./resume/templates/ConsultantTemplate";
import { LegalExecutiveTemplate } from "./resume/templates/LegalExecutiveTemplate";
import { ParalegalTemplate } from "./resume/templates/ParalegalTemplate";
// Operations & Project Management Templates
import { ProjectManagerPMPTemplate } from "./resume/templates/ProjectManagerPMPTemplate";
import { OperationsManagerTemplate } from "./resume/templates/OperationsManagerTemplate";
import { PMExecutiveTemplate } from "./resume/templates/PMExecutiveTemplate";
import { AgileScrumTemplate } from "./resume/templates/AgileScrumTemplate";
import { OperationsTwoColumnTemplate } from "./resume/templates/OperationsTwoColumnTemplate";

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

  // Healthcare & Medical templates
  if (['medical-professional', 'healthcare-two-column', 'nurse-specialist', 'medical-executive', 'clinical-minimal'].includes(templateId)) {
    const isExecutive = templateId === 'medical-executive';
    const isNurse = templateId === 'nurse-specialist';

    return {
      personalInfo: {
        fullName: isNurse ? "Jennifer Rodriguez" : "Dr. Sarah Williams",
        title: isExecutive ? "Chief Medical Officer" : isNurse ? "Registered Nurse - ICU Specialist" : "Physician - Internal Medicine",
        email: isNurse ? "j.rodriguez@email.com" : "dr.williams@email.com",
        phone: "+1 (555) 234-5678",
        location: isExecutive ? "Houston, TX" : "New York, NY",
        summary: isExecutive
          ? "Visionary healthcare executive with 18+ years of clinical and administrative leadership. Board-certified physician with expertise in patient care excellence, operational efficiency, and strategic planning. Proven track record in transforming healthcare delivery systems."
          : isNurse
          ? "Dedicated Registered Nurse with 6+ years of critical care experience. Specialized in intensive care unit operations, patient advocacy, and emergency response. Committed to providing compassionate, evidence-based nursing care."
          : "Board-certified internist with 10+ years providing comprehensive primary care. Expertise in chronic disease management, preventive medicine, and patient-centered care. Passionate about improving patient outcomes through evidence-based practice.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isExecutive ? "Metropolitan Healthcare System" : isNurse ? "St. Mary's Medical Center" : "City General Hospital",
          position: isExecutive ? "Chief Medical Officer" : isNurse ? "ICU Registered Nurse" : "Attending Physician",
          startDate: isExecutive ? "2018-01" : isNurse ? "2021-03" : "2019-06",
          endDate: "present",
          current: true,
          description: isExecutive
            ? "Lead medical staff of 400+ physicians across 8 hospital locations\nDeveloped quality improvement initiatives reducing readmissions by 25%\nOversee clinical operations with $150M annual budget\nChampion patient safety programs achieving top tier quality metrics"
            : isNurse
            ? "Provide critical care nursing for ICU patients with complex conditions\nMonitor patient vital signs and administer medications safely\nCollaborate with multidisciplinary team on patient care plans\nMentor new graduate nurses and nursing students"
            : "Manage panel of 2,000+ patients in internal medicine practice\nDiagnose and treat acute and chronic medical conditions\nCoordinate care with specialists and healthcare team\nImplement preventive care strategies improving patient health outcomes",
        },
        {
          id: "exp-2",
          company: isExecutive ? "Regional Medical Center" : isNurse ? "Community Hospital" : "University Medical Center",
          position: isExecutive ? "Medical Director" : isNurse ? "Medical-Surgical Nurse" : "Resident Physician",
          startDate: isExecutive ? "2012-03" : isNurse ? "2019-01" : "2016-07",
          endDate: isExecutive ? "2017-12" : isNurse ? "2021-02" : "2019-05",
          current: false,
          description: isExecutive
            ? "Directed clinical operations for 150-bed hospital\nLed physician recruitment and credentialing processes\nImplemented electronic health records system\nEstablished clinical protocols improving care quality"
            : isNurse
            ? "Provided nursing care for post-operative and medical patients\nAdministered medications and treatments per physician orders\nDocumented patient assessments in electronic health records\nParticipated in unit quality improvement initiatives"
            : "Completed 3-year internal medicine residency program\nManaged inpatient and outpatient care under supervision\nParticipated in teaching rounds and case presentations\nDeveloped clinical skills in diagnosis and treatment",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isNurse ? "State University" : "Johns Hopkins University",
          degree: isNurse ? "Bachelor of Science in Nursing" : isExecutive ? "Doctor of Medicine" : "Doctor of Medicine",
          field: isNurse ? "Nursing" : "Medicine",
          startDate: isNurse ? "2015-09" : "2008-09",
          endDate: isNurse ? "2019-05" : "2012-05",
        },
      ],
      skills: isNurse
        ? [
            { id: "skill-1", name: "Critical Care Nursing" },
            { id: "skill-2", name: "Patient Assessment" },
            { id: "skill-3", name: "IV Therapy" },
            { id: "skill-4", name: "Ventilator Management" },
            { id: "skill-5", name: "Emergency Response" },
            { id: "skill-6", name: "Electronic Health Records" },
            { id: "skill-7", name: "ACLS Certified" },
            { id: "skill-8", name: "Patient Advocacy" },
          ]
        : [
            { id: "skill-1", name: "Internal Medicine" },
            { id: "skill-2", name: "Patient Care" },
            { id: "skill-3", name: "Diagnosis & Treatment" },
            { id: "skill-4", name: "Electronic Health Records" },
            { id: "skill-5", name: "Chronic Disease Management" },
            { id: "skill-6", name: "Preventive Medicine" },
            { id: "skill-7", name: "Healthcare Leadership" },
            { id: "skill-8", name: "Quality Improvement" },
          ],
      sections: [],
    };
  }

  // Finance & Accounting templates
  if (['cpa-professional', 'finance-analyst', 'accounting-executive', 'auditor', 'finance-two-column'].includes(templateId)) {
    const isCPA = templateId === 'cpa-professional';
    const isAuditor = templateId === 'auditor';
    const isExecutive = templateId === 'accounting-executive';

    return {
      personalInfo: {
        fullName: isAuditor ? "Michael Anderson" : "Sarah Johnson",
        title: isExecutive ? "Chief Financial Officer" : isCPA ? "Certified Public Accountant" : isAuditor ? "Senior Internal Auditor" : "Senior Financial Analyst",
        email: isAuditor ? "m.anderson@email.com" : "sarah.johnson@email.com",
        phone: "+1 (555) 345-6789",
        location: isExecutive ? "Chicago, IL" : "New York, NY",
        summary: isExecutive
          ? "Strategic finance executive with 15+ years driving financial performance and business growth. CPA with expertise in financial planning, risk management, and corporate governance. Track record of optimizing operations and delivering shareholder value."
          : isCPA
          ? "Licensed CPA with 8+ years providing comprehensive accounting and tax services. Expertise in financial reporting, tax compliance, and audit preparation. Committed to delivering accurate, timely financial solutions."
          : isAuditor
          ? "Experienced internal auditor with 7+ years evaluating organizational controls and processes. Skilled in risk assessment, compliance testing, and audit reporting. Strong analytical abilities and attention to detail."
          : "Results-driven financial analyst with 6+ years providing strategic insights and financial modeling. Proficient in financial planning, budgeting, and forecasting. Strong analytical skills with focus on driving business decisions.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isExecutive ? "Fortune 500 Corporation" : isCPA ? "Anderson & Associates CPA" : isAuditor ? "Global Enterprises Inc" : "Investment Group LLC",
          position: isExecutive ? "Chief Financial Officer" : isCPA ? "Senior CPA" : isAuditor ? "Senior Internal Auditor" : "Senior Financial Analyst",
          startDate: isExecutive ? "2019-01" : "2021-03",
          endDate: "present",
          current: true,
          description: isExecutive
            ? "Oversee all financial operations for $2B revenue organization\nLead financial planning and analysis for strategic initiatives\nManage team of 50+ finance and accounting professionals\nPresent financial results to board of directors and investors"
            : isCPA
            ? "Prepare and review financial statements and tax returns\nConduct audit engagements for diverse client portfolio\nProvide tax planning and compliance services\nAdvise clients on financial reporting and internal controls"
            : isAuditor
            ? "Plan and execute internal audit engagements across organization\nAssess effectiveness of internal controls and risk management\nPrepare detailed audit reports with findings and recommendations\nMonitor remediation of audit issues and control deficiencies"
            : "Develop financial models and forecasts to support strategic planning\nAnalyze financial performance and identify trends and variances\nPrepare monthly financial reports and executive presentations\nCollaborate with business units on budgeting and planning",
        },
        {
          id: "exp-2",
          company: isExecutive ? "Technology Innovations Inc" : isCPA ? "Big Four Accounting Firm" : isAuditor ? "Regional Bank Corp" : "Manufacturing Company",
          position: isExecutive ? "VP of Finance" : isCPA ? "Staff Accountant" : isAuditor ? "Internal Auditor" : "Financial Analyst",
          startDate: isExecutive ? "2014-06" : isCPA ? "2018-01" : "2019-06",
          endDate: isExecutive ? "2018-12" : isCPA ? "2021-02" : "2021-02",
          current: false,
          description: isExecutive
            ? "Managed accounting, treasury, and financial planning functions\nLed successful IPO preparation and financial due diligence\nImplemented financial systems improving reporting efficiency\nReduced operating costs by 20% through process improvements"
            : isCPA
            ? "Performed audit procedures and prepared working papers\nAssisted in preparation of tax returns and financial statements\nConducted research on accounting and tax matters\nSupported senior staff on complex client engagements"
            : isAuditor
            ? "Conducted audit testing of financial and operational controls\nDocumented business processes and control procedures\nAssisted in fraud investigations and special projects\nPrepared audit work papers and documentation"
            : "Analyzed financial data and prepared variance reports\nAssisted in annual budgeting and quarterly forecasting\nCreated presentations for management review meetings\nSupported month-end close and financial reporting processes",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isExecutive ? "Wharton School of Business" : "University of Illinois",
          degree: isExecutive ? "Master of Business Administration" : "Bachelor of Science",
          field: isExecutive ? "Finance" : "Accounting",
          startDate: isExecutive ? "2011-09" : "2014-09",
          endDate: isExecutive ? "2013-06" : "2018-05",
        },
      ],
      skills: isCPA
        ? [
            { id: "skill-1", name: "GAAP" },
            { id: "skill-2", name: "Tax Preparation" },
            { id: "skill-3", name: "Financial Auditing" },
            { id: "skill-4", name: "QuickBooks" },
            { id: "skill-5", name: "Excel" },
            { id: "skill-6", name: "Financial Reporting" },
            { id: "skill-7", name: "CPA License" },
            { id: "skill-8", name: "Internal Controls" },
          ]
        : isAuditor
        ? [
            { id: "skill-1", name: "Internal Auditing" },
            { id: "skill-2", name: "Risk Assessment" },
            { id: "skill-3", name: "COSO Framework" },
            { id: "skill-4", name: "SOX Compliance" },
            { id: "skill-5", name: "Data Analytics" },
            { id: "skill-6", name: "Audit Planning" },
            { id: "skill-7", name: "Report Writing" },
            { id: "skill-8", name: "ACL/IDEA" },
          ]
        : [
            { id: "skill-1", name: "Financial Modeling" },
            { id: "skill-2", name: "Financial Analysis" },
            { id: "skill-3", name: "Excel" },
            { id: "skill-4", name: "Budgeting & Forecasting" },
            { id: "skill-5", name: "SQL" },
            { id: "skill-6", name: "PowerPoint" },
            { id: "skill-7", name: "SAP/Oracle" },
            { id: "skill-8", name: "Financial Reporting" },
          ],
      sections: [],
    };
  }

  // Education & Teaching templates
  if (['teacher-professional', 'academic-scholar', 'educator-modern', 'teaching-certified', 'student-educator'].includes(templateId)) {
    const isAcademic = templateId === 'academic-scholar';

    return {
      personalInfo: {
        fullName: "Lisa Martinez",
        title: isAcademic ? "Professor of English Literature" : "High School Mathematics Teacher",
        email: "lisa.martinez@email.com",
        phone: "+1 (555) 456-7890",
        location: isAcademic ? "Cambridge, MA" : "Portland, OR",
        summary: isAcademic
          ? "Distinguished scholar with 12+ years teaching and researching English literature. Published author with expertise in 19th century American literature. Passionate about fostering critical thinking and literary analysis skills in students."
          : "Dedicated mathematics educator with 8+ years inspiring students to excel in STEM. Experienced in curriculum development, differentiated instruction, and student-centered learning. Committed to creating engaging, inclusive classroom environments.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isAcademic ? "Harvard University" : "Lincoln High School",
          position: isAcademic ? "Associate Professor" : "Mathematics Teacher",
          startDate: isAcademic ? "2018-09" : "2019-08",
          endDate: "present",
          current: true,
          description: isAcademic
            ? "Teach undergraduate and graduate courses in American literature\nAdvise doctoral students on dissertation research\nPublished 15+ peer-reviewed articles in top academic journals\nServe on university curriculum and tenure committees"
            : "Teach Algebra, Geometry, and AP Calculus to 150+ students\nDevelop engaging lesson plans aligned with state standards\nImplement technology-enhanced learning strategies\nMentor students participating in math competitions and STEM clubs",
        },
        {
          id: "exp-2",
          company: isAcademic ? "Boston College" : "Jefferson Middle School",
          position: isAcademic ? "Assistant Professor" : "Math Teacher",
          startDate: isAcademic ? "2013-09" : "2017-08",
          endDate: isAcademic ? "2018-08" : "2019-06",
          current: false,
          description: isAcademic
            ? "Taught survey courses in British and American literature\nDeveloped new curriculum for digital humanities program\nPresented research at national and international conferences\nReceived teaching excellence award in 2016"
            : "Taught 7th and 8th grade mathematics courses\nDifferentiated instruction to meet diverse student needs\nCollaborated with colleagues on interdisciplinary projects\nSponsored after-school tutoring and math club",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isAcademic ? "Yale University" : "State University",
          degree: isAcademic ? "Ph.D." : "Master of Arts in Teaching",
          field: isAcademic ? "English Literature" : "Mathematics Education",
          startDate: isAcademic ? "2007-09" : "2015-09",
          endDate: isAcademic ? "2013-05" : "2017-05",
        },
      ],
      skills: isAcademic
        ? [
            { id: "skill-1", name: "Literary Analysis" },
            { id: "skill-2", name: "Research & Writing" },
            { id: "skill-3", name: "Curriculum Development" },
            { id: "skill-4", name: "Academic Publishing" },
            { id: "skill-5", name: "Student Advising" },
            { id: "skill-6", name: "Public Speaking" },
            { id: "skill-7", name: "Digital Humanities" },
            { id: "skill-8", name: "Grant Writing" },
          ]
        : [
            { id: "skill-1", name: "Mathematics Instruction" },
            { id: "skill-2", name: "Curriculum Development" },
            { id: "skill-3", name: "Classroom Management" },
            { id: "skill-4", name: "Differentiated Instruction" },
            { id: "skill-5", name: "Google Classroom" },
            { id: "skill-6", name: "Student Assessment" },
            { id: "skill-7", name: "Parent Communication" },
            { id: "skill-8", name: "STEM Integration" },
          ],
      sections: [],
    };
  }

  // Sales & Marketing templates
  if (['sales-executive', 'marketing-professional', 'sales-marketing-hybrid', 'digital-marketer', 'sales-manager'].includes(templateId)) {
    const isDigital = templateId === 'digital-marketer';
    const isSales = ['sales-executive', 'sales-manager'].includes(templateId);

    return {
      personalInfo: {
        fullName: isSales ? "James Patterson" : "Amanda Chen",
        title: isSales ? "Sales Director" : isDigital ? "Digital Marketing Manager" : "Marketing Manager",
        email: isSales ? "j.patterson@email.com" : "amanda.chen@email.com",
        phone: "+1 (555) 567-8901",
        location: isSales ? "Atlanta, GA" : "Los Angeles, CA",
        summary: isSales
          ? "Dynamic sales leader with 10+ years driving revenue growth and building high-performing teams. Proven track record exceeding quotas and expanding market share. Expert in consultative selling and strategic account management."
          : isDigital
          ? "Results-driven digital marketer with 6+ years creating data-driven campaigns. Expert in SEO, SEM, social media, and content marketing. Passionate about leveraging analytics to optimize marketing ROI."
          : "Strategic marketing professional with 7+ years developing integrated marketing campaigns. Experience in brand management, content strategy, and digital marketing. Strong analytical and creative problem-solving skills.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isSales ? "Enterprise Software Solutions" : isDigital ? "E-commerce Startup" : "Consumer Brands Inc",
          position: isSales ? "Sales Director" : isDigital ? "Digital Marketing Manager" : "Marketing Manager",
          startDate: "2020-03",
          endDate: "present",
          current: true,
          description: isSales
            ? "Lead sales team of 25 representatives achieving $50M annual revenue\nDevelop and execute strategic sales plans expanding into new markets\nManage key enterprise accounts and C-level relationships\nExceeded annual quota by average of 125% for 4 consecutive years"
            : isDigital
            ? "Manage digital marketing budget of $2M across multiple channels\nDevelop and execute SEO strategy increasing organic traffic by 150%\nRun paid advertising campaigns on Google, Facebook, and LinkedIn\nAnalyze campaign performance and optimize for ROI improvements"
            : "Develop and execute integrated marketing campaigns for product launches\nManage brand positioning and messaging across all channels\nOversee content creation for website, social media, and email marketing\nAnalyze market trends and competitive landscape to inform strategy",
        },
        {
          id: "exp-2",
          company: isSales ? "Tech Sales Corp" : isDigital ? "Digital Agency" : "Marketing Solutions LLC",
          position: isSales ? "Senior Sales Representative" : isDigital ? "SEO Specialist" : "Marketing Coordinator",
          startDate: isSales ? "2016-01" : "2019-06",
          endDate: isSales ? "2020-02" : "2020-02",
          current: false,
          description: isSales
            ? "Managed territory generating $8M in annual sales revenue\nProspected and closed new business with Fortune 500 companies\nConsistently ranked top 3 sales performer company-wide\nMentored new sales representatives on best practices"
            : isDigital
            ? "Conducted keyword research and on-page SEO optimization\nCreated SEO content strategy improving search rankings\nManaged Google Analytics and Search Console reporting\nCollaborated with content team on SEO-optimized blog posts"
            : "Assisted in planning and executing marketing campaigns\nCreated content for social media and email newsletters\nCoordinated events and trade show participation\nTracked marketing metrics and prepared performance reports",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isSales ? "University of Georgia" : "University of Southern California",
          degree: "Bachelor of Business Administration",
          field: isSales ? "Sales & Marketing" : "Marketing",
          startDate: "2012-09",
          endDate: "2016-05",
        },
      ],
      skills: isSales
        ? [
            { id: "skill-1", name: "B2B Sales" },
            { id: "skill-2", name: "Account Management" },
            { id: "skill-3", name: "Salesforce" },
            { id: "skill-4", name: "Negotiation" },
            { id: "skill-5", name: "Pipeline Management" },
            { id: "skill-6", name: "Sales Strategy" },
            { id: "skill-7", name: "Team Leadership" },
            { id: "skill-8", name: "Consultative Selling" },
          ]
        : isDigital
        ? [
            { id: "skill-1", name: "SEO/SEM" },
            { id: "skill-2", name: "Google Analytics" },
            { id: "skill-3", name: "Google Ads" },
            { id: "skill-4", name: "Facebook Ads" },
            { id: "skill-5", name: "Email Marketing" },
            { id: "skill-6", name: "Content Marketing" },
            { id: "skill-7", name: "Marketing Automation" },
            { id: "skill-8", name: "Data Analysis" },
          ]
        : [
            { id: "skill-1", name: "Marketing Strategy" },
            { id: "skill-2", name: "Brand Management" },
            { id: "skill-3", name: "Digital Marketing" },
            { id: "skill-4", name: "Content Creation" },
            { id: "skill-5", name: "Social Media Marketing" },
            { id: "skill-6", name: "Market Research" },
            { id: "skill-7", name: "Campaign Management" },
            { id: "skill-8", name: "Adobe Creative Suite" },
          ],
      sections: [],
    };
  }

  // Legal & Consulting templates
  if (['attorney-professional', 'legal-counsel', 'consultant', 'legal-executive', 'paralegal'].includes(templateId)) {
    const isParalegal = templateId === 'paralegal';
    const isConsultant = templateId === 'consultant';

    return {
      personalInfo: {
        fullName: isParalegal ? "Maria Garcia" : isConsultant ? "David Thompson" : "Robert Mitchell",
        title: isParalegal ? "Senior Paralegal" : isConsultant ? "Management Consultant" : "Corporate Attorney",
        email: isParalegal ? "m.garcia@email.com" : isConsultant ? "d.thompson@email.com" : "r.mitchell@email.com",
        phone: "+1 (555) 678-9012",
        location: isConsultant ? "San Francisco, CA" : "Washington, DC",
        summary: isParalegal
          ? "Experienced paralegal with 7+ years supporting complex litigation and corporate matters. Skilled in legal research, document preparation, and case management. Detail-oriented professional committed to excellence in legal support."
          : isConsultant
          ? "Strategic management consultant with 9+ years advising Fortune 500 clients. Expertise in business transformation, operational excellence, and change management. Proven track record delivering measurable results and client value."
          : "Accomplished corporate attorney with 12+ years advising on mergers, acquisitions, and securities matters. Juris Doctor from top-tier law school. Trusted advisor to C-suite executives on complex business transactions.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isParalegal ? "Smith & Associates Law Firm" : isConsultant ? "McKinsey & Company" : "Wilson & Partners LLP",
          position: isParalegal ? "Senior Paralegal" : isConsultant ? "Senior Consultant" : "Partner",
          startDate: isParalegal ? "2020-03" : isConsultant ? "2019-06" : "2021-01",
          endDate: "present",
          current: true,
          description: isParalegal
            ? "Manage case files and coordinate discovery for complex litigation\nConduct legal research and draft memoranda and pleadings\nOrganize and maintain document databases using e-discovery platforms\nLiaison with clients, courts, and opposing counsel"
            : isConsultant
            ? "Lead consulting engagements for Fortune 500 clients across industries\nDevelop business strategies and operational improvement recommendations\nManage project teams and client relationships\nDeliver executive presentations and implementation support"
            : "Advise clients on mergers, acquisitions, and corporate governance\nNegotiate and draft complex transaction documents\nManage multimillion-dollar deals from due diligence to closing\nLead team of 5 associates on high-profile matters",
        },
        {
          id: "exp-2",
          company: isParalegal ? "Corporate Legal Department" : isConsultant ? "Bain & Company" : "Morrison & Foerster LLP",
          position: isParalegal ? "Paralegal" : isConsultant ? "Consultant" : "Senior Associate",
          startDate: isParalegal ? "2018-01" : isConsultant ? "2016-09" : "2015-09",
          endDate: isParalegal ? "2020-02" : isConsultant ? "2019-05" : "2020-12",
          current: false,
          description: isParalegal
            ? "Supported corporate legal team on contracts and compliance\nDrafted and reviewed commercial agreements and amendments\nMaintained corporate records and regulatory filings\nAssisted with intellectual property matters and trademark searches"
            : isConsultant
            ? "Analyzed business operations and identified improvement opportunities\nConducted market research and competitive analysis\nDeveloped financial models and business cases\nPresented findings and recommendations to client executives"
            : "Represented clients in securities offerings and corporate transactions\nConducted legal research and drafted transaction documents\nPerformed due diligence for public and private company deals\nAdvised on SEC compliance and corporate governance matters",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isParalegal ? "Georgetown University" : isConsultant ? "Harvard Business School" : "Yale Law School",
          degree: isParalegal ? "Paralegal Certificate" : isConsultant ? "Master of Business Administration" : "Juris Doctor",
          field: isParalegal ? "Paralegal Studies" : isConsultant ? "Business Administration" : "Law",
          startDate: isParalegal ? "2016-09" : isConsultant ? "2014-09" : "2012-09",
          endDate: isParalegal ? "2017-12" : isConsultant ? "2016-06" : "2015-05",
        },
      ],
      skills: isParalegal
        ? [
            { id: "skill-1", name: "Legal Research" },
            { id: "skill-2", name: "Litigation Support" },
            { id: "skill-3", name: "Document Management" },
            { id: "skill-4", name: "E-Discovery" },
            { id: "skill-5", name: "Contract Review" },
            { id: "skill-6", name: "Case Management" },
            { id: "skill-7", name: "Legal Writing" },
            { id: "skill-8", name: "Westlaw/LexisNexis" },
          ]
        : isConsultant
        ? [
            { id: "skill-1", name: "Strategy Consulting" },
            { id: "skill-2", name: "Business Analysis" },
            { id: "skill-3", name: "Financial Modeling" },
            { id: "skill-4", name: "Change Management" },
            { id: "skill-5", name: "Project Management" },
            { id: "skill-6", name: "Data Analysis" },
            { id: "skill-7", name: "PowerPoint" },
            { id: "skill-8", name: "Stakeholder Management" },
          ]
        : [
            { id: "skill-1", name: "Corporate Law" },
            { id: "skill-2", name: "M&A Transactions" },
            { id: "skill-3", name: "Securities Law" },
            { id: "skill-4", name: "Contract Negotiation" },
            { id: "skill-5", name: "Due Diligence" },
            { id: "skill-6", name: "Legal Research" },
            { id: "skill-7", name: "Corporate Governance" },
            { id: "skill-8", name: "Legal Writing" },
          ],
      sections: [],
    };
  }

  // Operations & Project Management templates
  if (['project-manager-pmp', 'operations-manager', 'pm-executive', 'agile-scrum', 'operations-two-column'].includes(templateId)) {
    const isOperations = ['operations-manager', 'operations-two-column'].includes(templateId);

    return {
      personalInfo: {
        fullName: isOperations ? "Daniel Brown" : "Jessica Williams",
        title: isOperations ? "Operations Manager" : "Senior Project Manager, PMP",
        email: isOperations ? "d.brown@email.com" : "j.williams@email.com",
        phone: "+1 (555) 789-0123",
        location: isOperations ? "Dallas, TX" : "Seattle, WA",
        summary: isOperations
          ? "Results-oriented operations manager with 10+ years optimizing business processes and driving operational excellence. Expert in supply chain management, process improvement, and team leadership. Track record of reducing costs and improving efficiency."
          : "Certified Project Management Professional with 8+ years leading complex technology projects. Expertise in Agile methodologies, stakeholder management, and cross-functional team leadership. Proven ability to deliver projects on time and within budget.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isOperations ? "Manufacturing Solutions Inc" : "Tech Innovations Corp",
          position: isOperations ? "Operations Manager" : "Senior Project Manager",
          startDate: "2019-06",
          endDate: "present",
          current: true,
          description: isOperations
            ? "Oversee daily operations for 200-employee manufacturing facility\nManage production planning, inventory, and supply chain operations\nImplement lean manufacturing principles reducing waste by 30%\nLead continuous improvement initiatives improving productivity"
            : "Manage portfolio of enterprise software development projects\nLead Agile/Scrum teams of 15+ developers and QA engineers\nCoordinate with stakeholders on project scope and requirements\nDeliver $5M+ projects on time with 95% stakeholder satisfaction",
        },
        {
          id: "exp-2",
          company: isOperations ? "Logistics Company LLC" : "Digital Solutions Inc",
          position: isOperations ? "Operations Supervisor" : "Project Manager",
          startDate: isOperations ? "2015-03" : "2018-01",
          endDate: isOperations ? "2019-05" : "2019-05",
          current: false,
          description: isOperations
            ? "Supervised warehouse operations and 50-person team\nOptimized logistics processes reducing delivery times by 25%\nImplemented warehouse management system improving accuracy\nMonitored KPIs and prepared operational performance reports"
            : "Managed software implementation projects for enterprise clients\nCreated project plans, timelines, and resource allocation\nFacilitated sprint planning and retrospective meetings\nIdentified and mitigated project risks and issues",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isOperations ? "University of Texas" : "University of Washington",
          degree: "Bachelor of Science",
          field: isOperations ? "Business Administration" : "Information Systems",
          startDate: "2011-09",
          endDate: "2015-05",
        },
      ],
      skills: isOperations
        ? [
            { id: "skill-1", name: "Operations Management" },
            { id: "skill-2", name: "Supply Chain Management" },
            { id: "skill-3", name: "Process Improvement" },
            { id: "skill-4", name: "Lean Manufacturing" },
            { id: "skill-5", name: "Team Leadership" },
            { id: "skill-6", name: "Inventory Management" },
            { id: "skill-7", name: "Budget Management" },
            { id: "skill-8", name: "SAP/ERP Systems" },
          ]
        : [
            { id: "skill-1", name: "Project Management" },
            { id: "skill-2", name: "Agile/Scrum" },
            { id: "skill-3", name: "PMP Certified" },
            { id: "skill-4", name: "JIRA" },
            { id: "skill-5", name: "Stakeholder Management" },
            { id: "skill-6", name: "Risk Management" },
            { id: "skill-7", name: "Team Leadership" },
            { id: "skill-8", name: "Microsoft Project" },
          ],
      sections: [],
    };
  }

  // Executive templates (sapphire-executive, luxury-timeline, corporate-executive, premium-elite)
  if (['sapphire-executive', 'luxury-timeline', 'corporate-executive', 'premium-elite'].includes(templateId)) {
    return {
      personalInfo: {
        fullName: "Victoria Sterling",
        title: "Chief Executive Officer",
        email: "v.sterling@email.com",
        phone: "+1 (555) 890-1234",
        location: "New York, NY",
        summary: "Visionary executive leader with 20+ years driving transformational growth and innovation. Proven track record building and scaling organizations from startup to Fortune 500. Expert in strategic planning, M&A, and organizational development.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Global Enterprises Inc",
          position: "Chief Executive Officer",
          startDate: "2018-01",
          endDate: "present",
          current: true,
          description: "Lead $3B organization with 5,000+ employees across 15 countries\nDrive strategic vision and corporate growth initiatives\nOversee executive team and board of directors relationships\nAchieved 150% revenue growth and successful IPO in 2020",
        },
        {
          id: "exp-2",
          company: "Innovation Corp",
          position: "Chief Operating Officer",
          startDate: "2013-06",
          endDate: "2017-12",
          current: false,
          description: "Managed global operations and business development\nLed 10+ strategic acquisitions totaling $500M\nBuilt operational excellence programs across organization\nIncreased operating margins from 15% to 28%",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Harvard Business School",
          degree: "Master of Business Administration",
          field: "Business Administration",
          startDate: "2009-09",
          endDate: "2011-06",
        },
      ],
      skills: [
        { id: "skill-1", name: "Executive Leadership" },
        { id: "skill-2", name: "Strategic Planning" },
        { id: "skill-3", name: "M&A Strategy" },
        { id: "skill-4", name: "P&L Management" },
        { id: "skill-5", name: "Board Relations" },
        { id: "skill-6", name: "Change Management" },
        { id: "skill-7", name: "Global Operations" },
        { id: "skill-8", name: "Business Development" },
      ],
      sections: [],
    };
  }

  // Fresher variant templates
  if (templateId.startsWith('fresher-') && !['fresher-elite'].includes(templateId)) {
    return {
      personalInfo: {
        fullName: "Rahul Kumar",
        title: "Computer Science Graduate",
        email: "rahul.kumar@email.com",
        phone: "+91 98765 43210",
        location: "Mumbai, India",
        summary: "Enthusiastic Computer Science graduate with strong programming skills and passion for technology. Completed multiple academic projects and internships. Eager to contribute to innovative software development teams.",
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
        { id: "skill-1", name: "Java" },
        { id: "skill-2", name: "Python" },
        { id: "skill-3", name: "JavaScript" },
        { id: "skill-4", name: "React" },
        { id: "skill-5", name: "SQL" },
        { id: "skill-6", name: "Git" },
        { id: "skill-7", name: "Data Structures" },
        { id: "skill-8", name: "Algorithms" },
      ],
      sections: [],
    };
  }

  // Tech/software templates (tech-grid, software, modern-sidebar, minimalist-geometric, etc.)
  if (['tech-grid', 'software', 'modern-sidebar', 'minimalist-geometric', 'bold-headline', 'dual-tone', 'contemporary-split'].includes(templateId)) {
    return {
      personalInfo: {
        fullName: "Alex Morgan",
        title: "Software Engineer",
        email: "alex.morgan@email.com",
        phone: "+1 (555) 901-2345",
        location: "San Francisco, CA",
        summary: "Innovative software engineer with 6+ years building scalable applications. Full-stack expertise in modern web technologies and cloud platforms. Passionate about clean code and user experience.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Tech Innovators Inc",
          position: "Software Engineer",
          startDate: "2020-03",
          endDate: "present",
          current: true,
          description: "Develop full-stack applications using React, Node.js, and AWS\nDesign and implement RESTful APIs and microservices\nCollaborate with product team on feature development\nMentor junior developers and conduct code reviews",
        },
        {
          id: "exp-2",
          company: "Startup Solutions",
          position: "Junior Developer",
          startDate: "2019-01",
          endDate: "2020-02",
          current: false,
          description: "Built web applications using modern JavaScript frameworks\nImplemented responsive UI components and features\nWrote unit tests and performed bug fixes\nParticipated in agile development process",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "JavaScript" },
        { id: "skill-2", name: "React" },
        { id: "skill-3", name: "Node.js" },
        { id: "skill-4", name: "TypeScript" },
        { id: "skill-5", name: "Python" },
        { id: "skill-6", name: "AWS" },
        { id: "skill-7", name: "Docker" },
        { id: "skill-8", name: "Git" },
      ],
      sections: [],
    };
  }

  // Creative templates (creative-accent, elegant-serif)
  if (['creative-accent', 'elegant-serif'].includes(templateId)) {
    return {
      personalInfo: {
        fullName: "Sophie Anderson",
        title: "UX/UI Designer",
        email: "sophie.anderson@email.com",
        phone: "+1 (555) 012-3456",
        location: "Portland, OR",
        summary: "Creative designer with 5+ years crafting beautiful, user-centered digital experiences. Expert in UI/UX design, prototyping, and design systems. Passionate about solving complex problems through thoughtful design.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Design Studio Inc",
          position: "Senior UX/UI Designer",
          startDate: "2021-06",
          endDate: "present",
          current: true,
          description: "Lead design for web and mobile applications\nConduct user research and usability testing\nCreate wireframes, prototypes, and high-fidelity designs\nCollaborate with developers on design implementation",
        },
        {
          id: "exp-2",
          company: "Creative Agency",
          position: "UX/UI Designer",
          startDate: "2019-03",
          endDate: "2021-05",
          current: false,
          description: "Designed user interfaces for client projects\nDeveloped design systems and component libraries\nWorked with cross-functional teams on product features\nPresented designs to stakeholders and clients",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Rhode Island School of Design",
          degree: "Bachelor of Fine Arts",
          field: "Graphic Design",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "UI/UX Design" },
        { id: "skill-2", name: "Figma" },
        { id: "skill-3", name: "Adobe XD" },
        { id: "skill-4", name: "Sketch" },
        { id: "skill-5", name: "Prototyping" },
        { id: "skill-6", name: "User Research" },
        { id: "skill-7", name: "Design Systems" },
        { id: "skill-8", name: "Typography" },
      ],
      sections: [],
    };
  }

  // Default sample data for remaining templates (modern, minimal, professional, premium-universal, premium-pro, refined)
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
  // Healthcare & Medical
  "medical-professional": MedicalProfessionalTemplate,
  "healthcare-two-column": HealthcareTwoColumnTemplate,
  "nurse-specialist": NurseSpecialistTemplate,
  "medical-executive": MedicalExecutiveTemplate,
  "clinical-minimal": ClinicalMinimalTemplate,
  // Education & Teaching
  "teacher-professional": TeacherProfessionalTemplate,
  "academic-scholar": AcademicScholarTemplate,
  "educator-modern": EducatorModernTemplate,
  "teaching-certified": TeachingCertifiedTemplate,
  "student-educator": StudentEducatorTemplate,
  // Finance & Accounting
  "cpa-professional": CPAProfessionalTemplate,
  "finance-analyst": FinanceAnalystTemplate,
  "accounting-executive": AccountingExecutiveTemplate,
  "auditor": AuditorTemplate,
  "finance-two-column": FinanceTwoColumnTemplate,
  // Sales & Marketing
  "sales-executive": SalesExecutiveTemplate,
  "marketing-professional": MarketingProfessionalTemplate,
  "sales-marketing-hybrid": SalesMarketingHybridTemplate,
  "digital-marketer": DigitalMarketerTemplate,
  "sales-manager": SalesManagerTemplate,
  // Legal & Consulting
  "attorney-professional": AttorneyProfessionalTemplate,
  "legal-counsel": LegalCounselTemplate,
  "consultant": ConsultantTemplate,
  "legal-executive": LegalExecutiveTemplate,
  "paralegal": ParalegalTemplate,
  // Operations & Project Management
  "project-manager-pmp": ProjectManagerPMPTemplate,
  "operations-manager": OperationsManagerTemplate,
  "pm-executive": PMExecutiveTemplate,
  "agile-scrum": AgileScrumTemplate,
  "operations-two-column": OperationsTwoColumnTemplate,
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
