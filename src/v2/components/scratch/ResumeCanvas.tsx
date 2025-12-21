/**
 * Resume Canvas Component
 * 
 * A4-sized blank canvas that renders sections based on selected layout.
 * Uses config-driven rendering with actual section renderers.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { V2ResumeData } from '../../types/resumeData';
import type { ScratchSection } from '../../hooks/useScratchResume';
import type { ScratchLayout } from '../../config/scratchLayouts';
import { generateScratchConfig } from '../../utils/scratchConfigGenerator';
import { useTemplateConfig } from '../../hooks/useTemplateConfig';
import { ResumeRenderer } from '../../components/ResumeRenderer';
import { InlineEditProvider } from '@/contexts/InlineEditContext';
import { StyleOptionsProvider } from '@/contexts/StyleOptionsContext';
import { StyleOptionsWrapper } from '@/components/resume/StyleOptionsWrapper';

interface ResumeCanvasProps {
  resumeData: V2ResumeData;
  sections: ScratchSection[];
  selectedLayout: ScratchLayout | null;
  themeColor: string;
  onResumeDataChange: (data: V2ResumeData) => void;
}

export const ResumeCanvas: React.FC<ResumeCanvasProps> = ({
  resumeData,
  sections,
  selectedLayout,
  themeColor,
  onResumeDataChange,
}) => {
  // Generate config from sections
  const generatedConfig = React.useMemo(() => {
    return generateScratchConfig(sections, selectedLayout, themeColor);
  }, [sections, selectedLayout, themeColor]);

  // Get template config - use the generated config directly instead of merging
  // This ensures only scratch sections are used, not base template sections
  const config = generatedConfig;

  // Determine if we have any sections to show
  const hasSections = sections.length > 0;

  // Render layout guides when empty, actual content when sections exist
  const renderContent = () => {
    if (!hasSections) {
      // Show layout guides when empty
      if (!selectedLayout) return null;

      switch (selectedLayout.layoutType) {
        case 'single-column':
          return <SingleColumnGuide />;
        case 'two-column-left':
          return <TwoColumnLeftGuide themeColor={themeColor} />;
        case 'two-column-right':
          return <TwoColumnRightGuide themeColor={themeColor} />;
        case 'split':
          return <SplitLayoutGuide themeColor={themeColor} />;
        case 'compact':
          return <CompactLayoutGuide />;
        default:
          return <SingleColumnGuide />;
      }
    }

    // Render actual sections using ResumeRenderer
    // Use the generated config directly to avoid base template sections
    return (
      <StyleOptionsProvider>
        <StyleOptionsWrapper>
          <InlineEditProvider 
            resumeData={resumeData as any} 
            setResumeData={onResumeDataChange as any}
          >
            <ResumeRenderer
              resumeData={resumeData}
              templateId="scratch-v2"
              themeColor={themeColor}
              sectionOverrides={(() => {
                const overrides: Record<string, any> = {};
                // Add all scratch sections
                generatedConfig.sections.forEach(section => {
                  overrides[section.id] = section;
                });
                // Disable all base template sections that have the same type as scratch sections
                // But don't disable header type if we have an explicit header section
                const scratchSectionTypes = new Set(
                  generatedConfig.sections
                    .filter(s => s.enabled)
                    .map(s => s.type)
                );
                scratchSectionTypes.forEach(type => {
                  // Don't disable header type - header is handled separately
                  if (type !== 'header') {
                    // Disable base sections of this type
                    overrides[`__disable_type_${type}`] = { type, enabled: false };
                  }
                });
                // Pass header config variant if header section exists
                if (generatedConfig.header?.variant) {
                  overrides['__header_variant'] = generatedConfig.header.variant;
                }
                return overrides;
              })()}
              editable={true}
            />
          </InlineEditProvider>
        </StyleOptionsWrapper>
      </StyleOptionsProvider>
    );
  };

  return (
    <div
      id="scratch-builder-v2-preview"
      className={cn(
        "mx-auto w-full rounded-lg bg-white shadow-2xl overflow-hidden",
        "border border-gray-200"
      )}
      style={{
        width: '210mm',
        minHeight: '297mm',
        maxWidth: '210mm',
      }}
    >
      <div className="p-12 h-full">
        {renderContent()}
      </div>
    </div>
  );
};

// Layout Guide Components

// Single Column Guide
const SingleColumnGuide: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-[600px] space-y-4">
        {/* Visual guide line */}
        <div className="border-l-2 border-dashed border-gray-300 h-full min-h-[400px] ml-8 relative">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 bottom-0 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
        </div>
        <div className="text-center text-muted-foreground mt-8">
          <p className="text-base font-medium mb-1">Single Column Layout</p>
          <p className="text-sm">Click sections from the right panel to add them here</p>
        </div>
      </div>
    </div>
  );
};

// Two Column Left Guide (Sidebar Left, Main Right)
const TwoColumnLeftGuide: React.FC<{ themeColor: string }> = ({ themeColor }) => {
  return (
    <div className="flex gap-6 h-full">
      {/* Left Sidebar */}
      <div className="flex-[35%] flex flex-col">
        <div className="mb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
            Sidebar
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
            <p className="text-xs">Sidebar sections</p>
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-gray-200 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
      </div>

      {/* Main Content */}
      <div className="flex-[65%] flex flex-col">
        <div className="mb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
            Main Content
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
            <p className="text-xs">Main content sections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Two Column Right Guide (Sidebar Right, Main Left)
const TwoColumnRightGuide: React.FC<{ themeColor: string }> = ({ themeColor }) => {
  return (
    <div className="flex gap-6 h-full">
      {/* Main Content */}
      <div className="flex-[65%] flex flex-col">
        <div className="mb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
            Main Content
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
            <p className="text-xs">Main content sections</p>
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-gray-200 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
      </div>

      {/* Right Sidebar */}
      <div className="flex-[35%] flex flex-col">
        <div className="mb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
            Sidebar
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
            <p className="text-xs">Sidebar sections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Split Layout Guide (Header + Two Columns)
const SplitLayoutGuide: React.FC<{ themeColor: string }> = ({ themeColor }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header Area */}
      <div className="mb-6 pb-4 border-b-2 border-dashed" style={{ borderColor: themeColor, opacity: 0.3 }}>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
          Header Area
        </div>
        <div className="h-16 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Header section will appear here</p>
        </div>
      </div>

      {/* Two Columns Below */}
      <div className="flex gap-6 flex-1">
        {/* Main Content */}
        <div className="flex-[60%] flex flex-col">
          <div className="mb-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Main Content
            </div>
            <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
          </div>
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center text-muted-foreground">
              <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
              <p className="text-xs">Main content sections</p>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-200 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
        </div>

        {/* Sidebar */}
        <div className="flex-[40%] flex flex-col">
          <div className="mb-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Sidebar
            </div>
            <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
          </div>
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center text-muted-foreground">
              <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
              <p className="text-xs">Sidebar sections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact Layout Guide
const CompactLayoutGuide: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-[600px] space-y-3">
        {/* Compact visual guide lines */}
        <div className="border-l-2 border-dashed border-gray-300 h-full min-h-[400px] ml-8 relative">
          <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 top-1/4 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 top-2/4 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 top-3/4 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 bottom-0 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
        </div>
        <div className="text-center text-muted-foreground mt-8">
          <p className="text-base font-medium mb-1">Compact Layout</p>
          <p className="text-sm">Dense, space-efficient single column</p>
        </div>
      </div>
    </div>
  );
};
