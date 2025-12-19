/**
 * Refined Portrait Template Component
 *
 * Single-column layout with centered portrait header and soft neutral backdrop.
 */

import React from 'react';
import { Mail, MapPin, Phone, Linkedin, Globe, Github } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { TemplateComponentProps } from '../types';
import {
  BaseTemplateProvider,
  useBaseTemplate,
  useOrderedSections,
  TemplateSectionRenderer,
} from '../BaseTemplate';

// ============================================================================
// TEMPLATE CONTENT
// ============================================================================

const RefinedPortraitContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { personalInfo } = resumeData;
  const sections = useOrderedSections();

  const accent = config.colors.primary;

  const outerStyle: React.CSSProperties = {
    fontFamily: config.fontFamily.primary,
    fontSize: config.typography.body.fontSize,
    lineHeight: config.typography.body.lineHeight,
    color: config.typography.body.color,
    backgroundColor: '#eef1f4',
    padding: '28px 0',
    display: 'flex',
    justifyContent: 'center',
  };

  const pageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: config.colors.background.page,
    boxShadow: '0 18px 48px rgba(31, 41, 55, 0.12)',
    borderRadius: '16px',
    border: `1px solid ${config.colors.border}`,
    overflow: 'hidden',
  };

  const headerWrapStyle: React.CSSProperties = {
    padding: '22px 28px 16px 28px',
    textAlign: 'center',
    borderBottom: `1px solid ${config.colors.border}`,
  };

  const contactBarStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 14px',
    borderRadius: '999px',
    border: `1px solid ${config.colors.border}`,
    backgroundColor: '#f7f7f7',
    marginTop: '12px',
    flexWrap: 'wrap',
  };

  const contentStyle: React.CSSProperties = {
    padding: `${config.spacing.pagePadding.top} ${config.spacing.pagePadding.right} ${config.spacing.pagePadding.bottom} ${config.spacing.pagePadding.left}`,
    display: 'flex',
    flexDirection: 'column',
    gap: config.spacing.sectionGap,
  };

  const renderInitials = (name: string) => {
    if (!name) return 'AA';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderPhoto = () => {
    const size = config.header.photoSize || '88px';
    const photoUrl = personalInfo.photo;

    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${accent}`,
          margin: '0 auto 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          color: accent,
          fontWeight: 700,
          letterSpacing: '0.06em',
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={personalInfo.fullName || 'Profile photo'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span>{renderInitials(personalInfo.fullName || '')}</span>
        )}
      </div>
    );
  };

  const renderContactItem = (
    icon: React.ElementType,
    value: string,
    path: string,
    href?: string,
  ) => {
    if (!editable && (!value || !value.trim())) return null;

    const Icon = icon;
    const itemContent = (
      <div className="flex items-center gap-1.5" style={{ fontSize: config.typography.contact.fontSize }}>
        <Icon style={{ width: 14, height: 14, color: accent }} />
        {editable ? (
          <InlineEditableText
            path={path}
            value={value || 'Click to edit'}
            style={{ color: config.typography.contact.color }}
          />
        ) : (
          <span style={{ color: config.typography.contact.color }}>{value}</span>
        )}
      </div>
    );

    if (href) {
      return (
        <a
          key={path}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: config.typography.contact.color }}
        >
          {itemContent}
        </a>
      );
    }

    return (
      <div key={path} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {itemContent}
      </div>
    );
  };

  const contactItems = [
    renderContactItem(Phone, personalInfo.phone || '', 'personalInfo.phone'),
    renderContactItem(Mail, personalInfo.email || '', 'personalInfo.email'),
    renderContactItem(MapPin, personalInfo.location || '', 'personalInfo.location'),
    renderContactItem(
      Linkedin,
      personalInfo.linkedin || '',
      'personalInfo.linkedin',
      personalInfo.linkedin ? (personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`) : undefined,
    ),
    renderContactItem(
      Github,
      personalInfo.github || '',
      'personalInfo.github',
      personalInfo.github ? (personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`) : undefined,
    ),
    renderContactItem(
      Globe,
      personalInfo.portfolio || '',
      'personalInfo.portfolio',
      personalInfo.portfolio ? (personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`) : undefined,
    ),
  ].filter(Boolean);

  return (
    <div style={outerStyle}>
      <div style={pageStyle}>
        <div style={headerWrapStyle}>
          {renderPhoto()}
          <InlineEditableText
            path="personalInfo.fullName"
            value={personalInfo.fullName || 'Your Name'}
            as="h1"
            style={{
              fontSize: config.typography.name.fontSize,
              fontWeight: config.typography.name.fontWeight,
              letterSpacing: config.typography.name.letterSpacing,
              textTransform: config.typography.name.textTransform,
              color: config.typography.name.color,
              margin: 0,
            }}
          />

          {personalInfo.title && (
            <InlineEditableText
              path="personalInfo.title"
              value={personalInfo.title}
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
          )}

          {contactItems.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={contactBarStyle}>{contactItems}</div>
            </div>
          )}

          <div
            style={{
              width: '60px',
              height: '3px',
              backgroundColor: accent,
              borderRadius: '999px',
              margin: '18px auto 0',
            }}
          />
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

export const RefinedPortraitTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <RefinedPortraitContent {...props} />
    </BaseTemplateProvider>
  );
};

export default RefinedPortraitTemplate;
