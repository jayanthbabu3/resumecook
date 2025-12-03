import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
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

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = parseInt(month, 10) - 1;
    if (Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return date;
    return `${monthNames[monthIndex]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 text-[13px] leading-relaxed">
      {/* Letterhead Header */}
      <div className="p-8 pb-6 border-b-4" style={{ borderColor: accent }}>
        <div className="text-center">
          {editable ? (
            <>
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[28px] font-bold mb-2 block uppercase tracking-wide"
                style={{ color: accent }}
                as="h1"
              />
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title || "Professional Title"}
                className="text-[13px] text-gray-700 font-semibold mb-4 block uppercase tracking-wider"
                as="p"
              />
            </>
          ) : (
            <>
              <h1 className="text-[28px] font-bold mb-2 uppercase tracking-wide" style={{ color: accent }}>
                {resumeData.personalInfo.fullName}
              </h1>
              <p className="text-[13px] text-gray-700 font-semibold mb-4 uppercase tracking-wider">
                {resumeData.personalInfo.title || "Professional Title"}
              </p>
            </>
          )}
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-1 text-[12px] text-gray-600">
            {resumeData.personalInfo.email && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.email}</span>
              )
            )}
            {resumeData.personalInfo.phone && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.phone}</span>
              )
            )}
            {resumeData.personalInfo.location && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.location}</span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* Executive Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-10">
            <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: accent }}>
              Executive Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[13px] text-gray-700 leading-[1.7] block"
                multiline
                as="p"
              />
            ) : (
              <p className="text-[13px] text-gray-700 leading-[1.7]">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[14px] font-bold mb-4 uppercase tracking-wide" style={{ color: accent }}>
              Professional Experience
            </h2>
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
                            className="text-[14px] font-semibold text-gray-900 block"
                            as="h3"
                          />
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="text-[13px] text-gray-700 italic block"
                            as="p"
                          />
                        </div>
                        <div className="text-[11px] text-gray-600 flex items-center gap-1">
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                            className="inline-block"
                          />
                          <span>-</span>
                          {exp.current ? (
                            <span>Present</span>
                          ) : (
                            <InlineEditableDate
                              path={`experience[${index}].endDate`}
                              value={exp.endDate}
                              className="inline-block"
                            />
                          )}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {hasBullets ? (
                          exp.bulletPoints!.map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="flex items-start gap-2 group">
                              <span className="text-gray-400 mt-1">•</span>
                              <InlineEditableText
                                path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                value={bullet || ""}
                                placeholder="Click to add achievement..."
                                className="text-[12.5px] text-gray-700 leading-[1.7] flex-1 border border-dashed border-gray-300 rounded px-1"
                                multiline
                                as="span"
                              />
                              <button
                                type="button"
                                onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded text-red-500"
                                disabled={exp.bulletPoints!.length <= 1}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-[12px] text-gray-500 italic">No bullet points yet.</div>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addBulletPoint?.(exp.id);
                          }}
                          className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <Plus className="h-3 w-3" />
                          Add Achievement
                        </button>
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
                        <h3 className="text-[14px] font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-[13px] text-gray-700 italic">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-[11px] text-gray-600">
                        <p>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>
                      </div>
                    </div>
                    {bulletPoints.length > 0 && (
                      <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                        {bulletPoints.map((point, i) => (
                          <li key={i}>{point}</li>
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
          <div data-section="education" className="mb-10" style={{ lineHeight: 1.8 }}>
            <h2 className="text-[14px] font-bold mb-4 uppercase tracking-wide" style={{ color: accent }}>
              Education
            </h2>
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
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="mb-4 last:mb-0">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                          className="text-[14px] font-semibold text-gray-900 block"
                          as="h3"
                        />
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="text-[13px] text-gray-700 italic block"
                          as="p"
                        />
                      </div>
                      <div className="text-[11px] text-gray-600 flex items-center gap-1">
                        <InlineEditableDate
                          path={`education[${index}].startDate`}
                          value={edu.startDate}
                          className="inline-block"
                        />
                        <span>-</span>
                        <InlineEditableDate
                          path={`education[${index}].endDate`}
                          value={edu.endDate}
                          className="inline-block"
                        />
                      </div>
                    </div>
                  </div>
                )}
              />
            ) : (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-[14px] font-semibold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-[13px] text-gray-700 italic">{edu.school}</p>
                    </div>
                    <div className="text-[11px] text-gray-600">
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
          <div className="mb-10">
            <h2 className="text-[14px] font-bold mb-4 uppercase tracking-wide" style={{ color: accent }}>
              Core Competencies
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <span className="text-[13px] text-gray-900">
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-[13px] text-gray-900">
                {resumeData.skills.map((skill, index) => (
                  <div key={index}>• {skill.name}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.sections && resumeData.sections.length > 0 && (
          editable ? (
            <InlineEditableList
              path="sections"
              items={resumeData.sections}
              defaultItem={{
                id: Date.now().toString(),
                title: "New Section",
                content: "",
                items: ["New item"],
              }}
              addButtonLabel="Add Section"
              renderItem={(section, sectionIndex) => (
                <div className="mb-10">
                  <InlineEditableText
                    path={`sections[${sectionIndex}].title`}
                    value={section.title}
                    className="text-[14px] font-bold mb-4 uppercase tracking-wide block"
                    style={{ color: accent }}
                    as="h2"
                  />
                  <InlineEditableSectionItems
                    sectionIndex={sectionIndex}
                    items={section.items || []}
                    content={section.content || ""}
                    editable={true}
                    itemStyle={{ fontSize: '13px', color: '#374151', lineHeight: 1.7 }}
                    addButtonLabel="Add Item"
                    placeholder="Click to add item..."
                    accentColor={accent}
                    showBullets={true}
                  />
                </div>
              )}
            />
          ) : (
            resumeData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-10">
                <h2 className="text-[14px] font-bold mb-4 uppercase tracking-wide" style={{ color: accent }}>
                  {section.title}
                </h2>
                <InlineEditableSectionItems
                  sectionIndex={sectionIndex}
                  items={section.items || []}
                  content={section.content || ""}
                  editable={false}
                  itemStyle={{ fontSize: '13px', color: '#374151', lineHeight: 1.7 }}
                  showBullets={true}
                />
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};
