import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface AnalystTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const AnalystTemplate = ({
  resumeData,
  themeColor = "#3b82f6",
  editable = false,
}: AnalystTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="mx-auto bg-white p-12 font-sans text-gray-900">
      {/* Header Section */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={personalInfo.fullName}
              className="mb-1 text-4xl font-bold uppercase tracking-wide"
              as="h1"
              style={{ color: themeColor }}
            />
          ) : (
            <h1
              className="mb-1 text-4xl font-bold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              {personalInfo.fullName}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={personalInfo.title}
              className="mb-3 text-xl font-bold uppercase tracking-wide text-gray-900"
              as="h2"
            />
          ) : (
            <h2 className="mb-3 text-xl font-bold uppercase tracking-wide text-gray-900">
              {personalInfo.title}
            </h2>
          )}
          <p className="text-sm text-gray-600">
            {editable ? (
              <>
                {personalInfo.location && (
                  <>
                    <InlineEditableText
                      path="personalInfo.location"
                      value={personalInfo.location}
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
                {personalInfo.email && (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={personalInfo.email}
                    className="text-sm text-gray-600 inline"
                    as="span"
                  />
                )}
              </>
            ) : (
              [
                personalInfo.location,
                personalInfo.phone,
                personalInfo.email,
              ]
                .filter(Boolean)
                .join(" | ")
            )}
          </p>
        </div>
        {personalInfo.photo && (
          <div className="ml-8">
            <ProfilePhoto src={personalInfo.photo} sizeClass="h-32 w-32" />
          </div>
        )}
      </div>

      {/* Summary Section */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Summary
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
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

      {/* Professional Experience Section */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Professional Experience
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
          {editable ? (
            <InlineEditableList
              path="experience"
              items={experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Company Name",
                position: "Position Title",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Job description",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="font-bold text-gray-900 inline"
                        as="span"
                      />
                      {", "}
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="font-bold text-gray-900 inline"
                        as="span"
                      />
                    </h4>
                    <span className="text-sm font-semibold text-gray-900">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <InlineEditableText
                    path={`experience[${index}].description`}
                    value={exp.description}
                    className="ml-0 text-sm leading-relaxed text-gray-700"
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
                    <h4 className="font-bold text-gray-900">
                      {exp.position}, {exp.company}
                    </h4>
                    <span className="text-sm font-semibold text-gray-900">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="ml-0">
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

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Education
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
          {editable ? (
            <InlineEditableList
              path="education"
              items={education}
              defaultItem={{
                id: Date.now().toString(),
                degree: "Degree",
                school: "School Name",
                field: "Field of Study",
                startDate: "2020-01",
                endDate: "2024-01",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div>
                  <div className="flex items-baseline justify-between">
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
                    <span className="text-sm font-semibold text-gray-900">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  <InlineEditableText
                    path={`education[${index}].school`}
                    value={edu.school}
                    className="text-sm text-gray-700"
                    as="p"
                  />
                </div>
              )}
            />
          ) : (
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h4>
                    <span className="text-sm font-semibold text-gray-900">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                  <p className="text-sm text-gray-600">• Graduated with High Honors.</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Technical Skills Section */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Technical Skills
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={skills}
              renderSkill={(skill, index) => (
                <div className="text-sm text-gray-700">
                  {skill.name}
                </div>
              )}
            />
          ) : (
            <div className="grid grid-cols-4 gap-x-6 gap-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm text-gray-700">
                  {skill.name}
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
                className="mb-3 text-sm font-bold uppercase tracking-wider"
                as="h3"
                style={{ color: themeColor }}
              />
              <div
                className="mb-4 h-px"
                style={{ backgroundColor: themeColor }}
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
        sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h3
              className="mb-3 text-sm font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              {section.title}
            </h3>
            <div
              className="mb-4 h-px"
              style={{ backgroundColor: themeColor }}
            />
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
