import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface ClinicalMinimalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ClinicalMinimalTemplate = ({
  resumeData,
  themeColor = "#455a64",
  editable = false,
}: ClinicalMinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="mx-auto bg-white p-12 font-sans text-gray-900">
      {/* Header Section - Minimal */}
      <div className="mb-8">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={personalInfo.fullName}
            className="mb-1 text-3xl font-light tracking-wide"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="mb-1 text-3xl font-light tracking-wide" style={{ color: themeColor }}>
            {personalInfo.fullName}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={personalInfo.title}
            className="mb-4 text-base font-normal text-gray-600"
            as="h2"
          />
        ) : (
          <h2 className="mb-4 text-base font-normal text-gray-600">
            {personalInfo.title}
          </h2>
        )}
        <div className="border-t border-gray-300 pt-3 text-xs text-gray-600">
          {editable ? (
            <>
              {personalInfo.email && (
                <>
                  <InlineEditableText
                    path="personalInfo.email"
                    value={personalInfo.email}
                    className="text-xs text-gray-600 inline"
                    as="span"
                  />
                  {" | "}
                </>
              )}
              {personalInfo.phone && (
                <>
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={personalInfo.phone}
                    className="text-xs text-gray-600 inline"
                    as="span"
                  />
                  {" | "}
                </>
              )}
              {personalInfo.location && (
                <InlineEditableText
                  path="personalInfo.location"
                  value={personalInfo.location}
                  className="text-xs text-gray-600 inline"
                  as="span"
                />
              )}
            </>
          ) : (
            [personalInfo.email, personalInfo.phone, personalInfo.location]
              .filter(Boolean)
              .join(" | ")
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-sm leading-relaxed text-gray-700"
              as="p"
              multiline
            />
          ) : (
            <p className="text-sm leading-relaxed text-gray-700">
              {personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Licenses & Certifications */}
      {editable ? (
        <InlineEditableList
          path="sections"
          items={sections.filter(s => s.title === "Licenses & Certifications")}
          defaultItem={{
            id: Date.now().toString(),
            title: "Licenses & Certifications",
            content: "Professional License\nRelevant Certifications",
          }}
          addButtonLabel="Add Licenses"
          renderItem={(section, index) => (
            <div className="mb-6">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500"
                as="h3"
              />
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-sm text-gray-700"
                as="div"
                multiline
              />
            </div>
          )}
        />
      ) : (
        sections
          .filter(s => s.title === "Licenses & Certifications")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.content.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            Experience
          </h3>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Facility",
                position: "Position",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Responsibilities and achievements",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-4">
                  <div className="mb-1 flex items-baseline justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="font-semibold text-gray-900 inline"
                          as="span"
                        />
                      </h4>
                      <p className="text-sm text-gray-600">
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-sm text-gray-600 inline"
                          as="span"
                        />
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
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
                    </span>
                  </div>
                  <InlineEditableText
                    path={`experience[${index}].description`}
                    value={exp.description}
                    className="text-sm leading-relaxed text-gray-700"
                    as="div"
                    multiline
                  />
                </div>
              )}
            />
          ) : (
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-1 flex items-baseline justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {exp.startDate}—{exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div>
                    {exp.description.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-1 text-sm leading-relaxed text-gray-700">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            Education
          </h3>
          {editable ? (
            <InlineEditableList
              path="education"
              items={education}
              defaultItem={{
                id: Date.now().toString(),
                degree: "Degree",
                school: "School",
                field: "Field",
                startDate: "2020-01",
                endDate: "2024-01",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="font-semibold text-gray-900 inline"
                          as="span"
                        />
                        {edu.field && (
                          <>
                            {", "}
                            <InlineEditableText
                              path={`education[${index}].field`}
                              value={edu.field}
                              className="font-semibold text-gray-900 inline"
                              as="span"
                            />
                          </>
                        )}
                      </h4>
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-sm text-gray-600"
                        as="p"
                      />
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
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
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {edu.degree}{edu.field && `, ${edu.field}`}
                      </h4>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-500">{edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            Skills
          </h3>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={skills}
              renderSkill={(skill, index) => (
                <span className="text-sm text-gray-700">
                  {skill.name}
                </span>
              )}
            />
          ) : (
            <p className="text-sm text-gray-700">
              {skills.map(skill => skill.name).join(" • ")}
            </p>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {editable ? (
        <InlineEditableList
          path="sections"
          items={sections}
          defaultItem={{
            id: Date.now().toString(),
            title: "Section Title",
            content: "Section content",
          }}
          addButtonLabel="Add Section"
          renderItem={(section, index) => (
            <div className="mb-6">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500"
                as="h3"
              />
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-sm text-gray-700"
                as="div"
                multiline
              />
            </div>
          )}
        />
      ) : (
        sections
          .filter(s => s.title !== "Licenses & Certifications")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.content.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
};
