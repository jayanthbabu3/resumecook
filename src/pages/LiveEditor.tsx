import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowLeft, Edit3, FileEdit, Save } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { firestoreService, ResumeData as FirestoreResumeData } from "@/lib/firestore";
import { toast } from "sonner";
import { Header } from "@/components/Header";
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
};

// Templates that support inline editing - updated to include Professional
const inlineEditableTemplates = [
  "professional", "modern", "senior",
  "minimal", "executive", "frontend", "fullstack",
  "backend", "graduate", "starter", "fresher", "premium-fresher",
  "senior-frontend", "senior-backend", "software", "premium-universal",
  "premium-pro", "fresher-elite", "analyst", "elite", "corporate-executive",
  "refined", "premium-elite"
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
};

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

  useEffect(() => {
    setResumeData(getTemplateDefaults(templateId || "professional"));
  }, [templateId]);

  // Load resume from Firestore if resumeId exists
  useEffect(() => {
    const loadResumeFromFirestore = async () => {
      if (!resumeId || !user) return;

      try {
        const firestoreResume = await firestoreService.getResume(resumeId);
        if (firestoreResume) {
          // Convert Firestore resume data to Editor resume data format
          const editorResumeData: ResumeData = {
            personalInfo: {
              fullName: firestoreResume.personalInfo.fullName,
              email: firestoreResume.personalInfo.email,
              phone: firestoreResume.personalInfo.phone,
              location: firestoreResume.personalInfo.location,
              title: firestoreResume.personalInfo.professionalTitle,
              summary: firestoreResume.personalInfo.bio,
              photo: firestoreResume.personalInfo.profilePhoto,
            },
            experience: firestoreResume.experience.map(exp => ({
              id: exp.id,
              company: exp.company,
              position: exp.position,
              startDate: exp.startDate,
              endDate: exp.endDate,
              description: exp.description,
              current: exp.current,
            })),
            education: firestoreResume.education.map(edu => ({
              id: edu.id,
              school: edu.institution,
              degree: edu.degree,
              field: edu.field,
              startDate: edu.startDate,
              endDate: edu.endDate,
            })),
            skills: firestoreResume.skills.map((skill, index) => ({
              id: skill.id,
              name: skill.name,
              level: 8,
              category: index < 6 ? "core" : "toolbox",
            })),
            sections: [],
          };
          setResumeData(editorResumeData);
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
      // Convert Editor resume data to Firestore format
      const firestoreData: Omit<FirestoreResumeData, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
        templateId,
        personalInfo: {
          fullName: resumeData.personalInfo.fullName,
          email: resumeData.personalInfo.email,
          phone: resumeData.personalInfo.phone,
          location: resumeData.personalInfo.location,
          linkedinUrl: "",
          githubUrl: "",
          portfolioUrl: "",
          professionalTitle: resumeData.personalInfo.title,
          bio: resumeData.personalInfo.summary,
          profilePhoto: resumeData.personalInfo.photo || "",
        },
        experience: resumeData.experience.map(exp => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          location: "",
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          description: exp.description,
        })),
        education: resumeData.education.map(edu => ({
          id: edu.id,
          institution: edu.school,
          degree: edu.degree,
          field: edu.field,
          location: "",
          startDate: edu.startDate,
          endDate: edu.endDate,
          current: false,
          gpa: "",
          description: "",
        })),
        skills: resumeData.skills.map(skill => ({
          id: skill.id,
          name: skill.name,
        })),
        projects: [],
        certifications: [],
        languages: [],
      };

      if (currentResumeId) {
        // Update existing resume
        await firestoreService.updateResume(currentResumeId, firestoreData);
        toast.success("Resume updated successfully!");
      } else {
        // Create new resume
        const newResumeId = await firestoreService.saveResume(user.uid, firestoreData);
        setCurrentResumeId(newResumeId);
        toast.success("Resume saved successfully!");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [user, templateId, resumeData, currentResumeId]);

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
    <div className="flex h-screen flex-col bg-gradient-to-br from-background via-muted/5 to-background">
      <Header />
      
      <div className="border-b bg-card/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Live Editor
                </h1>
                <p className="text-sm text-muted-foreground">
                  Click any field to edit directly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Tabs value={editorMode} onValueChange={(v) => v === "form" && handleSwitchToFormEditor()} className="hidden md:block">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="live" className="gap-2">
                    <Edit3 className="h-4 w-4" />
                    Live Editor
                  </TabsTrigger>
                  <TabsTrigger value="form" className="gap-2">
                    <FileEdit className="h-4 w-4" />
                    Form Editor
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSwitchToFormEditor}
                className="md:hidden"
              >
                <FileEdit className="h-4 w-4 mr-2" />
                Switch to Form
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border">
                <label htmlFor="themeColor" className="text-sm font-medium whitespace-nowrap">
                  Theme:
                </label>
                <input
                  id="themeColor"
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="h-8 w-12 cursor-pointer rounded border border-border"
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving || !user}
                size="default"
                variant="outline"
                className="gap-2 shadow-md"
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
                size="default"
                className="gap-2 shadow-md"
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

      <div className="flex-1 overflow-auto p-4 md:p-8">
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
  );
};

export default LiveEditor;
