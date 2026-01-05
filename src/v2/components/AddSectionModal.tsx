/**
 * Add Section Modal Component (V2)
 *
 * Modal that allows users to add new sections to their resume.
 * Shows available section types on the left, and variant previews on the right.
 */

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Sparkles, Award, BookOpen, Users, Mic, FileText,
  Heart, UserCheck, GraduationCap, Plus, Check, Briefcase,
  FolderOpen, Languages, Trophy, Target
} from 'lucide-react';

// Section type definition with metadata - exported for use in SectionOptionsMenu
export interface SectionTypeInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  variants: VariantInfo[];
  dataKey: string;
}

export interface VariantInfo {
  id: string;
  name: string;
  description: string;
}

// Available sections that users can add - exported for use in SectionOptionsMenu
export const ADDABLE_SECTIONS: SectionTypeInfo[] = [
  {
    id: 'interests',
    name: 'Interests',
    description: 'Hobbies and personal interests',
    icon: <Heart className="w-4 h-4" />,
    dataKey: 'interests',
    variants: [
      { id: 'pills', name: 'Pills', description: 'Rounded pill badges' },
      { id: 'icons', name: 'Icons', description: 'Visual icon cards' },
      { id: 'grid', name: 'Grid', description: 'Two-column grid layout' },
      { id: 'detailed', name: 'Detailed', description: 'Cards with descriptions' },
      { id: 'list', name: 'Simple List', description: 'Clean bullet list' },
      { id: 'standard', name: 'Standard', description: 'Traditional list' },
    ],
  },
  {
    id: 'awards',
    name: 'Awards',
    description: 'Awards, honors and recognition',
    icon: <Award className="w-4 h-4" />,
    dataKey: 'awards',
    variants: [
      { id: 'standard', name: 'Standard', description: 'Traditional with icons' },
      { id: 'trophies', name: 'Trophies', description: 'Trophy icons display' },
      { id: 'cards', name: 'Cards', description: 'Card-based layout' },
      { id: 'compact', name: 'Compact', description: 'Space-efficient' },
      { id: 'timeline', name: 'Timeline', description: 'Chronological view' },
    ],
  },
  {
    id: 'publications',
    name: 'Publications',
    description: 'Research papers and articles',
    icon: <BookOpen className="w-4 h-4" />,
    dataKey: 'publications',
    variants: [
      { id: 'modern', name: 'Modern', description: 'Clean cards with icons' },
      { id: 'academic', name: 'Academic', description: 'Formal citation style' },
      { id: 'cards', name: 'Cards', description: 'Grid card layout' },
      { id: 'compact', name: 'Compact', description: 'Space-efficient format' },
    ],
  },
  {
    id: 'volunteer',
    name: 'Volunteer',
    description: 'Volunteer experience and community service',
    icon: <Users className="w-4 h-4" />,
    dataKey: 'volunteer',
    variants: [
      { id: 'standard', name: 'Standard', description: 'Like experience section' },
      { id: 'compact', name: 'Compact', description: 'Condensed format' },
      { id: 'timeline', name: 'Timeline', description: 'Timeline view' },
      { id: 'cards', name: 'Cards', description: 'Card-based grid layout' },
    ],
  },
  {
    id: 'speaking',
    name: 'Speaking',
    description: 'Conference talks and presentations',
    icon: <Mic className="w-4 h-4" />,
    dataKey: 'speaking',
    variants: [
      { id: 'standard', name: 'Standard', description: 'Event and topic focused' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'compact', name: 'Compact', description: 'Space-efficient' },
    ],
  },
  {
    id: 'patents',
    name: 'Patents',
    description: 'Patents and intellectual property',
    icon: <FileText className="w-4 h-4" />,
    dataKey: 'patents',
    variants: [
      { id: 'standard', name: 'Standard', description: 'With patent numbers' },
      { id: 'detailed', name: 'Detailed', description: 'Full descriptions' },
      { id: 'compact', name: 'Compact', description: 'Condensed view' },
      { id: 'cards', name: 'Cards', description: 'Card-based grid layout' },
    ],
  },
  {
    id: 'references',
    name: 'References',
    description: 'Professional references',
    icon: <UserCheck className="w-4 h-4" />,
    dataKey: 'references',
    variants: [
      { id: 'standard', name: 'Standard', description: 'Full contact details' },
      { id: 'compact', name: 'Compact', description: 'Name and title only' },
      { id: 'cards', name: 'Cards', description: 'Card-based grid layout' },
      { id: 'available', name: 'Available', description: '"Available upon request"' },
    ],
  },
  {
    id: 'courses',
    name: 'Courses',
    description: 'Training and professional development',
    icon: <GraduationCap className="w-4 h-4" />,
    dataKey: 'courses',
    variants: [
      { id: 'standard', name: 'Standard', description: 'Course with provider' },
      { id: 'detailed', name: 'Detailed', description: 'With description' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'compact', name: 'Compact', description: 'Simple list' },
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Personal and portfolio projects',
    icon: <FolderOpen className="w-4 h-4" />,
    dataKey: 'projects',
    variants: [
      { id: 'standard', name: 'Standard', description: 'With tech stack' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'compact', name: 'Compact', description: 'Condensed view' },
      { id: 'grid', name: 'Grid', description: 'Two-column grid' },
    ],
  },
  {
    id: 'certifications',
    name: 'Certifications',
    description: 'Professional certifications',
    icon: <Trophy className="w-4 h-4" />,
    dataKey: 'certifications',
    variants: [
      { id: 'list', name: 'List', description: 'Standard list view' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'badges', name: 'Badges', description: 'Badge style' },
      { id: 'compact', name: 'Compact', description: 'Space-efficient' },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    description: 'Language proficiencies',
    icon: <Languages className="w-4 h-4" />,
    dataKey: 'languages',
    variants: [
      { id: 'standard', name: 'Standard', description: 'With proficiency level' },
      { id: 'bars', name: 'Bars', description: 'Progress bars' },
      { id: 'pills', name: 'Pills', description: 'Pill badges' },
      { id: 'grid', name: 'Grid', description: 'Grid layout' },
      { id: 'compact', name: 'Compact', description: 'Space-efficient' },
      { id: 'inline', name: 'Inline', description: 'Horizontal layout' },
    ],
  },
  {
    id: 'achievements',
    name: 'Achievements',
    description: 'Key achievements and accomplishments',
    icon: <Target className="w-4 h-4" />,
    dataKey: 'achievements',
    variants: [
      { id: 'bullets', name: 'Bullets', description: 'Bulleted list with icons' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'metrics', name: 'Metrics', description: 'With numbers/metrics' },
      { id: 'minimal', name: 'Minimal', description: 'Clean simple list' },
    ],
  },
  {
    id: 'strengths',
    name: 'Strengths',
    description: 'Key strengths and competencies',
    icon: <Sparkles className="w-4 h-4" />,
    dataKey: 'strengths',
    variants: [
      { id: 'cards', name: 'Cards', description: 'Cards with descriptions' },
      { id: 'pills', name: 'Pills', description: 'Pill badges' },
      { id: 'list', name: 'List', description: 'Simple list' },
      { id: 'grid', name: 'Grid', description: 'Grid layout' },
    ],
  },
  {
    id: 'custom',
    name: 'Custom Section',
    description: 'Create your own section',
    icon: <Plus className="w-4 h-4" />,
    dataKey: 'customSections',
    variants: [
      { id: 'list', name: 'List', description: 'Bullet point items' },
      { id: 'paragraphs', name: 'Paragraphs', description: 'Text paragraphs' },
    ],
  },
];

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (sectionType: string, variant: string, column: 'main' | 'sidebar') => void;
  existingSections: string[]; // Section IDs that already exist
  layoutType: 'single-column' | 'two-column-left' | 'two-column-right';
  targetColumn?: 'main' | 'sidebar'; // Pre-selected column when opened
  themeColor?: string;
}

export const AddSectionModal: React.FC<AddSectionModalProps> = ({
  isOpen,
  onClose,
  onAddSection,
  existingSections,
  layoutType,
  targetColumn = 'main',
  themeColor = '#0891b2',
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<'main' | 'sidebar'>(targetColumn);

  // Filter out sections that already exist (except custom which can have multiple)
  const availableSections = useMemo(() => {
    return ADDABLE_SECTIONS.filter(section => {
      if (section.id === 'custom') return true; // Custom can always be added
      return !existingSections.includes(section.id);
    });
  }, [existingSections]);

  // Get selected section info
  const selectedSectionInfo = useMemo(() => {
    return availableSections.find(s => s.id === selectedSection);
  }, [availableSections, selectedSection]);

  // Auto-select first section and variant on open
  React.useEffect(() => {
    if (isOpen && availableSections.length > 0 && !selectedSection) {
      const firstSection = availableSections[0];
      setSelectedSection(firstSection.id);
      setSelectedVariant(firstSection.variants[0]?.id || null);
    }
    if (isOpen) {
      setSelectedColumn(targetColumn);
    }
  }, [isOpen, availableSections, selectedSection, targetColumn]);

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedSection(null);
      setSelectedVariant(null);
      setShowVariants(false);
    }
  }, [isOpen]);

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
    const section = availableSections.find(s => s.id === sectionId);
    if (section?.variants.length) {
      setSelectedVariant(section.variants[0].id);
    } else {
      setSelectedVariant(null);
    }
  };

  const handleAddSection = () => {
    if (selectedSection && selectedVariant) {
      onAddSection(selectedSection, selectedVariant, selectedColumn);
      onClose();
    }
  };

  const isTwoColumn = layoutType !== 'single-column';

  // Track if we're showing variants on mobile
  const [showVariants, setShowVariants] = useState(false);

  // Handle section select with mobile variant view
  const handleSectionSelectMobile = (sectionId: string) => {
    handleSectionSelect(sectionId);
    setShowVariants(true);
  };

  // Go back to section list on mobile
  const handleBackToSections = () => {
    setShowVariants(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[95vw] sm:w-full p-0 gap-0 overflow-hidden max-h-[85vh] sm:max-h-[600px]">
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gray-50">
          <DialogTitle className="text-base sm:text-lg font-semibold">Add New Section</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row h-[60vh] sm:h-[500px] overflow-hidden">
          {/* Left Panel - Section Types (hidden on mobile when showing variants) */}
          <div className={`${showVariants ? 'hidden sm:flex' : 'flex'} w-full sm:w-56 border-b sm:border-b-0 sm:border-r bg-gray-50/50 flex-col min-h-0 flex-1 sm:flex-initial overflow-hidden`}>
            <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide flex-shrink-0">
              Section Types
            </div>
            <ScrollArea className="flex-1 min-h-0">
              <div className="p-2 space-y-1">
                {availableSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      // On mobile, show variants panel
                      if (window.innerWidth < 640) {
                        handleSectionSelectMobile(section.id);
                      } else {
                        handleSectionSelect(section.id);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      selectedSection === section.id
                        ? 'bg-white shadow-sm border border-gray-200'
                        : 'hover:bg-white/60'
                    }`}
                  >
                    <span
                      className={`p-1.5 rounded-md ${
                        selectedSection === section.id
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      style={selectedSection === section.id ? { backgroundColor: themeColor } : {}}
                    >
                      {section.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${
                        selectedSection === section.id ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {section.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {section.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Panel - Variants (shown on mobile when showVariants is true) */}
          <div className={`${showVariants ? 'flex' : 'hidden sm:flex'} flex-1 flex-col min-h-0 overflow-hidden`}>
            {selectedSectionInfo ? (
              <>
                {/* Section Header */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {/* Back button for mobile */}
                    <button
                      onClick={handleBackToSections}
                      className="sm:hidden p-1.5 -ml-1 mr-1 rounded-lg hover:bg-gray-100 text-gray-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span
                      className="p-1.5 sm:p-2 rounded-lg text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      {selectedSectionInfo.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{selectedSectionInfo.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{selectedSectionInfo.description}</p>
                    </div>
                  </div>
                </div>

                {/* Variants Grid */}
                <ScrollArea className="flex-1 min-h-0 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Choose a Style
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {selectedSectionInfo.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                          selectedVariant === variant.id
                            ? 'border-current shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={selectedVariant === variant.id ? { borderColor: themeColor } : {}}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className={`font-medium text-sm ${
                              selectedVariant === variant.id ? '' : 'text-gray-900'
                            }`} style={selectedVariant === variant.id ? { color: themeColor } : {}}>
                              {variant.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {variant.description}
                            </div>
                          </div>
                          {selectedVariant === variant.id && (
                            <Check
                              className="w-4 h-4 flex-shrink-0 mt-0.5"
                              style={{ color: themeColor }}
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Column Selection for Two-Column Layouts */}
                  {isTwoColumn && (
                    <div className="mt-4 sm:mt-6">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 sm:mb-3">
                        Add to Column
                      </div>
                      <div className="flex gap-2 sm:gap-3">
                        <button
                          onClick={() => setSelectedColumn('main')}
                          className={`flex-1 p-2.5 sm:p-3 rounded-lg border-2 text-center transition-all ${
                            selectedColumn === 'main'
                              ? 'border-current bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={selectedColumn === 'main' ? { borderColor: themeColor } : {}}
                        >
                          <div className={`text-sm font-medium ${
                            selectedColumn === 'main' ? '' : 'text-gray-700'
                          }`} style={selectedColumn === 'main' ? { color: themeColor } : {}}>
                            Main Column
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                            Primary content area
                          </div>
                        </button>
                        <button
                          onClick={() => setSelectedColumn('sidebar')}
                          className={`flex-1 p-2.5 sm:p-3 rounded-lg border-2 text-center transition-all ${
                            selectedColumn === 'sidebar'
                              ? 'border-current bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={selectedColumn === 'sidebar' ? { borderColor: themeColor } : {}}
                        >
                          <div className={`text-sm font-medium ${
                            selectedColumn === 'sidebar' ? '' : 'text-gray-700'
                          }`} style={selectedColumn === 'sidebar' ? { color: themeColor } : {}}>
                            Sidebar
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                            Secondary column
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </ScrollArea>

                {/* Footer with Add Button */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 flex justify-end gap-2 sm:gap-3 flex-shrink-0">
                  <Button variant="outline" onClick={onClose} size="sm" className="sm:size-default">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddSection}
                    disabled={!selectedVariant}
                    style={{ backgroundColor: themeColor }}
                    className="text-white hover:opacity-90"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    <span className="hidden sm:inline">Add {selectedSectionInfo.name}</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a section type
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionModal;
