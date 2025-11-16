import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Zap, Users, TrendingUp, Shield, Star, Award, Clock, Globe, Target, ChevronRight, Palette, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TemplatePreview } from "@/components/TemplatePreview";
import { pdf } from "@react-pdf/renderer";
import { ModernPDF } from "@/components/resume/pdf/ModernPDF";
import { ModernTemplate } from "@/components/resume/templates/ModernTemplate";
import { ExecutivePDF } from "@/components/resume/pdf/ExecutivePDF";
import { ExecutiveTemplate } from "@/components/resume/templates/ExecutiveTemplate";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { registerPDFFonts } from "@/lib/pdfFonts";
import { cn } from "@/lib/utils";
import { useAppStats } from "@/hooks/useAppStats";
import { formatCount, incrementDownloadsCount } from "@/lib/firestore/statsService";

// Register fonts for PDF generation
registerPDFFonts();

const Hero = () => {
  const navigate = useNavigate();

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

  // State for Live Editor demo
  const [liveEditorData, setLiveEditorData] = useState({
    fullName: "Michael Chen",
    title: "Chief Technology Officer",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    location: "Seattle, WA",
    summary: "Visionary technology executive with 15+ years of experience leading engineering teams and driving digital transformation. Proven track record of scaling organizations, implementing innovative solutions, and delivering exceptional business outcomes.",
    experiences: [
      {
        position: "Chief Technology Officer",
        company: "TechVision Inc.",
        startDate: "2020-01",
        endDate: "",
        description: "• Spearheaded digital transformation initiatives, increasing operational efficiency by 45%\n• Led a team of 120+ engineers across multiple product lines\n• Architected cloud migration strategy saving $2M annually"
      },
      {
        position: "VP of Engineering",
        company: "Innovation Labs",
        startDate: "2016-03",
        endDate: "2019-12",
        description: "• Built and scaled engineering organization from 20 to 85 team members\n• Launched 3 successful products generating $50M in annual revenue\n• Implemented agile methodologies improving delivery speed by 60%"
      }
    ],
    skills: ["Strategic Planning", "Cloud Architecture", "Team Leadership", "Digital Transformation", "Product Strategy"]
  });

  const [livePreviewScale, setLivePreviewScale] = useState(0.6);
  const [livePreviewHeight, setLivePreviewHeight] = useState(1120);
  const livePreviewContainerRef = useRef<HTMLDivElement | null>(null);
  const livePreviewContentRef = useRef<HTMLDivElement | null>(null);

  // State for Live Editor in ResumeData format (for InlineEditProvider)
  const [liveResumeData, setLiveResumeData] = useState(() => ({
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
        description: "• Spearheaded digital transformation initiatives, increasing operational efficiency by 45%\n• Led a team of 120+ engineers across multiple product lines\n• Architected cloud migration strategy saving $2M annually"
      },
      {
        id: "exp-1",
        position: "VP of Engineering",
        company: "Innovation Labs",
        startDate: "2016-03",
        endDate: "2019-12",
        current: false,
        description: "• Built and scaled engineering organization from 20 to 85 team members\n• Launched 3 successful products generating $50M in annual revenue\n• Implemented agile methodologies improving delivery speed by 60%"
      }
    ],
    education: [],
    skills: [
      { id: "skill-0", name: "Strategic Planning", level: 10, category: "core" as const },
      { id: "skill-1", name: "Cloud Architecture", level: 9, category: "core" as const },
      { id: "skill-2", name: "Team Leadership", level: 8, category: "core" as const },
      { id: "skill-3", name: "Digital Transformation", level: 7, category: "core" as const },
      { id: "skill-4", name: "Product Strategy", level: 7, category: "core" as const }
    ],
    sections: []
  }));

  const buttonBaseClass = "h-11 px-6 text-sm md:text-base font-semibold transition-all duration-300";
  const primaryButtonClass = cn(
    buttonBaseClass,
    "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl",
  );
  const neutralButtonClass = cn(
    buttonBaseClass,
    "border border-border/70 text-foreground hover:bg-muted/50 hover:text-foreground",
  );
  const outlinePrimaryButtonClass = cn(
    buttonBaseClass,
    "border border-primary text-primary hover:bg-primary/5",
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

  // Live Editor Preview Scaling
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
      setLivePreviewScale(Math.max(minScale, Number(computedScale.toFixed(3))));
    };

    if (typeof ResizeObserver !== "undefined") {
      const element = livePreviewContainerRef.current;
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

    const handleResize = () => applyScale(window.innerWidth - 32);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const element = livePreviewContentRef.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect?.height;
      if (height) {
        setLivePreviewHeight(height);
      }
    });

    observer.observe(element);
    setLivePreviewHeight(element.getBoundingClientRect().height);

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

  // Convert live editor data to ResumeData format
  const convertLiveEditorToResumeData = () => {
    return {
      personalInfo: {
        fullName: liveEditorData.fullName,
        email: liveEditorData.email,
        phone: liveEditorData.phone,
        location: liveEditorData.location,
        title: liveEditorData.title,
        summary: liveEditorData.summary
      },
      experience: liveEditorData.experiences.map((exp, index) => ({
        id: `exp-${index}`,
        company: exp.company,
        position: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate || "",
        current: !exp.endDate,
        description: exp.description
      })),
      education: [],
      skills: liveEditorData.skills.map((skill, index) => ({
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
      <div className="container mx-auto px-6 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="relative pb-8 pt-4 md:pb-12 md:pt-6 lg:py-6 bg-gradient-to-br from-background via-muted/10 to-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Left Side - Content */}
              <div className="space-y-4 md:space-y-6 text-center lg:text-left mx-auto lg:mx-0 max-w-2xl">
              {/* Badge */}
                <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                  <span>AI-Powered Resume Builder</span>
              </div>

              {/* Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  Creating Competitive
                  <br />
                  <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Resumes is Easy Now
                  </span>
                </h1>

              {/* Subheadline */}
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Pick your role, choose a template, let AI tailor your resume to any job description. 
                  Get hired faster with professional, ATS-optimized resumes.
              </p>

              {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 items-center sm:items-center lg:items-start justify-center lg:justify-start">
                <Button className={cn(primaryButtonClass, "group")} onClick={() => navigate("/dashboard")}>
                    <span>Start Building Free</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className={neutralButtonClass}
                  onClick={() => navigate("/dashboard")}
                >
                  View Templates
                </Button>
              </div>

                {/* Stats */}
                <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 pt-2 md:pt-4">
                  <div className="text-center">
                    <div className="text-base md:text-lg font-bold text-primary">
                      {statsLoading ? "..." : formatCount(stats?.usersCount || 0)}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base md:text-lg font-bold text-emerald-600">95%</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">ATS Compatible</div>
            </div>
                  <div className="text-center">
                    <div className="text-base md:text-lg font-bold text-primary">
                      {statsLoading ? "..." : formatCount(stats?.downloadsCount || 0)}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Downloads</div>
          </div>
        </div>
              </div>

              {/* Right Side - Beautiful 3D Resume Showcase */}
              <div className="relative mt-8 lg:mt-0 hidden lg:block">
                <div className="relative mx-auto max-w-4xl scale-[0.7] origin-center">
                  {/* Ambient Glow Effects */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-purple-500/20 to-blue-500/30 rounded-3xl blur-3xl animate-pulse"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-primary/30 to-purple-500/20 rounded-3xl blur-2xl opacity-75"></div>
                  
                  {/* Main 3D Card Stack */}
                  <div className="relative perspective-1000">
                    {/* Back Cards (Depth Effect) */}
                    <div className="absolute inset-0 transform translate-y-8 translate-x-8 rotate-3 opacity-30">
                      <div className="h-full w-full bg-gradient-to-br from-primary/40 to-purple-500/40 rounded-2xl backdrop-blur-sm"></div>
                    </div>
                    <div className="absolute inset-0 transform translate-y-4 translate-x-4 rotate-2 opacity-50">
                      <div className="h-full w-full bg-gradient-to-br from-primary/60 to-blue-500/60 rounded-2xl backdrop-blur-sm"></div>
                    </div>
                    
                    {/* Main Resume Card */}
                    <div className="relative transform hover:scale-105 transition-transform duration-500 ease-out">
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 p-8 space-y-6 backdrop-blur-xl">
                        {/* Resume Header */}
                        <div className="flex items-start justify-between pb-6 border-b-2 border-primary/20">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-gray-900">Sarah Anderson</h3>
                            <p className="text-base font-semibold text-primary">Senior Product Designer</p>
                            <div className="flex gap-4 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                sarah@example.com
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                (555) 123-4567
                              </span>
                            </div>
                          </div>
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg border-4 border-white">
                            <span className="text-white font-bold text-xl">SA</span>
                          </div>
                        </div>

                        {/* Professional Summary */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1 h-4 bg-primary rounded-full"></div>
                            About
                          </h4>
                          <div className="space-y-2 pl-3">
                            <div className="h-2 bg-gradient-to-r from-gray-300 to-transparent rounded w-full"></div>
                            <div className="h-2 bg-gradient-to-r from-gray-300 to-transparent rounded w-11/12"></div>
                            <div className="h-2 bg-gradient-to-r from-gray-300 to-transparent rounded w-10/12"></div>
                          </div>
                        </div>

                        {/* Experience Highlight */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1 h-4 bg-primary rounded-full"></div>
                            Experience
                          </h4>
                          <div className="pl-3 space-y-4">
                            <div className="border-l-4 border-primary/40 pl-4 space-y-2 hover:border-primary transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-bold text-gray-800">Lead Designer</p>
                                  <p className="text-sm text-primary font-medium">TechCorp Inc.</p>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">2021 - Present</span>
                              </div>
                              <div className="space-y-1">
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                              </div>
                            </div>
                            
                            <div className="border-l-4 border-blue-500/40 pl-4 space-y-2 hover:border-blue-500 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-bold text-gray-800">Product Designer</p>
                                  <p className="text-sm text-blue-600 font-medium">StartupXYZ</p>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">2019 - 2021</span>
                              </div>
                              <div className="space-y-1">
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1 h-4 bg-primary rounded-full"></div>
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2 pl-3">
                            <span className="px-4 py-1.5 bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs font-medium rounded-full border border-primary/30">
                              UI/UX Design
                            </span>
                            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-700 text-xs font-medium rounded-full border border-blue-500/30">
                              Figma
                            </span>
                            <span className="px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-700 text-xs font-medium rounded-full border border-purple-500/30">
                              Prototyping
                            </span>
                            <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-700 text-xs font-medium rounded-full border border-emerald-500/30">
                              User Research
                            </span>
                          </div>
                        </div>

                        {/* ATS Badge */}
                        <div className="flex items-center justify-center pt-4 border-t border-gray-100">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-semibold text-emerald-700">ATS-Optimized & Ready</span>
                          </div>
                        </div>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"></div>
                    </div>
                  </div>

                  {/* Floating Feature Pills */}
                  <div className="absolute -top-8 -left-8 animate-float">
                    <div className="bg-white rounded-full shadow-xl px-4 py-2 border border-gray-200/50 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">AI-Powered</p>
                          <p className="text-[10px] text-gray-500">Smart Content</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="bg-white rounded-full shadow-xl px-4 py-2 border border-gray-200/50 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">Instant Export</p>
                          <p className="text-[10px] text-gray-500">PDF Ready</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/3 -left-12 animate-float" style={{ animationDelay: '2s' }}>
                    <div className="bg-white rounded-full shadow-xl p-3 border border-gray-200/50 backdrop-blur-sm">
                      <Users className="w-5 h-5 text-primary" />
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

            {/* Template Grid - 3x3 Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  id: "professional",
                  name: "Professional",
                  description: "Traditional single-column layout optimized for corporate roles",
                  color: "#2563eb"
                },
                {
                  id: "modern",
                  name: "Modern",
                  description: "Contemporary two-column design for creative teams",
                  color: "#7c3aed"
                },
                {
                  id: "software",
                  name: "Software Engineer",
                  description: "Bold layout with impact metrics and achievements",
                  color: "#059669"
                },
                {
                  id: "fresher",
                  name: "Fresher Premium",
                  description: "ATS-optimized template for fresh graduates",
                  color: "#e11d48"
                },
                {
                  id: "executive",
                  name: "Executive",
                  description: "Bold leadership-focused layout for senior roles",
                  color: "#ea580c"
                },
                {
                  id: "minimal",
                  name: "Minimal",
                  description: "Sophisticated whitespace-focused design",
                  color: "#0d9488"
                },
                {
                  id: "frontend",
                  name: "Frontend Developer",
                  description: "Tech-focused design with skills grid layout",
                  color: "#8b5cf6"
                },
                {
                  id: "backend",
                  name: "Backend Developer",
                  description: "Clean technical design for backend specialists",
                  color: "#ec4899"
                },
                {
                  id: "fullstack",
                  name: "Full Stack Engineer",
                  description: "Comprehensive layout for full-stack developers",
                  color: "#f59e0b"
                }
              ].map((template) => (
                <div
                  key={template.id}
                  className="group relative bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/dashboard/all/editor/${template.id}`)}
                >
                  {/* Template Preview */}
                  <div className="relative h-72 bg-gray-50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <TemplatePreview
                      templateId={template.id}
                      themeColor={template.color}
                      className="border-0"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-2 p-4 md:p-6">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="shadow-lg text-xs md:text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/all/editor/${template.id}`);
                        }}
                      >
                        Form Editor
                      </Button>
                      <Button
                        size="sm"
                        className="shadow-lg text-xs md:text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/all/live-editor/${template.id}`);
                        }}
                      >
                        Live Editor
                      </Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-5 space-y-2 bg-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-gray-200 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: template.color }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                    
                    {/* View Details Link */}
                    <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Templates Button */}
            <div className="text-center">
              <Button 
                className={cn(primaryButtonClass, "group")} 
                onClick={() => navigate("/dashboard")}
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
                  <div className="flex flex-col md:flex-row gap-6 md:gap-0 h-auto">
                    {/* Left Side - Form Editor */}
                    <div className="w-full md:w-1/2 bg-gradient-to-br from-slate-50 to-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                      <div className="p-2 md:p-4 space-y-2 md:space-y-4">
                        {/* Personal Information */}
                        <div className="space-y-1 md:space-y-2">
                          <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full"></div>
                            <h3 className="text-[10px] md:text-sm font-bold text-gray-800 capitalize tracking-wider">Personal Information</h3>
                          </div>
                          <div className="space-y-1.5 md:space-y-2">
                            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                              <div>
                                <label className="block text-[9px] md:text-xs font-medium text-gray-600 mb-0.5 md:mb-1">Full Name</label>
                                <Input
                                  value={liveResumeData.personalInfo.fullName}
                                  onChange={(e) => setLiveResumeData(prev => ({
                                    ...prev,
                                    personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                                  }))}
                                  className="h-6 md:h-7 text-[10px] md:text-sm"
                                  placeholder="Enter your full name"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] md:text-xs font-medium text-gray-600 mb-0.5 md:mb-1">Location</label>
                                <Input
                                  value={liveResumeData.personalInfo.location}
                                  onChange={(e) => setLiveResumeData(prev => ({
                                    ...prev,
                                    personalInfo: { ...prev.personalInfo, location: e.target.value }
                                  }))}
                                  className="h-6 md:h-7 text-[10px] md:text-sm"
                                  placeholder="Enter your location"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                              <div>
                                <label className="block text-[9px] md:text-xs font-medium text-gray-600 mb-0.5 md:mb-1">Email Address</label>
                                <Input
                                  value={liveResumeData.personalInfo.email}
                                  onChange={(e) => setLiveResumeData(prev => ({
                                    ...prev,
                                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                                  }))}
                                  className="h-6 md:h-7 text-[10px] md:text-sm"
                                  placeholder="Enter your email"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] md:text-xs font-medium text-gray-600 mb-0.5 md:mb-1">Phone Number</label>
                                <Input
                                  value={liveResumeData.personalInfo.phone}
                                  onChange={(e) => setLiveResumeData(prev => ({
                                    ...prev,
                                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                                  }))}
                                  className="h-6 md:h-7 text-[10px] md:text-sm"
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Professional Summary */}
                        <div className="space-y-1 md:space-y-2 hidden md:block">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-800 capitalize tracking-wider">Professional Summary</h3>
                          </div>
                          <div>
                            <Textarea
                              value={liveResumeData.personalInfo.summary}
                              onChange={(e) => setLiveResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, summary: e.target.value }
                              }))}
                              className="h-16 text-sm resize-none"
                              placeholder="Write a brief summary of your professional experience..."
                            />
                          </div>
                        </div>

                        {/* Work Experience */}
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full"></div>
                            <h3 className="text-[10px] md:text-sm font-bold text-gray-800 capitalize tracking-wider">Work Experience</h3>
                          </div>

                          {/* Experience 1 */}
                          <div className="p-2 md:p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="space-y-1.5 md:space-y-2">
                              <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                                <div>
                                  <label className="block text-[9px] md:text-xs font-medium text-gray-600 mb-0.5 md:mb-1">Job Title</label>
                                  <Input
                                    value={liveResumeData.experience[0]?.position || ""}
                                    onChange={(e) => setLiveResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map((exp, idx) =>
                                        idx === 0 ? { ...exp, position: e.target.value } : exp
                                      )
                                    }))}
                                    className="h-6 md:h-7 text-[10px] md:text-sm"
                                    placeholder="Enter job title"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] md:text-xs font-medium text-gray-600 mb-0.5 md:mb-1">Company</label>
                                  <Input
                                    value={liveResumeData.experience[0]?.company || ""}
                                    onChange={(e) => setLiveResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map((exp, idx) =>
                                        idx === 0 ? { ...exp, company: e.target.value } : exp
                                      )
                                    }))}
                                    className="h-6 md:h-7 text-[10px] md:text-sm"
                                    placeholder="Enter company name"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                                  <Input
                                    type="month"
                                    value={toMonthInputValue(liveResumeData.experience[0]?.startDate || "")}
                                    onChange={(e) => setLiveResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map((exp, idx) =>
                                        idx === 0 ? { ...exp, startDate: e.target.value } : exp
                                      )
                                    }))}
                                    className="h-7 text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                                  <Input
                                    type="month"
                                    value={toMonthInputValue(liveResumeData.experience[0]?.endDate || "")}
                                    onChange={(e) => setLiveResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map((exp, idx) =>
                                        idx === 0 ? { ...exp, endDate: e.target.value, current: !e.target.value } : exp
                                      )
                                    }))}
                                    className="h-7 text-sm"
                                    placeholder="Present"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                <Textarea
                                  value={liveResumeData.experience[0]?.description || ""}
                                  onChange={(e) => setLiveResumeData(prev => ({
                                    ...prev,
                                    experience: prev.experience.map((exp, idx) =>
                                      idx === 0 ? { ...exp, description: e.target.value } : exp
                                    )
                                  }))}
                                  className="h-12 text-sm resize-none"
                                  placeholder="Describe your role and achievements..."
                                />
                              </div>
                            </div>
                          </div>

                          {/* Experience 2 */}
                          <div className="p-2 md:p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="space-y-1.5 md:space-y-2">
                              <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                                <div>
                                  <label className="block text-[9px] md:text-xs font-medium text-gray-600 mb-0.5 md:mb-1">Job Title</label>
                                  <Input
                                    value={liveResumeData.experience[1]?.position || ""}
                                    onChange={(e) => setLiveResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map((exp, idx) =>
                                        idx === 1 ? { ...exp, position: e.target.value } : exp
                                      )
                                    }))}
                                    className="h-6 md:h-7 text-[10px] md:text-sm"
                                    placeholder="Enter job title"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] md:text-xs font-medium text-gray-600 mb-0.5 md:mb-1">Company</label>
                                  <Input
                                    value={liveResumeData.experience[1]?.company || ""}
                                    onChange={(e) => setLiveResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map((exp, idx) =>
                                        idx === 1 ? { ...exp, company: e.target.value } : exp
                                      )
                                    }))}
                                    className="h-6 md:h-7 text-[10px] md:text-sm"
                                    placeholder="Enter company name"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                                  <Input
                                    type="month"
                                    value={toMonthInputValue(liveResumeData.experience[1]?.startDate || "")}
                                    onChange={(e) => setLiveResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map((exp, idx) =>
                                        idx === 1 ? { ...exp, startDate: e.target.value } : exp
                                      )
                                    }))}
                                    className="h-7 text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                                  <Input
                                    type="month"
                                    value={toMonthInputValue(liveResumeData.experience[1]?.endDate || "")}
                                    onChange={(e) => setLiveResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map((exp, idx) =>
                                        idx === 1 ? { ...exp, endDate: e.target.value, current: !e.target.value } : exp
                                      )
                                    }))}
                                    className="h-7 text-sm"
                                    placeholder="Present"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                <Textarea
                                  value={liveResumeData.experience[1]?.description || ""}
                                  onChange={(e) => setLiveResumeData(prev => ({
                                    ...prev,
                                    experience: prev.experience.map((exp, idx) =>
                                      idx === 1 ? { ...exp, description: e.target.value } : exp
                                    )
                                  }))}
                                  className="h-12 text-sm resize-none"
                                  placeholder="Describe your role and achievements..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-800 capitalize tracking-wider">Skills</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="relative">
                              <Input
                                value={liveResumeData.skills.map(s => s.name).join(', ')}
                                onChange={(e) => {
                                  const skillsFromInput = e.target.value.split(',')
                                    .map(skill => skill.trim())
                                    .filter(skill => skill.length > 0);
                                  setLiveResumeData(prev => ({
                                    ...prev,
                                    skills: skillsFromInput.map((name, idx) => ({
                                      id: `skill-${idx}`,
                                      name,
                                      level: 8,
                                      category: "core" as const
                                    }))
                                  }));
                                }}
                                className="h-7 text-sm pr-8"
                                placeholder="Type skills separated by commas"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <span className="text-xs text-gray-400">↵</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Live Preview */}
                    <div className="w-full md:w-1/2 bg-white">
                      <div
                        ref={previewContainerRef}
                        className="p-4"
                      >
                        {/* Preview Header */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">Live Preview</h3>
                            <Button
                              onClick={async () => {
                                try {
                                  // Generate PDF using the Executive template
                                  const blob = await pdf(
                                    <ExecutivePDF resumeData={liveResumeData} themeColor="#3b82f6" />
                                  ).toBlob();

                                  // Create download link
                                  const url = URL.createObjectURL(blob);
                                  const link = document.createElement("a");
                                  link.href = url;
                                  link.download = `${liveResumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);

                                  // Cleanup
                                  URL.revokeObjectURL(url);

                                  // Track download in Firestore
                                  await incrementDownloadsCount();
                                } catch (error) {
                                  console.error("Download error:", error);
                                }
                              }}
                              className={cn(primaryButtonClass, "h-9 px-3")}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </Button>
                          </div>
                        </div>

                        {/* Resume Preview - Use Executive Template */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-auto">
                          <div className="flex justify-center py-4">
                            <div
                              style={{
                                transform: `scale(${previewScale})`,
                                transformOrigin: "top center",
                              }}
                              key={JSON.stringify(liveResumeData)}
                            >
                              <div ref={previewContentRef} className="w-[816px]">
                                <ExecutiveTemplate
                                  resumeData={liveResumeData}
                                  themeColor="#3b82f6"
                                />
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
              <div className="inline-flex flex-col sm:flex-row gap-3">
                <Button className={primaryButtonClass} onClick={() => navigate("/dashboard")}>Start Creating Your Resume</Button>
                <Button variant="outline" className={outlinePrimaryButtonClass} onClick={() => navigate("/dashboard")}>
                  Explore All Templates
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Join thousands of professionals who have created stunning resumes with our editor
              </p>
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
                  {/* Editor Header */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200 px-3 md:px-6 py-3 md:py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-400 rounded-full"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-teal-400 rounded-full"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full"></div>
                        <div className="ml-2 md:ml-4 text-[10px] md:text-xs font-semibold text-emerald-700">Live Editor - Click to Edit Directly</div>
                      </div>
                      <Button
                        onClick={async () => {
                          try {
                            const blob = await pdf(
                              <ExecutivePDF resumeData={liveResumeData} themeColor="#059669" />
                            ).toBlob();

                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `${liveResumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            URL.revokeObjectURL(url);

                            // Track download in Firestore
                            await incrementDownloadsCount();
                          } catch (error) {
                            console.error("Download error:", error);
                          }
                        }}
                        className={cn(buttonBaseClass, "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl h-9 px-3")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  {/* Resume with Inline Editing */}
                  <div className="bg-gradient-to-br from-slate-50 to-emerald-50/20 p-4 md:p-8">
                    <div
                      ref={livePreviewContainerRef}
                      className="bg-white border-2 border-emerald-200/60 rounded-lg shadow-xl mx-auto"
                      style={{ maxWidth: "850px" }}
                    >
                      <div
                        className="relative overflow-hidden"
                        style={{
                          height: `${Math.max(livePreviewHeight * livePreviewScale, 500)}px`,
                        }}
                      >
                        <div className="absolute inset-x-0 top-0 flex justify-center">
                          <div
                            style={{
                              transform: `scale(${livePreviewScale})`,
                              transformOrigin: "top center",
                            }}
                            key={JSON.stringify(liveResumeData)}
                          >
                            <div ref={livePreviewContentRef} className="w-[816px]">
                              <InlineEditProvider resumeData={liveResumeData} setResumeData={setLiveResumeData}>
                                <ExecutiveTemplate
                                  resumeData={liveResumeData}
                                  themeColor="#059669"
                                  editable={true}
                                />
                              </InlineEditProvider>
                            </div>
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
                  onClick={() => navigate("/dashboard")}
                >
                  <span>Try Live Editor Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className={cn(buttonBaseClass, "border border-emerald-600 text-emerald-600 hover:bg-emerald-50")}
                  onClick={() => navigate("/dashboard")}
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
                Join thousands of professionals who have landed their dream jobs with our platform
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button className={cn(primaryButtonClass, "group")} onClick={() => navigate("/dashboard")}>
                <span>Get Started Now</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className={neutralButtonClass}
                onClick={() => navigate("/dashboard")}
              >
                View Examples
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                <span>5 Minutes Setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-3 w-3" />
                <span>No Download Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-5">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} ResumeCook. Crafted to help you land your next role.</div>
            <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-wide">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
