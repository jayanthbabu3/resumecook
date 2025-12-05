import React, { memo, useState } from 'react';
import type { ResumeData } from "@/types/resume";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { AIEngineerTemplate } from "./resume/templates/AIEngineerTemplate";
import { APIDocTemplate } from "./resume/templates/APIDocTemplate";
import { AWSCloudEngineerTemplate } from "./resume/templates/AWSCloudEngineerTemplate";
import { AWSSolutionsArchitectTemplate } from "./resume/templates/AWSSolutionsArchitectTemplate";
import { AbstractVersionDesignerTemplate } from "./resume/templates/AbstractVersionDesignerTemplate";
import { AcademicAchieverTemplate } from "./resume/templates/AcademicAchieverTemplate";
import { AcademicAdvisorTemplate } from "./resume/templates/AcademicAdvisorTemplate";
import { AcademicEducatorTemplate } from "./resume/templates/AcademicEducatorTemplate";
import { AccessibilityDesignerTemplate } from "./resume/templates/AccessibilityDesignerTemplate";
import { AccessibilityUxTemplate } from "./resume/templates/AccessibilityUxTemplate";
import { AccountManagerEnterpriseTemplate } from "./resume/templates/AccountManagerEnterpriseTemplate";
import { AccountingExecutiveTemplate } from "./resume/templates/AccountingExecutiveTemplate";
import { AccountingProTemplate } from "./resume/templates/AccountingProTemplate";
import { AchieverFresherTemplate } from "./resume/templates/AchieverFresherTemplate";
import { AdobePortfolioDesignerTemplate } from "./resume/templates/AdobePortfolioDesignerTemplate";
import { AdobeXDDesignerTemplate } from "./resume/templates/AdobeXDDesignerTemplate";
import { AerospaceEngineerTemplate } from "./resume/templates/AerospaceEngineerTemplate";
import { AestheticCreativeTemplate } from "./resume/templates/AestheticCreativeTemplate";
import { AffiliateMarketingManagerTemplate } from "./resume/templates/AffiliateMarketingManagerTemplate";
import { AgileProjectLeadTemplate } from "./resume/templates/AgileProjectLeadTemplate";
import { AgileScrumTemplate } from "./resume/templates/AgileScrumTemplate";
import { AgileflowDeveloperTemplate } from "./resume/templates/AgileflowDeveloperTemplate";
import { AlgoEngineerTemplate } from "./resume/templates/AlgoEngineerTemplate";
import { AmberExecutiveTemplate } from "./resume/templates/AmberExecutiveTemplate";
import { AnalystTemplate } from "./resume/templates/AnalystTemplate";
import { AngularModernUniversalTemplate } from "./resume/templates/AngularModernUniversalTemplate";
import { AngularSpecialistTemplate } from "./resume/templates/AngularSpecialistTemplate";
import { AnimationArtistTemplate } from "./resume/templates/AnimationArtistTemplate";
import { AnsibleAutomationTemplate } from "./resume/templates/AnsibleAutomationTemplate";
import { ApigatewayArchitectTemplate } from "./resume/templates/ApigatewayArchitectTemplate";
import { ArchitectRegisteredTemplate } from "./resume/templates/ArchitectRegisteredTemplate";
import { ArtDirectorModernTemplate } from "./resume/templates/ArtDirectorModernTemplate";
import { ArtDirectorProTemplate } from "./resume/templates/ArtDirectorProTemplate";
import { ArtStationArtistTemplate } from "./resume/templates/ArtStationArtistTemplate";
import { ArtisanDesignerTemplate } from "./resume/templates/ArtisanDesignerTemplate";
import { ArtisticBoldTemplate } from "./resume/templates/ArtisticBoldTemplate";
import { ArtisticGridTemplate } from "./resume/templates/ArtisticGridTemplate";
import { ArtisticHorizonTemplate } from "./resume/templates/ArtisticHorizonTemplate";
import { ArtisticMomentumTemplate } from "./resume/templates/ArtisticMomentumTemplate";
import { ArtisticVisionTemplate } from "./resume/templates/ArtisticVisionTemplate";
import { ArtstationProTemplate } from "./resume/templates/ArtstationProTemplate";
import { AscendGraduateTemplate } from "./resume/templates/AscendGraduateTemplate";
import { AspireGraduateTemplate } from "./resume/templates/AspireGraduateTemplate";
import { AsymmetricCreativeTemplate } from "./resume/templates/AsymmetricCreativeTemplate";
import { AsymmetricLayoutUniversalTemplate } from "./resume/templates/AsymmetricLayoutUniversalTemplate";
import { AtlasExecutiveTemplate } from "./resume/templates/AtlasExecutiveTemplate";
import { AttorneyProfessionalTemplate } from "./resume/templates/AttorneyProfessionalTemplate";
import { AuditExpertTemplate } from "./resume/templates/AuditExpertTemplate";
import { AuditorTemplate } from "./resume/templates/AuditorTemplate";
import { AuroraMinimalTemplate } from "./resume/templates/AuroraMinimalTemplate";
import { AutomationEngineerTemplate } from "./resume/templates/AutomationEngineerTemplate";
import { AwwwardsDesignerTemplate } from "./resume/templates/AwwwardsDesignerTemplate";
import { AzureDevOpsProTemplate } from "./resume/templates/AzureDevOpsProTemplate";
import { AzureDevOpsSpecialistTemplate } from "./resume/templates/AzureDevOpsSpecialistTemplate";
import { AzureProfessionalTemplate } from "./resume/templates/AzureProfessionalTemplate";
import { BackendAPISpecialistTemplate } from "./resume/templates/BackendAPISpecialistTemplate";
import { BackendTemplate } from "./resume/templates/BackendTemplate";
import { BehanceDesignerTemplate } from "./resume/templates/BehanceDesignerTemplate";
import { BehancePortfolioTemplate } from "./resume/templates/BehancePortfolioTemplate";
import { BiomedicalEngineerTemplate } from "./resume/templates/BiomedicalEngineerTemplate";
import { BitbucketDeveloperTemplate } from "./resume/templates/BitbucketDeveloperTemplate";
import { BlockchainDevTemplate } from "./resume/templates/BlockchainDevTemplate";
import { BlockchainEngineerTemplate } from "./resume/templates/BlockchainEngineerTemplate";
import { BlueprintDesignTemplate } from "./resume/templates/BlueprintDesignTemplate";
import { BoardroomReadyTemplate } from "./resume/templates/BoardroomReadyTemplate";
import { BoldHeadlineTemplate } from "./resume/templates/BoldHeadlineTemplate";
import { BoldSectionHeadersUniversalTemplate } from "./resume/templates/BoldSectionHeadersUniversalTemplate";
import { BoldTypographyTemplate } from "./resume/templates/BoldTypographyTemplate";
import { BoldTypographyUniversalTemplate } from "./resume/templates/BoldTypographyUniversalTemplate";
import { BootcampPortfolioTemplate } from "./resume/templates/BootcampPortfolioTemplate";
import { BootcampSuccessStoryTemplate } from "./resume/templates/BootcampSuccessStoryTemplate";
import { BorderFrameUniversalTemplate } from "./resume/templates/BorderFrameUniversalTemplate";
import { BorderedEleganceTemplate } from "./resume/templates/BorderedEleganceTemplate";
import { BrandDesignerTemplateTemplate } from "./resume/templates/BrandDesignerTemplateTemplate";
import { BrandIdentityTemplate } from "./resume/templates/BrandIdentityTemplate";
import { BrandManagerStrategicTemplate } from "./resume/templates/BrandManagerStrategicTemplate";
import { BrandManagerTemplate } from "./resume/templates/BrandManagerTemplate";
import { BrandStrategistTemplate } from "./resume/templates/BrandStrategistTemplate";
import { BrandedProfessionalTemplate } from "./resume/templates/BrandedProfessionalTemplate";
import { BrightGraduateTemplate } from "./resume/templates/BrightGraduateTemplate";
import { BronzeCorporateTemplate } from "./resume/templates/BronzeCorporateTemplate";
import { BudgetAnalystTemplate } from "./resume/templates/BudgetAnalystTemplate";
import { BurgundyExecutiveTemplate } from "./resume/templates/BurgundyExecutiveTemplate";
import { BusinessCleanLayoutTemplate } from "./resume/templates/BusinessCleanLayoutTemplate";
import { BusinessClearTemplateTemplate } from "./resume/templates/BusinessClearTemplateTemplate";
import { BusinessDevelopmentManagerTemplate } from "./resume/templates/BusinessDevelopmentManagerTemplate";
import { BusinessEliteTemplate } from "./resume/templates/BusinessEliteTemplate";
import { BusinessGraduateTemplate } from "./resume/templates/BusinessGraduateTemplate";
import { BusinessModernGridTemplate } from "./resume/templates/BusinessModernGridTemplate";
import { BusinessModernTemplate } from "./resume/templates/BusinessModernTemplate";
import { BusinessSidebarProTemplate } from "./resume/templates/BusinessSidebarProTemplate";
import { BusinessSimpleModernTemplate } from "./resume/templates/BusinessSimpleModernTemplate";
import { BytecodeSpecialistTemplate } from "./resume/templates/BytecodeSpecialistTemplate";
import { CEOProfileTemplate } from "./resume/templates/CEOProfileTemplate";
import { CICDPipelineEngineerTemplate } from "./resume/templates/CICDPipelineEngineerTemplate";
import { CPAProfessionalTemplate } from "./resume/templates/CPAProfessionalTemplate";
import { CSuiteModernTemplate } from "./resume/templates/CSuiteModernTemplate";
import { CampusInfluencerTemplate } from "./resume/templates/CampusInfluencerTemplate";
import { CampusLeaderTemplate } from "./resume/templates/CampusLeaderTemplate";
import { CanvasArtistTemplate } from "./resume/templates/CanvasArtistTemplate";
import { CapstoneShowcaseTemplate } from "./resume/templates/CapstoneShowcaseTemplate";
import { CarbonmadeDesignerTemplate } from "./resume/templates/CarbonmadeDesignerTemplate";
import { CasestudyDesignerTemplate } from "./resume/templates/CasestudyDesignerTemplate";
import { CatalystFresherTemplate } from "./resume/templates/CatalystFresherTemplate";
import { CertifiedPublicAccountantTemplate } from "./resume/templates/CertifiedPublicAccountantTemplate";
import { CharcoalProfessionalTemplate } from "./resume/templates/CharcoalProfessionalTemplate";
import { ChemicalEngineerProTemplate } from "./resume/templates/ChemicalEngineerProTemplate";
import { ChevronAccentUniversalTemplate } from "./resume/templates/ChevronAccentUniversalTemplate";
import { ChromaticCreativeTemplate } from "./resume/templates/ChromaticCreativeTemplate";
import { CircularElementsUniversalTemplate } from "./resume/templates/CircularElementsUniversalTemplate";
import { CivilEngineerPETemplate } from "./resume/templates/CivilEngineerPETemplate";
import { ClassicSerifUniversalTemplate } from "./resume/templates/ClassicSerifUniversalTemplate";
import { CleanBasicExecutiveTemplate } from "./resume/templates/CleanBasicExecutiveTemplate";
import { CleanCorporateSimpleTemplate } from "./resume/templates/CleanCorporateSimpleTemplate";
import { CleanCorporateTemplate } from "./resume/templates/CleanCorporateTemplate";
import { CleanModernUniversalTemplate } from "./resume/templates/CleanModernUniversalTemplate";
import { CleanProfessionalSimpleTemplate } from "./resume/templates/CleanProfessionalSimpleTemplate";
import { CleanReadableProTemplate } from "./resume/templates/CleanReadableProTemplate";
import { CleanTwoColumnUniversalTemplate } from "./resume/templates/CleanTwoColumnUniversalTemplate";
import { ClinicalExcellenceTemplate } from "./resume/templates/ClinicalExcellenceTemplate";
import { ClinicalMinimalTemplate } from "./resume/templates/ClinicalMinimalTemplate";
import { CloudArchitectTemplate } from "./resume/templates/CloudArchitectTemplate";
import { CloudNativeTemplate } from "./resume/templates/CloudNativeTemplate";
import { CloudSolutionsArchitectTemplate } from "./resume/templates/CloudSolutionsArchitectTemplate";
import { CloudnativeArchitectTemplate } from "./resume/templates/CloudnativeArchitectTemplate";
import { ClubhouseModeratorTemplate } from "./resume/templates/ClubhouseModeratorTemplate";
import { CobaltProfessionalTemplate } from "./resume/templates/CobaltProfessionalTemplate";
import { CodeCraftsmanTemplate } from "./resume/templates/CodeCraftsmanTemplate";
import { CodeMinimalTemplate } from "./resume/templates/CodeMinimalTemplate";
import { CodePinnacleTemplate } from "./resume/templates/CodePinnacleTemplate";
import { CodeSnippetTemplate } from "./resume/templates/CodeSnippetTemplate";
import { CodeSphereTemplate } from "./resume/templates/CodeSphereTemplate";
import { CodeVisionTemplate } from "./resume/templates/CodeVisionTemplate";
import { CodeforgeDeveloperTemplate } from "./resume/templates/CodeforgeDeveloperTemplate";
import { CodepenDeveloperTemplate } from "./resume/templates/CodepenDeveloperTemplate";
import { CodingBootcampGradTemplate } from "./resume/templates/CodingBootcampGradTemplate";
import { CodingChallengeChampionTemplate } from "./resume/templates/CodingChallengeChampionTemplate";
import { CollageArtTemplate } from "./resume/templates/CollageArtTemplate";
import { ColorBlockUniversalTemplate } from "./resume/templates/ColorBlockUniversalTemplate";
import { ColorSplashTemplate } from "./resume/templates/ColorSplashTemplate";
import { ColorfulModernTemplate } from "./resume/templates/ColorfulModernTemplate";
import { ColumnDivideTemplate } from "./resume/templates/ColumnDivideTemplate";
import { CommunityBuilderTemplate } from "./resume/templates/CommunityBuilderTemplate";
import { CompactEliteUniversalTemplate } from "./resume/templates/CompactEliteUniversalTemplate";
import { CompactProfessionalTemplate } from "./resume/templates/CompactProfessionalTemplate";
import { CompensationBenefitsManagerTemplate } from "./resume/templates/CompensationBenefitsManagerTemplate";
import { CompileTimeDevTemplate } from "./resume/templates/CompileTimeDevTemplate";
import { ComplianceOfficerLegalTemplate } from "./resume/templates/ComplianceOfficerLegalTemplate";
import { ComplianceOfficerTemplate } from "./resume/templates/ComplianceOfficerTemplate";
import { ComponentuiDesignerTemplate } from "./resume/templates/ComponentuiDesignerTemplate";
import { CompositionArtistTemplate } from "./resume/templates/CompositionArtistTemplate";
import { ConceptCreativeTemplate } from "./resume/templates/ConceptCreativeTemplate";
import { ConferencePresenterTemplate } from "./resume/templates/ConferencePresenterTemplate";
import { ConnectedGraduateTemplate } from "./resume/templates/ConnectedGraduateTemplate";
import { ConnectedLeaderTemplate } from "./resume/templates/ConnectedLeaderTemplate";
import { ConnectedProfessionalTemplate } from "./resume/templates/ConnectedProfessionalTemplate";
import { ConstructionProjectManagerTemplate } from "./resume/templates/ConstructionProjectManagerTemplate";
import { ConsultantTemplate } from "./resume/templates/ConsultantTemplate";
import { ContaineropsEngineerTemplate } from "./resume/templates/ContaineropsEngineerTemplate";
import { ContemporarySplitTemplate } from "./resume/templates/ContemporarySplitTemplate";
import { ContentCreatorTemplate } from "./resume/templates/ContentCreatorTemplate";
import { ContractSpecialistTemplate } from "./resume/templates/ContractSpecialistTemplate";
import { ConversationalUxTemplate } from "./resume/templates/ConversationalUxTemplate";
import { CopywriterCreativeTemplate } from "./resume/templates/CopywriterCreativeTemplate";
import { CoralExecutiveTemplate } from "./resume/templates/CoralExecutiveTemplate";
import { CornerAccentUniversalTemplate } from "./resume/templates/CornerAccentUniversalTemplate";
import { CoroflotPortfolioTemplate } from "./resume/templates/CoroflotPortfolioTemplate";
import { CorporateApexTemplate } from "./resume/templates/CorporateApexTemplate";
import { CorporateAttorneyTemplate } from "./resume/templates/CorporateAttorneyTemplate";
import { CorporateBlueTemplate } from "./resume/templates/CorporateBlueTemplate";
import { CorporateBorderFrameTemplate } from "./resume/templates/CorporateBorderFrameTemplate";
import { CorporateCleanTemplate } from "./resume/templates/CorporateCleanTemplate";
import { CorporateDistinctionTemplate } from "./resume/templates/CorporateDistinctionTemplate";
import { CorporateEasyLayoutTemplate } from "./resume/templates/CorporateEasyLayoutTemplate";
import { CorporateElitePlusTemplate } from "./resume/templates/CorporateElitePlusTemplate";
import { CorporateEliteTemplate } from "./resume/templates/CorporateEliteTemplate";
import { CorporateExcellenceTemplate } from "./resume/templates/CorporateExcellenceTemplate";
import { CorporateExecutiveTemplate } from "./resume/templates/CorporateExecutiveTemplate";
import { CorporateLawTemplate } from "./resume/templates/CorporateLawTemplate";
import { CorporateLegalCounselTemplate } from "./resume/templates/CorporateLegalCounselTemplate";
import { CorporateMinimalistProTemplate } from "./resume/templates/CorporateMinimalistProTemplate";
import { CorporateParadigmTemplate } from "./resume/templates/CorporateParadigmTemplate";
import { CorporatePremierTemplate } from "./resume/templates/CorporatePremierTemplate";
import { CorporateSimpleTemplateTemplate } from "./resume/templates/CorporateSimpleTemplateTemplate";
import { CorporateSovereignTemplate } from "./resume/templates/CorporateSovereignTemplate";
import { CorporateVanguardTemplate } from "./resume/templates/CorporateVanguardTemplate";
import { CorporateVisionTemplate } from "./resume/templates/CorporateVisionTemplate";
import { CorporateVisionaryTemplate } from "./resume/templates/CorporateVisionaryTemplate";
import { CosmosProfessionalTemplate } from "./resume/templates/CosmosProfessionalTemplate";
import { CraftArtistTemplate } from "./resume/templates/CraftArtistTemplate";
import { CreativeAccentTemplate } from "./resume/templates/CreativeAccentTemplate";
import { CreativeCanvasTemplate } from "./resume/templates/CreativeCanvasTemplate";
import { CreativeCraftedTemplate } from "./resume/templates/CreativeCraftedTemplate";
import { CreativeDirectorEliteTemplate } from "./resume/templates/CreativeDirectorEliteTemplate";
import { CreativeHorizonTemplate } from "./resume/templates/CreativeHorizonTemplate";
import { CreativePulseTemplate } from "./resume/templates/CreativePulseTemplate";
import { CreativeShowcaseGridTemplate } from "./resume/templates/CreativeShowcaseGridTemplate";
import { CreativeTimelineTemplate } from "./resume/templates/CreativeTimelineTemplate";
import { CrimsonLeadershipTemplate } from "./resume/templates/CrimsonLeadershipTemplate";
import { CrystalExecutiveTemplate } from "./resume/templates/CrystalExecutiveTemplate";
import { CuratorCreativeTemplate } from "./resume/templates/CuratorCreativeTemplate";
import { CurriculumDeveloperTemplate } from "./resume/templates/CurriculumDeveloperTemplate";
import { CustomerSuccessManagerTemplate } from "./resume/templates/CustomerSuccessManagerTemplate";
import { CyberSecurityTemplate } from "./resume/templates/CyberSecurityTemplate";
import { CybersecurityAnalystTemplate } from "./resume/templates/CybersecurityAnalystTemplate";
import { DarkModeDevTemplate } from "./resume/templates/DarkModeDevTemplate";
import { DataEngineerTemplate } from "./resume/templates/DataEngineerTemplate";
import { DataScienceTemplate } from "./resume/templates/DataScienceTemplate";
import { DataScientistProTemplate } from "./resume/templates/DataScientistProTemplate";
import { DentalProfessionalTemplate } from "./resume/templates/DentalProfessionalTemplate";
import { DesignLeadTemplate } from "./resume/templates/DesignLeadTemplate";
import { DesignLeaderPortfolioTemplate } from "./resume/templates/DesignLeaderPortfolioTemplate";
import { DesignMaestroTemplate } from "./resume/templates/DesignMaestroTemplate";
import { DesignPinnacleTemplate } from "./resume/templates/DesignPinnacleTemplate";
import { DesignSchoolGradTemplate } from "./resume/templates/DesignSchoolGradTemplate";
import { DesignSphereTemplate } from "./resume/templates/DesignSphereTemplate";
import { DesignStrategistTemplate } from "./resume/templates/DesignStrategistTemplate";
import { DesignSystemsArchitectTemplate } from "./resume/templates/DesignSystemsArchitectTemplate";
import { DesignSystemsPortfolioTemplate } from "./resume/templates/DesignSystemsPortfolioTemplate";
import { DesignerShowcaseTemplate } from "./resume/templates/DesignerShowcaseTemplate";
import { DesignleadershipDirectorTemplate } from "./resume/templates/DesignleadershipDirectorTemplate";
import { DesignopsSpecialistTemplate } from "./resume/templates/DesignopsSpecialistTemplate";
import { DesignportfolioSpecialistTemplate } from "./resume/templates/DesignportfolioSpecialistTemplate";
import { DesignstrategyLeadTemplate } from "./resume/templates/DesignstrategyLeadTemplate";
import { DesignsystemArchitectTemplate } from "./resume/templates/DesignsystemArchitectTemplate";
import { DesignthinkingSpecialistTemplate } from "./resume/templates/DesignthinkingSpecialistTemplate";
import { DevArchitectureTemplate } from "./resume/templates/DevArchitectureTemplate";
import { DevEliteTemplate } from "./resume/templates/DevEliteTemplate";
import { DevMomentumTemplate } from "./resume/templates/DevMomentumTemplate";
import { DevOpsAutomationTemplate } from "./resume/templates/DevOpsAutomationTemplate";
import { DevOpsEngineerTemplate } from "./resume/templates/DevOpsEngineerTemplate";
import { DevOpsProTemplate } from "./resume/templates/DevOpsProTemplate";
import { DevPrimeTemplate } from "./resume/templates/DevPrimeTemplate";
import { DevSecOpsEngineerTemplate } from "./resume/templates/DevSecOpsEngineerTemplate";
import { DeveloperGridTemplate } from "./resume/templates/DeveloperGridTemplate";
import { DeviantArtCreatorTemplate } from "./resume/templates/DeviantArtCreatorTemplate";
import { DeviantartArtistTemplate } from "./resume/templates/DeviantartArtistTemplate";
import { DevtoContributorTemplate } from "./resume/templates/DevtoContributorTemplate";
import { DiamondAccentUniversalTemplate } from "./resume/templates/DiamondAccentUniversalTemplate";
import { DigitalArtistPortfolioTemplate } from "./resume/templates/DigitalArtistPortfolioTemplate";
import { DigitalArtistTemplate } from "./resume/templates/DigitalArtistTemplate";
import { DigitalCanvasTemplate } from "./resume/templates/DigitalCanvasTemplate";
import { DigitalExecutiveTemplate } from "./resume/templates/DigitalExecutiveTemplate";
import { DigitalGraduateTemplate } from "./resume/templates/DigitalGraduateTemplate";
import { DigitalIdentityTemplate } from "./resume/templates/DigitalIdentityTemplate";
import { DigitalMarketerTemplate } from "./resume/templates/DigitalMarketerTemplate";
import { DigitalMarketingProTemplate } from "./resume/templates/DigitalMarketingProTemplate";
import { DigitalMarketingSpecialistTemplate } from "./resume/templates/DigitalMarketingSpecialistTemplate";
import { DigitalNativeGradTemplate } from "./resume/templates/DigitalNativeGradTemplate";
import { DigitalNativeGraduateTemplate } from "./resume/templates/DigitalNativeGraduateTemplate";
import { DigitalPortfolioGradTemplate } from "./resume/templates/DigitalPortfolioGradTemplate";
import { DigitalProfessionalTemplate } from "./resume/templates/DigitalProfessionalTemplate";
import { DirectorLevelTemplate } from "./resume/templates/DirectorLevelTemplate";
import { DiversityInclusionManagerTemplate } from "./resume/templates/DiversityInclusionManagerTemplate";
import { DjangoFrameworkProTemplate } from "./resume/templates/DjangoFrameworkProTemplate";
import { DjangoFullstackTemplate } from "./resume/templates/DjangoFullstackTemplate";
import { DockerContainerProTemplate } from "./resume/templates/DockerContainerProTemplate";
import { DockerSpecialistTemplate } from "./resume/templates/DockerSpecialistTemplate";
import { DockerhubPublisherTemplate } from "./resume/templates/DockerhubPublisherTemplate";
import { DotNetCoreDeveloperTemplate } from "./resume/templates/DotNetCoreDeveloperTemplate";
import { DotNetDeveloperTemplate } from "./resume/templates/DotNetDeveloperTemplate";
import { DottedGridUniversalTemplate } from "./resume/templates/DottedGridUniversalTemplate";
import { DribbbleCreativeTemplate } from "./resume/templates/DribbbleCreativeTemplate";
import { DribbbleShowcaseTemplate } from "./resume/templates/DribbbleShowcaseTemplate";
import { DualDegreeGraduateTemplate } from "./resume/templates/DualDegreeGraduateTemplate";
import { ESLTeacherCertifiedTemplate } from "./resume/templates/ESLTeacherCertifiedTemplate";
import { EclipseProfessionalTemplate } from "./resume/templates/EclipseProfessionalTemplate";
import { EcommerceManagerTemplate } from "./resume/templates/EcommerceManagerTemplate";
import { EdgecomputeDeveloperTemplate } from "./resume/templates/EdgecomputeDeveloperTemplate";
import { EditorialArtistTemplate } from "./resume/templates/EditorialArtistTemplate";
import { EditorialStyleTemplate } from "./resume/templates/EditorialStyleTemplate";
import { EducatorModernTemplate } from "./resume/templates/EducatorModernTemplate";
import { ElasticsearchDevTemplate } from "./resume/templates/ElasticsearchDevTemplate";
import { ElasticsearchExpertTemplate } from "./resume/templates/ElasticsearchExpertTemplate";
import { ElectricalEngineerTemplate } from "./resume/templates/ElectricalEngineerTemplate";
import { ElegantProfessionalTemplate } from "./resume/templates/ElegantProfessionalTemplate";
import { ElegantSerifTemplate } from "./resume/templates/ElegantSerifTemplate";
import { ElementaryTeacherTemplate } from "./resume/templates/ElementaryTeacherTemplate";
import { ElevateFresherTemplate } from "./resume/templates/ElevateFresherTemplate";
import { ElixirDeveloperTemplate } from "./resume/templates/ElixirDeveloperTemplate";
import { EmailMarketingSpecialistTemplate } from "./resume/templates/EmailMarketingSpecialistTemplate";
import { EmeraldExecutiveTemplate } from "./resume/templates/EmeraldExecutiveTemplate";
import { EmergeFresherTemplate } from "./resume/templates/EmergeFresherTemplate";
import { EmployeeRelationsSpecialistTemplate } from "./resume/templates/EmployeeRelationsSpecialistTemplate";
import { EngineeringFresherTemplate } from "./resume/templates/EngineeringFresherTemplate";
import { EngineeringManagerTemplate } from "./resume/templates/EngineeringManagerTemplate";
import { EnterpriseLeaderTemplate } from "./resume/templates/EnterpriseLeaderTemplate";
import { EntrepreneurialGraduateTemplate } from "./resume/templates/EntrepreneurialGraduateTemplate";
import { EntryEliteTemplate } from "./resume/templates/EntryEliteTemplate";
import { EntryHorizonTemplate } from "./resume/templates/EntryHorizonTemplate";
import { EntrySphereTemplate } from "./resume/templates/EntrySphereTemplate";
import { EnvironmentalEngineerTemplate } from "./resume/templates/EnvironmentalEngineerTemplate";
import { EquityResearchAnalystTemplate } from "./resume/templates/EquityResearchAnalystTemplate";
import { EstimatorCostAnalystTemplate } from "./resume/templates/EstimatorCostAnalystTemplate";
import { EventPlannerCoordinatorTemplate } from "./resume/templates/EventPlannerCoordinatorTemplate";
import { EventdrivenArchitectTemplate } from "./resume/templates/EventdrivenArchitectTemplate";
import { ExecutiveAscendancyTemplate } from "./resume/templates/ExecutiveAscendancyTemplate";
import { ExecutiveAuthorityTemplate } from "./resume/templates/ExecutiveAuthorityTemplate";
import { ExecutiveChefTemplate } from "./resume/templates/ExecutiveChefTemplate";
import { ExecutiveCleanSplitTemplate } from "./resume/templates/ExecutiveCleanSplitTemplate";
import { ExecutiveCornerAccentTemplate } from "./resume/templates/ExecutiveCornerAccentTemplate";
import { ExecutiveDirectLayoutTemplate } from "./resume/templates/ExecutiveDirectLayoutTemplate";
import { ExecutiveEasyTemplateTemplate } from "./resume/templates/ExecutiveEasyTemplateTemplate";
import { ExecutiveImpactTemplate } from "./resume/templates/ExecutiveImpactTemplate";
import { ExecutiveLeadershipTemplate } from "./resume/templates/ExecutiveLeadershipTemplate";
import { ExecutiveLetterheadUniversalTemplate } from "./resume/templates/ExecutiveLetterheadUniversalTemplate";
import { ExecutiveMagnitudeTemplate } from "./resume/templates/ExecutiveMagnitudeTemplate";
import { ExecutiveMinimalTemplate } from "./resume/templates/ExecutiveMinimalTemplate";
import { ExecutiveNexusTemplate } from "./resume/templates/ExecutiveNexusTemplate";
import { ExecutivePinnacleTemplate } from "./resume/templates/ExecutivePinnacleTemplate";
import { ExecutivePlainLayoutTemplate } from "./resume/templates/ExecutivePlainLayoutTemplate";
import { ExecutivePrestigeTemplate } from "./resume/templates/ExecutivePrestigeTemplate";
import { ExecutiveSalesLeaderTemplate } from "./resume/templates/ExecutiveSalesLeaderTemplate";
import { ExecutiveSignatureTemplate } from "./resume/templates/ExecutiveSignatureTemplate";
import { ExecutiveSimpleCleanTemplate } from "./resume/templates/ExecutiveSimpleCleanTemplate";
import { ExecutiveSplitDesignTemplate } from "./resume/templates/ExecutiveSplitDesignTemplate";
import { ExecutiveTemplate } from "./resume/templates/ExecutiveTemplate";
import { ExecutiveTimelineModernTemplate } from "./resume/templates/ExecutiveTimelineModernTemplate";
import { ExpressionArtistTemplate } from "./resume/templates/ExpressionArtistTemplate";
import { FAANGAspirantTemplate } from "./resume/templates/FAANGAspirantTemplate";
import { FieldSalesSpecialistTemplate } from "./resume/templates/FieldSalesSpecialistTemplate";
import { FigmaDesignerPortfolioTemplate } from "./resume/templates/FigmaDesignerPortfolioTemplate";
import { FigmaExpertTemplate } from "./resume/templates/FigmaExpertTemplate";
import { FinanceAnalystTemplate } from "./resume/templates/FinanceAnalystTemplate";
import { FinanceTwoColumnTemplate } from "./resume/templates/FinanceTwoColumnTemplate";
import { FinancialAnalystCFATemplate } from "./resume/templates/FinancialAnalystCFATemplate";
import { FinancialAnalystTemplate } from "./resume/templates/FinancialAnalystTemplate";
import { FinancialControllerTemplate } from "./resume/templates/FinancialControllerTemplate";
import { FlutterEngineerTemplate } from "./resume/templates/FlutterEngineerTemplate";
import { FlutterMobileDevTemplate } from "./resume/templates/FlutterMobileDevTemplate";
import { FlutterUISpecialistTemplate } from "./resume/templates/FlutterUISpecialistTemplate";
import { FluxExecutiveTemplate } from "./resume/templates/FluxExecutiveTemplate";
import { ForensicAccountantTemplate } from "./resume/templates/ForensicAccountantTemplate";
import { ForestProfessionalTemplate } from "./resume/templates/ForestProfessionalTemplate";
import { FoundationGraduateTemplate } from "./resume/templates/FoundationGraduateTemplate";
import { FramerDesignerPortfolioTemplate } from "./resume/templates/FramerDesignerPortfolioTemplate";
import { FramerDesignerTemplate } from "./resume/templates/FramerDesignerTemplate";
import { FresherAcademicStyleTemplate } from "./resume/templates/FresherAcademicStyleTemplate";
import { FresherAchievementTemplate } from "./resume/templates/FresherAchievementTemplate";
import { FresherBoldHeaderTemplate } from "./resume/templates/FresherBoldHeaderTemplate";
import { FresherBoxShadowTemplate } from "./resume/templates/FresherBoxShadowTemplate";
import { FresherCardBasedTemplate } from "./resume/templates/FresherCardBasedTemplate";
import { FresherCenteredElegantTemplate } from "./resume/templates/FresherCenteredElegantTemplate";
import { FresherCircularProgressTemplate } from "./resume/templates/FresherCircularProgressTemplate";
import { FresherCleanModernTemplate } from "./resume/templates/FresherCleanModernTemplate";
import { FresherColorAccentTemplate } from "./resume/templates/FresherColorAccentTemplate";
import { FresherCompactProTemplate } from "./resume/templates/FresherCompactProTemplate";
import { FresherCreativeEdgeTemplate } from "./resume/templates/FresherCreativeEdgeTemplate";
import { FresherDarkProfessionalTemplate } from "./resume/templates/FresherDarkProfessionalTemplate";
import { FresherDashBorderTemplate } from "./resume/templates/FresherDashBorderTemplate";
import { FresherDoubleColumnTemplate } from "./resume/templates/FresherDoubleColumnTemplate";
import { FresherElegantSidebarTemplate } from "./resume/templates/FresherElegantSidebarTemplate";
import { FresherEliteTemplate } from "./resume/templates/FresherEliteTemplate";
import { FresherExecutiveStyleTemplate } from "./resume/templates/FresherExecutiveStyleTemplate";
import { FresherGeometricTemplate } from "./resume/templates/FresherGeometricTemplate";
import { FresherGlassmorphismTemplate } from "./resume/templates/FresherGlassmorphismTemplate";
import { FresherGradientBorderTemplate } from "./resume/templates/FresherGradientBorderTemplate";
import { FresherIconographyTemplate } from "./resume/templates/FresherIconographyTemplate";
import { FresherLeftStripeTemplate } from "./resume/templates/FresherLeftStripeTemplate";
import { FresherLightweightTemplate } from "./resume/templates/FresherLightweightTemplate";
import { FresherMinimalGridTemplate } from "./resume/templates/FresherMinimalGridTemplate";
import { FresherMinimalistTwoColumnTemplate } from "./resume/templates/FresherMinimalistTwoColumnTemplate";
import { FresherModernClassicTemplate } from "./resume/templates/FresherModernClassicTemplate";
import { FresherModernSplitTemplate } from "./resume/templates/FresherModernSplitTemplate";
import { FresherModernTabsTemplate } from "./resume/templates/FresherModernTabsTemplate";
import { FresherModernTwoColumnTemplate } from "./resume/templates/FresherModernTwoColumnTemplate";
import { FresherNeonAccentTemplate } from "./resume/templates/FresherNeonAccentTemplate";
import { FresherPolaroidStyleTemplate } from "./resume/templates/FresherPolaroidStyleTemplate";
import { FresherProfessionalGridTemplate } from "./resume/templates/FresherProfessionalGridTemplate";
import { FresherProfessionalMinimalTemplate } from "./resume/templates/FresherProfessionalMinimalTemplate";
import { FresherProfessionalSidebarTemplate } from "./resume/templates/FresherProfessionalSidebarTemplate";
import { FresherProgressiveTemplate } from "./resume/templates/FresherProgressiveTemplate";
import { FresherRibbonStyleTemplate } from "./resume/templates/FresherRibbonStyleTemplate";
import { FresherSkillsFirstTemplate } from "./resume/templates/FresherSkillsFirstTemplate";
import { FresherSplitLayoutTemplate } from "./resume/templates/FresherSplitLayoutTemplate";
import { FresherStepByStepTemplate } from "./resume/templates/FresherStepByStepTemplate";
import { FresherTechModernTemplate } from "./resume/templates/FresherTechModernTemplate";
import { FresherTechSplitTemplate } from "./resume/templates/FresherTechSplitTemplate";
import { FresherTemplate } from "./resume/templates/FresherTemplate";
import { FresherTimelineDotsTemplate } from "./resume/templates/FresherTimelineDotsTemplate";
import { FresherTimelineTemplate } from "./resume/templates/FresherTimelineTemplate";
import { FresherTopBottomTemplate } from "./resume/templates/FresherTopBottomTemplate";
import { FresherTwoToneTemplate } from "./resume/templates/FresherTwoToneTemplate";
import { FresherWaveHeaderTemplate } from "./resume/templates/FresherWaveHeaderTemplate";
import { FreshersCraftedTemplate } from "./resume/templates/FreshersCraftedTemplate";
import { FreshersVisionTemplate } from "./resume/templates/FreshersVisionTemplate";
import { FrontendArchitectTemplate } from "./resume/templates/FrontendArchitectTemplate";
import { FrontendTemplate } from "./resume/templates/FrontendTemplate";
import { FullStackEngineerTemplate } from "./resume/templates/FullStackEngineerTemplate";
import { FullStackModernTemplate } from "./resume/templates/FullStackModernTemplate";
import { FullStackProTemplate } from "./resume/templates/FullStackProTemplate";
import { FullstackJavaScriptTemplate } from "./resume/templates/FullstackJavaScriptTemplate";
import { FullstackTemplate } from "./resume/templates/FullstackTemplate";
import { GCPArchitectTemplate } from "./resume/templates/GCPArchitectTemplate";
import { GCPCloudEngineerTemplate } from "./resume/templates/GCPCloudEngineerTemplate";
import { GRPCDeveloperTemplate } from "./resume/templates/GRPCDeveloperTemplate";
import { GalleryLayoutTemplate } from "./resume/templates/GalleryLayoutTemplate";
import { GenZGraduateTemplate } from "./resume/templates/GenZGraduateTemplate";
import { GeneralContractorTemplate } from "./resume/templates/GeneralContractorTemplate";
import { GenesisGraduateTemplate } from "./resume/templates/GenesisGraduateTemplate";
import { GeometricCreativeTemplate } from "./resume/templates/GeometricCreativeTemplate";
import { GeometricShapesUniversalTemplate } from "./resume/templates/GeometricShapesUniversalTemplate";
import { GitHubDeveloperTemplate } from "./resume/templates/GitHubDeveloperTemplate";
import { GitHubProfileTemplate } from "./resume/templates/GitHubProfileTemplate";
import { GitHubStudentDeveloperTemplate } from "./resume/templates/GitHubStudentDeveloperTemplate";
import { GitHubStyleTemplate } from "./resume/templates/GitHubStyleTemplate";
import { GitflowEngineerTemplate } from "./resume/templates/GitflowEngineerTemplate";
import { GithubPortfolioDevTemplate } from "./resume/templates/GithubPortfolioDevTemplate";
import { GithubStudentTemplate } from "./resume/templates/GithubStudentTemplate";
import { GitlabDeveloperTemplate } from "./resume/templates/GitlabDeveloperTemplate";
import { GlobalEnterpriseTemplate } from "./resume/templates/GlobalEnterpriseTemplate";
import { GlobalExecutiveProTemplate } from "./resume/templates/GlobalExecutiveProTemplate";
import { GlobalLeadershipTemplate } from "./resume/templates/GlobalLeadershipTemplate";
import { GlobalNetworkerTemplate } from "./resume/templates/GlobalNetworkerTemplate";
import { GoDeveloperTemplate } from "./resume/templates/GoDeveloperTemplate";
import { GolangBackendEngineerTemplate } from "./resume/templates/GolangBackendEngineerTemplate";
import { GoldPrestigeTemplate } from "./resume/templates/GoldPrestigeTemplate";
import { GradientHeaderUniversalTemplate } from "./resume/templates/GradientHeaderUniversalTemplate";
import { GraduateInnovatorTemplate } from "./resume/templates/GraduateInnovatorTemplate";
import { GraduateMomentumTemplate } from "./resume/templates/GraduateMomentumTemplate";
import { GraduatePrimeTemplate } from "./resume/templates/GraduatePrimeTemplate";
import { GraduateTemplate } from "./resume/templates/GraduateTemplate";
import { GraduateZenithTemplate } from "./resume/templates/GraduateZenithTemplate";
import { GraphQLArchitectTemplate } from "./resume/templates/GraphQLArchitectTemplate";
import { GraphQLDeveloperTemplate } from "./resume/templates/GraphQLDeveloperTemplate";
import { GraphdbSpecialistTemplate } from "./resume/templates/GraphdbSpecialistTemplate";
import { GraphicDesignProTemplate } from "./resume/templates/GraphicDesignProTemplate";
import { GrowthMarketingManagerTemplate } from "./resume/templates/GrowthMarketingManagerTemplate";
import { HRAnalyticsManagerTemplate } from "./resume/templates/HRAnalyticsManagerTemplate";
import { HRBusinessPartnerTemplate } from "./resume/templates/HRBusinessPartnerTemplate";
import { HVACEngineerTemplate } from "./resume/templates/HVACEngineerTemplate";
import { HackathonGraduateTemplate } from "./resume/templates/HackathonGraduateTemplate";
import { HackathonWinnerTemplate } from "./resume/templates/HackathonWinnerTemplate";
import { HackernewsDeveloperTemplate } from "./resume/templates/HackernewsDeveloperTemplate";
import { HackerrankExpertTemplate } from "./resume/templates/HackerrankExpertTemplate";
import { HarmonyExecutiveTemplate } from "./resume/templates/HarmonyExecutiveTemplate";
import { HeadlessCMSDeveloperTemplate } from "./resume/templates/HeadlessCMSDeveloperTemplate";
import { HealthcareAdministratorTemplate } from "./resume/templates/HealthcareAdministratorTemplate";
import { HealthcareProfessionalTemplate } from "./resume/templates/HealthcareProfessionalTemplate";
import { HealthcareTwoColumnTemplate } from "./resume/templates/HealthcareTwoColumnTemplate";
import { HexagonalPatternUniversalTemplate } from "./resume/templates/HexagonalPatternUniversalTemplate";
import { HighSchoolTeacherTemplate } from "./resume/templates/HighSchoolTeacherTemplate";
import { HonorsStudentTemplate } from "./resume/templates/HonorsStudentTemplate";
import { HorizonGraduateTemplate } from "./resume/templates/HorizonGraduateTemplate";
import { HospitalityDirectorTemplate } from "./resume/templates/HospitalityDirectorTemplate";
import { HotelManagerOperationsTemplate } from "./resume/templates/HotelManagerOperationsTemplate";
import { IconBarUniversalTemplate } from "./resume/templates/IconBarUniversalTemplate";
import { IllustrationPortfolioTemplate } from "./resume/templates/IllustrationPortfolioTemplate";
import { IllustratorArtistTemplate } from "./resume/templates/IllustratorArtistTemplate";
import { ImaginativeDesignerTemplate } from "./resume/templates/ImaginativeDesignerTemplate";
import { ImpressionDesignerTemplate } from "./resume/templates/ImpressionDesignerTemplate";
import { InVisionPrototyperTemplate } from "./resume/templates/InVisionPrototyperTemplate";
import { IndigoExecutiveTemplate } from "./resume/templates/IndigoExecutiveTemplate";
import { IndustrialEngineerTemplate } from "./resume/templates/IndustrialEngineerTemplate";
import { InfinityLoopUniversalTemplate } from "./resume/templates/InfinityLoopUniversalTemplate";
import { InfluencerProfessionalTemplate } from "./resume/templates/InfluencerProfessionalTemplate";
import { InformationArchitectTemplate } from "./resume/templates/InformationArchitectTemplate";
import { InkBrushTemplate } from "./resume/templates/InkBrushTemplate";
import { InsideSalesRepresentativeTemplate } from "./resume/templates/InsideSalesRepresentativeTemplate";
import { InstagramCreativeTemplate } from "./resume/templates/InstagramCreativeTemplate";
import { InstagramInfluencerTemplate } from "./resume/templates/InstagramInfluencerTemplate";
import { InstructionalDesignerTemplate } from "./resume/templates/InstructionalDesignerTemplate";
import { IntellectualPropertyAttorneyTemplate } from "./resume/templates/IntellectualPropertyAttorneyTemplate";
import { InteractionDesignerTemplate } from "./resume/templates/InteractionDesignerTemplate";
import { InteractivePortfolioDesignerTemplate } from "./resume/templates/InteractivePortfolioDesignerTemplate";
import { InterfaceMasterTemplate } from "./resume/templates/InterfaceMasterTemplate";
import { InternalAuditorTemplate } from "./resume/templates/InternalAuditorTemplate";
import { InternshipReadyTemplate } from "./resume/templates/InternshipReadyTemplate";
import { InternshipShowcaseTemplate } from "./resume/templates/InternshipShowcaseTemplate";
import { InvestmentBankerTemplate } from "./resume/templates/InvestmentBankerTemplate";
import { JAMStackDeveloperTemplate } from "./resume/templates/JAMStackDeveloperTemplate";
import { JadeProfessionalTemplate } from "./resume/templates/JadeProfessionalTemplate";
import { JavaDeveloperTemplate } from "./resume/templates/JavaDeveloperTemplate";
import { JavaEnterpriseTemplateTemplate } from "./resume/templates/JavaEnterpriseTemplateTemplate";
import { JenkinsCICDTemplate } from "./resume/templates/JenkinsCICDTemplate";
import { JsonResumeTemplate } from "./resume/templates/JsonResumeTemplate";
import { KafkaStreamingExpertTemplate } from "./resume/templates/KafkaStreamingExpertTemplate";
import { KafkaStreamingTemplate } from "./resume/templates/KafkaStreamingTemplate";
import { KaggleDataScientistTemplate } from "./resume/templates/KaggleDataScientistTemplate";
import { KeystoneGraduateTemplate } from "./resume/templates/KeystoneGraduateTemplate";
import { KotlinAndroidDevTemplate } from "./resume/templates/KotlinAndroidDevTemplate";
import { KuberneteEngineerTemplate } from "./resume/templates/KuberneteEngineerTemplate";
import { KubernetesSpecialistTemplate } from "./resume/templates/KubernetesSpecialistTemplate";
import { LaravelArtisanTemplate } from "./resume/templates/LaravelArtisanTemplate";
import { LaunchpadGraduateTemplate } from "./resume/templates/LaunchpadGraduateTemplate";
import { LavenderExecutiveTemplate } from "./resume/templates/LavenderExecutiveTemplate";
import { LayeredCardsUniversalTemplate } from "./resume/templates/LayeredCardsUniversalTemplate";
import { LeadBackendEngineerTemplate } from "./resume/templates/LeadBackendEngineerTemplate";
import { LeadFrontendEngineerTemplate } from "./resume/templates/LeadFrontendEngineerTemplate";
import { LeadershipSummitTemplate } from "./resume/templates/LeadershipSummitTemplate";
import { LeadershipZenithTemplate } from "./resume/templates/LeadershipZenithTemplate";
import { LearningDevelopmentManagerTemplate } from "./resume/templates/LearningDevelopmentManagerTemplate";
import { LeetcodeChampionTemplate } from "./resume/templates/LeetcodeChampionTemplate";
import { LegalAdvisorTemplate } from "./resume/templates/LegalAdvisorTemplate";
import { LegalConsultantTemplate } from "./resume/templates/LegalConsultantTemplate";
import { LegalCounselTemplate } from "./resume/templates/LegalCounselTemplate";
import { LegalExecutiveTemplate } from "./resume/templates/LegalExecutiveTemplate";
import { LegalOperationsManagerTemplate } from "./resume/templates/LegalOperationsManagerTemplate";
import { LiberalArtsGraduateTemplate } from "./resume/templates/LiberalArtsGraduateTemplate";
import { LinkedInReadyGraduateTemplate } from "./resume/templates/LinkedInReadyGraduateTemplate";
import { LinkedInTechProTemplate } from "./resume/templates/LinkedInTechProTemplate";
import { LinkedinGraduateTemplate } from "./resume/templates/LinkedinGraduateTemplate";
import { LinkedinOptimizedTemplate } from "./resume/templates/LinkedinOptimizedTemplate";
import { LinkedinTechExpertTemplate } from "./resume/templates/LinkedinTechExpertTemplate";
import { LitigationAttorneyTemplate } from "./resume/templates/LitigationAttorneyTemplate";
import { LogisticsCoordinatorTemplate } from "./resume/templates/LogisticsCoordinatorTemplate";
import { LuxuryTimelineTemplate } from "./resume/templates/LuxuryTimelineTemplate";
import { MLEngineerTemplate } from "./resume/templates/MLEngineerTemplate";
import { MachineLearningEngineerTemplate } from "./resume/templates/MachineLearningEngineerTemplate";
import { MagazineCreativeTemplate } from "./resume/templates/MagazineCreativeTemplate";
import { MagazineLayoutUniversalTemplate } from "./resume/templates/MagazineLayoutUniversalTemplate";
import { ManufacturingEngineerTemplate } from "./resume/templates/ManufacturingEngineerTemplate";
import { MarketingAnalyticsManagerTemplate } from "./resume/templates/MarketingAnalyticsManagerTemplate";
import { MarketingProfessionalTemplate } from "./resume/templates/MarketingProfessionalTemplate";
import { MarketingStrategistTemplate } from "./resume/templates/MarketingStrategistTemplate";
import { MarvelAppDesignerTemplate } from "./resume/templates/MarvelAppDesignerTemplate";
import { MastersGraduateTemplate } from "./resume/templates/MastersGraduateTemplate";
import { MechanicalEngineerProTemplate } from "./resume/templates/MechanicalEngineerProTemplate";
import { MedicalAssistantTemplate } from "./resume/templates/MedicalAssistantTemplate";
import { MedicalCertificationTemplate } from "./resume/templates/MedicalCertificationTemplate";
import { MedicalExecutiveTemplate } from "./resume/templates/MedicalExecutiveTemplate";
import { MedicalProfessionalTemplate } from "./resume/templates/MedicalProfessionalTemplate";
import { MedicalResearchTemplate } from "./resume/templates/MedicalResearchTemplate";
import { MedicalTechnologistTemplate } from "./resume/templates/MedicalTechnologistTemplate";
import { MediumTechWriterTemplate } from "./resume/templates/MediumTechWriterTemplate";
import { MediumWriterCreativeTemplate } from "./resume/templates/MediumWriterCreativeTemplate";
import { MediumWriterTemplate } from "./resume/templates/MediumWriterTemplate";
import { MentalHealthCounselorTemplate } from "./resume/templates/MentalHealthCounselorTemplate";
import { MeridianCorporateTemplate } from "./resume/templates/MeridianCorporateTemplate";
import { MicroarchEngineerTemplate } from "./resume/templates/MicroarchEngineerTemplate";
import { MicrointeractionDesignerTemplate } from "./resume/templates/MicrointeractionDesignerTemplate";
import { MicroservicesDevTemplate } from "./resume/templates/MicroservicesDevTemplate";
import { MicroservicesExpertTemplate } from "./resume/templates/MicroservicesExpertTemplate";
import { MilestoneGraduateTemplate } from "./resume/templates/MilestoneGraduateTemplate";
import { MinimalChicTemplate } from "./resume/templates/MinimalChicTemplate";
import { MinimalCorporateProTemplate } from "./resume/templates/MinimalCorporateProTemplate";
import { MinimalDirectTemplateTemplate } from "./resume/templates/MinimalDirectTemplateTemplate";
import { MinimalEleganceUniversalTemplate } from "./resume/templates/MinimalEleganceUniversalTemplate";
import { MinimalLinesUniversalTemplate } from "./resume/templates/MinimalLinesUniversalTemplate";
import { MinimalProLayoutTemplate } from "./resume/templates/MinimalProLayoutTemplate";
import { MinimalTemplate } from "./resume/templates/MinimalTemplate";
import { MinimalistModernProTemplate } from "./resume/templates/MinimalistModernProTemplate";
import { MinimalistProSimpleTemplate } from "./resume/templates/MinimalistProSimpleTemplate";
import { MinimalistProTemplate } from "./resume/templates/MinimalistProTemplate";
import { MintProfessionalTemplate } from "./resume/templates/MintProfessionalTemplate";
import { MlopsEngineerTemplate } from "./resume/templates/MlopsEngineerTemplate";
import { MobileDevTemplate } from "./resume/templates/MobileDevTemplate";
import { MobileDeveloperTemplate } from "./resume/templates/MobileDeveloperTemplate";
import { MobileFirstDesignerTemplate } from "./resume/templates/MobileFirstDesignerTemplate";
import { ModernArtistTemplate } from "./resume/templates/ModernArtistTemplate";
import { ModernBusinessTemplate } from "./resume/templates/ModernBusinessTemplate";
import { ModernClearProTemplate } from "./resume/templates/ModernClearProTemplate";
import { ModernCorporateGridTemplate } from "./resume/templates/ModernCorporateGridTemplate";
import { ModernDigitalTemplate } from "./resume/templates/ModernDigitalTemplate";
import { ModernEducatorProfessionTemplate } from "./resume/templates/ModernEducatorProfessionTemplate";
import { ModernMinimalistUniversalTemplate } from "./resume/templates/ModernMinimalistUniversalTemplate";
import { ModernPlainProTemplate } from "./resume/templates/ModernPlainProTemplate";
import { ModernProfessionalBoxTemplate } from "./resume/templates/ModernProfessionalBoxTemplate";
import { ModernProfessionalTemplate } from "./resume/templates/ModernProfessionalTemplate";
import { ModernSimpleProTemplate } from "./resume/templates/ModernSimpleProTemplate";
import { ModernTemplate } from "./resume/templates/ModernTemplate";
import { MomentumFresherTemplate } from "./resume/templates/MomentumFresherTemplate";
import { MongoDBSpecialistTemplate } from "./resume/templates/MongoDBSpecialistTemplate";
import { MonospaceTechTemplate } from "./resume/templates/MonospaceTechTemplate";
import { MotionDesignerPortfolioTemplate } from "./resume/templates/MotionDesignerPortfolioTemplate";
import { MotionDesignerTemplate } from "./resume/templates/MotionDesignerTemplate";
import { MotionGraphicsArtistTemplate } from "./resume/templates/MotionGraphicsArtistTemplate";
import { MotionUiDesignerTemplate } from "./resume/templates/MotionUiDesignerTemplate";
import { MultiPlatformArtistTemplate } from "./resume/templates/MultiPlatformArtistTemplate";
import { MultimediaDesignerTemplate } from "./resume/templates/MultimediaDesignerTemplate";
import { MuseCreativeTemplate } from "./resume/templates/MuseCreativeTemplate";
import { NarrativeCreativeTemplate } from "./resume/templates/NarrativeCreativeTemplate";
import { NavyCorporateTemplate } from "./resume/templates/NavyCorporateTemplate";
import { NeonArtistTemplate } from "./resume/templates/NeonArtistTemplate";
import { NestJSBackendTemplate } from "./resume/templates/NestJSBackendTemplate";
import { NetworkedExecutiveTemplate } from "./resume/templates/NetworkedExecutiveTemplate";
import { NetworkedGraduateTemplate } from "./resume/templates/NetworkedGraduateTemplate";
import { NeuralEngineerTemplate } from "./resume/templates/NeuralEngineerTemplate";
import { NewspaperStyleUniversalTemplate } from "./resume/templates/NewspaperStyleUniversalTemplate";
import { NextJSFullstackTemplate } from "./resume/templates/NextJSFullstackTemplate";
import { NextstepFresherTemplate } from "./resume/templates/NextstepFresherTemplate";
import { NexusEliteTemplate } from "./resume/templates/NexusEliteTemplate";
import { NodeBackendSpecialistTemplate } from "./resume/templates/NodeBackendSpecialistTemplate";
import { NodeJSDeveloperTemplate } from "./resume/templates/NodeJSDeveloperTemplate";
import { NpmPackageAuthorTemplate } from "./resume/templates/NpmPackageAuthorTemplate";
import { NurseSpecialistTemplate } from "./resume/templates/NurseSpecialistTemplate";
import { NursingSpecialistTemplate } from "./resume/templates/NursingSpecialistTemplate";
import { NutritionistDietitianTemplate } from "./resume/templates/NutritionistDietitianTemplate";
import { ObservabilityEngineerTemplate } from "./resume/templates/ObservabilityEngineerTemplate";
import { ObsidianExecutiveTemplate } from "./resume/templates/ObsidianExecutiveTemplate";
import { OccupationalTherapistTemplate } from "./resume/templates/OccupationalTherapistTemplate";
import { OnlineCourseInstructorTemplate } from "./resume/templates/OnlineCourseInstructorTemplate";
import { OnlineGalleryArtistTemplate } from "./resume/templates/OnlineGalleryArtistTemplate";
import { OnlineIdentityTemplate } from "./resume/templates/OnlineIdentityTemplate";
import { OnlinePortfolioFresherTemplate } from "./resume/templates/OnlinePortfolioFresherTemplate";
import { OnlinePresenceFresherTemplate } from "./resume/templates/OnlinePresenceFresherTemplate";
import { OnlineProfessionalTemplate } from "./resume/templates/OnlineProfessionalTemplate";
import { OnyxLeadershipTemplate } from "./resume/templates/OnyxLeadershipTemplate";
import { OpenSourceContributorTemplate } from "./resume/templates/OpenSourceContributorTemplate";
import { OpenSourceTemplate } from "./resume/templates/OpenSourceTemplate";
import { OpensourceDeveloperTemplate } from "./resume/templates/OpensourceDeveloperTemplate";
import { OperationsExcellenceTemplate } from "./resume/templates/OperationsExcellenceTemplate";
import { OperationsManagerTemplate } from "./resume/templates/OperationsManagerTemplate";
import { OperationsTwoColumnTemplate } from "./resume/templates/OperationsTwoColumnTemplate";
import { OrganizationalDevelopmentTemplate } from "./resume/templates/OrganizationalDevelopmentTemplate";
import { PMExecutiveTemplate } from "./resume/templates/PMExecutiveTemplate";
import { PaletteDesignerTemplate } from "./resume/templates/PaletteDesignerTemplate";
import { ParalegalCertifiedTemplate } from "./resume/templates/ParalegalCertifiedTemplate";
import { ParalegalTemplate } from "./resume/templates/ParalegalTemplate";
import { ParallaxStyleUniversalTemplate } from "./resume/templates/ParallaxStyleUniversalTemplate";
import { ParamedicEMTTemplate } from "./resume/templates/ParamedicEMTTemplate";
import { PastelCreativeTemplate } from "./resume/templates/PastelCreativeTemplate";
import { PastryChefTemplate } from "./resume/templates/PastryChefTemplate";
import { PathwayGraduateTemplate } from "./resume/templates/PathwayGraduateTemplate";
import { PatreonCreativeTemplate } from "./resume/templates/PatreonCreativeTemplate";
import { PatreonCreatorTemplate } from "./resume/templates/PatreonCreatorTemplate";
import { PetroleumEngineerTemplate } from "./resume/templates/PetroleumEngineerTemplate";
import { PewterMinimalistTemplate } from "./resume/templates/PewterMinimalistTemplate";
import { PhDCandidateTemplate } from "./resume/templates/PhDCandidateTemplate";
import { PharmacistClinicalTemplate } from "./resume/templates/PharmacistClinicalTemplate";
import { PhotographerProTemplate } from "./resume/templates/PhotographerProTemplate";
import { PhotographyLayoutTemplate } from "./resume/templates/PhotographyLayoutTemplate";
import { PhotographyProTemplateTemplate } from "./resume/templates/PhotographyProTemplateTemplate";
import { PhysicalTherapistTemplate } from "./resume/templates/PhysicalTherapistTemplate";
import { PhysicianSpecialistTemplate } from "./resume/templates/PhysicianSpecialistTemplate";
import { PinnacleEliteTemplate } from "./resume/templates/PinnacleEliteTemplate";
import { PinterestCuratorTemplate } from "./resume/templates/PinterestCuratorTemplate";
import { PinterestDesignerTemplate } from "./resume/templates/PinterestDesignerTemplate";
import { PioneerFresherTemplate } from "./resume/templates/PioneerFresherTemplate";
import { PixelcraftDeveloperTemplate } from "./resume/templates/PixelcraftDeveloperTemplate";
import { PixelperfectDesignerTemplate } from "./resume/templates/PixelperfectDesignerTemplate";
import { PlatformEngineerTemplate } from "./resume/templates/PlatformEngineerTemplate";
import { PlatformProfessionalTemplate } from "./resume/templates/PlatformProfessionalTemplate";
import { PlatinumExecutiveTemplate } from "./resume/templates/PlatinumExecutiveTemplate";
import { PlatinumPrestigeTemplate } from "./resume/templates/PlatinumPrestigeTemplate";
import { PlumProfessionalTemplate } from "./resume/templates/PlumProfessionalTemplate";
import { PortfolioArtistTemplate } from "./resume/templates/PortfolioArtistTemplate";
import { PortfolioCoderTemplate } from "./resume/templates/PortfolioCoderTemplate";
import { PortfolioFirstGraduateTemplate } from "./resume/templates/PortfolioFirstGraduateTemplate";
import { PortfolioGraduateTemplate } from "./resume/templates/PortfolioGraduateTemplate";
import { PortfolioManagerTemplate } from "./resume/templates/PortfolioManagerTemplate";
import { PortfolioMinimalistTemplate } from "./resume/templates/PortfolioMinimalistTemplate";
import { PortfolioProfessionalTemplate } from "./resume/templates/PortfolioProfessionalTemplate";
import { PortfolioShowcaseTemplate } from "./resume/templates/PortfolioShowcaseTemplate";
import { PortfolioWebsiteCreativeTemplate } from "./resume/templates/PortfolioWebsiteCreativeTemplate";
import { PostgreSQLDBATemplate } from "./resume/templates/PostgreSQLDBATemplate";
import { PostgreSQLExpertTemplate } from "./resume/templates/PostgreSQLExpertTemplate";
import { PotentialFresherTemplate } from "./resume/templates/PotentialFresherTemplate";
import { PremiumCorporateEdgeTemplate } from "./resume/templates/PremiumCorporateEdgeTemplate";
import { PremiumEliteTemplate } from "./resume/templates/PremiumEliteTemplate";
import { PremiumFresherTemplate } from "./resume/templates/PremiumFresherTemplate";
import { PremiumProTemplate } from "./resume/templates/PremiumProTemplate";
import { PremiumUniversalTemplate } from "./resume/templates/PremiumUniversalTemplate";
import { PrincipalSoftwareEngineerTemplate } from "./resume/templates/PrincipalSoftwareEngineerTemplate";
import { PrincipleAnimatorTemplate } from "./resume/templates/PrincipleAnimatorTemplate";
import { PrismProfessionalTemplate } from "./resume/templates/PrismProfessionalTemplate";
import { PrivateTutorSpecialistTemplate } from "./resume/templates/PrivateTutorSpecialistTemplate";
import { ProcessImprovementTemplate } from "./resume/templates/ProcessImprovementTemplate";
import { ProcurementSpecialistTemplate } from "./resume/templates/ProcurementSpecialistTemplate";
import { ProductDesignerProTemplate } from "./resume/templates/ProductDesignerProTemplate";
import { ProductDesignerShowcaseTemplate } from "./resume/templates/ProductDesignerShowcaseTemplate";
import { ProductDesignerUXTemplate } from "./resume/templates/ProductDesignerUXTemplate";
import { ProductMarketingManagerTemplate } from "./resume/templates/ProductMarketingManagerTemplate";
import { ProfessionalAccentBarTemplate } from "./resume/templates/ProfessionalAccentBarTemplate";
import { ProfessionalBasicModernTemplate } from "./resume/templates/ProfessionalBasicModernTemplate";
import { ProfessionalClassicTemplate } from "./resume/templates/ProfessionalClassicTemplate";
import { ProfessionalCleanSimpleTemplate } from "./resume/templates/ProfessionalCleanSimpleTemplate";
import { ProfessionalCompactUniversalTemplate } from "./resume/templates/ProfessionalCompactUniversalTemplate";
import { ProfessionalDividerTemplate } from "./resume/templates/ProfessionalDividerTemplate";
import { ProfessionalEasyReadTemplate } from "./resume/templates/ProfessionalEasyReadTemplate";
import { ProfessionalGridTemplate } from "./resume/templates/ProfessionalGridTemplate";
import { ProfessionalHeaderBannerTemplate } from "./resume/templates/ProfessionalHeaderBannerTemplate";
import { ProfessionalModernEdgeTemplate } from "./resume/templates/ProfessionalModernEdgeTemplate";
import { ProfessionalPlainSimpleTemplate } from "./resume/templates/ProfessionalPlainSimpleTemplate";
import { ProfessionalReadableLayoutTemplate } from "./resume/templates/ProfessionalReadableLayoutTemplate";
import { ProfessionalStraightforwardTemplate } from "./resume/templates/ProfessionalStraightforwardTemplate";
import { ProfessionalTemplate } from "./resume/templates/ProfessionalTemplate";
import { ProfessionalTimelineTemplate } from "./resume/templates/ProfessionalTimelineTemplate";
import { ProfessionalVerticalLineTemplate } from "./resume/templates/ProfessionalVerticalLineTemplate";
import { ProfileCentricTemplate } from "./resume/templates/ProfileCentricTemplate";
import { ProfileDrivenGradTemplate } from "./resume/templates/ProfileDrivenGradTemplate";
import { ProjectManagerPMPTemplate } from "./resume/templates/ProjectManagerPMPTemplate";
import { ProjectManagerProTemplate } from "./resume/templates/ProjectManagerProTemplate";
import { ProjectShowcaseGradTemplate } from "./resume/templates/ProjectShowcaseGradTemplate";
import { PropertyManagerCommercialTemplate } from "./resume/templates/PropertyManagerCommercialTemplate";
import { ProtfolioShowcaseUxTemplate } from "./resume/templates/ProtfolioShowcaseUxTemplate";
import { PrototypeSpecialistTemplate } from "./resume/templates/PrototypeSpecialistTemplate";
import { PyTorchDeveloperTemplate } from "./resume/templates/PyTorchDeveloperTemplate";
import { PypiContributorTemplate } from "./resume/templates/PypiContributorTemplate";
import { PythonDeveloperProTemplate } from "./resume/templates/PythonDeveloperProTemplate";
import { PythonDeveloperTemplate } from "./resume/templates/PythonDeveloperTemplate";
import { PythonMLEngineerTemplate } from "./resume/templates/PythonMLEngineerTemplate";
import { QAAutomationEngineerTemplate } from "./resume/templates/QAAutomationEngineerTemplate";
import { QualityAssuranceEngineerTemplate } from "./resume/templates/QualityAssuranceEngineerTemplate";
import { QuantumCoderTemplate } from "./resume/templates/QuantumCoderTemplate";
import { QuantumProfessionalTemplate } from "./resume/templates/QuantumProfessionalTemplate";
import { RabbitMQSpecialistTemplate } from "./resume/templates/RabbitMQSpecialistTemplate";
import { RadianceCorporateTemplate } from "./resume/templates/RadianceCorporateTemplate";
import { RadiologyTechnicianTemplate } from "./resume/templates/RadiologyTechnicianTemplate";
import { RailsDeveloperTemplate } from "./resume/templates/RailsDeveloperTemplate";
import { ReactDeveloperTemplate } from "./resume/templates/ReactDeveloperTemplate";
import { ReactFrontendProTemplate } from "./resume/templates/ReactFrontendProTemplate";
import { ReactNativeDevTemplate } from "./resume/templates/ReactNativeDevTemplate";
import { ReactNativeDeveloperTemplate } from "./resume/templates/ReactNativeDeveloperTemplate";
import { ReactNativeExpertTemplate } from "./resume/templates/ReactNativeExpertTemplate";
import { RealEstateAppraiserTemplate } from "./resume/templates/RealEstateAppraiserTemplate";
import { RealEstateBrokerTemplate } from "./resume/templates/RealEstateBrokerTemplate";
import { RedisCacheSpecialistTemplate } from "./resume/templates/RedisCacheSpecialistTemplate";
import { RedisEngineerTemplate } from "./resume/templates/RedisEngineerTemplate";
import { RefinedTemplate } from "./resume/templates/RefinedTemplate";
import { RegisteredNurseProTemplate } from "./resume/templates/RegisteredNurseProTemplate";
import { RemoteWorkReadyTemplate } from "./resume/templates/RemoteWorkReadyTemplate";
import { ResearchGraduateTemplate } from "./resume/templates/ResearchGraduateTemplate";
import { ResearchPublicationGradTemplate } from "./resume/templates/ResearchPublicationGradTemplate";
import { ResponsiveUxTemplate } from "./resume/templates/ResponsiveUxTemplate";
import { RestaurantManagerTemplate } from "./resume/templates/RestaurantManagerTemplate";
import { RetroProfessionalUniversalTemplate } from "./resume/templates/RetroProfessionalUniversalTemplate";
import { RiskManagementAnalystTemplate } from "./resume/templates/RiskManagementAnalystTemplate";
import { RoboticsEngineerTemplate } from "./resume/templates/RoboticsEngineerTemplate";
import { RoseProfessionalTemplate } from "./resume/templates/RoseProfessionalTemplate";
import { RoundedCornersUniversalTemplate } from "./resume/templates/RoundedCornersUniversalTemplate";
import { RubyCorporateTemplate } from "./resume/templates/RubyCorporateTemplate";
import { RustDeveloperProTemplate } from "./resume/templates/RustDeveloperProTemplate";
import { RustSystemsEngineerTemplate } from "./resume/templates/RustSystemsEngineerTemplate";
import { SEOSpecialistProTemplate } from "./resume/templates/SEOSpecialistProTemplate";
import { STEMGraduateTemplate } from "./resume/templates/STEMGraduateTemplate";
import { SalesAchievementTemplate } from "./resume/templates/SalesAchievementTemplate";
import { SalesExecutiveProTemplate } from "./resume/templates/SalesExecutiveProTemplate";
import { SalesExecutiveTemplate } from "./resume/templates/SalesExecutiveTemplate";
import { SalesManagerTemplate } from "./resume/templates/SalesManagerTemplate";
import { SalesMarketingHybridTemplate } from "./resume/templates/SalesMarketingHybridTemplate";
import { SapphireExecutiveTemplate } from "./resume/templates/SapphireExecutiveTemplate";
import { SapphireProfessionalTemplate } from "./resume/templates/SapphireProfessionalTemplate";
import { ScalaBackendEngineerTemplate } from "./resume/templates/ScalaBackendEngineerTemplate";
import { ScalaEngineerTemplate } from "./resume/templates/ScalaEngineerTemplate";
import { ScholarshipGraduateTemplate } from "./resume/templates/ScholarshipGraduateTemplate";
import { SecurityEngineerTemplate } from "./resume/templates/SecurityEngineerTemplate";
import { SeniorBackendTemplate } from "./resume/templates/SeniorBackendTemplate";
import { SeniorDevOpsEngineerTemplate } from "./resume/templates/SeniorDevOpsEngineerTemplate";
import { SeniorDotNetDeveloperTemplate } from "./resume/templates/SeniorDotNetDeveloperTemplate";
import { SeniorExecutiveProTemplate } from "./resume/templates/SeniorExecutiveProTemplate";
import { SeniorFrontendTemplate } from "./resume/templates/SeniorFrontendTemplate";
import { SeniorFullStackDeveloperTemplate } from "./resume/templates/SeniorFullStackDeveloperTemplate";
import { SeniorJavaDeveloperTemplate } from "./resume/templates/SeniorJavaDeveloperTemplate";
import { SeniorMobileEngineerTemplate } from "./resume/templates/SeniorMobileEngineerTemplate";
import { SeniorTemplate } from "./resume/templates/SeniorTemplate";
import { SerenityMinimalTemplate } from "./resume/templates/SerenityMinimalTemplate";
import { ServerlessDeveloperTemplate } from "./resume/templates/ServerlessDeveloperTemplate";
import { ServerlessSpecialistTemplate } from "./resume/templates/ServerlessSpecialistTemplate";
import { ServiceDesignerTemplate } from "./resume/templates/ServiceDesignerTemplate";
import { ServicedesignSpecialistTemplate } from "./resume/templates/ServicedesignSpecialistTemplate";
import { SidebarAccentTemplate } from "./resume/templates/SidebarAccentTemplate";
import { SimpleBusinessCleanTemplate } from "./resume/templates/SimpleBusinessCleanTemplate";
import { SimpleClearBusinessTemplate } from "./resume/templates/SimpleClearBusinessTemplate";
import { SimpleExecutiveLayoutTemplate } from "./resume/templates/SimpleExecutiveLayoutTemplate";
import { SimpleModernExecutiveTemplate } from "./resume/templates/SimpleModernExecutiveTemplate";
import { SimpleProfessionalCleanTemplate } from "./resume/templates/SimpleProfessionalCleanTemplate";
import { SimpleStructuredTemplateTemplate } from "./resume/templates/SimpleStructuredTemplateTemplate";
import { SiteReliabilityEngineerTemplate } from "./resume/templates/SiteReliabilityEngineerTemplate";
import { SketchExpertPortfolioTemplate } from "./resume/templates/SketchExpertPortfolioTemplate";
import { SketchSpecialistTemplate } from "./resume/templates/SketchSpecialistTemplate";
import { SkyModernTemplate } from "./resume/templates/SkyModernTemplate";
import { SlateMinimalistTemplate } from "./resume/templates/SlateMinimalistTemplate";
import { SocialCreativeInfluencerTemplate } from "./resume/templates/SocialCreativeInfluencerTemplate";
import { SocialExecutiveTemplate } from "./resume/templates/SocialExecutiveTemplate";
import { SocialFirstFresherTemplate } from "./resume/templates/SocialFirstFresherTemplate";
import { SocialGraduateTemplate } from "./resume/templates/SocialGraduateTemplate";
import { SocialMediaCreativeTemplate } from "./resume/templates/SocialMediaCreativeTemplate";
import { SocialMediaProTemplate } from "./resume/templates/SocialMediaProTemplate";
import { SocialMediaSavvyGradTemplate } from "./resume/templates/SocialMediaSavvyGradTemplate";
import { SocialSavvyTemplate } from "./resume/templates/SocialSavvyTemplate";
import { SoftwareCraftsmanTemplate } from "./resume/templates/SoftwareCraftsmanTemplate";
import { SoftwareMasterTemplate } from "./resume/templates/SoftwareMasterTemplate";
import { SoftwareTemplate } from "./resume/templates/SoftwareTemplate";
import { SoftwareVisionTemplate } from "./resume/templates/SoftwareVisionTemplate";
import { SolidityDeveloperTemplate } from "./resume/templates/SolidityDeveloperTemplate";
import { SolutionsArchitectTemplate } from "./resume/templates/SolutionsArchitectTemplate";
import { SommelierWineSpecialistTemplate } from "./resume/templates/SommelierWineSpecialistTemplate";
import { SoundCloudProducerTemplate } from "./resume/templates/SoundCloudProducerTemplate";
import { SoundcloudArtistTemplate } from "./resume/templates/SoundcloudArtistTemplate";
import { SparkFresherTemplate } from "./resume/templates/SparkFresherTemplate";
import { SpecialEducationTeacherTemplate } from "./resume/templates/SpecialEducationTeacherTemplate";
import { SpectrumProfessionalTemplate } from "./resume/templates/SpectrumProfessionalTemplate";
import { SpeechPathologistTemplate } from "./resume/templates/SpeechPathologistTemplate";
import { SplitPaneUniversalTemplate } from "./resume/templates/SplitPaneUniversalTemplate";
import { SpotifyArtistTemplate } from "./resume/templates/SpotifyArtistTemplate";
import { SpotifyMusicianTemplate } from "./resume/templates/SpotifyMusicianTemplate";
import { SpotlightHeaderUniversalTemplate } from "./resume/templates/SpotlightHeaderUniversalTemplate";
import { SpringBootDeveloperTemplate } from "./resume/templates/SpringBootDeveloperTemplate";
import { StackOverflowInspiredTemplate } from "./resume/templates/StackOverflowInspiredTemplate";
import { StackedSectionsUniversalTemplate } from "./resume/templates/StackedSectionsUniversalTemplate";
import { StackmasterFullstackTemplate } from "./resume/templates/StackmasterFullstackTemplate";
import { StackoverflowDevTemplate } from "./resume/templates/StackoverflowDevTemplate";
import { StaffEngineerTemplate } from "./resume/templates/StaffEngineerTemplate";
import { StarterTemplate } from "./resume/templates/StarterTemplate";
import { StartupInternTemplate } from "./resume/templates/StartupInternTemplate";
import { SteelProfessionalTemplate } from "./resume/templates/SteelProfessionalTemplate";
import { SterlingExecutiveTemplate } from "./resume/templates/SterlingExecutiveTemplate";
import { StrategicExecutivePlusTemplate } from "./resume/templates/StrategicExecutivePlusTemplate";
import { StrategicLeaderTemplate } from "./resume/templates/StrategicLeaderTemplate";
import { StrategicLeadershipTemplate } from "./resume/templates/StrategicLeadershipTemplate";
import { StripedBackgroundUniversalTemplate } from "./resume/templates/StripedBackgroundUniversalTemplate";
import { StructuralEngineerTemplate } from "./resume/templates/StructuralEngineerTemplate";
import { StudentAthleteTemplate } from "./resume/templates/StudentAthleteTemplate";
import { StudentDeveloperPortfolioTemplate } from "./resume/templates/StudentDeveloperPortfolioTemplate";
import { StudentEducatorTemplate } from "./resume/templates/StudentEducatorTemplate";
import { StudentEngagementTemplate } from "./resume/templates/StudentEngagementTemplate";
import { StudioArtistTemplate } from "./resume/templates/StudioArtistTemplate";
import { StudyAbroadGraduateTemplate } from "./resume/templates/StudyAbroadGraduateTemplate";
import { SubstackAuthorTemplate } from "./resume/templates/SubstackAuthorTemplate";
import { SubstackWriterTemplate } from "./resume/templates/SubstackWriterTemplate";
import { SupplyChainManagerTemplate } from "./resume/templates/SupplyChainManagerTemplate";
import { SvelteDeveloperTemplate } from "./resume/templates/SvelteDeveloperTemplate";
import { SwiftIOSDeveloperTemplate } from "./resume/templates/SwiftIOSDeveloperTemplate";
import { SwissStyleUniversalTemplate } from "./resume/templates/SwissStyleUniversalTemplate";
import { SystemArchitectTemplate } from "./resume/templates/SystemArchitectTemplate";
import { TalentAcquisitionSpecialistTemplate } from "./resume/templates/TalentAcquisitionSpecialistTemplate";
import { TangerineModernTemplate } from "./resume/templates/TangerineModernTemplate";
import { TaxSpecialistProTemplate } from "./resume/templates/TaxSpecialistProTemplate";
import { TaxSpecialistTemplate } from "./resume/templates/TaxSpecialistTemplate";
import { TeacherProfessionalTemplate } from "./resume/templates/TeacherProfessionalTemplate";
import { TeachingCertifiedTemplate } from "./resume/templates/TeachingCertifiedTemplate";
import { TeachingExcellenceTemplate } from "./resume/templates/TeachingExcellenceTemplate";
import { TealModernTemplate } from "./resume/templates/TealModernTemplate";
import { TechBloggerDevTemplate } from "./resume/templates/TechBloggerDevTemplate";
import { TechBloggerGraduateTemplate } from "./resume/templates/TechBloggerGraduateTemplate";
import { TechCraftedTemplate } from "./resume/templates/TechCraftedTemplate";
import { TechGridTemplate } from "./resume/templates/TechGridTemplate";
import { TechHorizonTemplate } from "./resume/templates/TechHorizonTemplate";
import { TechLeadTemplate } from "./resume/templates/TechLeadTemplate";
import { TechPioneerTemplate } from "./resume/templates/TechPioneerTemplate";
import { TechSavvyFresherTemplate } from "./resume/templates/TechSavvyFresherTemplate";
import { TechStackProTemplate } from "./resume/templates/TechStackProTemplate";
import { TechVanguardTemplate } from "./resume/templates/TechVanguardTemplate";
import { TensorFlowMLEngineerTemplate } from "./resume/templates/TensorFlowMLEngineerTemplate";
import { TerminalConsoleTemplate } from "./resume/templates/TerminalConsoleTemplate";
import { TerminalThemeTemplate } from "./resume/templates/TerminalThemeTemplate";
import { TerraformDevOpsTemplate } from "./resume/templates/TerraformDevOpsTemplate";
import { ThinBorderUniversalTemplate } from "./resume/templates/ThinBorderUniversalTemplate";
import { ThreeDModelingArtistTemplate } from "./resume/templates/ThreeDModelingArtistTemplate";
import { TikTokCreatorTemplate } from "./resume/templates/TikTokCreatorTemplate";
import { TiktokContentCreatorTemplate } from "./resume/templates/TiktokContentCreatorTemplate";
import { TitanCorporateTemplate } from "./resume/templates/TitanCorporateTemplate";
import { TopBarUniversalTemplate } from "./resume/templates/TopBarUniversalTemplate";
import { TreasuryAnalystTemplate } from "./resume/templates/TreasuryAnalystTemplate";
import { TriangularElementsUniversalTemplate } from "./resume/templates/TriangularElementsUniversalTemplate";
import { TwitchStreamerCreativeTemplate } from "./resume/templates/TwitchStreamerCreativeTemplate";
import { TwitchStreamerTemplate } from "./resume/templates/TwitchStreamerTemplate";
import { TwitterDevTemplate } from "./resume/templates/TwitterDevTemplate";
import { TwoToneClassicTemplate } from "./resume/templates/TwoToneClassicTemplate";
import { TwoToneSplitUniversalTemplate } from "./resume/templates/TwoToneSplitUniversalTemplate";
import { TypeScriptExpertTemplate } from "./resume/templates/TypeScriptExpertTemplate";
import { TypewriterStyleTemplate } from "./resume/templates/TypewriterStyleTemplate";
import { TypographerSpecialistTemplate } from "./resume/templates/TypographerSpecialistTemplate";
import { UISpecialistTemplate } from "./resume/templates/UISpecialistTemplate";
import { UIUXDesignerProTemplate } from "./resume/templates/UIUXDesignerProTemplate";
import { UXResearcherTemplate } from "./resume/templates/UXResearcherTemplate";
import { UiuxPortfolioProTemplate } from "./resume/templates/UiuxPortfolioProTemplate";
import { UnityGameDeveloperTemplate } from "./resume/templates/UnityGameDeveloperTemplate";
import { UniversityProfessorTemplate } from "./resume/templates/UniversityProfessorTemplate";
import { UrbanDesignerTemplate } from "./resume/templates/UrbanDesignerTemplate";
import { UserflowDesignerTemplate } from "./resume/templates/UserflowDesignerTemplate";
import { UserresearchSpecialistTemplate } from "./resume/templates/UserresearchSpecialistTemplate";
import { UxResearcherPortfolioTemplate } from "./resume/templates/UxResearcherPortfolioTemplate";
import { UxfolioDesignerTemplate } from "./resume/templates/UxfolioDesignerTemplate";
import { VPExecutiveTemplate } from "./resume/templates/VPExecutiveTemplate";
import { VelocityExecutiveTemplate } from "./resume/templates/VelocityExecutiveTemplate";
import { VentureFresherTemplate } from "./resume/templates/VentureFresherTemplate";
import { VertexProfessionalTemplate } from "./resume/templates/VertexProfessionalTemplate";
import { VeterinaryDoctorTemplate } from "./resume/templates/VeterinaryDoctorTemplate";
import { VibrantDesignerTemplate } from "./resume/templates/VibrantDesignerTemplate";
import { VideoEditorCreativeTemplate } from "./resume/templates/VideoEditorCreativeTemplate";
import { VideoProducerTemplate } from "./resume/templates/VideoProducerTemplate";
import { VimeoVideographerTemplate } from "./resume/templates/VimeoVideographerTemplate";
import { VintagePosterTemplate } from "./resume/templates/VintagePosterTemplate";
import { VioletCorporateTemplate } from "./resume/templates/VioletCorporateTemplate";
import { VisionDesignerTemplate } from "./resume/templates/VisionDesignerTemplate";
import { VisionaryCreativeTemplate } from "./resume/templates/VisionaryCreativeTemplate";
import { VisualDesignerProTemplate } from "./resume/templates/VisualDesignerProTemplate";
import { VisualDesignerShowcaseTemplate } from "./resume/templates/VisualDesignerShowcaseTemplate";
import { VisualStorytellerTemplateTemplate } from "./resume/templates/VisualStorytellerTemplateTemplate";
import { VolunteerLeaderTemplate } from "./resume/templates/VolunteerLeaderTemplate";
import { VueJSDeveloperTemplate } from "./resume/templates/VueJSDeveloperTemplate";
import { VueMasterTemplate } from "./resume/templates/VueMasterTemplate";
import { VueSpecialistTemplate } from "./resume/templates/VueSpecialistTemplate";
import { WatermarkStyleUniversalTemplate } from "./resume/templates/WatermarkStyleUniversalTemplate";
import { WavePatternUniversalTemplate } from "./resume/templates/WavePatternUniversalTemplate";
import { WebAssemblyEngineerTemplate } from "./resume/templates/WebAssemblyEngineerTemplate";
import { WebDesignerModernTemplate } from "./resume/templates/WebDesignerModernTemplate";
import { WebPortfolioGradTemplate } from "./resume/templates/WebPortfolioGradTemplate";
import { WebflowDesignerPortfolioTemplate } from "./resume/templates/WebflowDesignerPortfolioTemplate";
import { WebflowDeveloperTemplate } from "./resume/templates/WebflowDeveloperTemplate";
import { WebpresenceExecutiveTemplate } from "./resume/templates/WebpresenceExecutiveTemplate";
import { WebrtcEngineerTemplate } from "./resume/templates/WebrtcEngineerTemplate";
import { WideMarginUniversalTemplate } from "./resume/templates/WideMarginUniversalTemplate";
import { WireframeSpecialistTemplate } from "./resume/templates/WireframeSpecialistTemplate";
import { YouTubeEducatorTemplate } from "./resume/templates/YouTubeEducatorTemplate";
import { YoutubeCreatorTemplate } from "./resume/templates/YoutubeCreatorTemplate";
import { YoutubeDevEducatorTemplate } from "./resume/templates/YoutubeDevEducatorTemplate";
import { ZenithCorporateTemplate } from "./resume/templates/ZenithCorporateTemplate";
import { ZeplinHandoffSpecialistTemplate } from "./resume/templates/ZeplinHandoffSpecialistTemplate";
import { ZigzagBorderUniversalTemplate } from "./resume/templates/ZigzagBorderUniversalTemplate";
import { iOSSwiftEngineerTemplate } from "./resume/templates/iOSSwiftEngineerTemplate";

