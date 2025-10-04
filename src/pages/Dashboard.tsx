import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and elegant design perfect for corporate positions and formal industries",
    features: ["Single column", "Clear sections", "Corporate-friendly"],
    badge: "Most Popular",
    color: "bg-blue-500"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary two-column layout ideal for creative and tech professionals",
    features: ["Two columns", "Creative layout", "Skills sidebar"],
    badge: "Trending",
    color: "bg-purple-500"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and sophisticated design that highlights your experience beautifully",
    features: ["Clean design", "White space", "Easy to read"],
    badge: "Simple",
    color: "bg-teal-500"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium template designed for senior positions and leadership roles",
    features: ["Bold headers", "Strategic color", "Leadership focus"],
    badge: "Premium",
    color: "bg-indigo-500"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Choose Your Template</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Select a Template to Get Started
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pick a professionally designed template that matches your style and industry. 
              You can customize everything later.
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 gap-8 pt-8">
            {templates.map((template, index) => (
              <Card 
                key={template.id}
                className="group relative cursor-pointer transition-all duration-500 hover:shadow-premium border hover:border-primary/30 animate-scale-in overflow-hidden bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/editor/${template.id}`)}
              >
                {/* Decorative gradient orb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                
                <CardHeader className="relative space-y-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${template.color} group-hover:scale-125 transition-transform duration-300`} />
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {template.badge}
                        </span>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                        {template.name}
                      </CardTitle>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-primary/10">
                      <FileText className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative space-y-4">
                  {/* Features list */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-lg bg-muted border border-border text-muted-foreground font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* Preview mockup */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 group-hover:border-primary/20 transition-colors duration-300 min-h-[120px] flex items-center justify-center">
                    <div className="space-y-2 w-full">
                      <div className="h-3 bg-primary/20 rounded w-3/4 group-hover:bg-primary/30 transition-colors" />
                      <div className="h-2 bg-muted-foreground/20 rounded w-full" />
                      <div className="h-2 bg-muted-foreground/20 rounded w-5/6" />
                      <div className="h-2 bg-muted-foreground/10 rounded w-4/6 mt-3" />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-hover group-hover:shadow-lg transition-all duration-300 font-semibold"
                    size="lg"
                  >
                    Use This Template
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
