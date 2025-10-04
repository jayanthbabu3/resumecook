import { Button } from "@/components/ui/button";
import { FileText, Star, Zap, Crown, Check, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const templates = [
  {
    id: "professional",
    name: "Professional",
    tagline: "For Corporate Excellence",
    description: "Perfect for traditional industries and corporate positions",
    icon: FileText,
    gradient: "from-blue-600 to-cyan-500",
    stats: { users: "12.5K", rating: "4.9" },
    features: ["ATS Optimized", "Single Column", "Clean Layout"]
  },
  {
    id: "modern",
    name: "Modern",
    tagline: "Creative & Tech-Ready",
    description: "Stand out in creative and technology fields",
    icon: Zap,
    gradient: "from-purple-600 to-pink-500",
    stats: { users: "9.2K", rating: "4.8" },
    features: ["Two Column", "Visual Impact", "Modern Design"]
  },
  {
    id: "minimal",
    name: "Minimal",
    tagline: "Elegance in Simplicity",
    description: "Less is more - sophisticated and timeless",
    icon: Star,
    gradient: "from-emerald-600 to-teal-500",
    stats: { users: "8.1K", rating: "4.7" },
    features: ["White Space", "Typography Focus", "Scannable"]
  },
  {
    id: "executive",
    name: "Executive",
    tagline: "Leadership Presence",
    description: "Command attention for senior-level positions",
    icon: Crown,
    gradient: "from-indigo-600 to-violet-500",
    stats: { users: "6.8K", rating: "5.0" },
    features: ["Bold Headers", "Premium Feel", "Authority"]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>4 Professional Templates Available</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Choose Your Perfect
              <span className="text-primary"> Resume Template</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each template is crafted to help you stand out. Pick the one that matches your 
              industry and personal style.
            </p>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid gap-6 max-w-6xl mx-auto">
          {templates.map((template, index) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-premium animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid md:grid-cols-[1fr,2fr] gap-0">
                  {/* Left: Visual Section */}
                  <div className={`relative p-8 bg-gradient-to-br ${template.gradient} text-white overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-between min-h-[280px]">
                      <div className="space-y-4">
                        <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{template.name}</h3>
                          <p className="text-white/80 text-sm font-medium">{template.tagline}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 pt-6 border-t border-white/20">
                        <div>
                          <div className="text-2xl font-bold">{template.stats.users}</div>
                          <div className="text-xs text-white/70">Users</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold flex items-center gap-1">
                            {template.stats.rating}
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                          <div className="text-xs text-white/70">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Details Section */}
                  <div className="p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {template.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-foreground">Key Features:</div>
                        <div className="grid gap-2">
                          {template.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Preview mockup */}
                      <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20" />
                          <div className="space-y-1 flex-1">
                            <div className="h-2 bg-primary/30 rounded w-1/3" />
                            <div className="h-1.5 bg-muted-foreground/20 rounded w-1/2" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-1.5 bg-muted-foreground/20 rounded w-full" />
                          <div className="h-1.5 bg-muted-foreground/20 rounded w-5/6" />
                          <div className="h-1.5 bg-muted-foreground/10 rounded w-4/6" />
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate(`/editor/${template.id}`)}
                      className="w-full mt-6 bg-primary hover:bg-primary-hover group-hover:shadow-lg transition-all"
                      size="lg"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Start with {template.name}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center space-y-4 p-8 rounded-2xl bg-muted/30 border border-border">
          <h3 className="text-2xl font-bold">Not sure which to choose?</h3>
          <p className="text-muted-foreground">
            Start with any template - you can customize fonts, colors, and layout as you build your resume.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
