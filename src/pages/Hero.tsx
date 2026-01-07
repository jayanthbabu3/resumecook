import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Zap, TrendingUp, Shield, Award, Clock, Globe, Target, Palette, Mail, Eye, Download } from "lucide-react";
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
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about creating scalable web applications and leading technical teams.",
    jobTitle: "Senior Software Engineer",
    company: "Tech Solutions Inc.",
    startDate: "2022-01",
    endDate: "",
    description: "Led development of scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "Python"]
  });

  // Separate state for skills input - initialize with existing skills
  const [skillsInput, setSkillsInput] = useState("React, Node.js, JavaScript, TypeScript, Python");
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
      fullName: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 987-6543",
      location: "Seattle, WA",
      title: "Chief Technology Officer",
      summary: "Visionary technology executive with 15+ years of experience leading engineering teams and driving digital transformation. Proven track record of scaling organizations, implementing innovative solutions, and delivering exceptional business outcomes."
    },
    experience: [
      {
        id: "exp-0",
        position: "Chief Technology Officer",
        company: "TechVision Inc.",
        startDate: "2020-01",
        endDate: "",
        current: true,
        description: "",
        bulletPoints: [
          "Spearheaded digital transformation initiatives, increasing operational efficiency by 45%",
          "Led a team of 120+ engineers across multiple product lines",
          "Architected cloud migration strategy saving $2M annually"
        ]
      },
      {
        id: "exp-1",
        position: "VP of Engineering",
        company: "Innovation Labs",
        startDate: "2016-03",
        endDate: "2019-12",
        current: false,
        description: "",
        bulletPoints: [
          "Built and scaled engineering organization from 20 to 85 team members",
          "Launched 3 successful products generating $50M in annual revenue",
          "Implemented agile methodologies improving delivery speed by 60%"
        ]
      }
    ],
    education: [
      {
        id: "edu-0",
        school: "Stanford University",
        degree: "Master of Science",
        field: "Computer Science",
        location: "Stanford, CA",
        startDate: "2010-09",
        endDate: "2012-06"
      }
    ],
    skills: [
      { id: "skill-0", name: "Strategic Planning", level: 10, category: "core" },
      { id: "skill-1", name: "Cloud Architecture", level: 9, category: "core" },
      { id: "skill-2", name: "Team Leadership", level: 8, category: "core" },
      { id: "skill-3", name: "Digital Transformation", level: 7, category: "core" },
      { id: "skill-4", name: "Product Strategy", level: 7, category: "core" }
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
      fullName: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 987-6543",
      location: "Seattle, WA",
      title: "Chief Technology Officer",
      summary: "Visionary technology executive with 15+ years of experience leading engineering teams and driving digital transformation. Proven track record of scaling organizations, implementing innovative solutions, and delivering exceptional business outcomes."
    },
    experience: [
      {
        id: "exp-0",
        position: "Chief Technology Officer",
        company: "TechVision Inc.",
        startDate: "2020-01",
        endDate: "",
        current: true,
        description: "",
        bulletPoints: [
          "Spearheaded digital transformation initiatives, increasing operational efficiency by 45%",
          "Led a team of 120+ engineers across multiple product lines",
          "Architected cloud migration strategy saving $2M annually"
        ]
      },
      {
        id: "exp-1",
        position: "VP of Engineering",
        company: "Innovation Labs",
        startDate: "2016-03",
        endDate: "2019-12",
        current: false,
        description: "",
        bulletPoints: [
          "Built and scaled engineering organization from 20 to 85 team members",
          "Launched 3 successful products generating $50M in annual revenue",
          "Implemented agile methodologies improving delivery speed by 60%"
        ]
      }
    ],
    education: [
      {
        id: "edu-0",
        school: "Stanford University",
        degree: "Master of Science",
        field: "Computer Science",
        location: "Stanford, CA",
        startDate: "2010-09",
        endDate: "2012-06"
      }
    ],
    skills: [
      { id: "skill-0", name: "Strategic Planning", level: 10, category: "core" },
      { id: "skill-1", name: "Cloud Architecture", level: 9, category: "core" },
      { id: "skill-2", name: "Team Leadership", level: 8, category: "core" },
      { id: "skill-3", name: "Digital Transformation", level: 7, category: "core" },
      { id: "skill-4", name: "Product Strategy", level: 7, category: "core" }
    ],
    languages: [
      { id: "lang-0", language: "English", proficiency: "Native" },
      { id: "lang-1", language: "Spanish", proficiency: "Professional" },
      { id: "lang-2", language: "Mandarin", proficiency: "Intermediate" }
    ],
    interests: [
      { id: "interest-0", name: "Technology Innovation" },
      { id: "interest-1", name: "Leadership Development" },
      { id: "interest-2", name: "Open Source Contributions" },
      { id: "interest-3", name: "Mountain Biking" }
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

      {/* Hero Section - Inspired by Stripe, Linear, Vercel */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Side - Content (7 columns) */}
              <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
                
                {/* Minimal Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 text-xs font-medium text-primary/80 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>Professional Resume Builder</span>
                </div>

                {/* Headline - Clean, impactful */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-foreground leading-[1.1]">
                    Build resumes that
                    <span className="block bg-gradient-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
                      get you hired
                    </span>
                  </h1>
                  
                  {/* Subheadline - Concise */}
                  <p className="text-lg sm:text-xl text-muted-foreground/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                    Professional templates. ATS-optimized formatting. Easy customization.
                    Create your perfect resume in minutes.
                  </p>
                </div>

                {/* CTA Button - Single prominent button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center justify-center lg:justify-start">
                  <Button
                    className="h-12 px-8 text-base font-semibold bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group"
                    onClick={() => navigate("/templates")}
                  >
                    <span>View templates</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>

                {/* Social Proof - Real stats with animation */}
                <div className="flex items-center justify-center lg:justify-start pt-8 border-t border-border/40">
                  <div className="flex items-center gap-6">
                    {/* Users count */}
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-background flex items-center justify-center text-[10px] font-medium text-gray-600"
                          >
                            {['JD', 'AK', 'MR', 'SL'][i-1]}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm">
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
                    <div className="h-8 w-px bg-border/60" />

                    {/* Downloads count */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                        <Download className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm">
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

              {/* Right Side - Enhanced Resume Preview (6 columns) */}
              <div className="lg:col-span-6 relative hidden lg:flex justify-center items-center py-8">
                {/* Multi-layer ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/15 via-blue-400/10 to-violet-500/15 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-violet-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Decorative elements behind card */}
                <div className="absolute top-8 right-8 w-20 h-20 border-2 border-primary/10 rounded-2xl rotate-12" />
                <div className="absolute bottom-12 left-4 w-16 h-16 border-2 border-violet-400/10 rounded-xl -rotate-12" />

                {/* Main Resume Card */}
                <div className="relative w-full max-w-[420px]">
                  {/* Stacked card effect - multiple layers */}
                  <div className="absolute inset-0 translate-x-6 translate-y-6 bg-gradient-to-br from-violet-100 to-violet-200/50 rounded-2xl" />
                  <div className="absolute inset-0 translate-x-3 translate-y-3 bg-gradient-to-br from-blue-50 to-primary/10 rounded-2xl" />

                  {/* Main card */}
                  <div className="relative bg-white rounded-2xl shadow-2xl shadow-primary/10 border border-gray-100/80 overflow-hidden">
                    {/* Gradient header bar */}
                    <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-violet-500" />

                    <div className="p-6 space-y-5">
                      {/* Resume Header */}
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-primary flex items-center justify-center shadow-xl shadow-primary/30">
                            <span className="text-white font-bold text-xl">SA</span>
                          </div>
                          {/* Online indicator */}
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900">Sarah Anderson</h3>
                          <p className="text-sm font-semibold text-primary mt-0.5">Senior Product Designer</p>
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                            <Mail className="w-3.5 h-3.5" />
                            <span>sarah@example.com</span>
                          </div>
                        </div>
                      </div>

                      {/* Experience Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-blue-500" />
                          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Experience</h4>
                        </div>

                        <div className="space-y-2.5 pl-3.5">
                          <div className="p-3.5 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-sm text-gray-900">Lead Designer</p>
                                <p className="text-xs font-medium text-primary mt-0.5">TechCorp Inc.</p>
                              </div>
                              <span className="text-[10px] text-gray-500 font-semibold px-2.5 py-1 bg-primary/5 text-primary rounded-full">2021 - Present</span>
                            </div>
                            <div className="flex gap-1.5 mt-3">
                              <div className="h-1.5 bg-gradient-to-r from-primary/40 to-primary/20 rounded-full flex-1" />
                              <div className="h-1.5 bg-gray-100 rounded-full w-1/4" />
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-gray-50/50 border border-gray-100/80">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-sm text-gray-900">Product Designer</p>
                                <p className="text-xs text-gray-500 mt-0.5">StartupXYZ</p>
                              </div>
                              <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-gray-100 rounded-full">2019 - 2021</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
                          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Skills</h4>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-3.5">
                          {['UI/UX', 'Figma', 'Prototyping', 'Research'].map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/80 hover:border-primary/40 hover:text-primary transition-colors duration-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer with badges */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-semibold text-emerald-600">ATS-Optimized</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Download className="w-4 h-4" />
                          <span className="font-medium">PDF Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Floating elements */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl shadow-primary/10 border border-gray-100 px-4 py-2.5 animate-float">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">ATS-Optimized</span>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl shadow-amber-500/10 border border-gray-100 px-4 py-2.5 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">Instant Export</span>
                    </div>
                  </div>

                  {/* New: Template count badge */}
                  <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-primary to-blue-600 rounded-xl shadow-lg shadow-primary/30 px-3 py-2 animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white">10+ Templates</span>
                    </div>
                  </div>
                </div>
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
                From template selection to professional resume in minutes. Our guided process makes resume creation effortless and enjoyable.
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
                      <h3 className="text-lg font-semibold text-foreground">Fill Your Information</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Add your experience, skills, and achievements with our intelligent guided prompts. Get real-time suggestions and optimization tips.
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
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center shadow-lg animate-pulse">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Download & Apply</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Export your professionally formatted resume in multiple formats. Start applying to your dream jobs with confidence.
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
                    <h3 className="text-lg font-semibold text-foreground">Fill Your Information</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      Add your experience and skills with intelligent guided prompts and real-time optimization suggestions.
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
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">Download & Apply</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      Export your professionally formatted resume and start applying to your dream jobs with confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="mt-12 md:mt-16 text-center">
              <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>5 Minutes Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>100% ATS Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  <span>Professional Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview Section */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-pink-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-100/20 via-transparent to-orange-100/20"></div>
        
        {/* Animated background decorations */}
        <div className="absolute inset-0 opacity-40">
          {/* Large floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/25 to-cyan-400/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Medium floating orbs */}
          <div className="absolute top-1/6 right-1/3 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/6 w-40 h-40 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse delay-1500"></div>
          <div className="absolute top-3/4 right-1/6 w-36 h-36 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
          
          {/* Small accent dots */}
          <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-green-400/25 to-emerald-400/25 rounded-full blur-xl animate-pulse delay-1200"></div>
          <div className="absolute top-2/3 left-2/3 w-24 h-24 bg-gradient-to-r from-violet-400/25 to-purple-400/25 rounded-full blur-xl animate-pulse delay-2500"></div>
        </div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #7c3aed 2px, transparent 2px),
                            radial-gradient(circle at 75% 75%, #2563eb 2px, transparent 2px),
                            radial-gradient(circle at 50% 50%, #059669 1px, transparent 1px)`,
            backgroundSize: '60px 60px, 80px 80px, 40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs md:text-sm font-medium text-primary">
                <Palette className="h-4 w-4" />
                <span>Premium Templates</span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Choose from <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Professional Templates</span>
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Browse our collection of beautifully designed, ATS-optimized resume templates. Each template is crafted for specific industries and experience levels.
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
        {/* Beautiful light gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-purple-50/40"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/30 via-transparent to-pink-50/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-50/20 via-transparent to-orange-50/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
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
                Edit content inline with instant visual feedback - the most intuitive way to build your resume.
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

                <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-emerald-200/50 overflow-hidden">
                  <div className="p-2 sm:p-4 md:p-6">
                    <div 
                      className="relative w-full overflow-x-hidden space-y-1.5 sm:space-y-2.5"
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

      {/* Features Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-muted/30" />
        <div className="absolute top-0 left-1/2 h-40 w-[120%] -translate-x-1/2 bg-gradient-to-r from-primary/10 via-transparent to-emerald-100/20 blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why Choose Our Platform?
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Built with modern technology and user experience in mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group p-6 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-foreground">ATS-Optimized</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All templates are designed to pass Applicant Tracking Systems and get your resume noticed by recruiters.
                </p>
              </div>
              
              <div className="group p-6 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-foreground">Real-Time Preview</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  See your changes instantly as you build. No more guessing how your resume will look.
                </p>
              </div>
              
              <div className="group p-6 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-foreground">Easy Customization</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Add, remove, and rearrange sections with simple clicks. No design skills required.
                </p>
              </div>

              <div className="group p-6 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-foreground">Industry-Specific</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Templates tailored for different professions and career stages.
                </p>
              </div>

              <div className="group p-6 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-foreground">Secure & Private</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your data is encrypted and secure. We never share your personal information.
                </p>
              </div>

              <div className="group p-6 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-foreground">Career Growth</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tools and tips to help you advance in your career and land better opportunities.
                </p>
              </div>
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
                Ready to Build Your Resume?
              </h2>
              <p className="text-base text-muted-foreground">
                Choose from professional templates and create your resume in minutes
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
