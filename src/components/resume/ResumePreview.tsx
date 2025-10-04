import type { ResumeData } from "@/pages/Editor";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
}

export const ResumePreview = ({ resumeData, templateId }: ResumePreviewProps) => {
  const templates = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    executive: ExecutiveTemplate,
  };

  const Template = templates[templateId as keyof typeof templates] || ProfessionalTemplate;

  return (
    <div className="w-full h-full bg-gray-100 p-2 flex justify-center items-start overflow-auto" id="resume-preview">
      <div className="w-[210mm] shadow-2xl bg-white relative">
        {/* Page break indicators for preview only */}
        <div 
          className="absolute left-0 right-0 border-t-2 border-dashed border-red-400 pointer-events-none z-10"
          style={{ top: '297mm' }}
        >
          <span className="absolute -top-3 right-2 bg-red-400 text-white text-xs px-2 py-0.5 rounded">
            Page 2 starts here
          </span>
        </div>
        <div 
          className="absolute left-0 right-0 border-t-2 border-dashed border-red-400 pointer-events-none z-10"
          style={{ top: '594mm' }}
        >
          <span className="absolute -top-3 right-2 bg-red-400 text-white text-xs px-2 py-0.5 rounded">
            Page 3 starts here
          </span>
        </div>
        <Template resumeData={resumeData} />
      </div>
    </div>
  );
};
