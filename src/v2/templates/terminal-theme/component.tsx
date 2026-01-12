/**
 * Terminal Theme Template Component
 *
 * Dark, terminal-inspired layout with neon accents and monospaced typography.
 */

import React from 'react';
import type { TemplateComponentProps } from '../types';
import { HeaderSection } from '../../components/sections/HeaderSection';
import {
  BaseTemplateProvider,
  useBaseTemplate,
  useOrderedSections,
  TemplateSectionRenderer,
} from '../BaseTemplate';

const TerminalThemeContent: React.FC<Omit<TemplateComponentProps, 'config'>> = props => {
  const { config, resumeData, editable } = useBaseTemplate();
  const mainSections = useOrderedSections('main');
  const sidebarSections = useOrderedSections('sidebar');

  const outerStyle: React.CSSProperties = {
    background: config.colors.background.page,
    padding: '22px 0',
    display: 'flex',
    justifyContent: 'center',
  };

  const pageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: config.colors.background.page,
    borderRadius: '12px',
    boxShadow: '0 22px 48px rgba(0, 0, 0, 0.4)',
    border: `1px solid ${config.colors.border}`,
    color: config.typography.body.color,
    fontFamily: config.fontFamily?.primary,
    overflow: 'hidden',
  };

  const contentWrapperStyle: React.CSSProperties = {
    padding: `${config.spacing.pagePadding.top} ${config.spacing.pagePadding.right} ${config.spacing.pagePadding.bottom} ${config.spacing.pagePadding.left}`,
  };

  const contentGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `${config.layout.mainWidth} ${config.layout.sidebarWidth}`,
    gap: config.layout.columnGap,
    alignItems: 'start',
    marginTop: config.spacing.sectionGap,
  };

  return (
    <div style={outerStyle}>
      <div style={pageStyle}>
        <HeaderSection resumeData={resumeData} config={config} editable={editable} />

        <div style={contentWrapperStyle}>
          <div style={contentGridStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: config.spacing.sectionGap }}>
              {mainSections.map(section => (
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

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: config.spacing.sectionGap,
                padding: config.layout.sidebarPadding || '10px 12px',
                backgroundColor: config.colors.background.sidebar || config.colors.background.section,
                border: `1px solid ${config.colors.border}`,
                borderRadius: '10px',
              }}
            >
              {sidebarSections.map(section => (
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
      </div>
    </div>
  );
};

export const TerminalThemeTemplate: React.FC<TemplateComponentProps> = props => {
  return (
    <BaseTemplateProvider {...props}>
      <TerminalThemeContent {...props} />
    </BaseTemplateProvider>
  );
};

export default TerminalThemeTemplate;
