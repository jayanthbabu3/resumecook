import React, { memo, useState, useEffect } from 'react';
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

// Scale values: mobile shows more of the resume (smaller scale), desktop shows larger detail
// Mobile: 0.22 scale = shows more of full A4 layout
// Desktop: 0.35 scale = shows more detail
const MOBILE_SCALE = 0.22;
const DESKTOP_SCALE = 0.35;
const MD_BREAKPOINT = 768;

export const TemplatePreviewV2 = memo<TemplatePreviewV2Props>(({
  templateId,
  themeColor = "#2563eb",
  sampleData,
  className = "",
}) => {
  const template = getTemplate(templateId);
  const resumeData = sampleData || template?.mockData || MOCK_RESUME_DATA;
  const [previewData] = useState(resumeData);
  const [scale, setScale] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < MD_BREAKPOINT ? MOBILE_SCALE : DESKTOP_SCALE
  );

  // Listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < MD_BREAKPOINT ? MOBILE_SCALE : DESKTOP_SCALE);
    };

    // Use matchMedia for better performance
    const mediaQuery = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setScale(e.matches ? DESKTOP_SCALE : MOBILE_SCALE);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const scaledWidth = 100 / scale;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full origin-top-left"
          style={{
            transform: `scale(${scale})`,
            width: `${scaledWidth}%`,
            minHeight: `${scaledWidth}%`
          }}
        >
          <StyleOptionsProvider>
            <StyleOptionsWrapper>
              <div style={{ width: '100%', height: '100%' }}>
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





