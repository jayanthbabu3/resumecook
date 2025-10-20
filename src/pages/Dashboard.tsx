import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  Briefcase,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { TemplatePreview } from "@/components/TemplatePreview";
import { templateMetaMap } from "@/constants/templateMeta";

// Template color palette
const themeColors = ["#2563eb", "#7c3aed", "#059669", "#e11d48", "#ea580c", "#0d9488"];

// All templates with their metadata
const allTemplates = Object.keys(templateMetaMap).map((id) => ({
  id,
  ...templateMetaMap[id],
}));

// Categorize templates
const experiencedTemplates = allTemplates.filter(
  (t) => !["fresher", "graduate", "starter", "premium-fresher", "fresher-elite"].includes(t.id)
);

const freshersTemplates = allTemplates.filter(
  (t) => ["fresher", "graduate", "starter", "premium-fresher", "fresher-elite"].includes(t.id)
);

interface TemplateGridProps {
  templates: typeof allTemplates;
}

const TemplateGrid = ({ templates }: TemplateGridProps) => {
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
          // Simulate loading delay for smooth UX
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTemplates.map((template, index) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
            onClick={() => navigate(`/editor/${template.id}`)}
          >
            {/* Template Preview */}
            <div className="relative aspect-[8.5/9] bg-white overflow-hidden">
              <TemplatePreview
                templateId={template.id}
                themeColor={themeColors[index % themeColors.length]}
                className="h-full"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                <Button
                  size="sm"
                  className="shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/editor/${template.id}`);
                  }}
                >
                  Use Template
                </Button>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4 border-t border-border/30">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
                <div
                  className="h-3 w-3 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: themeColors[index % themeColors.length] }}
                />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {template.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Infinite Scroll Trigger & Loading */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading more templates...</span>
            </div>
          )}
        </div>
      )}

      {/* End Message */}
      {!hasMore && templates.length > 9 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            You've viewed all {templates.length} templates
          </p>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("experienced");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Elegant Header */}
      <div className="border-b border-border/30 bg-gradient-to-br from-muted/5 via-muted/10 to-muted/5">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">
                Resume Templates
              </h1>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Choose from our curated collection of professional templates designed for different career stages and industries
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        {/* Tabs for Filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-muted p-1.5 text-muted-foreground">
              <TabsTrigger
                value="experienced"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <Briefcase className="h-4 w-4" />
                Experienced Professionals
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {experiencedTemplates.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="freshers"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <GraduationCap className="h-4 w-4" />
                Freshers & Graduates
                <span className="ml-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">
                  {freshersTemplates.length}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="experienced" className="mt-0">
            <TemplateGrid templates={experiencedTemplates} />
          </TabsContent>

          <TabsContent value="freshers" className="mt-0">
            <TemplateGrid templates={freshersTemplates} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
