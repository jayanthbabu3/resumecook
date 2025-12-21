/**
 * Helper Section Panel Component
 * 
 * Right-side panel showing available sections that can be added to the resume.
 */

import React from 'react';
import { SECTION_REGISTRY } from '../../registry/sectionRegistry';
import type { V2SectionType } from '../../types/resumeData';
import { cn } from '@/lib/utils';
import { 
  FileText, User, Briefcase, GraduationCap, Code, Globe, 
  Award, Target, BookOpen, Heart, Mic, Lightbulb, 
  Star, Users, Trophy, PenTool
} from 'lucide-react';

interface HelperSectionPanelProps {
  onSectionClick: (sectionType: V2SectionType) => void;
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

export const HelperSectionPanel: React.FC<HelperSectionPanelProps> = ({
  onSectionClick,
}) => {
  // Get all sections including header
  const availableSections = Object.values(SECTION_REGISTRY);

  return (
    <div className="lg:sticky lg:top-24 h-fit">
      <div className="bg-white rounded-xl shadow-lg border p-3">
        <div className="mb-3">
          <h2 className="text-sm font-bold mb-0.5">Add Sections</h2>
          <p className="text-[10px] text-muted-foreground">
            Click to add sections to your resume
          </p>
        </div>
        <div className="space-y-1.5 max-h-[calc(100vh-250px)] overflow-y-auto pr-1.5">
          {availableSections.map((section) => {
            const Icon = SECTION_ICONS[section.type] || FileText;
            
            return (
              <div
                key={section.type}
                onClick={() => onSectionClick(section.type)}
                className={cn(
                  "group relative overflow-hidden rounded-lg border bg-gradient-to-br from-white to-gray-50/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:shadow-md hover:border-primary/30 hover:scale-[1.01]",
                  "active:scale-[0.99]"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-2.5">
                  <div className="flex items-start gap-2">
                    <div className="text-lg mt-0.5 flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-gray-900 mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">
                        {section.defaultTitle}
                      </h4>
                      <p className="text-[10px] text-gray-500 line-clamp-2 leading-snug">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

