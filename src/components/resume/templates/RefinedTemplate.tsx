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
import { cn } from "@/lib/utils";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface RefinedTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const RefinedTemplate = ({
  resumeData,
  themeColor = "#4f46e5",
  editable = false,
}: RefinedTemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();
  const styles = SINGLE_COLUMN_CONFIG;
  const accent = themeColor || styles.colors.primary;
  const sidebarBg = `${accent}15`;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };

  return (
    <StyleOptionsWrapper>
      <div
        className="mx-auto bg-white min-h-full"
        style={{
          fontFamily: styles.fonts.primary,
          color: '#1a1a1a',
          lineHeight: styles.itemDescription.lineHeight,
          minHeight: '297mm', // A4 height
        }}
      >
      <div className="grid grid-cols-[280px,1fr] h-full" style={{ minHeight: '297mm' }}>
        {/* Left Sidebar */}
        <div
          className="px-8 py-12"
          style={{
            backgroundColor: sidebarBg,
            fontSize: '13px',
            color: '#1a1a1a',
            minHeight: '100%',
          }}
        >
          {/* Photo */}
          {resumeData.personalInfo.photo && (
            <div className="mb-8">
              <ProfilePhoto src={resumeData.personalInfo.photo} sizeClass="h-40 w-40 mx-auto" />
            </div>
          )}

          {/* Contact */}
          <div className="mb-8">
            <h3
              className="uppercase tracking-widest"
              style={{
                fontSize: '15px',
                fontWeight: styles.sectionHeading.weight,
                color: '#1a1a1a',
                marginBottom: "12px",
              }}
            >
              Contact
            </h3>
            <div style={{ fontSize: '13px', color: '#1a1a1a' }}>
              <TemplateContactInfo
                resumeData={resumeData}
                editable={editable}
                themeColor={accent}
                layout="vertical"
              />
            </div>
          </div>

          {/* Social Links */}
          {resumeData.includeSocialLinks && (
            <div className="mb-8">
              <h3
                className="uppercase tracking-widest"
                style={{
                  fontSize: '15px',
                  fontWeight: styles.sectionHeading.weight,
                  color: '#1a1a1a',
                  marginBottom: "12px",
                }}
              >
                Connect
              </h3>
              <TemplateSocialLinks
                resumeData={resumeData}
                editable={editable}
                themeColor={accent}
                variant="vertical"
              />
            </div>
          )}

          {/* Skills */}
          {(resumeData.skills && resumeData.skills.length > 0) || editable ? (
            <div className="mb-8">
              <h3
                className="uppercase tracking-widest"
                style={{
                  fontSize: '15px',
                  fontWeight: styles.sectionHeading.weight,
                  color: '#1a1a1a',
                  marginBottom: "12px",
                }}
              >
                Skills
              </h3>
              {editable ? (
                <div className="space-y-2">
                  <InlineEditableSkills
                    path="skills"
                    skills={resumeData.skills || []}
                    renderSkill={(skill, index) => (
                      <div
                        className="font-light"
                        style={{
                          fontSize: '13px',
                          color: '#1a1a1a',
                        }}
                      >
                        <InlineEditableText
                          path={`skills[${index}].name`}
                          value={skill.name}
                          className="font-light"
                          style={{ fontSize: '13px', color: '#1a1a1a' }}
                          as="span"
                          placeholder="New Skill"
                        />
                      </div>
                    )}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={skill.id || index}
                      className="font-light"
                      style={{
                        fontSize: '13px',
                        color: '#1a1a1a',
                      }}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* Education */}
          {(resumeData.education && resumeData.education.length > 0) || editable ? (
            <div className="mb-8">
              <h3
                className="uppercase tracking-widest"
                style={{
                  fontSize: '15px',
                  fontWeight: styles.sectionHeading.weight,
                  color: '#1a1a1a',
                  marginBottom: "12px",
                }}
              >
                Education
              </h3>
              {editable ? (
                <InlineEditableList
                  path="education"
                  items={resumeData.education || []}
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
                        className="mb-1"
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#1a1a1a',
                        }}
                        as="div"
                      />
                      {(editable || edu.field) && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field || ""}
                          className="mb-1"
                          style={{ fontSize: '13px', color: '#1a1a1a' }}
                          as="div"
                          placeholder="Field of Study"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="mb-1"
                        as="div"
                        style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          color: accent,
                        }}
                      />
                      <div style={{ fontSize: '13px', color: '#525252' }}>
                        <div className="flex items-center gap-1">
                          <InlineEditableDate
                            path={`education[${index}].startDate`}
                            value={edu.startDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                          <span> — </span>
                          <InlineEditableDate
                            path={`education[${index}].endDate`}
                            value={edu.endDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                        </div>
                        {(editable || edu.gpa) && (
                          <div className="mt-1">
                            <span>GPA: </span>
                            <InlineEditableText
                              path={`education[${index}].gpa`}
                              value={edu.gpa || ""}
                              className="inline-block"
                              style={{ fontSize: '13px', color: '#525252' }}
                              as="span"
                              placeholder="3.8/4.0"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id}>
                      <div
                        className="mb-1"
                        style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}
                      >
                        {edu.degree}
                      </div>
                      {edu.field && (
                        <div
                          className="mb-1"
                          style={{ fontSize: '13px', color: '#1a1a1a' }}
                        >
                          {edu.field}
                        </div>
                      )}
                      <div
                        className="mb-1"
                        style={{ fontSize: '13px', fontWeight: 500, color: accent }}
                      >
                        {edu.school}
                      </div>
                      <div style={{ fontSize: '13px', color: '#525252' }}>
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                        {edu.gpa && (
                          <div className="mt-1">
                            GPA: {edu.gpa}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Main Content */}
        <div
          className="px-12 py-12"
          style={{ fontSize: '13px', color: '#1a1a1a' }}
        >
          {/* Header */}
          <div className="mb-10">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="mb-3"
                as="h1"
                style={{
                  fontSize: '27px',
                  fontWeight: styles.header.name.weight,
                  lineHeight: styles.header.name.lineHeight,
                  color: accent,
                }}
              />
            ) : (
              <h1
                className="mb-3"
                style={{
                  fontSize: '27px',
                  fontWeight: styles.header.name.weight,
                  lineHeight: styles.header.name.lineHeight,
                  color: accent,
                }}
              >
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {(editable || resumeData.personalInfo.title) && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title || ""}
                  className="mb-6 uppercase tracking-wider"
                  as="h2"
                  style={{
                    fontSize: '16px',
                    fontWeight: styles.header.title.weight,
                    color: '#1a1a1a',
                  }}
                  placeholder="Professional Title"
                />
              ) : (
                resumeData.personalInfo.title && (
                  <h2
                    className="mb-6 uppercase tracking-wider"
                    style={{
                      fontSize: '16px',
                      fontWeight: styles.header.title.weight,
                      color: '#1a1a1a',
                    }}
                  >
                    {resumeData.personalInfo.title}
                  </h2>
                )
              )
            )}
            {(resumeData.personalInfo.summary || editable) && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  className="font-light"
                  style={{
                    fontSize: '13px !important',
                    color: '#1a1a1a !important',
                    lineHeight: styles.itemDescription.lineHeight,
                  }}
                  as="div"
                  multiline
                  placeholder="Professional summary..."
                />
              ) : (
                resumeData.personalInfo.summary && (
                  <div
                    className="font-light"
                    style={{
                      fontSize: '13px !important',
                      color: '#1a1a1a !important',
                      lineHeight: styles.itemDescription.lineHeight,
                    }}
                  >
                    {resumeData.personalInfo.summary}
                  </div>
                )
              )
            )}
          </div>

          {/* Professional Experience */}
          {(resumeData.experience && resumeData.experience.length > 0) || editable ? (
            <div style={{ marginBottom: styles.spacing.sectionGap }}>
              <SectionHeader
                title="Professional Experience"
                themeColor={accent}
                className="uppercase tracking-widest"
                paddingBottom="8px"
                style={{ marginBottom: '12px' }}
              />
              <ExperienceVariantRenderer
                experience={resumeData.experience || []}
                editable={editable}
                variant="timeline"
                accentColor={accent}
                formatDate={formatDate}
                onAddBulletPoint={addBulletPoint}
                onRemoveBulletPoint={removeBulletPoint}
              />
            </div>
          ) : null}

          {/* Custom Sections */}
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
                  className="uppercase tracking-widest"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
              )}
              itemStyle={{ 
                fontSize: '13px', 
                color: '#1a1a1a', 
                lineHeight: styles.itemDescription.lineHeight,
                fontWeight: '300',
              }}
              sectionStyle={{ marginBottom: styles.spacing.sectionGap }}
              showAddSection={true}
              renderItem={(item, itemIndex, sectionIndex, helpers) => {
                const itemValue = typeof item === 'string' ? item : (item as any)?.text || String(item || '');
                return (
                  <div key={itemIndex} className="group flex items-start gap-2 mb-1.5">
                    {editable ? (
                      <helpers.EditableText
                        className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1 font-light pl-4 relative before:content-['•'] before:absolute before:left-0"
                        style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: styles.itemDescription.lineHeight }}
                        placeholder="Click to add item..."
                      />
                    ) : (
                      <span className="font-light pl-4 relative before:content-['•'] before:absolute before:left-0" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: styles.itemDescription.lineHeight }}>
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
                        <X className="h-3 w-3" />
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
                  className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                  style={{ color: accent, borderColor: accent }}
                >
                  <Plus className="h-3 w-3" />
                  Add Item
                </button>
              )}
            />
          </div>
        </div>
        </div>
      </div>
    </StyleOptionsWrapper>
  );
};
