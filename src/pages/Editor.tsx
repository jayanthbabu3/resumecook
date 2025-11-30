import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Gauge, Loader2, RotateCcw, ArrowLeft, Edit3, FileEdit, Save } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { resumeService } from "@/lib/firestore/resumeService";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { ResumeData } from "@/types/resume";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { useResumeData } from "@/contexts/ResumeDataContext";
import { sanitizeResumeData, getTemplateDefaults } from "@/lib/resumeUtils";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pdf } from "@react-pdf/renderer";
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
// New Professional PDF Templates (22 new imports)
import { AlgoEngineerPDF } from "@/components/resume/pdf/AlgoEngineerPDF";
import { ArtisticBoldPDF } from "@/components/resume/pdf/ArtisticBoldPDF";
import { AsymmetricCreativePDF } from "@/components/resume/pdf/AsymmetricCreativePDF";
import { BorderedElegancePDF } from "@/components/resume/pdf/BorderedElegancePDF";
import { CodeMinimalPDF } from "@/components/resume/pdf/CodeMinimalPDF";
import { ColorfulModernPDF } from "@/components/resume/pdf/ColorfulModernPDF";
import { ColumnDividePDF } from "@/components/resume/pdf/ColumnDividePDF";
import { CompactProfessionalPDF } from "@/components/resume/pdf/CompactProfessionalPDF";
import { CreativeTimelinePDF } from "@/components/resume/pdf/CreativeTimelinePDF";
import { DesignerShowcasePDF } from "@/components/resume/pdf/DesignerShowcasePDF";
import { DeveloperGridPDF } from "@/components/resume/pdf/DeveloperGridPDF";
import { DevOpsProPDF } from "@/components/resume/pdf/DevOpsProPDF";
import { ExecutiveMinimalPDF } from "@/components/resume/pdf/ExecutiveMinimalPDF";
import { FullStackModernPDF } from "@/components/resume/pdf/FullStackModernPDF";
import { GitHubStylePDF } from "@/components/resume/pdf/GitHubStylePDF";
import { MLEngineerPDF } from "@/components/resume/pdf/MLEngineerPDF";
import { SidebarAccentPDF } from "@/components/resume/pdf/SidebarAccentPDF";
import { TechStackProPDF } from "@/components/resume/pdf/TechStackProPDF";
import { TerminalThemePDF } from "@/components/resume/pdf/TerminalThemePDF";
import { TwoToneClassicPDF } from "@/components/resume/pdf/TwoToneClassicPDF";
import { CodeCraftsmanPDF } from "@/components/resume/pdf/CodeCraftsmanPDF";
import { TechPioneerPDF } from "@/components/resume/pdf/TechPioneerPDF";
import { DevArchitecturePDF } from "@/components/resume/pdf/DevArchitecturePDF";
import { SoftwareMasterPDF } from "@/components/resume/pdf/SoftwareMasterPDF";
import { TechVanguardPDF } from "@/components/resume/pdf/TechVanguardPDF";
import { CodeSpherePDF } from "@/components/resume/pdf/CodeSpherePDF";
import { DevElitePDF } from "@/components/resume/pdf/DevElitePDF";
import { TechHorizonPDF } from "@/components/resume/pdf/TechHorizonPDF";
import { SoftwareCraftsmanPDF } from "@/components/resume/pdf/SoftwareCraftsmanPDF";
import { CodeVisionPDF } from "@/components/resume/pdf/CodeVisionPDF";
import { DevPrimePDF } from "@/components/resume/pdf/DevPrimePDF";
import { TechCraftedPDF } from "@/components/resume/pdf/TechCraftedPDF";
import { SoftwareVisionPDF } from "@/components/resume/pdf/SoftwareVisionPDF";
import { CodePinnaclePDF } from "@/components/resume/pdf/CodePinnaclePDF";
import { DevMomentumPDF } from "@/components/resume/pdf/DevMomentumPDF";
import { CreativeCanvasPDF } from "@/components/resume/pdf/CreativeCanvasPDF";
import { DesignMaestroPDF } from "@/components/resume/pdf/DesignMaestroPDF";
import { ArtisticVisionPDF } from "@/components/resume/pdf/ArtisticVisionPDF";
import { CreativePulsePDF } from "@/components/resume/pdf/CreativePulsePDF";
import { DesignPinnaclePDF } from "@/components/resume/pdf/DesignPinnaclePDF";
import { ArtisticHorizonPDF } from "@/components/resume/pdf/ArtisticHorizonPDF";
import { CreativeCraftedPDF } from "@/components/resume/pdf/CreativeCraftedPDF";
import { DesignSpherePDF } from "@/components/resume/pdf/DesignSpherePDF";
import { ArtisticMomentumPDF } from "@/components/resume/pdf/ArtisticMomentumPDF";
import { CreativeHorizonPDF } from "@/components/resume/pdf/CreativeHorizonPDF";
import { GraduateMomentumPDF } from "@/components/resume/pdf/GraduateMomentumPDF";
import { EntryElitePDF } from "@/components/resume/pdf/EntryElitePDF";
import { FreshersVisionPDF } from "@/components/resume/pdf/FreshersVisionPDF";
import { GraduatePrimePDF } from "@/components/resume/pdf/GraduatePrimePDF";
import { EntryHorizonPDF } from "@/components/resume/pdf/EntryHorizonPDF";
import { FreshersCraftedPDF } from "@/components/resume/pdf/FreshersCraftedPDF";
import { GraduateZenithPDF } from "@/components/resume/pdf/GraduateZenithPDF";
import { EntrySpherePDF } from "@/components/resume/pdf/EntrySpherePDF";
// 2025 New Templates (100 PDF imports)
import { StrategicLeadershipPDF } from "@/components/resume/pdf/StrategicLeadershipPDF";
import { CorporateExcellencePDF } from "@/components/resume/pdf/CorporateExcellencePDF";
import { ExecutivePrestigePDF } from "@/components/resume/pdf/ExecutivePrestigePDF";
import { GlobalExecutiveProPDF } from "@/components/resume/pdf/GlobalExecutiveProPDF";
import { PremiumCorporateEdgePDF } from "@/components/resume/pdf/PremiumCorporateEdgePDF";
import { EnterpriseLeaderPDF } from "@/components/resume/pdf/EnterpriseLeaderPDF";
import { BoardroomReadyPDF } from "@/components/resume/pdf/BoardroomReadyPDF";
import { CSuiteModernPDF } from "@/components/resume/pdf/CSuiteModernPDF";
import { ExecutiveImpactPDF } from "@/components/resume/pdf/ExecutiveImpactPDF";
import { CorporateVisionaryPDF } from "@/components/resume/pdf/CorporateVisionaryPDF";
import { PlatinumExecutivePDF } from "@/components/resume/pdf/PlatinumExecutivePDF";
import { GlobalLeadershipPDF } from "@/components/resume/pdf/GlobalLeadershipPDF";
import { SeniorExecutiveProPDF } from "@/components/resume/pdf/SeniorExecutiveProPDF";
import { CorporateElitePlusPDF } from "@/components/resume/pdf/CorporateElitePlusPDF";
import { ExecutivePinnaclePDF } from "@/components/resume/pdf/ExecutivePinnaclePDF";
import { CorporateDistinctionPDF } from "@/components/resume/pdf/CorporateDistinctionPDF";
import { LeadershipSummitPDF } from "@/components/resume/pdf/LeadershipSummitPDF";
import { ExecutiveAuthorityPDF } from "@/components/resume/pdf/ExecutiveAuthorityPDF";
import { CorporatePremierPDF } from "@/components/resume/pdf/CorporatePremierPDF";
import { GlobalEnterprisePDF } from "@/components/resume/pdf/GlobalEnterprisePDF";
import { ExecutiveSignaturePDF } from "@/components/resume/pdf/ExecutiveSignaturePDF";
import { CorporateApexPDF } from "@/components/resume/pdf/CorporateApexPDF";
import { StrategicExecutivePlusPDF } from "@/components/resume/pdf/StrategicExecutivePlusPDF";
import { CorporateParadigmPDF } from "@/components/resume/pdf/CorporateParadigmPDF";
import { ExecutiveMagnitudePDF } from "@/components/resume/pdf/ExecutiveMagnitudePDF";
import { CorporateSovereignPDF } from "@/components/resume/pdf/CorporateSovereignPDF";
import { LeadershipZenithPDF } from "@/components/resume/pdf/LeadershipZenithPDF";
import { ExecutiveNexusPDF } from "@/components/resume/pdf/ExecutiveNexusPDF";
import { CorporateVanguardPDF } from "@/components/resume/pdf/CorporateVanguardPDF";
import { ExecutiveAscendancyPDF } from "@/components/resume/pdf/ExecutiveAscendancyPDF";
import { VueSpecialistPDF } from "@/components/resume/pdf/VueSpecialistPDF";
import { SvelteDeveloperPDF } from "@/components/resume/pdf/SvelteDeveloperPDF";
import { FlutterEngineerPDF } from "@/components/resume/pdf/FlutterEngineerPDF";
import { SwiftIOSDeveloperPDF } from "@/components/resume/pdf/SwiftIOSDeveloperPDF";
import { RustSystemsEngineerPDF } from "@/components/resume/pdf/RustSystemsEngineerPDF";
import { ScalaBackendEngineerPDF } from "@/components/resume/pdf/ScalaBackendEngineerPDF";
import { ElixirDeveloperPDF } from "@/components/resume/pdf/ElixirDeveloperPDF";
import { GraphQLArchitectPDF } from "@/components/resume/pdf/GraphQLArchitectPDF";
import { TypeScriptExpertPDF } from "@/components/resume/pdf/TypeScriptExpertPDF";
import { NextJSFullstackPDF } from "@/components/resume/pdf/NextJSFullstackPDF";
import { NestJSBackendPDF } from "@/components/resume/pdf/NestJSBackendPDF";
import { DjangoFullstackPDF } from "@/components/resume/pdf/DjangoFullstackPDF";
import { SpringBootDeveloperPDF } from "@/components/resume/pdf/SpringBootDeveloperPDF";
import { PostgreSQLDBAPDF } from "@/components/resume/pdf/PostgreSQLDBAPDF";
import { MongoDBSpecialistPDF } from "@/components/resume/pdf/MongoDBSpecialistPDF";
import { RedisEngineerPDF } from "@/components/resume/pdf/RedisEngineerPDF";
import { ElasticsearchExpertPDF } from "@/components/resume/pdf/ElasticsearchExpertPDF";
import { TerraformDevOpsPDF } from "@/components/resume/pdf/TerraformDevOpsPDF";
import { AnsibleAutomationPDF } from "@/components/resume/pdf/AnsibleAutomationPDF";
import { JenkinsCICDPDF } from "@/components/resume/pdf/JenkinsCICDPDF";
import { KafkaStreamingPDF } from "@/components/resume/pdf/KafkaStreamingPDF";
import { RabbitMQSpecialistPDF } from "@/components/resume/pdf/RabbitMQSpecialistPDF";
import { GRPCDeveloperPDF } from "@/components/resume/pdf/GRPCDeveloperPDF";
import { WebAssemblyEngineerPDF } from "@/components/resume/pdf/WebAssemblyEngineerPDF";
import { UnityGameDeveloperPDF } from "@/components/resume/pdf/UnityGameDeveloperPDF";
import { AcademicAchieverPDF } from "@/components/resume/pdf/AcademicAchieverPDF";
import { GraduateInnovatorPDF } from "@/components/resume/pdf/GraduateInnovatorPDF";
import { CampusLeaderPDF } from "@/components/resume/pdf/CampusLeaderPDF";
import { ScholarshipGraduatePDF } from "@/components/resume/pdf/ScholarshipGraduatePDF";
import { HonorsStudentPDF } from "@/components/resume/pdf/HonorsStudentPDF";
import { STEMGraduatePDF } from "@/components/resume/pdf/STEMGraduatePDF";
import { InternshipReadyPDF } from "@/components/resume/pdf/InternshipReadyPDF";
import { ResearchGraduatePDF } from "@/components/resume/pdf/ResearchGraduatePDF";
import { EntrepreneurialGraduatePDF } from "@/components/resume/pdf/EntrepreneurialGraduatePDF";
import { VolunteerLeaderPDF } from "@/components/resume/pdf/VolunteerLeaderPDF";
import { CodingBootcampGradPDF } from "@/components/resume/pdf/CodingBootcampGradPDF";
import { LiberalArtsGraduatePDF } from "@/components/resume/pdf/LiberalArtsGraduatePDF";
import { BusinessGraduatePDF } from "@/components/resume/pdf/BusinessGraduatePDF";
import { EngineeringFresherPDF } from "@/components/resume/pdf/EngineeringFresherPDF";
import { DesignSchoolGradPDF } from "@/components/resume/pdf/DesignSchoolGradPDF";
import { MastersGraduatePDF } from "@/components/resume/pdf/MastersGraduatePDF";
import { PhDCandidatePDF } from "@/components/resume/pdf/PhDCandidatePDF";
import { StudentAthletePDF } from "@/components/resume/pdf/StudentAthletePDF";
import { StudyAbroadGraduatePDF } from "@/components/resume/pdf/StudyAbroadGraduatePDF";
import { DualDegreeGraduatePDF } from "@/components/resume/pdf/DualDegreeGraduatePDF";
import { PortfolioArtistPDF } from "@/components/resume/pdf/PortfolioArtistPDF";
import { MotionDesignerPDF } from "@/components/resume/pdf/MotionDesignerPDF";
import { BrandStrategistPDF } from "@/components/resume/pdf/BrandStrategistPDF";
import { ContentCreatorPDF } from "@/components/resume/pdf/ContentCreatorPDF";
import { IllustratorArtistPDF } from "@/components/resume/pdf/IllustratorArtistPDF";
import { VideoProducerPDF } from "@/components/resume/pdf/VideoProducerPDF";
import { CopywriterCreativePDF } from "@/components/resume/pdf/CopywriterCreativePDF";
import { ArtDirectorProPDF } from "@/components/resume/pdf/ArtDirectorProPDF";
import { PhotographerProPDF } from "@/components/resume/pdf/PhotographerProPDF";
import { TypographerSpecialistPDF } from "@/components/resume/pdf/TypographerSpecialistPDF";
import { DigitalArtistPDF } from "@/components/resume/pdf/DigitalArtistPDF";
import { CreativeDirectorElitePDF } from "@/components/resume/pdf/CreativeDirectorElitePDF";
import { SocialMediaCreativePDF } from "@/components/resume/pdf/SocialMediaCreativePDF";
import { AnimationArtistPDF } from "@/components/resume/pdf/AnimationArtistPDF";
import { MultimediaDesignerPDF } from "@/components/resume/pdf/MultimediaDesignerPDF";
import { UXResearcherPDF } from "@/components/resume/pdf/UXResearcherPDF";
import { UISpecialistPDF } from "@/components/resume/pdf/UISpecialistPDF";
import { ProductDesignerProPDF } from "@/components/resume/pdf/ProductDesignerProPDF";
import { InteractionDesignerPDF } from "@/components/resume/pdf/InteractionDesignerPDF";
import { ServiceDesignerPDF } from "@/components/resume/pdf/ServiceDesignerPDF";
import { DesignSystemsArchitectPDF } from "@/components/resume/pdf/DesignSystemsArchitectPDF";
import { AccessibilityDesignerPDF } from "@/components/resume/pdf/AccessibilityDesignerPDF";
import { DesignLeadPDF } from "@/components/resume/pdf/DesignLeadPDF";
import { DesignStrategistPDF } from "@/components/resume/pdf/DesignStrategistPDF";
import { VisualDesignerProPDF } from "@/components/resume/pdf/VisualDesignerProPDF";
// 2025 Batch 2 - Universal Professional PDFs (30 templates)
import { SapphireProfessionalPDF } from "@/components/resume/pdf/SapphireProfessionalPDF";
import { EmeraldExecutivePDF } from "@/components/resume/pdf/EmeraldExecutivePDF";
import { RubyCorporatePDF } from "@/components/resume/pdf/RubyCorporatePDF";
import { OnyxLeadershipPDF } from "@/components/resume/pdf/OnyxLeadershipPDF";
import { PlatinumPrestigePDF } from "@/components/resume/pdf/PlatinumPrestigePDF";
import { AzureProfessionalPDF } from "@/components/resume/pdf/AzureProfessionalPDF";
import { AmberExecutivePDF } from "@/components/resume/pdf/AmberExecutivePDF";
import { VioletCorporatePDF } from "@/components/resume/pdf/VioletCorporatePDF";
import { JadeProfessionalPDF } from "@/components/resume/pdf/JadeProfessionalPDF";
import { CrimsonLeadershipPDF } from "@/components/resume/pdf/CrimsonLeadershipPDF";
import { SlateMinimalistPDF } from "@/components/resume/pdf/SlateMinimalistPDF";
import { TealModernPDF } from "@/components/resume/pdf/TealModernPDF";
import { IndigoExecutivePDF } from "@/components/resume/pdf/IndigoExecutivePDF";
import { RoseProfessionalPDF } from "@/components/resume/pdf/RoseProfessionalPDF";
import { NavyCorporatePDF } from "@/components/resume/pdf/NavyCorporatePDF";
import { GoldPrestigePDF } from "@/components/resume/pdf/GoldPrestigePDF";
import { CharcoalProfessionalPDF } from "@/components/resume/pdf/CharcoalProfessionalPDF";
import { CoralExecutivePDF } from "@/components/resume/pdf/CoralExecutivePDF";
import { PewterMinimalistPDF } from "@/components/resume/pdf/PewterMinimalistPDF";
import { ForestProfessionalPDF } from "@/components/resume/pdf/ForestProfessionalPDF";
import { BurgundyExecutivePDF } from "@/components/resume/pdf/BurgundyExecutivePDF";
import { SkyModernPDF } from "@/components/resume/pdf/SkyModernPDF";
import { PlumProfessionalPDF } from "@/components/resume/pdf/PlumProfessionalPDF";
import { BronzeCorporatePDF } from "@/components/resume/pdf/BronzeCorporatePDF";
import { MintProfessionalPDF } from "@/components/resume/pdf/MintProfessionalPDF";
import { ObsidianExecutivePDF } from "@/components/resume/pdf/ObsidianExecutivePDF";
import { TangerineModernPDF } from "@/components/resume/pdf/TangerineModernPDF";
import { SteelProfessionalPDF } from "@/components/resume/pdf/SteelProfessionalPDF";
import { LavenderExecutivePDF } from "@/components/resume/pdf/LavenderExecutivePDF";
import { CobaltProfessionalPDF } from "@/components/resume/pdf/CobaltProfessionalPDF";
// 2025 Batch 2 - Software & Technology PDFs (25 templates)
import { GitHubDeveloperPDF } from "@/components/resume/pdf/GitHubDeveloperPDF";
import { LinkedInTechProPDF } from "@/components/resume/pdf/LinkedInTechProPDF";
import { LaravelArtisanPDF } from "@/components/resume/pdf/LaravelArtisanPDF";
import { RailsDeveloperPDF } from "@/components/resume/pdf/RailsDeveloperPDF";
import { AngularSpecialistPDF } from "@/components/resume/pdf/AngularSpecialistPDF";
import { VueMasterPDF } from "@/components/resume/pdf/VueMasterPDF";
import { KotlinAndroidDevPDF } from "@/components/resume/pdf/KotlinAndroidDevPDF";
import { iOSSwiftEngineerPDF } from "@/components/resume/pdf/iOSSwiftEngineerPDF";
import { DockerSpecialistPDF } from "@/components/resume/pdf/DockerSpecialistPDF";
import { AWSSolutionsArchitectPDF } from "@/components/resume/pdf/AWSSolutionsArchitectPDF";
import { GCPCloudEngineerPDF } from "@/components/resume/pdf/GCPCloudEngineerPDF";
import { AzureDevOpsProPDF } from "@/components/resume/pdf/AzureDevOpsProPDF";
import { ReactNativeDevPDF } from "@/components/resume/pdf/ReactNativeDevPDF";
import { FlutterUISpecialistPDF } from "@/components/resume/pdf/FlutterUISpecialistPDF";
import { DotNetCoreDeveloperPDF } from "@/components/resume/pdf/DotNetCoreDeveloperPDF";
import { GolangBackendEngineerPDF } from "@/components/resume/pdf/GolangBackendEngineerPDF";
import { PythonMLEngineerPDF } from "@/components/resume/pdf/PythonMLEngineerPDF";
import { DataScientistProPDF } from "@/components/resume/pdf/DataScientistProPDF";
import { BlockchainEngineerPDF } from "@/components/resume/pdf/BlockchainEngineerPDF";
import { SolidityDeveloperPDF } from "@/components/resume/pdf/SolidityDeveloperPDF";
import { CybersecurityAnalystPDF } from "@/components/resume/pdf/CybersecurityAnalystPDF";
import { DevSecOpsEngineerPDF } from "@/components/resume/pdf/DevSecOpsEngineerPDF";
import { FullstackJavaScriptPDF } from "@/components/resume/pdf/FullstackJavaScriptPDF";
import { JAMStackDeveloperPDF } from "@/components/resume/pdf/JAMStackDeveloperPDF";
import { HeadlessCMSDeveloperPDF } from "@/components/resume/pdf/HeadlessCMSDeveloperPDF";
// 2025 Batch 2 - Fresh Graduates PDFs (20 templates)
import { DigitalNativeGraduatePDF } from "@/components/resume/pdf/DigitalNativeGraduatePDF";
import { TechSavvyFresherPDF } from "@/components/resume/pdf/TechSavvyFresherPDF";
import { LinkedInReadyGraduatePDF } from "@/components/resume/pdf/LinkedInReadyGraduatePDF";
import { GitHubStudentDeveloperPDF } from "@/components/resume/pdf/GitHubStudentDeveloperPDF";
import { PortfolioFirstGraduatePDF } from "@/components/resume/pdf/PortfolioFirstGraduatePDF";
import { ConnectedGraduatePDF } from "@/components/resume/pdf/ConnectedGraduatePDF";
import { SocialMediaSavvyGradPDF } from "@/components/resume/pdf/SocialMediaSavvyGradPDF";
import { OpenSourceContributorPDF } from "@/components/resume/pdf/OpenSourceContributorPDF";
import { HackathonWinnerPDF } from "@/components/resume/pdf/HackathonWinnerPDF";
import { CodingChallengeChampionPDF } from "@/components/resume/pdf/CodingChallengeChampionPDF";
import { CapstoneShowcasePDF } from "@/components/resume/pdf/CapstoneShowcasePDF";
import { ResearchPublicationGradPDF } from "@/components/resume/pdf/ResearchPublicationGradPDF";
import { ConferencePresenterPDF } from "@/components/resume/pdf/ConferencePresenterPDF";
import { StartupInternPDF } from "@/components/resume/pdf/StartupInternPDF";
import { FAANGAspirantPDF } from "@/components/resume/pdf/FAANGAspirantPDF";
import { BootcampSuccessStoryPDF } from "@/components/resume/pdf/BootcampSuccessStoryPDF";
import { RemoteWorkReadyPDF } from "@/components/resume/pdf/RemoteWorkReadyPDF";
import { CommunityBuilderPDF } from "@/components/resume/pdf/CommunityBuilderPDF";
import { TechBloggerGraduatePDF } from "@/components/resume/pdf/TechBloggerGraduatePDF";
import { YouTubeEducatorPDF } from "@/components/resume/pdf/YouTubeEducatorPDF";
// 2025 Batch 2 - Creative PDFs (15 templates)
import { BehanceDesignerPDF } from "@/components/resume/pdf/BehanceDesignerPDF";
import { DribbbleCreativePDF } from "@/components/resume/pdf/DribbbleCreativePDF";
import { InstagramInfluencerPDF } from "@/components/resume/pdf/InstagramInfluencerPDF";
import { PinterestCuratorPDF } from "@/components/resume/pdf/PinterestCuratorPDF";
import { VimeoVideographerPDF } from "@/components/resume/pdf/VimeoVideographerPDF";
import { MediumWriterPDF } from "@/components/resume/pdf/MediumWriterPDF";
import { TikTokCreatorPDF } from "@/components/resume/pdf/TikTokCreatorPDF";
import { TwitchStreamerPDF } from "@/components/resume/pdf/TwitchStreamerPDF";
import { SoundCloudProducerPDF } from "@/components/resume/pdf/SoundCloudProducerPDF";
import { SpotifyArtistPDF } from "@/components/resume/pdf/SpotifyArtistPDF";
import { ArtStationArtistPDF } from "@/components/resume/pdf/ArtStationArtistPDF";
import { DeviantArtCreatorPDF } from "@/components/resume/pdf/DeviantArtCreatorPDF";
import { PatreonCreatorPDF } from "@/components/resume/pdf/PatreonCreatorPDF";
import { SubstackWriterPDF } from "@/components/resume/pdf/SubstackWriterPDF";
import { ClubhouseModeratorPDF } from "@/components/resume/pdf/ClubhouseModeratorPDF";
// 2025 Batch 2 - Design PDFs (10 templates)
import { FigmaExpertPDF } from "@/components/resume/pdf/FigmaExpertPDF";
import { SketchSpecialistPDF } from "@/components/resume/pdf/SketchSpecialistPDF";
import { AdobeXDDesignerPDF } from "@/components/resume/pdf/AdobeXDDesignerPDF";
import { FramerDesignerPDF } from "@/components/resume/pdf/FramerDesignerPDF";
import { WebflowDeveloperPDF } from "@/components/resume/pdf/WebflowDeveloperPDF";
import { PrincipleAnimatorPDF } from "@/components/resume/pdf/PrincipleAnimatorPDF";
import { InVisionPrototyperPDF } from "@/components/resume/pdf/InVisionPrototyperPDF";
import { MarvelAppDesignerPDF } from "@/components/resume/pdf/MarvelAppDesignerPDF";
import { ZeplinHandoffSpecialistPDF } from "@/components/resume/pdf/ZeplinHandoffSpecialistPDF";
import { AbstractVersionDesignerPDF } from "@/components/resume/pdf/AbstractVersionDesignerPDF";
// 2025 Batch 3 - Healthcare & Medical (15 templates)
import { RegisteredNurseProPDF } from "@/components/resume/pdf/RegisteredNurseProPDF";
import { PhysicianSpecialistPDF } from "@/components/resume/pdf/PhysicianSpecialistPDF";
import { DentalProfessionalPDF } from "@/components/resume/pdf/DentalProfessionalPDF";
import { PharmacistClinicalPDF } from "@/components/resume/pdf/PharmacistClinicalPDF";
import { PhysicalTherapistPDF } from "@/components/resume/pdf/PhysicalTherapistPDF";
import { MedicalTechnologistPDF } from "@/components/resume/pdf/MedicalTechnologistPDF";
import { RadiologyTechnicianPDF } from "@/components/resume/pdf/RadiologyTechnicianPDF";
import { HealthcareAdministratorPDF } from "@/components/resume/pdf/HealthcareAdministratorPDF";
import { MentalHealthCounselorPDF } from "@/components/resume/pdf/MentalHealthCounselorPDF";
import { OccupationalTherapistPDF } from "@/components/resume/pdf/OccupationalTherapistPDF";
import { SpeechPathologistPDF } from "@/components/resume/pdf/SpeechPathologistPDF";
import { VeterinaryDoctorPDF } from "@/components/resume/pdf/VeterinaryDoctorPDF";
import { NutritionistDietitianPDF } from "@/components/resume/pdf/NutritionistDietitianPDF";
import { MedicalAssistantPDF } from "@/components/resume/pdf/MedicalAssistantPDF";
import { ParamedicEMTPDF } from "@/components/resume/pdf/ParamedicEMTPDF";
// 2025 Batch 3 - Engineering (15 templates)
import { MechanicalEngineerProPDF } from "@/components/resume/pdf/MechanicalEngineerProPDF";
import { CivilEngineerPEPDF } from "@/components/resume/pdf/CivilEngineerPEPDF";
import { ElectricalEngineerPDF } from "@/components/resume/pdf/ElectricalEngineerPDF";
import { ChemicalEngineerProPDF } from "@/components/resume/pdf/ChemicalEngineerProPDF";
import { AerospaceEngineerPDF } from "@/components/resume/pdf/AerospaceEngineerPDF";
import { BiomedicalEngineerPDF } from "@/components/resume/pdf/BiomedicalEngineerPDF";
import { IndustrialEngineerPDF } from "@/components/resume/pdf/IndustrialEngineerPDF";
import { EnvironmentalEngineerPDF } from "@/components/resume/pdf/EnvironmentalEngineerPDF";
import { PetroleumEngineerPDF } from "@/components/resume/pdf/PetroleumEngineerPDF";
import { StructuralEngineerPDF } from "@/components/resume/pdf/StructuralEngineerPDF";
import { ManufacturingEngineerPDF } from "@/components/resume/pdf/ManufacturingEngineerPDF";
import { QualityAssuranceEngineerPDF } from "@/components/resume/pdf/QualityAssuranceEngineerPDF";
import { AutomationEngineerPDF } from "@/components/resume/pdf/AutomationEngineerPDF";
import { RoboticsEngineerPDF } from "@/components/resume/pdf/RoboticsEngineerPDF";
import { HVACEngineerPDF } from "@/components/resume/pdf/HVACEngineerPDF";
// 2025 Batch 3 - Sales & Marketing (15 templates)
import { SalesExecutiveProPDF } from "@/components/resume/pdf/SalesExecutiveProPDF";
import { AccountManagerEnterprisePDF } from "@/components/resume/pdf/AccountManagerEnterprisePDF";
import { DigitalMarketingSpecialistPDF } from "@/components/resume/pdf/DigitalMarketingSpecialistPDF";
import { BrandManagerStrategicPDF } from "@/components/resume/pdf/BrandManagerStrategicPDF";
import { SEOSpecialistProPDF } from "@/components/resume/pdf/SEOSpecialistProPDF";
import { GrowthMarketingManagerPDF } from "@/components/resume/pdf/GrowthMarketingManagerPDF";
import { EmailMarketingSpecialistPDF } from "@/components/resume/pdf/EmailMarketingSpecialistPDF";
import { ProductMarketingManagerPDF } from "@/components/resume/pdf/ProductMarketingManagerPDF";
import { BusinessDevelopmentManagerPDF } from "@/components/resume/pdf/BusinessDevelopmentManagerPDF";
import { InsideSalesRepresentativePDF } from "@/components/resume/pdf/InsideSalesRepresentativePDF";
import { FieldSalesSpecialistPDF } from "@/components/resume/pdf/FieldSalesSpecialistPDF";
import { CustomerSuccessManagerPDF } from "@/components/resume/pdf/CustomerSuccessManagerPDF";
import { MarketingAnalyticsManagerPDF } from "@/components/resume/pdf/MarketingAnalyticsManagerPDF";
import { EcommerceManagerPDF } from "@/components/resume/pdf/EcommerceManagerPDF";
import { AffiliateMarketingManagerPDF } from "@/components/resume/pdf/AffiliateMarketingManagerPDF";
// 2025 Batch 3 - Finance & Accounting (12 templates)
import { FinancialAnalystCFAPDF } from "@/components/resume/pdf/FinancialAnalystCFAPDF";
import { InvestmentBankerPDF } from "@/components/resume/pdf/InvestmentBankerPDF";
import { CertifiedPublicAccountantPDF } from "@/components/resume/pdf/CertifiedPublicAccountantPDF";
import { TaxSpecialistProPDF } from "@/components/resume/pdf/TaxSpecialistProPDF";
import { FinancialControllerPDF } from "@/components/resume/pdf/FinancialControllerPDF";
import { PortfolioManagerPDF } from "@/components/resume/pdf/PortfolioManagerPDF";
import { RiskManagementAnalystPDF } from "@/components/resume/pdf/RiskManagementAnalystPDF";
import { TreasuryAnalystPDF } from "@/components/resume/pdf/TreasuryAnalystPDF";
import { ForensicAccountantPDF } from "@/components/resume/pdf/ForensicAccountantPDF";
import { InternalAuditorPDF } from "@/components/resume/pdf/InternalAuditorPDF";
import { BudgetAnalystPDF } from "@/components/resume/pdf/BudgetAnalystPDF";
import { EquityResearchAnalystPDF } from "@/components/resume/pdf/EquityResearchAnalystPDF";
// 2025 Batch 3 - Education & Teaching (10 templates)
import { UniversityProfessorPDF } from "@/components/resume/pdf/UniversityProfessorPDF";
import { ElementaryTeacherPDF } from "@/components/resume/pdf/ElementaryTeacherPDF";
import { HighSchoolTeacherPDF } from "@/components/resume/pdf/HighSchoolTeacherPDF";
import { SpecialEducationTeacherPDF } from "@/components/resume/pdf/SpecialEducationTeacherPDF";
import { ESLTeacherCertifiedPDF } from "@/components/resume/pdf/ESLTeacherCertifiedPDF";
import { CurriculumDeveloperPDF } from "@/components/resume/pdf/CurriculumDeveloperPDF";
import { InstructionalDesignerPDF } from "@/components/resume/pdf/InstructionalDesignerPDF";
import { AcademicAdvisorPDF } from "@/components/resume/pdf/AcademicAdvisorPDF";
import { OnlineCourseInstructorPDF } from "@/components/resume/pdf/OnlineCourseInstructorPDF";
import { PrivateTutorSpecialistPDF } from "@/components/resume/pdf/PrivateTutorSpecialistPDF";
// 2025 Batch 3 - Legal (8 templates)
import { CorporateAttorneyPDF } from "@/components/resume/pdf/CorporateAttorneyPDF";
import { LitigationAttorneyPDF } from "@/components/resume/pdf/LitigationAttorneyPDF";
import { ParalegalCertifiedPDF } from "@/components/resume/pdf/ParalegalCertifiedPDF";
import { LegalConsultantPDF } from "@/components/resume/pdf/LegalConsultantPDF";
import { ComplianceOfficerLegalPDF } from "@/components/resume/pdf/ComplianceOfficerLegalPDF";
import { ContractSpecialistPDF } from "@/components/resume/pdf/ContractSpecialistPDF";
import { IntellectualPropertyAttorneyPDF } from "@/components/resume/pdf/IntellectualPropertyAttorneyPDF";
import { LegalOperationsManagerPDF } from "@/components/resume/pdf/LegalOperationsManagerPDF";
// 2025 Batch 3 - Human Resources (8 templates)
import { HRBusinessPartnerPDF } from "@/components/resume/pdf/HRBusinessPartnerPDF";
import { TalentAcquisitionSpecialistPDF } from "@/components/resume/pdf/TalentAcquisitionSpecialistPDF";
import { CompensationBenefitsManagerPDF } from "@/components/resume/pdf/CompensationBenefitsManagerPDF";
import { LearningDevelopmentManagerPDF } from "@/components/resume/pdf/LearningDevelopmentManagerPDF";
import { EmployeeRelationsSpecialistPDF } from "@/components/resume/pdf/EmployeeRelationsSpecialistPDF";
import { HRAnalyticsManagerPDF } from "@/components/resume/pdf/HRAnalyticsManagerPDF";
import { OrganizationalDevelopmentPDF } from "@/components/resume/pdf/OrganizationalDevelopmentPDF";
import { DiversityInclusionManagerPDF } from "@/components/resume/pdf/DiversityInclusionManagerPDF";
// 2025 Batch 3 - Hospitality & Culinary (7 templates)
import { ExecutiveChefPDF } from "@/components/resume/pdf/ExecutiveChefPDF";
import { HotelManagerOperationsPDF } from "@/components/resume/pdf/HotelManagerOperationsPDF";
import { RestaurantManagerPDF } from "@/components/resume/pdf/RestaurantManagerPDF";
import { EventPlannerCoordinatorPDF } from "@/components/resume/pdf/EventPlannerCoordinatorPDF";
import { SommelierWineSpecialistPDF } from "@/components/resume/pdf/SommelierWineSpecialistPDF";
import { PastryChefPDF } from "@/components/resume/pdf/PastryChefPDF";
import { HospitalityDirectorPDF } from "@/components/resume/pdf/HospitalityDirectorPDF";
// 2025 Batch 3 - Real Estate & Construction (7 templates)
import { RealEstateBrokerPDF } from "@/components/resume/pdf/RealEstateBrokerPDF";
import { PropertyManagerCommercialPDF } from "@/components/resume/pdf/PropertyManagerCommercialPDF";
import { ConstructionProjectManagerPDF } from "@/components/resume/pdf/ConstructionProjectManagerPDF";
import { ArchitectRegisteredPDF } from "@/components/resume/pdf/ArchitectRegisteredPDF";
import { GeneralContractorPDF } from "@/components/resume/pdf/GeneralContractorPDF";
import { EstimatorCostAnalystPDF } from "@/components/resume/pdf/EstimatorCostAnalystPDF";
import { RealEstateAppraiserPDF } from "@/components/resume/pdf/RealEstateAppraiserPDF";
// 2025 Batch 3 - Operations & Logistics (3 templates)
import { SupplyChainManagerPDF } from "@/components/resume/pdf/SupplyChainManagerPDF";
import { LogisticsCoordinatorPDF } from "@/components/resume/pdf/LogisticsCoordinatorPDF";
import { ProcurementSpecialistPDF } from "@/components/resume/pdf/ProcurementSpecialistPDF";
// 2025 Batch 4 - UI Template Imports (100 templates)
import { CrystalExecutiveTemplate } from "@/components/resume/templates/CrystalExecutiveTemplate";
import { QuantumProfessionalTemplate } from "@/components/resume/templates/QuantumProfessionalTemplate";
import { ZenithCorporateTemplate } from "@/components/resume/templates/ZenithCorporateTemplate";
import { AuroraMinimalTemplate } from "@/components/resume/templates/AuroraMinimalTemplate";
import { NexusEliteTemplate } from "@/components/resume/templates/NexusEliteTemplate";
import { HarmonyExecutiveTemplate } from "@/components/resume/templates/HarmonyExecutiveTemplate";
import { PrismProfessionalTemplate } from "@/components/resume/templates/PrismProfessionalTemplate";
import { TitanCorporateTemplate } from "@/components/resume/templates/TitanCorporateTemplate";
import { SerenityMinimalTemplate } from "@/components/resume/templates/SerenityMinimalTemplate";
import { VelocityExecutiveTemplate } from "@/components/resume/templates/VelocityExecutiveTemplate";
import { EclipseProfessionalTemplate } from "@/components/resume/templates/EclipseProfessionalTemplate";
import { SterlingExecutiveTemplate } from "@/components/resume/templates/SterlingExecutiveTemplate";
import { MeridianCorporateTemplate } from "@/components/resume/templates/MeridianCorporateTemplate";
import { CosmosProfessionalTemplate } from "@/components/resume/templates/CosmosProfessionalTemplate";
import { PinnacleEliteTemplate } from "@/components/resume/templates/PinnacleEliteTemplate";
import { FluxExecutiveTemplate } from "@/components/resume/templates/FluxExecutiveTemplate";
import { VertexProfessionalTemplate } from "@/components/resume/templates/VertexProfessionalTemplate";
import { RadianceCorporateTemplate } from "@/components/resume/templates/RadianceCorporateTemplate";
import { AtlasExecutiveTemplate } from "@/components/resume/templates/AtlasExecutiveTemplate";
import { SpectrumProfessionalTemplate } from "@/components/resume/templates/SpectrumProfessionalTemplate";
import { CodeforgeDeveloperTemplate } from "@/components/resume/templates/CodeforgeDeveloperTemplate";
import { QuantumCoderTemplate } from "@/components/resume/templates/QuantumCoderTemplate";
import { NeuralEngineerTemplate } from "@/components/resume/templates/NeuralEngineerTemplate";
import { PixelcraftDeveloperTemplate } from "@/components/resume/templates/PixelcraftDeveloperTemplate";
import { CloudnativeArchitectTemplate } from "@/components/resume/templates/CloudnativeArchitectTemplate";
import { BytecodeSpecialistTemplate } from "@/components/resume/templates/BytecodeSpecialistTemplate";
import { AgileflowDeveloperTemplate } from "@/components/resume/templates/AgileflowDeveloperTemplate";
import { StackmasterFullstackTemplate } from "@/components/resume/templates/StackmasterFullstackTemplate";
import { GitflowEngineerTemplate } from "@/components/resume/templates/GitflowEngineerTemplate";
import { CompileTimeDevTemplate } from "@/components/resume/templates/CompileTimeDevTemplate";
import { MicroarchEngineerTemplate } from "@/components/resume/templates/MicroarchEngineerTemplate";
import { ServerlessSpecialistTemplate } from "@/components/resume/templates/ServerlessSpecialistTemplate";
import { EdgecomputeDeveloperTemplate } from "@/components/resume/templates/EdgecomputeDeveloperTemplate";
import { WebrtcEngineerTemplate } from "@/components/resume/templates/WebrtcEngineerTemplate";
import { GraphdbSpecialistTemplate } from "@/components/resume/templates/GraphdbSpecialistTemplate";
import { ContaineropsEngineerTemplate } from "@/components/resume/templates/ContaineropsEngineerTemplate";
import { ApigatewayArchitectTemplate } from "@/components/resume/templates/ApigatewayArchitectTemplate";
import { ObservabilityEngineerTemplate } from "@/components/resume/templates/ObservabilityEngineerTemplate";
import { EventdrivenArchitectTemplate } from "@/components/resume/templates/EventdrivenArchitectTemplate";
import { MlopsEngineerTemplate } from "@/components/resume/templates/MlopsEngineerTemplate";
import { LaunchpadGraduateTemplate } from "@/components/resume/templates/LaunchpadGraduateTemplate";
import { MomentumFresherTemplate } from "@/components/resume/templates/MomentumFresherTemplate";
import { HorizonGraduateTemplate } from "@/components/resume/templates/HorizonGraduateTemplate";
import { CatalystFresherTemplate } from "@/components/resume/templates/CatalystFresherTemplate";
import { PathwayGraduateTemplate } from "@/components/resume/templates/PathwayGraduateTemplate";
import { SparkFresherTemplate } from "@/components/resume/templates/SparkFresherTemplate";
import { AscendGraduateTemplate } from "@/components/resume/templates/AscendGraduateTemplate";
import { PioneerFresherTemplate } from "@/components/resume/templates/PioneerFresherTemplate";
import { KeystoneGraduateTemplate } from "@/components/resume/templates/KeystoneGraduateTemplate";
import { VentureFresherTemplate } from "@/components/resume/templates/VentureFresherTemplate";
import { AspireGraduateTemplate } from "@/components/resume/templates/AspireGraduateTemplate";
import { EmergeFresherTemplate } from "@/components/resume/templates/EmergeFresherTemplate";
import { BrightGraduateTemplate } from "@/components/resume/templates/BrightGraduateTemplate";
import { NextstepFresherTemplate } from "@/components/resume/templates/NextstepFresherTemplate";
import { FoundationGraduateTemplate } from "@/components/resume/templates/FoundationGraduateTemplate";
import { ElevateFresherTemplate } from "@/components/resume/templates/ElevateFresherTemplate";
import { GenesisGraduateTemplate } from "@/components/resume/templates/GenesisGraduateTemplate";
import { AchieverFresherTemplate } from "@/components/resume/templates/AchieverFresherTemplate";
import { MilestoneGraduateTemplate } from "@/components/resume/templates/MilestoneGraduateTemplate";
import { PotentialFresherTemplate } from "@/components/resume/templates/PotentialFresherTemplate";
import { MuseCreativeTemplate } from "@/components/resume/templates/MuseCreativeTemplate";
import { CanvasArtistTemplate } from "@/components/resume/templates/CanvasArtistTemplate";
import { PaletteDesignerTemplate } from "@/components/resume/templates/PaletteDesignerTemplate";
import { VisionaryCreativeTemplate } from "@/components/resume/templates/VisionaryCreativeTemplate";
import { StudioArtistTemplate } from "@/components/resume/templates/StudioArtistTemplate";
import { CreativePulseTemplate } from "@/components/resume/templates/CreativePulseTemplate";
import { ArtisanDesignerTemplate } from "@/components/resume/templates/ArtisanDesignerTemplate";
import { ChromaticCreativeTemplate } from "@/components/resume/templates/ChromaticCreativeTemplate";
import { ExpressionArtistTemplate } from "@/components/resume/templates/ExpressionArtistTemplate";
import { ImaginativeDesignerTemplate } from "@/components/resume/templates/ImaginativeDesignerTemplate";
import { AestheticCreativeTemplate } from "@/components/resume/templates/AestheticCreativeTemplate";
import { CompositionArtistTemplate } from "@/components/resume/templates/CompositionArtistTemplate";
import { ImpressionDesignerTemplate } from "@/components/resume/templates/ImpressionDesignerTemplate";
import { NarrativeCreativeTemplate } from "@/components/resume/templates/NarrativeCreativeTemplate";
import { CraftArtistTemplate } from "@/components/resume/templates/CraftArtistTemplate";
import { VibrantDesignerTemplate } from "@/components/resume/templates/VibrantDesignerTemplate";
import { ConceptCreativeTemplate } from "@/components/resume/templates/ConceptCreativeTemplate";
import { EditorialArtistTemplate } from "@/components/resume/templates/EditorialArtistTemplate";
import { VisionDesignerTemplate } from "@/components/resume/templates/VisionDesignerTemplate";
import { CuratorCreativeTemplate } from "@/components/resume/templates/CuratorCreativeTemplate";
import { InterfaceMasterTemplate } from "@/components/resume/templates/InterfaceMasterTemplate";
import { DesignsystemArchitectTemplate } from "@/components/resume/templates/DesignsystemArchitectTemplate";
import { UserflowDesignerTemplate } from "@/components/resume/templates/UserflowDesignerTemplate";
import { PrototypeSpecialistTemplate } from "@/components/resume/templates/PrototypeSpecialistTemplate";
import { PixelperfectDesignerTemplate } from "@/components/resume/templates/PixelperfectDesignerTemplate";
import { ResponsiveUxTemplate } from "@/components/resume/templates/ResponsiveUxTemplate";
import { WireframeSpecialistTemplate } from "@/components/resume/templates/WireframeSpecialistTemplate";
import { MicrointeractionDesignerTemplate } from "@/components/resume/templates/MicrointeractionDesignerTemplate";
import { AccessibilityUxTemplate } from "@/components/resume/templates/AccessibilityUxTemplate";
import { UserresearchSpecialistTemplate } from "@/components/resume/templates/UserresearchSpecialistTemplate";
import { InformationArchitectTemplate } from "@/components/resume/templates/InformationArchitectTemplate";
import { DesignthinkingSpecialistTemplate } from "@/components/resume/templates/DesignthinkingSpecialistTemplate";
import { ComponentuiDesignerTemplate } from "@/components/resume/templates/ComponentuiDesignerTemplate";
import { DesignopsSpecialistTemplate } from "@/components/resume/templates/DesignopsSpecialistTemplate";
import { MobileFirstDesignerTemplate } from "@/components/resume/templates/MobileFirstDesignerTemplate";
import { ServicedesignSpecialistTemplate } from "@/components/resume/templates/ServicedesignSpecialistTemplate";
import { DesignstrategyLeadTemplate } from "@/components/resume/templates/DesignstrategyLeadTemplate";
import { ConversationalUxTemplate } from "@/components/resume/templates/ConversationalUxTemplate";
import { MotionUiDesignerTemplate } from "@/components/resume/templates/MotionUiDesignerTemplate";
import { DesignleadershipDirectorTemplate } from "@/components/resume/templates/DesignleadershipDirectorTemplate";
// 2025 Batch 5 - UI Template Imports (100 templates)
import { DigitalProfessionalTemplate } from "@/components/resume/templates/DigitalProfessionalTemplate";
import { NetworkedExecutiveTemplate } from "@/components/resume/templates/NetworkedExecutiveTemplate";
import { ConnectedProfessionalTemplate } from "@/components/resume/templates/ConnectedProfessionalTemplate";
import { LinkedinOptimizedTemplate } from "@/components/resume/templates/LinkedinOptimizedTemplate";
import { SocialExecutiveTemplate } from "@/components/resume/templates/SocialExecutiveTemplate";
import { OnlineProfessionalTemplate } from "@/components/resume/templates/OnlineProfessionalTemplate";
import { WebpresenceExecutiveTemplate } from "@/components/resume/templates/WebpresenceExecutiveTemplate";
import { ProfileCentricTemplate } from "@/components/resume/templates/ProfileCentricTemplate";
import { GlobalNetworkerTemplate } from "@/components/resume/templates/GlobalNetworkerTemplate";
import { ModernDigitalTemplate } from "@/components/resume/templates/ModernDigitalTemplate";
import { SocialSavvyTemplate } from "@/components/resume/templates/SocialSavvyTemplate";
import { PlatformProfessionalTemplate } from "@/components/resume/templates/PlatformProfessionalTemplate";
import { DigitalExecutiveTemplate } from "@/components/resume/templates/DigitalExecutiveTemplate";
import { BrandedProfessionalTemplate } from "@/components/resume/templates/BrandedProfessionalTemplate";
import { InfluencerProfessionalTemplate } from "@/components/resume/templates/InfluencerProfessionalTemplate";
import { OnlineIdentityTemplate } from "@/components/resume/templates/OnlineIdentityTemplate";
import { PortfolioProfessionalTemplate } from "@/components/resume/templates/PortfolioProfessionalTemplate";
import { DigitalIdentityTemplate } from "@/components/resume/templates/DigitalIdentityTemplate";
import { SocialMediaProTemplate } from "@/components/resume/templates/SocialMediaProTemplate";
import { ConnectedLeaderTemplate } from "@/components/resume/templates/ConnectedLeaderTemplate";
import { GithubPortfolioDevTemplate } from "@/components/resume/templates/GithubPortfolioDevTemplate";
import { OpensourceDeveloperTemplate } from "@/components/resume/templates/OpensourceDeveloperTemplate";
import { StackoverflowDevTemplate } from "@/components/resume/templates/StackoverflowDevTemplate";
import { CodepenDeveloperTemplate } from "@/components/resume/templates/CodepenDeveloperTemplate";
import { PortfolioCoderTemplate } from "@/components/resume/templates/PortfolioCoderTemplate";
import { TechBloggerDevTemplate } from "@/components/resume/templates/TechBloggerDevTemplate";
import { YoutubeDevEducatorTemplate } from "@/components/resume/templates/YoutubeDevEducatorTemplate";
import { LinkedinTechExpertTemplate } from "@/components/resume/templates/LinkedinTechExpertTemplate";
import { TwitterDevTemplate } from "@/components/resume/templates/TwitterDevTemplate";
import { MediumTechWriterTemplate } from "@/components/resume/templates/MediumTechWriterTemplate";
import { DevtoContributorTemplate } from "@/components/resume/templates/DevtoContributorTemplate";
import { HackernewsDeveloperTemplate } from "@/components/resume/templates/HackernewsDeveloperTemplate";
import { GitlabDeveloperTemplate } from "@/components/resume/templates/GitlabDeveloperTemplate";
import { BitbucketDeveloperTemplate } from "@/components/resume/templates/BitbucketDeveloperTemplate";
import { NpmPackageAuthorTemplate } from "@/components/resume/templates/NpmPackageAuthorTemplate";
import { PypiContributorTemplate } from "@/components/resume/templates/PypiContributorTemplate";
import { DockerhubPublisherTemplate } from "@/components/resume/templates/DockerhubPublisherTemplate";
import { KaggleDataScientistTemplate } from "@/components/resume/templates/KaggleDataScientistTemplate";
import { LeetcodeChampionTemplate } from "@/components/resume/templates/LeetcodeChampionTemplate";
import { HackerrankExpertTemplate } from "@/components/resume/templates/HackerrankExpertTemplate";
import { GenZGraduateTemplate } from "@/components/resume/templates/GenZGraduateTemplate";
import { DigitalNativeGradTemplate } from "@/components/resume/templates/DigitalNativeGradTemplate";
import { SocialFirstFresherTemplate } from "@/components/resume/templates/SocialFirstFresherTemplate";
import { PortfolioGraduateTemplate } from "@/components/resume/templates/PortfolioGraduateTemplate";
import { ProjectShowcaseGradTemplate } from "@/components/resume/templates/ProjectShowcaseGradTemplate";
import { GithubStudentTemplate } from "@/components/resume/templates/GithubStudentTemplate";
import { LinkedinGraduateTemplate } from "@/components/resume/templates/LinkedinGraduateTemplate";
import { OnlinePortfolioFresherTemplate } from "@/components/resume/templates/OnlinePortfolioFresherTemplate";
import { SocialGraduateTemplate } from "@/components/resume/templates/SocialGraduateTemplate";
import { DigitalGraduateTemplate } from "@/components/resume/templates/DigitalGraduateTemplate";
import { WebPortfolioGradTemplate } from "@/components/resume/templates/WebPortfolioGradTemplate";
import { HackathonGraduateTemplate } from "@/components/resume/templates/HackathonGraduateTemplate";
import { BootcampPortfolioTemplate } from "@/components/resume/templates/BootcampPortfolioTemplate";
import { InternshipShowcaseTemplate } from "@/components/resume/templates/InternshipShowcaseTemplate";
import { CampusInfluencerTemplate } from "@/components/resume/templates/CampusInfluencerTemplate";
import { StudentDeveloperPortfolioTemplate } from "@/components/resume/templates/StudentDeveloperPortfolioTemplate";
import { DigitalPortfolioGradTemplate } from "@/components/resume/templates/DigitalPortfolioGradTemplate";
import { OnlinePresenceFresherTemplate } from "@/components/resume/templates/OnlinePresenceFresherTemplate";
import { NetworkedGraduateTemplate } from "@/components/resume/templates/NetworkedGraduateTemplate";
import { ProfileDrivenGradTemplate } from "@/components/resume/templates/ProfileDrivenGradTemplate";
import { BehancePortfolioTemplate } from "@/components/resume/templates/BehancePortfolioTemplate";
import { DribbbleShowcaseTemplate } from "@/components/resume/templates/DribbbleShowcaseTemplate";
import { ArtstationProTemplate } from "@/components/resume/templates/ArtstationProTemplate";
import { InstagramCreativeTemplate } from "@/components/resume/templates/InstagramCreativeTemplate";
import { PinterestDesignerTemplate } from "@/components/resume/templates/PinterestDesignerTemplate";
import { YoutubeCreatorTemplate } from "@/components/resume/templates/YoutubeCreatorTemplate";
import { TiktokContentCreatorTemplate } from "@/components/resume/templates/TiktokContentCreatorTemplate";
import { VimeoVideographerTemplate } from "@/components/resume/templates/VimeoVideographerTemplate";
import { SoundcloudArtistTemplate } from "@/components/resume/templates/SoundcloudArtistTemplate";
import { SpotifyMusicianTemplate } from "@/components/resume/templates/SpotifyMusicianTemplate";
import { TwitchStreamerCreativeTemplate } from "@/components/resume/templates/TwitchStreamerCreativeTemplate";
import { DeviantartArtistTemplate } from "@/components/resume/templates/DeviantartArtistTemplate";
import { PatreonCreativeTemplate } from "@/components/resume/templates/PatreonCreativeTemplate";
import { MediumWriterCreativeTemplate } from "@/components/resume/templates/MediumWriterCreativeTemplate";
import { SubstackAuthorTemplate } from "@/components/resume/templates/SubstackAuthorTemplate";
import { PortfolioWebsiteCreativeTemplate } from "@/components/resume/templates/PortfolioWebsiteCreativeTemplate";
import { OnlineGalleryArtistTemplate } from "@/components/resume/templates/OnlineGalleryArtistTemplate";
import { SocialCreativeInfluencerTemplate } from "@/components/resume/templates/SocialCreativeInfluencerTemplate";
import { MultiPlatformArtistTemplate } from "@/components/resume/templates/MultiPlatformArtistTemplate";
import { DigitalArtistPortfolioTemplate } from "@/components/resume/templates/DigitalArtistPortfolioTemplate";
import { FigmaDesignerPortfolioTemplate } from "@/components/resume/templates/FigmaDesignerPortfolioTemplate";
import { AdobePortfolioDesignerTemplate } from "@/components/resume/templates/AdobePortfolioDesignerTemplate";
import { SketchExpertPortfolioTemplate } from "@/components/resume/templates/SketchExpertPortfolioTemplate";
import { WebflowDesignerPortfolioTemplate } from "@/components/resume/templates/WebflowDesignerPortfolioTemplate";
import { FramerDesignerPortfolioTemplate } from "@/components/resume/templates/FramerDesignerPortfolioTemplate";
import { UxfolioDesignerTemplate } from "@/components/resume/templates/UxfolioDesignerTemplate";
import { CoroflotPortfolioTemplate } from "@/components/resume/templates/CoroflotPortfolioTemplate";
import { CarbonmadeDesignerTemplate } from "@/components/resume/templates/CarbonmadeDesignerTemplate";
import { AwwwardsDesignerTemplate } from "@/components/resume/templates/AwwwardsDesignerTemplate";
import { UiuxPortfolioProTemplate } from "@/components/resume/templates/UiuxPortfolioProTemplate";
import { DesignportfolioSpecialistTemplate } from "@/components/resume/templates/DesignportfolioSpecialistTemplate";
import { CasestudyDesignerTemplate } from "@/components/resume/templates/CasestudyDesignerTemplate";
import { ProtfolioShowcaseUxTemplate } from "@/components/resume/templates/ProtfolioShowcaseUxTemplate";
import { InteractivePortfolioDesignerTemplate } from "@/components/resume/templates/InteractivePortfolioDesignerTemplate";
import { UxResearcherPortfolioTemplate } from "@/components/resume/templates/UxResearcherPortfolioTemplate";
import { ProductDesignerShowcaseTemplate } from "@/components/resume/templates/ProductDesignerShowcaseTemplate";
import { DesignSystemsPortfolioTemplate } from "@/components/resume/templates/DesignSystemsPortfolioTemplate";
import { MotionDesignerPortfolioTemplate } from "@/components/resume/templates/MotionDesignerPortfolioTemplate";
import { VisualDesignerShowcaseTemplate } from "@/components/resume/templates/VisualDesignerShowcaseTemplate";
import { DesignLeaderPortfolioTemplate } from "@/components/resume/templates/DesignLeaderPortfolioTemplate";
// 2025 Batch 4 - PDF Template Imports (100 templates)
import { PDFCrystalExecutiveTemplate } from "@/components/resume/pdf/PDFCrystalExecutiveTemplate";
import { PDFQuantumProfessionalTemplate } from "@/components/resume/pdf/PDFQuantumProfessionalTemplate";
import { PDFZenithCorporateTemplate } from "@/components/resume/pdf/PDFZenithCorporateTemplate";
import { PDFAuroraMinimalTemplate } from "@/components/resume/pdf/PDFAuroraMinimalTemplate";
import { PDFNexusEliteTemplate } from "@/components/resume/pdf/PDFNexusEliteTemplate";
import { PDFHarmonyExecutiveTemplate } from "@/components/resume/pdf/PDFHarmonyExecutiveTemplate";
import { PDFPrismProfessionalTemplate } from "@/components/resume/pdf/PDFPrismProfessionalTemplate";
import { PDFTitanCorporateTemplate } from "@/components/resume/pdf/PDFTitanCorporateTemplate";
import { PDFSerenityMinimalTemplate } from "@/components/resume/pdf/PDFSerenityMinimalTemplate";
import { PDFVelocityExecutiveTemplate } from "@/components/resume/pdf/PDFVelocityExecutiveTemplate";
import { PDFEclipseProfessionalTemplate } from "@/components/resume/pdf/PDFEclipseProfessionalTemplate";
import { PDFSterlingExecutiveTemplate } from "@/components/resume/pdf/PDFSterlingExecutiveTemplate";
import { PDFMeridianCorporateTemplate } from "@/components/resume/pdf/PDFMeridianCorporateTemplate";
import { PDFCosmosProfessionalTemplate } from "@/components/resume/pdf/PDFCosmosProfessionalTemplate";
import { PDFPinnacleEliteTemplate } from "@/components/resume/pdf/PDFPinnacleEliteTemplate";
import { PDFFluxExecutiveTemplate } from "@/components/resume/pdf/PDFFluxExecutiveTemplate";
import { PDFVertexProfessionalTemplate } from "@/components/resume/pdf/PDFVertexProfessionalTemplate";
import { PDFRadianceCorporateTemplate } from "@/components/resume/pdf/PDFRadianceCorporateTemplate";
import { PDFAtlasExecutiveTemplate } from "@/components/resume/pdf/PDFAtlasExecutiveTemplate";
import { PDFSpectrumProfessionalTemplate } from "@/components/resume/pdf/PDFSpectrumProfessionalTemplate";
import { PDFCodeforgeDeveloperTemplate } from "@/components/resume/pdf/PDFCodeforgeDeveloperTemplate";
import { PDFQuantumCoderTemplate } from "@/components/resume/pdf/PDFQuantumCoderTemplate";
import { PDFNeuralEngineerTemplate } from "@/components/resume/pdf/PDFNeuralEngineerTemplate";
import { PDFPixelcraftDeveloperTemplate } from "@/components/resume/pdf/PDFPixelcraftDeveloperTemplate";
import { PDFCloudnativeArchitectTemplate } from "@/components/resume/pdf/PDFCloudnativeArchitectTemplate";
import { PDFBytecodeSpecialistTemplate } from "@/components/resume/pdf/PDFBytecodeSpecialistTemplate";
import { PDFAgileflowDeveloperTemplate } from "@/components/resume/pdf/PDFAgileflowDeveloperTemplate";
import { PDFStackmasterFullstackTemplate } from "@/components/resume/pdf/PDFStackmasterFullstackTemplate";
import { PDFGitflowEngineerTemplate } from "@/components/resume/pdf/PDFGitflowEngineerTemplate";
import { PDFCompileTimeDevTemplate } from "@/components/resume/pdf/PDFCompileTimeDevTemplate";
import { PDFMicroarchEngineerTemplate } from "@/components/resume/pdf/PDFMicroarchEngineerTemplate";
import { PDFServerlessSpecialistTemplate } from "@/components/resume/pdf/PDFServerlessSpecialistTemplate";
import { PDFEdgecomputeDeveloperTemplate } from "@/components/resume/pdf/PDFEdgecomputeDeveloperTemplate";
import { PDFWebrtcEngineerTemplate } from "@/components/resume/pdf/PDFWebrtcEngineerTemplate";
import { PDFGraphdbSpecialistTemplate } from "@/components/resume/pdf/PDFGraphdbSpecialistTemplate";
import { PDFContaineropsEngineerTemplate } from "@/components/resume/pdf/PDFContaineropsEngineerTemplate";
import { PDFApigatewayArchitectTemplate } from "@/components/resume/pdf/PDFApigatewayArchitectTemplate";
import { PDFObservabilityEngineerTemplate } from "@/components/resume/pdf/PDFObservabilityEngineerTemplate";
import { PDFEventdrivenArchitectTemplate } from "@/components/resume/pdf/PDFEventdrivenArchitectTemplate";
import { PDFMlopsEngineerTemplate } from "@/components/resume/pdf/PDFMlopsEngineerTemplate";
import { PDFLaunchpadGraduateTemplate } from "@/components/resume/pdf/PDFLaunchpadGraduateTemplate";
import { PDFMomentumFresherTemplate } from "@/components/resume/pdf/PDFMomentumFresherTemplate";
import { PDFHorizonGraduateTemplate } from "@/components/resume/pdf/PDFHorizonGraduateTemplate";
import { PDFCatalystFresherTemplate } from "@/components/resume/pdf/PDFCatalystFresherTemplate";
import { PDFPathwayGraduateTemplate } from "@/components/resume/pdf/PDFPathwayGraduateTemplate";
import { PDFSparkFresherTemplate } from "@/components/resume/pdf/PDFSparkFresherTemplate";
import { PDFAscendGraduateTemplate } from "@/components/resume/pdf/PDFAscendGraduateTemplate";
import { PDFPioneerFresherTemplate } from "@/components/resume/pdf/PDFPioneerFresherTemplate";
import { PDFKeystoneGraduateTemplate } from "@/components/resume/pdf/PDFKeystoneGraduateTemplate";
import { PDFVentureFresherTemplate } from "@/components/resume/pdf/PDFVentureFresherTemplate";
import { PDFAspireGraduateTemplate } from "@/components/resume/pdf/PDFAspireGraduateTemplate";
import { PDFEmergeFresherTemplate } from "@/components/resume/pdf/PDFEmergeFresherTemplate";
import { PDFBrightGraduateTemplate } from "@/components/resume/pdf/PDFBrightGraduateTemplate";
import { PDFNextstepFresherTemplate } from "@/components/resume/pdf/PDFNextstepFresherTemplate";
import { PDFFoundationGraduateTemplate } from "@/components/resume/pdf/PDFFoundationGraduateTemplate";
import { PDFElevateFresherTemplate } from "@/components/resume/pdf/PDFElevateFresherTemplate";
import { PDFGenesisGraduateTemplate } from "@/components/resume/pdf/PDFGenesisGraduateTemplate";
import { PDFAchieverFresherTemplate } from "@/components/resume/pdf/PDFAchieverFresherTemplate";
import { PDFMilestoneGraduateTemplate } from "@/components/resume/pdf/PDFMilestoneGraduateTemplate";
import { PDFPotentialFresherTemplate } from "@/components/resume/pdf/PDFPotentialFresherTemplate";
import { PDFMuseCreativeTemplate } from "@/components/resume/pdf/PDFMuseCreativeTemplate";
import { PDFCanvasArtistTemplate } from "@/components/resume/pdf/PDFCanvasArtistTemplate";
import { PDFPaletteDesignerTemplate } from "@/components/resume/pdf/PDFPaletteDesignerTemplate";
import { PDFVisionaryCreativeTemplate } from "@/components/resume/pdf/PDFVisionaryCreativeTemplate";
import { PDFStudioArtistTemplate } from "@/components/resume/pdf/PDFStudioArtistTemplate";
import { PDFCreativePulseTemplate } from "@/components/resume/pdf/PDFCreativePulseTemplate";
import { PDFArtisanDesignerTemplate } from "@/components/resume/pdf/PDFArtisanDesignerTemplate";
import { PDFChromaticCreativeTemplate } from "@/components/resume/pdf/PDFChromaticCreativeTemplate";
import { PDFExpressionArtistTemplate } from "@/components/resume/pdf/PDFExpressionArtistTemplate";
import { PDFImaginativeDesignerTemplate } from "@/components/resume/pdf/PDFImaginativeDesignerTemplate";
import { PDFAestheticCreativeTemplate } from "@/components/resume/pdf/PDFAestheticCreativeTemplate";
import { PDFCompositionArtistTemplate } from "@/components/resume/pdf/PDFCompositionArtistTemplate";
import { PDFImpressionDesignerTemplate } from "@/components/resume/pdf/PDFImpressionDesignerTemplate";
import { PDFNarrativeCreativeTemplate } from "@/components/resume/pdf/PDFNarrativeCreativeTemplate";
import { PDFCraftArtistTemplate } from "@/components/resume/pdf/PDFCraftArtistTemplate";
import { PDFVibrantDesignerTemplate } from "@/components/resume/pdf/PDFVibrantDesignerTemplate";
import { PDFConceptCreativeTemplate } from "@/components/resume/pdf/PDFConceptCreativeTemplate";
import { PDFEditorialArtistTemplate } from "@/components/resume/pdf/PDFEditorialArtistTemplate";
import { PDFVisionDesignerTemplate } from "@/components/resume/pdf/PDFVisionDesignerTemplate";
import { PDFCuratorCreativeTemplate } from "@/components/resume/pdf/PDFCuratorCreativeTemplate";
import { PDFInterfaceMasterTemplate } from "@/components/resume/pdf/PDFInterfaceMasterTemplate";
import { PDFDesignsystemArchitectTemplate } from "@/components/resume/pdf/PDFDesignsystemArchitectTemplate";
import { PDFUserflowDesignerTemplate } from "@/components/resume/pdf/PDFUserflowDesignerTemplate";
import { PDFPrototypeSpecialistTemplate } from "@/components/resume/pdf/PDFPrototypeSpecialistTemplate";
import { PDFPixelperfectDesignerTemplate } from "@/components/resume/pdf/PDFPixelperfectDesignerTemplate";
import { PDFResponsiveUxTemplate } from "@/components/resume/pdf/PDFResponsiveUxTemplate";
import { PDFWireframeSpecialistTemplate } from "@/components/resume/pdf/PDFWireframeSpecialistTemplate";
import { PDFMicrointeractionDesignerTemplate } from "@/components/resume/pdf/PDFMicrointeractionDesignerTemplate";
import { PDFAccessibilityUxTemplate } from "@/components/resume/pdf/PDFAccessibilityUxTemplate";
import { PDFUserresearchSpecialistTemplate } from "@/components/resume/pdf/PDFUserresearchSpecialistTemplate";
import { PDFInformationArchitectTemplate } from "@/components/resume/pdf/PDFInformationArchitectTemplate";
import { PDFDesignthinkingSpecialistTemplate } from "@/components/resume/pdf/PDFDesignthinkingSpecialistTemplate";
import { PDFComponentuiDesignerTemplate } from "@/components/resume/pdf/PDFComponentuiDesignerTemplate";
import { PDFDesignopsSpecialistTemplate } from "@/components/resume/pdf/PDFDesignopsSpecialistTemplate";
import { PDFMobileFirstDesignerTemplate } from "@/components/resume/pdf/PDFMobileFirstDesignerTemplate";
import { PDFServicedesignSpecialistTemplate } from "@/components/resume/pdf/PDFServicedesignSpecialistTemplate";
import { PDFDesignstrategyLeadTemplate } from "@/components/resume/pdf/PDFDesignstrategyLeadTemplate";
import { PDFConversationalUxTemplate } from "@/components/resume/pdf/PDFConversationalUxTemplate";
import { PDFMotionUiDesignerTemplate } from "@/components/resume/pdf/PDFMotionUiDesignerTemplate";
import { PDFDesignleadershipDirectorTemplate } from "@/components/resume/pdf/PDFDesignleadershipDirectorTemplate";
// 2025 Batch 5 - PDF Template Imports (100 templates)
import { PDFDigitalProfessionalTemplate } from "@/components/resume/pdf/PDFDigitalProfessionalTemplate";
import { PDFNetworkedExecutiveTemplate } from "@/components/resume/pdf/PDFNetworkedExecutiveTemplate";
import { PDFConnectedProfessionalTemplate } from "@/components/resume/pdf/PDFConnectedProfessionalTemplate";
import { PDFLinkedinOptimizedTemplate } from "@/components/resume/pdf/PDFLinkedinOptimizedTemplate";
import { PDFSocialExecutiveTemplate } from "@/components/resume/pdf/PDFSocialExecutiveTemplate";
import { PDFOnlineProfessionalTemplate } from "@/components/resume/pdf/PDFOnlineProfessionalTemplate";
import { PDFWebpresenceExecutiveTemplate } from "@/components/resume/pdf/PDFWebpresenceExecutiveTemplate";
import { PDFProfileCentricTemplate } from "@/components/resume/pdf/PDFProfileCentricTemplate";
import { PDFGlobalNetworkerTemplate } from "@/components/resume/pdf/PDFGlobalNetworkerTemplate";
import { PDFModernDigitalTemplate } from "@/components/resume/pdf/PDFModernDigitalTemplate";
import { PDFSocialSavvyTemplate } from "@/components/resume/pdf/PDFSocialSavvyTemplate";
import { PDFPlatformProfessionalTemplate } from "@/components/resume/pdf/PDFPlatformProfessionalTemplate";
import { PDFDigitalExecutiveTemplate } from "@/components/resume/pdf/PDFDigitalExecutiveTemplate";
import { PDFBrandedProfessionalTemplate } from "@/components/resume/pdf/PDFBrandedProfessionalTemplate";
import { PDFInfluencerProfessionalTemplate } from "@/components/resume/pdf/PDFInfluencerProfessionalTemplate";
import { PDFOnlineIdentityTemplate } from "@/components/resume/pdf/PDFOnlineIdentityTemplate";
import { PDFPortfolioProfessionalTemplate } from "@/components/resume/pdf/PDFPortfolioProfessionalTemplate";
import { PDFDigitalIdentityTemplate } from "@/components/resume/pdf/PDFDigitalIdentityTemplate";
import { PDFSocialMediaProTemplate } from "@/components/resume/pdf/PDFSocialMediaProTemplate";
import { PDFConnectedLeaderTemplate } from "@/components/resume/pdf/PDFConnectedLeaderTemplate";
import { PDFGithubPortfolioDevTemplate } from "@/components/resume/pdf/PDFGithubPortfolioDevTemplate";
import { PDFOpensourceDeveloperTemplate } from "@/components/resume/pdf/PDFOpensourceDeveloperTemplate";
import { PDFStackoverflowDevTemplate } from "@/components/resume/pdf/PDFStackoverflowDevTemplate";
import { PDFCodepenDeveloperTemplate } from "@/components/resume/pdf/PDFCodepenDeveloperTemplate";
import { PDFPortfolioCoderTemplate } from "@/components/resume/pdf/PDFPortfolioCoderTemplate";
import { PDFTechBloggerDevTemplate } from "@/components/resume/pdf/PDFTechBloggerDevTemplate";
import { PDFYoutubeDevEducatorTemplate } from "@/components/resume/pdf/PDFYoutubeDevEducatorTemplate";
import { PDFLinkedinTechExpertTemplate } from "@/components/resume/pdf/PDFLinkedinTechExpertTemplate";
import { PDFTwitterDevTemplate } from "@/components/resume/pdf/PDFTwitterDevTemplate";
import { PDFMediumTechWriterTemplate } from "@/components/resume/pdf/PDFMediumTechWriterTemplate";
import { PDFDevtoContributorTemplate } from "@/components/resume/pdf/PDFDevtoContributorTemplate";
import { PDFHackernewsDeveloperTemplate } from "@/components/resume/pdf/PDFHackernewsDeveloperTemplate";
import { PDFGitlabDeveloperTemplate } from "@/components/resume/pdf/PDFGitlabDeveloperTemplate";
import { PDFBitbucketDeveloperTemplate } from "@/components/resume/pdf/PDFBitbucketDeveloperTemplate";
import { PDFNpmPackageAuthorTemplate } from "@/components/resume/pdf/PDFNpmPackageAuthorTemplate";
import { PDFPypiContributorTemplate } from "@/components/resume/pdf/PDFPypiContributorTemplate";
import { PDFDockerhubPublisherTemplate } from "@/components/resume/pdf/PDFDockerhubPublisherTemplate";
import { PDFKaggleDataScientistTemplate } from "@/components/resume/pdf/PDFKaggleDataScientistTemplate";
import { PDFLeetcodeChampionTemplate } from "@/components/resume/pdf/PDFLeetcodeChampionTemplate";
import { PDFHackerrankExpertTemplate } from "@/components/resume/pdf/PDFHackerrankExpertTemplate";
import { PDFGenZGraduateTemplate } from "@/components/resume/pdf/PDFGenZGraduateTemplate";
import { PDFDigitalNativeGradTemplate } from "@/components/resume/pdf/PDFDigitalNativeGradTemplate";
import { PDFSocialFirstFresherTemplate } from "@/components/resume/pdf/PDFSocialFirstFresherTemplate";
import { PDFPortfolioGraduateTemplate } from "@/components/resume/pdf/PDFPortfolioGraduateTemplate";
import { PDFProjectShowcaseGradTemplate } from "@/components/resume/pdf/PDFProjectShowcaseGradTemplate";
import { PDFGithubStudentTemplate } from "@/components/resume/pdf/PDFGithubStudentTemplate";
import { PDFLinkedinGraduateTemplate } from "@/components/resume/pdf/PDFLinkedinGraduateTemplate";
import { PDFOnlinePortfolioFresherTemplate } from "@/components/resume/pdf/PDFOnlinePortfolioFresherTemplate";
import { PDFSocialGraduateTemplate } from "@/components/resume/pdf/PDFSocialGraduateTemplate";
import { PDFDigitalGraduateTemplate } from "@/components/resume/pdf/PDFDigitalGraduateTemplate";
import { PDFWebPortfolioGradTemplate } from "@/components/resume/pdf/PDFWebPortfolioGradTemplate";
import { PDFHackathonGraduateTemplate } from "@/components/resume/pdf/PDFHackathonGraduateTemplate";
import { PDFBootcampPortfolioTemplate } from "@/components/resume/pdf/PDFBootcampPortfolioTemplate";
import { PDFInternshipShowcaseTemplate } from "@/components/resume/pdf/PDFInternshipShowcaseTemplate";
import { PDFCampusInfluencerTemplate } from "@/components/resume/pdf/PDFCampusInfluencerTemplate";
import { PDFStudentDeveloperPortfolioTemplate } from "@/components/resume/pdf/PDFStudentDeveloperPortfolioTemplate";
import { PDFDigitalPortfolioGradTemplate } from "@/components/resume/pdf/PDFDigitalPortfolioGradTemplate";
import { PDFOnlinePresenceFresherTemplate } from "@/components/resume/pdf/PDFOnlinePresenceFresherTemplate";
import { PDFNetworkedGraduateTemplate } from "@/components/resume/pdf/PDFNetworkedGraduateTemplate";
import { PDFProfileDrivenGradTemplate } from "@/components/resume/pdf/PDFProfileDrivenGradTemplate";
import { PDFBehancePortfolioTemplate } from "@/components/resume/pdf/PDFBehancePortfolioTemplate";
import { PDFDribbbleShowcaseTemplate } from "@/components/resume/pdf/PDFDribbbleShowcaseTemplate";
import { PDFArtstationProTemplate } from "@/components/resume/pdf/PDFArtstationProTemplate";
import { PDFInstagramCreativeTemplate } from "@/components/resume/pdf/PDFInstagramCreativeTemplate";
import { PDFPinterestDesignerTemplate } from "@/components/resume/pdf/PDFPinterestDesignerTemplate";
import { PDFYoutubeCreatorTemplate } from "@/components/resume/pdf/PDFYoutubeCreatorTemplate";
import { PDFTiktokContentCreatorTemplate } from "@/components/resume/pdf/PDFTiktokContentCreatorTemplate";
import { PDFVimeoVideographerTemplate } from "@/components/resume/pdf/PDFVimeoVideographerTemplate";
import { PDFSoundcloudArtistTemplate } from "@/components/resume/pdf/PDFSoundcloudArtistTemplate";
import { PDFSpotifyMusicianTemplate } from "@/components/resume/pdf/PDFSpotifyMusicianTemplate";
import { PDFTwitchStreamerCreativeTemplate } from "@/components/resume/pdf/PDFTwitchStreamerCreativeTemplate";
import { PDFDeviantartArtistTemplate } from "@/components/resume/pdf/PDFDeviantartArtistTemplate";
import { PDFPatreonCreativeTemplate } from "@/components/resume/pdf/PDFPatreonCreativeTemplate";
import { PDFMediumWriterCreativeTemplate } from "@/components/resume/pdf/PDFMediumWriterCreativeTemplate";
import { PDFSubstackAuthorTemplate } from "@/components/resume/pdf/PDFSubstackAuthorTemplate";
import { PDFPortfolioWebsiteCreativeTemplate } from "@/components/resume/pdf/PDFPortfolioWebsiteCreativeTemplate";
import { PDFOnlineGalleryArtistTemplate } from "@/components/resume/pdf/PDFOnlineGalleryArtistTemplate";
import { PDFSocialCreativeInfluencerTemplate } from "@/components/resume/pdf/PDFSocialCreativeInfluencerTemplate";
import { PDFMultiPlatformArtistTemplate } from "@/components/resume/pdf/PDFMultiPlatformArtistTemplate";
import { PDFDigitalArtistPortfolioTemplate } from "@/components/resume/pdf/PDFDigitalArtistPortfolioTemplate";
import { PDFFigmaDesignerPortfolioTemplate } from "@/components/resume/pdf/PDFFigmaDesignerPortfolioTemplate";
import { PDFAdobePortfolioDesignerTemplate } from "@/components/resume/pdf/PDFAdobePortfolioDesignerTemplate";
import { PDFSketchExpertPortfolioTemplate } from "@/components/resume/pdf/PDFSketchExpertPortfolioTemplate";
import { PDFWebflowDesignerPortfolioTemplate } from "@/components/resume/pdf/PDFWebflowDesignerPortfolioTemplate";
import { PDFFramerDesignerPortfolioTemplate } from "@/components/resume/pdf/PDFFramerDesignerPortfolioTemplate";
import { PDFUxfolioDesignerTemplate } from "@/components/resume/pdf/PDFUxfolioDesignerTemplate";
import { PDFCoroflotPortfolioTemplate } from "@/components/resume/pdf/PDFCoroflotPortfolioTemplate";
import { PDFCarbonmadeDesignerTemplate } from "@/components/resume/pdf/PDFCarbonmadeDesignerTemplate";
import { PDFAwwwardsDesignerTemplate } from "@/components/resume/pdf/PDFAwwwardsDesignerTemplate";
import { PDFUiuxPortfolioProTemplate } from "@/components/resume/pdf/PDFUiuxPortfolioProTemplate";
import { PDFDesignportfolioSpecialistTemplate } from "@/components/resume/pdf/PDFDesignportfolioSpecialistTemplate";
import { PDFCasestudyDesignerTemplate } from "@/components/resume/pdf/PDFCasestudyDesignerTemplate";
import { PDFProtfolioShowcaseUxTemplate } from "@/components/resume/pdf/PDFProtfolioShowcaseUxTemplate";
import { PDFInteractivePortfolioDesignerTemplate } from "@/components/resume/pdf/PDFInteractivePortfolioDesignerTemplate";
import { PDFUxResearcherPortfolioTemplate } from "@/components/resume/pdf/PDFUxResearcherPortfolioTemplate";
import { PDFProductDesignerShowcaseTemplate } from "@/components/resume/pdf/PDFProductDesignerShowcaseTemplate";
import { PDFDesignSystemsPortfolioTemplate } from "@/components/resume/pdf/PDFDesignSystemsPortfolioTemplate";
import { PDFMotionDesignerPortfolioTemplate } from "@/components/resume/pdf/PDFMotionDesignerPortfolioTemplate";
import { PDFVisualDesignerShowcaseTemplate } from "@/components/resume/pdf/PDFVisualDesignerShowcaseTemplate";
import { PDFDesignLeaderPortfolioTemplate } from "@/components/resume/pdf/PDFDesignLeaderPortfolioTemplate";
import { PDFAIEngineerTemplate } from "@/components/resume/pdf/PDFAIEngineerTemplate";
import { PDFAPIDocTemplate } from "@/components/resume/pdf/PDFAPIDocTemplate";
import { PDFAWSCloudEngineerTemplate } from "@/components/resume/pdf/PDFAWSCloudEngineerTemplate";
import { PDFAcademicEducatorTemplate } from "@/components/resume/pdf/PDFAcademicEducatorTemplate";
import { PDFAccountingExecutiveTemplate } from "@/components/resume/pdf/PDFAccountingExecutiveTemplate";
import { PDFAccountingProTemplate } from "@/components/resume/pdf/PDFAccountingProTemplate";
import { PDFAgileProjectLeadTemplate } from "@/components/resume/pdf/PDFAgileProjectLeadTemplate";
import { PDFAgileScrumTemplate } from "@/components/resume/pdf/PDFAgileScrumTemplate";
import { PDFAnalystTemplate } from "@/components/resume/pdf/PDFAnalystTemplate";
import { PDFAngularModernUniversalTemplate } from "@/components/resume/pdf/PDFAngularModernUniversalTemplate";
import { PDFArtDirectorModernTemplate } from "@/components/resume/pdf/PDFArtDirectorModernTemplate";
import { PDFArtStationArtistTemplate } from "@/components/resume/pdf/PDFArtStationArtistTemplate";
import { PDFArtisticGridTemplate } from "@/components/resume/pdf/PDFArtisticGridTemplate";
import { PDFAsymmetricLayoutUniversalTemplate } from "@/components/resume/pdf/PDFAsymmetricLayoutUniversalTemplate";
import { PDFAttorneyProfessionalTemplate } from "@/components/resume/pdf/PDFAttorneyProfessionalTemplate";
import { PDFAuditExpertTemplate } from "@/components/resume/pdf/PDFAuditExpertTemplate";
import { PDFAuditorTemplate } from "@/components/resume/pdf/PDFAuditorTemplate";
import { PDFAzureDevOpsProTemplate } from "@/components/resume/pdf/PDFAzureDevOpsProTemplate";
import { PDFAzureDevOpsSpecialistTemplate } from "@/components/resume/pdf/PDFAzureDevOpsSpecialistTemplate";
import { PDFBackendTemplate } from "@/components/resume/pdf/PDFBackendTemplate";
import { PDFBadgeStyleUniversalTemplate } from "@/components/resume/pdf/PDFBadgeStyleUniversalTemplate";
import { PDFBlockchainDevTemplate } from "@/components/resume/pdf/PDFBlockchainDevTemplate";
import { PDFBlueprintDesignTemplate } from "@/components/resume/pdf/PDFBlueprintDesignTemplate";
import { PDFBoldHeadlineTemplate } from "@/components/resume/pdf/PDFBoldHeadlineTemplate";
import { PDFBoldSectionHeadersUniversalTemplate } from "@/components/resume/pdf/PDFBoldSectionHeadersUniversalTemplate";
import { PDFBoldTypographyTemplate } from "@/components/resume/pdf/PDFBoldTypographyTemplate";
import { PDFBoldTypographyUniversalTemplate } from "@/components/resume/pdf/PDFBoldTypographyUniversalTemplate";
import { PDFBorderFrameUniversalTemplate } from "@/components/resume/pdf/PDFBorderFrameUniversalTemplate";
import { PDFBrandDesignerTemplate } from "@/components/resume/pdf/PDFBrandDesignerTemplate";
import { PDFBrandIdentityTemplate } from "@/components/resume/pdf/PDFBrandIdentityTemplate";
import { PDFBrandManagerTemplate } from "@/components/resume/pdf/PDFBrandManagerTemplate";
import { PDFBusinessCleanLayoutTemplate } from "@/components/resume/pdf/PDFBusinessCleanLayoutTemplate";
import { PDFBusinessClearTemplate } from "@/components/resume/pdf/PDFBusinessClearTemplate";
import { PDFBusinessModernGridTemplate } from "@/components/resume/pdf/PDFBusinessModernGridTemplate";
import { PDFBusinessSidebarProTemplate } from "@/components/resume/pdf/PDFBusinessSidebarProTemplate";
import { PDFBusinessSimpleModernTemplate } from "@/components/resume/pdf/PDFBusinessSimpleModernTemplate";
import { PDFCEOProfileTemplate } from "@/components/resume/pdf/PDFCEOProfileTemplate";
import { PDFCICDPipelineEngineerTemplate } from "@/components/resume/pdf/PDFCICDPipelineEngineerTemplate";
import { PDFCPAProfessionalTemplate } from "@/components/resume/pdf/PDFCPAProfessionalTemplate";
import { PDFChevronAccentUniversalTemplate } from "@/components/resume/pdf/PDFChevronAccentUniversalTemplate";
import { PDFCircularElementsUniversalTemplate } from "@/components/resume/pdf/PDFCircularElementsUniversalTemplate";
import { PDFClassicSerifUniversalTemplate } from "@/components/resume/pdf/PDFClassicSerifUniversalTemplate";
import { PDFCleanBasicExecutiveTemplate } from "@/components/resume/pdf/PDFCleanBasicExecutiveTemplate";
import { PDFCleanCorporateSimpleTemplate } from "@/components/resume/pdf/PDFCleanCorporateSimpleTemplate";
import { PDFCleanModernUniversalTemplate } from "@/components/resume/pdf/PDFCleanModernUniversalTemplate";
import { PDFCleanProfessionalSimpleTemplate } from "@/components/resume/pdf/PDFCleanProfessionalSimpleTemplate";
import { PDFCleanReadableProTemplate } from "@/components/resume/pdf/PDFCleanReadableProTemplate";
import { PDFCleanTwoColumnUniversalTemplate } from "@/components/resume/pdf/PDFCleanTwoColumnUniversalTemplate";
import { PDFClinicalExcellenceTemplate } from "@/components/resume/pdf/PDFClinicalExcellenceTemplate";
import { PDFClinicalMinimalTemplate } from "@/components/resume/pdf/PDFClinicalMinimalTemplate";
import { PDFCloudNativeTemplate } from "@/components/resume/pdf/PDFCloudNativeTemplate";
import { PDFCloudSolutionsArchitectTemplate } from "@/components/resume/pdf/PDFCloudSolutionsArchitectTemplate";
import { PDFCodeSnippetTemplate } from "@/components/resume/pdf/PDFCodeSnippetTemplate";
import { PDFCollageArtTemplate } from "@/components/resume/pdf/PDFCollageArtTemplate";
import { PDFColorBlockUniversalTemplate } from "@/components/resume/pdf/PDFColorBlockUniversalTemplate";
import { PDFColorSplashTemplate } from "@/components/resume/pdf/PDFColorSplashTemplate";
import { PDFCompactEliteUniversalTemplate } from "@/components/resume/pdf/PDFCompactEliteUniversalTemplate";
import { PDFComplianceOfficerTemplate } from "@/components/resume/pdf/PDFComplianceOfficerTemplate";
import { PDFConsultantTemplate } from "@/components/resume/pdf/PDFConsultantTemplate";
import { PDFContemporarySplitTemplate } from "@/components/resume/pdf/PDFContemporarySplitTemplate";
import { PDFCornerAccentUniversalTemplate } from "@/components/resume/pdf/PDFCornerAccentUniversalTemplate";
import { PDFCorporateBorderFrameTemplate } from "@/components/resume/pdf/PDFCorporateBorderFrameTemplate";
import { PDFCorporateEasyLayoutTemplate } from "@/components/resume/pdf/PDFCorporateEasyLayoutTemplate";
import { PDFCorporateEliteTemplate } from "@/components/resume/pdf/PDFCorporateEliteTemplate";
import { PDFCorporateLawTemplate } from "@/components/resume/pdf/PDFCorporateLawTemplate";
import { PDFCorporateLegalCounselTemplate } from "@/components/resume/pdf/PDFCorporateLegalCounselTemplate";
import { PDFCorporateMinimalistProTemplate } from "@/components/resume/pdf/PDFCorporateMinimalistProTemplate";
import { PDFCorporateSimpleTemplate } from "@/components/resume/pdf/PDFCorporateSimpleTemplate";
import { PDFCorporateVisionTemplate } from "@/components/resume/pdf/PDFCorporateVisionTemplate";
import { PDFCreativeAccentTemplate } from "@/components/resume/pdf/PDFCreativeAccentTemplate";
import { PDFCreativeShowcaseGridTemplate } from "@/components/resume/pdf/PDFCreativeShowcaseGridTemplate";
import { PDFCyberSecurityTemplate } from "@/components/resume/pdf/PDFCyberSecurityTemplate";
import { PDFDarkModeDevTemplate } from "@/components/resume/pdf/PDFDarkModeDevTemplate";
import { PDFDataScienceTemplate } from "@/components/resume/pdf/PDFDataScienceTemplate";
import { PDFDevOpsAutomationTemplate } from "@/components/resume/pdf/PDFDevOpsAutomationTemplate";
import { PDFDevOpsEngineerTemplate } from "@/components/resume/pdf/PDFDevOpsEngineerTemplate";
import { PDFDevOpsProTemplate } from "@/components/resume/pdf/PDFDevOpsProTemplate";
import { PDFDevSecOpsEngineerTemplate } from "@/components/resume/pdf/PDFDevSecOpsEngineerTemplate";
import { PDFDeviantArtCreatorTemplate } from "@/components/resume/pdf/PDFDeviantArtCreatorTemplate";
import { PDFDiagonalAccentUniversalTemplate } from "@/components/resume/pdf/PDFDiagonalAccentUniversalTemplate";
import { PDFDiamondAccentUniversalTemplate } from "@/components/resume/pdf/PDFDiamondAccentUniversalTemplate";
import { PDFDigitalCanvasTemplate } from "@/components/resume/pdf/PDFDigitalCanvasTemplate";
import { PDFDigitalMarketerTemplate } from "@/components/resume/pdf/PDFDigitalMarketerTemplate";
import { PDFDigitalMarketingProTemplate } from "@/components/resume/pdf/PDFDigitalMarketingProTemplate";
import { PDFDirectorLevelTemplate } from "@/components/resume/pdf/PDFDirectorLevelTemplate";
import { PDFDjangoFrameworkProTemplate } from "@/components/resume/pdf/PDFDjangoFrameworkProTemplate";
import { PDFDockerContainerProTemplate } from "@/components/resume/pdf/PDFDockerContainerProTemplate";
import { PDFDotNetCoreDeveloperTemplate } from "@/components/resume/pdf/PDFDotNetCoreDeveloperTemplate";
import { PDFDotNetDeveloperTemplate } from "@/components/resume/pdf/PDFDotNetDeveloperTemplate";
import { PDFDottedGridUniversalTemplate } from "@/components/resume/pdf/PDFDottedGridUniversalTemplate";
import { PDFDualToneTemplate } from "@/components/resume/pdf/PDFDualToneTemplate";
import { PDFEditorialStyleTemplate } from "@/components/resume/pdf/PDFEditorialStyleTemplate";
import { PDFEducatorModernTemplate } from "@/components/resume/pdf/PDFEducatorModernTemplate";
import { PDFElasticsearchDevTemplate } from "@/components/resume/pdf/PDFElasticsearchDevTemplate";
import { PDFElegantSerifTemplate } from "@/components/resume/pdf/PDFElegantSerifTemplate";
import { PDFExecutiveTemplate } from "@/components/resume/pdf/PDFExecutiveTemplate";
import { PDFExecutiveCleanSplitTemplate } from "@/components/resume/pdf/PDFExecutiveCleanSplitTemplate";
import { PDFExecutiveCornerAccentTemplate } from "@/components/resume/pdf/PDFExecutiveCornerAccentTemplate";
import { PDFExecutiveDirectLayoutTemplate } from "@/components/resume/pdf/PDFExecutiveDirectLayoutTemplate";
import { PDFExecutiveEasyTemplate } from "@/components/resume/pdf/PDFExecutiveEasyTemplate";
import { PDFExecutiveLeadershipTemplate } from "@/components/resume/pdf/PDFExecutiveLeadershipTemplate";
import { PDFExecutiveLetterheadUniversalTemplate } from "@/components/resume/pdf/PDFExecutiveLetterheadUniversalTemplate";
import { PDFExecutivePlainLayoutTemplate } from "@/components/resume/pdf/PDFExecutivePlainLayoutTemplate";
import { PDFExecutiveSalesLeaderTemplate } from "@/components/resume/pdf/PDFExecutiveSalesLeaderTemplate";
import { PDFExecutiveSimpleCleanTemplate } from "@/components/resume/pdf/PDFExecutiveSimpleCleanTemplate";
import { PDFExecutiveSplitDesignTemplate } from "@/components/resume/pdf/PDFExecutiveSplitDesignTemplate";
import { PDFExecutiveTimelineModernTemplate } from "@/components/resume/pdf/PDFExecutiveTimelineModernTemplate";
import { PDFFinanceAnalystTemplate } from "@/components/resume/pdf/PDFFinanceAnalystTemplate";
import { PDFFinanceTwoColumnTemplate } from "@/components/resume/pdf/PDFFinanceTwoColumnTemplate";
import { PDFFinancialAnalystTemplate } from "@/components/resume/pdf/PDFFinancialAnalystTemplate";
import { PDFFlutterMobileDevTemplate } from "@/components/resume/pdf/PDFFlutterMobileDevTemplate";
import { PDFFresherTemplate } from "@/components/resume/pdf/PDFFresherTemplate";
import { PDFFresherAcademicStyleTemplate } from "@/components/resume/pdf/PDFFresherAcademicStyleTemplate";
import { PDFFresherBoxShadowTemplate } from "@/components/resume/pdf/PDFFresherBoxShadowTemplate";
import { PDFFresherCircularProgressTemplate } from "@/components/resume/pdf/PDFFresherCircularProgressTemplate";
import { PDFFresherDashBorderTemplate } from "@/components/resume/pdf/PDFFresherDashBorderTemplate";
import { PDFFresherDoubleColumnTemplate } from "@/components/resume/pdf/PDFFresherDoubleColumnTemplate";
import { PDFFresherGlassmorphismTemplate } from "@/components/resume/pdf/PDFFresherGlassmorphismTemplate";
import { PDFFresherGradientBorderTemplate } from "@/components/resume/pdf/PDFFresherGradientBorderTemplate";
import { PDFFresherIconographyTemplate } from "@/components/resume/pdf/PDFFresherIconographyTemplate";
import { PDFFresherLeftStripeTemplate } from "@/components/resume/pdf/PDFFresherLeftStripeTemplate";
import { PDFFresherLightweightTemplate } from "@/components/resume/pdf/PDFFresherLightweightTemplate";
import { PDFFresherModernSplitTemplate } from "@/components/resume/pdf/PDFFresherModernSplitTemplate";
import { PDFFresherModernTabsTemplate } from "@/components/resume/pdf/PDFFresherModernTabsTemplate";
import { PDFFresherNeonAccentTemplate } from "@/components/resume/pdf/PDFFresherNeonAccentTemplate";
import { PDFFresherPolaroidStyleTemplate } from "@/components/resume/pdf/PDFFresherPolaroidStyleTemplate";
import { PDFFresherProgressiveTemplate } from "@/components/resume/pdf/PDFFresherProgressiveTemplate";
import { PDFFresherRibbonStyleTemplate } from "@/components/resume/pdf/PDFFresherRibbonStyleTemplate";
import { PDFFresherStepByStepTemplate } from "@/components/resume/pdf/PDFFresherStepByStepTemplate";
import { PDFFresherTimelineDotsTemplate } from "@/components/resume/pdf/PDFFresherTimelineDotsTemplate";
import { PDFFresherTopBottomTemplate } from "@/components/resume/pdf/PDFFresherTopBottomTemplate";
import { PDFFresherWaveHeaderTemplate } from "@/components/resume/pdf/PDFFresherWaveHeaderTemplate";
import { PDFFrontendTemplate } from "@/components/resume/pdf/PDFFrontendTemplate";
import { PDFFullStackEngineerTemplate } from "@/components/resume/pdf/PDFFullStackEngineerTemplate";
import { PDFFullStackModernTemplate } from "@/components/resume/pdf/PDFFullStackModernTemplate";
import { PDFFullStackProTemplate } from "@/components/resume/pdf/PDFFullStackProTemplate";
import { PDFFullstackTemplate } from "@/components/resume/pdf/PDFFullstackTemplate";
import { PDFFullstackJavaScriptTemplate } from "@/components/resume/pdf/PDFFullstackJavaScriptTemplate";
import { PDFGCPArchitectTemplate } from "@/components/resume/pdf/PDFGCPArchitectTemplate";
import { PDFGalleryLayoutTemplate } from "@/components/resume/pdf/PDFGalleryLayoutTemplate";
import { PDFGeometricCreativeTemplate } from "@/components/resume/pdf/PDFGeometricCreativeTemplate";
import { PDFGeometricShapesUniversalTemplate } from "@/components/resume/pdf/PDFGeometricShapesUniversalTemplate";
import { PDFGitHubDeveloperTemplate } from "@/components/resume/pdf/PDFGitHubDeveloperTemplate";
import { PDFGitHubProfileTemplate } from "@/components/resume/pdf/PDFGitHubProfileTemplate";
import { PDFGitHubStudentDeveloperTemplate } from "@/components/resume/pdf/PDFGitHubStudentDeveloperTemplate";
import { PDFGitHubStyleTemplate } from "@/components/resume/pdf/PDFGitHubStyleTemplate";
import { PDFGradientHeaderUniversalTemplate } from "@/components/resume/pdf/PDFGradientHeaderUniversalTemplate";
import { PDFGraduateTemplate } from "@/components/resume/pdf/PDFGraduateTemplate";
import { PDFGraphQLArchitectTemplate } from "@/components/resume/pdf/PDFGraphQLArchitectTemplate";
import { PDFGraphQLDeveloperTemplate } from "@/components/resume/pdf/PDFGraphQLDeveloperTemplate";
import { PDFGraphicDesignProTemplate } from "@/components/resume/pdf/PDFGraphicDesignProTemplate";
import { PDFHealthcareProfessionalTemplate } from "@/components/resume/pdf/PDFHealthcareProfessionalTemplate";
import { PDFHealthcareTwoColumnTemplate } from "@/components/resume/pdf/PDFHealthcareTwoColumnTemplate";
import { PDFHexagonalPatternUniversalTemplate } from "@/components/resume/pdf/PDFHexagonalPatternUniversalTemplate";
import { PDFIconBarUniversalTemplate } from "@/components/resume/pdf/PDFIconBarUniversalTemplate";
import { PDFIllustrationPortfolioTemplate } from "@/components/resume/pdf/PDFIllustrationPortfolioTemplate";
import { PDFInVisionPrototyperTemplate } from "@/components/resume/pdf/PDFInVisionPrototyperTemplate";
import { PDFInfinityLoopUniversalTemplate } from "@/components/resume/pdf/PDFInfinityLoopUniversalTemplate";
import { PDFInkBrushTemplate } from "@/components/resume/pdf/PDFInkBrushTemplate";
import { PDFJAMStackDeveloperTemplate } from "@/components/resume/pdf/PDFJAMStackDeveloperTemplate";
import { PDFJavaEnterpriseTemplate } from "@/components/resume/pdf/PDFJavaEnterpriseTemplate";
import { PDFJsonResumeTemplate } from "@/components/resume/pdf/PDFJsonResumeTemplate";
import { PDFKafkaStreamingExpertTemplate } from "@/components/resume/pdf/PDFKafkaStreamingExpertTemplate";
import { PDFKuberneteEngineerTemplate } from "@/components/resume/pdf/PDFKuberneteEngineerTemplate";
import { PDFKubernetesSpecialistTemplate } from "@/components/resume/pdf/PDFKubernetesSpecialistTemplate";
import { PDFLayeredCardsUniversalTemplate } from "@/components/resume/pdf/PDFLayeredCardsUniversalTemplate";
import { PDFLegalAdvisorTemplate } from "@/components/resume/pdf/PDFLegalAdvisorTemplate";
import { PDFLegalCounselTemplate } from "@/components/resume/pdf/PDFLegalCounselTemplate";
import { PDFLegalExecutiveTemplate } from "@/components/resume/pdf/PDFLegalExecutiveTemplate";
import { PDFLinkedInReadyGraduateTemplate } from "@/components/resume/pdf/PDFLinkedInReadyGraduateTemplate";
import { PDFLinkedInTechProTemplate } from "@/components/resume/pdf/PDFLinkedInTechProTemplate";
import { PDFLuxuryTimelineTemplate } from "@/components/resume/pdf/PDFLuxuryTimelineTemplate";
import { PDFMagazineCreativeTemplate } from "@/components/resume/pdf/PDFMagazineCreativeTemplate";
import { PDFMagazineLayoutUniversalTemplate } from "@/components/resume/pdf/PDFMagazineLayoutUniversalTemplate";
import { PDFMarketingProfessionalTemplate } from "@/components/resume/pdf/PDFMarketingProfessionalTemplate";
import { PDFMarketingStrategistTemplate } from "@/components/resume/pdf/PDFMarketingStrategistTemplate";
import { PDFMedicalCertificationTemplate } from "@/components/resume/pdf/PDFMedicalCertificationTemplate";
import { PDFMedicalExecutiveTemplate } from "@/components/resume/pdf/PDFMedicalExecutiveTemplate";
import { PDFMedicalProfessionalTemplate } from "@/components/resume/pdf/PDFMedicalProfessionalTemplate";
import { PDFMedicalResearchTemplate } from "@/components/resume/pdf/PDFMedicalResearchTemplate";

