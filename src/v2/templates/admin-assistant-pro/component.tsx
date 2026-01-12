/**
 * Admin Assistant Pro Template Component
 *
 * Professional two-column layout with golden/yellow accent color.
 * Features name in accent color, photo on top-right, summary with
 * contact separator line, and boxed skill tags.
 *
 * Note: Gradient backgrounds and decorations are handled by ResumeRenderer
 * based on the decorations config in the template configuration.
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

const AdminAssistantProContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { layout, spacing, colors, fontFamily, typography } = config;

  const mainSections = useOrderedSections('main');
  const sidebarSections = useOrderedSections('sidebar');

  // Page container
  const pageStyle: React.CSSProperties = {
    fontFamily: fontFamily.primary,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    backgroundColor: colors.background.page,
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
    width: '100%',
    boxSizing: 'border-box',
  };

  // Header container with bottom border
  const headerContainerStyle: React.CSSProperties = {
    paddingBottom: '20px',
    marginBottom: spacing.sectionGap,
    borderBottom: `1px solid ${colors.border}`,
  };

  // Two-column layout
  const columnsStyle: React.CSSProperties = {
    display: 'flex',
    gap: layout.columnGap || '28px',
    alignItems: 'flex-start',
  };

  const mainColumnStyle: React.CSSProperties = {
    flex: `0 0 ${layout.mainWidth || '62%'}`,
    minWidth: 0,
  };

  const sidebarStyle: React.CSSProperties = {
    flex: `0 0 ${layout.sidebarWidth || '35%'}`,
    minWidth: 0,
  };

  const sectionStackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sectionGap,
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerContainerStyle}>
        <HeaderSection
          resumeData={resumeData}
          config={config}
          editable={editable}
        />
      </div>

      <div style={columnsStyle}>
        {/* Main Column - Experience */}
        <div style={mainColumnStyle}>
          <div style={sectionStackStyle}>
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

        {/* Sidebar - Education, Skills */}
        <div style={sidebarStyle}>
          <div style={sectionStackStyle}>
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
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const AdminAssistantProTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <AdminAssistantProContent {...props} />
    </BaseTemplateProvider>
  );
};

export default AdminAssistantProTemplate;
