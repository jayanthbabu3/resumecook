import type { ResumeData } from "@/pages/Editor";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { FrontendTemplate } from "./templates/FrontendTemplate";
import { FullstackTemplate } from "./templates/FullstackTemplate";
import { BackendTemplate } from "./templates/BackendTemplate";
import { GraduateTemplate } from "./templates/GraduateTemplate";
import { StarterTemplate } from "./templates/StarterTemplate";
import { FresherTemplate } from "./templates/FresherTemplate";
import { PremiumFresherTemplate } from "./templates/PremiumFresherTemplate";
import { SeniorTemplate } from "./templates/SeniorTemplate";
import { SeniorFrontendTemplate } from "./templates/SeniorFrontendTemplate";
import { SeniorBackendTemplate } from "./templates/SeniorBackendTemplate";
import { SoftwareTemplate } from "./templates/SoftwareTemplate";
import { PremiumUniversalTemplate } from "./templates/PremiumUniversalTemplate";
import { PremiumProTemplate } from "./templates/PremiumProTemplate";
import { FresherEliteTemplate } from "./templates/FresherEliteTemplate";
import { AnalystTemplate } from "./templates/AnalystTemplate";
import { EliteTemplate } from "./templates/EliteTemplate";
import { CorporateExecutiveTemplate } from "./templates/CorporateExecutiveTemplate";
import { RefinedTemplate } from "./templates/RefinedTemplate";
import { PremiumEliteTemplate } from "./templates/PremiumEliteTemplate";
import { SapphireExecutiveTemplate } from "./templates/SapphireExecutiveTemplate";
import { CreativeAccentTemplate } from "./templates/CreativeAccentTemplate";
import { ModernSidebarTemplate } from "./templates/ModernSidebarTemplate";
import { MinimalistGeometricTemplate } from "./templates/MinimalistGeometricTemplate";
import { BoldHeadlineTemplate } from "./templates/BoldHeadlineTemplate";
import { DualToneTemplate } from "./templates/DualToneTemplate";
import { ElegantSerifTemplate } from "./templates/ElegantSerifTemplate";
import { TechGridTemplate } from "./templates/TechGridTemplate";
import { ContemporarySplitTemplate } from "./templates/ContemporarySplitTemplate";
import { LuxuryTimelineTemplate } from "./templates/LuxuryTimelineTemplate";

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
  themeColor?: string;
}

export const ResumePreview = ({
  resumeData,
  templateId,
  themeColor = "#7c3aed",
}: ResumePreviewProps) => {
  const templates = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    executive: ExecutiveTemplate,
    frontend: FrontendTemplate,
    fullstack: FullstackTemplate,
    backend: BackendTemplate,
    graduate: GraduateTemplate,
    starter: StarterTemplate,
    fresher: FresherTemplate,
    "premium-fresher": PremiumFresherTemplate,
    senior: SeniorTemplate,
    "senior-frontend": SeniorFrontendTemplate,
    "senior-backend": SeniorBackendTemplate,
    software: SoftwareTemplate,
    "premium-universal": PremiumUniversalTemplate,
    "premium-pro": PremiumProTemplate,
    "fresher-elite": FresherEliteTemplate,
    analyst: AnalystTemplate,
    elite: EliteTemplate,
    "corporate-executive": CorporateExecutiveTemplate,
    refined: RefinedTemplate,
    "premium-elite": PremiumEliteTemplate,
    "sapphire-executive": SapphireExecutiveTemplate,
    "creative-accent": CreativeAccentTemplate,
    "modern-sidebar": ModernSidebarTemplate,
    "minimalist-geometric": MinimalistGeometricTemplate,
    "bold-headline": BoldHeadlineTemplate,
    "dual-tone": DualToneTemplate,
    "elegant-serif": ElegantSerifTemplate,
    "tech-grid": TechGridTemplate,
    "contemporary-split": ContemporarySplitTemplate,
    "luxury-timeline": LuxuryTimelineTemplate,
  };

  const Template =
    templates[templateId as keyof typeof templates] || ProfessionalTemplate;

  return (
    <div
      className="flex h-full w-full items-start justify-center overflow-auto bg-gray-100 p-3 sm:p-4"
      id="resume-preview"
    >
      <div className="relative w-full max-w-[210mm] rounded-lg bg-white shadow-2xl">
        <Template resumeData={resumeData} themeColor={themeColor} />
      </div>
    </div>
  );
};
