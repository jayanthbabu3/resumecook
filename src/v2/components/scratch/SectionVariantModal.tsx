/**
 * Section Variant Modal Component
 * 
 * Modal that displays available variants for a section type with visual previews.
 * Includes column selection for two-column layouts.
 */

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, PanelLeft, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSectionVariants, type SectionVariant } from '@/constants/sectionVariants';
import { SummaryVariantPreview } from './variants/SummaryVariantPreview';
import { HeaderVariantPreview } from './variants/HeaderVariantPreview';
import type { V2SectionType } from '../../types/resumeData';
import type { ScratchLayout } from '../../config/scratchLayouts';

interface SectionVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionType: V2SectionType;
  selectedLayout: ScratchLayout | null;
  onSelectVariant: (variant: SectionVariant, column?: 'main' | 'sidebar') => void;
}

export const SectionVariantModal: React.FC<SectionVariantModalProps> = ({
  isOpen,
  onClose,
  sectionType,
  selectedLayout,
  onSelectVariant,
}) => {
  const variants = getSectionVariants(sectionType);
  const [selectedColumn, setSelectedColumn] = React.useState<'main' | 'sidebar'>('main');

  // Check if layout supports column selection
  const supportsColumnSelection = selectedLayout && (
    selectedLayout.layoutType === 'two-column-left' ||
    selectedLayout.layoutType === 'two-column-right' ||
    selectedLayout.layoutType === 'split'
  );

  // Determine default column based on section type and layout
  React.useEffect(() => {
    if (selectedLayout && supportsColumnSelection) {
      // Check if this section type typically goes to sidebar
      const isSidebarSection = selectedLayout.sidebarSections.includes(sectionType);
      setSelectedColumn(isSidebarSection ? 'sidebar' : 'main');
    }
  }, [selectedLayout, sectionType, supportsColumnSelection]);

  const handleVariantClick = (variant: SectionVariant) => {
    // Directly add variant when card is clicked
    onSelectVariant(
      variant,
      supportsColumnSelection ? selectedColumn : undefined
    );
    onClose();
  };

  const getSectionTitle = () => {
    const sectionNames: Record<V2SectionType, string> = {
      header: 'Header',
      summary: 'Professional Summary',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      achievements: 'Achievements',
      strengths: 'Strengths',
      certifications: 'Certifications',
      projects: 'Projects',
      awards: 'Awards',
      publications: 'Publications',
      volunteer: 'Volunteer Work',
      speaking: 'Speaking Engagements',
      patents: 'Patents',
      interests: 'Interests',
      references: 'References',
      courses: 'Courses',
      custom: 'Custom Section',
    };
    return sectionNames[sectionType] || sectionType;
  };

  if (variants.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Choose {getSectionTitle()} Style
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Select a style variant for your {getSectionTitle().toLowerCase()} section. 
            Preview how it will look in your resume.
          </DialogDescription>
        </DialogHeader>

        {/* Column Selection (for two-column layouts) */}
        {supportsColumnSelection && (
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Select Column Placement
                </Label>
                <p className="text-xs text-muted-foreground">
                  Choose where this section should appear in your {selectedLayout?.name} layout
                </p>
              </div>
              <RadioGroup
                value={selectedColumn}
                onValueChange={(value) => setSelectedColumn(value as 'main' | 'sidebar')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="main" id="main" />
                  <Label htmlFor="main" className="flex items-center gap-2 cursor-pointer">
                    <PanelRight className="h-4 w-4" />
                    <span>Main Content</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sidebar" id="sidebar" />
                  <Label htmlFor="sidebar" className="flex items-center gap-2 cursor-pointer">
                    <PanelLeft className="h-4 w-4" />
                    <span>Sidebar</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Variant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pb-2">
          {variants.map((variant) => {
            return (
              <div
                key={variant.id}
                onClick={() => handleVariantClick(variant)}
                className={cn(
                  "group relative cursor-pointer rounded-xl border-2 transition-all duration-300",
                  "bg-white overflow-hidden",
                  "border-gray-200 hover:border-primary hover:shadow-xl hover:shadow-primary/10",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "flex flex-col"
                )}
              >
                {/* Add Button Badge - Always visible on hover */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-primary text-white rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5 text-xs font-semibold">
                    <Check className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </div>
                </div>

                {/* Header */}
                <div className="px-4 pt-4 pb-3 border-b border-gray-100 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {variant.name}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {variant.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50/50 min-h-[200px] flex items-center justify-center p-5 flex-1">
                  {sectionType === 'summary' && (
                    <div className="w-full transform group-hover:scale-[1.02] transition-transform duration-300">
                      <SummaryVariantPreview variant={variant} />
                    </div>
                  )}
                  {sectionType === 'header' && (
                    <div className="w-full transform group-hover:scale-[1.02] transition-transform duration-300">
                      <HeaderVariantPreview variant={variant} />
                    </div>
                  )}
                  {sectionType !== 'summary' && sectionType !== 'header' && (
                    <div className="text-center text-muted-foreground text-sm">
                      Preview coming soon
                    </div>
                  )}
                </div>

                {/* Bottom Action Hint */}
                <div className="px-4 py-2.5 bg-gray-50/50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Click to add</span>
                    <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-medium">Add to resume</span>
                      <Check className="h-3 w-3" />
                    </div>
                  </div>
                </div>

                {/* Hover overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 transition-all duration-300 pointer-events-none rounded-xl" />
              </div>
            );
          })}
        </div>

        {/* Footer with column selection and close */}
        <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t bg-gray-50/50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>💡</span>
            <span>Click any card to add it to your resume</span>
          </div>
          <Button variant="outline" onClick={onClose} className="min-w-[100px]">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

