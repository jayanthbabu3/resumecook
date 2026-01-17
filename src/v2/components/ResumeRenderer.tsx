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
  /** Font family override (for font selector) */
  fontFamily?: string;
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
  /** Callback for adding skill */
  onAddSkill?: () => void;
  /** Callback for removing skill */
  onRemoveSkill?: (id: string) => void;
  /** Callback for updating skill */
  onUpdateSkill?: (id: string, field: string, value: string) => void;
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
  onAddSkill,
  onRemoveSkill,
  onUpdateSkill,
  className = '',
  onChangeSectionVariant,
  onOpenAddSection,
  fontFamily: fontFamilyOverride,
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
  const { config: baseConfig, getEnabledSections } = templateConfigHook;

  // Override font family if provided (for font selector)
  const config = React.useMemo(() => {
    if (fontFamilyOverride) {
      console.log('ResumeRenderer - Applying fontFamily override:', fontFamilyOverride);
      return {
        ...baseConfig,
        fontFamily: {
          ...baseConfig.fontFamily,
          primary: fontFamilyOverride,
        }
      };
    }
    return baseConfig;
  }, [baseConfig, fontFamilyOverride]);

  const { layout, spacing, colors, fontFamily } = config;

  // Debug: Log fontFamily to verify it's being passed correctly
  React.useEffect(() => {
    console.log('ResumeRenderer fontFamily:', fontFamily);
  }, [fontFamily]);

  // Debug: Log customSections changes
  React.useEffect(() => {
    console.log('[ResumeRenderer] customSections changed:', resumeData.customSections);
  }, [resumeData.customSections]);

  // Get style options for section visibility
  const styleOptionsContext = useStyleOptions();

  // Get section title with custom label support
  const getSectionTitle = (section: SectionConfig): string => {
    if (sectionLabels && sectionLabels[section.id]) {
      return sectionLabels[section.id];
    }
    return section.title;
  };

  // Header variants that have summary integrated (no separate summary section needed)
  const headerVariantsWithIntegratedSummary = [
    'summary-banner',
    'banner-with-summary',
    'clean-summary-contact',
    'photo-summary-contact-bar',
    'gradient-split-contact',
    'photo-dark-contact-bar',
    'summary-photo-right',
  ];

  // Check if section is enabled (considers both enabledSections and styleOptions)
  const isSectionEnabled = (sectionId: string): boolean => {
    // If header has integrated summary, always hide the separate summary section
    if (sectionId === 'summary' && headerVariantsWithIntegratedSummary.includes(config.header?.variant || '')) {
      return false;
    }

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

    // If enabledSections is provided and has items, use it as the source of truth
    if (enabledSections && enabledSections.length > 0) {
      return enabledSections.includes(sectionId);
    }

    // Check if section exists in config
    const section = config.sections.find(s => s.id === sectionId);
    if (section) {
      return section.enabled ?? false;
    }

    // For sections NOT in template config but have data in resumeData,
    // consider them enabled by default (they'll be dynamically added in getOrderedSections)
    // This handles uploaded/parsed resumes with sections the template doesn't define
    const dynamicSectionDataMap: Record<string, boolean> = {
      projects: (resumeData.projects?.length || 0) > 0,
      certifications: (resumeData.certifications?.length || 0) > 0,
      awards: (resumeData.awards?.length || 0) > 0,
      publications: (resumeData.publications?.length || 0) > 0,
      volunteer: (resumeData.volunteer?.length || 0) > 0,
      speaking: (resumeData.speaking?.length || 0) > 0,
      patents: (resumeData.patents?.length || 0) > 0,
      interests: (resumeData.interests?.length || 0) > 0,
      references: (resumeData.references?.length || 0) > 0,
      courses: (resumeData.courses?.length || 0) > 0,
      languages: (resumeData.languages?.length || 0) > 0,
      strengths: (resumeData.strengths?.length || 0) > 0,
      achievements: (resumeData.achievements?.length || 0) > 0,
    };

    // If the section has data in resumeData, consider it enabled
    return dynamicSectionDataMap[sectionId] ?? false;
  };

  // Get sections in order, including any custom sections present only in resumeData
  const getOrderedSections = (column?: 'main' | 'sidebar'): SectionConfig[] => {
    // Base sections from template config - only include enabled sections
    // Note: isSectionEnabled already handles enabledSections override, so we don't need
    // to double-check s.enabled here. The enabledSections prop takes priority.
    const baseSections = config.sections.filter(s => {
      if (!isSectionEnabled(s.id)) return false;
      if (s.type === 'header') return false; // Header is rendered separately
      // Filter by column - for scratch builder, use the column from section config
      if (column) {
        const sectionColumn = s.column || 'main'; // Default to main if not specified
        if (sectionColumn !== column) return false;
      }
      return true;
    });

    let sections = [...baseSections];

    // === DYNAMIC SECTIONS: Add standard sections that exist in resumeData but not in template config ===
    // This ensures that when a resume is parsed/uploaded, ALL sections with data are shown
    // even if the template doesn't have them defined by default.
    const configSectionIds = new Set(config.sections.map(s => s.id));
    const configSectionTypes = new Set(config.sections.map(s => s.type));

    // Map of section type to data check and default config
    const standardSectionTypes: Array<{
      type: string;
      id: string;
      title: string;
      hasData: () => boolean;
      defaultColumn: 'main' | 'sidebar';
    }> = [
      { type: 'projects', id: 'projects', title: 'Projects', hasData: () => (resumeData.projects?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'certifications', id: 'certifications', title: 'Certifications', hasData: () => (resumeData.certifications?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'awards', id: 'awards', title: 'Awards', hasData: () => (resumeData.awards?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'publications', id: 'publications', title: 'Publications', hasData: () => (resumeData.publications?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'volunteer', id: 'volunteer', title: 'Volunteer Experience', hasData: () => (resumeData.volunteer?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'speaking', id: 'speaking', title: 'Speaking Engagements', hasData: () => (resumeData.speaking?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'patents', id: 'patents', title: 'Patents', hasData: () => (resumeData.patents?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'interests', id: 'interests', title: 'Interests', hasData: () => (resumeData.interests?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'references', id: 'references', title: 'References', hasData: () => (resumeData.references?.length || 0) > 0, defaultColumn: 'main' },
      { type: 'courses', id: 'courses', title: 'Courses', hasData: () => (resumeData.courses?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'languages', id: 'languages', title: 'Languages', hasData: () => (resumeData.languages?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'strengths', id: 'strengths', title: 'Core Strengths', hasData: () => (resumeData.strengths?.length || 0) > 0, defaultColumn: 'sidebar' },
      { type: 'achievements', id: 'achievements', title: 'Achievements', hasData: () => (resumeData.achievements?.length || 0) > 0, defaultColumn: 'sidebar' },
    ];

    // Add dynamic sections for standard types that have data but either:
    // 1. Aren't in template config at all, OR
    // 2. Are in template config but disabled (and we have data for them)
    const dynamicStandardSections: SectionConfig[] = [];
    const includedSectionIds = new Set(sections.map(s => s.id));

    standardSectionTypes.forEach(sectionDef => {
      // Skip if already included in sections (either from config as enabled, or already added)
      if (includedSectionIds.has(sectionDef.id)) return;

      // Skip if no data
      if (!sectionDef.hasData()) return;

      // Skip if enabledSections is provided and doesn't include this section
      if (enabledSections && enabledSections.length > 0 && !enabledSections.includes(sectionDef.id)) return;

      // Check if section exists in config but is disabled
      const existingConfigSection = config.sections.find(s => s.id === sectionDef.id || s.type === sectionDef.type);
      const isDisabledInConfig = existingConfigSection && existingConfigSection.enabled === false;

      // If section exists in config and is explicitly enabled, it should already be in sections
      // If section exists in config but is disabled, and we have data, add it dynamically
      // If section doesn't exist in config at all, and we have data, add it dynamically

      // Determine column - use config's column if exists, otherwise default
      const sectionColumn = existingConfigSection?.column || sectionDef.defaultColumn;
      if (column && sectionColumn !== column) return;

      // Calculate order - append after existing sections in the same column
      const existingOrdersInColumn = sections
        .filter(s => (s.column || 'main') === sectionColumn)
        .map(s => s.order ?? 0);
      const maxOrder = existingOrdersInColumn.length > 0 ? Math.max(...existingOrdersInColumn) : 0;

      // Use title from config if available, otherwise use default
      const sectionTitle = existingConfigSection?.title || sectionDef.title;

      // Determine variant:
      // 1. If section exists in config (even if disabled), use its configured variant
      // 2. If section doesn't exist in config, use 'compact' as default (better look for dynamically added sections)
      const existingVariant = (existingConfigSection as any)?.variant;
      const sectionVariant = existingVariant || 'compact';

      dynamicStandardSections.push({
        type: sectionDef.type as any,
        id: sectionDef.id,
        title: sectionTitle,
        defaultTitle: sectionDef.title,
        enabled: true,
        order: maxOrder + 1 + dynamicStandardSections.length,
        column: sectionColumn,
        variant: sectionVariant,
      } as SectionConfig);
    });

    if (dynamicStandardSections.length > 0) {
      sections = [...sections, ...dynamicStandardSections];
    }

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
    console.log('[ResumeRenderer] Processing customSections:', resumeData.customSections);
    (resumeData.customSections || []).forEach((s, idx) => {
      const titleLower = (s.title || s.id || '').toLowerCase();
      console.log(`[ResumeRenderer] Checking customSection: id=${s.id}, title=${s.title}`);
      if (blockedTitles.has(titleLower)) {
        console.log(`[ResumeRenderer] Skipping blocked title: ${titleLower}`);
        return;
      }
      if (configIds.has(s.id)) {
        console.log(`[ResumeRenderer] Skipping - configIds has: ${s.id}`);
        return;
      }
      if (configTitles.has(titleLower)) {
        console.log(`[ResumeRenderer] Skipping - configTitles has: ${titleLower}`);
        return;
      }
      // Heuristic: send strengths/achievements to sidebar by default
      const inferredColumn: 'main' | 'sidebar' =
        (titleLower.includes('strength') || titleLower.includes('achievement'))
          ? 'sidebar'
          : 'main';
      const dynamicColumn = column || inferredColumn;
      // If a specific column is requested, only include matching column sections
      if (column && column !== dynamicColumn) return;
      const orderStart = maxOrderByColumn(dynamicColumn) || 0;
      const newDynamicSection = {
        type: 'custom',
        id: s.id,
        title: s.title || s.id,
        defaultTitle: s.title || s.id,
        enabled: true,
        order: orderStart + idx + 1, // append after existing sections in that column
        column: dynamicColumn,
      };
      console.log(`[ResumeRenderer] Adding dynamic customSection:`, newDynamicSection);
      dynamicSections.push(newDynamicSection as SectionConfig);
    });

    console.log('[ResumeRenderer] Final dynamicSections:', dynamicSections);
    if (dynamicSections.length) {
      sections = [...sections, ...dynamicSections];
      console.log('[ResumeRenderer] Total sections after adding dynamic:', sections.length);
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
      // Determine if this is a "small" section that should avoid breaking
      // Experience and education can break between entries, but small sections should stay together
      const smallSectionTypes = ['summary', 'skills', 'languages', 'strengths', 'interests', 'references', 'certifications', 'awards'];
      const isSmallSection = smallSectionTypes.includes(type);

      const style: React.CSSProperties = {
        position: 'relative',
        // First section needs top margin for spacing from header
        // Other sections: NO marginTop - sections already have marginBottom for spacing
        marginTop: isFirstSection ? '12px' : '0',
        maxWidth: '100%',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        // Small sections should avoid page breaks inside them
        // Large sections (experience, education, projects) can break between items
        ...(isSmallSection ? {
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
        } : {}),
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
          <div
            data-section={type}
            data-section-id={section.id}
            data-section-type={type}
            data-small-section={isSmallSection ? 'true' : 'false'}
            className="group pdf-section"
            style={style}
          >
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
              onAddSkill={onAddSkill}
              onRemoveSkill={onRemoveSkill}
              onUpdateSkill={onUpdateSkill}
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
            onAddSkill={onAddSkill}
            onRemoveSkill={onRemoveSkill}
            onUpdateSkill={onUpdateSkill}
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
        // Get variant - prioritize section.variant (from dynamic sections or sectionOverrides) over config default
        // Default to 'compact' for better look on dynamically added sections
        const languagesVariant = (section as any).variant || (config as any).languages?.variant || 'compact';
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
        console.log(`[ResumeRenderer] Rendering custom section: looking for id=${section.id}, title=${section.title}`);
        console.log(`[ResumeRenderer] Available customSections:`, customSections);
        const customSection = customSections.find(
          s => s.id === section.id ||
               s.id === `section-${section.id}` ||
               s.id.includes(section.id) ||
               s.title.toLowerCase() === section.title.toLowerCase()
        );
        console.log(`[ResumeRenderer] Found customSection:`, customSection);

        if (!customSection && !editable) {
          console.log(`[ResumeRenderer] No customSection found and not editable - returning null`);
          return null;
        }

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
    overflow: 'visible', // Changed from 'hidden' to allow decorations to be visible
    // Apply gradient background if decorations enabled
    ...gradientStyle,
    // CSS variables for StyleOptionsWrapper font scaling
    '--resume-name-size': config.typography.name.fontSize,
    '--resume-section-size': config.typography.sectionHeading.fontSize,
    '--resume-item-size': config.typography.itemTitle.fontSize,
    '--resume-body-size': config.typography.body.fontSize,
  } as React.CSSProperties;

  // Debug: Log container style fontFamily
  console.log('ResumeRenderer - containerStyle fontFamily:', containerStyle.fontFamily);

  // Force font inheritance on all content
  const fontInheritClass = 'resume-font-inherit';

  const headerVariant = config.header?.variant as string | undefined;
  const validHeaderVariants = ['split', 'centered', 'left-aligned', 'minimal', 'photo-left', 'photo-right', 'accent-bar', 'compact', 'gradient-banner', 'elegant-banner', 'banner-with-summary', 'creative-underline'];
  const isValidHeaderVariant = headerVariant && validHeaderVariants.includes(headerVariant);
  // Banner headers should render edge-to-edge without wrapper padding
  const isBannerHeader = headerVariant === 'banner' || headerVariant === 'banner-with-summary' || headerVariant === 'gradient-banner' || headerVariant === 'elegant-banner';
  
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
      <div className={`resume-v2 ${className}`} style={containerStyle} data-font-family={fontFamily.primary}>
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
    <div className={`resume-v2 ${className}`} style={containerStyle} data-font-family={fontFamily.primary}>
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
