/**
 * Fresher Gradient Template Component
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

const FresherGradientContent: React.FC<Omit<TemplateComponentProps, 'config'>> = (props) => {
  const { config, resumeData, editable } = useBaseTemplate();
  const { spacing, colors, fontFamily, layout } = config;
  const sections = useOrderedSections();
  const sidebarSections = sections.filter(s => s.column === 'sidebar');
  const mainSections = sections.filter(s => s.column === 'main');

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

  const columnsStyle: React.CSSProperties = {
    display: 'flex',
    gap: layout.columnGap,
  };

  const mainStyle: React.CSSProperties = { width: layout.mainWidth };
  const sidebarStyle: React.CSSProperties = { width: layout.sidebarWidth };

  return (
    <div style={containerStyle}>
      <HeaderSection resumeData={resumeData} config={config} editable={editable} />
      <div style={contentStyle}>
        <div style={columnsStyle}>
          <div style={mainStyle}>
            {mainSections.map((section) => (
              <TemplateSectionRenderer key={section.id} section={section} {...props} />
            ))}
          </div>
          <div style={sidebarStyle}>
            {sidebarSections.map((section) => (
              <TemplateSectionRenderer key={section.id} section={section} {...props} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FresherGradientTemplate: React.FC<TemplateComponentProps> = (props) => (
  <BaseTemplateProvider {...props}>
    <FresherGradientContent {...props} />
  </BaseTemplateProvider>
);

export default FresherGradientTemplate;
