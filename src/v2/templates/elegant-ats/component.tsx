/**
 * Elegant ATS Template Component
 *
 * Professional two-column layout with a structured sidebar and
 * accent details that stay ATS-friendly while remaining visually polished.
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

const ElegantAtsContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { layout, spacing, colors, fontFamily } = config;

  const mainSections = useOrderedSections('main');
  const sidebarSections = useOrderedSections('sidebar');

  // Outer wrapper to create page background
  const outerStyle: React.CSSProperties = {
    fontFamily: fontFamily.primary,
    fontSize: config.typography.body.fontSize,
    lineHeight: config.typography.body.lineHeight,
    color: config.typography.body.color,
    backgroundColor: '#f1f5f9',
    padding: '24px 0',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  };

  // Card-style page frame
  const frameStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '940px',
    backgroundColor: colors.background.page,
    border: `1px solid ${colors.border}`,
    boxShadow: '0 16px 60px rgba(15, 23, 42, 0.12)',
    borderRadius: '16px',
    overflow: 'hidden',
  };

  // Accent bar across the top for subtle branding
  const accentBarStyle: React.CSSProperties = {
    height: '6px',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary ?? colors.primary})`,
  };

  // Inner padding for resume content
  const contentStyle: React.CSSProperties = {
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
  };

  const headerContainerStyle: React.CSSProperties = {
    paddingBottom: '16px',
    marginBottom: spacing.sectionGap,
    borderBottom: `1px solid ${colors.border}`,
  };

  // Columns
  const columnsStyle: React.CSSProperties = {
    display: 'flex',
    gap: layout.columnGap || '24px',
    alignItems: 'flex-start',
  };

  const mainColumnStyle: React.CSSProperties = {
    flex: `0 0 ${layout.mainWidth || '68%'}`,
    minWidth: 0,
    paddingRight: '6px',
  };

  const sidebarStyle: React.CSSProperties = {
    flex: `0 0 ${layout.sidebarWidth || '30%'}`,
    minWidth: 0,
    backgroundColor: layout.sidebarBackground || colors.background.sidebar || '#f8fafc',
    color: layout.sidebarTextColor || colors.text.primary,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: layout.sidebarPadding || '16px',
    boxShadow: '0 6px 24px rgba(15, 23, 42, 0.06)',
  };

  const sectionStackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sectionGap,
  };

  return (
    <div style={outerStyle}>
      <div style={frameStyle}>
        <div style={accentBarStyle} />
        <div style={contentStyle}>
          {/* Header */}
          <div style={headerContainerStyle}>
            <HeaderSection
              resumeData={resumeData}
              config={config}
              editable={editable}
            />
          </div>

          <div style={columnsStyle}>
            {/* Main Column */}
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

            {/* Sidebar */}
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
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ElegantAtsTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <ElegantAtsContent {...props} />
    </BaseTemplateProvider>
  );
};

export default ElegantAtsTemplate;
