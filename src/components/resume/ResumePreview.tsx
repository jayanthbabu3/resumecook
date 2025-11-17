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
import { FresherModernTwoColumnTemplate } from "./templates/FresherModernTwoColumnTemplate";
import { FresherProfessionalSidebarTemplate } from "./templates/FresherProfessionalSidebarTemplate";
import { FresherCleanModernTemplate } from "./templates/FresherCleanModernTemplate";
import { FresherTechSplitTemplate } from "./templates/FresherTechSplitTemplate";
import { FresherExecutiveStyleTemplate } from "./templates/FresherExecutiveStyleTemplate";
import { FresherBoldHeaderTemplate } from "./templates/FresherBoldHeaderTemplate";
import { FresherMinimalistTwoColumnTemplate } from "./templates/FresherMinimalistTwoColumnTemplate";
import { FresherCreativeEdgeTemplate } from "./templates/FresherCreativeEdgeTemplate";
import { FresherProfessionalGridTemplate } from "./templates/FresherProfessionalGridTemplate";
import { FresherModernClassicTemplate } from "./templates/FresherModernClassicTemplate";
import { FresherSplitLayoutTemplate } from "./templates/FresherSplitLayoutTemplate";
import { FresherCompactProTemplate } from "./templates/FresherCompactProTemplate";
import { FresherElegantSidebarTemplate } from "./templates/FresherElegantSidebarTemplate";
import { FresherTechModernTemplate } from "./templates/FresherTechModernTemplate";
import { FresherProfessionalMinimalTemplate } from "./templates/FresherProfessionalMinimalTemplate";
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
// Senior/Lead Software Engineering Templates
import { SeniorJavaDeveloperTemplate } from "./templates/SeniorJavaDeveloperTemplate";
import { SeniorDotNetDeveloperTemplate } from "./templates/SeniorDotNetDeveloperTemplate";
import { SeniorDevOpsEngineerTemplate } from "./templates/SeniorDevOpsEngineerTemplate";
import { LeadBackendEngineerTemplate } from "./templates/LeadBackendEngineerTemplate";
import { LeadFrontendEngineerTemplate } from "./templates/LeadFrontendEngineerTemplate";
import { SeniorFullStackDeveloperTemplate } from "./templates/SeniorFullStackDeveloperTemplate";
import { PrincipalSoftwareEngineerTemplate } from "./templates/PrincipalSoftwareEngineerTemplate";
import { StaffEngineerTemplate } from "./templates/StaffEngineerTemplate";
import { EngineeringManagerTemplate } from "./templates/EngineeringManagerTemplate";
import { SolutionsArchitectTemplate } from "./templates/SolutionsArchitectTemplate";
import { SeniorMobileEngineerTemplate } from "./templates/SeniorMobileEngineerTemplate";
import { PlatformEngineerTemplate } from "./templates/PlatformEngineerTemplate";
import { SiteReliabilityEngineerTemplate } from "./templates/SiteReliabilityEngineerTemplate";
import { BackendAPISpecialistTemplate } from "./templates/BackendAPISpecialistTemplate";
import { FrontendArchitectTemplate } from "./templates/FrontendArchitectTemplate";
// New Universal Professional Templates
import { ExecutiveModernTemplate } from "./templates/ExecutiveModernTemplate";
import { CorporateBlueTemplate } from "./templates/CorporateBlueTemplate";
import { ProfessionalSidebarTemplate } from "./templates/ProfessionalSidebarTemplate";
import { MinimalistProTemplate } from "./templates/MinimalistProTemplate";
import { ClassicElegantTemplate } from "./templates/ClassicElegantTemplate";
import { BusinessModernTemplate } from "./templates/BusinessModernTemplate";
import { ProfessionalTimelineTemplate } from "./templates/ProfessionalTimelineTemplate";
import { CleanCorporateTemplate } from "./templates/CleanCorporateTemplate";
import { ModernProfessionalTemplate } from "./templates/ModernProfessionalTemplate";
import { ElegantProfessionalTemplate } from "./templates/ElegantProfessionalTemplate";
import { ProfessionalGridTemplate } from "./templates/ProfessionalGridTemplate";
import { BusinessEliteTemplate } from "./templates/BusinessEliteTemplate";
import { CorporateCleanTemplate } from "./templates/CorporateCleanTemplate";
import { ProfessionalClassicTemplate } from "./templates/ProfessionalClassicTemplate";
import { ModernBusinessTemplate } from "./templates/ModernBusinessTemplate";
import { StrategicExecutiveTemplate } from "./templates/StrategicExecutiveTemplate";
import { ProfessionalSphereTemplate } from "./templates/ProfessionalSphereTemplate";
import { GlobalProfessionalTemplate } from "./templates/GlobalProfessionalTemplate";
import { ProfessionalHorizonTemplate } from "./templates/ProfessionalHorizonTemplate";
import { ExecutivePrimeTemplate } from "./templates/ExecutivePrimeTemplate";
import { CorporateMomentumTemplate } from "./templates/CorporateMomentumTemplate";
import { ProfessionalAscendTemplate } from "./templates/ProfessionalAscendTemplate";
import { GlobalEliteTemplate } from "./templates/GlobalEliteTemplate";
import { ExecutiveVisionTemplate } from "./templates/ExecutiveVisionTemplate";
import { CorporateFusionTemplate } from "./templates/CorporateFusionTemplate";
import { ProfessionalZenithTemplate } from "./templates/ProfessionalZenithTemplate";
import { ExecutiveCoreTemplate } from "./templates/ExecutiveCoreTemplate";
import { CodeCraftsmanTemplate } from "./templates/CodeCraftsmanTemplate";
import { TechPioneerTemplate } from "./templates/TechPioneerTemplate";
import { DevArchitectureTemplate } from "./templates/DevArchitectureTemplate";
import { SoftwareMasterTemplate } from "./templates/SoftwareMasterTemplate";
import { TechVanguardTemplate } from "./templates/TechVanguardTemplate";
import { CodeSphereTemplate } from "./templates/CodeSphereTemplate";
import { DevEliteTemplate } from "./templates/DevEliteTemplate";
import { TechHorizonTemplate } from "./templates/TechHorizonTemplate";
import { SoftwareCraftsmanTemplate } from "./templates/SoftwareCraftsmanTemplate";
import { CodeVisionTemplate } from "./templates/CodeVisionTemplate";
import { DevPrimeTemplate } from "./templates/DevPrimeTemplate";
import { TechCraftedTemplate } from "./templates/TechCraftedTemplate";
import { SoftwareVisionTemplate } from "./templates/SoftwareVisionTemplate";
import { CodePinnacleTemplate } from "./templates/CodePinnacleTemplate";
import { DevMomentumTemplate } from "./templates/DevMomentumTemplate";
import { ArtisticBoldTemplate } from "./templates/ArtisticBoldTemplate";
import { DesignerShowcaseTemplate } from "./templates/DesignerShowcaseTemplate";
import { CreativeTimelineTemplate } from "./templates/CreativeTimelineTemplate";
import { ColorfulModernTemplate } from "./templates/ColorfulModernTemplate";
import { AsymmetricCreativeTemplate } from "./templates/AsymmetricCreativeTemplate";
import { CreativeCanvasTemplate } from "./templates/CreativeCanvasTemplate";
import { DesignMaestroTemplate } from "./templates/DesignMaestroTemplate";
import { ArtisticVisionTemplate } from "./templates/ArtisticVisionTemplate";
import { CreativePulseTemplate } from "./templates/CreativePulseTemplate";
import { DesignPinnacleTemplate } from "./templates/DesignPinnacleTemplate";
import { ArtisticHorizonTemplate } from "./templates/ArtisticHorizonTemplate";
import { CreativeCraftedTemplate } from "./templates/CreativeCraftedTemplate";
import { DesignSphereTemplate } from "./templates/DesignSphereTemplate";
import { ArtisticMomentumTemplate } from "./templates/ArtisticMomentumTemplate";
import { CreativeHorizonTemplate } from "./templates/CreativeHorizonTemplate";
import { GraduateMomentumTemplate } from "./templates/GraduateMomentumTemplate";
import { EntryEliteTemplate } from "./templates/EntryEliteTemplate";
import { FreshersVisionTemplate } from "./templates/FreshersVisionTemplate";
import { GraduatePrimeTemplate } from "./templates/GraduatePrimeTemplate";
import { EntryHorizonTemplate } from "./templates/EntryHorizonTemplate";
import { FreshersCraftedTemplate } from "./templates/FreshersCraftedTemplate";
import { GraduateZenithTemplate } from "./templates/GraduateZenithTemplate";
import { EntrySphereTemplate } from "./templates/EntrySphereTemplate";

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
    "fresher-modern-two-column": FresherModernTwoColumnTemplate,
    "fresher-professional-sidebar": FresherProfessionalSidebarTemplate,
    "fresher-clean-modern": FresherCleanModernTemplate,
    "fresher-tech-split": FresherTechSplitTemplate,
    "fresher-executive-style": FresherExecutiveStyleTemplate,
    "fresher-bold-header": FresherBoldHeaderTemplate,
    "fresher-minimalist-two-column": FresherMinimalistTwoColumnTemplate,
    "fresher-creative-edge": FresherCreativeEdgeTemplate,
    "fresher-professional-grid": FresherProfessionalGridTemplate,
    "fresher-modern-classic": FresherModernClassicTemplate,
    "fresher-split-layout": FresherSplitLayoutTemplate,
    "fresher-compact-pro": FresherCompactProTemplate,
    "fresher-elegant-sidebar": FresherElegantSidebarTemplate,
    "fresher-tech-modern": FresherTechModernTemplate,
    "fresher-professional-minimal": FresherProfessionalMinimalTemplate,
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
    // Senior/Lead Software Engineering Templates
    "senior-java-developer": SeniorJavaDeveloperTemplate,
    "senior-dotnet-developer": SeniorDotNetDeveloperTemplate,
    "senior-devops-engineer": SeniorDevOpsEngineerTemplate,
    "lead-backend-engineer": LeadBackendEngineerTemplate,
    "lead-frontend-engineer": LeadFrontendEngineerTemplate,
    "senior-fullstack-developer": SeniorFullStackDeveloperTemplate,
    "principal-software-engineer": PrincipalSoftwareEngineerTemplate,
    "staff-engineer": StaffEngineerTemplate,
    "engineering-manager": EngineeringManagerTemplate,
    "solutions-architect": SolutionsArchitectTemplate,
    "senior-mobile-engineer": SeniorMobileEngineerTemplate,
    "platform-engineer": PlatformEngineerTemplate,
    "site-reliability-engineer": SiteReliabilityEngineerTemplate,
    "backend-api-specialist": BackendAPISpecialistTemplate,
    "frontend-architect": FrontendArchitectTemplate,
    // New Universal Professional Templates
    "executive-modern": ExecutiveModernTemplate,
    "corporate-blue": CorporateBlueTemplate,
    "professional-sidebar": ProfessionalSidebarTemplate,
    "minimalist-pro": MinimalistProTemplate,
    "classic-elegant": ClassicElegantTemplate,
    "business-modern": BusinessModernTemplate,
    "professional-timeline": ProfessionalTimelineTemplate,
    "clean-corporate": CleanCorporateTemplate,
    "modern-professional": ModernProfessionalTemplate,
    "elegant-professional": ElegantProfessionalTemplate,
    "professional-grid": ProfessionalGridTemplate,
    "business-elite": BusinessEliteTemplate,
    "corporate-clean": CorporateCleanTemplate,
    "professional-classic": ProfessionalClassicTemplate,
    "modern-business": ModernBusinessTemplate,
    "strategic-executive": StrategicExecutiveTemplate,
    "professional-sphere": ProfessionalSphereTemplate,
    "global-professional": GlobalProfessionalTemplate,
    "professional-horizon": ProfessionalHorizonTemplate,
    "executive-prime": ExecutivePrimeTemplate,
    "corporate-momentum": CorporateMomentumTemplate,
    "professional-ascend": ProfessionalAscendTemplate,
    "global-elite": GlobalEliteTemplate,
    "executive-vision": ExecutiveVisionTemplate,
    "corporate-fusion": CorporateFusionTemplate,
    "professional-zenith": ProfessionalZenithTemplate,
    "executive-core": ExecutiveCoreTemplate,
    "code-craftsman": CodeCraftsmanTemplate,
    "tech-pioneer": TechPioneerTemplate,
    "dev-architecture": DevArchitectureTemplate,
    "software-master": SoftwareMasterTemplate,
    "tech-vanguard": TechVanguardTemplate,
    "code-sphere": CodeSphereTemplate,
    "dev-elite": DevEliteTemplate,
    "tech-horizon": TechHorizonTemplate,
    "software-craftsman": SoftwareCraftsmanTemplate,
    "code-vision": CodeVisionTemplate,
    "dev-prime": DevPrimeTemplate,
    "tech-crafted": TechCraftedTemplate,
    "software-vision": SoftwareVisionTemplate,
    "code-pinnacle": CodePinnacleTemplate,
    "dev-momentum": DevMomentumTemplate,
    "artistic-bold": ArtisticBoldTemplate,
    "designer-showcase": DesignerShowcaseTemplate,
    "creative-timeline": CreativeTimelineTemplate,
    "colorful-modern": ColorfulModernTemplate,
    "asymmetric-creative": AsymmetricCreativeTemplate,
    "creative-canvas": CreativeCanvasTemplate,
    "design-maestro": DesignMaestroTemplate,
    "artistic-vision": ArtisticVisionTemplate,
    "creative-pulse": CreativePulseTemplate,
    "design-pinnacle": DesignPinnacleTemplate,
    "artistic-horizon": ArtisticHorizonTemplate,
    "creative-crafted": CreativeCraftedTemplate,
    "design-sphere": DesignSphereTemplate,
    "artistic-momentum": ArtisticMomentumTemplate,
    "creative-horizon": CreativeHorizonTemplate,
    "graduate-momentum": GraduateMomentumTemplate,
    "entry-elite": EntryEliteTemplate,
    "freshers-vision": FreshersVisionTemplate,
    "graduate-prime": GraduatePrimeTemplate,
    "entry-horizon": EntryHorizonTemplate,
    "freshers-crafted": FreshersCraftedTemplate,
    "graduate-zenith": GraduateZenithTemplate,
    "entry-sphere": EntrySphereTemplate,
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
