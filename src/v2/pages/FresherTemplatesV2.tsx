import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2, Home, GraduationCap } from "lucide-react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getFresherTemplates } from '../templates';
import type { TemplateConfig } from '../types';
import { TemplatePreviewV2 } from '../components/TemplatePreviewV2';

interface TemplateGridProps {
  templates: TemplateConfig[];
  highlightedTemplateId?: string;
}

const TemplateGrid = ({ templates, highlightedTemplateId }: TemplateGridProps) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const highlightedRef = useRef<HTMLDivElement>(null);

  // Scroll to highlighted template on mount
  useEffect(() => {
    if (highlightedTemplateId && highlightedRef.current) {
      setTimeout(() => {
        highlightedRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  }, [highlightedTemplateId]);

  const handleTemplateClick = (templateId: string) => {
    // Store the current page path for back navigation
    sessionStorage.setItem('template-referrer', '/templates/fresher');
    sessionStorage.setItem('selected-template', templateId);
    navigate(`/builder?template=${templateId}`);
  };

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

  const isHighlighted = (templateId: string) => templateId === highlightedTemplateId;

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {visibleTemplates.map((template, index) => {
          const themeColor = template.colors?.primary || '#7c3aed';
          const highlighted = isHighlighted(template.id);

          return (
          <Card
            key={template.id}
            ref={highlighted ? highlightedRef : null}
            className="group relative overflow-hidden border transition-all duration-500 cursor-pointer bg-card hover:shadow-2xl hover:-translate-y-1 rounded-xl"
            onClick={() => handleTemplateClick(template.id)}
            style={{
              borderColor: highlighted ? themeColor : 'hsl(var(--border) / 0.4)',
              boxShadow: highlighted
                ? `0 10px 40px -10px ${hexToRgba(themeColor, 0.3)}, 0 0 0 2px ${hexToRgba(themeColor, 0.5)}`
                : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            }}
          >
            {/* Premium gradient overlay on hover */}
            <div
              className="absolute inset-0 bg-gradient-to-br transition-all duration-500 pointer-events-none z-0"
              style={{
                background: `linear-gradient(to bottom right, ${hexToRgba(themeColor, 0)} 0%, ${hexToRgba(themeColor, 0)} 50%, ${hexToRgba(themeColor, 0)} 100%)`,
              }}
            />
            
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
                background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
                boxShadow: `0 4px 14px 0 ${hexToRgba(themeColor, 0.4)}`,
              }}
            >
              {index + 1}
            </div>

            {/* Template Preview */}
            <div
              className="relative aspect-[8.5/11] bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden border-b border-border/20 transition-colors duration-500"
              style={{
                borderBottomColor: `${hexToRgba(themeColor, 0.2)}`,
              }}
            >
              {/* Subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, ${hexToRgba(themeColor, 0.05)} 1px, transparent 0)`,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Preview container with premium styling */}
              <div
                className="absolute inset-2 md:inset-3 rounded-lg overflow-hidden shadow-inner bg-white border transition-all duration-500"
                style={{
                  borderColor: 'hsl(var(--border) / 0.2)',
                }}
              >
                <TemplatePreviewV2
                  templateId={template.id}
                  themeColor={themeColor}
                  className="h-full"
                />
              </div>

              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center gap-2 p-3 md:p-4 z-10">
                <Button
                  size="sm"
                  className="shadow-2xl text-xs md:text-sm px-4 py-2 h-9 md:h-10 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200"
                  style={{
                    backgroundColor: themeColor,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateClick(template.id);
                  }}
                >
                  Use Template
                </Button>
              </div>
            </div>

            {/* Template Info - Premium styling */}
            <div
              className="relative p-3 md:p-4 bg-gradient-to-b from-card to-card/95 border-t transition-colors duration-500"
              style={{
                borderTopColor: `${hexToRgba(themeColor, 0.2)}`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3
                  className="font-bold text-xs md:text-sm text-foreground transition-colors duration-300 line-clamp-1 flex-1"
                  style={{
                    color: highlighted ? themeColor : undefined,
                  }}
                >
                  {template.name}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div
                    className="h-2 w-2 rounded-full shadow-sm group-hover:shadow-md group-hover:scale-125 transition-all duration-300"
                    style={{
                      backgroundColor: themeColor,
                    }}
                  />
                </div>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                {template.description}
              </p>

              {/* Premium accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500"
                style={{
                  background: `linear-gradient(to right, transparent, ${hexToRgba(themeColor, 0)} 30%, ${hexToRgba(themeColor, 0.5)} 50%, ${hexToRgba(themeColor, 0)} 70%, transparent)`,
                }}
              />
            </div>
          </Card>
          );
        })}
      </div>

      {/* Premium Infinite Scroll Trigger & Loading */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-6 md:py-8">
          {isLoading && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
              <Loader2 className="h-4 w-4 animate-spin" style={{ color: '#7c3aed' }} />
              <span className="text-sm text-muted-foreground font-medium">Loading more templates...</span>
            </div>
          )}
        </div>
      )}

      {/* Premium End Message */}
      {!hasMore && templates.length > 12 && (
        <div className="text-center py-8 md:py-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/30">
            <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#7c3aed' }} />
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
  const [searchParams] = useSearchParams();

  // Get highlighted template from URL params (when coming back from builder)
  const highlightedTemplateId = searchParams.get('highlight');

  // Get fresher templates
  const fresherTemplates = getFresherTemplates();
  const templates = fresherTemplates.map(t => t.config);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="border-b border-border/20 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-blue-50/30">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}>
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Fresher Resume Templates
              </h1>
              <Badge
                variant="secondary"
                className="text-[10px] px-2 py-0.5 font-semibold"
                style={{ backgroundColor: '#f5f3ff', color: '#7c3aed', borderColor: '#e9d5ff' }}
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
          <span className="font-medium" style={{ color: '#7c3aed' }}>Fresher</span>
        </nav>

        {/* Template Grid */}
        {templates.length > 0 ? (
          <TemplateGrid templates={templates} highlightedTemplateId={highlightedTemplateId || undefined} />
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
