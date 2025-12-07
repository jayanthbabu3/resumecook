import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { TemplateContactInfo, TemplateSocialLinks, SectionHeader } from "@/components/resume/shared/TemplateBase";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface BoldHeadlineTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const BoldHeadlineTemplate = ({
  resumeData,
  themeColor = "#dc2626",
  editable = false,
}: BoldHeadlineTemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();
  const photo = resumeData.personalInfo.photo;
  const styles = SINGLE_COLUMN_CONFIG;
  const accent = themeColor || styles.colors.primary;
  const accentLight = `${accent}15`;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };

  return (
    <StyleOptionsWrapper>
      <div
        className="w-full h-full bg-white"
        style={{
          fontFamily: styles.fonts.primary,
          color: '#1a1a1a',
          lineHeight: styles.itemDescription.lineHeight,
        }}
      >
      {/* Bold Header Section */}
      <div
        className="text-white"
        style={{
          backgroundColor: accent,
          padding: styles.header.spacing.padding,
        }}
      >
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="mb-3"
                as="h1"
                style={{
                  fontSize: '27px',
                  fontWeight: 700,
                  lineHeight: styles.header.name.lineHeight,
                  color: 'white',
                }}
              />
            ) : (
              <h1
                className="mb-3"
                style={{
                  fontSize: '27px',
                  fontWeight: 700,
                  lineHeight: styles.header.name.lineHeight,
                  color: 'white',
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
                  className="uppercase mb-5"
                  as="div"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'white',
                    letterSpacing: "0.08em",
                  }}
                  placeholder="Professional Title"
                />
              ) : (
                resumeData.personalInfo.title && (
                  <div
                    className="uppercase mb-5"
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'white',
                      letterSpacing: "0.08em",
                    }}
                  >
                    {resumeData.personalInfo.title}
                  </div>
                )
              )
            )}

            <div className="mt-4" style={{ fontSize: '13px', color: 'white' }}>
              {editable ? (
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {resumeData.personalInfo.email && (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={resumeData.personalInfo.email}
                      className="inline"
                      style={{ fontSize: '13px', color: 'white' }}
                      as="span"
                    />
                  )}
                  {resumeData.personalInfo.phone && (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={resumeData.personalInfo.phone}
                      className="inline"
                      style={{ fontSize: '13px', color: 'white' }}
                      as="span"
                    />
                  )}
                  {resumeData.personalInfo.location && (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={resumeData.personalInfo.location}
                      className="inline"
                      style={{ fontSize: '13px', color: 'white' }}
                      as="span"
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-x-6 gap-y-2" style={{ fontSize: '13px', color: 'white' }}>
                  {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                  {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                  {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
                </div>
              )}
            </div>
          </div>

          {photo && (
            <div className="relative">
              <div className="absolute -bottom-2 -right-2 w-full h-full" style={{ backgroundColor: accent }} />
              <ProfilePhoto
                src={photo}
                borderClass="border-4 border-white"
                className="relative z-10"
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8" style={{ fontSize: '13px', color: '#1a1a1a' }}>
        {/* Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-8 p-6" style={{ backgroundColor: accentLight }}>
            <h2
              className="uppercase tracking-wider"
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: "12px",
              }}
            >
              About Me
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary || ""}
                className="font-light"
                style={{
                  fontSize: '13px',
                  color: '#1a1a1a',
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
                    fontSize: '13px',
                    color: '#1a1a1a',
                    lineHeight: styles.itemDescription.lineHeight,
                  }}
                >
                  {resumeData.personalInfo.summary}
                </div>
              )
            )}
          </div>
        )}

        {/* Social Links */}
        {resumeData.includeSocialLinks && (
          <div className="mb-8">
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

        {/* Experience */}
        {(resumeData.experience && resumeData.experience.length > 0) || editable ? (
          <div className="mb-8">
            <SectionHeader
              title="Work Experience"
              themeColor={accent}
              className="mb-3"
              paddingBottom="8px"
              style={{ marginBottom: '12px' }}
            />
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience}
                defaultItem={{
                  id: Date.now().toString(),
                  company: "Company Name",
                  position: "Position Title",
                  startDate: "2023-01",
                  endDate: "2024-01",
                  description: "Job description",
                  bulletPoints: [],
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div className="mb-6 last:mb-0">
                    <div className="flex justify-between items-start mb-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-gray-900"
                        as="h3"
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                        }}
                      />
                      <div className="text-[11px] font-bold px-4 py-2 text-white rounded-md" style={{ backgroundColor: accent }}>
                        <div className="flex items-center gap-1">
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                          <span> - </span>
                          {exp.current ? (
                            <span>Present</span>
                          ) : (
                            <InlineEditableDate
                              path={`experience[${index}].endDate`}
                              value={exp.endDate}
                              formatDisplay={formatDate}
                              className="inline-block"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="mb-3"
                      as="p"
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: accent,
                      }}
                    />
                    <div className="space-y-1.5">
                      {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                        exp.bulletPoints.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex items-start gap-2 group">
                            <div className="flex-1">
                              <InlineEditableText
                                path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                value={bullet}
                                className="font-light"
                                style={{
                                  fontSize: '13px',
                                  color: '#1a1a1a',
                                  lineHeight: styles.itemDescription.lineHeight,
                                }}
                                placeholder="Enter bullet point..."
                                as="div"
                                multiline
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                              disabled={exp.bulletPoints.length <= 1}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div
                          className="font-light"
                          style={{
                            fontSize: '13px',
                            color: '#1a1a1a',
                            lineHeight: styles.itemDescription.lineHeight,
                          }}
                        >
                          No bullet points yet. Click "Add Bullet Point" to add one.
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBulletPoint(exp.id)}
                        className="h-7 px-2 text-xs border-dashed w-full justify-start"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Bullet Point
                      </Button>
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <h3
                        className="text-gray-900"
                        style={{ fontSize: '15px', fontWeight: 600 }}
                      >
                        {exp.position}
                      </h3>
                      <div className="text-[11px] font-bold px-4 py-2 text-white rounded-md" style={{ backgroundColor: accent }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <p
                      className="mb-3"
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: accent,
                      }}
                    >
                      {exp.company}
                    </p>
                    {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                      <ul
                        className="list-disc ml-5 space-y-1.5"
                        style={{
                          fontSize: '13px',
                          color: '#1a1a1a',
                          lineHeight: styles.itemDescription.lineHeight,
                        }}
                      >
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>{bullet}</li>
                        ))}
                      </ul>
                    ) : (
                      exp.description && (
                        <ul
                          className="list-disc ml-5 space-y-1.5"
                          style={{
                            fontSize: '13px',
                            color: '#1a1a1a',
                            lineHeight: styles.itemDescription.lineHeight,
                          }}
                        >
                          {exp.description
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                        </ul>
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-10">
          {/* Education */}
          {(resumeData.education && resumeData.education.length > 0) || editable ? (
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
                    <div className="mb-4 last:mb-0">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-gray-900 block"
                        as="h3"
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                        }}
                      />
                      {(editable || edu.field) && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field || ""}
                          className="mt-0.5 block"
                          as="p"
                          style={{
                            fontSize: '13px',
                            color: accent,
                          }}
                          placeholder="Field of Study"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="mt-1 block"
                        style={{ fontSize: '13px', color: '#1a1a1a' }}
                        as="p"
                      />
                      <div
                        className="mt-0.5 flex items-center gap-1"
                        style={{ fontSize: '13px', color: '#525252' }}
                      >
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
                        <div className="mt-0.5" style={{ fontSize: '13px', color: '#525252' }}>
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
                  )}
                />
              ) : (
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id}>
                      <h3
                        className="text-gray-900"
                        style={{ fontSize: '13px', fontWeight: 600 }}
                      >
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p
                          className="mt-0.5"
                          style={{
                            fontSize: '13px',
                            color: accent,
                            fontWeight: 500,
                          }}
                        >
                          {edu.field}
                        </p>
                      )}
                      <p style={{ fontSize: '13px', color: '#1a1a1a' }} className="mt-1">
                        {edu.school}
                      </p>
                      <p
                        className="mt-0.5"
                        style={{ fontSize: '13px', color: '#525252' }}
                      >
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.gpa && (
                        <p
                          className="mt-0.5"
                          style={{ fontSize: '13px', color: '#525252' }}
                        >
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* Skills */}
          {(resumeData.skills && resumeData.skills.length > 0) || editable ? (
            <div>
              <SectionHeader
                title="Skills"
                themeColor={accent}
                className="mb-3"
                paddingBottom="8px"
                style={{ marginBottom: '12px' }}
              />
              {editable ? (
                <div className="flex flex-wrap gap-2">
                  <InlineEditableSkills
                    path="skills"
                    skills={resumeData.skills || []}
                    renderSkill={(skill, index) => (
                      <span
                        className="inline-block mr-2 mb-2 text-white"
                        style={{
                          backgroundColor: accent,
                          fontSize: '13px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontWeight: 500,
                        }}
                      >
                        <InlineEditableText
                          path={`skills[${index}].name`}
                          value={skill.name}
                          className="text-white"
                          style={{ fontSize: '13px', color: 'white' }}
                          as="span"
                          placeholder="New Skill"
                        />
                      </span>
                    )}
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={skill.id || index}
                      className="inline-block text-white"
                      style={{
                        backgroundColor: accent,
                        fontSize: '13px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Additional Sections */}
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
              return (
                <div key={itemIndex} className="group flex items-start gap-2 mb-2">
                  {editable ? (
                    <helpers.EditableText
                      className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
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
                className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
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
    </StyleOptionsWrapper>
  );
};

