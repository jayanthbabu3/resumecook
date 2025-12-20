import { type ResumeData } from "@/types/resume";
import { ResumeRenderer } from "@/v2/components/ResumeRenderer";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { convertV1ToV2, convertV2ToV1 } from "@/v2/utils/dataConverter";
import type { V2ResumeData } from "@/v2/types";

interface EditableResumePreviewProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  templateId: string;
  themeColor?: string;
}

/**
 * EditableResumePreview - V1 wrapper (deprecated)
 * Now uses V2 templates internally
 */
export const EditableResumePreview = ({
  resumeData,
  setResumeData,
  templateId,
  themeColor = "#2563eb",
}: EditableResumePreviewProps) => {
  // Map V1 template IDs to V2 template IDs
  const v2TemplateId = templateId.endsWith('-v2') 
    ? templateId 
    : `${templateId}-v2`;
  
  // Convert resume data to V2 format
  const v2ResumeData = convertV1ToV2(resumeData);

  // Wrapper to convert V2 data back to V1 when updating
  const handleV2DataChange = (v2Data: V2ResumeData) => {
    const v1Data = convertV2ToV1(v2Data);
    setResumeData(v1Data);
  };

  return (
    <div className="w-full h-full bg-white">
      <InlineEditProvider 
        resumeData={v2ResumeData as any} 
        setResumeData={handleV2DataChange as any}
      >
        <ResumeRenderer
          resumeData={v2ResumeData}
          templateId={v2TemplateId}
          themeColor={themeColor}
          editable={true}
        />
      </InlineEditProvider>
    </div>
  );
};
