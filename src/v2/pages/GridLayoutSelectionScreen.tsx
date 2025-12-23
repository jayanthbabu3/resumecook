import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { ArrowLeft, Check } from "lucide-react";
import { GRID_LAYOUT_PRESETS, type GridLayoutPreset } from "../config/gridLayouts";
import { cn } from "@/lib/utils";

const GridLayoutSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLayout, setSelectedLayout] = React.useState<GridLayoutPreset | null>(null);

  const handleBack = () => {
    navigate("/templates");
  };

  const handleContinue = () => {
    if (!selectedLayout) return;
    navigate(`/builder/grid-canvas?layout=${selectedLayout.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <Header />

      {/* Subheader */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-3">
              <span>Step 1 of 2</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              Choose a Grid Layout
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Start with a layout preset for your grid-based resume. You can still customize everything later.
            </p>
          </div>

          {/* Layout Preset Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
            {GRID_LAYOUT_PRESETS.map((preset) => {
              const isSelected = selectedLayout?.id === preset.id;

              return (
                <Card
                  key={preset.id}
                  className={cn(
                    "group relative overflow-hidden border-2 cursor-pointer transition-all duration-300",
                    "hover:shadow-md hover:scale-[1.01]",
                    isSelected
                      ? "border-primary shadow-md shadow-primary/20 bg-primary/5"
                      : "border-border/40 hover:border-primary/50 bg-card"
                  )}
                  onClick={() => setSelectedLayout(preset)}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {preset.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-snug line-clamp-3">
                      {preset.description}
                    </p>
                  </div>
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
                selectedLayout ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl" : "opacity-50 cursor-not-allowed"
              )}
            >
              {selectedLayout ? `Continue with ${selectedLayout.name}` : "Select a Layout to Continue"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GridLayoutSelectionScreen;