import { PDFMicroservicesDevTemplate } from "@/components/resume/pdf/PDFMicroservicesDevTemplate";
import { PDFMicroservicesExpertTemplate } from "@/components/resume/pdf/PDFMicroservicesExpertTemplate";
import { PDFMinimalTemplate } from "@/components/resume/pdf/PDFMinimalTemplate";
import { PDFMinimalChicTemplate } from "@/components/resume/pdf/PDFMinimalChicTemplate";
import { PDFMinimalCorporateProTemplate } from "@/components/resume/pdf/PDFMinimalCorporateProTemplate";
import { PDFMinimalDirectTemplate } from "@/components/resume/pdf/PDFMinimalDirectTemplate";
import { PDFMinimalEleganceUniversalTemplate } from "@/components/resume/pdf/PDFMinimalEleganceUniversalTemplate";
import { PDFMinimalLinesUniversalTemplate } from "@/components/resume/pdf/PDFMinimalLinesUniversalTemplate";
import { PDFMinimalProLayoutTemplate } from "@/components/resume/pdf/PDFMinimalProLayoutTemplate";
import { PDFMinimalistModernProTemplate } from "@/components/resume/pdf/PDFMinimalistModernProTemplate";
import { PDFMinimalistProSimpleTemplate } from "@/components/resume/pdf/PDFMinimalistProSimpleTemplate";
import { PDFMobileDevTemplate } from "@/components/resume/pdf/PDFMobileDevTemplate";
import { PDFModernTemplate } from "@/components/resume/pdf/PDFModernTemplate";
import { PDFModernArtistTemplate } from "@/components/resume/pdf/PDFModernArtistTemplate";
import { PDFModernClearProTemplate } from "@/components/resume/pdf/PDFModernClearProTemplate";
import { PDFModernCorporateGridTemplate } from "@/components/resume/pdf/PDFModernCorporateGridTemplate";
import { PDFModernEducatorProfessionTemplate } from "@/components/resume/pdf/PDFModernEducatorProfessionTemplate";
import { PDFModernMinimalistUniversalTemplate } from "@/components/resume/pdf/PDFModernMinimalistUniversalTemplate";
import { PDFModernPlainProTemplate } from "@/components/resume/pdf/PDFModernPlainProTemplate";
import { PDFModernProfessionalBoxTemplate } from "@/components/resume/pdf/PDFModernProfessionalBoxTemplate";
import { PDFModernSimpleProTemplate } from "@/components/resume/pdf/PDFModernSimpleProTemplate";
import { PDFMongoDBSpecialistTemplate } from "@/components/resume/pdf/PDFMongoDBSpecialistTemplate";
import { PDFMonochromeElegantUniversalTemplate } from "@/components/resume/pdf/PDFMonochromeElegantUniversalTemplate";
import { PDFMonospaceTechTemplate } from "@/components/resume/pdf/PDFMonospaceTechTemplate";
import { PDFMotionGraphicsArtistTemplate } from "@/components/resume/pdf/PDFMotionGraphicsArtistTemplate";
import { PDFNeonArtistTemplate } from "@/components/resume/pdf/PDFNeonArtistTemplate";
import { PDFNestJSBackendTemplate } from "@/components/resume/pdf/PDFNestJSBackendTemplate";
import { PDFNewspaperStyleUniversalTemplate } from "@/components/resume/pdf/PDFNewspaperStyleUniversalTemplate";
import { PDFNextJSFullstackTemplate } from "@/components/resume/pdf/PDFNextJSFullstackTemplate";
import { PDFNodeBackendSpecialistTemplate } from "@/components/resume/pdf/PDFNodeBackendSpecialistTemplate";
import { PDFNodeJSDeveloperTemplate } from "@/components/resume/pdf/PDFNodeJSDeveloperTemplate";
import { PDFNurseSpecialistTemplate } from "@/components/resume/pdf/PDFNurseSpecialistTemplate";
import { PDFNursingSpecialistTemplate } from "@/components/resume/pdf/PDFNursingSpecialistTemplate";
import { PDFOpenSourceTemplate } from "@/components/resume/pdf/PDFOpenSourceTemplate";
import { PDFOperationsExcellenceTemplate } from "@/components/resume/pdf/PDFOperationsExcellenceTemplate";
import { PDFOperationsManagerTemplate } from "@/components/resume/pdf/PDFOperationsManagerTemplate";
import { PDFOperationsTwoColumnTemplate } from "@/components/resume/pdf/PDFOperationsTwoColumnTemplate";
import { PDFPMExecutiveTemplate } from "@/components/resume/pdf/PDFPMExecutiveTemplate";
import { PDFParalegalTemplate } from "@/components/resume/pdf/PDFParalegalTemplate";
import { PDFParallaxStyleUniversalTemplate } from "@/components/resume/pdf/PDFParallaxStyleUniversalTemplate";
import { PDFPastelCreativeTemplate } from "@/components/resume/pdf/PDFPastelCreativeTemplate";
import { PDFPhDCandidateTemplate } from "@/components/resume/pdf/PDFPhDCandidateTemplate";
import { PDFPhotographyLayoutTemplate } from "@/components/resume/pdf/PDFPhotographyLayoutTemplate";
import { PDFPhotographyProTemplate } from "@/components/resume/pdf/PDFPhotographyProTemplate";
import { PDFPortfolioMinimalistTemplate } from "@/components/resume/pdf/PDFPortfolioMinimalistTemplate";
import { PDFPortfolioShowcaseTemplate } from "@/components/resume/pdf/PDFPortfolioShowcaseTemplate";
import { PDFPostgreSQLDBATemplate } from "@/components/resume/pdf/PDFPostgreSQLDBATemplate";
import { PDFPostgreSQLExpertTemplate } from "@/components/resume/pdf/PDFPostgreSQLExpertTemplate";
import { PDFProcessImprovementTemplate } from "@/components/resume/pdf/PDFProcessImprovementTemplate";
import { PDFProductDesignerUXTemplate } from "@/components/resume/pdf/PDFProductDesignerUXTemplate";
import { PDFProfessionalTemplate } from "@/components/resume/pdf/PDFProfessionalTemplate";
import { PDFProfessionalAccentBarTemplate } from "@/components/resume/pdf/PDFProfessionalAccentBarTemplate";
import { PDFProfessionalBasicModernTemplate } from "@/components/resume/pdf/PDFProfessionalBasicModernTemplate";
import { PDFProfessionalCleanSimpleTemplate } from "@/components/resume/pdf/PDFProfessionalCleanSimpleTemplate";
import { PDFProfessionalCompactUniversalTemplate } from "@/components/resume/pdf/PDFProfessionalCompactUniversalTemplate";
import { PDFProfessionalDividerTemplate } from "@/components/resume/pdf/PDFProfessionalDividerTemplate";
import { PDFProfessionalEasyReadTemplate } from "@/components/resume/pdf/PDFProfessionalEasyReadTemplate";
import { PDFProfessionalHeaderBannerTemplate } from "@/components/resume/pdf/PDFProfessionalHeaderBannerTemplate";
import { PDFProfessionalModernEdgeTemplate } from "@/components/resume/pdf/PDFProfessionalModernEdgeTemplate";
import { PDFProfessionalPlainSimpleTemplate } from "@/components/resume/pdf/PDFProfessionalPlainSimpleTemplate";
import { PDFProfessionalReadableLayoutTemplate } from "@/components/resume/pdf/PDFProfessionalReadableLayoutTemplate";
import { PDFProfessionalStraightforwardTemplate } from "@/components/resume/pdf/PDFProfessionalStraightforwardTemplate";
import { PDFProfessionalVerticalLineTemplate } from "@/components/resume/pdf/PDFProfessionalVerticalLineTemplate";
import { PDFProjectManagerPMPTemplate } from "@/components/resume/pdf/PDFProjectManagerPMPTemplate";
import { PDFProjectManagerProTemplate } from "@/components/resume/pdf/PDFProjectManagerProTemplate";
import { PDFPyTorchDeveloperTemplate } from "@/components/resume/pdf/PDFPyTorchDeveloperTemplate";
import { PDFPythonDeveloperProTemplate } from "@/components/resume/pdf/PDFPythonDeveloperProTemplate";
import { PDFRabbitMQSpecialistTemplate } from "@/components/resume/pdf/PDFRabbitMQSpecialistTemplate";
import { PDFReactFrontendProTemplate } from "@/components/resume/pdf/PDFReactFrontendProTemplate";
import { PDFReactNativeExpertTemplate } from "@/components/resume/pdf/PDFReactNativeExpertTemplate";
import { PDFRedisCacheSpecialistTemplate } from "@/components/resume/pdf/PDFRedisCacheSpecialistTemplate";
import { PDFRefinedTemplate } from "@/components/resume/pdf/PDFRefinedTemplate";
import { PDFRetroProfessionalUniversalTemplate } from "@/components/resume/pdf/PDFRetroProfessionalUniversalTemplate";

