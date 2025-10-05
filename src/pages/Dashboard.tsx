import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Briefcase, Code, GraduationCap, Calculator, Users, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const professions = [
  {
    id: "software",
    name: "Software Development",
    description: "Templates optimized for developers and engineers",
    icon: Code,
    templates: ["frontend", "backend", "fullstack", "senior", "senior-frontend", "senior-backend"]
  },
  {
    id: "freshers",
    name: "Freshers & Entry Level",
    description: "Clean and professional templates for career starters",
    icon: GraduationCap,
    templates: ["graduate", "starter", "minimal", "professional"]
  },
  {
    id: "accountants",
    name: "Accounting & Finance",
    description: "Professional formats for accounting and finance roles",
    icon: Calculator,
    templates: ["professional", "minimal"]
  },
  {
    id: "teaching",
    name: "Teaching & Education",
    description: "Academic templates for educators and trainers",
    icon: Users,
    templates: ["professional", "minimal"]
  },
  {
    id: "all",
    name: "All Professions",
    description: "Universal templates suitable for any industry",
    icon: Briefcase,
    templates: ["professional", "modern", "minimal", "executive", "senior", "senior-frontend", "senior-backend"]
  }
];

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Traditional single-column format ideal for corporate environments",
    highlights: ["Single Column", "ATS-Optimized", "Clean Design"]
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design perfect for creative industries",
    highlights: ["Two-Column", "Modern Typography", "Creative Layout"]
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Sophisticated simplicity with generous whitespace",
    highlights: ["Generous Whitespace", "Easy to Scan", "Timeless"]
  },
  {
    id: "executive",
    name: "Executive",
    description: "Bold design crafted for senior positions and leadership",
    highlights: ["Strong Presence", "Premium Aesthetic", "Leadership Style"]
  },
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Tech-focused design with skills grid layout",
    highlights: ["Skills Grid", "Tech-Optimized", "Modern Look"]
  },
  {
    id: "fullstack",
    name: "Full Stack Engineer",
    description: "Professional layout showcasing comprehensive technical expertise",
    highlights: ["Single Column", "Color Themes", "Professional Tech"]
  },
  {
    id: "backend",
    name: "Backend Developer",
    description: "Clean technical design focused on backend development",
    highlights: ["Technical & Clean", "API-Focused", "Backend Optimized"]
  },
  {
    id: "graduate",
    name: "Graduate",
    description: "Modern two-column layout emphasizing education and potential",
    highlights: ["Two-Column", "Education-Focused", "Premium Design"]
  },
  {
    id: "starter",
    name: "Starter",
    description: "Clean single-column design perfect for entry-level candidates",
    highlights: ["Single Column", "Skills Highlight", "Fresh Look"]
  },
  {
    id: "senior-frontend",
    name: "Senior Frontend Designer",
    description: "Vibrant two-column layout with visual skill charts and project highlights",
    highlights: ["Creative Layout", "Skill Charts", "UI/UX Focus"]
  },
  {
    id: "senior-backend",
    name: "Senior Backend Engineer",
    description: "Reliability-first layout focused on distributed systems, scale, and leadership",
    highlights: ["Architecture Focus", "Reliability Metrics", "Team Leadership"]
  },
  {
    id: "senior",
    name: "Senior Software Engineer",
    description: "Two-column layout highlighting achievements and technical leadership",
    highlights: ["Two-Column", "Achievement Focused", "Tech Leadership"]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const focusParam = searchParams.get("focus");
  const categoryParam = searchParams.get("category");

  const [selectedProfession, setSelectedProfession] = useState<string | null>(() => {
    if (focusParam === "templates") {
      return categoryParam ?? "all";
    }
    return null;
  });

  useEffect(() => {
    const target = focusParam === "templates" ? categoryParam ?? "all" : null;
    setSelectedProfession(prev => (prev === target ? prev : target));
  }, [focusParam, categoryParam]);

  const selectedProf = professions.find(p => p.id === selectedProfession);
  const filteredTemplates = selectedProf 
    ? templates.filter(t => selectedProf.templates.includes(t.id))
    : [];

  const breadcrumbExtras = useMemo(() => {
    if (!selectedProfession) return undefined;
    const professionName = selectedProf?.name ?? "Templates";
    return [
      { label: "Professions", path: "/dashboard" },
      { label: professionName },
    ];
  }, [selectedProfession, selectedProf]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-6 pt-4">
        <Breadcrumbs extraItems={breadcrumbExtras} />
      </div>

      {/* Hero Section */}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {selectedProfession ? "Choose Your Template" : "Choose Your Profession"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {selectedProfession 
                ? "Select a template that best represents your professional identity"
                : "Select your field to see relevant resume templates"}
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        {/* Professions Grid */}
        {!selectedProfession && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {professions.map((profession, index) => {
              const Icon = profession.icon;
              return (
                <Card
                  key={profession.id}
                  className="group cursor-pointer hover:border-primary transition-all duration-300 hover:shadow-lg animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    setSelectedProfession(profession.id);
                    setSearchParams({ focus: "templates", category: profession.id });
                  }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold">{profession.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {profession.description}
                        </p>
                        <div className="flex items-center text-sm text-primary font-medium pt-2">
                          {profession.templates.length} templates available
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Templates Grid */}
        {selectedProfession && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template, index) => (
              <Card
                key={template.id}
                className="group hover:border-primary transition-all duration-300 hover:shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {template.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => navigate(`/editor/${template.id}`)}
                    size="sm"
                    className="w-full group-hover:shadow-md transition-all"
                  >
                    Select Template
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Info */}
        {!selectedProfession && (
          <div className="max-w-2xl mx-auto mt-16 text-center space-y-3 p-6 rounded-xl bg-muted/30">
            <FileText className="h-8 w-8 text-primary mx-auto" />
            <h3 className="text-xl font-semibold">Fully Customizable</h3>
            <p className="text-muted-foreground text-sm">
              All templates are fully customizable. You can modify colors, fonts, sections, and layout at any time.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