interface TemplatePreviewProps {
  templateId: string;
  themeColor?: string;
  sampleData?: ResumeData;
  className?: string;
}

// Template-specific sample data
const getTemplateSpecificData = (templateId: string): ResumeData => {
  // Executive/Senior Leadership templates
  if (templateId === 'executive') {
    return {
      personalInfo: {
        fullName: "Michael Thompson",
        title: "Chief Technology Officer",
        email: "michael.thompson@email.com",
        phone: "+1 (555) 345-6789",
        location: "Chicago, IL",
        summary: "Visionary technology executive with 15+ years leading digital transformation initiatives. Proven track record of building high-performing engineering teams and delivering innovative solutions that drive business growth and competitive advantage.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Global Tech Corp",
          position: "Chief Technology Officer",
          startDate: "2019-01",
          endDate: "present",
          current: true,
          description: "Lead technology strategy and innovation for organization with 2,000+ employees\nBuilt engineering team from 50 to 200+ across multiple locations\nSpearheaded cloud migration initiative saving $5M annually\nDrive product roadmap and architecture decisions for flagship products",
        },
        {
          id: "exp-2",
          company: "Enterprise Solutions Inc",
          position: "VP of Engineering",
          startDate: "2015-03",
          endDate: "2018-12",
          current: false,
          description: "Managed 80+ person engineering organization across 6 product teams\nEstablished technical standards and best practices company-wide\nLed successful IPO preparation and technical due diligence\nReduced infrastructure costs by 40% through strategic optimization",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Stanford University",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2001-09",
          endDate: "2003-06",
        },
      ],
      skills: [
        { id: "skill-1", name: "Strategic Planning" },
        { id: "skill-2", name: "Team Leadership" },
        { id: "skill-3", name: "Cloud Architecture" },
        { id: "skill-4", name: "Digital Transformation" },
        { id: "skill-5", name: "Product Strategy" },
        { id: "skill-6", name: "Stakeholder Management" },
        { id: "skill-7", name: "Budget Management" },
        { id: "skill-8", name: "Innovation" },
      ],
      sections: [],
    };
  }

  // Frontend Developer templates
  if (templateId === 'frontend' || templateId === 'senior-frontend') {
    const isSenior = templateId === 'senior-frontend';
    return {
      personalInfo: {
        fullName: isSenior ? "Sarah Chen" : "Alex Rivera",
        title: isSenior ? "Senior Frontend Engineer" : "Frontend Developer",
        email: isSenior ? "sarah.chen@email.com" : "alex.rivera@email.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, CA",
        summary: isSenior 
          ? "Senior frontend engineer with 8+ years crafting performant, accessible web applications. Expert in React, TypeScript, and modern frontend architecture. Passionate about user experience and component design systems."
          : "Creative frontend developer with 3+ years building responsive, user-friendly web applications. Proficient in React, TypeScript, and modern CSS frameworks.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isSenior ? "TechCorp Solutions" : "Digital Agency",
          position: isSenior ? "Senior Frontend Engineer" : "Frontend Developer",
          startDate: isSenior ? "2020-03" : "2022-01",
          endDate: "present",
          current: true,
          description: isSenior
            ? "Lead frontend architecture for enterprise SaaS platform serving 100K+ users\nDesigned and implemented component library used across 15+ product teams\nReduced bundle size by 45% and improved Lighthouse scores to 95+\nMentor team of 6 frontend engineers and establish best practices"
            : "Develop responsive web applications using React and TypeScript\nCollaborate with designers to implement pixel-perfect UI components\nImprove page load times by 30% through code optimization\nWrite comprehensive unit and integration tests",
        },
        {
          id: "exp-2",
          company: isSenior ? "StartupXYZ" : "Web Studio",
          position: isSenior ? "Frontend Engineer" : "Junior Frontend Developer",
          startDate: isSenior ? "2017-06" : "2021-03",
          endDate: isSenior ? "2020-02" : "2021-12",
          current: false,
          description: isSenior
            ? "Built real-time collaborative features using WebSockets\nImplemented state management architecture with Redux\nEstablished CI/CD pipelines for automated testing and deployment\nImproved accessibility compliance to WCAG 2.1 AA standards"
            : "Assisted in developing client websites and web applications\nConverted design mockups into responsive HTML/CSS/JavaScript\nFixed bugs and improved cross-browser compatibility\nParticipated in code reviews and agile ceremonies",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2013-09",
          endDate: "2017-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "React" },
        { id: "skill-2", name: "TypeScript" },
        { id: "skill-3", name: "JavaScript" },
        { id: "skill-4", name: "HTML/CSS" },
        { id: "skill-5", name: "Tailwind CSS" },
        { id: "skill-6", name: "Next.js" },
        { id: "skill-7", name: "Redux" },
        { id: "skill-8", name: "Webpack" },
      ],
      sections: [],
    };
  }

  // Backend Developer templates
  if (templateId === 'backend' || templateId === 'senior-backend') {
    const isSenior = templateId === 'senior-backend';
    return {
      personalInfo: {
        fullName: isSenior ? "David Kumar" : "Jordan Lee",
        title: isSenior ? "Senior Backend Engineer" : "Backend Developer",
        email: isSenior ? "david.kumar@email.com" : "jordan.lee@email.com",
        phone: "+1 (555) 345-6789",
        location: "Seattle, WA",
        summary: isSenior
          ? "Senior backend engineer with 9+ years designing scalable distributed systems. Expert in microservices architecture, database optimization, and cloud infrastructure. Strong focus on system reliability and performance."
          : "Backend developer with 3+ years building robust APIs and server-side applications. Experienced in Node.js, Python, and database design.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isSenior ? "Cloud Platform Inc" : "Tech Solutions",
          position: isSenior ? "Senior Backend Engineer" : "Backend Developer",
          startDate: isSenior ? "2019-01" : "2022-06",
          endDate: "present",
          current: true,
          description: isSenior
            ? "Architect and implement microservices handling 10M+ daily requests\nOptimize database queries reducing response time by 60%\nDesign event-driven architecture using Kafka and Redis\nLead backend team of 5 engineers and establish coding standards"
            : "Develop RESTful APIs using Node.js and Express\nDesign and optimize PostgreSQL database schemas\nImplement authentication and authorization systems\nWrite unit tests achieving 85% code coverage",
        },
        {
          id: "exp-2",
          company: isSenior ? "Enterprise Systems" : "StartupCo",
          position: isSenior ? "Backend Engineer" : "Junior Backend Developer",
          startDate: isSenior ? "2015-03" : "2021-01",
          endDate: isSenior ? "2018-12" : "2022-05",
          current: false,
          description: isSenior
            ? "Built scalable API infrastructure serving 1M+ users\nImplemented caching strategies improving performance by 40%\nMigrated monolithic application to microservices architecture\nEstablished monitoring and alerting systems"
            : "Assisted in API development and maintenance\nWrote database migration scripts\nFixed bugs and improved error handling\nDocumented API endpoints and system architecture",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Carnegie Mellon University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2011-09",
          endDate: "2015-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "Node.js" },
        { id: "skill-2", name: "Python" },
        { id: "skill-3", name: "PostgreSQL" },
        { id: "skill-4", name: "MongoDB" },
        { id: "skill-5", name: "Redis" },
        { id: "skill-6", name: "Docker" },
        { id: "skill-7", name: "Kubernetes" },
        { id: "skill-8", name: "AWS" },
      ],
      sections: [],
    };
  }

  // Fullstack Developer template
  if (templateId === 'fullstack') {
    return {
      personalInfo: {
        fullName: "Jamie Taylor",
        title: "Full Stack Developer",
        email: "jamie.taylor@email.com",
        phone: "+1 (555) 456-7890",
        location: "Austin, TX",
        summary: "Versatile full stack developer with 5+ years building end-to-end web applications. Proficient in React, Node.js, and cloud technologies. Strong problem-solver with experience across the entire software development lifecycle.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Tech Innovations",
          position: "Full Stack Developer",
          startDate: "2021-01",
          endDate: "present",
          current: true,
          description: "Develop full stack web applications using React and Node.js\nDesign and implement RESTful APIs and database schemas\nDeploy applications to AWS using CI/CD pipelines\nCollaborate with product team to define feature requirements",
        },
        {
          id: "exp-2",
          company: "Digital Solutions",
          position: "Full Stack Developer",
          startDate: "2019-06",
          endDate: "2020-12",
          current: false,
          description: "Built responsive web applications from concept to deployment\nIntegrated third-party APIs and payment systems\nOptimized application performance and database queries\nProvided technical support and bug fixes",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "University of Texas at Austin",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "React" },
        { id: "skill-2", name: "Node.js" },
        { id: "skill-3", name: "TypeScript" },
        { id: "skill-4", name: "PostgreSQL" },
        { id: "skill-5", name: "MongoDB" },
        { id: "skill-6", name: "AWS" },
        { id: "skill-7", name: "Docker" },
        { id: "skill-8", name: "Git" },
      ],
      sections: [],
    };
  }

  // Fresher templates (entry-level, recent graduates)
  if (templateId === 'fresher' || templateId === 'premium-fresher' || templateId === 'fresher-elite' || templateId === 'graduate' || templateId === 'starter') {
    return {
      personalInfo: {
        fullName: "Priya Sharma",
        title: "Computer Science Graduate",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        location: "Bangalore, India",
        summary: "Recent Computer Science graduate with strong foundation in programming and software development. Passionate about learning new technologies and solving complex problems. Completed multiple projects during coursework and internships.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Tech Solutions Pvt Ltd",
          position: "Software Development Intern",
          startDate: "2024-01",
          endDate: "2024-06",
          current: false,
          description: "Developed web application features using React and Node.js\nWrote unit tests and participated in code reviews\nCollaborated with team using Agile methodology\nFixed bugs and improved application performance",
        },
        {
          id: "exp-2",
          company: "StartupHub",
          position: "Summer Intern",
          startDate: "2023-05",
          endDate: "2023-07",
          current: false,
          description: "Assisted in developing mobile application features\nLearned software development best practices\nParticipated in daily standup meetings\nDocumented code and created user guides",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Indian Institute of Technology",
          degree: "Bachelor of Technology",
          field: "Computer Science and Engineering",
          startDate: "2020-08",
          endDate: "2024-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "C++" },
        { id: "skill-2", name: "Java" },
        { id: "skill-3", name: "Python" },
        { id: "skill-4", name: "JavaScript" },
        { id: "skill-5", name: "React" },
        { id: "skill-6", name: "SQL" },
        { id: "skill-7", name: "Git" },
        { id: "skill-8", name: "Data Structures" },
      ],
      sections: [
        {
          id: "projects",
          title: "Academic Projects",
          content: "E-commerce Website - Built full stack application with React and Node.js\nMachine Learning Model - Developed image classifier using Python and TensorFlow\nMobile App - Created Android app for expense tracking",
        },
      ],
    };
  }

  // Senior/Elite templates
  if (templateId === 'senior') {
    return {
      personalInfo: {
        fullName: "Robert Martinez",
        title: "Senior Software Architect",
        email: "robert.martinez@email.com",
        phone: "+1 (555) 567-8901",
        location: "New York, NY",
        summary: "Accomplished software architect with 12+ years designing and building enterprise-scale applications. Expert in system design, cloud architecture, and team leadership. Track record of delivering innovative solutions that drive business value.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Enterprise Tech Corp",
          position: "Senior Software Architect",
          startDate: "2018-01",
          endDate: "present",
          current: true,
          description: "Design architecture for enterprise applications serving 500K+ users\nLead technical decision-making and establish engineering standards\nMentor engineers and conduct technical training sessions\nDrive cloud migration strategy reducing costs by $2M annually",
        },
        {
          id: "exp-2",
          company: "Innovation Labs",
          position: "Lead Software Engineer",
          startDate: "2013-06",
          endDate: "2017-12",
          current: false,
          description: "Led development of core platform features\nEstablished microservices architecture and DevOps practices\nManaged team of 8 engineers across multiple projects\nImproved system reliability to 99.9% uptime",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Massachusetts Institute of Technology",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2009-09",
          endDate: "2011-06",
        },
      ],
      skills: [
        { id: "skill-1", name: "System Design" },
        { id: "skill-2", name: "Cloud Architecture" },
        { id: "skill-3", name: "Microservices" },
        { id: "skill-4", name: "Java" },
        { id: "skill-5", name: "Python" },
        { id: "skill-6", name: "Kubernetes" },
        { id: "skill-7", name: "AWS" },
        { id: "skill-8", name: "Team Leadership" },
      ],
      sections: [],
    };
  }

  // Analyst template
  if (templateId === 'analyst') {
    return {
      personalInfo: {
        fullName: "Emily Johnson",
        title: "Data Analyst",
        email: "emily.johnson@email.com",
        phone: "+1 (555) 678-9012",
        location: "Boston, MA",
        summary: "Data analyst with 4+ years transforming complex data into actionable insights. Proficient in SQL, Python, and data visualization tools. Strong analytical skills with focus on business intelligence and reporting.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Analytics Corp",
          position: "Data Analyst",
          startDate: "2021-03",
          endDate: "present",
          current: true,
          description: "Analyze business data to identify trends and opportunities\nCreate dashboards and reports using Tableau and Power BI\nCollaborate with stakeholders to define KPIs and metrics\nAutomate data pipelines reducing manual work by 50%",
        },
        {
          id: "exp-2",
          company: "Business Insights LLC",
          position: "Junior Data Analyst",
          startDate: "2020-01",
          endDate: "2021-02",
          current: false,
          description: "Performed data cleaning and preprocessing\nGenerated weekly and monthly reports for management\nConducted statistical analysis to support business decisions\nAssisted in building predictive models",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Boston University",
          degree: "Bachelor of Science",
          field: "Statistics",
          startDate: "2016-09",
          endDate: "2020-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "SQL" },
        { id: "skill-2", name: "Python" },
        { id: "skill-3", name: "Tableau" },
        { id: "skill-4", name: "Power BI" },
        { id: "skill-5", name: "Excel" },
        { id: "skill-6", name: "Statistics" },
        { id: "skill-7", name: "Data Visualization" },
        { id: "skill-8", name: "R" },
      ],
      sections: [],
    };
  }

  // Healthcare & Medical templates
  if (['medical-professional', 'healthcare-two-column', 'nurse-specialist', 'medical-executive', 'clinical-minimal'].includes(templateId)) {
    const isExecutive = templateId === 'medical-executive';
    const isNurse = templateId === 'nurse-specialist';

    return {
      personalInfo: {
        fullName: isNurse ? "Jennifer Rodriguez" : "Dr. Sarah Williams",
        title: isExecutive ? "Chief Medical Officer" : isNurse ? "Registered Nurse - ICU Specialist" : "Physician - Internal Medicine",
        email: isNurse ? "j.rodriguez@email.com" : "dr.williams@email.com",
        phone: "+1 (555) 234-5678",
        location: isExecutive ? "Houston, TX" : "New York, NY",
        summary: isExecutive
          ? "Visionary healthcare executive with 18+ years of clinical and administrative leadership. Board-certified physician with expertise in patient care excellence, operational efficiency, and strategic planning. Proven track record in transforming healthcare delivery systems."
          : isNurse
          ? "Dedicated Registered Nurse with 6+ years of critical care experience. Specialized in intensive care unit operations, patient advocacy, and emergency response. Committed to providing compassionate, evidence-based nursing care."
          : "Board-certified internist with 10+ years providing comprehensive primary care. Expertise in chronic disease management, preventive medicine, and patient-centered care. Passionate about improving patient outcomes through evidence-based practice.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isExecutive ? "Metropolitan Healthcare System" : isNurse ? "St. Mary's Medical Center" : "City General Hospital",
          position: isExecutive ? "Chief Medical Officer" : isNurse ? "ICU Registered Nurse" : "Attending Physician",
          startDate: isExecutive ? "2018-01" : isNurse ? "2021-03" : "2019-06",
          endDate: "present",
          current: true,
          description: isExecutive
            ? "Lead medical staff of 400+ physicians across 8 hospital locations\nDeveloped quality improvement initiatives reducing readmissions by 25%\nOversee clinical operations with $150M annual budget\nChampion patient safety programs achieving top tier quality metrics"
            : isNurse
            ? "Provide critical care nursing for ICU patients with complex conditions\nMonitor patient vital signs and administer medications safely\nCollaborate with multidisciplinary team on patient care plans\nMentor new graduate nurses and nursing students"
            : "Manage panel of 2,000+ patients in internal medicine practice\nDiagnose and treat acute and chronic medical conditions\nCoordinate care with specialists and healthcare team\nImplement preventive care strategies improving patient health outcomes",
        },
        {
          id: "exp-2",
          company: isExecutive ? "Regional Medical Center" : isNurse ? "Community Hospital" : "University Medical Center",
          position: isExecutive ? "Medical Director" : isNurse ? "Medical-Surgical Nurse" : "Resident Physician",
          startDate: isExecutive ? "2012-03" : isNurse ? "2019-01" : "2016-07",
          endDate: isExecutive ? "2017-12" : isNurse ? "2021-02" : "2019-05",
          current: false,
          description: isExecutive
            ? "Directed clinical operations for 150-bed hospital\nLed physician recruitment and credentialing processes\nImplemented electronic health records system\nEstablished clinical protocols improving care quality"
            : isNurse
            ? "Provided nursing care for post-operative and medical patients\nAdministered medications and treatments per physician orders\nDocumented patient assessments in electronic health records\nParticipated in unit quality improvement initiatives"
            : "Completed 3-year internal medicine residency program\nManaged inpatient and outpatient care under supervision\nParticipated in teaching rounds and case presentations\nDeveloped clinical skills in diagnosis and treatment",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isNurse ? "State University" : "Johns Hopkins University",
          degree: isNurse ? "Bachelor of Science in Nursing" : isExecutive ? "Doctor of Medicine" : "Doctor of Medicine",
          field: isNurse ? "Nursing" : "Medicine",
          startDate: isNurse ? "2015-09" : "2008-09",
          endDate: isNurse ? "2019-05" : "2012-05",
        },
      ],
      skills: isNurse
        ? [
            { id: "skill-1", name: "Critical Care Nursing" },
            { id: "skill-2", name: "Patient Assessment" },
            { id: "skill-3", name: "IV Therapy" },
            { id: "skill-4", name: "Ventilator Management" },
            { id: "skill-5", name: "Emergency Response" },
            { id: "skill-6", name: "Electronic Health Records" },
            { id: "skill-7", name: "ACLS Certified" },
            { id: "skill-8", name: "Patient Advocacy" },
          ]
        : [
            { id: "skill-1", name: "Internal Medicine" },
            { id: "skill-2", name: "Patient Care" },
            { id: "skill-3", name: "Diagnosis & Treatment" },
            { id: "skill-4", name: "Electronic Health Records" },
            { id: "skill-5", name: "Chronic Disease Management" },
            { id: "skill-6", name: "Preventive Medicine" },
            { id: "skill-7", name: "Healthcare Leadership" },
            { id: "skill-8", name: "Quality Improvement" },
          ],
      sections: [],
    };
  }

  // Finance & Accounting templates
  if (['cpa-professional', 'finance-analyst', 'accounting-executive', 'auditor', 'finance-two-column'].includes(templateId)) {
    const isCPA = templateId === 'cpa-professional';
    const isAuditor = templateId === 'auditor';
    const isExecutive = templateId === 'accounting-executive';

    return {
      personalInfo: {
        fullName: isAuditor ? "Michael Anderson" : "Sarah Johnson",
        title: isExecutive ? "Chief Financial Officer" : isCPA ? "Certified Public Accountant" : isAuditor ? "Senior Internal Auditor" : "Senior Financial Analyst",
        email: isAuditor ? "m.anderson@email.com" : "sarah.johnson@email.com",
        phone: "+1 (555) 345-6789",
        location: isExecutive ? "Chicago, IL" : "New York, NY",
        summary: isExecutive
          ? "Strategic finance executive with 15+ years driving financial performance and business growth. CPA with expertise in financial planning, risk management, and corporate governance. Track record of optimizing operations and delivering shareholder value."
          : isCPA
          ? "Licensed CPA with 8+ years providing comprehensive accounting and tax services. Expertise in financial reporting, tax compliance, and audit preparation. Committed to delivering accurate, timely financial solutions."
          : isAuditor
          ? "Experienced internal auditor with 7+ years evaluating organizational controls and processes. Skilled in risk assessment, compliance testing, and audit reporting. Strong analytical abilities and attention to detail."
          : "Results-driven financial analyst with 6+ years providing strategic insights and financial modeling. Proficient in financial planning, budgeting, and forecasting. Strong analytical skills with focus on driving business decisions.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isExecutive ? "Fortune 500 Corporation" : isCPA ? "Anderson & Associates CPA" : isAuditor ? "Global Enterprises Inc" : "Investment Group LLC",
          position: isExecutive ? "Chief Financial Officer" : isCPA ? "Senior CPA" : isAuditor ? "Senior Internal Auditor" : "Senior Financial Analyst",
          startDate: isExecutive ? "2019-01" : "2021-03",
          endDate: "present",
          current: true,
          description: isExecutive
            ? "Oversee all financial operations for $2B revenue organization\nLead financial planning and analysis for strategic initiatives\nManage team of 50+ finance and accounting professionals\nPresent financial results to board of directors and investors"
            : isCPA
            ? "Prepare and review financial statements and tax returns\nConduct audit engagements for diverse client portfolio\nProvide tax planning and compliance services\nAdvise clients on financial reporting and internal controls"
            : isAuditor
            ? "Plan and execute internal audit engagements across organization\nAssess effectiveness of internal controls and risk management\nPrepare detailed audit reports with findings and recommendations\nMonitor remediation of audit issues and control deficiencies"
            : "Develop financial models and forecasts to support strategic planning\nAnalyze financial performance and identify trends and variances\nPrepare monthly financial reports and executive presentations\nCollaborate with business units on budgeting and planning",
        },
        {
          id: "exp-2",
          company: isExecutive ? "Technology Innovations Inc" : isCPA ? "Big Four Accounting Firm" : isAuditor ? "Regional Bank Corp" : "Manufacturing Company",
          position: isExecutive ? "VP of Finance" : isCPA ? "Staff Accountant" : isAuditor ? "Internal Auditor" : "Financial Analyst",
          startDate: isExecutive ? "2014-06" : isCPA ? "2018-01" : "2019-06",
          endDate: isExecutive ? "2018-12" : isCPA ? "2021-02" : "2021-02",
          current: false,
          description: isExecutive
            ? "Managed accounting, treasury, and financial planning functions\nLed successful IPO preparation and financial due diligence\nImplemented financial systems improving reporting efficiency\nReduced operating costs by 20% through process improvements"
            : isCPA
            ? "Performed audit procedures and prepared working papers\nAssisted in preparation of tax returns and financial statements\nConducted research on accounting and tax matters\nSupported senior staff on complex client engagements"
            : isAuditor
            ? "Conducted audit testing of financial and operational controls\nDocumented business processes and control procedures\nAssisted in fraud investigations and special projects\nPrepared audit work papers and documentation"
            : "Analyzed financial data and prepared variance reports\nAssisted in annual budgeting and quarterly forecasting\nCreated presentations for management review meetings\nSupported month-end close and financial reporting processes",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isExecutive ? "Wharton School of Business" : "University of Illinois",
          degree: isExecutive ? "Master of Business Administration" : "Bachelor of Science",
          field: isExecutive ? "Finance" : "Accounting",
          startDate: isExecutive ? "2011-09" : "2014-09",
          endDate: isExecutive ? "2013-06" : "2018-05",
        },
      ],
      skills: isCPA
        ? [
            { id: "skill-1", name: "GAAP" },
            { id: "skill-2", name: "Tax Preparation" },
            { id: "skill-3", name: "Financial Auditing" },
            { id: "skill-4", name: "QuickBooks" },
            { id: "skill-5", name: "Excel" },
            { id: "skill-6", name: "Financial Reporting" },
            { id: "skill-7", name: "CPA License" },
            { id: "skill-8", name: "Internal Controls" },
          ]
        : isAuditor
        ? [
            { id: "skill-1", name: "Internal Auditing" },
            { id: "skill-2", name: "Risk Assessment" },
            { id: "skill-3", name: "COSO Framework" },
            { id: "skill-4", name: "SOX Compliance" },
            { id: "skill-5", name: "Data Analytics" },
            { id: "skill-6", name: "Audit Planning" },
            { id: "skill-7", name: "Report Writing" },
            { id: "skill-8", name: "ACL/IDEA" },
          ]
        : [
            { id: "skill-1", name: "Financial Modeling" },
            { id: "skill-2", name: "Financial Analysis" },
            { id: "skill-3", name: "Excel" },
            { id: "skill-4", name: "Budgeting & Forecasting" },
            { id: "skill-5", name: "SQL" },
            { id: "skill-6", name: "PowerPoint" },
            { id: "skill-7", name: "SAP/Oracle" },
            { id: "skill-8", name: "Financial Reporting" },
          ],
      sections: [],
    };
  }

  // Education & Teaching templates
  if (['teacher-professional', 'academic-scholar', 'educator-modern', 'teaching-certified', 'student-educator'].includes(templateId)) {
    const isAcademic = templateId === 'academic-scholar';

    return {
      personalInfo: {
        fullName: "Lisa Martinez",
        title: isAcademic ? "Professor of English Literature" : "High School Mathematics Teacher",
        email: "lisa.martinez@email.com",
        phone: "+1 (555) 456-7890",
        location: isAcademic ? "Cambridge, MA" : "Portland, OR",
        summary: isAcademic
          ? "Distinguished scholar with 12+ years teaching and researching English literature. Published author with expertise in 19th century American literature. Passionate about fostering critical thinking and literary analysis skills in students."
          : "Dedicated mathematics educator with 8+ years inspiring students to excel in STEM. Experienced in curriculum development, differentiated instruction, and student-centered learning. Committed to creating engaging, inclusive classroom environments.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isAcademic ? "Harvard University" : "Lincoln High School",
          position: isAcademic ? "Associate Professor" : "Mathematics Teacher",
          startDate: isAcademic ? "2018-09" : "2019-08",
          endDate: "present",
          current: true,
          description: isAcademic
            ? "Teach undergraduate and graduate courses in American literature\nAdvise doctoral students on dissertation research\nPublished 15+ peer-reviewed articles in top academic journals\nServe on university curriculum and tenure committees"
            : "Teach Algebra, Geometry, and AP Calculus to 150+ students\nDevelop engaging lesson plans aligned with state standards\nImplement technology-enhanced learning strategies\nMentor students participating in math competitions and STEM clubs",
        },
        {
          id: "exp-2",
          company: isAcademic ? "Boston College" : "Jefferson Middle School",
          position: isAcademic ? "Assistant Professor" : "Math Teacher",
          startDate: isAcademic ? "2013-09" : "2017-08",
          endDate: isAcademic ? "2018-08" : "2019-06",
          current: false,
          description: isAcademic
            ? "Taught survey courses in British and American literature\nDeveloped new curriculum for digital humanities program\nPresented research at national and international conferences\nReceived teaching excellence award in 2016"
            : "Taught 7th and 8th grade mathematics courses\nDifferentiated instruction to meet diverse student needs\nCollaborated with colleagues on interdisciplinary projects\nSponsored after-school tutoring and math club",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isAcademic ? "Yale University" : "State University",
          degree: isAcademic ? "Ph.D." : "Master of Arts in Teaching",
          field: isAcademic ? "English Literature" : "Mathematics Education",
          startDate: isAcademic ? "2007-09" : "2015-09",
          endDate: isAcademic ? "2013-05" : "2017-05",
        },
      ],
      skills: isAcademic
        ? [
            { id: "skill-1", name: "Literary Analysis" },
            { id: "skill-2", name: "Research & Writing" },
            { id: "skill-3", name: "Curriculum Development" },
            { id: "skill-4", name: "Academic Publishing" },
            { id: "skill-5", name: "Student Advising" },
            { id: "skill-6", name: "Public Speaking" },
            { id: "skill-7", name: "Digital Humanities" },
            { id: "skill-8", name: "Grant Writing" },
          ]
        : [
            { id: "skill-1", name: "Mathematics Instruction" },
            { id: "skill-2", name: "Curriculum Development" },
            { id: "skill-3", name: "Classroom Management" },
            { id: "skill-4", name: "Differentiated Instruction" },
            { id: "skill-5", name: "Google Classroom" },
            { id: "skill-6", name: "Student Assessment" },
            { id: "skill-7", name: "Parent Communication" },
            { id: "skill-8", name: "STEM Integration" },
          ],
      sections: [],
    };
  }

  // Sales & Marketing templates
  if (['sales-executive', 'marketing-professional', 'sales-marketing-hybrid', 'digital-marketer', 'sales-manager'].includes(templateId)) {
    const isDigital = templateId === 'digital-marketer';
    const isSales = ['sales-executive', 'sales-manager'].includes(templateId);

    return {
      personalInfo: {
        fullName: isSales ? "James Patterson" : "Amanda Chen",
        title: isSales ? "Sales Director" : isDigital ? "Digital Marketing Manager" : "Marketing Manager",
        email: isSales ? "j.patterson@email.com" : "amanda.chen@email.com",
        phone: "+1 (555) 567-8901",
        location: isSales ? "Atlanta, GA" : "Los Angeles, CA",
        summary: isSales
          ? "Dynamic sales leader with 10+ years driving revenue growth and building high-performing teams. Proven track record exceeding quotas and expanding market share. Expert in consultative selling and strategic account management."
          : isDigital
          ? "Results-driven digital marketer with 6+ years creating data-driven campaigns. Expert in SEO, SEM, social media, and content marketing. Passionate about leveraging analytics to optimize marketing ROI."
          : "Strategic marketing professional with 7+ years developing integrated marketing campaigns. Experience in brand management, content strategy, and digital marketing. Strong analytical and creative problem-solving skills.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isSales ? "Enterprise Software Solutions" : isDigital ? "E-commerce Startup" : "Consumer Brands Inc",
          position: isSales ? "Sales Director" : isDigital ? "Digital Marketing Manager" : "Marketing Manager",
          startDate: "2020-03",
          endDate: "present",
          current: true,
          description: isSales
            ? "Lead sales team of 25 representatives achieving $50M annual revenue\nDevelop and execute strategic sales plans expanding into new markets\nManage key enterprise accounts and C-level relationships\nExceeded annual quota by average of 125% for 4 consecutive years"
            : isDigital
            ? "Manage digital marketing budget of $2M across multiple channels\nDevelop and execute SEO strategy increasing organic traffic by 150%\nRun paid advertising campaigns on Google, Facebook, and LinkedIn\nAnalyze campaign performance and optimize for ROI improvements"
            : "Develop and execute integrated marketing campaigns for product launches\nManage brand positioning and messaging across all channels\nOversee content creation for website, social media, and email marketing\nAnalyze market trends and competitive landscape to inform strategy",
        },
        {
          id: "exp-2",
          company: isSales ? "Tech Sales Corp" : isDigital ? "Digital Agency" : "Marketing Solutions LLC",
          position: isSales ? "Senior Sales Representative" : isDigital ? "SEO Specialist" : "Marketing Coordinator",
          startDate: isSales ? "2016-01" : "2019-06",
          endDate: isSales ? "2020-02" : "2020-02",
          current: false,
          description: isSales
            ? "Managed territory generating $8M in annual sales revenue\nProspected and closed new business with Fortune 500 companies\nConsistently ranked top 3 sales performer company-wide\nMentored new sales representatives on best practices"
            : isDigital
            ? "Conducted keyword research and on-page SEO optimization\nCreated SEO content strategy improving search rankings\nManaged Google Analytics and Search Console reporting\nCollaborated with content team on SEO-optimized blog posts"
            : "Assisted in planning and executing marketing campaigns\nCreated content for social media and email newsletters\nCoordinated events and trade show participation\nTracked marketing metrics and prepared performance reports",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isSales ? "University of Georgia" : "University of Southern California",
          degree: "Bachelor of Business Administration",
          field: isSales ? "Sales & Marketing" : "Marketing",
          startDate: "2012-09",
          endDate: "2016-05",
        },
      ],
      skills: isSales
        ? [
            { id: "skill-1", name: "B2B Sales" },
            { id: "skill-2", name: "Account Management" },
            { id: "skill-3", name: "Salesforce" },
            { id: "skill-4", name: "Negotiation" },
            { id: "skill-5", name: "Pipeline Management" },
            { id: "skill-6", name: "Sales Strategy" },
            { id: "skill-7", name: "Team Leadership" },
            { id: "skill-8", name: "Consultative Selling" },
          ]
        : isDigital
        ? [
            { id: "skill-1", name: "SEO/SEM" },
            { id: "skill-2", name: "Google Analytics" },
            { id: "skill-3", name: "Google Ads" },
            { id: "skill-4", name: "Facebook Ads" },
            { id: "skill-5", name: "Email Marketing" },
            { id: "skill-6", name: "Content Marketing" },
            { id: "skill-7", name: "Marketing Automation" },
            { id: "skill-8", name: "Data Analysis" },
          ]
        : [
            { id: "skill-1", name: "Marketing Strategy" },
            { id: "skill-2", name: "Brand Management" },
            { id: "skill-3", name: "Digital Marketing" },
            { id: "skill-4", name: "Content Creation" },
            { id: "skill-5", name: "Social Media Marketing" },
            { id: "skill-6", name: "Market Research" },
            { id: "skill-7", name: "Campaign Management" },
            { id: "skill-8", name: "Adobe Creative Suite" },
          ],
      sections: [],
    };
  }

  // Legal & Consulting templates
  if (['attorney-professional', 'legal-counsel', 'consultant', 'legal-executive', 'paralegal'].includes(templateId)) {
    const isParalegal = templateId === 'paralegal';
    const isConsultant = templateId === 'consultant';

    return {
      personalInfo: {
        fullName: isParalegal ? "Maria Garcia" : isConsultant ? "David Thompson" : "Robert Mitchell",
        title: isParalegal ? "Senior Paralegal" : isConsultant ? "Management Consultant" : "Corporate Attorney",
        email: isParalegal ? "m.garcia@email.com" : isConsultant ? "d.thompson@email.com" : "r.mitchell@email.com",
        phone: "+1 (555) 678-9012",
        location: isConsultant ? "San Francisco, CA" : "Washington, DC",
        summary: isParalegal
          ? "Experienced paralegal with 7+ years supporting complex litigation and corporate matters. Skilled in legal research, document preparation, and case management. Detail-oriented professional committed to excellence in legal support."
          : isConsultant
          ? "Strategic management consultant with 9+ years advising Fortune 500 clients. Expertise in business transformation, operational excellence, and change management. Proven track record delivering measurable results and client value."
          : "Accomplished corporate attorney with 12+ years advising on mergers, acquisitions, and securities matters. Juris Doctor from top-tier law school. Trusted advisor to C-suite executives on complex business transactions.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isParalegal ? "Smith & Associates Law Firm" : isConsultant ? "McKinsey & Company" : "Wilson & Partners LLP",
          position: isParalegal ? "Senior Paralegal" : isConsultant ? "Senior Consultant" : "Partner",
          startDate: isParalegal ? "2020-03" : isConsultant ? "2019-06" : "2021-01",
          endDate: "present",
          current: true,
          description: isParalegal
            ? "Manage case files and coordinate discovery for complex litigation\nConduct legal research and draft memoranda and pleadings\nOrganize and maintain document databases using e-discovery platforms\nLiaison with clients, courts, and opposing counsel"
            : isConsultant
            ? "Lead consulting engagements for Fortune 500 clients across industries\nDevelop business strategies and operational improvement recommendations\nManage project teams and client relationships\nDeliver executive presentations and implementation support"
            : "Advise clients on mergers, acquisitions, and corporate governance\nNegotiate and draft complex transaction documents\nManage multimillion-dollar deals from due diligence to closing\nLead team of 5 associates on high-profile matters",
        },
        {
          id: "exp-2",
          company: isParalegal ? "Corporate Legal Department" : isConsultant ? "Bain & Company" : "Morrison & Foerster LLP",
          position: isParalegal ? "Paralegal" : isConsultant ? "Consultant" : "Senior Associate",
          startDate: isParalegal ? "2018-01" : isConsultant ? "2016-09" : "2015-09",
          endDate: isParalegal ? "2020-02" : isConsultant ? "2019-05" : "2020-12",
          current: false,
          description: isParalegal
            ? "Supported corporate legal team on contracts and compliance\nDrafted and reviewed commercial agreements and amendments\nMaintained corporate records and regulatory filings\nAssisted with intellectual property matters and trademark searches"
            : isConsultant
            ? "Analyzed business operations and identified improvement opportunities\nConducted market research and competitive analysis\nDeveloped financial models and business cases\nPresented findings and recommendations to client executives"
            : "Represented clients in securities offerings and corporate transactions\nConducted legal research and drafted transaction documents\nPerformed due diligence for public and private company deals\nAdvised on SEC compliance and corporate governance matters",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isParalegal ? "Georgetown University" : isConsultant ? "Harvard Business School" : "Yale Law School",
          degree: isParalegal ? "Paralegal Certificate" : isConsultant ? "Master of Business Administration" : "Juris Doctor",
          field: isParalegal ? "Paralegal Studies" : isConsultant ? "Business Administration" : "Law",
          startDate: isParalegal ? "2016-09" : isConsultant ? "2014-09" : "2012-09",
          endDate: isParalegal ? "2017-12" : isConsultant ? "2016-06" : "2015-05",
        },
      ],
      skills: isParalegal
        ? [
            { id: "skill-1", name: "Legal Research" },
            { id: "skill-2", name: "Litigation Support" },
            { id: "skill-3", name: "Document Management" },
            { id: "skill-4", name: "E-Discovery" },
            { id: "skill-5", name: "Contract Review" },
            { id: "skill-6", name: "Case Management" },
            { id: "skill-7", name: "Legal Writing" },
            { id: "skill-8", name: "Westlaw/LexisNexis" },
          ]
        : isConsultant
        ? [
            { id: "skill-1", name: "Strategy Consulting" },
            { id: "skill-2", name: "Business Analysis" },
            { id: "skill-3", name: "Financial Modeling" },
            { id: "skill-4", name: "Change Management" },
            { id: "skill-5", name: "Project Management" },
            { id: "skill-6", name: "Data Analysis" },
            { id: "skill-7", name: "PowerPoint" },
            { id: "skill-8", name: "Stakeholder Management" },
          ]
        : [
            { id: "skill-1", name: "Corporate Law" },
            { id: "skill-2", name: "M&A Transactions" },
            { id: "skill-3", name: "Securities Law" },
            { id: "skill-4", name: "Contract Negotiation" },
            { id: "skill-5", name: "Due Diligence" },
            { id: "skill-6", name: "Legal Research" },
            { id: "skill-7", name: "Corporate Governance" },
            { id: "skill-8", name: "Legal Writing" },
          ],
      sections: [],
    };
  }

  // Operations & Project Management templates
  if (['project-manager-pmp', 'operations-manager', 'pm-executive', 'agile-scrum', 'operations-two-column'].includes(templateId)) {
    const isOperations = ['operations-manager', 'operations-two-column'].includes(templateId);

    return {
      personalInfo: {
        fullName: isOperations ? "Daniel Brown" : "Jessica Williams",
        title: isOperations ? "Operations Manager" : "Senior Project Manager, PMP",
        email: isOperations ? "d.brown@email.com" : "j.williams@email.com",
        phone: "+1 (555) 789-0123",
        location: isOperations ? "Dallas, TX" : "Seattle, WA",
        summary: isOperations
          ? "Results-oriented operations manager with 10+ years optimizing business processes and driving operational excellence. Expert in supply chain management, process improvement, and team leadership. Track record of reducing costs and improving efficiency."
          : "Certified Project Management Professional with 8+ years leading complex technology projects. Expertise in Agile methodologies, stakeholder management, and cross-functional team leadership. Proven ability to deliver projects on time and within budget.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: isOperations ? "Manufacturing Solutions Inc" : "Tech Innovations Corp",
          position: isOperations ? "Operations Manager" : "Senior Project Manager",
          startDate: "2019-06",
          endDate: "present",
          current: true,
          description: isOperations
            ? "Oversee daily operations for 200-employee manufacturing facility\nManage production planning, inventory, and supply chain operations\nImplement lean manufacturing principles reducing waste by 30%\nLead continuous improvement initiatives improving productivity"
            : "Manage portfolio of enterprise software development projects\nLead Agile/Scrum teams of 15+ developers and QA engineers\nCoordinate with stakeholders on project scope and requirements\nDeliver $5M+ projects on time with 95% stakeholder satisfaction",
        },
        {
          id: "exp-2",
          company: isOperations ? "Logistics Company LLC" : "Digital Solutions Inc",
          position: isOperations ? "Operations Supervisor" : "Project Manager",
          startDate: isOperations ? "2015-03" : "2018-01",
          endDate: isOperations ? "2019-05" : "2019-05",
          current: false,
          description: isOperations
            ? "Supervised warehouse operations and 50-person team\nOptimized logistics processes reducing delivery times by 25%\nImplemented warehouse management system improving accuracy\nMonitored KPIs and prepared operational performance reports"
            : "Managed software implementation projects for enterprise clients\nCreated project plans, timelines, and resource allocation\nFacilitated sprint planning and retrospective meetings\nIdentified and mitigated project risks and issues",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: isOperations ? "University of Texas" : "University of Washington",
          degree: "Bachelor of Science",
          field: isOperations ? "Business Administration" : "Information Systems",
          startDate: "2011-09",
          endDate: "2015-05",
        },
      ],
      skills: isOperations
        ? [
            { id: "skill-1", name: "Operations Management" },
            { id: "skill-2", name: "Supply Chain Management" },
            { id: "skill-3", name: "Process Improvement" },
            { id: "skill-4", name: "Lean Manufacturing" },
            { id: "skill-5", name: "Team Leadership" },
            { id: "skill-6", name: "Inventory Management" },
            { id: "skill-7", name: "Budget Management" },
            { id: "skill-8", name: "SAP/ERP Systems" },
          ]
        : [
            { id: "skill-1", name: "Project Management" },
            { id: "skill-2", name: "Agile/Scrum" },
            { id: "skill-3", name: "PMP Certified" },
            { id: "skill-4", name: "JIRA" },
            { id: "skill-5", name: "Stakeholder Management" },
            { id: "skill-6", name: "Risk Management" },
            { id: "skill-7", name: "Team Leadership" },
            { id: "skill-8", name: "Microsoft Project" },
          ],
      sections: [],
    };
  }

  // Executive templates (sapphire-executive, luxury-timeline, corporate-executive, premium-elite)
  if (['sapphire-executive', 'luxury-timeline', 'corporate-executive', 'premium-elite'].includes(templateId)) {
    return {
      personalInfo: {
        fullName: "Victoria Sterling",
        title: "Chief Executive Officer",
        email: "v.sterling@email.com",
        phone: "+1 (555) 890-1234",
        location: "New York, NY",
        summary: "Visionary executive leader with 20+ years driving transformational growth and innovation. Proven track record building and scaling organizations from startup to Fortune 500. Expert in strategic planning, M&A, and organizational development.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Global Enterprises Inc",
          position: "Chief Executive Officer",
          startDate: "2018-01",
          endDate: "present",
          current: true,
          description: "Lead $3B organization with 5,000+ employees across 15 countries\nDrive strategic vision and corporate growth initiatives\nOversee executive team and board of directors relationships\nAchieved 150% revenue growth and successful IPO in 2020",
        },
        {
          id: "exp-2",
          company: "Innovation Corp",
          position: "Chief Operating Officer",
          startDate: "2013-06",
          endDate: "2017-12",
          current: false,
          description: "Managed global operations and business development\nLed 10+ strategic acquisitions totaling $500M\nBuilt operational excellence programs across organization\nIncreased operating margins from 15% to 28%",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Harvard Business School",
          degree: "Master of Business Administration",
          field: "Business Administration",
          startDate: "2009-09",
          endDate: "2011-06",
        },
      ],
      skills: [
        { id: "skill-1", name: "Executive Leadership" },
        { id: "skill-2", name: "Strategic Planning" },
        { id: "skill-3", name: "M&A Strategy" },
        { id: "skill-4", name: "P&L Management" },
        { id: "skill-5", name: "Board Relations" },
        { id: "skill-6", name: "Change Management" },
        { id: "skill-7", name: "Global Operations" },
        { id: "skill-8", name: "Business Development" },
      ],
      sections: [],
    };
  }

  // Fresher variant templates
  if (templateId.startsWith('fresher-') && !['fresher-elite'].includes(templateId)) {
    return {
      personalInfo: {
        fullName: "Rahul Kumar",
        title: "Computer Science Graduate",
        email: "rahul.kumar@email.com",
        phone: "+91 98765 43210",
        location: "Mumbai, India",
        summary: "Enthusiastic Computer Science graduate with strong programming skills and passion for technology. Completed multiple academic projects and internships. Eager to contribute to innovative software development teams.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Tech Solutions Pvt Ltd",
          position: "Software Development Intern",
          startDate: "2024-01",
          endDate: "2024-06",
          current: false,
          description: "Developed web application features using React and Node.js\nWrote unit tests and participated in code reviews\nCollaborated with team using Agile methodology\nFixed bugs and improved application performance",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Indian Institute of Technology",
          degree: "Bachelor of Technology",
          field: "Computer Science and Engineering",
          startDate: "2020-08",
          endDate: "2024-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "Java" },
        { id: "skill-2", name: "Python" },
        { id: "skill-3", name: "JavaScript" },
        { id: "skill-4", name: "React" },
        { id: "skill-5", name: "SQL" },
        { id: "skill-6", name: "Git" },
        { id: "skill-7", name: "Data Structures" },
        { id: "skill-8", name: "Algorithms" },
      ],
      sections: [],
    };
  }

  // Tech/software templates (tech-grid, software, etc.)
  if (['tech-grid', 'software', 'bold-headline', 'contemporary-split'].includes(templateId)) {
    return {
      personalInfo: {
        fullName: "Alex Morgan",
        title: "Software Engineer",
        email: "alex.morgan@email.com",
        phone: "+1 (555) 901-2345",
        location: "San Francisco, CA",
        summary: "Innovative software engineer with 6+ years building scalable applications. Full-stack expertise in modern web technologies and cloud platforms. Passionate about clean code and user experience.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Tech Innovators Inc",
          position: "Software Engineer",
          startDate: "2020-03",
          endDate: "present",
          current: true,
          description: "Develop full-stack applications using React, Node.js, and AWS\nDesign and implement RESTful APIs and microservices\nCollaborate with product team on feature development\nMentor junior developers and conduct code reviews",
        },
        {
          id: "exp-2",
          company: "Startup Solutions",
          position: "Junior Developer",
          startDate: "2019-01",
          endDate: "2020-02",
          current: false,
          description: "Built web applications using modern JavaScript frameworks\nImplemented responsive UI components and features\nWrote unit tests and performed bug fixes\nParticipated in agile development process",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "JavaScript" },
        { id: "skill-2", name: "React" },
        { id: "skill-3", name: "Node.js" },
        { id: "skill-4", name: "TypeScript" },
        { id: "skill-5", name: "Python" },
        { id: "skill-6", name: "AWS" },
        { id: "skill-7", name: "Docker" },
        { id: "skill-8", name: "Git" },
      ],
      sections: [],
    };
  }

  // Creative templates (creative-accent, elegant-serif)
  if (['creative-accent', 'elegant-serif'].includes(templateId)) {
    return {
      personalInfo: {
        fullName: "Sophie Anderson",
        title: "UX/UI Designer",
        email: "sophie.anderson@email.com",
        phone: "+1 (555) 012-3456",
        location: "Portland, OR",
        summary: "Creative designer with 5+ years crafting beautiful, user-centered digital experiences. Expert in UI/UX design, prototyping, and design systems. Passionate about solving complex problems through thoughtful design.",
        photo: null,
      },
      experience: [
        {
          id: "exp-1",
          company: "Design Studio Inc",
          position: "Senior UX/UI Designer",
          startDate: "2021-06",
          endDate: "present",
          current: true,
          description: "Lead design for web and mobile applications\nConduct user research and usability testing\nCreate wireframes, prototypes, and high-fidelity designs\nCollaborate with developers on design implementation",
        },
        {
          id: "exp-2",
          company: "Creative Agency",
          position: "UX/UI Designer",
          startDate: "2019-03",
          endDate: "2021-05",
          current: false,
          description: "Designed user interfaces for client projects\nDeveloped design systems and component libraries\nWorked with cross-functional teams on product features\nPresented designs to stakeholders and clients",
        },
      ],
      education: [
        {
          id: "edu-1",
          school: "Rhode Island School of Design",
          degree: "Bachelor of Fine Arts",
          field: "Graphic Design",
          startDate: "2015-09",
          endDate: "2019-05",
        },
      ],
      skills: [
        { id: "skill-1", name: "UI/UX Design" },
        { id: "skill-2", name: "Figma" },
        { id: "skill-3", name: "Adobe XD" },
        { id: "skill-4", name: "Sketch" },
        { id: "skill-5", name: "Prototyping" },
        { id: "skill-6", name: "User Research" },
        { id: "skill-7", name: "Design Systems" },
        { id: "skill-8", name: "Typography" },
      ],
      sections: [],
    };
  }

  // Default sample data for remaining templates (modern, minimal, professional, premium-universal, premium-pro, refined)
  return {
    personalInfo: {
      fullName: "John Smith",
      title: "Software Engineer",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      summary: "Experienced software engineer with 5+ years of expertise in full-stack development and cloud technologies. Passionate about building scalable applications and solving complex problems.",
      photo: null,
    },
    experience: [
      {
        id: "exp-1",
        company: "Tech Corp",
        position: "Senior Software Engineer",
        startDate: "2022-01",
        endDate: "present",
        current: true,
        description: "Lead development of scalable web applications using React and Node.js\nImproved system performance by 40% through optimization\nMentored junior developers and conducted code reviews\nCollaborated with cross-functional teams on product features",
      },
      {
        id: "exp-2",
        company: "StartupXYZ",
        position: "Software Engineer",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: "Developed and maintained web applications using modern technologies\nImplemented CI/CD pipelines and automated testing\nWorked in Agile environment with two-week sprints\nContributed to architectural decisions and technical planning",
      },
    ],
    education: [
      {
        id: "edu-1",
        school: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2016-09",
        endDate: "2020-05",
      },
    ],
    skills: [
      { id: "skill-1", name: "JavaScript" },
      { id: "skill-2", name: "TypeScript" },
      { id: "skill-3", name: "React" },
      { id: "skill-4", name: "Node.js" },
      { id: "skill-5", name: "Python" },
      { id: "skill-6", name: "AWS" },
      { id: "skill-7", name: "Docker" },
      { id: "skill-8", name: "Git" },
    ],
    sections: [],
  };
};

