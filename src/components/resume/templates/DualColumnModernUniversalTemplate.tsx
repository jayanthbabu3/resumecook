import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface DualColumnModernUniversalTemplateProps {
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

export const DualColumnModernUniversalTemplate = ({
  resumeData,
  themeColor = "#0d9488",
  editable = false,
}: DualColumnModernUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#0d9488";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      {/* Header */}
      <div className="mb-10 text-center">
        {editable ? (
          <>
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[34px] font-bold mb-2 block"
              style={{ color: accent }}
              as="h1"
            />
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Professional Title"}
              className="text-[14px] text-gray-700 mb-4 block"
              as="p"
            />
          </>
        ) : (
          <>
            <h1 className="text-[34px] font-bold mb-2" style={{ color: accent }}>
              {resumeData.personalInfo.fullName}
            </h1>
            <p className="text-[14px] text-gray-700 mb-4">
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

      {/* Professional Summary (Full Width) */}
      {resumeData.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-[16px] font-semibold mb-3 uppercase" style={{ color: accent }}>
            Professional Summary
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-10">
        {/* Left Column */}
        <div>
          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-10">
              <h2 className="text-[16px] font-semibold mb-4 uppercase" style={{ color: accent }}>
                Experience
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
                    description: "Job description here",
                    current: false,
                  }}
                  addButtonLabel="Add Experience"
                  renderItem={(exp, index) => (
                    <div className="mb-6 last:mb-0">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14px] font-semibold text-gray-900 block mb-1"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-[13px] text-gray-700 block mb-1"
                        as="p"
                      />
                      <div className="text-[11px] text-gray-600 mb-2 flex items-center gap-1">
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
                      {exp.description && (
                        <InlineEditableText
                          path={`experience[${index}].description`}
                          value={exp.description}
                          className="text-[12px] text-gray-700 leading-[1.6] block"
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
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-[13px] text-gray-700 mb-1">
                        {exp.company}
                      </p>
                      <p className="text-[11px] text-gray-600 mb-2">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                      {bulletPoints.length > 0 && (
                        <ul className="ml-4 list-disc space-y-1 text-[12px] text-gray-700 leading-[1.6]">
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
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-10">
              <h2 className="text-[16px] font-semibold mb-4 uppercase" style={{ color: accent }}>
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
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                        className="text-[14px] font-semibold text-gray-900 block mb-1"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[13px] text-gray-700 block mb-1"
                        as="p"
                      />
                      <p className="text-[11px] text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  )}
                />
              ) : (
                resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-[13px] text-gray-700 mb-1">{edu.school}</p>
                    <p className="text-[11px] text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-[16px] font-semibold mb-4 uppercase" style={{ color: accent }}>
                Skills
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill) => (
                    <div className="mb-2 text-[13px] text-gray-900">
                      • {skill.name}
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="text-[13px] text-gray-900">
                      • {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Custom Sections (Full Width) */}
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
              <div className="mt-10">
                <InlineEditableText
                  path={`sections[${sectionIndex}].title`}
                  value={section.title}
                  className="text-[16px] font-semibold mb-4 uppercase block"
                  style={{ color: accent }}
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${sectionIndex}].content`}
                  value={section.content}
                  className="text-[13px] text-gray-700 leading-[1.7] block"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-10">
              <h2 className="text-[16px] font-semibold mb-4 uppercase" style={{ color: accent }}>
                {section.title}
              </h2>
              <div className="text-[13px] text-gray-700 leading-[1.7]">
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
