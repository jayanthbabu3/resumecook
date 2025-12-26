/**
 * Resume Builder V2 - Dashboard Page
 * 
 * Landing page for the new v2 builder with template selection.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { ArrowRight, Sparkles, Layout, Palette, Settings2 } from 'lucide-react';
import { getAllTemplates } from '../config/templates';

export const DashboardV2: React.FC = () => {
  const navigate = useNavigate();
  const templates = getAllTemplates();

  const features = [
    {
      icon: Layout,
      title: 'Config-Driven Templates',
      description: 'Every aspect of the template is configurable - fonts, spacing, colors, layouts.',
    },
    {
      icon: Settings2,
      title: 'Section Management',
      description: 'Add, remove, reorder sections. Customize section titles to match your needs.',
    },
    {
      icon: Palette,
      title: 'Theme Customization',
      description: 'Change colors instantly. All elements update automatically.',
    },
    {
      icon: Sparkles,
      title: 'Industry-Ready Output',
      description: 'Professional, ATS-friendly resumes that stand out.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Resume Builder V2 Beta
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Build Professional Resumes
            <br />
            <span className="text-cyan-600">The Right Way</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            A completely redesigned resume builder with configuration-driven templates.
            Every element is customizable, every section is flexible.
          </p>
          
          <Button
            size="lg"
            className="gap-2 bg-cyan-600 hover:bg-cyan-700 text-lg px-8 py-6"
            onClick={() => navigate('/v2/builder?template=executive-split-v2')}
          >
            Try the New Builder
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#ecfeff' }}
              >
                <feature.icon className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Templates Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Available Templates
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Start with a professionally designed template
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate(`/v2/builder?template=${template.id}`)}
              >
                {/* Template Preview Placeholder */}
                <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-4 bg-white rounded shadow-sm p-4">
                    {/* Mini preview */}
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-cyan-200 rounded w-1/2" />
                      <div className="h-2 bg-gray-100 rounded w-full mt-4" />
                      <div className="h-2 bg-gray-100 rounded w-5/6" />
                      <div className="h-2 bg-gray-100 rounded w-4/6" />
                      <div className="h-4 bg-gray-200 rounded w-1/3 mt-4" />
                      <div className="h-2 bg-gray-100 rounded w-full" />
                      <div className="h-2 bg-gray-100 rounded w-5/6" />
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-cyan-600/0 group-hover:bg-cyan-600/10 transition-colors flex items-center justify-center">
                    <Button
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-600 hover:bg-cyan-700"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
                
                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize">
                      {template.category}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {template.layout.type.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Coming Soon Card */}
            <div className="bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[400px]">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-600 mb-2">More Templates Coming</h3>
                <p className="text-sm text-gray-500">
                  We're adding new templates regularly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            V2 vs Current Builder
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">1</span>
                Current Builder
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  120+ templates with individual codebases
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  Styles hardcoded in each template
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  Limited customization options
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  Fixed section order and titles
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-cyan-600 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-xs text-cyan-600">2</span>
                V2 Builder (New)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500">✓</span>
                  Single renderer with config-driven templates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500">✓</span>
                  All styles in centralized configuration
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500">✓</span>
                  Full customization - fonts, colors, spacing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500">✓</span>
                  Drag-and-drop section reordering
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500">✓</span>
                  Custom section titles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500">✓</span>
                  Swappable section variants
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardV2;
