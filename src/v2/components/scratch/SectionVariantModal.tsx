/**
 * Section Variant Modal Component
 * 
 * Modal that displays available variants for a section type with visual previews.
 * Includes column selection for two-column layouts.
 * Redesigned with elegant, compact UI inspired by VisualCV and EnhanceCV.
 */

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, PanelLeft, PanelRight, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSectionVariants, type SectionVariant } from '@/constants/sectionVariants';
import { SummaryVariantPreview } from './variants/SummaryVariantPreview';
import { HeaderVariantPreview } from './variants/HeaderVariantPreview';
import { SkillsVariantPreview } from './variants/SkillsVariantPreview';
import { ExperienceVariantPreview } from './variants/ExperienceVariantPreview';
import { EducationVariantPreview } from './variants/EducationVariantPreview';
import { GenericVariantPreview } from './variants/GenericVariantPreview';
import type { V2SectionType } from '../../types/resumeData';
import type { ScratchLayout } from '../../config/scratchLayouts';

interface SectionVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionType: V2SectionType;
  selectedLayout: ScratchLayout | null;
  onSelectVariant: (variant: SectionVariant, column?: 'main' | 'sidebar') => void;
  photo?: string;
  fullName?: string;
  onPhotoChange?: (photo: string | undefined) => void;
}

export const SectionVariantModal: React.FC<SectionVariantModalProps> = ({
  isOpen,
  onClose,
  sectionType,
  selectedLayout,
  onSelectVariant,
  photo,
  fullName,
  onPhotoChange,
}) => {
  const variants = getSectionVariants(sectionType);
  const [selectedColumn, setSelectedColumn] = React.useState<'main' | 'sidebar'>('main');
  const [hoveredVariant, setHoveredVariant] = React.useState<string | null>(null);
  const [photoUrlInput, setPhotoUrlInput] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Check if layout supports column selection
  const supportsColumnSelection = selectedLayout && (
    selectedLayout.layoutType === 'two-column-left' ||
    selectedLayout.layoutType === 'two-column-right' ||
    selectedLayout.layoutType === 'split'
  );

  // Determine default column based on section type and layout
  React.useEffect(() => {
    if (selectedLayout && supportsColumnSelection) {
      const isSidebarSection = selectedLayout.sidebarSections.includes(sectionType);
      setSelectedColumn(isSidebarSection ? 'sidebar' : 'main');
    }
  }, [selectedLayout, sectionType, supportsColumnSelection]);

  const handleVariantClick = (variant: SectionVariant) => {
    onSelectVariant(
      variant,
      supportsColumnSelection ? selectedColumn : undefined
    );
    onClose();
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        onPhotoChange?.(result);
        setPhotoUrlInput('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoRemove = () => {
    onPhotoChange?.(undefined);
    setPhotoUrlInput('');
  };

  const applyPhotoUrl = () => {
    const trimmed = photoUrlInput.trim();
    if (trimmed) {
      onPhotoChange?.(trimmed);
    } else {
      handlePhotoRemove();
    }
  };

  const getInitials = (name?: string): string => {
    if (!name) return 'AB';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getSectionTitle = () => {
    const sectionNames: Record<V2SectionType, string> = {
      header: 'Header',
      summary: 'Summary',
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
      volunteer: 'Volunteer',
      speaking: 'Speaking',
      patents: 'Patents',
      interests: 'Interests',
      references: 'References',
      courses: 'Courses',
      custom: 'Custom',
    };
    return sectionNames[sectionType] || sectionType;
  };

  // Render preview based on section type
  const renderPreview = (variant: SectionVariant) => {
    const previewProps = { variant };
    
    switch (sectionType) {
      case 'summary':
        return <SummaryVariantPreview {...previewProps} />;
      case 'header':
        return <HeaderVariantPreview {...previewProps} />;
      case 'skills':
        return <SkillsVariantPreview {...previewProps} />;
      case 'experience':
        return <ExperienceVariantPreview {...previewProps} />;
      case 'education':
        return <EducationVariantPreview {...previewProps} />;
      default:
        return <GenericVariantPreview variant={variant} sectionType={sectionType} />;
    }
  };

  if (variants.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden p-0 gap-0 rounded-2xl [&>button]:hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-purple-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Choose {getSectionTitle()} Style
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-0.5">
                  Select a style that fits your resume
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Column Selection (for two-column layouts) */}
        {supportsColumnSelection && (
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Place in:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedColumn('main')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedColumn === 'main'
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-primary/30"
                  )}
                >
                  <PanelRight className="h-4 w-4" />
                  Main Content
                </button>
                <button
                  onClick={() => setSelectedColumn('sidebar')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedColumn === 'sidebar'
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-primary/30"
                  )}
                >
                  <PanelLeft className="h-4 w-4" />
                  Sidebar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Variant Grid - Compact cards */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          {sectionType === 'header' && (
            <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Profile Photo</h3>
                  <p className="text-xs text-gray-500">Upload a headshot or use initials.</p>
                </div>
                {photo && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handlePhotoRemove}
                    className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[11px] font-semibold text-gray-400">
                      {getInitials(fullName)}
                    </span>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handlePhotoUpload(file);
                    }}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-8 text-xs"
                    >
                      Upload photo
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Paste image URL..."
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && photoUrlInput.trim()) {
                          applyPhotoUrl();
                        }
                      }}
                      className="h-8 text-xs"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant={photoUrlInput.trim() ? 'default' : 'outline'}
                      onClick={applyPhotoUrl}
                      disabled={!photoUrlInput.trim()}
                      className="h-8 text-xs"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {variants.map((variant) => {
              const isHovered = hoveredVariant === variant.id;
              
              return (
                <div
                  key={variant.id}
                  onClick={() => handleVariantClick(variant)}
                  onMouseEnter={() => setHoveredVariant(variant.id)}
                  onMouseLeave={() => setHoveredVariant(null)}
                  className={cn(
                    "group relative cursor-pointer rounded-xl border-2 transition-all duration-200",
                    "bg-white overflow-hidden",
                    "border-gray-200 hover:border-primary hover:shadow-lg",
                    "flex flex-col"
                  )}
                >
                  {/* Quick Add Badge */}
                  <div className={cn(
                    "absolute top-2 right-2 z-10 transition-all duration-200",
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  )}>
                    <div className="bg-primary text-white rounded-full px-2.5 py-1 shadow-lg flex items-center gap-1 text-xs font-medium">
                      <Check className="h-3 w-3" />
                      <span>Add</span>
                    </div>
                  </div>

                  {/* Preview Area - Compact */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 min-h-[120px] flex items-center justify-center">
                    <div className="w-full transform transition-transform duration-200 group-hover:scale-[1.02]">
                      {renderPreview(variant)}
                    </div>
                  </div>

                  {/* Info Footer */}
                  <div className="px-3 py-2.5 border-t border-gray-100 bg-white">
                    <h3 className="font-medium text-sm text-gray-900 group-hover:text-primary transition-colors mb-0.5">
                      {variant.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {variant.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={cn(
                    "h-0.5 transition-all duration-200",
                    isHovered ? "bg-primary" : "bg-transparent"
                  )} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            💡 Click any style to add it to your resume
          </p>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-600">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
