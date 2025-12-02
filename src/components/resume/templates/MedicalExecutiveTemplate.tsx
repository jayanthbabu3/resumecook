import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface MedicalExecutiveTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const MedicalExecutiveTemplate = ({
  resumeData,
  themeColor = "#2c3e50",
  editable = false,
}: MedicalExecutiveTemplateProps) => {

  return (
    <div className="mx-auto bg-white p-12 font-serif text-gray-900">
      {/* Header Section */}
      <div className="mb-8 border-b-4 pb-6" style={{ borderColor: themeColor }}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="mb-2 text-5xl font-bold"
                as="h1"
                style={{ color: themeColor }}
              />
            ) : (
              <h1 className="mb-2 text-5xl font-bold" style={{ color: themeColor }}>
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="mb-4 text-2xl font-light text-gray-700"
                as="h2"
              />
            ) : (
              <h2 className="mb-4 text-2xl font-light text-gray-700">
                {resumeData.personalInfo.title}
              </h2>
            )}
            <div className="text-sm text-gray-600">
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
                      {" • "}
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
                      {" • "}
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
                [resumeData.personalInfo.location, resumeData.personalInfo.phone, resumeData.personalInfo.email]
                  .filter(Boolean)
                  .join(" • ")
              )}
            </div>
          </div>
          {resumeData.personalInfo.photo && (
            <div className="ml-8">
              <ProfilePhoto src={resumeData.personalInfo.photo} sizeClass="h-36 w-36" />
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h3
            className="mb-4 text-xl font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Executive Summary
          </h3>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-base leading-relaxed text-gray-700"
              as="p"
              multiline
            />
          ) : (
            <p className="text-base leading-relaxed text-gray-700">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Leadership Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h3
            className="mb-4 text-xl font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Leadership Experience
          </h3>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Healthcare Organization",
                position: "Executive Position",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Led strategic initiatives to improve healthcare delivery and operational efficiency\nManaged departmental budget of $X million\nSpearheaded implementation of quality improvement programs resulting in X% increase in patient satisfaction\nSupervised team of X healthcare professionals",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-6">
                  <div className="mb-2 flex items-baseline justify-between">
                    <h4 className="text-lg font-bold text-gray-900">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-lg font-bold text-gray-900 inline"
                        as="span"
                      />
                    </h4>
                    <span className="text-sm font-semibold text-gray-600">
                      <div className="flex items-center gap-1">
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
                  <p className="mb-3 text-base italic text-gray-600">
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-base italic text-gray-600 inline"
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
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-sm font-semibold text-gray-600">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="mb-3 text-base italic text-gray-600">{exp.company}</p>
                  <div>
                    {exp.description.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-2 text-sm leading-relaxed text-gray-700">
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

      {/* Education & Credentials */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h3
            className="mb-4 text-xl font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Education & Credentials
          </h3>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                degree: "Degree",
                school: "Institution",
                field: "Field",
                startDate: "2020-01",
                endDate: "2024-01",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-3">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-base font-bold text-gray-900">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-base font-bold text-gray-900 inline"
                        as="span"
                      />
                      {edu.field && (
                        <>
                          {" in "}
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-base font-bold text-gray-900 inline"
                            as="span"
                          />
                        </>
                      )}
                    </h4>
                    <div className="text-sm font-semibold text-gray-600 flex items-center gap-1">
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
                    <h4 className="text-base font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h4>
                    <span className="text-sm font-semibold text-gray-600">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Core Competencies */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h3
            className="mb-4 text-xl font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Core Competencies
          </h3>
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
            <div className="grid grid-cols-3 gap-x-8 gap-y-3">
              {resumeData.skills.map((skill) => (
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
          items={resumeData.sections}
          defaultItem={{
            id: Date.now().toString(),
            title: "Section Title",
            content: "Section content",
          }}
          addButtonLabel="Add Section"
          renderItem={(section, index) => (
            <div className="mb-8">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-4 text-xl font-bold uppercase tracking-wide"
                as="h3"
                style={{ color: themeColor }}
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
          <div key={section.id} className="mb-8">
            <h3
              className="mb-4 text-xl font-bold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              {section.title}
            </h3>
            <div className="space-y-2">
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
