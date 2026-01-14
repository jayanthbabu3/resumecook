/**
 * Theater Actor Pro Template Component
 *
 * A professional portfolio-style layout for actors with:
 * - Photo left, name/title/summary right
 * - Gray contact bar with icons
 * - Two-column body: Work Experience & Workshops (left), Skills & Education (right)
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

const TheaterActorProContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
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

  // Body padding - explicit padding for content area
  const bodyStyle: React.CSSProperties = {
    padding: '24px 28px',
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
      {/* Header - Full width with photo and contact bar */}
      <HeaderSection
        resumeData={resumeData}
        config={config}
        editable={editable}
      />

      {/* Two-column layout for body sections */}
      <div style={bodyStyle}>
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

export const TheaterActorProTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <TheaterActorProContent {...props} />
    </BaseTemplateProvider>
  );
};

export default TheaterActorProTemplate;
