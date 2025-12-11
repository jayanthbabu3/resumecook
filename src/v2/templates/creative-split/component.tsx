/**
 * Creative Split Template Component
 * 
 * Bold two-column layout for creative professionals.
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

const CreativeSplitContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
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
  };

  // Body content with padding
  const bodyStyle: React.CSSProperties = {
    padding: '24px 32px',
  };

  return (
    <div style={containerStyle}>
      {/* Header - full bleed banner */}
      <HeaderSection
        resumeData={resumeData}
        config={config}
        editable={editable}
      />

      {/* Sections with padding */}
      <div style={bodyStyle}>
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

export const CreativeSplitTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <CreativeSplitContent {...props} />
    </BaseTemplateProvider>
  );
};

export default CreativeSplitTemplate;
