import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";

interface SwissStyleUniversalTemplateProps {
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

export const SwissStyleUniversalTemplate = ({
  resumeData,
  themeColor = "#dc2626",
  editable = false,
}: SwissStyleUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#dc2626";
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
    <div className="w-full h-full bg-white text-gray-900 p-16 text-[13px] leading-relaxed">
      {/* Swiss Grid Layout - Name on left, contact on right */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[36px] font-bold leading-none block"
              as="h1"
            />
          ) : (
            <h1 className="text-[36px] font-bold leading-none">
              {resumeData.personalInfo.fullName}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Professional Title"}
              className="text-[14px] text-gray-600 mt-2 block"
              as="p"
            />
          ) : (
            <p className="text-[14px] text-gray-600 mt-2">
              {resumeData.personalInfo.title || "Professional Title"}
            </p>
          )}
        </div>
        <div className="text-[12px] text-gray-700 space-y-1">
          {resumeData.personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={resumeData.personalInfo.email}
                className="block"
              />
            ) : (
              <p>{resumeData.personalInfo.email}</p>
            )
          )}
          {resumeData.personalInfo.phone && (
            editable ? (
              <InlineEditableText
                path="personalInfo.phone"
                value={resumeData.personalInfo.phone}
                className="block"
              />
            ) : (
              <p>{resumeData.personalInfo.phone}</p>
            )
          )}
          {resumeData.personalInfo.location && (
            editable ? (
              <InlineEditableText
                path="personalInfo.location"
                value={resumeData.personalInfo.location}
                className="block"
              />
            ) : (
              <p>{resumeData.personalInfo.location}</p>
            )
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-12">
          <div className="grid grid-cols-4 gap-12">
            <div className="col-span-1">
              <h2 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                Summary
              </h2>
            </div>
            <div className="col-span-3">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-[13px] text-gray-700 leading-[1.8] block"
                  multiline
                  as="p"
                />
              ) : (
                <p className="text-[13px] text-gray-700 leading-[1.8]">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-4 gap-12">
            <div className="col-span-1">
              <h2 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                Experience
              </h2>
            </div>
            <div className="col-span-3">
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
                      <div className="mb-8 last:mb-0 space-y-2">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <InlineEditableText
                              path={`experience[${index}].position`}
                              value={exp.position}
                              className="text-[14px] font-bold text-gray-900 block"
                              as="h3"
                            />
                            <InlineEditableText
                              path={`experience[${index}].company`}
                              value={exp.company}
                              className="text-[13px] text-gray-700 block"
                              as="p"
                            />
                          </div>
                          <div className="text-right text-[11px] text-gray-600">
                            <div className="flex items-center justify-end gap-1">
                              <InlineEditableDate
                                path={`experience[${index}].startDate`}
                                value={exp.startDate}
                                className="inline-block"
                              />
                              <span>—</span>
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
                                  className="text-[12.5px] text-gray-700 leading-[1.8] flex-1 border border-dashed border-gray-300 rounded px-1"
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
                            className="flex items-center justify-start gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium"
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
                    <div key={index} className="mb-8 last:mb-0">
                      <div className="grid grid-cols-3 gap-4 mb-2">
                        <div className="col-span-2">
                          <h3 className="text-[14px] font-bold text-gray-900">
                            {exp.position}
                          </h3>
                          <p className="text-[13px] text-gray-700">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-right text-[11px] text-gray-600">
                          <p>
                            {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                          </p>
                        </div>
                      </div>
                      {bulletPoints.length > 0 && (
                        <ul className="space-y-1 text-[12.5px] text-gray-700 leading-[1.8]">
                          {bulletPoints.map((point, i) => (
                            <li key={i} className="pl-0">• {point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div data-section="education" className="mb-12" style={{ lineHeight: 1.8 }}>
          <div className="grid grid-cols-4 gap-12">
            <div className="col-span-1">
              <h2 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                Education
              </h2>
            </div>
            <div className="col-span-3">
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
                    <div className="mb-5 last:mb-0">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <InlineEditableText
                            path={`education[${index}].degree`}
                            value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                            className="text-[14px] font-bold text-gray-900 block"
                            as="h3"
                          />
                          <InlineEditableText
                            path={`education[${index}].school`}
                            value={edu.school}
                            className="text-[13px] text-gray-700 block"
                            as="p"
                          />
                        </div>
                        <div className="text-right text-[11px] text-gray-600 flex items-center justify-end gap-1">
                          <InlineEditableDate
                            path={`education[${index}].startDate`}
                            value={edu.startDate}
                            className="inline-block"
                          />
                          <span>—</span>
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
                  <div key={index} className="mb-5 last:mb-0">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <h3 className="text-[14px] font-bold text-gray-900">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <p className="text-[13px] text-gray-700">{edu.school}</p>
                      </div>
                      <div className="text-right text-[11px] text-gray-600">
                        <p>{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-4 gap-12">
            <div className="col-span-1">
              <h2 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                Skills
              </h2>
            </div>
            <div className="col-span-3">
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
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px] text-gray-900">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index}>• {skill.name}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
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
              <div className="mb-12">
                <div className="grid grid-cols-4 gap-12">
                  <div className="col-span-1">
                    <InlineEditableText
                      path={`sections[${sectionIndex}].title`}
                      value={section.title}
                      className="text-[11px] font-bold uppercase tracking-widest block"
                      style={{ color: accent }}
                      as="h2"
                    />
                  </div>
                  <div className="col-span-3">
                    <InlineEditableSectionItems
                      sectionIndex={sectionIndex}
                      items={section.items || []}
                      content={section.content || ""}
                      editable={true}
                      itemStyle={{ fontSize: '13px', color: '#374151', lineHeight: 1.8 }}
                      addButtonLabel="Add Item"
                      placeholder="Click to add item..."
                      accentColor={accent}
                      showBullets={true}
                    />
                  </div>
                </div>
              </div>
            )}
          />
        ) : (
          resumeData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <div className="grid grid-cols-4 gap-12">
                <div className="col-span-1">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                    {section.title}
                  </h2>
                </div>
                <div className="col-span-3">
                  <InlineEditableSectionItems
                    sectionIndex={sectionIndex}
                    items={section.items || []}
                    content={section.content || ""}
                    editable={false}
                    itemStyle={{ fontSize: '13px', color: '#374151', lineHeight: 1.8 }}
                    showBullets={true}
                  />
                </div>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};
