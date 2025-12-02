import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { ATSReportDialog } from "./ATSReportDialog";
import type { ResumeData } from "@/types/resume";
import { analyzeResumeForATS, type AtsReport } from "@/lib/atsAnalyzer";

interface ATSScoreButtonProps {
  resumeData: ResumeData;
  templateId?: string;
  onScoreCalculated?: (score: number, report: AtsReport) => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ATSScoreButton({
  resumeData,
  templateId,
  onScoreCalculated,
  variant = "outline",
  size = "default",
  className
}: ATSScoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<AtsReport | null>(null);

  const handleCheckScore = async () => {
    setIsOpen(true);
    setIsAnalyzing(true);
    setReport(null);

    // Simulate loading for 3-4 seconds for better UX
    await new Promise(resolve => setTimeout(resolve, 3500));

    // Analyze resume
    const atsReport = analyzeResumeForATS(resumeData, { templateId });

    setReport(atsReport);
    setIsAnalyzing(false);

    // Notify parent component
    if (onScoreCalculated) {
      onScoreCalculated(atsReport.score, atsReport);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleCheckScore}
        className={className}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Check ATS Score
      </Button>

      <ATSReportDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        report={report}
        isAnalyzing={isAnalyzing}
      />
    </>
  );
}
