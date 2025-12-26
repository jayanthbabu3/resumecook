import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  ChevronRight,
  Sparkles,
  Star,
  TrendingUp,
  GraduationCap,
  Plus,
  ArrowRight,
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
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Section: Create from Scratch (Highlighted) + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          
          {/* Create from Scratch - MAIN CTA - Takes 2 columns */}
          <div
            onClick={() => navigate("/builder/scratch-v2/select-layout")}
            className="lg:col-span-2 group relative bg-gradient-to-br from-primary via-primary to-blue-600 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white/90 mb-0.5">
                    Start Fresh
                  </h2>
                  <p className="text-2xl font-bold text-white">
                    Create Resume from Scratch
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-semibold group-hover:bg-gray-50 transition-colors">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <p className="relative mt-4 text-white/80 text-sm max-w-md">
              Build a custom resume with complete control over layout, sections, and design
            </p>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Templates</p>
                <p className="text-2xl font-bold text-gray-900">{totalTemplates}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Universal</span>
                <span className="font-medium text-gray-900">{universalTemplateCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Fresher</span>
                <span className="font-medium text-gray-900">{fresherTemplateCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Browse by Category */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Browse by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Universal */}
            <div
              onClick={() => navigate("/templates/all")}
              className="group flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 cursor-pointer transition-all duration-200 hover:border-amber-300 hover:shadow-md"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">Universal</span>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-0 text-xs px-1.5 py-0">
                    {universalTemplateCount}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 truncate">All industries</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>

            {/* Fresher */}
            <div
              onClick={() => navigate("/templates/fresher")}
              className="group flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 cursor-pointer transition-all duration-200 hover:border-violet-300 hover:shadow-md"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">Fresher</span>
                  <Badge variant="secondary" className="bg-violet-100 text-violet-700 border-0 text-xs px-1.5 py-0">
                    {fresherTemplateCount}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 truncate">Graduates & entry-level</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>

            {/* Popular */}
            <div
              onClick={() => navigate("/templates/all")}
              className="group flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 cursor-pointer transition-all duration-200 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">Popular</span>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-0 text-xs px-1.5 py-0">
                    Hot
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 truncate">Most used this month</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Featured Templates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Featured Templates
            </h2>
            <button
              onClick={() => navigate("/templates/all")}
              className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 transition-colors"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTemplates.map((template, index) => (
              <div
                key={template.id}
                className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-lg"
                onClick={() => navigate(`/builder?template=${template.id}`)}
              >
                {/* Favorite Button */}
                <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                    <FavoriteButton
                      templateId={template.id}
                      variant="icon"
                      size="sm"
                    />
                  </div>
                </div>

                {/* Template Preview */}
                <div className="relative aspect-[8.5/11] bg-gray-50">
                  <div className="absolute inset-2 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100">
                    <TemplatePreviewV2
                      templateId={template.id}
                      themeColor={template.color}
                      className="h-full"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      className="rounded-lg font-medium shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/builder?template=${template.id}`);
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 truncate">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export { DashboardV2 };
export default DashboardV2;
