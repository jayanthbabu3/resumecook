/**
 * Layout Preview Components
 * 
 * Visual previews for each layout type to help users understand the structure.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutPreviewProps {
  layoutType: 'single-column' | 'two-column-left' | 'two-column-right' | 'split' | 'compact';
  className?: string;
}

export const LayoutPreview: React.FC<LayoutPreviewProps> = ({ layoutType, className }) => {
  const baseClasses = "w-full h-full flex flex-col gap-2 p-2";
  
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
  <div className={cn("w-full h-full flex flex-col gap-1.5 p-2 bg-white rounded border border-gray-200", className)}>
    {/* Header */}
    <div className="h-3 bg-blue-500/30 rounded w-full"></div>
    {/* Sections */}
    <div className="h-2 bg-gray-300/50 rounded w-full"></div>
    <div className="h-2 bg-gray-300/50 rounded w-full"></div>
    <div className="h-2 bg-gray-300/50 rounded w-full"></div>
    <div className="h-2 bg-gray-300/50 rounded w-4/5"></div>
    <div className="h-2 bg-gray-300/50 rounded w-full"></div>
    <div className="h-2 bg-gray-300/50 rounded w-3/4"></div>
  </div>
);

// Two Column Left (Sidebar Left, Main Right)
const TwoColumnLeftPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex gap-1.5 p-2 bg-white rounded border border-gray-200", className)}>
    {/* Left Sidebar */}
    <div className="w-[35%] flex flex-col gap-1">
      <div className="h-2 bg-purple-500/30 rounded w-full"></div>
      <div className="h-1.5 bg-purple-500/20 rounded w-full"></div>
      <div className="h-1.5 bg-purple-500/20 rounded w-full"></div>
      <div className="h-1.5 bg-purple-500/20 rounded w-4/5"></div>
    </div>
    {/* Main Content */}
    <div className="flex-1 flex flex-col gap-1">
      <div className="h-2 bg-blue-500/30 rounded w-full"></div>
      <div className="h-1.5 bg-gray-300/50 rounded w-full"></div>
      <div className="h-1.5 bg-gray-300/50 rounded w-full"></div>
      <div className="h-1.5 bg-gray-300/50 rounded w-4/5"></div>
      <div className="h-1.5 bg-gray-300/50 rounded w-full"></div>
    </div>
  </div>
);

// Two Column Right (Sidebar Right, Main Left)
const TwoColumnRightPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex gap-1.5 p-2 bg-white rounded border border-gray-200", className)}>
    {/* Main Content */}
    <div className="flex-1 flex flex-col gap-1">
      <div className="h-2 bg-blue-500/30 rounded w-full"></div>
      <div className="h-1.5 bg-gray-300/50 rounded w-full"></div>
      <div className="h-1.5 bg-gray-300/50 rounded w-full"></div>
      <div className="h-1.5 bg-gray-300/50 rounded w-4/5"></div>
      <div className="h-1.5 bg-gray-300/50 rounded w-full"></div>
    </div>
    {/* Right Sidebar */}
    <div className="w-[35%] flex flex-col gap-1">
      <div className="h-2 bg-purple-500/30 rounded w-full"></div>
      <div className="h-1.5 bg-purple-500/20 rounded w-full"></div>
      <div className="h-1.5 bg-purple-500/20 rounded w-full"></div>
      <div className="h-1.5 bg-purple-500/20 rounded w-4/5"></div>
    </div>
  </div>
);

// Split Layout (Header + Two Columns)
const SplitLayoutPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex flex-col gap-1.5 p-2 bg-white rounded border border-gray-200", className)}>
    {/* Header */}
    <div className="h-2.5 bg-blue-500/30 rounded w-full"></div>
    {/* Two Columns */}
    <div className="flex gap-1.5 flex-1">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="h-1.5 bg-gray-300/50 rounded w-full"></div>
        <div className="h-1.5 bg-gray-300/50 rounded w-full"></div>
        <div className="h-1.5 bg-gray-300/50 rounded w-4/5"></div>
      </div>
      {/* Sidebar */}
      <div className="w-[40%] flex flex-col gap-1">
        <div className="h-1.5 bg-purple-500/20 rounded w-full"></div>
        <div className="h-1.5 bg-purple-500/20 rounded w-full"></div>
        <div className="h-1.5 bg-purple-500/20 rounded w-4/5"></div>
      </div>
    </div>
  </div>
);

// Compact Layout (Dense Single Column)
const CompactLayoutPreview: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-full flex flex-col gap-1 p-1.5 bg-white rounded border border-gray-200", className)}>
    {/* Header */}
    <div className="h-2 bg-blue-500/30 rounded w-full"></div>
    {/* Dense Sections */}
    <div className="h-1 bg-gray-300/50 rounded w-full"></div>
    <div className="h-1 bg-gray-300/50 rounded w-full"></div>
    <div className="h-1 bg-gray-300/50 rounded w-4/5"></div>
    <div className="h-1 bg-gray-300/50 rounded w-full"></div>
    <div className="h-1 bg-gray-300/50 rounded w-3/4"></div>
    <div className="h-1 bg-gray-300/50 rounded w-full"></div>
    <div className="h-1 bg-gray-300/50 rounded w-4/5"></div>
  </div>
);

