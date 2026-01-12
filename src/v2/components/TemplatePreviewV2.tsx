import React, { memo, useState } from 'react';
import type { ResumeData } from "@/types/resume";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { StyleOptionsProvider } from "@/contexts/StyleOptionsContext";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { ResumeRenderer } from "./ResumeRenderer";
import { MOCK_RESUME_DATA } from '../data/mockData';
import { getTemplate } from '../templates';

interface TemplatePreviewV2Props {
  templateId: string;
  themeColor?: string;
  sampleData?: ResumeData;
  className?: string;
}

export const TemplatePreviewV2 = memo<TemplatePreviewV2Props>(({
  templateId,
  themeColor = "#2563eb",
  sampleData,
  className = "",
}) => {
  const template = getTemplate(templateId);
  const resumeData = sampleData || template?.mockData || MOCK_RESUME_DATA;
  const [previewData] = useState(resumeData);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full origin-top-left"
          style={{
            transform: 'scale(0.35)',
            width: '285.7%',
            minHeight: '285.7%'
          }}
        >
          <StyleOptionsProvider>
            <StyleOptionsWrapper>
              <div id="resume-preview-v2" style={{ width: '100%', height: '100%' }}>
                <InlineEditProvider resumeData={previewData} setResumeData={() => {}}>
                  <ResumeRenderer
                    resumeData={previewData}
                    templateId={templateId}
                    themeColor={themeColor}
                    editable={false}
                  />
                </InlineEditProvider>
              </div>
            </StyleOptionsWrapper>
          </StyleOptionsProvider>
        </div>
      </div>
    </div>
  );
});

TemplatePreviewV2.displayName = "TemplatePreviewV2";





