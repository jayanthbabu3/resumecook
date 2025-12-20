/**
 * Resume Builder V2 - Resume Renderer
 * 
 * The main component that renders a complete resume based on configuration.
 * This is the single source of truth for rendering - used for both
 * live preview and PDF generation.
 */

import React from 'react';
import type { TemplateConfig, SectionConfig, V2ResumeData } from '../types';
import { useTemplateConfig } from '../hooks/useTemplateConfig';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import {
  HeaderSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  AchievementsSection,
  StrengthsSection,
  CustomSection,
  LanguagesSection,
  ProjectsSection,
  CertificationsSection,
  AwardsSection,
  PublicationsSection,
  VolunteerSection,
  SpeakingSection,
  PatentsSection,
  InterestsSection,
  ReferencesSection,
  CoursesSection,
} from './sections';
import { Target, Award, Star, Zap, Trophy, CheckCircle2 } from 'lucide-react';

// Icon mapping for different section types
const SECTION_ICONS: Record<string, React.ReactNode> = {
  strengths: <Target className="w-4 h-4" />,
  achievements: <Trophy className="w-4 h-4" />,
  awards: <Award className="w-4 h-4" />,
  highlights: <Star className="w-4 h-4" />,
  competencies: <Zap className="w-4 h-4" />,
  qualifications: <CheckCircle2 className="w-4 h-4" />,
};

