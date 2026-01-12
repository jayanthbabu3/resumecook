/**
 * Fresher Tech Template Component
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

const FresherTechContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { spacing, colors, fontFamily } = config;
  const sections = useOrderedSections();

  const containerStyle: React.CSSProperties = {
    fontFamily: fontFamily.primary,
    fontSize: config.typography.body.fontSize,
    lineHeight: config.typography.body.lineHeight,
    color: config.typography.body.color,
    backgroundColor: colors.background.page,
    width: '100%',
  };

  const contentStyle: React.CSSProperties = {
    padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} ${spacing.pagePadding.bottom} ${spacing.pagePadding.left}`,
  };

  return (
    <div style={containerStyle}>
      <HeaderSection resumeData={resumeData} config={config} editable={editable} />
      <div style={contentStyle}>
        {sections.map((section) => (
          <TemplateSectionRenderer key={section.id} section={section} {...props} />
        ))}
      </div>
    </div>
  );
};

export const FresherTechTemplate: React.FC<TemplateComponentProps> = (props) => (
  <BaseTemplateProvider {...props}>
    <FresherTechContent {...props} />
  </BaseTemplateProvider>
);

export default FresherTechTemplate;
