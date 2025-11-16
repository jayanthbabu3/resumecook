import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TemplatePreview } from './TemplatePreview';
import { FavoriteButton } from './FavoriteButton';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  description: string;
  highlights: string[];
}

interface TemplateCarouselProps {
  templates: Template[];
  themeColors?: string[];
  onTemplateSelect: (templateId: string) => void;
  className?: string;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  templates,
  themeColors = ["#7c3aed", "#2563eb", "#059669", "#e11d48"],
  onTemplateSelect,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update itemsPerView based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1); // Mobile: 1 template per view
      } else {
        setItemsPerView(3); // Desktop: 3 templates per view
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Reset currentIndex when itemsPerView changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, templates.length - itemsPerView);

  const nextSlide = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleTemplateClick = (templateId: string) => {
    onTemplateSelect(templateId);
  };

  // Auto-advance carousel disabled - manual navigation only

  if (templates.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No templates available
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Navigation Buttons */}
      {templates.length > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0 || isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex || isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden rounded-xl">
        <div
          ref={containerRef}
          className={cn(
            "flex transition-transform duration-300 ease-in-out",
            isAnimating && "pointer-events-none"
          )}
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="flex-shrink-0 px-2"
              style={{ width: itemsPerView === 1 ? '100%' : '33.3333%' }}
            >
                     <div className="group cursor-pointer bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                       {/* Template Preview */}
                       <div className="relative">
                  <div
                    className="overflow-hidden rounded-lg bg-white shadow-lg group-hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
                    style={{
                      aspectRatio: '1 / 1.414', // Standard A4 aspect ratio for proper resume display
                      width: '100%',
                      minHeight: itemsPerView === 1 ? '280px' : '350px'
                    }}
                  >
                    <TemplatePreview
                      templateId={template.id}
                      themeColor={themeColors[index % themeColors.length]}
                      className="h-full"
                    />
                  </div>

                  {/* Favorite Button - Top Right */}
                  <div className="absolute top-2 right-2 z-20">
                    <FavoriteButton
                      templateId={template.id}
                      variant="icon"
                      size="sm"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateClick(template.id);
                      }}
                    >
                      Use This Template
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {templates.length > itemsPerView && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                currentIndex === index
                  ? "bg-primary w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
