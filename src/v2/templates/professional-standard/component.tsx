import React from 'react';
import { TemplateComponentProps } from '../types';
import { BaseTemplateProvider, useBaseTemplate } from '../BaseTemplate';
import { TemplateSectionRenderer } from '../../components/sections/TemplateSectionRenderer';

/**
 * Professional Standard Template Component
 *
 * A clean, industry-standard professional resume template with two-column layout.
 * Features main content area and sidebar for skills and additional info.
 */
export const ProfessionalStandardTemplate: React.FC<TemplateComponentProps> = (props) => {
  return (
    <BaseTemplateProvider {...props}>
      <ProfessionalStandardContent />
    </BaseTemplateProvider>
  );
};

const ProfessionalStandardContent: React.FC = () => {
  const {
    config,
    resumeData,
    editable,
    themeColor,
    sectionOverrides,
    onUpdatePersonalInfo,
    onAddItem,
    onUpdateItem,
    onDeleteItem,
    onReorderItems,
    containerRef,
  } = useBaseTemplate();

  // Get sections for each column
  const getSectionsByColumn = (column: 'main' | 'sidebar') => {
    const sections = config.sections || [];
    return sections
      .filter((section) => section.column === column && section.enabled && section.type !== 'header')
      .sort((a, b) => a.order - b.order);
  };

  const mainSections = getSectionsByColumn('main');
  const sidebarSections = getSectionsByColumn('sidebar');

  // Get header section
  const headerSection = config.sections?.find((s) => s.type === 'header');

  // Apply theme color overrides
  const primaryColor = themeColor || config.colors.primary;

  // Container styles
  const containerStyle: React.CSSProperties = {
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: config.colors.background.page,
    fontFamily: config.typography?.body?.fontFamily || 'system-ui, -apple-system, sans-serif',
    fontSize: config.typography?.body?.fontSize || '11px',
    color: config.colors.text.primary,
    padding: `${config.spacing.pagePadding.top} ${config.spacing.pagePadding.right} ${config.spacing.pagePadding.bottom} ${config.spacing.pagePadding.left}`,
    position: 'relative',
    boxSizing: 'border-box',
  };

  // Two-column layout styles
  const columnsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: config.layout.columnGap || '24px',
    marginTop: config.spacing.sectionGap,
  };

  const mainColumnStyle: React.CSSProperties = {
    flex: `0 0 ${config.layout.mainWidth}`,
    minWidth: 0,
  };

  const sidebarColumnStyle: React.CSSProperties = {
    flex: `0 0 ${config.layout.sidebarWidth}`,
    backgroundColor: config.layout.sidebarBackground || config.colors.background.sidebar,
    padding: config.layout.sidebarPadding || '20px',
    borderRadius: config.layout.sidebarBorderRadius || '0px',
    minWidth: 0,
  };

  return (
    <div ref={containerRef} style={containerStyle} className="professional-standard-template">
      {/* Header Section (Full Width) */}
      {headerSection && headerSection.enabled && (
        <TemplateSectionRenderer
          section={headerSection}
          resumeData={resumeData}
          config={config}
          editable={editable}
          themeColor={primaryColor}
          onUpdatePersonalInfo={onUpdatePersonalInfo}
          onAddItem={onAddItem}
          onUpdateItem={onUpdateItem}
          onDeleteItem={onDeleteItem}
          onReorderItems={onReorderItems}
        />
      )}

      {/* Two-Column Layout */}
      <div style={columnsContainerStyle}>
        {/* Main Column */}
        <div style={mainColumnStyle}>
          {mainSections.map((section, index) => (
            <div
              key={section.id}
              style={{
                marginBottom: index < mainSections.length - 1 ? config.spacing.sectionGap : '0',
              }}
            >
              <TemplateSectionRenderer
                section={section}
                resumeData={resumeData}
                config={config}
                editable={editable}
                themeColor={primaryColor}
                onUpdatePersonalInfo={onUpdatePersonalInfo}
                onAddItem={onAddItem}
                onUpdateItem={onUpdateItem}
                onDeleteItem={onDeleteItem}
                onReorderItems={onReorderItems}
              />
            </div>
          ))}
        </div>

        {/* Sidebar Column */}
        <div style={sidebarColumnStyle}>
          {sidebarSections.map((section, index) => (
            <div
              key={section.id}
              style={{
                marginBottom: index < sidebarSections.length - 1 ? config.spacing.sectionGap : '0',
              }}
            >
              <TemplateSectionRenderer
                section={section}
                resumeData={resumeData}
                config={config}
                editable={editable}
                themeColor={primaryColor}
                onUpdatePersonalInfo={onUpdatePersonalInfo}
                onAddItem={onAddItem}
                onUpdateItem={onUpdateItem}
                onDeleteItem={onDeleteItem}
                onReorderItems={onReorderItems}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalStandardTemplate;
