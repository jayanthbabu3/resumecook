import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface TeachingCertifiedTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const TeachingCertifiedTemplate = ({
  resumeData,
  themeColor = "#6a1b9a",
  editable = false,
}: TeachingCertifiedTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="mx-auto bg-white p-12 font-sans text-gray-900">
      {/* Header */}
      <div className="mb-6">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={personalInfo.fullName}
            className="mb-2 text-3xl font-bold uppercase"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="mb-2 text-3xl font-bold uppercase" style={{ color: themeColor }}>
            {personalInfo.fullName}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={personalInfo.title}
            className="mb-3 text-lg font-semibold text-gray-700"
            as="h2"
          />
        ) : (
          <h2 className="mb-3 text-lg font-semibold text-gray-700">{personalInfo.title}</h2>
        )}
        <div className="text-sm text-gray-600">
          {editable ? (
            <>
              {personalInfo.email && (
                <>
                  <InlineEditableText
                    path="personalInfo.email"
                    value={personalInfo.email}
                    className="text-sm text-gray-600 inline"
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
                    className="text-sm text-gray-600 inline"
                    as="span"
                  />
                  {" | "}
                </>
              )}
              {personalInfo.location && (
                <InlineEditableText
                  path="personalInfo.location"
                  value={personalInfo.location}
                  className="text-sm text-gray-600 inline"
                  as="span"
                />
              )}
            </>
          ) : (
            [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" | ")
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase" style={{ color: themeColor }}>
            Professional Summary
          </h3>
          <div className="h-0.5 mb-3" style={{ backgroundColor: themeColor }} />
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-sm leading-relaxed text-gray-700"
              as="p"
              multiline
            />
          ) : (
            <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* CERTIFICATIONS - PROMINENT */}
      {editable ? (
        <InlineEditableList
          path="sections"
          items={sections.filter(s => s.title === "Teaching Certifications")}
          defaultItem={{
            id: Date.now().toString(),
            title: "Teaching Certifications",
            content: "State Teaching License - Grades K-12, All Subjects (Valid through 2026)\nNational Board Certification - [Subject Area]\nESL/TESOL Certification\nGoogle Certified Educator Level 2",
          }}
          addButtonLabel="Add Certifications"
          renderItem={(section, index) => (
            <div className="mb-6 bg-gray-50 p-4 rounded">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-2 text-sm font-bold uppercase"
                as="h3"
                style={{ color: themeColor }}
              />
              <div className="h-0.5 mb-3" style={{ backgroundColor: themeColor }} />
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
          .filter(s => s.title === "Teaching Certifications")
          .map((section) => (
            <div key={section.id} className="mb-6 bg-gray-50 p-4 rounded">
              <h3 className="mb-2 text-sm font-bold uppercase" style={{ color: themeColor }}>
                {section.title}
              </h3>
              <div className="h-0.5 mb-3" style={{ backgroundColor: themeColor }} />
              <div className="space-y-1">
                {section.content.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    • {line}
                  </p>
                ))}
              </div>
            </div>
          ))
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase" style={{ color: themeColor }}>
            Education
          </h3>
          <div className="h-0.5 mb-3" style={{ backgroundColor: themeColor }} />
          {editable ? (
            <InlineEditableList
              path="education"
              items={education}
              defaultItem={{
                id: Date.now().toString(),
                degree: "Degree",
                school: "University",
                field: "Education",
                startDate: "2020-01",
                endDate: "2024-01",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-3">
                  <h4 className="font-bold text-gray-900">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="font-bold text-gray-900 inline"
                      as="span"
                    />
                    {edu.field && (
                      <>
                        {" in "}
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="font-bold text-gray-900 inline"
                          as="span"
                        />
                      </>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-sm text-gray-600 inline"
                      as="span"
                    />
                    {" - "}
                    <InlineEditableDate
                      path={`education[${index}].endDate`}
                      value={edu.endDate}
                      className="inline-block"
                    />
                  </p>
                </div>
              )}
            />
          ) : (
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {edu.school} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase" style={{ color: themeColor }}>
            Teaching Experience
          </h3>
          <div className="h-0.5 mb-3" style={{ backgroundColor: themeColor }} />
          {editable ? (
            <InlineEditableList
              path="experience"
              items={experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "School",
                position: "Position",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Teaching responsibilities",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-4">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="font-bold text-gray-900 inline"
                        as="span"
                      />
                    </h4>
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
                  <p className="text-sm text-gray-600 mb-2">
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-sm text-gray-600 inline"
                      as="span"
                    />
                  </p>
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
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-xs text-gray-500">
                      {exp.startDate}—{exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                  <div>
                    {exp.description.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-1 text-sm leading-relaxed text-gray-700">
                        • {line}
                      </p>
                    ))}
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
          <h3 className="mb-2 text-sm font-bold uppercase" style={{ color: themeColor }}>
            Skills & Technologies
          </h3>
          <div className="h-0.5 mb-3" style={{ backgroundColor: themeColor }} />
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={skills}
              renderSkill={(skill, index) => (
                <div className="text-sm text-gray-700">{skill.name}</div>
              )}
            />
          ) : (
            <div className="grid grid-cols-3 gap-x-6 gap-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm text-gray-700">
                  • {skill.name}
                </div>
              ))}
            </div>
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
                className="mb-2 text-sm font-bold uppercase"
                as="h3"
                style={{ color: themeColor }}
              />
              <div className="h-0.5 mb-3" style={{ backgroundColor: themeColor }} />
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
          .filter(s => s.title !== "Teaching Certifications")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="mb-2 text-sm font-bold uppercase" style={{ color: themeColor }}>
                {section.title}
              </h3>
              <div className="h-0.5 mb-3" style={{ backgroundColor: themeColor }} />
              <div className="space-y-1">
                {section.content.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    • {line}
                  </p>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
};
