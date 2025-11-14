import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface PremiumUniversalTemplateProps {
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

const withOpacity = (color: string | undefined, alpha: string) => {
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${normalized}${alpha}`;
};

export const PremiumUniversalTemplate = ({
  resumeData,
  themeColor = "#2563eb",
  editable = false,
}: PremiumUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#2563eb";
  const accentBorder = withOpacity(accent, "33") ?? "#c7d2fe";
  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      {/* Header */}
      <div className="mb-8 pb-5 border-b-2" style={{ borderColor: accent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="text-[30px] font-bold mb-2 block"
            style={{ color: accent }}
            as="h1"
          />
        ) : (
          <h1 className="text-[30px] font-bold mb-2" style={{ color: accent }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}
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
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[12.5px] text-gray-700 leading-[1.7] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[12.5px] text-gray-700 leading-[1.7]">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
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
                description: "Job description here",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
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
                        className="text-[12.5px] text-gray-700 font-medium block"
                        as="p"
                      />
                    </div>
                    <div className="text-right text-[11px] text-gray-600">
                      <p>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
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
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-[14px] font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-[12.5px] text-gray-700 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right text-[11px] text-gray-600">
                      <p>
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
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
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
                  <div className="flex justify-between items-start">
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
                        className="text-[12.5px] text-gray-700 block"
                        as="p"
                      />
                    </div>
                    <div className="text-right text-[11px] text-gray-600">
                      <p>
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            />
          ) : (
            resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-[12.5px] text-gray-700">{edu.school}</p>
                  </div>
                  <div className="text-right text-[11px] text-gray-600">
                    <p>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill, index) => (
                <span
                  className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded"
                  style={{ border: `1px solid ${accentBorder}` }}
                >
                  {skill.name}
                </span>
              )}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded"
                  style={{ border: `1px solid ${accentBorder}` }}
                >
                  {skill.name}
                </span>
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
              content: "Section content here",
            }}
            addButtonLabel="Add Section"
            renderItem={(section, sectionIndex) => (
              <div className="mb-8">
                <InlineEditableText
                  path={`sections[${sectionIndex}].title`}
                  value={section.title}
                  className="text-[15px] font-semibold mb-3 uppercase tracking-wide block"
                  style={{ color: accent }}
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${sectionIndex}].content`}
                  value={section.content}
                  className="text-[12.5px] text-gray-700 leading-[1.7] block"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
                {section.title}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-[1.7]">
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
