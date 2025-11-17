import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowLeft, Edit3, FileEdit, Save } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { resumeService } from "@/lib/firestore/resumeService";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { ResumeData as NewResumeData } from "@/types/resume";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pdf } from "@react-pdf/renderer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfessionalPDF } from "@/components/resume/pdf/ProfessionalPDF";
import { ModernPDF } from "@/components/resume/pdf/ModernPDF";
import { MinimalPDF } from "@/components/resume/pdf/MinimalPDF";
import { ExecutivePDF } from "@/components/resume/pdf/ExecutivePDF";
import { FrontendPDF } from "@/components/resume/pdf/FrontendPDF";
import { FullstackPDF } from "@/components/resume/pdf/FullstackPDF";
import { BackendPDF } from "@/components/resume/pdf/BackendPDF";
import { GraduatePDF } from "@/components/resume/pdf/GraduatePDF";
import { StarterPDF } from "@/components/resume/pdf/StarterPDF";
import { FresherPDF } from "@/components/resume/pdf/FresherPDF";
import { PremiumFresherPDF } from "@/components/resume/pdf/PremiumFresherPDF";
import { SeniorPDF } from "@/components/resume/pdf/SeniorPDF";
import { SeniorFrontendPDF } from "@/components/resume/pdf/SeniorFrontendPDF";
import { SeniorBackendPDF } from "@/components/resume/pdf/SeniorBackendPDF";
import { SoftwarePDF } from "@/components/resume/pdf/SoftwarePDF";
import { PremiumUniversalPDF } from "@/components/resume/pdf/PremiumUniversalPDF";
import { PremiumProPDF } from "@/components/resume/pdf/PremiumProPDF";
import { FresherElitePDF } from "@/components/resume/pdf/FresherElitePDF";
import { AnalystPDF } from "@/components/resume/pdf/AnalystPDF";
import { ElitePDF } from "@/components/resume/pdf/ElitePDF";
import { CorporateExecutivePDF } from "@/components/resume/pdf/CorporateExecutivePDF";
import { RefinedPDF } from "@/components/resume/pdf/RefinedPDF";
import { PremiumElitePDF } from "@/components/resume/pdf/PremiumElitePDF";
import { FresherMinimalGridPDF } from "@/components/resume/pdf/FresherMinimalGridPDF";
import { FresherDarkProfessionalPDF } from "@/components/resume/pdf/FresherDarkProfessionalPDF";
import { FresherColorAccentPDF } from "@/components/resume/pdf/FresherColorAccentPDF";
import { FresherTimelinePDF } from "@/components/resume/pdf/FresherTimelinePDF";
import { FresherSkillsFirstPDF } from "@/components/resume/pdf/FresherSkillsFirstPDF";
import { FresherCardBasedPDF } from "@/components/resume/pdf/FresherCardBasedPDF";
import { FresherTwoTonePDF } from "@/components/resume/pdf/FresherTwoTonePDF";
import { FresherCenteredElegantPDF } from "@/components/resume/pdf/FresherCenteredElegantPDF";
import { FresherGeometricPDF } from "@/components/resume/pdf/FresherGeometricPDF";
import { FresherAchievementPDF } from "@/components/resume/pdf/FresherAchievementPDF";
// New Fresher PDF Templates
import { FresherModernTwoColumnPDF } from "@/components/resume/pdf/FresherModernTwoColumnPDF";
import { FresherProfessionalSidebarPDF } from "@/components/resume/pdf/FresherProfessionalSidebarPDF";
import { FresherCleanModernPDF } from "@/components/resume/pdf/FresherCleanModernPDF";
import { FresherTechSplitPDF } from "@/components/resume/pdf/FresherTechSplitPDF";
import { FresherExecutiveStylePDF } from "@/components/resume/pdf/FresherExecutiveStylePDF";
import { FresherBoldHeaderPDF } from "@/components/resume/pdf/FresherBoldHeaderPDF";
import { FresherMinimalistTwoColumnPDF } from "@/components/resume/pdf/FresherMinimalistTwoColumnPDF";
import { FresherCreativeEdgePDF } from "@/components/resume/pdf/FresherCreativeEdgePDF";
import { FresherProfessionalGridPDF } from "@/components/resume/pdf/FresherProfessionalGridPDF";
import { FresherModernClassicPDF } from "@/components/resume/pdf/FresherModernClassicPDF";
import { FresherSplitLayoutPDF } from "@/components/resume/pdf/FresherSplitLayoutPDF";
import { FresherCompactProPDF } from "@/components/resume/pdf/FresherCompactProPDF";
import { FresherElegantSidebarPDF } from "@/components/resume/pdf/FresherElegantSidebarPDF";
import { FresherTechModernPDF } from "@/components/resume/pdf/FresherTechModernPDF";
import { FresherProfessionalMinimalPDF } from "@/components/resume/pdf/FresherProfessionalMinimalPDF";
// New Software Development PDF Templates
import { JavaDeveloperPDF } from "@/components/resume/pdf/JavaDeveloperPDF";
import { DotNetDeveloperPDF } from "@/components/resume/pdf/DotNetDeveloperPDF";
import { DevOpsEngineerPDF } from "@/components/resume/pdf/DevOpsEngineerPDF";
import { CloudArchitectPDF } from "@/components/resume/pdf/CloudArchitectPDF";
import { MobileDeveloperPDF } from "@/components/resume/pdf/MobileDeveloperPDF";
import { ReactNativeDeveloperPDF } from "@/components/resume/pdf/ReactNativeDeveloperPDF";
import { DataEngineerPDF } from "@/components/resume/pdf/DataEngineerPDF";
import { MachineLearningEngineerPDF } from "@/components/resume/pdf/MachineLearningEngineerPDF";
import { QAAutomationEngineerPDF } from "@/components/resume/pdf/QAAutomationEngineerPDF";
import { SecurityEngineerPDF } from "@/components/resume/pdf/SecurityEngineerPDF";
import { PythonDeveloperPDF } from "@/components/resume/pdf/PythonDeveloperPDF";
import { NodeJSDeveloperPDF } from "@/components/resume/pdf/NodeJSDeveloperPDF";
import { ReactDeveloperPDF } from "@/components/resume/pdf/ReactDeveloperPDF";
import { GoDeveloperPDF } from "@/components/resume/pdf/GoDeveloperPDF";
import { KubernetesEngineerPDF } from "@/components/resume/pdf/KubernetesEngineerPDF";
// Senior/Lead Software Engineering PDF Templates
import { SeniorJavaDeveloperPDF } from "@/components/resume/pdf/SeniorJavaDeveloperPDF";
import { SeniorDotNetDeveloperPDF } from "@/components/resume/pdf/SeniorDotNetDeveloperPDF";
import { SeniorDevOpsEngineerPDF } from "@/components/resume/pdf/SeniorDevOpsEngineerPDF";
import { LeadBackendEngineerPDF } from "@/components/resume/pdf/LeadBackendEngineerPDF";
import { LeadFrontendEngineerPDF } from "@/components/resume/pdf/LeadFrontendEngineerPDF";
import { SeniorFullStackDeveloperPDF } from "@/components/resume/pdf/SeniorFullStackDeveloperPDF";
import { PrincipalSoftwareEngineerPDF } from "@/components/resume/pdf/PrincipalSoftwareEngineerPDF";
import { StaffEngineerPDF } from "@/components/resume/pdf/StaffEngineerPDF";
import { EngineeringManagerPDF } from "@/components/resume/pdf/EngineeringManagerPDF";
import { SolutionsArchitectPDF } from "@/components/resume/pdf/SolutionsArchitectPDF";
import { SeniorMobileEngineerPDF } from "@/components/resume/pdf/SeniorMobileEngineerPDF";
import { PlatformEngineerPDF } from "@/components/resume/pdf/PlatformEngineerPDF";
import { SiteReliabilityEngineerPDF } from "@/components/resume/pdf/SiteReliabilityEngineerPDF";
import { BackendAPISpecialistPDF } from "@/components/resume/pdf/BackendAPISpecialistPDF";
import { FrontendArchitectPDF } from "@/components/resume/pdf/FrontendArchitectPDF";
// New Universal Professional Templates
import { ExecutiveModernPDF } from "@/components/resume/pdf/ExecutiveModernPDF";
import { CorporateBluePDF } from "@/components/resume/pdf/CorporateBluePDF";
import { ProfessionalSidebarPDF } from "@/components/resume/pdf/ProfessionalSidebarPDF";
import { MinimalistProPDF } from "@/components/resume/pdf/MinimalistProPDF";
import { ClassicElegantPDF } from "@/components/resume/pdf/ClassicElegantPDF";
import { BusinessModernPDF } from "@/components/resume/pdf/BusinessModernPDF";
import { ProfessionalTimelinePDF } from "@/components/resume/pdf/ProfessionalTimelinePDF";
import { CleanCorporatePDF } from "@/components/resume/pdf/CleanCorporatePDF";
import { ModernProfessionalPDF } from "@/components/resume/pdf/ModernProfessionalPDF";
import { ElegantProfessionalPDF } from "@/components/resume/pdf/ElegantProfessionalPDF";
import { ProfessionalGridPDF } from "@/components/resume/pdf/ProfessionalGridPDF";
import { BusinessElitePDF } from "@/components/resume/pdf/BusinessElitePDF";
import { CorporateCleanPDF } from "@/components/resume/pdf/CorporateCleanPDF";
import { ProfessionalClassicPDF } from "@/components/resume/pdf/ProfessionalClassicPDF";
import { ModernBusinessPDF } from "@/components/resume/pdf/ModernBusinessPDF";
import { registerPDFFonts } from "@/lib/pdfFonts";
import { getTemplateDefaults, type ResumeData } from "@/pages/Editor";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { ATSScoreButton } from "@/components/ATSScoreButton";
import type { AtsReport } from "@/lib/atsAnalyzer";
import { ProfessionalTemplate } from "@/components/resume/templates/ProfessionalTemplate";
import { ModernTemplate } from "@/components/resume/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/resume/templates/MinimalTemplate";
import { ExecutiveTemplate } from "@/components/resume/templates/ExecutiveTemplate";
import { FrontendTemplate } from "@/components/resume/templates/FrontendTemplate";
import { FullstackTemplate } from "@/components/resume/templates/FullstackTemplate";
import { BackendTemplate } from "@/components/resume/templates/BackendTemplate";
import { GraduateTemplate } from "@/components/resume/templates/GraduateTemplate";
import { StarterTemplate } from "@/components/resume/templates/StarterTemplate";
import { FresherTemplate } from "@/components/resume/templates/FresherTemplate";
import { PremiumFresherTemplate } from "@/components/resume/templates/PremiumFresherTemplate";
import { SeniorTemplate } from "@/components/resume/templates/SeniorTemplate";
import { SeniorFrontendTemplate } from "@/components/resume/templates/SeniorFrontendTemplate";
import { SoftwareTemplate } from "@/components/resume/templates/SoftwareTemplate";
import { PremiumUniversalTemplate } from "@/components/resume/templates/PremiumUniversalTemplate";
import { PremiumProTemplate } from "@/components/resume/templates/PremiumProTemplate";
import { FresherEliteTemplate } from "@/components/resume/templates/FresherEliteTemplate";
import { AnalystTemplate } from "@/components/resume/templates/AnalystTemplate";
import { EliteTemplate } from "@/components/resume/templates/EliteTemplate";
import { CorporateExecutiveTemplate } from "@/components/resume/templates/CorporateExecutiveTemplate";
import { RefinedTemplate } from "@/components/resume/templates/RefinedTemplate";
import { PremiumEliteTemplate } from "@/components/resume/templates/PremiumEliteTemplate";
import { SeniorBackendTemplate } from "@/components/resume/templates/SeniorBackendTemplate";
import { SapphireExecutiveTemplate } from "@/components/resume/templates/SapphireExecutiveTemplate";
import { CreativeAccentTemplate } from "@/components/resume/templates/CreativeAccentTemplate";
import { ModernSidebarTemplate } from "@/components/resume/templates/ModernSidebarTemplate";
import { MinimalistGeometricTemplate } from "@/components/resume/templates/MinimalistGeometricTemplate";
import { BoldHeadlineTemplate } from "@/components/resume/templates/BoldHeadlineTemplate";
import { DualToneTemplate } from "@/components/resume/templates/DualToneTemplate";
import { ElegantSerifTemplate } from "@/components/resume/templates/ElegantSerifTemplate";
import { TechGridTemplate } from "@/components/resume/templates/TechGridTemplate";
import { ContemporarySplitTemplate } from "@/components/resume/templates/ContemporarySplitTemplate";
import { LuxuryTimelineTemplate } from "@/components/resume/templates/LuxuryTimelineTemplate";
import { FresherMinimalGridTemplate } from "@/components/resume/templates/FresherMinimalGridTemplate";
import { FresherDarkProfessionalTemplate } from "@/components/resume/templates/FresherDarkProfessionalTemplate";
import { FresherColorAccentTemplate } from "@/components/resume/templates/FresherColorAccentTemplate";
import { FresherTimelineTemplate } from "@/components/resume/templates/FresherTimelineTemplate";
import { FresherSkillsFirstTemplate } from "@/components/resume/templates/FresherSkillsFirstTemplate";
import { FresherCardBasedTemplate } from "@/components/resume/templates/FresherCardBasedTemplate";
import { FresherTwoToneTemplate } from "@/components/resume/templates/FresherTwoToneTemplate";
import { FresherCenteredElegantTemplate } from "@/components/resume/templates/FresherCenteredElegantTemplate";
import { FresherGeometricTemplate } from "@/components/resume/templates/FresherGeometricTemplate";
import { FresherAchievementTemplate } from "@/components/resume/templates/FresherAchievementTemplate";
// New Fresher Templates
import { FresherModernTwoColumnTemplate } from "@/components/resume/templates/FresherModernTwoColumnTemplate";
import { FresherProfessionalSidebarTemplate } from "@/components/resume/templates/FresherProfessionalSidebarTemplate";
import { FresherCleanModernTemplate } from "@/components/resume/templates/FresherCleanModernTemplate";
import { FresherTechSplitTemplate } from "@/components/resume/templates/FresherTechSplitTemplate";
import { FresherExecutiveStyleTemplate } from "@/components/resume/templates/FresherExecutiveStyleTemplate";
import { FresherBoldHeaderTemplate } from "@/components/resume/templates/FresherBoldHeaderTemplate";
import { FresherMinimalistTwoColumnTemplate } from "@/components/resume/templates/FresherMinimalistTwoColumnTemplate";
import { FresherCreativeEdgeTemplate } from "@/components/resume/templates/FresherCreativeEdgeTemplate";
import { FresherProfessionalGridTemplate } from "@/components/resume/templates/FresherProfessionalGridTemplate";
import { FresherModernClassicTemplate } from "@/components/resume/templates/FresherModernClassicTemplate";
import { FresherSplitLayoutTemplate } from "@/components/resume/templates/FresherSplitLayoutTemplate";
import { FresherCompactProTemplate } from "@/components/resume/templates/FresherCompactProTemplate";
import { FresherElegantSidebarTemplate } from "@/components/resume/templates/FresherElegantSidebarTemplate";
import { FresherTechModernTemplate } from "@/components/resume/templates/FresherTechModernTemplate";
import { FresherProfessionalMinimalTemplate } from "@/components/resume/templates/FresherProfessionalMinimalTemplate";
// Healthcare & Medical Templates
import { MedicalProfessionalTemplate } from "@/components/resume/templates/MedicalProfessionalTemplate";
import { HealthcareTwoColumnTemplate } from "@/components/resume/templates/HealthcareTwoColumnTemplate";
import { NurseSpecialistTemplate } from "@/components/resume/templates/NurseSpecialistTemplate";
import { MedicalExecutiveTemplate } from "@/components/resume/templates/MedicalExecutiveTemplate";
import { ClinicalMinimalTemplate } from "@/components/resume/templates/ClinicalMinimalTemplate";
// Education & Teaching Templates
import { TeacherProfessionalTemplate } from "@/components/resume/templates/TeacherProfessionalTemplate";
import { AcademicScholarTemplate } from "@/components/resume/templates/AcademicScholarTemplate";
import { EducatorModernTemplate } from "@/components/resume/templates/EducatorModernTemplate";
import { TeachingCertifiedTemplate } from "@/components/resume/templates/TeachingCertifiedTemplate";
import { StudentEducatorTemplate } from "@/components/resume/templates/StudentEducatorTemplate";
// Finance & Accounting Templates
import { CPAProfessionalTemplate } from "@/components/resume/templates/CPAProfessionalTemplate";
import { FinanceAnalystTemplate } from "@/components/resume/templates/FinanceAnalystTemplate";
import { AccountingExecutiveTemplate } from "@/components/resume/templates/AccountingExecutiveTemplate";
import { AuditorTemplate } from "@/components/resume/templates/AuditorTemplate";
import { FinanceTwoColumnTemplate } from "@/components/resume/templates/FinanceTwoColumnTemplate";
// Sales & Marketing Templates
import { SalesExecutiveTemplate } from "@/components/resume/templates/SalesExecutiveTemplate";
import { MarketingProfessionalTemplate } from "@/components/resume/templates/MarketingProfessionalTemplate";
import { SalesMarketingHybridTemplate } from "@/components/resume/templates/SalesMarketingHybridTemplate";
import { DigitalMarketerTemplate } from "@/components/resume/templates/DigitalMarketerTemplate";
import { SalesManagerTemplate } from "@/components/resume/templates/SalesManagerTemplate";
// Legal & Consulting Templates
import { AttorneyProfessionalTemplate } from "@/components/resume/templates/AttorneyProfessionalTemplate";
import { LegalCounselTemplate } from "@/components/resume/templates/LegalCounselTemplate";
import { ConsultantTemplate } from "@/components/resume/templates/ConsultantTemplate";
import { LegalExecutiveTemplate } from "@/components/resume/templates/LegalExecutiveTemplate";
import { ParalegalTemplate } from "@/components/resume/templates/ParalegalTemplate";
// Operations & Project Management Templates
import { ProjectManagerPMPTemplate } from "@/components/resume/templates/ProjectManagerPMPTemplate";
import { OperationsManagerTemplate } from "@/components/resume/templates/OperationsManagerTemplate";
import { PMExecutiveTemplate } from "@/components/resume/templates/PMExecutiveTemplate";
import { AgileScrumTemplate } from "@/components/resume/templates/AgileScrumTemplate";
import { OperationsTwoColumnTemplate } from "@/components/resume/templates/OperationsTwoColumnTemplate";
// New Software Development Templates
import { JavaDeveloperTemplate } from "@/components/resume/templates/JavaDeveloperTemplate";
import { DotNetDeveloperTemplate } from "@/components/resume/templates/DotNetDeveloperTemplate";
import { DevOpsEngineerTemplate } from "@/components/resume/templates/DevOpsEngineerTemplate";
import { CloudArchitectTemplate } from "@/components/resume/templates/CloudArchitectTemplate";
import { MobileDeveloperTemplate } from "@/components/resume/templates/MobileDeveloperTemplate";
import { ReactNativeDeveloperTemplate } from "@/components/resume/templates/ReactNativeDeveloperTemplate";
import { DataEngineerTemplate } from "@/components/resume/templates/DataEngineerTemplate";
import { MachineLearningEngineerTemplate } from "@/components/resume/templates/MachineLearningEngineerTemplate";
import { QAAutomationEngineerTemplate } from "@/components/resume/templates/QAAutomationEngineerTemplate";
import { SecurityEngineerTemplate } from "@/components/resume/templates/SecurityEngineerTemplate";
import { PythonDeveloperTemplate } from "@/components/resume/templates/PythonDeveloperTemplate";
import { NodeJSDeveloperTemplate } from "@/components/resume/templates/NodeJSDeveloperTemplate";
import { ReactDeveloperTemplate } from "@/components/resume/templates/ReactDeveloperTemplate";
import { GoDeveloperTemplate } from "@/components/resume/templates/GoDeveloperTemplate";
import { KuberneteEngineerTemplate } from "@/components/resume/templates/KuberneteEngineerTemplate";
// Senior/Lead Software Engineering Templates
import { SeniorJavaDeveloperTemplate } from "@/components/resume/templates/SeniorJavaDeveloperTemplate";
import { SeniorDotNetDeveloperTemplate } from "@/components/resume/templates/SeniorDotNetDeveloperTemplate";
import { SeniorDevOpsEngineerTemplate } from "@/components/resume/templates/SeniorDevOpsEngineerTemplate";
import { LeadBackendEngineerTemplate } from "@/components/resume/templates/LeadBackendEngineerTemplate";
import { LeadFrontendEngineerTemplate } from "@/components/resume/templates/LeadFrontendEngineerTemplate";
import { SeniorFullStackDeveloperTemplate } from "@/components/resume/templates/SeniorFullStackDeveloperTemplate";
import { PrincipalSoftwareEngineerTemplate } from "@/components/resume/templates/PrincipalSoftwareEngineerTemplate";
import { StaffEngineerTemplate } from "@/components/resume/templates/StaffEngineerTemplate";
import { EngineeringManagerTemplate } from "@/components/resume/templates/EngineeringManagerTemplate";
import { SolutionsArchitectTemplate } from "@/components/resume/templates/SolutionsArchitectTemplate";
import { SeniorMobileEngineerTemplate } from "@/components/resume/templates/SeniorMobileEngineerTemplate";
import { PlatformEngineerTemplate } from "@/components/resume/templates/PlatformEngineerTemplate";
import { SiteReliabilityEngineerTemplate } from "@/components/resume/templates/SiteReliabilityEngineerTemplate";
import { BackendAPISpecialistTemplate } from "@/components/resume/templates/BackendAPISpecialistTemplate";
import { FrontendArchitectTemplate } from "@/components/resume/templates/FrontendArchitectTemplate";
// New Universal Professional Templates
import { ExecutiveModernTemplate } from "@/components/resume/templates/ExecutiveModernTemplate";
import { CorporateBlueTemplate } from "@/components/resume/templates/CorporateBlueTemplate";
import { ProfessionalSidebarTemplate } from "@/components/resume/templates/ProfessionalSidebarTemplate";
import { MinimalistProTemplate } from "@/components/resume/templates/MinimalistProTemplate";
import { ClassicElegantTemplate } from "@/components/resume/templates/ClassicElegantTemplate";
import { BusinessModernTemplate } from "@/components/resume/templates/BusinessModernTemplate";
import { ProfessionalTimelineTemplate } from "@/components/resume/templates/ProfessionalTimelineTemplate";
import { CleanCorporateTemplate } from "@/components/resume/templates/CleanCorporateTemplate";
import { ModernProfessionalTemplate } from "@/components/resume/templates/ModernProfessionalTemplate";
import { ElegantProfessionalTemplate } from "@/components/resume/templates/ElegantProfessionalTemplate";
import { ProfessionalGridTemplate } from "@/components/resume/templates/ProfessionalGridTemplate";
import { BusinessEliteTemplate } from "@/components/resume/templates/BusinessEliteTemplate";
import { CorporateCleanTemplate } from "@/components/resume/templates/CorporateCleanTemplate";
import { ProfessionalClassicTemplate } from "@/components/resume/templates/ProfessionalClassicTemplate";
import { ModernBusinessTemplate } from "@/components/resume/templates/ModernBusinessTemplate";

