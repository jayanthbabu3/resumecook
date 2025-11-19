import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface SidebarProfessionalUniversalTemplateProps {
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

export const SidebarProfessionalUniversalTemplate = ({
  resumeData,
  themeColor = "#0f172a",
  editable = false,
}: SidebarProfessionalUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#0f172a";
  const accentLight = withOpacity(accent, "15") ?? "#f1f5f9";

  return (
    <div className="w-full h-full bg-white text-gray-900 flex text-[13px] leading-relaxed">
      {/* Left Sidebar - 35% */}
      <div className="w-[35%] p-8" style={{ backgroundColor: accentLight }}>
        {/* Name & Title */}
        <div className="mb-8">
          {editable ? (
            <>
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[24px] font-bold mb-2 block"
                style={{ color: accent }}
                as="h1"
              />
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title || "Professional Title"}
                className="text-[13px] text-gray-700 block"
                as="p"
              />
            </>
          ) : (
            <>
              <h1 className="text-[24px] font-bold mb-2" style={{ color: accent }}>
                {resumeData.personalInfo.fullName}
              </h1>
              <p className="text-[13px] text-gray-700">
                {resumeData.personalInfo.title || "Professional Title"}
              </p>
            </>
          )}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-[14px] font-semibold mb-3" style={{ color: accent }}>
            Contact
          </h3>
          <div className="space-y-2 text-[12px] text-gray-700">
            {resumeData.personalInfo.email && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="block"
                  />
                ) : (
                  <p>{resumeData.personalInfo.email}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="block"
                  />
                ) : (
                  <p>{resumeData.personalInfo.phone}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="block"
                  />
                ) : (
                  <p>{resumeData.personalInfo.location}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[14px] font-semibold mb-3" style={{ color: accent }}>
              Skills
            </h3>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <div className="mb-2 text-[12px] text-gray-700">{skill.name}</div>
                )}
              />
            ) : (
              <div className="space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="text-[12px] text-gray-700">
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h3 className="text-[14px] font-semibold mb-3" style={{ color: accent }}>
              Education
            </h3>
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
                  <div className="mb-4 text-[12px]">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                      className="font-semibold text-gray-900 block mb-1"
                      as="p"
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
                <div key={index} className="mb-4 text-[12px]">
                  <p className="font-semibold text-gray-900 mb-1">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-gray-700 mb-1">{edu.school}</p>
                  <p className="text-gray-600 text-[11px]">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right Content - 65% */}
      <div className="w-[65%] p-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-[16px] font-bold mb-3 pb-2 border-b-2" style={{ color: accent, borderColor: accent }}>
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

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[16px] font-bold mb-3 pb-2 border-b-2" style={{ color: accent, borderColor: accent }}>
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
                          className="text-[13px] text-gray-700 font-medium block"
                          as="p"
                        />
                      </div>
                      <div className="text-right text-[11px] text-gray-600">
                        <div className="flex items-center gap-1">
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
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-[14px] font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-[13px] text-gray-700 font-medium">
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
                    className="text-[16px] font-bold mb-3 pb-2 border-b-2 block"
                    style={{ color: accent, borderColor: accent }}
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
              <div key={sectionIndex} className="mb-8">
                <h2 className="text-[16px] font-bold mb-3 pb-2 border-b-2" style={{ color: accent, borderColor: accent }}>
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
