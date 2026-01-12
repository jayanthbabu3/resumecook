/**
 * Fresher Bold Template Component
 * 
 * Bold two-column layout with strong visual hierarchy.
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

const FresherBoldContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { spacing, colors, fontFamily, layout } = config;
  
  const sections = useOrderedSections();
  const sidebarSections = sections.filter(s => s.column === 'sidebar');
  const mainSections = sections.filter(s => s.column === 'main');

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
  };

  const columnsStyle: React.CSSProperties = {
    display: 'flex',
    gap: layout.columnGap,
  };

  const mainStyle: React.CSSProperties = {
    width: layout.mainWidth,
  };

  const sidebarStyle: React.CSSProperties = {
    width: layout.sidebarWidth,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <HeaderSection resumeData={resumeData} config={config} editable={editable} />
      </div>
      <div style={columnsStyle}>
        <div style={mainStyle}>
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
        <div style={sidebarStyle}>
          {sidebarSections.map((section) => (
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
    </div>
  );
};

export const FresherBoldTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <FresherBoldContent {...props} />
    </BaseTemplateProvider>
  );
};

export default FresherBoldTemplate;
