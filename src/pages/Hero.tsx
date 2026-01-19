import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Zap, TrendingUp, Shield, Award, Clock, Globe, Target, Palette, Mail, Eye, Download, Phone, MapPin, Check, X, Crown, Wand2, Upload, Linkedin, Infinity, MessageSquare, FileSearch, BrainCircuit, Mic, Send, Bot, ClipboardCheck, FileUp, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TemplatePreviewV2 } from "@/v2/components/TemplatePreviewV2";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getAllTemplates, getTemplateConfig } from "@/v2/config/templates";
import { ElegantForm } from "@/v2/components/form/ElegantForm";
import type { V2ResumeData } from "@/v2/types/resumeData";

const DEFAULT_THEME_COLOR = "#2563eb";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { StyleOptionsProvider } from "@/contexts/StyleOptionsContext";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { ResumeRenderer } from "@/v2/components/ResumeRenderer";
import { convertV1ToV2 } from "@/v2/utils/dataConverter";
import { generatePDFFromPreview } from "@/lib/pdfGenerator";
import { cn } from "@/lib/utils";
import { useAppStats } from "@/hooks/useAppStats";
import { formatCount, incrementDownloadsCount } from "@/lib/firestore/statsService";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Users } from "lucide-react";
import type { ResumeData } from "@/types/resume";
import { TrialBanner } from "@/components/TrialBanner";