import { PDFRoundedCornersUniversalTemplate } from "@/components/resume/pdf/PDFRoundedCornersUniversalTemplate";
import { PDFRustDeveloperProTemplate } from "@/components/resume/pdf/PDFRustDeveloperProTemplate";
import { PDFSalesAchievementTemplate } from "@/components/resume/pdf/PDFSalesAchievementTemplate";
import { PDFSalesExecutiveTemplate } from "@/components/resume/pdf/PDFSalesExecutiveTemplate";
import { PDFSalesManagerTemplate } from "@/components/resume/pdf/PDFSalesManagerTemplate";
import { PDFSalesMarketingHybridTemplate } from "@/components/resume/pdf/PDFSalesMarketingHybridTemplate";
import { PDFSapphireExecutiveTemplate } from "@/components/resume/pdf/PDFSapphireExecutiveTemplate";
import { PDFScalaEngineerTemplate } from "@/components/resume/pdf/PDFScalaEngineerTemplate";
import { PDFSeniorTemplate } from "@/components/resume/pdf/PDFSeniorTemplate";
import { PDFSeniorDevOpsEngineerTemplate } from "@/components/resume/pdf/PDFSeniorDevOpsEngineerTemplate";
import { PDFSeniorDotNetDeveloperTemplate } from "@/components/resume/pdf/PDFSeniorDotNetDeveloperTemplate";
import { PDFSeniorFullStackDeveloperTemplate } from "@/components/resume/pdf/PDFSeniorFullStackDeveloperTemplate";
import { PDFServerlessDeveloperTemplate } from "@/components/resume/pdf/PDFServerlessDeveloperTemplate";
import { PDFSwissStyleUniversalTemplate } from "@/components/resume/pdf/PDFSwissStyleUniversalTemplate";
import { PDFSystemArchitectTemplate } from "@/components/resume/pdf/PDFSystemArchitectTemplate";
import { PDFTaxSpecialistTemplate } from "@/components/resume/pdf/PDFTaxSpecialistTemplate";
import { PDFTeacherProfessionalTemplate } from "@/components/resume/pdf/PDFTeacherProfessionalTemplate";
import { PDFTeachingCertifiedTemplate } from "@/components/resume/pdf/PDFTeachingCertifiedTemplate";
import { PDFTeachingExcellenceTemplate } from "@/components/resume/pdf/PDFTeachingExcellenceTemplate";
import { PDFTechGridTemplate } from "@/components/resume/pdf/PDFTechGridTemplate";
import { PDFTechLeadTemplate } from "@/components/resume/pdf/PDFTechLeadTemplate";
import { PDFTensorFlowMLEngineerTemplate } from "@/components/resume/pdf/PDFTensorFlowMLEngineerTemplate";
import { PDFTerminalConsoleTemplate } from "@/components/resume/pdf/PDFTerminalConsoleTemplate";
import { PDFTerraformDevOpsTemplate } from "@/components/resume/pdf/PDFTerraformDevOpsTemplate";
import { PDFThinBorderUniversalTemplate } from "@/components/resume/pdf/PDFThinBorderUniversalTemplate";
import { PDFThreeDModelingArtistTemplate } from "@/components/resume/pdf/PDFThreeDModelingArtistTemplate";
import { PDFTikTokCreatorTemplate } from "@/components/resume/pdf/PDFTikTokCreatorTemplate";
import { PDFTimelineVerticalUniversalTemplate } from "@/components/resume/pdf/PDFTimelineVerticalUniversalTemplate";
import { PDFTopBarUniversalTemplate } from "@/components/resume/pdf/PDFTopBarUniversalTemplate";
import { PDFTriangularElementsUniversalTemplate } from "@/components/resume/pdf/PDFTriangularElementsUniversalTemplate";
import { PDFTwoToneSplitUniversalTemplate } from "@/components/resume/pdf/PDFTwoToneSplitUniversalTemplate";
import { PDFTypeScriptExpertTemplate } from "@/components/resume/pdf/PDFTypeScriptExpertTemplate";
import { PDFTypewriterStyleTemplate } from "@/components/resume/pdf/PDFTypewriterStyleTemplate";
import { PDFUIUXDesignerProTemplate } from "@/components/resume/pdf/PDFUIUXDesignerProTemplate";
import { PDFUrbanDesignerTemplate } from "@/components/resume/pdf/PDFUrbanDesignerTemplate";
import { PDFVPExecutiveTemplate } from "@/components/resume/pdf/PDFVPExecutiveTemplate";
import { PDFVerticalTimelineUniversalTemplate } from "@/components/resume/pdf/PDFVerticalTimelineUniversalTemplate";
import { PDFVideoEditorCreativeTemplate } from "@/components/resume/pdf/PDFVideoEditorCreativeTemplate";
import { PDFVintagePosterTemplate } from "@/components/resume/pdf/PDFVintagePosterTemplate";
import { PDFVisualStorytellerTemplate } from "@/components/resume/pdf/PDFVisualStorytellerTemplate";
import { PDFVueJSDeveloperTemplate } from "@/components/resume/pdf/PDFVueJSDeveloperTemplate";
import { PDFWatermarkStyleUniversalTemplate } from "@/components/resume/pdf/PDFWatermarkStyleUniversalTemplate";
import { PDFWavePatternUniversalTemplate } from "@/components/resume/pdf/PDFWavePatternUniversalTemplate";
import { PDFWebAssemblyEngineerTemplate } from "@/components/resume/pdf/PDFWebAssemblyEngineerTemplate";
import { PDFWebDesignerModernTemplate } from "@/components/resume/pdf/PDFWebDesignerModernTemplate";
import { PDFWideMarginUniversalTemplate } from "@/components/resume/pdf/PDFWideMarginUniversalTemplate";
import { PDFYouTubeEducatorTemplate } from "@/components/resume/pdf/PDFYouTubeEducatorTemplate";
import { PDFZigzagBorderUniversalTemplate } from "@/components/resume/pdf/PDFZigzagBorderUniversalTemplate";
import { PDFiOSSwiftEngineerTemplate } from "@/components/resume/pdf/PDFiOSSwiftEngineerTemplate";
import { registerPDFFonts } from "@/lib/pdfFonts";
import { templateMetaMap, categoryLabelMap } from "@/constants/templateMeta";
import { analyzeResumeForATS, type AtsReport } from "@/lib/atsAnalyzer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ATSScoreButton } from "@/components/ATSScoreButton";

