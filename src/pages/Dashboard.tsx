import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Briefcase, Code, Palette, Users, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const professions = [
  {
    id: "software",
    name: "Software Development",
    description: "Templates optimized for developers and engineers",
    icon: Code,
    templates: ["frontend", "backend", "fullstack"]
  },
  {
    id: "creative",
    name: "Creative & Design",
    description: "Modern layouts for creative professionals",
    icon: Palette,
    templates: ["modern", "minimal"]
  },
  {
    id: "business",
    name: "Business & Corporate",
    description: "Professional formats for business roles",
    icon: Briefcase,
    templates: ["professional", "minimal"]
  },
  {
    id: "executive",
    name: "Leadership & Executive",
    description: "Premium designs for senior positions",
    icon: Users,
    templates: ["executive", "professional"]
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
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);

  const selectedProf = professions.find(p => p.id === selectedProfession);
  const filteredTemplates = selectedProf 
    ? templates.filter(t => selectedProf.templates.includes(t.id))
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
        {/* Back Button */}
        {selectedProfession && (
          <Button
            onClick={() => setSelectedProfession(null)}
            variant="outline"
            className="mb-8 max-w-6xl mx-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Professions
          </Button>
        )}

        {/* Professions Grid */}
        {!selectedProfession && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {professions.map((profession, index) => {
              const Icon = profession.icon;
              return (
                <Card
                  key={profession.id}
                  className="group cursor-pointer hover:border-primary transition-all duration-300 hover:shadow-lg animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedProfession(profession.id)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-semibold">{profession.name}</h3>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
