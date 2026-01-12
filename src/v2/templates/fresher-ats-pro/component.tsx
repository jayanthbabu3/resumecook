/**
 * Fresher ATS Pro Template Component
 *
 * Highly ATS-optimized resume for fresh graduates.
 * Features:
 * - Clean single-column layout for maximum ATS compatibility
 * - Centered header with clear contact information
 * - Skills in category-lines format
 * - Projects in 2-column grid
 * - Thick underline section headings
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

const FresherAtsProContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
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

  const headerStyle: React.CSSProperties = {
    marginBottom: spacing.sectionGap,
    paddingBottom: '12px',
    borderBottom: `1px solid ${colors.border}`,
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sectionGap,
  };

  return (
    <div style={containerStyle}>
      {/* Header with centered layout */}
      <div style={headerStyle}>
        <HeaderSection resumeData={resumeData} config={config} editable={editable} />
      </div>

      {/* Main content - single column for ATS */}
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

export const FresherAtsProTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <FresherAtsProContent {...props} />
    </BaseTemplateProvider>
  );
};

export default FresherAtsProTemplate;
