import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {visibleTemplates.map((template, index) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card"
            onClick={() => navigate(`/editor/${template.id}`)}
          >
            {/* Template Number Badge */}
            <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white text-xs md:text-sm font-semibold shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                  style={{ backgroundColor: themeColors[index % themeColors.length] }}
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
  const [category, setCategory] = useState("experienced");

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
                Resume Templates
              </h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
              Choose from our curated collection of professional templates designed for different career stages and industries
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Mobile Dropdown - visible only on mobile */}
        <div className="mb-6 md:hidden">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full h-12 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="experienced" className="py-3">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span className="font-medium">Experienced Professionals</span>
                  <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {experiencedTemplates.length}
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="freshers" className="py-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">Freshers & Graduates</span>
                  <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">
                    {freshersTemplates.length}
                  </span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Tabs - hidden on mobile */}
        <Tabs value={category} onValueChange={setCategory} className="w-full hidden md:block">
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
        </Tabs>

        {/* Template Grid */}
        <TemplateGrid 
          templates={category === "experienced" ? experiencedTemplates : freshersTemplates} 
        />
      </main>
    </div>
  );
};

export default Dashboard;