const gradeMap: Record<AtsReport["grade"], { label: string; tone: string }> = {
  excellent: { label: "ATS ready", tone: "text-emerald-600" },
  strong: { label: "Strong match", tone: "text-blue-600" },
  good: { label: "Good foundation", tone: "text-green-600" },
  fair: { label: "Needs refinement", tone: "text-amber-600" },
  poor: { label: "High risk", tone: "text-rose-600" },
};


const formatTemplateName = (id?: string) => {
  if (!id) return "Professional";
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const Editor = () => {
  const { templateId, professionId } = useParams<{ templateId: string; professionId?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const { user } = useFirebaseAuth();
  const { resumeData, setResumeData, themeColor, setThemeColor, setTemplateId } = useResumeData();

  // Update template ID in context when route changes
  useEffect(() => {
    if (templateId) {
      setTemplateId(templateId);
    }
  }, [templateId, setTemplateId]);
  const [atsReport, setAtsReport] = useState<AtsReport | null>(null);
  const [atsDialogOpen, setAtsDialogOpen] = useState(false);
  const [atsLoading, setAtsLoading] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);

  // Register fonts for PDF generation
  useEffect(() => {
    registerPDFFonts();
  }, []);


  // Load resume from Firestore if resumeId exists
  useEffect(() => {
    const loadResumeFromFirestore = async () => {
      if (!resumeId || !user) return;

      try {
        const resume = await resumeService.getResume(resumeId);
        if (resume && resume.data) {
          // Sanitize the data to ensure all array fields are valid arrays
          const sanitizedData = sanitizeResumeData(resume.data);
          setResumeData(sanitizedData);
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

  // Sync currentResumeId with resumeId from URL parameters
  useEffect(() => {
    setCurrentResumeId(resumeId);
  }, [resumeId]);

  const handleSave = async () => {
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
      const resumeDataToSave: ResumeData = {
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
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Sanitize resume data to ensure all arrays are valid before PDF generation
      const sanitizedData = sanitizeResumeData(resumeData);

      // Select the appropriate PDF template
      const pdfTemplates = {
        professional: ProfessionalPDF,
        modern: ModernPDF,
        minimal: MinimalPDF,
        executive: ExecutivePDF,
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
        "corporate-executive": CorporateExecutivePDF,
        refined: RefinedPDF,
        "premium-elite": PremiumElitePDF,
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
        // New Professional Templates (22 new registrations)
        "algo-engineer": AlgoEngineerPDF,
        "artistic-bold": ArtisticBoldPDF,
        "asymmetric-creative": AsymmetricCreativePDF,
        "bordered-elegance": BorderedElegancePDF,
        "code-minimal": CodeMinimalPDF,
        "colorful-modern": ColorfulModernPDF,
        "column-divide": ColumnDividePDF,
        "compact-professional": CompactProfessionalPDF,
        "creative-timeline": CreativeTimelinePDF,
        "designer-showcase": DesignerShowcasePDF,
        "developer-grid": DeveloperGridPDF,
        "devops-pro": DevOpsProPDF,
        "executive-minimal": ExecutiveMinimalPDF,
        "fullstack-modern": FullStackModernPDF,
        "github-style": GitHubStylePDF,
        "ml-engineer": MLEngineerPDF,
        "sidebar-accent": SidebarAccentPDF,
        "tech-stack-pro": TechStackProPDF,
        "terminal-theme": TerminalThemePDF,
        "two-tone-classic": TwoToneClassicPDF,
        // Universal Professional PDF Templates
        "swiss-style-universal": PDFSwissStyleUniversalTemplate,
        "executive-letterhead-universal": PDFExecutiveLetterheadUniversalTemplate,
        "diagonal-accent-universal": PDFDiagonalAccentUniversalTemplate,
        "border-frame-universal": PDFBorderFrameUniversalTemplate,
        "code-craftsman": CodeCraftsmanPDF,
        "tech-pioneer": TechPioneerPDF,
        "dev-architecture": DevArchitecturePDF,
        "software-master": SoftwareMasterPDF,
        "tech-vanguard": TechVanguardPDF,
        "code-sphere": CodeSpherePDF,
        "dev-elite": DevElitePDF,
        "tech-horizon": TechHorizonPDF,
        "software-craftsman": SoftwareCraftsmanPDF,
        "code-vision": CodeVisionPDF,
        "dev-prime": DevPrimePDF,
        "tech-crafted": TechCraftedPDF,
        "software-vision": SoftwareVisionPDF,
        "code-pinnacle": CodePinnaclePDF,
        "dev-momentum": DevMomentumPDF,
        "creative-canvas": CreativeCanvasPDF,
        "design-maestro": DesignMaestroPDF,
        "artistic-vision": ArtisticVisionPDF,
        "creative-pulse": CreativePulsePDF,
        "design-pinnacle": DesignPinnaclePDF,
        "artistic-horizon": ArtisticHorizonPDF,
        "creative-crafted": CreativeCraftedPDF,
        "design-sphere": DesignSpherePDF,
        "artistic-momentum": ArtisticMomentumPDF,
        "creative-horizon": CreativeHorizonPDF,
        "graduate-momentum": GraduateMomentumPDF,
        "entry-elite": EntryElitePDF,
        "freshers-vision": FreshersVisionPDF,
        "graduate-prime": GraduatePrimePDF,
        "entry-horizon": EntryHorizonPDF,
        "freshers-crafted": FreshersCraftedPDF,
        "graduate-zenith": GraduateZenithPDF,
        "entry-sphere": EntrySpherePDF,
        // 2025 New Templates (100 pdfTemplates map entries)
        "strategic-leadership": StrategicLeadershipPDF,
        "corporate-excellence": CorporateExcellencePDF,
        "executive-prestige": ExecutivePrestigePDF,
        "global-executive-pro": GlobalExecutiveProPDF,
        "premium-corporate-edge": PremiumCorporateEdgePDF,
        "enterprise-leader": EnterpriseLeaderPDF,
        "boardroom-ready": BoardroomReadyPDF,
        "c-suite-modern": CSuiteModernPDF,
        "executive-impact": ExecutiveImpactPDF,
        "corporate-visionary": CorporateVisionaryPDF,
        "platinum-executive": PlatinumExecutivePDF,
        "global-leadership": GlobalLeadershipPDF,
        "senior-executive-pro": SeniorExecutiveProPDF,
        "corporate-elite-plus": CorporateElitePlusPDF,
        "executive-pinnacle": ExecutivePinnaclePDF,
        "corporate-distinction": CorporateDistinctionPDF,
        "leadership-summit": LeadershipSummitPDF,
        "executive-authority": ExecutiveAuthorityPDF,
        "corporate-premier": CorporatePremierPDF,
        "global-enterprise": GlobalEnterprisePDF,
        "executive-signature": ExecutiveSignaturePDF,
        "corporate-apex": CorporateApexPDF,
        "strategic-executive-plus": StrategicExecutivePlusPDF,
        "corporate-paradigm": CorporateParadigmPDF,
        "executive-magnitude": ExecutiveMagnitudePDF,
        "corporate-sovereign": CorporateSovereignPDF,
        "leadership-zenith": LeadershipZenithPDF,
        "executive-nexus": ExecutiveNexusPDF,
        "corporate-vanguard": CorporateVanguardPDF,
        "executive-ascendancy": ExecutiveAscendancyPDF,
        "vue-specialist": VueSpecialistPDF,
        "svelte-developer": SvelteDeveloperPDF,
        "flutter-engineer": FlutterEngineerPDF,
        "swift-ios-developer": SwiftIOSDeveloperPDF,
        "rust-systems-engineer": RustSystemsEngineerPDF,
        "scala-backend-engineer": ScalaBackendEngineerPDF,
        "elixir-developer": ElixirDeveloperPDF,
        "graphql-architect": GraphQLArchitectPDF,
        "typescript-expert": TypeScriptExpertPDF,
        "nextjs-fullstack": NextJSFullstackPDF,
        "nestjs-backend": NestJSBackendPDF,
        "django-fullstack": DjangoFullstackPDF,
        "spring-boot-developer": SpringBootDeveloperPDF,
        "postgresql-dba": PostgreSQLDBAPDF,
        "mongodb-specialist": MongoDBSpecialistPDF,
        "redis-engineer": RedisEngineerPDF,
        "elasticsearch-expert": ElasticsearchExpertPDF,
        "terraform-devops": TerraformDevOpsPDF,
        "ansible-automation": AnsibleAutomationPDF,
        "jenkins-cicd": JenkinsCICDPDF,
        "kafka-streaming": KafkaStreamingPDF,
        "rabbitmq-specialist": RabbitMQSpecialistPDF,
        "grpc-developer": GRPCDeveloperPDF,
        "webassembly-engineer": WebAssemblyEngineerPDF,
        "unity-game-developer": UnityGameDeveloperPDF,
        "academic-achiever": AcademicAchieverPDF,
        "graduate-innovator": GraduateInnovatorPDF,
        "campus-leader": CampusLeaderPDF,
        "scholarship-graduate": ScholarshipGraduatePDF,
        "honors-student": HonorsStudentPDF,
        "stem-graduate": STEMGraduatePDF,
        "internship-ready": InternshipReadyPDF,
        "research-graduate": ResearchGraduatePDF,
        "entrepreneurial-graduate": EntrepreneurialGraduatePDF,
        "volunteer-leader": VolunteerLeaderPDF,
        "coding-bootcamp-grad": CodingBootcampGradPDF,
        "liberal-arts-graduate": LiberalArtsGraduatePDF,
        "business-graduate": BusinessGraduatePDF,
        "engineering-fresher": EngineeringFresherPDF,
        "design-school-grad": DesignSchoolGradPDF,
        "masters-graduate": MastersGraduatePDF,
        "phd-candidate": PhDCandidatePDF,
        "student-athlete": StudentAthletePDF,
        "study-abroad-graduate": StudyAbroadGraduatePDF,
        "dual-degree-graduate": DualDegreeGraduatePDF,
        "portfolio-artist": PortfolioArtistPDF,
        "motion-designer": MotionDesignerPDF,
        "brand-strategist": BrandStrategistPDF,
        "content-creator": ContentCreatorPDF,
        "illustrator-artist": IllustratorArtistPDF,
        "video-producer": VideoProducerPDF,
        "copywriter-creative": CopywriterCreativePDF,
        "art-director-pro": ArtDirectorProPDF,
        "photographer-pro": PhotographerProPDF,
        "typographer-specialist": TypographerSpecialistPDF,
        "digital-artist": DigitalArtistPDF,
        "creative-director-elite": CreativeDirectorElitePDF,
        "social-media-creative": SocialMediaCreativePDF,
        "animation-artist": AnimationArtistPDF,
        "multimedia-designer": MultimediaDesignerPDF,
        "ux-researcher": UXResearcherPDF,
        "ui-specialist": UISpecialistPDF,
        "product-designer-pro": ProductDesignerProPDF,
        "interaction-designer": InteractionDesignerPDF,
        "service-designer": ServiceDesignerPDF,
        "design-systems-architect": DesignSystemsArchitectPDF,
        "accessibility-designer": AccessibilityDesignerPDF,
        "design-lead": DesignLeadPDF,
        "design-strategist": DesignStrategistPDF,
        "visual-designer-pro": VisualDesignerProPDF,
        // 2025 Batch 2 - Universal Professional PDFs (30 templates)
        "sapphire-professional": SapphireProfessionalPDF,
        "emerald-executive": EmeraldExecutivePDF,
        "ruby-corporate": RubyCorporatePDF,
        "onyx-leadership": OnyxLeadershipPDF,
        "platinum-prestige": PlatinumPrestigePDF,
        "azure-professional": AzureProfessionalPDF,
        "amber-executive": AmberExecutivePDF,
        "violet-corporate": VioletCorporatePDF,
        "jade-professional": JadeProfessionalPDF,
        "crimson-leadership": CrimsonLeadershipPDF,
        "slate-minimalist": SlateMinimalistPDF,
        "teal-modern": TealModernPDF,
        "indigo-executive": IndigoExecutivePDF,
        "rose-professional": RoseProfessionalPDF,
        "navy-corporate": NavyCorporatePDF,
        "gold-prestige": GoldPrestigePDF,
        "charcoal-professional": CharcoalProfessionalPDF,
        "coral-executive": CoralExecutivePDF,
        "pewter-minimalist": PewterMinimalistPDF,
        "forest-professional": ForestProfessionalPDF,
        "burgundy-executive": BurgundyExecutivePDF,
        "sky-modern": SkyModernPDF,
        "plum-professional": PlumProfessionalPDF,
        "bronze-corporate": BronzeCorporatePDF,
        "mint-professional": MintProfessionalPDF,
        "obsidian-executive": ObsidianExecutivePDF,
        "tangerine-modern": TangerineModernPDF,
        "steel-professional": SteelProfessionalPDF,
        "lavender-executive": LavenderExecutivePDF,
        "cobalt-professional": CobaltProfessionalPDF,
        // 2025 Batch 2 - Software & Technology PDFs (25 templates)
        "github-developer": GitHubDeveloperPDF,
        "linkedin-tech-pro": LinkedInTechProPDF,
        "laravel-artisan": LaravelArtisanPDF,
        "rails-developer": RailsDeveloperPDF,
        "angular-specialist": AngularSpecialistPDF,
        "vue-master": VueMasterPDF,
        "kotlin-android-dev": KotlinAndroidDevPDF,
        "ios-swift-engineer": iOSSwiftEngineerPDF,
        "docker-specialist": DockerSpecialistPDF,
        "aws-solutions-architect": AWSSolutionsArchitectPDF,
        "gcp-cloud-engineer": GCPCloudEngineerPDF,
        "azure-devops-pro": AzureDevOpsProPDF,
        "react-native-dev": ReactNativeDevPDF,
        "flutter-ui-specialist": FlutterUISpecialistPDF,
        "dotnet-core-developer": DotNetCoreDeveloperPDF,
        "golang-backend-engineer": GolangBackendEngineerPDF,
        "python-ml-engineer": PythonMLEngineerPDF,
        "data-scientist-pro": DataScientistProPDF,
        "blockchain-engineer": BlockchainEngineerPDF,
        "solidity-developer": SolidityDeveloperPDF,
        "cybersecurity-analyst": CybersecurityAnalystPDF,
        "devsecops-engineer": DevSecOpsEngineerPDF,
        "fullstack-javascript": FullstackJavaScriptPDF,
        "jamstack-developer": JAMStackDeveloperPDF,
        "headless-cms-developer": HeadlessCMSDeveloperPDF,
        // 2025 Batch 2 - Fresh Graduates PDFs (20 templates)
        "digital-native-graduate": DigitalNativeGraduatePDF,
        "tech-savvy-fresher": TechSavvyFresherPDF,
        "linkedin-ready-graduate": LinkedInReadyGraduatePDF,
        "github-student-developer": GitHubStudentDeveloperPDF,
        "portfolio-first-graduate": PortfolioFirstGraduatePDF,
        "connected-graduate": ConnectedGraduatePDF,
        "social-media-savvy-grad": SocialMediaSavvyGradPDF,
        "open-source-contributor": OpenSourceContributorPDF,
        "hackathon-winner": HackathonWinnerPDF,
        "coding-challenge-champion": CodingChallengeChampionPDF,
        "capstone-showcase": CapstoneShowcasePDF,
        "research-publication-grad": ResearchPublicationGradPDF,
        "conference-presenter": ConferencePresenterPDF,
        "startup-intern": StartupInternPDF,
        "faang-aspirant": FAANGAspirantPDF,
        "bootcamp-success-story": BootcampSuccessStoryPDF,
        "remote-work-ready": RemoteWorkReadyPDF,
        "community-builder": CommunityBuilderPDF,
        "tech-blogger-graduate": TechBloggerGraduatePDF,
        "youtube-educator": YouTubeEducatorPDF,
        // 2025 Batch 2 - Creative PDFs (15 templates)
        "behance-designer": BehanceDesignerPDF,
        "dribbble-creative": DribbbleCreativePDF,
        "instagram-influencer": InstagramInfluencerPDF,
        "pinterest-curator": PinterestCuratorPDF,
        "vimeo-videographer": VimeoVideographerPDF,
        "medium-writer": MediumWriterPDF,
        "tiktok-creator": TikTokCreatorPDF,
        "twitch-streamer": TwitchStreamerPDF,
        "soundcloud-producer": SoundCloudProducerPDF,
        "spotify-artist": SpotifyArtistPDF,
        "artstation-artist": ArtStationArtistPDF,
        "deviantart-creator": DeviantArtCreatorPDF,
        "patreon-creator": PatreonCreatorPDF,
        "substack-writer": SubstackWriterPDF,
        "clubhouse-moderator": ClubhouseModeratorPDF,
        // 2025 Batch 2 - Design PDFs (10 templates)
        "figma-expert": FigmaExpertPDF,
        "sketch-specialist": SketchSpecialistPDF,
        "adobe-xd-designer": AdobeXDDesignerPDF,
        "framer-designer": FramerDesignerPDF,
        "webflow-developer": WebflowDeveloperPDF,
        "principle-animator": PrincipleAnimatorPDF,
        "invision-prototyper": InVisionPrototyperPDF,
        "marvel-app-designer": MarvelAppDesignerPDF,
        "zeplin-handoff-specialist": ZeplinHandoffSpecialistPDF,
        "abstract-version-designer": AbstractVersionDesignerPDF,
        // 2025 Batch 3 - Healthcare & Medical PDFs (15 templates)
        "registered-nurse-pro": RegisteredNurseProPDF,
        "physician-specialist": PhysicianSpecialistPDF,
        "dental-professional": DentalProfessionalPDF,
        "pharmacist-clinical": PharmacistClinicalPDF,
        "physical-therapist": PhysicalTherapistPDF,
        "medical-technologist": MedicalTechnologistPDF,
        "radiology-technician": RadiologyTechnicianPDF,
        "healthcare-administrator": HealthcareAdministratorPDF,
        "mental-health-counselor": MentalHealthCounselorPDF,
        "occupational-therapist": OccupationalTherapistPDF,
        "speech-pathologist": SpeechPathologistPDF,
        "veterinary-doctor": VeterinaryDoctorPDF,
        "nutritionist-dietitian": NutritionistDietitianPDF,
        "medical-assistant": MedicalAssistantPDF,
        "paramedic-emt": ParamedicEMTPDF,
        // 2025 Batch 3 - Engineering PDFs (15 templates)
        "mechanical-engineer-pro": MechanicalEngineerProPDF,
        "civil-engineer-pe": CivilEngineerPEPDF,
        "electrical-engineer": ElectricalEngineerPDF,
        "chemical-engineer-pro": ChemicalEngineerProPDF,
        "aerospace-engineer": AerospaceEngineerPDF,
        "biomedical-engineer": BiomedicalEngineerPDF,
        "industrial-engineer": IndustrialEngineerPDF,
        "environmental-engineer": EnvironmentalEngineerPDF,
        "petroleum-engineer": PetroleumEngineerPDF,
        "structural-engineer": StructuralEngineerPDF,
        "manufacturing-engineer": ManufacturingEngineerPDF,
        "quality-assurance-engineer": QualityAssuranceEngineerPDF,
        "automation-engineer": AutomationEngineerPDF,
        "robotics-engineer": RoboticsEngineerPDF,
        "hvac-engineer": HVACEngineerPDF,
        // 2025 Batch 3 - Sales & Marketing PDFs (15 templates)
        "sales-executive-pro": SalesExecutiveProPDF,
        "account-manager-enterprise": AccountManagerEnterprisePDF,
        "digital-marketing-specialist": DigitalMarketingSpecialistPDF,
        "brand-manager-strategic": BrandManagerStrategicPDF,
        "seo-specialist-pro": SEOSpecialistProPDF,
        "growth-marketing-manager": GrowthMarketingManagerPDF,
        "email-marketing-specialist": EmailMarketingSpecialistPDF,
        "product-marketing-manager": ProductMarketingManagerPDF,
        "business-development-manager": BusinessDevelopmentManagerPDF,
        "inside-sales-representative": InsideSalesRepresentativePDF,
        "field-sales-specialist": FieldSalesSpecialistPDF,
        "customer-success-manager": CustomerSuccessManagerPDF,
        "marketing-analytics-manager": MarketingAnalyticsManagerPDF,
        "ecommerce-manager": EcommerceManagerPDF,
        "affiliate-marketing-manager": AffiliateMarketingManagerPDF,
        // 2025 Batch 3 - Finance & Accounting PDFs (12 templates)
        "financial-analyst-cfa": FinancialAnalystCFAPDF,
        "investment-banker": InvestmentBankerPDF,
        "certified-public-accountant": CertifiedPublicAccountantPDF,
        "tax-specialist-pro": TaxSpecialistProPDF,
        "financial-controller": FinancialControllerPDF,
        "portfolio-manager": PortfolioManagerPDF,
        "risk-management-analyst": RiskManagementAnalystPDF,
        "treasury-analyst": TreasuryAnalystPDF,
        "forensic-accountant": ForensicAccountantPDF,
        "internal-auditor": InternalAuditorPDF,
        "budget-analyst": BudgetAnalystPDF,
        "equity-research-analyst": EquityResearchAnalystPDF,
        // 2025 Batch 3 - Education & Teaching PDFs (10 templates)
        "university-professor": UniversityProfessorPDF,
        "elementary-teacher": ElementaryTeacherPDF,
        "high-school-teacher": HighSchoolTeacherPDF,
        "special-education-teacher": SpecialEducationTeacherPDF,
        "esl-teacher-certified": ESLTeacherCertifiedPDF,
        "curriculum-developer": CurriculumDeveloperPDF,
        "instructional-designer": InstructionalDesignerPDF,
        "academic-advisor": AcademicAdvisorPDF,
        "online-course-instructor": OnlineCourseInstructorPDF,
        "private-tutor-specialist": PrivateTutorSpecialistPDF,
        // 2025 Batch 3 - Legal PDFs (8 templates)
        "corporate-attorney": CorporateAttorneyPDF,
        "litigation-attorney": LitigationAttorneyPDF,
        "paralegal-certified": ParalegalCertifiedPDF,
        "legal-consultant": LegalConsultantPDF,
        "compliance-officer-legal": ComplianceOfficerLegalPDF,
        "contract-specialist": ContractSpecialistPDF,
        "intellectual-property-attorney": IntellectualPropertyAttorneyPDF,
        "legal-operations-manager": LegalOperationsManagerPDF,
        // 2025 Batch 3 - Human Resources PDFs (8 templates)
        "hr-business-partner": HRBusinessPartnerPDF,
        "talent-acquisition-specialist": TalentAcquisitionSpecialistPDF,
        "compensation-benefits-manager": CompensationBenefitsManagerPDF,
        "learning-development-manager": LearningDevelopmentManagerPDF,
        "employee-relations-specialist": EmployeeRelationsSpecialistPDF,
        "hr-analytics-manager": HRAnalyticsManagerPDF,
        "organizational-development": OrganizationalDevelopmentPDF,
        "diversity-inclusion-manager": DiversityInclusionManagerPDF,
        // 2025 Batch 3 - Hospitality & Culinary PDFs (7 templates)
        "executive-chef": ExecutiveChefPDF,
        "hotel-manager-operations": HotelManagerOperationsPDF,
        "restaurant-manager": RestaurantManagerPDF,
        "event-planner-coordinator": EventPlannerCoordinatorPDF,
        "sommelier-wine-specialist": SommelierWineSpecialistPDF,
        "pastry-chef": PastryChefPDF,
        "hospitality-director": HospitalityDirectorPDF,
        // 2025 Batch 3 - Real Estate & Construction PDFs (7 templates)
        "real-estate-broker": RealEstateBrokerPDF,
        "property-manager-commercial": PropertyManagerCommercialPDF,
        "construction-project-manager": ConstructionProjectManagerPDF,
        "architect-registered": ArchitectRegisteredPDF,
        "general-contractor": GeneralContractorPDF,
        "estimator-cost-analyst": EstimatorCostAnalystPDF,
        "real-estate-appraiser": RealEstateAppraiserPDF,
        // 2025 Batch 3 - Operations & Logistics PDFs (3 templates)
        "supply-chain-manager": SupplyChainManagerPDF,
        "logistics-coordinator": LogisticsCoordinatorPDF,
        "procurement-specialist": ProcurementSpecialistPDF,
        // 2025 Batch 4 - PDF Template Mappings (100 templates)
        "crystal-executive": PDFCrystalExecutiveTemplate,
        "quantum-professional": PDFQuantumProfessionalTemplate,
        "zenith-corporate": PDFZenithCorporateTemplate,
        "aurora-minimal": PDFAuroraMinimalTemplate,
        "nexus-elite": PDFNexusEliteTemplate,
        "harmony-executive": PDFHarmonyExecutiveTemplate,
        "prism-professional": PDFPrismProfessionalTemplate,
        "titan-corporate": PDFTitanCorporateTemplate,
        "serenity-minimal": PDFSerenityMinimalTemplate,
        "velocity-executive": PDFVelocityExecutiveTemplate,
        "eclipse-professional": PDFEclipseProfessionalTemplate,
        "sterling-executive": PDFSterlingExecutiveTemplate,
        "meridian-corporate": PDFMeridianCorporateTemplate,
        "cosmos-professional": PDFCosmosProfessionalTemplate,
        "pinnacle-elite": PDFPinnacleEliteTemplate,
        "flux-executive": PDFFluxExecutiveTemplate,
        "vertex-professional": PDFVertexProfessionalTemplate,
        "radiance-corporate": PDFRadianceCorporateTemplate,
        "atlas-executive": PDFAtlasExecutiveTemplate,
        "spectrum-professional": PDFSpectrumProfessionalTemplate,
        "codeforge-developer": PDFCodeforgeDeveloperTemplate,
        "quantum-coder": PDFQuantumCoderTemplate,
        "neural-engineer": PDFNeuralEngineerTemplate,
        "pixelcraft-developer": PDFPixelcraftDeveloperTemplate,
        "cloudnative-architect": PDFCloudnativeArchitectTemplate,
        "bytecode-specialist": PDFBytecodeSpecialistTemplate,
        "agileflow-developer": PDFAgileflowDeveloperTemplate,
        "stackmaster-fullstack": PDFStackmasterFullstackTemplate,
        "gitflow-engineer": PDFGitflowEngineerTemplate,
        "compile-time-dev": PDFCompileTimeDevTemplate,
        "microarch-engineer": PDFMicroarchEngineerTemplate,
        "serverless-specialist": PDFServerlessSpecialistTemplate,
        "edgecompute-developer": PDFEdgecomputeDeveloperTemplate,
        "webrtc-engineer": PDFWebrtcEngineerTemplate,
        "graphdb-specialist": PDFGraphdbSpecialistTemplate,
        "containerops-engineer": PDFContaineropsEngineerTemplate,
        "apigateway-architect": PDFApigatewayArchitectTemplate,
        "observability-engineer": PDFObservabilityEngineerTemplate,
        "eventdriven-architect": PDFEventdrivenArchitectTemplate,
        "mlops-engineer": PDFMlopsEngineerTemplate,
        "launchpad-graduate": PDFLaunchpadGraduateTemplate,
        "momentum-fresher": PDFMomentumFresherTemplate,
        "horizon-graduate": PDFHorizonGraduateTemplate,
        "catalyst-fresher": PDFCatalystFresherTemplate,
        "pathway-graduate": PDFPathwayGraduateTemplate,
        "spark-fresher": PDFSparkFresherTemplate,
        "ascend-graduate": PDFAscendGraduateTemplate,
        "pioneer-fresher": PDFPioneerFresherTemplate,
        "keystone-graduate": PDFKeystoneGraduateTemplate,
        "venture-fresher": PDFVentureFresherTemplate,
        "aspire-graduate": PDFAspireGraduateTemplate,
        "emerge-fresher": PDFEmergeFresherTemplate,
        "bright-graduate": PDFBrightGraduateTemplate,
        "nextstep-fresher": PDFNextstepFresherTemplate,
        "foundation-graduate": PDFFoundationGraduateTemplate,
        "elevate-fresher": PDFElevateFresherTemplate,
        "genesis-graduate": PDFGenesisGraduateTemplate,
        "achiever-fresher": PDFAchieverFresherTemplate,
        "milestone-graduate": PDFMilestoneGraduateTemplate,
        "potential-fresher": PDFPotentialFresherTemplate,
        "muse-creative": PDFMuseCreativeTemplate,
        "canvas-artist": PDFCanvasArtistTemplate,
        "palette-designer": PDFPaletteDesignerTemplate,
        "visionary-creative": PDFVisionaryCreativeTemplate,
        "studio-artist": PDFStudioArtistTemplate,
        "artisan-designer": PDFArtisanDesignerTemplate,
        "chromatic-creative": PDFChromaticCreativeTemplate,
        "expression-artist": PDFExpressionArtistTemplate,
        "imaginative-designer": PDFImaginativeDesignerTemplate,
        "aesthetic-creative": PDFAestheticCreativeTemplate,
        "composition-artist": PDFCompositionArtistTemplate,
        "impression-designer": PDFImpressionDesignerTemplate,
        "narrative-creative": PDFNarrativeCreativeTemplate,
        "craft-artist": PDFCraftArtistTemplate,
        "vibrant-designer": PDFVibrantDesignerTemplate,
        "concept-creative": PDFConceptCreativeTemplate,
        "editorial-artist": PDFEditorialArtistTemplate,
        "vision-designer": PDFVisionDesignerTemplate,
        "curator-creative": PDFCuratorCreativeTemplate,
        "interface-master": PDFInterfaceMasterTemplate,
        "designsystem-architect": PDFDesignsystemArchitectTemplate,
        "userflow-designer": PDFUserflowDesignerTemplate,
        "prototype-specialist": PDFPrototypeSpecialistTemplate,
        "pixelperfect-designer": PDFPixelperfectDesignerTemplate,
        "responsive-ux": PDFResponsiveUxTemplate,
        "wireframe-specialist": PDFWireframeSpecialistTemplate,
        "microinteraction-designer": PDFMicrointeractionDesignerTemplate,
        "accessibility-ux": PDFAccessibilityUxTemplate,
        "userresearch-specialist": PDFUserresearchSpecialistTemplate,
        "information-architect": PDFInformationArchitectTemplate,
        "designthinking-specialist": PDFDesignthinkingSpecialistTemplate,
        "componentui-designer": PDFComponentuiDesignerTemplate,
        "designops-specialist": PDFDesignopsSpecialistTemplate,
        "mobile-first-designer": PDFMobileFirstDesignerTemplate,
        "servicedesign-specialist": PDFServicedesignSpecialistTemplate,
        "designstrategy-lead": PDFDesignstrategyLeadTemplate,
        "conversational-ux": PDFConversationalUxTemplate,
        "motion-ui-designer": PDFMotionUiDesignerTemplate,
        "designleadership-director": PDFDesignleadershipDirectorTemplate,
        // 2025 Batch 5 - PDF Template Mappings (100 templates)
        "digital-professional": PDFDigitalProfessionalTemplate,
        "networked-executive": PDFNetworkedExecutiveTemplate,
        "connected-professional": PDFConnectedProfessionalTemplate,
        "linkedin-optimized": PDFLinkedinOptimizedTemplate,
        "social-executive": PDFSocialExecutiveTemplate,
        "online-professional": PDFOnlineProfessionalTemplate,
        "webpresence-executive": PDFWebpresenceExecutiveTemplate,
        "profile-centric": PDFProfileCentricTemplate,
        "global-networker": PDFGlobalNetworkerTemplate,
        "modern-digital": PDFModernDigitalTemplate,
        "social-savvy": PDFSocialSavvyTemplate,
        "platform-professional": PDFPlatformProfessionalTemplate,
        "digital-executive": PDFDigitalExecutiveTemplate,
        "branded-professional": PDFBrandedProfessionalTemplate,
        "influencer-professional": PDFInfluencerProfessionalTemplate,
        "online-identity": PDFOnlineIdentityTemplate,
        "portfolio-professional": PDFPortfolioProfessionalTemplate,
        "digital-identity": PDFDigitalIdentityTemplate,
        "social-media-pro": PDFSocialMediaProTemplate,
        "connected-leader": PDFConnectedLeaderTemplate,
        "github-portfolio-dev": PDFGithubPortfolioDevTemplate,
        "opensource-developer": PDFOpensourceDeveloperTemplate,
        "stackoverflow-dev": PDFStackoverflowDevTemplate,
        "codepen-developer": PDFCodepenDeveloperTemplate,
        "portfolio-coder": PDFPortfolioCoderTemplate,
        "tech-blogger-dev": PDFTechBloggerDevTemplate,
        "youtube-dev-educator": PDFYoutubeDevEducatorTemplate,
        "linkedin-tech-expert": PDFLinkedinTechExpertTemplate,
        "twitter-dev": PDFTwitterDevTemplate,
        "medium-tech-writer": PDFMediumTechWriterTemplate,
        "devto-contributor": PDFDevtoContributorTemplate,
        "hackernews-developer": PDFHackernewsDeveloperTemplate,
        "gitlab-developer": PDFGitlabDeveloperTemplate,
        "bitbucket-developer": PDFBitbucketDeveloperTemplate,
        "npm-package-author": PDFNpmPackageAuthorTemplate,
        "pypi-contributor": PDFPypiContributorTemplate,
        "dockerhub-publisher": PDFDockerhubPublisherTemplate,
        "kaggle-data-scientist": PDFKaggleDataScientistTemplate,
        "leetcode-champion": PDFLeetcodeChampionTemplate,
        "hackerrank-expert": PDFHackerrankExpertTemplate,
        "gen-z-graduate": PDFGenZGraduateTemplate,
        "digital-native-grad": PDFDigitalNativeGradTemplate,
        "social-first-fresher": PDFSocialFirstFresherTemplate,
        "portfolio-graduate": PDFPortfolioGraduateTemplate,
        "project-showcase-grad": PDFProjectShowcaseGradTemplate,
        "github-student": PDFGithubStudentTemplate,
        "linkedin-graduate": PDFLinkedinGraduateTemplate,
        "online-portfolio-fresher": PDFOnlinePortfolioFresherTemplate,
        "social-graduate": PDFSocialGraduateTemplate,
        "digital-graduate": PDFDigitalGraduateTemplate,
        "web-portfolio-grad": PDFWebPortfolioGradTemplate,
        "hackathon-graduate": PDFHackathonGraduateTemplate,
        "bootcamp-portfolio": PDFBootcampPortfolioTemplate,
        "internship-showcase": PDFInternshipShowcaseTemplate,
        "campus-influencer": PDFCampusInfluencerTemplate,
        "student-developer-portfolio": PDFStudentDeveloperPortfolioTemplate,
        "digital-portfolio-grad": PDFDigitalPortfolioGradTemplate,
        "online-presence-fresher": PDFOnlinePresenceFresherTemplate,
        "networked-graduate": PDFNetworkedGraduateTemplate,
        "profile-driven-grad": PDFProfileDrivenGradTemplate,
        "behance-portfolio": PDFBehancePortfolioTemplate,
        "dribbble-showcase": PDFDribbbleShowcaseTemplate,
        "artstation-pro": PDFArtstationProTemplate,
        "instagram-creative": PDFInstagramCreativeTemplate,
        "pinterest-designer": PDFPinterestDesignerTemplate,
        "youtube-creator": PDFYoutubeCreatorTemplate,
        "tiktok-content-creator": PDFTiktokContentCreatorTemplate,
        "soundcloud-artist": PDFSoundcloudArtistTemplate,
        "spotify-musician": PDFSpotifyMusicianTemplate,
        "twitch-streamer-creative": PDFTwitchStreamerCreativeTemplate,
        "deviantart-artist": PDFDeviantartArtistTemplate,
        "patreon-creative": PDFPatreonCreativeTemplate,
        "medium-writer-creative": PDFMediumWriterCreativeTemplate,
        "substack-author": PDFSubstackAuthorTemplate,
        "portfolio-website-creative": PDFPortfolioWebsiteCreativeTemplate,
        "online-gallery-artist": PDFOnlineGalleryArtistTemplate,
        "social-creative-influencer": PDFSocialCreativeInfluencerTemplate,
        "multi-platform-artist": PDFMultiPlatformArtistTemplate,
        "digital-artist-portfolio": PDFDigitalArtistPortfolioTemplate,
        "figma-designer-portfolio": PDFFigmaDesignerPortfolioTemplate,
        "adobe-portfolio-designer": PDFAdobePortfolioDesignerTemplate,
        "sketch-expert-portfolio": PDFSketchExpertPortfolioTemplate,
        "webflow-designer-portfolio": PDFWebflowDesignerPortfolioTemplate,
        "framer-designer-portfolio": PDFFramerDesignerPortfolioTemplate,
        "uxfolio-designer": PDFUxfolioDesignerTemplate,
        "coroflot-portfolio": PDFCoroflotPortfolioTemplate,
        "carbonmade-designer": PDFCarbonmadeDesignerTemplate,
        "awwwards-designer": PDFAwwwardsDesignerTemplate,
        "uiux-portfolio-pro": PDFUiuxPortfolioProTemplate,
        "designportfolio-specialist": PDFDesignportfolioSpecialistTemplate,
        "casestudy-designer": PDFCasestudyDesignerTemplate,
        "protfolio-showcase-ux": PDFProtfolioShowcaseUxTemplate,
        "interactive-portfolio-designer": PDFInteractivePortfolioDesignerTemplate,
        "ux-researcher-portfolio": PDFUxResearcherPortfolioTemplate,
        "product-designer-showcase": PDFProductDesignerShowcaseTemplate,
        "design-systems-portfolio": PDFDesignSystemsPortfolioTemplate,
        "motion-designer-portfolio": PDFMotionDesignerPortfolioTemplate,
        "visual-designer-showcase": PDFVisualDesignerShowcaseTemplate,
        "design-leader-portfolio": PDFDesignLeaderPortfolioTemplate,
        "sapphire-executive": PDFSapphireExecutiveTemplate,
        "creative-accent": PDFCreativeAccentTemplate,
        "bold-headline": PDFBoldHeadlineTemplate,
        "dual-tone": PDFDualToneTemplate,
        "elegant-serif": PDFElegantSerifTemplate,
        "contemporary-split": PDFContemporarySplitTemplate,
      };

      const PDFTemplate =
        pdfTemplates[templateId as keyof typeof pdfTemplates] ||
        ProfessionalPDF;

      // Generate PDF blob
      const blob = await pdf(
        <PDFTemplate resumeData={sanitizedData} themeColor={themeColor} />,
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${sanitizedData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);

      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resume");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleATSScoreCalculated = async (score: number, report: AtsReport) => {
    if (currentResumeId) {
      try {
        await resumeService.updateAtsScore(currentResumeId, score, report);
        toast.success(`ATS Score saved: ${score.toFixed(1)}/10`);
      } catch (error) {
        console.error("Failed to save ATS score:", error);
        // Don't show error toast, score is still displayed
      }
    }
  };

  const handleResetForm = () => {
    if (!templateId) return;

    // Clear localStorage
    const key = `resume-${templateId}`;
    localStorage.removeItem(key);
    
    // Reset to template defaults
    const defaultData = getTemplateDefaults(templateId);
    setResumeData(defaultData);
    
    // Close dialog
    setResetDialogOpen(false);
    
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const runAtsCheck = useCallback(() => {
    setAtsLoading(true);
    requestAnimationFrame(() => {
      const report = analyzeResumeForATS(resumeData, { templateId });
      setAtsReport(report);
      setAtsDialogOpen(true);
      setAtsLoading(false);
    });
  }, [resumeData, templateId]);

  const renderScoreRing = useCallback(
    (score: number) => {
      const percent = Math.max(0, Math.min(100, (score / 10) * 100));
      const radius = 16;
      const circumference = 2 * Math.PI * radius;
      const dashOffset = circumference * (1 - percent / 100);

      return (
        <svg viewBox="0 0 36 36" className="h-10 w-10">
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="#e2e8f0"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke={themeColor}
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
          <text
            x="18"
            y="20"
            textAnchor="middle"
            fontSize="10"
            fontFamily="Inter"
            fontWeight="600"
            fill="#1f2937"
          >
            {percent.toFixed(0)}%
          </text>
        </svg>
      );
    },
    [themeColor],
  );

  const renderMetricRing = useCallback(
    (ratio: number) => {
      const percent = Math.max(0, Math.min(100, ratio * 100));
      const radius = 14;
      const circumference = 2 * Math.PI * radius;
      const dashOffset = circumference * (1 - percent / 100);

      return (
        <svg viewBox="0 0 36 36" className="h-9 w-9">
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke="#e2e8f0"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke={themeColor}
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
          <text
            x="18"
            y="20"
            textAnchor="middle"
            fontSize="9"
            fontFamily="Inter"
            fontWeight="600"
            fill="#1f2937"
          >
            {percent.toFixed(0)}%
          </text>
        </svg>
      );
    },
    [themeColor],
  );

  const templateMeta = templateMetaMap[templateId || ""];
  const templateDisplayName =
    templateMeta?.name || formatTemplateName(templateId);
  const categorySlug = templateMeta?.categorySlug || "software";
  const categoryLabel =
    categoryLabelMap[categorySlug] || templateMeta?.category || "Templates";

  // Determine back navigation path based on whether we're in a nested route
  const backPath = professionId ? `/dashboard/${professionId}` : "/dashboard";

  // Build breadcrumbs - they will be auto-generated from the URL by the Breadcrumbs component
  // But we can also provide custom breadcrumbs if needed
  const editorBreadcrumbItems = professionId
    ? undefined // Let Breadcrumbs component auto-generate from URL
    : [
        { label: "Dashboard", path: "/dashboard" },
        { label: templateDisplayName },
      ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Fixed Header Section */}
      <div className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 md:hidden">
            <Breadcrumbs items={editorBreadcrumbItems} />
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(professionId ? `/dashboard/${professionId}/live-editor/${templateId}` : `/live-editor/${templateId}`)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Live
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
                  onClick={handleDownload}
                  disabled={isDownloading}
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {!isDownloading && "PDF"}
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Layout - 3 Column Grid */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
            {/* Left Section - Breadcrumbs */}
            <div className="flex items-center">
              <Breadcrumbs items={editorBreadcrumbItems} />
            </div>

            {/* Center Section - Tabs */}
            <div className="flex justify-center">
              <Tabs value="form" onValueChange={(v) => v === "live" && navigate(professionId ? `/dashboard/${professionId}/live-editor/${templateId}` : `/live-editor/${templateId}`)}>
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
                onClick={handleDownload}
                disabled={isDownloading}
                size="sm"
                className="gap-2"
              >
                {isDownloading ? (
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

      {/* ATS Dialog */}
      <Dialog open={atsDialogOpen} onOpenChange={setAtsDialogOpen}>
        <DialogContent className="max-w-3xl sm:max-h-[80vh]">
                {atsReport ? (
                  <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1">
                    <DialogHeader>
                      <DialogTitle>ATS Readiness Report</DialogTitle>
                      <DialogDescription>{atsReport.summary}</DialogDescription>
                    </DialogHeader>
                    <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            Overall Score
                          </p>
                          <p className="text-3xl font-semibold text-foreground">
                            {atsReport.score.toFixed(1)} /{" "}
                            {atsReport.maxScore.toFixed(0)}
                          </p>
                        </div>
                        <div className="w-full sm:max-w-[180px]">
                          <Progress
                            value={(atsReport.score / atsReport.maxScore) * 100}
                            className="h-2"
                          />
                          <p
                            className={`mt-2 text-sm font-medium ${gradeMap[atsReport.grade].tone}`}
                          >
                            {gradeMap[atsReport.grade].label}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/60 bg-white">
                      <table className="w-full border-collapse text-xs text-muted-foreground">
                        <thead className="bg-muted/40 text-foreground">
                          <tr>
                            <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.2em]">
                              Criteria
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.2em]">
                              Score /10
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.2em]">
                              What we checked
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.2em]">
                              Improvement
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {atsReport.metrics.map((metric) => (
                            <tr
                              key={metric.id}
                              className="border-t border-border/50"
                            >
                              <td className="px-4 py-3 font-medium text-foreground">
                                {metric.label}
                              </td>
                              <td className="px-4 py-3 text-foreground/80">
                                <div className="flex items-center gap-2">
                                  <div className="h-9 w-9">
                                    {renderMetricRing(metric.ratio)}
                                  </div>
                                  <span className="text-sm font-semibold">
                                    {(metric.ratio * 10).toFixed(1)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3">{metric.detail}</td>
                              <td className="px-4 py-3 text-foreground">
                                {metric.recommendation ||
                                  (metric.passed
                                    ? "On track"
                                    : "Add more detail here.")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {atsReport.missingKeywords.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          Suggested Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {atsReport.missingKeywords.map((keyword) => (
                            <Badge
                              key={keyword}
                              variant="secondary"
                              className="capitalize"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {atsReport.keywordHits.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          Recognized Keywords
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {atsReport.keywordHits.map((keyword) => (
                            <Badge
                              key={keyword}
                              variant="outline"
                              className="capitalize"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <DialogHeader>
                    <DialogTitle>Run an ATS check</DialogTitle>
                    <DialogDescription>
                      Generate an ATS readiness report to see how well this
                      resume will parse in applicant tracking systems.
                    </DialogDescription>
                  </DialogHeader>
                )}
              </DialogContent>
            </Dialog>

            {/* Reset Confirmation Dialog */}
            <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Reset Form</DialogTitle>
                  <DialogDescription>
                    This will replace all your current data with the original template defaults. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setResetDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleResetForm}
                  >
                    <RotateCcw className="mr-2 h-3 w-3" />
                    Reset Form
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

      {/* Editor Layout */}
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-6">
        <div className="grid gap-4 max-w-8xl mx-auto lg:grid-cols-[37%,63%] lg:gap-6">
          {/* Form Section */}
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto space-y-6 rounded-2xl border border-border/50 bg-background px-4 py-5 shadow-sm sm:px-6 sm:py-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Edit Your Resume</h2>
              {/* <p className="text-sm text-muted-foreground">
                Fill in your information and watch your resume update in
                real-time
              </p> */}
            </div>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-32 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="space-y-4 rounded-2xl border border-border/50 bg-background px-4 py-5 shadow-sm sm:px-6 sm:py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Live Preview</h2>
              </div>
              <div className="border-2 border-border rounded-xl overflow-hidden shadow-premium bg-white">
                <InlineEditProvider resumeData={resumeData} setResumeData={setResumeData}>
                  <ResumePreview
                    resumeData={resumeData}
                    templateId={templateId || "professional"}
                    themeColor={themeColor}
                  />
                </InlineEditProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
