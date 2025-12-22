/**
 * Resume Canvas Component
 * 
 * A4-sized blank canvas that renders sections based on selected layout.
 * Uses config-driven rendering with actual section renderers.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { V2ResumeData } from '../../types/resumeData';
import type { ScratchSection } from '../../hooks/useScratchResume';
import type { ScratchLayout } from '../../config/scratchLayouts';
import { generateScratchConfig } from '../../utils/scratchConfigGenerator';
import { useTemplateConfig } from '../../hooks/useTemplateConfig';
import { ResumeRenderer } from '../../components/ResumeRenderer';
import { InlineEditProvider, useInlineEdit } from '@/contexts/InlineEditContext';
import { StyleOptionsProvider } from '@/contexts/StyleOptionsContext';
import { StyleOptionsWrapper } from '@/components/resume/StyleOptionsWrapper';

interface ResumeCanvasProps {
  resumeData: V2ResumeData;
  sections: ScratchSection[];
  selectedLayout: ScratchLayout | null;
  themeColor: string;
  onResumeDataChange: (data: V2ResumeData) => void;
  onRemoveSection: (sectionId: string) => void;
}

// Inner component that uses the InlineEditContext
const ResumeCanvasInner: React.FC<{
  resumeData: V2ResumeData;
  generatedConfig: any;
  themeColor: string;
  onRemoveSection: (sectionId: string) => void;
}> = ({ resumeData, generatedConfig, themeColor, onRemoveSection }) => {
  const inlineEdit = useInlineEdit();

  // Add experience handler
  const handleAddExperience = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('experience', {
      id: `exp-${Date.now()}`,
      company: 'Company Name',
      position: 'Position Title',
      startDate: new Date().toISOString().slice(0, 7),
      endDate: '',
      current: true,
      description: '',
      bulletPoints: ['Key achievement or responsibility'],
      location: '',
    });
  }, [inlineEdit]);

  // Remove experience handler
  const handleRemoveExperience = React.useCallback((expId: string) => {
    if (!inlineEdit) return;
    const expIndex = resumeData.experience?.findIndex(e => e.id === expId);
    if (expIndex !== undefined && expIndex >= 0) {
      inlineEdit.removeArrayItem('experience', expIndex);
    }
  }, [inlineEdit, resumeData.experience]);

  // Add bullet point handler
  const handleAddBulletPoint = React.useCallback((expId: string) => {
    if (!inlineEdit) return;
    inlineEdit.addBulletPoint(expId);
  }, [inlineEdit]);

  // Remove bullet point handler
  const handleRemoveBulletPoint = React.useCallback((expId: string, bulletIndex: number) => {
    if (!inlineEdit) return;
    inlineEdit.removeBulletPoint(expId, bulletIndex);
  }, [inlineEdit]);

  // Add education handler
  const handleAddEducation = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('education', {
      id: `edu-${Date.now()}`,
      institution: 'Institution Name',
      degree: 'Degree',
      field: 'Field of Study',
      startDate: '',
      endDate: new Date().getFullYear().toString(),
      gpa: '',
      location: '',
    });
  }, [inlineEdit]);

  // Remove education handler
  const handleRemoveEducation = React.useCallback((eduId: string) => {
    if (!inlineEdit) return;
    const eduIndex = resumeData.education?.findIndex(e => e.id === eduId);
    if (eduIndex !== undefined && eduIndex >= 0) {
      inlineEdit.removeArrayItem('education', eduIndex);
    }
  }, [inlineEdit, resumeData.education]);

  // Add project handler
  const handleAddProject = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('projects', {
      id: `proj-${Date.now()}`,
      name: 'Project Name',
      description: 'Project description',
      technologies: [],
      url: '',
      startDate: '',
      endDate: '',
    });
  }, [inlineEdit]);

  // Remove project handler
  const handleRemoveProject = React.useCallback((projId: string) => {
    if (!inlineEdit) return;
    const projIndex = resumeData.projects?.findIndex(p => p.id === projId);
    if (projIndex !== undefined && projIndex >= 0) {
      inlineEdit.removeArrayItem('projects', projIndex);
    }
  }, [inlineEdit, resumeData.projects]);

  // Add certification handler
  const handleAddCertification = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('certifications', {
      id: `cert-${Date.now()}`,
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      date: new Date().toISOString().slice(0, 7),
      url: '',
    });
  }, [inlineEdit]);

  // Remove certification handler
  const handleRemoveCertification = React.useCallback((certId: string) => {
    if (!inlineEdit) return;
    const certIndex = resumeData.certifications?.findIndex(c => c.id === certId);
    if (certIndex !== undefined && certIndex >= 0) {
      inlineEdit.removeArrayItem('certifications', certIndex);
    }
  }, [inlineEdit, resumeData.certifications]);

  // Add language handler
  const handleAddLanguage = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('languages', {
      id: `lang-${Date.now()}`,
      name: 'Language',
      proficiency: 'Intermediate',
    });
  }, [inlineEdit]);

  // Remove language handler
  const handleRemoveLanguage = React.useCallback((langId: string) => {
    if (!inlineEdit) return;
    const langIndex = resumeData.languages?.findIndex(l => l.id === langId);
    if (langIndex !== undefined && langIndex >= 0) {
      inlineEdit.removeArrayItem('languages', langIndex);
    }
  }, [inlineEdit, resumeData.languages]);

  // Add strength handler
  const handleAddStrength = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('strengths', {
      id: `str-${Date.now()}`,
      text: 'New Strength',
    });
  }, [inlineEdit]);

  // Remove strength handler
  const handleRemoveStrength = React.useCallback((strId: string) => {
    if (!inlineEdit) return;
    const strIndex = resumeData.strengths?.findIndex(s => s.id === strId);
    if (strIndex !== undefined && strIndex >= 0) {
      inlineEdit.removeArrayItem('strengths', strIndex);
    }
  }, [inlineEdit, resumeData.strengths]);

  // Add achievement handler
  const handleAddAchievement = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('achievements', {
      id: `ach-${Date.now()}`,
      text: 'New Achievement',
    });
  }, [inlineEdit]);

  // Remove achievement handler
  const handleRemoveAchievement = React.useCallback((achId: string) => {
    if (!inlineEdit) return;
    const achIndex = resumeData.achievements?.findIndex(a => a.id === achId);
    if (achIndex !== undefined && achIndex >= 0) {
      inlineEdit.removeArrayItem('achievements', achIndex);
    }
  }, [inlineEdit, resumeData.achievements]);

  // Add award handler
  const handleAddAward = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('awards', {
      id: `award-${Date.now()}`,
      title: 'Award Title',
      issuer: 'Issuing Organization',
      date: new Date().getFullYear().toString(),
      description: '',
    });
  }, [inlineEdit]);

  // Remove award handler
  const handleRemoveAward = React.useCallback((awardId: string) => {
    if (!inlineEdit) return;
    const awardIndex = resumeData.awards?.findIndex(a => a.id === awardId);
    if (awardIndex !== undefined && awardIndex >= 0) {
      inlineEdit.removeArrayItem('awards', awardIndex);
    }
  }, [inlineEdit, resumeData.awards]);

  // Add volunteer handler
  const handleAddVolunteer = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('volunteer', {
      id: `vol-${Date.now()}`,
      organization: 'Organization Name',
      role: 'Volunteer Role',
      startDate: '',
      endDate: '',
      description: '',
    });
  }, [inlineEdit]);

  // Remove volunteer handler
  const handleRemoveVolunteer = React.useCallback((volId: string) => {
    if (!inlineEdit) return;
    const volIndex = resumeData.volunteer?.findIndex(v => v.id === volId);
    if (volIndex !== undefined && volIndex >= 0) {
      inlineEdit.removeArrayItem('volunteer', volIndex);
    }
  }, [inlineEdit, resumeData.volunteer]);

  // Add interest handler
  const handleAddInterest = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('interests', {
      id: `int-${Date.now()}`,
      name: 'New Interest',
    });
  }, [inlineEdit]);

  // Remove interest handler
  const handleRemoveInterest = React.useCallback((intId: string) => {
    if (!inlineEdit) return;
    const intIndex = resumeData.interests?.findIndex(i => i.id === intId);
    if (intIndex !== undefined && intIndex >= 0) {
      inlineEdit.removeArrayItem('interests', intIndex);
    }
  }, [inlineEdit, resumeData.interests]);

  // Add reference handler
  const handleAddReference = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('references', {
      id: `ref-${Date.now()}`,
      name: 'Reference Name',
      title: 'Title',
      company: 'Company',
      email: '',
      phone: '',
    });
  }, [inlineEdit]);

  // Remove reference handler
  const handleRemoveReference = React.useCallback((refId: string) => {
    if (!inlineEdit) return;
    const refIndex = resumeData.references?.findIndex(r => r.id === refId);
    if (refIndex !== undefined && refIndex >= 0) {
      inlineEdit.removeArrayItem('references', refIndex);
    }
  }, [inlineEdit, resumeData.references]);

  // Add course handler
  const handleAddCourse = React.useCallback(() => {
    if (!inlineEdit) return;
    inlineEdit.addArrayItem('courses', {
      id: `course-${Date.now()}`,
      name: 'Course Name',
      institution: 'Institution',
      date: new Date().getFullYear().toString(),
    });
  }, [inlineEdit]);

  // Remove course handler
  const handleRemoveCourse = React.useCallback((courseId: string) => {
    if (!inlineEdit) return;
    const courseIndex = resumeData.courses?.findIndex(c => c.id === courseId);
    if (courseIndex !== undefined && courseIndex >= 0) {
      inlineEdit.removeArrayItem('courses', courseIndex);
    }
  }, [inlineEdit, resumeData.courses]);

  return (
    <ResumeRenderer
      resumeData={resumeData}
      templateId="scratch-v2"
      themeColor={themeColor}
      sectionOverrides={(() => {
        const overrides: Record<string, any> = {
          // Pass the layout configuration from scratch config
          __layout_override: generatedConfig.layout,
        };
        // Add all scratch sections
        generatedConfig.sections.forEach((section: any) => {
          overrides[section.id] = section;
        });
        // Disable all base template sections that have the same type as scratch sections
        const scratchSectionTypes = new Set(
          generatedConfig.sections
            .filter((s: any) => s.enabled)
            .map((s: any) => s.type)
        );
        scratchSectionTypes.forEach((type: any) => {
          if (type !== 'header') {
            overrides[`__disable_type_${type}`] = { type, enabled: false };
          }
        });
        // Pass header config variant if header section exists
        if (generatedConfig.header?.variant) {
          overrides['__header_variant'] = generatedConfig.header.variant;
        }
        return overrides;
      })()}
      editable={true}
      onRemoveSection={onRemoveSection}
      onAddExperience={handleAddExperience}
      onRemoveExperience={handleRemoveExperience}
      onAddBulletPoint={handleAddBulletPoint}
      onRemoveBulletPoint={handleRemoveBulletPoint}
      onAddEducation={handleAddEducation}
      onRemoveEducation={handleRemoveEducation}
      onAddProject={handleAddProject}
      onRemoveProject={handleRemoveProject}
      onAddCertification={handleAddCertification}
      onRemoveCertification={handleRemoveCertification}
      onAddLanguage={handleAddLanguage}
      onRemoveLanguage={handleRemoveLanguage}
      onAddStrength={handleAddStrength}
      onRemoveStrength={handleRemoveStrength}
      onAddAchievement={handleAddAchievement}
      onRemoveAchievement={handleRemoveAchievement}
      onAddAward={handleAddAward}
      onRemoveAward={handleRemoveAward}
      onAddVolunteer={handleAddVolunteer}
      onRemoveVolunteer={handleRemoveVolunteer}
      onAddInterest={handleAddInterest}
      onRemoveInterest={handleRemoveInterest}
      onAddReference={handleAddReference}
      onRemoveReference={handleRemoveReference}
      onAddCourse={handleAddCourse}
      onRemoveCourse={handleRemoveCourse}
    />
  );
};

export const ResumeCanvas: React.FC<ResumeCanvasProps> = ({
  resumeData,
  sections,
  selectedLayout,
  themeColor,
  onResumeDataChange,
  onRemoveSection,
}) => {
  // Generate config from sections
  const generatedConfig = React.useMemo(() => {
    return generateScratchConfig(sections, selectedLayout, themeColor);
  }, [sections, selectedLayout, themeColor]);

  // Get template config - use the generated config directly instead of merging
  // This ensures only scratch sections are used, not base template sections
  const config = generatedConfig;

  // Determine if we have any sections to show
  const hasSections = sections.length > 0;

  // Render layout guides when empty, actual content when sections exist
  const renderContent = () => {
    if (!hasSections) {
      // Show layout guides when empty
      if (!selectedLayout) return null;

      switch (selectedLayout.layoutType) {
        case 'single-column':
          return <SingleColumnGuide />;
        case 'two-column-left':
          return <TwoColumnLeftGuide themeColor={themeColor} />;
        case 'two-column-right':
          return <TwoColumnRightGuide themeColor={themeColor} />;
        case 'split':
          return <SplitLayoutGuide themeColor={themeColor} />;
        case 'compact':
          return <CompactLayoutGuide />;
        default:
          return <SingleColumnGuide />;
      }
    }

    // Render actual sections using ResumeRenderer
    // Use the generated config directly to avoid base template sections
    return (
      <StyleOptionsProvider>
        <StyleOptionsWrapper>
          <InlineEditProvider 
            resumeData={resumeData as any} 
            setResumeData={onResumeDataChange as any}
          >
            <ResumeCanvasInner
              resumeData={resumeData}
              generatedConfig={generatedConfig}
              themeColor={themeColor}
              onRemoveSection={onRemoveSection}
            />
          </InlineEditProvider>
        </StyleOptionsWrapper>
      </StyleOptionsProvider>
    );
  };

  return (
    <div
      id="scratch-builder-v2-preview"
      className={cn(
        "mx-auto w-full rounded-lg bg-white shadow-2xl overflow-hidden",
        "border border-gray-200"
      )}
      style={{
        width: '210mm',
        minHeight: '297mm',
        maxWidth: '210mm',
      }}
    >
      <div className="p-12 h-full">
        {renderContent()}
      </div>
    </div>
  );
};

// Layout Guide Components

// Single Column Guide
const SingleColumnGuide: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-[600px] space-y-4">
        {/* Visual guide line */}
        <div className="border-l-2 border-dashed border-gray-300 h-full min-h-[400px] ml-8 relative">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 bottom-0 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
        </div>
        <div className="text-center text-muted-foreground mt-8">
          <p className="text-base font-medium mb-1">Single Column Layout</p>
          <p className="text-sm">Click sections from the right panel to add them here</p>
        </div>
      </div>
    </div>
  );
};

