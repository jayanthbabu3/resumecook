import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Plus, Trash2 } from "lucide-react";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { toast } from "sonner";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
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
  skills: string[];
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: ""
  },
  experience: [],
  education: [],
  skills: [],
  sections: []
};

const Editor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  // Load from local storage on mount
  useEffect(() => {
    if (templateId) {
      const savedData = localStorage.getItem(`resume-${templateId}`);
      if (savedData) {
        try {
          setResumeData(JSON.parse(savedData));
          toast.success("Previous resume data loaded");
        } catch (error) {
          console.error("Error loading resume data:", error);
        }
      }
    }
  }, [templateId]);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (templateId && resumeData !== defaultResumeData) {
      localStorage.setItem(`resume-${templateId}`, JSON.stringify(resumeData));
    }
  }, [resumeData, templateId]);

  const handleDownload = () => {
    toast.success("Resume downloaded successfully!");
    // PDF generation would be implemented here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground capitalize">
                Template: <span className="font-semibold text-foreground">{templateId}</span>
              </span>
              <Button
                onClick={handleDownload}
                className="gap-2 bg-primary hover:bg-primary-hover"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Editor Layout */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Edit Your Resume</h2>
              <p className="text-muted-foreground">
                Fill in your information and watch your resume update in real-time
              </p>
            </div>
            <ResumeForm 
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Live Preview</h2>
              <div className="border-2 border-border rounded-xl overflow-hidden shadow-premium bg-white">
                <ResumePreview 
                  resumeData={resumeData}
                  templateId={templateId || "professional"}
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
