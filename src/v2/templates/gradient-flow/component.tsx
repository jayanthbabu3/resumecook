/**
 * Gradient Flow Template Component
 *
 * Modern asymmetric design with gradient accents
 * and clean typography for a fresh, contemporary feel.
 */

import React from 'react';
import type { TemplateComponentProps } from '../types';
import {
  BaseTemplateProvider,
  useBaseTemplate,
  useOrderedSections,
  TemplateSectionRenderer,
  HeaderSection,
} from '../BaseTemplate';

// ============================================================================
// TEMPLATE CONTENT
// ============================================================================

const GradientFlowContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { spacing, colors, fontFamily, typography } = config;

  const sections = useOrderedSections();

  // Container styles
  const containerStyle: React.CSSProperties = {
    fontFamily: fontFamily.primary,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    backgroundColor: colors.background.page,
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };

  // Page padding
  const contentStyle: React.CSSProperties = {
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
  };

  // Section stack with consistent spacing
  const sectionStackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sectionGap,
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <HeaderSection
          resumeData={resumeData}
          config={config}
          editable={editable}
        />

        {/* All sections in order */}
        <div style={sectionStackStyle}>
          {sections.map((section) => (
            <TemplateSectionRenderer
              key={section.id}
              section={section}
              onAddBulletPoint={props.onAddBulletPoint}
              onRemoveBulletPoint={props.onRemoveBulletPoint}
              onAddExperience={props.onAddExperience}
              onRemoveExperience={props.onRemoveExperience}
              onAddEducation={props.onAddEducation}
              onRemoveEducation={props.onRemoveEducation}
              onAddProject={props.onAddProject}
              onRemoveProject={props.onRemoveProject}
              onAddLanguage={props.onAddLanguage}
              onRemoveLanguage={props.onRemoveLanguage}
              onUpdateLanguage={props.onUpdateLanguage}
              onAddCustomSectionItem={props.onAddCustomSectionItem}
              onRemoveCustomSectionItem={props.onRemoveCustomSectionItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const GradientFlowTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <GradientFlowContent {...props} />
    </BaseTemplateProvider>
  );
};

export default GradientFlowTemplate;
