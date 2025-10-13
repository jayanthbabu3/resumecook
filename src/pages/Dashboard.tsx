import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Briefcase,
  Code,
  GraduationCap,
  Calculator,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { TemplateCarousel } from "@/components/TemplateCarousel";

const professions = [
  {
    id: "software",
    name: "Software Development",
    description: "Professional templates optimized for developers and engineers",
    icon: Code,
    templates: [
      "software",
      "frontend",
      "backend",
      "fullstack",
      "senior",
      "senior-frontend",
      "senior-backend",
    ],
  },
  {
    id: "freshers",
    name: "Freshers & Entry Level",
    description: "Professional templates designed for career starters and graduates",
    icon: GraduationCap,
    templates: ["graduate", "starter", "fresher", "premium-fresher", "fresher-elite"],
  },
  {
    id: "all",
    name: "Universal Professions",
    description: "Professional templates suitable for any industry and role",
    icon: Briefcase,
    templates: [
      "professional",
      "modern",
      "minimal",
      "executive",
      "premium-universal",
      "premium-pro",
    ],
  },
];

const templates = [
  {
    id: "professional",
    name: "Classic Professional",
    description:
      "Traditional single-column format ideal for corporate environments",
    highlights: ["Single Column", "ATS-Optimized", "Clean Design"],
  },
  {
    id: "modern",
    name: "Contemporary Design",
    description: "Contemporary design perfect for creative industries",
    highlights: ["Two-Column", "Modern Typography", "Creative Layout"],
  },
  {
    id: "minimal",
    name: "Elegant Minimal",
    description: "Sophisticated simplicity with generous whitespace",
    highlights: ["Generous Whitespace", "Easy to Scan", "Timeless"],
  },
  {
    id: "executive",
    name: "Executive Leadership",
    description: "Bold design crafted for senior positions and leadership",
    highlights: ["Strong Presence", "Premium Aesthetic", "Leadership Style"],
  },
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Tech-focused design with skills grid layout",
    highlights: ["Skills Grid", "Tech-Optimized", "Modern Look"],
  },
  {
    id: "fullstack",
    name: "Full Stack Engineer",
    description:
      "Professional layout showcasing comprehensive technical expertise",
    highlights: ["Single Column", "Color Themes", "Professional Tech"],
  },
  {
    id: "backend",
    name: "Backend Developer",
    description: "Clean technical design focused on backend development",
    highlights: ["Technical & Clean", "API-Focused", "Backend Optimized"],
  },
  {
    id: "graduate",
    name: "Graduate Excellence",
    description: "Modern two-column layout emphasizing education and potential",
    highlights: ["Two-Column", "Education-Focused", "Premium Design"],
  },
  {
    id: "starter",
    name: "Career Starter",
    description:
      "Clean single-column design perfect for entry-level candidates",
    highlights: ["Single Column", "Skills Highlight", "Fresh Look"],
  },
  {
    id: "fresher",
    name: "Fresher Premium",
    description:
      "ATS-optimized premium template with elegant design for fresh graduates",
    highlights: ["ATS-Friendly", "Premium Design", "Two-Column Layout"],
  },
  {
    id: "premium-fresher",
    name: "Premium Graduate",
    description:
      "Modern premium template with gradient design and skill levels for fresh graduates",
    highlights: ["Gradient Design", "Skill Levels", "Modern Layout", "ATS-Optimized"],
  },
  {
    id: "fresher-elite",
    name: "Fresher Elite",
    description:
      "Modern premium design with colored header, timeline layout, and visual skill indicators",
    highlights: ["Colored Header", "Timeline Design", "Visual Skills", "ATS-Optimized"],
  },
  {
    id: "premium-universal",
    name: "Premium Universal",
    description:
      "Elegant and simple ATS-friendly template suitable for all industries and experience levels",
    highlights: ["ATS-Optimized", "Clean Layout", "Universal Design", "Professional"],
  },
  {
    id: "premium-pro",
    name: "Premium Pro",
    description:
      "Modern premium design with side accent panel and sophisticated typography",
    highlights: ["Side Accent Panel", "Modern Design", "ATS-Optimized", "Distinctive"],
  },
  {
    id: "software",
    name: "Lead Software Engineer",
    description:
      "Striking two-column layout with strengths, achievements, and theme variants",
    highlights: ["Bold Header", "Impact Metrics", "Theme Variants"],
  },
  {
    id: "senior-frontend",
    name: "Senior Frontend Designer",
    description:
      "Vibrant two-column layout with visual skill charts and project highlights",
    highlights: ["Creative Layout", "Skill Charts", "UI/UX Focus"],
  },
  {
    id: "senior-backend",
    name: "Senior Backend Engineer",
    description:
      "Reliability-first layout focused on distributed systems, scale, and leadership",
    highlights: [
      "Architecture Focus",
      "Reliability Metrics",
      "Team Leadership",
    ],
  },
  {
    id: "senior",
    name: "Senior Software Engineer",
    description:
      "Two-column layout highlighting achievements and technical leadership",
    highlights: ["Two-Column", "Achievement Focused", "Tech Leadership"],
  },
  {
    id: "analyst",
    name: "Business Analyst",
    description:
      "Clean professional layout with profile photo, blue accents, and organized sections",
    highlights: ["Profile Photo", "Blue Theme", "Professional Layout", "ATS-Optimized"],
  },
  {
    id: "elite",
    name: "Elite Professional",
    description:
      "Premium elegant template with left accent bar and sophisticated typography for all professions",
    highlights: ["Left Accent Bar", "Elegant Design", "Universal", "ATS-Friendly"],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-background">
      <Header />


      {/* Elegant Header */}
      <div className="border-b border-border/30 bg-gradient-to-br from-muted/5 via-muted/10 to-muted/5">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Professional Resume Templates
              </h1>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Choose from our curated collection of templates designed for different career stages.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {/* Experienced Professionals Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/15 to-blue-600/8 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                For Experienced Professionals
              </h2>
              <p className="text-sm text-muted-foreground">
                Advanced templates designed for seasoned professionals
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">
                {templates.filter(t => !['fresher', 'graduate', 'starter', 'premium-fresher', 'fresher-elite'].includes(t.id)).length}
              </span>
            </div>
          </div>
          
          <TemplateCarousel
            templates={templates.filter(t => !['fresher', 'graduate', 'starter', 'premium-fresher', 'fresher-elite'].includes(t.id))}
            themeColors={["#2563eb", "#7c3aed", "#059669", "#e11d48", "#ea580c", "#0d9488"]}
            onTemplateSelect={(templateId) => {
              navigate(`/editor/${templateId}`);
            }}
          />
        </section>

        {/* Freshers Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/15 to-green-600/8 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                For Freshers & New Graduates
              </h2>
              <p className="text-sm text-muted-foreground">
                Beginner-friendly templates for new graduates and entry-level positions
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs font-medium text-green-700">
                {templates.filter(t => ['fresher', 'graduate', 'starter', 'premium-fresher', 'fresher-elite'].includes(t.id)).length}
              </span>
            </div>
          </div>
          
          <TemplateCarousel
            templates={templates.filter(t => ['fresher', 'graduate', 'starter', 'premium-fresher', 'fresher-elite'].includes(t.id))}
            themeColors={["#059669", "#0d9488", "#2563eb", "#7c3aed", "#e11d48", "#ea580c"]}
            onTemplateSelect={(templateId) => {
              navigate(`/editor/${templateId}`);
            }}
          />
        </section>


        {/* Features Section */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Why Choose Our Templates?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern design principles and optimized for success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Fully Customizable</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Modify colors, fonts, sections, and layout to match your personal style and brand
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center group-hover:from-emerald-200 group-hover:to-emerald-100 transition-all duration-300">
                  <Calculator className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">ATS Optimized</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All templates are designed to pass Applicant Tracking Systems and get noticed
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Professional Quality</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Industry-standard designs that impress recruiters and hiring managers
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
