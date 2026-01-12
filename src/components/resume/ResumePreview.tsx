import type { ResumeData } from "@/types/resume";
import { ResumeRenderer } from "@/v2/components/ResumeRenderer";
import { convertV1ToV2 } from "@/v2/utils/dataConverter";

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
  themeColor?: string;
}

/**
 * ResumePreview - V1 wrapper (deprecated)
 * Now uses V2 templates internally
 */
export const ResumePreview = ({
  resumeData,
  templateId,
  themeColor = "#2563eb",
}: ResumePreviewProps) => {
  // Map V1 template IDs to V2 template IDs
  const v2TemplateId = templateId.endsWith('-v2') 
    ? templateId 
    : `${templateId}-v2`;
  
  // Convert resume data to V2 format
  const v2ResumeData = convertV1ToV2(resumeData);

  return (
    <div className="w-full h-full bg-white">
      <ResumeRenderer
        resumeData={v2ResumeData}
        templateId={v2TemplateId}
        themeColor={themeColor}
        editable={false}
      />
    </div>
  );
};
