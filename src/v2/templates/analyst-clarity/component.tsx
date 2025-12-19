/**
 * Analyst Clarity Template Component
 *
 * Clean single-column layout with crisp blue accents and lined section headings.
 */

import React from 'react';
import { Mail, Phone, Linkedin, MapPin, Globe } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { TemplateComponentProps } from '../types';
import {
  BaseTemplateProvider,
  useBaseTemplate,
  useOrderedSections,
  TemplateSectionRenderer,
} from '../BaseTemplate';

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const ContactItem: React.FC<{
  icon: React.ElementType;
  value?: string;
  path: string;
  href?: (value: string) => string;
}> = ({ icon: Icon, value = '', path, href }) => {
  const { config, editable } = useBaseTemplate();
  const accent = config.colors.primary;

  if (!editable && !value) return null;

  const displayValue = value || 'Click to edit';
  const content = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: config.typography.contact.fontSize,
        color: config.typography.contact.color,
      }}
    >
      <Icon style={{ width: 14, height: 14, color: accent }} />
      {editable ? (
        <InlineEditableText path={path} value={displayValue} />
      ) : (
        <span>{displayValue}</span>
      )}
    </div>
  );

  if (!editable && href && value) {
    return (
      <a
        href={href(value)}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {content}
      </a>
    );
  }

  return content;
};

// ============================================================================
// TEMPLATE CONTENT
// ============================================================================

const AnalystClarityContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { personalInfo } = resumeData;
  const sections = useOrderedSections();

  const accent = config.colors.primary;

  const outerStyle: React.CSSProperties = {
    fontFamily: config.fontFamily.primary,
    fontSize: config.typography.body.fontSize,
    lineHeight: config.typography.body.lineHeight,
    color: config.typography.body.color,
    backgroundColor: '#f3f4f6',
    display: 'flex',
    justifyContent: 'center',
    padding: '18px 0',
  };

  const pageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: config.colors.background.page,
    boxShadow: '0 18px 42px rgba(0, 0, 0, 0.08)',
    borderRadius: '8px',
    overflow: 'hidden',
    border: `1px solid ${config.colors.border}`,
  };

  const headerStyle: React.CSSProperties = {
    position: 'relative',
    padding: '18px 22px 16px 22px',
    backgroundColor: '#f7fbff',
    borderBottom: `2px solid ${config.colors.border}`,
  };

  const contentStyle: React.CSSProperties = {
    padding: `${config.spacing.pagePadding.top} ${config.spacing.pagePadding.right} ${config.spacing.pagePadding.bottom} ${config.spacing.pagePadding.left}`,
    display: 'flex',
    flexDirection: 'column',
    gap: config.spacing.sectionGap,
  };

  const cornerAccent: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '180px',
    height: '110px',
    background: `linear-gradient(135deg, ${accent} 0%, ${config.colors.secondary} 100%)`,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
    opacity: 0.9,
  };

  const contactWrapper: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  return (
    <div style={outerStyle}>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <div style={cornerAccent} />
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div style={contactWrapper}>
              <ContactItem icon={Phone} value={personalInfo.phone} path="personalInfo.phone" />
              <ContactItem icon={Mail} value={personalInfo.email} path="personalInfo.email" />
              <ContactItem icon={Linkedin} value={personalInfo.linkedin} path="personalInfo.linkedin" href={(val) => (val.startsWith('http') ? val : `https://${val}`)} />
              <ContactItem icon={Globe} value={personalInfo.portfolio} path="personalInfo.portfolio" href={(val) => (val.startsWith('http') ? val : `https://${val}`)} />
            </div>

            <div style={{ textAlign: 'right', flex: 1 }}>
              <InlineEditableText
                path="personalInfo.fullName"
                value={personalInfo.fullName || 'Your Name'}
                as="h1"
                style={{
                  fontSize: config.typography.name.fontSize,
                  fontWeight: config.typography.name.fontWeight,
                  letterSpacing: config.typography.name.letterSpacing,
                  color: config.typography.name.color,
                  margin: 0,
                }}
              />
              <InlineEditableText
                path="personalInfo.title"
                value={personalInfo.title || 'Your Title'}
                as="p"
                style={{
                  fontSize: config.typography.title.fontSize,
                  fontWeight: config.typography.title.fontWeight,
                  letterSpacing: config.typography.title.letterSpacing,
                  textTransform: config.typography.title.textTransform,
                  color: config.typography.title.color,
                  margin: '4px 0 0 0',
                }}
              />
              {(personalInfo.location || editable) && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '8px',
                    color: config.typography.contact.color,
                    marginTop: '8px',
                  }}
                >
                  <MapPin style={{ width: 14, height: 14, color: accent }} />
                  <InlineEditableText
                    path="personalInfo.location"
                    value={personalInfo.location || 'Location'}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={contentStyle}>
          {sections.map((section) => (
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
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const AnalystClarityTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <AnalystClarityContent {...props} />
    </BaseTemplateProvider>
  );
};

export default AnalystClarityTemplate;
