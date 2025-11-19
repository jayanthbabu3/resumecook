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
import { AcademicEducatorTemplate } from "./templates/AcademicEducatorTemplate";
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
// 2025 New Fresher Templates
import { FresherNeonAccentTemplate } from "./templates/FresherNeonAccentTemplate";
import { FresherGlassmorphismTemplate } from "./templates/FresherGlassmorphismTemplate";
import { FresherProgressiveTemplate } from "./templates/FresherProgressiveTemplate";
import { FresherPolaroidStyleTemplate } from "./templates/FresherPolaroidStyleTemplate";
import { FresherRibbonStyleTemplate } from "./templates/FresherRibbonStyleTemplate";
import { FresherDoubleColumnTemplate } from "./templates/FresherDoubleColumnTemplate";
import { FresherGradientBorderTemplate } from "./templates/FresherGradientBorderTemplate";
import { FresherCircularProgressTemplate } from "./templates/FresherCircularProgressTemplate";
import { FresherModernTabsTemplate } from "./templates/FresherModernTabsTemplate";
import { FresherLightweightTemplate } from "./templates/FresherLightweightTemplate";
import { FresherTimelineDotsTemplate } from "./templates/FresherTimelineDotsTemplate";
import { FresherBoxShadowTemplate } from "./templates/FresherBoxShadowTemplate";
import { FresherStepByStepTemplate } from "./templates/FresherStepByStepTemplate";
import { FresherLeftStripeTemplate } from "./templates/FresherLeftStripeTemplate";
import { FresherTopBottomTemplate } from "./templates/FresherTopBottomTemplate";
import { FresherDashBorderTemplate } from "./templates/FresherDashBorderTemplate";
import { FresherIconographyTemplate } from "./templates/FresherIconographyTemplate";
import { FresherModernSplitTemplate } from "./templates/FresherModernSplitTemplate";
import { FresherWaveHeaderTemplate } from "./templates/FresherWaveHeaderTemplate";
import { FresherAcademicStyleTemplate } from "./templates/FresherAcademicStyleTemplate";
// 2025 New Software/Tech Templates
import { DarkModeDevTemplate } from "./templates/DarkModeDevTemplate";
import { CodeSnippetTemplate } from "./templates/CodeSnippetTemplate";
import { APIDocTemplate } from "./templates/APIDocTemplate";
import { StackOverflowInspiredTemplate } from "./templates/StackOverflowInspiredTemplate";
import { GitHubProfileTemplate } from "./templates/GitHubProfileTemplate";
import { TerminalConsoleTemplate } from "./templates/TerminalConsoleTemplate";
import { JsonResumeTemplate } from "./templates/JsonResumeTemplate";
import { MonospaceTechTemplate } from "./templates/MonospaceTechTemplate";
import { BlueprintDesignTemplate } from "./templates/BlueprintDesignTemplate";
import { SystemArchitectTemplate } from "./templates/SystemArchitectTemplate";
import { CloudNativeTemplate } from "./templates/CloudNativeTemplate";
import { MicroservicesDevTemplate } from "./templates/MicroservicesDevTemplate";
import { TechLeadTemplate } from "./templates/TechLeadTemplate";
import { OpenSourceTemplate } from "./templates/OpenSourceTemplate";
import { FullStackProTemplate } from "./templates/FullStackProTemplate";
import { DataScienceTemplate } from "./templates/DataScienceTemplate";
import { CyberSecurityTemplate } from "./templates/CyberSecurityTemplate";
import { BlockchainDevTemplate } from "./templates/BlockchainDevTemplate";
import { AIEngineerTemplate } from "./templates/AIEngineerTemplate";
import { MobileDevTemplate } from "./templates/MobileDevTemplate";
// 2025 New Creative Templates
import { MagazineCreativeTemplate } from "./templates/MagazineCreativeTemplate";
import { PortfolioShowcaseTemplate } from "./templates/PortfolioShowcaseTemplate";
import { ArtisticGridTemplate } from "./templates/ArtisticGridTemplate";
import { BoldTypographyTemplate } from "./templates/BoldTypographyTemplate";
import { ColorSplashTemplate } from "./templates/ColorSplashTemplate";
import { MinimalChicTemplate } from "./templates/MinimalChicTemplate";
import { PhotographyLayoutTemplate } from "./templates/PhotographyLayoutTemplate";
import { BrandIdentityTemplate } from "./templates/BrandIdentityTemplate";
import { VintagePosterTemplate } from "./templates/VintagePosterTemplate";
import { ModernArtistTemplate } from "./templates/ModernArtistTemplate";
import { GalleryLayoutTemplate } from "./templates/GalleryLayoutTemplate";
import { EditorialStyleTemplate } from "./templates/EditorialStyleTemplate";
import { UrbanDesignerTemplate } from "./templates/UrbanDesignerTemplate";
import { PastelCreativeTemplate } from "./templates/PastelCreativeTemplate";
import { NeonArtistTemplate } from "./templates/NeonArtistTemplate";
import { GeometricCreativeTemplate } from "./templates/GeometricCreativeTemplate";
import { TypewriterStyleTemplate } from "./templates/TypewriterStyleTemplate";
import { InkBrushTemplate } from "./templates/InkBrushTemplate";
import { CollageArtTemplate } from "./templates/CollageArtTemplate";
import { DigitalCanvasTemplate } from "./templates/DigitalCanvasTemplate";
// Missing Software Engineering Templates
import { CodeMinimalTemplate } from "./templates/CodeMinimalTemplate";
import { TechStackProTemplate } from "./templates/TechStackProTemplate";
import { GitHubStyleTemplate } from "./templates/GitHubStyleTemplate";
import { DeveloperGridTemplate } from "./templates/DeveloperGridTemplate";
import { TerminalThemeTemplate } from "./templates/TerminalThemeTemplate";
import { AlgoEngineerTemplate } from "./templates/AlgoEngineerTemplate";
import { FullStackModernTemplate } from "./templates/FullStackModernTemplate";
import { DevOpsProTemplate } from "./templates/DevOpsProTemplate";
import { MLEngineerTemplate } from "./templates/MLEngineerTemplate";
// Missing Universal Professional Templates
import { TimelineEleganceTemplate } from "./templates/TimelineEleganceTemplate";
import { ExecutiveMinimalTemplate } from "./templates/ExecutiveMinimalTemplate";
import { SidebarAccentTemplate } from "./templates/SidebarAccentTemplate";
import { GeometricModernTemplate } from "./templates/GeometricModernTemplate";
import { TwoToneClassicTemplate } from "./templates/TwoToneClassicTemplate";
import { BorderedEleganceTemplate } from "./templates/BorderedEleganceTemplate";
import { ColumnDivideTemplate } from "./templates/ColumnDivideTemplate";
import { CompactProfessionalTemplate } from "./templates/CompactProfessionalTemplate";
// New Universal Profile Templates
import { SidebarProfessionalUniversalTemplate } from "./templates/SidebarProfessionalUniversalTemplate";
import { MetroModernUniversalTemplate } from "./templates/MetroModernUniversalTemplate";
import { SwissStyleUniversalTemplate } from "./templates/SwissStyleUniversalTemplate";
import { ExecutiveLetterheadUniversalTemplate } from "./templates/ExecutiveLetterheadUniversalTemplate";
import { DiagonalAccentUniversalTemplate } from "./templates/DiagonalAccentUniversalTemplate";
import { BorderFrameUniversalTemplate } from "./templates/BorderFrameUniversalTemplate";
import { CenteredMinimalUniversalTemplate } from "./templates/CenteredMinimalUniversalTemplate";
import { LeftAlignedProUniversalTemplate } from "./templates/LeftAlignedProUniversalTemplate";
import { DualColumnModernUniversalTemplate } from "./templates/DualColumnModernUniversalTemplate";
import { TimelineVerticalUniversalTemplate } from "./templates/TimelineVerticalUniversalTemplate";
import { BadgeStyleUniversalTemplate } from "./templates/BadgeStyleUniversalTemplate";
import { UnderlineAccentUniversalTemplate } from "./templates/UnderlineAccentUniversalTemplate";
import { CircleIconUniversalTemplate } from "./templates/CircleIconUniversalTemplate";
import { LinearProgressUniversalTemplate } from "./templates/LinearProgressUniversalTemplate";
import { CardLayoutUniversalTemplate } from "./templates/CardLayoutUniversalTemplate";
import { RibbonHeaderUniversalTemplate } from "./templates/RibbonHeaderUniversalTemplate";
import { BoxedSectionsUniversalTemplate } from "./templates/BoxedSectionsUniversalTemplate";
import { LeftBorderUniversalTemplate } from "./templates/LeftBorderUniversalTemplate";
import { FloatingHeaderUniversalTemplate } from "./templates/FloatingHeaderUniversalTemplate";
import { MonochromeElegantUniversalTemplate } from "./templates/MonochromeElegantUniversalTemplate";
// Second Batch Universal Profile Templates
import { GradientHeaderUniversalTemplate } from "./templates/GradientHeaderUniversalTemplate";
import { SplitPaneUniversalTemplate } from "./templates/SplitPaneUniversalTemplate";
import { IconBarUniversalTemplate } from "./templates/IconBarUniversalTemplate";
import { ModernMinimalistUniversalTemplate } from "./templates/ModernMinimalistUniversalTemplate";
import { BoldTypographyUniversalTemplate } from "./templates/BoldTypographyUniversalTemplate";
import { GeometricShapesUniversalTemplate } from "./templates/GeometricShapesUniversalTemplate";
import { ColorBlockUniversalTemplate } from "./templates/ColorBlockUniversalTemplate";
import { ThinBorderUniversalTemplate } from "./templates/ThinBorderUniversalTemplate";
import { AsymmetricLayoutUniversalTemplate } from "./templates/AsymmetricLayoutUniversalTemplate";
import { ClassicSerifUniversalTemplate } from "./templates/ClassicSerifUniversalTemplate";
import { ProfessionalCompactUniversalTemplate } from "./templates/ProfessionalCompactUniversalTemplate";
import { WideMarginUniversalTemplate } from "./templates/WideMarginUniversalTemplate";
import { TopBarUniversalTemplate } from "./templates/TopBarUniversalTemplate";
import { CornerAccentUniversalTemplate } from "./templates/CornerAccentUniversalTemplate";
import { StripedBackgroundUniversalTemplate } from "./templates/StripedBackgroundUniversalTemplate";
import { CircularElementsUniversalTemplate } from "./templates/CircularElementsUniversalTemplate";
import { MinimalLinesUniversalTemplate } from "./templates/MinimalLinesUniversalTemplate";
import { BoldSectionHeadersUniversalTemplate } from "./templates/BoldSectionHeadersUniversalTemplate";
import { TwoToneSplitUniversalTemplate } from "./templates/TwoToneSplitUniversalTemplate";
import { CleanModernUniversalTemplate } from "./templates/CleanModernUniversalTemplate";
// Third Batch Universal Profile Templates
import { WatermarkStyleUniversalTemplate } from "./templates/WatermarkStyleUniversalTemplate";
import { MagazineLayoutUniversalTemplate } from "./templates/MagazineLayoutUniversalTemplate";
import { HexagonalPatternUniversalTemplate } from "./templates/HexagonalPatternUniversalTemplate";
import { CompactEliteUniversalTemplate } from "./templates/CompactEliteUniversalTemplate";
import { DiamondAccentUniversalTemplate } from "./templates/DiamondAccentUniversalTemplate";
import { ZigzagBorderUniversalTemplate } from "./templates/ZigzagBorderUniversalTemplate";
import { StackedSectionsUniversalTemplate } from "./templates/StackedSectionsUniversalTemplate";
import { DottedGridUniversalTemplate } from "./templates/DottedGridUniversalTemplate";
import { WavePatternUniversalTemplate } from "./templates/WavePatternUniversalTemplate";
import { ChevronAccentUniversalTemplate } from "./templates/ChevronAccentUniversalTemplate";
import { SpotlightHeaderUniversalTemplate } from "./templates/SpotlightHeaderUniversalTemplate";
import { LayeredCardsUniversalTemplate } from "./templates/LayeredCardsUniversalTemplate";
import { AngularModernUniversalTemplate } from "./templates/AngularModernUniversalTemplate";
import { RoundedCornersUniversalTemplate } from "./templates/RoundedCornersUniversalTemplate";
import { RetroProfessionalUniversalTemplate } from "./templates/RetroProfessionalUniversalTemplate";
import { NewspaperStyleUniversalTemplate } from "./templates/NewspaperStyleUniversalTemplate";
import { TriangularElementsUniversalTemplate } from "./templates/TriangularElementsUniversalTemplate";
import { ParallaxStyleUniversalTemplate } from "./templates/ParallaxStyleUniversalTemplate";
import { VerticalTimelineUniversalTemplate } from "./templates/VerticalTimelineUniversalTemplate";
import { InfinityLoopUniversalTemplate } from "./templates/InfinityLoopUniversalTemplate";
// 2025 New Profession-Specific Templates - Healthcare
import { MedicalCertificationTemplate } from "./templates/MedicalCertificationTemplate";
import { ClinicalExcellenceTemplate } from "./templates/ClinicalExcellenceTemplate";
import { HealthcareProfessionalTemplate } from "./templates/HealthcareProfessionalTemplate";
import { NursingSpecialistTemplate } from "./templates/NursingSpecialistTemplate";
import { MedicalResearchTemplate } from "./templates/MedicalResearchTemplate";
// 2025 New Profession-Specific Templates - Education
import { TeachingExcellenceTemplate } from "./templates/TeachingExcellenceTemplate";
import { ModernEducatorProfessionTemplate } from "./templates/ModernEducatorProfessionTemplate";
import { CurriculumDeveloperTemplate } from "./templates/CurriculumDeveloperTemplate";
import { StudentEngagementTemplate } from "./templates/StudentEngagementTemplate";
// 2025 New Profession-Specific Templates - Finance
import { FinancialAnalystTemplate } from "./templates/FinancialAnalystTemplate";
import { AccountingProTemplate } from "./templates/AccountingProTemplate";
import { InvestmentBankerTemplate } from "./templates/InvestmentBankerTemplate";
import { TaxSpecialistTemplate } from "./templates/TaxSpecialistTemplate";
import { AuditExpertTemplate } from "./templates/AuditExpertTemplate";
// 2025 New Profession-Specific Templates - Sales & Marketing
import { SalesAchievementTemplate } from "./templates/SalesAchievementTemplate";
import { MarketingStrategistTemplate } from "./templates/MarketingStrategistTemplate";
import { DigitalMarketingProTemplate } from "./templates/DigitalMarketingProTemplate";
import { BrandManagerTemplate } from "./templates/BrandManagerTemplate";
import { ExecutiveSalesLeaderTemplate } from "./templates/ExecutiveSalesLeaderTemplate";
// 2025 New Profession-Specific Templates - Legal
import { CorporateLegalCounselTemplate } from "./templates/CorporateLegalCounselTemplate";
import { CorporateLawTemplate } from "./templates/CorporateLawTemplate";
import { LitigationAttorneyTemplate } from "./templates/LitigationAttorneyTemplate";
import { ComplianceOfficerTemplate } from "./templates/ComplianceOfficerTemplate";
import { LegalAdvisorTemplate } from "./templates/LegalAdvisorTemplate";
// 2025 New Profession-Specific Templates - Operations/PM
import { ProjectManagerProTemplate } from "./templates/ProjectManagerProTemplate";
import { OperationsExcellenceTemplate } from "./templates/OperationsExcellenceTemplate";
import { ProcessImprovementTemplate } from "./templates/ProcessImprovementTemplate";
import { SupplyChainManagerTemplate } from "./templates/SupplyChainManagerTemplate";
import { AgileProjectLeadTemplate } from "./templates/AgileProjectLeadTemplate";
// 2025 New Profession-Specific Templates - Business Leadership
import { ExecutiveLeadershipTemplate } from "./templates/ExecutiveLeadershipTemplate";
import { CEOProfileTemplate } from "./templates/CEOProfileTemplate";
import { StrategicLeaderTemplate } from "./templates/StrategicLeaderTemplate";
import { DirectorLevelTemplate } from "./templates/DirectorLevelTemplate";
import { VPExecutiveTemplate } from "./templates/VPExecutiveTemplate";
// 2025 New Universal Professional Templates (Batch 5)
import { ExecutiveCornerAccentTemplate } from "./templates/ExecutiveCornerAccentTemplate";
import { MinimalEleganceUniversalTemplate } from "./templates/MinimalEleganceUniversalTemplate";
import { ProfessionalDividerTemplate } from "./templates/ProfessionalDividerTemplate";
import { ModernCorporateGridTemplate } from "./templates/ModernCorporateGridTemplate";
import { BusinessSidebarProTemplate } from "./templates/BusinessSidebarProTemplate";
import { CleanTwoColumnUniversalTemplate } from "./templates/CleanTwoColumnUniversalTemplate";
import { ProfessionalHeaderBannerTemplate } from "./templates/ProfessionalHeaderBannerTemplate";
import { ExecutiveTimelineModernTemplate } from "./templates/ExecutiveTimelineModernTemplate";
import { CorporateBorderFrameTemplate } from "./templates/CorporateBorderFrameTemplate";
import { MinimalistModernProTemplate } from "./templates/MinimalistModernProTemplate";
import { ProfessionalAccentBarTemplate } from "./templates/ProfessionalAccentBarTemplate";
import { BusinessCleanLayoutTemplate } from "./templates/BusinessCleanLayoutTemplate";
import { ExecutiveSplitDesignTemplate } from "./templates/ExecutiveSplitDesignTemplate";
import { ModernProfessionalBoxTemplate } from "./templates/ModernProfessionalBoxTemplate";
import { CorporateMinimalistProTemplate } from "./templates/CorporateMinimalistProTemplate";
import { ProfessionalVerticalLineTemplate } from "./templates/ProfessionalVerticalLineTemplate";
import { BusinessModernGridTemplate } from "./templates/BusinessModernGridTemplate";
import { ExecutiveCleanSplitTemplate } from "./templates/ExecutiveCleanSplitTemplate";
import { MinimalCorporateProTemplate } from "./templates/MinimalCorporateProTemplate";
import { ProfessionalModernEdgeTemplate } from "./templates/ProfessionalModernEdgeTemplate";
// 2025 New Software/Tech Templates (Batch 3)
import { ReactFrontendProTemplate } from "./templates/ReactFrontendProTemplate";
import { NodeBackendSpecialistTemplate } from "./templates/NodeBackendSpecialistTemplate";
import { FullStackEngineerTemplate } from "./templates/FullStackEngineerTemplate";
import { PythonDeveloperProTemplate } from "./templates/PythonDeveloperProTemplate";
import { JavaEnterpriseTemplateTemplate } from "./templates/JavaEnterpriseTemplateTemplate";
import { DevOpsAutomationTemplate } from "./templates/DevOpsAutomationTemplate";
import { CloudSolutionsArchitectTemplate } from "./templates/CloudSolutionsArchitectTemplate";
import { MicroservicesExpertTemplate } from "./templates/MicroservicesExpertTemplate";
import { KubernetesSpecialistTemplate } from "./templates/KubernetesSpecialistTemplate";
import { DockerContainerProTemplate } from "./templates/DockerContainerProTemplate";
import { GraphQLDeveloperTemplate } from "./templates/GraphQLDeveloperTemplate";
import { TypeScriptExpertTemplate } from "./templates/TypeScriptExpertTemplate";
import { VueJSDeveloperTemplate } from "./templates/VueJSDeveloperTemplate";
import { AngularSpecialistTemplate } from "./templates/AngularSpecialistTemplate";
import { SpringBootDeveloperTemplate } from "./templates/SpringBootDeveloperTemplate";
import { DjangoFrameworkProTemplate } from "./templates/DjangoFrameworkProTemplate";
import { AWSCloudEngineerTemplate } from "./templates/AWSCloudEngineerTemplate";
import { AzureDevOpsSpecialistTemplate } from "./templates/AzureDevOpsSpecialistTemplate";
import { GCPArchitectTemplate } from "./templates/GCPArchitectTemplate";
import { ServerlessDeveloperTemplate } from "./templates/ServerlessDeveloperTemplate";
// 2025 New Software/Tech Templates (Batch 4)
import { RustDeveloperProTemplate } from "./templates/RustDeveloperProTemplate";
import { ScalaEngineerTemplate } from "./templates/ScalaEngineerTemplate";
import { ElixirDeveloperTemplate } from "./templates/ElixirDeveloperTemplate";
import { SwiftIOSDeveloperTemplate } from "./templates/SwiftIOSDeveloperTemplate";
import { KotlinAndroidDevTemplate } from "./templates/KotlinAndroidDevTemplate";
import { FlutterMobileDevTemplate } from "./templates/FlutterMobileDevTemplate";
import { ReactNativeExpertTemplate } from "./templates/ReactNativeExpertTemplate";
import { TensorFlowMLEngineerTemplate } from "./templates/TensorFlowMLEngineerTemplate";
import { PyTorchDeveloperTemplate } from "./templates/PyTorchDeveloperTemplate";
import { MongoDBSpecialistTemplate } from "./templates/MongoDBSpecialistTemplate";
import { PostgreSQLExpertTemplate } from "./templates/PostgreSQLExpertTemplate";
import { RedisCacheSpecialistTemplate } from "./templates/RedisCacheSpecialistTemplate";
import { ElasticsearchDevTemplate } from "./templates/ElasticsearchDevTemplate";
import { KafkaStreamingExpertTemplate } from "./templates/KafkaStreamingExpertTemplate";
import { CICDPipelineEngineerTemplate } from "./templates/CICDPipelineEngineerTemplate";
// 2025 New Creative/Design Templates (Batch 2)
import { PortfolioMinimalistTemplate } from "./templates/PortfolioMinimalistTemplate";
import { CreativeShowcaseGridTemplate } from "./templates/CreativeShowcaseGridTemplate";
import { ArtDirectorModernTemplate } from "./templates/ArtDirectorModernTemplate";
import { UIUXDesignerProTemplate } from "./templates/UIUXDesignerProTemplate";
import { GraphicDesignProTemplate } from "./templates/GraphicDesignProTemplate";
import { BrandDesignerTemplateTemplate } from "./templates/BrandDesignerTemplateTemplate";
import { MotionGraphicsArtistTemplate } from "./templates/MotionGraphicsArtistTemplate";
import { IllustrationPortfolioTemplate } from "./templates/IllustrationPortfolioTemplate";
import { PhotographyProTemplateTemplate } from "./templates/PhotographyProTemplateTemplate";
import { VideoEditorCreativeTemplate } from "./templates/VideoEditorCreativeTemplate";
import { ThreeDModelingArtistTemplate } from "./templates/ThreeDModelingArtistTemplate";
import { WebDesignerModernTemplate } from "./templates/WebDesignerModernTemplate";
import { ProductDesignerUXTemplate } from "./templates/ProductDesignerUXTemplate";
import { InteractionDesignerTemplate } from "./templates/InteractionDesignerTemplate";
import { VisualStorytellerTemplateTemplate } from "./templates/VisualStorytellerTemplateTemplate";
// 2025 Simple Universal Professional Templates (Batch 6)
import { CleanProfessionalSimpleTemplate } from "./templates/CleanProfessionalSimpleTemplate";
import { SimpleExecutiveLayoutTemplate } from "./templates/SimpleExecutiveLayoutTemplate";
import { MinimalProLayoutTemplate } from "./templates/MinimalProLayoutTemplate";
import { ProfessionalCleanSimpleTemplate } from "./templates/ProfessionalCleanSimpleTemplate";
import { CorporateSimpleTemplateTemplate } from "./templates/CorporateSimpleTemplateTemplate";
import { ModernSimpleProTemplate } from "./templates/ModernSimpleProTemplate";
import { ExecutiveSimpleCleanTemplate } from "./templates/ExecutiveSimpleCleanTemplate";
import { BusinessSimpleModernTemplate } from "./templates/BusinessSimpleModernTemplate";
import { ProfessionalEasyReadTemplate } from "./templates/ProfessionalEasyReadTemplate";
import { CleanCorporateSimpleTemplate } from "./templates/CleanCorporateSimpleTemplate";
import { SimpleModernExecutiveTemplate } from "./templates/SimpleModernExecutiveTemplate";
import { MinimalistProSimpleTemplate } from "./templates/MinimalistProSimpleTemplate";
import { ProfessionalStraightforwardTemplate } from "./templates/ProfessionalStraightforwardTemplate";
import { ExecutiveDirectLayoutTemplate } from "./templates/ExecutiveDirectLayoutTemplate";
import { BusinessClearTemplateTemplate } from "./templates/BusinessClearTemplateTemplate";
import { SimpleProfessionalCleanTemplate } from "./templates/SimpleProfessionalCleanTemplate";
import { CorporateEasyLayoutTemplate } from "./templates/CorporateEasyLayoutTemplate";
import { ModernClearProTemplate } from "./templates/ModernClearProTemplate";
import { ProfessionalPlainSimpleTemplate } from "./templates/ProfessionalPlainSimpleTemplate";
import { ExecutivePlainLayoutTemplate } from "./templates/ExecutivePlainLayoutTemplate";
import { SimpleBusinessCleanTemplate } from "./templates/SimpleBusinessCleanTemplate";
import { MinimalDirectTemplateTemplate } from "./templates/MinimalDirectTemplateTemplate";
import { ProfessionalBasicModernTemplate } from "./templates/ProfessionalBasicModernTemplate";
import { CleanBasicExecutiveTemplate } from "./templates/CleanBasicExecutiveTemplate";
import { SimpleClearBusinessTemplate } from "./templates/SimpleClearBusinessTemplate";
import { ModernPlainProTemplate } from "./templates/ModernPlainProTemplate";
import { ExecutiveEasyTemplateTemplate } from "./templates/ExecutiveEasyTemplateTemplate";
import { ProfessionalReadableLayoutTemplate } from "./templates/ProfessionalReadableLayoutTemplate";
import { CleanReadableProTemplate } from "./templates/CleanReadableProTemplate";
import { SimpleStructuredTemplateTemplate } from "./templates/SimpleStructuredTemplateTemplate";

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
    "academic-scholar": AcademicEducatorTemplate,
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
    // Missing Universal Professional Templates
    "timeline-elegance": TimelineEleganceTemplate,
    "executive-minimal": ExecutiveMinimalTemplate,
    "sidebar-accent": SidebarAccentTemplate,
    "geometric-modern": GeometricModernTemplate,
    "two-tone-classic": TwoToneClassicTemplate,
    "bordered-elegance": BorderedEleganceTemplate,
    "column-divide": ColumnDivideTemplate,
    "compact-professional": CompactProfessionalTemplate,
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
    // Missing Software Templates
    "code-minimal": CodeMinimalTemplate,
    "tech-stack-pro": TechStackProTemplate,
    "github-style": GitHubStyleTemplate,
    "developer-grid": DeveloperGridTemplate,
    "terminal-theme": TerminalThemeTemplate,
    "algo-engineer": AlgoEngineerTemplate,
    "fullstack-modern": FullStackModernTemplate,
    "devops-pro": DevOpsProTemplate,
    "ml-engineer": MLEngineerTemplate,
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
    // 2025 New Fresher Templates
    "fresher-neon-accent": FresherNeonAccentTemplate,
    "fresher-glassmorphism": FresherGlassmorphismTemplate,
    "fresher-progressive": FresherProgressiveTemplate,
    "fresher-polaroid-style": FresherPolaroidStyleTemplate,
    "fresher-ribbon-style": FresherRibbonStyleTemplate,
    "fresher-double-column": FresherDoubleColumnTemplate,
    "fresher-gradient-border": FresherGradientBorderTemplate,
    "fresher-circular-progress": FresherCircularProgressTemplate,
    "fresher-modern-tabs": FresherModernTabsTemplate,
    "fresher-lightweight": FresherLightweightTemplate,
    "fresher-timeline-dots": FresherTimelineDotsTemplate,
    "fresher-box-shadow": FresherBoxShadowTemplate,
    "fresher-step-by-step": FresherStepByStepTemplate,
    "fresher-left-stripe": FresherLeftStripeTemplate,
    "fresher-top-bottom": FresherTopBottomTemplate,
    "fresher-dash-border": FresherDashBorderTemplate,
    "fresher-iconography": FresherIconographyTemplate,
    "fresher-modern-split": FresherModernSplitTemplate,
    "fresher-wave-header": FresherWaveHeaderTemplate,
    "fresher-academic-style": FresherAcademicStyleTemplate,
    // 2025 New Software/Tech Templates
    "dark-mode-dev": DarkModeDevTemplate,
    "code-snippet": CodeSnippetTemplate,
    "api-doc": APIDocTemplate,
    "stackoverflow-inspired": StackOverflowInspiredTemplate,
    "github-profile": GitHubProfileTemplate,
    "terminal-console": TerminalConsoleTemplate,
    "json-resume": JsonResumeTemplate,
    "monospace-tech": MonospaceTechTemplate,
    "blueprint-design": BlueprintDesignTemplate,
    "system-architect": SystemArchitectTemplate,
    "cloud-native": CloudNativeTemplate,
    "microservices-dev": MicroservicesDevTemplate,
    "tech-lead": TechLeadTemplate,
    "open-source": OpenSourceTemplate,
    "fullstack-pro": FullStackProTemplate,
    "data-science": DataScienceTemplate,
    "cyber-security": CyberSecurityTemplate,
    "blockchain-dev": BlockchainDevTemplate,
    "ai-engineer": AIEngineerTemplate,
    "mobile-dev": MobileDevTemplate,
    // 2025 New Creative Templates
    "magazine-creative": MagazineCreativeTemplate,
    "portfolio-showcase": PortfolioShowcaseTemplate,
    "artistic-grid": ArtisticGridTemplate,
    "bold-typography": BoldTypographyTemplate,
    "color-splash": ColorSplashTemplate,
    "minimal-chic": MinimalChicTemplate,
    "photography-layout": PhotographyLayoutTemplate,
    "brand-identity": BrandIdentityTemplate,
    "vintage-poster": VintagePosterTemplate,
    "modern-artist": ModernArtistTemplate,
    "gallery-layout": GalleryLayoutTemplate,
    "editorial-style": EditorialStyleTemplate,
    "urban-designer": UrbanDesignerTemplate,
    "pastel-creative": PastelCreativeTemplate,
    "neon-artist": NeonArtistTemplate,
    "geometric-creative": GeometricCreativeTemplate,
    "typewriter-style": TypewriterStyleTemplate,
    "ink-brush": InkBrushTemplate,
    "collage-art": CollageArtTemplate,
    "digital-canvas": DigitalCanvasTemplate,
    // New Universal Profile Templates
    "sidebar-professional-universal": SidebarProfessionalUniversalTemplate,
    "metro-modern-universal": MetroModernUniversalTemplate,
    "swiss-style-universal": SwissStyleUniversalTemplate,
    "executive-letterhead-universal": ExecutiveLetterheadUniversalTemplate,
    "diagonal-accent-universal": DiagonalAccentUniversalTemplate,
    "border-frame-universal": BorderFrameUniversalTemplate,
    "centered-minimal-universal": CenteredMinimalUniversalTemplate,
    "left-aligned-pro-universal": LeftAlignedProUniversalTemplate,
    "dual-column-modern-universal": DualColumnModernUniversalTemplate,
    "timeline-vertical-universal": TimelineVerticalUniversalTemplate,
    "badge-style-universal": BadgeStyleUniversalTemplate,
    "underline-accent-universal": UnderlineAccentUniversalTemplate,
    "circle-icon-universal": CircleIconUniversalTemplate,
    "linear-progress-universal": LinearProgressUniversalTemplate,
    "card-layout-universal": CardLayoutUniversalTemplate,
    "ribbon-header-universal": RibbonHeaderUniversalTemplate,
    "boxed-sections-universal": BoxedSectionsUniversalTemplate,
    "left-border-universal": LeftBorderUniversalTemplate,
    "floating-header-universal": FloatingHeaderUniversalTemplate,
    "monochrome-elegant-universal": MonochromeElegantUniversalTemplate,
    // Second Batch Universal Profile Templates
    "gradient-header-universal": GradientHeaderUniversalTemplate,
    "split-pane-universal": SplitPaneUniversalTemplate,
    "icon-bar-universal": IconBarUniversalTemplate,
    "modern-minimalist-universal": ModernMinimalistUniversalTemplate,
    "bold-typography-universal": BoldTypographyUniversalTemplate,
    "geometric-shapes-universal": GeometricShapesUniversalTemplate,
    "color-block-universal": ColorBlockUniversalTemplate,
    "thin-border-universal": ThinBorderUniversalTemplate,
    "asymmetric-layout-universal": AsymmetricLayoutUniversalTemplate,
    "classic-serif-universal": ClassicSerifUniversalTemplate,
    "professional-compact-universal": ProfessionalCompactUniversalTemplate,
    "wide-margin-universal": WideMarginUniversalTemplate,
    "top-bar-universal": TopBarUniversalTemplate,
    "corner-accent-universal": CornerAccentUniversalTemplate,
    "striped-background-universal": StripedBackgroundUniversalTemplate,
    "circular-elements-universal": CircularElementsUniversalTemplate,
    "minimal-lines-universal": MinimalLinesUniversalTemplate,
    "bold-section-headers-universal": BoldSectionHeadersUniversalTemplate,
    "two-tone-split-universal": TwoToneSplitUniversalTemplate,
    "clean-modern-universal": CleanModernUniversalTemplate,
    // Third Batch Universal Profile Templates
    "watermark-style-universal": WatermarkStyleUniversalTemplate,
    "magazine-layout-universal": MagazineLayoutUniversalTemplate,
    "hexagonal-pattern-universal": HexagonalPatternUniversalTemplate,
    "compact-elite-universal": CompactEliteUniversalTemplate,
    "diamond-accent-universal": DiamondAccentUniversalTemplate,
    "zigzag-border-universal": ZigzagBorderUniversalTemplate,
    "stacked-sections-universal": StackedSectionsUniversalTemplate,
    "dotted-grid-universal": DottedGridUniversalTemplate,
    "wave-pattern-universal": WavePatternUniversalTemplate,
    "chevron-accent-universal": ChevronAccentUniversalTemplate,
    "spotlight-header-universal": SpotlightHeaderUniversalTemplate,
    "layered-cards-universal": LayeredCardsUniversalTemplate,
    "angular-modern-universal": AngularModernUniversalTemplate,
    "rounded-corners-universal": RoundedCornersUniversalTemplate,
    "retro-professional-universal": RetroProfessionalUniversalTemplate,
    "newspaper-style-universal": NewspaperStyleUniversalTemplate,
    "triangular-elements-universal": TriangularElementsUniversalTemplate,
    "parallax-style-universal": ParallaxStyleUniversalTemplate,
    "vertical-timeline-universal": VerticalTimelineUniversalTemplate,
    "infinity-loop-universal": InfinityLoopUniversalTemplate,
    // 2025 New Profession-Specific Templates
    "medical-certification": MedicalCertificationTemplate,
    "clinical-excellence": ClinicalExcellenceTemplate,
    "healthcare-professional": HealthcareProfessionalTemplate,
    "nursing-specialist": NursingSpecialistTemplate,
    "medical-research": MedicalResearchTemplate,
    "teaching-excellence": TeachingExcellenceTemplate,
    "modern-educator-profession": ModernEducatorProfessionTemplate,
    "academic-educator": AcademicEducatorTemplate,
    "curriculum-developer": CurriculumDeveloperTemplate,
    "student-engagement": StudentEngagementTemplate,
    "financial-analyst": FinancialAnalystTemplate,
    "accounting-pro": AccountingProTemplate,
    "investment-banker": InvestmentBankerTemplate,
    "tax-specialist": TaxSpecialistTemplate,
    "audit-expert": AuditExpertTemplate,
    "sales-achievement": SalesAchievementTemplate,
    "marketing-strategist": MarketingStrategistTemplate,
    "digital-marketing-pro": DigitalMarketingProTemplate,
    "brand-manager": BrandManagerTemplate,
    "executive-sales-leader": ExecutiveSalesLeaderTemplate,
    "corporate-legal-counsel": CorporateLegalCounselTemplate,
    "corporate-law": CorporateLawTemplate,
    "litigation-attorney": LitigationAttorneyTemplate,
    "compliance-officer": ComplianceOfficerTemplate,
    "legal-advisor": LegalAdvisorTemplate,
    "project-manager-pro": ProjectManagerProTemplate,
    "operations-excellence": OperationsExcellenceTemplate,
    "process-improvement": ProcessImprovementTemplate,
    "supply-chain-manager": SupplyChainManagerTemplate,
    "agile-project-lead": AgileProjectLeadTemplate,
    "executive-leadership": ExecutiveLeadershipTemplate,
    "ceo-profile": CEOProfileTemplate,
    "strategic-leader": StrategicLeaderTemplate,
    "director-level": DirectorLevelTemplate,
    "vp-executive": VPExecutiveTemplate,
    // 2025 New Universal Professional Templates (Batch 5)
    "executive-corner-accent": ExecutiveCornerAccentTemplate,
    "minimal-elegance-universal": MinimalEleganceUniversalTemplate,
    "professional-divider": ProfessionalDividerTemplate,
    "modern-corporate-grid": ModernCorporateGridTemplate,
    "business-sidebar-pro": BusinessSidebarProTemplate,
    "clean-two-column-universal": CleanTwoColumnUniversalTemplate,
    "professional-header-banner": ProfessionalHeaderBannerTemplate,
    "executive-timeline-modern": ExecutiveTimelineModernTemplate,
    "corporate-border-frame": CorporateBorderFrameTemplate,
    "minimalist-modern-pro": MinimalistModernProTemplate,
    "professional-accent-bar": ProfessionalAccentBarTemplate,
    "business-clean-layout": BusinessCleanLayoutTemplate,
    "executive-split-design": ExecutiveSplitDesignTemplate,
    "modern-professional-box": ModernProfessionalBoxTemplate,
    "corporate-minimalist-pro": CorporateMinimalistProTemplate,
    "professional-vertical-line": ProfessionalVerticalLineTemplate,
    "business-modern-grid": BusinessModernGridTemplate,
    "executive-clean-split": ExecutiveCleanSplitTemplate,
    "minimal-corporate-pro": MinimalCorporateProTemplate,
    "professional-modern-edge": ProfessionalModernEdgeTemplate,
    // 2025 New Software/Tech Templates (Batch 3)
    "react-frontend-pro": ReactFrontendProTemplate,
    "node-backend-specialist": NodeBackendSpecialistTemplate,
    "fullstack-engineer": FullStackEngineerTemplate,
    "python-developer-pro": PythonDeveloperProTemplate,
    "java-enterprise-template": JavaEnterpriseTemplateTemplate,
    "devops-automation": DevOpsAutomationTemplate,
    "cloud-solutions-architect": CloudSolutionsArchitectTemplate,
    "microservices-expert": MicroservicesExpertTemplate,
    "kubernetes-specialist": KubernetesSpecialistTemplate,
    "docker-container-pro": DockerContainerProTemplate,
    "graphql-developer": GraphQLDeveloperTemplate,
    "typescript-expert": TypeScriptExpertTemplate,
    "vuejs-developer": VueJSDeveloperTemplate,
    "angular-specialist": AngularSpecialistTemplate,
    "springboot-developer": SpringBootDeveloperTemplate,
    "django-framework-pro": DjangoFrameworkProTemplate,
    "aws-cloud-engineer": AWSCloudEngineerTemplate,
    "azure-devops-specialist": AzureDevOpsSpecialistTemplate,
    "gcp-architect": GCPArchitectTemplate,
    "serverless-developer": ServerlessDeveloperTemplate,
    // 2025 New Software/Tech Templates (Batch 4)
    "rust-developer-pro": RustDeveloperProTemplate,
    "scala-engineer": ScalaEngineerTemplate,
    "elixir-developer": ElixirDeveloperTemplate,
    "swift-ios-developer": SwiftIOSDeveloperTemplate,
    "kotlin-android-dev": KotlinAndroidDevTemplate,
    "flutter-mobile-dev": FlutterMobileDevTemplate,
    "react-native-expert": ReactNativeExpertTemplate,
    "tensorflow-ml-engineer": TensorFlowMLEngineerTemplate,
    "pytorch-developer": PyTorchDeveloperTemplate,
    "mongodb-specialist": MongoDBSpecialistTemplate,
    "postgresql-expert": PostgreSQLExpertTemplate,
    "redis-cache-specialist": RedisCacheSpecialistTemplate,
    "elasticsearch-dev": ElasticsearchDevTemplate,
    "kafka-streaming-expert": KafkaStreamingExpertTemplate,
    "cicd-pipeline-engineer": CICDPipelineEngineerTemplate,
    // 2025 New Creative/Design Templates (Batch 2)
    "portfolio-minimalist": PortfolioMinimalistTemplate,
    "creative-showcase-grid": CreativeShowcaseGridTemplate,
    "art-director-modern": ArtDirectorModernTemplate,
    "uiux-designer-pro": UIUXDesignerProTemplate,
    "graphic-design-pro": GraphicDesignProTemplate,
    "brand-designer-template": BrandDesignerTemplateTemplate,
    "motion-graphics-artist": MotionGraphicsArtistTemplate,
    "illustration-portfolio": IllustrationPortfolioTemplate,
    "photography-pro-template": PhotographyProTemplateTemplate,
    "video-editor-creative": VideoEditorCreativeTemplate,
    "threed-modeling-artist": ThreeDModelingArtistTemplate,
    "web-designer-modern": WebDesignerModernTemplate,
    "product-designer-ux": ProductDesignerUXTemplate,
    "interaction-designer": InteractionDesignerTemplate,
    "visual-storyteller-template": VisualStorytellerTemplateTemplate,
    // 2025 Simple Universal Professional Templates (Batch 6)
    "clean-professional-simple": CleanProfessionalSimpleTemplate,
    "simple-executive-layout": SimpleExecutiveLayoutTemplate,
    "minimal-pro-layout": MinimalProLayoutTemplate,
    "professional-clean-simple": ProfessionalCleanSimpleTemplate,
    "corporate-simple-template": CorporateSimpleTemplateTemplate,
    "modern-simple-pro": ModernSimpleProTemplate,
    "executive-simple-clean": ExecutiveSimpleCleanTemplate,
    "business-simple-modern": BusinessSimpleModernTemplate,
    "professional-easy-read": ProfessionalEasyReadTemplate,
    "clean-corporate-simple": CleanCorporateSimpleTemplate,
    "simple-modern-executive": SimpleModernExecutiveTemplate,
    "minimalist-pro-simple": MinimalistProSimpleTemplate,
    "professional-straightforward": ProfessionalStraightforwardTemplate,
    "executive-direct-layout": ExecutiveDirectLayoutTemplate,
    "business-clear-template": BusinessClearTemplateTemplate,
    "simple-professional-clean": SimpleProfessionalCleanTemplate,
    "corporate-easy-layout": CorporateEasyLayoutTemplate,
    "modern-clear-pro": ModernClearProTemplate,
    "professional-plain-simple": ProfessionalPlainSimpleTemplate,
    "executive-plain-layout": ExecutivePlainLayoutTemplate,
    "simple-business-clean": SimpleBusinessCleanTemplate,
    "minimal-direct-template": MinimalDirectTemplateTemplate,
    "professional-basic-modern": ProfessionalBasicModernTemplate,
    "clean-basic-executive": CleanBasicExecutiveTemplate,
    "simple-clear-business": SimpleClearBusinessTemplate,
    "modern-plain-pro": ModernPlainProTemplate,
    "executive-easy-template": ExecutiveEasyTemplateTemplate,
    "professional-readable-layout": ProfessionalReadableLayoutTemplate,
    "clean-readable-pro": CleanReadableProTemplate,
    "simple-structured-template": SimpleStructuredTemplateTemplate,
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
