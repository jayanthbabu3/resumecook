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
import { TechGridPDF } from "@/components/resume/pdf/TechGridPDF";
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
// 2025 Batch 3 - Healthcare & Medical PDFs (15 templates)
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
// 2025 Batch 3 - Engineering PDFs (15 templates)
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
// 2025 Batch 3 - Sales & Marketing PDFs (15 templates)
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
// 2025 Batch 3 - Finance & Accounting PDFs (12 templates)
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
// 2025 Batch 3 - Education & Teaching PDFs (10 templates)
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
// 2025 Batch 3 - Legal PDFs (8 templates)
import { CorporateAttorneyPDF } from "@/components/resume/pdf/CorporateAttorneyPDF";
import { LitigationAttorneyPDF } from "@/components/resume/pdf/LitigationAttorneyPDF";
import { ParalegalCertifiedPDF } from "@/components/resume/pdf/ParalegalCertifiedPDF";
import { LegalConsultantPDF } from "@/components/resume/pdf/LegalConsultantPDF";
import { ComplianceOfficerLegalPDF } from "@/components/resume/pdf/ComplianceOfficerLegalPDF";
import { ContractSpecialistPDF } from "@/components/resume/pdf/ContractSpecialistPDF";
import { IntellectualPropertyAttorneyPDF } from "@/components/resume/pdf/IntellectualPropertyAttorneyPDF";
import { LegalOperationsManagerPDF } from "@/components/resume/pdf/LegalOperationsManagerPDF";
// 2025 Batch 3 - Human Resources PDFs (8 templates)
import { HRBusinessPartnerPDF } from "@/components/resume/pdf/HRBusinessPartnerPDF";
import { TalentAcquisitionSpecialistPDF } from "@/components/resume/pdf/TalentAcquisitionSpecialistPDF";
import { CompensationBenefitsManagerPDF } from "@/components/resume/pdf/CompensationBenefitsManagerPDF";
import { LearningDevelopmentManagerPDF } from "@/components/resume/pdf/LearningDevelopmentManagerPDF";
import { EmployeeRelationsSpecialistPDF } from "@/components/resume/pdf/EmployeeRelationsSpecialistPDF";
import { HRAnalyticsManagerPDF } from "@/components/resume/pdf/HRAnalyticsManagerPDF";
import { OrganizationalDevelopmentPDF } from "@/components/resume/pdf/OrganizationalDevelopmentPDF";
import { DiversityInclusionManagerPDF } from "@/components/resume/pdf/DiversityInclusionManagerPDF";
// 2025 Batch 3 - Hospitality & Culinary PDFs (7 templates)
import { ExecutiveChefPDF } from "@/components/resume/pdf/ExecutiveChefPDF";
import { HotelManagerOperationsPDF } from "@/components/resume/pdf/HotelManagerOperationsPDF";
import { RestaurantManagerPDF } from "@/components/resume/pdf/RestaurantManagerPDF";
import { EventPlannerCoordinatorPDF } from "@/components/resume/pdf/EventPlannerCoordinatorPDF";
import { SommelierWineSpecialistPDF } from "@/components/resume/pdf/SommelierWineSpecialistPDF";
import { PastryChefPDF } from "@/components/resume/pdf/PastryChefPDF";
import { HospitalityDirectorPDF } from "@/components/resume/pdf/HospitalityDirectorPDF";
// 2025 Batch 3 - Real Estate & Construction PDFs (7 templates)
import { RealEstateBrokerPDF } from "@/components/resume/pdf/RealEstateBrokerPDF";
import { PropertyManagerCommercialPDF } from "@/components/resume/pdf/PropertyManagerCommercialPDF";
import { ConstructionProjectManagerPDF } from "@/components/resume/pdf/ConstructionProjectManagerPDF";
import { ArchitectRegisteredPDF } from "@/components/resume/pdf/ArchitectRegisteredPDF";
import { GeneralContractorPDF } from "@/components/resume/pdf/GeneralContractorPDF";
import { EstimatorCostAnalystPDF } from "@/components/resume/pdf/EstimatorCostAnalystPDF";
import { RealEstateAppraiserPDF } from "@/components/resume/pdf/RealEstateAppraiserPDF";
// 2025 Batch 3 - Operations & Logistics PDFs (3 templates)
import { SupplyChainManagerPDF } from "@/components/resume/pdf/SupplyChainManagerPDF";
import { LogisticsCoordinatorPDF } from "@/components/resume/pdf/LogisticsCoordinatorPDF";
import { ProcurementSpecialistPDF } from "@/components/resume/pdf/ProcurementSpecialistPDF";
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
import { AcademicEducatorTemplate } from "@/components/resume/templates/AcademicEducatorTemplate";
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
// New Professional HTML Templates (22 new imports)
import { AlgoEngineerTemplate } from "@/components/resume/templates/AlgoEngineerTemplate";
import { ArtisticBoldTemplate } from "@/components/resume/templates/ArtisticBoldTemplate";
import { AsymmetricCreativeTemplate } from "@/components/resume/templates/AsymmetricCreativeTemplate";
import { BorderedEleganceTemplate } from "@/components/resume/templates/BorderedEleganceTemplate";
import { CodeMinimalTemplate } from "@/components/resume/templates/CodeMinimalTemplate";
import { ColorfulModernTemplate } from "@/components/resume/templates/ColorfulModernTemplate";
import { ColumnDivideTemplate } from "@/components/resume/templates/ColumnDivideTemplate";
import { CompactProfessionalTemplate } from "@/components/resume/templates/CompactProfessionalTemplate";
import { CreativeTimelineTemplate } from "@/components/resume/templates/CreativeTimelineTemplate";
import { DesignerShowcaseTemplate } from "@/components/resume/templates/DesignerShowcaseTemplate";
import { DeveloperGridTemplate } from "@/components/resume/templates/DeveloperGridTemplate";
import { DevOpsProTemplate } from "@/components/resume/templates/DevOpsProTemplate";
import { ExecutiveMinimalTemplate } from "@/components/resume/templates/ExecutiveMinimalTemplate";
import { FullStackModernTemplate } from "@/components/resume/templates/FullStackModernTemplate";
import { GeometricModernTemplate } from "@/components/resume/templates/GeometricModernTemplate";
import { GitHubStyleTemplate } from "@/components/resume/templates/GitHubStyleTemplate";
import { MLEngineerTemplate } from "@/components/resume/templates/MLEngineerTemplate";
import { SidebarAccentTemplate } from "@/components/resume/templates/SidebarAccentTemplate";
import { TechStackProTemplate } from "@/components/resume/templates/TechStackProTemplate";
import { TerminalThemeTemplate } from "@/components/resume/templates/TerminalThemeTemplate";
import { TimelineEleganceTemplate } from "@/components/resume/templates/TimelineEleganceTemplate";
import { TwoToneClassicTemplate } from "@/components/resume/templates/TwoToneClassicTemplate";
// 2025 New Templates (100 HTML imports)
import { StrategicLeadershipTemplate } from "@/components/resume/templates/StrategicLeadershipTemplate";
import { CorporateExcellenceTemplate } from "@/components/resume/templates/CorporateExcellenceTemplate";
import { ExecutivePrestigeTemplate } from "@/components/resume/templates/ExecutivePrestigeTemplate";
import { GlobalExecutiveProTemplate } from "@/components/resume/templates/GlobalExecutiveProTemplate";
import { PremiumCorporateEdgeTemplate } from "@/components/resume/templates/PremiumCorporateEdgeTemplate";
import { EnterpriseLeaderTemplate } from "@/components/resume/templates/EnterpriseLeaderTemplate";
import { BoardroomReadyTemplate } from "@/components/resume/templates/BoardroomReadyTemplate";
import { CSuiteModernTemplate } from "@/components/resume/templates/CSuiteModernTemplate";
import { ExecutiveImpactTemplate } from "@/components/resume/templates/ExecutiveImpactTemplate";
import { CorporateVisionaryTemplate } from "@/components/resume/templates/CorporateVisionaryTemplate";
import { PlatinumExecutiveTemplate } from "@/components/resume/templates/PlatinumExecutiveTemplate";
import { GlobalLeadershipTemplate } from "@/components/resume/templates/GlobalLeadershipTemplate";
import { SeniorExecutiveProTemplate } from "@/components/resume/templates/SeniorExecutiveProTemplate";
import { CorporateElitePlusTemplate } from "@/components/resume/templates/CorporateElitePlusTemplate";
import { ExecutivePinnacleTemplate } from "@/components/resume/templates/ExecutivePinnacleTemplate";
import { CorporateDistinctionTemplate } from "@/components/resume/templates/CorporateDistinctionTemplate";
import { LeadershipSummitTemplate } from "@/components/resume/templates/LeadershipSummitTemplate";
import { ExecutiveAuthorityTemplate } from "@/components/resume/templates/ExecutiveAuthorityTemplate";
import { CorporatePremierTemplate } from "@/components/resume/templates/CorporatePremierTemplate";
import { GlobalEnterpriseTemplate } from "@/components/resume/templates/GlobalEnterpriseTemplate";
import { ExecutiveSignatureTemplate } from "@/components/resume/templates/ExecutiveSignatureTemplate";
import { CorporateApexTemplate } from "@/components/resume/templates/CorporateApexTemplate";
import { StrategicExecutivePlusTemplate } from "@/components/resume/templates/StrategicExecutivePlusTemplate";
import { CorporateParadigmTemplate } from "@/components/resume/templates/CorporateParadigmTemplate";
import { ExecutiveMagnitudeTemplate } from "@/components/resume/templates/ExecutiveMagnitudeTemplate";
import { CorporateSovereignTemplate } from "@/components/resume/templates/CorporateSovereignTemplate";
import { LeadershipZenithTemplate } from "@/components/resume/templates/LeadershipZenithTemplate";
import { ExecutiveNexusTemplate } from "@/components/resume/templates/ExecutiveNexusTemplate";
import { CorporateVanguardTemplate } from "@/components/resume/templates/CorporateVanguardTemplate";
import { ExecutiveAscendancyTemplate } from "@/components/resume/templates/ExecutiveAscendancyTemplate";
import { VueSpecialistTemplate } from "@/components/resume/templates/VueSpecialistTemplate";
import { SvelteDeveloperTemplate } from "@/components/resume/templates/SvelteDeveloperTemplate";
import { FlutterEngineerTemplate } from "@/components/resume/templates/FlutterEngineerTemplate";
import { SwiftIOSDeveloperTemplate } from "@/components/resume/templates/SwiftIOSDeveloperTemplate";
import { RustSystemsEngineerTemplate } from "@/components/resume/templates/RustSystemsEngineerTemplate";
import { ScalaBackendEngineerTemplate } from "@/components/resume/templates/ScalaBackendEngineerTemplate";
import { ElixirDeveloperTemplate } from "@/components/resume/templates/ElixirDeveloperTemplate";
import { GraphQLArchitectTemplate } from "@/components/resume/templates/GraphQLArchitectTemplate";
import { TypeScriptExpertTemplate } from "@/components/resume/templates/TypeScriptExpertTemplate";
import { NextJSFullstackTemplate } from "@/components/resume/templates/NextJSFullstackTemplate";
import { NestJSBackendTemplate } from "@/components/resume/templates/NestJSBackendTemplate";
import { DjangoFullstackTemplate } from "@/components/resume/templates/DjangoFullstackTemplate";
import { SpringBootDeveloperTemplate } from "@/components/resume/templates/SpringBootDeveloperTemplate";
import { PostgreSQLDBATemplate } from "@/components/resume/templates/PostgreSQLDBATemplate";
import { MongoDBSpecialistTemplate } from "@/components/resume/templates/MongoDBSpecialistTemplate";
import { RedisEngineerTemplate } from "@/components/resume/templates/RedisEngineerTemplate";
import { ElasticsearchExpertTemplate } from "@/components/resume/templates/ElasticsearchExpertTemplate";
import { TerraformDevOpsTemplate } from "@/components/resume/templates/TerraformDevOpsTemplate";
import { AnsibleAutomationTemplate } from "@/components/resume/templates/AnsibleAutomationTemplate";
import { JenkinsCICDTemplate } from "@/components/resume/templates/JenkinsCICDTemplate";
import { KafkaStreamingTemplate } from "@/components/resume/templates/KafkaStreamingTemplate";
import { RabbitMQSpecialistTemplate } from "@/components/resume/templates/RabbitMQSpecialistTemplate";
import { GRPCDeveloperTemplate } from "@/components/resume/templates/GRPCDeveloperTemplate";
import { WebAssemblyEngineerTemplate } from "@/components/resume/templates/WebAssemblyEngineerTemplate";
import { UnityGameDeveloperTemplate } from "@/components/resume/templates/UnityGameDeveloperTemplate";
import { AcademicAchieverTemplate } from "@/components/resume/templates/AcademicAchieverTemplate";
import { GraduateInnovatorTemplate } from "@/components/resume/templates/GraduateInnovatorTemplate";
import { CampusLeaderTemplate } from "@/components/resume/templates/CampusLeaderTemplate";
import { ScholarshipGraduateTemplate } from "@/components/resume/templates/ScholarshipGraduateTemplate";
import { HonorsStudentTemplate } from "@/components/resume/templates/HonorsStudentTemplate";
import { STEMGraduateTemplate } from "@/components/resume/templates/STEMGraduateTemplate";
import { InternshipReadyTemplate } from "@/components/resume/templates/InternshipReadyTemplate";
import { ResearchGraduateTemplate } from "@/components/resume/templates/ResearchGraduateTemplate";
import { EntrepreneurialGraduateTemplate } from "@/components/resume/templates/EntrepreneurialGraduateTemplate";
import { VolunteerLeaderTemplate } from "@/components/resume/templates/VolunteerLeaderTemplate";
import { CodingBootcampGradTemplate } from "@/components/resume/templates/CodingBootcampGradTemplate";
import { LiberalArtsGraduateTemplate } from "@/components/resume/templates/LiberalArtsGraduateTemplate";
import { BusinessGraduateTemplate } from "@/components/resume/templates/BusinessGraduateTemplate";
import { EngineeringFresherTemplate } from "@/components/resume/templates/EngineeringFresherTemplate";
import { DesignSchoolGradTemplate } from "@/components/resume/templates/DesignSchoolGradTemplate";
import { MastersGraduateTemplate } from "@/components/resume/templates/MastersGraduateTemplate";
import { PhDCandidateTemplate } from "@/components/resume/templates/PhDCandidateTemplate";
import { StudentAthleteTemplate } from "@/components/resume/templates/StudentAthleteTemplate";
import { StudyAbroadGraduateTemplate } from "@/components/resume/templates/StudyAbroadGraduateTemplate";
import { DualDegreeGraduateTemplate } from "@/components/resume/templates/DualDegreeGraduateTemplate";
import { PortfolioArtistTemplate } from "@/components/resume/templates/PortfolioArtistTemplate";
import { MotionDesignerTemplate } from "@/components/resume/templates/MotionDesignerTemplate";
import { BrandStrategistTemplate } from "@/components/resume/templates/BrandStrategistTemplate";
import { ContentCreatorTemplate } from "@/components/resume/templates/ContentCreatorTemplate";
import { IllustratorArtistTemplate } from "@/components/resume/templates/IllustratorArtistTemplate";
import { VideoProducerTemplate } from "@/components/resume/templates/VideoProducerTemplate";
import { CopywriterCreativeTemplate } from "@/components/resume/templates/CopywriterCreativeTemplate";
import { ArtDirectorProTemplate } from "@/components/resume/templates/ArtDirectorProTemplate";
import { PhotographerProTemplate } from "@/components/resume/templates/PhotographerProTemplate";
import { TypographerSpecialistTemplate } from "@/components/resume/templates/TypographerSpecialistTemplate";
import { DigitalArtistTemplate } from "@/components/resume/templates/DigitalArtistTemplate";
import { CreativeDirectorEliteTemplate } from "@/components/resume/templates/CreativeDirectorEliteTemplate";
import { SocialMediaCreativeTemplate } from "@/components/resume/templates/SocialMediaCreativeTemplate";
import { AnimationArtistTemplate } from "@/components/resume/templates/AnimationArtistTemplate";
import { MultimediaDesignerTemplate } from "@/components/resume/templates/MultimediaDesignerTemplate";
import { UXResearcherTemplate } from "@/components/resume/templates/UXResearcherTemplate";
import { UISpecialistTemplate } from "@/components/resume/templates/UISpecialistTemplate";
import { ProductDesignerProTemplate } from "@/components/resume/templates/ProductDesignerProTemplate";
import { InteractionDesignerTemplate } from "@/components/resume/templates/InteractionDesignerTemplate";
import { ServiceDesignerTemplate } from "@/components/resume/templates/ServiceDesignerTemplate";
import { DesignSystemsArchitectTemplate } from "@/components/resume/templates/DesignSystemsArchitectTemplate";
import { AccessibilityDesignerTemplate } from "@/components/resume/templates/AccessibilityDesignerTemplate";
import { DesignLeadTemplate } from "@/components/resume/templates/DesignLeadTemplate";
import { DesignStrategistTemplate } from "@/components/resume/templates/DesignStrategistTemplate";
import { VisualDesignerProTemplate } from "@/components/resume/templates/VisualDesignerProTemplate";
// 2025 Batch 2 - Universal Professional Templates (30 templates)
import { SapphireProfessionalTemplate } from "@/components/resume/templates/SapphireProfessionalTemplate";
import { EmeraldExecutiveTemplate } from "@/components/resume/templates/EmeraldExecutiveTemplate";
import { RubyCorporateTemplate } from "@/components/resume/templates/RubyCorporateTemplate";
import { OnyxLeadershipTemplate } from "@/components/resume/templates/OnyxLeadershipTemplate";
import { PlatinumPrestigeTemplate } from "@/components/resume/templates/PlatinumPrestigeTemplate";
import { AzureProfessionalTemplate } from "@/components/resume/templates/AzureProfessionalTemplate";
import { AmberExecutiveTemplate } from "@/components/resume/templates/AmberExecutiveTemplate";
import { VioletCorporateTemplate } from "@/components/resume/templates/VioletCorporateTemplate";
import { JadeProfessionalTemplate } from "@/components/resume/templates/JadeProfessionalTemplate";
import { CrimsonLeadershipTemplate } from "@/components/resume/templates/CrimsonLeadershipTemplate";
import { SlateMinimalistTemplate } from "@/components/resume/templates/SlateMinimalistTemplate";
import { TealModernTemplate } from "@/components/resume/templates/TealModernTemplate";
import { IndigoExecutiveTemplate } from "@/components/resume/templates/IndigoExecutiveTemplate";
import { RoseProfessionalTemplate } from "@/components/resume/templates/RoseProfessionalTemplate";
import { NavyCorporateTemplate } from "@/components/resume/templates/NavyCorporateTemplate";
import { GoldPrestigeTemplate } from "@/components/resume/templates/GoldPrestigeTemplate";
import { CharcoalProfessionalTemplate } from "@/components/resume/templates/CharcoalProfessionalTemplate";
import { CoralExecutiveTemplate } from "@/components/resume/templates/CoralExecutiveTemplate";
import { PewterMinimalistTemplate } from "@/components/resume/templates/PewterMinimalistTemplate";
import { ForestProfessionalTemplate } from "@/components/resume/templates/ForestProfessionalTemplate";
import { BurgundyExecutiveTemplate } from "@/components/resume/templates/BurgundyExecutiveTemplate";
import { SkyModernTemplate } from "@/components/resume/templates/SkyModernTemplate";
import { PlumProfessionalTemplate } from "@/components/resume/templates/PlumProfessionalTemplate";
import { BronzeCorporateTemplate } from "@/components/resume/templates/BronzeCorporateTemplate";
import { MintProfessionalTemplate } from "@/components/resume/templates/MintProfessionalTemplate";
import { ObsidianExecutiveTemplate } from "@/components/resume/templates/ObsidianExecutiveTemplate";
import { TangerineModernTemplate } from "@/components/resume/templates/TangerineModernTemplate";
import { SteelProfessionalTemplate } from "@/components/resume/templates/SteelProfessionalTemplate";
import { LavenderExecutiveTemplate } from "@/components/resume/templates/LavenderExecutiveTemplate";
import { CobaltProfessionalTemplate } from "@/components/resume/templates/CobaltProfessionalTemplate";
// 2025 Batch 2 - Software & Technology Templates (25 templates)
import { GitHubDeveloperTemplate } from "@/components/resume/templates/GitHubDeveloperTemplate";
import { LinkedInTechProTemplate } from "@/components/resume/templates/LinkedInTechProTemplate";
import { LaravelArtisanTemplate } from "@/components/resume/templates/LaravelArtisanTemplate";
import { RailsDeveloperTemplate } from "@/components/resume/templates/RailsDeveloperTemplate";
import { AngularSpecialistTemplate } from "@/components/resume/templates/AngularSpecialistTemplate";
import { VueMasterTemplate } from "@/components/resume/templates/VueMasterTemplate";
import { KotlinAndroidDevTemplate } from "@/components/resume/templates/KotlinAndroidDevTemplate";
import { iOSSwiftEngineerTemplate } from "@/components/resume/templates/iOSSwiftEngineerTemplate";
import { DockerSpecialistTemplate } from "@/components/resume/templates/DockerSpecialistTemplate";
import { AWSSolutionsArchitectTemplate } from "@/components/resume/templates/AWSSolutionsArchitectTemplate";
import { GCPCloudEngineerTemplate } from "@/components/resume/templates/GCPCloudEngineerTemplate";
import { AzureDevOpsProTemplate } from "@/components/resume/templates/AzureDevOpsProTemplate";
import { ReactNativeDevTemplate } from "@/components/resume/templates/ReactNativeDevTemplate";
import { FlutterUISpecialistTemplate } from "@/components/resume/templates/FlutterUISpecialistTemplate";
import { DotNetCoreDeveloperTemplate } from "@/components/resume/templates/DotNetCoreDeveloperTemplate";
import { GolangBackendEngineerTemplate } from "@/components/resume/templates/GolangBackendEngineerTemplate";
import { PythonMLEngineerTemplate } from "@/components/resume/templates/PythonMLEngineerTemplate";
import { DataScientistProTemplate } from "@/components/resume/templates/DataScientistProTemplate";
import { BlockchainEngineerTemplate } from "@/components/resume/templates/BlockchainEngineerTemplate";
import { SolidityDeveloperTemplate } from "@/components/resume/templates/SolidityDeveloperTemplate";
import { CybersecurityAnalystTemplate } from "@/components/resume/templates/CybersecurityAnalystTemplate";
import { DevSecOpsEngineerTemplate } from "@/components/resume/templates/DevSecOpsEngineerTemplate";
import { FullstackJavaScriptTemplate } from "@/components/resume/templates/FullstackJavaScriptTemplate";
import { JAMStackDeveloperTemplate } from "@/components/resume/templates/JAMStackDeveloperTemplate";
import { HeadlessCMSDeveloperTemplate } from "@/components/resume/templates/HeadlessCMSDeveloperTemplate";
// 2025 Batch 2 - Fresh Graduates Templates (20 templates)
import { DigitalNativeGraduateTemplate } from "@/components/resume/templates/DigitalNativeGraduateTemplate";
import { TechSavvyFresherTemplate } from "@/components/resume/templates/TechSavvyFresherTemplate";
import { LinkedInReadyGraduateTemplate } from "@/components/resume/templates/LinkedInReadyGraduateTemplate";
import { GitHubStudentDeveloperTemplate } from "@/components/resume/templates/GitHubStudentDeveloperTemplate";
import { PortfolioFirstGraduateTemplate } from "@/components/resume/templates/PortfolioFirstGraduateTemplate";
import { ConnectedGraduateTemplate } from "@/components/resume/templates/ConnectedGraduateTemplate";
import { SocialMediaSavvyGradTemplate } from "@/components/resume/templates/SocialMediaSavvyGradTemplate";
import { OpenSourceContributorTemplate } from "@/components/resume/templates/OpenSourceContributorTemplate";
import { HackathonWinnerTemplate } from "@/components/resume/templates/HackathonWinnerTemplate";
import { CodingChallengeChampionTemplate } from "@/components/resume/templates/CodingChallengeChampionTemplate";
import { CapstoneShowcaseTemplate } from "@/components/resume/templates/CapstoneShowcaseTemplate";
import { ResearchPublicationGradTemplate } from "@/components/resume/templates/ResearchPublicationGradTemplate";
import { ConferencePresenterTemplate } from "@/components/resume/templates/ConferencePresenterTemplate";
import { StartupInternTemplate } from "@/components/resume/templates/StartupInternTemplate";
import { FAANGAspirantTemplate } from "@/components/resume/templates/FAANGAspirantTemplate";
import { BootcampSuccessStoryTemplate } from "@/components/resume/templates/BootcampSuccessStoryTemplate";
import { RemoteWorkReadyTemplate } from "@/components/resume/templates/RemoteWorkReadyTemplate";
import { CommunityBuilderTemplate } from "@/components/resume/templates/CommunityBuilderTemplate";
import { TechBloggerGraduateTemplate } from "@/components/resume/templates/TechBloggerGraduateTemplate";
import { YouTubeEducatorTemplate } from "@/components/resume/templates/YouTubeEducatorTemplate";
// 2025 Batch 2 - Creative Templates (15 templates)
import { BehanceDesignerTemplate } from "@/components/resume/templates/BehanceDesignerTemplate";
import { DribbbleCreativeTemplate } from "@/components/resume/templates/DribbbleCreativeTemplate";
import { InstagramInfluencerTemplate } from "@/components/resume/templates/InstagramInfluencerTemplate";
import { PinterestCuratorTemplate } from "@/components/resume/templates/PinterestCuratorTemplate";
import { VimeoVideographerTemplate } from "@/components/resume/templates/VimeoVideographerTemplate";
import { MediumWriterTemplate } from "@/components/resume/templates/MediumWriterTemplate";
import { TikTokCreatorTemplate } from "@/components/resume/templates/TikTokCreatorTemplate";
import { TwitchStreamerTemplate } from "@/components/resume/templates/TwitchStreamerTemplate";
import { SoundCloudProducerTemplate } from "@/components/resume/templates/SoundCloudProducerTemplate";
import { SpotifyArtistTemplate } from "@/components/resume/templates/SpotifyArtistTemplate";
import { ArtStationArtistTemplate } from "@/components/resume/templates/ArtStationArtistTemplate";
import { DeviantArtCreatorTemplate } from "@/components/resume/templates/DeviantArtCreatorTemplate";
import { PatreonCreatorTemplate } from "@/components/resume/templates/PatreonCreatorTemplate";
import { SubstackWriterTemplate } from "@/components/resume/templates/SubstackWriterTemplate";
import { ClubhouseModeratorTemplate } from "@/components/resume/templates/ClubhouseModeratorTemplate";
// 2025 Batch 2 - Design Templates (10 templates)
import { FigmaExpertTemplate } from "@/components/resume/templates/FigmaExpertTemplate";
import { SketchSpecialistTemplate } from "@/components/resume/templates/SketchSpecialistTemplate";
import { AdobeXDDesignerTemplate } from "@/components/resume/templates/AdobeXDDesignerTemplate";
import { FramerDesignerTemplate } from "@/components/resume/templates/FramerDesignerTemplate";
import { WebflowDeveloperTemplate } from "@/components/resume/templates/WebflowDeveloperTemplate";
import { PrincipleAnimatorTemplate } from "@/components/resume/templates/PrincipleAnimatorTemplate";
import { InVisionPrototyperTemplate } from "@/components/resume/templates/InVisionPrototyperTemplate";
import { MarvelAppDesignerTemplate } from "@/components/resume/templates/MarvelAppDesignerTemplate";
import { ZeplinHandoffSpecialistTemplate } from "@/components/resume/templates/ZeplinHandoffSpecialistTemplate";
import { AbstractVersionDesignerTemplate } from "@/components/resume/templates/AbstractVersionDesignerTemplate";
// 2025 Batch 3 - Healthcare & Medical Templates (15 templates)
import { RegisteredNurseProTemplate } from "@/components/resume/templates/RegisteredNurseProTemplate";
import { PhysicianSpecialistTemplate } from "@/components/resume/templates/PhysicianSpecialistTemplate";
import { DentalProfessionalTemplate } from "@/components/resume/templates/DentalProfessionalTemplate";
import { PharmacistClinicalTemplate } from "@/components/resume/templates/PharmacistClinicalTemplate";
import { PhysicalTherapistTemplate } from "@/components/resume/templates/PhysicalTherapistTemplate";
import { MedicalTechnologistTemplate } from "@/components/resume/templates/MedicalTechnologistTemplate";
import { RadiologyTechnicianTemplate } from "@/components/resume/templates/RadiologyTechnicianTemplate";
import { HealthcareAdministratorTemplate } from "@/components/resume/templates/HealthcareAdministratorTemplate";
import { MentalHealthCounselorTemplate } from "@/components/resume/templates/MentalHealthCounselorTemplate";
import { OccupationalTherapistTemplate } from "@/components/resume/templates/OccupationalTherapistTemplate";
import { SpeechPathologistTemplate } from "@/components/resume/templates/SpeechPathologistTemplate";
import { VeterinaryDoctorTemplate } from "@/components/resume/templates/VeterinaryDoctorTemplate";
import { NutritionistDietitianTemplate } from "@/components/resume/templates/NutritionistDietitianTemplate";
import { MedicalAssistantTemplate } from "@/components/resume/templates/MedicalAssistantTemplate";
import { ParamedicEMTTemplate } from "@/components/resume/templates/ParamedicEMTTemplate";
// 2025 Batch 3 - Engineering Templates (15 templates)
import { MechanicalEngineerProTemplate } from "@/components/resume/templates/MechanicalEngineerProTemplate";
import { CivilEngineerPETemplate } from "@/components/resume/templates/CivilEngineerPETemplate";
import { ElectricalEngineerTemplate } from "@/components/resume/templates/ElectricalEngineerTemplate";
import { ChemicalEngineerProTemplate } from "@/components/resume/templates/ChemicalEngineerProTemplate";
import { AerospaceEngineerTemplate } from "@/components/resume/templates/AerospaceEngineerTemplate";
import { BiomedicalEngineerTemplate } from "@/components/resume/templates/BiomedicalEngineerTemplate";
import { IndustrialEngineerTemplate } from "@/components/resume/templates/IndustrialEngineerTemplate";
import { EnvironmentalEngineerTemplate } from "@/components/resume/templates/EnvironmentalEngineerTemplate";
import { PetroleumEngineerTemplate } from "@/components/resume/templates/PetroleumEngineerTemplate";
import { StructuralEngineerTemplate } from "@/components/resume/templates/StructuralEngineerTemplate";
import { ManufacturingEngineerTemplate } from "@/components/resume/templates/ManufacturingEngineerTemplate";
import { QualityAssuranceEngineerTemplate } from "@/components/resume/templates/QualityAssuranceEngineerTemplate";
import { AutomationEngineerTemplate } from "@/components/resume/templates/AutomationEngineerTemplate";
import { RoboticsEngineerTemplate } from "@/components/resume/templates/RoboticsEngineerTemplate";
import { HVACEngineerTemplate } from "@/components/resume/templates/HVACEngineerTemplate";
// 2025 Batch 3 - Sales & Marketing Templates (15 templates)
import { SalesExecutiveProTemplate } from "@/components/resume/templates/SalesExecutiveProTemplate";
import { AccountManagerEnterpriseTemplate } from "@/components/resume/templates/AccountManagerEnterpriseTemplate";
import { DigitalMarketingSpecialistTemplate } from "@/components/resume/templates/DigitalMarketingSpecialistTemplate";
import { BrandManagerStrategicTemplate } from "@/components/resume/templates/BrandManagerStrategicTemplate";
import { SEOSpecialistProTemplate } from "@/components/resume/templates/SEOSpecialistProTemplate";
import { GrowthMarketingManagerTemplate } from "@/components/resume/templates/GrowthMarketingManagerTemplate";
import { EmailMarketingSpecialistTemplate } from "@/components/resume/templates/EmailMarketingSpecialistTemplate";
import { ProductMarketingManagerTemplate } from "@/components/resume/templates/ProductMarketingManagerTemplate";
import { BusinessDevelopmentManagerTemplate } from "@/components/resume/templates/BusinessDevelopmentManagerTemplate";
import { InsideSalesRepresentativeTemplate } from "@/components/resume/templates/InsideSalesRepresentativeTemplate";
import { FieldSalesSpecialistTemplate } from "@/components/resume/templates/FieldSalesSpecialistTemplate";
import { CustomerSuccessManagerTemplate } from "@/components/resume/templates/CustomerSuccessManagerTemplate";
import { MarketingAnalyticsManagerTemplate } from "@/components/resume/templates/MarketingAnalyticsManagerTemplate";
import { EcommerceManagerTemplate } from "@/components/resume/templates/EcommerceManagerTemplate";
import { AffiliateMarketingManagerTemplate } from "@/components/resume/templates/AffiliateMarketingManagerTemplate";
// 2025 Batch 3 - Finance & Accounting Templates (12 templates)
import { FinancialAnalystCFATemplate } from "@/components/resume/templates/FinancialAnalystCFATemplate";
import { InvestmentBankerTemplate } from "@/components/resume/templates/InvestmentBankerTemplate";
import { CertifiedPublicAccountantTemplate } from "@/components/resume/templates/CertifiedPublicAccountantTemplate";
import { TaxSpecialistProTemplate } from "@/components/resume/templates/TaxSpecialistProTemplate";
import { FinancialControllerTemplate } from "@/components/resume/templates/FinancialControllerTemplate";
import { PortfolioManagerTemplate } from "@/components/resume/templates/PortfolioManagerTemplate";
import { RiskManagementAnalystTemplate } from "@/components/resume/templates/RiskManagementAnalystTemplate";
import { TreasuryAnalystTemplate } from "@/components/resume/templates/TreasuryAnalystTemplate";
import { ForensicAccountantTemplate } from "@/components/resume/templates/ForensicAccountantTemplate";
import { InternalAuditorTemplate } from "@/components/resume/templates/InternalAuditorTemplate";
import { BudgetAnalystTemplate } from "@/components/resume/templates/BudgetAnalystTemplate";
import { EquityResearchAnalystTemplate } from "@/components/resume/templates/EquityResearchAnalystTemplate";
// 2025 Batch 3 - Education & Teaching Templates (10 templates)
import { UniversityProfessorTemplate } from "@/components/resume/templates/UniversityProfessorTemplate";
import { ElementaryTeacherTemplate } from "@/components/resume/templates/ElementaryTeacherTemplate";
import { HighSchoolTeacherTemplate } from "@/components/resume/templates/HighSchoolTeacherTemplate";
import { SpecialEducationTeacherTemplate } from "@/components/resume/templates/SpecialEducationTeacherTemplate";
import { ESLTeacherCertifiedTemplate } from "@/components/resume/templates/ESLTeacherCertifiedTemplate";
import { CurriculumDeveloperTemplate } from "@/components/resume/templates/CurriculumDeveloperTemplate";
import { InstructionalDesignerTemplate } from "@/components/resume/templates/InstructionalDesignerTemplate";
import { AcademicAdvisorTemplate } from "@/components/resume/templates/AcademicAdvisorTemplate";
import { OnlineCourseInstructorTemplate } from "@/components/resume/templates/OnlineCourseInstructorTemplate";
import { PrivateTutorSpecialistTemplate } from "@/components/resume/templates/PrivateTutorSpecialistTemplate";
// 2025 Batch 3 - Legal Templates (8 templates)
import { CorporateAttorneyTemplate } from "@/components/resume/templates/CorporateAttorneyTemplate";
import { LitigationAttorneyTemplate } from "@/components/resume/templates/LitigationAttorneyTemplate";
import { ParalegalCertifiedTemplate } from "@/components/resume/templates/ParalegalCertifiedTemplate";
import { LegalConsultantTemplate } from "@/components/resume/templates/LegalConsultantTemplate";
import { ComplianceOfficerLegalTemplate } from "@/components/resume/templates/ComplianceOfficerLegalTemplate";
import { ContractSpecialistTemplate } from "@/components/resume/templates/ContractSpecialistTemplate";
import { IntellectualPropertyAttorneyTemplate } from "@/components/resume/templates/IntellectualPropertyAttorneyTemplate";
import { LegalOperationsManagerTemplate } from "@/components/resume/templates/LegalOperationsManagerTemplate";
// 2025 Batch 3 - Human Resources Templates (8 templates)
import { HRBusinessPartnerTemplate } from "@/components/resume/templates/HRBusinessPartnerTemplate";
import { TalentAcquisitionSpecialistTemplate } from "@/components/resume/templates/TalentAcquisitionSpecialistTemplate";
import { CompensationBenefitsManagerTemplate } from "@/components/resume/templates/CompensationBenefitsManagerTemplate";
import { LearningDevelopmentManagerTemplate } from "@/components/resume/templates/LearningDevelopmentManagerTemplate";
import { EmployeeRelationsSpecialistTemplate } from "@/components/resume/templates/EmployeeRelationsSpecialistTemplate";
import { HRAnalyticsManagerTemplate } from "@/components/resume/templates/HRAnalyticsManagerTemplate";
import { OrganizationalDevelopmentTemplate } from "@/components/resume/templates/OrganizationalDevelopmentTemplate";
import { DiversityInclusionManagerTemplate } from "@/components/resume/templates/DiversityInclusionManagerTemplate";
// 2025 Batch 3 - Hospitality & Culinary Templates (7 templates)
import { ExecutiveChefTemplate } from "@/components/resume/templates/ExecutiveChefTemplate";
import { HotelManagerOperationsTemplate } from "@/components/resume/templates/HotelManagerOperationsTemplate";
import { RestaurantManagerTemplate } from "@/components/resume/templates/RestaurantManagerTemplate";
import { EventPlannerCoordinatorTemplate } from "@/components/resume/templates/EventPlannerCoordinatorTemplate";
import { SommelierWineSpecialistTemplate } from "@/components/resume/templates/SommelierWineSpecialistTemplate";
import { PastryChefTemplate } from "@/components/resume/templates/PastryChefTemplate";
import { HospitalityDirectorTemplate } from "@/components/resume/templates/HospitalityDirectorTemplate";
// 2025 Batch 3 - Real Estate & Construction Templates (7 templates)
import { RealEstateBrokerTemplate } from "@/components/resume/templates/RealEstateBrokerTemplate";
import { PropertyManagerCommercialTemplate } from "@/components/resume/templates/PropertyManagerCommercialTemplate";
import { ConstructionProjectManagerTemplate } from "@/components/resume/templates/ConstructionProjectManagerTemplate";
import { ArchitectRegisteredTemplate } from "@/components/resume/templates/ArchitectRegisteredTemplate";
import { GeneralContractorTemplate } from "@/components/resume/templates/GeneralContractorTemplate";
import { EstimatorCostAnalystTemplate } from "@/components/resume/templates/EstimatorCostAnalystTemplate";
import { RealEstateAppraiserTemplate } from "@/components/resume/templates/RealEstateAppraiserTemplate";
// 2025 Batch 3 - Operations & Logistics Templates (3 templates)
import { SupplyChainManagerTemplate } from "@/components/resume/templates/SupplyChainManagerTemplate";
import { LogisticsCoordinatorTemplate } from "@/components/resume/templates/LogisticsCoordinatorTemplate";
import { ProcurementSpecialistTemplate } from "@/components/resume/templates/ProcurementSpecialistTemplate";
import { AIEngineerTemplate } from "@/components/resume/templates/AIEngineerTemplate";
import { APIDocTemplate } from "@/components/resume/templates/APIDocTemplate";
import { AWSCloudEngineerTemplate } from "@/components/resume/templates/AWSCloudEngineerTemplate";
import { AccessibilityUxTemplate } from "@/components/resume/templates/AccessibilityUxTemplate";
import { AccountingProTemplate } from "@/components/resume/templates/AccountingProTemplate";
import { AchieverFresherTemplate } from "@/components/resume/templates/AchieverFresherTemplate";
import { AdobePortfolioDesignerTemplate } from "@/components/resume/templates/AdobePortfolioDesignerTemplate";
import { AestheticCreativeTemplate } from "@/components/resume/templates/AestheticCreativeTemplate";
import { AgileProjectLeadTemplate } from "@/components/resume/templates/AgileProjectLeadTemplate";
import { AgileflowDeveloperTemplate } from "@/components/resume/templates/AgileflowDeveloperTemplate";
import { AngularModernUniversalTemplate } from "@/components/resume/templates/AngularModernUniversalTemplate";
import { ApigatewayArchitectTemplate } from "@/components/resume/templates/ApigatewayArchitectTemplate";
import { ArtDirectorModernTemplate } from "@/components/resume/templates/ArtDirectorModernTemplate";
import { ArtisanDesignerTemplate } from "@/components/resume/templates/ArtisanDesignerTemplate";
import { ArtisticGridTemplate } from "@/components/resume/templates/ArtisticGridTemplate";
import { ArtisticHorizonTemplate } from "@/components/resume/templates/ArtisticHorizonTemplate";
import { ArtisticMomentumTemplate } from "@/components/resume/templates/ArtisticMomentumTemplate";
import { ArtisticVisionTemplate } from "@/components/resume/templates/ArtisticVisionTemplate";
import { ArtstationProTemplate } from "@/components/resume/templates/ArtstationProTemplate";
import { AscendGraduateTemplate } from "@/components/resume/templates/AscendGraduateTemplate";
import { AspireGraduateTemplate } from "@/components/resume/templates/AspireGraduateTemplate";
import { AsymmetricLayoutUniversalTemplate } from "@/components/resume/templates/AsymmetricLayoutUniversalTemplate";
import { AtlasExecutiveTemplate } from "@/components/resume/templates/AtlasExecutiveTemplate";
import { AuditExpertTemplate } from "@/components/resume/templates/AuditExpertTemplate";
import { AuroraMinimalTemplate } from "@/components/resume/templates/AuroraMinimalTemplate";
import { AwwwardsDesignerTemplate } from "@/components/resume/templates/AwwwardsDesignerTemplate";
import { AzureDevOpsSpecialistTemplate } from "@/components/resume/templates/AzureDevOpsSpecialistTemplate";
import { BadgeStyleUniversalTemplate } from "@/components/resume/templates/BadgeStyleUniversalTemplate";
import { BehancePortfolioTemplate } from "@/components/resume/templates/BehancePortfolioTemplate";
import { BitbucketDeveloperTemplate } from "@/components/resume/templates/BitbucketDeveloperTemplate";
import { BlockchainDevTemplate } from "@/components/resume/templates/BlockchainDevTemplate";
import { BlueprintDesignTemplate } from "@/components/resume/templates/BlueprintDesignTemplate";
import { BoldSectionHeadersUniversalTemplate } from "@/components/resume/templates/BoldSectionHeadersUniversalTemplate";
import { BoldTypographyTemplate } from "@/components/resume/templates/BoldTypographyTemplate";
import { BoldTypographyUniversalTemplate } from "@/components/resume/templates/BoldTypographyUniversalTemplate";
import { BootcampPortfolioTemplate } from "@/components/resume/templates/BootcampPortfolioTemplate";
import { BorderFrameUniversalTemplate } from "@/components/resume/templates/BorderFrameUniversalTemplate";
import { BoxedSectionsUniversalTemplate } from "@/components/resume/templates/BoxedSectionsUniversalTemplate";
import { BrandDesignerTemplateTemplate } from "@/components/resume/templates/BrandDesignerTemplateTemplate";
import { BrandIdentityTemplate } from "@/components/resume/templates/BrandIdentityTemplate";
import { BrandManagerTemplate } from "@/components/resume/templates/BrandManagerTemplate";
import { BrandedProfessionalTemplate } from "@/components/resume/templates/BrandedProfessionalTemplate";
import { BrightGraduateTemplate } from "@/components/resume/templates/BrightGraduateTemplate";
import { BusinessCleanLayoutTemplate } from "@/components/resume/templates/BusinessCleanLayoutTemplate";
import { BusinessClearTemplateTemplate } from "@/components/resume/templates/BusinessClearTemplateTemplate";
import { BusinessModernGridTemplate } from "@/components/resume/templates/BusinessModernGridTemplate";
import { BusinessSidebarProTemplate } from "@/components/resume/templates/BusinessSidebarProTemplate";
import { BusinessSimpleModernTemplate } from "@/components/resume/templates/BusinessSimpleModernTemplate";
import { BytecodeSpecialistTemplate } from "@/components/resume/templates/BytecodeSpecialistTemplate";
import { CEOProfileTemplate } from "@/components/resume/templates/CEOProfileTemplate";
import { CICDPipelineEngineerTemplate } from "@/components/resume/templates/CICDPipelineEngineerTemplate";
import { CampusInfluencerTemplate } from "@/components/resume/templates/CampusInfluencerTemplate";
import { CanvasArtistTemplate } from "@/components/resume/templates/CanvasArtistTemplate";
import { CarbonmadeDesignerTemplate } from "@/components/resume/templates/CarbonmadeDesignerTemplate";
import { CardLayoutUniversalTemplate } from "@/components/resume/templates/CardLayoutUniversalTemplate";
import { CasestudyDesignerTemplate } from "@/components/resume/templates/CasestudyDesignerTemplate";
import { CatalystFresherTemplate } from "@/components/resume/templates/CatalystFresherTemplate";
import { CenteredMinimalUniversalTemplate } from "@/components/resume/templates/CenteredMinimalUniversalTemplate";
import { ChevronAccentUniversalTemplate } from "@/components/resume/templates/ChevronAccentUniversalTemplate";
import { ChromaticCreativeTemplate } from "@/components/resume/templates/ChromaticCreativeTemplate";
import { CircleIconUniversalTemplate } from "@/components/resume/templates/CircleIconUniversalTemplate";
import { CircularElementsUniversalTemplate } from "@/components/resume/templates/CircularElementsUniversalTemplate";
import { ClassicSerifUniversalTemplate } from "@/components/resume/templates/ClassicSerifUniversalTemplate";
import { CleanBasicExecutiveTemplate } from "@/components/resume/templates/CleanBasicExecutiveTemplate";
import { CleanCorporateSimpleTemplate } from "@/components/resume/templates/CleanCorporateSimpleTemplate";
import { CleanModernUniversalTemplate } from "@/components/resume/templates/CleanModernUniversalTemplate";
import { CleanProfessionalSimpleTemplate } from "@/components/resume/templates/CleanProfessionalSimpleTemplate";
import { CleanReadableProTemplate } from "@/components/resume/templates/CleanReadableProTemplate";
import { CleanTwoColumnUniversalTemplate } from "@/components/resume/templates/CleanTwoColumnUniversalTemplate";
import { ClinicalExcellenceTemplate } from "@/components/resume/templates/ClinicalExcellenceTemplate";
import { CloudNativeTemplate } from "@/components/resume/templates/CloudNativeTemplate";
import { CloudSolutionsArchitectTemplate } from "@/components/resume/templates/CloudSolutionsArchitectTemplate";
import { CloudnativeArchitectTemplate } from "@/components/resume/templates/CloudnativeArchitectTemplate";
import { CodeCraftsmanTemplate } from "@/components/resume/templates/CodeCraftsmanTemplate";
import { CodePinnacleTemplate } from "@/components/resume/templates/CodePinnacleTemplate";
import { CodeSnippetTemplate } from "@/components/resume/templates/CodeSnippetTemplate";
import { CodeSphereTemplate } from "@/components/resume/templates/CodeSphereTemplate";
import { CodeVisionTemplate } from "@/components/resume/templates/CodeVisionTemplate";
import { CodeforgeDeveloperTemplate } from "@/components/resume/templates/CodeforgeDeveloperTemplate";
import { CodepenDeveloperTemplate } from "@/components/resume/templates/CodepenDeveloperTemplate";
import { CollageArtTemplate } from "@/components/resume/templates/CollageArtTemplate";
import { ColorBlockUniversalTemplate } from "@/components/resume/templates/ColorBlockUniversalTemplate";
import { ColorSplashTemplate } from "@/components/resume/templates/ColorSplashTemplate";
import { CompactEliteUniversalTemplate } from "@/components/resume/templates/CompactEliteUniversalTemplate";
import { CompileTimeDevTemplate } from "@/components/resume/templates/CompileTimeDevTemplate";
import { ComplianceOfficerTemplate } from "@/components/resume/templates/ComplianceOfficerTemplate";
import { ComponentuiDesignerTemplate } from "@/components/resume/templates/ComponentuiDesignerTemplate";
import { CompositionArtistTemplate } from "@/components/resume/templates/CompositionArtistTemplate";
import { ConceptCreativeTemplate } from "@/components/resume/templates/ConceptCreativeTemplate";
import { ConnectedLeaderTemplate } from "@/components/resume/templates/ConnectedLeaderTemplate";
import { ConnectedProfessionalTemplate } from "@/components/resume/templates/ConnectedProfessionalTemplate";
import { ContaineropsEngineerTemplate } from "@/components/resume/templates/ContaineropsEngineerTemplate";
import { ConversationalUxTemplate } from "@/components/resume/templates/ConversationalUxTemplate";
import { CornerAccentUniversalTemplate } from "@/components/resume/templates/CornerAccentUniversalTemplate";
import { CoroflotPortfolioTemplate } from "@/components/resume/templates/CoroflotPortfolioTemplate";
import { CorporateBorderFrameTemplate } from "@/components/resume/templates/CorporateBorderFrameTemplate";
import { CorporateEasyLayoutTemplate } from "@/components/resume/templates/CorporateEasyLayoutTemplate";
import { CorporateEliteTemplate } from "@/components/resume/templates/CorporateEliteTemplate";
import { CorporateLawTemplate } from "@/components/resume/templates/CorporateLawTemplate";
import { CorporateLegalCounselTemplate } from "@/components/resume/templates/CorporateLegalCounselTemplate";
import { CorporateMinimalistProTemplate } from "@/components/resume/templates/CorporateMinimalistProTemplate";
import { CorporateSimpleTemplateTemplate } from "@/components/resume/templates/CorporateSimpleTemplateTemplate";
import { CorporateVisionTemplate } from "@/components/resume/templates/CorporateVisionTemplate";
import { CosmosProfessionalTemplate } from "@/components/resume/templates/CosmosProfessionalTemplate";
import { CraftArtistTemplate } from "@/components/resume/templates/CraftArtistTemplate";
import { CreativeCanvasTemplate } from "@/components/resume/templates/CreativeCanvasTemplate";
import { CreativeCraftedTemplate } from "@/components/resume/templates/CreativeCraftedTemplate";
import { CreativeHorizonTemplate } from "@/components/resume/templates/CreativeHorizonTemplate";
import { CreativePulseTemplate } from "@/components/resume/templates/CreativePulseTemplate";
import { CreativeShowcaseGridTemplate } from "@/components/resume/templates/CreativeShowcaseGridTemplate";
import { CrystalExecutiveTemplate } from "@/components/resume/templates/CrystalExecutiveTemplate";
import { CuratorCreativeTemplate } from "@/components/resume/templates/CuratorCreativeTemplate";
import { CyberSecurityTemplate } from "@/components/resume/templates/CyberSecurityTemplate";
import { DarkModeDevTemplate } from "@/components/resume/templates/DarkModeDevTemplate";
import { DataScienceTemplate } from "@/components/resume/templates/DataScienceTemplate";
import { DesignLeaderPortfolioTemplate } from "@/components/resume/templates/DesignLeaderPortfolioTemplate";
import { DesignMaestroTemplate } from "@/components/resume/templates/DesignMaestroTemplate";
import { DesignPinnacleTemplate } from "@/components/resume/templates/DesignPinnacleTemplate";
import { DesignSphereTemplate } from "@/components/resume/templates/DesignSphereTemplate";
import { DesignSystemsPortfolioTemplate } from "@/components/resume/templates/DesignSystemsPortfolioTemplate";
import { DesignleadershipDirectorTemplate } from "@/components/resume/templates/DesignleadershipDirectorTemplate";
import { DesignopsSpecialistTemplate } from "@/components/resume/templates/DesignopsSpecialistTemplate";
import { DesignportfolioSpecialistTemplate } from "@/components/resume/templates/DesignportfolioSpecialistTemplate";
import { DesignstrategyLeadTemplate } from "@/components/resume/templates/DesignstrategyLeadTemplate";
import { DesignsystemArchitectTemplate } from "@/components/resume/templates/DesignsystemArchitectTemplate";
import { DesignthinkingSpecialistTemplate } from "@/components/resume/templates/DesignthinkingSpecialistTemplate";
import { DevArchitectureTemplate } from "@/components/resume/templates/DevArchitectureTemplate";
import { DevEliteTemplate } from "@/components/resume/templates/DevEliteTemplate";
import { DevMomentumTemplate } from "@/components/resume/templates/DevMomentumTemplate";
import { DevOpsAutomationTemplate } from "@/components/resume/templates/DevOpsAutomationTemplate";
import { DevPrimeTemplate } from "@/components/resume/templates/DevPrimeTemplate";
import { DeviantartArtistTemplate } from "@/components/resume/templates/DeviantartArtistTemplate";
import { DevtoContributorTemplate } from "@/components/resume/templates/DevtoContributorTemplate";
import { DiagonalAccentUniversalTemplate } from "@/components/resume/templates/DiagonalAccentUniversalTemplate";
import { DiamondAccentUniversalTemplate } from "@/components/resume/templates/DiamondAccentUniversalTemplate";
import { DigitalArtistPortfolioTemplate } from "@/components/resume/templates/DigitalArtistPortfolioTemplate";
import { DigitalCanvasTemplate } from "@/components/resume/templates/DigitalCanvasTemplate";
import { DigitalExecutiveTemplate } from "@/components/resume/templates/DigitalExecutiveTemplate";
import { DigitalGraduateTemplate } from "@/components/resume/templates/DigitalGraduateTemplate";
import { DigitalIdentityTemplate } from "@/components/resume/templates/DigitalIdentityTemplate";
import { DigitalMarketingProTemplate } from "@/components/resume/templates/DigitalMarketingProTemplate";
import { DigitalNativeGradTemplate } from "@/components/resume/templates/DigitalNativeGradTemplate";
import { DigitalPortfolioGradTemplate } from "@/components/resume/templates/DigitalPortfolioGradTemplate";
import { DigitalProfessionalTemplate } from "@/components/resume/templates/DigitalProfessionalTemplate";
import { DirectorLevelTemplate } from "@/components/resume/templates/DirectorLevelTemplate";
import { DjangoFrameworkProTemplate } from "@/components/resume/templates/DjangoFrameworkProTemplate";
import { DockerContainerProTemplate } from "@/components/resume/templates/DockerContainerProTemplate";
import { DockerhubPublisherTemplate } from "@/components/resume/templates/DockerhubPublisherTemplate";
import { DottedGridUniversalTemplate } from "@/components/resume/templates/DottedGridUniversalTemplate";
import { DribbbleShowcaseTemplate } from "@/components/resume/templates/DribbbleShowcaseTemplate";
import { DualColumnModernUniversalTemplate } from "@/components/resume/templates/DualColumnModernUniversalTemplate";
import { EclipseProfessionalTemplate } from "@/components/resume/templates/EclipseProfessionalTemplate";
import { EdgecomputeDeveloperTemplate } from "@/components/resume/templates/EdgecomputeDeveloperTemplate";
import { EditorialArtistTemplate } from "@/components/resume/templates/EditorialArtistTemplate";
import { EditorialStyleTemplate } from "@/components/resume/templates/EditorialStyleTemplate";
import { ElasticsearchDevTemplate } from "@/components/resume/templates/ElasticsearchDevTemplate";
import { ElevateFresherTemplate } from "@/components/resume/templates/ElevateFresherTemplate";
import { EmergeFresherTemplate } from "@/components/resume/templates/EmergeFresherTemplate";
import { EntryEliteTemplate } from "@/components/resume/templates/EntryEliteTemplate";
import { EntryHorizonTemplate } from "@/components/resume/templates/EntryHorizonTemplate";
import { EntrySphereTemplate } from "@/components/resume/templates/EntrySphereTemplate";
import { EventdrivenArchitectTemplate } from "@/components/resume/templates/EventdrivenArchitectTemplate";
import { ExecutiveCleanSplitTemplate } from "@/components/resume/templates/ExecutiveCleanSplitTemplate";
import { ExecutiveCornerAccentTemplate } from "@/components/resume/templates/ExecutiveCornerAccentTemplate";
import { ExecutiveDirectLayoutTemplate } from "@/components/resume/templates/ExecutiveDirectLayoutTemplate";
import { ExecutiveEasyTemplateTemplate } from "@/components/resume/templates/ExecutiveEasyTemplateTemplate";
import { ExecutiveLeadershipTemplate } from "@/components/resume/templates/ExecutiveLeadershipTemplate";
import { ExecutiveLetterheadUniversalTemplate } from "@/components/resume/templates/ExecutiveLetterheadUniversalTemplate";
import { ExecutivePlainLayoutTemplate } from "@/components/resume/templates/ExecutivePlainLayoutTemplate";
import { ExecutiveSalesLeaderTemplate } from "@/components/resume/templates/ExecutiveSalesLeaderTemplate";
import { ExecutiveSimpleCleanTemplate } from "@/components/resume/templates/ExecutiveSimpleCleanTemplate";
import { ExecutiveSplitDesignTemplate } from "@/components/resume/templates/ExecutiveSplitDesignTemplate";
import { ExecutiveTimelineModernTemplate } from "@/components/resume/templates/ExecutiveTimelineModernTemplate";
import { ExpressionArtistTemplate } from "@/components/resume/templates/ExpressionArtistTemplate";
import { FigmaDesignerPortfolioTemplate } from "@/components/resume/templates/FigmaDesignerPortfolioTemplate";
import { FinancialAnalystTemplate } from "@/components/resume/templates/FinancialAnalystTemplate";
import { FloatingHeaderUniversalTemplate } from "@/components/resume/templates/FloatingHeaderUniversalTemplate";
import { FlutterMobileDevTemplate } from "@/components/resume/templates/FlutterMobileDevTemplate";
import { FluxExecutiveTemplate } from "@/components/resume/templates/FluxExecutiveTemplate";
import { FoundationGraduateTemplate } from "@/components/resume/templates/FoundationGraduateTemplate";
import { FramerDesignerPortfolioTemplate } from "@/components/resume/templates/FramerDesignerPortfolioTemplate";
import { FresherAcademicStyleTemplate } from "@/components/resume/templates/FresherAcademicStyleTemplate";
import { FresherBoxShadowTemplate } from "@/components/resume/templates/FresherBoxShadowTemplate";
import { FresherCircularProgressTemplate } from "@/components/resume/templates/FresherCircularProgressTemplate";
import { FresherDashBorderTemplate } from "@/components/resume/templates/FresherDashBorderTemplate";
import { FresherDoubleColumnTemplate } from "@/components/resume/templates/FresherDoubleColumnTemplate";
import { FresherGlassmorphismTemplate } from "@/components/resume/templates/FresherGlassmorphismTemplate";
import { FresherGradientBorderTemplate } from "@/components/resume/templates/FresherGradientBorderTemplate";
import { FresherIconographyTemplate } from "@/components/resume/templates/FresherIconographyTemplate";
import { FresherLeftStripeTemplate } from "@/components/resume/templates/FresherLeftStripeTemplate";
import { FresherLightweightTemplate } from "@/components/resume/templates/FresherLightweightTemplate";
import { FresherModernSplitTemplate } from "@/components/resume/templates/FresherModernSplitTemplate";
import { FresherModernTabsTemplate } from "@/components/resume/templates/FresherModernTabsTemplate";
import { FresherNeonAccentTemplate } from "@/components/resume/templates/FresherNeonAccentTemplate";
import { FresherPolaroidStyleTemplate } from "@/components/resume/templates/FresherPolaroidStyleTemplate";
import { FresherProgressiveTemplate } from "@/components/resume/templates/FresherProgressiveTemplate";
import { FresherRibbonStyleTemplate } from "@/components/resume/templates/FresherRibbonStyleTemplate";
import { FresherStepByStepTemplate } from "@/components/resume/templates/FresherStepByStepTemplate";
import { FresherTimelineDotsTemplate } from "@/components/resume/templates/FresherTimelineDotsTemplate";
import { FresherTopBottomTemplate } from "@/components/resume/templates/FresherTopBottomTemplate";
import { FresherWaveHeaderTemplate } from "@/components/resume/templates/FresherWaveHeaderTemplate";
import { FreshersCraftedTemplate } from "@/components/resume/templates/FreshersCraftedTemplate";
import { FreshersVisionTemplate } from "@/components/resume/templates/FreshersVisionTemplate";
import { FullStackEngineerTemplate } from "@/components/resume/templates/FullStackEngineerTemplate";
import { FullStackProTemplate } from "@/components/resume/templates/FullStackProTemplate";
import { GCPArchitectTemplate } from "@/components/resume/templates/GCPArchitectTemplate";
import { GalleryLayoutTemplate } from "@/components/resume/templates/GalleryLayoutTemplate";
import { GenZGraduateTemplate } from "@/components/resume/templates/GenZGraduateTemplate";
import { GenesisGraduateTemplate } from "@/components/resume/templates/GenesisGraduateTemplate";
import { GeometricCreativeTemplate } from "@/components/resume/templates/GeometricCreativeTemplate";
import { GeometricShapesUniversalTemplate } from "@/components/resume/templates/GeometricShapesUniversalTemplate";
import { GitHubProfileTemplate } from "@/components/resume/templates/GitHubProfileTemplate";
import { GitflowEngineerTemplate } from "@/components/resume/templates/GitflowEngineerTemplate";
import { GithubPortfolioDevTemplate } from "@/components/resume/templates/GithubPortfolioDevTemplate";
import { GithubStudentTemplate } from "@/components/resume/templates/GithubStudentTemplate";
import { GitlabDeveloperTemplate } from "@/components/resume/templates/GitlabDeveloperTemplate";
import { GlobalNetworkerTemplate } from "@/components/resume/templates/GlobalNetworkerTemplate";
import { GradientHeaderUniversalTemplate } from "@/components/resume/templates/GradientHeaderUniversalTemplate";
import { GraduateMomentumTemplate } from "@/components/resume/templates/GraduateMomentumTemplate";
import { GraduatePrimeTemplate } from "@/components/resume/templates/GraduatePrimeTemplate";
import { GraduateZenithTemplate } from "@/components/resume/templates/GraduateZenithTemplate";
import { GraphQLDeveloperTemplate } from "@/components/resume/templates/GraphQLDeveloperTemplate";
import { GraphdbSpecialistTemplate } from "@/components/resume/templates/GraphdbSpecialistTemplate";
import { GraphicDesignProTemplate } from "@/components/resume/templates/GraphicDesignProTemplate";
import { HackathonGraduateTemplate } from "@/components/resume/templates/HackathonGraduateTemplate";
import { HackernewsDeveloperTemplate } from "@/components/resume/templates/HackernewsDeveloperTemplate";
import { HackerrankExpertTemplate } from "@/components/resume/templates/HackerrankExpertTemplate";
import { HarmonyExecutiveTemplate } from "@/components/resume/templates/HarmonyExecutiveTemplate";
import { HealthcareProfessionalTemplate } from "@/components/resume/templates/HealthcareProfessionalTemplate";
import { HexagonalPatternUniversalTemplate } from "@/components/resume/templates/HexagonalPatternUniversalTemplate";
import { HorizonGraduateTemplate } from "@/components/resume/templates/HorizonGraduateTemplate";
import { IconBarUniversalTemplate } from "@/components/resume/templates/IconBarUniversalTemplate";
import { IllustrationPortfolioTemplate } from "@/components/resume/templates/IllustrationPortfolioTemplate";
import { ImaginativeDesignerTemplate } from "@/components/resume/templates/ImaginativeDesignerTemplate";
import { ImpressionDesignerTemplate } from "@/components/resume/templates/ImpressionDesignerTemplate";
import { InfinityLoopUniversalTemplate } from "@/components/resume/templates/InfinityLoopUniversalTemplate";
import { InfluencerProfessionalTemplate } from "@/components/resume/templates/InfluencerProfessionalTemplate";
import { InformationArchitectTemplate } from "@/components/resume/templates/InformationArchitectTemplate";
import { InkBrushTemplate } from "@/components/resume/templates/InkBrushTemplate";
import { InstagramCreativeTemplate } from "@/components/resume/templates/InstagramCreativeTemplate";
import { InteractivePortfolioDesignerTemplate } from "@/components/resume/templates/InteractivePortfolioDesignerTemplate";
import { InterfaceMasterTemplate } from "@/components/resume/templates/InterfaceMasterTemplate";
import { InternshipShowcaseTemplate } from "@/components/resume/templates/InternshipShowcaseTemplate";
import { JavaEnterpriseTemplateTemplate } from "@/components/resume/templates/JavaEnterpriseTemplateTemplate";
import { JsonResumeTemplate } from "@/components/resume/templates/JsonResumeTemplate";
import { KafkaStreamingExpertTemplate } from "@/components/resume/templates/KafkaStreamingExpertTemplate";
import { KaggleDataScientistTemplate } from "@/components/resume/templates/KaggleDataScientistTemplate";
import { KeystoneGraduateTemplate } from "@/components/resume/templates/KeystoneGraduateTemplate";
import { KubernetesSpecialistTemplate } from "@/components/resume/templates/KubernetesSpecialistTemplate";
import { LaunchpadGraduateTemplate } from "@/components/resume/templates/LaunchpadGraduateTemplate";
import { LayeredCardsUniversalTemplate } from "@/components/resume/templates/LayeredCardsUniversalTemplate";
import { LeetcodeChampionTemplate } from "@/components/resume/templates/LeetcodeChampionTemplate";
import { LeftAlignedProUniversalTemplate } from "@/components/resume/templates/LeftAlignedProUniversalTemplate";
import { LeftBorderUniversalTemplate } from "@/components/resume/templates/LeftBorderUniversalTemplate";
import { LegalAdvisorTemplate } from "@/components/resume/templates/LegalAdvisorTemplate";
import { LinearProgressUniversalTemplate } from "@/components/resume/templates/LinearProgressUniversalTemplate";
import { LinkedinGraduateTemplate } from "@/components/resume/templates/LinkedinGraduateTemplate";
import { LinkedinOptimizedTemplate } from "@/components/resume/templates/LinkedinOptimizedTemplate";
import { LinkedinTechExpertTemplate } from "@/components/resume/templates/LinkedinTechExpertTemplate";
import { MagazineCreativeTemplate } from "@/components/resume/templates/MagazineCreativeTemplate";
import { MagazineLayoutUniversalTemplate } from "@/components/resume/templates/MagazineLayoutUniversalTemplate";
import { MarketingStrategistTemplate } from "@/components/resume/templates/MarketingStrategistTemplate";
import { MedicalCertificationTemplate } from "@/components/resume/templates/MedicalCertificationTemplate";
import { MedicalResearchTemplate } from "@/components/resume/templates/MedicalResearchTemplate";
import { MediumTechWriterTemplate } from "@/components/resume/templates/MediumTechWriterTemplate";
import { MediumWriterCreativeTemplate } from "@/components/resume/templates/MediumWriterCreativeTemplate";
import { MeridianCorporateTemplate } from "@/components/resume/templates/MeridianCorporateTemplate";
import { MetroModernUniversalTemplate } from "@/components/resume/templates/MetroModernUniversalTemplate";
import { MicroarchEngineerTemplate } from "@/components/resume/templates/MicroarchEngineerTemplate";
import { MicrointeractionDesignerTemplate } from "@/components/resume/templates/MicrointeractionDesignerTemplate";
import { MicroservicesDevTemplate } from "@/components/resume/templates/MicroservicesDevTemplate";
import { MicroservicesExpertTemplate } from "@/components/resume/templates/MicroservicesExpertTemplate";
import { MilestoneGraduateTemplate } from "@/components/resume/templates/MilestoneGraduateTemplate";
import { MinimalChicTemplate } from "@/components/resume/templates/MinimalChicTemplate";
import { MinimalCorporateProTemplate } from "@/components/resume/templates/MinimalCorporateProTemplate";
import { MinimalDirectTemplateTemplate } from "@/components/resume/templates/MinimalDirectTemplateTemplate";
import { MinimalEleganceUniversalTemplate } from "@/components/resume/templates/MinimalEleganceUniversalTemplate";
import { MinimalLinesUniversalTemplate } from "@/components/resume/templates/MinimalLinesUniversalTemplate";
import { MinimalProLayoutTemplate } from "@/components/resume/templates/MinimalProLayoutTemplate";
import { MinimalistModernProTemplate } from "@/components/resume/templates/MinimalistModernProTemplate";
import { MinimalistProSimpleTemplate } from "@/components/resume/templates/MinimalistProSimpleTemplate";
import { MlopsEngineerTemplate } from "@/components/resume/templates/MlopsEngineerTemplate";
import { MobileDevTemplate } from "@/components/resume/templates/MobileDevTemplate";
import { MobileFirstDesignerTemplate } from "@/components/resume/templates/MobileFirstDesignerTemplate";
import { ModernArtistTemplate } from "@/components/resume/templates/ModernArtistTemplate";
import { ModernClearProTemplate } from "@/components/resume/templates/ModernClearProTemplate";
import { ModernCorporateGridTemplate } from "@/components/resume/templates/ModernCorporateGridTemplate";
import { ModernDigitalTemplate } from "@/components/resume/templates/ModernDigitalTemplate";
import { ModernEducatorProfessionTemplate } from "@/components/resume/templates/ModernEducatorProfessionTemplate";
import { ModernMinimalistUniversalTemplate } from "@/components/resume/templates/ModernMinimalistUniversalTemplate";
import { ModernPlainProTemplate } from "@/components/resume/templates/ModernPlainProTemplate";
import { ModernProfessionalBoxTemplate } from "@/components/resume/templates/ModernProfessionalBoxTemplate";
import { ModernSimpleProTemplate } from "@/components/resume/templates/ModernSimpleProTemplate";
import { MomentumFresherTemplate } from "@/components/resume/templates/MomentumFresherTemplate";
import { MonochromeElegantUniversalTemplate } from "@/components/resume/templates/MonochromeElegantUniversalTemplate";
import { MonospaceTechTemplate } from "@/components/resume/templates/MonospaceTechTemplate";
import { MotionDesignerPortfolioTemplate } from "@/components/resume/templates/MotionDesignerPortfolioTemplate";
import { MotionGraphicsArtistTemplate } from "@/components/resume/templates/MotionGraphicsArtistTemplate";
import { MotionUiDesignerTemplate } from "@/components/resume/templates/MotionUiDesignerTemplate";
import { MultiPlatformArtistTemplate } from "@/components/resume/templates/MultiPlatformArtistTemplate";
import { MuseCreativeTemplate } from "@/components/resume/templates/MuseCreativeTemplate";
import { NarrativeCreativeTemplate } from "@/components/resume/templates/NarrativeCreativeTemplate";
import { NeonArtistTemplate } from "@/components/resume/templates/NeonArtistTemplate";
import { NetworkedExecutiveTemplate } from "@/components/resume/templates/NetworkedExecutiveTemplate";
import { NetworkedGraduateTemplate } from "@/components/resume/templates/NetworkedGraduateTemplate";
import { NeuralEngineerTemplate } from "@/components/resume/templates/NeuralEngineerTemplate";
import { NewspaperStyleUniversalTemplate } from "@/components/resume/templates/NewspaperStyleUniversalTemplate";
import { NextstepFresherTemplate } from "@/components/resume/templates/NextstepFresherTemplate";
import { NexusEliteTemplate } from "@/components/resume/templates/NexusEliteTemplate";
import { NodeBackendSpecialistTemplate } from "@/components/resume/templates/NodeBackendSpecialistTemplate";
import { NpmPackageAuthorTemplate } from "@/components/resume/templates/NpmPackageAuthorTemplate";
import { NursingSpecialistTemplate } from "@/components/resume/templates/NursingSpecialistTemplate";
import { ObservabilityEngineerTemplate } from "@/components/resume/templates/ObservabilityEngineerTemplate";
import { OnlineGalleryArtistTemplate } from "@/components/resume/templates/OnlineGalleryArtistTemplate";
import { OnlineIdentityTemplate } from "@/components/resume/templates/OnlineIdentityTemplate";
import { OnlinePortfolioFresherTemplate } from "@/components/resume/templates/OnlinePortfolioFresherTemplate";
import { OnlinePresenceFresherTemplate } from "@/components/resume/templates/OnlinePresenceFresherTemplate";
import { OnlineProfessionalTemplate } from "@/components/resume/templates/OnlineProfessionalTemplate";
import { OpenSourceTemplate } from "@/components/resume/templates/OpenSourceTemplate";
import { OpensourceDeveloperTemplate } from "@/components/resume/templates/OpensourceDeveloperTemplate";
import { OperationsExcellenceTemplate } from "@/components/resume/templates/OperationsExcellenceTemplate";
import { PaletteDesignerTemplate } from "@/components/resume/templates/PaletteDesignerTemplate";
import { ParallaxStyleUniversalTemplate } from "@/components/resume/templates/ParallaxStyleUniversalTemplate";
import { PastelCreativeTemplate } from "@/components/resume/templates/PastelCreativeTemplate";
import { PathwayGraduateTemplate } from "@/components/resume/templates/PathwayGraduateTemplate";
import { PatreonCreativeTemplate } from "@/components/resume/templates/PatreonCreativeTemplate";
import { PhotographyLayoutTemplate } from "@/components/resume/templates/PhotographyLayoutTemplate";
import { PhotographyProTemplateTemplate } from "@/components/resume/templates/PhotographyProTemplateTemplate";
import { PinnacleEliteTemplate } from "@/components/resume/templates/PinnacleEliteTemplate";
import { PinterestDesignerTemplate } from "@/components/resume/templates/PinterestDesignerTemplate";
import { PioneerFresherTemplate } from "@/components/resume/templates/PioneerFresherTemplate";
import { PixelcraftDeveloperTemplate } from "@/components/resume/templates/PixelcraftDeveloperTemplate";
import { PixelperfectDesignerTemplate } from "@/components/resume/templates/PixelperfectDesignerTemplate";
import { PlatformProfessionalTemplate } from "@/components/resume/templates/PlatformProfessionalTemplate";
import { PortfolioCoderTemplate } from "@/components/resume/templates/PortfolioCoderTemplate";
import { PortfolioGraduateTemplate } from "@/components/resume/templates/PortfolioGraduateTemplate";
import { PortfolioMinimalistTemplate } from "@/components/resume/templates/PortfolioMinimalistTemplate";
import { PortfolioProfessionalTemplate } from "@/components/resume/templates/PortfolioProfessionalTemplate";
import { PortfolioShowcaseTemplate } from "@/components/resume/templates/PortfolioShowcaseTemplate";
import { PortfolioWebsiteCreativeTemplate } from "@/components/resume/templates/PortfolioWebsiteCreativeTemplate";
import { PostgreSQLExpertTemplate } from "@/components/resume/templates/PostgreSQLExpertTemplate";
import { PotentialFresherTemplate } from "@/components/resume/templates/PotentialFresherTemplate";
import { PrismProfessionalTemplate } from "@/components/resume/templates/PrismProfessionalTemplate";
import { ProcessImprovementTemplate } from "@/components/resume/templates/ProcessImprovementTemplate";
import { ProductDesignerShowcaseTemplate } from "@/components/resume/templates/ProductDesignerShowcaseTemplate";
import { ProductDesignerUXTemplate } from "@/components/resume/templates/ProductDesignerUXTemplate";
import { ProfessionalAccentBarTemplate } from "@/components/resume/templates/ProfessionalAccentBarTemplate";
import { ProfessionalBasicModernTemplate } from "@/components/resume/templates/ProfessionalBasicModernTemplate";
import { ProfessionalCleanSimpleTemplate } from "@/components/resume/templates/ProfessionalCleanSimpleTemplate";
import { ProfessionalCompactUniversalTemplate } from "@/components/resume/templates/ProfessionalCompactUniversalTemplate";
import { ProfessionalDividerTemplate } from "@/components/resume/templates/ProfessionalDividerTemplate";
import { ProfessionalEasyReadTemplate } from "@/components/resume/templates/ProfessionalEasyReadTemplate";
import { ProfessionalHeaderBannerTemplate } from "@/components/resume/templates/ProfessionalHeaderBannerTemplate";
import { ProfessionalModernEdgeTemplate } from "@/components/resume/templates/ProfessionalModernEdgeTemplate";
import { ProfessionalPlainSimpleTemplate } from "@/components/resume/templates/ProfessionalPlainSimpleTemplate";
import { ProfessionalReadableLayoutTemplate } from "@/components/resume/templates/ProfessionalReadableLayoutTemplate";
import { ProfessionalStraightforwardTemplate } from "@/components/resume/templates/ProfessionalStraightforwardTemplate";
import { ProfessionalVerticalLineTemplate } from "@/components/resume/templates/ProfessionalVerticalLineTemplate";
import { ProfileCentricTemplate } from "@/components/resume/templates/ProfileCentricTemplate";
import { ProfileDrivenGradTemplate } from "@/components/resume/templates/ProfileDrivenGradTemplate";
import { ProjectManagerProTemplate } from "@/components/resume/templates/ProjectManagerProTemplate";
import { ProjectShowcaseGradTemplate } from "@/components/resume/templates/ProjectShowcaseGradTemplate";
import { ProtfolioShowcaseUxTemplate } from "@/components/resume/templates/ProtfolioShowcaseUxTemplate";
import { PrototypeSpecialistTemplate } from "@/components/resume/templates/PrototypeSpecialistTemplate";
import { PyTorchDeveloperTemplate } from "@/components/resume/templates/PyTorchDeveloperTemplate";
import { PypiContributorTemplate } from "@/components/resume/templates/PypiContributorTemplate";
import { PythonDeveloperProTemplate } from "@/components/resume/templates/PythonDeveloperProTemplate";
import { QuantumCoderTemplate } from "@/components/resume/templates/QuantumCoderTemplate";
import { QuantumProfessionalTemplate } from "@/components/resume/templates/QuantumProfessionalTemplate";
import { RadianceCorporateTemplate } from "@/components/resume/templates/RadianceCorporateTemplate";
import { ReactFrontendProTemplate } from "@/components/resume/templates/ReactFrontendProTemplate";
import { ReactNativeExpertTemplate } from "@/components/resume/templates/ReactNativeExpertTemplate";
import { RedisCacheSpecialistTemplate } from "@/components/resume/templates/RedisCacheSpecialistTemplate";
import { ResponsiveUxTemplate } from "@/components/resume/templates/ResponsiveUxTemplate";
import { RetroProfessionalUniversalTemplate } from "@/components/resume/templates/RetroProfessionalUniversalTemplate";
import { RibbonHeaderUniversalTemplate } from "@/components/resume/templates/RibbonHeaderUniversalTemplate";
import { RoundedCornersUniversalTemplate } from "@/components/resume/templates/RoundedCornersUniversalTemplate";
import { RustDeveloperProTemplate } from "@/components/resume/templates/RustDeveloperProTemplate";
import { SalesAchievementTemplate } from "@/components/resume/templates/SalesAchievementTemplate";
import { ScalaEngineerTemplate } from "@/components/resume/templates/ScalaEngineerTemplate";
import { SerenityMinimalTemplate } from "@/components/resume/templates/SerenityMinimalTemplate";
import { ServerlessDeveloperTemplate } from "@/components/resume/templates/ServerlessDeveloperTemplate";
import { ServerlessSpecialistTemplate } from "@/components/resume/templates/ServerlessSpecialistTemplate";
import { ServicedesignSpecialistTemplate } from "@/components/resume/templates/ServicedesignSpecialistTemplate";
import { SidebarProfessionalUniversalTemplate } from "@/components/resume/templates/SidebarProfessionalUniversalTemplate";
import { SimpleBusinessCleanTemplate } from "@/components/resume/templates/SimpleBusinessCleanTemplate";
import { SimpleClearBusinessTemplate } from "@/components/resume/templates/SimpleClearBusinessTemplate";
import { SimpleExecutiveLayoutTemplate } from "@/components/resume/templates/SimpleExecutiveLayoutTemplate";
import { SimpleModernExecutiveTemplate } from "@/components/resume/templates/SimpleModernExecutiveTemplate";
import { SimpleProfessionalCleanTemplate } from "@/components/resume/templates/SimpleProfessionalCleanTemplate";
import { SimpleStructuredTemplateTemplate } from "@/components/resume/templates/SimpleStructuredTemplateTemplate";
import { SketchExpertPortfolioTemplate } from "@/components/resume/templates/SketchExpertPortfolioTemplate";
import { SocialCreativeInfluencerTemplate } from "@/components/resume/templates/SocialCreativeInfluencerTemplate";
import { SocialExecutiveTemplate } from "@/components/resume/templates/SocialExecutiveTemplate";
import { SocialFirstFresherTemplate } from "@/components/resume/templates/SocialFirstFresherTemplate";
import { SocialGraduateTemplate } from "@/components/resume/templates/SocialGraduateTemplate";
import { SocialMediaProTemplate } from "@/components/resume/templates/SocialMediaProTemplate";
import { SocialSavvyTemplate } from "@/components/resume/templates/SocialSavvyTemplate";
import { SoftwareCraftsmanTemplate } from "@/components/resume/templates/SoftwareCraftsmanTemplate";
import { SoftwareMasterTemplate } from "@/components/resume/templates/SoftwareMasterTemplate";
import { SoftwareVisionTemplate } from "@/components/resume/templates/SoftwareVisionTemplate";
import { SoundcloudArtistTemplate } from "@/components/resume/templates/SoundcloudArtistTemplate";
import { SparkFresherTemplate } from "@/components/resume/templates/SparkFresherTemplate";
import { SpectrumProfessionalTemplate } from "@/components/resume/templates/SpectrumProfessionalTemplate";
import { SplitPaneUniversalTemplate } from "@/components/resume/templates/SplitPaneUniversalTemplate";
import { SpotifyMusicianTemplate } from "@/components/resume/templates/SpotifyMusicianTemplate";
import { SpotlightHeaderUniversalTemplate } from "@/components/resume/templates/SpotlightHeaderUniversalTemplate";
import { StackOverflowInspiredTemplate } from "@/components/resume/templates/StackOverflowInspiredTemplate";
import { StackedSectionsUniversalTemplate } from "@/components/resume/templates/StackedSectionsUniversalTemplate";
import { StackmasterFullstackTemplate } from "@/components/resume/templates/StackmasterFullstackTemplate";
import { StackoverflowDevTemplate } from "@/components/resume/templates/StackoverflowDevTemplate";
import { SterlingExecutiveTemplate } from "@/components/resume/templates/SterlingExecutiveTemplate";
import { StrategicLeaderTemplate } from "@/components/resume/templates/StrategicLeaderTemplate";
import { StripedBackgroundUniversalTemplate } from "@/components/resume/templates/StripedBackgroundUniversalTemplate";
import { StudentDeveloperPortfolioTemplate } from "@/components/resume/templates/StudentDeveloperPortfolioTemplate";
import { StudentEngagementTemplate } from "@/components/resume/templates/StudentEngagementTemplate";
import { StudioArtistTemplate } from "@/components/resume/templates/StudioArtistTemplate";
import { SubstackAuthorTemplate } from "@/components/resume/templates/SubstackAuthorTemplate";
import { SwissStyleUniversalTemplate } from "@/components/resume/templates/SwissStyleUniversalTemplate";
import { SystemArchitectTemplate } from "@/components/resume/templates/SystemArchitectTemplate";
import { TaxSpecialistTemplate } from "@/components/resume/templates/TaxSpecialistTemplate";
import { TeachingExcellenceTemplate } from "@/components/resume/templates/TeachingExcellenceTemplate";
import { TechBloggerDevTemplate } from "@/components/resume/templates/TechBloggerDevTemplate";
import { TechCraftedTemplate } from "@/components/resume/templates/TechCraftedTemplate";
import { TechHorizonTemplate } from "@/components/resume/templates/TechHorizonTemplate";
import { TechLeadTemplate } from "@/components/resume/templates/TechLeadTemplate";
import { TechPioneerTemplate } from "@/components/resume/templates/TechPioneerTemplate";
import { TechVanguardTemplate } from "@/components/resume/templates/TechVanguardTemplate";
import { TensorFlowMLEngineerTemplate } from "@/components/resume/templates/TensorFlowMLEngineerTemplate";
import { TerminalConsoleTemplate } from "@/components/resume/templates/TerminalConsoleTemplate";
import { ThinBorderUniversalTemplate } from "@/components/resume/templates/ThinBorderUniversalTemplate";
import { ThreeDModelingArtistTemplate } from "@/components/resume/templates/ThreeDModelingArtistTemplate";
import { TiktokContentCreatorTemplate } from "@/components/resume/templates/TiktokContentCreatorTemplate";
import { TimelineVerticalUniversalTemplate } from "@/components/resume/templates/TimelineVerticalUniversalTemplate";
import { TitanCorporateTemplate } from "@/components/resume/templates/TitanCorporateTemplate";
import { TopBarUniversalTemplate } from "@/components/resume/templates/TopBarUniversalTemplate";
import { TriangularElementsUniversalTemplate } from "@/components/resume/templates/TriangularElementsUniversalTemplate";
import { TwitchStreamerCreativeTemplate } from "@/components/resume/templates/TwitchStreamerCreativeTemplate";
import { TwitterDevTemplate } from "@/components/resume/templates/TwitterDevTemplate";
import { TwoToneSplitUniversalTemplate } from "@/components/resume/templates/TwoToneSplitUniversalTemplate";
import { TypewriterStyleTemplate } from "@/components/resume/templates/TypewriterStyleTemplate";
import { UIUXDesignerProTemplate } from "@/components/resume/templates/UIUXDesignerProTemplate";
import { UiuxPortfolioProTemplate } from "@/components/resume/templates/UiuxPortfolioProTemplate";
import { UnderlineAccentUniversalTemplate } from "@/components/resume/templates/UnderlineAccentUniversalTemplate";
import { UrbanDesignerTemplate } from "@/components/resume/templates/UrbanDesignerTemplate";
import { UserflowDesignerTemplate } from "@/components/resume/templates/UserflowDesignerTemplate";
import { UserresearchSpecialistTemplate } from "@/components/resume/templates/UserresearchSpecialistTemplate";
import { UxResearcherPortfolioTemplate } from "@/components/resume/templates/UxResearcherPortfolioTemplate";
import { UxfolioDesignerTemplate } from "@/components/resume/templates/UxfolioDesignerTemplate";
import { VPExecutiveTemplate } from "@/components/resume/templates/VPExecutiveTemplate";
import { VelocityExecutiveTemplate } from "@/components/resume/templates/VelocityExecutiveTemplate";
import { VentureFresherTemplate } from "@/components/resume/templates/VentureFresherTemplate";
import { VertexProfessionalTemplate } from "@/components/resume/templates/VertexProfessionalTemplate";
import { VerticalTimelineUniversalTemplate } from "@/components/resume/templates/VerticalTimelineUniversalTemplate";
import { VibrantDesignerTemplate } from "@/components/resume/templates/VibrantDesignerTemplate";
import { VideoEditorCreativeTemplate } from "@/components/resume/templates/VideoEditorCreativeTemplate";
import { VintagePosterTemplate } from "@/components/resume/templates/VintagePosterTemplate";
import { VisionDesignerTemplate } from "@/components/resume/templates/VisionDesignerTemplate";
import { VisionaryCreativeTemplate } from "@/components/resume/templates/VisionaryCreativeTemplate";
import { VisualDesignerShowcaseTemplate } from "@/components/resume/templates/VisualDesignerShowcaseTemplate";
import { VisualStorytellerTemplateTemplate } from "@/components/resume/templates/VisualStorytellerTemplateTemplate";
import { VueJSDeveloperTemplate } from "@/components/resume/templates/VueJSDeveloperTemplate";
import { WatermarkStyleUniversalTemplate } from "@/components/resume/templates/WatermarkStyleUniversalTemplate";
import { WavePatternUniversalTemplate } from "@/components/resume/templates/WavePatternUniversalTemplate";
import { WebDesignerModernTemplate } from "@/components/resume/templates/WebDesignerModernTemplate";
import { WebPortfolioGradTemplate } from "@/components/resume/templates/WebPortfolioGradTemplate";
import { WebflowDesignerPortfolioTemplate } from "@/components/resume/templates/WebflowDesignerPortfolioTemplate";
import { WebpresenceExecutiveTemplate } from "@/components/resume/templates/WebpresenceExecutiveTemplate";
import { WebrtcEngineerTemplate } from "@/components/resume/templates/WebrtcEngineerTemplate";
import { WideMarginUniversalTemplate } from "@/components/resume/templates/WideMarginUniversalTemplate";
import { WireframeSpecialistTemplate } from "@/components/resume/templates/WireframeSpecialistTemplate";
import { YoutubeCreatorTemplate } from "@/components/resume/templates/YoutubeCreatorTemplate";
import { YoutubeDevEducatorTemplate } from "@/components/resume/templates/YoutubeDevEducatorTemplate";
import { ZenithCorporateTemplate } from "@/components/resume/templates/ZenithCorporateTemplate";
import { ZigzagBorderUniversalTemplate } from "@/components/resume/templates/ZigzagBorderUniversalTemplate";

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
  "tech-grid": TechGridPDF,
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
  // 2025 New Templates (100 PDF map entries)
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
  // 2025 Batch 2 - New PDF Templates (100 templates)
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
};

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
  // New Professional Templates (22 new registrations)
  "algo-engineer": AlgoEngineerTemplate,
  "artistic-bold": ArtisticBoldTemplate,
  "asymmetric-creative": AsymmetricCreativeTemplate,
  "bordered-elegance": BorderedEleganceTemplate,
  "code-minimal": CodeMinimalTemplate,
  "colorful-modern": ColorfulModernTemplate,
  "column-divide": ColumnDivideTemplate,
  "compact-professional": CompactProfessionalTemplate,
  "creative-timeline": CreativeTimelineTemplate,
  "designer-showcase": DesignerShowcaseTemplate,
  "developer-grid": DeveloperGridTemplate,
  "devops-pro": DevOpsProTemplate,
  "executive-minimal": ExecutiveMinimalTemplate,
  "fullstack-modern": FullStackModernTemplate,
  "geometric-modern": GeometricModernTemplate,
  "github-style": GitHubStyleTemplate,
  "ml-engineer": MLEngineerTemplate,
  "sidebar-accent": SidebarAccentTemplate,
  "tech-stack-pro": TechStackProTemplate,
  "terminal-theme": TerminalThemeTemplate,
  "timeline-elegance": TimelineEleganceTemplate,
  "two-tone-classic": TwoToneClassicTemplate,
  // 2025 New Templates (100 displayTemplates map entries)
  "strategic-leadership": StrategicLeadershipTemplate,
  "corporate-excellence": CorporateExcellenceTemplate,
  "executive-prestige": ExecutivePrestigeTemplate,
  "global-executive-pro": GlobalExecutiveProTemplate,
  "premium-corporate-edge": PremiumCorporateEdgeTemplate,
  "enterprise-leader": EnterpriseLeaderTemplate,
  "boardroom-ready": BoardroomReadyTemplate,
  "c-suite-modern": CSuiteModernTemplate,
  "executive-impact": ExecutiveImpactTemplate,
  "corporate-visionary": CorporateVisionaryTemplate,
  "platinum-executive": PlatinumExecutiveTemplate,
  "global-leadership": GlobalLeadershipTemplate,
  "senior-executive-pro": SeniorExecutiveProTemplate,
  "corporate-elite-plus": CorporateElitePlusTemplate,
  "executive-pinnacle": ExecutivePinnacleTemplate,
  "corporate-distinction": CorporateDistinctionTemplate,
  "leadership-summit": LeadershipSummitTemplate,
  "executive-authority": ExecutiveAuthorityTemplate,
  "corporate-premier": CorporatePremierTemplate,
  "global-enterprise": GlobalEnterpriseTemplate,
  "executive-signature": ExecutiveSignatureTemplate,
  "corporate-apex": CorporateApexTemplate,
  "strategic-executive-plus": StrategicExecutivePlusTemplate,
  "corporate-paradigm": CorporateParadigmTemplate,
  "executive-magnitude": ExecutiveMagnitudeTemplate,
  "corporate-sovereign": CorporateSovereignTemplate,
  "leadership-zenith": LeadershipZenithTemplate,
  "executive-nexus": ExecutiveNexusTemplate,
  "corporate-vanguard": CorporateVanguardTemplate,
  "executive-ascendancy": ExecutiveAscendancyTemplate,
  "vue-specialist": VueSpecialistTemplate,
  "svelte-developer": SvelteDeveloperTemplate,
  "flutter-engineer": FlutterEngineerTemplate,
  "swift-ios-developer": SwiftIOSDeveloperTemplate,
  "rust-systems-engineer": RustSystemsEngineerTemplate,
  "scala-backend-engineer": ScalaBackendEngineerTemplate,
  "elixir-developer": ElixirDeveloperTemplate,
  "graphql-architect": GraphQLArchitectTemplate,
  "typescript-expert": TypeScriptExpertTemplate,
  "nextjs-fullstack": NextJSFullstackTemplate,
  "nestjs-backend": NestJSBackendTemplate,
  "django-fullstack": DjangoFullstackTemplate,
  "spring-boot-developer": SpringBootDeveloperTemplate,
  "postgresql-dba": PostgreSQLDBATemplate,
  "mongodb-specialist": MongoDBSpecialistTemplate,
  "redis-engineer": RedisEngineerTemplate,
  "elasticsearch-expert": ElasticsearchExpertTemplate,
  "terraform-devops": TerraformDevOpsTemplate,
  "ansible-automation": AnsibleAutomationTemplate,
  "jenkins-cicd": JenkinsCICDTemplate,
  "kafka-streaming": KafkaStreamingTemplate,
  "rabbitmq-specialist": RabbitMQSpecialistTemplate,
  "grpc-developer": GRPCDeveloperTemplate,
  "webassembly-engineer": WebAssemblyEngineerTemplate,
  "unity-game-developer": UnityGameDeveloperTemplate,
  "academic-achiever": AcademicAchieverTemplate,
  "graduate-innovator": GraduateInnovatorTemplate,
  "campus-leader": CampusLeaderTemplate,
  "scholarship-graduate": ScholarshipGraduateTemplate,
  "honors-student": HonorsStudentTemplate,
  "stem-graduate": STEMGraduateTemplate,
  "internship-ready": InternshipReadyTemplate,
  "research-graduate": ResearchGraduateTemplate,
  "entrepreneurial-graduate": EntrepreneurialGraduateTemplate,
  "volunteer-leader": VolunteerLeaderTemplate,
  "coding-bootcamp-grad": CodingBootcampGradTemplate,
  "liberal-arts-graduate": LiberalArtsGraduateTemplate,
  "business-graduate": BusinessGraduateTemplate,
  "engineering-fresher": EngineeringFresherTemplate,
  "design-school-grad": DesignSchoolGradTemplate,
  "masters-graduate": MastersGraduateTemplate,
  "phd-candidate": PhDCandidateTemplate,
  "student-athlete": StudentAthleteTemplate,
  "study-abroad-graduate": StudyAbroadGraduateTemplate,
  "dual-degree-graduate": DualDegreeGraduateTemplate,
  "portfolio-artist": PortfolioArtistTemplate,
  "motion-designer": MotionDesignerTemplate,
  "brand-strategist": BrandStrategistTemplate,
  "content-creator": ContentCreatorTemplate,
  "illustrator-artist": IllustratorArtistTemplate,
  "video-producer": VideoProducerTemplate,
  "copywriter-creative": CopywriterCreativeTemplate,
  "art-director-pro": ArtDirectorProTemplate,
  "photographer-pro": PhotographerProTemplate,
  "typographer-specialist": TypographerSpecialistTemplate,
  "digital-artist": DigitalArtistTemplate,
  "creative-director-elite": CreativeDirectorEliteTemplate,
  "social-media-creative": SocialMediaCreativeTemplate,
  "animation-artist": AnimationArtistTemplate,
  "multimedia-designer": MultimediaDesignerTemplate,
  "ux-researcher": UXResearcherTemplate,
  "ui-specialist": UISpecialistTemplate,
  "product-designer-pro": ProductDesignerProTemplate,
  "interaction-designer": InteractionDesignerTemplate,
  "service-designer": ServiceDesignerTemplate,
  "design-systems-architect": DesignSystemsArchitectTemplate,
  "accessibility-designer": AccessibilityDesignerTemplate,
  "design-lead": DesignLeadTemplate,
  "design-strategist": DesignStrategistTemplate,
  "visual-designer-pro": VisualDesignerProTemplate,
  // 2025 Batch 2 - New Display Templates (100 templates)
  "sapphire-professional": SapphireProfessionalTemplate,
  "emerald-executive": EmeraldExecutiveTemplate,
  "ruby-corporate": RubyCorporateTemplate,
  "onyx-leadership": OnyxLeadershipTemplate,
  "platinum-prestige": PlatinumPrestigeTemplate,
  "azure-professional": AzureProfessionalTemplate,
  "amber-executive": AmberExecutiveTemplate,
  "violet-corporate": VioletCorporateTemplate,
  "jade-professional": JadeProfessionalTemplate,
  "crimson-leadership": CrimsonLeadershipTemplate,
  "slate-minimalist": SlateMinimalistTemplate,
  "teal-modern": TealModernTemplate,
  "indigo-executive": IndigoExecutiveTemplate,
  "rose-professional": RoseProfessionalTemplate,
  "navy-corporate": NavyCorporateTemplate,
  "gold-prestige": GoldPrestigeTemplate,
  "charcoal-professional": CharcoalProfessionalTemplate,
  "coral-executive": CoralExecutiveTemplate,
  "pewter-minimalist": PewterMinimalistTemplate,
  "forest-professional": ForestProfessionalTemplate,
  "burgundy-executive": BurgundyExecutiveTemplate,
  "sky-modern": SkyModernTemplate,
  "plum-professional": PlumProfessionalTemplate,
  "bronze-corporate": BronzeCorporateTemplate,
  "mint-professional": MintProfessionalTemplate,
  "obsidian-executive": ObsidianExecutiveTemplate,
  "tangerine-modern": TangerineModernTemplate,
  "steel-professional": SteelProfessionalTemplate,
  "lavender-executive": LavenderExecutiveTemplate,
  "cobalt-professional": CobaltProfessionalTemplate,
  "github-developer": GitHubDeveloperTemplate,
  "linkedin-tech-pro": LinkedInTechProTemplate,
  "laravel-artisan": LaravelArtisanTemplate,
  "rails-developer": RailsDeveloperTemplate,
  "angular-specialist": AngularSpecialistTemplate,
  "vue-master": VueMasterTemplate,
  "kotlin-android-dev": KotlinAndroidDevTemplate,
  "ios-swift-engineer": iOSSwiftEngineerTemplate,
  "docker-specialist": DockerSpecialistTemplate,
  "aws-solutions-architect": AWSSolutionsArchitectTemplate,
  "gcp-cloud-engineer": GCPCloudEngineerTemplate,
  "azure-devops-pro": AzureDevOpsProTemplate,
  "react-native-dev": ReactNativeDevTemplate,
  "flutter-ui-specialist": FlutterUISpecialistTemplate,
  "dotnet-core-developer": DotNetCoreDeveloperTemplate,
  "golang-backend-engineer": GolangBackendEngineerTemplate,
  "python-ml-engineer": PythonMLEngineerTemplate,
  "data-scientist-pro": DataScientistProTemplate,
  "blockchain-engineer": BlockchainEngineerTemplate,
  "solidity-developer": SolidityDeveloperTemplate,
  "cybersecurity-analyst": CybersecurityAnalystTemplate,
  "devsecops-engineer": DevSecOpsEngineerTemplate,
  "fullstack-javascript": FullstackJavaScriptTemplate,
  "jamstack-developer": JAMStackDeveloperTemplate,
  "headless-cms-developer": HeadlessCMSDeveloperTemplate,
  "digital-native-graduate": DigitalNativeGraduateTemplate,
  "tech-savvy-fresher": TechSavvyFresherTemplate,
  "linkedin-ready-graduate": LinkedInReadyGraduateTemplate,
  "github-student-developer": GitHubStudentDeveloperTemplate,
  "portfolio-first-graduate": PortfolioFirstGraduateTemplate,
  "connected-graduate": ConnectedGraduateTemplate,
  "social-media-savvy-grad": SocialMediaSavvyGradTemplate,
  "open-source-contributor": OpenSourceContributorTemplate,
  "hackathon-winner": HackathonWinnerTemplate,
  "coding-challenge-champion": CodingChallengeChampionTemplate,
  "capstone-showcase": CapstoneShowcaseTemplate,
  "research-publication-grad": ResearchPublicationGradTemplate,
  "conference-presenter": ConferencePresenterTemplate,
  "startup-intern": StartupInternTemplate,
  "faang-aspirant": FAANGAspirantTemplate,
  "bootcamp-success-story": BootcampSuccessStoryTemplate,
  "remote-work-ready": RemoteWorkReadyTemplate,
  "community-builder": CommunityBuilderTemplate,
  "tech-blogger-graduate": TechBloggerGraduateTemplate,
  "youtube-educator": YouTubeEducatorTemplate,
  "behance-designer": BehanceDesignerTemplate,
  "dribbble-creative": DribbbleCreativeTemplate,
  "instagram-influencer": InstagramInfluencerTemplate,
  "pinterest-curator": PinterestCuratorTemplate,
  "vimeo-videographer": VimeoVideographerTemplate,
  "medium-writer": MediumWriterTemplate,
  "tiktok-creator": TikTokCreatorTemplate,
  "twitch-streamer": TwitchStreamerTemplate,
  "soundcloud-producer": SoundCloudProducerTemplate,
  "spotify-artist": SpotifyArtistTemplate,
  "artstation-artist": ArtStationArtistTemplate,
  "deviantart-creator": DeviantArtCreatorTemplate,
  "patreon-creator": PatreonCreatorTemplate,
  "substack-writer": SubstackWriterTemplate,
  "clubhouse-moderator": ClubhouseModeratorTemplate,
  "figma-expert": FigmaExpertTemplate,
  "sketch-specialist": SketchSpecialistTemplate,
  "adobe-xd-designer": AdobeXDDesignerTemplate,
  "framer-designer": FramerDesignerTemplate,
  "webflow-developer": WebflowDeveloperTemplate,
  "principle-animator": PrincipleAnimatorTemplate,
  "invision-prototyper": InVisionPrototyperTemplate,
  "marvel-app-designer": MarvelAppDesignerTemplate,
  "zeplin-handoff-specialist": ZeplinHandoffSpecialistTemplate,
  "abstract-version-designer": AbstractVersionDesignerTemplate,
  // 2025 Batch 3 - Healthcare & Medical Templates (15 templates)
  "registered-nurse-pro": RegisteredNurseProTemplate,
  "physician-specialist": PhysicianSpecialistTemplate,
  "dental-professional": DentalProfessionalTemplate,
  "pharmacist-clinical": PharmacistClinicalTemplate,
  "physical-therapist": PhysicalTherapistTemplate,
  "medical-technologist": MedicalTechnologistTemplate,
  "radiology-technician": RadiologyTechnicianTemplate,
  "healthcare-administrator": HealthcareAdministratorTemplate,
  "mental-health-counselor": MentalHealthCounselorTemplate,
  "occupational-therapist": OccupationalTherapistTemplate,
  "speech-pathologist": SpeechPathologistTemplate,
  "veterinary-doctor": VeterinaryDoctorTemplate,
  "nutritionist-dietitian": NutritionistDietitianTemplate,
  "medical-assistant": MedicalAssistantTemplate,
  "paramedic-emt": ParamedicEMTTemplate,
  // 2025 Batch 3 - Engineering Templates (15 templates)
  "mechanical-engineer-pro": MechanicalEngineerProTemplate,
  "civil-engineer-pe": CivilEngineerPETemplate,
  "electrical-engineer": ElectricalEngineerTemplate,
  "chemical-engineer-pro": ChemicalEngineerProTemplate,
  "aerospace-engineer": AerospaceEngineerTemplate,
  "biomedical-engineer": BiomedicalEngineerTemplate,
  "industrial-engineer": IndustrialEngineerTemplate,
  "environmental-engineer": EnvironmentalEngineerTemplate,
  "petroleum-engineer": PetroleumEngineerTemplate,
  "structural-engineer": StructuralEngineerTemplate,
  "manufacturing-engineer": ManufacturingEngineerTemplate,
  "quality-assurance-engineer": QualityAssuranceEngineerTemplate,
  "automation-engineer": AutomationEngineerTemplate,
  "robotics-engineer": RoboticsEngineerTemplate,
  "hvac-engineer": HVACEngineerTemplate,
  // 2025 Batch 3 - Sales & Marketing Templates (15 templates)
  "sales-executive-pro": SalesExecutiveProTemplate,
  "account-manager-enterprise": AccountManagerEnterpriseTemplate,
  "digital-marketing-specialist": DigitalMarketingSpecialistTemplate,
  "brand-manager-strategic": BrandManagerStrategicTemplate,
  "seo-specialist-pro": SEOSpecialistProTemplate,
  "growth-marketing-manager": GrowthMarketingManagerTemplate,
  "email-marketing-specialist": EmailMarketingSpecialistTemplate,
  "product-marketing-manager": ProductMarketingManagerTemplate,
  "business-development-manager": BusinessDevelopmentManagerTemplate,
  "inside-sales-representative": InsideSalesRepresentativeTemplate,
  "field-sales-specialist": FieldSalesSpecialistTemplate,
  "customer-success-manager": CustomerSuccessManagerTemplate,
  "marketing-analytics-manager": MarketingAnalyticsManagerTemplate,
  "ecommerce-manager": EcommerceManagerTemplate,
  "affiliate-marketing-manager": AffiliateMarketingManagerTemplate,
  // 2025 Batch 3 - Finance & Accounting Templates (12 templates)
  "financial-analyst-cfa": FinancialAnalystCFATemplate,
  "investment-banker": InvestmentBankerTemplate,
  "certified-public-accountant": CertifiedPublicAccountantTemplate,
  "tax-specialist-pro": TaxSpecialistProTemplate,
  "financial-controller": FinancialControllerTemplate,
  "portfolio-manager": PortfolioManagerTemplate,
  "risk-management-analyst": RiskManagementAnalystTemplate,
  "treasury-analyst": TreasuryAnalystTemplate,
  "forensic-accountant": ForensicAccountantTemplate,
  "internal-auditor": InternalAuditorTemplate,
  "budget-analyst": BudgetAnalystTemplate,
  "equity-research-analyst": EquityResearchAnalystTemplate,
  // 2025 Batch 3 - Education & Teaching Templates (10 templates)
  "university-professor": UniversityProfessorTemplate,
  "elementary-teacher": ElementaryTeacherTemplate,
  "high-school-teacher": HighSchoolTeacherTemplate,
  "special-education-teacher": SpecialEducationTeacherTemplate,
  "esl-teacher-certified": ESLTeacherCertifiedTemplate,
  "curriculum-developer": CurriculumDeveloperTemplate,
  "instructional-designer": InstructionalDesignerTemplate,
  "academic-advisor": AcademicAdvisorTemplate,
  "online-course-instructor": OnlineCourseInstructorTemplate,
  "private-tutor-specialist": PrivateTutorSpecialistTemplate,
  // 2025 Batch 3 - Legal Templates (8 templates)
  "corporate-attorney": CorporateAttorneyTemplate,
  "litigation-attorney": LitigationAttorneyTemplate,
  "paralegal-certified": ParalegalCertifiedTemplate,
  "legal-consultant": LegalConsultantTemplate,
  "compliance-officer-legal": ComplianceOfficerLegalTemplate,
  "contract-specialist": ContractSpecialistTemplate,
  "intellectual-property-attorney": IntellectualPropertyAttorneyTemplate,
  "legal-operations-manager": LegalOperationsManagerTemplate,
  // 2025 Batch 3 - Human Resources Templates (8 templates)
  "hr-business-partner": HRBusinessPartnerTemplate,
  "talent-acquisition-specialist": TalentAcquisitionSpecialistTemplate,
  "compensation-benefits-manager": CompensationBenefitsManagerTemplate,
  "learning-development-manager": LearningDevelopmentManagerTemplate,
  "employee-relations-specialist": EmployeeRelationsSpecialistTemplate,
  "hr-analytics-manager": HRAnalyticsManagerTemplate,
  "organizational-development": OrganizationalDevelopmentTemplate,
  "diversity-inclusion-manager": DiversityInclusionManagerTemplate,
  // 2025 Batch 3 - Hospitality & Culinary Templates (7 templates)
  "executive-chef": ExecutiveChefTemplate,
  "hotel-manager-operations": HotelManagerOperationsTemplate,
  "restaurant-manager": RestaurantManagerTemplate,
  "event-planner-coordinator": EventPlannerCoordinatorTemplate,
  "sommelier-wine-specialist": SommelierWineSpecialistTemplate,
  "pastry-chef": PastryChefTemplate,
  "hospitality-director": HospitalityDirectorTemplate,
  // 2025 Batch 3 - Real Estate & Construction Templates (7 templates)
  "real-estate-broker": RealEstateBrokerTemplate,
  "property-manager-commercial": PropertyManagerCommercialTemplate,
  "construction-project-manager": ConstructionProjectManagerTemplate,
  "architect-registered": ArchitectRegisteredTemplate,
  "general-contractor": GeneralContractorTemplate,
  "estimator-cost-analyst": EstimatorCostAnalystTemplate,
  "real-estate-appraiser": RealEstateAppraiserTemplate,
  // 2025 Batch 3 - Operations & Logistics Templates (3 templates)
  "supply-chain-manager": SupplyChainManagerTemplate,
  "logistics-coordinator": LogisticsCoordinatorTemplate,
  "procurement-specialist": ProcurementSpecialistTemplate,

  "ai-engineer": AIEngineerTemplate,
  "api-doc": APIDocTemplate,
  "aws-cloud-engineer": AWSCloudEngineerTemplate,
  "academic-educator": AcademicEducatorTemplate,
  "accessibility-ux": AccessibilityUxTemplate,
  "accounting-pro": AccountingProTemplate,
  "achiever-fresher": AchieverFresherTemplate,
  "adobe-portfolio-designer": AdobePortfolioDesignerTemplate,
  "aesthetic-creative": AestheticCreativeTemplate,
  "agile-project-lead": AgileProjectLeadTemplate,
  "agileflow-developer": AgileflowDeveloperTemplate,
  "angular-modern-universal": AngularModernUniversalTemplate,
  "apigateway-architect": ApigatewayArchitectTemplate,
  "art-director-modern": ArtDirectorModernTemplate,
  "art-station-artist": ArtStationArtistTemplate,
  "artisan-designer": ArtisanDesignerTemplate,
  "artistic-grid": ArtisticGridTemplate,
  "artistic-horizon": ArtisticHorizonTemplate,
  "artistic-momentum": ArtisticMomentumTemplate,
  "artistic-vision": ArtisticVisionTemplate,
  "artstation-pro": ArtstationProTemplate,
  "ascend-graduate": AscendGraduateTemplate,
  "aspire-graduate": AspireGraduateTemplate,
  "asymmetric-layout-universal": AsymmetricLayoutUniversalTemplate,
  "atlas-executive": AtlasExecutiveTemplate,
  "audit-expert": AuditExpertTemplate,
  "aurora-minimal": AuroraMinimalTemplate,
  "awwwards-designer": AwwwardsDesignerTemplate,
  "azure-dev-ops-pro": AzureDevOpsProTemplate,
  "azure-dev-ops-specialist": AzureDevOpsSpecialistTemplate,
  "badge-style-universal": BadgeStyleUniversalTemplate,
  "behance-portfolio": BehancePortfolioTemplate,
  "bitbucket-developer": BitbucketDeveloperTemplate,
  "blockchain-dev": BlockchainDevTemplate,
  "blueprint-design": BlueprintDesignTemplate,
  "bold-section-headers-universal": BoldSectionHeadersUniversalTemplate,
  "bold-typography": BoldTypographyTemplate,
  "bold-typography-universal": BoldTypographyUniversalTemplate,
  "bootcamp-portfolio": BootcampPortfolioTemplate,
  "border-frame-universal": BorderFrameUniversalTemplate,
  "boxed-sections-universal": BoxedSectionsUniversalTemplate,
  "brand-designer": BrandDesignerTemplateTemplate,
  "brand-identity": BrandIdentityTemplate,
  "brand-manager": BrandManagerTemplate,
  "branded-professional": BrandedProfessionalTemplate,
  "bright-graduate": BrightGraduateTemplate,
  "business-clean-layout": BusinessCleanLayoutTemplate,
  "business-clear": BusinessClearTemplateTemplate,
  "business-modern-grid": BusinessModernGridTemplate,
  "business-sidebar-pro": BusinessSidebarProTemplate,
  "business-simple-modern": BusinessSimpleModernTemplate,
  "bytecode-specialist": BytecodeSpecialistTemplate,
  "ceo-profile": CEOProfileTemplate,
  "cicd-pipeline-engineer": CICDPipelineEngineerTemplate,
  "campus-influencer": CampusInfluencerTemplate,
  "canvas-artist": CanvasArtistTemplate,
  "carbonmade-designer": CarbonmadeDesignerTemplate,
  "card-layout-universal": CardLayoutUniversalTemplate,
  "casestudy-designer": CasestudyDesignerTemplate,
  "catalyst-fresher": CatalystFresherTemplate,
  "centered-minimal-universal": CenteredMinimalUniversalTemplate,
  "chevron-accent-universal": ChevronAccentUniversalTemplate,
  "chromatic-creative": ChromaticCreativeTemplate,
  "circle-icon-universal": CircleIconUniversalTemplate,
  "circular-elements-universal": CircularElementsUniversalTemplate,
  "classic-serif-universal": ClassicSerifUniversalTemplate,
  "clean-basic-executive": CleanBasicExecutiveTemplate,
  "clean-corporate-simple": CleanCorporateSimpleTemplate,
  "clean-modern-universal": CleanModernUniversalTemplate,
  "clean-professional-simple": CleanProfessionalSimpleTemplate,
  "clean-readable-pro": CleanReadableProTemplate,
  "clean-two-column-universal": CleanTwoColumnUniversalTemplate,
  "clinical-excellence": ClinicalExcellenceTemplate,
  "cloud-native": CloudNativeTemplate,
  "cloud-solutions-architect": CloudSolutionsArchitectTemplate,
  "cloudnative-architect": CloudnativeArchitectTemplate,
  "code-craftsman": CodeCraftsmanTemplate,
  "code-pinnacle": CodePinnacleTemplate,
  "code-snippet": CodeSnippetTemplate,
  "code-sphere": CodeSphereTemplate,
  "code-vision": CodeVisionTemplate,
  "codeforge-developer": CodeforgeDeveloperTemplate,
  "codepen-developer": CodepenDeveloperTemplate,
  "collage-art": CollageArtTemplate,
  "color-block-universal": ColorBlockUniversalTemplate,
  "color-splash": ColorSplashTemplate,
  "compact-elite-universal": CompactEliteUniversalTemplate,
  "compile-time-dev": CompileTimeDevTemplate,
  "compliance-officer": ComplianceOfficerTemplate,
  "componentui-designer": ComponentuiDesignerTemplate,
  "composition-artist": CompositionArtistTemplate,
  "concept-creative": ConceptCreativeTemplate,
  "connected-leader": ConnectedLeaderTemplate,
  "connected-professional": ConnectedProfessionalTemplate,
  "containerops-engineer": ContaineropsEngineerTemplate,
  "conversational-ux": ConversationalUxTemplate,
  "corner-accent-universal": CornerAccentUniversalTemplate,
  "coroflot-portfolio": CoroflotPortfolioTemplate,
  "corporate-border-frame": CorporateBorderFrameTemplate,
  "corporate-easy-layout": CorporateEasyLayoutTemplate,
  "corporate-elite": CorporateEliteTemplate,
  "corporate-law": CorporateLawTemplate,
  "corporate-legal-counsel": CorporateLegalCounselTemplate,
  "corporate-minimalist-pro": CorporateMinimalistProTemplate,
  "corporate-simple": CorporateSimpleTemplateTemplate,
  "corporate-vision": CorporateVisionTemplate,
  "cosmos-professional": CosmosProfessionalTemplate,
  "craft-artist": CraftArtistTemplate,
  "creative-canvas": CreativeCanvasTemplate,
  "creative-crafted": CreativeCraftedTemplate,
  "creative-horizon": CreativeHorizonTemplate,
  "creative-pulse": CreativePulseTemplate,
  "creative-showcase-grid": CreativeShowcaseGridTemplate,
  "crystal-executive": CrystalExecutiveTemplate,
  "curator-creative": CuratorCreativeTemplate,
  "cyber-security": CyberSecurityTemplate,
  "dark-mode-dev": DarkModeDevTemplate,
  "data-science": DataScienceTemplate,
  "design-leader-portfolio": DesignLeaderPortfolioTemplate,
  "design-maestro": DesignMaestroTemplate,
  "design-pinnacle": DesignPinnacleTemplate,
  "design-sphere": DesignSphereTemplate,
  "design-systems-portfolio": DesignSystemsPortfolioTemplate,
  "designleadership-director": DesignleadershipDirectorTemplate,
  "designops-specialist": DesignopsSpecialistTemplate,
  "designportfolio-specialist": DesignportfolioSpecialistTemplate,
  "designstrategy-lead": DesignstrategyLeadTemplate,
  "designsystem-architect": DesignsystemArchitectTemplate,
  "designthinking-specialist": DesignthinkingSpecialistTemplate,
  "dev-architecture": DevArchitectureTemplate,
  "dev-elite": DevEliteTemplate,
  "dev-momentum": DevMomentumTemplate,
  "dev-ops-automation": DevOpsAutomationTemplate,
  "dev-ops-engineer": DevOpsEngineerTemplate,
  "dev-ops-pro": DevOpsProTemplate,
  "dev-prime": DevPrimeTemplate,
  "dev-sec-ops-engineer": DevSecOpsEngineerTemplate,
  "deviant-art-creator": DeviantArtCreatorTemplate,
  "deviantart-artist": DeviantartArtistTemplate,
  "devto-contributor": DevtoContributorTemplate,
  "diagonal-accent-universal": DiagonalAccentUniversalTemplate,
  "diamond-accent-universal": DiamondAccentUniversalTemplate,
  "digital-artist-portfolio": DigitalArtistPortfolioTemplate,
  "digital-canvas": DigitalCanvasTemplate,
  "digital-executive": DigitalExecutiveTemplate,
  "digital-graduate": DigitalGraduateTemplate,
  "digital-identity": DigitalIdentityTemplate,
  "digital-marketing-pro": DigitalMarketingProTemplate,
  "digital-native-grad": DigitalNativeGradTemplate,
  "digital-portfolio-grad": DigitalPortfolioGradTemplate,
  "digital-professional": DigitalProfessionalTemplate,
  "director-level": DirectorLevelTemplate,
  "django-framework-pro": DjangoFrameworkProTemplate,
  "docker-container-pro": DockerContainerProTemplate,
  "dockerhub-publisher": DockerhubPublisherTemplate,
  "dot-net-core-developer": DotNetCoreDeveloperTemplate,
  "dot-net-developer": DotNetDeveloperTemplate,
  "dotted-grid-universal": DottedGridUniversalTemplate,
  "dribbble-showcase": DribbbleShowcaseTemplate,
  "dual-column-modern-universal": DualColumnModernUniversalTemplate,
  "eclipse-professional": EclipseProfessionalTemplate,
  "edgecompute-developer": EdgecomputeDeveloperTemplate,
  "editorial-artist": EditorialArtistTemplate,
  "editorial-style": EditorialStyleTemplate,
  "elasticsearch-dev": ElasticsearchDevTemplate,
  "elevate-fresher": ElevateFresherTemplate,
  "emerge-fresher": EmergeFresherTemplate,
  "entry-elite": EntryEliteTemplate,
  "entry-horizon": EntryHorizonTemplate,
  "entry-sphere": EntrySphereTemplate,
  "eventdriven-architect": EventdrivenArchitectTemplate,
  "executive-clean-split": ExecutiveCleanSplitTemplate,
  "executive-corner-accent": ExecutiveCornerAccentTemplate,
  "executive-direct-layout": ExecutiveDirectLayoutTemplate,
  "executive-easy": ExecutiveEasyTemplateTemplate,
  "executive-leadership": ExecutiveLeadershipTemplate,
  "executive-letterhead-universal": ExecutiveLetterheadUniversalTemplate,
  "executive-plain-layout": ExecutivePlainLayoutTemplate,
  "executive-sales-leader": ExecutiveSalesLeaderTemplate,
  "executive-simple-clean": ExecutiveSimpleCleanTemplate,
  "executive-split-design": ExecutiveSplitDesignTemplate,
  "executive-timeline-modern": ExecutiveTimelineModernTemplate,
  "expression-artist": ExpressionArtistTemplate,
  "figma-designer-portfolio": FigmaDesignerPortfolioTemplate,
  "financial-analyst": FinancialAnalystTemplate,
  "floating-header-universal": FloatingHeaderUniversalTemplate,
  "flutter-mobile-dev": FlutterMobileDevTemplate,
  "flux-executive": FluxExecutiveTemplate,
  "foundation-graduate": FoundationGraduateTemplate,
  "framer-designer-portfolio": FramerDesignerPortfolioTemplate,
  "fresher-academic-style": FresherAcademicStyleTemplate,
  "fresher-box-shadow": FresherBoxShadowTemplate,
  "fresher-circular-progress": FresherCircularProgressTemplate,
  "fresher-dash-border": FresherDashBorderTemplate,
  "fresher-double-column": FresherDoubleColumnTemplate,
  "fresher-glassmorphism": FresherGlassmorphismTemplate,
  "fresher-gradient-border": FresherGradientBorderTemplate,
  "fresher-iconography": FresherIconographyTemplate,
  "fresher-left-stripe": FresherLeftStripeTemplate,
  "fresher-lightweight": FresherLightweightTemplate,
  "fresher-modern-split": FresherModernSplitTemplate,
  "fresher-modern-tabs": FresherModernTabsTemplate,
  "fresher-neon-accent": FresherNeonAccentTemplate,
  "fresher-polaroid-style": FresherPolaroidStyleTemplate,
  "fresher-progressive": FresherProgressiveTemplate,
  "fresher-ribbon-style": FresherRibbonStyleTemplate,
  "fresher-step-by-step": FresherStepByStepTemplate,
  "fresher-timeline-dots": FresherTimelineDotsTemplate,
  "fresher-top-bottom": FresherTopBottomTemplate,
  "fresher-wave-header": FresherWaveHeaderTemplate,
  "freshers-crafted": FreshersCraftedTemplate,
  "freshers-vision": FreshersVisionTemplate,
  "full-stack-engineer": FullStackEngineerTemplate,
  "full-stack-modern": FullStackModernTemplate,
  "full-stack-pro": FullStackProTemplate,
  "fullstack-java-script": FullstackJavaScriptTemplate,
  "gcp-architect": GCPArchitectTemplate,
  "gallery-layout": GalleryLayoutTemplate,
  "gen-z-graduate": GenZGraduateTemplate,
  "genesis-graduate": GenesisGraduateTemplate,
  "geometric-creative": GeometricCreativeTemplate,
  "geometric-shapes-universal": GeometricShapesUniversalTemplate,
  "git-hub-developer": GitHubDeveloperTemplate,
  "git-hub-profile": GitHubProfileTemplate,
  "git-hub-student-developer": GitHubStudentDeveloperTemplate,
  "git-hub-style": GitHubStyleTemplate,
  "gitflow-engineer": GitflowEngineerTemplate,
  "github-portfolio-dev": GithubPortfolioDevTemplate,
  "github-student": GithubStudentTemplate,
  "gitlab-developer": GitlabDeveloperTemplate,
  "global-networker": GlobalNetworkerTemplate,
  "gradient-header-universal": GradientHeaderUniversalTemplate,
  "graduate-momentum": GraduateMomentumTemplate,
  "graduate-prime": GraduatePrimeTemplate,
  "graduate-zenith": GraduateZenithTemplate,
  "graph-ql-architect": GraphQLArchitectTemplate,
  "graph-ql-developer": GraphQLDeveloperTemplate,
  "graphdb-specialist": GraphdbSpecialistTemplate,
  "graphic-design-pro": GraphicDesignProTemplate,
  "hackathon-graduate": HackathonGraduateTemplate,
  "hackernews-developer": HackernewsDeveloperTemplate,
  "hackerrank-expert": HackerrankExpertTemplate,
  "harmony-executive": HarmonyExecutiveTemplate,
  "healthcare-professional": HealthcareProfessionalTemplate,
  "hexagonal-pattern-universal": HexagonalPatternUniversalTemplate,
  "horizon-graduate": HorizonGraduateTemplate,
  "icon-bar-universal": IconBarUniversalTemplate,
  "illustration-portfolio": IllustrationPortfolioTemplate,
  "imaginative-designer": ImaginativeDesignerTemplate,
  "impression-designer": ImpressionDesignerTemplate,
  "in-vision-prototyper": InVisionPrototyperTemplate,
  "infinity-loop-universal": InfinityLoopUniversalTemplate,
  "influencer-professional": InfluencerProfessionalTemplate,
  "information-architect": InformationArchitectTemplate,
  "ink-brush": InkBrushTemplate,
  "instagram-creative": InstagramCreativeTemplate,
  "interactive-portfolio-designer": InteractivePortfolioDesignerTemplate,
  "interface-master": InterfaceMasterTemplate,
  "internship-showcase": InternshipShowcaseTemplate,
  "jam-stack-developer": JAMStackDeveloperTemplate,
  "java-enterprise": JavaEnterpriseTemplateTemplate,
  "json-resume": JsonResumeTemplate,
  "kafka-streaming-expert": KafkaStreamingExpertTemplate,
  "kaggle-data-scientist": KaggleDataScientistTemplate,
  "keystone-graduate": KeystoneGraduateTemplate,
  "kubernete-engineer": KuberneteEngineerTemplate,
  "kubernetes-specialist": KubernetesSpecialistTemplate,
  "launchpad-graduate": LaunchpadGraduateTemplate,
  "layered-cards-universal": LayeredCardsUniversalTemplate,
  "leetcode-champion": LeetcodeChampionTemplate,
  "left-aligned-pro-universal": LeftAlignedProUniversalTemplate,
  "left-border-universal": LeftBorderUniversalTemplate,
  "legal-advisor": LegalAdvisorTemplate,
  "linear-progress-universal": LinearProgressUniversalTemplate,
  "linked-in-ready-graduate": LinkedInReadyGraduateTemplate,
  "linked-in-tech-pro": LinkedInTechProTemplate,
  "linkedin-graduate": LinkedinGraduateTemplate,
  "linkedin-optimized": LinkedinOptimizedTemplate,
  "linkedin-tech-expert": LinkedinTechExpertTemplate,
  "magazine-creative": MagazineCreativeTemplate,
  "magazine-layout-universal": MagazineLayoutUniversalTemplate,
  "marketing-strategist": MarketingStrategistTemplate,
  "medical-certification": MedicalCertificationTemplate,
  "medical-research": MedicalResearchTemplate,
  "medium-tech-writer": MediumTechWriterTemplate,
  "medium-writer-creative": MediumWriterCreativeTemplate,
  "meridian-corporate": MeridianCorporateTemplate,
  "metro-modern-universal": MetroModernUniversalTemplate,
  "microarch-engineer": MicroarchEngineerTemplate,
  "microinteraction-designer": MicrointeractionDesignerTemplate,
  "microservices-dev": MicroservicesDevTemplate,
  "microservices-expert": MicroservicesExpertTemplate,
  "milestone-graduate": MilestoneGraduateTemplate,
  "minimal-chic": MinimalChicTemplate,
  "minimal-corporate-pro": MinimalCorporateProTemplate,
  "minimal-direct": MinimalDirectTemplateTemplate,
  "minimal-elegance-universal": MinimalEleganceUniversalTemplate,
  "minimal-lines-universal": MinimalLinesUniversalTemplate,
  "minimal-pro-layout": MinimalProLayoutTemplate,
  "minimalist-modern-pro": MinimalistModernProTemplate,
  "minimalist-pro-simple": MinimalistProSimpleTemplate,
  "mlops-engineer": MlopsEngineerTemplate,
  "mobile-dev": MobileDevTemplate,
  "mobile-first-designer": MobileFirstDesignerTemplate,
  "modern-artist": ModernArtistTemplate,
  "modern-clear-pro": ModernClearProTemplate,
  "modern-corporate-grid": ModernCorporateGridTemplate,
  "modern-digital": ModernDigitalTemplate,
  "modern-educator-profession": ModernEducatorProfessionTemplate,
  "modern-minimalist-universal": ModernMinimalistUniversalTemplate,
  "modern-plain-pro": ModernPlainProTemplate,
  "modern-professional-box": ModernProfessionalBoxTemplate,
  "modern-simple-pro": ModernSimpleProTemplate,
  "momentum-fresher": MomentumFresherTemplate,
  "mongo-db-specialist": MongoDBSpecialistTemplate,
  "monochrome-elegant-universal": MonochromeElegantUniversalTemplate,
  "monospace-tech": MonospaceTechTemplate,
  "motion-designer-portfolio": MotionDesignerPortfolioTemplate,
  "motion-graphics-artist": MotionGraphicsArtistTemplate,
  "motion-ui-designer": MotionUiDesignerTemplate,
  "multi-platform-artist": MultiPlatformArtistTemplate,
  "muse-creative": MuseCreativeTemplate,
  "narrative-creative": NarrativeCreativeTemplate,
  "neon-artist": NeonArtistTemplate,
  "nest-js-backend": NestJSBackendTemplate,
  "networked-executive": NetworkedExecutiveTemplate,
  "networked-graduate": NetworkedGraduateTemplate,
  "neural-engineer": NeuralEngineerTemplate,
  "newspaper-style-universal": NewspaperStyleUniversalTemplate,
  "next-js-fullstack": NextJSFullstackTemplate,
  "nextstep-fresher": NextstepFresherTemplate,
  "nexus-elite": NexusEliteTemplate,
  "node-backend-specialist": NodeBackendSpecialistTemplate,
  "node-js-developer": NodeJSDeveloperTemplate,
  "npm-package-author": NpmPackageAuthorTemplate,
  "nursing-specialist": NursingSpecialistTemplate,
  "observability-engineer": ObservabilityEngineerTemplate,
  "online-gallery-artist": OnlineGalleryArtistTemplate,
  "online-identity": OnlineIdentityTemplate,
  "online-portfolio-fresher": OnlinePortfolioFresherTemplate,
  "online-presence-fresher": OnlinePresenceFresherTemplate,
  "online-professional": OnlineProfessionalTemplate,
  "open-source": OpenSourceTemplate,
  "opensource-developer": OpensourceDeveloperTemplate,
  "operations-excellence": OperationsExcellenceTemplate,
  "palette-designer": PaletteDesignerTemplate,
  "parallax-style-universal": ParallaxStyleUniversalTemplate,
  "pastel-creative": PastelCreativeTemplate,
  "pathway-graduate": PathwayGraduateTemplate,
  "patreon-creative": PatreonCreativeTemplate,
  "ph-d-candidate": PhDCandidateTemplate,
  "photography-layout": PhotographyLayoutTemplate,
  "photography-pro": PhotographyProTemplateTemplate,
  "pinnacle-elite": PinnacleEliteTemplate,
  "pinterest-designer": PinterestDesignerTemplate,
  "pioneer-fresher": PioneerFresherTemplate,
  "pixelcraft-developer": PixelcraftDeveloperTemplate,
  "pixelperfect-designer": PixelperfectDesignerTemplate,
  "platform-professional": PlatformProfessionalTemplate,
  "portfolio-coder": PortfolioCoderTemplate,
  "portfolio-graduate": PortfolioGraduateTemplate,
  "portfolio-minimalist": PortfolioMinimalistTemplate,
  "portfolio-professional": PortfolioProfessionalTemplate,
  "portfolio-showcase": PortfolioShowcaseTemplate,
  "portfolio-website-creative": PortfolioWebsiteCreativeTemplate,
  "postgre-sqldba": PostgreSQLDBATemplate,
  "postgre-sql-expert": PostgreSQLExpertTemplate,
  "potential-fresher": PotentialFresherTemplate,
  "prism-professional": PrismProfessionalTemplate,
  "process-improvement": ProcessImprovementTemplate,
  "product-designer-showcase": ProductDesignerShowcaseTemplate,
  "product-designer-ux": ProductDesignerUXTemplate,
  "professional-accent-bar": ProfessionalAccentBarTemplate,
  "professional-basic-modern": ProfessionalBasicModernTemplate,
  "professional-clean-simple": ProfessionalCleanSimpleTemplate,
  "professional-compact-universal": ProfessionalCompactUniversalTemplate,
  "professional-divider": ProfessionalDividerTemplate,
  "professional-easy-read": ProfessionalEasyReadTemplate,
  "professional-header-banner": ProfessionalHeaderBannerTemplate,
  "professional-modern-edge": ProfessionalModernEdgeTemplate,
  "professional-plain-simple": ProfessionalPlainSimpleTemplate,
  "professional-readable-layout": ProfessionalReadableLayoutTemplate,
  "professional-straightforward": ProfessionalStraightforwardTemplate,
  "professional-vertical-line": ProfessionalVerticalLineTemplate,
  "profile-centric": ProfileCentricTemplate,
  "profile-driven-grad": ProfileDrivenGradTemplate,
  "project-manager-pro": ProjectManagerProTemplate,
  "project-showcase-grad": ProjectShowcaseGradTemplate,
  "protfolio-showcase-ux": ProtfolioShowcaseUxTemplate,
  "prototype-specialist": PrototypeSpecialistTemplate,
  "py-torch-developer": PyTorchDeveloperTemplate,
  "pypi-contributor": PypiContributorTemplate,
  "python-developer-pro": PythonDeveloperProTemplate,
  "quantum-coder": QuantumCoderTemplate,
  "quantum-professional": QuantumProfessionalTemplate,
  "rabbit-mq-specialist": RabbitMQSpecialistTemplate,
  "radiance-corporate": RadianceCorporateTemplate,
  "react-frontend-pro": ReactFrontendProTemplate,
  "react-native-expert": ReactNativeExpertTemplate,
  "redis-cache-specialist": RedisCacheSpecialistTemplate,
  "responsive-ux": ResponsiveUxTemplate,
  "retro-professional-universal": RetroProfessionalUniversalTemplate,
  "ribbon-header-universal": RibbonHeaderUniversalTemplate,
  "rounded-corners-universal": RoundedCornersUniversalTemplate,
  "rust-developer-pro": RustDeveloperProTemplate,
  "sales-achievement": SalesAchievementTemplate,
  "scala-engineer": ScalaEngineerTemplate,
  "senior-dev-ops-engineer": SeniorDevOpsEngineerTemplate,
  "senior-dot-net-developer": SeniorDotNetDeveloperTemplate,
  "senior-full-stack-developer": SeniorFullStackDeveloperTemplate,
  "serenity-minimal": SerenityMinimalTemplate,
  "serverless-developer": ServerlessDeveloperTemplate,
  "serverless-specialist": ServerlessSpecialistTemplate,
  "servicedesign-specialist": ServicedesignSpecialistTemplate,
  "sidebar-professional-universal": SidebarProfessionalUniversalTemplate,
  "simple-business-clean": SimpleBusinessCleanTemplate,
  "simple-clear-business": SimpleClearBusinessTemplate,
  "simple-executive-layout": SimpleExecutiveLayoutTemplate,
  "simple-modern-executive": SimpleModernExecutiveTemplate,
  "simple-professional-clean": SimpleProfessionalCleanTemplate,
  "simple-structured": SimpleStructuredTemplateTemplate,
  "sketch-expert-portfolio": SketchExpertPortfolioTemplate,
  "social-creative-influencer": SocialCreativeInfluencerTemplate,
  "social-executive": SocialExecutiveTemplate,
  "social-first-fresher": SocialFirstFresherTemplate,
  "social-graduate": SocialGraduateTemplate,
  "social-media-pro": SocialMediaProTemplate,
  "social-savvy": SocialSavvyTemplate,
  "software-craftsman": SoftwareCraftsmanTemplate,
  "software-master": SoftwareMasterTemplate,
  "software-vision": SoftwareVisionTemplate,
  "sound-cloud-producer": SoundCloudProducerTemplate,
  "soundcloud-artist": SoundcloudArtistTemplate,
  "spark-fresher": SparkFresherTemplate,
  "spectrum-professional": SpectrumProfessionalTemplate,
  "split-pane-universal": SplitPaneUniversalTemplate,
  "spotify-musician": SpotifyMusicianTemplate,
  "spotlight-header-universal": SpotlightHeaderUniversalTemplate,
  "stack-overflow-inspired": StackOverflowInspiredTemplate,
  "stacked-sections-universal": StackedSectionsUniversalTemplate,
  "stackmaster-fullstack": StackmasterFullstackTemplate,
  "stackoverflow-dev": StackoverflowDevTemplate,
  "sterling-executive": SterlingExecutiveTemplate,
  "strategic-leader": StrategicLeaderTemplate,
  "striped-background-universal": StripedBackgroundUniversalTemplate,
  "student-developer-portfolio": StudentDeveloperPortfolioTemplate,
  "student-engagement": StudentEngagementTemplate,
  "studio-artist": StudioArtistTemplate,
  "substack-author": SubstackAuthorTemplate,
  "swiss-style-universal": SwissStyleUniversalTemplate,
  "system-architect": SystemArchitectTemplate,
  "tax-specialist": TaxSpecialistTemplate,
  "teaching-excellence": TeachingExcellenceTemplate,
  "tech-blogger-dev": TechBloggerDevTemplate,
  "tech-crafted": TechCraftedTemplate,
  "tech-horizon": TechHorizonTemplate,
  "tech-lead": TechLeadTemplate,
  "tech-pioneer": TechPioneerTemplate,
  "tech-vanguard": TechVanguardTemplate,
  "tensor-flow-ml-engineer": TensorFlowMLEngineerTemplate,
  "terminal-console": TerminalConsoleTemplate,
  "terraform-dev-ops": TerraformDevOpsTemplate,
  "thin-border-universal": ThinBorderUniversalTemplate,
  "three-d-modeling-artist": ThreeDModelingArtistTemplate,
  "tik-tok-creator": TikTokCreatorTemplate,
  "tiktok-content-creator": TiktokContentCreatorTemplate,
  "timeline-vertical-universal": TimelineVerticalUniversalTemplate,
  "titan-corporate": TitanCorporateTemplate,
  "top-bar-universal": TopBarUniversalTemplate,
  "triangular-elements-universal": TriangularElementsUniversalTemplate,
  "twitch-streamer-creative": TwitchStreamerCreativeTemplate,
  "twitter-dev": TwitterDevTemplate,
  "two-tone-split-universal": TwoToneSplitUniversalTemplate,
  "type-script-expert": TypeScriptExpertTemplate,
  "typewriter-style": TypewriterStyleTemplate,
  "uiux-designer-pro": UIUXDesignerProTemplate,
  "uiux-portfolio-pro": UiuxPortfolioProTemplate,
  "underline-accent-universal": UnderlineAccentUniversalTemplate,
  "urban-designer": UrbanDesignerTemplate,
  "userflow-designer": UserflowDesignerTemplate,
  "userresearch-specialist": UserresearchSpecialistTemplate,
  "ux-researcher-portfolio": UxResearcherPortfolioTemplate,
  "uxfolio-designer": UxfolioDesignerTemplate,
  "vp-executive": VPExecutiveTemplate,
  "velocity-executive": VelocityExecutiveTemplate,
  "venture-fresher": VentureFresherTemplate,
  "vertex-professional": VertexProfessionalTemplate,
  "vertical-timeline-universal": VerticalTimelineUniversalTemplate,
  "vibrant-designer": VibrantDesignerTemplate,
  "video-editor-creative": VideoEditorCreativeTemplate,
  "vintage-poster": VintagePosterTemplate,
  "vision-designer": VisionDesignerTemplate,
  "visionary-creative": VisionaryCreativeTemplate,
  "visual-designer-showcase": VisualDesignerShowcaseTemplate,
  "visual-storyteller": VisualStorytellerTemplateTemplate,
  "vue-js-developer": VueJSDeveloperTemplate,
  "watermark-style-universal": WatermarkStyleUniversalTemplate,
  "wave-pattern-universal": WavePatternUniversalTemplate,
  "web-assembly-engineer": WebAssemblyEngineerTemplate,
  "web-designer-modern": WebDesignerModernTemplate,
  "web-portfolio-grad": WebPortfolioGradTemplate,
  "webflow-designer-portfolio": WebflowDesignerPortfolioTemplate,
  "webpresence-executive": WebpresenceExecutiveTemplate,
  "webrtc-engineer": WebrtcEngineerTemplate,
  "wide-margin-universal": WideMarginUniversalTemplate,
  "wireframe-specialist": WireframeSpecialistTemplate,
  "you-tube-educator": YouTubeEducatorTemplate,
  "youtube-creator": YoutubeCreatorTemplate,
  "youtube-dev-educator": YoutubeDevEducatorTemplate,
  "zenith-corporate": ZenithCorporateTemplate,
  "zigzag-border-universal": ZigzagBorderUniversalTemplate,
  "i-os-swift-engineer": iOSSwiftEngineerTemplate,
};

// Templates that support inline editing (all display templates)
const inlineEditableTemplates = Object.keys(displayTemplates);

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
