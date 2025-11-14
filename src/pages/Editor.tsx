import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Gauge, Loader2, RotateCcw, ArrowLeft, Edit3, FileEdit, Save } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { firestoreService, ResumeData as FirestoreResumeData } from "@/lib/firestore";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pdf } from "@react-pdf/renderer";
import { ProfessionalPDF } from "@/components/resume/pdf/ProfessionalPDF";
import { ModernPDF } from "@/components/resume/pdf/ModernPDF";
import { MinimalPDF } from "@/components/resume/pdf/MinimalPDF";
import { ExecutivePDF } from "@/components/resume/pdf/ExecutivePDF";
import { FrontendPDF } from "@/components/resume/pdf/FrontendPDF";
import { FullstackPDF } from "@/components/resume/pdf/FullstackPDF";
import { BackendPDF } from "@/components/resume/pdf/BackendPDF";
import { GraduatePDF } from "@/components/resume/pdf/GraduatePDF";
import { StarterPDF } from "@/components/resume/pdf/StarterPDF";
import { FresherPDF } from "@/components/resume/pdf/FresherPDF";
import { PremiumFresherPDF } from "@/components/resume/pdf/PremiumFresherPDF";
import { SeniorPDF } from "@/components/resume/pdf/SeniorPDF";
import { SeniorFrontendPDF } from "@/components/resume/pdf/SeniorFrontendPDF";
import { SeniorBackendPDF } from "@/components/resume/pdf/SeniorBackendPDF";
import { SoftwarePDF } from "@/components/resume/pdf/SoftwarePDF";
import { PremiumUniversalPDF } from "@/components/resume/pdf/PremiumUniversalPDF";
import { PremiumProPDF } from "@/components/resume/pdf/PremiumProPDF";
import { FresherElitePDF } from "@/components/resume/pdf/FresherElitePDF";
import { AnalystPDF } from "@/components/resume/pdf/AnalystPDF";
import { ElitePDF } from "@/components/resume/pdf/ElitePDF";
import { CorporateExecutivePDF } from "@/components/resume/pdf/CorporateExecutivePDF";
import { RefinedPDF } from "@/components/resume/pdf/RefinedPDF";
import { PremiumElitePDF } from "@/components/resume/pdf/PremiumElitePDF";
import { registerPDFFonts } from "@/lib/pdfFonts";
import { templateMetaMap, categoryLabelMap } from "@/constants/templateMeta";
import { analyzeResumeForATS, type AtsReport } from "@/lib/atsAnalyzer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const gradeMap: Record<AtsReport["grade"], { label: string; tone: string }> = {
  excellent: { label: "ATS ready", tone: "text-emerald-600" },
  strong: { label: "Strong match", tone: "text-blue-600" },
  ok: { label: "Needs refinement", tone: "text-amber-600" },
  weak: { label: "High risk", tone: "text-rose-600" },
};

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    photo?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level?: number; // 1-10 scale
    category?: "core" | "toolbox";
  }>;
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

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
  const templates: Record<string, ResumeData> = {
    professional: {
      personalInfo: {
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        title: "Senior Financial Analyst",
        summary:
          "Results-driven financial analyst with 8+ years of experience in corporate finance, financial modeling, and strategic planning. Proven track record of delivering actionable insights that drive business growth and operational efficiency.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Goldman Sachs",
          position: "Senior Financial Analyst",
          startDate: "2020-03",
          endDate: "",
          current: true,
          description:
            "Lead financial planning and analysis for $500M portfolio\nDevelop complex financial models to support strategic decision-making\nPresent quarterly business reviews to C-suite executives\nManage team of 3 junior analysts",
        },
        {
          id: "2",
          company: "JPMorgan Chase",
          position: "Financial Analyst",
          startDate: "2016-06",
          endDate: "2020-02",
          current: false,
          description:
            "Conducted financial analysis and forecasting for multiple business units\nStreamlined reporting processes, reducing monthly close time by 30%\nCollaborated with cross-functional teams on budgeting initiatives",
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
        },
        {
          id: "2",
          school: "University of Pennsylvania",
          degree: "Bachelor of Science",
          field: "Economics",
          startDate: "2010-09",
          endDate: "2014-05",
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
    },
    modern: {
      personalInfo: {
        fullName: "Alex Chen",
        email: "alex.chen@email.com",
        phone: "+1 (555) 987-6543",
        location: "San Francisco, CA",
        title: "Full Stack Developer",
        summary:
          "Passionate full-stack developer with 5+ years building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love creating elegant solutions to complex problems and collaborating with creative teams.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Tech Startup Inc",
          position: "Senior Full Stack Developer",
          startDate: "2021-01",
          endDate: "",
          current: true,
          description:
            "Architected and deployed microservices handling 1M+ daily active users\nLed migration from monolith to serverless architecture on AWS\nMentored 5 junior developers and conducted code reviews\nImproved application performance by 60% through optimization",
        },
        {
          id: "2",
          company: "Digital Agency Co",
          position: "Frontend Developer",
          startDate: "2019-03",
          endDate: "2020-12",
          current: false,
          description:
            "Built responsive web applications using React and TypeScript\nImplemented CI/CD pipelines reducing deployment time by 40%\nCollaborated with designers to create pixel-perfect UIs",
        },
      ],
      education: [
        {
          id: "1",
          school: "Stanford University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: buildSkills(
        "modern",
        [
          "React",
          "TypeScript",
          "Node.js",
          "Python",
          "AWS",
          "Docker",
          "PostgreSQL",
          "GraphQL",
          "Git",
          "Agile/Scrum",
        ],
        [9, 9, 8, 7, 8, 7, 7, 7, 8, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Projects",
          content:
            "E-Commerce Platform - Built scalable e-commerce solution serving 50K+ users\nOpen Source Contributor - Active contributor to React ecosystem with 500+ GitHub stars",
        },
      ],
    },
    minimal: {
      personalInfo: {
        fullName: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        phone: "+1 (555) 234-5678",
        location: "Austin, TX",
        title: "UX Designer",
        summary:
          "Creative UX designer with a keen eye for detail and user-centered design principles. 6+ years of experience crafting intuitive digital experiences for web and mobile platforms.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Design Studio",
          position: "Senior UX Designer",
          startDate: "2020-08",
          endDate: "",
          current: true,
          description:
            "Lead UX strategy for client projects ranging from startups to Fortune 500\nConduct user research, usability testing, and data analysis\nDesign wireframes, prototypes, and high-fidelity mockups\nCollaborate with developers to ensure design implementation",
        },
        {
          id: "2",
          company: "Tech Company",
          position: "UX Designer",
          startDate: "2018-01",
          endDate: "2020-07",
          current: false,
          description:
            "Redesigned mobile app resulting in 45% increase in user engagement\nCreated and maintained design system used across product teams\nFacilitated design workshops with stakeholders",
        },
      ],
      education: [
        {
          id: "1",
          school: "Rhode Island School of Design",
          degree: "Bachelor of Fine Arts",
          field: "Graphic Design",
          startDate: "2014-09",
          endDate: "2018-05",
        },
      ],
      skills: buildSkills(
        "minimal",
        [
          "Figma",
          "Sketch",
          "Adobe XD",
          "User Research",
          "Prototyping",
          "Wireframing",
          "Design Systems",
          "HTML/CSS",
        ],
        [9, 8, 8, 8, 8, 7, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Awards",
          content:
            "Awwwards - Site of the Day (2023)\nRed Dot Design Award - UX Category (2022)",
        },
      ],
    },
    executive: {
      personalInfo: {
        fullName: "Michael Thompson",
        email: "michael.thompson@email.com",
        phone: "+1 (555) 345-6789",
        location: "Chicago, IL",
        title: "Chief Technology Officer",
        summary:
          "Visionary technology executive with 15+ years leading digital transformation initiatives. Proven track record of building high-performing engineering teams and delivering innovative solutions that drive business growth and competitive advantage.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Global Tech Corp",
          position: "Chief Technology Officer",
          startDate: "2019-01",
          endDate: "",
          current: true,
          description:
            "Lead technology strategy and innovation for organization with 2,000+ employees\nBuilt engineering team from 50 to 200+ across multiple locations\nSpearheaded cloud migration initiative saving $5M annually\nDrive product roadmap and architecture decisions for flagship products",
        },
        {
          id: "2",
          company: "Enterprise Solutions Inc",
          position: "VP of Engineering",
          startDate: "2015-03",
          endDate: "2018-12",
          current: false,
          description:
            "Managed 80+ person engineering organization across 6 product teams\nEstablished technical standards and best practices company-wide\nLed successful IPO preparation and technical due diligence\nReduced infrastructure costs by 40% through strategic optimization",
        },
      ],
      education: [
        {
          id: "1",
          school: "MIT",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2006-09",
          endDate: "2008-05",
        },
        {
          id: "2",
          school: "University of Illinois",
          degree: "Bachelor of Science",
          field: "Computer Engineering",
          startDate: "2002-09",
          endDate: "2006-05",
        },
      ],
      skills: buildSkills(
        "executive",
        [
          "Strategic Planning",
          "Technology Leadership",
          "Cloud Architecture",
          "Team Building",
          "Product Strategy",
          "Vendor Management",
          "Board Presentations",
          "P&L Management",
        ],
        [9, 9, 8, 8, 9, 7, 8, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Board Positions",
          content:
            "Board Member - Tech Industry Association (2021-Present)\nAdvisor - Multiple Early-Stage Startups",
        },
      ],
    },
    frontend: {
      personalInfo: {
        fullName: "Jordan Martinez",
        email: "jordan.martinez@email.com",
        phone: "+1 (555) 456-7890",
        location: "Seattle, WA",
        title: "Frontend Developer",
        summary:
          "Creative and detail-oriented frontend developer with 4+ years of experience building beautiful, responsive web applications. Passionate about user experience, modern JavaScript frameworks, and clean code. Thrive in collaborative environments and love bringing designs to life.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Innovative Web Solutions",
          position: "Senior Frontend Developer",
          startDate: "2022-06",
          endDate: "",
          current: true,
          description:
            "Developed and maintained high-performance React applications serving 500K+ monthly users\nCollaborated with UX designers to implement pixel-perfect, responsive interfaces\nOptimized web vitals resulting in 40% faster load times and improved SEO rankings\nMentored junior developers and conducted code reviews\nIntegrated REST and GraphQL APIs with modern state management solutions",
        },
        {
          id: "2",
          company: "Creative Digital Agency",
          position: "Frontend Developer",
          startDate: "2020-08",
          endDate: "2022-05",
          current: false,
          description:
            "Built interactive web experiences for clients across various industries\nImplemented animations and transitions using CSS3 and JavaScript libraries\nWorked in Agile environment with daily standups and bi-weekly sprints\nEnsured cross-browser compatibility and mobile responsiveness\nContributed to component library used across multiple projects",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2016-09",
          endDate: "2020-05",
        },
      ],
      skills: buildSkills(
        "frontend",
        [
          "React",
          "TypeScript",
          "JavaScript (ES6+)",
          "HTML5",
          "CSS3/Sass",
          "Tailwind CSS",
          "Vue.js",
          "Next.js",
          "Redux",
          "Git",
          "Webpack",
          "Responsive Design",
          "REST APIs",
          "GraphQL",
        ],
        [9, 9, 9, 9, 9, 8, 7, 8, 8, 8, 7, 8, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Projects",
          content:
            "Portfolio Website - Built personal portfolio with React and Framer Motion showcasing interactive animations\nWeather Dashboard - Created real-time weather app using React, TypeScript, and OpenWeather API\nOpen Source - Contributor to popular UI component libraries with 200+ GitHub stars",
        },
      ],
    },
    "senior-frontend": {
      personalInfo: {
        fullName: "Taylor Foster",
        email: "taylor.foster@email.com",
        phone: "+1 (415) 678-9023",
        location: "San Francisco, CA",
        title: "Senior Frontend Engineer",
        summary:
          "Award-winning frontend engineer with 9+ years crafting performant, accessible interfaces at scale. Specializes in design systems, data visualization, and cross-team collaboration to ship delightful user experiences.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Figma",
          position: "Lead Frontend Engineer",
          startDate: "2021-04",
          endDate: "",
          current: true,
          description:
            "Led design system modernization serving 75+ teams and 4 design platforms\nDelivered real-time multiplayer canvas optimizations reducing paint time by 35%\nPartnered with Data Viz team to launch analytics dashboard viewed by 1M+ users\nMentored 8 engineers, introducing progressive enhancement playbooks",
        },
        {
          id: "2",
          company: "Spotify",
          position: "Senior Frontend Engineer",
          startDate: "2017-08",
          endDate: "2021-03",
          current: false,
          description:
            "Owned web playback UI, increasing retention by 12% via personalized layouts\nBuilt component performance tooling that cut bundle size by 28%\nShipped artist analytics visualizations with interactive charts and stories",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Human Centered Design & Engineering",
          startDate: "2010-09",
          endDate: "2014-06",
        },
      ],
      skills: buildSkills(
        "senior-frontend",
        [
          "React",
          "TypeScript",
          "Next.js",
          "GraphQL",
          "Tailwind CSS",
          "Storybook",
          "Accessibility",
          "Web Performance",
          "Data Visualization",
          "Design Systems",
        ],
        [10, 9, 9, 8, 9, 8, 9, 9, 9, 9],
      ),
      sections: [
        {
          id: "metrics",
          title: "Key Metrics",
          content:
            "Design System Adoption - 85% org coverage\nPage Speed - -42% LCP across core flows\nExperimentation - 18% lift in conversion via UI personalization",
        },
        {
          id: "awards",
          title: "Highlights",
          content:
            "2023 - Webby Awards, Best Web Experience\n2022 - CSS Design Awards, Special Kudos\nTop Speaker - Google Chrome Dev Summit 2021",
        },
      ],
    },
    software: {
      personalInfo: {
        fullName: "Taylor Foster",
        email: "taylor.foster@email.com",
        phone: "+1 (415) 678-9023",
        location: "San Francisco, CA",
        title: "Lead Software Engineer",
        summary:
          "Award-winning engineer with 9+ years designing performant, accessible software at scale. Specializes in design systems, data visualization, and cross-functional leadership to ship user-first experiences.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Figma",
          position: "Lead Frontend Engineer",
          startDate: "2021-04",
          endDate: "",
          current: true,
          description:
            "Led front-of-site modernization across 75+ teams and 4 design surfaces\nDelivered real-time canvas optimizations reducing paint time by 35%\nPartnered with data visualization to launch analytics dashboard viewed by 1M+ users\nMentored 8 engineers, formalizing progressive enhancement playbooks",
        },
        {
          id: "2",
          company: "Spotify",
          position: "Senior Frontend Engineer",
          startDate: "2017-08",
          endDate: "2021-03",
          current: false,
          description:
            "Owned web playback UI, increasing retention by 12% with personalization\nBuilt component performance tooling that cut bundle size by 28%\nShipped analytics visualizations with interactive charts and stories",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2010-09",
          endDate: "2014-06",
        },
      ],
      skills: buildSkills(
        "software",
        [
          "React",
          "TypeScript",
          "Next.js",
          "GraphQL",
          "Design Systems",
          "Accessibility",
          "Web Performance",
          "Data Visualization",
          "Tailwind CSS",
          "Figma",
          "Cypress",
          "Git & CI",
        ],
        [10, 9, 9, 8, 9, 9, 9, 8, 8, 8, 7, 8],
      ),
      sections: [
        {
          id: "strengths",
          title: "Strengths",
          content:
            "Accessibility - Creating inclusive digital experiences\nWeb Performance - Optimizing for speed and reliability\nData Visualization - Crafting interactive analytical stories\nDesign Systems - Leading scalable design language initiatives",
        },
        {
          id: "achievements",
          title: "Key Achievements",
          content:
            "2023 Webby Awards – Best Web Experience\n2022 CSS Design Awards – Special Kudos\nTop Speaker – Google Chrome Dev Summit 2021",
        },
      ],
    },
    "senior-backend": {
      personalInfo: {
        fullName: "Morgan Patel",
        email: "morgan.patel@email.com",
        phone: "+1 (917) 555-2048",
        location: "New York, NY",
        title: "Senior Backend Engineer",
        summary:
          "Principal backend engineer with 11+ years designing resilient, event-driven platforms. Specializes in high-volume data pipelines, observability, and leading cross-functional teams to deliver measurable reliability improvements.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Stripe",
          position: "Lead Backend Architect",
          startDate: "2020-02",
          endDate: "",
          current: true,
          description:
            "Directed migration to event-driven payouts platform processing $15B+ annually\nReduced critical incident rate by 43% via SLO program and adaptive throttling\nMentored 7 engineers; established playbooks for blue/green deployments and on-call excellence",
        },
        {
          id: "2",
          company: "Airbnb",
          position: "Principal Platform Engineer",
          startDate: "2016-05",
          endDate: "2020-01",
          current: false,
          description:
            "Re-architected reservations pipeline to handle 4x traffic with <200ms P99 latency\nIntroduced schema governance program that cut breaking API changes by 60%\nLed reliability guild to implement chaos testing and automated rollback strategies",
        },
      ],
      education: [
        {
          id: "1",
          school: "Carnegie Mellon University",
          degree: "Master of Science",
          field: "Software Engineering",
          startDate: "2012-08",
          endDate: "2014-05",
        },
      ],
      skills: buildSkills(
        "senior-backend",
        [
          "Distributed Systems",
          "Go",
          "Python",
          "Microservices Architecture",
          "Event-Driven Design",
          "Cloud Infrastructure (AWS)",
          "Database Performance",
          "Observability (Prometheus/Grafana)",
          "API Design (REST & GraphQL)",
          "Team Leadership",
        ],
        [10, 9, 9, 9, 8, 9, 9, 8, 8, 9],
      ),
      sections: [
        {
          id: "impact",
          title: "Impact Metrics",
          content:
            "Platform Uptime - 99.98% across 12 regions\nLatency - 38% reduction in P95 API response\nCost Optimisation - $1.2M annual AWS savings via autoscaling",
        },
        {
          id: "initiatives",
          title: "Key Initiatives",
          content:
            "Resilient Data Pipelines - Built self-healing Kafka streams with dead-letter reprocessing\nObservability Overhaul - Rolled out unified tracing reducing MTTR from 41m to 12m\nTalent Development - Launched backend apprenticeship program with 3 promotions in first year",
        },
      ],
    },
    fullstack: {
      personalInfo: {
        fullName: "David Anderson",
        email: "david.anderson@email.com",
        phone: "+1 (555) 789-0123",
        location: "Austin, TX",
        title: "Full Stack Engineer",
        summary:
          "Versatile full stack engineer with 6+ years of experience building end-to-end web applications. Expert in both frontend and backend technologies, cloud infrastructure, and database design. Passionate about creating scalable solutions and optimizing performance across the entire stack.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Cloud Tech Solutions",
          position: "Senior Full Stack Engineer",
          startDate: "2021-09",
          endDate: "",
          current: true,
          description:
            "Architected and deployed microservices-based applications using Node.js, React, and PostgreSQL\nBuilt RESTful APIs and GraphQL endpoints serving 2M+ requests daily\nImplemented CI/CD pipelines with Docker and Kubernetes, reducing deployment time by 70%\nLed team of 4 developers in agile sprint planning and code reviews\nOptimized database queries resulting in 50% reduction in response times",
        },
        {
          id: "2",
          company: "StartupHub Inc",
          position: "Full Stack Developer",
          startDate: "2018-06",
          endDate: "2021-08",
          current: false,
          description:
            "Developed full stack web applications using React, Express.js, and MongoDB\nCreated real-time features using WebSocket and Socket.io\nIntegrated third-party APIs including Stripe, SendGrid, and AWS S3\nImplemented authentication and authorization using JWT and OAuth 2.0\nCollaborated with designers to create responsive, mobile-first interfaces",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Texas at Austin",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2014-09",
          endDate: "2018-05",
        },
      ],
      skills: buildSkills(
        "fullstack",
        [
          "JavaScript/TypeScript",
          "React/Next.js",
          "Node.js/Express",
          "Python/Django",
          "PostgreSQL/MongoDB",
          "Docker/Kubernetes",
          "AWS/Azure",
          "GraphQL/REST API",
          "Redis/RabbitMQ",
          "Git/CI-CD",
          "Microservices",
          "Testing (Jest/Cypress)",
        ],
        [9, 9, 8, 7, 8, 7, 7, 8, 7, 8, 7, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Projects & Achievements",
          content:
            "E-Commerce Platform - Built scalable marketplace handling 100K+ daily transactions\nReal-time Chat Application - Developed WebSocket-based chat with 10K concurrent users\nAWS Certified Solutions Architect - Associate Level\nContributed to open-source projects with 1K+ GitHub stars",
        },
      ],
    },
    backend: {
      personalInfo: {
        fullName: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 234-8901",
        location: "San Francisco, CA",
        title: "Backend Developer",
        summary:
          "Experienced backend developer with 5+ years building scalable server-side applications and APIs. Expert in Node.js, Python, and database design. Passionate about clean architecture, performance optimization, and delivering reliable systems that power mission-critical applications.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Tech Solutions Inc",
          position: "Senior Backend Developer",
          startDate: "2021-03",
          endDate: "",
          current: true,
          description:
            "Designed and implemented RESTful APIs serving 5M+ requests daily with 99.9% uptime\nBuilt microservices architecture using Node.js, Express, and PostgreSQL\nOptimized database queries reducing response times by 60%\nImplemented caching strategies using Redis improving performance by 40%\nLed code reviews and mentored junior developers on best practices",
        },
        {
          id: "2",
          company: "Digital Innovations",
          position: "Backend Developer",
          startDate: "2019-06",
          endDate: "2021-02",
          current: false,
          description:
            "Developed scalable backend services using Python Django and Flask\nIntegrated third-party APIs including payment gateways and analytics services\nImplemented JWT-based authentication and role-based access control\nCreated automated testing suites achieving 85% code coverage\nParticipated in agile development with bi-weekly sprint cycles",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: buildSkills(
        "backend",
        [
          "Node.js/Express",
          "Python/Django",
          "PostgreSQL/MySQL",
          "MongoDB",
          "Redis",
          "Docker",
          "Kubernetes",
          "AWS/GCP",
          "REST APIs",
          "GraphQL",
          "Microservices",
          "Git/CI-CD",
          "Testing (Jest/Pytest)",
          "Message Queues (RabbitMQ)",
        ],
        [9, 8, 8, 7, 7, 7, 7, 8, 8, 7, 7, 8, 7, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications & Projects",
          content:
            "AWS Certified Developer - Associate\nAPI Gateway Design - Built high-performance API gateway handling 10M+ daily requests\nDatabase Optimization - Reduced query times by 70% through indexing and optimization\nOpen Source Contributions - Active contributor to Node.js ecosystem projects",
        },
      ],
    },
    senior: {
      personalInfo: {
        fullName: "Taylor Foster",
        email: "taylor.foster@email.com",
        phone: "+1 (512) 312-7001",
        location: "Austin, TX",
        title: "Senior Software Engineer",
        summary:
          "Passionate senior software engineer with 10+ years building scalable web applications and backend platforms. Adept at leading cross-functional teams, designing resilient systems, and transforming business requirements into reliable products. Advocate for engineering excellence, measurable impact, and mentorship.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Blackbaud",
          position: "Lead Software Engineer",
          startDate: "2021-01",
          endDate: "",
          current: true,
          description:
            "Directed end-to-end migration of monolith services to Python 3.8 and Kubernetes\nBuilt automated testing suites that removed redundant manual QA and reduced regressions by 40%\nDelivered analytics dashboards that improved release visibility and decision making for executives\nMentored a team of 6 engineers, introducing peer review practices and leveling resources",
        },
        {
          id: "2",
          company: "Wayfair",
          position: "Senior Software Engineer",
          startDate: "2017-02",
          endDate: "2020-12",
          current: false,
          description:
            "Productized an automation platform adopted by three enterprise programs, saving $600K annually\nRe-architected critical data services to cut page latency by 50% and boost conversion\nLed reliability guild in scaling monitoring and incident response across 30+ microservices",
        },
        {
          id: "3",
          company: "Target",
          position: "Software Developer",
          startDate: "2015-05",
          endDate: "2017-01",
          current: false,
          description:
            "Implemented configuration tooling that accelerated performance testing cycles by 35%\nDelivered in-memory reporting APIs serving 1M+ daily requests with sub-second latency\nPartnered with product and ops to reduce critical incident response times by 20%",
        },
        {
          id: "4",
          company: "Redfin",
          position: "Junior Software Engineer",
          startDate: "2013-06",
          endDate: "2015-04",
          current: false,
          description:
            "Launched customer engagement features that unlocked $18K in new monthly revenue\nOptimized heavy batch automation reducing processing times from minutes to seconds\nSpearheaded defect triage that cleared 40% of legacy backlog within two quarters",
        },
      ],
      education: [
        {
          id: "1",
          school: "The University of Arizona",
          degree: "Executive MBA",
          field: "Engineering Management",
          startDate: "2010-08",
          endDate: "2011-05",
        },
        {
          id: "2",
          school: "North Carolina Wesleyan College",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2006-08",
          endDate: "2009-05",
        },
      ],
      skills: buildSkills(
        "senior",
        [
          "Java",
          "C++",
          "Python",
          "Node.js",
          "MySQL",
          "PostgreSQL",
          "System Design",
          "Cloud Architecture",
          "Microservices",
          "CI/CD",
          "Team Leadership",
          "Mentoring",
        ],
        [9, 8, 8, 8, 8, 8, 9, 9, 8, 8, 9, 9],
      ),
      sections: [
        {
          id: "achievements",
          title: "Achievements",
          content:
            "Spearheaded a $12M software platform launch, coordinating engineering, QA, and product\nDelivered 30% query efficiency gains by redesigning MySQL schemas and caching strategy\nLed a year-long multi-team release delivering six coordinated platform modules\nBuilt customer support chatbot that cut contact center handling time by 240%",
        },
        {
          id: "operating-systems",
          title: "Operating Systems",
          content: "Unix\nSolaris\nLinux\nWindows",
        },
        {
          id: "strengths",
          title: "Strengths",
          content:
            "Gold Medalist - Recognized for five consecutive years of academic excellence\nCorporate Social Responsibility - Volunteer lead for mentorship and tech education programs",
        },
        {
          id: "references",
          title: "References",
          content:
            "Richard Smith, CEO - Wolf Inc | richard.smith@wolfinC.com | 212-330-1122\nNeil Johnson, CFO - Reilly Group | neil.johnson@reilly.com | 618-233-0090",
        },
      ],
    },
    graduate: {
      personalInfo: {
        fullName: "Arjun Mehta",
        email: "arjun.mehta@email.com",
        phone: "+91 98765 43210",
        location: "Pune, India",
        title: "Computer Science Graduate - Full Stack Development",
        summary:
          "Motivated Computer Science graduate with strong foundation in software development, data structures, and algorithms. Completed two internships and multiple academic projects in web development. Eager to apply technical skills and learn from experienced engineers in a collaborative development environment.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "CodeCraft Solutions",
          position: "Software Development Intern",
          startDate: "2024-01",
          endDate: "2024-04",
          current: false,
          description:
            "Developed responsive web applications using React.js and Node.js\nBuilt RESTful APIs and integrated third-party services\nCollaborated with team of 4 developers using Git and Agile methodology\nWrote unit tests achieving 80% code coverage using Jest\nParticipated in code reviews and daily standup meetings",
        },
        {
          id: "2",
          company: "WebTech Innovations",
          position: "Frontend Development Intern",
          startDate: "2023-06",
          endDate: "2023-08",
          current: false,
          description:
            "Created UI components using React and Tailwind CSS\nImproved website load time by 25% through code optimization\nWorked with designers to implement responsive designs\nGained hands-on experience with modern JavaScript frameworks",
        },
      ],
      education: [
        {
          id: "1",
          school: "College of Engineering Pune",
          degree: "Bachelor of Engineering",
          field: "Computer Science & Engineering",
          startDate: "2020-08",
          endDate: "2024-05",
        },
      ],
      skills: buildSkills(
        "graduate",
        [
          "JavaScript",
          "React.js",
          "Node.js",
          "HTML/CSS",
          "Python",
          "Java",
          "SQL",
          "Git",
          "REST APIs",
          "MongoDB",
          "Data Structures",
          "Problem Solving",
        ],
        [8, 7, 7, 8, 7, 7, 6, 7, 6, 6, 8, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Final Year Project",
          content:
            "E-Commerce Web Application\nBuilt full-stack online shopping platform with product catalog and cart functionality\nImplemented user authentication, payment integration, and order management\nTech Stack: React, Node.js, Express, MongoDB, Stripe API\nAchieved First Class with Distinction (92% marks)",
        },
        {
          id: "2",
          title: "Mini Project",
          content:
            "Task Management App\nDeveloped responsive task tracking application with real-time updates\nFeatures: User authentication, task categories, due date reminders\nTech Stack: React, Firebase, Material-UI\nDeployed on Vercel with 100+ active users",
        },
        {
          id: "3",
          title: "Certifications & Achievements",
          content:
            "Winner - College Hackathon 2023 (Team of 3, built AI chatbot in 24 hours)\nAWS Certified Cloud Practitioner (2024)\nCompleted 150+ problems on LeetCode (Data Structures & Algorithms)\nGitHub: 12 public repositories with 50+ stars combined\nMember of Coding Club - Organized technical workshops for juniors",
        },
      ],
    },
    starter: {
      personalInfo: {
        fullName: "Anjali Reddy",
        email: "anjali.reddy@email.com",
        phone: "+91 98765 12345",
        location: "Hyderabad, India",
        title: "MBA Graduate - Marketing & Business Development",
        summary:
          "Results-oriented MBA graduate with practical experience in digital marketing, market research, and brand management through multiple internships. Strong analytical and communication skills with ability to develop data-driven marketing strategies. Seeking opportunities to contribute fresh ideas and grow in a dynamic marketing environment.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Digital Solutions India",
          position: "Marketing Intern",
          startDate: "2024-01",
          endDate: "2024-04",
          current: false,
          description:
            "• Managed social media campaigns across Instagram and LinkedIn for 3 B2B clients\n• Created content calendar and executed 40+ posts resulting in 35% engagement increase\n• Conducted competitor analysis and market research for new product launches\n• Assisted in email marketing campaigns achieving 20% average open rate\n• Prepared monthly analytics reports tracking key marketing metrics",
        },
        {
          id: "2",
          company: "TechStart Incubator",
          position: "Business Development Intern",
          startDate: "2023-06",
          endDate: "2023-08",
          current: false,
          description:
            "• Identified and qualified 50+ potential leads through LinkedIn outreach\n• Created sales presentations and pitch decks for startup founders\n• Assisted in client meetings and follow-up communications\n• Maintained CRM database and tracked sales pipeline activities",
        },
      ],
      education: [
        {
          id: "1",
          school: "Indian School of Business",
          degree: "Master of Business Administration",
          field: "Marketing & Strategy",
          startDate: "2022-06",
          endDate: "2024-05",
        },
        {
          id: "2",
          school: "Osmania University",
          degree: "Bachelor of Commerce",
          field: "Commerce & Accountancy",
          startDate: "2019-06",
          endDate: "2022-04",
        },
      ],
      skills: buildSkills(
        "starter",
        [
          "Digital Marketing",
          "Market Research",
          "Content Strategy",
          "Social Media Marketing",
          "Google Analytics",
          "SEO Basics",
          "MS Office Suite",
          "Canva",
          "Email Marketing",
          "Data Analysis",
          "Business Communication",
        ],
        [8, 7, 7, 7, 7, 6, 8, 7, 6, 6, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Final Year Project",
          content:
            "Brand Strategy for D2C Startup\n• Developed go-to-market strategy for sustainable fashion brand\n• Conducted primary research with 300+ potential customers across 3 cities\n• Created brand positioning framework and marketing mix recommendations\n• Presented findings to startup founders; received 94% marks",
        },
        {
          id: "2",
          title: "Mini Project",
          content:
            "Social Media Campaign for NGO\n• Designed and executed 2-month awareness campaign for education NGO\n• Generated 8,000+ impressions and 400+ website visits organically\n• Increased volunteer registrations by 40% through targeted content",
        },
        {
          id: "3",
          title: "Certifications",
          content:
            "• Google Digital Marketing & E-Commerce Professional Certificate (2024)\n• HubSpot Inbound Marketing Certification (2024)\n• Facebook Blueprint - Social Media Marketing (2023)\n• Microsoft Excel for Business Specialization (2023)",
        },
      ],
    },
    fresher: {
      personalInfo: {
        fullName: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91 98765 54321",
        location: "Bangalore, India",
        title: "Computer Science Graduate - Software Developer",
        summary:
          "Recent Computer Science graduate with strong programming fundamentals and hands-on experience in web development through internships and academic projects. Passionate about creating efficient, user-friendly applications and eager to contribute to innovative software solutions in a collaborative team environment.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "TechStart Solutions",
          position: "Software Development Intern",
          startDate: "2024-02",
          endDate: "2024-05",
          current: false,
          description:
            "Developed responsive web applications using React.js, Node.js, and MongoDB\nBuilt RESTful APIs and integrated third-party payment services\nCollaborated with cross-functional team of 6 developers using Git and Agile methodology\nImplemented automated testing achieving 85% code coverage using Jest\nOptimized application performance resulting in 30% faster load times",
        },
        {
          id: "2",
          company: "Digital Wave Agency",
          position: "Frontend Development Intern",
          startDate: "2023-06",
          endDate: "2023-08",
          current: false,
          description:
            "• Created interactive UI components using React and Tailwind CSS\n• Collaborated with UX designers to implement pixel-perfect responsive designs\n• Improved website accessibility scores by 40% following WCAG guidelines\n• Gained hands-on experience with modern JavaScript frameworks and tools",
        },
      ],
      education: [
        {
          id: "1",
          school: "National Institute of Technology, Karnataka",
          degree: "Bachelor of Technology",
          field: "Computer Science & Engineering",
          startDate: "2020-08",
          endDate: "2024-06",
        },
        {
          id: "2",
          school: "Delhi Public School",
          degree: "Class XII (CBSE)",
          field: "Mathematics, Physics, Chemistry",
          startDate: "2018-04",
          endDate: "2020-03",
        },
      ],
      skills: buildSkills(
        "fresher",
        [
          "JavaScript",
          "React.js",
          "Node.js",
          "Python",
          "Java",
          "HTML/CSS",
          "MongoDB",
          "MySQL",
          "Git & GitHub",
          "REST APIs",
          "Data Structures",
          "Algorithms",
        ],
        [8, 8, 7, 8, 7, 9, 7, 7, 8, 7, 8, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Academic Projects",
          content:
            "E-Learning Platform (Final Year Project)\nBuilt full-stack online learning platform with course management and video streaming\nImplemented user authentication, progress tracking, and interactive quizzes\nTech Stack: React.js, Node.js, Express.js, MongoDB, Socket.io\nAchieved 95% marks and recognition as Best Project in Computer Science\n\nTask Management Web App\nDeveloped responsive task tracking application with real-time collaboration\nFeatures: Drag-and-drop interface, deadline notifications, team workspace\nTech Stack: React.js, Firebase, Material-UI\nDeployed on Vercel with 200+ active users during beta testing",
        },
        {
          id: "2",
          title: "Achievements & Certifications",
          content:
            "Winner - National Level Hackathon 2023 (Built AI-powered study assistant in 36 hours)\nAWS Certified Cloud Practitioner (2024)\nGoogle Cloud Associate Cloud Engineer (2024)\nSolved 200+ coding problems on LeetCode and GeeksforGeeks\nGitHub: 15 public repositories with 80+ combined stars\nTechnical Lead - College Coding Club (Organized workshops for 100+ students)",
        },
      ],
    },
    "premium-fresher": {
      personalInfo: {
        fullName: "Alex Chen",
        email: "alex.chen@email.com",
        phone: "+1 (555) 987-6543",
        location: "San Francisco, CA",
        title: "Computer Science Graduate - Full Stack Developer",
        summary:
          "Recent Computer Science graduate with a passion for creating innovative web applications and a strong foundation in modern development technologies. Proven ability to deliver high-quality software solutions through academic projects and internships, with expertise in both frontend and backend development.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "InnovateTech Solutions",
          position: "Full Stack Development Intern",
          startDate: "2024-01",
          endDate: "2024-06",
          current: false,
          description:
            "Developed full-stack web applications using React.js, Node.js, and PostgreSQL\nImplemented responsive UI components with modern CSS frameworks and animations\nBuilt RESTful APIs and integrated third-party services (Stripe, SendGrid)\nCollaborated in Agile environment using Git, Jira, and daily standups\nAchieved 90% test coverage using Jest and Cypress for automated testing",
        },
        {
          id: "2",
          company: "StartupLab Inc.",
          position: "Frontend Development Intern",
          startDate: "2023-07",
          endDate: "2023-12",
          current: false,
          description:
            "Created interactive user interfaces using React.js, TypeScript, and Tailwind CSS\nOptimized application performance resulting in 45% faster page load times\nImplemented accessibility features following WCAG 2.1 guidelines\nCollaborated with UX/UI designers to create pixel-perfect responsive designs\nParticipated in code reviews and mentored junior developers",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2020-08",
          endDate: "2024-05",
        },
        {
          id: "2",
          school: "Berkeley High School",
          degree: "High School Diploma",
          field: "College Preparatory",
          startDate: "2016-09",
          endDate: "2020-06",
        },
      ],
      skills: buildSkills(
        "fresher",
        [
          "JavaScript",
          "TypeScript",
          "React.js",
          "Node.js",
          "Python",
          "Java",
          "HTML/CSS",
          "SQL",
          "Git & GitHub",
          "Docker",
          "AWS",
          "MongoDB",
        ],
        [9, 8, 9, 8, 8, 7, 9, 8, 9, 6, 6, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Featured Projects",
          content:
            "E-Commerce Platform (Capstone Project)\nBuilt complete e-commerce solution with user authentication, product catalog, and payment processing\nFeatures: Real-time inventory management, order tracking, and admin dashboard\nTech Stack: React.js, Node.js, Express.js, PostgreSQL, Stripe API, Redis\nDeployed on AWS with CI/CD pipeline using GitHub Actions\nAchieved 95% test coverage and handled 1000+ concurrent users\n\nSocial Media Dashboard\nDeveloped analytics dashboard for social media management with real-time data visualization\nImplemented data fetching from multiple APIs (Twitter, Instagram, Facebook)\nFeatures: Custom charts, export functionality, and responsive design\nTech Stack: React.js, Chart.js, Python Flask, MongoDB\nOpen-sourced on GitHub with 150+ stars",
        },
        {
          id: "2",
          title: "Achievements & Recognition",
          content:
            "Winner - Google Code Jam 2024 (Top 1000 globally out of 100,000+ participants)\nAWS Certified Cloud Practitioner (2024)\nMicrosoft Azure Fundamentals Certified (2024)\nLeetCode: 500+ problems solved with 90%+ accuracy\nGitHub: 25+ public repositories with 200+ combined stars\nPresident - Computer Science Club (Led 150+ members and organized 20+ tech workshops)\nDean's List - 8 consecutive semesters (GPA: 3.8/4.0)",
        },
      ],
    },
    "premium-universal": {
      personalInfo: {
        fullName: "Jordan Smith",
        email: "jordan.smith@email.com",
        phone: "+1 (555) 789-0123",
        location: "Denver, CO",
        title: "Business Analyst",
        summary:
          "Detail-oriented business analyst with strong analytical skills and proven track record of translating complex business requirements into actionable insights. Experienced in data analysis, process improvement, and cross-functional collaboration.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Tech Solutions Corp",
          position: "Business Analyst",
          startDate: "2021-03",
          endDate: "",
          current: true,
          description:
            "Analyze business processes and identify areas for improvement\nCollaborate with stakeholders to gather and document requirements\nCreate detailed reports and presentations for senior management\nLead implementation of new CRM system affecting 200+ users",
        },
        {
          id: "2",
          company: "Consulting Group LLC",
          position: "Junior Analyst",
          startDate: "2019-06",
          endDate: "2021-02",
          current: false,
          description:
            "Conducted market research and competitive analysis\nDeveloped financial models and forecasts\nSupported senior analysts on client projects",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Colorado",
          degree: "Bachelor of Business Administration",
          field: "Business Analytics",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: buildSkills(
        "premium-universal",
        [
          "Data Analysis",
          "SQL",
          "Excel",
          "Tableau",
          "Power BI",
          "Process Mapping",
          "Requirements Gathering",
          "Project Management",
        ],
        [8, 8, 9, 7, 7, 8, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications",
          content:
            "Certified Business Analysis Professional (CBAP)\nGoogle Data Analytics Professional Certificate",
        },
      ],
    },
    "premium-pro": {
      personalInfo: {
        fullName: "Alexandra Martinez",
        email: "alexandra.martinez@email.com",
        phone: "+1 (555) 890-1234",
        location: "Boston, MA",
        title: "Marketing Manager",
        summary:
          "Strategic marketing professional with 7+ years of experience driving brand growth and customer engagement. Expertise in digital marketing, campaign management, and data-driven decision making. Proven track record of increasing ROI and building strong customer relationships.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "TechBrand Solutions",
          position: "Senior Marketing Manager",
          startDate: "2021-01",
          endDate: "",
          current: true,
          description:
            "Lead integrated marketing campaigns resulting in 45% increase in qualified leads\nManage $2M annual marketing budget across digital and traditional channels\nDevelop and execute content strategy increasing website traffic by 60%\nCollaborate with sales team to optimize lead nurturing and conversion",
        },
        {
          id: "2",
          company: "Creative Agency Inc",
          position: "Marketing Specialist",
          startDate: "2018-03",
          endDate: "2020-12",
          current: false,
          description:
            "Managed social media strategy across multiple platforms\nDeveloped email marketing campaigns with 25% open rate improvement\nCoordinated events and product launches",
        },
      ],
      education: [
        {
          id: "1",
          school: "Boston University",
          degree: "Master of Business Administration",
          field: "Marketing",
          startDate: "2016-09",
          endDate: "2018-05",
        },
        {
          id: "2",
          school: "University of Massachusetts",
          degree: "Bachelor of Science",
          field: "Communications",
          startDate: "2012-09",
          endDate: "2016-05",
        },
      ],
      skills: buildSkills(
        "premium-pro",
        [
          "Digital Marketing",
          "SEO & SEM",
          "Google Analytics",
          "Marketing Automation",
          "Content Strategy",
          "Social Media Marketing",
          "Brand Management",
          "Campaign Management",
        ],
        [9, 8, 8, 8, 9, 8, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications",
          content:
            "Google Ads Certification\nHubSpot Content Marketing Certification\nFacebook Blueprint Certification",
        },
      ],
    },
    "fresher-elite": {
      personalInfo: {
        fullName: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        location: "Mumbai, India",
        title: "Computer Science Graduate",
        summary:
          "Passionate computer science graduate with strong foundation in software development and problem-solving. Experienced in building full-stack web applications and eager to contribute to innovative technology solutions. Quick learner with excellent collaboration skills.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "TechStart Solutions",
          position: "Software Development Intern",
          startDate: "2024-01",
          endDate: "2024-06",
          current: false,
          description:
            "Developed RESTful APIs using Node.js and Express, serving 10,000+ users\nBuilt responsive frontend components with React and TypeScript\nImplemented unit tests achieving 85% code coverage\nCollaborated with team of 5 developers using Agile methodology",
        },
        {
          id: "2",
          company: "College Tech Club",
          position: "Technical Lead",
          startDate: "2023-07",
          endDate: "2024-05",
          current: false,
          description:
            "Led team of 12 members in organizing coding workshops and hackathons\nMentored 30+ junior students in web development and DSA\nOrganized college tech fest with 500+ participants",
        },
      ],
      education: [
        {
          id: "1",
          school: "Indian Institute of Technology",
          degree: "Bachelor of Technology",
          field: "Computer Science",
          startDate: "2020-08",
          endDate: "2024-06",
        },
      ],
      skills: buildSkills(
        "fresher-elite",
        [
          "JavaScript",
          "React.js",
          "Node.js",
          "Python",
          "SQL",
          "Git",
          "MongoDB",
          "TypeScript",
          "HTML/CSS",
          "REST APIs",
        ],
        [9, 9, 8, 8, 8, 9, 7, 8, 9, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Academic Projects",
          content:
            "E-Learning Platform (Final Year Project)\nDeveloped full-stack online learning platform with video streaming and live chat\nBuilt with MERN stack, Redis for caching, and AWS S3 for video storage\nImplemented JWT authentication and role-based access control\nAchieved 95% project grade and presented at college symposium\n\nReal-Time Chat Application\nBuilt scalable chat app using Socket.io, React, and Node.js\nImplemented features: group chats, file sharing, message encryption\nDeployed on Heroku with MongoDB Atlas database\n\nAI-Powered Resume Analyzer\nCreated ML model to analyze resumes and provide improvement suggestions\nUsed Python, NLP, and Flask for backend API\nAchieved 88% accuracy in keyword detection",
        },
        {
          id: "2",
          title: "Achievements",
          content:
            "🏆 Winner - Smart India Hackathon 2023 (National Level)\n🏆 1st Place - College Code Sprint 2023\n⭐ LeetCode: Solved 350+ problems, Contest Rating: 1650+\n⭐ CodeChef: 4-star coder (Max Rating: 1820)\n📜 AWS Certified Cloud Practitioner (2024)\n📜 Google Cloud Associate Engineer (2024)\n🎓 Dean's List - All 8 semesters (CGPA: 9.2/10)",
        },
      ],
    },
    analyst: {
      personalInfo: {
        fullName: "Herman Walton",
        email: "example@gmail.com",
        phone: "(412) 479-6342",
        location: "Market Street 12, New York, 1021, The USA",
        title: "Financial Analyst",
        summary:
          "Experienced and driven Financial Analyst with an impressive background of managing multi-million dollar budgets while providing analysis and account support within product development departments. Worked to reduce business expenses and develop logical and advantageous operating plan budgets. Experience creating quarterly accruals based on trends and forecasted expenses.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "GEO Corp.",
          position: "Financial Analyst",
          startDate: "Jan 2012",
          endDate: "",
          current: true,
          description:
            "Created budgets and ensured that labor and material costs were decreased by 15 percent.\nCreated financial reports on completed projects, indicating advantageous results.\nGenerated financial statements including cash flow charts and balance sheets.\nCreated analysis and performance reports for management teams to review.\nIntroduced and implemented a different type of software to enhance communication of different organization.",
        },
        {
          id: "2",
          company: "Cisco Enterprises",
          position: "Financial Analyst",
          startDate: "Feb 2008",
          endDate: "Dec 2012",
          current: false,
          description:
            "Provide reports, ad-hoc analysis, annual operations plan budgets, monthly cash forecasts, and revenue forecasts.\nAnalyzed supplier contracts and advised in negotiations bringing budgets down by 6%.\nCreated weekly labor finance reports and presented the results to management.",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Arizona",
          degree: "Diploma in Computer Engineering",
          field: "",
          startDate: "Aug 2006",
          endDate: "Oct 2008",
        },
        {
          id: "2",
          school: "University of Arizona",
          degree: "Bachelor in Computer Engineering",
          field: "",
          startDate: "Aug 2004",
          endDate: "Oct 2006",
        },
      ],
      skills: buildSkills(
        "analyst",
        [
          "Solution Strategies",
          "Analytical Thinker",
          "Innovation",
          "Agile Methodologies",
          "Effective Team leader",
          "Market Assessment",
          "Collaboration",
          "Creative Problem Solving",
          "Customer-centric Selling",
          "Trend Analysis",
          "Source Control",
          "Networking",
        ],
        [9, 9, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Additional Information",
          content:
            "Languages: English, French\nCertificates: Financial Analyst License\nAwards/Activities: Most Innovate Employer of the Year (2011), Overall Best Employee Division Two (2009)",
        },
      ],
    },
    elite: {
      personalInfo: {
        fullName: "Victoria Sterling",
        email: "v.sterling@professional.com",
        phone: "+1 (555) 789-0123",
        location: "Seattle, WA",
        title: "Executive Business Consultant",
        summary:
          "Strategic business consultant with 12+ years of experience driving transformational change and delivering measurable results for Fortune 500 companies. Specialized in operational excellence, change management, and strategic planning. Proven track record of leading cross-functional teams and implementing solutions that increase revenue and reduce costs.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Global Consulting Partners",
          position: "Senior Business Consultant",
          startDate: "Mar 2019",
          endDate: "",
          current: true,
          description:
            "Lead strategic initiatives for enterprise clients with annual revenues exceeding $1B\nDeveloped and implemented operational strategies resulting in 35% efficiency improvement\nManaged portfolio of 8 concurrent client engagements with 100% satisfaction rating\nMentored team of 12 junior consultants and facilitated professional development programs\nPresented findings and recommendations to C-suite executives and board members",
        },
        {
          id: "2",
          company: "Strategic Solutions Inc",
          position: "Business Analyst & Consultant",
          startDate: "Jun 2015",
          endDate: "Feb 2019",
          current: false,
          description:
            "Conducted comprehensive business analysis and market research for clients across multiple industries\nDesigned and executed change management strategies for organizational restructuring\nFacilitated stakeholder workshops and strategy sessions with executive leadership\nDeveloped data-driven recommendations that increased client profitability by average of 28%",
        },
        {
          id: "3",
          company: "Innovation Corp",
          position: "Junior Business Analyst",
          startDate: "Sep 2012",
          endDate: "May 2015",
          current: false,
          description:
            "Analyzed business processes and identified opportunities for optimization\nCreated detailed reports and presentations for senior management\nCollaborated with IT teams to implement process automation solutions\nSupported senior consultants in client-facing engagements and project delivery",
        },
      ],
      education: [
        {
          id: "1",
          school: "Harvard Business School",
          degree: "Master of Business Administration",
          field: "Strategy & Operations",
          startDate: "2010-09",
          endDate: "2012-06",
        },
        {
          id: "2",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Business Administration",
          startDate: "2006-09",
          endDate: "2010-06",
        },
      ],
      skills: buildSkills(
        "elite",
        [
          "Strategic Planning",
          "Change Management",
          "Business Analysis",
          "Project Management",
          "Stakeholder Engagement",
          "Process Optimization",
          "Financial Modeling",
          "Data Analytics",
          "Leadership & Mentoring",
          "Executive Presentations",
          "Risk Management",
          "Agile Methodologies",
        ],
        [10, 9, 9, 9, 9, 8, 8, 8, 9, 9, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications & Awards",
          content:
            "Project Management Professional (PMP) - PMI Certified\nCertified Management Consultant (CMC) - Institute of Management Consultants\nLean Six Sigma Black Belt\nConsultant of the Year Award 2022 - Global Consulting Partners\nTop 40 Under 40 Business Leaders - Seattle Business Journal 2021",
        },
        {
          id: "2",
          title: "Speaking & Publications",
          content:
            "Keynote Speaker - Annual Business Transformation Summit 2023\nPublished Article: 'Digital Transformation in Enterprise' - Harvard Business Review\nGuest Lecturer - University of Washington Business School (2020-Present)\nPanelist - Women in Leadership Conference 2022",
        },
      ],
    },
    "corporate-executive": {
      personalInfo: {
        fullName: "Robert Anderson",
        email: "r.anderson@executive.com",
        phone: "+1 (555) 890-1234",
        location: "New York, NY",
        title: "Chief Operating Officer",
        summary:
          "Results-driven executive leader with 18+ years of experience driving organizational excellence and strategic growth initiatives. Proven expertise in operations management, business transformation, and P&L leadership. Successfully scaled operations for Fortune 500 companies while maintaining focus on efficiency, innovation, and sustainable growth.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "TechVision Corp",
          position: "Chief Operating Officer",
          startDate: "2020-01",
          endDate: "",
          current: true,
          description:
            "Lead operational strategy and execution for $2B+ technology enterprise with 3,500+ employees across 15 global locations\nDrive digital transformation initiatives resulting in 40% operational efficiency improvement and $50M annual cost savings\nOversee cross-functional teams including product development, supply chain, customer success, and business operations\nPartner with CEO and board on strategic planning, M&A activities, and long-term growth strategies\nImplement data-driven decision frameworks and KPI dashboards for executive leadership team",
        },
        {
          id: "2",
          company: "Global Systems Inc",
          position: "Senior Vice President of Operations",
          startDate: "2015-06",
          endDate: "2019-12",
          current: false,
          description:
            "Managed operations for $800M division with 1,200+ employees across multiple business units\nLed operational excellence program achieving 35% improvement in process efficiency metrics\nSuccessfully integrated 3 strategic acquisitions totaling $200M in combined revenue\nBuilt high-performing leadership team and established succession planning framework\nReduced operating costs by 25% while improving customer satisfaction scores by 30%",
        },
        {
          id: "3",
          company: "Enterprise Solutions LLC",
          position: "Director of Business Operations",
          startDate: "2010-03",
          endDate: "2015-05",
          current: false,
          description:
            "Directed business operations for fast-growing SaaS company scaling from $50M to $300M revenue\nDeveloped and executed operational strategies supporting 500% revenue growth over 5 years\nEstablished operational infrastructure including systems, processes, and organizational structure\nLed cross-functional initiatives spanning sales operations, customer success, and product delivery",
        },
      ],
      education: [
        {
          id: "1",
          school: "Harvard Business School",
          degree: "Master of Business Administration",
          field: "Strategy & Operations",
          startDate: "2008-09",
          endDate: "2010-05",
        },
        {
          id: "2",
          school: "University of Michigan",
          degree: "Bachelor of Science",
          field: "Industrial Engineering",
          startDate: "2004-09",
          endDate: "2008-05",
        },
      ],
      skills: buildSkills(
        "corporate-executive",
        [
          "Strategic Leadership",
          "Operations Management",
          "P&L Management",
          "Business Transformation",
          "Change Leadership",
          "Team Building",
          "Process Optimization",
          "M&A Integration",
          "Financial Planning",
          "Data Analytics",
          "Board Relations",
          "Executive Communication",
        ],
        [10, 10, 9, 9, 9, 9, 8, 8, 8, 8, 9, 9],
      ),
      sections: [
        {
          id: "1",
          title: "Board & Advisory Roles",
          content:
            "Board Member - TechGrowth Foundation (2022-Present)\nAdvisory Board - StartupScale Accelerator (2021-Present)\nMentor - Executive Leadership Program at Columbia Business School",
        },
        {
          id: "2",
          title: "Recognition & Awards",
          content:
            "COO of the Year - Tech Leadership Awards 2023\nTop 50 Most Influential Executives - Business Quarterly 2022\n40 Under 40 - Business Excellence Magazine 2018\nPublished: 'Operational Excellence in the Digital Age' - Harvard Business Review",
        },
      ],
    },
  };

  return templates[templateId] || templates.professional;
};

