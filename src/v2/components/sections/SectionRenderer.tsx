/**
 * Section Renderer Component
 * 
 * Universal section renderer that dispatches to the correct variant renderer
 * based on section type and variant configuration.
 * 
 * This is the main entry point for rendering any section in the resume.
 */

import React from 'react';
import type { TemplateConfig, SectionConfig, V2ResumeData } from '../../types';
import { SectionHeading } from './SectionHeading';
import { getSectionDefinition } from '../../registry/sectionRegistry';

// Import variant renderers
import { SkillsVariantRenderer } from './variants/skills';
import { ExperienceVariantRenderer } from './variants/experience';
import { EducationVariantRenderer } from './variants/education';

// ============================================================================
// TYPES
// ============================================================================

interface SectionRendererProps {
  /** Section configuration */
  section: SectionConfig;
  /** Resume data */
  resumeData: V2ResumeData;
  /** Template configuration */
  config: TemplateConfig;
  /** Enable inline editing */
  editable?: boolean;
  /** Custom section title override */
  titleOverride?: string;
  /** Callbacks for editing */
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  onAddExperience?: () => void;
  onRemoveExperience?: (expId: string) => void;
  onAddEducation?: () => void;
  onRemoveEducation?: (eduId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  resumeData,
  config,
  editable = false,
  titleOverride,
  onAddBulletPoint,
  onRemoveBulletPoint,
  onAddExperience,
  onRemoveExperience,
  onAddEducation,
  onRemoveEducation,
}) => {
  const { spacing, colors } = config;
  const accentColor = colors.primary;
  
  // Get section definition from registry
  const sectionDef = getSectionDefinition(section.type as any);
  
  // Get section title
  const title = titleOverride || section.title || sectionDef?.defaultTitle || section.type;
  
  // Get variant from section config or default
  const variant = (section as any).variant || sectionDef?.defaultVariant || 'standard';

  // Render section content based on type
  const renderContent = () => {
    switch (section.type) {
      case 'skills':
        return (
          <SkillsVariantRenderer
            variant={variant}
            items={resumeData.skills || []}
            config={config}
            accentColor={accentColor}
            editable={editable}
          />
        );

      case 'experience':
        return (
          <ExperienceVariantRenderer
            variant={variant}
            items={resumeData.experience || []}
            config={config}
            accentColor={accentColor}
            editable={editable}
            onAddBulletPoint={onAddBulletPoint}
            onRemoveBulletPoint={onRemoveBulletPoint}
            onAddExperience={onAddExperience}
            onRemoveExperience={onRemoveExperience}
          />
        );

      case 'education':
        return (
          <EducationVariantRenderer
            variant={variant}
            items={resumeData.education || []}
            config={config}
            accentColor={accentColor}
            editable={editable}
            onAddEducation={onAddEducation}
            onRemoveEducation={onRemoveEducation}
          />
        );

      // For other section types, return null (they use existing components)
      default:
        return null;
    }
  };

  const content = renderContent();
  
  // If no content and not using variant renderer, return null
  if (!content) return null;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={title}
        config={config}
        editable={editable}
        accentColor={accentColor}
      />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {content}
      </div>
    </section>
  );
};

export default SectionRenderer;
