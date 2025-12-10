import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowLeft, Edit3, FileEdit, Save, Plus, Settings2, Eye } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { resumeService } from "@/lib/firestore/resumeService";
import { FavoriteButton } from "@/components/FavoriteButton";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePDFFromPreview } from "@/lib/pdfGenerator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getTemplateDefaults, type ResumeData, sanitizeResumeData } from "@/lib/resumeUtils";
import { useResumeData } from "@/contexts/ResumeDataContext";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { StyleOptionsProvider } from "@/contexts/StyleOptionsContext";
import { StyleOptionsPanel } from "@/components/StyleOptionsPanel";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { ATSScoreButton } from "@/components/ATSScoreButton";
import type { AtsReport } from "@/lib/atsAnalyzer";
import { ProfessionalTemplate } from "@/components/resume/templates/ProfessionalTemplate";
import { ModernTemplate } from "@/components/resume/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/resume/templates/MinimalTemplate";
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
import { RefinedTemplate } from "@/components/resume/templates/RefinedTemplate";
import { PremiumEliteTemplate } from "@/components/resume/templates/PremiumEliteTemplate";
import { SeniorBackendTemplate } from "@/components/resume/templates/SeniorBackendTemplate";
import { CreativeAccentTemplate } from "@/components/resume/templates/CreativeAccentTemplate";
import { BoldHeadlineTemplate } from "@/components/resume/templates/BoldHeadlineTemplate";
import { ElegantSerifTemplate } from "@/components/resume/templates/ElegantSerifTemplate";
import { TechGridTemplate } from "@/components/resume/templates/TechGridTemplate";
import { ContemporarySplitTemplate } from "@/components/resume/templates/ContemporarySplitTemplate";
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
// Education & Teaching Templates
// Finance & Accounting Templates
// Sales & Marketing Templates
// Legal & Consulting Templates
// Operations & Project Management Templates
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
// Senior/Lead Software Engineering Templates
import { SeniorJavaDeveloperTemplate } from "@/components/resume/templates/SeniorJavaDeveloperTemplate";
import { LeadBackendEngineerTemplate } from "@/components/resume/templates/LeadBackendEngineerTemplate";
import { LeadFrontendEngineerTemplate } from "@/components/resume/templates/LeadFrontendEngineerTemplate";
import { PrincipalSoftwareEngineerTemplate } from "@/components/resume/templates/PrincipalSoftwareEngineerTemplate";
import { StaffEngineerTemplate } from "@/components/resume/templates/StaffEngineerTemplate";
import { EngineeringManagerTemplate } from "@/components/resume/templates/EngineeringManagerTemplate";
import { SolutionsArchitectTemplate } from "@/components/resume/templates/SolutionsArchitectTemplate";
import { SeniorMobileEngineerTemplate } from "@/components/resume/templates/SeniorMobileEngineerTemplate";
import { PlatformEngineerTemplate } from "@/components/resume/templates/PlatformEngineerTemplate";
import { SiteReliabilityEngineerTemplate } from "@/components/resume/templates/SiteReliabilityEngineerTemplate";
import { FrontendArchitectTemplate } from "@/components/resume/templates/FrontendArchitectTemplate";
// New Universal Professional Templates
import { CorporateBlueTemplate } from "@/components/resume/templates/CorporateBlueTemplate";
import { MinimalistProTemplate } from "@/components/resume/templates/MinimalistProTemplate";
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
import { MLEngineerTemplate } from "@/components/resume/templates/MLEngineerTemplate";
import { SidebarAccentTemplate } from "@/components/resume/templates/SidebarAccentTemplate";
import { TechStackProTemplate } from "@/components/resume/templates/TechStackProTemplate";
import { TerminalThemeTemplate } from "@/components/resume/templates/TerminalThemeTemplate";
import { TwoToneClassicTemplate } from "@/components/resume/templates/TwoToneClassicTemplate";
// 2025 New Templates (100 HTML imports)
// 2025 Batch 2 - Universal Professional Templates (30 templates)
// 2025 Batch 2 - Software & Technology Templates (25 templates)
// 2025 Batch 2 - Fresh Graduates Templates (20 templates)
// 2025 Batch 2 - Creative Templates (15 templates)
// 2025 Batch 2 - Design Templates (10 templates)
// 2025 Batch 3 - Healthcare & Medical Templates (15 templates)
// 2025 Batch 3 - Engineering Templates (15 templates)
// 2025 Batch 3 - Sales & Marketing Templates (15 templates)
// 2025 Batch 3 - Finance & Accounting Templates (12 templates)
// 2025 Batch 3 - Education & Teaching Templates (10 templates)
// 2025 Batch 3 - Legal Templates (8 templates)
// 2025 Batch 3 - Human Resources Templates (8 templates)
// 2025 Batch 3 - Hospitality & Culinary Templates (7 templates)
// 2025 Batch 3 - Real Estate & Construction Templates (7 templates)
// 2025 Batch 3 - Operations & Logistics Templates (3 templates)
import { ArtisticVisionTemplate } from "@/components/resume/templates/ArtisticVisionTemplate";
import { BorderFrameUniversalTemplate } from "@/components/resume/templates/BorderFrameUniversalTemplate";
import { CodeCraftsmanTemplate } from "@/components/resume/templates/CodeCraftsmanTemplate";
import { CreativeCanvasTemplate } from "@/components/resume/templates/CreativeCanvasTemplate";
import { CreativeCraftedTemplate } from "@/components/resume/templates/CreativeCraftedTemplate";
import { CreativeHorizonTemplate } from "@/components/resume/templates/CreativeHorizonTemplate";
import { DesignMaestroTemplate } from "@/components/resume/templates/DesignMaestroTemplate";
import { DesignPinnacleTemplate } from "@/components/resume/templates/DesignPinnacleTemplate";
import { DesignSphereTemplate } from "@/components/resume/templates/DesignSphereTemplate";
import { DevArchitectureTemplate } from "@/components/resume/templates/DevArchitectureTemplate";
import { ExecutiveLetterheadUniversalTemplate } from "@/components/resume/templates/ExecutiveLetterheadUniversalTemplate";
import { GradientHeaderUniversalTemplate } from "@/components/resume/templates/GradientHeaderUniversalTemplate";
import { MagazineCreativeTemplate } from "@/components/resume/templates/MagazineCreativeTemplate";
import { PortfolioShowcaseTemplate } from "@/components/resume/templates/PortfolioShowcaseTemplate";
import { SwissStyleUniversalTemplate } from "@/components/resume/templates/SwissStyleUniversalTemplate";
import { TechPioneerTemplate } from "@/components/resume/templates/TechPioneerTemplate";
const displayTemplates: Record<string, any> = {
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
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
    refined: RefinedTemplate,
  "premium-elite": PremiumEliteTemplate,
    "creative-accent": CreativeAccentTemplate,
  "bold-headline": BoldHeadlineTemplate,
  "elegant-serif": ElegantSerifTemplate,
  "tech-grid": TechGridTemplate,
  "contemporary-split": ContemporarySplitTemplate,
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
            // Education & Teaching
            // Finance & Accounting
            // Sales & Marketing
            // Legal & Consulting
            // Operations & Project Management
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
    // Senior/Lead Software Engineering Templates
  "senior-java-developer": SeniorJavaDeveloperTemplate,
      "lead-backend-engineer": LeadBackendEngineerTemplate,
  "lead-frontend-engineer": LeadFrontendEngineerTemplate,
    "principal-software-engineer": PrincipalSoftwareEngineerTemplate,
  "staff-engineer": StaffEngineerTemplate,
  "engineering-manager": EngineeringManagerTemplate,
  "solutions-architect": SolutionsArchitectTemplate,
  "senior-mobile-engineer": SeniorMobileEngineerTemplate,
  "platform-engineer": PlatformEngineerTemplate,
  "site-reliability-engineer": SiteReliabilityEngineerTemplate,
    "frontend-architect": FrontendArchitectTemplate,
  // New Universal Professional Templates
  "corporate-blue": CorporateBlueTemplate,
  "minimalist-pro": MinimalistProTemplate,
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
      "ml-engineer": MLEngineerTemplate,
  "sidebar-accent": SidebarAccentTemplate,
  "tech-stack-pro": TechStackProTemplate,
  "terminal-theme": TerminalThemeTemplate,
  "two-tone-classic": TwoToneClassicTemplate,
  // 2025 New Templates (100 displayTemplates map entries)
                                                                                                                                                                                                          // 2025 Batch 2 - New Display Templates (100 templates)
                                                                                                                                                                                                          // 2025 Batch 3 - Healthcare & Medical Templates (15 templates)
                                // 2025 Batch 3 - Engineering Templates (15 templates)
                                // 2025 Batch 3 - Sales & Marketing Templates (15 templates)
                                // 2025 Batch 3 - Finance & Accounting Templates (12 templates)
                          // 2025 Batch 3 - Education & Teaching Templates (10 templates)
                      // 2025 Batch 3 - Legal Templates (8 templates)
                  // 2025 Batch 3 - Human Resources Templates (8 templates)
                  // 2025 Batch 3 - Hospitality & Culinary Templates (7 templates)
                // 2025 Batch 3 - Real Estate & Construction Templates (7 templates)
                // 2025 Batch 3 - Operations & Logistics Templates (3 templates)
      
                                        "artistic-vision": ArtisticVisionTemplate,
                                      "border-frame-universal": BorderFrameUniversalTemplate,
                                                                  "code-craftsman": CodeCraftsmanTemplate,
                                                                "creative-canvas": CreativeCanvasTemplate,
  "creative-crafted": CreativeCraftedTemplate,
  "creative-horizon": CreativeHorizonTemplate,
                  "design-maestro": DesignMaestroTemplate,
  "design-pinnacle": DesignPinnacleTemplate,
  "design-sphere": DesignSphereTemplate,
                "dev-architecture": DevArchitectureTemplate,
                                                                                          "executive-letterhead-universal": ExecutiveLetterheadUniversalTemplate,
                                                                                                            "gradient-header-universal": GradientHeaderUniversalTemplate,
                                                                                          "magazine-creative": MagazineCreativeTemplate,
                                                                                                                                                                    "portfolio-showcase": PortfolioShowcaseTemplate,
                                                                                                                                                                        "swiss-style-universal": SwissStyleUniversalTemplate,
                "tech-pioneer": TechPioneerTemplate,
                                                                                                      };

