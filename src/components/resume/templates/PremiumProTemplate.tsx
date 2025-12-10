import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { TemplateContactInfo, TemplateSocialLinks, SectionHeader } from "@/components/resume/shared/TemplateBase";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { ExperienceVariantRenderer } from "@/components/resume/shared/ExperienceVariantRenderer";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfstandards";

interface PremiumProTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

// Separate component for Add Skill button to use hooks
const PremiumProAddSkillButton = ({ accent }: { accent: string }) => {
  const { addArrayItem } = useInlineEdit();
  
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (addArrayItem) {
          addArrayItem('skills', { name: "New Skill", id: Date.now().toString(), rating: "" });
        }
      }}
      className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
      style={{ color: accent, borderColor: accent }}
    >
      <Plus className="h-3 w-3" />
      Add Skill
    </button>
  );
};

export const PremiumProTemplate = ({
  resumeData,
  themeColor = "#0f766e",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: PremiumProTemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentTint = `${accent}20`;
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };

  return (
    <StyleOptionsWrapper>
      <div className="w-full h-full bg-white flex text-[13px] leading-relaxed" style={{ color: '#1a1a1a' }}>
      {/* Left Accent Panel */}
      <div 
        className="w-2 flex-shrink-0" 
        style={{ backgroundColor: accent }}
      />
      
      <div className="flex-1 p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="mb-2"
                  style={{ fontSize: '27px', fontWeight: 700, color: '#1a1a1a' }}
                  as="h1"
                />
              ) : (
                <h1 className="mb-2" style={{ fontSize: '27px', fontWeight: 700, color: '#1a1a1a' }}>
                  {resumeData.personalInfo.fullName}
                </h1>
              )}
              {(editable || resumeData.personalInfo.title) && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title || ""}
                    className="mb-3"
                    style={{ fontSize: '16px', fontWeight: 500, color: '#1a1a1a' }}
                    as="p"
                    placeholder="Professional Title"
                  />
                ) : (
                  resumeData.personalInfo.title && (
                    <p className="mb-3" style={{ fontSize: '16px', fontWeight: 500, color: '#1a1a1a' }}>
                    {resumeData.personalInfo.title}
                  </p>
                )
                )
              )}
              <div className="mt-4" style={{ fontSize: '13px', color: '#1a1a1a' }}>
                <TemplateContactInfo
                  resumeData={resumeData}
                  editable={editable}
                  themeColor={accent}
                  layout="horizontal"
                />
              </div>
            </div>
            {photo && (
              <div className="ml-6">
                <div style={{ borderColor: accent }} className="border-3 rounded-xl overflow-hidden">
                  <ProfilePhoto
                    src={photo}
                    borderClass=""
                    className="rounded-none"
                  />
                </div>
              </div>
            )}
          </div>
          
          {(resumeData.personalInfo.summary || editable) && (
            <div className="relative pl-4">
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  className="leading-[1.7]"
                  style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.7 }}
                  as="p"
                  multiline
                  placeholder="Professional summary..."
                />
              ) : (
                resumeData.personalInfo.summary && (
                  <p className="leading-[1.7]" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.7 }}>
                  {resumeData.personalInfo.summary}
                </p>
                )
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-4 space-y-7">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div>
                <SectionHeader 
                  title="Education" 
                  themeColor={accent}
                  className="mb-3"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
                {editable ? (
                  <InlineEditableList
                    path="education"
                    items={resumeData.education}
                    defaultItem={{
                      id: Date.now().toString(),
                      degree: "Degree",
                      school: "School Name",
                      field: "Field of Study",
                      startDate: "2020-01",
                      endDate: "2024-01",
                      gpa: "",
                    }}
                    addButtonLabel="Add Education"
                    renderItem={(edu, index) => (
                      <div>
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="text-[13px] font-semibold text-gray-900"
                          as="h3"
                        />
                        {(editable || edu.field) && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field || ""}
                            className="mt-1"
                            style={{ fontSize: '13px', color: '#1a1a1a' }}
                            as="p"
                            placeholder="Field of Study"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="mt-1 font-semibold"
                          style={{ fontSize: '13px', color: accent }}
                          as="p"
                        />
                        <div className="mt-1 flex items-center gap-1" style={{ fontSize: '13px', color: '#525252' }}>
                            <InlineEditableDate
                              path={`education[${index}].startDate`}
                              value={edu.startDate}
                            formatDisplay={formatDate}
                              className="inline-block"
                            />
                            <span> - </span>
                            <InlineEditableDate
                              path={`education[${index}].endDate`}
                              value={edu.endDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                        </div>
                        {(editable || edu.gpa) && (
                          <div className="mt-1" style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}>
                            <span>GPA: </span>
                            <InlineEditableText
                              path={`education[${index}].gpa`}
                              value={edu.gpa || ""}
                              className="inline-block"
                              placeholder="3.8/4.0"
                              style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}
                              as="span"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id}>
                        <h3 className="text-[13px] font-semibold text-gray-900">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="mt-1" style={{ fontSize: '13px', color: '#1a1a1a' }}>{edu.field}</p>
                        )}
                        <p className="mt-1 font-semibold" style={{ fontSize: '13px', color: accent }}>
                          {edu.school}
                        </p>
                        <p className="mt-1" style={{ fontSize: '13px', color: '#525252' }}>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                        {edu.gpa && (
                          <p className="mt-1" style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}>
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div>
                <SectionHeader 
                  title="Skills" 
                  themeColor={accent}
                  className="mb-3"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
                {editable ? (
                  <div className="space-y-3">
                    {resumeData.skills.map((skill, index) => {
                      // Parse rating string to number (1-10)
                      // Handles "9", "9/10", "9.5", etc.
                      const parseRating = (ratingStr: string | undefined): number | null => {
                        if (!ratingStr || !ratingStr.trim()) return null;
                        // Extract first number from string (handles "9", "9/10", "9.5", etc.)
                        const match = ratingStr.trim().match(/^(\d+(?:\.\d+)?)/);
                        if (match) {
                          const num = parseFloat(match[1]);
                          // Clamp between 1 and 10
                          return Math.max(1, Math.min(10, Math.round(num)));
                        }
                        return null;
                      };
                      
                      const skillLevel = parseRating(skill.rating);
                      
                      return (
                        <div key={skill.id || index}>
                          <div className="flex items-center justify-between mb-1 gap-2">
                          <InlineEditableText
                            path={`skills[${index}].name`}
                            value={skill.name}
                              className="font-medium flex-1"
                              style={{ fontSize: '13px', color: '#1a1a1a' }}
                              as="span"
                            />
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <InlineEditableText
                                path={`skills[${index}].rating`}
                                value={skill.rating || ""}
                                placeholder="1-10"
                                className="w-12 text-right border border-dashed border-gray-300 rounded px-1"
                                style={{ fontSize: '11px', color: '#525252' }}
                            as="span"
                          />
                              <span style={{ fontSize: '11px', color: '#9ca3af' }}>/10</span>
                            </div>
                        </div>
                          {skillLevel !== null && (
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                  width: `${skillLevel * 10}%`,
                                backgroundColor: accent,
                              }}
                            />
                          </div>
                        )}
                      </div>
                      );
                    })}
                    <PremiumProAddSkillButton accent={accent} />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resumeData.skills.map((skill) => {
                      // Parse rating string to number (1-10)
                      const parseRating = (ratingStr: string | undefined): number | null => {
                        if (!ratingStr || !ratingStr.trim()) return null;
                        const match = ratingStr.trim().match(/^(\d+(?:\.\d+)?)/);
                        if (match) {
                          const num = parseFloat(match[1]);
                          return Math.max(1, Math.min(10, Math.round(num)));
                        }
                        return null;
                      };
                      
                      const skillLevel = parseRating(skill.rating);
                      
                      return (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium" style={{ fontSize: '13px', color: '#1a1a1a' }}>
                            {skill.name}
                          </span>
                            {skill.rating && skill.rating.trim() && (
                            <span style={{ fontSize: '11px', color: '#525252' }}>
                                {skillLevel !== null ? `${skillLevel}/10` : skill.rating}
                            </span>
                          )}
                        </div>
                          {skillLevel !== null && (
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                  width: `${skillLevel * 10}%`,
                                backgroundColor: accent,
                              }}
                            />
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-8 space-y-7">
            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div>
                <SectionHeader 
                  title="Professional Experience" 
                  themeColor={accent}
                  className="mb-3"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
                <ExperienceVariantRenderer
                  experience={resumeData.experience}
                  editable={editable}
                  variant="modern"
                  accentColor={accent}
                  formatDate={formatDate}
                  onAddBulletPoint={onAddBulletPoint}
                  onRemoveBulletPoint={onRemoveBulletPoint}
                            />
                          </div>
            )}

            {/* Social Links */}
            {resumeData.includeSocialLinks && (
              <div className="mb-7">
                <SectionHeader 
                  title="Connect With Me" 
                  themeColor={accent}
                  className="mb-3"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
                <TemplateSocialLinks
                  resumeData={resumeData}
                  editable={editable}
                  themeColor={accent}
                  variant="horizontal"
                              />
              </div>
            )}

            {/* Sections */}
            <div data-section="custom">
              <CustomSectionsWrapper
                sections={resumeData.sections || []}
                editable={editable}
                accentColor={accent}
                styles={SINGLE_COLUMN_CONFIG}
                renderSectionHeader={(title, index, helpers) => (
                  <SectionHeader
                    title={title}
                    themeColor={accent}
                    className="mb-3"
                    paddingBottom="8px"
                    style={{ marginBottom: '12px' }}
                                />
                              )}
                itemStyle={{ 
                  fontSize: '13px', 
                  color: '#1a1a1a', 
                  lineHeight: 1.7 
                }}
                sectionStyle={{ marginBottom: '28px' }}
                showAddSection={true}
                renderItem={(item, itemIndex, sectionIndex, helpers) => {
                  const itemValue = typeof item === 'string' ? item : (item as any)?.text || String(item || '');
                  const showBorder = editable;
                  return (
                    <div key={itemIndex} className="group flex items-start gap-2 mb-2">
                      {editable ? (
                        <helpers.EditableText
                          className={`flex-1 min-h-[1.2rem] ${showBorder ? 'border border-dashed border-gray-300 rounded px-1' : ''}`}
                          style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.7 }}
                          placeholder="Click to add item..."
                        />
                      ) : (
                        <span style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.7 }}>
                          {itemValue}
                        </span>
                      )}
                      {editable && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            helpers.remove();
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                          style={{ color: '#ef4444' }}
                                      >
                          <span className="text-xs">×</span>
                                      </button>
                                    )}
                                  </div>
                  );
                }}
                renderAddItemButton={(onClick, sectionIndex) => (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                      onClick();
                                }}
                    className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                    style={{ color: accent, borderColor: accent }}
                              >
                    <span>+</span>
                    Add Item
                              </button>
                            )}
              />
              </div>
          </div>
        </div>
      </div>
    </div>
    </StyleOptionsWrapper>
  );
};
