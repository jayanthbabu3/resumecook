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
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfstandards";

interface PremiumEliteTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const PremiumEliteTemplate = ({
  resumeData,
  themeColor = "#8b5cf6",
  editable = false,
}: PremiumEliteTemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };

  return (
    <StyleOptionsWrapper>
      <div className="w-full h-full bg-white text-[13px] leading-relaxed" style={{ color: '#1a1a1a' }}>
      {/* Top Accent Bar with Header */}
      <div 
        className="px-12 pt-10 pb-8"
        style={{ 
          background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 text-white">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="mb-2 tracking-tight"
                style={{ fontSize: '27px', fontWeight: 700, color: 'white' }}
                as="h1"
              />
            ) : (
              <h1 className="mb-2 tracking-tight" style={{ fontSize: '27px', fontWeight: 700, color: 'white' }}>
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {(editable || resumeData.personalInfo.title) && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title || ""}
                  className="mb-4"
                  style={{ fontSize: '16px', fontWeight: 500, color: 'white' }}
                  as="div"
                  placeholder="Professional Title"
                />
              ) : (
                resumeData.personalInfo.title && (
                  <div className="mb-4" style={{ fontSize: '16px', fontWeight: 500, color: 'white' }}>
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
            <div className="ml-8">
              <div className="border-4 border-white rounded-2xl overflow-hidden shadow-xl">
                <ProfilePhoto
                  src={photo}
                  borderClass=""
                  className="rounded-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Professional Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-8 p-5 rounded-xl" style={{ backgroundColor: accentLight }}>
            <h2
              className="font-bold uppercase tracking-wide mb-3"
              style={{ fontSize: '15px', color: accent }}
            >
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary || ""}
                className="leading-[1.75]"
                style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.75 }}
                as="div"
                multiline
                placeholder="Professional summary..."
              />
            ) : (
              resumeData.personalInfo.summary && (
                <div className="leading-[1.75]" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.75 }}>
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

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - 40% */}
          <div className="col-span-5 space-y-7">
            {/* Education */}
            {(resumeData.education && resumeData.education.length > 0) || editable ? (
              <div>
                <SectionHeader
                  title="Education"
                  themeColor={accent}
                  className="mb-4"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
                {editable ? (
                  <InlineEditableList
                    path="education"
                    items={resumeData.education}
                    defaultItem={{
                      id: Date.now().toString(),
                      school: "University Name",
                      degree: "Degree Title",
                      field: "Field of Study",
                      startDate: "2020-01",
                      endDate: "2024-01",
                      gpa: "",
                    }}
                    addButtonLabel="Add Education"
                    renderItem={(edu, index) => (
                      <div className="relative pl-4 border-l-2" style={{ borderColor: accentLight }}>
                        <div
                          className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="text-[13px] font-bold text-gray-900"
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
                          className="font-semibold mt-1.5"
                          style={{ fontSize: '13px', color: accent }}
                          as="p"
                        />
                        <div className="mt-1" style={{ fontSize: '13px', color: '#525252' }}>
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
                        </div>
                        {(editable || edu.gpa) && (
                          <div className="mt-1" style={{ fontSize: '13px', color: '#525252' }}>
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
                  <div className="space-y-5">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="relative pl-4 border-l-2" style={{ borderColor: accentLight }}>
                        <div
                          className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <h3 className="text-[13px] font-bold text-gray-900">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="mt-1" style={{ fontSize: '13px', color: '#1a1a1a' }}>{edu.field}</p>
                        )}
                        <p className="font-semibold mt-1.5" style={{ fontSize: '13px', color: accent }}>
                          {edu.school}
                        </p>
                        <p className="mt-1" style={{ fontSize: '13px', color: '#525252' }}>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                        {edu.gpa && (
                          <p className="mt-1" style={{ fontSize: '13px', color: '#525252' }}>
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
                  title="Skills & Expertise"
                  themeColor={accent}
                  className="mb-4"
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
                          className="font-medium px-3 py-1.5 rounded-lg"
                          style={{
                            fontSize: '13px',
                            backgroundColor: accentLight,
                            color: accent
                          }}
                        >
                          <InlineEditableText
                            path={`skills[${index}].name`}
                            value={skill.name}
                            className="font-medium"
                            style={{ fontSize: '13px', color: accent }}
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
                        className="font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          fontSize: '13px',
                          backgroundColor: accentLight,
                          color: accent
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

          {/* Right Column - 60% */}
          <div className="col-span-7 space-y-7">
            {/* Experience */}
            {(resumeData.experience && resumeData.experience.length > 0) || editable ? (
              <div>
                <SectionHeader
                  title="Professional Experience"
                  themeColor={accent}
                  className="mb-4"
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
                      <div className="relative">
                        <div className="flex justify-between items-start mb-2.5">
                          <div className="flex-1">
                            <InlineEditableText
                              path={`experience[${index}].position`}
                              value={exp.position}
                              className="font-bold"
                              style={{ fontSize: '15px', color: '#1a1a1a' }}
                              as="h3"
                            />
                            <InlineEditableText
                              path={`experience[${index}].company`}
                              value={exp.company}
                              className="font-bold mt-1"
                              style={{ fontSize: '13px', color: accent }}
                              as="p"
                            />
                          </div>
                          <div
                            className="text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                              color: 'white'
                            }}
                          >
                            <div className="text-xs text-white flex items-center gap-1">
                              <InlineEditableDate
                                path={`experience[${index}].startDate`}
                                value={exp.startDate}
                                formatDisplay={formatDate}
                                className="inline-block"
                              />
                              <span> — </span>
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
                        <div className="space-y-1.5">
                          {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                            exp.bulletPoints.map((bullet, bulletIndex) => (
                              <div key={bulletIndex} className="flex items-start gap-2 group">
                                <div className="flex-1">
                                  <InlineEditableText
                                    path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                    value={bullet}
                                    className="leading-[1.7] ml-5 list-disc"
                                    style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.7 }}
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
                            <div className="text-[12px] text-gray-700 leading-[1.7] ml-5 list-disc">
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
                      <div key={exp.id} className="relative">
                        <div className="flex justify-between items-start mb-2.5">
                          <div className="flex-1">
                            <h3 className="font-bold" style={{ fontSize: '15px', color: '#1a1a1a' }}>
                              {exp.position}
                            </h3>
                            <p
                              className="font-bold mt-1"
                              style={{ fontSize: '13px', color: accent }}
                            >
                              {exp.company}
                            </p>
                          </div>
                          <div
                            className="text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                              color: 'white'
                            }}
                          >
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </div>
                        </div>
                        {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                          <ul className="ml-5 list-disc space-y-1.5 leading-[1.7]">
                            {exp.bulletPoints.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="pl-1" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.7 }}>{bullet}</li>
                            ))}
                          </ul>
                        ) : (
                          exp.description && (
                            <ul className="ml-5 list-disc space-y-1.5 leading-[1.7]">
                              {exp.description
                                .split("\n")
                                .map((line) => line.trim())
                                .filter(Boolean)
                                .map((line, i) => (
                                  <li key={i} className="pl-1" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.7 }}>{line}</li>
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
                    className="mb-4"
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
        </div>
      </div>
    </StyleOptionsWrapper>
  );
};

