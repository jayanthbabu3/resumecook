/**
 * Layout Preview Components
 * 
 * Visual previews for each layout type to help users understand the structure.
 * Redesigned with more elegant, professional styling.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutPreviewProps {
  layoutType: 'single-column' | 'two-column-left' | 'two-column-right' | 'split' | 'compact';
  className?: string;
}

export const LayoutPreview: React.FC<LayoutPreviewProps> = ({ layoutType, className }) => {
  switch (layoutType) {
    case 'single-column':
      return <SingleColumnPreview className={className} />;
    case 'two-column-left':
      return <TwoColumnLeftPreview className={className} />;
    case 'two-column-right':
      return <TwoColumnRightPreview className={className} />;
    case 'split':
      return <SplitLayoutPreview className={className} />;
    case 'compact':
      return <CompactLayoutPreview className={className} />;
    default:
      return <SingleColumnPreview className={className} />;
  }
};

// Single Column Preview
const SingleColumnPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex flex-col gap-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
    {/* Header */}
    <div className="h-4 bg-gradient-to-r from-primary/40 to-primary/20 rounded w-full"></div>
    {/* Sections */}
    <div className="space-y-1.5 flex-1">
      <div className="h-2 bg-gray-200 rounded w-full"></div>
      <div className="h-2 bg-gray-200 rounded w-full"></div>
      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
      <div className="h-2 bg-gray-200 rounded w-full"></div>
      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
      <div className="h-2 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

// Two Column Left (Sidebar Left, Main Right)
const TwoColumnLeftPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex gap-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
    {/* Left Sidebar */}
    <div className="w-[35%] flex flex-col gap-1.5 bg-purple-50/50 rounded p-1.5">
      <div className="h-2.5 bg-purple-300/50 rounded w-full"></div>
      <div className="h-1.5 bg-purple-200/50 rounded w-full"></div>
      <div className="h-1.5 bg-purple-200/50 rounded w-full"></div>
      <div className="h-1.5 bg-purple-200/50 rounded w-4/5"></div>
    </div>
    {/* Main Content */}
    <div className="flex-1 flex flex-col gap-1.5">
      <div className="h-3 bg-gradient-to-r from-primary/40 to-primary/20 rounded w-full"></div>
      <div className="h-1.5 bg-gray-200 rounded w-full"></div>
      <div className="h-1.5 bg-gray-200 rounded w-full"></div>
      <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
      <div className="h-1.5 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

// Two Column Right (Sidebar Right, Main Left)
const TwoColumnRightPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex gap-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
    {/* Main Content */}
    <div className="flex-1 flex flex-col gap-1.5">
      <div className="h-3 bg-gradient-to-r from-primary/40 to-primary/20 rounded w-full"></div>
      <div className="h-1.5 bg-gray-200 rounded w-full"></div>
      <div className="h-1.5 bg-gray-200 rounded w-full"></div>
      <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
      <div className="h-1.5 bg-gray-200 rounded w-full"></div>
    </div>
    {/* Right Sidebar */}
    <div className="w-[35%] flex flex-col gap-1.5 bg-purple-50/50 rounded p-1.5">
      <div className="h-2.5 bg-purple-300/50 rounded w-full"></div>
      <div className="h-1.5 bg-purple-200/50 rounded w-full"></div>
      <div className="h-1.5 bg-purple-200/50 rounded w-full"></div>
      <div className="h-1.5 bg-purple-200/50 rounded w-4/5"></div>
    </div>
  </div>
);

// Split Layout (Header + Two Columns)
const SplitLayoutPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex flex-col gap-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
    {/* Header */}
    <div className="h-4 bg-gradient-to-r from-primary/40 to-primary/20 rounded w-full"></div>
    {/* Two Columns */}
    <div className="flex gap-2 flex-1">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="h-1.5 bg-gray-200 rounded w-full"></div>
        <div className="h-1.5 bg-gray-200 rounded w-full"></div>
        <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
      </div>
      {/* Sidebar */}
      <div className="w-[40%] flex flex-col gap-1 bg-purple-50/50 rounded p-1">
        <div className="h-1.5 bg-purple-200/50 rounded w-full"></div>
        <div className="h-1.5 bg-purple-200/50 rounded w-full"></div>
        <div className="h-1.5 bg-purple-200/50 rounded w-4/5"></div>
      </div>
    </div>
  </div>
);

// Compact Layout (Dense Single Column)
const CompactLayoutPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex flex-col gap-1 p-2.5 bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
    {/* Header */}
    <div className="h-3 bg-gradient-to-r from-primary/40 to-primary/20 rounded w-full"></div>
    {/* Dense Sections */}
    <div className="space-y-1 flex-1">
      <div className="h-1 bg-gray-200 rounded w-full"></div>
      <div className="h-1 bg-gray-200 rounded w-full"></div>
      <div className="h-1 bg-gray-200 rounded w-4/5"></div>
      <div className="h-1 bg-gray-200 rounded w-full"></div>
      <div className="h-1 bg-gray-200 rounded w-3/4"></div>
      <div className="h-1 bg-gray-200 rounded w-full"></div>
      <div className="h-1 bg-gray-200 rounded w-4/5"></div>
      <div className="h-1 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