const pdfTemplates: Record<string, any> = {
  professional: ProfessionalPDF,
  modern: ModernPDF,
  minimal: MinimalPDF,
  executive: ExecutiveTemplate,
  frontend: FrontendPDF,
  fullstack: FullstackPDF,
  backend: BackendPDF,
  graduate: GraduatePDF,
  starter: StarterPDF,
  fresher: FresherPDF,
  "premium-fresher": PremiumFresherPDF,
  senior: SeniorPDF,
  "senior-frontend": SeniorFrontendPDF,
  "senior-backend": SeniorBackendPDF,
  software: SoftwarePDF,
  "premium-universal": PremiumUniversalPDF,
  "premium-pro": PremiumProPDF,
  "fresher-elite": FresherElitePDF,
  analyst: AnalystPDF,
  elite: ElitePDF,
  "corporate-executive": CorporateExecutivePDF,
  refined: RefinedPDF,
  "premium-elite": PremiumElitePDF,
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
  "fresher-minimal-grid": FresherMinimalGridPDF,
  "fresher-dark-professional": FresherDarkProfessionalPDF,
  "fresher-color-accent": FresherColorAccentPDF,
  "fresher-timeline": FresherTimelinePDF,
  "fresher-skills-first": FresherSkillsFirstPDF,
  "fresher-card-based": FresherCardBasedPDF,
  "fresher-two-tone": FresherTwoTonePDF,
  "fresher-centered-elegant": FresherCenteredElegantPDF,
  "fresher-geometric": FresherGeometricPDF,
  "fresher-achievement": FresherAchievementPDF,
  // New Fresher Templates
  "fresher-modern-two-column": FresherModernTwoColumnPDF,
  "fresher-professional-sidebar": FresherProfessionalSidebarPDF,
  "fresher-clean-modern": FresherCleanModernPDF,
  "fresher-tech-split": FresherTechSplitPDF,
  "fresher-executive-style": FresherExecutiveStylePDF,
  "fresher-bold-header": FresherBoldHeaderPDF,
  "fresher-minimalist-two-column": FresherMinimalistTwoColumnPDF,
  "fresher-creative-edge": FresherCreativeEdgePDF,
  "fresher-professional-grid": FresherProfessionalGridPDF,
  "fresher-modern-classic": FresherModernClassicPDF,
  "fresher-split-layout": FresherSplitLayoutPDF,
  "fresher-compact-pro": FresherCompactProPDF,
  "fresher-elegant-sidebar": FresherElegantSidebarPDF,
  "fresher-tech-modern": FresherTechModernPDF,
  "fresher-professional-minimal": FresherProfessionalMinimalPDF,
  // New Software Development Templates
  "java-developer": JavaDeveloperPDF,
  "dotnet-developer": DotNetDeveloperPDF,
  "devops-engineer": DevOpsEngineerPDF,
  "cloud-architect": CloudArchitectPDF,
  "mobile-developer": MobileDeveloperPDF,
  "react-native-developer": ReactNativeDeveloperPDF,
  "data-engineer": DataEngineerPDF,
  "machine-learning-engineer": MachineLearningEngineerPDF,
  "qa-automation-engineer": QAAutomationEngineerPDF,
  "security-engineer": SecurityEngineerPDF,
  "python-developer": PythonDeveloperPDF,
  "nodejs-developer": NodeJSDeveloperPDF,
  "react-developer": ReactDeveloperPDF,
  "go-developer": GoDeveloperPDF,
  "kubernetes-engineer": KubernetesEngineerPDF,
  // Senior/Lead Software Engineering Templates
  "senior-java-developer": SeniorJavaDeveloperPDF,
  "senior-dotnet-developer": SeniorDotNetDeveloperPDF,
  "senior-devops-engineer": SeniorDevOpsEngineerPDF,
  "lead-backend-engineer": LeadBackendEngineerPDF,
  "lead-frontend-engineer": LeadFrontendEngineerPDF,
  "senior-fullstack-developer": SeniorFullStackDeveloperPDF,
  "principal-software-engineer": PrincipalSoftwareEngineerPDF,
  "staff-engineer": StaffEngineerPDF,
  "engineering-manager": EngineeringManagerPDF,
  "solutions-architect": SolutionsArchitectPDF,
  "senior-mobile-engineer": SeniorMobileEngineerPDF,
  "platform-engineer": PlatformEngineerPDF,
  "site-reliability-engineer": SiteReliabilityEngineerPDF,
  "backend-api-specialist": BackendAPISpecialistPDF,
  "frontend-architect": FrontendArchitectPDF,
  // New Universal Professional Templates
  "executive-modern": ExecutiveModernPDF,
  "corporate-blue": CorporateBluePDF,
  "professional-sidebar": ProfessionalSidebarPDF,
  "minimalist-pro": MinimalistProPDF,
  "classic-elegant": ClassicElegantPDF,
  "business-modern": BusinessModernPDF,
  "professional-timeline": ProfessionalTimelinePDF,
  "clean-corporate": CleanCorporatePDF,
  "modern-professional": ModernProfessionalPDF,
  "elegant-professional": ElegantProfessionalPDF,
  "professional-grid": ProfessionalGridPDF,
  "business-elite": BusinessElitePDF,
  "corporate-clean": CorporateCleanPDF,
  "professional-classic": ProfessionalClassicPDF,
  "modern-business": ModernBusinessPDF,
};

