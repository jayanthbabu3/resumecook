import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { generateResumeWithAI, createUserProfileFromAuth } from "@/lib/aiResumeService";
import type { ResumeData } from "@/types/resume";

interface AIResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResumeGenerated: (resumeData: ResumeData) => void;
  userProfile: {
    fullName: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    professionalTitle?: string;
    bio?: string;
  } | null;
  profession?: string;
  templateId?: string;
}

export function AIResumeDialog({
  open,
  onOpenChange,
  onResumeGenerated,
  userProfile,
  profession,
  templateId,
}: AIResumeDialogProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<ResumeData | null>(null);
  const [step, setStep] = useState<"input" | "preview">("input");

  const handleGenerate = async () => {
    if (!userProfile) {
      setError("User profile not found. Please complete your profile first.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const profile = createUserProfileFromAuth(userProfile);
      
      const resumeData = await generateResumeWithAI({
        userProfile: profile,
        jobDescription: jobDescription.trim() || undefined,
        profession: profession,
        templateId: templateId,
      });

      setGeneratedData(resumeData);
      setStep("preview");
    } catch (err) {
      console.error("Failed to generate resume:", err);
      setError(err instanceof Error ? err.message : "Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (generatedData) {
      onResumeGenerated(generatedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setJobDescription("");
    setError(null);
    setGeneratedData(null);
    setStep("input");
    onOpenChange(false);
  };

  const handleBack = () => {
    setStep("input");
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {step === "input" ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <DialogTitle>Generate Resume with AI</DialogTitle>
              </div>
              <DialogDescription>
                Let AI create a professional resume tailored to your profile
                {profession && ` as a ${profession}`}. Optionally, paste a job description for a
                more targeted resume.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* User Profile Info */}
              {userProfile && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Profile loaded:</strong> {userProfile.fullName}
                    {userProfile.professionalTitle && ` • ${userProfile.professionalTitle}`}
                  </AlertDescription>
                </Alert>
              )}

              {/* Job Description Input */}
              <div className="space-y-2">
                <Label htmlFor="jobDescription">
                  Job Description <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here to tailor your resume to specific requirements..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Adding a job description helps AI generate more relevant content with matching
                  keywords and skills.
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} disabled={isGenerating}>
                Cancel
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating || !userProfile}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Resume
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <DialogTitle>Resume Generated Successfully!</DialogTitle>
              </div>
              <DialogDescription>
                Review the AI-generated content below. You can apply it to your resume or go back to
                regenerate.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
              {generatedData && (
                <div className="space-y-4">
                  {/* Personal Info Preview */}
                  <div className="rounded-lg border p-4 space-y-2">
                    <h4 className="font-semibold text-sm">Personal Information</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Name:</strong> {generatedData.personalInfo.fullName}
                      </p>
                      <p>
                        <strong>Title:</strong> {generatedData.personalInfo.title}
                      </p>
                      <p className="text-muted-foreground">
                        {generatedData.personalInfo.summary}
                      </p>
                    </div>
                  </div>

                  {/* Experience Preview */}
                  <div className="rounded-lg border p-4 space-y-2">
                    <h4 className="font-semibold text-sm">
                      Experience ({generatedData.experience.length} entries)
                    </h4>
                    <div className="space-y-3">
                      {generatedData.experience.slice(0, 2).map((exp) => (
                        <div key={exp.id} className="text-sm">
                          <p className="font-medium">
                            {exp.position} at {exp.company}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {exp.startDate} - {exp.endDate}
                          </p>
                          <ul className="list-disc list-inside text-xs text-muted-foreground mt-1">
                            {exp.bulletPoints.slice(0, 2).map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {generatedData.experience.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          + {generatedData.experience.length - 2} more entries
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Skills Preview */}
                  <div className="rounded-lg border p-4 space-y-2">
                    <h4 className="font-semibold text-sm">
                      Skills ({generatedData.skills.length} skills)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedData.skills.slice(0, 10).map((skill) => (
                        <span
                          key={skill.id}
                          className="px-2 py-1 bg-muted rounded-md text-xs"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {generatedData.skills.length > 10 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{generatedData.skills.length - 10} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Education Preview */}
                  <div className="rounded-lg border p-4 space-y-2">
                    <h4 className="font-semibold text-sm">
                      Education ({generatedData.education.length} entries)
                    </h4>
                    <div className="space-y-2">
                      {generatedData.education.map((edu) => (
                        <div key={edu.id} className="text-sm">
                          <p className="font-medium">
                            {edu.degree} in {edu.field}
                          </p>
                          <p className="text-xs text-muted-foreground">{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleApply}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Apply to Resume
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
