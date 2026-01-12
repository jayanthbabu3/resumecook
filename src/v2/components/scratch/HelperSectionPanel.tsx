/**
 * Helper Section Panel Component
 * 
 * Right-side panel showing available sections that can be added to the resume.
 * Redesigned with elegant, professional UI inspired by VisualCV and EnhanceCV.
 */

import React from 'react';
import { SECTION_REGISTRY } from '../../registry/sectionRegistry';
import type { V2SectionType } from '../../types/resumeData';
import { cn } from '@/lib/utils';
import { 
  FileText, User, Briefcase, GraduationCap, Code, Globe, 
  Award, Target, BookOpen, Heart, Mic, Lightbulb, 
  Star, Users, Trophy, PenTool, Plus, Check, Sparkles
} from 'lucide-react';

interface HelperSectionPanelProps {
  onSectionClick: (sectionType: V2SectionType) => void;
  addedSections?: V2SectionType[];
}

// Icon mapping for sections
const SECTION_ICONS: Record<V2SectionType, React.ComponentType<{ className?: string }>> = {
  header: User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  languages: Globe,
  achievements: Award,
  strengths: Target,
  certifications: BookOpen,
  projects: PenTool,
  awards: Trophy,
  publications: BookOpen,
  volunteer: Heart,
  speaking: Mic,
  patents: Lightbulb,
  interests: Star,
  references: Users,
  courses: BookOpen,
  custom: FileText,
};

// Section categories for grouping
const SECTION_CATEGORIES = {
  essential: ['header', 'summary', 'experience', 'education', 'skills'],
  professional: ['achievements', 'certifications', 'projects', 'awards'],
  additional: ['languages', 'strengths', 'publications', 'volunteer', 'speaking', 'patents', 'interests', 'references', 'courses', 'custom'],
};

export const HelperSectionPanel: React.FC<HelperSectionPanelProps> = ({
  onSectionClick,
  addedSections = [],
}) => {
  // Get all sections including header
  const allSections = Object.values(SECTION_REGISTRY);
  
  // Group sections by category
  const essentialSections = allSections.filter(s => SECTION_CATEGORIES.essential.includes(s.type));
  const professionalSections = allSections.filter(s => SECTION_CATEGORIES.professional.includes(s.type));
  const additionalSections = allSections.filter(s => SECTION_CATEGORIES.additional.includes(s.type));

  const renderSection = (section: typeof allSections[0]) => {
    const Icon = SECTION_ICONS[section.type] || FileText;
    const isAdded = addedSections.includes(section.type);
    const canAddMultiple = section.allowMultiple;
    
    return (
      <div
        key={section.type}
        onClick={() => onSectionClick(section.type)}
        className={cn(
          "group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
          "border bg-white",
          isAdded && !canAddMultiple
            ? "border-green-200 bg-green-50/50"
            : "border-gray-100 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
        )}
      >
        {/* Icon */}
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200",
          isAdded && !canAddMultiple
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
        )}>
          <Icon className="h-4 w-4" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-medium text-sm mb-0.5 transition-colors duration-200",
            isAdded && !canAddMultiple
              ? "text-green-700"
              : "text-gray-900 group-hover:text-primary"
          )}>
            {section.defaultTitle}
          </h4>
          <p className="text-xs text-gray-500 line-clamp-1">
            {section.description}
          </p>
        </div>
        
        {/* Status indicator */}
        <div className="flex-shrink-0">
          {isAdded && !canAddMultiple ? (
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="h-3.5 w-3.5 text-primary" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCategory = (title: string, sections: typeof allSections, icon?: React.ReactNode) => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2 px-1">
        {icon}
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="space-y-2">
        {sections.map(renderSection)}
      </div>
    </div>
  );

  return (
    <div className="lg:sticky lg:top-20 h-fit">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-purple-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Add Sections</h2>
              <p className="text-xs text-gray-500">
                Click to add sections to your resume
              </p>
            </div>
          </div>
        </div>
        
        {/* Sections List */}
        <div className="p-4 max-h-[calc(100vh-220px)] overflow-y-auto">
          {renderCategory('Essential', essentialSections)}
          {renderCategory('Professional', professionalSections)}
          {renderCategory('Additional', additionalSections)}
        </div>
        
        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500 text-center">
            💡 Click any section to choose a style variant
          </p>
        </div>
      </div>
    </div>
  );
};

