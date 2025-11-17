import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

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

  return (
    <div className="mx-auto bg-white p-12 font-sans text-gray-900">
      {/* Header Section */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="mb-1 text-4xl font-bold uppercase tracking-wide"
              as="h1"
              style={{ color: themeColor }}
            />
          ) : (
            <h1
              className="mb-1 text-4xl font-bold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              {resumeData.personalInfo.fullName}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title}
              className="mb-3 text-xl font-bold uppercase tracking-wide text-gray-900"
              as="h2"
            />
          ) : (
            <h2 className="mb-3 text-xl font-bold uppercase tracking-wide text-gray-900">
              {resumeData.personalInfo.title}
            </h2>
          )}
          <p className="text-sm text-gray-600">
            {editable ? (
              <>
                {resumeData.personalInfo.location && (
                  <>
                    <InlineEditableText
                      path="personalInfo.location"
                      value={resumeData.personalInfo.location}
                      className="text-sm text-gray-600 inline"
                      as="span"
                    />
                    {" | "}
                  </>
                )}
                {resumeData.personalInfo.phone && (
                  <>
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={resumeData.personalInfo.phone}
                      className="text-sm text-gray-600 inline"
                      as="span"
                    />
                    {" | "}
                  </>
                )}
                {resumeData.personalInfo.email && (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-sm text-gray-600 inline"
                    as="span"
                  />
                )}
              </>
            ) : (
              [
                resumeData.personalInfo.location,
                resumeData.personalInfo.phone,
                resumeData.personalInfo.email,
              ]
                .filter(Boolean)
                .join(" | ")
            )}
          </p>
        </div>
        {resumeData.personalInfo.photo && (
          <div className="ml-8">
            <ProfilePhoto src={resumeData.personalInfo.photo} sizeClass="h-32 w-32" />
          </div>
        )}
      </div>

      {/* Summary Section */}
      {resumeData.personalInfo.summary && (
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
              value={resumeData.personalInfo.summary}
              className="text-sm leading-relaxed text-gray-700"
              as="p"
              multiline
            />
          ) : (
            <p className="text-sm leading-relaxed text-gray-700">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Professional Experience Section */}
      {resumeData.experience.length > 0 && (
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
              items={resumeData.experience}
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
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          className="inline-block"
                        />
                        <span> — </span>
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
              {resumeData.experience.map((exp) => (
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
      {resumeData.education.length > 0 && (
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
              items={resumeData.education}
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
                    <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        className="inline-block"
                      />
                      <span> — </span>
                      <InlineEditableDate
                        path={`education[${index}].endDate`}
                        value={edu.endDate}
                        className="inline-block"
                      />
                    </div>
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
              {resumeData.education.map((edu) => (
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
      {resumeData.skills.length > 0 && (
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
              skills={resumeData.skills}
              renderSkill={(skill, index) => (
                <div className="text-sm text-gray-700">
                  {skill.name}
                </div>
              )}
            />
          ) : (
            <div className="grid grid-cols-4 gap-x-6 gap-y-2">
              {resumeData.skills.map((skill) => (
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
          items={resumeData.sections}
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
        resumeData.sections.map((section) => (
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
