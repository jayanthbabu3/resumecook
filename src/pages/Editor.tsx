import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Gauge, Loader2, RotateCcw, ArrowLeft, Edit3, FileEdit, Save } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { resumeService } from "@/lib/firestore/resumeService";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { ResumeData as NewResumeData } from "@/types/resume";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
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
import { GeometricModernPDF } from "@/components/resume/pdf/GeometricModernPDF";
import { GitHubStylePDF } from "@/components/resume/pdf/GitHubStylePDF";
import { MLEngineerPDF } from "@/components/resume/pdf/MLEngineerPDF";
import { SidebarAccentPDF } from "@/components/resume/pdf/SidebarAccentPDF";
import { TechStackProPDF } from "@/components/resume/pdf/TechStackProPDF";
import { TerminalThemePDF } from "@/components/resume/pdf/TerminalThemePDF";
import { TimelineElegancePDF } from "@/components/resume/pdf/TimelineElegancePDF";
import { TwoToneClassicPDF } from "@/components/resume/pdf/TwoToneClassicPDF";
import { StrategicExecutivePDF } from "@/components/resume/pdf/StrategicExecutivePDF";
import { ProfessionalSpherePDF } from "@/components/resume/pdf/ProfessionalSpherePDF";
import { GlobalProfessionalPDF } from "@/components/resume/pdf/GlobalProfessionalPDF";
import { ProfessionalHorizonPDF } from "@/components/resume/pdf/ProfessionalHorizonPDF";
import { ExecutivePrimePDF } from "@/components/resume/pdf/ExecutivePrimePDF";
import { CorporateMomentumPDF } from "@/components/resume/pdf/CorporateMomentumPDF";
import { ProfessionalAscendPDF } from "@/components/resume/pdf/ProfessionalAscendPDF";
import { GlobalElitePDF } from "@/components/resume/pdf/GlobalElitePDF";
import { ExecutiveVisionPDF } from "@/components/resume/pdf/ExecutiveVisionPDF";
import { CorporateFusionPDF } from "@/components/resume/pdf/CorporateFusionPDF";
import { ProfessionalZenithPDF } from "@/components/resume/pdf/ProfessionalZenithPDF";
import { ExecutiveCorePDF } from "@/components/resume/pdf/ExecutiveCorePDF";
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

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    photo?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level?: number; // 1-10 scale
    category?: "core" | "toolbox";
  }>;
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  dynamicSections?: any[]; // For backward compatibility
}

const buildSkills = (
  templateId: string,
  names: string[],
  levels?: number[],
): ResumeData["skills"] =>
  names.map((name, index) => ({
    id: `${templateId}-skill-${index}`,
    name,
    level: levels?.[index] ?? Math.max(1, Math.min(10, 10 - index)),
    category: index < 6 ? "core" : "toolbox",
  }));

// Helper function to ensure data has valid array fields
const sanitizeResumeData = (data: any): ResumeData => {
  return {
    personalInfo: data.personalInfo || {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      summary: "",
      photo: "",
    },
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    sections: Array.isArray(data.sections) ? data.sections : [],
  };
};

