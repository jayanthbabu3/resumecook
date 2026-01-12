/**
 * Fresher Creative Card Template Component
 *
 * Modern creative resume for fresh graduates with unique card-based design.
 * Features:
 * - Sidebar-card header with accent stripe
 * - Skills with bordered tags
 * - Projects in grid layout
 * - Left-border section headings
 * - Clean modern typography
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

const FresherCreativeCardContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { spacing, colors, fontFamily } = config;

  const sections = useOrderedSections();
  const mainSections = sections.filter((s) => s.column === 'main');

  const containerStyle: React.CSSProperties = {
    fontFamily: fontFamily.primary,
    fontSize: config.typography.body.fontSize,
    lineHeight: config.typography.body.lineHeight,
    color: config.typography.body.color,
    backgroundColor: colors.background.page,
    width: '100%',
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
  };

  const headerWrapperStyle: React.CSSProperties = {
    marginBottom: spacing.sectionGap,
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sectionGap,
  };

  return (
    <div style={containerStyle}>
      {/* Header with card styling */}
      <div style={headerWrapperStyle}>
        <HeaderSection resumeData={resumeData} config={config} editable={editable} />
      </div>

      {/* Main content - single column */}
      <div style={contentStyle}>
        {mainSections.map((section) => (
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

export const FresherCreativeCardTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <FresherCreativeCardContent {...props} />
    </BaseTemplateProvider>
  );
};

export default FresherCreativeCardTemplate;
