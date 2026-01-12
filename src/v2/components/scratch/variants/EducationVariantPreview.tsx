/**
 * Education Variant Preview Components
 * 
 * Visual previews for different education variants.
 * Each variant has a UNIQUE visual style.
 */

import React from 'react';
import type { SectionVariant } from '@/constants/sectionVariants';

interface EducationVariantPreviewProps {
  variant: SectionVariant;
}

export const EducationVariantPreview: React.FC<EducationVariantPreviewProps> = ({ variant }) => {
  switch (variant.id) {
    case 'education-classic':
      return <ClassicEducationPreview />;
    case 'education-modern':
      return <ModernEducationPreview />;
    case 'education-minimal':
      return <MinimalEducationPreview />;
    case 'education-detailed':
      return <DetailedEducationPreview />;
    case 'education-timeline':
      return <TimelineEducationPreview />;
    case 'education-compact':
      return <CompactEducationPreview />;
    case 'education-honors':
      return <HonorsEducationPreview />;
    case 'education-boxed':
      return <BoxedEducationPreview />;
    case 'education-two-column':
      return <TwoColumnEducationPreview />;
    case 'education-achievement':
      return <AchievementEducationPreview />;
    default:
      return <ClassicEducationPreview />;
  }
};

// Classic - Traditional format with degree, school, dates
const ClassicEducationPreview: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Education</div>
    <div className="space-y-1">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-semibold text-gray-900">Bachelor of Science in Computer Science</div>
          <div className="text-[9px] text-primary">Stanford University</div>
        </div>
        <div className="text-[8px] text-gray-500">2016 - 2020</div>
      </div>
      <div className="text-[8px] text-gray-500">GPA: 3.8/4.0</div>
    </div>
  </div>
);

// Modern - Card with accent border
const ModernEducationPreview: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Academic Background</div>
    <div className="p-2 rounded-lg border-l-3 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold text-gray-900">B.S. Computer Science</div>
          <div className="text-[9px] text-primary font-medium">Stanford University</div>
        </div>
        <div className="text-[8px] text-white bg-primary px-1.5 py-0.5 rounded-full">2020</div>
      </div>
    </div>
  </div>
);

// Minimal - Clean, essential info only
const MinimalEducationPreview: React.FC = () => (
  <div className="w-full space-y-1.5">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Education</div>
    <div>
      <div className="text-[10px] font-medium text-gray-900">BS Computer Science</div>
      <div className="text-[9px] text-gray-500">Stanford University • 2020</div>
    </div>
  </div>
);

// Detailed - With coursework
const DetailedEducationPreview: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Academic Credentials</div>
    <div className="space-y-1">
      <div className="text-[10px] font-semibold text-gray-900">Bachelor of Science in Computer Science</div>
      <div className="text-[9px] text-primary">Stanford University, Stanford, CA</div>
      <div className="text-[8px] text-gray-500">Sep 2016 - Jun 2020 • GPA: 3.8/4.0</div>
      <div className="flex flex-wrap gap-1 mt-1">
        <span className="text-[7px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">Algorithms</span>
        <span className="text-[7px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">ML</span>
        <span className="text-[7px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">Systems</span>
      </div>
    </div>
  </div>
);

// Timeline - Visual timeline with dot
const TimelineEducationPreview: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Education Timeline</div>
    <div className="relative pl-4 border-l-2 border-primary/40">
      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary"></div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-gray-500 font-medium">2016 - 2020</span>
        </div>
        <div className="text-[10px] font-semibold text-gray-900">B.S. Computer Science</div>
        <div className="text-[9px] text-primary">Stanford University</div>
      </div>
    </div>
  </div>
);

// Compact - Single line format
const CompactEducationPreview: React.FC = () => (
  <div className="w-full space-y-1.5">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Education</div>
    <div className="flex items-center justify-between border-b border-gray-100 pb-1">
      <div className="flex items-center gap-1">
        <span className="text-[9px] font-semibold text-gray-900">B.S. Computer Science</span>
        <span className="text-[8px] text-gray-400">|</span>
        <span className="text-[9px] text-primary">Stanford</span>
      </div>
      <span className="text-[8px] text-gray-500">2020</span>
    </div>
  </div>
);

// Honors - Emphasizes GPA and honors
const HonorsEducationPreview: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Education & Honors</div>
    <div className="space-y-1">
      <div className="text-[10px] font-semibold text-gray-900">B.S. Computer Science</div>
      <div className="text-[9px] text-primary">Stanford University</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[8px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">GPA: 3.8</span>
        <span className="text-[8px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium">Magna Cum Laude</span>
      </div>
    </div>
  </div>
);

// Boxed - Each degree in a box
const BoxedEducationPreview: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Academic Qualifications</div>
    <div className="p-2 rounded border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-semibold text-gray-900">B.S. Computer Science</div>
          <div className="text-[9px] text-gray-600">Stanford University</div>
        </div>
        <div className="text-[8px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">2020</div>
      </div>
      <div className="text-[8px] text-gray-500 mt-1">GPA: 3.8/4.0</div>
    </div>
  </div>
);

// Two-Column - School left, details right
const TwoColumnEducationPreview: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Education</div>
    <div className="flex gap-3">
      <div className="w-1/3">
        <div className="text-[8px] text-gray-500">2016 - 2020</div>
        <div className="text-[9px] text-primary font-medium">Stanford</div>
      </div>
      <div className="flex-1">
        <div className="text-[10px] font-semibold text-gray-900">B.S. Computer Science</div>
        <div className="text-[8px] text-gray-500">GPA: 3.8/4.0</div>
      </div>
    </div>
  </div>
);

// Achievement - Emphasizes academic achievements
const AchievementEducationPreview: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">Academic Excellence</div>
    <div className="space-y-1">
      <div className="text-[10px] font-semibold text-gray-900">B.S. Computer Science</div>
      <div className="text-[9px] text-primary">Stanford University • 2020</div>
      <div className="space-y-0.5 mt-1">
        <div className="text-[8px] text-gray-600 flex items-center gap-1">
          <span className="text-primary">★</span> GPA: 3.8/4.0
        </div>
        <div className="text-[8px] text-gray-600 flex items-center gap-1">
          <span className="text-primary">★</span> Dean's List
        </div>
      </div>
    </div>
  </div>
);
