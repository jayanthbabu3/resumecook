import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Loader2, Home } from "lucide-react";
import { useNavigate, useParams, Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getCategoryById } from "@/constants/professionCategories";
import { getAllTemplates, getTemplatesByCategory } from '../config/templates';
import type { TemplateConfig } from '../types';
import { TemplatePreviewV2 } from '../components/TemplatePreviewV2';

// Default application theme color (blue)
const DEFAULT_THEME_COLOR = "#2563eb";

interface TemplateGridProps {
  templates: TemplateConfig[];
  categoryColor: string;
  highlightedTemplateId?: string;
  categoryPath: string;
}

const TemplateGrid = ({ templates, categoryColor, highlightedTemplateId, categoryPath }: TemplateGridProps) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(15);
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
    sessionStorage.setItem('template-referrer', categoryPath);
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
            setVisibleCount((prev) => Math.min(prev + 15, templates.length));
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

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {visibleTemplates.map((template, index) => (
          <Card
            key={template.id}
            ref={isHighlighted(template.id) ? highlightedRef : null}
            className={`group relative overflow-hidden border transition-all duration-500 cursor-pointer bg-card hover:shadow-2xl hover:-translate-y-1 rounded-xl ${
              isHighlighted(template.id)
                ? 'border-primary ring-2 ring-primary/50 shadow-xl shadow-primary/20'
                : 'border-border/40 hover:border-primary/60 hover:shadow-primary/10'
            }`}
            onClick={() => handleTemplateClick(template.id)}
            style={{
              boxShadow: isHighlighted(template.id)
                ? '0 10px 40px -10px hsl(var(--primary) / 0.3)'
                : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
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
                  themeColor={DEFAULT_THEME_COLOR}
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
                    handleTemplateClick(template.id);
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

      {/* Premium Infinite Scroll Trigger & Loading */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-6 md:py-8">
          {isLoading && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground font-medium">Loading more templates...</span>
            </div>
          )}
        </div>
      )}

      {/* Premium End Message */}
      {!hasMore && templates.length > 15 && (
        <div className="text-center py-8 md:py-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/30">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-sm text-muted-foreground font-medium">
              You've viewed all {templates.length} templates
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfessionTemplatesV2 = () => {
  const navigate = useNavigate();
  const { professionId } = useParams<{ professionId: string }>();
  const [searchParams] = useSearchParams();

  // Get highlighted template from URL params (when coming back from builder)
  const highlightedTemplateId = searchParams.get('highlight');

  // Get category data
  const categoryData = professionId ? getCategoryById(professionId) : null;

  // If category not found, redirect to dashboard
  useEffect(() => {
    if (!categoryData) {
      navigate("/templates");
    }
  }, [categoryData, navigate]);

  if (!categoryData) {
    return null;
  }

  // Get V2 templates - for now, show all V2 templates
  // In the future, we can map V2 template categories to profession categories
  const allV2Templates = getAllTemplates();
  
  // Map V2 category to profession category
  // For now, show all V2 templates for any profession
  // Later, we can filter by: getTemplatesByCategory(categoryData.id)
  const templates = allV2Templates;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Minimal Header - Centered */}
      <div className="border-b border-border/20 bg-background">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <h1 className="text-xl md:text-2xl font-semibold text-foreground">
                {categoryData.name}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {categoryData.description}
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
          <span className="text-foreground font-medium">{categoryData.name}</span>
        </nav>

        {/* Template Grid */}
        {templates.length > 0 ? (
          <TemplateGrid
            templates={templates}
            categoryColor={categoryData.color}
            highlightedTemplateId={highlightedTemplateId || undefined}
            categoryPath={`/templates/${professionId}`}
          />
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No templates available yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                We're working on adding more templates for this profession. Check back soon!
              </p>
              <Button onClick={() => navigate("/templates")}>
                Browse All Professions
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export { ProfessionTemplatesV2 };
export default ProfessionTemplatesV2;

