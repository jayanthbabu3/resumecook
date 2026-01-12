/**
 * Base Template Component
 * 
 * Provides common functionality for all V2 templates:
 * - Section ordering and filtering
 * - Common layout utilities
 * - Section rendering helpers
 */

import React from 'react';
import type { BaseTemplateProps } from './types';
import type { SectionConfig } from '../types';
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
  SectionHeading,
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
} from '../components/sections';

// ============================================================================
// TYPES
// ============================================================================

interface BaseTemplateContextValue {
  config: BaseTemplateProps['config'];
  resumeData: BaseTemplateProps['resumeData'];
  editable: boolean;
  sectionLabels?: Record<string, string>;
  enabledSections?: string[];
  sectionOrder?: string[];
}

// ============================================================================
// CONTEXT
// ============================================================================

const BaseTemplateContext = React.createContext<BaseTemplateContextValue | null>(null);

export const useBaseTemplate = () => {
  const context = React.useContext(BaseTemplateContext);
  if (!context) {
    throw new Error('useBaseTemplate must be used within BaseTemplate');
  }
  return context;
};

// ============================================================================
// HELPER HOOKS
// ============================================================================

export const useOrderedSections = (column?: 'main' | 'sidebar') => {
  const { config, enabledSections, sectionOrder } = useBaseTemplate();
  
  return React.useMemo(() => {
    let sections = config.sections.filter(s => {
      // Skip header - rendered separately
      if (s.type === 'header') return false;
      // Filter by column if specified
      if (column && s.column !== column) return false;
      // Check if enabled
      if (enabledSections && enabledSections.length > 0) {
        return enabledSections.includes(s.id);
      }
      return s.enabled;
    });

    // Apply custom order if provided
    if (sectionOrder && sectionOrder.length > 0) {
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
  }, [config.sections, column, enabledSections, sectionOrder]);
};

export const useSectionTitle = (section: SectionConfig): string => {
  const { sectionLabels } = useBaseTemplate();
  if (sectionLabels && sectionLabels[section.id]) {
    return sectionLabels[section.id];
  }
  return section.title || section.defaultTitle || section.type;
};

// ============================================================================
// SECTION RENDERER
// ============================================================================

interface SectionRendererProps {
  section: SectionConfig;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  onAddExperience?: () => void;
  onRemoveExperience?: (expId: string) => void;
  onAddEducation?: () => void;
  onRemoveEducation?: (eduId: string) => void;
  onAddProject?: () => void;
  onRemoveProject?: (projectId: string) => void;
  onAddLanguage?: () => void;
  onRemoveLanguage?: (langId: string) => void;
  onUpdateLanguage?: (langId: string, field: string, value: string) => void;
  onAddCustomSectionItem?: (sectionIndex: number) => void;
  onRemoveCustomSectionItem?: (sectionIndex: number, itemIndex: number) => void;
}

export const TemplateSectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  onAddBulletPoint,
  onRemoveBulletPoint,
  onAddExperience,
  onRemoveExperience,
  onAddEducation,
  onRemoveEducation,
  onAddProject,
  onRemoveProject,
  onAddLanguage,
  onRemoveLanguage,
  onUpdateLanguage,
  onAddCustomSectionItem,
  onRemoveCustomSectionItem,
}) => {
  const { config, resumeData, editable, sectionLabels } = useBaseTemplate();
  const title = sectionLabels?.[section.id] || section.title || section.defaultTitle || section.type;

  const wrapSection = (content: React.ReactNode) => (
    <div 
      data-section={section.type}
      style={{ 
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {content}
    </div>
  );

  switch (section.type) {
    case 'summary':
      return wrapSection(
        <SummarySection
          summary={resumeData.personalInfo.summary}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'experience':
      return wrapSection(
        <ExperienceSection
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
      return wrapSection(
        <EducationSection
          items={resumeData.education}
          config={config}
          editable={editable}
          sectionTitle={title}
          onAddEducation={onAddEducation}
          onRemoveEducation={onRemoveEducation}
        />
      );

    case 'skills':
      return wrapSection(
        <SkillsSection
          items={resumeData.skills}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'achievements':
      return wrapSection(
        <AchievementsSection
          items={resumeData.achievements || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'strengths':
      return wrapSection(
        <StrengthsSection
          items={resumeData.strengths || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'languages':
      const languageItems = resumeData.languages || [];
      return wrapSection(
        <LanguagesSection
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
      const customSections = resumeData.customSections || [];
      const customSection = customSections.find(
        s => s.id === section.id || 
             s.title?.toLowerCase() === section.title?.toLowerCase()
      );
      if (!customSection && !editable) return null;
      
      const sectionIndex = customSections.findIndex(
        s => s.id === section.id || 
             s.title?.toLowerCase() === section.title?.toLowerCase()
      );

      return wrapSection(
        <CustomSection
          section={customSection || { id: section.id, title: title, items: [] }}
          sectionIndex={sectionIndex >= 0 ? sectionIndex : customSections.length}
          config={config}
          editable={editable}
          onAddItem={onAddCustomSectionItem ? () => onAddCustomSectionItem(sectionIndex) : undefined}
          onRemoveItem={onRemoveCustomSectionItem ? (itemIndex: number) => onRemoveCustomSectionItem(sectionIndex, itemIndex) : undefined}
        />
      );

    case 'projects':
      return wrapSection(
        <ProjectsSection
          items={resumeData.projects || []}
          config={config}
          editable={editable}
          sectionTitle={title}
          onAddItem={onAddProject}
          onRemoveItem={onRemoveProject}
        />
      );

    case 'certifications':
      return wrapSection(
        <CertificationsSection
          items={resumeData.certifications || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'awards':
      return wrapSection(
        <AwardsSection
          items={resumeData.awards || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'publications':
      return wrapSection(
        <PublicationsSection
          items={resumeData.publications || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'volunteer':
      return wrapSection(
        <VolunteerSection
          items={resumeData.volunteer || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'speaking':
      return wrapSection(
        <SpeakingSection
          items={resumeData.speaking || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'patents':
      return wrapSection(
        <PatentsSection
          items={resumeData.patents || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'interests':
      return wrapSection(
        <InterestsSection
          items={resumeData.interests || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'references':
      return wrapSection(
        <ReferencesSection
          items={resumeData.references || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    case 'courses':
      return wrapSection(
        <CoursesSection
          items={resumeData.courses || []}
          config={config}
          editable={editable}
          sectionTitle={title}
        />
      );

    default:
      return null;
  }
};

// ============================================================================
// BASE TEMPLATE PROVIDER
// ============================================================================

interface BaseTemplateProviderProps extends BaseTemplateProps {
  children: React.ReactNode;
}

export const BaseTemplateProvider: React.FC<BaseTemplateProviderProps> = ({
  config,
  resumeData,
  editable = false,
  sectionLabels,
  enabledSections,
  sectionOrder,
  children,
}) => {
  const value: BaseTemplateContextValue = {
    config,
    resumeData,
    editable,
    sectionLabels,
    enabledSections,
    sectionOrder,
  };

  return (
    <BaseTemplateContext.Provider value={value}>
      {children}
    </BaseTemplateContext.Provider>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export { SectionHeading, HeaderSection };
