import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    "ATS-friendly templates",
    "Real-time preview",
    "Easy customization",
    "Professional designs"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary">
              ResumeFlow
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
          {/* Main Content */}
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Professional Resume Builder</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Creating Competitive
              <br />
              <span className="text-primary">
                Resumes is Easy Now
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Build professional, ATS-friendly resumes in minutes with our intuitive builder. 
              Stand out from the crowd and land your dream job.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto py-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 justify-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-base px-8 py-6 bg-primary hover:bg-primary-hover transition-colors shadow-premium group"
              onClick={() => navigate("/dashboard")}
            >
              <span>Create Your Resume</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              <span>No credit card required • Free to start</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-premium transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ATS-Friendly Templates</h3>
              <p className="text-sm text-muted-foreground">
                Our templates are optimized to pass Applicant Tracking Systems
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-premium transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Preview</h3>
              <p className="text-sm text-muted-foreground">
                See your changes instantly as you build your resume
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-premium transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Customization</h3>
              <p className="text-sm text-muted-foreground">
                Add, remove, and rearrange sections with simple clicks
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 mt-12 border-t border-border/50">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">Resumes Created</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
