/**
 * Summary Variant Preview Components
 * 
 * Visual previews for different professional summary variants.
 * Shows how each variant will look in the resume.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { SectionVariant } from '@/constants/sectionVariants';

interface SummaryVariantPreviewProps {
  variant: SectionVariant;
}

export const SummaryVariantPreview: React.FC<SummaryVariantPreviewProps> = ({ variant }) => {
  const { previewData } = variant;

  switch (variant.id) {
    case 'executive-summary':
      return <ExecutiveSummaryPreview data={previewData} />;
    case 'professional-profile':
      return <ProfessionalProfilePreview data={previewData} />;
    case 'career-objective':
      return <CareerObjectivePreview data={previewData} />;
    case 'professional-summary':
      return <ProfessionalSummaryPreview data={previewData} />;
    case 'highlighted-summary':
      return <HighlightedSummaryPreview data={previewData} />;
    case 'two-column-summary':
      return <TwoColumnSummaryPreview data={previewData} />;
    case 'minimal-summary':
      return <MinimalSummaryPreview data={previewData} />;
    case 'achievement-focused':
      return <AchievementFocusedPreview data={previewData} />;
    case 'expertise-summary':
      return <ExpertiseSummaryPreview data={previewData} />;
    case 'about-me':
      return <AboutMePreview data={previewData} />;
    default:
      return <DefaultSummaryPreview data={previewData} />;
  }
};

// Executive Summary - Bold, centered heading
const ExecutiveSummaryPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full text-center space-y-2.5">
    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 border-primary/30 pb-1.5 inline-block">
      {data.title}
    </h4>
    <p className="text-[10px] text-gray-700 leading-relaxed px-3">
      {data.content}
    </p>
  </div>
);

// Professional Profile - Left-aligned with bullets
const ProfessionalProfilePreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-1.5">
    <h4 className="text-xs font-semibold text-gray-900 mb-2">
      {data.title}
    </h4>
    <ul className="space-y-1">
      {Array.isArray(data.content) ? (
        data.content.map((item: string, idx: number) => (
          <li key={idx} className="text-[10px] text-gray-700 flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span className="flex-1">{item}</span>
          </li>
        ))
      ) : (
        <li className="text-[10px] text-gray-700">{data.content}</li>
      )}
    </ul>
  </div>
);

// Career Objective - Focused statement
const CareerObjectivePreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-2">
    <h4 className="text-xs font-semibold text-gray-900">
      {data.title}
    </h4>
    <p className="text-[10px] text-gray-700 leading-relaxed">
      {data.content}
    </p>
  </div>
);

// Professional Summary - Classic format
const ProfessionalSummaryPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-2.5">
    <h4 className="text-xs font-semibold text-gray-900 border-b-2 border-gray-300 pb-1.5">
      {data.title}
    </h4>
    <p className="text-[10px] text-gray-700 leading-relaxed">
      {data.content}
    </p>
  </div>
);

// Highlighted Summary - With border and accent
const HighlightedSummaryPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full border-l-4 border-primary pl-3 py-2.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-r shadow-sm">
    <h4 className="text-xs font-semibold text-gray-900 mb-1.5">
      {data.title}
    </h4>
    <p className="text-[10px] text-gray-700 leading-relaxed">
      {data.content}
    </p>
  </div>
);

// Two Column Summary - Stats and description
const TwoColumnSummaryPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-2">
    <h4 className="text-xs font-semibold text-gray-900 mb-2">
      {data.title}
    </h4>
    <div className="flex gap-3">
      <div className="flex-1">
        {data.stats && (
          <div className="space-y-1">
            {data.stats.map((stat: string, idx: number) => (
              <div key={idx} className="text-[9px] font-medium text-primary">
                {stat}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-[10px] text-gray-700 leading-relaxed">
          {data.content}
        </p>
      </div>
    </div>
  </div>
);

// Minimal Summary - Clean, simple
const MinimalSummaryPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-3">
    <h4 className="text-xs font-light text-gray-900 uppercase tracking-wide">
      {data.title}
    </h4>
    <p className="text-[10px] text-gray-600 leading-relaxed">
      {data.content}
    </p>
  </div>
);

// Achievement Focused - With arrows
const AchievementFocusedPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-2">
    <h4 className="text-xs font-semibold text-gray-900 mb-2">
      {data.title}
    </h4>
    <ul className="space-y-1">
      {Array.isArray(data.content) ? (
        data.content.map((item: string, idx: number) => (
          <li key={idx} className="text-[10px] text-gray-700 flex items-start gap-2">
            <span className="text-primary mt-0.5 text-xs">↗</span>
            <span className="flex-1">{item}</span>
          </li>
        ))
      ) : (
        <li className="text-[10px] text-gray-700">{data.content}</li>
      )}
    </ul>
  </div>
);

// Expertise Summary - With tags
const ExpertiseSummaryPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-2">
    <h4 className="text-xs font-semibold text-gray-900 mb-2">
      {data.title}
    </h4>
    <p className="text-[10px] text-gray-700 leading-relaxed mb-2">
      {data.content}
    </p>
    {data.tags && (
      <div className="flex flex-wrap gap-1">
        {data.tags.map((tag: string, idx: number) => (
          <span
            key={idx}
            className="text-[8px] px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

// About Me - Casual style
const AboutMePreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-2">
    <h4 className="text-xs font-medium text-gray-900 italic">
      {data.title}
    </h4>
    <p className="text-[10px] text-gray-700 leading-relaxed italic">
      {data.content}
    </p>
  </div>
);

// Default Preview
const DefaultSummaryPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full space-y-2">
    <h4 className="text-xs font-semibold text-gray-900">
      {data.title || 'Summary'}
    </h4>
    <p className="text-[10px] text-gray-700 leading-relaxed">
      {data.content || 'Professional summary content will appear here'}
    </p>
  </div>
);

