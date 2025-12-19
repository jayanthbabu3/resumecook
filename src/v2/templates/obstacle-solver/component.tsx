/**
 * Obstacle Solver Template Component
 *
 * Mirrors the provided reference with a centered header, teal accents, and
 * stacked single-column content.
 */

import React from 'react';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { TemplateComponentProps } from '../types';
import {
  BaseTemplateProvider,
  useBaseTemplate,
  useOrderedSections,
  TemplateSectionRenderer,
} from '../BaseTemplate';

const ContactChip: React.FC<{
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
        gap: '6px',
        color: config.typography.contact.color,
        fontSize: config.typography.contact.fontSize,
        padding: '6px 10px',
        backgroundColor: '#f1f8f9',
        borderRadius: '999px',
        border: `1px solid ${config.colors.border}`,
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

const HeaderBlock: React.FC = () => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { personalInfo } = resumeData;
  const accent = config.colors.primary;

  return (
    <div
      style={{
        padding: '18px 18px 14px',
        borderBottom: `2px solid ${config.colors.border}`,
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {(personalInfo.location || editable) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: config.typography.small.color }}>
            <MapPin style={{ width: 14, height: 14, color: accent }} />
            <InlineEditableText
              path="personalInfo.location"
              value={personalInfo.location || 'Location'}
              style={{ fontSize: config.typography.small.fontSize, color: config.typography.small.color }}
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <ContactChip icon={Mail} value={personalInfo.email} path="personalInfo.email" />
          <ContactChip icon={Phone} value={personalInfo.phone} path="personalInfo.phone" />
          <ContactChip
            icon={Linkedin}
            value={personalInfo.linkedin}
            path="personalInfo.linkedin"
            href={(val) => (val.startsWith('http') ? val : `https://${val}`)}
          />
          <ContactChip
            icon={Globe}
            value={personalInfo.portfolio}
            path="personalInfo.portfolio"
            href={(val) => (val.startsWith('http') ? val : `https://${val}`)}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
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
          value={personalInfo.title || 'Your tagline goes here'}
          as="p"
          style={{
            fontSize: config.typography.body.fontSize,
            color: config.colors.text.secondary,
            margin: '4px 0 0 0',
            fontStyle: 'italic',
          }}
        />
      </div>

      <div
        style={{
          marginTop: '14px',
          height: '6px',
          background: `linear-gradient(90deg, ${accent} 0%, ${config.colors.secondary || accent} 100%)`,
          borderRadius: '999px',
        }}
      />
    </div>
  );
};

const ObstacleSolverContent: React.FC<Omit<TemplateComponentProps, 'config'>> = ({
  onAddBulletPoint,
  onRemoveBulletPoint,
  onAddExperience,
  onRemoveExperience,
  onAddEducation,
  onRemoveEducation,
  onAddProject,
  onRemoveProject,
  onAddLanguage,
  onRemoveLanguage,
  onUpdateLanguage,
  onAddCustomSectionItem,
  onRemoveCustomSectionItem,
}) => {
  const { config } = useBaseTemplate();
  const sections = useOrderedSections();

  const outerStyle: React.CSSProperties = {
    backgroundColor: '#f5f7fa',
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center',
  };

  const pageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '860px',
    backgroundColor: config.colors.background.page,
    boxShadow: '0 10px 32px rgba(15, 73, 80, 0.08)',
    borderRadius: '12px',
    overflow: 'hidden',
    border: `1px solid ${config.colors.border}`,
  };

  const contentStyle: React.CSSProperties = {
    padding: `${config.spacing.pagePadding.top} ${config.spacing.pagePadding.right} ${config.spacing.pagePadding.bottom} ${config.spacing.pagePadding.left}`,
    display: 'flex',
    flexDirection: 'column',
    gap: config.spacing.sectionGap,
  };

  return (
    <div style={outerStyle}>
      <div style={pageStyle}>
        <HeaderBlock />
        <div style={contentStyle}>
          {sections.map((section) => (
            <TemplateSectionRenderer
              key={section.id}
              section={section}
              onAddBulletPoint={onAddBulletPoint}
              onRemoveBulletPoint={onRemoveBulletPoint}
              onAddExperience={onAddExperience}
              onRemoveExperience={onRemoveExperience}
              onAddEducation={onAddEducation}
              onRemoveEducation={onRemoveEducation}
              onAddProject={onAddProject}
              onRemoveProject={onRemoveProject}
              onAddLanguage={onAddLanguage}
              onRemoveLanguage={onRemoveLanguage}
              onUpdateLanguage={onUpdateLanguage}
              onAddCustomSectionItem={onAddCustomSectionItem}
              onRemoveCustomSectionItem={onRemoveCustomSectionItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ObstacleSolverTemplate: React.FC<TemplateComponentProps> = (props) => {
  const { config, resumeData, editable, sectionLabels, sectionOrder, enabledSections } = props;

  return (
    <BaseTemplateProvider
      config={config}
      resumeData={resumeData}
      editable={editable}
      sectionLabels={sectionLabels}
      sectionOrder={sectionOrder}
      enabledSections={enabledSections}
    >
      <ObstacleSolverContent {...props} />
    </BaseTemplateProvider>
  );
};

export default ObstacleSolverTemplate;
