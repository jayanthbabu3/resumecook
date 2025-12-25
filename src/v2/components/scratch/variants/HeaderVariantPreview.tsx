/**
 * Header Variant Preview Components
 * 
 * Visual previews for different header variants.
 * Shows how each variant will look in the resume.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { SectionVariant } from '@/constants/sectionVariants';

interface HeaderVariantPreviewProps {
  variant: SectionVariant;
}

export const HeaderVariantPreview: React.FC<HeaderVariantPreviewProps> = ({ variant }) => {
  const { previewData } = variant;

  switch (variant.id) {
    case 'centered':
      return <CenteredHeaderPreview data={previewData} />;
    case 'left-aligned':
      return <LeftAlignedHeaderPreview data={previewData} />;
    case 'banner':
      return <BannerHeaderPreview data={previewData} />;
    case 'minimal':
      return <MinimalHeaderPreview data={previewData} />;
    case 'split':
      return <SplitHeaderPreview data={previewData} />;
    case 'photo-left':
      return <PhotoLeftHeaderPreview data={previewData} />;
    case 'photo-right':
      return <PhotoRightHeaderPreview data={previewData} />;
    case 'accent-bar':
      return <AccentBarHeaderPreview data={previewData} />;
    case 'compact':
      return <CompactHeaderPreview data={previewData} />;
    case 'gradient-banner':
      return <GradientBannerHeaderPreview data={previewData} />;
    default:
      return <DefaultHeaderPreview data={previewData} />;
  }
};

// Centered Header - Name centered, contact below
const CenteredHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full text-center space-y-2">
    <div className="text-[11px] font-bold text-gray-900">JOHN DOE</div>
    <div className="text-[9px] text-gray-600">Senior Software Engineer</div>
    <div className="flex items-center justify-center gap-2 text-[8px] text-gray-500">
      <span>john@example.com</span>
      <span>•</span>
      <span>+1 (555) 123-4567</span>
    </div>
  </div>
);

// Left Aligned Header - Name left, contact right
const LeftAlignedHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full flex items-start justify-between gap-3">
    <div className="flex-1">
      <div className="text-[11px] font-bold text-gray-900">JOHN DOE</div>
      <div className="text-[9px] text-gray-600 mt-0.5">Senior Software Engineer</div>
    </div>
    <div className="text-right text-[8px] text-gray-500 space-y-0.5">
      <div>john@example.com</div>
      <div>+1 (555) 123-4567</div>
    </div>
  </div>
);

// Banner Header - Full-width colored banner
const BannerHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full bg-primary/90 text-white rounded px-3 py-2.5">
    <div className="text-center space-y-1.5">
      <div className="text-[11px] font-bold">JOHN DOE</div>
      <div className="text-[9px] opacity-90">Senior Software Engineer</div>
      <div className="flex items-center justify-center gap-2 text-[8px] opacity-80">
        <span>john@example.com</span>
        <span>•</span>
        <span>+1 (555) 123-4567</span>
      </div>
    </div>
  </div>
);

// Minimal Header - Just name and title
const MinimalHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full text-center space-y-1">
    <div className="text-[11px] font-semibold text-gray-900">JOHN DOE</div>
    <div className="text-[9px] text-gray-600">Senior Software Engineer</div>
  </div>
);

// Split Header - Name left, contact in columns
const SplitHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full">
    <div className="text-[11px] font-bold text-gray-900 mb-1.5">JOHN DOE</div>
    <div className="text-[9px] text-gray-600 mb-2">Senior Software Engineer</div>
    <div className="grid grid-cols-2 gap-2 text-[8px] text-gray-500">
      <div>john@example.com</div>
      <div>+1 (555) 123-4567</div>
      <div>San Francisco, CA</div>
      <div>linkedin.com/in/johndoe</div>
    </div>
  </div>
);

// Photo Left Header - Photo on left
const PhotoLeftHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full flex items-start gap-2">
    <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/30 flex-shrink-0 flex items-center justify-center">
      <span className="text-[10px] font-bold text-primary">JD</span>
    </div>
    <div className="flex-1">
      <div className="text-[11px] font-bold text-gray-900">JOHN DOE</div>
      <div className="text-[9px] text-gray-600 mt-0.5">Senior Software Engineer</div>
      <div className="text-[8px] text-gray-500 mt-1">john@example.com • +1 (555) 123-4567</div>
    </div>
  </div>
);

// Photo Right Header - Photo on right
const PhotoRightHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full flex items-start gap-2">
    <div className="flex-1">
      <div className="text-[11px] font-bold text-gray-900">JOHN DOE</div>
      <div className="text-[9px] text-gray-600 mt-0.5">Senior Software Engineer</div>
      <div className="text-[8px] text-gray-500 mt-1">john@example.com • +1 (555) 123-4567</div>
    </div>
    <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/30 flex-shrink-0 flex items-center justify-center">
      <span className="text-[10px] font-bold text-primary">JD</span>
    </div>
  </div>
);

// Accent Bar Header - Thin accent bar at top
const AccentBarHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full">
    <div className="h-1 bg-primary w-full rounded-t mb-2" />
    <div className="text-center space-y-1.5">
      <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/30 mx-auto flex items-center justify-center">
        <span className="text-[9px] font-bold text-primary">JD</span>
      </div>
      <div className="text-[11px] font-bold text-gray-900">JOHN DOE</div>
      <div className="text-[9px] text-gray-600">Senior Software Engineer</div>
      <div className="text-[8px] text-gray-500">john@example.com • +1 (555) 123-4567</div>
    </div>
  </div>
);

// Compact Header - Single line inline
const CompactHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full">
    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
      <span className="text-[11px] font-bold text-gray-900">JOHN DOE</span>
      <span className="text-gray-300">|</span>
      <span className="text-[9px] text-primary font-medium">Software Engineer</span>
      <span className="text-gray-300">|</span>
      <span className="text-[8px] text-gray-500">john@example.com</span>
      <span className="text-[8px] text-gray-500">• +1 (555) 123-4567</span>
    </div>
  </div>
);

// Gradient Banner Header - Full-width gradient
const GradientBannerHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full bg-gradient-to-r from-primary to-primary/70 text-white rounded px-3 py-2.5">
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-full border-2 border-white/30 flex-shrink-0 flex items-center justify-center bg-white/10">
        <span className="text-[9px] font-bold text-white">JD</span>
      </div>
      <div className="flex-1">
        <div className="text-[11px] font-bold">JOHN DOE</div>
        <div className="text-[8px] opacity-80 mt-0.5">john@example.com • +1 (555) 123-4567</div>
      </div>
    </div>
  </div>
);

// Default Header Preview
const DefaultHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full text-center space-y-1.5">
    <div className="text-[11px] font-bold text-gray-900">JOHN DOE</div>
    <div className="text-[9px] text-gray-600">Senior Software Engineer</div>
    <div className="text-[8px] text-gray-500">john@example.com</div>
  </div>
);

