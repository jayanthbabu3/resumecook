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
import { FresherMinimalGridTemplate } from "./templates/FresherMinimalGridTemplate";
import { FresherDarkProfessionalTemplate } from "./templates/FresherDarkProfessionalTemplate";
import { FresherColorAccentTemplate } from "./templates/FresherColorAccentTemplate";
import { FresherTimelineTemplate } from "./templates/FresherTimelineTemplate";
import { FresherSkillsFirstTemplate } from "./templates/FresherSkillsFirstTemplate";
import { FresherCardBasedTemplate } from "./templates/FresherCardBasedTemplate";
import { FresherTwoToneTemplate } from "./templates/FresherTwoToneTemplate";
import { FresherCenteredElegantTemplate } from "./templates/FresherCenteredElegantTemplate";
import { FresherGeometricTemplate } from "./templates/FresherGeometricTemplate";
import { FresherAchievementTemplate } from "./templates/FresherAchievementTemplate";
// Healthcare & Medical Templates
import { MedicalProfessionalTemplate } from "./templates/MedicalProfessionalTemplate";
import { HealthcareTwoColumnTemplate } from "./templates/HealthcareTwoColumnTemplate";
import { NurseSpecialistTemplate } from "./templates/NurseSpecialistTemplate";
import { MedicalExecutiveTemplate } from "./templates/MedicalExecutiveTemplate";
import { ClinicalMinimalTemplate } from "./templates/ClinicalMinimalTemplate";
// Education & Teaching Templates
import { TeacherProfessionalTemplate } from "./templates/TeacherProfessionalTemplate";
import { AcademicScholarTemplate } from "./templates/AcademicScholarTemplate";
import { EducatorModernTemplate } from "./templates/EducatorModernTemplate";
import { TeachingCertifiedTemplate } from "./templates/TeachingCertifiedTemplate";
import { StudentEducatorTemplate } from "./templates/StudentEducatorTemplate";
// Finance & Accounting Templates
import { CPAProfessionalTemplate } from "./templates/CPAProfessionalTemplate";
import { FinanceAnalystTemplate } from "./templates/FinanceAnalystTemplate";
import { AccountingExecutiveTemplate } from "./templates/AccountingExecutiveTemplate";
import { AuditorTemplate } from "./templates/AuditorTemplate";
import { FinanceTwoColumnTemplate } from "./templates/FinanceTwoColumnTemplate";
// Sales & Marketing Templates
import { SalesExecutiveTemplate } from "./templates/SalesExecutiveTemplate";
import { MarketingProfessionalTemplate } from "./templates/MarketingProfessionalTemplate";
import { SalesMarketingHybridTemplate } from "./templates/SalesMarketingHybridTemplate";
import { DigitalMarketerTemplate } from "./templates/DigitalMarketerTemplate";
import { SalesManagerTemplate } from "./templates/SalesManagerTemplate";
// Legal & Consulting Templates
import { AttorneyProfessionalTemplate } from "./templates/AttorneyProfessionalTemplate";
import { LegalCounselTemplate } from "./templates/LegalCounselTemplate";
import { ConsultantTemplate } from "./templates/ConsultantTemplate";
import { LegalExecutiveTemplate } from "./templates/LegalExecutiveTemplate";
import { ParalegalTemplate } from "./templates/ParalegalTemplate";
// Operations & Project Management Templates
import { ProjectManagerPMPTemplate } from "./templates/ProjectManagerPMPTemplate";
import { OperationsManagerTemplate } from "./templates/OperationsManagerTemplate";
import { PMExecutiveTemplate } from "./templates/PMExecutiveTemplate";
import { AgileScrumTemplate } from "./templates/AgileScrumTemplate";
import { OperationsTwoColumnTemplate } from "./templates/OperationsTwoColumnTemplate";
// New Software Development Templates
import { JavaDeveloperTemplate } from "./templates/JavaDeveloperTemplate";
import { DotNetDeveloperTemplate } from "./templates/DotNetDeveloperTemplate";
import { DevOpsEngineerTemplate } from "./templates/DevOpsEngineerTemplate";
import { CloudArchitectTemplate } from "./templates/CloudArchitectTemplate";
import { MobileDeveloperTemplate } from "./templates/MobileDeveloperTemplate";
import { ReactNativeDeveloperTemplate } from "./templates/ReactNativeDeveloperTemplate";
import { DataEngineerTemplate } from "./templates/DataEngineerTemplate";
import { MachineLearningEngineerTemplate } from "./templates/MachineLearningEngineerTemplate";
import { QAAutomationEngineerTemplate } from "./templates/QAAutomationEngineerTemplate";
import { SecurityEngineerTemplate } from "./templates/SecurityEngineerTemplate";
import { PythonDeveloperTemplate } from "./templates/PythonDeveloperTemplate";
import { NodeJSDeveloperTemplate } from "./templates/NodeJSDeveloperTemplate";
import { ReactDeveloperTemplate } from "./templates/ReactDeveloperTemplate";
import { GoDeveloperTemplate } from "./templates/GoDeveloperTemplate";
import { KuberneteEngineerTemplate } from "./templates/KuberneteEngineerTemplate";

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
    "fresher-minimal-grid": FresherMinimalGridTemplate,
    "fresher-dark-professional": FresherDarkProfessionalTemplate,
    "fresher-color-accent": FresherColorAccentTemplate,
    "fresher-timeline": FresherTimelineTemplate,
    "fresher-skills-first": FresherSkillsFirstTemplate,
    "fresher-card-based": FresherCardBasedTemplate,
    "fresher-two-tone": FresherTwoToneTemplate,
    "fresher-centered-elegant": FresherCenteredElegantTemplate,
    "fresher-geometric": FresherGeometricTemplate,
    "fresher-achievement": FresherAchievementTemplate,
    // Healthcare & Medical
    "medical-professional": MedicalProfessionalTemplate,
    "healthcare-two-column": HealthcareTwoColumnTemplate,
    "nurse-specialist": NurseSpecialistTemplate,
    "medical-executive": MedicalExecutiveTemplate,
    "clinical-minimal": ClinicalMinimalTemplate,
    // Education & Teaching
    "teacher-professional": TeacherProfessionalTemplate,
    "academic-scholar": AcademicScholarTemplate,
    "educator-modern": EducatorModernTemplate,
    "teaching-certified": TeachingCertifiedTemplate,
    "student-educator": StudentEducatorTemplate,
    // Finance & Accounting
    "cpa-professional": CPAProfessionalTemplate,
    "finance-analyst": FinanceAnalystTemplate,
    "accounting-executive": AccountingExecutiveTemplate,
    "auditor": AuditorTemplate,
    "finance-two-column": FinanceTwoColumnTemplate,
    // Sales & Marketing
    "sales-executive": SalesExecutiveTemplate,
    "marketing-professional": MarketingProfessionalTemplate,
    "sales-marketing-hybrid": SalesMarketingHybridTemplate,
    "digital-marketer": DigitalMarketerTemplate,
    "sales-manager": SalesManagerTemplate,
    // Legal & Consulting
    "attorney-professional": AttorneyProfessionalTemplate,
    "legal-counsel": LegalCounselTemplate,
    "consultant": ConsultantTemplate,
    "legal-executive": LegalExecutiveTemplate,
    "paralegal": ParalegalTemplate,
    // Operations & Project Management
    "project-manager-pmp": ProjectManagerPMPTemplate,
    "operations-manager": OperationsManagerTemplate,
    "pm-executive": PMExecutiveTemplate,
    "agile-scrum": AgileScrumTemplate,
    "operations-two-column": OperationsTwoColumnTemplate,
    // New Software Development Templates
    "java-developer": JavaDeveloperTemplate,
    "dotnet-developer": DotNetDeveloperTemplate,
    "devops-engineer": DevOpsEngineerTemplate,
    "cloud-architect": CloudArchitectTemplate,
    "mobile-developer": MobileDeveloperTemplate,
    "react-native-developer": ReactNativeDeveloperTemplate,
    "data-engineer": DataEngineerTemplate,
    "machine-learning-engineer": MachineLearningEngineerTemplate,
    "qa-automation-engineer": QAAutomationEngineerTemplate,
    "security-engineer": SecurityEngineerTemplate,
    "python-developer": PythonDeveloperTemplate,
    "nodejs-developer": NodeJSDeveloperTemplate,
    "react-developer": ReactDeveloperTemplate,
    "go-developer": GoDeveloperTemplate,
    "kubernetes-engineer": KuberneteEngineerTemplate,
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
