import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Sparkles,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Linkedin,
  FileUp,
  MessageSquareText,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { getAllTemplates } from '../config/templates';
import { getFresherTemplates } from '../templates';
import { LinkedInImportModal } from '@/v2/components/LinkedInImportModal';
import { ResumeUploadModal } from '@/v2/components/ResumeUploadModal';
import { TemplateSelectorModal } from '@/v2/components/TemplateSelectorModal';
import { JobTailorModal } from '@/v2/components/JobTailorModal';
import { AuthModal } from '@/components/AuthModal';
import { ProFeatureModal } from '@/v2/components/ProFeatureModal';
import { ChatWithResumeIntroModal } from '@/v2/components/ChatWithResumeIntroModal';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useSubscription } from '@/hooks/useSubscription';
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
  const { user } = useFirebaseAuth();
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

  const v2Templates = getAllTemplates();
  const fresherTemplates = getFresherTemplates();
  const universalTemplateCount = v2Templates.length - fresherTemplates.length;
  const fresherTemplateCount = fresherTemplates.length;
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
        name: 'Job Tailoring',
        description: 'Match any job description automatically with AI',
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
        description: 'Build your resume through natural conversation with AI',
      });
      setProModalOpen(true);
    } else {
      // Show intro modal with template selection
      setChatIntroModalOpen(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-gray-50/50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-2">
            Create Your Perfect Resume
          </h1>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Choose from <span className="font-semibold text-primary">{totalTemplates} professional templates</span> designed to land your dream job
          </p>
        </div>

        {/* Templates Section */}
        <div className="mb-6 sm:mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Choose a Template
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Pro Templates */}
            <button
              onClick={() => navigate("/templates?category=professional")}
              className="group relative bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 rounded-xl border border-blue-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-blue-100/50 hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-bl-full" />
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-[15px]">Pro Templates</h3>
                    <span className="inline-flex items-center justify-center min-w-[26px] h-[26px] px-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold shadow-sm">
                      {universalTemplateCount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Premium designs for experienced professionals
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
              </div>
            </button>

            {/* Fresher Templates */}
            <button
              onClick={() => navigate("/templates?category=fresher")}
              className="group relative bg-gradient-to-br from-emerald-50 via-white to-green-50/50 rounded-xl border border-emerald-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-emerald-100/50 hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100/40 to-transparent rounded-bl-full" />
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-200">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-[15px]">Fresher Templates</h3>
                    <span className="inline-flex items-center justify-center min-w-[26px] h-[26px] px-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold shadow-sm">
                      {fresherTemplateCount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Perfect for graduates and entry-level candidates
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* AI Features Section */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <h2 className="text-lg font-semibold text-gray-900">AI-Powered Features</h2>
            <span className="text-xs font-bold text-white bg-gradient-to-r from-primary to-blue-600 px-2.5 py-0.5 rounded-full shadow-sm">
              PRO
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Chat with Resume - Featured */}
            <button
              onClick={handleChatWithResumeClick}
              className="group relative bg-gradient-to-br from-primary/5 via-white to-blue-50/50 rounded-xl border border-primary/20 p-4 sm:p-5 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              <div className="absolute top-0 right-0 z-20">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-gradient-to-r from-primary to-blue-600 px-2 py-1 rounded-bl-lg rounded-tr-xl shadow-sm">
                  <Sparkles className="w-2.5 h-2.5" />
                  NEW
                </span>
              </div>
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20">
                  <MessageSquareText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-[15px] mb-1">Chat with Resume</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Build your resume through natural conversation with AI
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
              </div>
            </button>

            {/* Upload Resume */}
            <button
              onClick={handleResumeUploadClick}
              className="group relative bg-gradient-to-br from-sky-50 via-white to-cyan-50/50 rounded-xl border border-sky-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-sky-100/50 hover:border-sky-200 hover:-translate-y-0.5 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-100/40 to-transparent rounded-bl-full" />
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-200">
                  <FileUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-[15px] mb-1">Upload Resume</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Upload PDF or DOCX and AI extracts your information
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-sky-300 group-hover:text-sky-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
              </div>
            </button>

            {/* Tailor for Job */}
            <button
              onClick={handleJobTailorClick}
              className="group relative bg-gradient-to-br from-amber-50 via-white to-orange-50/50 rounded-xl border border-amber-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-amber-100/50 hover:border-amber-200 hover:-translate-y-0.5 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-bl-full" />
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-200">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-[15px] mb-1">Tailor for Job</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Paste job description and AI optimizes your resume
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
              </div>
            </button>

            {/* Import LinkedIn */}
            <button
              onClick={handleLinkedInClick}
              className="group relative bg-gradient-to-br from-blue-50 via-white to-sky-50/50 rounded-xl border border-blue-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-blue-100/50 hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-bl-full" />
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0077B5] to-[#0A66C2] flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-[15px] mb-1">Import from LinkedIn</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Import your work experience and skills instantly
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Features Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6 sm:mb-10 py-3 px-4 bg-gradient-to-r from-emerald-50 via-white to-blue-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-1.5 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">ATS-Friendly</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">PDF Export</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">Live Preview</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">Easy Customization</span>
          </div>
        </div>

        {/* Browse All Templates CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="gap-2 px-6 h-11 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-200 hover:shadow-lg transition-all"
            onClick={() => navigate("/templates")}
          >
            Browse All {totalTemplates} Templates
            <ArrowRight className="w-4 h-4" />
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
    </div>
  );
};

export { DashboardV2 };
export default DashboardV2;