const Hero = () => {
  const navigate = useNavigate();
  const v2Templates = getAllTemplates();
  
  // Featured templates - show first 4 templates
  const defaultColors = ['#2563eb', '#7c3aed', '#059669', '#e11d48'];
  const featuredTemplates = v2Templates.slice(0, 4).map((template, index) => ({
    id: template.id,
    name: template.name,
    description: template.description || 'Professional resume template',
    color: template.colors?.primary || defaultColors[index % defaultColors.length],
  }));

  // Get real-time stats from Firestore
  const { stats, loading: statsLoading } = useAppStats();

  // State for interactive demo form
  const [demoFormData, setDemoFormData] = useState({
    fullName: "Emily Chen",
    email: "emily.chen@gmail.com",
    phone: "+1 (628) 555-0147",
    location: "New York, NY",
    summary: "Full-stack developer with 4+ years of experience building web applications. Proficient in modern JavaScript frameworks and passionate about creating intuitive user experiences.",
    jobTitle: "Software Engineer",
    company: "Google",
    startDate: "2022-03",
    endDate: "",
    description: "Building and maintaining internal tools used by 5,000+ employees. Reduced page load times by 50% through performance optimizations.",
    skills: ["JavaScript", "React", "Python", "Go", "Kubernetes"]
  });

  // Separate state for skills input - initialize with existing skills
  const [skillsInput, setSkillsInput] = useState("JavaScript, React, Python, Go, Kubernetes");
  const [previewScale, setPreviewScale] = useState(0.6);
  const [previewHeight, setPreviewHeight] = useState(1120);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const previewContentRef = useRef<HTMLDivElement | null>(null);

  // Template config for form editor demo
  const demoTemplateId = "professional-blue-v2";
  const demoTemplateConfig = getTemplateConfig(demoTemplateId);
  const demoThemeColor = DEFAULT_THEME_COLOR;

  // State for Form Editor Demo in V2ResumeData format
  const [formEditorData, setFormEditorData] = useState<V2ResumeData>(() => ({
    version: '2.0',
    personalInfo: {
      fullName: "David Martinez",
      email: "david.martinez@outlook.com",
      phone: "+1 (512) 555-0198",
      location: "Austin, TX",
      title: "Product Manager",
      linkedin: "linkedin.com/in/davidmartinez",
      summary: "Data-driven product manager with 5+ years of experience launching B2B SaaS products. Skilled at translating customer needs into product requirements and collaborating with engineering teams to deliver impactful solutions."
    },
    experience: [
      {
        id: "exp-0",
        position: "Senior Product Manager",
        company: "Salesforce",
        startDate: "2021-06",
        endDate: "",
        current: true,
        description: "",
        bulletPoints: [
          "Led product roadmap for analytics platform serving 50,000+ enterprise customers",
          "Increased feature adoption by 35% through data-driven UX improvements",
          "Collaborated with 3 engineering teams to deliver quarterly product releases"
        ]
      },
      {
        id: "exp-1",
        position: "Product Manager",
        company: "HubSpot",
        startDate: "2019-01",
        endDate: "2021-05",
        current: false,
        description: "",
        bulletPoints: [
          "Launched email automation features generating $8M in new ARR",
          "Conducted 100+ customer interviews to identify product opportunities",
          "Reduced customer churn by 20% through improved onboarding flows"
        ]
      }
    ],
    education: [
      {
        id: "edu-0",
        school: "University of Texas at Austin",
        degree: "Master of Business Administration",
        field: "Technology Management",
        location: "Austin, TX",
        startDate: "2016-08",
        endDate: "2018-05"
      }
    ],
    skills: [
      { id: "skill-0", name: "Product Strategy", level: 10, category: "core" },
      { id: "skill-1", name: "User Research", level: 9, category: "core" },
      { id: "skill-2", name: "Agile/Scrum", level: 9, category: "core" },
      { id: "skill-3", name: "SQL", level: 8, category: "core" },
      { id: "skill-4", name: "Figma", level: 7, category: "toolbox" }
    ]
  }));

  // Template config for live editor demo
  const liveEditorTemplateId = "professional-blue-v2";
  const liveEditorTemplateConfig = getTemplateConfig(liveEditorTemplateId);
  const liveEditorThemeColor = DEFAULT_THEME_COLOR;

  // State for Live Editor in V2ResumeData format
  const [liveEditorData, setLiveEditorData] = useState<V2ResumeData>(() => ({
    version: '2.0',
    personalInfo: {
      fullName: "Sarah Johnson",
      email: "sarah.johnson@gmail.com",
      phone: "+1 (415) 555-0142",
      location: "San Francisco, CA",
      title: "Senior Software Engineer",
      linkedin: "linkedin.com/in/sarahjohnson",
      github: "github.com/sarahjdev",
      summary: "Results-driven software engineer with 6+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Passionate about writing clean, maintainable code and mentoring junior developers."
    },
    experience: [
      {
        id: "exp-0",
        position: "Senior Software Engineer",
        company: "Stripe",
        location: "San Francisco, CA",
        startDate: "2021-03",
        endDate: "",
        current: true,
        description: "",
        bulletPoints: [
          "Architected and built payment processing features handling $2B+ in transactions monthly",
          "Led migration of legacy services to microservices architecture, reducing latency by 40%",
          "Mentored 4 junior engineers and conducted 50+ technical interviews"
        ]
      },
      {
        id: "exp-1",
        position: "Software Engineer",
        company: "Airbnb",
        location: "San Francisco, CA",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description: "",
        bulletPoints: [
          "Developed search and filtering features improving booking conversion by 15%",
          "Built real-time messaging system serving 10M+ daily active users",
          "Collaborated with design team to implement accessible UI components"
        ]
      }
    ],
    education: [
      {
        id: "edu-0",
        school: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "Berkeley, CA",
        startDate: "2014-08",
        endDate: "2018-05",
        gpa: "3.8"
      }
    ],
    skills: [
      { id: "skill-0", name: "React", level: 10, category: "core" },
      { id: "skill-1", name: "TypeScript", level: 9, category: "core" },
      { id: "skill-2", name: "Node.js", level: 9, category: "core" },
      { id: "skill-3", name: "PostgreSQL", level: 8, category: "core" },
      { id: "skill-4", name: "AWS", level: 8, category: "core" },
      { id: "skill-5", name: "Docker", level: 7, category: "toolbox" },
      { id: "skill-6", name: "GraphQL", level: 7, category: "toolbox" },
      { id: "skill-7", name: "Redis", level: 7, category: "toolbox" }
    ],
    projects: [
      {
        id: "proj-0",
        name: "DevFlow CLI",
        role: "Creator & Maintainer",
        description: "Built a developer productivity CLI tool with 2,000+ GitHub stars that automates common development workflows",
        technologies: ["Go", "Cobra", "GitHub Actions"],
        techStack: ["Go", "Cobra", "GitHub Actions"],
        url: "github.com/sarahjdev/devflow",
        startDate: "2022-01",
        endDate: ""
      },
      {
        id: "proj-1",
        name: "Real-time Analytics Dashboard",
        role: "Lead Developer",
        description: "Developed a real-time analytics dashboard for monitoring application performance metrics",
        technologies: ["React", "D3.js", "WebSocket", "Node.js"],
        techStack: ["React", "D3.js", "WebSocket", "Node.js"],
        startDate: "2021-06",
        endDate: "2021-12"
      }
    ],
    certifications: [
      {
        id: "cert-0",
        name: "AWS Solutions Architect - Professional",
        issuer: "Amazon Web Services",
        date: "2023-01",
        credentialId: "AWS-SAP-12345"
      },
      {
        id: "cert-1",
        name: "Google Cloud Professional Developer",
        issuer: "Google Cloud",
        date: "2022-06",
        credentialId: "GCP-PD-67890"
      }
    ],
    languages: [
      { id: "lang-0", language: "English", proficiency: "Native" },
      { id: "lang-1", language: "Spanish", proficiency: "Intermediate" }
    ],
    achievements: [
      { id: "ach-0", title: "Engineering Excellence Award", description: "Recognized for outstanding contributions to platform reliability", date: "2023" },
      { id: "ach-1", title: "Hackathon Winner", description: "1st place at Stripe Internal Hackathon for building an AI-powered code review tool", date: "2022" }
    ],
    interests: [
      { id: "int-0", name: "Open Source Development" },
      { id: "int-1", name: "Tech Blogging" },
      { id: "int-2", name: "Rock Climbing" },
      { id: "int-3", name: "Photography" }
    ]
  }));

  // Handlers for inline editing - matching builder functionality
  const handleAddBulletPoint = useCallback((expId: string) => {
    setLiveEditorData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === expId ? { ...exp, bulletPoints: [...(exp.bulletPoints || []), ''] } : exp
      )
    }));
  }, []);

  const handleRemoveBulletPoint = useCallback((expId: string, bulletIndex: number) => {
    setLiveEditorData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === expId
          ? { ...exp, bulletPoints: exp.bulletPoints.filter((_, i) => i !== bulletIndex) }
          : exp
      )
    }));
  }, []);

  const handleAddExperience = useCallback(() => {
    setLiveEditorData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: `exp-${Date.now()}`,
          position: 'New Position',
          company: 'Company Name',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          bulletPoints: []
        }
      ]
    }));
  }, []);

  const handleRemoveExperience = useCallback((expId: string) => {
    setLiveEditorData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== expId)
    }));
  }, []);

  const handleAddEducation = useCallback(() => {
    setLiveEditorData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: `edu-${Date.now()}`,
          school: 'School Name',
          degree: 'Degree',
          field: 'Field of Study',
          location: '',
          startDate: '',
          endDate: ''
        }
      ]
    }));
  }, []);

  const handleRemoveEducation = useCallback((eduId: string) => {
    setLiveEditorData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== eduId)
    }));
  }, []);

  const buttonBaseClass = "h-11 px-6 text-sm md:text-base font-semibold transition-all duration-300";
  const primaryButtonClass = cn(
    buttonBaseClass,
    "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl",
  );
  const neutralButtonClass = cn(
    buttonBaseClass,
    "border border-border/70 text-foreground hover:bg-muted/50 hover:text-foreground",
  );

  useEffect(() => {
    const baseWidth = 816;
    const minScale = 0.45;
    const maxScale = 1;

    const applyScale = (availableWidth: number) => {
      if (!availableWidth || Number.isNaN(availableWidth)) {
        return;
      }
      const width = Math.max(availableWidth, 280);
      const computedScale = Math.min(width / baseWidth, maxScale);
      setPreviewScale(Math.max(minScale, Number(computedScale.toFixed(3))));
    };

    if (typeof ResizeObserver !== "undefined") {
      const element = previewContainerRef.current;
      if (!element) {
        return;
      }

      const observer = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect?.width;
        if (width) {
          const styles = window.getComputedStyle(element);
          const horizontalPadding =
            parseFloat(styles.paddingLeft || "0") +
            parseFloat(styles.paddingRight || "0");
          applyScale(width - horizontalPadding);
        }
      });

      observer.observe(element);
      const styles = window.getComputedStyle(element);
      const horizontalPadding =
        parseFloat(styles.paddingLeft || "0") +
        parseFloat(styles.paddingRight || "0");
      applyScale(element.getBoundingClientRect().width - horizontalPadding);

      return () => observer.disconnect();
    }

    // Fallback for environments without ResizeObserver
    const handleResize = () => applyScale(window.innerWidth - 32);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const element = previewContentRef.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect?.height;
      if (height) {
        setPreviewHeight(height);
      }
    });

    observer.observe(element);
    setPreviewHeight(element.getBoundingClientRect().height);

    return () => observer.disconnect();
  }, []);


  const toMonthInputValue = useCallback((dateInput: string) => {
    if (!dateInput) {
      return "";
    }

    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${date.getFullYear()}-${month}`;
  }, []);

  const updateFormData = (field: string, value: string) => {
    setDemoFormData(prev => ({
      ...prev,
      [field]: field === 'skills' ? value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0) : value
    }));
  };

  const addSkill = (newSkill: string) => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !demoFormData.skills.includes(trimmedSkill)) {
      const updatedSkills = [...demoFormData.skills, trimmedSkill];
      setDemoFormData(prev => ({
        ...prev,
        skills: updatedSkills
      }));
      return true;
    }
    return false;
  };

  const removeSkill = (index: number) => {
    const updatedSkills = demoFormData.skills.filter((_, i) => i !== index);
    setDemoFormData(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  // Convert demo form data to ResumeData format
  const convertToResumeData = () => {
    return {
      personalInfo: {
        fullName: demoFormData.fullName,
        email: demoFormData.email,
        phone: demoFormData.phone,
        location: demoFormData.location,
        title: "Software Engineer",
        summary: demoFormData.summary
      },
      experience: [
        {
          id: "1",
          company: demoFormData.company,
          position: demoFormData.jobTitle,
          startDate: demoFormData.startDate,
          endDate: demoFormData.endDate || "",
          current: !demoFormData.endDate,
          description: demoFormData.description
        }
      ],
      education: [],
      skills: demoFormData.skills.map((skill, index) => ({
        id: `skill-${index}`,
        name: skill,
        level: Math.max(7, 10 - index),
        category: (index < 6 ? "core" : "toolbox") as "core" | "toolbox"
      })),
      sections: []
    };
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Trial Banner - Shows for non-Pro users when trials available */}
      <TrialBanner variant="compact" onClaimClick={() => navigate('/pricing?trial=true')} />

      {/* Hero Section - Inspired by Stripe, Linear, Vercel - Responsive */}
      <section className="relative min-h-screen lg:min-h-[90vh] flex items-center overflow-hidden py-8 sm:py-12 lg:py-0">
        {/* Subtle gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
              
              {/* Left Side - Content (6 columns on desktop) */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">

                {/* Minimal Badge - Responsive */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/30 text-[10px] sm:text-xs font-medium text-primary backdrop-blur-sm">
                  <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span>AI-Powered Resume Builder</span>
                </div>

                {/* Headline - Clean, impactful - Responsive */}
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
                    Build resumes that
                    <span className="block bg-gradient-to-r from-primary via-blue-600 to-blue-500 bg-clip-text text-transparent">
                      get you hired
                    </span>
                  </h1>

                  {/* Subheadline - Concise - Responsive */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                    AI-powered tools to enhance, tailor, and optimize your resume.
                    50+ professional templates. ATS-friendly formatting.
                  </p>
                </div>

                {/* CTA Buttons - Responsive */}
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2 sm:pt-4 items-center justify-center lg:justify-start">
                  <Button
                    className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group w-full sm:w-auto"
                    onClick={() => navigate("/templates")}
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 sm:h-12 px-5 sm:px-6 text-sm sm:text-base font-medium rounded-full border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300 group w-full sm:w-auto"
                    onClick={() => {
                      document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Sparkles className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>See AI Features</span>
                  </Button>
                </div>

                {/* Social Proof - Real stats with animation - Responsive */}
                <div className="flex items-center justify-center lg:justify-start pt-5 sm:pt-6 lg:pt-8 border-t border-border/40">
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Users count */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex -space-x-1.5 sm:-space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-background flex items-center justify-center text-[8px] sm:text-[10px] font-medium text-gray-600"
                          >
                            {['JD', 'AK', 'MR', 'SL'][i-1]}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="font-semibold text-foreground">
                          {statsLoading ? "..." : (
                            <AnimatedCounter
                              value={stats?.usersCount || 0}
                              duration={1500}
                              suffix="+"
                            />
                          )}
                        </span>
                        <span className="text-muted-foreground ml-1">users</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-6 sm:h-8 w-px bg-border/60" />

                    {/* Downloads count */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="font-semibold text-foreground">
                          {statsLoading ? "..." : (
                            <AnimatedCounter
                              value={stats?.downloadsCount || 0}
                              duration={1500}
                              suffix="+"
                            />
                          )}
                        </span>
                        <span className="text-muted-foreground ml-1">downloads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Stacked Resume Previews (6 columns) - Shows first on mobile */}
              <div className="lg:col-span-6 relative flex justify-center items-center py-2 sm:py-4 order-1 lg:order-2">
                {/* Background decorative elements - hidden on mobile for cleaner look */}
                <div className="absolute inset-0 overflow-hidden hidden lg:block">
                  <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-10 left-10 w-56 h-56 bg-blue-100/50 rounded-full blur-2xl" />
                  {/* Dot pattern */}
                  <div className="absolute top-20 left-8 grid grid-cols-4 gap-2 opacity-20">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                    ))}
                  </div>
                  <div className="absolute bottom-32 right-4 grid grid-cols-3 gap-2 opacity-20">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-[#1e3a5f]/40 rounded-full" />
                    ))}
                  </div>
                </div>

                {/* Stacked Resume Cards - Responsive */}
                <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[480px] h-[380px] sm:h-[450px] lg:h-[600px]">

                  {/* Shadow/Back card - slight angle offset to the right */}
                  <div
                    className="absolute bg-[#c7d2de] rounded-lg lg:rounded-xl"
                    style={{
                      width: 'calc(100% - 40px)',
                      maxWidth: '360px',
                      height: 'calc(100% - 100px)',
                      top: '35px',
                      left: '50%',
                      transform: 'translateX(-50%) translateX(15px) rotate(3deg)',
                    }}
                  />

                  {/* Main Resume Card - Responsive sizing */}
                  <div
                    className="absolute bg-white rounded-lg lg:rounded-xl overflow-hidden left-1/2 -translate-x-1/2"
                    style={{
                      width: 'calc(100% - 40px)',
                      maxWidth: '360px',
                      height: 'calc(100% - 100px)',
                      top: '15px',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    {/* Two-column layout */}
                    <div className="flex h-full">
                      {/* Left Sidebar - Dark blue - Responsive padding */}
                      <div className="w-[36%] bg-[#1e3a5f] text-white p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
                        {/* Profile Photo - Responsive size */}
                        <div className="flex justify-center pt-0.5 sm:pt-1">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full border-2 lg:border-3 border-white/40 overflow-hidden shadow-lg">
                            <img
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Contact Section - Responsive text */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <h4 className="text-[6px] sm:text-[7px] lg:text-[9px] font-bold uppercase tracking-wider text-white/60 border-b border-white/20 pb-0.5 sm:pb-1">Contact</h4>
                          <div className="space-y-0.5 sm:space-y-1 lg:space-y-1.5 text-[5px] sm:text-[6px] lg:text-[7px] text-white/85">
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <Phone className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white/60 flex-shrink-0" />
                              <span className="truncate">+61 0412 345 678</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <Mail className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white/60 flex-shrink-0" />
                              <span className="truncate">sarah@email.com</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <Globe className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white/60 flex-shrink-0" />
                              <span className="truncate">sarahdesigns.com</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <MapPin className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white/60 flex-shrink-0" />
                              <span className="truncate">Sydney, Australia</span>
                            </div>
                          </div>
                        </div>

                        {/* Skills - Responsive */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <h4 className="text-[6px] sm:text-[7px] lg:text-[9px] font-bold uppercase tracking-wider text-white/60 border-b border-white/20 pb-0.5 sm:pb-1">Skills</h4>
                          <div className="space-y-0.5 sm:space-y-1 text-[5px] sm:text-[6px] lg:text-[7px] text-white/85">
                            <div className="flex items-center justify-between">
                              <span>React.js</span>
                              <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                  <div key={i} className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${i <= 5 ? 'bg-white/80' : 'bg-white/30'}`} />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Node.js</span>
                              <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                  <div key={i} className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${i <= 4 ? 'bg-white/80' : 'bg-white/30'}`} />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>TypeScript</span>
                              <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                  <div key={i} className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${i <= 4 ? 'bg-white/80' : 'bg-white/30'}`} />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>AWS</span>
                              <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                  <div key={i} className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${i <= 3 ? 'bg-white/80' : 'bg-white/30'}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Languages - Responsive */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <h4 className="text-[6px] sm:text-[7px] lg:text-[9px] font-bold uppercase tracking-wider text-white/60 border-b border-white/20 pb-0.5 sm:pb-1">Languages</h4>
                          <div className="space-y-0.5 sm:space-y-1 text-[5px] sm:text-[6px] lg:text-[7px]">
                            <div className="flex justify-between">
                              <span className="text-white/85">English</span>
                              <span className="text-white/50 text-[4px] sm:text-[5px] lg:text-[6px]">Native</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/85">Spanish</span>
                              <span className="text-white/50 text-[4px] sm:text-[5px] lg:text-[6px]">Fluent</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/85">French</span>
                              <span className="text-white/50 text-[4px] sm:text-[5px] lg:text-[6px]">Basic</span>
                            </div>
                          </div>
                        </div>

                        {/* Certifications - Responsive */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <h4 className="text-[6px] sm:text-[7px] lg:text-[9px] font-bold uppercase tracking-wider text-white/60 border-b border-white/20 pb-0.5 sm:pb-1">Certifications</h4>
                          <div className="space-y-0.5 sm:space-y-1 text-[4px] sm:text-[5px] lg:text-[6px] text-white/80">
                            <div>AWS Solutions Architect</div>
                            <div>Google Cloud Professional</div>
                          </div>
                        </div>
                      </div>

                      {/* Right Content - White - Responsive */}
                      <div className="flex-1 p-2 sm:p-3 lg:p-4 space-y-1.5 sm:space-y-2 lg:space-y-2.5 bg-white">
                        {/* Name & Title */}
                        <div className="border-b border-gray-100 pb-1 sm:pb-1.5 lg:pb-2">
                          <h2 className="text-[10px] sm:text-xs lg:text-base font-bold text-[#1e3a5f] leading-tight">Sarah Anderson</h2>
                          <p className="text-[6px] sm:text-[7px] lg:text-[9px] text-[#1e3a5f]/70 font-medium">Senior Full Stack Developer</p>
                        </div>

                        {/* Summary */}
                        <div className="space-y-0.5 sm:space-y-1">
                          <h4 className="text-[5px] sm:text-[6px] lg:text-[8px] font-bold uppercase tracking-wider text-[#1e3a5f]">Professional Summary</h4>
                          <p className="text-[4px] sm:text-[5px] lg:text-[7px] text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                            Innovative Full Stack Developer with 6+ years of experience building high-performance web applications. Specialized in React, Node.js, and cloud architecture. Proven track record of leading teams and delivering scalable solutions.
                          </p>
                        </div>

                        {/* Experience - Responsive */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <h4 className="text-[5px] sm:text-[6px] lg:text-[8px] font-bold uppercase tracking-wider text-[#1e3a5f]">Work Experience</h4>
                          <div className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                            <div>
                              <div className="flex justify-between items-baseline">
                                <p className="text-[5px] sm:text-[6px] lg:text-[8px] font-semibold text-gray-900">Senior Software Engineer</p>
                                <span className="text-[4px] sm:text-[5px] lg:text-[6px] text-gray-400">2021 - Present</span>
                              </div>
                              <p className="text-[4px] sm:text-[5px] lg:text-[7px] text-[#1e3a5f] font-medium">ServiceNow • Hyderabad</p>
                              <ul className="mt-0.5 space-y-0.5 text-[4px] sm:text-[5px] lg:text-[6px] text-gray-600 hidden sm:block">
                                <li className="flex items-start gap-0.5 sm:gap-1">
                                  <span className="text-[#1e3a5f] mt-0.5">•</span>
                                  <span>Led development of enterprise SaaS platform serving 10K+ users</span>
                                </li>
                                <li className="flex items-start gap-0.5 sm:gap-1">
                                  <span className="text-[#1e3a5f] mt-0.5">•</span>
                                  <span>Managed and mentored team of 5 junior developers</span>
                                </li>
                                <li className="flex items-start gap-0.5 sm:gap-1">
                                  <span className="text-[#1e3a5f] mt-0.5">•</span>
                                  <span>Reduced API response time by 40% through optimization</span>
                                </li>
                              </ul>
                            </div>
                            <div className="hidden sm:block">
                              <div className="flex justify-between items-baseline">
                                <p className="text-[5px] sm:text-[6px] lg:text-[8px] font-semibold text-gray-900">Software Developer</p>
                                <span className="text-[4px] sm:text-[5px] lg:text-[6px] text-gray-400">2019 - 2021</span>
                              </div>
                              <p className="text-[4px] sm:text-[5px] lg:text-[7px] text-gray-500">Innova Labs • Bangalore</p>
                              <ul className="mt-0.5 space-y-0.5 text-[4px] sm:text-[5px] lg:text-[6px] text-gray-600">
                                <li className="flex items-start gap-0.5 sm:gap-1">
                                  <span className="text-[#1e3a5f] mt-0.5">•</span>
                                  <span>Built RESTful APIs and microservices architecture</span>
                                </li>
                                <li className="flex items-start gap-0.5 sm:gap-1 hidden lg:flex">
                                  <span className="text-[#1e3a5f] mt-0.5">•</span>
                                  <span>Implemented CI/CD pipelines reducing deployment time by 60%</span>
                                </li>
                              </ul>
                            </div>
                            <div className="hidden lg:block">
                              <div className="flex justify-between items-baseline">
                                <p className="text-[8px] font-semibold text-gray-900">Junior Developer</p>
                                <span className="text-[6px] text-gray-400">2017 - 2019</span>
                              </div>
                              <p className="text-[7px] text-gray-500">TechStart Inc • Mumbai</p>
                            </div>
                          </div>
                        </div>

                        {/* Education - Responsive */}
                        <div className="space-y-0.5 sm:space-y-1">
                          <h4 className="text-[5px] sm:text-[6px] lg:text-[8px] font-bold uppercase tracking-wider text-[#1e3a5f]">Education</h4>
                          <div className="flex justify-between items-baseline">
                            <div>
                              <p className="text-[5px] sm:text-[6px] lg:text-[8px] font-semibold text-gray-900">B.Tech in Computer Science</p>
                              <p className="text-[4px] sm:text-[5px] lg:text-[6px] text-gray-500">Indian Institute of Technology, Delhi</p>
                            </div>
                            <span className="text-[4px] sm:text-[5px] lg:text-[6px] text-gray-400">2013 - 2017</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge - ATS Optimized - Responsive */}
                  <div className="absolute -top-1 sm:-top-2 left-0 sm:left-4 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 animate-float z-10">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-md sm:rounded-lg bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700">ATS-Optimized</span>
                    </div>
                  </div>

                  {/* Floating Badge - Templates Count - Responsive */}
                  <div className="absolute bottom-12 sm:bottom-14 lg:bottom-16 -right-1 sm:-right-2 lg:-right-4 bg-[#1e3a5f] rounded-lg sm:rounded-xl shadow-lg px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 animate-float z-10" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
                      <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-white">50+ Templates</span>
                    </div>
                  </div>

                  {/* Floating Badge - AI Powered - Responsive */}
                  <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 lg:left-12 bg-gradient-to-r from-primary to-blue-600 rounded-lg sm:rounded-xl shadow-lg shadow-primary/30 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 animate-float z-10" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-md sm:rounded-lg bg-white/20 flex items-center justify-center">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-white" />
                      </div>
                      <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-white">AI-Powered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Features Showcase Section */}
      <section id="ai-features" className="py-16 md:py-24 relative overflow-hidden">
        {/* Gradient background - Blue themed */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50/50 to-indigo-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />

        {/* Floating orbs - Blue themed */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-sky-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-100 border border-primary/30 text-sm font-medium text-primary backdrop-blur-sm">
                <BrainCircuit className="h-4 w-4" />
                <span>AI-Powered Features</span>
                <Badge className="ml-1 bg-primary text-white text-[10px] px-1.5">PRO</Badge>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Supercharge Your Resume with{" "}
                <span className="bg-gradient-to-r from-primary via-blue-600 to-blue-500 bg-clip-text text-transparent">
                  AI Intelligence
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Our AI-powered tools help you create, optimize, and tailor your resume for maximum impact.
                See exactly how each feature works before you upgrade.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">

              {/* Feature 1: LinkedIn Import */}
              <div className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Linkedin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">LinkedIn Import</h3>
                        <p className="text-sm text-muted-foreground">Import your profile in seconds</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-200 text-blue-600 bg-blue-50">PRO</Badge>
                  </div>

                  {/* Visual Demo */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                          <Linkedin className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-700">linkedin.com/in/yourprofile</div>
                          <div className="text-[10px] text-gray-400">Paste your LinkedIn URL</div>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="flex justify-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center animate-bounce">
                          <ArrowRight className="h-4 w-4 text-white rotate-90" />
                        </div>
                      </div>

                      {/* Result preview */}
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-xs font-medium text-green-600">Profile imported!</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-600">
                          <div className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Work Experience</div>
                          <div className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Education</div>
                          <div className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Skills</div>
                          <div className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Summary</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Automatically import your work history, education, skills, and more from LinkedIn. No manual typing required.
                  </p>
                </div>
              </div>

              {/* Feature 2: Resume Import */}
              <div className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <FileUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Resume Upload & Parse</h3>
                        <p className="text-sm text-muted-foreground">Import existing resume files</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50">PRO</Badge>
                  </div>

                  {/* Visual Demo */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                    <div className="space-y-3">
                      {/* Upload area */}
                      <div className="border-2 border-dashed border-emerald-300 rounded-lg p-4 bg-emerald-50/50 text-center">
                        <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Upload className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="text-xs font-medium text-emerald-700">Drop PDF, DOCX, or TXT</div>
                        <div className="text-[10px] text-emerald-500">AI extracts all your data</div>
                      </div>

                      {/* Processing animation */}
                      <div className="flex items-center justify-center gap-2 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs text-emerald-600 font-medium">Parsing with AI...</span>
                      </div>

                      {/* Extracted sections */}
                      <div className="grid grid-cols-3 gap-2">
                        {['Experience', 'Skills', 'Education'].map((item) => (
                          <div key={item} className="bg-white rounded-lg p-2 border border-gray-200 text-center shadow-sm">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                            <span className="text-[10px] font-medium text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Upload your existing resume and our AI will intelligently extract and organize all your information.
                  </p>
                </div>
              </div>

              {/* Feature 3: AI Resume Enhancement */}
              <div className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">AI Enhancement</h3>
                        <p className="text-sm text-muted-foreground">Make your content shine</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">PRO</Badge>
                  </div>

                  {/* Visual Demo */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                    <div className="space-y-3">
                      {/* Before */}
                      <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                        <div className="text-[10px] text-gray-400 mb-1 uppercase font-medium">Before</div>
                        <p className="text-xs text-gray-600 line-through opacity-60">
                          "Worked on software projects and helped the team"
                        </p>
                      </div>

                      {/* AI Processing */}
                      <div className="flex justify-center">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                          <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                          <span className="text-[10px] font-medium text-primary">AI Enhancing...</span>
                        </div>
                      </div>

                      {/* After */}
                      <div className="bg-white rounded-lg p-3 border-2 border-primary/30 shadow-sm relative">
                        <div className="absolute -top-2 left-3 px-2 py-0.5 bg-primary text-white text-[8px] font-bold rounded uppercase">Enhanced</div>
                        <div className="text-[10px] text-gray-400 mb-1 uppercase font-medium mt-1">After</div>
                        <p className="text-xs text-gray-800 font-medium">
                          "Led development of 5 software projects, improving team velocity by 30% and reducing bug rate by 45%"
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Transform basic descriptions into powerful, achievement-focused bullet points with quantifiable metrics.
                  </p>
                </div>
              </div>

              {/* Feature 4: Job Tailoring */}
              <div className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Job Description Tailoring</h3>
                        <p className="text-sm text-muted-foreground">Match any job posting</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-amber-200 text-amber-600 bg-amber-50">PRO</Badge>
                  </div>

                  {/* Visual Demo */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Job Description Input */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-medium text-gray-500 uppercase">Job Description</div>
                        <div className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm h-24 overflow-hidden">
                          <div className="text-[9px] text-gray-600 leading-relaxed">
                            <span className="bg-amber-100 px-0.5 rounded">Senior Software Engineer</span><br/>
                            Requirements:<br/>
                            • <span className="bg-amber-100 px-0.5 rounded">React</span> / <span className="bg-amber-100 px-0.5 rounded">TypeScript</span><br/>
                            • <span className="bg-amber-100 px-0.5 rounded">AWS</span> experience<br/>
                            • Team leadership
                          </div>
                        </div>
                      </div>

                      {/* Tailored Resume */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-medium text-gray-500 uppercase">Tailored Resume</div>
                        <div className="bg-white rounded-lg p-2 border-2 border-amber-300 shadow-sm h-24 overflow-hidden relative">
                          <div className="absolute top-1 right-1">
                            <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="h-2.5 w-2.5 text-white" />
                            </div>
                          </div>
                          <div className="text-[9px] text-gray-600 leading-relaxed">
                            <span className="text-amber-600 font-semibold">Keywords matched:</span><br/>
                            ✓ React, TypeScript<br/>
                            ✓ AWS architecture<br/>
                            ✓ Led team of 5 devs<br/>
                            <span className="text-green-600 font-semibold">95% match!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Paste any job description and our AI will optimize your resume to match keywords and requirements.
                  </p>
                </div>
              </div>

              {/* Feature 5: ATS Score Checker */}
              <div className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                        <ClipboardCheck className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">ATS Score Checker</h3>
                        <p className="text-sm text-muted-foreground">Beat the bots, reach recruiters</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">PRO</Badge>
                  </div>

                  {/* Visual Demo */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                    <div className="flex items-start gap-4">
                      {/* Score Circle */}
                      <div className="relative">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="6"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${85 * 2.01} ${100 * 2.01}`}
                          />
                          <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#22c55e" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-bold text-green-600">85</span>
                          <span className="text-[8px] text-gray-500">ATS Score</span>
                        </div>
                      </div>

                      {/* Score breakdown */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-gray-600">Keywords</span>
                          <span className="font-medium text-green-600">92%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-[92%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-gray-600">Format</span>
                          <span className="font-medium text-green-600">88%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-[88%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-gray-600">Structure</span>
                          <span className="font-medium text-amber-600">75%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-[75%] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Tips preview */}
                    <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-[8px] font-bold">!</span>
                        </div>
                        <span className="text-[10px] text-amber-700">Add more action verbs to your experience section for higher scores</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Get instant feedback on ATS compatibility with detailed scoring and actionable improvement tips.
                  </p>
                </div>
              </div>

              {/* Feature 6: Chat with Resume (AI Assistant) */}
              <div className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-sky-500" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-sky-500 flex items-center justify-center shadow-lg shadow-primary/30">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Chat with AI Assistant</h3>
                        <p className="text-sm text-muted-foreground">Talk to build your resume</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">PRO</Badge>
                  </div>

                  {/* Visual Demo - Chat Interface */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                    <div className="space-y-3 max-h-36 overflow-hidden">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="bg-primary text-white rounded-2xl rounded-br-md px-3 py-2 max-w-[80%]">
                          <p className="text-[10px]">I worked at Google for 3 years as a senior engineer</p>
                        </div>
                      </div>

                      {/* AI response */}
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-sky-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-bl-md px-3 py-2 border border-gray-200 shadow-sm max-w-[80%]">
                          <p className="text-[10px] text-gray-700">Added to your experience! What were your key achievements at Google?</p>
                        </div>
                      </div>

                      {/* User message with voice */}
                      <div className="flex justify-end items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                          <Mic className="h-2.5 w-2.5 text-white" />
                        </div>
                        <div className="bg-primary text-white rounded-2xl rounded-br-md px-3 py-2 max-w-[70%]">
                          <p className="text-[10px]">I led a team of 8 engineers and launched...</p>
                        </div>
                      </div>
                    </div>

                    {/* Input area */}
                    <div className="mt-3 flex items-center gap-2 bg-white rounded-full border border-gray-200 p-1 pl-3">
                      <span className="text-[10px] text-gray-400 flex-1">Type or speak to add info...</span>
                      <div className="flex gap-1">
                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <Mic className="h-3 w-3 text-gray-500" />
                        </div>
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <Send className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Build your resume through natural conversation. Type or use voice input - our AI understands and updates your resume in real-time.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                <Button
                  className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary/90 hover:to-blue-700 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 group"
                  onClick={() => navigate("/pricing")}
                >
                  <Crown className="mr-2 h-5 w-5" />
                  <span>Unlock All AI Features</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  Starting at just <span className="font-semibold text-foreground">₹169/month</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Full Height with Animation */}
      <section className="relative min-h-screen flex items-center py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute -left-24 top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl sm:h-56 sm:w-56" />
        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl sm:h-64 sm:w-64" />
        <div className="container mx-auto px-4 md:px-6 w-full relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-xs md:text-sm font-medium text-primary backdrop-blur-sm">
                <Zap className="h-4 w-4" />
                <span>Quick & Easy Process</span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Create Your Resume in
                <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> 3 Simple Steps</span>
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From template selection to professional resume in minutes. Use our intuitive editor or let AI do the heavy lifting.
              </p>
            </div>

            {/* Animated Steps with Connecting Flow */}
            <div className="relative">
              {/* Desktop: Horizontal Flow with Connecting Lines */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-between relative">
                  {/* Step 1 */}
                  <div className="flex-1 text-center space-y-6">
                    <div className="relative">
                      <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg border border-primary/20 group hover:scale-110 transition-all duration-300">
                        <span className="text-lg font-bold text-primary">1</span>
                      </div>
                      {/* Animated Success Checkmark */}
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg animate-pulse">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Choose Your Template</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Browse our collection of professionally designed, ATS-optimized templates tailored for different industries and career levels.
                      </p>
                    </div>
                  </div>

                  {/* Connecting Arrow 1 */}
                  <div className="flex items-center justify-center mx-8">
                    <div className="relative">
                      <div className="h-1 w-20 bg-gradient-to-r from-primary/60 to-emerald-500/60 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                        <ArrowRight className="h-4 w-4 text-emerald-500 animate-pulse" />
                      </div>
                      {/* Animated flowing dots */}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1">
                        <div className="h-2 w-2 bg-primary rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1">
                        <div className="h-1.5 w-1.5 bg-primary/70 rounded-full animate-ping delay-150"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1">
                        <div className="h-1.5 w-1.5 bg-emerald-500/70 rounded-full animate-ping delay-300"></div>
                      </div>
                      <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 -translate-x-1">
                        <div className="h-1.5 w-1.5 bg-emerald-500/50 rounded-full animate-ping delay-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex-1 text-center space-y-6">
                    <div className="relative">
                      <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center shadow-lg border border-emerald-200 group hover:scale-110 transition-all duration-300">
                        <span className="text-lg font-bold text-emerald-600">2</span>
                      </div>
                      {/* Animated Success Checkmark */}
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center shadow-lg animate-pulse">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Add Your Content</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Type, import from LinkedIn, or chat with AI to fill your details. Let AI enhance your bullet points automatically.
                      </p>
                    </div>
                  </div>

                  {/* Connecting Arrow 2 */}
                  <div className="flex items-center justify-center mx-8">
                    <div className="relative">
                      <div className="h-1 w-20 bg-gradient-to-r from-emerald-500/60 to-blue-500/60 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                        <ArrowRight className="h-4 w-4 text-blue-500 animate-pulse" />
                      </div>
                      {/* Animated flowing dots */}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping delay-300"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1">
                        <div className="h-1.5 w-1.5 bg-emerald-500/70 rounded-full animate-ping delay-450"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1">
                        <div className="h-1.5 w-1.5 bg-blue-500/70 rounded-full animate-ping delay-600"></div>
                      </div>
                      <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 -translate-x-1">
                        <div className="h-1.5 w-1.5 bg-blue-500/50 rounded-full animate-ping delay-750"></div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex-1 text-center space-y-6">
                    <div className="relative">
                      <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-lg border border-blue-200 group hover:scale-110 transition-all duration-300">
                        <span className="text-lg font-bold text-blue-600">3</span>
                      </div>
                      {/* Animated Success Checkmark */}
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Download & Apply</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Check your ATS score, tailor for specific jobs, then export your ATS-optimized resume and start applying.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: Vertical Flow */}
              <div className="lg:hidden space-y-12">
                {/* Step 1 */}
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg border border-primary/20">
                      <span className="text-lg font-bold text-primary">1</span>
                    </div>
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">Choose Your Template</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      Browse our collection of professionally designed, ATS-optimized templates tailored for different industries.
                    </p>
                  </div>
                </div>

                {/* Connecting Arrow */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="h-12 w-[2px] sm:h-16 sm:w-1 bg-gradient-to-b from-primary/60 to-emerald-500/60 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 rotate-90 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center shadow-lg border border-emerald-200">
                      <span className="text-lg font-bold text-emerald-600">2</span>
                    </div>
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">Add Your Content</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      Type, import from LinkedIn, or chat with AI. Let AI enhance your content automatically.
                    </p>
                  </div>
                </div>

                {/* Connecting Arrow */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="h-12 w-[2px] sm:h-16 sm:w-1 bg-gradient-to-b from-emerald-500/60 to-blue-500/60 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 rotate-90 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-lg border border-blue-200">
                      <span className="text-lg font-bold text-blue-600">3</span>
                    </div>
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">Download & Apply</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      Check your ATS score, tailor for jobs, and export your optimized resume.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="mt-12 md:mt-16 text-center">
              <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>100% ATS Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>5 Minutes Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview Section */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        {/* Multi-layer gradient background - Blue themed */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-sky-100/20 via-transparent to-blue-50/20"></div>

        {/* Animated background decorations - Blue themed */}
        <div className="absolute inset-0 opacity-40">
          {/* Large floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-primary/20 to-blue-400/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-sky-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

          {/* Medium floating orbs */}
          <div className="absolute top-1/6 right-1/3 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/6 w-40 h-40 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse delay-1500"></div>
          <div className="absolute top-3/4 right-1/6 w-36 h-36 bg-gradient-to-r from-primary/15 to-blue-400/20 rounded-full blur-2xl animate-pulse delay-3000"></div>

          {/* Small accent dots */}
          <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-gradient-to-r from-sky-400/30 to-blue-400/30 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-blue-400/25 to-indigo-400/25 rounded-full blur-xl animate-pulse delay-1200"></div>
          <div className="absolute top-2/3 left-2/3 w-24 h-24 bg-gradient-to-r from-primary/20 to-blue-400/25 rounded-full blur-xl animate-pulse delay-2500"></div>
        </div>

        {/* Subtle pattern overlay - Blue themed */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                            radial-gradient(circle at 75% 75%, #2563eb 2px, transparent 2px),
                            radial-gradient(circle at 50% 50%, #0ea5e9 1px, transparent 1px)`,
            backgroundSize: '60px 60px, 80px 80px, 40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 backdrop-blur-sm border border-primary/30 text-xs md:text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                <span>AI-Ready Templates</span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Choose from <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Professional Templates</span>
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Browse our collection of beautifully designed, ATS-optimized resume templates. Each template works seamlessly with our AI features to help you create the perfect resume.
              </p>
            </div>

            {/* Template Grid - Same as Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
              {featuredTemplates.map((template, index) => (
                <Card
                  key={template.id}
                  className="group relative overflow-hidden border border-border/40 hover:border-primary/60 transition-all duration-500 cursor-pointer bg-card hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 rounded-xl"
                  onClick={() => navigate(`/builder?template=${template.id}`)}
                  style={{
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                  }}
                >
                  {/* Premium gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/2 group-hover:to-primary/5 transition-all duration-500 pointer-events-none z-0" />
                  
                  {/* Favorite Button - Top Left */}
                  <div className="absolute top-3 left-3 z-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="backdrop-blur-sm bg-white/90 rounded-lg p-1 shadow-sm">
                      <FavoriteButton
                        templateId={template.id}
                        variant="icon"
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Template Number Badge */}
                  <div
                    className="absolute top-3 right-3 z-20 flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full text-white text-xs md:text-sm font-bold shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)`,
                      boxShadow: '0 4px 14px 0 hsl(var(--primary) / 0.4)',
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Template Preview */}
                  <div className="relative aspect-[8.5/11] bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden border-b border-border/20 group-hover:border-primary/20 transition-colors duration-500">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.05) 1px, transparent 0)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    
                    {/* Preview container with premium styling */}
                    <div className="absolute inset-2 md:inset-3 rounded-lg overflow-hidden shadow-inner bg-white border border-border/20 group-hover:border-primary/30 transition-all duration-500">
                      <TemplatePreviewV2
                        templateId={template.id}
                        themeColor={template.color}
                        className="h-full"
                      />
                    </div>

                    {/* Premium Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center gap-2 p-3 md:p-4 z-10">
                      <Button
                        size="sm"
                        className="shadow-2xl text-xs md:text-sm px-4 py-2 h-9 md:h-10 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/builder?template=${template.id}`);
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>

                  {/* Template Info - Premium styling */}
                  <div className="relative p-3 md:p-4 bg-gradient-to-b from-card to-card/95 border-t border-border/20 group-hover:border-primary/30 transition-colors duration-500">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-xs md:text-sm text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 flex-1">
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary shadow-sm group-hover:shadow-md group-hover:scale-125 transition-all duration-300" />
                      </div>
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {template.description}
                    </p>
                    
                    {/* Premium accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
                  </div>
                </Card>
              ))}
            </div>

            {/* View All Templates Button */}
            <div className="text-center">
              <Button 
                className={cn(primaryButtonClass, "group")} 
                onClick={() => navigate("/templates")}
              >
                <span>View All Templates</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* How Our Resume Editor Works */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Beautiful light gradient background - Blue themed */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-sky-50/30 to-indigo-50/40"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-50/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-sky-50/20 via-transparent to-blue-50/20"></div>

        {/* Animated background elements - Blue themed */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-sky-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-r from-primary/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-sky-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              
              
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-foreground mb-4 md:mb-6">
                See How Our <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Form-Based Editor</span> Works
              </h2>

              <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Traditional form-based editing with real-time preview. Fill out structured forms and watch your resume
                update instantly - perfect for those who prefer guided input fields.
              </p>
            </div>

            {/* Interactive Editor Demo */}
            <div className="relative">
              {/* Editor Container with Glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl scale-105"></div>
                
                <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                  {/* Editor Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-3 md:px-6 py-2 md:py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full"></div>
                        <div className="ml-2 md:ml-4 text-[10px] md:text-xs font-semibold text-gray-700 hidden sm:inline">Resume Editor - Live Demo</div>
                        <div className="ml-2 text-[10px] font-semibold text-gray-700 sm:hidden">Live Demo</div>
                      </div>
                     
                    </div>
                  </div>

                  {/* Main Editor Layout */}
                  <div className="flex flex-col lg:flex-row gap-0 h-auto lg:items-start">
                    {/* Left Side - Form Editor */}
                    <div className="w-full lg:w-[40%] bg-gradient-to-br from-slate-50 to-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto max-h-[600px] lg:max-h-[800px]">
                      <div className="p-4 md:p-6">
                        {demoTemplateConfig && (
                          <ElegantForm
                            resumeData={formEditorData}
                            onResumeDataChange={setFormEditorData}
                            enabledSections={demoTemplateConfig.sections}
                            sectionTitles={{}}
                            templateConfig={demoTemplateConfig}
                            accentColor={demoThemeColor}
                          />
                        )}
                      </div>
                    </div>

                    {/* Right Side - Live Preview */}
                    <div className="w-full lg:w-[60%] bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
                      <div className="p-2 sm:p-4 md:p-6 h-full overflow-y-auto">
                        <div 
                          className="relative w-full overflow-x-hidden"
                          style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                          }}
                        >
                          <div 
                            className="space-y-0.5 flex flex-col items-center"
                            style={{
                              backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 0.5px, transparent 0)',
                              backgroundSize: '20px 20px',
                            }}
                          >
                            <div className="relative w-full max-w-[210mm]">
                              <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/50 shadow-lg shadow-gray-200/50">
                                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                  <div
                                    className="h-7 sm:h-9 w-1 sm:w-1.5 rounded-full shadow-sm"
                                    style={{ background: demoThemeColor }}
                                  />
                                  <div className="flex items-center gap-2 sm:gap-2.5">
                                    <div
                                      className="p-1 sm:p-1.5 rounded-lg"
                                      style={{ backgroundColor: `${demoThemeColor}1a` }}
                                    >
                                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: demoThemeColor }} />
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                      <span className="font-semibold text-gray-800 tracking-tight text-sm sm:text-base">Live Preview</span>
                                      <span className="text-[10px] sm:text-xs text-muted-foreground">Click to edit inline</span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  onClick={async () => {
                                    try {
                                      const filename = `${formEditorData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
                                      await generatePDFFromPreview("hero-form-preview", filename);
                                      await incrementDownloadsCount();
                                    } catch (error) {
                                      console.error("Download error:", error);
                                    }
                                  }}
                                  size="sm"
                                  className="h-8 sm:h-9 gap-1.5 sm:gap-2 bg-primary text-white hover:bg-primary/90 shadow-sm text-xs sm:text-sm px-3 sm:px-4"
                                >
                                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">Download PDF</span>
                                  <span className="sm:hidden">PDF</span>
                                </Button>
                              </div>
                            </div>

                            {/* Resume Preview - A4 Size */}
                            <div className="relative w-full max-w-[210mm]">
                              <div 
                                id="hero-form-preview" 
                                className="bg-white shadow-2xl shadow-gray-300/50 rounded-xl overflow-hidden ring-1 ring-gray-200/50 mx-auto"
                                style={{ 
                                  width: 'min(210mm, 100%)',
                                  maxWidth: '210mm',
                                }}
                              >
                                <StyleOptionsProvider>
                                  <StyleOptionsWrapper>
                                    <InlineEditProvider resumeData={formEditorData as any} setResumeData={() => {}}>
                                      <ResumeRenderer
                                        resumeData={formEditorData}
                                        templateId={demoTemplateId}
                                        themeColor={demoThemeColor}
                                        editable={false}
                                      />
                                    </InlineEditProvider>
                                  </StyleOptionsWrapper>
                                </StyleOptionsProvider>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <Button className={primaryButtonClass} onClick={() => navigate("/templates")}>
                Explore All Templates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Editor Demo Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Elegant emerald/teal gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/40 to-cyan-50/50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-green-50/40 via-transparent to-blue-50/40"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-teal-50/30 via-transparent to-emerald-50/30"></div>

        {/* Animated background elements with emerald theme */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-teal-400/12 to-emerald-400/12 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-700 backdrop-blur-sm mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Interactive Live Editor</span>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-foreground mb-4 md:mb-6">
                Experience Our Powerful <span className="text-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Live Editor</span>
              </h2>

              <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Click anywhere on the resume below to edit directly. No forms, no switching between views.
                Edit content inline with instant visual feedback, and let AI enhance your content in real-time.
              </p>

              {/* Interactive Instruction Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/5 border border-emerald-300/30 shadow-sm">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 animate-pulse">
                  <span className="text-emerald-600 text-xs font-bold">✎</span>
                </div>
                <span className="text-sm font-medium text-emerald-700">Click on any text below to start editing</span>
              </div>
            </div>

            {/* Interactive Live Editor Demo */}
            <div className="relative">
              {/* Editor Container with Emerald Glow */}
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/15 to-emerald-500/10 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl scale-105"></div>

                <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-emerald-200/50">
                  <div className="p-2 sm:p-4 md:p-6 overflow-visible">
                    <div
                      className="relative w-full space-y-1.5 sm:space-y-2.5"
                      style={{
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                      }}
                    >
                      {/* Dot pattern overlay */}
                      <div 
                        className="space-y-1 flex flex-col items-center"
                        style={{
                          backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 0.5px, transparent 0)',
                          backgroundSize: '20px 20px',
                        }}
                      >
                        <div className="relative w-full max-w-[210mm]">
                          <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/50 shadow-lg shadow-gray-200/50">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div
                                className="h-7 sm:h-9 w-1 sm:w-1.5 rounded-full shadow-sm"
                                style={{ background: liveEditorThemeColor }}
                              />
                              <div className="flex items-center gap-2 sm:gap-2.5">
                                <div
                                  className="p-1 sm:p-1.5 rounded-lg"
                                  style={{ backgroundColor: `${liveEditorThemeColor}1a` }}
                                >
                                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: liveEditorThemeColor }} />
                                </div>
                                <div className="flex flex-col leading-tight">
                                  <span className="font-semibold text-gray-800 tracking-tight text-sm sm:text-base">Live Preview</span>
                                  <span className="text-[10px] sm:text-xs text-muted-foreground">Click to edit inline</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={async () => {
                                try {
                                  const filename = `${liveEditorData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
                                  await generatePDFFromPreview("hero-live-editor-preview", filename);
                                  await incrementDownloadsCount();
                                } catch (error) {
                                  console.error("Download error:", error);
                                }
                              }}
                              size="sm"
                              className="h-8 sm:h-9 gap-1.5 sm:gap-2 bg-primary text-white hover:bg-primary/90 shadow-sm text-xs sm:text-sm px-3 sm:px-4"
                            >
                              <Download className="w-4 h-4" />
                              <span className="hidden sm:inline">Download PDF</span>
                              <span className="sm:hidden">PDF</span>
                            </Button>
                          </div>
                        </div>

                        {/* Resume Preview - A4 Size with Inline Editing */}
                        <div className="relative w-full max-w-[210mm]">
                          <div 
                            id="hero-live-editor-preview" 
                            className="bg-white shadow-2xl shadow-gray-300/50 rounded-xl overflow-hidden ring-1 ring-gray-200/50 mx-auto"
                            style={{ 
                              width: 'min(210mm, 100%)',
                              maxWidth: '210mm',
                            }}
                          >
                            <StyleOptionsProvider>
                              <StyleOptionsWrapper>
                                <InlineEditProvider resumeData={liveEditorData as any} setResumeData={setLiveEditorData as any}>
                                  <ResumeRenderer
                                    resumeData={liveEditorData}
                                    templateId={liveEditorTemplateId}
                                    themeColor={liveEditorThemeColor}
                                    editable={true}
                                    onAddBulletPoint={handleAddBulletPoint}
                                    onRemoveBulletPoint={handleRemoveBulletPoint}
                                    onAddExperience={handleAddExperience}
                                    onRemoveExperience={handleRemoveExperience}
                                    onAddEducation={handleAddEducation}
                                    onRemoveEducation={handleRemoveEducation}
                                  />
                                </InlineEditProvider>
                              </StyleOptionsWrapper>
                            </StyleOptionsProvider>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Helpful Tips */}
                    <div className="mt-6 max-w-3xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-emerald-200/40">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                            <span className="text-emerald-600 text-xs">✓</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-800 mb-0.5">Click to Edit</h4>
                            <p className="text-[10px] text-gray-600">Click any text to edit it directly</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-emerald-200/40">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
                            <span className="text-teal-600 text-xs">⚡</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-800 mb-0.5">Real-Time Updates</h4>
                            <p className="text-[10px] text-gray-600">See changes instantly as you type</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-emerald-200/40">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                            <span className="text-cyan-600 text-xs">↓</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-800 mb-0.5">Download Ready</h4>
                            <p className="text-[10px] text-gray-600">Export to PDF anytime you want</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="inline-flex flex-col sm:flex-row gap-3">
                <Button
                  className={cn(buttonBaseClass, "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl group")}
                  onClick={() => navigate("/templates")}
                >
                  <span>Try Live Editor Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className={cn(buttonBaseClass, "border border-emerald-600 text-emerald-600 hover:bg-emerald-50")}
                  onClick={() => navigate("/templates")}
                >
                  View All Templates
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                The fastest way to create a professional resume. Edit directly, download instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Platform Highlights */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-muted/30" />
        <div className="absolute top-0 left-1/2 h-40 w-[120%] -translate-x-1/2 bg-gradient-to-r from-primary/10 via-transparent to-emerald-100/20 blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary backdrop-blur-sm">
                <Award className="h-4 w-4" />
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Land Your Dream Job</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Professional templates, powerful AI tools, and an intuitive editor - all in one platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Feature 1 */}
              <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-foreground">ATS-Optimized Templates</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All 50+ templates pass ATS scans and get your resume to recruiters.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-foreground">Real-Time Live Preview</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  See changes instantly as you type. Click to edit directly on resume.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-foreground flex items-center gap-1.5">
                  LinkedIn Import
                  <Badge className="text-[8px] px-1 py-0 bg-primary/10 text-primary border-0">PRO</Badge>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Import your entire LinkedIn profile in seconds with one click.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-foreground flex items-center gap-1.5">
                  AI Enhancement
                  <Badge className="text-[8px] px-1 py-0 bg-primary/10 text-primary border-0">PRO</Badge>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Transform basic text into powerful, metrics-driven bullet points.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-foreground flex items-center gap-1.5">
                  Job Tailoring
                  <Badge className="text-[8px] px-1 py-0 bg-primary/10 text-primary border-0">PRO</Badge>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Optimize your resume for any job description with AI keyword matching.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ClipboardCheck className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-foreground flex items-center gap-1.5">
                  ATS Score Check
                  <Badge className="text-[8px] px-1 py-0 bg-primary/10 text-primary border-0">PRO</Badge>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Get instant ATS compatibility scores and improvement tips.
                </p>
              </div>

              {/* Feature 7 */}
              <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-foreground flex items-center gap-1.5">
                  AI Chat Assistant
                  <Badge className="text-[8px] px-1 py-0 bg-primary/10 text-primary border-0">PRO</Badge>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Build your resume through natural conversation with voice support.
                </p>
              </div>

              {/* Feature 8 */}
              <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-foreground">Secure & Private</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your data is encrypted and secure. We never share your information.
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center p-4 rounded-xl bg-white/50 border border-gray-200/50">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-xs text-muted-foreground">Premium Templates</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 border border-gray-200/50">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">6</div>
                <div className="text-xs text-muted-foreground">AI-Powered Features</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 border border-gray-200/50">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-xs text-muted-foreground">ATS Compatible</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 border border-gray-200/50">
                <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">5 min</div>
                <div className="text-xs text-muted-foreground">To Create Resume</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.1),transparent)]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                Simple Pricing
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Free to start,{" "}
                <span className="bg-gradient-to-r from-primary via-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Pro to grow
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Build professional resumes for free. Upgrade to Pro for AI-powered features.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-xl border border-border/60 bg-white/80 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Free</h3>
                    <p className="text-xs text-muted-foreground">Forever free</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">$0</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full h-9 text-sm font-medium"
                    onClick={() => navigate("/templates")}
                  >
                    Get Started
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>

                  <ul className="space-y-1.5 pt-3 border-t border-border/60">
                    {[
                      "Resume Builder",
                      "50+ Premium Templates",
                      "Style Customization",
                      "PDF Download",
                      "Live Preview Editor",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs">
                        <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                    {[
                      "LinkedIn Import",
                      "AI Enhancement",
                      "ATS Score Checker",
                      "AI Chat Assistant",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs">
                        <X className="h-3.5 w-3.5 text-gray-300 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="relative rounded-xl border-2 border-primary bg-white/90 backdrop-blur-sm p-4 shadow-lg">
                {/* Popular Badge */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white px-2 py-0.5 text-[10px] font-semibold shadow-md">
                    <Crown className="h-2.5 w-2.5 mr-1" />
                    Popular
                  </Badge>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
                      Pro
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground">AI superpowers</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">₹169</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>

                  <Button
                    className="w-full h-9 text-sm font-medium bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
                    onClick={() => navigate("/pricing")}
                  >
                    <Zap className="mr-1.5 h-3.5 w-3.5" />
                    Upgrade
                  </Button>

                  <ul className="space-y-1.5 pt-3 border-t border-border/60">
                    <li className="text-[10px] text-muted-foreground">Everything in Free, plus:</li>
                    {[
                      "LinkedIn Profile Import",
                      "Resume Upload & Parse",
                      "AI Resume Enhancement",
                      "Job Description Tailoring",
                      "ATS Score Checker",
                      "AI Chat Assistant",
                      "Voice Input Support",
                      "Generate from Job Description",
                      "Multiple Resumes",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs">
                        <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* View Full Pricing Link */}
            <div className="text-center mt-6">
              <button
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                onClick={() => navigate("/pricing")}
              >
                View full pricing details
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-blue-100/20" />
        <div className="absolute -top-10 right-1/2 h-40 w-40 translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Ready to Build Your <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI-Powered</span> Resume?
              </h2>
              <p className="text-base text-muted-foreground">
                Choose from professional templates and let AI help you create the perfect resume in minutes
              </p>
            </div>

            <Button className={cn(primaryButtonClass, "group")} onClick={() => navigate("/templates")}>
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-5">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>&copy; {new Date().getFullYear()} ResumeCook. Crafted to help you land your next role.</div>
            <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-wide">
              <button onClick={() => navigate("/privacy")} className="hover:text-foreground transition-colors">Privacy</button>
              <button onClick={() => navigate("/terms")} className="hover:text-foreground transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
