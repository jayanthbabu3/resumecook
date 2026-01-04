import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Sparkles,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { getAllTemplates } from '../config/templates';
import { getFresherTemplates } from '../templates';
import { TemplatePreviewV2 } from '@/v2/components/TemplatePreviewV2';
import { FavoriteButton } from "@/components/FavoriteButton";

const DashboardV2 = () => {
  const navigate = useNavigate();
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

        {/* Quick Actions - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 max-w-3xl mx-auto">
          {/* Custom Resume Card - Commented out */}
          {/* <button
            onClick={() => navigate("/builder/scratch-v2/select-layout")}
            className="group relative flex flex-col p-5 bg-white rounded-2xl border border-gray-200/80 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Start from Scratch
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-gray-500 pl-16">
              Build a fully customized layout with complete control over sections
            </p>
          </button> */}

          {/* Universal Templates Card - Blue Theme */}
          <button
            onClick={() => navigate("/templates/all")}
            className="group relative flex flex-col p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/60 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/15 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    Universal Templates
                  </h3>
                  <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2.5 rounded-full bg-blue-500 text-white text-sm font-bold shadow-sm">
                    {universalTemplateCount}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-gray-600 pl-[72px]">
              Professional designs for all industries and experience levels
            </p>
          </button>

          {/* Fresher Templates Card - Green Theme */}
          <button
            onClick={() => navigate("/templates/fresher")}
            className="group relative flex flex-col p-6 bg-gradient-to-br from-emerald-50 to-green-100/50 rounded-2xl border border-emerald-200/60 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/15 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">
                    Fresher Templates
                  </h3>
                  <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2.5 rounded-full bg-emerald-500 text-white text-sm font-bold shadow-sm">
                    {fresherTemplateCount}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-gray-600 pl-[72px]">
              Perfect for fresh graduates and entry-level candidates
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
    </div>
  );
};

export { DashboardV2 };
export default DashboardV2;
