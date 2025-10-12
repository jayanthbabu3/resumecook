import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Search, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  ArrowRight,
  Check,
  X,
  Eye,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Award,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const ATSGuidelines = () => {
  const navigate = useNavigate();

  const atsRequirements = [
    {
      title: "File Format",
      description: "Always use .docx or .pdf formats",
      icon: FileText,
      details: "ATS systems work best with standard document formats. Avoid .pages, .rtf, or other proprietary formats."
    },
    {
      title: "Font Selection",
      description: "Use standard, readable fonts",
      icon: Eye,
      details: "Stick to Arial, Calibri, Times New Roman, or Helvetica. Avoid decorative or script fonts."
    },
    {
      title: "Section Headers",
      description: "Use clear, standard section names",
      icon: Target,
      details: "Use 'Work Experience', 'Education', 'Skills' instead of creative alternatives like 'Professional Journey'."
    },
    {
      title: "Keywords",
      description: "Include relevant industry keywords",
      icon: Search,
      details: "Match keywords from the job description. Use both exact matches and variations."
    },
    {
      title: "Contact Information",
      description: "Place contact info at the top",
      icon: Users,
      details: "Include name, phone, email, and location. Avoid complex formatting or graphics."
    },
    {
      title: "Chronological Order",
      description: "List experience in reverse chronological order",
      icon: Clock,
      details: "Most recent experience first. Include dates for all positions and education."
    }
  ];

  const atsBestPractices = [
    {
      title: "Use Standard Section Names",
      icon: CheckCircle2,
      content: [
        "Work Experience",
        "Education", 
        "Skills",
        "Certifications",
        "Professional Summary"
      ]
    },
    {
      title: "Include Quantifiable Achievements",
      icon: TrendingUp,
      content: [
        "Increased sales by 25%",
        "Managed team of 10 employees",
        "Reduced costs by $50,000",
        "Improved efficiency by 30%"
      ]
    },
    {
      title: "Use Action Verbs",
      icon: Zap,
      content: [
        "Achieved, Managed, Led",
        "Developed, Implemented, Created",
        "Improved, Increased, Reduced",
        "Collaborated, Coordinated, Organized"
      ]
    },
    {
      title: "Keep Formatting Simple",
      icon: Shield,
      content: [
        "Use bullet points consistently",
        "Avoid tables and complex layouts",
        "Use standard margins (1 inch)",
        "Keep font size 10-12pt"
      ]
    }
  ];

  const atsMistakes = [
    {
      mistake: "Using graphics and images",
      impact: "ATS cannot read images",
      solution: "Use text-based formatting only"
    },
    {
      mistake: "Complex tables or columns",
      impact: "Confuses ATS parsing",
      solution: "Use simple bullet points"
    },
    {
      mistake: "Headers and footers",
      impact: "Content may be ignored",
      solution: "Keep all content in body"
    },
    {
      mistake: "Creative section names",
      impact: "ATS won't recognize sections",
      solution: "Use standard section headers"
    },
    {
      mistake: "Fancy fonts or colors",
      impact: "May not display correctly",
      solution: "Stick to standard fonts"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary backdrop-blur-sm">
              <Target className="h-4 w-4" />
              <span>ATS Optimization Guide</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Master
              <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> ATS</span>
              <br />
              Resume Guidelines
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Learn the essential requirements and best practices for creating ATS-friendly resumes that pass through Applicant Tracking Systems and reach human recruiters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="text-base px-8 py-4 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => navigate("/dashboard")}
              >
                <span>Create ATS-Friendly Resume</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-4 border-2 hover:bg-muted/50 transition-all duration-300"
              >
                View Templates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ATS Visual Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                ATS-Friendly vs Non-ATS Resume
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                See the difference between resumes that pass ATS screening and those that get rejected
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* ATS-Friendly Resume */}
              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    <CardTitle className="text-emerald-800">ATS-Friendly Resume</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-700">
                    This resume will pass ATS screening
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white rounded-lg p-6 border border-emerald-200 shadow-sm">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="text-center border-b border-gray-200 pb-4">
                        <div className="h-6 bg-gray-900 rounded w-48 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-32 mx-auto mb-2"></div>
                        <div className="flex justify-center gap-4">
                          <div className="h-3 bg-gray-500 rounded w-24"></div>
                          <div className="h-3 bg-gray-500 rounded w-20"></div>
                        </div>
                      </div>

                      {/* Experience Section */}
                      <div>
                        <div className="h-5 bg-gray-800 rounded w-32 mb-3"></div>
                        <div className="space-y-3">
                          <div className="border-l-4 border-emerald-500 pl-4">
                            <div className="h-4 bg-gray-700 rounded w-40 mb-1"></div>
                            <div className="h-3 bg-gray-500 rounded w-24 mb-2"></div>
                            <div className="space-y-1">
                              <div className="h-3 bg-gray-400 rounded w-full"></div>
                              <div className="h-3 bg-gray-400 rounded w-4/5"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <div className="h-5 bg-gray-800 rounded w-16 mb-3"></div>
                        <div className="flex flex-wrap gap-2">
                          <div className="h-6 bg-emerald-100 rounded px-3 flex items-center">
                            <div className="w-16 h-2 bg-emerald-600 rounded"></div>
                          </div>
                          <div className="h-6 bg-emerald-100 rounded px-3 flex items-center">
                            <div className="w-12 h-2 bg-emerald-600 rounded"></div>
                          </div>
                          <div className="h-6 bg-emerald-100 rounded px-3 flex items-center">
                            <div className="w-20 h-2 bg-emerald-600 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700 text-sm">
                      <Check className="h-4 w-4" />
                      <span>Standard section headers</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 text-sm">
                      <Check className="h-4 w-4" />
                      <span>Simple formatting</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 text-sm">
                      <Check className="h-4 w-4" />
                      <span>No graphics or tables</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 text-sm">
                      <Check className="h-4 w-4" />
                      <span>Standard fonts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Non-ATS Resume */}
              <Card className="border-red-200 bg-red-50/50">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <XCircle className="h-6 w-6 text-red-600" />
                    <CardTitle className="text-red-800">Non-ATS Resume</CardTitle>
                  </div>
                  <CardDescription className="text-red-700">
                    This resume will likely be rejected by ATS
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white rounded-lg p-6 border border-red-200 shadow-sm">
                    <div className="space-y-4">
                      {/* Header with Graphics */}
                      <div className="text-center border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-center gap-4 mb-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                          <div>
                            <div className="h-6 bg-gray-900 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-32"></div>
                          </div>
                        </div>
                      </div>

                      {/* Experience with Creative Headers */}
                      <div>
                        <div className="h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded w-40 mb-3"></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded border border-blue-200">
                            <div className="h-4 bg-blue-700 rounded w-32 mb-1"></div>
                            <div className="h-3 bg-blue-500 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-blue-300 rounded w-full"></div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded border border-purple-200">
                            <div className="h-4 bg-purple-700 rounded w-28 mb-1"></div>
                            <div className="h-3 bg-purple-500 rounded w-20 mb-2"></div>
                            <div className="h-3 bg-purple-300 rounded w-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Skills with Graphics */}
                      <div>
                        <div className="h-5 bg-gradient-to-r from-green-600 to-teal-600 rounded w-24 mb-3"></div>
                        <div className="flex flex-wrap gap-2">
                          <div className="h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full px-4 flex items-center">
                            <div className="w-16 h-3 bg-white rounded"></div>
                          </div>
                          <div className="h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full px-4 flex items-center">
                            <div className="w-12 h-3 bg-white rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-700 text-sm">
                      <X className="h-4 w-4" />
                      <span>Graphics and images</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-700 text-sm">
                      <X className="h-4 w-4" />
                      <span>Complex tables/columns</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-700 text-sm">
                      <X className="h-4 w-4" />
                      <span>Creative section names</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-700 text-sm">
                      <X className="h-4 w-4" />
                      <span>Gradient backgrounds</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ATS Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Essential ATS Requirements
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Follow these requirements to ensure your resume passes ATS screening
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {atsRequirements.map((requirement, index) => {
                const IconComponent = requirement.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{requirement.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {requirement.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {requirement.details}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                ATS Best Practices
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Implement these strategies to optimize your resume for ATS systems
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {atsBestPractices.map((practice, index) => {
                const IconComponent = practice.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-emerald-600" />
                        </div>
                        <CardTitle className="text-xl">{practice.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {practice.content.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-3">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Common ATS Mistakes to Avoid
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Learn from these common mistakes that cause resumes to be rejected by ATS systems
              </p>
            </div>

            <div className="space-y-6">
              {atsMistakes.map((mistake, index) => (
                <Card key={index} className="border-red-200 bg-red-50/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-red-800 mb-1">
                            {mistake.mistake}
                          </h3>
                          <p className="text-red-700 font-medium">
                            Impact: {mistake.impact}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Solution:</span> {mistake.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Ready to Create Your ATS-Friendly Resume?
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Our resume builder automatically creates ATS-optimized resumes that pass through Applicant Tracking Systems and get you noticed by recruiters.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-base px-8 py-4 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => navigate("/dashboard")}
              >
                <span>Build ATS-Friendly Resume</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-4 border-2 hover:bg-muted/50 transition-all duration-300"
              >
                View ATS Templates
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>100% ATS Compatible</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span>Keyword Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <span>Professional Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ATSGuidelines;
