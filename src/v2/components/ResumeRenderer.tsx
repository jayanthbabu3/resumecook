/**
 * Resume Builder V2 - Resume Renderer
 * 
 * The main component that renders a complete resume based on configuration.
 * This is the single source of truth for rendering - used for both
 * live preview and PDF generation.
 */

import React from 'react';
import type { TemplateConfig, SectionConfig } from '../types';
import type { ResumeData } from '@/types/resume';
import { useTemplateConfig } from '../hooks/useTemplateConfig';
import {
  HeaderSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  CustomSection,
} from './sections';
import { Target } from 'lucide-react';

interface ResumeRendererProps {
  /** Resume data to render */
  resumeData: ResumeData;
  /** Template ID to use */
  templateId: string;
  /** Theme color override */
  themeColor?: string;
  /** Enable inline editing */
  editable?: boolean;
  /** Custom section labels */
  sectionLabels?: Record<string, string>;
  /** Section order override */
  sectionOrder?: string[];
  /** Enabled sections override */
  enabledSections?: string[];
  /** Callback for adding bullet points */
  onAddBulletPoint?: (expId: string) => void;
  /** Callback for removing bullet points */
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  /** Callback for adding experience */
  onAddExperience?: () => void;
  /** Callback for removing experience */
  onRemoveExperience?: (expId: string) => void;
  /** Callback for adding education */
  onAddEducation?: () => void;
  /** Callback for removing education */
  onRemoveEducation?: (eduId: string) => void;
  /** Additional className */
  className?: string;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({
  resumeData,
  templateId,
  themeColor,
  editable = false,
  sectionLabels,
  sectionOrder,
  enabledSections,
  onAddBulletPoint,
  onRemoveBulletPoint,
  onAddExperience,
  onRemoveExperience,
  onAddEducation,
  onRemoveEducation,
  className = '',
}) => {
  // Get template configuration
  const { config, getEnabledSections } = useTemplateConfig({
    templateId,
    themeColor,
  });

  const { layout, spacing, colors, fontFamily } = config;

  // Get section title with custom label support
  const getSectionTitle = (section: SectionConfig): string => {
    if (sectionLabels && sectionLabels[section.id]) {
      return sectionLabels[section.id];
    }
    return section.title;
  };

  // Check if section is enabled
  const isSectionEnabled = (sectionId: string): boolean => {
    // If enabledSections is provided and has items, use it
    if (enabledSections && enabledSections.length > 0) {
      return enabledSections.includes(sectionId);
    }
    // Otherwise fall back to config
    const section = config.sections.find(s => s.id === sectionId);
    return section?.enabled ?? false;
  };

  // Get sections in order
  const getOrderedSections = (column?: 'main' | 'sidebar'): SectionConfig[] => {
    let sections = config.sections.filter(s => {
      if (!isSectionEnabled(s.id)) return false;
      if (s.type === 'header') return false; // Header is rendered separately
      if (column && s.column !== column) return false;
      return true;
    });

    // Apply custom order if provided
    if (sectionOrder) {
      sections = sections.sort((a, b) => {
        const aIndex = sectionOrder.indexOf(a.id);
        const bIndex = sectionOrder.indexOf(b.id);
        if (aIndex === -1 && bIndex === -1) return a.order - b.order;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
    } else {
      sections = sections.sort((a, b) => a.order - b.order);
    }

    return sections;
  };

  // Render a section based on its type
  const renderSection = (section: SectionConfig) => {
    const title = getSectionTitle(section);

    switch (section.type) {
      case 'summary':
        return (
          <SummarySection
            key={section.id}
            summary={resumeData.personalInfo.summary}
            config={config}
            editable={editable}
            sectionTitle={title}
          />
        );

      case 'experience':
        return (
          <ExperienceSection
            key={section.id}
            items={resumeData.experience}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddBulletPoint={onAddBulletPoint}
            onRemoveBulletPoint={onRemoveBulletPoint}
            onAddExperience={onAddExperience}
            onRemoveExperience={onRemoveExperience}
          />
        );

      case 'education':
        return (
          <EducationSection
            key={section.id}
            items={resumeData.education}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddEducation={onAddEducation}
            onRemoveEducation={onRemoveEducation}
          />
        );

      case 'skills':
        return (
          <SkillsSection
            key={section.id}
            items={resumeData.skills}
            config={config}
            editable={editable}
            sectionTitle={title}
          />
        );

      case 'custom':
        // Find the custom section data - match by id, partial id, or title
        const customSection = resumeData.sections.find(
          s => s.id === section.id || 
               s.id === `section-${section.id}` ||
               s.id.includes(section.id) ||
               s.title.toLowerCase() === section.title.toLowerCase()
        );
        
        if (!customSection && !editable) return null;

        const sectionIndex = resumeData.sections.findIndex(
          s => s.id === section.id || 
               s.id === `section-${section.id}` ||
               s.id.includes(section.id) ||
               s.title.toLowerCase() === section.title.toLowerCase()
        );

        // Determine if this is a "card" style section (like Strengths)
        const isCardStyle = section.id === 'strengths' || section.title.toLowerCase().includes('strength');

        return (
          <CustomSection
            key={section.id}
            section={customSection || { id: section.id, title: title, content: '', items: [] }}
            sectionIndex={sectionIndex >= 0 ? sectionIndex : resumeData.sections.length}
            config={config}
            editable={editable}
            showAsCards={isCardStyle}
            icon={isCardStyle ? <Target className="w-4 h-4" /> : undefined}
          />
        );

      // TODO: Add more section types (projects, certifications, etc.)
      default:
        return null;
    }
  };

  // Container styles
  const containerStyle: React.CSSProperties = {
    fontFamily: fontFamily.primary,
    fontSize: config.typography.body.fontSize,
    lineHeight: config.typography.body.lineHeight,
    color: config.typography.body.color,
    backgroundColor: colors.background.page,
    width: '100%',
    minHeight: '100%',
  };

  // Page padding
  const contentStyle: React.CSSProperties = {
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
  };

  // Render single-column layout
  if (layout.type === 'single-column') {
    return (
      <div className={`resume-v2 ${className}`} style={containerStyle}>
        {/* Header */}
        {isSectionEnabled('header') && (
          <HeaderSection
            resumeData={resumeData}
            config={config}
            editable={editable}
          />
        )}

        {/* Content */}
        <div style={contentStyle}>
          {getOrderedSections().map(section => renderSection(section))}
        </div>
      </div>
    );
  }

  // Render two-column layout
  const isRightSidebar = layout.type === 'two-column-right';
  const mainSections = getOrderedSections('main');
  const sidebarSections = getOrderedSections('sidebar');

  // Calculate pixel widths for PDF compatibility (210mm = 794px at 96dpi)
  const containerWidth = 794; // A4 width in pixels
  const mainWidthPx = Math.round(containerWidth * 0.60); // 60% for main
  const sidebarWidthPx = Math.round(containerWidth * 0.35); // 35% for sidebar
  const gapPx = Math.round(containerWidth * 0.03); // 3% gap

  const mainColumnStyle: React.CSSProperties = {
    width: `${mainWidthPx}px`,
    minWidth: `${mainWidthPx}px`,
    maxWidth: `${mainWidthPx}px`,
    flexShrink: 0,
    flexGrow: 0,
  };

  const sidebarStyle: React.CSSProperties = {
    width: `${sidebarWidthPx}px`,
    minWidth: `${sidebarWidthPx}px`,
    maxWidth: `${sidebarWidthPx}px`,
    backgroundColor: layout.sidebarBackground || colors.background.section,
    padding: layout.sidebarPadding || spacing.pagePadding.right,
    flexShrink: 0,
    flexGrow: 0,
  };

  return (
    <div className={`resume-v2 ${className}`} style={containerStyle}>
      {/* Header - Full width */}
      {isSectionEnabled('header') && (
        <div style={{ padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} 0 ${spacing.pagePadding.left}` }}>
          <HeaderSection
            resumeData={resumeData}
            config={config}
            editable={editable}
          />
        </div>
      )}

      {/* Two-column content - Use display:flex with fixed pixel widths for PDF */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: `${gapPx}px`,
          padding: `${spacing.pagePadding.top} 0 ${spacing.pagePadding.bottom} 0`,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Left column */}
        <div style={isRightSidebar ? { ...mainColumnStyle, paddingLeft: spacing.pagePadding.left } : sidebarStyle}>
          {(isRightSidebar ? mainSections : sidebarSections).map(section => renderSection(section))}
        </div>

        {/* Right column */}
        <div style={isRightSidebar ? sidebarStyle : { ...mainColumnStyle, paddingRight: spacing.pagePadding.right }}>
          {(isRightSidebar ? sidebarSections : mainSections).map(section => renderSection(section))}
        </div>
      </div>
    </div>
  );
};

export default ResumeRenderer;
