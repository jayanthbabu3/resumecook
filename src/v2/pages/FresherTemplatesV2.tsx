import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2, Home, GraduationCap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getFresherTemplates } from '../templates';
import type { TemplateConfig } from '../types';
import { TemplatePreviewV2 } from '../components/TemplatePreviewV2';

const DEFAULT_THEME_COLOR = "#7c3aed";

interface TemplateGridProps {
  templates: TemplateConfig[];
}

const TemplateGrid = ({ templates }: TemplateGridProps) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const visibleTemplates = templates.slice(0, visibleCount);
  const hasMore = visibleCount < templates.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 12, templates.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, templates.length]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {visibleTemplates.map((template, index) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden border border-border/40 hover:border-violet-500/60 transition-all duration-500 cursor-pointer bg-card hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 rounded-xl"
            onClick={() => navigate(`/builder?template=${template.id}`)}
            style={{
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            }}
          >
            {/* Premium gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:via-violet-500/2 group-hover:to-violet-500/5 transition-all duration-500 pointer-events-none z-0" />
            
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
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.4)',
              }}
            >
              {index + 1}
            </div>

            {/* Template Preview */}
            <div className="relative aspect-[8.5/11] bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden border-b border-border/20 group-hover:border-violet-500/20 transition-colors duration-500">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.05) 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />
              
              {/* Preview container with premium styling */}
              <div className="absolute inset-2 md:inset-3 rounded-lg overflow-hidden shadow-inner bg-white border border-border/20 group-hover:border-violet-500/30 transition-all duration-500">
                <TemplatePreviewV2
                  templateId={template.id}
                  themeColor={DEFAULT_THEME_COLOR}
                  className="h-full"
                />
              </div>

              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center gap-2 p-3 md:p-4 z-10">
                <Button
                  size="sm"
                  className="shadow-2xl text-xs md:text-sm px-4 py-2 h-9 md:h-10 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/builder?template=${template.id}`);
                  }}
                >
                  Use Template
                </Button>
              </div>
            </div>

            {/* Template Info - Premium styling */}
            <div className="relative p-3 md:p-4 bg-gradient-to-b from-card to-card/95 border-t border-border/20 group-hover:border-violet-500/30 transition-colors duration-500">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-xs md:text-sm text-foreground group-hover:text-violet-600 transition-colors duration-300 line-clamp-1 flex-1">
                  {template.name}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="h-2 w-2 rounded-full bg-violet-500 shadow-sm group-hover:shadow-md group-hover:scale-125 transition-all duration-300" />
                </div>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                {template.description}
              </p>
              
              {/* Premium accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500/0 to-transparent group-hover:via-violet-500/50 transition-all duration-500" />
            </div>
          </Card>
        ))}
      </div>

      {/* Premium Infinite Scroll Trigger & Loading */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-6 md:py-8">
          {isLoading && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
              <Loader2 className="h-4 w-4 animate-spin text-violet-500" />
              <span className="text-sm text-muted-foreground font-medium">Loading more templates...</span>
            </div>
          )}
        </div>
      )}

      {/* Premium End Message */}
      {!hasMore && templates.length > 12 && (
        <div className="text-center py-8 md:py-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/30">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            <p className="text-sm text-muted-foreground font-medium">
              You've viewed all {templates.length} fresher templates
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const FresherTemplatesV2 = () => {
  const navigate = useNavigate();

  // Get fresher templates
  const fresherTemplates = getFresherTemplates();
  const templates = fresherTemplates.map(t => t.config);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="border-b border-border/20 bg-gradient-to-r from-violet-50/50 via-purple-50/30 to-violet-50/50">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Fresher Resume Templates
              </h1>
              <Badge 
                variant="secondary" 
                className="text-[10px] px-2 py-0.5 font-semibold bg-violet-100 text-violet-600 border-violet-200"
              >
                {templates.length} Templates
              </Badge>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Professional resume templates designed specifically for fresh graduates and entry-level candidates. 
              Focus on education, projects, internships, and skills.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Compact Breadcrumb */}
        <nav className="mb-4 flex items-center text-xs text-muted-foreground gap-1.5" aria-label="Breadcrumb">
          <Link 
            to="/templates" 
            className="hover:text-foreground transition-colors flex items-center gap-1 hover:underline"
          >
            <Home className="h-3 w-3" />
            <span>Templates</span>
          </Link>
          <span>/</span>
          <span className="text-violet-600 font-medium">Fresher</span>
        </nav>

        {/* Template Grid */}
        {templates.length > 0 ? (
          <TemplateGrid templates={templates} />
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <GraduationCap className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No fresher templates available yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                We're working on adding more templates for freshers. Check back soon!
              </p>
              <Button onClick={() => navigate("/templates")}>
                Browse All Templates
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export { FresherTemplatesV2 };
export default FresherTemplatesV2;
