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
import { generatePDFFromPreview } from "@/lib/pdfGenerator";
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

  // PDF download using Netlify Function + Puppeteer
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
      await generatePDFFromPreview("resume-preview", filename);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resume. Please try again.");
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
            </div>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} templateId={templateId} />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-32 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="space-y-4 rounded-2xl border border-border/50 bg-background px-4 py-5 shadow-sm sm:px-6 sm:py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Live Preview</h2>
              </div>
              <div id="resume-preview" className="border-2 border-border rounded-xl overflow-hidden shadow-premium bg-white" style={{ width: '210mm', minHeight: '297mm', maxWidth: '100%' }}>
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
