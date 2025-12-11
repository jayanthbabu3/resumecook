/**
 * Executive Split Template Component
 * 
 * Two-column layout with:
 * - Left column (main): Summary, Experience, Education
 * - Right column (sidebar): Strengths, Skills, Achievements
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

const ExecutiveSplitContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { layout, spacing, colors, fontFamily } = config;
  
  const mainSections = useOrderedSections('main');
  const sidebarSections = useOrderedSections('sidebar');

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

  // Two column layout
  const columnsStyle: React.CSSProperties = {
    display: 'flex',
    gap: layout.columnGap || '24px',
  };

  const mainColumnStyle: React.CSSProperties = {
    flex: `0 0 ${layout.mainWidth || '62%'}`,
    minWidth: 0,
  };

  const sidebarStyle: React.CSSProperties = {
    flex: `0 0 ${layout.sidebarWidth || '35%'}`,
    minWidth: 0,
    backgroundColor: layout.sidebarBackground || 'transparent',
    padding: layout.sidebarPadding || '0',
    borderRadius: layout.sidebarBackground ? '8px' : '0',
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

        {/* Two Column Layout */}
        <div style={columnsStyle}>
          {/* Main Column */}
          <div style={mainColumnStyle}>
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

          {/* Sidebar */}
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
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ExecutiveSplitTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <ExecutiveSplitContent {...props} />
    </BaseTemplateProvider>
  );
};

export default ExecutiveSplitTemplate;
