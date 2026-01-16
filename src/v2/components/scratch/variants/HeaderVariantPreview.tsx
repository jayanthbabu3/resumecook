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
    case 'banner-with-summary':
      return <BannerWithSummaryHeaderPreview data={previewData} />;
    case 'wave-accent':
      return <WaveAccentHeaderPreview data={previewData} />;
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

// Banner with Summary Header - Dark banner with summary included
const BannerWithSummaryHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full bg-slate-800 text-white rounded px-3 py-2.5">
    <div className="flex gap-2">
      <div className="flex-1">
        <div className="text-[11px] font-bold">JOHN DOE</div>
        <div className="text-[9px] text-primary mt-0.5">Senior Software Engineer</div>
        <div className="text-[7px] opacity-70 mt-1 line-clamp-2">
          Experienced software engineer with expertise in building scalable web applications...
        </div>
      </div>
      <div className="w-10 h-10 rounded-full border-2 border-primary/50 flex-shrink-0 flex items-center justify-center bg-primary/20">
        <span className="text-[10px] font-bold text-primary">JD</span>
      </div>
    </div>
    <div className="mt-2 pt-1.5 border-t border-white/10 flex flex-wrap gap-2 text-[7px] opacity-70">
      <span>john@example.com</span>
      <span>•</span>
      <span>+1 (555) 123-4567</span>
    </div>
  </div>
);

// Wave Accent Header - Elegant minimal with large photo and contact bar
const WaveAccentHeaderPreview: React.FC<{ data: any }> = ({ data }) => (
  <div className="w-full relative overflow-hidden rounded" style={{ backgroundColor: '#ffffff' }}>
    {/* Soft tinted background - top section */}
    <div
      className="absolute top-0 left-0 right-0"
      style={{ height: '75%', backgroundColor: 'rgba(14,165,233,0.06)' }}
    />

    {/* Main content */}
    <div className="relative px-2 py-2.5">
      <div className="flex items-start gap-2">
        {/* Large circular photo */}
        <div
          className="rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{ width: '36px', height: '36px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <span className="text-[10px] font-bold text-gray-600">JD</span>
        </div>

        {/* Name and title */}
        <div className="flex-1 pt-0.5">
          <div
            className="text-[11px] text-gray-800"
            style={{ fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            JOHN DOE
          </div>
          <div
            className="text-[7px] text-gray-500 mt-0.5"
            style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Software Engineer
          </div>
        </div>
      </div>
    </div>

    {/* Contact bar at bottom */}
    <div className="bg-primary py-1.5 px-2">
      <div className="flex items-center justify-center gap-3 text-[6px] text-white">
        <span>m. : +1 555</span>
        <span>e. : john@email.com</span>
        <span>a. : New York</span>
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

