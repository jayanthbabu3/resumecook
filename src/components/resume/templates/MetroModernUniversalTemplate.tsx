import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface MetroModernUniversalTemplateProps {
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

export const MetroModernUniversalTemplate = ({
  resumeData,
  themeColor = "#0891b2",
  editable = false,
}: MetroModernUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#0891b2";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      {/* Header with Metro Style */}
      <div className="mb-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-1.5 h-24 flex-shrink-0" style={{ backgroundColor: accent }}></div>
          <div>
            {editable ? (
              <>
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-[32px] font-light mb-1 block"
                  style={{ color: accent }}
                  as="h1"
                />
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title || "Professional Title"}
                  className="text-[15px] text-gray-600 font-light block"
                  as="p"
                />
              </>
            ) : (
              <>
                <h1 className="text-[32px] font-light mb-1" style={{ color: accent }}>
                  {resumeData.personalInfo.fullName}
                </h1>
                <p className="text-[15px] text-gray-600 font-light">
                  {resumeData.personalInfo.title || "Professional Title"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-gray-600">
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

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-0.5" style={{ backgroundColor: accent }}></div>
            <h2 className="text-[16px] font-semibold uppercase tracking-wider" style={{ color: accent }}>
              Summary
            </h2>
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[13px] text-gray-700 leading-[1.7] block pl-16"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[13px] text-gray-700 leading-[1.7] pl-16">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5" style={{ backgroundColor: accent }}></div>
            <h2 className="text-[16px] font-semibold uppercase tracking-wider" style={{ color: accent }}>
              Experience
            </h2>
          </div>
          <div className="pl-16">
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
                  <div className="mb-6 last:mb-0">
                    <div className="mb-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14px] font-semibold text-gray-900 block"
                        as="h3"
                      />
                      <div className="flex justify-between items-center">
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-[13px] text-gray-700 font-medium inline-block"
                          as="span"
                        />
                        <div className="text-[11px] text-gray-600 flex items-center gap-1">
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                            className="inline-block"
                          />
                          <span> - </span>
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
                        className="text-[12.5px] text-gray-700 leading-[1.7] block"
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
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="mb-2">
                      <h3 className="text-[14px] font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] text-gray-700 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-[11px] text-gray-600">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
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
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5" style={{ backgroundColor: accent }}></div>
            <h2 className="text-[16px] font-semibold uppercase tracking-wider" style={{ color: accent }}>
              Education
            </h2>
          </div>
          <div className="pl-16">
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
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                      className="text-[14px] font-semibold text-gray-900 block"
                      as="h3"
                    />
                    <div className="flex justify-between items-center">
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[13px] text-gray-700 inline-block"
                        as="span"
                      />
                      <p className="text-[11px] text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                )}
              />
            ) : (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="text-[14px] font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-[13px] text-gray-700">{edu.school}</p>
                    <p className="text-[11px] text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5" style={{ backgroundColor: accent }}></div>
            <h2 className="text-[16px] font-semibold uppercase tracking-wider" style={{ color: accent }}>
              Skills
            </h2>
          </div>
          <div className="pl-16">
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <span className="px-4 py-1.5 text-[12px] bg-gray-100 text-gray-900 rounded">
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-[12px] bg-gray-100 text-gray-900 rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
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
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-0.5" style={{ backgroundColor: accent }}></div>
                  <InlineEditableText
                    path={`sections[${sectionIndex}].title`}
                    value={section.title}
                    className="text-[16px] font-semibold uppercase tracking-wider inline-block"
                    style={{ color: accent }}
                    as="h2"
                  />
                </div>
                <InlineEditableText
                  path={`sections[${sectionIndex}].content`}
                  value={section.content}
                  className="text-[13px] text-gray-700 leading-[1.7] block pl-16"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5" style={{ backgroundColor: accent }}></div>
                <h2 className="text-[16px] font-semibold uppercase tracking-wider" style={{ color: accent }}>
                  {section.title}
                </h2>
              </div>
              <div className="text-[13px] text-gray-700 leading-[1.7] pl-16">
                {section.content.split("\n").map((line, i) => (
                  <p key={i} className="mb-1">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};