export const getTemplateDefaults = (templateId: string): ResumeData => {
  const templates: Record<string, ResumeData> = {
    professional: {
      personalInfo: {
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        title: "Senior Financial Analyst",
        summary:
          "Results-driven financial analyst with 8+ years of experience in corporate finance, financial modeling, and strategic planning. Proven track record of delivering actionable insights that drive business growth and operational efficiency.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Goldman Sachs",
          position: "Senior Financial Analyst",
          startDate: "2020-03",
          endDate: "",
          current: true,
          description:
            "Lead financial planning and analysis for $500M portfolio\nDevelop complex financial models to support strategic decision-making\nPresent quarterly business reviews to C-suite executives\nManage team of 3 junior analysts",
        },
        {
          id: "2",
          company: "JPMorgan Chase",
          position: "Financial Analyst",
          startDate: "2016-06",
          endDate: "2020-02",
          current: false,
          description:
            "Conducted financial analysis and forecasting for multiple business units\nStreamlined reporting processes, reducing monthly close time by 30%\nCollaborated with cross-functional teams on budgeting initiatives",
        },
      ],
      education: [
        {
          id: "1",
          school: "Columbia University",
          degree: "Master of Business Administration",
          field: "Finance",
          startDate: "2014-09",
          endDate: "2016-05",
        },
        {
          id: "2",
          school: "University of Pennsylvania",
          degree: "Bachelor of Science",
          field: "Economics",
          startDate: "2010-09",
          endDate: "2014-05",
        },
      ],
      skills: buildSkills(
        "professional",
        [
          "Financial Modeling",
          "Excel & VBA",
          "SQL",
          "Tableau",
          "Budget Planning",
          "Risk Analysis",
          "Bloomberg Terminal",
          "Financial Reporting",
        ],
        [9, 9, 8, 8, 8, 8, 7, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications",
          content:
            "Chartered Financial Analyst (CFA) - Level III Candidate\nFinancial Risk Manager (FRM) Certified",
        },
      ],
    },
    modern: {
      personalInfo: {
        fullName: "Alex Chen",
        email: "alex.chen@email.com",
        phone: "+1 (555) 987-6543",
        location: "San Francisco, CA",
        title: "Full Stack Developer",
        summary:
          "Passionate full-stack developer with 5+ years building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love creating elegant solutions to complex problems and collaborating with creative teams.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Tech Startup Inc",
          position: "Senior Full Stack Developer",
          startDate: "2021-01",
          endDate: "",
          current: true,
          description:
            "Architected and deployed microservices handling 1M+ daily active users\nLed migration from monolith to serverless architecture on AWS\nMentored 5 junior developers and conducted code reviews\nImproved application performance by 60% through optimization",
        },
        {
          id: "2",
          company: "Digital Agency Co",
          position: "Frontend Developer",
          startDate: "2019-03",
          endDate: "2020-12",
          current: false,
          description:
            "Built responsive web applications using React and TypeScript\nImplemented CI/CD pipelines reducing deployment time by 40%\nCollaborated with designers to create pixel-perfect UIs",
        },
      ],
      education: [
        {
          id: "1",
          school: "Stanford University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: buildSkills(
        "modern",
        [
          "React",
          "TypeScript",
          "Node.js",
          "Python",
          "AWS",
          "Docker",
          "PostgreSQL",
          "GraphQL",
          "Git",
          "Agile/Scrum",
        ],
        [9, 9, 8, 7, 8, 7, 7, 7, 8, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Projects",
          content:
            "E-Commerce Platform - Built scalable e-commerce solution serving 50K+ users\nOpen Source Contributor - Active contributor to React ecosystem with 500+ GitHub stars",
        },
      ],
    },
    minimal: {
      personalInfo: {
        fullName: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        phone: "+1 (555) 234-5678",
        location: "Austin, TX",
        title: "UX Designer",
        summary:
          "Creative UX designer with a keen eye for detail and user-centered design principles. 6+ years of experience crafting intuitive digital experiences for web and mobile platforms.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Design Studio",
          position: "Senior UX Designer",
          startDate: "2020-08",
          endDate: "",
          current: true,
          description:
            "Lead UX strategy for client projects ranging from startups to Fortune 500\nConduct user research, usability testing, and data analysis\nDesign wireframes, prototypes, and high-fidelity mockups\nCollaborate with developers to ensure design implementation",
        },
        {
          id: "2",
          company: "Tech Company",
          position: "UX Designer",
          startDate: "2018-01",
          endDate: "2020-07",
          current: false,
          description:
            "Redesigned mobile app resulting in 45% increase in user engagement\nCreated and maintained design system used across product teams\nFacilitated design workshops with stakeholders",
        },
      ],
      education: [
        {
          id: "1",
          school: "Rhode Island School of Design",
          degree: "Bachelor of Fine Arts",
          field: "Graphic Design",
          startDate: "2014-09",
          endDate: "2018-05",
        },
      ],
      skills: buildSkills(
        "minimal",
        [
          "Figma",
          "Sketch",
          "Adobe XD",
          "User Research",
          "Prototyping",
          "Wireframing",
          "Design Systems",
          "HTML/CSS",
        ],
        [9, 8, 8, 8, 8, 7, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Awards",
          content:
            "Awwwards - Site of the Day (2023)\nRed Dot Design Award - UX Category (2022)",
        },
      ],
    },
    executive: {
      personalInfo: {
        fullName: "Michael Thompson",
        email: "michael.thompson@email.com",
        phone: "+1 (555) 345-6789",
        location: "Chicago, IL",
        title: "Chief Technology Officer",
        summary:
          "Visionary technology executive with 15+ years leading digital transformation initiatives. Proven track record of building high-performing engineering teams and delivering innovative solutions that drive business growth and competitive advantage.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Global Tech Corp",
          position: "Chief Technology Officer",
          startDate: "2019-01",
          endDate: "",
          current: true,
          description:
            "Lead technology strategy and innovation for organization with 2,000+ employees\nBuilt engineering team from 50 to 200+ across multiple locations\nSpearheaded cloud migration initiative saving $5M annually\nDrive product roadmap and architecture decisions for flagship products",
        },
        {
          id: "2",
          company: "Enterprise Solutions Inc",
          position: "VP of Engineering",
          startDate: "2015-03",
          endDate: "2018-12",
          current: false,
          description:
            "Managed 80+ person engineering organization across 6 product teams\nEstablished technical standards and best practices company-wide\nLed successful IPO preparation and technical due diligence\nReduced infrastructure costs by 40% through strategic optimization",
        },
      ],
      education: [
        {
          id: "1",
          school: "MIT",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2006-09",
          endDate: "2008-05",
        },
        {
          id: "2",
          school: "University of Illinois",
          degree: "Bachelor of Science",
          field: "Computer Engineering",
          startDate: "2002-09",
          endDate: "2006-05",
        },
      ],
      skills: buildSkills(
        "executive",
        [
          "Strategic Planning",
          "Technology Leadership",
          "Cloud Architecture",
          "Team Building",
          "Product Strategy",
          "Vendor Management",
          "Board Presentations",
          "P&L Management",
        ],
        [9, 9, 8, 8, 9, 7, 8, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Board Positions",
          content:
            "Board Member - Tech Industry Association (2021-Present)\nAdvisor - Multiple Early-Stage Startups",
        },
      ],
    },
    frontend: {
      personalInfo: {
        fullName: "Jordan Martinez",
        email: "jordan.martinez@email.com",
        phone: "+1 (555) 456-7890",
        location: "Seattle, WA",
        title: "Frontend Developer",
        summary:
          "Creative and detail-oriented frontend developer with 4+ years of experience building beautiful, responsive web applications. Passionate about user experience, modern JavaScript frameworks, and clean code. Thrive in collaborative environments and love bringing designs to life.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Innovative Web Solutions",
          position: "Senior Frontend Developer",
          startDate: "2022-06",
          endDate: "",
          current: true,
          description:
            "Developed and maintained high-performance React applications serving 500K+ monthly users\nCollaborated with UX designers to implement pixel-perfect, responsive interfaces\nOptimized web vitals resulting in 40% faster load times and improved SEO rankings\nMentored junior developers and conducted code reviews\nIntegrated REST and GraphQL APIs with modern state management solutions",
        },
        {
          id: "2",
          company: "Creative Digital Agency",
          position: "Frontend Developer",
          startDate: "2020-08",
          endDate: "2022-05",
          current: false,
          description:
            "Built interactive web experiences for clients across various industries\nImplemented animations and transitions using CSS3 and JavaScript libraries\nWorked in Agile environment with daily standups and bi-weekly sprints\nEnsured cross-browser compatibility and mobile responsiveness\nContributed to component library used across multiple projects",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2016-09",
          endDate: "2020-05",
        },
      ],
      skills: buildSkills(
        "frontend",
        [
          "React",
          "TypeScript",
          "JavaScript (ES6+)",
          "HTML5",
          "CSS3/Sass",
          "Tailwind CSS",
          "Vue.js",
          "Next.js",
          "Redux",
          "Git",
          "Webpack",
          "Responsive Design",
          "REST APIs",
          "GraphQL",
        ],
        [9, 9, 9, 9, 9, 8, 7, 8, 8, 8, 7, 8, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Projects",
          content:
            "Portfolio Website - Built personal portfolio with React and Framer Motion showcasing interactive animations\nWeather Dashboard - Created real-time weather app using React, TypeScript, and OpenWeather API\nOpen Source - Contributor to popular UI component libraries with 200+ GitHub stars",
        },
      ],
    },
    "senior-frontend": {
      personalInfo: {
        fullName: "Taylor Foster",
        email: "taylor.foster@email.com",
        phone: "+1 (415) 678-9023",
        location: "San Francisco, CA",
        title: "Senior Frontend Engineer",
        summary:
          "Award-winning frontend engineer with 9+ years crafting performant, accessible interfaces at scale. Specializes in design systems, data visualization, and cross-team collaboration to ship delightful user experiences.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Figma",
          position: "Lead Frontend Engineer",
          startDate: "2021-04",
          endDate: "",
          current: true,
          description:
            "Led design system modernization serving 75+ teams and 4 design platforms\nDelivered real-time multiplayer canvas optimizations reducing paint time by 35%\nPartnered with Data Viz team to launch analytics dashboard viewed by 1M+ users\nMentored 8 engineers, introducing progressive enhancement playbooks",
        },
        {
          id: "2",
          company: "Spotify",
          position: "Senior Frontend Engineer",
          startDate: "2017-08",
          endDate: "2021-03",
          current: false,
          description:
            "Owned web playback UI, increasing retention by 12% via personalized layouts\nBuilt component performance tooling that cut bundle size by 28%\nShipped artist analytics visualizations with interactive charts and stories",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Human Centered Design & Engineering",
          startDate: "2010-09",
          endDate: "2014-06",
        },
      ],
      skills: buildSkills(
        "senior-frontend",
        [
          "React",
          "TypeScript",
          "Next.js",
          "GraphQL",
          "Tailwind CSS",
          "Storybook",
          "Accessibility",
          "Web Performance",
          "Data Visualization",
          "Design Systems",
        ],
        [10, 9, 9, 8, 9, 8, 9, 9, 9, 9],
      ),
      sections: [
        {
          id: "metrics",
          title: "Key Metrics",
          content:
            "Design System Adoption - 85% org coverage\nPage Speed - -42% LCP across core flows\nExperimentation - 18% lift in conversion via UI personalization",
        },
        {
          id: "awards",
          title: "Highlights",
          content:
            "2023 - Webby Awards, Best Web Experience\n2022 - CSS Design Awards, Special Kudos\nTop Speaker - Google Chrome Dev Summit 2021",
        },
      ],
    },
    software: {
      personalInfo: {
        fullName: "Taylor Foster",
        email: "taylor.foster@email.com",
        phone: "+1 (415) 678-9023",
        location: "San Francisco, CA",
        title: "Lead Software Engineer",
        summary:
          "Award-winning engineer with 9+ years designing performant, accessible software at scale. Specializes in design systems, data visualization, and cross-functional leadership to ship user-first experiences.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Figma",
          position: "Lead Frontend Engineer",
          startDate: "2021-04",
          endDate: "",
          current: true,
          description:
            "Led front-of-site modernization across 75+ teams and 4 design surfaces\nDelivered real-time canvas optimizations reducing paint time by 35%\nPartnered with data visualization to launch analytics dashboard viewed by 1M+ users\nMentored 8 engineers, formalizing progressive enhancement playbooks",
        },
        {
          id: "2",
          company: "Spotify",
          position: "Senior Frontend Engineer",
          startDate: "2017-08",
          endDate: "2021-03",
          current: false,
          description:
            "Owned web playback UI, increasing retention by 12% with personalization\nBuilt component performance tooling that cut bundle size by 28%\nShipped analytics visualizations with interactive charts and stories",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2010-09",
          endDate: "2014-06",
        },
      ],
      skills: buildSkills(
        "software",
        [
          "React",
          "TypeScript",
          "Next.js",
          "GraphQL",
          "Design Systems",
          "Accessibility",
          "Web Performance",
          "Data Visualization",
          "Tailwind CSS",
          "Figma",
          "Cypress",
          "Git & CI",
        ],
        [10, 9, 9, 8, 9, 9, 9, 8, 8, 8, 7, 8],
      ),
      sections: [
        {
          id: "strengths",
          title: "Strengths",
          content:
            "Accessibility - Creating inclusive digital experiences\nWeb Performance - Optimizing for speed and reliability\nData Visualization - Crafting interactive analytical stories\nDesign Systems - Leading scalable design language initiatives",
        },
        {
          id: "achievements",
          title: "Key Achievements",
          content:
            "2023 Webby Awards – Best Web Experience\n2022 CSS Design Awards – Special Kudos\nTop Speaker – Google Chrome Dev Summit 2021",
        },
      ],
    },
    "senior-backend": {
      personalInfo: {
        fullName: "Morgan Patel",
        email: "morgan.patel@email.com",
        phone: "+1 (917) 555-2048",
        location: "New York, NY",
        title: "Senior Backend Engineer",
        summary:
          "Principal backend engineer with 11+ years designing resilient, event-driven platforms. Specializes in high-volume data pipelines, observability, and leading cross-functional teams to deliver measurable reliability improvements.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Stripe",
          position: "Lead Backend Architect",
          startDate: "2020-02",
          endDate: "",
          current: true,
          description:
            "Directed migration to event-driven payouts platform processing $15B+ annually\nReduced critical incident rate by 43% via SLO program and adaptive throttling\nMentored 7 engineers; established playbooks for blue/green deployments and on-call excellence",
        },
        {
          id: "2",
          company: "Airbnb",
          position: "Principal Platform Engineer",
          startDate: "2016-05",
          endDate: "2020-01",
          current: false,
          description:
            "Re-architected reservations pipeline to handle 4x traffic with <200ms P99 latency\nIntroduced schema governance program that cut breaking API changes by 60%\nLed reliability guild to implement chaos testing and automated rollback strategies",
        },
      ],
      education: [
        {
          id: "1",
          school: "Carnegie Mellon University",
          degree: "Master of Science",
          field: "Software Engineering",
          startDate: "2012-08",
          endDate: "2014-05",
        },
      ],
      skills: buildSkills(
        "senior-backend",
        [
          "Distributed Systems",
          "Go",
          "Python",
          "Microservices Architecture",
          "Event-Driven Design",
          "Cloud Infrastructure (AWS)",
          "Database Performance",
          "Observability (Prometheus/Grafana)",
          "API Design (REST & GraphQL)",
          "Team Leadership",
        ],
        [10, 9, 9, 9, 8, 9, 9, 8, 8, 9],
      ),
      sections: [
        {
          id: "impact",
          title: "Impact Metrics",
          content:
            "Platform Uptime - 99.98% across 12 regions\nLatency - 38% reduction in P95 API response\nCost Optimisation - $1.2M annual AWS savings via autoscaling",
        },
        {
          id: "initiatives",
          title: "Key Initiatives",
          content:
            "Resilient Data Pipelines - Built self-healing Kafka streams with dead-letter reprocessing\nObservability Overhaul - Rolled out unified tracing reducing MTTR from 41m to 12m\nTalent Development - Launched backend apprenticeship program with 3 promotions in first year",
        },
      ],
    },
    fullstack: {
      personalInfo: {
        fullName: "David Anderson",
        email: "david.anderson@email.com",
        phone: "+1 (555) 789-0123",
        location: "Austin, TX",
        title: "Full Stack Engineer",
        summary:
          "Versatile full stack engineer with 6+ years of experience building end-to-end web applications. Expert in both frontend and backend technologies, cloud infrastructure, and database design. Passionate about creating scalable solutions and optimizing performance across the entire stack.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Cloud Tech Solutions",
          position: "Senior Full Stack Engineer",
          startDate: "2021-09",
          endDate: "",
          current: true,
          description:
            "Architected and deployed microservices-based applications using Node.js, React, and PostgreSQL\nBuilt RESTful APIs and GraphQL endpoints serving 2M+ requests daily\nImplemented CI/CD pipelines with Docker and Kubernetes, reducing deployment time by 70%\nLed team of 4 developers in agile sprint planning and code reviews\nOptimized database queries resulting in 50% reduction in response times",
        },
        {
          id: "2",
          company: "StartupHub Inc",
          position: "Full Stack Developer",
          startDate: "2018-06",
          endDate: "2021-08",
          current: false,
          description:
            "Developed full stack web applications using React, Express.js, and MongoDB\nCreated real-time features using WebSocket and Socket.io\nIntegrated third-party APIs including Stripe, SendGrid, and AWS S3\nImplemented authentication and authorization using JWT and OAuth 2.0\nCollaborated with designers to create responsive, mobile-first interfaces",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Texas at Austin",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2014-09",
          endDate: "2018-05",
        },
      ],
      skills: buildSkills(
        "fullstack",
        [
          "JavaScript/TypeScript",
          "React/Next.js",
          "Node.js/Express",
          "Python/Django",
          "PostgreSQL/MongoDB",
          "Docker/Kubernetes",
          "AWS/Azure",
          "GraphQL/REST API",
          "Redis/RabbitMQ",
          "Git/CI-CD",
          "Microservices",
          "Testing (Jest/Cypress)",
        ],
        [9, 9, 8, 7, 8, 7, 7, 8, 7, 8, 7, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Projects & Achievements",
          content:
            "E-Commerce Platform - Built scalable marketplace handling 100K+ daily transactions\nReal-time Chat Application - Developed WebSocket-based chat with 10K concurrent users\nAWS Certified Solutions Architect - Associate Level\nContributed to open-source projects with 1K+ GitHub stars",
        },
      ],
    },
    backend: {
      personalInfo: {
        fullName: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 234-8901",
        location: "San Francisco, CA",
        title: "Backend Developer",
        summary:
          "Experienced backend developer with 5+ years building scalable server-side applications and APIs. Expert in Node.js, Python, and database design. Passionate about clean architecture, performance optimization, and delivering reliable systems that power mission-critical applications.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Tech Solutions Inc",
          position: "Senior Backend Developer",
          startDate: "2021-03",
          endDate: "",
          current: true,
          description:
            "Designed and implemented RESTful APIs serving 5M+ requests daily with 99.9% uptime\nBuilt microservices architecture using Node.js, Express, and PostgreSQL\nOptimized database queries reducing response times by 60%\nImplemented caching strategies using Redis improving performance by 40%\nLed code reviews and mentored junior developers on best practices",
        },
        {
          id: "2",
          company: "Digital Innovations",
          position: "Backend Developer",
          startDate: "2019-06",
          endDate: "2021-02",
          current: false,
          description:
            "Developed scalable backend services using Python Django and Flask\nIntegrated third-party APIs including payment gateways and analytics services\nImplemented JWT-based authentication and role-based access control\nCreated automated testing suites achieving 85% code coverage\nParticipated in agile development with bi-weekly sprint cycles",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: buildSkills(
        "backend",
        [
          "Node.js/Express",
          "Python/Django",
          "PostgreSQL/MySQL",
          "MongoDB",
          "Redis",
          "Docker",
          "Kubernetes",
          "AWS/GCP",
          "REST APIs",
          "GraphQL",
          "Microservices",
          "Git/CI-CD",
          "Testing (Jest/Pytest)",
          "Message Queues (RabbitMQ)",
        ],
        [9, 8, 8, 7, 7, 7, 7, 8, 8, 7, 7, 8, 7, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications & Projects",
          content:
            "AWS Certified Developer - Associate\nAPI Gateway Design - Built high-performance API gateway handling 10M+ daily requests\nDatabase Optimization - Reduced query times by 70% through indexing and optimization\nOpen Source Contributions - Active contributor to Node.js ecosystem projects",
        },
      ],
    },
    senior: {
      personalInfo: {
        fullName: "Taylor Foster",
        email: "taylor.foster@email.com",
        phone: "+1 (512) 312-7001",
        location: "Austin, TX",
        title: "Senior Software Engineer",
        summary:
          "Passionate senior software engineer with 10+ years building scalable web applications and backend platforms. Adept at leading cross-functional teams, designing resilient systems, and transforming business requirements into reliable products. Advocate for engineering excellence, measurable impact, and mentorship.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Blackbaud",
          position: "Lead Software Engineer",
          startDate: "2021-01",
          endDate: "",
          current: true,
          description:
            "Directed end-to-end migration of monolith services to Python 3.8 and Kubernetes\nBuilt automated testing suites that removed redundant manual QA and reduced regressions by 40%\nDelivered analytics dashboards that improved release visibility and decision making for executives\nMentored a team of 6 engineers, introducing peer review practices and leveling resources",
        },
        {
          id: "2",
          company: "Wayfair",
          position: "Senior Software Engineer",
          startDate: "2017-02",
          endDate: "2020-12",
          current: false,
          description:
            "Productized an automation platform adopted by three enterprise programs, saving $600K annually\nRe-architected critical data services to cut page latency by 50% and boost conversion\nLed reliability guild in scaling monitoring and incident response across 30+ microservices",
        },
        {
          id: "3",
          company: "Target",
          position: "Software Developer",
          startDate: "2015-05",
          endDate: "2017-01",
          current: false,
          description:
            "Implemented configuration tooling that accelerated performance testing cycles by 35%\nDelivered in-memory reporting APIs serving 1M+ daily requests with sub-second latency\nPartnered with product and ops to reduce critical incident response times by 20%",
        },
        {
          id: "4",
          company: "Redfin",
          position: "Junior Software Engineer",
          startDate: "2013-06",
          endDate: "2015-04",
          current: false,
          description:
            "Launched customer engagement features that unlocked $18K in new monthly revenue\nOptimized heavy batch automation reducing processing times from minutes to seconds\nSpearheaded defect triage that cleared 40% of legacy backlog within two quarters",
        },
      ],
      education: [
        {
          id: "1",
          school: "The University of Arizona",
          degree: "Executive MBA",
          field: "Engineering Management",
          startDate: "2010-08",
          endDate: "2011-05",
        },
        {
          id: "2",
          school: "North Carolina Wesleyan College",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2006-08",
          endDate: "2009-05",
        },
      ],
      skills: buildSkills(
        "senior",
        [
          "Java",
          "C++",
          "Python",
          "Node.js",
          "MySQL",
          "PostgreSQL",
          "System Design",
          "Cloud Architecture",
          "Microservices",
          "CI/CD",
          "Team Leadership",
          "Mentoring",
        ],
        [9, 8, 8, 8, 8, 8, 9, 9, 8, 8, 9, 9],
      ),
      sections: [
        {
          id: "achievements",
          title: "Achievements",
          content:
            "Spearheaded a $12M software platform launch, coordinating engineering, QA, and product\nDelivered 30% query efficiency gains by redesigning MySQL schemas and caching strategy\nLed a year-long multi-team release delivering six coordinated platform modules\nBuilt customer support chatbot that cut contact center handling time by 240%",
        },
        {
          id: "operating-systems",
          title: "Operating Systems",
          content: "Unix\nSolaris\nLinux\nWindows",
        },
        {
          id: "strengths",
          title: "Strengths",
          content:
            "Gold Medalist - Recognized for five consecutive years of academic excellence\nCorporate Social Responsibility - Volunteer lead for mentorship and tech education programs",
        },
        {
          id: "references",
          title: "References",
          content:
            "Richard Smith, CEO - Wolf Inc | richard.smith@wolfinC.com | 212-330-1122\nNeil Johnson, CFO - Reilly Group | neil.johnson@reilly.com | 618-233-0090",
        },
      ],
    },
    graduate: {
      personalInfo: {
        fullName: "Arjun Mehta",
        email: "arjun.mehta@email.com",
        phone: "+91 98765 43210",
        location: "Pune, India",
        title: "Computer Science Graduate - Full Stack Development",
        summary:
          "Motivated Computer Science graduate with strong foundation in software development, data structures, and algorithms. Completed two internships and multiple academic projects in web development. Eager to apply technical skills and learn from experienced engineers in a collaborative development environment.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "CodeCraft Solutions",
          position: "Software Development Intern",
          startDate: "2024-01",
          endDate: "2024-04",
          current: false,
          description:
            "Developed responsive web applications using React.js and Node.js\nBuilt RESTful APIs and integrated third-party services\nCollaborated with team of 4 developers using Git and Agile methodology\nWrote unit tests achieving 80% code coverage using Jest\nParticipated in code reviews and daily standup meetings",
        },
        {
          id: "2",
          company: "WebTech Innovations",
          position: "Frontend Development Intern",
          startDate: "2023-06",
          endDate: "2023-08",
          current: false,
          description:
            "Created UI components using React and Tailwind CSS\nImproved website load time by 25% through code optimization\nWorked with designers to implement responsive designs\nGained hands-on experience with modern JavaScript frameworks",
        },
      ],
      education: [
        {
          id: "1",
          school: "College of Engineering Pune",
          degree: "Bachelor of Engineering",
          field: "Computer Science & Engineering",
          startDate: "2020-08",
          endDate: "2024-05",
        },
      ],
      skills: buildSkills(
        "graduate",
        [
          "JavaScript",
          "React.js",
          "Node.js",
          "HTML/CSS",
          "Python",
          "Java",
          "SQL",
          "Git",
          "REST APIs",
          "MongoDB",
          "Data Structures",
          "Problem Solving",
        ],
        [8, 7, 7, 8, 7, 7, 6, 7, 6, 6, 8, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Final Year Project",
          content:
            "E-Commerce Web Application\nBuilt full-stack online shopping platform with product catalog and cart functionality\nImplemented user authentication, payment integration, and order management\nTech Stack: React, Node.js, Express, MongoDB, Stripe API\nAchieved First Class with Distinction (92% marks)",
        },
        {
          id: "2",
          title: "Mini Project",
          content:
            "Task Management App\nDeveloped responsive task tracking application with real-time updates\nFeatures: User authentication, task categories, due date reminders\nTech Stack: React, Firebase, Material-UI\nDeployed on Vercel with 100+ active users",
        },
        {
          id: "3",
          title: "Certifications & Achievements",
          content:
            "Winner - College Hackathon 2023 (Team of 3, built AI chatbot in 24 hours)\nAWS Certified Cloud Practitioner (2024)\nCompleted 150+ problems on LeetCode (Data Structures & Algorithms)\nGitHub: 12 public repositories with 50+ stars combined\nMember of Coding Club - Organized technical workshops for juniors",
        },
      ],
    },
    starter: {
      personalInfo: {
        fullName: "Anjali Reddy",
        email: "anjali.reddy@email.com",
        phone: "+91 98765 12345",
        location: "Hyderabad, India",
        title: "MBA Graduate - Marketing & Business Development",
        summary:
          "Results-oriented MBA graduate with practical experience in digital marketing, market research, and brand management through multiple internships. Strong analytical and communication skills with ability to develop data-driven marketing strategies. Seeking opportunities to contribute fresh ideas and grow in a dynamic marketing environment.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Digital Solutions India",
          position: "Marketing Intern",
          startDate: "2024-01",
          endDate: "2024-04",
          current: false,
          description:
            "• Managed social media campaigns across Instagram and LinkedIn for 3 B2B clients\n• Created content calendar and executed 40+ posts resulting in 35% engagement increase\n• Conducted competitor analysis and market research for new product launches\n• Assisted in email marketing campaigns achieving 20% average open rate\n• Prepared monthly analytics reports tracking key marketing metrics",
        },
        {
          id: "2",
          company: "TechStart Incubator",
          position: "Business Development Intern",
          startDate: "2023-06",
          endDate: "2023-08",
          current: false,
          description:
            "• Identified and qualified 50+ potential leads through LinkedIn outreach\n• Created sales presentations and pitch decks for startup founders\n• Assisted in client meetings and follow-up communications\n• Maintained CRM database and tracked sales pipeline activities",
        },
      ],
      education: [
        {
          id: "1",
          school: "Indian School of Business",
          degree: "Master of Business Administration",
          field: "Marketing & Strategy",
          startDate: "2022-06",
          endDate: "2024-05",
        },
        {
          id: "2",
          school: "Osmania University",
          degree: "Bachelor of Commerce",
          field: "Commerce & Accountancy",
          startDate: "2019-06",
          endDate: "2022-04",
        },
      ],
      skills: buildSkills(
        "starter",
        [
          "Digital Marketing",
          "Market Research",
          "Content Strategy",
          "Social Media Marketing",
          "Google Analytics",
          "SEO Basics",
          "MS Office Suite",
          "Canva",
          "Email Marketing",
          "Data Analysis",
          "Business Communication",
        ],
        [8, 7, 7, 7, 7, 6, 8, 7, 6, 6, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Final Year Project",
          content:
            "Brand Strategy for D2C Startup\n• Developed go-to-market strategy for sustainable fashion brand\n• Conducted primary research with 300+ potential customers across 3 cities\n• Created brand positioning framework and marketing mix recommendations\n• Presented findings to startup founders; received 94% marks",
        },
        {
          id: "2",
          title: "Mini Project",
          content:
            "Social Media Campaign for NGO\n• Designed and executed 2-month awareness campaign for education NGO\n• Generated 8,000+ impressions and 400+ website visits organically\n• Increased volunteer registrations by 40% through targeted content",
        },
        {
          id: "3",
          title: "Certifications",
          content:
            "• Google Digital Marketing & E-Commerce Professional Certificate (2024)\n• HubSpot Inbound Marketing Certification (2024)\n• Facebook Blueprint - Social Media Marketing (2023)\n• Microsoft Excel for Business Specialization (2023)",
        },
      ],
    },
    fresher: {
      personalInfo: {
        fullName: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91 98765 54321",
        location: "Bangalore, India",
        title: "Computer Science Graduate - Software Developer",
        summary:
          "Recent Computer Science graduate with strong programming fundamentals and hands-on experience in web development through internships and academic projects. Passionate about creating efficient, user-friendly applications and eager to contribute to innovative software solutions in a collaborative team environment.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "TechStart Solutions",
          position: "Software Development Intern",
          startDate: "2024-02",
          endDate: "2024-05",
          current: false,
          description:
            "Developed responsive web applications using React.js, Node.js, and MongoDB\nBuilt RESTful APIs and integrated third-party payment services\nCollaborated with cross-functional team of 6 developers using Git and Agile methodology\nImplemented automated testing achieving 85% code coverage using Jest\nOptimized application performance resulting in 30% faster load times",
        },
        {
          id: "2",
          company: "Digital Wave Agency",
          position: "Frontend Development Intern",
          startDate: "2023-06",
          endDate: "2023-08",
          current: false,
          description:
            "• Created interactive UI components using React and Tailwind CSS\n• Collaborated with UX designers to implement pixel-perfect responsive designs\n• Improved website accessibility scores by 40% following WCAG guidelines\n• Gained hands-on experience with modern JavaScript frameworks and tools",
        },
      ],
      education: [
        {
          id: "1",
          school: "National Institute of Technology, Karnataka",
          degree: "Bachelor of Technology",
          field: "Computer Science & Engineering",
          startDate: "2020-08",
          endDate: "2024-06",
        },
        {
          id: "2",
          school: "Delhi Public School",
          degree: "Class XII (CBSE)",
          field: "Mathematics, Physics, Chemistry",
          startDate: "2018-04",
          endDate: "2020-03",
        },
      ],
      skills: buildSkills(
        "fresher",
        [
          "JavaScript",
          "React.js",
          "Node.js",
          "Python",
          "Java",
          "HTML/CSS",
          "MongoDB",
          "MySQL",
          "Git & GitHub",
          "REST APIs",
          "Data Structures",
          "Algorithms",
        ],
        [8, 8, 7, 8, 7, 9, 7, 7, 8, 7, 8, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Academic Projects",
          content:
            "E-Learning Platform (Final Year Project)\nBuilt full-stack online learning platform with course management and video streaming\nImplemented user authentication, progress tracking, and interactive quizzes\nTech Stack: React.js, Node.js, Express.js, MongoDB, Socket.io\nAchieved 95% marks and recognition as Best Project in Computer Science\n\nTask Management Web App\nDeveloped responsive task tracking application with real-time collaboration\nFeatures: Drag-and-drop interface, deadline notifications, team workspace\nTech Stack: React.js, Firebase, Material-UI\nDeployed on Vercel with 200+ active users during beta testing",
        },
        {
          id: "2",
          title: "Achievements & Certifications",
          content:
            "Winner - National Level Hackathon 2023 (Built AI-powered study assistant in 36 hours)\nAWS Certified Cloud Practitioner (2024)\nGoogle Cloud Associate Cloud Engineer (2024)\nSolved 200+ coding problems on LeetCode and GeeksforGeeks\nGitHub: 15 public repositories with 80+ combined stars\nTechnical Lead - College Coding Club (Organized workshops for 100+ students)",
        },
      ],
    },
    "premium-fresher": {
      personalInfo: {
        fullName: "Alex Chen",
        email: "alex.chen@email.com",
        phone: "+1 (555) 987-6543",
        location: "San Francisco, CA",
        title: "Computer Science Graduate - Full Stack Developer",
        summary:
          "Recent Computer Science graduate with a passion for creating innovative web applications and a strong foundation in modern development technologies. Proven ability to deliver high-quality software solutions through academic projects and internships, with expertise in both frontend and backend development.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "InnovateTech Solutions",
          position: "Full Stack Development Intern",
          startDate: "2024-01",
          endDate: "2024-06",
          current: false,
          description:
            "Developed full-stack web applications using React.js, Node.js, and PostgreSQL\nImplemented responsive UI components with modern CSS frameworks and animations\nBuilt RESTful APIs and integrated third-party services (Stripe, SendGrid)\nCollaborated in Agile environment using Git, Jira, and daily standups\nAchieved 90% test coverage using Jest and Cypress for automated testing",
        },
        {
          id: "2",
          company: "StartupLab Inc.",
          position: "Frontend Development Intern",
          startDate: "2023-07",
          endDate: "2023-12",
          current: false,
          description:
            "Created interactive user interfaces using React.js, TypeScript, and Tailwind CSS\nOptimized application performance resulting in 45% faster page load times\nImplemented accessibility features following WCAG 2.1 guidelines\nCollaborated with UX/UI designers to create pixel-perfect responsive designs\nParticipated in code reviews and mentored junior developers",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2020-08",
          endDate: "2024-05",
        },
        {
          id: "2",
          school: "Berkeley High School",
          degree: "High School Diploma",
          field: "College Preparatory",
          startDate: "2016-09",
          endDate: "2020-06",
        },
      ],
      skills: buildSkills(
        "fresher",
        [
          "JavaScript",
          "TypeScript",
          "React.js",
          "Node.js",
          "Python",
          "Java",
          "HTML/CSS",
          "SQL",
          "Git & GitHub",
          "Docker",
          "AWS",
          "MongoDB",
        ],
        [9, 8, 9, 8, 8, 7, 9, 8, 9, 6, 6, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Featured Projects",
          content:
            "E-Commerce Platform (Capstone Project)\nBuilt complete e-commerce solution with user authentication, product catalog, and payment processing\nFeatures: Real-time inventory management, order tracking, and admin dashboard\nTech Stack: React.js, Node.js, Express.js, PostgreSQL, Stripe API, Redis\nDeployed on AWS with CI/CD pipeline using GitHub Actions\nAchieved 95% test coverage and handled 1000+ concurrent users\n\nSocial Media Dashboard\nDeveloped analytics dashboard for social media management with real-time data visualization\nImplemented data fetching from multiple APIs (Twitter, Instagram, Facebook)\nFeatures: Custom charts, export functionality, and responsive design\nTech Stack: React.js, Chart.js, Python Flask, MongoDB\nOpen-sourced on GitHub with 150+ stars",
        },
        {
          id: "2",
          title: "Achievements & Recognition",
          content:
            "Winner - Google Code Jam 2024 (Top 1000 globally out of 100,000+ participants)\nAWS Certified Cloud Practitioner (2024)\nMicrosoft Azure Fundamentals Certified (2024)\nLeetCode: 500+ problems solved with 90%+ accuracy\nGitHub: 25+ public repositories with 200+ combined stars\nPresident - Computer Science Club (Led 150+ members and organized 20+ tech workshops)\nDean's List - 8 consecutive semesters (GPA: 3.8/4.0)",
        },
      ],
    },
    "premium-universal": {
      personalInfo: {
        fullName: "Jordan Smith",
        email: "jordan.smith@email.com",
        phone: "+1 (555) 789-0123",
        location: "Denver, CO",
        title: "Business Analyst",
        summary:
          "Detail-oriented business analyst with strong analytical skills and proven track record of translating complex business requirements into actionable insights. Experienced in data analysis, process improvement, and cross-functional collaboration.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Tech Solutions Corp",
          position: "Business Analyst",
          startDate: "2021-03",
          endDate: "",
          current: true,
          description:
            "Analyze business processes and identify areas for improvement\nCollaborate with stakeholders to gather and document requirements\nCreate detailed reports and presentations for senior management\nLead implementation of new CRM system affecting 200+ users",
        },
        {
          id: "2",
          company: "Consulting Group LLC",
          position: "Junior Analyst",
          startDate: "2019-06",
          endDate: "2021-02",
          current: false,
          description:
            "Conducted market research and competitive analysis\nDeveloped financial models and forecasts\nSupported senior analysts on client projects",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Colorado",
          degree: "Bachelor of Business Administration",
          field: "Business Analytics",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: buildSkills(
        "premium-universal",
        [
          "Data Analysis",
          "SQL",
          "Excel",
          "Tableau",
          "Power BI",
          "Process Mapping",
          "Requirements Gathering",
          "Project Management",
        ],
        [8, 8, 9, 7, 7, 8, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications",
          content:
            "Certified Business Analysis Professional (CBAP)\nGoogle Data Analytics Professional Certificate",
        },
      ],
    },
    "premium-pro": {
      personalInfo: {
        fullName: "Alexandra Martinez",
        email: "alexandra.martinez@email.com",
        phone: "+1 (555) 890-1234",
        location: "Boston, MA",
        title: "Marketing Manager",
        summary:
          "Strategic marketing professional with 7+ years of experience driving brand growth and customer engagement. Expertise in digital marketing, campaign management, and data-driven decision making. Proven track record of increasing ROI and building strong customer relationships.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "TechBrand Solutions",
          position: "Senior Marketing Manager",
          startDate: "2021-01",
          endDate: "",
          current: true,
          description:
            "Lead integrated marketing campaigns resulting in 45% increase in qualified leads\nManage $2M annual marketing budget across digital and traditional channels\nDevelop and execute content strategy increasing website traffic by 60%\nCollaborate with sales team to optimize lead nurturing and conversion",
        },
        {
          id: "2",
          company: "Creative Agency Inc",
          position: "Marketing Specialist",
          startDate: "2018-03",
          endDate: "2020-12",
          current: false,
          description:
            "Managed social media strategy across multiple platforms\nDeveloped email marketing campaigns with 25% open rate improvement\nCoordinated events and product launches",
        },
      ],
      education: [
        {
          id: "1",
          school: "Boston University",
          degree: "Master of Business Administration",
          field: "Marketing",
          startDate: "2016-09",
          endDate: "2018-05",
        },
        {
          id: "2",
          school: "University of Massachusetts",
          degree: "Bachelor of Science",
          field: "Communications",
          startDate: "2012-09",
          endDate: "2016-05",
        },
      ],
      skills: buildSkills(
        "premium-pro",
        [
          "Digital Marketing",
          "SEO & SEM",
          "Google Analytics",
          "Marketing Automation",
          "Content Strategy",
          "Social Media Marketing",
          "Brand Management",
          "Campaign Management",
        ],
        [9, 8, 8, 8, 9, 8, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications",
          content:
            "Google Ads Certification\nHubSpot Content Marketing Certification\nFacebook Blueprint Certification",
        },
      ],
    },
    "fresher-elite": {
      personalInfo: {
        fullName: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        location: "Mumbai, India",
        title: "Computer Science Graduate",
        summary:
          "Passionate computer science graduate with strong foundation in software development and problem-solving. Experienced in building full-stack web applications and eager to contribute to innovative technology solutions. Quick learner with excellent collaboration skills.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "TechStart Solutions",
          position: "Software Development Intern",
          startDate: "2024-01",
          endDate: "2024-06",
          current: false,
          description:
            "Developed RESTful APIs using Node.js and Express, serving 10,000+ users\nBuilt responsive frontend components with React and TypeScript\nImplemented unit tests achieving 85% code coverage\nCollaborated with team of 5 developers using Agile methodology",
        },
        {
          id: "2",
          company: "College Tech Club",
          position: "Technical Lead",
          startDate: "2023-07",
          endDate: "2024-05",
          current: false,
          description:
            "Led team of 12 members in organizing coding workshops and hackathons\nMentored 30+ junior students in web development and DSA\nOrganized college tech fest with 500+ participants",
        },
      ],
      education: [
        {
          id: "1",
          school: "Indian Institute of Technology",
          degree: "Bachelor of Technology",
          field: "Computer Science",
          startDate: "2020-08",
          endDate: "2024-06",
        },
      ],
      skills: buildSkills(
        "fresher-elite",
        [
          "JavaScript",
          "React.js",
          "Node.js",
          "Python",
          "SQL",
          "Git",
          "MongoDB",
          "TypeScript",
          "HTML/CSS",
          "REST APIs",
        ],
        [9, 9, 8, 8, 8, 9, 7, 8, 9, 8],
      ),
      sections: [
        {
          id: "1",
          title: "Academic Projects",
          content:
            "E-Learning Platform (Final Year Project)\nDeveloped full-stack online learning platform with video streaming and live chat\nBuilt with MERN stack, Redis for caching, and AWS S3 for video storage\nImplemented JWT authentication and role-based access control\nAchieved 95% project grade and presented at college symposium\n\nReal-Time Chat Application\nBuilt scalable chat app using Socket.io, React, and Node.js\nImplemented features: group chats, file sharing, message encryption\nDeployed on Heroku with MongoDB Atlas database\n\nAI-Powered Resume Analyzer\nCreated ML model to analyze resumes and provide improvement suggestions\nUsed Python, NLP, and Flask for backend API\nAchieved 88% accuracy in keyword detection",
        },
        {
          id: "2",
          title: "Achievements",
          content:
            "🏆 Winner - Smart India Hackathon 2023 (National Level)\n🏆 1st Place - College Code Sprint 2023\n⭐ LeetCode: Solved 350+ problems, Contest Rating: 1650+\n⭐ CodeChef: 4-star coder (Max Rating: 1820)\n📜 AWS Certified Cloud Practitioner (2024)\n📜 Google Cloud Associate Engineer (2024)\n🎓 Dean's List - All 8 semesters (CGPA: 9.2/10)",
        },
      ],
    },
    analyst: {
      personalInfo: {
        fullName: "Herman Walton",
        email: "example@gmail.com",
        phone: "(412) 479-6342",
        location: "Market Street 12, New York, 1021, The USA",
        title: "Financial Analyst",
        summary:
          "Experienced and driven Financial Analyst with an impressive background of managing multi-million dollar budgets while providing analysis and account support within product development departments. Worked to reduce business expenses and develop logical and advantageous operating plan budgets. Experience creating quarterly accruals based on trends and forecasted expenses.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "GEO Corp.",
          position: "Financial Analyst",
          startDate: "Jan 2012",
          endDate: "",
          current: true,
          description:
            "Created budgets and ensured that labor and material costs were decreased by 15 percent.\nCreated financial reports on completed projects, indicating advantageous results.\nGenerated financial statements including cash flow charts and balance sheets.\nCreated analysis and performance reports for management teams to review.\nIntroduced and implemented a different type of software to enhance communication of different organization.",
        },
        {
          id: "2",
          company: "Cisco Enterprises",
          position: "Financial Analyst",
          startDate: "Feb 2008",
          endDate: "Dec 2012",
          current: false,
          description:
            "Provide reports, ad-hoc analysis, annual operations plan budgets, monthly cash forecasts, and revenue forecasts.\nAnalyzed supplier contracts and advised in negotiations bringing budgets down by 6%.\nCreated weekly labor finance reports and presented the results to management.",
        },
      ],
      education: [
        {
          id: "1",
          school: "University of Arizona",
          degree: "Diploma in Computer Engineering",
          field: "",
          startDate: "Aug 2006",
          endDate: "Oct 2008",
        },
        {
          id: "2",
          school: "University of Arizona",
          degree: "Bachelor in Computer Engineering",
          field: "",
          startDate: "Aug 2004",
          endDate: "Oct 2006",
        },
      ],
      skills: buildSkills(
        "analyst",
        [
          "Solution Strategies",
          "Analytical Thinker",
          "Innovation",
          "Agile Methodologies",
          "Effective Team leader",
          "Market Assessment",
          "Collaboration",
          "Creative Problem Solving",
          "Customer-centric Selling",
          "Trend Analysis",
          "Source Control",
          "Networking",
        ],
        [9, 9, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Additional Information",
          content:
            "Languages: English, French\nCertificates: Financial Analyst License\nAwards/Activities: Most Innovate Employer of the Year (2011), Overall Best Employee Division Two (2009)",
        },
      ],
    },
    elite: {
      personalInfo: {
        fullName: "Victoria Sterling",
        email: "v.sterling@professional.com",
        phone: "+1 (555) 789-0123",
        location: "Seattle, WA",
        title: "Executive Business Consultant",
        summary:
          "Strategic business consultant with 12+ years of experience driving transformational change and delivering measurable results for Fortune 500 companies. Specialized in operational excellence, change management, and strategic planning. Proven track record of leading cross-functional teams and implementing solutions that increase revenue and reduce costs.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "Global Consulting Partners",
          position: "Senior Business Consultant",
          startDate: "Mar 2019",
          endDate: "",
          current: true,
          description:
            "Lead strategic initiatives for enterprise clients with annual revenues exceeding $1B\nDeveloped and implemented operational strategies resulting in 35% efficiency improvement\nManaged portfolio of 8 concurrent client engagements with 100% satisfaction rating\nMentored team of 12 junior consultants and facilitated professional development programs\nPresented findings and recommendations to C-suite executives and board members",
        },
        {
          id: "2",
          company: "Strategic Solutions Inc",
          position: "Business Analyst & Consultant",
          startDate: "Jun 2015",
          endDate: "Feb 2019",
          current: false,
          description:
            "Conducted comprehensive business analysis and market research for clients across multiple industries\nDesigned and executed change management strategies for organizational restructuring\nFacilitated stakeholder workshops and strategy sessions with executive leadership\nDeveloped data-driven recommendations that increased client profitability by average of 28%",
        },
        {
          id: "3",
          company: "Innovation Corp",
          position: "Junior Business Analyst",
          startDate: "Sep 2012",
          endDate: "May 2015",
          current: false,
          description:
            "Analyzed business processes and identified opportunities for optimization\nCreated detailed reports and presentations for senior management\nCollaborated with IT teams to implement process automation solutions\nSupported senior consultants in client-facing engagements and project delivery",
        },
      ],
      education: [
        {
          id: "1",
          school: "Harvard Business School",
          degree: "Master of Business Administration",
          field: "Strategy & Operations",
          startDate: "2010-09",
          endDate: "2012-06",
        },
        {
          id: "2",
          school: "University of Washington",
          degree: "Bachelor of Science",
          field: "Business Administration",
          startDate: "2006-09",
          endDate: "2010-06",
        },
      ],
      skills: buildSkills(
        "elite",
        [
          "Strategic Planning",
          "Change Management",
          "Business Analysis",
          "Project Management",
          "Stakeholder Engagement",
          "Process Optimization",
          "Financial Modeling",
          "Data Analytics",
          "Leadership & Mentoring",
          "Executive Presentations",
          "Risk Management",
          "Agile Methodologies",
        ],
        [10, 9, 9, 9, 9, 8, 8, 8, 9, 9, 8, 7],
      ),
      sections: [
        {
          id: "1",
          title: "Certifications & Awards",
          content:
            "Project Management Professional (PMP) - PMI Certified\nCertified Management Consultant (CMC) - Institute of Management Consultants\nLean Six Sigma Black Belt\nConsultant of the Year Award 2022 - Global Consulting Partners\nTop 40 Under 40 Business Leaders - Seattle Business Journal 2021",
        },
        {
          id: "2",
          title: "Speaking & Publications",
          content:
            "Keynote Speaker - Annual Business Transformation Summit 2023\nPublished Article: 'Digital Transformation in Enterprise' - Harvard Business Review\nGuest Lecturer - University of Washington Business School (2020-Present)\nPanelist - Women in Leadership Conference 2022",
        },
      ],
    },
    "corporate-executive": {
      personalInfo: {
        fullName: "Robert Anderson",
        email: "r.anderson@executive.com",
        phone: "+1 (555) 890-1234",
        location: "New York, NY",
        title: "Chief Operating Officer",
        summary:
          "Results-driven executive leader with 18+ years of experience driving organizational excellence and strategic growth initiatives. Proven expertise in operations management, business transformation, and P&L leadership. Successfully scaled operations for Fortune 500 companies while maintaining focus on efficiency, innovation, and sustainable growth.",
        photo: "",
      },
      experience: [
        {
          id: "1",
          company: "TechVision Corp",
          position: "Chief Operating Officer",
          startDate: "2020-01",
          endDate: "",
          current: true,
          description:
            "Lead operational strategy and execution for $2B+ technology enterprise with 3,500+ employees across 15 global locations\nDrive digital transformation initiatives resulting in 40% operational efficiency improvement and $50M annual cost savings\nOversee cross-functional teams including product development, supply chain, customer success, and business operations\nPartner with CEO and board on strategic planning, M&A activities, and long-term growth strategies\nImplement data-driven decision frameworks and KPI dashboards for executive leadership team",
        },
        {
          id: "2",
          company: "Global Systems Inc",
          position: "Senior Vice President of Operations",
          startDate: "2015-06",
          endDate: "2019-12",
          current: false,
          description:
            "Managed operations for $800M division with 1,200+ employees across multiple business units\nLed operational excellence program achieving 35% improvement in process efficiency metrics\nSuccessfully integrated 3 strategic acquisitions totaling $200M in combined revenue\nBuilt high-performing leadership team and established succession planning framework\nReduced operating costs by 25% while improving customer satisfaction scores by 30%",
        },
        {
          id: "3",
          company: "Enterprise Solutions LLC",
          position: "Director of Business Operations",
          startDate: "2010-03",
          endDate: "2015-05",
          current: false,
          description:
            "Directed business operations for fast-growing SaaS company scaling from $50M to $300M revenue\nDeveloped and executed operational strategies supporting 500% revenue growth over 5 years\nEstablished operational infrastructure including systems, processes, and organizational structure\nLed cross-functional initiatives spanning sales operations, customer success, and product delivery",
        },
      ],
      education: [
        {
          id: "1",
          school: "Harvard Business School",
          degree: "Master of Business Administration",
          field: "Strategy & Operations",
          startDate: "2008-09",
          endDate: "2010-05",
        },
        {
          id: "2",
          school: "University of Michigan",
          degree: "Bachelor of Science",
          field: "Industrial Engineering",
          startDate: "2004-09",
          endDate: "2008-05",
        },
      ],
      skills: buildSkills(
        "corporate-executive",
        [
          "Strategic Leadership",
          "Operations Management",
          "P&L Management",
          "Business Transformation",
          "Change Leadership",
          "Team Building",
          "Process Optimization",
          "M&A Integration",
          "Financial Planning",
          "Data Analytics",
          "Board Relations",
          "Executive Communication",
        ],
        [10, 10, 9, 9, 9, 9, 8, 8, 8, 8, 9, 9],
      ),
      sections: [
        {
          id: "1",
          title: "Board & Advisory Roles",
          content:
            "Board Member - TechGrowth Foundation (2022-Present)\nAdvisory Board - StartupScale Accelerator (2021-Present)\nMentor - Executive Leadership Program at Columbia Business School",
        },
        {
          id: "2",
          title: "Recognition & Awards",
          content:
            "COO of the Year - Tech Leadership Awards 2023\nTop 50 Most Influential Executives - Business Quarterly 2022\n40 Under 40 - Business Excellence Magazine 2018\nPublished: 'Operational Excellence in the Digital Age' - Harvard Business Review",
        },
      ],
    },
  };

  // For new templates without specific defaults, use professional template data
  const newTemplatesUsingProfessionalDefaults = [
    "timeline-elegance",
    "executive-minimal",
    "sidebar-accent",
    "geometric-modern",
    "two-tone-classic",
    "bordered-elegance",
    "column-divide",
    "compact-professional",
    "code-minimal",
    "tech-stack-pro",
    "github-style",
    "developer-grid",
    "terminal-theme",
    "algo-engineer",
    "fullstack-modern",
    "devops-pro",
    "ml-engineer",
    "artistic-bold",
    "designer-showcase",
    "creative-timeline",
    "colorful-modern",
    "asymmetric-creative",
    // New 2024 Templates
    "strategic-executive",
    "professional-sphere",
    "global-professional",
    "professional-horizon",
    "executive-prime",
    "corporate-momentum",
    "professional-ascend",
    "global-elite",
    "executive-vision",
    "corporate-fusion",
    "professional-zenith",
    "executive-core",
    "code-craftsman",
    "tech-pioneer",
    "dev-architecture",
    "software-master",
    "tech-vanguard",
    "code-sphere",
    "dev-elite",
    "tech-horizon",
    "software-craftsman",
    "code-vision",
    "dev-prime",
    "tech-crafted",
    "software-vision",
    "code-pinnacle",
    "dev-momentum",
    "creative-canvas",
    "design-maestro",
    "artistic-vision",
    "creative-pulse",
    "design-pinnacle",
    "artistic-horizon",
    "creative-crafted",
    "design-sphere",
    "artistic-momentum",
    "creative-horizon",
    "graduate-momentum",
    "entry-elite",
    "freshers-vision",
    "graduate-prime",
    "entry-horizon",
    "freshers-crafted",
    "graduate-zenith",
    "entry-sphere",
    // 2025 Batch 4 - 100 New Templates
    "crystal-executive",
    "quantum-professional",
    "zenith-corporate",
    "aurora-minimal",
    "nexus-elite",
    "harmony-executive",
    "prism-professional",
    "titan-corporate",
    "serenity-minimal",
    "velocity-executive",
    "eclipse-professional",
    "sterling-executive",
    "meridian-corporate",
    "cosmos-professional",
    "pinnacle-elite",
    "flux-executive",
    "vertex-professional",
    "radiance-corporate",
    "atlas-executive",
    "spectrum-professional",
    "codeforge-developer",
    "quantum-coder",
    "neural-engineer",
    "pixelcraft-developer",
    "cloudnative-architect",
    "bytecode-specialist",
    "agileflow-developer",
    "stackmaster-fullstack",
    "gitflow-engineer",
    "compile-time-dev",
    "microarch-engineer",
    "serverless-specialist",
    "edgecompute-developer",
    "webrtc-engineer",
    "graphdb-specialist",
    "containerops-engineer",
    "apigateway-architect",
    "observability-engineer",
    "eventdriven-architect",
    "mlops-engineer",
    "launchpad-graduate",
    "momentum-fresher",
    "horizon-graduate",
    "catalyst-fresher",
    "pathway-graduate",
    "spark-fresher",
    "ascend-graduate",
    "pioneer-fresher",
    "keystone-graduate",
    "venture-fresher",
    "aspire-graduate",
    "emerge-fresher",
    "bright-graduate",
    "nextstep-fresher",
    "foundation-graduate",
    "elevate-fresher",
    "genesis-graduate",
    "achiever-fresher",
    "milestone-graduate",
    "potential-fresher",
    "muse-creative",
    "canvas-artist",
    "palette-designer",
    "visionary-creative",
    "studio-artist",
    "creative-pulse",
    "artisan-designer",
    "chromatic-creative",
    "expression-artist",
    "imaginative-designer",
    "aesthetic-creative",
    "composition-artist",
    "impression-designer",
    "narrative-creative",
    "craft-artist",
    "vibrant-designer",
    "concept-creative",
    "editorial-artist",
    "vision-designer",
    "curator-creative",
    "interface-master",
    "designsystem-architect",
    "userflow-designer",
    "prototype-specialist",
    "pixelperfect-designer",
    "responsive-ux",
    "wireframe-specialist",
    "microinteraction-designer",
    "accessibility-ux",
    "userresearch-specialist",
    "information-architect",
    "designthinking-specialist",
    "componentui-designer",
    "designops-specialist",
    "mobile-first-designer",
    "servicedesign-specialist",
    "designstrategy-lead",
    "conversational-ux",
    "motion-ui-designer",
    "designleadership-director",
    // 2025 Batch 5 - 100 New Templates
    "digital-professional",
    "networked-executive",
    "connected-professional",
    "linkedin-optimized",
    "social-executive",
    "online-professional",
    "webpresence-executive",
    "profile-centric",
    "global-networker",
    "modern-digital",
    "social-savvy",
    "platform-professional",
    "digital-executive",
    "branded-professional",
    "influencer-professional",
    "online-identity",
    "portfolio-professional",
    "digital-identity",
    "social-media-pro",
    "connected-leader",
    "github-portfolio-dev",
    "opensource-developer",
    "stackoverflow-dev",
    "codepen-developer",
    "portfolio-coder",
    "tech-blogger-dev",
    "youtube-dev-educator",
    "linkedin-tech-expert",
    "twitter-dev",
    "medium-tech-writer",
    "devto-contributor",
    "hackernews-developer",
    "gitlab-developer",
    "bitbucket-developer",
    "npm-package-author",
    "pypi-contributor",
    "dockerhub-publisher",
    "kaggle-data-scientist",
    "leetcode-champion",
    "hackerrank-expert",
    "gen-z-graduate",
    "digital-native-grad",
    "social-first-fresher",
    "portfolio-graduate",
    "project-showcase-grad",
    "github-student",
    "linkedin-graduate",
    "online-portfolio-fresher",
    "social-graduate",
    "digital-graduate",
    "web-portfolio-grad",
    "hackathon-graduate",
    "bootcamp-portfolio",
    "internship-showcase",
    "campus-influencer",
    "student-developer-portfolio",
    "digital-portfolio-grad",
    "online-presence-fresher",
    "networked-graduate",
    "profile-driven-grad",
    "behance-portfolio",
    "dribbble-showcase",
    "artstation-pro",
    "instagram-creative",
    "pinterest-designer",
    "youtube-creator",
    "tiktok-content-creator",
    "vimeo-videographer",
    "soundcloud-artist",
    "spotify-musician",
    "twitch-streamer-creative",
    "deviantart-artist",
    "patreon-creative",
    "medium-writer-creative",
    "substack-author",
    "portfolio-website-creative",
    "online-gallery-artist",
    "social-creative-influencer",
    "multi-platform-artist",
    "digital-artist-portfolio",
    "figma-designer-portfolio",
    "adobe-portfolio-designer",
    "sketch-expert-portfolio",
    "webflow-designer-portfolio",
    "framer-designer-portfolio",
    "uxfolio-designer",
    "coroflot-portfolio",
    "carbonmade-designer",
    "awwwards-designer",
    "uiux-portfolio-pro",
    "designportfolio-specialist",
    "casestudy-designer",
    "protfolio-showcase-ux",
    "interactive-portfolio-designer",
    "ux-researcher-portfolio",
    "product-designer-showcase",
    "design-systems-portfolio",
    "motion-designer-portfolio",
    "visual-designer-showcase",
    "design-leader-portfolio",
  ];

  // Add all new templates using professional defaults
  newTemplatesUsingProfessionalDefaults.forEach(id => {
    templates[id] = templates.professional;
  });

  return templates[templateId] || templates.professional;
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
  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    getTemplateDefaults(templateId || "professional"),
  );
  const [themeColor, setThemeColor] = useState<string>(() => {
    const saved = localStorage.getItem(`theme-${templateId}`);
    if (saved) return saved;

    const defaultThemeColors: Record<string, string> = {
      senior: "#0f766e",
      "senior-frontend": "#ec4899",
      "senior-backend": "#2563eb",
      software: "#2563eb",
      "premium-fresher": "#7C3AED",
      analyst: "#2563eb",
      elite: "#7c3aed",
    };

    return defaultThemeColors[templateId || ""] || "#7c3aed"; // default purple
  });
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

  // Load from local storage on mount
  useEffect(() => {
    if (!templateId) return;
    const key = `resume-${templateId}`;
    const savedData = localStorage.getItem(key);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as ResumeData;
        const badSummary = /8\+\s*years|financial analyst/i.test(
          parsed?.personalInfo?.summary || "",
        );
        const isFresherTemplate =
          templateId === "starter" || templateId === "graduate";

        if (Array.isArray(parsed.skills)) {
          const first = parsed.skills[0] as unknown;
          if (typeof first === "string") {
            parsed.skills = buildSkills(
              templateId,
              (parsed.skills as unknown as string[]).map((skill) =>
                String(skill),
              ),
            );
          } else {
            parsed.skills = parsed.skills.map((skill, index) => {
              const coercedLevel = Math.min(
                10,
                Math.max(1, Number(skill.level ?? 10 - index) || 7),
              );

              const category: "core" | "toolbox" =
                skill.category === "core" || skill.category === "toolbox"
                  ? skill.category
                  : index < 6
                    ? "core"
                    : "toolbox";

              return {
                id: skill.id || `${templateId}-skill-${index}`,
                name: skill.name,
                level: coercedLevel,
                category,
              };
            });
          }
        }

        if (isFresherTemplate && badSummary) {
          const defaults = getTemplateDefaults(templateId);
          setResumeData(defaults);
          localStorage.setItem(key, JSON.stringify(defaults));
        } else {
          setResumeData(parsed);
        }
      } catch (error) {
        console.error("Error loading resume data:", error);
        setResumeData(getTemplateDefaults(templateId));
      }
    } else {
      // Set template defaults if no saved data
      setResumeData(getTemplateDefaults(templateId));
    }
  }, [templateId]);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (templateId && resumeData.personalInfo.fullName) {
      localStorage.setItem(`resume-${templateId}`, JSON.stringify(resumeData));
    }
  }, [resumeData, templateId]);

  // Save theme color to local storage
  useEffect(() => {
    if (templateId) {
      localStorage.setItem(`theme-${templateId}`, themeColor);
    }
  }, [themeColor, templateId]);

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
        elite: ElitePDF,
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
        "geometric-modern": GeometricModernPDF,
        "github-style": GitHubStylePDF,
        "ml-engineer": MLEngineerPDF,
        "sidebar-accent": SidebarAccentPDF,
        "tech-stack-pro": TechStackProPDF,
        "terminal-theme": TerminalThemePDF,
        "timeline-elegance": TimelineElegancePDF,
        "two-tone-classic": TwoToneClassicPDF,
        "strategic-executive": StrategicExecutivePDF,
        "professional-sphere": ProfessionalSpherePDF,
        "global-professional": GlobalProfessionalPDF,
        "professional-horizon": ProfessionalHorizonPDF,
        "executive-prime": ExecutivePrimePDF,
        "corporate-momentum": CorporateMomentumPDF,
        "professional-ascend": ProfessionalAscendPDF,
        "global-elite": GlobalElitePDF,
        "executive-vision": ExecutiveVisionPDF,
        "corporate-fusion": CorporateFusionPDF,
        "professional-zenith": ProfessionalZenithPDF,
        "executive-core": ExecutiveCorePDF,
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
        "creative-pulse": PDFCreativePulseTemplate,
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
        "vimeo-videographer": PDFVimeoVideographerTemplate,
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
                <ResumePreview
                  resumeData={resumeData}
                  templateId={templateId || "professional"}
                  themeColor={themeColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
