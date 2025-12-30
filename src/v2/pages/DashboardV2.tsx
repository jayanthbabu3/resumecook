import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  ChevronRight,
  Sparkles,
  Star,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { getAllTemplates } from '../config/templates';
import { getFresherTemplates } from '../templates';
import { TemplatePreviewV2 } from '@/v2/components/TemplatePreviewV2';
import { FavoriteButton } from "@/components/FavoriteButton";

const DEFAULT_THEME_COLOR = "#2563eb";

const DashboardV2 = () => {
  const navigate = useNavigate();
  const v2Templates = getAllTemplates();
  const fresherTemplates = getFresherTemplates();
  const universalTemplateCount = v2Templates.length - fresherTemplates.length;
  const fresherTemplateCount = fresherTemplates.length;

  // Featured templates - show first 4 templates
  // Default colors for templates
  const defaultColors = ['#2563eb', '#7c3aed', '#059669', '#e11d48'];
  const featuredTemplates = v2Templates.slice(0, 4).map((template, index) => ({
    id: template.id,
    name: template.name,
    description: template.description || 'Professional resume template',
    color: template.colors?.primary || defaultColors[index % defaultColors.length],
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Minimal Header */}
      <div className="border-b border-border/20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 md:py-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                Resume Templates
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground px-2">
              Choose your profession to find the perfect template for your career
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Create Custom Resume Section */}
        <div className="max-w-5xl mx-auto mb-6">
          <Card
            className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg cursor-pointer bg-gradient-to-br from-primary/5 via-background to-background active:scale-[0.99]"
            onClick={() => navigate("/builder/scratch-v2/select-layout")}
          >
            <div className="relative p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    Want to create a custom resume?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Build your resume from scratch with complete control over layout and sections
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </div>
            </div>
          </Card>
        </div>

        {/* Template Categories */}
        <div className="max-w-5xl mx-auto mb-8 md:mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Universal Templates Card */}
            <Card
              className="group relative overflow-hidden border border-border/40 hover:border-primary/50 transition-all duration-200 hover:shadow-md cursor-pointer bg-card active:scale-[0.98]"
              onClick={() => navigate("/templates/all")}
            >
              <div className="relative p-3.5 sm:p-4 md:p-5">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  {/* Compact Icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                      <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        Universal Templates
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 h-4 sm:h-5 font-semibold bg-primary/10 text-primary border-primary/20"
                      >
                        {universalTemplateCount}
                      </Badge>
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      Browse all our professionally designed resume templates
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5 sm:mt-1" />
                </div>
              </div>
            </Card>

            {/* Fresher Templates Card */}
            <Card
              className="group relative overflow-hidden border border-border/40 hover:border-violet-500/50 transition-all duration-200 hover:shadow-md cursor-pointer bg-card active:scale-[0.98]"
              onClick={() => navigate("/templates/fresher")}
            >
              <div className="relative p-3.5 sm:p-4 md:p-5">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  {/* Compact Icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                      <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground group-hover:text-violet-600 transition-colors">
                        Fresher Templates
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 h-4 sm:h-5 font-semibold bg-violet-100 text-violet-600 border-violet-200"
                      >
                        {fresherTemplateCount}
                      </Badge>
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      Perfect for fresh graduates and entry-level candidates
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5 sm:mt-1" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Featured Templates Section - Full Width */}
        <div className="mt-6 sm:mt-8 md:mt-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">
                  Featured Templates
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-[10px] sm:text-xs h-6 sm:h-7 px-1.5 sm:px-2"
                onClick={() => navigate("/templates/all")}
              >
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-0.5 sm:ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
              {featuredTemplates.map((template, index) => (
                <Card
                  key={template.id}
                  className="group relative overflow-hidden border border-border/40 hover:border-primary/60 transition-all duration-500 cursor-pointer bg-card hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 rounded-xl"
                  onClick={() => {
                    sessionStorage.setItem('template-referrer', '/templates');
                    sessionStorage.setItem('selected-template', template.id);
                    navigate(`/builder?template=${template.id}`);
                  }}
                  style={{
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                  }}
                >
                  {/* Premium gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/2 group-hover:to-primary/5 transition-all duration-500 pointer-events-none z-0" />
                  
                  {/* Favorite Button - Top Left */}
                  <div className="absolute top-3 left-3 z-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="backdrop-blur-sm bg-white/90 rounded-lg p-1 shadow-sm">
                      <FavoriteButton
                        templateId={template.id}
                        variant="icon"
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Template Number Badge */}
                  <div
                    className="absolute top-3 right-3 z-20 flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full text-white text-xs md:text-sm font-bold shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)`,
                      boxShadow: '0 4px 14px 0 hsl(var(--primary) / 0.4)',
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Template Preview */}
                  <div className="relative aspect-[8.5/11] bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden border-b border-border/20 group-hover:border-primary/20 transition-colors duration-500">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.05) 1px, transparent 0)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    
                    {/* Preview container with premium styling */}
                    <div className="absolute inset-2 md:inset-3 rounded-lg overflow-hidden shadow-inner bg-white border border-border/20 group-hover:border-primary/30 transition-all duration-500">
                      <TemplatePreviewV2
                        templateId={template.id}
                        themeColor={template.color}
                        className="h-full"
                      />
                    </div>

                    {/* Premium Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center gap-2 p-3 md:p-4 z-10">
                      <Button
                        size="sm"
                        className="shadow-2xl text-xs md:text-sm px-4 py-2 h-9 md:h-10 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          sessionStorage.setItem('template-referrer', '/templates');
                          sessionStorage.setItem('selected-template', template.id);
                          navigate(`/builder?template=${template.id}`);
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>

                  {/* Template Info - Premium styling */}
                  <div className="relative p-3 md:p-4 bg-gradient-to-b from-card to-card/95 border-t border-border/20 group-hover:border-primary/30 transition-colors duration-500">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-xs md:text-sm text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 flex-1">
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary shadow-sm group-hover:shadow-md group-hover:scale-125 transition-all duration-300" />
                      </div>
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {template.description}
                    </p>
                    
                    {/* Premium accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
      </main>
    </div>
  );
};

export { DashboardV2 };
export default DashboardV2;