// Two Column Left Guide (Sidebar Left, Main Right)
const TwoColumnLeftGuide: React.FC<{ themeColor: string }> = ({ themeColor }) => {
  return (
    <div className="flex gap-6 h-full">
      {/* Left Sidebar */}
      <div className="flex-[35%] flex flex-col">
        <div className="mb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
            Sidebar
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
            <p className="text-xs">Sidebar sections</p>
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-gray-200 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
      </div>

      {/* Main Content */}
      <div className="flex-[65%] flex flex-col">
        <div className="mb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
            Main Content
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
            <p className="text-xs">Main content sections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Two Column Right Guide (Sidebar Right, Main Left)
const TwoColumnRightGuide: React.FC<{ themeColor: string }> = ({ themeColor }) => {
  return (
    <div className="flex gap-6 h-full">
      {/* Main Content */}
      <div className="flex-[65%] flex flex-col">
        <div className="mb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
            Main Content
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
            <p className="text-xs">Main content sections</p>
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-gray-200 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
      </div>

      {/* Right Sidebar */}
      <div className="flex-[35%] flex flex-col">
        <div className="mb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
            Sidebar
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
            <p className="text-xs">Sidebar sections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Split Layout Guide (Header + Two Columns)
const SplitLayoutGuide: React.FC<{ themeColor: string }> = ({ themeColor }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header Area */}
      <div className="mb-6 pb-4 border-b-2 border-dashed" style={{ borderColor: themeColor, opacity: 0.3 }}>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
          Header Area
        </div>
        <div className="h-16 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Header section will appear here</p>
        </div>
      </div>

      {/* Two Columns Below */}
      <div className="flex gap-6 flex-1">
        {/* Main Content */}
        <div className="flex-[60%] flex flex-col">
          <div className="mb-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Main Content
            </div>
            <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
          </div>
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center text-muted-foreground">
              <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
              <p className="text-xs">Main content sections</p>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-200 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-200 bg-white"></div>
        </div>

        {/* Sidebar */}
        <div className="flex-[40%] flex flex-col">
          <div className="mb-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Sidebar
            </div>
            <div className="h-0.5 w-full" style={{ backgroundColor: themeColor, opacity: 0.3 }}></div>
          </div>
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center text-muted-foreground">
              <div className="border-l-2 border-dashed border-gray-300 h-32 mx-auto mb-4"></div>
              <p className="text-xs">Sidebar sections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact Layout Guide
const CompactLayoutGuide: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-[600px] space-y-3">
        {/* Compact visual guide lines */}
        <div className="border-l-2 border-dashed border-gray-300 h-full min-h-[400px] ml-8 relative">
          <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 top-1/4 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 top-2/4 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 top-3/4 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="absolute -left-2 bottom-0 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
        </div>
        <div className="text-center text-muted-foreground mt-8">
          <p className="text-base font-medium mb-1">Compact Layout</p>
          <p className="text-sm">Dense, space-efficient single column</p>
        </div>
      </div>
    </div>
  );
};
