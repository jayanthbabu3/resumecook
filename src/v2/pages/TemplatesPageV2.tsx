/**
 * Templates Page V2
 *
 * Browse all templates with category filtering using pill-style tabs.
 * Categories: All, Professional, Modern, Creative, Minimal, Fresher
 */

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Loader2, LayoutGrid } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getAllTemplates, getTemplatesByCategory } from '../config/templates';
import { getFresherTemplates } from '../templates';
import type { TemplateConfig } from '../types';
import { TemplatePreviewV2 } from '../components/TemplatePreviewV2';

// Default theme color
const DEFAULT_THEME_COLOR = "#2563eb";

// Category definitions for tabs
const CATEGORIES = [
  { id: 'all', label: 'All Templates' },
  { id: 'professional', label: 'Professional' },
  { id: 'modern', label: 'Modern' },
  { id: 'creative', label: 'Creative' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'fresher', label: 'Fresher' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

interface TemplateGridProps {
  templates: TemplateConfig[];
  highlightedTemplateId?: string;
}

const TemplateGrid = ({ templates, highlightedTemplateId }: TemplateGridProps) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(16);
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
    sessionStorage.setItem('template-referrer', '/templates');
    sessionStorage.setItem('selected-template', templateId);
    navigate(`/builder?template=${templateId}`);
  };

  const visibleTemplates = templates.slice(0, visibleCount);
  const hasMore = visibleCount < templates.length;

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 16, templates.length));
            setIsLoading(false);
          }, 400);
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

  if (templates.length === 0) {
    return (
      <div className="text-center py-16">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
        <p className="text-sm text-gray-500">Try selecting a different category</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {visibleTemplates.map((template, index) => (
          <Card
            key={template.id}
            ref={isHighlighted(template.id) ? highlightedRef : null}
            className={`group relative overflow-hidden border transition-all duration-300 cursor-pointer bg-white hover:shadow-xl hover:-translate-y-1 rounded-xl ${
              isHighlighted(template.id)
                ? 'border-primary ring-2 ring-primary/30 shadow-lg'
                : 'border-gray-200 hover:border-primary/40'
            }`}
            onClick={() => handleTemplateClick(template.id)}
          >
            {/* Favorite Button */}
            <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-1.5 shadow-md">
                <FavoriteButton
                  templateId={template.id}
                  variant="icon"
                  size="sm"
                />
              </div>
            </div>

            {/* Template Number */}
            <div
              className="absolute top-3 right-3 z-20 flex items-center justify-center h-7 w-7 rounded-full text-white text-xs font-bold shadow-lg"
              style={{ backgroundColor: template.colors?.primary || DEFAULT_THEME_COLOR }}
            >
              {index + 1}
            </div>

            {/* Template Preview */}
            <div className="relative aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              <div className="absolute inset-2 md:inset-3 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100">
                <TemplatePreviewV2
                  templateId={template.id}
                  themeColor={template.colors?.primary || DEFAULT_THEME_COLOR}
                  className="h-full"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-5 z-10">
                <Button
                  size="sm"
                  className="bg-white text-gray-900 hover:bg-gray-50 shadow-xl text-sm font-semibold px-5 h-10 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateClick(template.id);
                  }}
                >
                  Use Template
                </Button>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-3 md:p-4 border-t border-gray-100">
              <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors truncate">
                {template.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {template.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Loading Indicator */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-200">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm text-gray-600 font-medium">Loading more...</span>
            </div>
          )}
        </div>
      )}

      {/* End Message */}
      {!hasMore && templates.length > 16 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            Showing all {templates.length} templates
          </p>
        </div>
      )}
    </div>
  );
};

const TemplatesPageV2 = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get category from URL or default to 'all'
  const categoryParam = searchParams.get('category') as CategoryId | null;
  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    categoryParam && CATEGORIES.some(c => c.id === categoryParam) ? categoryParam : 'all'
  );

  // Get highlighted template from URL (when coming back from builder)
  const highlightedTemplateId = searchParams.get('highlight');

  // Get all templates
  const allTemplates = getAllTemplates();
  const fresherTemplates = getFresherTemplates();

  // Filter templates based on active category
  const getFilteredTemplates = (): TemplateConfig[] => {
    if (activeCategory === 'all') {
      return allTemplates;
    }

    if (activeCategory === 'fresher') {
      // Fresher templates - filter by fresher tag or fresher templates list
      const fresherIds = new Set(fresherTemplates.map(t => t.id));
      return allTemplates.filter(t => fresherIds.has(t.id));
    }

    // Filter by category
    return getTemplatesByCategory(activeCategory);
  };

  const filteredTemplates = getFilteredTemplates();

  // Handle category change
  const handleCategoryChange = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    // Update URL without full navigation
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    searchParams.delete('highlight'); // Clear highlight when changing category
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          {/* Back button and title */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Dashboard
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <LayoutGrid className="h-6 w-6 text-primary" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Resume Templates
                </h1>
              </div>
              <p className="text-gray-500">
                Choose from <span className="font-semibold text-primary">{allTemplates.length}</span> professionally designed templates
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs - Pill Style */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              const count = category.id === 'all'
                ? allTemplates.length
                : category.id === 'fresher'
                  ? fresherTemplates.length
                  : getTemplatesByCategory(category.id).length;

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 ease-out
                    ${isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {category.label}
                  <span className={`
                    text-xs px-1.5 py-0.5 rounded-full
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                    }
                  `}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm text-gray-500">
            Showing {filteredTemplates.length} {activeCategory === 'all' ? 'templates' : `${activeCategory} templates`}
          </p>
        </div>

        {/* Template Grid */}
        <TemplateGrid
          templates={filteredTemplates}
          highlightedTemplateId={highlightedTemplateId || undefined}
        />
      </main>
    </div>
  );
};

export { TemplatesPageV2 };
export default TemplatesPageV2;