// Templates that support inline editing
const inlineEditableTemplates = [
  "professional", "modern", "senior",
  "minimal", "executive", "frontend", "fullstack",
  "backend", "graduate", "starter", "fresher", "premium-fresher",
  "senior-frontend", "senior-backend", "software", "premium-universal",
  "premium-pro", "fresher-elite", "analyst", "elite", "corporate-executive",
  "refined", "premium-elite", "sapphire-executive", "creative-accent",
  "modern-sidebar", "minimalist-geometric", "bold-headline", "dual-tone",
  "elegant-serif", "tech-grid", "contemporary-split", "luxury-timeline",
  "fresher-minimal-grid", "fresher-dark-professional", "fresher-color-accent",
  "fresher-timeline", "fresher-skills-first", "fresher-card-based",
  "fresher-two-tone", "fresher-centered-elegant", "fresher-geometric",
  "fresher-achievement",
  // New Fresher Templates
  "fresher-modern-two-column", "fresher-professional-sidebar", "fresher-clean-modern",
  "fresher-tech-split", "fresher-executive-style", "fresher-bold-header",
  "fresher-minimalist-two-column", "fresher-creative-edge", "fresher-professional-grid",
  "fresher-modern-classic", "fresher-split-layout", "fresher-compact-pro",
  "fresher-elegant-sidebar", "fresher-tech-modern", "fresher-professional-minimal",
  // Healthcare & Medical
  "medical-professional", "healthcare-two-column", "nurse-specialist",
  "medical-executive", "clinical-minimal",
  // Education & Teaching
  "teacher-professional", "academic-scholar", "educator-modern",
  "teaching-certified", "student-educator",
  // Finance & Accounting
  "cpa-professional", "finance-analyst", "accounting-executive",
  "auditor", "finance-two-column",
  // Sales & Marketing
  "sales-executive", "marketing-professional", "sales-marketing-hybrid",
  "digital-marketer", "sales-manager",
  // Legal & Consulting
  "attorney-professional", "legal-counsel", "consultant",
  "legal-executive", "paralegal",
  // Operations & Project Management
  "project-manager-pmp", "operations-manager", "pm-executive",
  "agile-scrum", "operations-two-column",
  // New Software Development Templates
  "java-developer", "dotnet-developer", "devops-engineer",
  "cloud-architect", "mobile-developer", "react-native-developer",
  "data-engineer", "machine-learning-engineer", "qa-automation-engineer",
  "security-engineer", "python-developer", "nodejs-developer",
  "react-developer", "go-developer", "kubernetes-engineer",
  // Senior/Lead Software Engineering Templates
  "senior-java-developer", "senior-dotnet-developer", "senior-devops-engineer",
  "lead-backend-engineer", "lead-frontend-engineer", "senior-fullstack-developer",
  "principal-software-engineer", "staff-engineer", "engineering-manager",
  "solutions-architect", "senior-mobile-engineer", "platform-engineer",
  "site-reliability-engineer", "backend-api-specialist", "frontend-architect",
  // New Universal Professional Templates
  "executive-modern", "corporate-blue", "professional-sidebar",
  "minimalist-pro", "classic-elegant", "business-modern",
  "professional-timeline", "clean-corporate", "modern-professional",
  "elegant-professional", "professional-grid", "business-elite",
  "corporate-clean", "professional-classic", "modern-business"
];

