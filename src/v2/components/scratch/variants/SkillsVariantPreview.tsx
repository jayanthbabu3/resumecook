/**
 * Skills Variant Preview Components
 * 
 * Visual previews for different skills variants.
 * Shows how each variant will look in the resume.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { SectionVariant } from '@/constants/sectionVariants';

interface SkillsVariantPreviewProps {
  variant: SectionVariant;
}

export const SkillsVariantPreview: React.FC<SkillsVariantPreviewProps> = ({ variant }) => {
  const { previewData } = variant;

  switch (variant.id) {
    case 'pills':
      return <PillsPreview data={previewData} />;
    case 'bars':
      return <BarsPreview data={previewData} />;
    case 'two-column':
      return <TwoColumnPreview data={previewData} />;
    case 'tags':
      return <TagsPreview data={previewData} />;
    case 'ratings':
      return <RatingsPreview data={previewData} />;
    case 'bullets':
      return <BulletsPreview data={previewData} />;
    case 'inline':
      return <InlinePreview data={previewData} />;
    case 'grouped':
      return <GroupedPreview data={previewData} />;
    case 'modern':
      return <ModernPreview data={previewData} />;
    case 'compact-grid':
      return <CompactGridPreview data={previewData} />;
    default:
      return <PillsPreview data={previewData} />;
  }
};

// Pills - Rounded pill badges
const PillsPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full flex flex-wrap gap-1.5 items-center justify-center">
    {data.skills?.slice(0, 6).map((skill: string, idx: number) => (
      <span
        key={idx}
        className="px-2 py-0.5 rounded-full border border-primary/40 text-[9px] font-medium text-primary bg-primary/5"
      >
        {skill}
      </span>
    ))}
  </div>
);

// Progress Bars - Visual proficiency bars
const BarsPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-1.5">
    {data.skills?.slice(0, 3).map((skill: any, idx: number) => {
      const level = skill.level || 0;
      const percentage = (level / 5) * 100;
      return (
        <div key={idx} className="space-y-0.5">
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-700 font-medium">{skill.name || skill}</span>
            <span className="text-[8px] text-gray-500">{level}/5</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    })}
  </div>
);

// Two Column - Side by side layout
const TwoColumnPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full grid grid-cols-2 gap-2">
    {data.skills?.slice(0, 6).map((skill: string, idx: number) => (
      <div key={idx} className="text-[9px] text-gray-700 flex items-center">
        <span className="w-1 h-1 rounded-full bg-primary mr-1.5 flex-shrink-0" />
        <span className="truncate">{skill}</span>
      </div>
    ))}
  </div>
);

// Tags/Badges - Square badges
const TagsPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full flex flex-wrap gap-1.5 items-center justify-center">
    {data.skills?.slice(0, 6).map((skill: string, idx: number) => (
      <span
        key={idx}
        className="px-2 py-0.5 rounded border border-primary/40 text-[9px] font-medium text-primary bg-white"
      >
        {skill}
      </span>
    ))}
  </div>
);

// Ratings - Star/dot ratings
const RatingsPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-1.5">
    {data.skills?.slice(0, 3).map((skill: any, idx: number) => {
      const level = skill.level || 0;
      return (
        <div key={idx} className="flex items-center justify-between">
          <span className="text-[9px] text-gray-700 font-medium flex-1 truncate mr-2">
            {skill.name || skill}
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={cn(
                  "text-[8px]",
                  star <= level ? "text-primary" : "text-gray-300"
                )}
              >
                ●
              </span>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

// Bullets - Vertical list with bullets
const BulletsPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-1">
    {data.skills?.slice(0, 4).map((skill: string, idx: number) => (
      <div key={idx} className="flex items-start">
        <span className="text-primary mr-1.5 mt-0.5 text-[8px]">•</span>
        <span className="text-[9px] text-gray-700 flex-1">{skill}</span>
      </div>
    ))}
  </div>
);

// Inline - Comma separated
const InlinePreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full">
    <p className="text-[9px] text-gray-700 leading-relaxed text-center px-2">
      {typeof data.skills === 'string' 
        ? data.skills 
        : data.skills?.slice(0, 8).join(', ')}
    </p>
  </div>
);

// Grouped - By category
const GroupedPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-2">
    {data.skillGroups?.slice(0, 2).map((group: any, idx: number) => (
      <div key={idx} className="space-y-1">
        <h5 className="text-[9px] font-semibold text-gray-900 uppercase tracking-wide">
          {group.category}
        </h5>
        <div className="flex flex-wrap gap-1">
          {group.skills?.slice(0, 3).map((skill: string, skillIdx: number) => (
            <span
              key={skillIdx}
              className="px-1.5 py-0.5 rounded text-[8px] text-gray-600 bg-gray-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// Modern - Card style
const ModernPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full grid grid-cols-3 gap-1.5">
    {data.skills?.slice(0, 6).map((skill: string, idx: number) => (
      <div
        key={idx}
        className="p-1.5 rounded-md border border-gray-200 bg-gradient-to-br from-white to-gray-50 text-center"
      >
        <div className="text-[8px] font-medium text-gray-700 line-clamp-1">{skill}</div>
      </div>
    ))}
  </div>
);

// Compact Grid - Dense grid
const CompactGridPreview: React.FC<{ data: any }> = ({ data }) => {
  const columns = data.columns || 3;
  return (
    <div className={cn("w-full grid gap-1", columns === 3 ? "grid-cols-3" : "grid-cols-2")}>
      {data.skills?.slice(0, columns * 2).map((skill: string, idx: number) => (
        <div
          key={idx}
          className="px-1.5 py-0.5 rounded text-[8px] text-gray-600 bg-gray-50 text-center border border-gray-200"
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

