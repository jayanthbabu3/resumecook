/**
 * Template Selector Modal
 *
 * Allows users to choose a template for their resume.
 * Shows actual preview thumbnails of templates.
 */

import React, { useState, useMemo } from 'react';
import { X, Check, Layout, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TEMPLATE_REGISTRY, getAllTemplates } from '../config/templates';
import { TemplatePreviewV2 } from './TemplatePreviewV2';

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
  currentTemplateId?: string;
  themeColor?: string;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentTemplateId,
  themeColor = '#3b82f6', // Default to blue (website theme color)
}) => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  // Get all templates
  const templates = useMemo(() => {
    return getAllTemplates().slice(0, 12); // Show first 12 templates
  }, []);

  // Featured templates for horizontal scroll
  const featuredTemplates = useMemo(() => {
    return [
      'executive-split-v2',
      'minimal-v2',
      'bold-headline-v2',
      'data-pro-v2',
    ].map(id => {
      const config = TEMPLATE_REGISTRY[id];
      return config ? { id, config } : null;
    }).filter(Boolean) as { id: string; config: typeof TEMPLATE_REGISTRY[string] }[];
  }, []);

  if (!isOpen) return null;

  const handleSelect = (templateId: string) => {
    onSelect(templateId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col">
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Featured Templates - Horizontal Scroll */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Popular Templates</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
              {featuredTemplates.map(({ id, config }) => {
                const isSelected = currentTemplateId === id;
                const isHovered = hoveredTemplate === id;

                return (
                  <button
                    key={id}
                    onClick={() => handleSelect(id)}
                    onMouseEnter={() => setHoveredTemplate(id)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    className={cn(
                      "flex-shrink-0 group relative",
                      "transition-all duration-200"
                    )}
                  >
                    {/* Preview Card */}
                    <div
                      className={cn(
                        "w-[180px] sm:w-[200px] rounded-xl overflow-hidden border-2 transition-all duration-200",
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1"
                      )}
                    >
                      {/* Template Preview */}
                      <div className="aspect-[8.5/11] relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        <div className="absolute inset-2 rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-gray-100">
                          <TemplatePreviewV2
                            templateId={id}
                            themeColor={config.colors.primary}
                            className="h-full"
                          />
                        </div>

                        {/* Selected Badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent",
                            "flex items-end justify-center pb-4",
                            "opacity-0 group-hover:opacity-100 transition-all duration-200"
                          )}
                        >
                          <span
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-lg"
                            style={{ backgroundColor: themeColor }}
                          >
                            Use Template
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Template Name */}
                    <p className="mt-3 text-sm font-medium text-gray-900 text-center">
                      {config.name.replace(' V2', '').replace('-v2', '')}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* All Templates Grid */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              All Templates <span className="text-gray-400 font-normal">({templates.length})</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {templates.map((template) => {
                const isSelected = currentTemplateId === template.id;
                const isHovered = hoveredTemplate === template.id;

                return (
                  <button
                    key={template.id}
                    onClick={() => handleSelect(template.id)}
                    onMouseEnter={() => setHoveredTemplate(template.id)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    className="group text-left"
                  >
                    {/* Preview Card */}
                    <div
                      className={cn(
                        "rounded-xl overflow-hidden border-2 transition-all duration-200",
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1"
                      )}
                    >
                      {/* Template Preview */}
                      <div className="aspect-[8.5/11] relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        <div className="absolute inset-1.5 sm:inset-2 rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-gray-100">
                          <TemplatePreviewV2
                            templateId={template.id}
                            themeColor={template.colors?.primary || '#3b82f6'}
                            className="h-full"
                          />
                        </div>

                        {/* Selected Badge */}
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent",
                            "flex items-end justify-center pb-3 sm:pb-4",
                            "opacity-0 group-hover:opacity-100 transition-all duration-200"
                          )}
                        >
                          <span
                            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white shadow-lg"
                            style={{ backgroundColor: themeColor }}
                          >
                            Use Template
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Template Name */}
                    <p className="mt-2 text-xs sm:text-sm font-medium text-gray-900 truncate">
                      {template.name.replace(' V2', '').replace('-v2', '')}
                    </p>
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
              <>Selected: <span className="font-medium text-gray-700">{TEMPLATE_REGISTRY[currentTemplateId]?.name.replace(' V2', '')}</span></>
            ) : (
              'Click a template to continue'
            )}
          </p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectorModal;
