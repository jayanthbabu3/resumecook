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
  "agile-scrum", "operations-two-column"
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
          {/* Breadcrumbs - Show on desktop */}
          <div className="hidden md:block mb-3">
            <Breadcrumbs />
          </div>

          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(backPath)}
                  className="hover:bg-accent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="border-l border-border h-6" />
                <div>
                  <h1 className="text-lg font-semibold text-primary">Live Editor</h1>
                  <p className="text-xs text-muted-foreground">Click to edit</p>
                </div>
              </div>
            </div>
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
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backPath)}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="border-l border-border h-8" />
              <div>
                <h1 className="text-lg font-semibold text-primary">Live Editor</h1>
                <p className="text-xs text-muted-foreground">Click any field to edit directly</p>
              </div>
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
