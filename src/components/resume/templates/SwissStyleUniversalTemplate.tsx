import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

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
                    description: "Job description here",
                    current: false,
                  }}
                  addButtonLabel="Add Experience"
                  renderItem={(exp, index) => (
                    <div className="mb-8 last:mb-0">
                      <div className="grid grid-cols-3 gap-4 mb-2">
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
                      {exp.description && (
                        <InlineEditableText
                          path={`experience[${index}].description`}
                          value={exp.description}
                          className="text-[12.5px] text-gray-700 leading-[1.8] block"
                          multiline
                          as="div"
                        />
                      )}
                    </div>
                  )}
                />
              ) : (
                resumeData.experience.map((exp, index) => {
                  const bulletPoints = (exp.description || "")
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
                            {exp.startDate} — {exp.current ? "Present" : exp.endDate}
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
        <div className="mb-12">
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
                        <div className="text-right text-[11px] text-gray-600">
                          <p>{edu.startDate} — {edu.endDate}</p>
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
                        <p>{edu.startDate} — {edu.endDate}</p>
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
              content: "Section content here",
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
                    <InlineEditableText
                      path={`sections[${sectionIndex}].content`}
                      value={section.content}
                      className="text-[13px] text-gray-700 leading-[1.8] block"
                      multiline
                      as="div"
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
                  <div className="text-[13px] text-gray-700 leading-[1.8]">
                    {section.content.split("\n").map((line, i) => (
                      <p key={i} className="mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};
