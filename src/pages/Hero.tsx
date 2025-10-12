import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Zap, Users, TrendingUp, Shield, Star, Award, Clock, Globe, Target, ChevronRight, Eye, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TemplateCarousel } from "@/components/TemplateCarousel";
import { pdf } from "@react-pdf/renderer";
import { ModernPDF } from "@/components/resume/pdf/ModernPDF";
import { ModernTemplate } from "@/components/resume/templates/ModernTemplate";
import { registerPDFFonts } from "@/lib/pdfFonts";

// Register fonts for PDF generation
registerPDFFonts();

const Hero = () => {
  const navigate = useNavigate();

  // State for interactive demo form
  const [demoFormData, setDemoFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about creating scalable web applications and leading technical teams.",
    jobTitle: "Senior Software Engineer",
    company: "Tech Solutions Inc.",
    startDate: "2022-01-01",
    endDate: "",
    description: "Led development of scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "Python"]
  });

  // Separate state for skills input - initialize with existing skills
  const [skillsInput, setSkillsInput] = useState("React, Node.js, JavaScript, TypeScript, Python");

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
      <div className="container mx-auto px-6 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 pt-6 lg:py-6  bg-gradient-to-br from-background via-muted/10 to-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side - Content */}
              <div className="space-y-6">
              {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                  <span>AI-Powered Resume Builder</span>
              </div>

              {/* Headline */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  Creating Competitive
                  <br />
                  <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Resumes is Easy Now
                  </span>
                </h1>

              {/* Subheadline */}
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Pick your role, choose a template, let AI tailor your resume to any job description. 
                  Get hired faster with professional, ATS-optimized resumes.
              </p>

              {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="default"
                  className="text-sm px-6 py-3 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  onClick={() => navigate("/dashboard")}
                >
                    <span>Start Building Free</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="text-sm px-6 py-3 border hover:bg-muted/50 transition-all duration-300"
                >
                  View Templates
                </Button>
              </div>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">2.4k+</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">95%</div>
                    <div className="text-xs text-muted-foreground">ATS Compatible</div>
            </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">4.9</div>
                    <div className="text-xs text-muted-foreground">User Rating</div>
          </div>
        </div>
              </div>

              {/* Right Side - Enhanced Visual Demo */}
              <div className="relative">
                {/* Modern App Mockup */}
                <div className="relative mx-auto max-w-5xl">
                  {/* App Container with Glow Effect */}
                  <div className="relative">
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl blur-xl scale-105"></div>
                    
                    {/* Main App Window */}
                    <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl p-4 border border-gray-200/50">
                      {/* App Header */}
                      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-xl border-b border-primary/20">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                        </div>
                        <div className="flex-1 text-center">
                          <span className="text-sm font-semibold text-gray-800">Resume Builder - Editor</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="px-2 py-1 bg-emerald-500/20 rounded-md border border-emerald-500/30">
                            <span className="text-xs text-emerald-600 font-medium">LIVE</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="bg-white rounded-b-xl overflow-hidden h-[520px]">
                        {/* Main Layout */}
                        <div className="flex h-full">
                          {/* Left Side - Form Editor */}
                          <div className="w-1/2 p-6 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 border-r border-gray-200">
                            <div className="space-y-6">
                              {/* Personal Information */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <h3 className="text-sm font-bold text-gray-800 capitalize tracking-wider">Personal Information</h3>
                                </div>
                                <div className="space-y-3">
                                  <div className="space-y-2">
                                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                                    <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                                    <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                                  </div>
                                </div>
                              </div>

                              {/* Work Experience */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                  <h3 className="text-sm font-bold text-gray-800 capitalize tracking-wider">Work Experience</h3>
                                </div>
                                <div className="space-y-3">
                                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-3 bg-gradient-to-r from-primary/40 to-primary/30 rounded w-4/5 mb-2"></div>
                                    <div className="h-2 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="space-y-1">
                                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                                      <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                                      <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                                    </div>
                                  </div>
                                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-3 bg-gradient-to-r from-emerald-400/40 to-emerald-300/30 rounded w-3/4 mb-2"></div>
                                    <div className="h-2 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="space-y-1">
                                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                                      <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Skills */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <h3 className="text-sm font-bold text-gray-800 capitalize tracking-wider">Skills</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <div className="h-7 bg-gradient-to-r from-primary/15 to-primary/10 rounded-full px-4 flex items-center border border-primary/20">
                                    <div className="w-14 h-2 bg-gradient-to-r from-primary/60 to-primary/40 rounded"></div>
                                  </div>
                                  <div className="h-7 bg-gradient-to-r from-emerald-500/15 to-emerald-500/10 rounded-full px-4 flex items-center border border-emerald-500/20">
                                    <div className="w-10 h-2 bg-gradient-to-r from-emerald-500/60 to-emerald-500/40 rounded"></div>
                                  </div>
                                  <div className="h-7 bg-gradient-to-r from-blue-500/15 to-blue-500/10 rounded-full px-4 flex items-center border border-blue-500/20">
                                    <div className="w-18 h-2 bg-gradient-to-r from-blue-500/60 to-blue-500/40 rounded"></div>
                                  </div>
                                  <div className="h-7 bg-gradient-to-r from-purple-500/15 to-purple-500/10 rounded-full px-4 flex items-center border border-purple-500/20">
                                    <div className="w-12 h-2 bg-gradient-to-r from-purple-500/60 to-purple-500/40 rounded"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Side - Resume Preview */}
                          <div className="w-1/2 p-6 bg-white overflow-y-auto">
                            <div className="space-y-6">
                              {/* Header */}
                              <div className="border-b-2 border-primary/20 pb-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-18 h-18 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-2xl">JD</span>
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-3/4"></div>
                                    <div className="h-4 bg-primary/60 rounded w-1/2"></div>
                                    <div className="flex gap-4 mt-2">
                                      <div className="h-3 bg-gray-300 rounded w-32"></div>
                                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Experience */}
                              <div className="space-y-4">
                                <div className="h-5 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-28"></div>
                                <div className="space-y-4">
                                  <div className="border-l-4 border-primary/30 pl-4 space-y-2">
                                    <div className="flex justify-between items-start">
                                      <div className="space-y-1">
                                        <div className="h-4 bg-gray-500 rounded w-48"></div>
                                        <div className="h-3 bg-primary/50 rounded w-32"></div>
                                      </div>
                                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                                      <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                  </div>
                                  
                                  <div className="border-l-4 border-emerald-500/30 pl-4 space-y-2">
                                    <div className="flex justify-between items-start">
                                      <div className="space-y-1">
                                        <div className="h-4 bg-gray-500 rounded w-40"></div>
                                        <div className="h-3 bg-emerald-500/50 rounded w-28"></div>
                                      </div>
                                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Skills */}
                              <div className="space-y-4">
                                <div className="h-5 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-20"></div>
                                <div className="flex flex-wrap gap-2">
                                  <div className="h-6 bg-primary/10 rounded-full w-20 border border-primary/20"></div>
                                  <div className="h-6 bg-emerald-500/10 rounded-full w-16 border border-emerald-500/20"></div>
                                  <div className="h-6 bg-blue-500/10 rounded-full w-24 border border-blue-500/20"></div>
                                  <div className="h-6 bg-purple-500/10 rounded-full w-18 border border-purple-500/20"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Feature Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm font-bold text-foreground">2.4k+</div>
                      <div className="text-xs text-muted-foreground">Active Users</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-600" />
                    <div>
                      <div className="text-xs font-semibold text-foreground">AI-Powered</div>
                      <div className="text-xs text-muted-foreground">Smart suggestions</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <div>
                      <div className="text-xs font-semibold text-foreground">ATS Optimized</div>
                      <div className="text-xs text-muted-foreground">100% Compatible</div>
                    </div>
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Full Height with Animation */}
      <section className="min-h-screen bg-muted/20 flex items-center">
        <div className="container mx-auto px-6 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary backdrop-blur-sm">
                <Zap className="h-4 w-4" />
                <span>Quick & Easy Process</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Create Your Resume in 
                <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> 3 Simple Steps</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                    <div className="h-16 w-1 bg-gradient-to-b from-primary/60 to-emerald-500/60 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                      <ArrowRight className="h-4 w-4 text-emerald-500 rotate-90 animate-pulse" />
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
                    <div className="h-16 w-1 bg-gradient-to-b from-emerald-500/60 to-blue-500/60 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                      <ArrowRight className="h-4 w-4 text-blue-500 rotate-90 animate-pulse" />
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
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
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
      <section className="py-16 relative overflow-hidden">
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

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium text-primary">
                <Palette className="h-4 w-4" />
                <span>Premium Templates</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Choose from <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Professional Templates</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Browse our collection of beautifully designed, ATS-optimized resume templates. Each template is crafted for specific industries and experience levels.
              </p>
            </div>

            <TemplateCarousel
              templates={[
                {
                  id: "professional",
                  name: "Professional",
                  description: "Traditional single-column layout optimized for corporate roles",
                  highlights: ["ATS-Friendly", "Corporate", "Clean Design"]
                },
                {
                  id: "modern",
                  name: "Modern",
                  description: "Contemporary two-column design for creative and product teams",
                  highlights: ["Creative", "Two-Column", "Modern Layout"]
                },
                {
                  id: "software",
                  name: "Software Engineer",
                  description: "Bold two-column layout with impact metrics and achievements",
                  highlights: ["Tech-Focused", "Metrics", "Leadership"]
                },
                {
                  id: "fresher",
                  name: "Fresher Premium",
                  description: "ATS-optimized premium template for fresh graduates",
                  highlights: ["Entry-Level", "ATS-Friendly", "Premium"]
                },
                {
                  id: "executive",
                  name: "Executive",
                  description: "Bold leadership-focused layout for senior candidates",
                  highlights: ["Leadership", "Executive", "Bold Design"]
                },
                {
                  id: "minimal",
                  name: "Minimal",
                  description: "Sophisticated whitespace-focused template for easy scanning",
                  highlights: ["Clean", "Minimalist", "Easy to Read"]
                }
              ]}
              themeColors={["#7c3aed", "#2563eb", "#059669", "#e11d48", "#ea580c", "#0d9488"]}
              onTemplateSelect={(templateId) => {
                navigate(`/editor/${templateId}`);
              }}
              className="mb-8"
            />

            <div className="text-center">
              <Button
                size="lg"
                className="text-base px-8 py-4 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => navigate("/dashboard")}
              >
                <span>View All Templates</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 mx-auto rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
                <p className="text-xs text-muted-foreground">See exactly how your resume will look</p>
              </div>
              <div className="text-center space-y-2">
                <div className="h-12 w-12 mx-auto rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">ATS Optimized</h3>
                <p className="text-xs text-muted-foreground">All templates pass ATS screening</p>
              </div>
              <div className="text-center space-y-2">
                <div className="h-12 w-12 mx-auto rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Customizable</h3>
                <p className="text-xs text-muted-foreground">Easy to customize and personalize</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Resume Editor Works */}
      <section className="py-20 relative overflow-hidden">
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

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground mb-6">
                See How Our <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Resume Editor</span> Works
              </h2>
              
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience our intuitive editor with real-time preview. Watch how your resume comes to life as you type, 
                with professional templates that adapt to your content instantly.
              </p>
            </div>

            {/* Interactive Editor Demo */}
            <div className="relative">
              {/* Editor Container with Glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 rounded-3xl blur-2xl scale-105"></div>
                
                <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                  {/* Editor Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="ml-4 text-xs font-semibold text-gray-700">Resume Editor - Live Demo</div>
                      </div>
                     
                    </div>
                  </div>

                  {/* Main Editor Layout */}
                  <div className="flex h-[600px]">
                    {/* Left Side - Form Editor */}
                    <div className="w-1/2 bg-gradient-to-br from-slate-50 to-gray-50 border-r border-gray-200">
                      <div className="p-4 space-y-4 h-full overflow-hidden">
                        {/* Personal Information */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-800 capitalize tracking-wider">Personal Information</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                                <Input 
                                  value={demoFormData.fullName}
                                  onChange={(e) => updateFormData('fullName', e.target.value)}
                                  className="h-7 text-sm"
                                  placeholder="Enter your full name"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                                <Input 
                                  value={demoFormData.location}
                                  onChange={(e) => updateFormData('location', e.target.value)}
                                  className="h-7 text-sm"
                                  placeholder="Enter your location"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                                <Input 
                                  value={demoFormData.email}
                                  onChange={(e) => updateFormData('email', e.target.value)}
                                  className="h-7 text-sm"
                                  placeholder="Enter your email"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                                <Input 
                                  value={demoFormData.phone}
                                  onChange={(e) => updateFormData('phone', e.target.value)}
                                  className="h-7 text-sm"
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Professional Summary */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-800 capitalize tracking-wider">Professional Summary</h3>
                          </div>
                          <div>
                            <Textarea 
                              value={demoFormData.summary}
                              onChange={(e) => updateFormData('summary', e.target.value)}
                              className="h-16 text-sm resize-none"
                              placeholder="Write a brief summary of your professional experience..."
                            />
                          </div>
                        </div>

                        {/* Work Experience */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-800 capitalize tracking-wider">Work Experience</h3>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
                                  <Input 
                                    value={demoFormData.jobTitle}
                                    onChange={(e) => updateFormData('jobTitle', e.target.value)}
                                    className="h-7 text-sm"
                                    placeholder="Enter job title"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
                                  <Input 
                                    value={demoFormData.company}
                                    onChange={(e) => updateFormData('company', e.target.value)}
                                    className="h-7 text-sm"
                                    placeholder="Enter company name"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                                  <Input 
                                    type="month"
                                    value={demoFormData.startDate}
                                    onChange={(e) => updateFormData('startDate', e.target.value)}
                                    className="h-7 text-sm"
                                    defaultValue="2022-01"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                                  <Input 
                                    type="month"
                                    value={demoFormData.endDate}
                                    onChange={(e) => updateFormData('endDate', e.target.value)}
                                    className="h-7 text-sm"
                                    placeholder="Present"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                <Textarea 
                                  value={demoFormData.description}
                                  onChange={(e) => updateFormData('description', e.target.value)}
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
                                value={skillsInput}
                                onChange={(e) => {
                                  setSkillsInput(e.target.value);
                                  // Update skills array in real-time as user types
                                  const skillsFromInput = e.target.value.split(',')
                                    .map(skill => skill.trim())
                                    .filter(skill => skill.length > 0);
                                  setDemoFormData(prev => ({
                                    ...prev,
                                    skills: skillsFromInput
                                  }));
                                }}
                                className="h-7 text-sm pr-8"
                                placeholder="Type skills separated by commas"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    // Just prevent form submission, let the onChange handle it
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
                    <div className="w-1/2 bg-white">
                      <div className="p-4 h-full overflow-hidden">
                        {/* Preview Header */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">Live Preview</h3>
                            <button 
                              onClick={async () => {
                                try {
                                  // Convert demo data to proper ResumeData format
                                  const resumeData = convertToResumeData();
                                  
                                  // Generate PDF using the actual ModernPDF template
                                  const blob = await pdf(
                                    <ModernPDF resumeData={resumeData} themeColor="#3b82f6" />
                                  ).toBlob();
                                  
                                  // Create download link
                                  const url = URL.createObjectURL(blob);
                                  const link = document.createElement("a");
                                  link.href = url;
                                  link.download = `${demoFormData.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                  
                                  // Cleanup
                                  URL.revokeObjectURL(url);
                                } catch (error) {
                                  console.error("Download error:", error);
                                }
                              }}
                              className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-1"
                            >
                              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-xs text-primary font-medium">Download Resume</span>
                            </button>
                          </div>
                        </div>

                        {/* Resume Preview - Use actual ModernTemplate */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full overflow-y-auto">
                          <div className="scale-[0.35] origin-top-left w-[285%]" key={JSON.stringify(demoFormData)}>
                            <ModernTemplate 
                              resumeData={convertToResumeData()} 
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

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="inline-flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg text-sm">
                  Start Creating Your Resume
                </button>
                <button className="px-6 py-2 bg-white text-primary border border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-sm">
                  Explore All Templates
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Join thousands of professionals who have created stunning resumes with our editor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
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
      <section className="py-16">
        <div className="container mx-auto px-6">
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
              <Button
                size="default"
                className="text-sm px-6 py-3 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => navigate("/dashboard")}
              >
                <span>Get Started Now</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="default"
                className="text-sm px-6 py-3 border hover:bg-muted/50 transition-all duration-300"
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
    </div>
  );
};

export default Hero;
