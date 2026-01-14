/**
 * Retail Manager Pro Template Component
 *
 * A clean, professional two-column layout with:
 * - Header with name, title, summary paragraph, and horizontal contact icons
 * - Left column: Work Experience, Education
 * - Right column: Skills, Projects, Certifications, Languages, Interests
 * - Teal accent color scheme
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

const RetailManagerProContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { spacing, colors, fontFamily, layout } = config;

  const sections = useOrderedSections();

  // Separate sections by column
  const mainSections = sections.filter(s => s.column === 'main');
  const sidebarSections = sections.filter(s => s.column === 'sidebar');

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

  // Two-column layout styles
  const columnsStyle: React.CSSProperties = {
    display: 'flex',
    gap: layout.columnGap,
  };

  const mainColumnStyle: React.CSSProperties = {
    width: layout.mainWidth,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sectionGap,
  };

  const sidebarColumnStyle: React.CSSProperties = {
    width: layout.sidebarWidth,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sectionGap,
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header - Full width with summary included */}
        <HeaderSection
          resumeData={resumeData}
          config={config}
          editable={editable}
        />

        {/* Two-column layout for body sections */}
        <div style={columnsStyle}>
          {/* Main column - left */}
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

          {/* Sidebar column - right */}
          <div style={sidebarColumnStyle}>
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

export const RetailManagerProTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <RetailManagerProContent {...props} />
    </BaseTemplateProvider>
  );
};

export default RetailManagerProTemplate;
