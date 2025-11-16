import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TemplatePreview } from "@/components/TemplatePreview";
import { FavoriteButton } from "@/components/FavoriteButton";
import { templateMetaMap } from "@/constants/templateMeta";
import { getCategoryById } from "@/constants/professionCategories";

// Template color palette
const themeColors = ["#2563eb", "#7c3aed", "#059669", "#e11d48", "#ea580c", "#0d9488"];

interface TemplateGridProps {
  templates: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    categorySlug: string;
  }>;
  categoryColor: string;
  professionId: string;
}

const TemplateGrid = ({ templates, categoryColor, professionId }: TemplateGridProps) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(15);
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

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {visibleTemplates.map((template, index) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
            onClick={() => navigate(`/dashboard/${professionId}/editor/${template.id}`)}
          >
            {/* Favorite Button - Top Left */}
            <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10">
              <FavoriteButton
                templateId={template.id}
                variant="icon"
                size="sm"
                className="scale-75 md:scale-100"
              />
            </div>

            {/* Template Number Badge */}
            <div
              className="absolute top-1.5 right-1.5 md:top-2 md:right-2 z-10 flex items-center justify-center h-6 w-6 md:h-7 md:w-7 rounded-full text-white text-[10px] md:text-xs font-semibold shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)`,
              }}
            >
              {index + 1}
            </div>

            {/* Template Preview */}
            <div className="relative aspect-[8.5/11] bg-white overflow-hidden">
              <TemplatePreview
                templateId={template.id}
                themeColor={themeColors[index % themeColors.length]}
                className="h-full"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-1.5 p-2 md:p-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="shadow-lg text-[10px] md:text-xs px-2 py-1 h-7 md:h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/${professionId}/editor/${template.id}`);
                  }}
                >
                  Form
                </Button>
                <Button
                  size="sm"
                  className="shadow-lg text-[10px] md:text-xs px-2 py-1 h-7 md:h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/${professionId}/live-editor/${template.id}`);
                  }}
                >
                  Live
                </Button>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-2 md:p-3 border-t border-border/30">
              <div className="flex items-start justify-between gap-1.5 mb-1">
                <h3 className="font-semibold text-[10px] md:text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {template.name}
                </h3>
                <div
                  className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: categoryColor }}
                />
              </div>
              <p className="text-[9px] md:text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                {template.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Infinite Scroll Trigger & Loading */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-4 md:py-6">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-xs">Loading more templates...</span>
            </div>
          )}
        </div>
      )}

      {/* End Message */}
      {!hasMore && templates.length > 15 && (
        <div className="text-center py-4 md:py-6">
          <p className="text-xs text-muted-foreground">
            You've viewed all {templates.length} templates
          </p>
        </div>
      )}
    </div>
  );
};

const ProfessionTemplates = () => {
  const navigate = useNavigate();
  const { professionId } = useParams<{ professionId: string }>();

  // Get category data
  const categoryData = professionId ? getCategoryById(professionId) : null;

  // If category not found, redirect to dashboard
  useEffect(() => {
    if (!categoryData) {
      navigate("/dashboard");
    }
  }, [categoryData, navigate]);

  if (!categoryData) {
    return null;
  }

  // Get templates for this category
  const templates = categoryData.templateIds
    .map((id) => ({
      id,
      ...templateMetaMap[id],
    }))
    .filter((t) => t.name); // Filter out any missing templates

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Elegant Header */}
      <div className="border-b border-border/30 bg-gradient-to-br from-muted/5 via-muted/10 to-muted/5">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                {categoryData.name}
              </h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
              {categoryData.description}
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 md:mb-8">
          <Breadcrumbs />
        </div>

        {/* Template Grid */}
        {templates.length > 0 ? (
          <TemplateGrid
            templates={templates}
            categoryColor={categoryData.color}
            professionId={professionId!}
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
              <Button onClick={() => navigate("/dashboard")}>
                Browse All Professions
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessionTemplates;
