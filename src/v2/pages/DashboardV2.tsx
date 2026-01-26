import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  Linkedin,
  FileUp,
  Target,
  Bot,
  LayoutTemplate,
  MousePointerClick,
  FileText,
  Download,
  Crown,
  Mic,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { getAllTemplates } from '../config/templates';
import { LinkedInImportModal } from '@/v2/components/LinkedInImportModal';
import { ResumeUploadModal } from '@/v2/components/ResumeUploadModal';
import { TemplateSelectorModal } from '@/v2/components/TemplateSelectorModal';
import { JobTailorModal } from '@/v2/components/JobTailorModal';
import { AuthModal } from '@/components/AuthModal';
import { ProFeatureModal } from '@/v2/components/ProFeatureModal';
import { ChatWithResumeIntroModal } from '@/v2/components/ChatWithResumeIntroModal';
import { DashboardTour } from '@/v2/components/DashboardTour';
import { TrialBanner } from '@/components/TrialBanner';
// import { ATSCheckerModal } from '@/v2/components/ATSCheckerModal'; // Hidden for refinement
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscriptionNew';
import type { V2ResumeData } from '../types';

interface TailorAnalysis {
  matchScore: number;
  keywordsFound: string[];
  keywordsMissing: string[];
  keywordsAdded: string[];
  summaryEnhanced: boolean;
  experienceEnhanced: boolean;
  roleAlignment?: string;
}

