import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Target,
  Award,
  AlertTriangle,
  Lightbulb,
  Loader2
} from "lucide-react";
import { type AtsReport } from "@/lib/atsAnalyzer";
import { cn } from "@/lib/utils";

interface ATSReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  report: AtsReport | null;
  isAnalyzing: boolean;
}

export function ATSReportDialog({ isOpen, onClose, report, isAnalyzing }: ATSReportDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col">
        {isAnalyzing ? (
          <AnalyzingLoader />
        ) : report ? (
          <ReportContent report={report} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function AnalyzingLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
        <Sparkles className="w-8 h-8 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Analyzing Your Resume</h3>
        <p className="text-sm text-muted-foreground">
          Checking ATS compatibility, keywords, formatting, and more...
        </p>
      </div>
      <Progress value={75} className="w-64" />
    </div>
  );
}

function ReportContent({ report }: { report: AtsReport }) {
  const gradeColor = {
    excellent: "text-green-600 bg-green-50 border-green-200",
    strong: "text-blue-600 bg-blue-50 border-blue-200",
    good: "text-cyan-600 bg-cyan-50 border-cyan-200",
    fair: "text-amber-600 bg-amber-50 border-amber-200",
    poor: "text-red-600 bg-red-50 border-red-200"
  };

  const gradeIcon = {
    excellent: <Award className="w-5 h-5" />,
    strong: <TrendingUp className="w-5 h-5" />,
    good: <CheckCircle2 className="w-5 h-5" />,
    fair: <AlertCircle className="w-5 h-5" />,
    poor: <XCircle className="w-5 h-5" />
  };

  const scoreColor = report.score >= 8 ? "#10b981" : report.score >= 6.5 ? "#3b82f6" : report.score >= 5 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col max-h-[90vh]">
      <DialogHeader className="px-6 pt-6 pb-4 border-b">
        <DialogTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          ATS Score Report
        </DialogTitle>
        <DialogDescription>
          Comprehensive analysis of your resume's ATS compatibility
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-6 py-6">
          {/* Overall Score Section */}
          <div className="flex items-center justify-between gap-6 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Overall ATS Score</span>
                <Badge className={cn("capitalize", gradeColor[report.grade])}>
                  {gradeIcon[report.grade]}
                  <span className="ml-1">{report.grade}</span>
                </Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold" style={{ color: scoreColor }}>
                  {report.score.toFixed(1)}
                </span>
                <span className="text-2xl text-muted-foreground">/ 10</span>
              </div>
              <p className="text-sm text-muted-foreground">{report.summary}</p>
              {report.detectedRole && (
                <div className="flex items-center gap-2 pt-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Detected Role: <span className="font-medium text-foreground capitalize">{report.detectedRole.replace(/-/g, ' ')}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Circular Score Visualization */}
            <div className="flex-shrink-0">
              <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 60}
                  strokeDashoffset={2 * Math.PI * 60 * (1 - report.score / 10)}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                {/* Percentage text */}
                <text
                  x="70"
                  y="70"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-2xl font-bold transform rotate-90"
                  fill={scoreColor}
                  style={{ transformOrigin: 'center' }}
                >
                  {Math.round((report.score / 10) * 100)}%
                </text>
              </svg>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
            </TabsList>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="space-y-4 mt-4">
              <div className="grid gap-3">
                {report.metrics.map((metric) => (
                  <Card key={metric.id} className={cn(
                    "border-l-4 transition-all hover:shadow-md",
                    metric.passed ? "border-l-green-500" : "border-l-amber-500"
                  )}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-base flex items-center gap-2">
                            {metric.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                            )}
                            {metric.label}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {metric.detail}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold">
                            {metric.score.toFixed(1)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            / {metric.maxScore}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <Progress
                          value={(metric.score / metric.maxScore) * 100}
                          className="h-2"
                        />
                        {metric.recommendation && (
                          <div className="flex gap-2 p-3 bg-amber-50 dark:bg-amber-950 rounded-md border border-amber-200 dark:border-amber-800">
                            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-900 dark:text-amber-100">
                              {metric.recommendation}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Strengths Tab */}
            <TabsContent value="strengths" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-5 h-5" />
                    What's Working Well
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {report.strengths.length > 0 ? (
                    <ul className="space-y-2">
                      {report.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Keep working on your resume to build strengths!
                    </p>
                  )}
                </CardContent>
              </Card>

              {report.criticalIssues.length > 0 && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      Critical Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.criticalIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Improvements Tab */}
            <TabsContent value="improvements" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    Actionable Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {report.improvementTips.length > 0 ? (
                    <ul className="space-y-3">
                      {report.improvementTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8">
                      <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="font-medium text-green-600">
                        Excellent! Your resume is well-optimized.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        No critical improvements needed at this time.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {report.weaknesses.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-amber-600" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Keywords Tab */}
            <TabsContent value="keywords" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Keyword Hits */}
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      Keywords Found ({report.keywordHits.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {report.keywordHits.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {report.keywordHits.map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No relevant keywords detected yet.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Missing Keywords */}
                <Card className="border-amber-200 dark:border-amber-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-600">
                      <AlertCircle className="w-5 h-5" />
                      Missing Keywords ({report.missingKeywords.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {report.missingKeywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {report.missingKeywords.slice(0, 15).map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-600">
                          Great keyword coverage!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Keyword Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tips for Keyword Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Use keywords naturally throughout your experience descriptions</p>
                  <p>• Match keywords from job descriptions you're targeting</p>
                  <p>• Include both acronyms and full terms (e.g., "AI" and "Artificial Intelligence")</p>
                  <p>• Don't stuff keywords - maintain readability and authenticity</p>
                  <p>• Update keywords based on your target role and industry</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
