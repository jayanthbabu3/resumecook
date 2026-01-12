import React, { memo } from 'react';
import type { ResumeData } from "@/types/resume";
import { TemplatePreviewV2 } from "@/v2/components/TemplatePreviewV2";
import { convertV1ToV2 } from "@/v2/utils/dataConverter";

interface TemplatePreviewProps {
  templateId: string;
  themeColor?: string;
  sampleData?: ResumeData;
  className?: string;
}

/**
 * TemplatePreview - V1 wrapper (deprecated)
 * Now uses V2 templates internally
 */
const TemplatePreviewBase = ({
  templateId,
  themeColor = "#2563eb",
  sampleData,
  className = "",
}: TemplatePreviewProps) => {
  // Map V1 template IDs to V2 template IDs
  const v2TemplateId = templateId.endsWith('-v2') 
    ? templateId 
    : `${templateId}-v2`;
  
  // Convert sample data to V2 format if provided
  const v2SampleData = sampleData ? convertV1ToV2(sampleData) : undefined;

  return (
    <TemplatePreviewV2
      templateId={v2TemplateId}
      themeColor={themeColor}
      sampleData={v2SampleData}
      className={className}
    />
  );
};

export const TemplatePreview = memo(TemplatePreviewBase);

// Export valid template IDs - map V1 IDs to V2 IDs
export const validTemplateIds = [
  'executive-split-v2',
  'minimal-v2',
  'senior-frontend-pro-v2',
  'data-pro-v2',
  'bold-headline-v2',
  'accountant-pro-v2',
  'centered-photo-v2',
  'classic-minimal-v2',
  'professional-blue-v2',
  'elegant-ats-v2',
  'refined-portrait-v2',
  'analyst-clarity-v2',
  'obstacle-solver-v2',
  'terminal-theme-v2',
];
