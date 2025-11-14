import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Loader2,
  ChevronRight,
  Home,
  Star,
  GraduationCap,
  Code,
  Palette,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { TemplatePreview } from "@/components/TemplatePreview";
import { templateMetaMap } from "@/constants/templateMeta";
import {
  professionCategories,
  getCategoryById,
  type ProfessionCategory,
} from "@/constants/professionCategories";

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
}

const TemplateGrid = ({ templates, categoryColor }: TemplateGridProps) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(9);
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
            setVisibleCount((prev) => Math.min(prev + 9, templates.length));
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
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {visibleTemplates.map((template, index) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
            onClick={() => navigate(`/editor/${template.id}`)}
          >
            {/* Template Number Badge */}
            <div
              className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full text-white text-xs md:text-sm font-semibold shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)`,
              }}
            >
              {index + 1}
            </div>

            {/* Template Preview */}
            <div className="relative aspect-[8.5/8] bg-white overflow-hidden">
              <TemplatePreview
                templateId={template.id}
                themeColor={themeColors[index % themeColors.length]}
                className="h-full"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-2 p-4 md:p-6">
                <Button
                  size="sm"
                  variant="secondary"
                  className="shadow-lg text-xs md:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/editor/${template.id}`);
                  }}
                >
                  Form Editor
                </Button>
                <Button
                  size="sm"
                  className="shadow-lg text-xs md:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/live-editor/${template.id}`);
                  }}
                >
                  Live Editor
                </Button>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-3 md:p-4 border-t border-border/30">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="font-semibold text-xs md:text-sm text-foreground group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
                <div
                  className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: categoryColor }}
                />
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">
                {template.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Infinite Scroll Trigger & Loading */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-6 md:py-8">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
              <span className="text-xs md:text-sm">Loading more templates...</span>
            </div>
          )}
        </div>
      )}

      {/* End Message */}
      {!hasMore && templates.length > 9 && (
        <div className="text-center py-6 md:py-8">
          <p className="text-xs md:text-sm text-muted-foreground">
            You've viewed all {templates.length} templates
          </p>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedCategoryData = selectedCategory
    ? getCategoryById(selectedCategory)
    : null;

  const templatesForCategory = selectedCategoryData
    ? selectedCategoryData.templateIds
        .map((id) => ({
          id,
          ...templateMetaMap[id],
        }))
        .filter((t) => t.name) // Filter out any missing templates
    : [];

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
                {selectedCategory ? selectedCategoryData?.name : "Resume Templates"}
              </h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
              {selectedCategory
                ? selectedCategoryData?.description
                : "Choose your profession to find the perfect template for your career"}
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Breadcrumb Navigation */}
        {selectedCategory && (
          <div className="mb-6 md:mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>All Professions</span>
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">
                {selectedCategoryData?.name}
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                {templatesForCategory.length} templates
              </span>
            </nav>
          </div>
        )}

        {/* Profession Categories Grid */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {professionCategories.map((category, index) => {
              const IconComponent = category.icon;

              // Special rendering for "All" card
              if (category.isAll) {
                return (
                  <Card
                    key={category.id}
                    className="group relative overflow-hidden border-2 border-primary/40 hover:border-primary/60 transition-all duration-300 hover:shadow-2xl cursor-pointer bg-gradient-to-br from-primary/5 via-card to-primary/5 sm:col-span-2 lg:col-span-3 xl:col-span-4"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {/* Animated Gradient Background */}
                    <div
                      className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${category.gradientFrom} 0%, ${category.gradientTo} 50%, ${category.gradientFrom} 100%)`,
                      }}
                    />

                    {/* Background Icons Grid */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-4 left-4 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300">
                        <Star className="h-16 w-16 text-primary" />
                      </div>
                      <div className="absolute top-8 right-12 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300">
                        <GraduationCap className="h-14 w-14 text-primary" />
                      </div>
                      <div className="absolute bottom-8 left-16 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300">
                        <Code className="h-18 w-18 text-primary" />
                      </div>
                      <div className="absolute bottom-4 right-8 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300">
                        <Palette className="h-16 w-16 text-primary" />
                      </div>
                      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-300">
                        <Briefcase className="h-20 w-20 text-primary" />
                      </div>
                    </div>

                    <div className="relative p-8 md:p-10">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                        {/* Icon */}
                        <div
                          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${category.gradientFrom} 0%, ${category.gradientTo} 100%)`,
                          }}
                        >
                          <IconComponent className="h-10 w-10 md:h-12 md:w-12 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left space-y-3">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                              {category.name}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                              {category.description}
                            </p>
                          </div>

                          {/* Template Count Badge */}
                          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                            <span
                              className="text-sm font-semibold px-4 py-2 rounded-full shadow-sm"
                              style={{
                                backgroundColor: `${category.color}20`,
                                color: category.color,
                              }}
                            >
                              {category.templateIds.length} templates
                            </span>
                            <ChevronRight
                              className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300"
                              style={{ color: category.color }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              }

              // Regular category cards
              return (
                <Card
                  key={category.id}
                  className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer bg-card"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {/* Gradient Background */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${category.gradientFrom} 0%, ${category.gradientTo} 100%)`,
                    }}
                  />

                  <div className="relative p-6">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${category.gradientFrom} 0%, ${category.gradientTo} 100%)`,
                      }}
                    >
                      <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {category.description}
                      </p>

                      {/* Template Count Badge */}
                      <div className="flex items-center justify-between pt-3">
                        <span
                          className="text-xs font-semibold px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: `${category.color}15`,
                            color: category.color,
                          }}
                        >
                          {category.templateIds.length} templates
                        </span>
                        <ChevronRight
                          className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                          style={{ color: category.color }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Template Grid for Selected Category */}
        {selectedCategory && selectedCategoryData && (
          <TemplateGrid
            templates={templatesForCategory}
            categoryColor={selectedCategoryData.color}
          />
        )}

        {/* Empty State */}
        {selectedCategory && templatesForCategory.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No templates available yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                We're working on adding more templates for this profession. Check back soon!
              </p>
              <Button onClick={() => setSelectedCategory(null)}>
                Browse All Professions
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
