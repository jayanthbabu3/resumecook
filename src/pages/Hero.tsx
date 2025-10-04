import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            {/* Main Content */}
            <div className="text-center space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Professional Resume Builder</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Creating Competitive
                <br />
                <span className="text-primary">
                  Resumes is Easy Now
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Build professional, ATS-friendly resumes in minutes with our intuitive builder. 
                Stand out from the crowd and land your dream job.
              </p>
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto">
              <div className="p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-premium transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-1">ATS-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized to pass Applicant Tracking Systems
                </p>
              </div>
              
              <div className="p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-premium transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-1">Real-Time Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See changes instantly as you build
                </p>
              </div>
              
              <div className="p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-premium transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-1">Easy Customization</h3>
                <p className="text-sm text-muted-foreground">
                  Add and rearrange sections with clicks
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 border-t border-border/50">
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-xs text-muted-foreground">Resumes Created</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-primary">4.9★</div>
                <div className="text-xs text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
