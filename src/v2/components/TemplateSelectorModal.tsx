/**
 * Template Selector Modal
 *
 * Allows users to choose a template for their resume.
 * Shows previews of available templates with categories.
 */

import React, { useState, useMemo } from 'react';
import { X, Check, Layout, Briefcase, GraduationCap, Code, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TEMPLATE_REGISTRY } from '../config/templates';
import type { TemplateConfig } from '../types';

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
  currentTemplateId?: string;
  themeColor?: string;
}

// Template categories with icons
const CATEGORIES = [
  { id: 'all', name: 'All Templates', icon: Layout },
  { id: 'professional', name: 'Professional', icon: Briefcase },
  { id: 'creative', name: 'Creative', icon: Sparkles },
  { id: 'academic', name: 'Academic', icon: GraduationCap },
  { id: 'technical', name: 'Technical', icon: Code },
] as const;

// Template preview colors (based on primary color)
const getTemplatePreviewStyle = (config: TemplateConfig) => ({
  borderColor: config.colors.primary,
  accentColor: config.colors.primary,
});

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentTemplateId,
  themeColor = '#0891b2',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  // Get templates grouped by category
  const templates = useMemo(() => {
    const all = Object.entries(TEMPLATE_REGISTRY).map(([id, config]) => ({
      id,
      config,
    }));

    if (selectedCategory === 'all') return all;
    return all.filter(t => t.config.category === selectedCategory);
  }, [selectedCategory]);

  // Featured templates (first 4 for quick selection)
  const featuredTemplates = useMemo(() => {
    return [
      'executive-split-v2',
      'minimal-v2',
      'professional-blue-v2',
      'elegant-ats-v2',
    ].map(id => ({ id, config: TEMPLATE_REGISTRY[id] })).filter(t => t.config);
  }, []);

  if (!isOpen) return null;

  const handleSelect = (templateId: string) => {
    onSelect(templateId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${themeColor}15` }}
            >
              <Layout className="w-5 h-5" style={{ color: themeColor }} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Choose a Template</h2>
              <p className="text-sm text-gray-500">Select a design for your resume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Featured Quick Select (only on 'all' category) */}
          {selectedCategory === 'all' && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Popular Templates</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {featuredTemplates.map(({ id, config }) => (
                  <button
                    key={id}
                    onClick={() => handleSelect(id)}
                    className={cn(
                      "relative p-3 rounded-xl border-2 transition-all text-left",
                      currentTemplateId === id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {currentTemplateId === id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className="w-full h-2 rounded-full mb-2"
                      style={{ backgroundColor: config.colors.primary }}
                    />
                    <p className="text-sm font-medium text-gray-900 truncate">{config.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Templates */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              {selectedCategory === 'all' ? 'All Templates' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
              <span className="ml-2 text-gray-400">({templates.length})</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {templates.map(({ id, config }) => {
                const isSelected = currentTemplateId === id;
                const isHovered = hoveredTemplate === id;
                const previewStyle = getTemplatePreviewStyle(config);

                return (
                  <button
                    key={id}
                    onClick={() => handleSelect(id)}
                    onMouseEnter={() => setHoveredTemplate(id)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    className={cn(
                      "relative group rounded-xl border-2 overflow-hidden transition-all",
                      isSelected
                        ? "border-gray-900 ring-2 ring-gray-900/20"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                    )}
                  >
                    {/* Template Preview */}
                    <div className="aspect-[3/4] bg-white p-3 relative">
                      {/* Mini Resume Preview */}
                      <div className="w-full h-full bg-gray-50 rounded-lg p-2 flex flex-col gap-1.5 overflow-hidden">
                        {/* Header mockup */}
                        <div className="flex items-center gap-2">
                          {config.header?.showPhoto && (
                            <div
                              className="w-6 h-6 rounded-full flex-shrink-0"
                              style={{ backgroundColor: `${config.colors.primary}30` }}
                            />
                          )}
                          <div className="flex-1">
                            <div className="h-2 bg-gray-300 rounded w-3/4 mb-1" />
                            <div
                              className="h-1.5 rounded w-1/2"
                              style={{ backgroundColor: config.colors.primary }}
                            />
                          </div>
                        </div>

                        {/* Layout mockup based on type */}
                        {config.layout.type === 'single-column' ? (
                          <div className="flex-1 flex flex-col gap-1.5">
                            {/* Section lines */}
                            {[1, 2, 3].map(i => (
                              <div key={i}>
                                <div
                                  className="h-1 rounded w-1/3 mb-1"
                                  style={{ backgroundColor: config.colors.primary }}
                                />
                                <div className="h-1 bg-gray-200 rounded w-full" />
                                <div className="h-1 bg-gray-200 rounded w-5/6 mt-0.5" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex-1 flex gap-1.5">
                            {/* Main column */}
                            <div className="flex-1 flex flex-col gap-1.5">
                              {[1, 2].map(i => (
                                <div key={i}>
                                  <div
                                    className="h-1 rounded w-1/2 mb-1"
                                    style={{ backgroundColor: config.colors.primary }}
                                  />
                                  <div className="h-1 bg-gray-200 rounded w-full" />
                                  <div className="h-1 bg-gray-200 rounded w-4/5 mt-0.5" />
                                </div>
                              ))}
                            </div>
                            {/* Sidebar */}
                            <div
                              className="w-1/3 rounded p-1"
                              style={{ backgroundColor: config.colors.background.sidebar || '#f8fafc' }}
                            >
                              <div
                                className="h-1 rounded w-3/4 mb-1"
                                style={{ backgroundColor: config.colors.primary }}
                              />
                              <div className="flex flex-wrap gap-0.5">
                                {[1, 2, 3, 4].map(i => (
                                  <div
                                    key={i}
                                    className="h-1.5 rounded-full px-1"
                                    style={{ backgroundColor: `${config.colors.primary}30` }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}

                      {/* Hover overlay */}
                      {isHovered && !isSelected && (
                        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                          <span
                            className="px-3 py-1.5 rounded-lg text-sm font-medium text-white shadow-lg"
                            style={{ backgroundColor: config.colors.primary }}
                          >
                            Select
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-3 bg-white border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{config.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{config.category}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <p className="text-sm text-gray-500">
            {currentTemplateId ? (
              <>Current: <span className="font-medium text-gray-700">{TEMPLATE_REGISTRY[currentTemplateId]?.name}</span></>
            ) : (
              'Select a template to continue'
            )}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectorModal;