interface ResumeRendererProps {
  /** Resume data to render */
  resumeData: V2ResumeData;
  /** Template ID to use */
  templateId: string;
  /** Theme color override */
  themeColor?: string;
  /** Section overrides (order/column/enabled) */
  sectionOverrides?: Partial<Record<string, Partial<SectionConfig>>>;
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
  /** Callback for adding custom section items */
  onAddCustomSectionItem?: (sectionIndex: number) => void;
  /** Callback for removing custom section items */
  onRemoveCustomSectionItem?: (sectionIndex: number, itemIndex: number) => void;
  /** Callback for adding language */
  onAddLanguage?: () => void;
  /** Callback for removing language */
  onRemoveLanguage?: (langId: string) => void;
  /** Callback for updating language */
  onUpdateLanguage?: (langId: string, field: string, value: string) => void;
  /** Callback for adding strength */
  onAddStrength?: () => void;
  /** Callback for removing strength */
  onRemoveStrength?: (id: string) => void;
  /** Callback for adding achievement */
  onAddAchievement?: () => void;
  /** Callback for removing achievement */
  onRemoveAchievement?: (id: string) => void;
  /** Callback for adding project */
  onAddProject?: () => void;
  /** Callback for removing project */
  onRemoveProject?: (id: string) => void;
  /** Callback for adding certification */
  onAddCertification?: () => void;
  /** Callback for removing certification */
  onRemoveCertification?: (id: string) => void;
  /** Callback for adding award */
  onAddAward?: () => void;
  /** Callback for removing award */
  onRemoveAward?: (id: string) => void;
  /** Callback for adding publication */
  onAddPublication?: () => void;
  /** Callback for removing publication */
  onRemovePublication?: (id: string) => void;
  /** Callback for adding volunteer */
  onAddVolunteer?: () => void;
  /** Callback for removing volunteer */
  onRemoveVolunteer?: (id: string) => void;
  /** Callback for adding speaking */
  onAddSpeaking?: () => void;
  /** Callback for removing speaking */
  onRemoveSpeaking?: (id: string) => void;
  /** Callback for adding patent */
  onAddPatent?: () => void;
  /** Callback for removing patent */
  onRemovePatent?: (id: string) => void;
  /** Callback for adding interest */
  onAddInterest?: () => void;
  /** Callback for removing interest */
  onRemoveInterest?: (id: string) => void;
  /** Callback for adding reference */
  onAddReference?: () => void;
  /** Callback for removing reference */
  onRemoveReference?: (id: string) => void;
  /** Callback for adding course */
  onAddCourse?: () => void;
  /** Callback for removing course */
  onRemoveCourse?: (id: string) => void;
  /** Additional className */
  className?: string;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({
  resumeData,
  templateId,
  themeColor,
  sectionOverrides,
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
  onAddCustomSectionItem,
  onRemoveCustomSectionItem,
  onAddLanguage,
  onRemoveLanguage,
  onUpdateLanguage,
  onAddStrength,
  onRemoveStrength,
  onAddAchievement,
  onRemoveAchievement,
  onAddProject,
  onRemoveProject,
  onAddCertification,
  onRemoveCertification,
  onAddAward,
  onRemoveAward,
  onAddPublication,
  onRemovePublication,
  onAddVolunteer,
  onRemoveVolunteer,
  onAddSpeaking,
  onRemoveSpeaking,
  onAddPatent,
  onRemovePatent,
  onAddInterest,
  onRemoveInterest,
  onAddReference,
  onRemoveReference,
  onAddCourse,
  onRemoveCourse,
  className = '',
}) => {
  // Get template configuration
  const { config, getEnabledSections } = useTemplateConfig({
    templateId,
    themeColor,
    sectionOverrides,
  });

  const { layout, spacing, colors, fontFamily } = config;

  // Get style options for section visibility
  const styleOptionsContext = useStyleOptions();

  // Get section title with custom label support
  const getSectionTitle = (section: SectionConfig): string => {
    if (sectionLabels && sectionLabels[section.id]) {
      return sectionLabels[section.id];
    }
    return section.title;
  };

  // Check if section is enabled (considers both enabledSections and styleOptions)
  const isSectionEnabled = (sectionId: string): boolean => {
    // Check styleOptions visibility toggles first
    if (styleOptionsContext?.styleOptions) {
      const { showStrengths, showSections, showAchievements } = styleOptionsContext.styleOptions;
      
      // Check if this is a strengths section
      if (sectionId === 'strengths') {
        if (showStrengths === false) return false;
      }
      
      // Check if this is an achievements section
      if (sectionId === 'achievements') {
        if (showAchievements === false) return false;
      }
      
      // Check if this is a custom section (type === 'custom')
      const section = config.sections.find(s => s.id === sectionId);
      if (section?.type === 'custom') {
        if (!showSections) return false;
      }
    }
    
    // If enabledSections is provided and has items, use it
    if (enabledSections && enabledSections.length > 0) {
      return enabledSections.includes(sectionId);
    }
    // Otherwise fall back to config
    const section = config.sections.find(s => s.id === sectionId);
    return section?.enabled ?? false;
  };

  // Get sections in order, including any custom sections present only in resumeData
  const getOrderedSections = (column?: 'main' | 'sidebar'): SectionConfig[] => {
    // Base sections from template config
    const baseSections = config.sections.filter(s => {
      if (!isSectionEnabled(s.id)) return false;
      if (s.type === 'header') return false; // Header is rendered separately
      if (column && s.column !== column) return false;
      return true;
    });

    let sections = [...baseSections];

    // Determine max order per column for deterministic appends
    const maxOrderByColumn = (col: 'main' | 'sidebar') => {
      const fromBase = config.sections
        .filter(s => (s.column || 'main') === col)
        .map(s => s.order ?? 0);
      return (fromBase.length ? Math.max(...fromBase) : 0);
    };

    // Append any customSections not present in config (dynamic custom sections)
    const configIds = new Set(config.sections.map(s => s.id));
    const configTitles = new Set(config.sections.map(s => (s.title || s.id).toLowerCase()));

    const blockedTitles = new Set(['my life philosophy']);

    const dynamicSections: SectionConfig[] = [];
    (resumeData.customSections || []).forEach((s, idx) => {
      const titleLower = (s.title || s.id || '').toLowerCase();
      if (blockedTitles.has(titleLower)) return;
      if (configIds.has(s.id)) return;
      if (configTitles.has(titleLower)) return;
      // Heuristic: send strengths/achievements to sidebar by default
      const inferredColumn: 'main' | 'sidebar' =
        (titleLower.includes('strength') || titleLower.includes('achievement'))
          ? 'sidebar'
          : 'main';
      const dynamicColumn = column || inferredColumn;
      // If a specific column is requested, only include matching column sections
      if (column && column !== dynamicColumn) return;
      const orderStart = maxOrderByColumn(dynamicColumn) || 0;
      dynamicSections.push({
        type: 'custom',
        id: s.id,
        title: s.title || s.id,
        defaultTitle: s.title || s.id,
        enabled: true,
        order: orderStart + idx + 1, // append after existing sections in that column
        column: dynamicColumn,
      });
    });

    if (dynamicSections.length) {
      sections = [...sections, ...dynamicSections];
    }

    // Remove banned/legacy sections
    sections = sections.filter(s => !blockedTitles.has((s.title || s.id || '').toLowerCase()));
    // Apply custom order if provided
    if (sectionOrder) {
      sections = sections.sort((a, b) => {
        const aIndex = sectionOrder.indexOf(a.id);
        const bIndex = sectionOrder.indexOf(b.id);
        if (aIndex === -1 && bIndex === -1) return (a.order ?? 0) - (b.order ?? 0);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
    } else {
      sections = sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    return sections;
  };

  // Render a section based on its type, wrapped with data-section for style toggles
  const renderSection = (section: SectionConfig) => {
    const title = getSectionTitle(section);

    const pageBreakBefore = (section as any).pageBreakBefore;

    const wrap = (type: string, node: React.ReactNode) => {
      const style: React.CSSProperties = {
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      };
      if (pageBreakBefore) {
        style.pageBreakBefore = 'always';
        style.breakBefore = 'page';
      }
      return (
        <>
          {pageBreakBefore && <div style={{ height: '24px' }} />}
          <div data-section={type} style={style}>
            {node}
          </div>
        </>
      );
    };

    switch (section.type) {
      case 'summary':
        return wrap('summary',
          <SummarySection
            key={section.id}
            summary={resumeData.personalInfo.summary}
            config={config}
            editable={editable}
            sectionTitle={title}
          />
        );

      case 'experience':
        return wrap('experience',
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
        return wrap('education',
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
        return wrap('skills',
          <SkillsSection
            key={section.id}
            items={resumeData.skills}
            config={config}
            editable={editable}
            sectionTitle={title}
          />
        );

      case 'achievements':
        return wrap('achievements',
          <AchievementsSection
            key={section.id}
            items={resumeData.achievements || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddAchievement}
            onRemoveItem={onRemoveAchievement}
          />
        );

      case 'strengths':
        return wrap('strengths',
          <StrengthsSection
            key={section.id}
            items={resumeData.strengths || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddStrength}
            onRemoveItem={onRemoveStrength}
          />
        );

      case 'languages':
        // Get languages from V2 data
        const languageItems = resumeData.languages || [];
        return wrap('languages',
          <LanguagesSection
            key={section.id}
            items={languageItems}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddLanguage={onAddLanguage}
            onRemoveLanguage={onRemoveLanguage}
            onUpdateLanguage={onUpdateLanguage}
          />
        );

      case 'custom':
        // Find the custom section data - match by id, partial id, or title
        const customSections = resumeData.customSections || [];
        const customSection = customSections.find(
          s => s.id === section.id || 
               s.id === `section-${section.id}` ||
               s.id.includes(section.id) ||
               s.title.toLowerCase() === section.title.toLowerCase()
        );
        
        if (!customSection && !editable) return null;

        const sectionIndex = customSections.findIndex(
          s => s.id === section.id || 
               s.id === `section-${section.id}` ||
               s.id.includes(section.id) ||
               s.title.toLowerCase() === section.title.toLowerCase()
        );

        const actualSectionIndex = sectionIndex >= 0 ? sectionIndex : customSections.length;
        
        return wrap('custom',
          <CustomSection
            key={section.id}
            section={customSection || { id: section.id, title: title, items: [] }}
            sectionIndex={actualSectionIndex}
            config={config}
            editable={editable}
            showAsCards={false}
            onAddItem={onAddCustomSectionItem ? () => onAddCustomSectionItem(actualSectionIndex) : undefined}
            onRemoveItem={onRemoveCustomSectionItem ? (itemIndex: number) => onRemoveCustomSectionItem(actualSectionIndex, itemIndex) : undefined}
          />
        );

      case 'projects':
        return wrap('projects',
          <ProjectsSection
            key={section.id}
            items={resumeData.projects || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddProject}
            onRemoveItem={onRemoveProject}
          />
        );

      case 'certifications':
        return wrap('certifications',
          <CertificationsSection
            key={section.id}
            items={resumeData.certifications || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddCertification}
            onRemoveItem={onRemoveCertification}
          />
        );

      case 'awards':
        return wrap('awards',
          <AwardsSection
            key={section.id}
            items={resumeData.awards || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddAward}
            onRemoveItem={onRemoveAward}
          />
        );

      case 'publications':
        return wrap('publications',
          <PublicationsSection
            key={section.id}
            items={resumeData.publications || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddPublication}
            onRemoveItem={onRemovePublication}
          />
        );

      case 'volunteer':
        return wrap('volunteer',
          <VolunteerSection
            key={section.id}
            items={resumeData.volunteer || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddVolunteer}
            onRemoveItem={onRemoveVolunteer}
          />
        );

      case 'speaking':
        return wrap('speaking',
          <SpeakingSection
            key={section.id}
            items={resumeData.speaking || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddSpeaking}
            onRemoveItem={onRemoveSpeaking}
          />
        );

      case 'patents':
        return wrap('patents',
          <PatentsSection
            key={section.id}
            items={resumeData.patents || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddPatent}
            onRemoveItem={onRemovePatent}
          />
        );

      case 'interests':
        return wrap('interests',
          <InterestsSection
            key={section.id}
            items={resumeData.interests || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddInterest}
            onRemoveItem={onRemoveInterest}
          />
        );

      case 'references':
        return wrap('references',
          <ReferencesSection
            key={section.id}
            items={resumeData.references || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddReference}
            onRemoveItem={onRemoveReference}
          />
        );

      case 'courses':
        return wrap('courses',
          <CoursesSection
            key={section.id}
            items={resumeData.courses || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddCourse}
            onRemoveItem={onRemoveCourse}
          />
        );

      default:
        return null;
    }
  };

  // Container styles - Don't use minHeight: 100% as it causes blank first page in PDF
  const containerStyle: React.CSSProperties = {
    fontFamily: fontFamily.primary,
    fontSize: config.typography.body.fontSize,
    lineHeight: config.typography.body.lineHeight,
    color: config.typography.body.color,
    backgroundColor: colors.background.page,
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };

  // Force font inheritance on all content
  const fontInheritClass = 'resume-font-inherit';

  // Page padding
  const contentStyle: React.CSSProperties = {
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
  };

  const headerVariant = config.header?.variant;
  const isBannerHeader = headerVariant === 'banner';

  // Render single-column layout
  if (layout.type === 'single-column') {
    return (
      <div className={`resume-v2 ${className}`} style={containerStyle}>
        {/* Header */}
        {isSectionEnabled('header') && (
          <>
            {isBannerHeader ? (
              <HeaderSection
                resumeData={resumeData}
                config={config}
                editable={editable}
              />
            ) : (
              <div
                style={{
                  padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} 0 ${spacing.pagePadding.left}`,
                }}
              >
                <HeaderSection
                  resumeData={resumeData}
                  config={config}
                  editable={editable}
                />
              </div>
            )}
          </>
        )}

        {/* Content - Apply padding directly to content wrapper */}
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

  // Get column widths from layout config or use defaults
  const sidebarWidth = layout.sidebarWidth || '40%';
  const mainWidth = layout.mainWidth || '60%';

  // Apply page padding consistently (matches single-column behavior)
  const headerWrapperPadding: React.CSSProperties = {
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} 0 ${spacing.pagePadding.left}`,
  };

  const twoColumnContentPadding: React.CSSProperties = {
    padding:
      isBannerHeader
        ? `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`
        : `0 ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
  };

  // Use percentages for better PDF compatibility - allows content to flow across pages
  const mainColumnStyle: React.CSSProperties = {
    width: mainWidth,
    minWidth: '0',
    flexShrink: 0,
    flexGrow: 0,
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    padding: 0,
  };

  const sidebarColumnStyle: React.CSSProperties = {
    width: sidebarWidth,
    minWidth: '0',
    backgroundColor: layout.sidebarBackground || colors.background.sidebar || colors.background.page,
    flexShrink: 0,
    flexGrow: 0,
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    padding: layout.sidebarPadding || 0,
  };

  return (
    <div className={`resume-v2 ${className}`} style={containerStyle}>
      {/* Header - Full width */}
      {isSectionEnabled('header') && (
        <>
          {isBannerHeader ? (
            <HeaderSection resumeData={resumeData} config={config} editable={editable} />
          ) : (
            <div style={headerWrapperPadding}>
              <HeaderSection resumeData={resumeData} config={config} editable={editable} />
            </div>
          )}
        </>
      )}

      {/* Two-column content - Use display:flex with percentage widths for PDF compatibility */}
      <div
        style={{
          ...twoColumnContentPadding,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          gap: layout.columnGap || '24px',
        }}
      >
        {/* Left column - Sidebar for two-column-left, Main for two-column-right */}
        <div style={isRightSidebar ? mainColumnStyle : sidebarColumnStyle}>
          {(isRightSidebar ? mainSections : sidebarSections).map(section => renderSection(section))}
        </div>

        {/* Right column - Main for two-column-left, Sidebar for two-column-right */}
        <div style={isRightSidebar ? sidebarColumnStyle : mainColumnStyle}>
          {(isRightSidebar ? sidebarSections : mainSections).map(section => renderSection(section))}
        </div>
      </div>
    </div>
  );
};

export default ResumeRenderer;
