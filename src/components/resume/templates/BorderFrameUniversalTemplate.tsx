import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface BorderFrameUniversalTemplateProps {
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

export const BorderFrameUniversalTemplate = ({
  resumeData,
  themeColor = "#059669",
  editable = false,
}: BorderFrameUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#059669";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-8 text-[13px] leading-relaxed">
      <div className="border-4 p-10" style={{ borderColor: accent }}>
        {/* Header - Centered */}
        <div className="text-center mb-10 pb-6 border-b" style={{ borderColor: accent }}>
          {editable ? (
            <>
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[32px] font-bold mb-2 block"
                style={{ color: accent }}
                as="h1"
              />
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title || "Professional Title"}
                className="text-[14px] text-gray-700 font-medium mb-4 block"
                as="p"
              />
            </>
          ) : (
            <>
              <h1 className="text-[32px] font-bold mb-2" style={{ color: accent }}>
                {resumeData.personalInfo.fullName}
              </h1>
              <p className="text-[14px] text-gray-700 font-medium mb-4">
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

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-3 text-center" style={{ color: accent }}>
              PROFESSIONAL SUMMARY
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[13px] text-gray-700 leading-[1.7] block text-center"
                multiline
                as="p"
              />
            ) : (
              <p className="text-[13px] text-gray-700 leading-[1.7] text-center">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: accent }}>
              PROFESSIONAL EXPERIENCE
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
                    <div className="text-center mb-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14px] font-semibold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-[13px] text-gray-700 font-medium block"
                        as="p"
                      />
                      <div className="text-[11px] text-gray-600 flex items-center justify-center gap-1">
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
                    <div className="text-center mb-2">
                      <h3 className="text-[14px] font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-[13px] text-gray-700 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-[11px] text-gray-600">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
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

        {/* Two Column Layout for Education and Skills */}
        <div className="grid grid-cols-2 gap-10">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: accent }}>
                EDUCATION
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
                    <div className="mb-4 last:mb-0 text-[12px] text-center">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                        className="font-semibold text-gray-900 block mb-1"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-gray-700 block mb-1"
                        as="p"
                      />
                      <p className="text-gray-600 text-[11px]">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  )}
                />
              ) : (
                resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0 text-[12px] text-center">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700 mb-1">{edu.school}</p>
                    <p className="text-gray-600 text-[11px]">
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
              <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: accent }}>
                SKILLS
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill) => (
                    <span className="text-[12px] text-gray-900 block mb-2 text-center">
                      {skill.name}
                    </span>
                  )}
                />
              ) : (
                <div className="space-y-2 text-center">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="text-[12px] text-gray-900">
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

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
                <div className="mt-10">
                  <InlineEditableText
                    path={`sections[${sectionIndex}].title`}
                    value={section.title}
                    className="text-[15px] font-bold mb-4 text-center block"
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
                <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: accent }}>
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
    </div>
  );
};