const formatTemplateName = (id?: string) => {
  if (!id) return "Professional";
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const Editor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const { user } = useFirebaseAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    getTemplateDefaults(templateId || "professional"),
  );
  const [themeColor, setThemeColor] = useState<string>(() => {
    const saved = localStorage.getItem(`theme-${templateId}`);
    if (saved) return saved;

    const defaultThemeColors: Record<string, string> = {
      senior: "#0f766e",
      "senior-frontend": "#ec4899",
      "senior-backend": "#2563eb",
      software: "#2563eb",
      "premium-fresher": "#7C3AED",
      analyst: "#2563eb",
      elite: "#7c3aed",
    };

    return defaultThemeColors[templateId || ""] || "#7c3aed"; // default purple
  });
  const [atsReport, setAtsReport] = useState<AtsReport | null>(null);
  const [atsDialogOpen, setAtsDialogOpen] = useState(false);
  const [atsLoading, setAtsLoading] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);

  // Register fonts for PDF generation
  useEffect(() => {
    registerPDFFonts();
  }, []);

  // Load from local storage on mount
  useEffect(() => {
    if (!templateId) return;
    const key = `resume-${templateId}`;
    const savedData = localStorage.getItem(key);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as ResumeData;
        const badSummary = /8\+\s*years|financial analyst/i.test(
          parsed?.personalInfo?.summary || "",
        );
        const isFresherTemplate =
          templateId === "starter" || templateId === "graduate";

        if (Array.isArray(parsed.skills)) {
          const first = parsed.skills[0] as unknown;
          if (typeof first === "string") {
            parsed.skills = buildSkills(
              templateId,
              (parsed.skills as unknown as string[]).map((skill) =>
                String(skill),
              ),
            );
          } else {
            parsed.skills = parsed.skills.map((skill, index) => {
              const coercedLevel = Math.min(
                10,
                Math.max(1, Number(skill.level ?? 10 - index) || 7),
              );

              const category: "core" | "toolbox" =
                skill.category === "core" || skill.category === "toolbox"
                  ? skill.category
                  : index < 6
                    ? "core"
                    : "toolbox";

              return {
                id: skill.id || `${templateId}-skill-${index}`,
                name: skill.name,
                level: coercedLevel,
                category,
              };
            });
          }
        }

        if (isFresherTemplate && badSummary) {
          const defaults = getTemplateDefaults(templateId);
          setResumeData(defaults);
          localStorage.setItem(key, JSON.stringify(defaults));
        } else {
          setResumeData(parsed);
        }
      } catch (error) {
        console.error("Error loading resume data:", error);
        setResumeData(getTemplateDefaults(templateId));
      }
    } else {
      // Set template defaults if no saved data
      setResumeData(getTemplateDefaults(templateId));
    }
  }, [templateId]);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (templateId && resumeData.personalInfo.fullName) {
      localStorage.setItem(`resume-${templateId}`, JSON.stringify(resumeData));
    }
  }, [resumeData, templateId]);

  // Save theme color to local storage
  useEffect(() => {
    if (templateId) {
      localStorage.setItem(`theme-${templateId}`, themeColor);
    }
  }, [themeColor, templateId]);

  // Load resume from Firestore if resumeId exists
  useEffect(() => {
    const loadResumeFromFirestore = async () => {
      if (!resumeId || !user) return;

      try {
        const firestoreResume = await firestoreService.getResume(resumeId);
        if (firestoreResume) {
          // Convert Firestore resume data to Editor resume data format
          const editorResumeData: ResumeData = {
            personalInfo: {
              fullName: firestoreResume.personalInfo.fullName,
              email: firestoreResume.personalInfo.email,
              phone: firestoreResume.personalInfo.phone,
              location: firestoreResume.personalInfo.location,
              title: firestoreResume.personalInfo.professionalTitle,
              summary: firestoreResume.personalInfo.bio,
              photo: firestoreResume.personalInfo.profilePhoto,
            },
            experience: firestoreResume.experience.map(exp => ({
              id: exp.id,
              company: exp.company,
              position: exp.position,
              startDate: exp.startDate,
              endDate: exp.endDate,
              description: exp.description,
              current: exp.current,
            })),
            education: firestoreResume.education.map(edu => ({
              id: edu.id,
              school: edu.institution,
              degree: edu.degree,
              field: edu.field,
              startDate: edu.startDate,
              endDate: edu.endDate,
            })),
            skills: firestoreResume.skills.map((skill, index) => ({
              id: skill.id,
              name: skill.name,
              level: 8,
              category: index < 6 ? "core" : "toolbox",
            })),
            sections: [],
          };
          setResumeData(editorResumeData);
        }
      } catch (error) {
        console.error("Error loading resume from Firestore:", error);
        toast.error("Failed to load resume");
      }
    };

    loadResumeFromFirestore();
  }, [resumeId, user]);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save your resume");
      return;
    }

    if (!templateId) {
      toast.error("Template ID is missing");
      return;
    }

    setIsSaving(true);
    try {
      // Convert Editor resume data to Firestore format
      const firestoreData: Omit<FirestoreResumeData, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
        templateId,
        personalInfo: {
          fullName: resumeData.personalInfo.fullName,
          email: resumeData.personalInfo.email,
          phone: resumeData.personalInfo.phone,
          location: resumeData.personalInfo.location,
          linkedinUrl: "",
          githubUrl: "",
          portfolioUrl: "",
          professionalTitle: resumeData.personalInfo.title,
          bio: resumeData.personalInfo.summary,
          profilePhoto: resumeData.personalInfo.photo || "",
        },
        experience: resumeData.experience.map(exp => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          location: "",
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          description: exp.description,
        })),
        education: resumeData.education.map(edu => ({
          id: edu.id,
          institution: edu.school,
          degree: edu.degree,
          field: edu.field,
          location: "",
          startDate: edu.startDate,
          endDate: edu.endDate,
          current: false,
          gpa: "",
          description: "",
        })),
        skills: resumeData.skills.map(skill => ({
          id: skill.id,
          name: skill.name,
        })),
        projects: [],
        certifications: [],
        languages: [],
      };

      if (currentResumeId) {
        // Update existing resume
        await firestoreService.updateResume(currentResumeId, firestoreData);
        toast.success("Resume updated successfully!");
      } else {
        // Create new resume
        const newResumeId = await firestoreService.saveResume(user.uid, firestoreData);
        setCurrentResumeId(newResumeId);
        toast.success("Resume saved successfully!");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Select the appropriate PDF template
      const pdfTemplates = {
        professional: ProfessionalPDF,
        modern: ModernPDF,
        minimal: MinimalPDF,
        executive: ExecutivePDF,
        frontend: FrontendPDF,
        fullstack: FullstackPDF,
        backend: BackendPDF,
        graduate: GraduatePDF,
        starter: StarterPDF,
        fresher: FresherPDF,
        "premium-fresher": PremiumFresherPDF,
        senior: SeniorPDF,
        "senior-frontend": SeniorFrontendPDF,
        "senior-backend": SeniorBackendPDF,
        software: SoftwarePDF,
        "premium-universal": PremiumUniversalPDF,
        "premium-pro": PremiumProPDF,
        "fresher-elite": FresherElitePDF,
        analyst: AnalystPDF,
        elite: ElitePDF,
        "corporate-executive": CorporateExecutivePDF,
        refined: RefinedPDF,
        "premium-elite": PremiumElitePDF,
      };

      const PDFTemplate =
        pdfTemplates[templateId as keyof typeof pdfTemplates] ||
        ProfessionalPDF;

      // Generate PDF blob
      const blob = await pdf(
        <PDFTemplate resumeData={resumeData} themeColor={themeColor} />,
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);

      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resume");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleResetForm = () => {
    if (!templateId) return;
    
    // Clear localStorage
    const key = `resume-${templateId}`;
    localStorage.removeItem(key);
    
    // Reset to template defaults
    const defaultData = getTemplateDefaults(templateId);
    setResumeData(defaultData);
    
    // Close dialog
    setResetDialogOpen(false);
    
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const runAtsCheck = useCallback(() => {
    setAtsLoading(true);
    requestAnimationFrame(() => {
      const report = analyzeResumeForATS(resumeData, { templateId });
      setAtsReport(report);
      setAtsDialogOpen(true);
      setAtsLoading(false);
    });
  }, [resumeData, templateId]);

  const renderScoreRing = useCallback(
    (score: number) => {
      const percent = Math.max(0, Math.min(100, (score / 10) * 100));
      const radius = 16;
      const circumference = 2 * Math.PI * radius;
      const dashOffset = circumference * (1 - percent / 100);

      return (
        <svg viewBox="0 0 36 36" className="h-10 w-10">
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="#e2e8f0"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke={themeColor}
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
          <text
            x="18"
            y="20"
            textAnchor="middle"
            fontSize="10"
            fontFamily="Inter"
            fontWeight="600"
            fill="#1f2937"
          >
            {percent.toFixed(0)}%
          </text>
        </svg>
      );
    },
    [themeColor],
  );

  const renderMetricRing = useCallback(
    (ratio: number) => {
      const percent = Math.max(0, Math.min(100, ratio * 100));
      const radius = 14;
      const circumference = 2 * Math.PI * radius;
      const dashOffset = circumference * (1 - percent / 100);

      return (
        <svg viewBox="0 0 36 36" className="h-9 w-9">
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke="#e2e8f0"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke={themeColor}
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
          <text
            x="18"
            y="20"
            textAnchor="middle"
            fontSize="9"
            fontFamily="Inter"
            fontWeight="600"
            fill="#1f2937"
          >
            {percent.toFixed(0)}%
          </text>
        </svg>
      );
    },
    [themeColor],
  );

  const templateMeta = templateMetaMap[templateId || ""];
  const templateDisplayName =
    templateMeta?.name || formatTemplateName(templateId);
  const categorySlug = templateMeta?.categorySlug || "software";
  const categoryLabel =
    categoryLabelMap[categorySlug] || templateMeta?.category || "Templates";

  const editorBreadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: templateDisplayName },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Fixed Header Section */}
      <div className="sticky top-0 z-50 bg-background border-b border-border/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Left Section: Back button and Title */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="border-l border-border h-8" />
              <div>
                <h1 className="text-lg font-semibold text-primary">Form Editor</h1>
                <p className="text-xs text-muted-foreground">Fill in your information below</p>
              </div>
            </div>

            {/* Right Section: Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <Tabs value="form" onValueChange={(v) => v === "live" && navigate(`/live-editor/${templateId}`)} className="hidden md:block">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="live" className="gap-2">
                    <Edit3 className="h-4 w-4" />
                    Live Editor
                  </TabsTrigger>
                  <TabsTrigger value="form" className="gap-2">
                    <FileEdit className="h-4 w-4" />
                    Form Editor
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/live-editor/${templateId}`)}
                className="md:hidden"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Switch to Live
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border">
                <label htmlFor="themeColor" className="text-sm font-medium whitespace-nowrap">
                  Theme:
                </label>
                <input
                  id="themeColor"
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="h-8 w-12 cursor-pointer rounded border border-border"
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving || !user}
                size="default"
                variant="outline"
                className="gap-2 shadow-md"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </Button>

              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                size="default"
                className="gap-2 shadow-md"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ATS Dialog */}
      <Dialog open={atsDialogOpen} onOpenChange={setAtsDialogOpen}>
        <DialogContent className="max-w-3xl sm:max-h-[80vh]">
                {atsReport ? (
                  <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1">
                    <DialogHeader>
                      <DialogTitle>ATS Readiness Report</DialogTitle>
                      <DialogDescription>{atsReport.summary}</DialogDescription>
                    </DialogHeader>
                    <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            Overall Score
                          </p>
                          <p className="text-3xl font-semibold text-foreground">
                            {atsReport.score.toFixed(1)} /{" "}
                            {atsReport.maxScore.toFixed(0)}
                          </p>
                        </div>
                        <div className="w-full sm:max-w-[180px]">
                          <Progress
                            value={(atsReport.score / atsReport.maxScore) * 100}
                            className="h-2"
                          />
                          <p
                            className={`mt-2 text-sm font-medium ${gradeMap[atsReport.grade].tone}`}
                          >
                            {gradeMap[atsReport.grade].label}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/60 bg-white">
                      <table className="w-full border-collapse text-xs text-muted-foreground">
                        <thead className="bg-muted/40 text-foreground">
                          <tr>
                            <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.2em]">
                              Criteria
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.2em]">
                              Score /10
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.2em]">
                              What we checked
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.2em]">
                              Improvement
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {atsReport.metrics.map((metric) => (
                            <tr
                              key={metric.id}
                              className="border-t border-border/50"
                            >
                              <td className="px-4 py-3 font-medium text-foreground">
                                {metric.label}
                              </td>
                              <td className="px-4 py-3 text-foreground/80">
                                <div className="flex items-center gap-2">
                                  <div className="h-9 w-9">
                                    {renderMetricRing(metric.ratio)}
                                  </div>
                                  <span className="text-sm font-semibold">
                                    {(metric.ratio * 10).toFixed(1)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3">{metric.detail}</td>
                              <td className="px-4 py-3 text-foreground">
                                {metric.recommendation ||
                                  (metric.passed
                                    ? "On track"
                                    : "Add more detail here.")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {atsReport.missingKeywords.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          Suggested Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {atsReport.missingKeywords.map((keyword) => (
                            <Badge
                              key={keyword}
                              variant="secondary"
                              className="capitalize"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {atsReport.keywordHits.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          Recognized Keywords
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {atsReport.keywordHits.map((keyword) => (
                            <Badge
                              key={keyword}
                              variant="outline"
                              className="capitalize"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <DialogHeader>
                    <DialogTitle>Run an ATS check</DialogTitle>
                    <DialogDescription>
                      Generate an ATS readiness report to see how well this
                      resume will parse in applicant tracking systems.
                    </DialogDescription>
                  </DialogHeader>
                )}
              </DialogContent>
            </Dialog>

            {/* Reset Confirmation Dialog */}
            <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Reset Form</DialogTitle>
                  <DialogDescription>
                    This will replace all your current data with the original template defaults. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setResetDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleResetForm}
                  >
                    <RotateCcw className="mr-2 h-3 w-3" />
                    Reset Form
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

      {/* Editor Layout */}
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-6">
        <div className="grid gap-4 max-w-8xl mx-auto lg:grid-cols-[37%,63%] lg:gap-6">
          {/* Form Section */}
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto space-y-6 rounded-2xl border border-border/50 bg-background px-4 py-5 shadow-sm sm:px-6 sm:py-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Edit Your Resume</h2>
              {/* <p className="text-sm text-muted-foreground">
                Fill in your information and watch your resume update in
                real-time
              </p> */}
            </div>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-32 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="space-y-4 rounded-2xl border border-border/50 bg-background px-4 py-5 shadow-sm sm:px-6 sm:py-6">
              <h2 className="text-lg font-bold">Live Preview</h2>
              <div className="border-2 border-border rounded-xl overflow-hidden shadow-premium bg-white">
                <ResumePreview
                  resumeData={resumeData}
                  templateId={templateId || "professional"}
                  themeColor={themeColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
