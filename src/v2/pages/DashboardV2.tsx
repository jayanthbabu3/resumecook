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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { getAllTemplates } from '../config/templates';
import { getFresherTemplates } from '../templates';
import { TemplatePreviewV2 } from '@/v2/components/TemplatePreviewV2';
import { FavoriteButton } from "@/components/FavoriteButton";
import { LinkedInImportModal } from '@/v2/components/LinkedInImportModal';
import { ResumeUploadModal } from '@/v2/components/ResumeUploadModal';
import { TemplateSelectorModal } from '@/v2/components/TemplateSelectorModal';
import { JobTailorModal } from '@/v2/components/JobTailorModal';
import { AuthModal } from '@/components/AuthModal';
import { ProFeatureModal } from '@/v2/components/ProFeatureModal';
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

  const v2Templates = getAllTemplates();
  const fresherTemplates = getFresherTemplates();
  const universalTemplateCount = v2Templates.length - fresherTemplates.length;
  const fresherTemplateCount = fresherTemplates.length;
  const totalTemplates = v2Templates.length;

  // Featured templates - show first 4 templates
  const defaultColors = ['#2563eb', '#7c3aed', '#059669', '#e11d48'];
  const featuredTemplates = v2Templates.slice(0, 4).map((template, index) => ({
    id: template.id,
    name: template.name,
    description: template.description || 'Professional resume template',
    color: template.colors?.primary || defaultColors[index % defaultColors.length],
  }));

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
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight mb-3">
            Create Your Perfect Resume
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            Choose from <span className="font-semibold text-gray-700">{totalTemplates} industry-ready templates</span> designed to help you land your dream job
          </p>
        </div>

        {/* Quick Actions - Five Column Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10 max-w-5xl mx-auto">
          {/* Pro Templates */}
          <button
            onClick={() => navigate("/templates/all")}
            className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-indigo-500 text-white text-[11px] font-bold shadow-sm">
                {universalTemplateCount}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Pro Templates
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Premium designs for all professional industries.
            </p>
          </button>

          {/* Fresher */}
          <button
            onClick={() => navigate("/templates/fresher")}
            className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-sm">
                {fresherTemplateCount}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Fresher
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Specialized layouts for graduates & entry-level.
            </p>
          </button>

          {/* Import LinkedIn */}
          <button
            onClick={handleLinkedInClick}
            className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all mt-1" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Import LinkedIn
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Auto-fill from your professional profile instantly.
            </p>
          </button>

          {/* Upload Resume */}
          <button
            onClick={handleResumeUploadClick}
            className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-100 to-violet-200 flex items-center justify-center">
                <FileUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                AI
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Upload Resume
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Parse existing PDF/DOCX files with smart AI.
            </p>
          </button>

          {/* Tailor for Job */}
          <button
            onClick={handleJobTailorClick}
            className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-left col-span-2 sm:col-span-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                  AI
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Tailor for Job
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Match any job description automatically.
            </p>
          </button>
        </div>

        {/* Features Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12 py-4 px-6 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>ATS-Friendly</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>PDF Export</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Live Preview</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Easy Customization</span>
          </div>
        </div>

        {/* Featured Templates Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Popular Templates
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Most chosen by professionals this month
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-900 gap-1.5 font-medium"
              onClick={() => navigate("/templates/all")}
            >
              View all {totalTemplates}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredTemplates.map((template) => (
              <div
                key={template.id}
                className="group cursor-pointer"
                onClick={() => {
                  sessionStorage.setItem('template-referrer', '/templates');
                  sessionStorage.setItem('selected-template', template.id);
                  navigate(`/builder?template=${template.id}`);
                }}
              >
                {/* Template Preview Card */}
                <div className="relative bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-300/40 transition-all duration-300 group-hover:-translate-y-1">
                  {/* Favorite Button */}
                  <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-1.5 shadow-md">
                      <FavoriteButton
                        templateId={template.id}
                        variant="icon"
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Preview Container */}
                  <div className="aspect-[8.5/11] relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <div className="absolute inset-2.5 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-200/50">
                      <TemplatePreviewV2
                        templateId={template.id}
                        themeColor={template.color}
                        className="h-full"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-5">
                      <Button
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-gray-50 shadow-xl text-sm font-medium px-5 h-10 rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          sessionStorage.setItem('template-referrer', '/templates');
                          sessionStorage.setItem('selected-template', template.id);
                          navigate(`/builder?template=${template.id}`);
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {template.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Browse All CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col items-center gap-3 p-8 bg-white rounded-3xl border border-gray-200/80 shadow-sm">
            <p className="text-gray-600 text-sm">
              Can't find what you're looking for?
            </p>
            <Button
              size="lg"
              className="gap-2 px-8 h-12 text-base font-medium rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
              onClick={() => navigate("/templates/all")}
            >
              Browse All {totalTemplates} Templates
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
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
        themeColor="#8b5cf6"
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
        themeColor={pendingTailorAnalysis ? "#f59e0b" : "#8b5cf6"}
      />

      {/* Job Tailor Modal - Tailor resume for job description */}
      <JobTailorModal
        isOpen={jobTailorModalOpen}
        onClose={() => setJobTailorModalOpen(false)}
        onComplete={handleJobTailorComplete}
        themeColor="#f59e0b"
      />

      {/* Pro Feature Modal - Shows for non-logged-in or non-Pro users */}
      <ProFeatureModal
        isOpen={proModalOpen}
        onClose={() => setProModalOpen(false)}
        featureName={proModalFeature.name}
        featureDescription={proModalFeature.description}
      />
    </div>
  );
};

export { DashboardV2 };
export default DashboardV2;