const displayTemplates: Record<string, any> = {
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
  // New Fresher Templates
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
};

const LiveEditor = () => {
  const { templateId, professionId } = useParams<{ templateId: string; professionId?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const { user } = useFirebaseAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    getTemplateDefaults(templateId || "professional")
  );

  // Determine back navigation path based on whether we're in a nested route
  const backPath = professionId ? `/dashboard/${professionId}` : "/dashboard";
  const [themeColor, setThemeColor] = useState("#7c3aed");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [editorMode, setEditorMode] = useState<"live" | "form">("live");
  const [isSaving, setIsSaving] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);

  useEffect(() => {
    setResumeData(getTemplateDefaults(templateId || "professional"));
  }, [templateId]);

  // Load resume from Firestore if resumeId exists
  useEffect(() => {
    const loadResumeFromFirestore = async () => {
      if (!resumeId || !user) return;

      try {
        const resume = await resumeService.getResume(resumeId);
        if (resume && resume.data) {
          // The new service returns data in the same format as Editor's ResumeData
          setResumeData(resume.data as ResumeData);
          // Also update theme color if it exists
          if (resume.themeColor) {
            setThemeColor(resume.themeColor);
          }
        }
      } catch (error) {
        console.error("Error loading resume from Firestore:", error);
        toast.error("Failed to load resume");
      }
    };

    loadResumeFromFirestore();
  }, [resumeId, user]);

  const handleSave = useCallback(async () => {
    if (!user) {
      toast.error("Please sign in to save your resume");
      return;
    }

    if (!templateId) {
      toast.error("Template ID is missing");
      return;
    }

    setIsSaving(true);
    try {
      // Convert Editor resume data to new service format (same structure!)
      const resumeDataToSave: NewResumeData = {
        personalInfo: resumeData.personalInfo,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        sections: resumeData.sections,
      };

      if (currentResumeId) {
        // Update existing resume
        await resumeService.updateResumeData(currentResumeId, resumeDataToSave);
        toast.success("Resume updated successfully!");
      } else {
        // Create new resume
        const newResumeId = await resumeService.createResume(
          templateId,
          resumeDataToSave,
          {
            title: `Resume - ${resumeData.personalInfo.fullName || new Date().toLocaleDateString()}`,
            themeColor: themeColor,
          }
        );
        setCurrentResumeId(newResumeId);
        toast.success("Resume saved successfully!");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [user, templateId, resumeData, currentResumeId, themeColor]);

  const handleDownloadPDF = useCallback(async () => {
    if (!templateId) return;

    try {
      setIsGeneratingPDF(true);
      toast.info("Generating PDF...");

      await registerPDFFonts();

      const PDFComponent = pdfTemplates[templateId];
      if (!PDFComponent) {
        throw new Error("Template not found");
      }

      const blob = await pdf(
        <PDFComponent resumeData={resumeData} themeColor={themeColor} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [templateId, resumeData, themeColor]);

  const handleATSScoreCalculated = useCallback(async (score: number, report: AtsReport) => {
    if (currentResumeId) {
      try {
        await resumeService.updateAtsScore(currentResumeId, score, report);
        toast.success(`ATS Score saved: ${score.toFixed(1)}/10`);
      } catch (error) {
        console.error("Failed to save ATS score:", error);
        // Don't show error toast, score is still displayed
      }
    }
  }, [currentResumeId]);

  const handleSwitchToFormEditor = () => {
    navigate(professionId ? `/dashboard/${professionId}/editor/${templateId}` : `/editor/${templateId}`);
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-background via-muted/5 to-background">
      <Header />

      <div className="border-b bg-card/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 md:hidden">
            <Breadcrumbs />
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwitchToFormEditor}
              >
                <FileEdit className="h-4 w-4 mr-2" />
                Form
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-muted/30 border">
                  <label htmlFor="themeColor" className="text-xs font-medium">
                    Theme:
                  </label>
                  <input
                    id="themeColor"
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="h-7 w-10 cursor-pointer rounded border border-border"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !user}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {!isSaving && "Save"}
                </Button>
                <FavoriteButton
                  templateId={templateId}
                  variant="button"
                  size="sm"
                />
                <ATSScoreButton
                  resumeData={resumeData}
                  templateId={templateId}
                  onScoreCalculated={handleATSScoreCalculated}
                  variant="outline"
                  size="sm"
                />
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {!isGeneratingPDF && "PDF"}
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Layout - 3 Column Grid */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
            {/* Left Section - Breadcrumbs */}
            <div className="flex items-center">
              <Breadcrumbs />
            </div>

            {/* Center Section - Tabs */}
            <div className="flex justify-center">
              <Tabs value={editorMode} onValueChange={(v) => v === "form" && handleSwitchToFormEditor()}>
                <TabsList className="bg-muted/50 border">
                  <TabsTrigger value="live" className="gap-2 text-sm">
                    <Edit3 className="h-4 w-4" />
                    Live Editor
                  </TabsTrigger>
                  <TabsTrigger value="form" className="gap-2 text-sm">
                    <FileEdit className="h-4 w-4" />
                    Form Editor
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Right Section - Controls */}
            <div className="flex items-center justify-end gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border">
                <label htmlFor="themeColor" className="text-sm font-medium whitespace-nowrap">
                  Theme:
                </label>
                <input
                  id="themeColor"
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="h-7 w-10 cursor-pointer rounded border border-border"
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving || !user}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </Button>

              <FavoriteButton
                templateId={templateId}
                variant="button"
                size="sm"
                showLabel
              />

              <ATSScoreButton
                resumeData={resumeData}
                templateId={templateId}
                onScoreCalculated={handleATSScoreCalculated}
                variant="outline"
                size="sm"
              />

              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                size="sm"
                className="gap-2"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto md:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="bg-white shadow-none md:shadow-2xl rounded-none md:rounded-lg overflow-hidden">
            {(() => {
              const currentTemplateId = templateId || "professional";
              const TemplateComponent = displayTemplates[currentTemplateId];
              const supportsInlineEdit = inlineEditableTemplates.includes(currentTemplateId);

              if (!TemplateComponent) {
                return <ProfessionalTemplate resumeData={resumeData} themeColor={themeColor} />;
              }

              // Wrap with InlineEditProvider only for templates that support it
              if (supportsInlineEdit) {
                return (
                  <InlineEditProvider resumeData={resumeData} setResumeData={setResumeData}>
                    <TemplateComponent resumeData={resumeData} themeColor={themeColor} editable={true} />
                  </InlineEditProvider>
                );
              }

              // For templates without inline editing, show message
              return (
                <div className="p-4 md:p-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4 mb-4">
                    <p className="text-xs md:text-sm text-yellow-800">
                      Direct inline editing is not yet available for this template. Use the Form Editor tab to edit this template, or try the Modern or Senior templates which support inline editing.
                    </p>
                  </div>
                  <TemplateComponent resumeData={resumeData} themeColor={themeColor} />
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveEditor;
