/**
 * Professional Blue Template Component
 * 
 * Clean professional design with blue accent, centered section headers,
 * and structured layout. Ideal for corporate and traditional industries.
 */

import React from 'react';
import type { TemplateComponentProps } from '../types';
import {
  BaseTemplateProvider,
  useBaseTemplate,
  useOrderedSections,
  TemplateSectionRenderer,
} from '../BaseTemplate';
import { InlineEditableText } from '@/components/resume/InlineEditableText';

// ============================================================================
// CUSTOM HEADER FOR THIS TEMPLATE
// ============================================================================

const ProfessionalBlueHeader: React.FC = () => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { personalInfo } = resumeData;
  const { typography, colors } = config;

  const accentColor = colors.primary;

  return (
    <div style={{ 
      textAlign: 'center', 
      paddingBottom: '16px',
      borderBottom: `1px solid #e5e7eb`,
      marginBottom: '20px',
    }}>
      {/* Name */}
      <h1 style={{
        fontSize: typography.name.fontSize,
        fontWeight: typography.name.fontWeight,
        color: accentColor,
        letterSpacing: typography.name.letterSpacing,
        textTransform: 'uppercase' as const,
        margin: 0,
        marginBottom: '8px',
      }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={personalInfo.fullName}
            placeholder="Your Name"
            style={{ textAlign: 'center' }}
          />
        ) : (
          personalInfo.fullName
        )}
      </h1>

      {/* Contact Info */}
      <div style={{
        fontSize: typography.contact.fontSize,
        color: typography.contact.color,
        lineHeight: 1.6,
      }}>
        <div style={{ marginBottom: '2px' }}>
          {editable ? (
            <InlineEditableText
              path="personalInfo.location"
              value={personalInfo.location}
              placeholder="City, Country"
              style={{ textAlign: 'center' }}
            />
          ) : (
            personalInfo.location
          )}
        </div>
        <div>
          {editable ? (
            <>
              <InlineEditableText
                path="personalInfo.phone"
                value={personalInfo.phone}
                placeholder="+1 234 567 8900"
              />
            </>
          ) : (
            personalInfo.phone
          )}
        </div>
        <div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.email"
              value={personalInfo.email}
              placeholder="email@example.com"
            />
          ) : (
            personalInfo.email
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CUSTOM SECTION HEADING
// ============================================================================

const ProfessionalBlueSectionHeading: React.FC<{ title: string }> = ({ title }) => {
  const { config } = useBaseTemplate();
  const { typography, colors } = config;

  return (
    <div style={{ 
      textAlign: 'center', 
      marginBottom: '12px',
    }}>
      <h2 style={{
        fontSize: typography.sectionHeading.fontSize,
        fontWeight: typography.sectionHeading.fontWeight,
        color: colors.primary,
        letterSpacing: typography.sectionHeading.letterSpacing,
        textTransform: 'uppercase' as const,
        margin: 0,
        display: 'inline-block',
        borderBottom: `2px solid ${colors.primary}`,
        paddingBottom: '4px',
      }}>
        {title}
      </h2>
    </div>
  );
};

// ============================================================================
// TEMPLATE CONTENT
// ============================================================================

const ProfessionalBlueContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
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
    borderLeft: `4px solid ${colors.primary}`,
  };

  // Page padding
  const contentStyle: React.CSSProperties = {
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
    maxWidth: '800px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <ProfessionalBlueHeader />

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.id} style={{ marginBottom: spacing.sectionGap }}>
            {section.type !== 'header' && section.type !== 'summary' && (
              <ProfessionalBlueSectionHeading title={section.title} />
            )}
            {section.type === 'summary' && (
              <ProfessionalBlueSectionHeading title={section.title} />
            )}
            <TemplateSectionRenderer
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
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ProfessionalBlueTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <ProfessionalBlueContent {...props} />
    </BaseTemplateProvider>
  );
};

export default ProfessionalBlueTemplate;
