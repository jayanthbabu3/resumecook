/**
 * Layout Selection Screen
 * 
 * First step in creating a resume from scratch.
 * Users select their preferred layout structure.
 * Redesigned with elegant, professional UI inspired by VisualCV and EnhanceCV.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { ArrowLeft, ArrowRight, Check, Sparkles, Layout, Columns, PanelLeft, PanelRight, Layers } from 'lucide-react';
import { SCRATCH_LAYOUTS, type ScratchLayout } from '../config/scratchLayouts';
import { LayoutPreview } from '../components/scratch/layouts/LayoutPreview';
import { cn } from '@/lib/utils';

// Icon mapping for layouts
const LAYOUT_ICONS: Record<string, React.ReactNode> = {
  'single-column': <Layout className="w-5 h-5" />,
  'two-column-left': <PanelLeft className="w-5 h-5" />,
  'two-column-right': <PanelRight className="w-5 h-5" />,
  'split': <Columns className="w-5 h-5" />,
  'compact': <Layers className="w-5 h-5" />,
};

const LayoutSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLayout, setSelectedLayout] = React.useState<ScratchLayout | null>(null);
  const [hoveredLayout, setHoveredLayout] = React.useState<string | null>(null);

  const handleSelectLayout = (layout: ScratchLayout) => {
    setSelectedLayout(layout);
  };

  const handleContinue = () => {
    if (selectedLayout) {
      navigate(`/builder/scratch-v2?layout=${selectedLayout.id}`);
    }
  };

  const handleBack = () => {
    navigate('/templates');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />
      
      {/* Elegant Subheader */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Templates</span>
            </Button>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">1</div>
                <span className="text-sm font-medium text-gray-900">Choose Layout</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">2</div>
                <span className="text-sm text-gray-500">Build Resume</span>
              </div>
            </div>
            
            <div className="w-[120px]"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Header Section - Compact */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-xs font-medium text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create from Scratch</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Choose Your Layout
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Select a layout structure that best showcases your experience. Each layout is optimized for different career stages and industries.
          </p>
        </div>

        {/* Layout Selection Grid - Single row, compact cards */}
        <div className="flex justify-start gap-5 mb-6 flex-wrap lg:flex-nowrap">
          {SCRATCH_LAYOUTS.map((layout) => {
            const isSelected = selectedLayout?.id === layout.id;
            const isHovered = hoveredLayout === layout.id;
            
            return (
              <div
                key={layout.id}
                onClick={() => handleSelectLayout(layout)}
                onMouseEnter={() => setHoveredLayout(layout.id)}
                onMouseLeave={() => setHoveredLayout(null)}
                className={cn(
                  "group relative rounded-xl cursor-pointer transition-all duration-300 w-[230px] flex-shrink-0",
                  "bg-white border-2 overflow-hidden",
                  isSelected
                    ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/10"
                    : "border-gray-200 hover:border-primary/40 hover:shadow-md"
                )}
              >
                {/* Selection Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shadow">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}

                {/* Layout Preview Area - Compact */}
                <div className={cn(
                  "relative p-4 transition-colors duration-300",
                  isSelected ? "bg-primary/5" : "bg-gradient-to-br from-gray-50 to-white"
                )}>
                  <div className="aspect-[8.5/11] max-h-[120px] mx-auto transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <LayoutPreview layoutType={layout.layoutType} />
                  </div>
                </div>

                {/* Layout Info - Compact */}
                <div className="p-4 border-t border-gray-100">
                  {/* Icon and Name */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300",
                      isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                      {LAYOUT_ICONS[layout.layoutType] || <Layout className="w-4 h-4" />}
                    </div>
                    <h3 className={cn(
                      "font-semibold text-sm transition-colors duration-300",
                      isSelected ? "text-primary" : "text-gray-900 group-hover:text-primary"
                    )}>
                      {layout.name}
                    </h3>
                  </div>

                  {/* Description - Truncated */}
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {layout.description}
                  </p>
                </div>

                {/* Hover/Selected Indicator Line */}
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300",
                  isSelected ? "bg-primary" : "bg-transparent group-hover:bg-primary/30"
                )} />
              </div>
            );
          })}
        </div>

        {/* Continue Section - Compact */}
        <div className="flex flex-col items-center gap-2">
          <Button
            size="default"
            onClick={handleContinue}
            disabled={!selectedLayout}
            className={cn(
              "min-w-[200px] h-10 text-sm font-medium rounded-lg",
              "transition-all duration-300 gap-2",
              selectedLayout
                ? "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            {selectedLayout ? (
              <>
                Select Layout
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              'Select a Layout'
            )}
          </Button>
          
          <p className="text-xs text-gray-500">
            Customize sections and styling next
          </p>
        </div>
      </main>
    </div>
  );
};

export default LayoutSelectionScreen;
