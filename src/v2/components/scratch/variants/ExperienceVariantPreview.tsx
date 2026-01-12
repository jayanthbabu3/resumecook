/**
 * Experience Variant Preview Components
 * 
 * Visual previews for different experience variants.
 * Shows how each variant will look in the resume.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { SectionVariant } from '@/constants/sectionVariants';

interface ExperienceVariantPreviewProps {
  variant: SectionVariant;
}

export const ExperienceVariantPreview: React.FC<ExperienceVariantPreviewProps> = ({ variant }) => {
  const { previewData } = variant;

  switch (variant.id) {
    case 'timeline':
      return <TimelinePreview data={previewData} />;
    case 'cards':
      return <CardsPreview data={previewData} />;
    case 'left-border':
      return <LeftBorderPreview data={previewData} />;
    case 'dates-left':
      return <DatesLeftPreview data={previewData} />;
    case 'dates-right':
      return <DatesRightPreview data={previewData} />;
    case 'standard':
      return <StandardPreview data={previewData} />;
    case 'compact':
      return <CompactPreview data={previewData} />;
    case 'modern':
      return <ModernPreview data={previewData} />;
    case 'minimal':
      return <MinimalPreview data={previewData} />;
    case 'detailed':
      return <DetailedPreview data={previewData} />;
    default:
      return <StandardPreview data={previewData} />;
  }
};

// Timeline - Connecting dots and vertical line
const TimelinePreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full relative pl-6">
      {/* Timeline line */}
      <div className="absolute left-2 top-3 bottom-0 w-0.5 bg-primary/30" />
      {/* Timeline dot */}
      <div className="absolute left-1.5 top-2 w-2 h-2 rounded-full bg-primary border-2 border-white" />
      
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="text-[10px] font-semibold text-gray-900">{item.position}</div>
            <div className="text-[9px] text-primary">{item.company}</div>
          </div>
          <div className="text-[8px] text-gray-500 whitespace-nowrap">2020 - Present</div>
        </div>
        {item.bulletPoints && item.bulletPoints.length > 0 && (
          <ul className="mt-1 space-y-0.5 pl-2">
            {item.bulletPoints.slice(0, 2).map((bullet: string, idx: number) => (
              <li key={idx} className="text-[8px] text-gray-600 flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mr-1 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Cards - Each experience in a card
const CardsPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full p-2 rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex justify-between items-start gap-2 mb-1">
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-gray-900">{item.position}</div>
          <div className="text-[9px] text-primary">{item.company}</div>
        </div>
        <div className="text-[8px] text-gray-500 whitespace-nowrap">2020 - Present</div>
      </div>
      {item.bulletPoints && item.bulletPoints.length > 0 && (
        <ul className="mt-1 space-y-0.5">
          {item.bulletPoints.slice(0, 2).map((bullet: string, idx: number) => (
            <li key={idx} className="text-[8px] text-gray-600 flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mr-1 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Left Border - Colored left border accent
const LeftBorderPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full flex">
      <div className="w-1 bg-primary rounded-l mr-2 flex-shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="text-[10px] font-semibold text-gray-900">{item.position}</div>
            <div className="text-[9px] text-primary">{item.company}</div>
          </div>
          <div className="text-[8px] text-gray-500 whitespace-nowrap">2020 - Present</div>
        </div>
        {item.bulletPoints && item.bulletPoints.length > 0 && (
          <ul className="mt-1 space-y-0.5">
            {item.bulletPoints.slice(0, 2).map((bullet: string, idx: number) => (
              <li key={idx} className="text-[8px] text-gray-600 flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mr-1 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Dates Left - Dates on left column
const DatesLeftPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full grid grid-cols-[80px_1fr] gap-2">
      <div className="text-[8px] text-gray-500 text-right pt-0.5">2020 - Present</div>
      <div className="space-y-1">
        <div className="text-[10px] font-semibold text-gray-900">{item.position}</div>
        <div className="text-[9px] text-primary">{item.company}</div>
        {item.bulletPoints && item.bulletPoints.length > 0 && (
          <ul className="mt-1 space-y-0.5">
            {item.bulletPoints.slice(0, 2).map((bullet: string, idx: number) => (
              <li key={idx} className="text-[8px] text-gray-600 flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mr-1 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Dates Right - Dates on right side
const DatesRightPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full space-y-1">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-gray-900">{item.position}</div>
          <div className="text-[9px] text-primary">{item.company}</div>
        </div>
        <div className="text-[8px] text-gray-500 whitespace-nowrap">2020 - Present</div>
      </div>
      {item.bulletPoints && item.bulletPoints.length > 0 && (
        <ul className="mt-1 space-y-0.5">
          {item.bulletPoints.slice(0, 2).map((bullet: string, idx: number) => (
            <li key={idx} className="text-[8px] text-gray-600 flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mr-1 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Standard - Classic format
const StandardPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full space-y-1">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-gray-900">{item.position}</div>
          <div className="text-[9px] text-primary">{item.company}</div>
        </div>
        <div className="text-[8px] text-gray-500 whitespace-nowrap">2020 - Present</div>
      </div>
      {item.bulletPoints && item.bulletPoints.length > 0 && (
        <ul className="mt-1 space-y-0.5 pl-3">
          {item.bulletPoints.slice(0, 2).map((bullet: string, idx: number) => (
            <li key={idx} className="text-[8px] text-gray-600 list-disc line-clamp-1">{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Compact - Single line format
const CompactPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
          <span className="text-[10px] font-semibold text-gray-900">{item.position}</span>
          <span className="text-[8px] text-gray-400">at</span>
          <span className="text-[9px] text-primary truncate">{item.company}</span>
        </div>
        <span className="text-[8px] text-gray-500 whitespace-nowrap">2020 - Present</span>
      </div>
    </div>
  );
};

// Modern - Contemporary design
const ModernPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full space-y-1.5 p-2 rounded-md bg-gradient-to-br from-gray-50 to-white border border-gray-100">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="text-[10px] font-bold text-gray-900">{item.position}</div>
          <div className="text-[9px] text-primary font-medium">{item.company}</div>
        </div>
        <div className="text-[8px] text-gray-500 font-medium whitespace-nowrap">2020 - Present</div>
      </div>
      {item.bulletPoints && item.bulletPoints.length > 0 && (
        <ul className="mt-1 space-y-0.5">
          {item.bulletPoints.slice(0, 2).map((bullet: string, idx: number) => (
            <li key={idx} className="text-[8px] text-gray-600 flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mr-1.5 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Minimal - Essential info only
const MinimalPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full space-y-0.5">
      <div className="text-[10px] font-semibold text-gray-900">{item.position}</div>
      <div className="text-[9px] text-gray-600">{item.company} • 2020 - Present</div>
    </div>
  );
};

// Detailed - Comprehensive layout
const DetailedPreview: React.FC<{ data: any }> = ({ data }) => {
  const item = data.items?.[0];
  if (!item) return null;
  
  return (
    <div className="w-full space-y-1">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-gray-900">{item.position}</div>
          <div className="text-[9px] text-primary">{item.company}</div>
          {item.location && (
            <div className="text-[8px] text-gray-500 mt-0.5">{item.location}</div>
          )}
        </div>
        <div className="text-[8px] text-gray-500 whitespace-nowrap">2020 - Present</div>
      </div>
      {item.bulletPoints && item.bulletPoints.length > 0 && (
        <ul className="mt-1 space-y-0.5 pl-3">
          {item.bulletPoints.slice(0, 3).map((bullet: string, idx: number) => (
            <li key={idx} className="text-[8px] text-gray-600 list-disc line-clamp-1">{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

