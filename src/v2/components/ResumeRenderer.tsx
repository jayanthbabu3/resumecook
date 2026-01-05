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
import { SummaryVariantRenderer } from './sections/variants/summary/SummaryVariantRenderer';
import { SectionOptionsMenu } from './SectionOptionsMenu';
import { ADDABLE_SECTIONS } from './AddSectionModal';
import { ResumeDecorations, getGradientBackgroundStyle } from './ResumeDecorations';
import { Target, Award, Star, Zap, Trophy, CheckCircle2, Plus } from 'lucide-react';

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
  /** Theme color override (legacy single color) */
  themeColor?: string;
  /** Theme colors override (multi-color: primary + secondary) */
  themeColors?: { primary?: string; secondary?: string };
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
  /** Callback for removing a section (for scratch builder) */
  onRemoveSection?: (sectionId: string) => void;
  /** Callback for changing a section's variant */
  onChangeSectionVariant?: (sectionId: string, variantId: string) => void;
  /** Callback for opening add section modal */
  onOpenAddSection?: (column: 'main' | 'sidebar') => void;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({
  resumeData,
  templateId,
  themeColor,
  themeColors,
  sectionOverrides,
  editable = false,
  onRemoveSection,
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
  onChangeSectionVariant,
  onOpenAddSection,
}) => {
  // Get template configuration
  // For scratch builder, use the generated config directly
  const templateConfigHook = useTemplateConfig({
    templateId,
    themeColor: themeColors ? undefined : themeColor,
    themeColors,
    sectionOverrides,
  });
  
  // If templateId is 'scratch-v2', we need to use a custom config
  // Otherwise use the hook result
  const { config, getEnabledSections } = templateConfigHook;

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
      const {
        showPhoto,
        showSummary,
        showExperience,
        showEducation,
        showSkills,
        showStrengths,
        showAchievements,
        showSections,
      } = styleOptionsContext.styleOptions;

      // Check section visibility based on type/id
      if (sectionId === 'header' && showPhoto === false) return false;
      if (sectionId === 'summary' && showSummary === false) return false;
      if (sectionId === 'experience' && showExperience === false) return false;
      if (sectionId === 'education' && showEducation === false) return false;
      if (sectionId === 'skills' && showSkills === false) return false;
      if (sectionId === 'strengths' && showStrengths === false) return false;
      if (sectionId === 'achievements' && showAchievements === false) return false;

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
    // Base sections from template config - only include enabled sections
    const baseSections = config.sections.filter(s => {
      if (!isSectionEnabled(s.id)) return false;
      if (s.type === 'header') return false; // Header is rendered separately
      // Filter by column - for scratch builder, use the column from section config
      if (column) {
        const sectionColumn = s.column || 'main'; // Default to main if not specified
        if (sectionColumn !== column) return false;
      }
      // For scratch builder, only show sections that are explicitly enabled
      // Don't show empty sections
      if (s.enabled === false) return false;
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
  const renderSection = (section: SectionConfig, isFirstSection: boolean = false) => {
    const title = getSectionTitle(section);

    const pageBreakBefore = (section as any).pageBreakBefore;

    const wrap = (type: string, node: React.ReactNode) => {
      const style: React.CSSProperties = {
        // Don't prevent section from breaking - let individual items handle page breaks
        position: 'relative',
        // First section needs top margin for spacing from header
        // Other sections: NO marginTop - sections already have marginBottom for spacing
        marginTop: isFirstSection ? '12px' : '0',
        maxWidth: '100%',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
      };
      if (pageBreakBefore) {
        style.pageBreakBefore = 'always';
        style.breakBefore = 'page';
      }
      
      // Get variants for this section type
      const sectionInfo = ADDABLE_SECTIONS.find(s => s.id === section.type);
      const variants = sectionInfo?.variants || [];
      const currentVariant = (section as any).variant;

      // Section options menu (delete + change variant)
      const sectionOptionsMenu = editable && section.type !== 'header' ? (
        <div className="absolute -right-1 top-0 z-10">
          <SectionOptionsMenu
            sectionId={section.id}
            sectionType={section.type}
            currentVariant={currentVariant}
            variants={variants}
            onDelete={onRemoveSection ? () => onRemoveSection(section.id) : undefined}
            onChangeVariant={onChangeSectionVariant ? (variantId) => onChangeSectionVariant(section.id, variantId) : undefined}
            themeColor={colors.primary}
          />
        </div>
      ) : null;

      return (
        <>
          {pageBreakBefore && <div style={{ height: '24px' }} />}
          <div data-section={type} className="group" style={style}>
            {sectionOptionsMenu}
            {node}
          </div>
        </>
      );
    };

    switch (section.type) {
      case 'summary':
        // Check if section has a variant - use variant renderer if variant exists
        const summaryVariant = (section as any).variant;
        if (summaryVariant) {
          // Always use variant renderer if variant is specified (even if 'standard')
          return wrap('summary',
            <SummaryVariantRenderer
              key={section.id}
              variant={summaryVariant}
              summary={resumeData.personalInfo.summary}
              config={config}
              editable={editable}
              sectionTitle={title}
            />
          );
        }
        // Fallback to standard renderer only if no variant specified
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
        // Check if section has a variant - use variant renderer if variant exists
        const experienceVariant = (section as any).variant;
        if (experienceVariant) {
          return wrap('experience',
            <ExperienceSection
              key={section.id}
              items={resumeData.experience}
              config={config}
              editable={editable}
              sectionTitle={title}
              variantOverride={experienceVariant as any}
              onAddBulletPoint={onAddBulletPoint}
              onRemoveBulletPoint={onRemoveBulletPoint}
              onAddExperience={onAddExperience}
              onRemoveExperience={onRemoveExperience}
            />
          );
        }
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
        // Check if section has a variant - use variant renderer if variant exists
        const educationVariant = (section as any).variant;
        return wrap('education',
          <EducationSection
            key={section.id}
            items={resumeData.education}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddEducation={onAddEducation}
            onRemoveEducation={onRemoveEducation}
            variantOverride={educationVariant}
          />
        );

      case 'skills':
        // Check if section has a variant - use variant renderer if variant exists
        const skillsVariant = (section as any).variant;
        if (skillsVariant) {
          return wrap('skills',
            <SkillsSection
              key={section.id}
              items={resumeData.skills}
              config={config}
              editable={editable}
              sectionTitle={title}
              variantOverride={skillsVariant as any}
            />
          );
        }
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
        // Check if section has a variant
        const achievementsVariant = (section as any).variant;
        return wrap('achievements',
          <AchievementsSection
            key={section.id}
            items={resumeData.achievements || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddAchievement}
            onRemoveItem={onRemoveAchievement}
            variantOverride={achievementsVariant}
          />
        );

      case 'strengths':
        const strengthsVariant = (section as any).variant || (config as any).strengths?.variant || 'cards';
        return wrap('strengths',
          <StrengthsSection
            key={section.id}
            items={resumeData.strengths || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddStrength}
            onRemoveItem={onRemoveStrength}
            variantOverride={strengthsVariant}
          />
        );

      case 'languages':
        // Get languages from V2 data
        const languageItems = resumeData.languages || [];
        // Get variant - prioritize section.variant (from sectionOverrides) over config default
        const languagesVariant = (section as any).variant || (config as any).languages?.variant || 'standard';
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
            variantOverride={languagesVariant}
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
        const projectsVariant = (section as any).variant;
        return wrap('projects',
          <ProjectsSection
            key={section.id}
            items={resumeData.projects || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddProject}
            onRemoveItem={onRemoveProject}
            variantOverride={projectsVariant}
          />
        );

      case 'certifications':
        const certificationsVariant = (section as any).variant;
        return wrap('certifications',
          <CertificationsSection
            key={section.id}
            items={resumeData.certifications || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddCertification}
            onRemoveItem={onRemoveCertification}
            variantOverride={certificationsVariant}
          />
        );

      case 'awards':
        const awardsVariant = (section as any).variant;
        return wrap('awards',
          <AwardsSection
            key={section.id}
            items={resumeData.awards || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddAward}
            onRemoveItem={onRemoveAward}
            variantOverride={awardsVariant}
          />
        );

      case 'publications':
        const publicationsVariant = (section as any).variant;
        return wrap('publications',
          <PublicationsSection
            key={section.id}
            items={resumeData.publications || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddPublication}
            onRemoveItem={onRemovePublication}
            variantOverride={publicationsVariant}
          />
        );

      case 'volunteer':
        const volunteerVariant = (section as any).variant;
        return wrap('volunteer',
          <VolunteerSection
            key={section.id}
            items={resumeData.volunteer || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddVolunteer}
            onRemoveItem={onRemoveVolunteer}
            variantOverride={volunteerVariant}
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
        const patentsVariant = (section as any).variant;
        return wrap('patents',
          <PatentsSection
            key={section.id}
            items={resumeData.patents || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddPatent}
            onRemoveItem={onRemovePatent}
            variantOverride={patentsVariant}
          />
        );

      case 'interests':
        const interestsVariant = (section as any).variant;
        return wrap('interests',
          <InterestsSection
            key={section.id}
            items={resumeData.interests || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddInterest}
            onRemoveItem={onRemoveInterest}
            variantOverride={interestsVariant}
          />
        );

      case 'references':
        const referencesVariant = (section as any).variant;
        return wrap('references',
          <ReferencesSection
            key={section.id}
            items={resumeData.references || []}
            config={config}
            editable={editable}
            sectionTitle={title}
            onAddItem={onAddReference}
            onRemoveItem={onRemoveReference}
            variantOverride={referencesVariant}
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
            variantOverride={section.variant}
          />
        );

      default:
        return null;
    }
  };

  // Container styles - Don't use minHeight: 100% as it causes blank first page in PDF
  // Include CSS custom properties for StyleOptionsWrapper to use for scaling
  const decorationsConfig = config.decorations;
  const gradientStyle = getGradientBackgroundStyle(decorationsConfig, colors.background.accent || '#f0f7ff');

  const containerStyle: React.CSSProperties = {
    fontFamily: fontFamily.primary,
    fontSize: config.typography.body.fontSize,
    lineHeight: config.typography.body.lineHeight,
    color: config.typography.body.color,
    backgroundColor: colors.background.page,
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    // Apply gradient background if decorations enabled
    ...gradientStyle,
    // CSS variables for StyleOptionsWrapper font scaling
    '--resume-name-size': config.typography.name.fontSize,
    '--resume-section-size': config.typography.sectionHeading.fontSize,
    '--resume-item-size': config.typography.itemTitle.fontSize,
    '--resume-body-size': config.typography.body.fontSize,
  } as React.CSSProperties;

  // Force font inheritance on all content
  const fontInheritClass = 'resume-font-inherit';

  const headerVariant = config.header?.variant as string | undefined;
  const validHeaderVariants = ['split', 'centered', 'left-aligned', 'minimal', 'photo-left', 'photo-right', 'accent-bar', 'compact', 'gradient-banner', 'elegant-banner'];
  const isValidHeaderVariant = headerVariant && validHeaderVariants.includes(headerVariant);
  const isBannerHeader = headerVariant === 'banner';
  
  // For scratch builder, always reserve header space even if disabled
  // Check if we're in scratch builder mode (templateId includes 'scratch' or config id is 'scratch-v2')
  const isScratchBuilder = templateId === 'scratch-v2' || (config as any).id === 'scratch-v2';
  const shouldReserveHeaderSpace = isScratchBuilder;

  // Render single-column layout
  if (layout.type === 'single-column') {
    // For banner headers, we need top padding (at least 16px) to create gap between banner and content
    // For non-banner headers, don't add top padding - header's bottom padding handles spacing
    const bannerContentTopPadding = Math.max(16, parseInt(spacing.pagePadding.top) || 0);
    const contentPaddingStyle: React.CSSProperties = isBannerHeader
      ? {
          padding: `${bannerContentTopPadding}px ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
        }
      : {
          padding: `0 ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
        };

    return (
      <div className={`resume-v2 ${className}`} style={containerStyle}>
        {/* Decorative Elements */}
        {decorationsConfig?.enabled && (
          <ResumeDecorations
            config={decorationsConfig}
            primaryColor={colors.primary}
            secondaryColor={colors.secondary}
            accentBackground={colors.background.accent}
          />
        )}

        {/* Header */}
        {isSectionEnabled('header') ? (
          <>
            {isBannerHeader ? (
              <HeaderSection
                resumeData={resumeData}
                config={config}
                editable={editable}
                variantOverride={isValidHeaderVariant ? (headerVariant as any) : undefined}
              />
            ) : (
              <div
                  style={{
                    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} 0 ${spacing.pagePadding.left}`,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <HeaderSection
                    resumeData={resumeData}
                    config={config}
                    editable={editable}
                    variantOverride={isValidHeaderVariant ? (headerVariant as any) : undefined}
                  />
                </div>
            )}
          </>
        ) : shouldReserveHeaderSpace ? (
          // Reserve space for header even if not enabled (for scratch builder)
          <div style={{
            minHeight: isBannerHeader ? '100px' : '80px',
            padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} 0 ${spacing.pagePadding.left}`,
          }} />
        ) : null}

        {/* Content - Apply padding directly to content wrapper */}
        <div style={{ ...contentPaddingStyle, position: 'relative', zIndex: 2 }}>
          {getOrderedSections().map((section, index) => renderSection(section, index === 0))}

          {/* Add Section Button - Single Column */}
          {editable && onOpenAddSection && (
            <button
              onClick={() => onOpenAddSection('main')}
              className="w-full mt-3 py-2 rounded-xl text-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-1.5 text-sm font-medium print:hidden"
              style={{ border: '1px dashed #93c5fd' }}
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          )}
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

  // For banner headers, ensure at least 16px top padding for proper spacing
  const twoColumnBannerTopPadding = Math.max(16, parseInt(spacing.pagePadding.top) || 0);
  const twoColumnContentPadding: React.CSSProperties = {
    padding:
      isBannerHeader
        ? `${twoColumnBannerTopPadding}px ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`
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

  // Calculate sidebar padding - ensure outer edge aligns with page padding
  // The page padding already handles the outer edges, so sidebar padding should only apply to inner edges
  // NO top padding so sidebar content aligns with main column content
  const getSidebarPadding = () => {
    const sidebarPadding = layout.sidebarPadding || '0';
    if (typeof sidebarPadding === 'string' && sidebarPadding !== '0') {
      // Parse padding value (assumes single value for all sides)
      const paddingValue = sidebarPadding.trim();
      // For right sidebar: no right padding (page padding handles it), no top padding (align with main)
      // For left sidebar: no left padding (page padding handles it), no top padding (align with main)
      return isRightSidebar
        ? `0 0 ${paddingValue} ${paddingValue}` // top right bottom left
        : `0 ${paddingValue} ${paddingValue} 0`; // top right bottom left
    }
    return '0';
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
    padding: getSidebarPadding(),
  };

  return (
    <div className={`resume-v2 ${className}`} style={containerStyle}>
      {/* Decorative Elements */}
      {decorationsConfig?.enabled && (
        <ResumeDecorations
          config={decorationsConfig}
          primaryColor={colors.primary}
          secondaryColor={colors.secondary}
          accentBackground={colors.background.accent}
        />
      )}

      {/* Header - Full width */}
      {isSectionEnabled('header') ? (
        <>
          {isBannerHeader ? (
            <HeaderSection
              resumeData={resumeData}
              config={config}
              editable={editable}
              variantOverride={isValidHeaderVariant ? (headerVariant as any) : undefined}
            />
          ) : (
            <div style={{ ...headerWrapperPadding, position: 'relative', zIndex: 2 }}>
              <HeaderSection
                resumeData={resumeData}
                config={config}
                editable={editable}
                variantOverride={isValidHeaderVariant ? (headerVariant as any) : undefined}
              />
            </div>
          )}
        </>
      ) : shouldReserveHeaderSpace ? (
        // Reserve space for header even if not enabled (for scratch builder)
        <div style={{
          minHeight: isBannerHeader ? '100px' : '80px',
          ...headerWrapperPadding,
        }} />
      ) : null}

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
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left column - Sidebar for two-column-left, Main for two-column-right */}
        <div style={isRightSidebar ? mainColumnStyle : sidebarColumnStyle}>
          {(isRightSidebar ? mainSections : sidebarSections).map((section, index) => renderSection(section, index === 0))}

          {/* Add Section Button - Left Column */}
          {editable && onOpenAddSection && (
            <button
              onClick={() => onOpenAddSection(isRightSidebar ? 'main' : 'sidebar')}
              className="w-full mt-3 py-2 rounded-2xl text-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-1 text-xs font-medium print:hidden"
              style={{ border: '2px dashed #93c5fd' }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add Section
            </button>
          )}
        </div>

        {/* Right column - Main for two-column-left, Sidebar for two-column-right */}
        <div style={isRightSidebar ? sidebarColumnStyle : mainColumnStyle}>
          {(isRightSidebar ? sidebarSections : mainSections).map((section, index) => renderSection(section, index === 0))}

          {/* Add Section Button - Right Column */}
          {editable && onOpenAddSection && (
            <button
              onClick={() => onOpenAddSection(isRightSidebar ? 'sidebar' : 'main')}
              className="w-full mt-3 py-2 rounded-2xl text-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-1 text-xs font-medium print:hidden"
              style={{ border: '2px dashed #93c5fd' }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add Section
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeRenderer;
