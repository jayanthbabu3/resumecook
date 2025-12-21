/**
 * Layout Selection Screen
 * 
 * First step in creating a resume from scratch.
 * Users select their preferred layout structure.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { ArrowLeft, Check } from 'lucide-react';
import { SCRATCH_LAYOUTS, type ScratchLayout } from '../config/scratchLayouts';
import { LayoutPreview } from '../components/scratch/layouts/LayoutPreview';
import { cn } from '@/lib/utils';

const LayoutSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLayout, setSelectedLayout] = React.useState<ScratchLayout | null>(null);

  const handleSelectLayout = (layout: ScratchLayout) => {
    setSelectedLayout(layout);
  };

  const handleContinue = () => {
    if (selectedLayout) {
      // Navigate to scratch builder with layout param
      navigate(`/builder/scratch-v2?layout=${selectedLayout.id}`);
    }
  };

  const handleBack = () => {
    navigate('/templates');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <Header />
      
      {/* Subheader */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-3">
              <span>Step 1 of 2</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              Choose Your Resume Layout
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Select a layout structure that best fits your needs. You can always customize sections later.
            </p>
          </div>

          {/* Layout Grid - More compact with better spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 mb-6">
            {SCRATCH_LAYOUTS.map((layout) => {
              const isSelected = selectedLayout?.id === layout.id;
              
              return (
                <Card
                  key={layout.id}
                  className={cn(
                    "group relative overflow-hidden border-2 cursor-pointer transition-all duration-300",
                    "hover:shadow-md hover:scale-[1.01]",
                    isSelected
                      ? "border-primary shadow-md shadow-primary/20 bg-primary/5"
                      : "border-border/40 hover:border-primary/50 bg-card"
                  )}
                  onClick={() => handleSelectLayout(layout)}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Layout Preview - More compact */}
                  <div className="p-2.5 bg-gradient-to-br from-gray-50 to-white border-b border-border/20">
                    <div className="aspect-[8.5/11] max-h-[140px] mx-auto">
                      <LayoutPreview layoutType={layout.layoutType} />
                    </div>
                  </div>

                  {/* Layout Info - Compact */}
                  <div className="p-3 space-y-2">
                    {/* Icon and Name */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">{layout.icon}</span>
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {layout.name}
                      </h3>
                    </div>

                    {/* Description - Compact */}
                    <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                      {layout.description}
                    </p>

                    {/* Use Case - Compact */}
                    <div className="pt-1.5 border-t border-border/20">
                      <p className="text-[10px] text-muted-foreground leading-tight line-clamp-2">
                        {layout.useCase}
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-opacity duration-300 pointer-events-none",
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-5"
                  )} />
                </Card>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center mt-6">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedLayout}
              className={cn(
                "min-w-[200px] h-11 text-sm font-semibold",
                "transition-all duration-300",
                selectedLayout
                  ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl"
                  : "opacity-50 cursor-not-allowed"
              )}
            >
              {selectedLayout ? (
                <>
                  Continue with {selectedLayout.name}
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </>
              ) : (
                'Select a Layout to Continue'
              )}
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-4 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Don't worry - you can change sections and customize everything after selecting a layout
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutSelectionScreen;