const templates = {
  "ai-engineer": AIEngineerTemplate,
  "api-doc": APIDocTemplate,
  "aws-cloud-engineer": AWSCloudEngineerTemplate,
  "aws-solutions-architect": AWSSolutionsArchitectTemplate,
  "abstract-version-designer": AbstractVersionDesignerTemplate,
  "academic-achiever": AcademicAchieverTemplate,
  "academic-advisor": AcademicAdvisorTemplate,
  "academic-educator": AcademicEducatorTemplate,
  "accessibility-designer": AccessibilityDesignerTemplate,
  "accessibility-ux": AccessibilityUxTemplate,
  "account-manager-enterprise": AccountManagerEnterpriseTemplate,
  "accounting-executive": AccountingExecutiveTemplate,
  "accounting-pro": AccountingProTemplate,
  "achiever-fresher": AchieverFresherTemplate,
  "adobe-portfolio-designer": AdobePortfolioDesignerTemplate,
  "adobexd-designer": AdobeXDDesignerTemplate,
  "aerospace-engineer": AerospaceEngineerTemplate,
  "aesthetic-creative": AestheticCreativeTemplate,
  "affiliate-marketing-manager": AffiliateMarketingManagerTemplate,
  "agile-project-lead": AgileProjectLeadTemplate,
  "agile-scrum": AgileScrumTemplate,
  "agileflow-developer": AgileflowDeveloperTemplate,
  "algo-engineer": AlgoEngineerTemplate,
  "amber-executive": AmberExecutiveTemplate,
  "analyst": AnalystTemplate,
  "angular-modern-universal": AngularModernUniversalTemplate,
  "angular-specialist": AngularSpecialistTemplate,
  "animation-artist": AnimationArtistTemplate,
  "ansible-automation": AnsibleAutomationTemplate,
  "apigateway-architect": ApigatewayArchitectTemplate,
  "architect-registered": ArchitectRegisteredTemplate,
  "art-director-modern": ArtDirectorModernTemplate,
  "art-director-pro": ArtDirectorProTemplate,
  "art-station-artist": ArtStationArtistTemplate,
  "artisan-designer": ArtisanDesignerTemplate,
  "artistic-bold": ArtisticBoldTemplate,
  "artistic-grid": ArtisticGridTemplate,
  "artistic-horizon": ArtisticHorizonTemplate,
  "artistic-momentum": ArtisticMomentumTemplate,
  "artistic-vision": ArtisticVisionTemplate,
  "artstation-pro": ArtstationProTemplate,
  "ascend-graduate": AscendGraduateTemplate,
  "aspire-graduate": AspireGraduateTemplate,
  "asymmetric-creative": AsymmetricCreativeTemplate,
  "asymmetric-layout-universal": AsymmetricLayoutUniversalTemplate,
  "atlas-executive": AtlasExecutiveTemplate,
  "attorney-professional": AttorneyProfessionalTemplate,
  "audit-expert": AuditExpertTemplate,
  "auditor": AuditorTemplate,
  "aurora-minimal": AuroraMinimalTemplate,
  "automation-engineer": AutomationEngineerTemplate,
  "awwwards-designer": AwwwardsDesignerTemplate,
  "azuredevops-pro": AzureDevOpsProTemplate,
  "azuredevops-specialist": AzureDevOpsSpecialistTemplate,
  "azure-professional": AzureProfessionalTemplate,
  "backendapi-specialist": BackendAPISpecialistTemplate,
  "backend": BackendTemplate,
  "behance-designer": BehanceDesignerTemplate,
  "behance-portfolio": BehancePortfolioTemplate,
  "biomedical-engineer": BiomedicalEngineerTemplate,
  "bitbucket-developer": BitbucketDeveloperTemplate,
  "blockchain-dev": BlockchainDevTemplate,
  "blockchain-engineer": BlockchainEngineerTemplate,
  "blueprint-design": BlueprintDesignTemplate,
  "boardroom-ready": BoardroomReadyTemplate,
  "bold-headline": BoldHeadlineTemplate,
  "bold-section-headers-universal": BoldSectionHeadersUniversalTemplate,
  "bold-typography": BoldTypographyTemplate,
  "bold-typography-universal": BoldTypographyUniversalTemplate,
  "bootcamp-portfolio": BootcampPortfolioTemplate,
  "bootcamp-success-story": BootcampSuccessStoryTemplate,
  "border-frame-universal": BorderFrameUniversalTemplate,
  "bordered-elegance": BorderedEleganceTemplate,
  "brand-designer-template": BrandDesignerTemplateTemplate,
  "brand-identity": BrandIdentityTemplate,
  "brand-manager-strategic": BrandManagerStrategicTemplate,
  "brand-manager": BrandManagerTemplate,
  "brand-strategist": BrandStrategistTemplate,
  "branded-professional": BrandedProfessionalTemplate,
  "bright-graduate": BrightGraduateTemplate,
  "bronze-corporate": BronzeCorporateTemplate,
  "budget-analyst": BudgetAnalystTemplate,
  "burgundy-executive": BurgundyExecutiveTemplate,
  "business-clean-layout": BusinessCleanLayoutTemplate,
  "business-clear-template": BusinessClearTemplateTemplate,
  "business-development-manager": BusinessDevelopmentManagerTemplate,
  "business-elite": BusinessEliteTemplate,
  "business-graduate": BusinessGraduateTemplate,
  "business-modern-grid": BusinessModernGridTemplate,
  "business-modern": BusinessModernTemplate,
  "business-sidebar-pro": BusinessSidebarProTemplate,
  "business-simple-modern": BusinessSimpleModernTemplate,
  "bytecode-specialist": BytecodeSpecialistTemplate,
  "ceo-profile": CEOProfileTemplate,
  "cicd-pipeline-engineer": CICDPipelineEngineerTemplate,
  "cpa-professional": CPAProfessionalTemplate,
  "c-suite-modern": CSuiteModernTemplate,
  "campus-influencer": CampusInfluencerTemplate,
  "campus-leader": CampusLeaderTemplate,
  "canvas-artist": CanvasArtistTemplate,
  "capstone-showcase": CapstoneShowcaseTemplate,
  "carbonmade-designer": CarbonmadeDesignerTemplate,
  "casestudy-designer": CasestudyDesignerTemplate,
  "catalyst-fresher": CatalystFresherTemplate,
  "certified-public-accountant": CertifiedPublicAccountantTemplate,
  "charcoal-professional": CharcoalProfessionalTemplate,
  "chemical-engineer-pro": ChemicalEngineerProTemplate,
  "chevron-accent-universal": ChevronAccentUniversalTemplate,
  "chromatic-creative": ChromaticCreativeTemplate,
  "circular-elements-universal": CircularElementsUniversalTemplate,
  "civil-engineerpe": CivilEngineerPETemplate,
  "classic-serif-universal": ClassicSerifUniversalTemplate,
  "clean-basic-executive": CleanBasicExecutiveTemplate,
  "clean-corporate-simple": CleanCorporateSimpleTemplate,
  "clean-corporate": CleanCorporateTemplate,
  "clean-modern-universal": CleanModernUniversalTemplate,
  "clean-professional-simple": CleanProfessionalSimpleTemplate,
  "clean-readable-pro": CleanReadableProTemplate,
  "clean-two-column-universal": CleanTwoColumnUniversalTemplate,
  "clinical-excellence": ClinicalExcellenceTemplate,
  "clinical-minimal": ClinicalMinimalTemplate,
  "cloud-architect": CloudArchitectTemplate,
  "cloud-native": CloudNativeTemplate,
  "cloud-solutions-architect": CloudSolutionsArchitectTemplate,
  "cloudnative-architect": CloudnativeArchitectTemplate,
  "clubhouse-moderator": ClubhouseModeratorTemplate,
  "cobalt-professional": CobaltProfessionalTemplate,
  "code-craftsman": CodeCraftsmanTemplate,
  "code-minimal": CodeMinimalTemplate,
  "code-pinnacle": CodePinnacleTemplate,
  "code-snippet": CodeSnippetTemplate,
  "code-sphere": CodeSphereTemplate,
  "code-vision": CodeVisionTemplate,
  "codeforge-developer": CodeforgeDeveloperTemplate,
  "codepen-developer": CodepenDeveloperTemplate,
  "coding-bootcamp-grad": CodingBootcampGradTemplate,
  "coding-challenge-champion": CodingChallengeChampionTemplate,
  "collage-art": CollageArtTemplate,
  "color-block-universal": ColorBlockUniversalTemplate,
  "color-splash": ColorSplashTemplate,
  "colorful-modern": ColorfulModernTemplate,
  "column-divide": ColumnDivideTemplate,
  "community-builder": CommunityBuilderTemplate,
  "compact-elite-universal": CompactEliteUniversalTemplate,
  "compact-professional": CompactProfessionalTemplate,
  "compensation-benefits-manager": CompensationBenefitsManagerTemplate,
  "compile-time-dev": CompileTimeDevTemplate,
  "compliance-officer-legal": ComplianceOfficerLegalTemplate,
  "compliance-officer": ComplianceOfficerTemplate,
  "componentui-designer": ComponentuiDesignerTemplate,
  "composition-artist": CompositionArtistTemplate,
  "concept-creative": ConceptCreativeTemplate,
  "conference-presenter": ConferencePresenterTemplate,
  "connected-graduate": ConnectedGraduateTemplate,
  "connected-leader": ConnectedLeaderTemplate,
  "connected-professional": ConnectedProfessionalTemplate,
  "construction-project-manager": ConstructionProjectManagerTemplate,
  "consultant": ConsultantTemplate,
  "containerops-engineer": ContaineropsEngineerTemplate,
  "contemporary-split": ContemporarySplitTemplate,
  "content-creator": ContentCreatorTemplate,
  "contract-specialist": ContractSpecialistTemplate,
  "conversational-ux": ConversationalUxTemplate,
  "copywriter-creative": CopywriterCreativeTemplate,
  "coral-executive": CoralExecutiveTemplate,
  "corner-accent-universal": CornerAccentUniversalTemplate,
  "coroflot-portfolio": CoroflotPortfolioTemplate,
  "corporate-apex": CorporateApexTemplate,
  "corporate-attorney": CorporateAttorneyTemplate,
  "corporate-blue": CorporateBlueTemplate,
  "corporate-border-frame": CorporateBorderFrameTemplate,
  "corporate-clean": CorporateCleanTemplate,
  "corporate-distinction": CorporateDistinctionTemplate,
  "corporate-easy-layout": CorporateEasyLayoutTemplate,
  "corporate-elite-plus": CorporateElitePlusTemplate,
  "corporate-elite": CorporateEliteTemplate,
  "corporate-excellence": CorporateExcellenceTemplate,
  "corporate-executive": CorporateExecutiveTemplate,
  "corporate-law": CorporateLawTemplate,
  "corporate-legal-counsel": CorporateLegalCounselTemplate,
  "corporate-minimalist-pro": CorporateMinimalistProTemplate,
  "corporate-paradigm": CorporateParadigmTemplate,
  "corporate-premier": CorporatePremierTemplate,
  "corporate-simple-template": CorporateSimpleTemplateTemplate,
  "corporate-sovereign": CorporateSovereignTemplate,
  "corporate-vanguard": CorporateVanguardTemplate,
  "corporate-vision": CorporateVisionTemplate,
  "corporate-visionary": CorporateVisionaryTemplate,
  "cosmos-professional": CosmosProfessionalTemplate,
  "craft-artist": CraftArtistTemplate,
  "creative-accent": CreativeAccentTemplate,
  "creative-canvas": CreativeCanvasTemplate,
  "creative-crafted": CreativeCraftedTemplate,
  "creative-director-elite": CreativeDirectorEliteTemplate,
  "creative-horizon": CreativeHorizonTemplate,
  "creative-pulse": CreativePulseTemplate,
  "creative-showcase-grid": CreativeShowcaseGridTemplate,
  "creative-timeline": CreativeTimelineTemplate,
  "crimson-leadership": CrimsonLeadershipTemplate,
  "crystal-executive": CrystalExecutiveTemplate,
  "curator-creative": CuratorCreativeTemplate,
  "curriculum-developer": CurriculumDeveloperTemplate,
  "customer-success-manager": CustomerSuccessManagerTemplate,
  "cyber-security": CyberSecurityTemplate,
  "cybersecurity-analyst": CybersecurityAnalystTemplate,
  "dark-mode-dev": DarkModeDevTemplate,
  "data-engineer": DataEngineerTemplate,
  "data-science": DataScienceTemplate,
  "data-scientist-pro": DataScientistProTemplate,
  "dental-professional": DentalProfessionalTemplate,
  "design-lead": DesignLeadTemplate,
  "design-leader-portfolio": DesignLeaderPortfolioTemplate,
  "design-maestro": DesignMaestroTemplate,
  "design-pinnacle": DesignPinnacleTemplate,
  "design-school-grad": DesignSchoolGradTemplate,
  "design-sphere": DesignSphereTemplate,
  "design-strategist": DesignStrategistTemplate,
  "design-systems-architect": DesignSystemsArchitectTemplate,
  "design-systems-portfolio": DesignSystemsPortfolioTemplate,
  "designer-showcase": DesignerShowcaseTemplate,
  "designleadership-director": DesignleadershipDirectorTemplate,
  "designops-specialist": DesignopsSpecialistTemplate,
  "designportfolio-specialist": DesignportfolioSpecialistTemplate,
  "designstrategy-lead": DesignstrategyLeadTemplate,
  "designsystem-architect": DesignsystemArchitectTemplate,
  "designthinking-specialist": DesignthinkingSpecialistTemplate,
  "dev-architecture": DevArchitectureTemplate,
  "dev-elite": DevEliteTemplate,
  "dev-momentum": DevMomentumTemplate,
  "devops-automation": DevOpsAutomationTemplate,
  "devops-engineer": DevOpsEngineerTemplate,
  "devops-pro": DevOpsProTemplate,
  "dev-prime": DevPrimeTemplate,
  "devsecops-engineer": DevSecOpsEngineerTemplate,
  "developer-grid": DeveloperGridTemplate,
  "deviant-art-creator": DeviantArtCreatorTemplate,
  "deviantart-artist": DeviantartArtistTemplate,
  "devto-contributor": DevtoContributorTemplate,
  "diamond-accent-universal": DiamondAccentUniversalTemplate,
  "digital-artist-portfolio": DigitalArtistPortfolioTemplate,
  "digital-artist": DigitalArtistTemplate,
  "digital-canvas": DigitalCanvasTemplate,
  "digital-executive": DigitalExecutiveTemplate,
  "digital-graduate": DigitalGraduateTemplate,
  "digital-identity": DigitalIdentityTemplate,
  "digital-marketer": DigitalMarketerTemplate,
  "digital-marketing-pro": DigitalMarketingProTemplate,
  "digital-marketing-specialist": DigitalMarketingSpecialistTemplate,
  "digital-native-grad": DigitalNativeGradTemplate,
  "digital-native-graduate": DigitalNativeGraduateTemplate,
  "digital-portfolio-grad": DigitalPortfolioGradTemplate,
  "digital-professional": DigitalProfessionalTemplate,
  "director-level": DirectorLevelTemplate,
  "diversity-inclusion-manager": DiversityInclusionManagerTemplate,
  "django-framework-pro": DjangoFrameworkProTemplate,
  "django-fullstack": DjangoFullstackTemplate,
  "docker-container-pro": DockerContainerProTemplate,
  "docker-specialist": DockerSpecialistTemplate,
  "dockerhub-publisher": DockerhubPublisherTemplate,
  "dotnet-core-developer": DotNetCoreDeveloperTemplate,
  "dotnet-developer": DotNetDeveloperTemplate,
  "dotted-grid-universal": DottedGridUniversalTemplate,
  "dribbble-creative": DribbbleCreativeTemplate,
  "dribbble-showcase": DribbbleShowcaseTemplate,
  "dual-degree-graduate": DualDegreeGraduateTemplate,
  "esl-teacher-certified": ESLTeacherCertifiedTemplate,
  "eclipse-professional": EclipseProfessionalTemplate,
  "ecommerce-manager": EcommerceManagerTemplate,
  "edgecompute-developer": EdgecomputeDeveloperTemplate,
  "editorial-artist": EditorialArtistTemplate,
  "editorial-style": EditorialStyleTemplate,
  "educator-modern": EducatorModernTemplate,
  "elasticsearch-dev": ElasticsearchDevTemplate,
  "elasticsearch-expert": ElasticsearchExpertTemplate,
  "electrical-engineer": ElectricalEngineerTemplate,
  "elegant-professional": ElegantProfessionalTemplate,
  "elegant-serif": ElegantSerifTemplate,
  "elementary-teacher": ElementaryTeacherTemplate,
  "elevate-fresher": ElevateFresherTemplate,
  "elixir-developer": ElixirDeveloperTemplate,
  "email-marketing-specialist": EmailMarketingSpecialistTemplate,
  "emerald-executive": EmeraldExecutiveTemplate,
  "emerge-fresher": EmergeFresherTemplate,
  "employee-relations-specialist": EmployeeRelationsSpecialistTemplate,
  "engineering-fresher": EngineeringFresherTemplate,
  "engineering-manager": EngineeringManagerTemplate,
  "enterprise-leader": EnterpriseLeaderTemplate,
  "entrepreneurial-graduate": EntrepreneurialGraduateTemplate,
  "entry-elite": EntryEliteTemplate,
  "entry-horizon": EntryHorizonTemplate,
  "entry-sphere": EntrySphereTemplate,
  "environmental-engineer": EnvironmentalEngineerTemplate,
  "equity-research-analyst": EquityResearchAnalystTemplate,
  "estimator-cost-analyst": EstimatorCostAnalystTemplate,
  "event-planner-coordinator": EventPlannerCoordinatorTemplate,
  "eventdriven-architect": EventdrivenArchitectTemplate,
  "executive-ascendancy": ExecutiveAscendancyTemplate,
  "executive-authority": ExecutiveAuthorityTemplate,
  "executive-chef": ExecutiveChefTemplate,
  "executive-clean-split": ExecutiveCleanSplitTemplate,
  "executive-corner-accent": ExecutiveCornerAccentTemplate,
  "executive-direct-layout": ExecutiveDirectLayoutTemplate,
  "executive-easy-template": ExecutiveEasyTemplateTemplate,
  "executive-impact": ExecutiveImpactTemplate,
  "executive-leadership": ExecutiveLeadershipTemplate,
  "executive-letterhead-universal": ExecutiveLetterheadUniversalTemplate,
  "executive-magnitude": ExecutiveMagnitudeTemplate,
  "executive-minimal": ExecutiveMinimalTemplate,
  "executive-nexus": ExecutiveNexusTemplate,
  "executive-pinnacle": ExecutivePinnacleTemplate,
  "executive-plain-layout": ExecutivePlainLayoutTemplate,
  "executive-prestige": ExecutivePrestigeTemplate,
  "executive-sales-leader": ExecutiveSalesLeaderTemplate,
  "executive-signature": ExecutiveSignatureTemplate,
  "executive-simple-clean": ExecutiveSimpleCleanTemplate,
  "executive-split-design": ExecutiveSplitDesignTemplate,
  "executive": ExecutiveTemplate,
  "executive-timeline-modern": ExecutiveTimelineModernTemplate,
  "expression-artist": ExpressionArtistTemplate,
  "faang-aspirant": FAANGAspirantTemplate,
  "field-sales-specialist": FieldSalesSpecialistTemplate,
  "figma-designer-portfolio": FigmaDesignerPortfolioTemplate,
  "figma-expert": FigmaExpertTemplate,
  "finance-analyst": FinanceAnalystTemplate,
  "finance-two-column": FinanceTwoColumnTemplate,
  "financial-analystcfa": FinancialAnalystCFATemplate,
  "financial-analyst": FinancialAnalystTemplate,
  "financial-controller": FinancialControllerTemplate,
  "flutter-engineer": FlutterEngineerTemplate,
  "flutter-mobile-dev": FlutterMobileDevTemplate,
  "flutterui-specialist": FlutterUISpecialistTemplate,
  "flux-executive": FluxExecutiveTemplate,
  "forensic-accountant": ForensicAccountantTemplate,
  "forest-professional": ForestProfessionalTemplate,
  "foundation-graduate": FoundationGraduateTemplate,
  "framer-designer-portfolio": FramerDesignerPortfolioTemplate,
  "framer-designer": FramerDesignerTemplate,
  "fresher-academic-style": FresherAcademicStyleTemplate,
  "fresher-achievement": FresherAchievementTemplate,
  "fresher-bold-header": FresherBoldHeaderTemplate,
  "fresher-box-shadow": FresherBoxShadowTemplate,
  "fresher-card-based": FresherCardBasedTemplate,
  "fresher-centered-elegant": FresherCenteredElegantTemplate,
  "fresher-circular-progress": FresherCircularProgressTemplate,
  "fresher-clean-modern": FresherCleanModernTemplate,
  "fresher-color-accent": FresherColorAccentTemplate,
  "fresher-compact-pro": FresherCompactProTemplate,
  "fresher-creative-edge": FresherCreativeEdgeTemplate,
  "fresher-dark-professional": FresherDarkProfessionalTemplate,
  "fresher-dash-border": FresherDashBorderTemplate,
  "fresher-double-column": FresherDoubleColumnTemplate,
  "fresher-elegant-sidebar": FresherElegantSidebarTemplate,
  "fresher-elite": FresherEliteTemplate,
  "fresher-executive-style": FresherExecutiveStyleTemplate,
  "fresher-geometric": FresherGeometricTemplate,
  "fresher-glassmorphism": FresherGlassmorphismTemplate,
  "fresher-gradient-border": FresherGradientBorderTemplate,
  "fresher-iconography": FresherIconographyTemplate,
  "fresher-left-stripe": FresherLeftStripeTemplate,
  "fresher-lightweight": FresherLightweightTemplate,
  "fresher-minimal-grid": FresherMinimalGridTemplate,
  "fresher-minimalist-two-column": FresherMinimalistTwoColumnTemplate,
  "fresher-modern-classic": FresherModernClassicTemplate,
  "fresher-modern-split": FresherModernSplitTemplate,
  "fresher-modern-tabs": FresherModernTabsTemplate,
  "fresher-modern-two-column": FresherModernTwoColumnTemplate,
  "fresher-neon-accent": FresherNeonAccentTemplate,
  "fresher-polaroid-style": FresherPolaroidStyleTemplate,
  "fresher-professional-grid": FresherProfessionalGridTemplate,
  "fresher-professional-minimal": FresherProfessionalMinimalTemplate,
  "fresher-professional-sidebar": FresherProfessionalSidebarTemplate,
  "fresher-progressive": FresherProgressiveTemplate,
  "fresher-ribbon-style": FresherRibbonStyleTemplate,
  "fresher-skills-first": FresherSkillsFirstTemplate,
  "fresher-split-layout": FresherSplitLayoutTemplate,
  "fresher-step-by-step": FresherStepByStepTemplate,
  "fresher-tech-modern": FresherTechModernTemplate,
  "fresher-tech-split": FresherTechSplitTemplate,
  "fresher": FresherTemplate,
  "fresher-timeline-dots": FresherTimelineDotsTemplate,
  "fresher-timeline": FresherTimelineTemplate,
  "fresher-top-bottom": FresherTopBottomTemplate,
  "fresher-two-tone": FresherTwoToneTemplate,
  "fresher-wave-header": FresherWaveHeaderTemplate,
  "freshers-crafted": FreshersCraftedTemplate,
  "freshers-vision": FreshersVisionTemplate,
  "frontend-architect": FrontendArchitectTemplate,
  "frontend": FrontendTemplate,
  "full-stack-engineer": FullStackEngineerTemplate,
  "full-stack-modern": FullStackModernTemplate,
  "full-stack-pro": FullStackProTemplate,
  "fullstack-java-script": FullstackJavaScriptTemplate,
  "fullstack": FullstackTemplate,
  "gcparchitect": GCPArchitectTemplate,
  "gcp-cloud-engineer": GCPCloudEngineerTemplate,
  "g-r-p-c-developer": GRPCDeveloperTemplate,
  "gallery-layout": GalleryLayoutTemplate,
  "gen-z-graduate": GenZGraduateTemplate,
  "general-contractor": GeneralContractorTemplate,
  "genesis-graduate": GenesisGraduateTemplate,
  "geometric-creative": GeometricCreativeTemplate,
  "geometric-shapes-universal": GeometricShapesUniversalTemplate,
  "github-developer": GitHubDeveloperTemplate,
  "github-profile": GitHubProfileTemplate,
  "github-student-developer": GitHubStudentDeveloperTemplate,
  "github-style": GitHubStyleTemplate,
  "gitflow-engineer": GitflowEngineerTemplate,
  "github-portfolio-dev": GithubPortfolioDevTemplate,
  "github-student": GithubStudentTemplate,
  "gitlab-developer": GitlabDeveloperTemplate,
  "global-enterprise": GlobalEnterpriseTemplate,
  "global-executive-pro": GlobalExecutiveProTemplate,
  "global-leadership": GlobalLeadershipTemplate,
  "global-networker": GlobalNetworkerTemplate,
  "go-developer": GoDeveloperTemplate,
  "golang-backend-engineer": GolangBackendEngineerTemplate,
  "gold-prestige": GoldPrestigeTemplate,
  "gradient-header-universal": GradientHeaderUniversalTemplate,
  "graduate-innovator": GraduateInnovatorTemplate,
  "graduate-momentum": GraduateMomentumTemplate,
  "graduate-prime": GraduatePrimeTemplate,
  "graduate": GraduateTemplate,
  "graduate-zenith": GraduateZenithTemplate,
  "graphql-architect": GraphQLArchitectTemplate,
  "graphql-developer": GraphQLDeveloperTemplate,
  "graphdb-specialist": GraphdbSpecialistTemplate,
  "graphic-design-pro": GraphicDesignProTemplate,
  "growth-marketing-manager": GrowthMarketingManagerTemplate,
  "hr-analytics-manager": HRAnalyticsManagerTemplate,
  "hr-business-partner": HRBusinessPartnerTemplate,
  "h-v-a-c-engineer": HVACEngineerTemplate,
  "hackathon-graduate": HackathonGraduateTemplate,
  "hackathon-winner": HackathonWinnerTemplate,
  "hackernews-developer": HackernewsDeveloperTemplate,
  "hackerrank-expert": HackerrankExpertTemplate,
  "harmony-executive": HarmonyExecutiveTemplate,
  "headless-c-m-s-developer": HeadlessCMSDeveloperTemplate,
  "healthcare-administrator": HealthcareAdministratorTemplate,
  "healthcare-professional": HealthcareProfessionalTemplate,
  "healthcare-two-column": HealthcareTwoColumnTemplate,
  "hexagonal-pattern-universal": HexagonalPatternUniversalTemplate,
  "high-school-teacher": HighSchoolTeacherTemplate,
  "honors-student": HonorsStudentTemplate,
  "horizon-graduate": HorizonGraduateTemplate,
  "hospitality-director": HospitalityDirectorTemplate,
  "hotel-manager-operations": HotelManagerOperationsTemplate,
  "icon-bar-universal": IconBarUniversalTemplate,
  "illustration-portfolio": IllustrationPortfolioTemplate,
  "illustrator-artist": IllustratorArtistTemplate,
  "imaginative-designer": ImaginativeDesignerTemplate,
  "impression-designer": ImpressionDesignerTemplate,
  "in-vision-prototyper": InVisionPrototyperTemplate,
  "indigo-executive": IndigoExecutiveTemplate,
  "industrial-engineer": IndustrialEngineerTemplate,
  "infinity-loop-universal": InfinityLoopUniversalTemplate,
  "influencer-professional": InfluencerProfessionalTemplate,
  "information-architect": InformationArchitectTemplate,
  "ink-brush": InkBrushTemplate,
  "inside-sales-representative": InsideSalesRepresentativeTemplate,
  "instagram-creative": InstagramCreativeTemplate,
  "instagram-influencer": InstagramInfluencerTemplate,
  "instructional-designer": InstructionalDesignerTemplate,
  "intellectual-property-attorney": IntellectualPropertyAttorneyTemplate,
  "interaction-designer": InteractionDesignerTemplate,
  "interactive-portfolio-designer": InteractivePortfolioDesignerTemplate,
  "interface-master": InterfaceMasterTemplate,
  "internal-auditor": InternalAuditorTemplate,
  "internship-ready": InternshipReadyTemplate,
  "internship-showcase": InternshipShowcaseTemplate,
  "investment-banker": InvestmentBankerTemplate,
  "jamstack-developer": JAMStackDeveloperTemplate,
  "jade-professional": JadeProfessionalTemplate,
  "java-developer": JavaDeveloperTemplate,
  "java-enterprise-template": JavaEnterpriseTemplateTemplate,
  "jenkinscicd": JenkinsCICDTemplate,
  "json-resume": JsonResumeTemplate,
  "kafka-streaming-expert": KafkaStreamingExpertTemplate,
  "kafka-streaming": KafkaStreamingTemplate,
  "kaggle-data-scientist": KaggleDataScientistTemplate,
  "keystone-graduate": KeystoneGraduateTemplate,
  "kotlin-android-dev": KotlinAndroidDevTemplate,
  "kubernete-engineer": KuberneteEngineerTemplate,
  "kubernetes-specialist": KubernetesSpecialistTemplate,
  "laravel-artisan": LaravelArtisanTemplate,
  "launchpad-graduate": LaunchpadGraduateTemplate,
  "lavender-executive": LavenderExecutiveTemplate,
  "layered-cards-universal": LayeredCardsUniversalTemplate,
  "lead-backend-engineer": LeadBackendEngineerTemplate,
  "lead-frontend-engineer": LeadFrontendEngineerTemplate,
  "leadership-summit": LeadershipSummitTemplate,
  "leadership-zenith": LeadershipZenithTemplate,
  "learning-development-manager": LearningDevelopmentManagerTemplate,
  "leetcode-champion": LeetcodeChampionTemplate,
  "legal-advisor": LegalAdvisorTemplate,
  "legal-consultant": LegalConsultantTemplate,
  "legal-counsel": LegalCounselTemplate,
  "legal-executive": LegalExecutiveTemplate,
  "legal-operations-manager": LegalOperationsManagerTemplate,
  "liberal-arts-graduate": LiberalArtsGraduateTemplate,
  "linkedin-ready-graduate": LinkedInReadyGraduateTemplate,
  "linkedin-tech-pro": LinkedInTechProTemplate,
  "linkedin-graduate": LinkedinGraduateTemplate,
  "linkedin-optimized": LinkedinOptimizedTemplate,
  "linkedin-tech-expert": LinkedinTechExpertTemplate,
  "litigation-attorney": LitigationAttorneyTemplate,
  "logistics-coordinator": LogisticsCoordinatorTemplate,
  "luxury-timeline": LuxuryTimelineTemplate,
  "ml-engineer": MLEngineerTemplate,
  "machine-learning-engineer": MachineLearningEngineerTemplate,
  "magazine-creative": MagazineCreativeTemplate,
  "magazine-layout-universal": MagazineLayoutUniversalTemplate,
  "manufacturing-engineer": ManufacturingEngineerTemplate,
  "marketing-analytics-manager": MarketingAnalyticsManagerTemplate,
  "marketing-professional": MarketingProfessionalTemplate,
  "marketing-strategist": MarketingStrategistTemplate,
  "marvel-app-designer": MarvelAppDesignerTemplate,
  "masters-graduate": MastersGraduateTemplate,
  "mechanical-engineer-pro": MechanicalEngineerProTemplate,
  "medical-assistant": MedicalAssistantTemplate,
  "medical-certification": MedicalCertificationTemplate,
  "medical-executive": MedicalExecutiveTemplate,
  "medical-professional": MedicalProfessionalTemplate,
  "medical-research": MedicalResearchTemplate,
  "medical-technologist": MedicalTechnologistTemplate,
  "medium-tech-writer": MediumTechWriterTemplate,
  "medium-writer-creative": MediumWriterCreativeTemplate,
  "medium-writer": MediumWriterTemplate,
  "mental-health-counselor": MentalHealthCounselorTemplate,
  "meridian-corporate": MeridianCorporateTemplate,
  "microarch-engineer": MicroarchEngineerTemplate,
  "microinteraction-designer": MicrointeractionDesignerTemplate,
  "microservices-dev": MicroservicesDevTemplate,
  "microservices-expert": MicroservicesExpertTemplate,
  "milestone-graduate": MilestoneGraduateTemplate,
  "minimal-chic": MinimalChicTemplate,
  "minimal-corporate-pro": MinimalCorporateProTemplate,
  "minimal-direct-template": MinimalDirectTemplateTemplate,
  "minimal-elegance-universal": MinimalEleganceUniversalTemplate,
  "minimal-lines-universal": MinimalLinesUniversalTemplate,
  "minimal-pro-layout": MinimalProLayoutTemplate,
  "minimal": MinimalTemplate,
  "minimalist-modern-pro": MinimalistModernProTemplate,
  "minimalist-pro-simple": MinimalistProSimpleTemplate,
  "minimalist-pro": MinimalistProTemplate,
  "mint-professional": MintProfessionalTemplate,
  "mlops-engineer": MlopsEngineerTemplate,
  "mobile-dev": MobileDevTemplate,
  "mobile-developer": MobileDeveloperTemplate,
  "mobile-first-designer": MobileFirstDesignerTemplate,
  "modern-artist": ModernArtistTemplate,
  "modern-business": ModernBusinessTemplate,
  "modern-clear-pro": ModernClearProTemplate,
  "modern-corporate-grid": ModernCorporateGridTemplate,
  "modern-digital": ModernDigitalTemplate,
  "modern-educator-profession": ModernEducatorProfessionTemplate,
  "modern-minimalist-universal": ModernMinimalistUniversalTemplate,
  "modern-plain-pro": ModernPlainProTemplate,
  "modern-professional-box": ModernProfessionalBoxTemplate,
  "modern-professional": ModernProfessionalTemplate,
  "modern-simple-pro": ModernSimpleProTemplate,
  "modern": ModernTemplate,
  "momentum-fresher": MomentumFresherTemplate,
  "mongodb-specialist": MongoDBSpecialistTemplate,
  "monospace-tech": MonospaceTechTemplate,
  "motion-designer-portfolio": MotionDesignerPortfolioTemplate,
  "motion-designer": MotionDesignerTemplate,
  "motion-graphics-artist": MotionGraphicsArtistTemplate,
  "motion-ui-designer": MotionUiDesignerTemplate,
  "multi-platform-artist": MultiPlatformArtistTemplate,
  "multimedia-designer": MultimediaDesignerTemplate,
  "muse-creative": MuseCreativeTemplate,
  "narrative-creative": NarrativeCreativeTemplate,
  "navy-corporate": NavyCorporateTemplate,
  "neon-artist": NeonArtistTemplate,
  "nestjs-backend": NestJSBackendTemplate,
  "networked-executive": NetworkedExecutiveTemplate,
  "networked-graduate": NetworkedGraduateTemplate,
  "neural-engineer": NeuralEngineerTemplate,
  "newspaper-style-universal": NewspaperStyleUniversalTemplate,
  "nextjs-fullstack": NextJSFullstackTemplate,
  "nextstep-fresher": NextstepFresherTemplate,
  "nexus-elite": NexusEliteTemplate,
  "node-backend-specialist": NodeBackendSpecialistTemplate,
  "nodejs-developer": NodeJSDeveloperTemplate,
  "npm-package-author": NpmPackageAuthorTemplate,
  "nurse-specialist": NurseSpecialistTemplate,
  "nursing-specialist": NursingSpecialistTemplate,
  "nutritionist-dietitian": NutritionistDietitianTemplate,
  "observability-engineer": ObservabilityEngineerTemplate,
  "obsidian-executive": ObsidianExecutiveTemplate,
  "occupational-therapist": OccupationalTherapistTemplate,
  "online-course-instructor": OnlineCourseInstructorTemplate,
  "online-gallery-artist": OnlineGalleryArtistTemplate,
  "online-identity": OnlineIdentityTemplate,
  "online-portfolio-fresher": OnlinePortfolioFresherTemplate,
  "online-presence-fresher": OnlinePresenceFresherTemplate,
  "online-professional": OnlineProfessionalTemplate,
  "onyx-leadership": OnyxLeadershipTemplate,
  "open-source-contributor": OpenSourceContributorTemplate,
  "open-source": OpenSourceTemplate,
  "opensource-developer": OpensourceDeveloperTemplate,
  "operations-excellence": OperationsExcellenceTemplate,
  "operations-manager": OperationsManagerTemplate,
  "operations-two-column": OperationsTwoColumnTemplate,
  "organizational-development": OrganizationalDevelopmentTemplate,
  "p-m-executive": PMExecutiveTemplate,
  "palette-designer": PaletteDesignerTemplate,
  "paralegal-certified": ParalegalCertifiedTemplate,
  "paralegal": ParalegalTemplate,
  "parallax-style-universal": ParallaxStyleUniversalTemplate,
  "paramedic-e-m-t": ParamedicEMTTemplate,
  "pastel-creative": PastelCreativeTemplate,
  "pastry-chef": PastryChefTemplate,
  "pathway-graduate": PathwayGraduateTemplate,
  "patreon-creative": PatreonCreativeTemplate,
  "patreon-creator": PatreonCreatorTemplate,
  "petroleum-engineer": PetroleumEngineerTemplate,
  "pewter-minimalist": PewterMinimalistTemplate,
  "phd-candidate": PhDCandidateTemplate,
  "pharmacist-clinical": PharmacistClinicalTemplate,
  "photographer-pro": PhotographerProTemplate,
  "photography-layout": PhotographyLayoutTemplate,
  "photography-pro-template": PhotographyProTemplateTemplate,
  "physical-therapist": PhysicalTherapistTemplate,
  "physician-specialist": PhysicianSpecialistTemplate,
  "pinnacle-elite": PinnacleEliteTemplate,
  "pinterest-curator": PinterestCuratorTemplate,
  "pinterest-designer": PinterestDesignerTemplate,
  "pioneer-fresher": PioneerFresherTemplate,
  "pixelcraft-developer": PixelcraftDeveloperTemplate,
  "pixelperfect-designer": PixelperfectDesignerTemplate,
  "platform-engineer": PlatformEngineerTemplate,
  "platform-professional": PlatformProfessionalTemplate,
  "platinum-executive": PlatinumExecutiveTemplate,
  "platinum-prestige": PlatinumPrestigeTemplate,
  "plum-professional": PlumProfessionalTemplate,
  "portfolio-artist": PortfolioArtistTemplate,
  "portfolio-coder": PortfolioCoderTemplate,
  "portfolio-first-graduate": PortfolioFirstGraduateTemplate,
  "portfolio-graduate": PortfolioGraduateTemplate,
  "portfolio-manager": PortfolioManagerTemplate,
  "portfolio-minimalist": PortfolioMinimalistTemplate,
  "portfolio-professional": PortfolioProfessionalTemplate,
  "portfolio-showcase": PortfolioShowcaseTemplate,
  "portfolio-website-creative": PortfolioWebsiteCreativeTemplate,
  "postgresqldba": PostgreSQLDBATemplate,
  "postgresql-expert": PostgreSQLExpertTemplate,
  "potential-fresher": PotentialFresherTemplate,
  "premium-corporate-edge": PremiumCorporateEdgeTemplate,
  "premium-elite": PremiumEliteTemplate,
  "premium-fresher": PremiumFresherTemplate,
  "premium-pro": PremiumProTemplate,
  "premium-universal": PremiumUniversalTemplate,
  "principal-software-engineer": PrincipalSoftwareEngineerTemplate,
  "principle-animator": PrincipleAnimatorTemplate,
  "prism-professional": PrismProfessionalTemplate,
  "private-tutor-specialist": PrivateTutorSpecialistTemplate,
  "process-improvement": ProcessImprovementTemplate,
  "procurement-specialist": ProcurementSpecialistTemplate,
  "product-designer-pro": ProductDesignerProTemplate,
  "product-designer-showcase": ProductDesignerShowcaseTemplate,
  "product-designerux": ProductDesignerUXTemplate,
  "product-marketing-manager": ProductMarketingManagerTemplate,
  "professional-accent-bar": ProfessionalAccentBarTemplate,
  "professional-basic-modern": ProfessionalBasicModernTemplate,
  "professional-classic": ProfessionalClassicTemplate,
  "professional-clean-simple": ProfessionalCleanSimpleTemplate,
  "professional-compact-universal": ProfessionalCompactUniversalTemplate,
  "professional-divider": ProfessionalDividerTemplate,
  "professional-easy-read": ProfessionalEasyReadTemplate,
  "professional-grid": ProfessionalGridTemplate,
  "professional-header-banner": ProfessionalHeaderBannerTemplate,
  "professional-modern-edge": ProfessionalModernEdgeTemplate,
  "professional-plain-simple": ProfessionalPlainSimpleTemplate,
  "professional-readable-layout": ProfessionalReadableLayoutTemplate,
  "professional-straightforward": ProfessionalStraightforwardTemplate,
  "professional": ProfessionalTemplate,
  "professional-timeline": ProfessionalTimelineTemplate,
  "professional-vertical-line": ProfessionalVerticalLineTemplate,
  "profile-centric": ProfileCentricTemplate,
  "profile-driven-grad": ProfileDrivenGradTemplate,
  "project-managerpmp": ProjectManagerPMPTemplate,
  "project-manager-pro": ProjectManagerProTemplate,
  "project-showcase-grad": ProjectShowcaseGradTemplate,
  "property-manager-commercial": PropertyManagerCommercialTemplate,
  "protfolio-showcase-ux": ProtfolioShowcaseUxTemplate,
  "prototype-specialist": PrototypeSpecialistTemplate,
  "py-torch-developer": PyTorchDeveloperTemplate,
  "pypi-contributor": PypiContributorTemplate,
  "python-developer-pro": PythonDeveloperProTemplate,
  "python-developer": PythonDeveloperTemplate,
  "pythonml-engineer": PythonMLEngineerTemplate,
  "qa-automation-engineer": QAAutomationEngineerTemplate,
  "quality-assurance-engineer": QualityAssuranceEngineerTemplate,
  "quantum-coder": QuantumCoderTemplate,
  "quantum-professional": QuantumProfessionalTemplate,
  "rabbit-m-q-specialist": RabbitMQSpecialistTemplate,
  "radiance-corporate": RadianceCorporateTemplate,
  "radiology-technician": RadiologyTechnicianTemplate,
  "rails-developer": RailsDeveloperTemplate,
  "react-developer": ReactDeveloperTemplate,
  "react-frontend-pro": ReactFrontendProTemplate,
  "react-native-dev": ReactNativeDevTemplate,
  "react-native-developer": ReactNativeDeveloperTemplate,
  "react-native-expert": ReactNativeExpertTemplate,
  "real-estate-appraiser": RealEstateAppraiserTemplate,
  "real-estate-broker": RealEstateBrokerTemplate,
  "redis-cache-specialist": RedisCacheSpecialistTemplate,
  "redis-engineer": RedisEngineerTemplate,
  "refined": RefinedTemplate,
  "registered-nurse-pro": RegisteredNurseProTemplate,
  "remote-work-ready": RemoteWorkReadyTemplate,
  "research-graduate": ResearchGraduateTemplate,
  "research-publication-grad": ResearchPublicationGradTemplate,
  "responsive-ux": ResponsiveUxTemplate,
  "restaurant-manager": RestaurantManagerTemplate,
  "retro-professional-universal": RetroProfessionalUniversalTemplate,
  "risk-management-analyst": RiskManagementAnalystTemplate,
  "robotics-engineer": RoboticsEngineerTemplate,
  "rose-professional": RoseProfessionalTemplate,
  "rounded-corners-universal": RoundedCornersUniversalTemplate,
  "ruby-corporate": RubyCorporateTemplate,
  "rust-developer-pro": RustDeveloperProTemplate,
  "rust-systems-engineer": RustSystemsEngineerTemplate,
  "s-e-o-specialist-pro": SEOSpecialistProTemplate,
  "stem-graduate": STEMGraduateTemplate,
  "sales-achievement": SalesAchievementTemplate,
  "sales-executive-pro": SalesExecutiveProTemplate,
  "sales-executive": SalesExecutiveTemplate,
  "sales-manager": SalesManagerTemplate,
  "sales-marketing-hybrid": SalesMarketingHybridTemplate,
  "sapphire-executive": SapphireExecutiveTemplate,
  "sapphire-professional": SapphireProfessionalTemplate,
  "scala-backend-engineer": ScalaBackendEngineerTemplate,
  "scala-engineer": ScalaEngineerTemplate,
  "scholarship-graduate": ScholarshipGraduateTemplate,
  "security-engineer": SecurityEngineerTemplate,
  "senior-backend": SeniorBackendTemplate,
  "seniordevops-engineer": SeniorDevOpsEngineerTemplate,
  "seniordotnet-developer": SeniorDotNetDeveloperTemplate,
  "senior-executive-pro": SeniorExecutiveProTemplate,
  "senior-frontend": SeniorFrontendTemplate,
  "senior-full-stack-developer": SeniorFullStackDeveloperTemplate,
  "senior-java-developer": SeniorJavaDeveloperTemplate,
  "senior-mobile-engineer": SeniorMobileEngineerTemplate,
  "senior": SeniorTemplate,
  "serenity-minimal": SerenityMinimalTemplate,
  "serverless-developer": ServerlessDeveloperTemplate,
  "serverless-specialist": ServerlessSpecialistTemplate,
  "service-designer": ServiceDesignerTemplate,
  "servicedesign-specialist": ServicedesignSpecialistTemplate,
  "sidebar-accent": SidebarAccentTemplate,
  "simple-business-clean": SimpleBusinessCleanTemplate,
  "simple-clear-business": SimpleClearBusinessTemplate,
  "simple-executive-layout": SimpleExecutiveLayoutTemplate,
  "simple-modern-executive": SimpleModernExecutiveTemplate,
  "simple-professional-clean": SimpleProfessionalCleanTemplate,
  "simple-structured-template": SimpleStructuredTemplateTemplate,
  "site-reliability-engineer": SiteReliabilityEngineerTemplate,
  "sketch-expert-portfolio": SketchExpertPortfolioTemplate,
  "sketch-specialist": SketchSpecialistTemplate,
  "sky-modern": SkyModernTemplate,
  "slate-minimalist": SlateMinimalistTemplate,
  "social-creative-influencer": SocialCreativeInfluencerTemplate,
  "social-executive": SocialExecutiveTemplate,
  "social-first-fresher": SocialFirstFresherTemplate,
  "social-graduate": SocialGraduateTemplate,
  "social-media-creative": SocialMediaCreativeTemplate,
  "social-media-pro": SocialMediaProTemplate,
  "social-media-savvy-grad": SocialMediaSavvyGradTemplate,
  "social-savvy": SocialSavvyTemplate,
  "software-craftsman": SoftwareCraftsmanTemplate,
  "software-master": SoftwareMasterTemplate,
  "software": SoftwareTemplate,
  "software-vision": SoftwareVisionTemplate,
  "solidity-developer": SolidityDeveloperTemplate,
  "solutions-architect": SolutionsArchitectTemplate,
  "sommelier-wine-specialist": SommelierWineSpecialistTemplate,
  "sound-cloud-producer": SoundCloudProducerTemplate,
  "soundcloud-artist": SoundcloudArtistTemplate,
  "spark-fresher": SparkFresherTemplate,
  "special-education-teacher": SpecialEducationTeacherTemplate,
  "spectrum-professional": SpectrumProfessionalTemplate,
  "speech-pathologist": SpeechPathologistTemplate,
  "split-pane-universal": SplitPaneUniversalTemplate,
  "spotify-artist": SpotifyArtistTemplate,
  "spotify-musician": SpotifyMusicianTemplate,
  "spotlight-header-universal": SpotlightHeaderUniversalTemplate,
  "spring-boot-developer": SpringBootDeveloperTemplate,
  "stack-overflow-inspired": StackOverflowInspiredTemplate,
  "stacked-sections-universal": StackedSectionsUniversalTemplate,
  "stackmaster-fullstack": StackmasterFullstackTemplate,
  "stackoverflow-dev": StackoverflowDevTemplate,
  "staff-engineer": StaffEngineerTemplate,
  "starter": StarterTemplate,
  "startup-intern": StartupInternTemplate,
  "steel-professional": SteelProfessionalTemplate,
  "sterling-executive": SterlingExecutiveTemplate,
  "strategic-executive-plus": StrategicExecutivePlusTemplate,
  "strategic-leader": StrategicLeaderTemplate,
  "strategic-leadership": StrategicLeadershipTemplate,
  "striped-background-universal": StripedBackgroundUniversalTemplate,
  "structural-engineer": StructuralEngineerTemplate,
  "student-athlete": StudentAthleteTemplate,
  "student-developer-portfolio": StudentDeveloperPortfolioTemplate,
  "student-educator": StudentEducatorTemplate,
  "student-engagement": StudentEngagementTemplate,
  "studio-artist": StudioArtistTemplate,
  "study-abroad-graduate": StudyAbroadGraduateTemplate,
  "substack-author": SubstackAuthorTemplate,
  "substack-writer": SubstackWriterTemplate,
  "supply-chain-manager": SupplyChainManagerTemplate,
  "svelte-developer": SvelteDeveloperTemplate,
  "swift-i-o-s-developer": SwiftIOSDeveloperTemplate,
  "swiss-style-universal": SwissStyleUniversalTemplate,
  "system-architect": SystemArchitectTemplate,
  "talent-acquisition-specialist": TalentAcquisitionSpecialistTemplate,
  "tangerine-modern": TangerineModernTemplate,
  "tax-specialist-pro": TaxSpecialistProTemplate,
  "tax-specialist": TaxSpecialistTemplate,
  "teacher-professional": TeacherProfessionalTemplate,
  "teaching-certified": TeachingCertifiedTemplate,
  "teaching-excellence": TeachingExcellenceTemplate,
  "teal-modern": TealModernTemplate,
  "tech-blogger-dev": TechBloggerDevTemplate,
  "tech-blogger-graduate": TechBloggerGraduateTemplate,
  "tech-crafted": TechCraftedTemplate,
  "tech-grid": TechGridTemplate,
  "tech-horizon": TechHorizonTemplate,
  "tech-lead": TechLeadTemplate,
  "tech-pioneer": TechPioneerTemplate,
  "tech-savvy-fresher": TechSavvyFresherTemplate,
  "tech-stack-pro": TechStackProTemplate,
  "tech-vanguard": TechVanguardTemplate,
  "tensor-flowml-engineer": TensorFlowMLEngineerTemplate,
  "terminal-console": TerminalConsoleTemplate,
  "terminal-theme": TerminalThemeTemplate,
  "terraformdevops": TerraformDevOpsTemplate,
  "thin-border-universal": ThinBorderUniversalTemplate,
  "three-d-modeling-artist": ThreeDModelingArtistTemplate,
  "tiktok-creator": TikTokCreatorTemplate,
  "tiktok-content-creator": TiktokContentCreatorTemplate,
  "titan-corporate": TitanCorporateTemplate,
  "top-bar-universal": TopBarUniversalTemplate,
  "treasury-analyst": TreasuryAnalystTemplate,
  "triangular-elements-universal": TriangularElementsUniversalTemplate,
  "twitch-streamer-creative": TwitchStreamerCreativeTemplate,
  "twitch-streamer": TwitchStreamerTemplate,
  "twitter-dev": TwitterDevTemplate,
  "two-tone-classic": TwoToneClassicTemplate,
  "two-tone-split-universal": TwoToneSplitUniversalTemplate,
  "type-script-expert": TypeScriptExpertTemplate,
  "typewriter-style": TypewriterStyleTemplate,
  "typographer-specialist": TypographerSpecialistTemplate,
  "ui-specialist": UISpecialistTemplate,
  "uiux-designer-pro": UIUXDesignerProTemplate,
  "ux-researcher": UXResearcherTemplate,
  "uiux-portfolio-pro": UiuxPortfolioProTemplate,
  "unity-game-developer": UnityGameDeveloperTemplate,
  "university-professor": UniversityProfessorTemplate,
  "urban-designer": UrbanDesignerTemplate,
  "userflow-designer": UserflowDesignerTemplate,
  "userresearch-specialist": UserresearchSpecialistTemplate,
  "ux-researcher-portfolio": UxResearcherPortfolioTemplate,
  "uxfolio-designer": UxfolioDesignerTemplate,
  "vp-executive": VPExecutiveTemplate,
  "velocity-executive": VelocityExecutiveTemplate,
  "venture-fresher": VentureFresherTemplate,
  "vertex-professional": VertexProfessionalTemplate,
  "veterinary-doctor": VeterinaryDoctorTemplate,
  "vibrant-designer": VibrantDesignerTemplate,
  "video-editor-creative": VideoEditorCreativeTemplate,
  "video-producer": VideoProducerTemplate,
  "vimeo-videographer": VimeoVideographerTemplate,
  "vintage-poster": VintagePosterTemplate,
  "violet-corporate": VioletCorporateTemplate,
  "vision-designer": VisionDesignerTemplate,
  "visionary-creative": VisionaryCreativeTemplate,
  "visual-designer-pro": VisualDesignerProTemplate,
  "visual-designer-showcase": VisualDesignerShowcaseTemplate,
  "visual-storyteller-template": VisualStorytellerTemplateTemplate,
  "volunteer-leader": VolunteerLeaderTemplate,
  "vuejs-developer": VueJSDeveloperTemplate,
  "vue-master": VueMasterTemplate,
  "vue-specialist": VueSpecialistTemplate,
  "watermark-style-universal": WatermarkStyleUniversalTemplate,
  "wave-pattern-universal": WavePatternUniversalTemplate,
  "web-assembly-engineer": WebAssemblyEngineerTemplate,
  "web-designer-modern": WebDesignerModernTemplate,
  "web-portfolio-grad": WebPortfolioGradTemplate,
  "webflow-designer-portfolio": WebflowDesignerPortfolioTemplate,
  "webflow-developer": WebflowDeveloperTemplate,
  "webpresence-executive": WebpresenceExecutiveTemplate,
  "webrtc-engineer": WebrtcEngineerTemplate,
  "wide-margin-universal": WideMarginUniversalTemplate,
  "wireframe-specialist": WireframeSpecialistTemplate,
  "youtube-educator": YouTubeEducatorTemplate,
  "youtube-creator": YoutubeCreatorTemplate,
  "youtube-dev-educator": YoutubeDevEducatorTemplate,
  "zenith-corporate": ZenithCorporateTemplate,
  "zeplin-handoff-specialist": ZeplinHandoffSpecialistTemplate,
  "zigzag-border-universal": ZigzagBorderUniversalTemplate,
  "ios-swift-engineer": iOSSwiftEngineerTemplate,
};

export const TemplatePreview = memo<TemplatePreviewProps>(({
  templateId,
  themeColor = "#2563eb",
  sampleData,
  className = "",
}) => {
  const Template = templates[templateId as keyof typeof templates] || ProfessionalTemplate;
  const resumeData = sampleData || getTemplateSpecificData(templateId);
  const [previewData, setPreviewData] = useState(resumeData);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full origin-top-left"
          style={{
            transform: 'scale(0.35)',
            width: '285.7%',
            minHeight: '285.7%'
          }}
        >
          <InlineEditProvider resumeData={previewData} setResumeData={setPreviewData}>
            <Template resumeData={previewData} themeColor={themeColor} editable={false} />
          </InlineEditProvider>
        </div>
      </div>
    </div>
  );
});

TemplatePreview.displayName = "TemplatePreview";
