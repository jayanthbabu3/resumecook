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
    <div className="w-full h-full bg-gray-100 p-8 flex justify-center items-start overflow-auto" id="resume-preview">
      <div className="w-[210mm] shadow-2xl bg-white">
        <Template resumeData={resumeData} />
      </div>
    </div>
  );
};
