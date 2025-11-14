import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowLeft, Edit3, FileEdit, Save } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { resumeService } from "@/lib/firestore/resumeService";
import type { ResumeData as NewResumeData, ResumeSection, SectionType, SectionData } from "@/types/resume";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { pdf } from "@react-pdf/renderer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { LiveEditorSidebar } from "@/components/resume/LiveEditorSidebar";
import { SECTION_DEFAULT_TITLES } from "@/constants/helperSections";
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

// Templates that support inline editing - updated to include Professional
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
  "fresher-achievement"
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
};

// Helper function to create empty data for a section type
function getEmptyDataForType(type: SectionType): SectionData {
  switch (type) {
    case 'summary':
      return { type: 'summary', content: '' };
    case 'experience':
      return { type: 'experience', items: [] };
    case 'education':
      return { type: 'education', items: [] };
    case 'skills':
      return { type: 'skills', items: [] };
    case 'certifications':
      return { type: 'certifications', items: [] };
    case 'languages':
      return { type: 'languages', items: [] };
    case 'projects':
      return { type: 'projects', items: [] };
    case 'awards':
      return { type: 'awards', items: [] };
    case 'publications':
      return { type: 'publications', items: [] };
    case 'volunteer':
      return { type: 'volunteer', items: [] };
    case 'speaking':
      return { type: 'speaking', items: [] };
    case 'patents':
      return { type: 'patents', items: [] };
    case 'portfolio':
      return { type: 'portfolio', items: [] };
    case 'custom':
      return { type: 'custom', content: '' };
    default:
      return { type: 'custom', content: '' };
  }
}

const LiveEditor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const { user } = useFirebaseAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    getTemplateDefaults(templateId || "professional")
  );
  const [themeColor, setThemeColor] = useState("#7c3aed");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [editorMode, setEditorMode] = useState<"live" | "form">("live");
  const [isSaving, setIsSaving] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Handle adding a section from the sidebar
  const handleAddSection = useCallback((type: SectionType) => {
    const newSection: ResumeSection = {
      id: `section-${Date.now()}`,
      type,
      order: (resumeData.dynamicSections || []).length,
      enabled: true,
      title: SECTION_DEFAULT_TITLES[type],
      data: getEmptyDataForType(type),
    };

    setResumeData(prev => ({
      ...prev,
      dynamicSections: [...(prev.dynamicSections || []), newSection]
    }));

    toast.success(`${SECTION_DEFAULT_TITLES[type]} added to your resume`);
  }, [resumeData.dynamicSections]);

  // Handle drag end event
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active } = event;

    // Check if dragging from library
    const activeData = active.data.current;
    if (activeData?.source === 'library') {
      const sectionType = activeData.type as SectionType;
      handleAddSection(sectionType);
    }
  }, [handleAddSection]);

  // Get list of section types already added (to disable in sidebar)
  const addedSectionTypes = (resumeData.dynamicSections || [])
    .filter((s: ResumeSection) => s.type !== 'custom') // Allow multiple custom sections
    .map((s: ResumeSection) => s.type);

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

  const handleSwitchToFormEditor = () => {
    navigate(`/editor/${templateId}`);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex h-screen flex-col bg-gradient-to-br from-background via-muted/5 to-background">
        <Header />

        {/* Sidebar for helper sections */}
        <LiveEditorSidebar
          onAddSection={handleAddSection}
          disabledSections={addedSectionTypes}
        />
      
      <div className="border-b bg-card/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
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
                onClick={() => navigate("/dashboard")}
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

      <div className="flex-1 overflow-auto p-4 md:p-8 md:pr-[22rem]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
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
                <div className="p-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-yellow-800">
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
    </DndContext>
  );
};

export default LiveEditor;