// Templates that support inline editing (all display templates)
const inlineEditableTemplates = Object.keys(displayTemplates);

const LiveEditor = () => {
  const { templateId, professionId } = useParams<{ templateId: string; professionId?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const { user } = useFirebaseAuth();
  const { resumeData, setResumeData, themeColor, setThemeColor, setTemplateId } = useResumeData();

  // Determine back navigation path based on whether we're in a nested route
  const backPath = professionId ? `/dashboard/${professionId}` : "/dashboard";

  // Track if we've initialized this template to prevent infinite loops
  const initializedTemplatesRef = React.useRef<Set<string>>(new Set());
  
  useEffect(() => {
    if (templateId) {
      setTemplateId(templateId);
      
      // If no resumeId is provided, reset to template defaults only once per template
      // This ensures new templates load with their specific default data
      if (!resumeId && !initializedTemplatesRef.current.has(templateId)) {
        const defaultData = getTemplateDefaults(templateId);
        setResumeData(defaultData);
        initializedTemplatesRef.current.add(templateId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId, resumeId]); // Removed setTemplateId and setResumeData from deps to prevent infinite loops
  
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [editorMode, setEditorMode] = useState<"live" | "form">("live");
  const [isSaving, setIsSaving] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);

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
  }, [user, templateId, resumeData, currentResumeId, themeColor]);

  // PDF download using Netlify Function + Puppeteer
  const handleDownloadPDF = useCallback(async () => {
    if (!templateId) return;

    setIsGeneratingPDF(true);
    toast.info("Generating PDF...");

    try {
      const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
      await generatePDFFromPreview("resume-preview", filename);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [templateId, resumeData]);

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

  const addBulletPoint = useCallback((expId: string) => {
    if (!expId) {
      toast.error("Unable to add bullet point: experience item ID is missing");
      return;
    }

    setResumeData((currentData) => {
      const experienceItem = currentData.experience.find(exp => exp.id === expId);
      
      if (!experienceItem) {
        toast.error("Unable to add bullet point: experience item not found");
        return currentData;
      }

      const currentBulletPoints = experienceItem.bulletPoints || [];
      
      const updatedExperience = currentData.experience.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, bulletPoints: [...currentBulletPoints, ""] };
        }
        return exp;
      });

      return {
        ...currentData,
        experience: updatedExperience,
      };
    });
    
    toast.success("Bullet point added");
  }, [setResumeData]);

  const removeBulletPoint = useCallback((expId: string, bulletIndex: number) => {
    setResumeData((currentData) => {
      const updatedExperience = currentData.experience.map((exp) =>
        exp.id === expId 
          ? { 
              ...exp, 
              bulletPoints: exp.bulletPoints?.filter((_, i) => i !== bulletIndex) || []
            }
          : exp
      );
      return {
        ...currentData,
        experience: updatedExperience,
      };
    });
    toast.success("Bullet point removed");
  }, [setResumeData]);

  // Dynamic section management functions
  const addSectionItem = useCallback((sectionType: string, sectionOrder: number) => {
    setResumeData((currentData) => {
      const dynamicSections = currentData.dynamicSections || [];
      const sectionIndex = dynamicSections.findIndex(s => s.order === sectionOrder);
      
      if (sectionIndex === -1) {
        toast.error("Section not found");
        return currentData;
      }

      const updatedSections = [...dynamicSections];
      const section = updatedSections[sectionIndex];

      switch (sectionType) {
        case 'certifications':
          const currentCertifications = (section.data as any).certifications || [];
          const newCertification = {
            id: Date.now().toString(),
            name: "New Certification",
            issuer: "Issuing Organization",
            date: "2024-01",
          };
          (section.data as any).certifications = [...currentCertifications, newCertification];
          break;
        
        default:
          // For basic content sections, add a new line
          const currentContent = section.data.content || '';
          section.data.content = typeof currentContent === 'string' 
            ? currentContent + '\nNew item'
            : [...(Array.isArray(currentContent) ? currentContent : []), 'New item'];
          break;
      }

      return {
        ...currentData,
        dynamicSections: updatedSections,
      };
    });
    toast.success("Item added to section");
  }, [setResumeData]);

  const removeSectionItem = useCallback((sectionType: string, sectionOrder: number, itemIndex: number) => {
    setResumeData((currentData) => {
      const dynamicSections = currentData.dynamicSections || [];
      const sectionIndex = dynamicSections.findIndex(s => s.order === sectionOrder);
      
      if (sectionIndex === -1) {
        toast.error("Section not found");
        return currentData;
      }

      const updatedSections = [...dynamicSections];
      const section = updatedSections[sectionIndex];

      switch (sectionType) {
        case 'certifications':
          const currentCertifications = (section.data as any).certifications || [];
          (section.data as any).certifications = currentCertifications.filter((_: any, i: number) => i !== itemIndex);
          break;
        
        default:
          // For basic content sections, remove the line
          if (typeof section.data.content === 'string') {
            const lines = section.data.content.split('\n');
            lines.splice(itemIndex, 1);
            section.data.content = lines.join('\n');
          } else if (Array.isArray(section.data.content)) {
            section.data.content = section.data.content.filter((_: any, i: number) => i !== itemIndex);
          }
          break;
      }

      return {
        ...currentData,
        dynamicSections: updatedSections,
      };
    });
    toast.success("Item removed from section");
  }, [setResumeData]);

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
                {/* ATS Score Button - Hidden for now
                <ATSScoreButton
                  resumeData={resumeData}
                  templateId={templateId}
                  onScoreCalculated={handleATSScoreCalculated}
                  variant="outline"
                  size="sm"
                />
                */}
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

              {/* ATS Score Button - Hidden for now
              <ATSScoreButton
                resumeData={resumeData}
                templateId={templateId}
                onScoreCalculated={handleATSScoreCalculated}
                variant="outline"
                size="sm"
              />
              */}

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

      <StyleOptionsProvider>
        <div 
          className="flex-1 overflow-auto"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
          }}
        >
          {/* Subtle dot pattern overlay */}
          <div 
            className="min-h-full py-6 md:py-10 px-4"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          >
            <div className="mx-auto flex flex-col gap-5 justify-center items-center max-w-[900px]">
              {/* Live Preview Header */}
              <div 
                className="w-full flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg shadow-gray-200/50" 
                style={{ maxWidth: '210mm' }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-1.5 bg-gradient-to-b from-blue-500 via-blue-600 to-indigo-600 rounded-full shadow-sm" />
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-800 tracking-tight">Live Preview</span>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 w-9 p-0 hover:bg-gray-100 rounded-xl transition-all hover:shadow-sm border border-transparent hover:border-gray-200"
                    >
                      <Settings2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-80 p-0 shadow-xl border-gray-200">
                    <StyleOptionsPanel inPopover={true} />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Resume Preview Container */}
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-blue-300/50 rounded-tl-lg" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-blue-300/50 rounded-tr-lg" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-blue-300/50 rounded-bl-lg" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-blue-300/50 rounded-br-lg" />
                
                <StyleOptionsWrapper>
                  <div 
                    id="resume-preview" 
                    className="bg-white shadow-2xl shadow-gray-300/50 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-gray-200/50"
                    style={{ 
                      width: '210mm', 
                      minHeight: '297mm',
                      maxWidth: '100%',
                    }}
                  >
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
                        <TemplateComponent 
                          resumeData={resumeData} 
                          themeColor={themeColor} 
                          editable={true} 
                          onAddBulletPoint={addBulletPoint}
                          onRemoveBulletPoint={removeBulletPoint}
                          onAddSectionItem={addSectionItem}
                          onRemoveSectionItem={removeSectionItem}
                        />
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
                </StyleOptionsWrapper>
              </div>
            </div>
          </div>
        </div>
      </StyleOptionsProvider>
    </div>
  );
};

export default LiveEditor;
