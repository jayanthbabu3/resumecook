/**
 * Frontend Horizon Template Component
 *
 * Single-column layout with modern spacing and banner header.
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

const FrontendHorizonContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { spacing, colors, fontFamily } = config;

  const sections = useOrderedSections();

  // Container styles
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

  // Page padding
  const contentStyle: React.CSSProperties = {
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
    maxWidth: '820px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <div style={{ marginBottom: spacing.sectionGap }}>
          <HeaderSection resumeData={resumeData} config={config} editable={editable} />
        </div>

        {/* Sections */}
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
            onAddLanguage={props.onAddLanguage}
            onRemoveLanguage={props.onRemoveLanguage}
            onUpdateLanguage={props.onUpdateLanguage}
            onAddCustomSectionItem={props.onAddCustomSectionItem}
            onRemoveCustomSectionItem={props.onRemoveCustomSectionItem}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const FrontendHorizonTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <FrontendHorizonContent {...props} />
    </BaseTemplateProvider>
  );
};

export default FrontendHorizonTemplate;
