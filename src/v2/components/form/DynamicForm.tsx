/**
 * Dynamic Form Component
 * 
 * Main form component that renders all sections based on:
 * 1. Template config (which sections are enabled)
 * 2. Section registry (form field definitions)
 * 3. Resume data (current values)
 * 
 * This is the config-driven replacement for the hardcoded ResumeForm.
 */

import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Share2, Camera } from 'lucide-react';
import { DynamicSectionForm } from './DynamicSectionForm';
import { PersonalInfoForm } from './PersonalInfoForm';
import { PhotoUploadForm } from './PhotoUploadForm';
import { SocialLinksForm } from './SocialLinksForm';
import { 
  SECTION_REGISTRY, 
  getSectionDefinition,
  type SectionDefinition,
} from '../../registry/sectionRegistry';
import type { V2SectionType } from '../../types/resumeData';
import type { TemplateSectionConfig } from '../../types/templateConfig';

// ============================================================================
// TYPES
// ============================================================================

interface DynamicFormProps {
  /** Current resume data */
  resumeData: any;
  /** Callback when resume data changes */
  onResumeDataChange: (data: any) => void;
  /** Enabled sections from template config */
  enabledSections: TemplateSectionConfig[];
  /** Custom section titles */
  sectionTitles?: Record<string, string>;
  /** Template ID for template-specific behavior */
  templateId?: string;
  /** Full template config for conditional field visibility */
  templateConfig?: any;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const DynamicForm: React.FC<DynamicFormProps> = ({
  resumeData,
  onResumeDataChange,
  enabledSections,
  sectionTitles = {},
  templateId,
  templateConfig,
}) => {
  // Get ordered list of sections to render
  const sectionsToRender = enabledSections
    .filter(s => s.enabled && s.type !== 'header') // Header is handled by PersonalInfoForm
    .sort((a, b) => a.order - b.order);

  // Update a specific section's data
  const handleSectionChange = (sectionType: V2SectionType, data: any) => {
    const sectionDef = getSectionDefinition(sectionType);
    if (!sectionDef) return;

    onResumeDataChange({
      ...resumeData,
      [sectionDef.dataKey]: data,
    });
  };

  // Get section data from resume
  const getSectionData = (sectionType: V2SectionType): any => {
    const sectionDef = getSectionDefinition(sectionType);
    if (!sectionDef) return undefined;
    return resumeData[sectionDef.dataKey];
  };

  // Handle personal info changes
  const handlePersonalInfoChange = (personalInfo: any) => {
    onResumeDataChange({
      ...resumeData,
      personalInfo,
    });
  };

  // Handle settings changes
  const handleSettingsChange = (settings: any) => {
    onResumeDataChange({
      ...resumeData,
      settings: {
        ...resumeData.settings,
        ...settings,
      },
    });
  };

  // Check if a section type is enabled
  const isSectionEnabled = (type: string): boolean => {
    return enabledSections.some(s => s.type === type && s.enabled);
  };

  return (
    <div className="space-y-4">
      <Accordion 
        type="multiple" 
        defaultValue={['personal', 'experience']}
        className="space-y-4"
      >
        {/* Personal Information - Always shown */}
        <PersonalInfoForm
          personalInfo={resumeData.personalInfo}
          onChange={handlePersonalInfoChange}
        />

        {/* Social Links */}
        <SocialLinksForm
          personalInfo={resumeData.personalInfo}
          onChange={handlePersonalInfoChange}
          includeSocialLinks={resumeData.settings?.includeSocialLinks ?? true}
          onIncludeSocialLinksChange={(include) => 
            handleSettingsChange({ includeSocialLinks: include })
          }
        />

        {/* Photo Upload */}
        <PhotoUploadForm
          photo={resumeData.personalInfo?.photo}
          onChange={(photo) => 
            handlePersonalInfoChange({ ...resumeData.personalInfo, photo })
          }
        />

        {/* Dynamic Sections based on template config */}
        {sectionsToRender.map((sectionConfig) => {
          const sectionDef = getSectionDefinition(sectionConfig.type);
          if (!sectionDef) return null;

          // Skip non-list sections that are handled separately
          if (sectionConfig.type === 'summary') {
            return null; // Summary is part of PersonalInfoForm
          }

          // Get current variant for this section from template config
          const sectionTypeConfig = templateConfig?.[sectionConfig.type];
          const currentVariant = sectionTypeConfig?.variant || sectionDef.defaultVariant;

          return (
            <DynamicSectionForm
              key={sectionConfig.id}
              sectionDef={sectionDef}
              sectionType={sectionConfig.type}
              data={getSectionData(sectionConfig.type)}
              onChange={(data) => handleSectionChange(sectionConfig.type, data)}
              title={sectionTitles[sectionConfig.id] || sectionConfig.title}
              templateConfig={templateConfig}
              currentVariant={currentVariant}
            />
          );
        })}

        {/* Custom Sections */}
        {resumeData.customSections?.map((customSection: any, index: number) => (
          <CustomSectionForm
            key={customSection.id}
            section={customSection}
            index={index}
            onChange={(updated) => {
              const newCustomSections = [...(resumeData.customSections || [])];
              newCustomSections[index] = updated;
              onResumeDataChange({
                ...resumeData,
                customSections: newCustomSections,
              });
            }}
            onRemove={() => {
              onResumeDataChange({
                ...resumeData,
                customSections: (resumeData.customSections || []).filter(
                  (_: any, i: number) => i !== index
                ),
              });
            }}
          />
        ))}
      </Accordion>
    </div>
  );
};

// ============================================================================
// CUSTOM SECTION FORM (Inline)
// ============================================================================

interface CustomSectionFormProps {
  section: any;
  index: number;
  onChange: (section: any) => void;
  onRemove: () => void;
}

const CustomSectionForm: React.FC<CustomSectionFormProps> = ({
  section,
  index,
  onChange,
  onRemove,
}) => {
  // Use the custom section definition from registry
  const sectionDef = getSectionDefinition('custom');
  if (!sectionDef) return null;

  return (
    <DynamicSectionForm
      sectionDef={sectionDef}
      sectionType="custom"
      data={section}
      onChange={onChange}
      title={section.title || `Custom Section ${index + 1}`}
    />
  );
};

export default DynamicForm;
