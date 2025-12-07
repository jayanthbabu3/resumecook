import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { TemplateContactInfo, TemplateSocialLinks, SectionHeader } from "@/components/resume/shared/TemplateBase";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfstandards";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";

interface ExecutiveLetterheadUniversalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

export const ExecutiveLetterheadUniversalTemplate = ({
  resumeData,
  themeColor = "#1e3a8a",
  editable = false,
}: ExecutiveLetterheadUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#1e3a8a";
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();
  const styleOptions = useStyleOptionsWithDefaults();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };

  return (
    <StyleOptionsWrapper>
      <div className="w-full h-full bg-white text-gray-900" style={{ fontSize: '13px', lineHeight: 1.5 }}>
        {/* Letterhead Header */}
        <div className="p-8 pb-6 border-b-4" style={{ borderColor: accent }}>
          <div className="text-center">
            {editable ? (
              <>
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="font-bold mb-2 block uppercase tracking-wide"
                  style={{ fontSize: '27px', lineHeight: 1.2, color: accent }}
                  as="h1"
                />
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title || "Professional Title"}
                  className="font-semibold mb-4 block uppercase tracking-wider"
                  style={{ fontSize: '16px', lineHeight: 1.4, color: '#374151' }}
                  as="p"
                />
              </>
            ) : (
              <>
                <h1 className="font-bold mb-2 uppercase tracking-wide" style={{ fontSize: '27px', lineHeight: 1.2, color: accent }}>
                  {resumeData.personalInfo.fullName}
                </h1>
                <p className="font-semibold mb-4 uppercase tracking-wider" style={{ fontSize: '16px', lineHeight: 1.4, color: '#374151' }}>
                  {resumeData.personalInfo.title || "Professional Title"}
                </p>
              </>
            )}
            <div className="flex justify-center flex-wrap gap-x-6 gap-y-1" style={{ fontSize: '13px', color: '#1a1a1a' }}>
              <TemplateContactInfo
                resumeData={resumeData}
                editable={editable}
                themeColor={accent}
                layout="horizontal"
              />
            </div>
          </div>
        </div>

      <div className="p-12">
        {/* Executive Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8" data-section="summary">
            <SectionHeader 
              title="Executive Summary" 
              themeColor={accent}
              className="mb-3"
              paddingBottom="8px"
              style={{ marginBottom: '12px' }}
            />
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="leading-relaxed"
                style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
                multiline
                as="p"
              />
            ) : (
              <p className="leading-relaxed" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8" data-section="experience">
            <SectionHeader 
              title="Professional Experience" 
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
                  description: "",
                  bulletPoints: ["Achievement or responsibility"],
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => {
                  const hasBullets = Array.isArray(exp.bulletPoints) && exp.bulletPoints.length > 0;
                  return (
                    <div className="mb-6 last:mb-0 space-y-2">
                      <div className="flex justify-between items-baseline">
                      <div>
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="font-semibold block"
                          style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="italic mt-1 block"
                          style={{ fontSize: '14px', color: accent, lineHeight: 1.4 }}
                          as="p"
                        />
                      </div>
                      <div className="flex items-center gap-1" style={{ fontSize: '13px', color: '#525252' }}>
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
                      <div className="space-y-2 mt-3">
                        {hasBullets ? (
                          exp.bulletPoints!.map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="flex items-start gap-3 group">
                              <span style={{ color: '#1a1a1a', marginTop: '4px' }}>
                                {styleOptions.getBulletChar()}
                              </span>
                              <div className="flex-1 flex items-center gap-2">
                                <InlineEditableText
                                  path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                  value={bullet || ""}
                                  placeholder="Click to add achievement..."
                                  className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                  style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
                                  multiline
                                  as="span"
                                />
                                {editable && removeBulletPoint && (
                                  <button
                                    type="button"
                                    onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                                    style={{ color: '#ef4444' }}
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        ) : null}
                        {editable && addBulletPoint && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addBulletPoint(exp.id);
                            }}
                            className="flex items-center gap-1 text-xs font-medium mt-2"
                            style={{ color: accent }}
                          >
                            <Plus className="h-3 w-3" />
                            Add Achievement
                          </button>
                        )}
                      </div>
                  </div>
                  );
                }}
              />
            ) : (
              resumeData.experience.map((exp, index) => {
                const bulletPoints =
                  exp.bulletPoints && exp.bulletPoints.length > 0
                    ? exp.bulletPoints
                    : (exp.description || "")
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean);

                return (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                          {exp.position}
                        </h3>
                        <p className="italic mt-1" style={{ fontSize: '14px', color: accent, lineHeight: 1.4 }}>
                          {exp.company}
                        </p>
                      </div>
                      <div style={{ fontSize: '13px', color: '#525252' }}>
                        <p>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>
                      </div>
                    </div>
                    {bulletPoints.length > 0 && (
                      <ul className="space-y-2 mt-3" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
                        {bulletPoints.map((point, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span style={{ color: '#1a1a1a', marginTop: '4px' }}>
                              {styleOptions.getBulletChar()}
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div data-section="education" className="mb-8">
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
                  school: "School Name",
                  degree: "Degree",
                  field: "Field of Study",
                  startDate: "2019-09",
                  endDate: "2023-05",
                  gpa: "",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="mb-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="font-semibold block"
                          style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                          as="h3"
                        />
                        {(editable || edu.field) && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field || ""}
                            className="mt-1 block"
                            style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.4 }}
                            as="p"
                            placeholder="Field of Study"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="italic mt-1 block"
                          style={{ fontSize: '13px', color: accent, lineHeight: 1.4 }}
                          as="p"
                        />
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
                      <div className="flex items-center gap-1 ml-4" style={{ fontSize: '13px', color: '#525252' }}>
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
                    </div>
                  </div>
                )}
              />
            ) : (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p className="mt-1" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.4 }}>
                          {edu.field}
                        </p>
                      )}
                      <p className="italic mt-1" style={{ fontSize: '13px', color: accent, lineHeight: 1.4 }}>
                        {edu.school}
                      </p>
                      {edu.gpa && (
                        <p className="mt-1" style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="ml-4" style={{ fontSize: '13px', color: '#525252' }}>
                      <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8" data-section="skills">
            <SectionHeader 
              title="Core Competencies" 
              themeColor={accent}
              className="mb-3"
              paddingBottom="8px"
              style={{ marginBottom: '12px' }}
            />
            {editable ? (
              <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div style={{ fontSize: '13px', color: '#1a1a1a' }}>
                      {styleOptions.getBulletChar()} {skill.name}
                    </div>
                  )}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-x-6 gap-y-2" style={{ fontSize: '13px', color: '#1a1a1a' }}>
                {resumeData.skills.map((skill, index) => (
                  <div key={index}>{styleOptions.getBulletChar()} {skill.name}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Social Links */}
        {resumeData.includeSocialLinks && (
          <div className="mb-8" data-section="social">
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
                className="mb-3"
                paddingBottom="8px"
                style={{ marginBottom: '12px' }}
              />
            )}
            itemStyle={{ 
              fontSize: '13px', 
              color: '#1a1a1a', 
              lineHeight: 1.5 
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
                      style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
                      placeholder="Click to add item..."
                    />
                  ) : (
                    <span style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
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
    </StyleOptionsWrapper>
  );
};
