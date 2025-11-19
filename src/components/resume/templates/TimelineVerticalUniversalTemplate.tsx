import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TimelineVerticalUniversalTemplateProps {
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

export const TimelineVerticalUniversalTemplate = ({
  resumeData,
  themeColor = "#7c3aed",
  editable = false,
}: TimelineVerticalUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#7c3aed";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      {/* Header */}
      <div className="mb-12 text-center">
        {editable ? (
          <>
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[36px] font-bold mb-2 block"
              style={{ color: accent }}
              as="h1"
            />
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Professional Title"}
              className="text-[14px] text-gray-700 mb-5 block"
              as="p"
            />
          </>
        ) : (
          <>
            <h1 className="text-[36px] font-bold mb-2" style={{ color: accent }}>
              {resumeData.personalInfo.fullName}
            </h1>
            <p className="text-[14px] text-gray-700 mb-5">
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
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>
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

      {/* Experience - Timeline Style */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-[16px] font-bold mb-6" style={{ color: accent }}>
            Experience Timeline
          </h2>
          <div className="relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-1.5 top-0 bottom-0 w-0.5" style={{ backgroundColor: accent }}></div>
            
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
                  <div className="mb-8 last:mb-0 relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: accent }}></div>
                    
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
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      className="text-[14px] font-semibold text-gray-900 block mb-1"
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-[13px] text-gray-700 block mb-2"
                      as="p"
                    />
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
                  <div key={index} className="mb-8 last:mb-0 relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: accent }}></div>
                    
                    <p className="text-[11px] text-gray-600 mb-2">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                    <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-[13px] text-gray-700 mb-2">
                      {exp.company}
                    </p>
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

      {/* Two Column for Education and Skills */}
      <div className="grid grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>
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
            <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>
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

      {/* Custom Sections */}
      {resumeData.sections && resumeData.sections.length > 0 && (
        <div className="max-w-4xl mx-auto mt-12">
          {editable ? (
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
                  <InlineEditableText
                    path={`sections[${sectionIndex}].title`}
                    value={section.title}
                    className="text-[16px] font-bold mb-4 block"
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
              <div key={sectionIndex} className="mb-10">
                <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>
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
          )}
        </div>
      )}
    </div>
  );
};
