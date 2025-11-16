import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, FileText, Edit3, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavoriteTemplates } from "@/hooks/useFavoriteTemplates";
import { TemplatePreview } from "./TemplatePreview";
import { FavoriteButton } from "./FavoriteButton";
import { templateMetaMap } from "@/constants/templateMeta";
import { getCategoryById } from "@/constants/professionCategories";

const themeColors = ["#2563eb", "#7c3aed", "#059669", "#e11d48", "#ea580c", "#0d9488"];

export const FavoriteTemplates: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, loading } = useFavoriteTemplates();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">No favorite templates yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Browse templates and click the heart icon to add them to your favorites
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              <FileText className="h-4 w-4 mr-2" />
              Browse Templates
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Get template metadata for favorited templates
  const favoriteTemplates = favorites
    .map((templateId) => {
      const meta = templateMetaMap[templateId];
      if (!meta) return null;
      return {
        id: templateId,
        ...meta,
      };
    })
    .filter((t) => t !== null);

  // Helper to get category color
  const getCategoryColor = (categorySlug: string) => {
    const category = getCategoryById(categorySlug);
    return category?.color || "#6366f1";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Favorite Templates
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {favorites.length} {favorites.length === 1 ? "template" : "templates"} saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {favoriteTemplates.map((template, index) => {
          if (!template) return null;

          return (
            <Card
              key={template.id}
              className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
              onClick={() => {
                // Navigate to the template's profession category
                const categorySlug = template.categorySlug || 'all';
                navigate(`/dashboard/${categorySlug}/editor/${template.id}`);
              }}
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
                      const categorySlug = template.categorySlug || 'all';
                      navigate(`/dashboard/${categorySlug}/editor/${template.id}`);
                    }}
                  >
                    Form
                  </Button>
                  <Button
                    size="sm"
                    className="shadow-lg text-[10px] md:text-xs px-2 py-1 h-7 md:h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      const categorySlug = template.categorySlug || 'all';
                      navigate(`/dashboard/${categorySlug}/live-editor/${template.id}`);
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
                    style={{ backgroundColor: getCategoryColor(template.categorySlug) }}
                  />
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                  {template.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