const DashboardV2 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPro } = useSubscription();
  const [linkedInModalOpen, setLinkedInModalOpen] = useState(false);
  const [resumeUploadModalOpen, setResumeUploadModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [templateSelectorOpen, setTemplateSelectorOpen] = useState(false);
  const [jobTailorModalOpen, setJobTailorModalOpen] = useState(false);
  const [pendingResumeData, setPendingResumeData] = useState<V2ResumeData | null>(null);
  const [pendingTailorAnalysis, setPendingTailorAnalysis] = useState<TailorAnalysis | null>(null);
  // Pro Feature Modal state
  const [proModalOpen, setProModalOpen] = useState(false);
  const [proModalFeature, setProModalFeature] = useState({ name: '', description: '' });
  // Chat with Resume Intro Modal state
  const [chatIntroModalOpen, setChatIntroModalOpen] = useState(false);
  // Editor mode template selector state
  const [editorTemplateSelectorOpen, setEditorTemplateSelectorOpen] = useState(false);
  const [pendingEditorMode, setPendingEditorMode] = useState<'live' | 'form' | null>(null);
  // ATS Checker Modal state - Hidden for refinement
  // const [atsCheckerOpen, setAtsCheckerOpen] = useState(false);

  const v2Templates = getAllTemplates();
  const totalTemplates = v2Templates.length;

  const handleLinkedInClick = () => {
    if (!user || !isPro) {
      setProModalFeature({
        name: 'LinkedIn Import',
        description: 'Import your professional profile instantly',
      });
      setProModalOpen(true);
    } else {
      setLinkedInModalOpen(true);
    }
  };

  const handleResumeUploadClick = () => {
    if (!user || !isPro) {
      setProModalFeature({
        name: 'Resume Upload',
        description: 'Parse existing PDF/DOCX files with smart AI',
      });
      setProModalOpen(true);
    } else {
      setResumeUploadModalOpen(true);
    }
  };

  const handleJobTailorClick = () => {
    if (!user || !isPro) {
      setProModalFeature({
        name: 'Match to Job',
        description: 'Optimize your resume to match any job description with AI',
      });
      setProModalOpen(true);
    } else {
      setJobTailorModalOpen(true);
    }
  };

  const handleChatWithResumeClick = () => {
    if (!user || !isPro) {
      setProModalFeature({
        name: 'Chat with Resume',
        description: 'Just tell AI about yourself and watch your resume build in real-time',
      });
      setProModalOpen(true);
    } else {
      // Show intro modal with template selection
      setChatIntroModalOpen(true);
    }
  };

  // ATS Checker handler - Hidden for refinement
  // const handleATSCheckerClick = () => {
  //   if (!user || !isPro) {
  //     setProModalFeature({
  //       name: 'ATS Resume Checker',
  //       description: 'Test your resume against real ATS systems and get optimization tips',
  //     });
  //     setProModalOpen(true);
  //   } else {
  //     setAtsCheckerOpen(true);
  //   }
  // };

  const handleMockInterviewClick = () => {
    if (!user || !isPro) {
      setProModalFeature({
        name: 'AI Mock Interview',
        description: 'Practice interviews with AI-generated questions based on your resume',
      });
      setProModalOpen(true);
    } else {
      // Navigate to builder with mock interview feature flag
      // User needs to have a resume open to use mock interview
      navigate('/builder?feature=interview');
    }
  };

  // Handle template selection from chat intro modal
  const handleChatTemplateSelect = (templateId: string) => {
    setChatIntroModalOpen(false);
    // Navigate to builder with chat mode and selected template
    navigate(`/builder?mode=chat&template=${templateId}`);
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    setLinkedInModalOpen(true);
  };

  // Handle successful resume upload - store data and show template selector
  const handleResumeUploadSuccess = (data: V2ResumeData) => {
    // Store parsed resume data temporarily
    setPendingResumeData(data);

    // Close upload modal and show template selector
    setResumeUploadModalOpen(false);
    setTemplateSelectorOpen(true);
  };

  // Handle template selection after resume upload
  const handleTemplateSelect = (templateId: string) => {
    if (pendingResumeData) {
      // Store parsed resume data in sessionStorage
      const jsonData = JSON.stringify(pendingResumeData);
      sessionStorage.setItem('resume-upload-data', jsonData);

      // Navigate to builder with selected template
      navigate(`/builder?template=${templateId}&source=upload`);

      // Clear pending data
      setPendingResumeData(null);
    }
  };

  // Handle job tailor completion - show template selector
  const handleJobTailorComplete = (data: V2ResumeData, analysis: TailorAnalysis) => {
    setPendingResumeData(data);
    setPendingTailorAnalysis(analysis);
    setJobTailorModalOpen(false);
    setTemplateSelectorOpen(true);
  };

  // Handle Live Editor card click
  const handleLiveEditorClick = () => {
    setPendingEditorMode('live');
    setEditorTemplateSelectorOpen(true);
  };

  // Handle Form Editor card click
  const handleFormEditorClick = () => {
    setPendingEditorMode('form');
    setEditorTemplateSelectorOpen(true);
  };

  // Handle Export & Customize card click - goes to live mode with download highlight
  const handleExportCustomizeClick = () => {
    // Go directly to a popular template with live mode and highlight download
    navigate('/builder?template=executive-split-v2&editor=live&highlight=download');
  };

  // Handle template selection for editor mode
  const handleEditorTemplateSelect = (templateId: string) => {
    setEditorTemplateSelectorOpen(false);
    if (pendingEditorMode === 'form') {
      navigate(`/builder?template=${templateId}&editor=form`);
    } else if (pendingEditorMode === 'live') {
      navigate(`/builder?template=${templateId}&editor=live`);
    } else {
      navigate(`/builder?template=${templateId}`);
    }
    setPendingEditorMode(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      <Header />

      {/* Trial Banner - Full width */}
      <TrialBanner variant="compact" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* FREE SECTION */}
        <div className="mb-10 sm:mb-14" data-tour="free-section">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Free Features</h2>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              No Credit Card Required
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* All Templates */}
            <button
              onClick={() => navigate("/templates")}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="all-templates"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">FREE</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4">
                  <LayoutTemplate className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">All {totalTemplates} Templates</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Access every professional and fresher template for free
                </p>
                <div className="flex items-center gap-1 text-primary font-medium text-sm">
                  <span>Browse Templates</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Live Editor */}
            <button
              onClick={handleLiveEditorClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="live-editor"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">FREE</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-4">
                  <MousePointerClick className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">Live Editor</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Edit your resume in real-time with instant visual preview
                </p>
                <div className="flex items-center gap-1 text-primary font-medium text-sm">
                  <span>Start Editing</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Form Editor */}
            <button
              onClick={handleFormEditorClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="form-editor"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">FREE</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">Form Editor</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Step-by-step guided form to build your resume section by section
                </p>
                <div className="flex items-center gap-1 text-primary font-medium text-sm">
                  <span>Start Building</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* PDF Export & More */}
            <button
              onClick={handleExportCustomizeClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="export-customize"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">FREE</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">Export & Customize</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Download as PDF, customize colors, fonts, and spacing
                </p>
                <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                  <span>Create Resume</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* PRO SECTION */}
        <div className="mb-10 sm:mb-12" data-tour="pro-section">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Pro Features</h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-gradient-to-r from-slate-100 to-gray-100 px-3 py-1 rounded-full">
              <Crown className="w-3.5 h-3.5" />
              AI-Powered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Chat with Resume */}
            <button
              onClick={handleChatWithResumeClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="chat-resume"
            >
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  <Sparkles className="w-2.5 h-2.5" />
                  NEW
                </span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">Chat with Resume</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Tell AI about yourself, watch your resume build live
                </p>
                <div className="flex items-center gap-1 text-primary font-medium text-sm">
                  <span>Start Chatting</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Upload Resume */}
            <button
              onClick={handleResumeUploadClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="upload-resume"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">PRO</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-4">
                  <FileUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">Upload Resume</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Import your existing resume, AI fills in everything
                </p>
                <div className="flex items-center gap-1 text-primary font-medium text-sm">
                  <span>Upload Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Tailor for Job */}
            <button
              onClick={handleJobTailorClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="tailor-job"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">PRO</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">Match to Job</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Paste a job post, AI tailors your resume to fit perfectly
                </p>
                <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                  <span>Match Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Import LinkedIn */}
            <button
              onClick={handleLinkedInClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="linkedin-import"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">PRO</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0077B5] to-[#0A66C2] flex items-center justify-center mb-4">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">Import from LinkedIn</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Connect LinkedIn, get a ready resume in seconds
                </p>
                <div className="flex items-center gap-1 text-[#0077B5] font-medium text-sm">
                  <span>Import Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* AI Mock Interview */}
            <button
              onClick={handleMockInterviewClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="mock-interview"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">PRO</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">AI Mock Interview</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Practice with AI questions based on your resume
                </p>
                <div className="flex items-center gap-1 text-indigo-600 font-medium text-sm">
                  <span>Practice Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

{/* ATS Resume Checker - Hidden for refinement */}
            {/* TODO: Re-enable when ATS checker is refined
            <button
              onClick={handleATSCheckerClick}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
              data-tour="ats-checker"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">PRO</span>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4">
                  <ScanSearch className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">ATS Resume Checker</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Test your resume against ATS systems, get keyword analysis
                </p>
                <div className="flex items-center gap-1 text-teal-600 font-medium text-sm">
                  <span>Check Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
            */}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="sm"
            className="gap-1.5 px-4 h-9 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90"
            onClick={() => navigate("/templates")}
          >
            Start Building Free
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 px-4 h-9 text-sm font-medium rounded-lg"
            onClick={() => navigate("/pricing")}
          >
            <Crown className="w-4 h-4 text-slate-500" />
            View Pro Plans
          </Button>
        </div>
      </main>

      {/* LinkedIn Import Modal */}
      <LinkedInImportModal
        open={linkedInModalOpen}
        onOpenChange={setLinkedInModalOpen}
      />

      {/* Resume Upload Modal */}
      <ResumeUploadModal
        isOpen={resumeUploadModalOpen}
        onClose={() => setResumeUploadModalOpen(false)}
        onSuccess={handleResumeUploadSuccess}
        themeColor="#3b82f6"
      />

      {/* Auth Modal - Shows when user tries to use LinkedIn import without being logged in */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={handleAuthSuccess}
      />

      {/* Template Selector Modal - Shows after resume upload */}
      <TemplateSelectorModal
        isOpen={templateSelectorOpen}
        onClose={() => {
          setTemplateSelectorOpen(false);
          setPendingResumeData(null);
          setPendingTailorAnalysis(null);
        }}
        onSelect={handleTemplateSelect}
        themeColor="#3b82f6"
      />

      {/* Job Tailor Modal - Tailor resume for job description */}
      <JobTailorModal
        isOpen={jobTailorModalOpen}
        onClose={() => setJobTailorModalOpen(false)}
        onComplete={handleJobTailorComplete}
        themeColor="#3b82f6"
      />

      {/* Pro Feature Modal - Shows for non-logged-in or non-Pro users */}
      <ProFeatureModal
        isOpen={proModalOpen}
        onClose={() => setProModalOpen(false)}
        featureName={proModalFeature.name}
        featureDescription={proModalFeature.description}
      />

      {/* Chat with Resume Intro Modal */}
      <ChatWithResumeIntroModal
        isOpen={chatIntroModalOpen}
        onClose={() => setChatIntroModalOpen(false)}
        onSelectTemplate={handleChatTemplateSelect}
      />

      {/* Editor Mode Template Selector Modal */}
      <TemplateSelectorModal
        isOpen={editorTemplateSelectorOpen}
        onClose={() => {
          setEditorTemplateSelectorOpen(false);
          setPendingEditorMode(null);
        }}
        onSelect={handleEditorTemplateSelect}
        themeColor="#3b82f6"
      />

      {/* Dashboard Tour */}
      <DashboardTour />

{/* ATS Checker Modal - Hidden for refinement */}
      {/* TODO: Re-enable when ATS checker is refined
      <ATSCheckerModal
        isOpen={atsCheckerOpen}
        onClose={() => setAtsCheckerOpen(false)}
      />
      */}
    </div>
  );
};

export { DashboardV2 };
export default DashboardV2;
