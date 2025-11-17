import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface NurseSpecialistTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const NurseSpecialistTemplate = ({
  resumeData,
  themeColor = "#1976d2",
  editable = false,
}: NurseSpecialistTemplateProps) => {

  return (
    <div className="mx-auto bg-white p-12 font-sans text-gray-900">
      {/* Header Section */}
      <div className="mb-6 text-center">
        {resumeData.personalInfo.photo && (
          <div className="mb-4 flex justify-center">
            <ProfilePhoto src={resumeData.personalInfo.photo} sizeClass="h-24 w-24" />
          </div>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="mb-2 text-3xl font-bold"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="mb-2 text-3xl font-bold" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title}
            className="mb-3 text-lg font-semibold text-gray-700"
            as="h2"
          />
        ) : (
          <h2 className="mb-3 text-lg font-semibold text-gray-700">
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
            [resumeData.personalInfo.location, resumeData.personalInfo.phone, resumeData.personalInfo.email]
              .filter(Boolean)
              .join(" | ")
          )}
        </p>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Professional Summary
          </h3>
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

      {/* Nursing Licenses & Certifications */}
      {editable ? (
        <InlineEditableList
          path="sections"
          items={resumeData.sections.filter(s => s.title === "Licenses & Certifications")}
          defaultItem={{
            id: Date.now().toString(),
            title: "Licenses & Certifications",
            content: "Registered Nurse License (RN) - State Board of Nursing\nBasic Life Support (BLS) - American Heart Association\nAdvanced Cardiovascular Life Support (ACLS) - American Heart Association\nPediatric Advanced Life Support (PALS) - American Heart Association",
          }}
          addButtonLabel="Add Licenses"
          renderItem={(section, index) => (
            <div className="mb-6">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-2"
                as="h3"
                style={{ color: themeColor, borderColor: themeColor }}
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
        resumeData.sections
          .filter(s => s.title === "Licenses & Certifications")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3
                className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                {section.title}
              </h3>
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

      {/* Clinical Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Clinical Experience
          </h3>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Healthcare Facility",
                position: "Nursing Position",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Provided patient-centered nursing care\nAdministered medications and treatments\nCollaborated with interdisciplinary healthcare team\nMaintained accurate patient documentation in EMR",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div>
                  <div className="mb-1">
                    <h4 className="font-bold text-gray-900">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="font-bold text-gray-900 inline"
                        as="span"
                      />
                    </h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-sm text-gray-600 inline"
                          as="span"
                        />
                      </p>
                      <span className="text-sm font-semibold text-gray-600">
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
                  <div className="mb-1">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <span className="text-sm font-semibold text-gray-600">
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
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

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Education
          </h3>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                degree: "Nursing Degree",
                school: "Nursing School",
                field: "Nursing",
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
                    <h4 className="font-bold text-gray-900">
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

      {/* Clinical Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Clinical Skills & Competencies
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
            <div className="grid grid-cols-3 gap-x-6 gap-y-2">
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
            <div className="mb-6">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-2"
                as="h3"
                style={{ color: themeColor, borderColor: themeColor }}
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
        resumeData.sections
          .filter(s => s.title !== "Licenses & Certifications")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3
                className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                {section.title}
              </h3>
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
